import { randomUUID } from "node:crypto";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 / S3-Compatible Object Storage Adapter for @Splittel.
 *
 * Ensures raw receipt photos (base64 or binary buffers) are NEVER stored in PostgreSQL.
 * Uploads images to the `splittel-receipts` bucket with UUID-anonymized object keys
 * and returns a clean HTTPS CDN URL saved into `bills.image_url`.
 */

export interface R2AdapterConfig {
  accountId?: string;
  endpoint?: string;
  bucketName?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicBaseUrl?: string;
  region?: string;
  s3Client?: Pick<S3Client, "send">;
}

export interface ReceiptImageUploadResult {
  uploaded: boolean;
  bucket: string;
  key: string | null;
  imageUrl: string | null;
  contentType: string;
  sizeBytes: number;
}

const ALLOWED_IMAGE_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
};

const MAX_RECEIPT_IMAGE_BYTES = 20 * 1024 * 1024; // 20 MB

/**
 * Detects image MIME type from a Data URI header or binary magic bytes.
 */
export function detectImageMimeType(
  buffer: Buffer,
  dataUriHeader?: string
): string {
  if (dataUriHeader) {
    const match = dataUriHeader.match(/^data:(image\/[a-z0-9.+-]+);base64,/i);
    if (match?.[1]) {
      const candidate = match[1].toLowerCase();
      if (ALLOWED_IMAGE_MIME_TYPES[candidate]) {
        return candidate === "image/jpg" ? "image/jpeg" : candidate;
      }
    }
  }

  // Binary magic byte sniffing
  if (buffer.length >= 4) {
    // PNG: 89 50 4E 47
    if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    ) {
      return "image/png";
    }
    // JPEG: FF D8 FF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return "image/jpeg";
    }
    // WEBP: "RIFF"...."WEBP"
    if (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    ) {
      return "image/webp";
    }
  }

  return "image/jpeg";
}

/**
 * Builds a collision-free, PII-free object key (strips original user filenames).
 */
export function buildReceiptObjectKey(
  extension: string,
  now: Date = new Date()
): string {
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const safeExt = extension.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
  return `receipts/${yyyy}/${mm}/${dd}/${randomUUID()}.${safeExt}`;
}

export class R2ReceiptStorageAdapter {
  private readonly bucketName: string;
  private readonly publicBaseUrl: string;
  private readonly endpoint: string;
  private readonly client: Pick<S3Client, "send"> | null;

  constructor(options: R2AdapterConfig = {}) {
    this.bucketName = (options.bucketName || "splittel-receipts").trim();

    const rawAccountId = (options.accountId || "").trim();
    const accountEndpoint = /^https?:\/\//i.test(rawAccountId)
      ? rawAccountId.replace(/^(https?:\/\/[^/]+).*$/i, "$1")
      : rawAccountId
        ? `https://${rawAccountId}.r2.cloudflarestorage.com`
        : "";
    const resolvedEndpoint = (options.endpoint || accountEndpoint)
      .trim()
      .replace(/\/+$/, "");

    this.endpoint = resolvedEndpoint;
    const rawPublicBase = (options.publicBaseUrl || "").trim();
    const normalizedPublicBase = rawPublicBase
      ? /^https?:\/\//i.test(rawPublicBase)
        ? rawPublicBase
        : `https://${rawPublicBase}`
      : resolvedEndpoint
        ? `${resolvedEndpoint}/${this.bucketName}`
        : "";
    this.publicBaseUrl = normalizedPublicBase.replace(/\/+$/, "");

    if (options.s3Client) {
      this.client = options.s3Client;
    } else if (
      options.accessKeyId?.trim() &&
      options.secretAccessKey?.trim() &&
      resolvedEndpoint
    ) {
      this.client = new S3Client({
        region: options.region || "auto",
        endpoint: resolvedEndpoint,
        credentials: {
          accessKeyId: options.accessKeyId.trim(),
          secretAccessKey: options.secretAccessKey.trim(),
        },
      });
    } else {
      this.client = null;
    }
  }

  public isConfigured(): boolean {
    return this.client !== null;
  }

  public getBucketName(): string {
    return this.bucketName;
  }

  /**
   * Parses a base64 or Data URI image payload into `{ buffer, contentType }`
   * and uploads it to Cloudflare R2 if configured.
   */
  public async uploadBase64Receipt(
    imageBase64: string
  ): Promise<{ buffer: Buffer; upload: ReceiptImageUploadResult }> {
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");
    const contentType = detectImageMimeType(buffer, imageBase64);
    const upload = await this.uploadReceiptBuffer(buffer, contentType);
    return { buffer, upload };
  }

  /**
   * Uploads a binary receipt image buffer to R2 (`splittel-receipts`) and returns its HTTPS CDN URL.
   * When R2 credentials are not configured (e.g., local zero-config dev), returns `imageUrl: null`
   * so binary data is still never written to PostgreSQL.
   */
  public async uploadReceiptBuffer(
    buffer: Buffer,
    contentType = "image/jpeg"
  ): Promise<ReceiptImageUploadResult> {
    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
      throw new Error("Receipt image buffer is empty.");
    }
    if (buffer.length > MAX_RECEIPT_IMAGE_BYTES) {
      throw new Error(
        `Receipt image exceeds maximum allowed size (${MAX_RECEIPT_IMAGE_BYTES} bytes).`
      );
    }

    const normalizedMime = ALLOWED_IMAGE_MIME_TYPES[contentType.toLowerCase()]
      ? contentType.toLowerCase() === "image/jpg"
        ? "image/jpeg"
        : contentType.toLowerCase()
      : "image/jpeg";
    const ext = ALLOWED_IMAGE_MIME_TYPES[normalizedMime] ?? "jpg";

    if (!this.client) {
      return {
        uploaded: false,
        bucket: this.bucketName,
        key: null,
        imageUrl: null,
        contentType: normalizedMime,
        sizeBytes: buffer.length,
      };
    }

    const key = buildReceiptObjectKey(ext);

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: normalizedMime,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    const baseCdn =
      this.publicBaseUrl ||
      `https://${this.bucketName}.r2.dev`;
    const imageUrl = `${baseCdn}/${key}`;

    return {
      uploaded: true,
      bucket: this.bucketName,
      key,
      imageUrl,
      contentType: normalizedMime,
      sizeBytes: buffer.length,
    };
  }

  /**
   * Deletes an uploaded receipt object from R2 (e.g. upon GDPR erasure request).
   */
  public async deleteReceiptObject(key: string): Promise<boolean> {
    if (!this.client || !key) return false;
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
    );
    return true;
  }
}

