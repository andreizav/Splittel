import { z } from "zod";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Minimal zero-dependency .env loader so the server works seamlessly
 * whether launched via node, tsx, Docker, Railway, or Cloud Run.
 */
function loadDotEnvIfPresent(): void {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf-8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const val = trimmed.slice(eqIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

loadDotEnvIfPresent();

const booleanString = (defaultVal: boolean) =>
  z
    .string()
    .optional()
    .transform((v) => {
      if (v === undefined || v === "") return defaultVal;
      return ["true", "1", "yes", "on"].includes(v.toLowerCase());
    });

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().positive().default(3443),
  HTTPS_ENABLED: booleanString(true),
  TRUST_PROXY: booleanString(true),
  PUBLIC_BASE_URL: z.string().url().default("https://localhost:3443"),
  TLS_CERT_PATH: z.string().default("./certs/localhost-cert.pem"),
  TLS_KEY_PATH: z.string().default("./certs/localhost-key.pem"),

  // OrbStack Local Infrastructure Defaults (PostgreSQL + PostGIS, Redis, Qdrant)
  DATABASE_URL: z
    .string()
    .regex(
      /^postgres(?:ql)?:\/\/.+/i,
      "DATABASE_URL must be a valid PostgreSQL connection string"
    )
    .default("postgresql://postgres:postgrespassword@localhost:5432/splittel"),
  REDIS_URL: z
    .string()
    .regex(
      /^rediss?:\/\/.+/i,
      "REDIS_URL must be a valid Redis connection string"
    )
    .default("redis://localhost:6379"),
  QDRANT_URL: z.string().url().default("http://localhost:6333"),
  STORAGE_DRIVER: z.enum(["auto", "postgres", "r2", "memory"]).default("auto"),

  // Cloudflare R2 / AWS S3 Object Storage Settings
  R2_ACCOUNT_ID: z.string().optional().default(""),
  R2_ENDPOINT: z.string().optional().default(""),
  R2_BUCKET_NAME: z.string().min(1).default("splittel-receipts"),
  R2_ACCESS_KEY_ID: z.string().optional().default(""),
  R2_SECRET_ACCESS_KEY: z.string().optional().default(""),
  R2_PUBLIC_BASE_URL: z.string().optional().default(""),
  R2_PUBLIC_DOMAIN: z.string().optional().default(""),

  // Multimodal Vision Fallback (Google Gemini 2.0 Flash)
  GEMINI_API_KEY: z.string().optional().default(""),

  // Security & Rate Limiting
  JWT_SECRET: z
    .string()
    .min(16, "JWT_SECRET must be at least 16 characters")
    .default("splittel-prod-grade-hmac-sha256-signing-key-2026"),
  OAUTH_JWT_SECRET: z
    .string()
    .min(16, "OAUTH_JWT_SECRET must be at least 16 characters")
    .default("splittel-prod-grade-hmac-sha256-signing-key-2026"),
  UI_ACTION_SECRET: z
    .string()
    .min(16, "UI_ACTION_SECRET must be at least 16 characters")
    .default("splittel-sandboxed-iframe-action-hmac-key-2026"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(60),
  RECEIPT_SCAN_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  STRICT_ENTERPRISE_ENV: booleanString(false),

  // OAuth 2.1 Resource & Authorization Server Settings
  OAUTH_ISSUER_URL: z.string().url().default("https://localhost:3443"),
  OAUTH_AUDIENCE: z.string().default("https://localhost:3443/mcp"),
  OAUTH_JWKS_URI: z.string().optional().default(""),
  OAUTH_REQUIRE_AUTH_FOR_TOOLS: booleanString(true),
  OAUTH_ENFORCE_ON_ALL_MCP: booleanString(false),
});

export type AppConfig = z.infer<typeof EnvSchema>;

export interface StartupEnvValidationReport {
  valid: boolean;
  storageDriver: AppConfig["STORAGE_DRIVER"];
  databaseConfigured: boolean;
  redisConfigured: boolean;
  r2Configured: boolean;
  geminiVisionConfigured: boolean;
  jwtSecretIsolated: boolean;
  warnings: string[];
}

/**
 * Validates enterprise environment variables (`STORAGE_DRIVER`, `R2_*`, `DATABASE_URL`,
 * and optional `GEMINI_API_KEY`) at startup without leaking secret values.
 */
export function validateStartupEnv(appConfig: AppConfig): StartupEnvValidationReport {
  const warnings: string[] = [];

  const databaseConfigured = /^postgres(?:ql)?:\/\/.+/i.test(appConfig.DATABASE_URL);
  const redisConfigured = /^rediss?:\/\/.+/i.test(appConfig.REDIS_URL);
  const r2Configured = Boolean(
    appConfig.R2_ACCESS_KEY_ID.trim() && appConfig.R2_SECRET_ACCESS_KEY.trim()
  );
  const geminiVisionConfigured = Boolean(appConfig.GEMINI_API_KEY.trim());
  const jwtSecretIsolated =
    appConfig.JWT_SECRET.length >= 16 && appConfig.OAUTH_JWT_SECRET.length >= 16;

  const strictProductionOrR2 =
    appConfig.NODE_ENV === "production" ||
    appConfig.STORAGE_DRIVER === "r2" ||
    appConfig.STRICT_ENTERPRISE_ENV;

  if (strictProductionOrR2) {
    const missingVars: string[] = [];
    if (!databaseConfigured) {
      missingVars.push("DATABASE_URL");
    }
    if (!appConfig.R2_ACCESS_KEY_ID.trim()) {
      missingVars.push("R2_ACCESS_KEY_ID");
    }
    if (!appConfig.R2_SECRET_ACCESS_KEY.trim()) {
      missingVars.push("R2_SECRET_ACCESS_KEY");
    }
    if (missingVars.length > 0) {
      const diagMsg = `Startup validation failed (${
        appConfig.NODE_ENV === "production"
          ? 'NODE_ENV="production"'
          : 'STORAGE_DRIVER="r2"'
      }): missing required environment variables: ${missingVars.join(", ")}`;
      if (appConfig.NODE_ENV === "production") {
        console.error(`[@Splittel] ${diagMsg}`);
      }
      throw new Error(diagMsg);
    }
    if (appConfig.NODE_ENV === "production" && appConfig.STORAGE_DRIVER === "memory") {
      const memMsg =
        'Startup validation failed: STORAGE_DRIVER="memory" is not allowed when NODE_ENV="production".';
      console.error(`[@Splittel] ${memMsg}`);
      throw new Error(memMsg);
    }
    if (!appConfig.R2_ENDPOINT.trim() && !appConfig.R2_ACCOUNT_ID.trim()) {
      warnings.push(
        "R2_ENDPOINT / R2_ACCOUNT_ID not set — verify S3-compatible endpoint configuration for R2 bucket uploads."
      );
    }
    if (!appConfig.R2_PUBLIC_BASE_URL.trim()) {
      warnings.push(
        "R2_PUBLIC_BASE_URL not set — uploaded receipts will use internal S3 path unless a public R2 domain is configured."
      );
    }
  } else if (!r2Configured) {
    warnings.push(
      "R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY not set — receipt images will be processed transiently in memory without R2 upload."
    );
  }

  if (!geminiVisionConfigured) {
    warnings.push(
      "GEMINI_API_KEY not set — Gemini 2.0 Flash Vision fallback is disabled; using local Tesseract LSTM OCR only."
    );
  }

  if (
    appConfig.R2_ENDPOINT &&
    !/^https?:\/\/.+/i.test(appConfig.R2_ENDPOINT)
  ) {
    throw new Error("R2_ENDPOINT must be a valid HTTP/HTTPS URL when provided.");
  }

  if (!jwtSecretIsolated) {
    throw new Error("JWT_SECRET must be at least 16 characters.");
  }

  return {
    valid: databaseConfigured && redisConfigured && jwtSecretIsolated,
    storageDriver: appConfig.STORAGE_DRIVER,
    databaseConfigured,
    redisConfigured,
    r2Configured,
    geminiVisionConfigured,
    jwtSecretIsolated,
    warnings,
  };
}

export function loadConfig(overrides: Partial<Record<string, string>> = {}): AppConfig {
  const merged: Record<string, string | undefined> = {
    ...process.env,
    ...overrides,
  };

  // Support GOOGLE_API_KEY alias for GEMINI_API_KEY
  if (!merged.GEMINI_API_KEY && merged.GOOGLE_API_KEY) {
    merged.GEMINI_API_KEY = merged.GOOGLE_API_KEY;
  }

  // Synchronize JWT_SECRET <-> OAUTH_JWT_SECRET so either variable sets signing secret
  if (merged.JWT_SECRET && !overrides.OAUTH_JWT_SECRET && !process.env.OAUTH_JWT_SECRET) {
    merged.OAUTH_JWT_SECRET = merged.JWT_SECRET;
  } else if (merged.OAUTH_JWT_SECRET && !merged.JWT_SECRET) {
    merged.JWT_SECRET = merged.OAUTH_JWT_SECRET;
  }

  // Auto-derive Cloudflare R2 endpoint when R2_ACCOUNT_ID is supplied (supports raw ID or full URL)
  if (merged.R2_ACCOUNT_ID) {
    const rawAccount = merged.R2_ACCOUNT_ID.trim();
    if (/^https?:\/\//i.test(rawAccount)) {
      const originMatch = rawAccount.match(/^(https?:\/\/[^/]+)/i);
      if (!merged.R2_ENDPOINT && originMatch?.[1]) {
        merged.R2_ENDPOINT = originMatch[1];
      }
      const idMatch = rawAccount.match(/^https?:\/\/([^./]+)\.r2\.cloudflarestorage\.com/i);
      if (idMatch?.[1]) {
        merged.R2_ACCOUNT_ID = idMatch[1];
      }
    } else if (!merged.R2_ENDPOINT) {
      merged.R2_ENDPOINT = `https://${rawAccount}.r2.cloudflarestorage.com`;
    }
  }

  // Support R2_PUBLIC_DOMAIN / R2_PUBLIC_URL aliases and normalize missing https:// scheme
  const rawR2Public = (
    merged.R2_PUBLIC_BASE_URL ||
    merged.R2_PUBLIC_DOMAIN ||
    merged.R2_PUBLIC_URL ||
    ""
  ).trim();
  if (rawR2Public) {
    merged.R2_PUBLIC_BASE_URL = (
      /^https?:\/\//i.test(rawR2Public) ? rawR2Public : `https://${rawR2Public}`
    ).replace(/\/+$/, "");
  }

  // Auto-detect cloud platform HTTPS URL on Railway / Render when PUBLIC_BASE_URL is not explicitly set
  if (!merged.PUBLIC_BASE_URL) {
    if (merged.RENDER_EXTERNAL_URL) {
      merged.PUBLIC_BASE_URL = merged.RENDER_EXTERNAL_URL.replace(/\/+$/, "");
    } else if (merged.RAILWAY_PUBLIC_DOMAIN) {
      merged.PUBLIC_BASE_URL = `https://${merged.RAILWAY_PUBLIC_DOMAIN.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
    }
  }

  if (merged.PUBLIC_BASE_URL) {
    const cleanPublic = merged.PUBLIC_BASE_URL.replace(/\/+$/, "");
    if (!merged.OAUTH_ISSUER_URL) {
      merged.OAUTH_ISSUER_URL = cleanPublic;
    }
    if (!merged.OAUTH_AUDIENCE) {
      merged.OAUTH_AUDIENCE = `${cleanPublic}/mcp`;
    }
  }

  const effectiveNodeEnv = (merged.NODE_ENV || "development").trim();
  const effectiveStorageDriver = (merged.STORAGE_DRIVER || "auto").trim();
  if (
    (effectiveNodeEnv === "production" || effectiveStorageDriver === "r2") &&
    !merged.DATABASE_URL?.trim()
  ) {
    throw new Error(
      `Startup validation failed (${
        effectiveNodeEnv === "production"
          ? 'NODE_ENV="production"'
          : 'STORAGE_DRIVER="r2"'
      }): missing required environment variables: DATABASE_URL`
    );
  }

  const parsed = EnvSchema.parse(merged);
  validateStartupEnv(parsed);
  return parsed;
}

export const config: AppConfig = loadConfig();
