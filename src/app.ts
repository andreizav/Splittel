import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import {
  getOAuthProtectedResourceMetadataUrl,
  mcpAuthRouter,
} from "@modelcontextprotocol/sdk/server/auth/router.js";
import { validateStartupEnv, type AppConfig } from "./config/env.js";
import { LedgerStore } from "./store/ledgerStore.js";
import {
  anonymizeReceiptForIndex,
  piiAnonymizationMiddleware,
} from "./domain/anonymizer.js";
import { parseAndSplitBill } from "./domain/billSplitter.js";
import {
  parseReceiptText,
  recognizeReceiptImage,
  shutdownOcrWorkers,
} from "./domain/receiptParser.js";
import { foodPriceTracker } from "./domain/foodPriceTracker.js";
import {
  SPLITTEL_SCOPES,
  SplittelOAuthProvider,
} from "./auth/oauthProvider.js";
import {
  createMcpBearerGate,
  requireAccountLinking,
} from "./auth/middleware.js";
import {
  SPLITTEL_APP_DESCRIPTION,
  SPLITTEL_APP_HANDLE,
  SPLITTEL_APP_NAME,
  SPLITTEL_CATEGORY,
  SPLITTEL_SERVER_INSTRUCTIONS,
  SPLITTEL_UI_RESOURCE_URI,
} from "./mcp/server.js";
import { McpTransportManager } from "./mcp/transportManager.js";
import { R2ReceiptStorageAdapter } from "./storage/r2Adapter.js";
import { RedisBillSync } from "./storage/redisSync.js";
import { renderBillBoardHtml } from "./ui/billBoardTemplate.js";

export interface SplittelRuntime {
  app: Express;
  store: LedgerStore;
  redisSync: RedisBillSync;
  r2Storage: R2ReceiptStorageAdapter;
  oauthProvider: SplittelOAuthProvider;
  transportManager: McpTransportManager;
  shutdown: () => Promise<void>;
}

export const RECEIPT_SCAN_RATE_LIMIT_MESSAGE = {
  error:
    "Rate limit exceeded. You can scan up to 5 receipts per minute. Please try again in a moment.",
};

/**
 * Resolves the real client IP behind Railway / Cloud Run edge proxies.
 * Railway's edge sets `X-Real-IP` to the true client address, while `req.ip`
 * (with `trust proxy = 1`) may resolve to a rotating internal hop address.
 */
export function resolveClientIp(req: Request): string {
  const realIpHeader = req.headers["x-real-ip"];
  const realIp = (Array.isArray(realIpHeader) ? realIpHeader[0] : realIpHeader)
    ?.trim();
  if (realIp) return realIp;
  return req.ip ?? req.socket.remoteAddress ?? "127.0.0.1";
}

/**
 * Factory for dedicated receipt scanning rate-limiter (per authenticated user or IPv6-safe client IP).
 */
export function createReceiptScanLimiter(maxScansPerMinute = 5) {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: maxScansPerMinute, // Strict cap: Maximum 5 receipt scans per minute per IP/User
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      const userSub =
        typeof req.auth?.extra?.sub === "string" && req.auth.extra.sub
          ? req.auth.extra.sub
          : null;
      return userSub
        ? `user:${userSub}`
        : `ip:${ipKeyGenerator(resolveClientIp(req))}`;
    },
    message: RECEIPT_SCAN_RATE_LIMIT_MESSAGE,
  });
}

export const receiptScanLimiter = createReceiptScanLimiter(5);

/**
 * Detects whether a JSON-RPC 2.0 MCP payload invokes receipt scanning / image OCR.
 */
export function isMcpReceiptScanRequest(body: unknown): boolean {
  const entries = Array.isArray(body) ? body : [body];
  return entries.some((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const msg = entry as {
      method?: unknown;
      params?: { name?: unknown; arguments?: Record<string, unknown> };
    };
    if (msg.method !== "tools/call") return false;
    const toolName = typeof msg.params?.name === "string" ? msg.params.name : "";
    const args = msg.params?.arguments ?? {};
    if (toolName === "scan_receipt") return true;
    if (
      toolName === "parse_and_split_bill" &&
      (Boolean(args.image_url) ||
        Boolean(args.image_base64) ||
        Boolean(args.ocr_text))
    ) {
      return true;
    }
    return false;
  });
}

/**
 * Validates whether a browser `Origin` is authorized for cross-origin iframe / MCP calls:
 * Allows `https://*.google.com`, `https://*.gemini.google.com`, `cleanBaseUrl`,
 * sandboxed `Origin: null` iframes, and localhost in dev/test.
 */
export function isAllowedCorsOrigin(
  origin: string | undefined,
  cleanBaseUrl: string,
  nodeEnv: AppConfig["NODE_ENV"]
): boolean {
  // Server-to-server MCP calls, curl, Supertest, or sandboxed `allow-scripts` iframes
  if (!origin || origin === "null") {
    return true;
  }

  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    return false;
  }

  // Exact match with our own public base URL origin
  try {
    const selfOrigin = new URL(cleanBaseUrl).origin;
    if (parsedOrigin.origin === selfOrigin) {
      return true;
    }
  } catch {
    // Ignore malformed base URL
  }

  const host = parsedOrigin.hostname.toLowerCase();

  // Official Google & Gemini hosts (`https://*.google.com`, `https://*.gemini.google.com`)
  if (
    parsedOrigin.protocol === "https:" &&
    (host === "google.com" ||
      host.endsWith(".google.com") ||
      host === "gemini.google.com" ||
      host.endsWith(".gemini.google.com"))
  ) {
    return true;
  }

  // Local development & test origins
  if (
    nodeEnv !== "production" &&
    (host === "localhost" || host === "127.0.0.1" || host === "[::1]")
  ) {
    return true;
  }

  return false;
}

export function assertStrictProductionEnv(appConfig: AppConfig): void {
  if (
    appConfig.STORAGE_DRIVER === "r2" ||
    appConfig.NODE_ENV === "production"
  ) {
    const missingVars: string[] = [];
    if (
      !appConfig.DATABASE_URL?.trim() ||
      !/^postgres(?:ql)?:\/\/.+/i.test(appConfig.DATABASE_URL.trim())
    ) {
      missingVars.push("DATABASE_URL");
    }
    if (!appConfig.R2_ACCESS_KEY_ID?.trim()) {
      missingVars.push("R2_ACCESS_KEY_ID");
    }
    if (!appConfig.R2_SECRET_ACCESS_KEY?.trim()) {
      missingVars.push("R2_SECRET_ACCESS_KEY");
    }
    if (missingVars.length > 0) {
      throw new Error(
        `Strict production startup error (${
          appConfig.NODE_ENV === "production"
            ? 'NODE_ENV="production"'
            : 'STORAGE_DRIVER="r2"'
        }): missing required environment variables: ${missingVars.join(", ")}`
      );
    }
    if (
      appConfig.NODE_ENV === "production" &&
      appConfig.STORAGE_DRIVER === "memory"
    ) {
      throw new Error(
        'Strict production startup error: STORAGE_DRIVER="memory" is forbidden when NODE_ENV="production".'
      );
    }
  }
}

export async function createSplittelRuntime(
  appConfig: AppConfig
): Promise<SplittelRuntime> {
  // 1. Validate enterprise environment & strict production/R2 config at startup
  assertStrictProductionEnv(appConfig);
  const envReport = validateStartupEnv(appConfig);
  if (appConfig.NODE_ENV !== "test" && envReport.warnings.length > 0) {
    for (const warning of envReport.warnings) {
      console.warn(`[@Splittel] Startup diagnostic: ${warning}`);
    }
  }

  const app = express();
  const cleanBaseUrl = appConfig.PUBLIC_BASE_URL.replace(/\/+$/, "");

  if (appConfig.TRUST_PROXY) {
    app.set("trust proxy", 1);
  }

  if (appConfig.NODE_ENV === "production") {
    app.use((req, res, next) => {
      if (req.path === "/health") {
        next();
        return;
      }
      const proto = req.headers["x-forwarded-proto"];
      const isSecure = req.secure || proto === "https";
      if (!isSecure) {
        res.status(403).json({
          error: "https_required",
          error_description: "@Splittel Remote MCP Server requires HTTPS.",
        });
        return;
      }
      next();
    });
  }

  // 2. CSP & Framing tuned for Gemini & Google Search AI Mode sandboxed iframes + R2 CDN images
  app.use(
    helmet({
      frameguard: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", cleanBaseUrl],
          frameAncestors: [
            "'self'",
            "https://*.google.com",
            "https://*.gemini.google.com",
            "https://gemini.google.com",
            "https://www.google.com",
            "http://localhost:*",
            "https://localhost:*",
          ],
        },
      },
    })
  );

  // 3. Strict CORS Policy for Google Connected Apps (`*.google.com`, `*.gemini.google.com`)
  app.use(
    cors({
      origin: (origin, callback) => {
        if (isAllowedCorsOrigin(origin, cleanBaseUrl, appConfig.NODE_ENV)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Accept",
        "Authorization",
        "Mcp-Session-Id",
        "Mcp-Protocol-Version",
        "Last-Event-ID",
        "X-Splittel-UI-Token",
      ],
      exposedHeaders: [
        "Mcp-Session-Id",
        "Mcp-Protocol-Version",
        "WWW-Authenticate",
        "RateLimit-Limit",
        "RateLimit-Remaining",
        "RateLimit-Reset",
      ],
    })
  );

  // 4. Rate Limiting: max 60 requests/minute per IP on `/mcp` and `/ui/bill-board`
  const mcpAndWidgetLimiter = rateLimit({
    windowMs: appConfig.RATE_LIMIT_WINDOW_MS,
    limit: appConfig.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    keyGenerator: (req) => ipKeyGenerator(resolveClientIp(req)),
    message: {
      error: "rate_limit_exceeded",
      error_description:
        "Too many requests from this IP. Maximum 60 requests per minute allowed.",
    },
  });

  app.use("/mcp", mcpAndWidgetLimiter);
  app.use("/ui/bill-board", mcpAndWidgetLimiter);

  // Strict per-IP/User Receipt Scan Limiter (5 scans/minute default)
  const runtimeReceiptScanLimiter = createReceiptScanLimiter(
    appConfig.RECEIPT_SCAN_RATE_LIMIT_MAX
  );
  const mcpOcrScanRateGate = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (isMcpReceiptScanRequest(req.body)) {
      runtimeReceiptScanLimiter(req, res, next);
      return;
    }
    next();
  };

  // 5. Initialize Redis Sync, Cloudflare R2 Adapter & PostgreSQL/PostGIS Store
  const redisSync = new RedisBillSync({
    redisUrl: appConfig.REDIS_URL,
    enabled: appConfig.STORAGE_DRIVER !== "memory",
  });
  await redisSync.initialize();

  const r2Storage = new R2ReceiptStorageAdapter({
    accountId: appConfig.R2_ACCOUNT_ID,
    endpoint: appConfig.R2_ENDPOINT,
    bucketName: appConfig.R2_BUCKET_NAME,
    accessKeyId: appConfig.R2_ACCESS_KEY_ID,
    secretAccessKey: appConfig.R2_SECRET_ACCESS_KEY,
    publicBaseUrl: appConfig.R2_PUBLIC_BASE_URL,
  });

  const store = new LedgerStore({
    databaseUrl: appConfig.DATABASE_URL,
    driver: appConfig.STORAGE_DRIVER,
    strict:
      appConfig.NODE_ENV === "production" ||
      appConfig.STORAGE_DRIVER === "r2" ||
      appConfig.STORAGE_DRIVER === "postgres",
    publicBaseUrl: cleanBaseUrl,
    redisSync,
  });
  await store.initialize();

  const oauthProvider = new SplittelOAuthProvider({
    issuerUrl: appConfig.OAUTH_ISSUER_URL,
    audience: appConfig.OAUTH_AUDIENCE,
    jwtSecret: appConfig.JWT_SECRET,
    uiActionSecret: appConfig.UI_ACTION_SECRET,
    jwksUri: appConfig.OAUTH_JWKS_URI || undefined,
  });

  const issuerUrl = new URL(appConfig.OAUTH_ISSUER_URL);
  const resourceServerUrl = new URL(`${cleanBaseUrl}/mcp`);
  const resourceMetadataUrl =
    getOAuthProtectedResourceMetadataUrl(resourceServerUrl);

  // Mount standard MCP OAuth 2.1 Authorization + Discovery Router at root
  app.use(
    mcpAuthRouter({
      provider: oauthProvider,
      issuerUrl,
      baseUrl: new URL(cleanBaseUrl),
      resourceServerUrl,
      resourceName: "Splittel (@Splittel) Remote MCP Server",
      scopesSupported: [...SPLITTEL_SCOPES],
      serviceDocumentationUrl: new URL(`${cleanBaseUrl}/.well-known/mcp.json`),
    })
  );

  app.get("/.well-known/oauth-protected-resource", (_req, res) => {
    res.json({
      resource: resourceServerUrl.href,
      authorization_servers: [issuerUrl.href],
      scopes_supported: [...SPLITTEL_SCOPES],
      bearer_methods_supported: ["header"],
      resource_name: "Splittel (@Splittel) Remote MCP Server",
      resource_documentation: `${cleanBaseUrl}/.well-known/mcp.json`,
      google_auth_platform: {
        use_this_client_for_an_ai_powered_agent: true,
      },
    });
  });

  // Google Connected Apps & Remote MCP Discovery Manifest
  app.get("/.well-known/mcp.json", (_req, res) => {
    res.json({
      name: SPLITTEL_APP_NAME,
      handle: SPLITTEL_APP_HANDLE,
      category: SPLITTEL_CATEGORY,
      description: SPLITTEL_APP_DESCRIPTION,
      version: "1.0.0",
      instructions: SPLITTEL_SERVER_INSTRUCTIONS,
      primary_integration_route: "Remote MCP Server (HTTPS / SSE)",
      endpoints: {
        mcp_streamable_http: `${cleanBaseUrl}/mcp`,
        mcp_sse: `${cleanBaseUrl}/sse`,
        mcp_sse_messages: `${cleanBaseUrl}/messages`,
        ui_bill_board: `${cleanBaseUrl}/ui/bill-board`,
        oauth_protected_resource: resourceMetadataUrl,
        oauth_authorization_server: `${cleanBaseUrl}/.well-known/oauth-authorization-server`,
        oidc_userinfo: `${cleanBaseUrl}/userinfo`,
        terms_of_service: `${cleanBaseUrl}/terms`,
        privacy_policy: `${cleanBaseUrl}/privacy`,
      },
      authentication: {
        protocol: "OAuth 2.1 Authorization Code Flow with PKCE",
        scopes: [...SPLITTEL_SCOPES],
        free_tier_zero_auth_tools: [
          "parse_and_split_bill",
          "calculate_group_balance",
          "generate_payment_card",
          "get_food_price_index",
        ],
        account_linking_required_tools: ["settle_up_action"],
        use_this_client_for_an_ai_powered_agent: true,
      },
      ui_resources: [SPLITTEL_UI_RESOURCE_URI],
      tools: [
        {
          name: "parse_and_split_bill",
          readOnlyHint: true,
          authRequired: false,
          uiResourceUri: SPLITTEL_UI_RESOURCE_URI,
        },
        {
          name: "calculate_group_balance",
          readOnlyHint: true,
          authRequired: false,
        },
        {
          name: "generate_payment_card",
          readOnlyHint: true,
          authRequired: false,
        },
        {
          name: "get_food_price_index",
          readOnlyHint: true,
          authRequired: false,
        },
        {
          name: "settle_up_action",
          destructiveHint: true,
          authRequired: true,
        },
      ],
    });
  });

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // ===========================================================================
  // REMOTE MCP PROTOCOL ENDPOINTS (Zero-Auth Free Tier + Account Linking Gate)
  // ===========================================================================
  const transportManager = new McpTransportManager({
    store,
    oauthProvider,
    publicBaseUrl: cleanBaseUrl,
  });

  const bearerGate = createMcpBearerGate({
    verifier: oauthProvider,
    resourceMetadataUrl,
    enforceOnAllMcp: appConfig.OAUTH_ENFORCE_ON_ALL_MCP,
    protectedToolNames: ["settle_up_action"],
    requiredScopes: [...SPLITTEL_SCOPES],
  });

  app.post(
    "/mcp",
    bearerGate,
    mcpOcrScanRateGate,
    async (req: Request, res: Response) => {
      try {
        await transportManager.handlePostMcp(req, res);
      } catch (error) {
        if (!res.headersSent) {
          res.status(500).json({
            jsonrpc: "2.0",
            error: {
              code: -32603,
              message:
                error instanceof Error ? error.message : "Internal MCP error",
            },
            id: null,
          });
        }
      }
    }
  );

  app.get("/mcp", bearerGate, async (req: Request, res: Response) => {
    await transportManager.handleGetMcp(req, res);
  });

  app.delete("/mcp", bearerGate, async (req: Request, res: Response) => {
    await transportManager.handleDeleteMcp(req, res);
  });

  app.get("/sse", bearerGate, async (req: Request, res: Response) => {
    await transportManager.handleLegacySseConnect(req, res);
  });

  app.post(
    "/messages",
    bearerGate,
    mcpOcrScanRateGate,
    async (req: Request, res: Response) => {
      await transportManager.handleLegacySseMessage(req, res);
    }
  );

  // ===========================================================================
  // OIDC & ACCOUNT-LINKED ENDPOINTS (History & SBP/Stripe Personal Payment Setup)
  // ===========================================================================
  const accountAuth = requireAccountLinking({
    verifier: oauthProvider,
    resourceMetadataUrl,
  });

  app.get("/userinfo", accountAuth, (req: Request, res: Response) => {
    const sub =
      typeof req.auth?.extra?.sub === "string"
        ? req.auth.extra.sub
        : req.auth?.clientId ?? "user";
    res.json({
      sub,
      name: req.auth?.extra?.name ?? "Splittel User",
      email: req.auth?.extra?.email ?? `${sub}@users.splittel.app`,
      email_verified: true,
    });
  });

  app.get(
    "/api/account/history",
    accountAuth,
    async (req: Request, res: Response) => {
      const sub =
        typeof req.auth?.extra?.sub === "string"
          ? req.auth.extra.sub
          : req.auth!.clientId;
      const bills = await store.getUserHistory(sub);
      res.json({ sub, count: bills.length, bills });
    }
  );

  app.post(
    "/api/account/history",
    accountAuth,
    async (req: Request, res: Response) => {
      const sub =
        typeof req.auth?.extra?.sub === "string"
          ? req.auth.extra.sub
          : req.auth!.clientId;
      const { bill_id } = (req.body ?? {}) as { bill_id?: string };
      if (!bill_id) {
        res.status(400).json({ error: "bill_id is required" });
        return;
      }
      const bill = await store.attachBillToUserHistory(bill_id, sub);
      if (!bill) {
        res.status(404).json({ error: "bill_not_found" });
        return;
      }
      res.json({ saved: true, bill });
    }
  );

  app.get(
    "/api/account/payment-profile",
    accountAuth,
    async (req: Request, res: Response) => {
      const sub =
        typeof req.auth?.extra?.sub === "string"
          ? req.auth.extra.sub
          : req.auth!.clientId;
      const profile = await store.getPaymentProfile(sub);
      res.json({
        profile: profile ?? {
          sub,
          sbp_phone: null,
          sbp_bank: null,
          stripe_payment_link: null,
        },
      });
    }
  );

  app.put(
    "/api/account/payment-profile",
    accountAuth,
    async (req: Request, res: Response) => {
      const sub =
        typeof req.auth?.extra?.sub === "string"
          ? req.auth.extra.sub
          : req.auth!.clientId;
      const body = (req.body ?? {}) as {
        display_name?: string;
        sbp_phone?: string;
        sbp_bank?: string;
        stripe_payment_link?: string;
      };
      const saved = await store.savePaymentProfile({
        sub,
        display_name: body.display_name,
        sbp_phone: body.sbp_phone,
        sbp_bank: body.sbp_bank,
        stripe_payment_link: body.stripe_payment_link,
        updated_at: new Date().toISOString(),
      });
      res.json({ saved: true, profile: saved });
    }
  );

  // ===========================================================================
  // SANDBOXED IFRAME & SHARED GROUP LINK (`GET /ui/bill-board`)
  // ===========================================================================
  app.get("/ui/bill-board", async (req: Request, res: Response) => {
    const billId =
      typeof req.query.bill_id === "string" && req.query.bill_id.trim()
        ? req.query.bill_id.trim()
        : undefined;
    const rawTheme =
      typeof req.query.theme === "string" ? req.query.theme : undefined;
    const initialTheme =
      rawTheme === "dark" || rawTheme === "light" ? rawTheme : undefined;

    const bill = billId
      ? await store.getBill(billId)
      : (await store.getBill()) ?? null;

    if (billId && !bill) {
      res.status(404).type("text/plain").send("Bill not found.");
      return;
    }

    const uiActionToken = bill
      ? oauthProvider.signUiActionToken(bill.bill_id)
      : "";
    const html = renderBillBoardHtml({
      bill: bill ?? null,
      uiActionToken,
      apiBaseUrl: cleanBaseUrl,
      initialTheme,
    });

    res.setHeader("Cache-Control", "no-store");
    res.type("html").send(html);
  });

  // ===========================================================================
  // RECEIPT PHOTO UPLOAD (R2), PII ANONYMIZATION & DIRECT BILL CREATION
  // ===========================================================================
  const recordAnonymizedReceiptPrices = (
    parsed: ReturnType<typeof parseReceiptText>,
    hintCurrency: string,
    geoLocation?: { lat?: number; lng?: number } | null
  ): void => {
    if (parsed.items.length === 0) return;
    const sanitized = anonymizeReceiptForIndex({
      restaurant_name: parsed.title,
      geo_location: geoLocation ?? null,
      currency: parsed.detectedCurrency || hintCurrency,
      items: parsed.items,
    });
    if (sanitized.length > 0) {
      foodPriceTracker.recordReceipt({
        id: `rcpt_${Date.now()}`,
        restaurant_name: sanitized[0]?.restaurant_name ?? undefined,
        currency: parsed.detectedCurrency || hintCurrency,
        items: sanitized.map((s) => ({
          item_name: s.item_name_clean,
          price: Number(s.price_cents) / 100,
          category: s.category,
        })),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleReceiptScanAndParse = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {
        image_base64,
        image_url,
        text,
        client_ocr_text,
        client_ocr_confidence,
        geo_location,
        currency_hint,
        languages,
      } = (req.body ?? {}) as {
        image_base64?: string;
        image_url?: string;
        text?: string;
        client_ocr_text?: string;
        client_ocr_confidence?: number;
        geo_location?: { lat?: number; lng?: number };
        currency_hint?: string;
        languages?: string;
      };

      const hintCurrency =
        typeof currency_hint === "string" && currency_hint.trim().length === 3
          ? currency_hint.trim().toUpperCase()
          : "RUB";

      // 1. Plain-text receipt parsing
      if (text && typeof text === "string" && text.trim().length > 0) {
        const parsed = parseReceiptText(text, hintCurrency);
        recordAnonymizedReceiptPrices(parsed, hintCurrency, geo_location);
        res.json({
          success: true,
          parsed,
          image_url: null,
          fallback_manual_entry: Boolean(parsed.fallbackManualEntry),
        });
        return;
      }

      // 2. Receipt photo upload -> Cloudflare R2 + Multilingual OCR + Gemini 2.0 Flash Vision Fallback
      if (image_base64 && typeof image_base64 === "string") {
        const { buffer, upload } = await r2Storage.uploadBase64Receipt(
          image_base64
        );
        const r2Url =
          upload.imageUrl ??
          (typeof image_url === "string" && /^https?:\/\//i.test(image_url)
            ? image_url
            : null);

        const parsed = await recognizeReceiptImage(buffer, {
          currencyHint: hintCurrency,
          imageUrl: r2Url,
          clientOcrConfidence:
            typeof client_ocr_confidence === "number" &&
            Number.isFinite(client_ocr_confidence)
              ? client_ocr_confidence
              : undefined,
          clientOcrText:
            typeof client_ocr_text === "string" && client_ocr_text.trim()
              ? client_ocr_text.trim()
              : undefined,
          geminiApiKey: appConfig.GEMINI_API_KEY,
          ...(typeof languages === "string" && languages.trim()
            ? { languages: languages.trim() }
            : {}),
        });

        recordAnonymizedReceiptPrices(parsed, hintCurrency, geo_location);

        res.json({
          success: true,
          parsed,
          image_url: r2Url,
          r2_uploaded: upload.uploaded,
          fallback_manual_entry: Boolean(parsed.fallbackManualEntry),
        });
        return;
      }

      // 3. Direct Cloudflare R2 / HTTPS image URL scan (Vision fallback)
      if (
        image_url &&
        typeof image_url === "string" &&
        /^https?:\/\//i.test(image_url)
      ) {
        const parsed = await recognizeReceiptImage(Buffer.alloc(0), {
          currencyHint: hintCurrency,
          imageUrl: image_url,
          geminiApiKey: appConfig.GEMINI_API_KEY,
        });
        recordAnonymizedReceiptPrices(parsed, hintCurrency, geo_location);
        res.json({
          success: true,
          parsed,
          image_url,
          r2_uploaded: false,
          fallback_manual_entry: Boolean(parsed.fallbackManualEntry),
        });
        return;
      }

      res
        .status(400)
        .json({ error: "image_base64, image_url, or text is required" });
    } catch {
      // Graceful fallback on corrupted image payloads so the UI session never crashes
      res.status(200).json({
        success: true,
        parsed: {
          title: undefined,
          rawText: "",
          items: [],
          taxAmount: 0,
          ocrEngine: "fallback-manual",
          ocrFailed: true,
          fallbackManualEntry: true,
          fallbackReason:
            "Unable to decode receipt image automatically. Manual item entry is enabled.",
        },
        image_url: null,
        r2_uploaded: false,
        fallback_manual_entry: true,
      });
    }
  };

  app.post(
    "/api/receipts/scan",
    runtimeReceiptScanLimiter,
    piiAnonymizationMiddleware,
    handleReceiptScanAndParse
  );

  app.post(
    "/api/receipts/parse",
    runtimeReceiptScanLimiter,
    piiAnonymizationMiddleware,
    handleReceiptScanAndParse
  );

  app.post(
    "/api/bills/new",
    piiAnonymizationMiddleware,
    async (req: Request, res: Response) => {
      try {
        const {
          title,
          currency,
          settlement_currency,
          exchange_rate,
          tip_percentage,
          tax_amount,
          people,
          raw_items,
          assignments,
          image_url,
          image_base64,
          geo_location,
        } = (req.body ?? {}) as {
          title?: string;
          currency?: string;
          settlement_currency?: string;
          exchange_rate?: number;
          tip_percentage?: number;
          tax_amount?: number;
          people?: string[];
          raw_items?: Array<{
            item_name: string;
            price: number;
            quantity?: number;
          }>;
          assignments?: Record<string, string[]>;
          image_url?: string | null;
          image_base64?: string;
          geo_location?: { lat?: number; lng?: number } | null;
        };

        if (!people || !Array.isArray(people) || people.length === 0) {
          res.status(400).json({ error: "people array is required" });
          return;
        }

        if (!raw_items || !Array.isArray(raw_items) || raw_items.length === 0) {
          res.status(400).json({ error: "raw_items array is required" });
          return;
        }

        // Upload image to R2 if raw base64 was supplied directly; never store base64 in PostgreSQL
        let resolvedImageUrl: string | null =
          typeof image_url === "string" && /^https?:\/\//i.test(image_url)
            ? image_url
            : null;
        if (!resolvedImageUrl && image_base64 && typeof image_base64 === "string") {
          const { upload } = await r2Storage.uploadBase64Receipt(image_base64);
          resolvedImageUrl = upload.imageUrl;
        }

        const nearbyBenchmarks =
          geo_location &&
          typeof geo_location.lat === "number" &&
          typeof geo_location.lng === "number"
            ? await store.queryNearbyBenchmarks({
                lat: geo_location.lat,
                lng: geo_location.lng,
                currency: currency ?? "RUB",
                items: raw_items,
                excludeRestaurantName: title,
              })
            : undefined;

        const bill = await parseAndSplitBill({
          title,
          currency: currency ?? "RUB",
          settlement_currency,
          exchange_rate,
          tip_percentage: tip_percentage ?? 10,
          tax_amount: tax_amount ?? 0,
          baseUrl: cleanBaseUrl,
          people,
          raw_items,
          assignments,
          image_url: resolvedImageUrl,
          geo_location: geo_location ?? null,
          nearbyBenchmarks,
        });

        await store.saveBill(bill);
        const uiActionToken = oauthProvider.signUiActionToken(bill.bill_id);

        res.json({ success: true, bill, uiActionToken });
      } catch (err) {
        res.status(400).json({
          error: "create_failed",
          message: err instanceof Error ? err.message : "Failed to create bill",
        });
      }
    }
  );

  // ===========================================================================
  // REALTIME REDIS SYNC: STATE MUTATION + LIVE PUB/SUB SSE STREAM
  // ===========================================================================
  app.patch("/api/bills/:billId/state", async (req: Request, res: Response) => {
    const rawBillId = req.params.billId;
    const billId = Array.isArray(rawBillId) ? rawBillId[0] ?? "" : rawBillId ?? "";
    const {
      assignments,
      tip_percentage,
      currency,
      settlement_currency,
      exchange_rate,
    } = (req.body ?? {}) as {
      assignments?: Record<string, string[]>;
      tip_percentage?: number;
      currency?: string;
      settlement_currency?: string;
      exchange_rate?: number;
    };

    if (
      tip_percentage !== undefined &&
      (typeof tip_percentage !== "number" ||
        tip_percentage < 0 ||
        tip_percentage > 100)
    ) {
      res.status(400).json({ error: "tip_percentage must be between 0 and 100" });
      return;
    }

    const updated = await store.updateBillInteractiveState(billId, {
      assignments,
      tip_percentage,
      currency,
      settlement_currency,
      exchange_rate,
    });

    if (!updated) {
      res.status(404).json({ error: "bill_not_found" });
      return;
    }

    res.json({ bill: updated });
  });

  // Realtime Server-Sent Events stream backed by Redis Pub/Sub (`splittel:bill:updates:{billId}`)
  app.get("/api/bills/:billId/events", async (req: Request, res: Response) => {
    const rawBillId = req.params.billId;
    const billId = Array.isArray(rawBillId) ? rawBillId[0] ?? "" : rawBillId ?? "";
    const existing = await store.getBill(billId);
    if (!existing) {
      res.status(404).json({ error: "bill_not_found" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    res.write(
      `event: connected\ndata: ${JSON.stringify({ bill_id: billId, sync: redisSync.getStatus() })}\n\n`
    );

    const unsubscribe = redisSync.subscribeToBill(billId, (updateEvent) => {
      if (!res.writableEnded) {
        res.write(`event: bill_update\ndata: ${JSON.stringify(updateEvent)}\n\n`);
      }
    });

    const heartbeat = setInterval(() => {
      if (!res.writableEnded) {
        res.write(": ping\n\n");
      }
    }, 25_000);
    heartbeat.unref();

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
    });
  });

  // CPA Partner Link & Tracking Endpoint
  app.get("/r/partner-offer", (req: Request, res: Response) => {
    const rawCode = req.query.code;
    const rawPartner = req.query.partner;
    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const code = escapeHtml(
      Array.isArray(rawCode)
        ? String(rawCode[0] ?? "SPLITTEL")
        : String(rawCode ?? "SPLITTEL")
    );
    const partner = escapeHtml(
      Array.isArray(rawPartner)
        ? String(rawPartner[0] ?? "Partner Restaurant")
        : String(rawPartner ?? "Partner Restaurant")
    );

    res.send(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Партнерский оффер — ${partner}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; padding: 1rem; }
    .card { max-width: 26rem; width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 1rem; padding: 1.5rem; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    .badge { display: inline-block; padding: 0.25rem 0.75rem; background: rgba(16,185,129,0.15); color: #34d399; font-weight: 700; border-radius: 9999px; font-size: 0.75rem; margin-bottom: 0.75rem; }
    .code-box { background: #0f172a; border: 1.5px dashed #10b981; padding: 0.75rem; border-radius: 0.75rem; font-family: monospace; font-size: 1.25rem; font-weight: 800; color: #34d399; letter-spacing: 0.1em; margin: 1rem 0; }
    .btn { display: block; width: 100%; padding: 0.75rem; background: #059669; color: white; border: none; border-radius: 0.75rem; font-weight: 700; cursor: pointer; text-decoration: none; box-sizing: border-box; }
    .btn:hover { background: #10b981; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">💡 Эксклюзивная скидка • CPA-партнер</div>
    <h1 style="margin: 0.25rem 0; font-size: 1.25rem;">${partner}</h1>
    <p style="font-size: 0.875rem; color: #94a3b8; margin: 0.5rem 0 1rem;">Скидка активирована для пользователей Splittel. Назовите промокод или покажите экран при бронировании столика:</p>
    <div class="code-box">${code}</div>
    <button class="btn" onclick="window.history.length > 1 ? window.history.back() : window.close();">← Вернуться к чеку</button>
  </div>
</body>
</html>`);
  });

  // Crowdsourced Food Price Index & Benchmark Analytics
  app.get("/api/analytics/food-price-index", (req: Request, res: Response) => {
    const rawCurrency = req.query.currency;
    const currencyStr = Array.isArray(rawCurrency)
      ? String(rawCurrency[0] ?? "")
      : typeof rawCurrency === "string"
        ? rawCurrency
        : undefined;

    if (currencyStr && currencyStr.trim().length > 0) {
      const cur = currencyStr.trim().toUpperCase();
      const index = foodPriceTracker.getFoodPriceIndex(cur);
      res.json({
        success: true,
        currency: cur,
        index,
      });
      return;
    }

    res.json({
      success: true,
      indexes: {
        ILS: foodPriceTracker.getFoodPriceIndex("ILS"),
        RUB: foodPriceTracker.getFoodPriceIndex("RUB"),
        USD: foodPriceTracker.getFoodPriceIndex("USD"),
        EUR: foodPriceTracker.getFoodPriceIndex("EUR"),
      },
    });
  });

  // Settlement toggle endpoint for standalone `/ui/bill-board` iframe fallback
  app.post("/api/ui/settle", async (req: Request, res: Response) => {
    const { bill_id, transaction_id, status } = (req.body ?? {}) as {
      bill_id?: string;
      transaction_id?: string;
      status?: "PAID" | "CANCELLED";
    };

    if (!transaction_id || typeof transaction_id !== "string") {
      res
        .status(400)
        .json({ error: "invalid_request", message: "transaction_id is required" });
      return;
    }

    if (status !== "PAID" && status !== "CANCELLED") {
      res.status(400).json({
        error: "invalid_status",
        message: "status must be 'PAID' or 'CANCELLED'",
      });
      return;
    }

    let actor = "ui_confirmed_user";
    const authHeader = req.headers.authorization;
    const uiTokenHeader = req.headers["x-splittel-ui-token"];
    const uiToken = Array.isArray(uiTokenHeader)
      ? uiTokenHeader[0]
      : uiTokenHeader;

    if (authHeader?.toLowerCase().startsWith("bearer ")) {
      try {
        const token = authHeader.slice(7).trim();
        const authInfo = await oauthProvider.verifyAccessToken(token);
        actor =
          typeof authInfo.extra?.sub === "string"
            ? authInfo.extra.sub
            : authInfo.clientId;
      } catch {
        res.status(401).json({ error: "invalid_token" });
        return;
      }
    } else if (
      bill_id &&
      uiToken &&
      oauthProvider.verifyUiActionToken(bill_id, uiToken)
    ) {
      const txn = await store.getTransaction(transaction_id);
      if (txn?.bill_id && txn.bill_id !== bill_id) {
        res.status(403).json({
          error: "forbidden",
          message: "Transaction does not belong to the authorized bill board.",
        });
        return;
      }
    } else {
      res.status(401).json({
        error: "unauthorized",
        message: "Valid Bearer token or X-Splittel-UI-Token required.",
      });
      return;
    }

    const result = await store.updateTransactionStatus(
      transaction_id,
      status,
      actor
    );
    res.json({
      committed: true,
      previous_status: result.previous_status,
      transaction: result.transaction,
      updated_bill: result.updated_bill,
    });
  });

  // Hosted SBP / Stripe Payment Card view (`GET /pay/:transactionId`)
  app.get("/pay/:transactionId", async (req: Request, res: Response) => {
    const rawId = req.params.transactionId;
    const transactionId = Array.isArray(rawId) ? rawId[0] ?? "" : rawId ?? "";
    const card = await store.getPaymentCard(transactionId);
    const txn = await store.getTransaction(transactionId);

    if (!card && !txn) {
      res.status(404).json({ error: "not_found", transaction_id: transactionId });
      return;
    }

    if (
      req.headers.accept?.includes("application/json") &&
      !req.headers.accept.includes("text/html")
    ) {
      res.json({ payment_card: card, transaction: txn });
      return;
    }

    const debtor = card?.debtor ?? txn?.debtor ?? "Debtor";
    const creditor = card?.creditor ?? txn?.creditor ?? "Creditor";
    const amount = (card?.amount ?? txn?.amount ?? 0).toFixed(2);
    const currency = card?.currency ?? txn?.currency ?? "RUB";
    const status = txn?.status ?? card?.status ?? "PENDING";

    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>@Splittel Payment Card — ${escapeHtml(debtor)} to ${escapeHtml(creditor)}</title>
  <style>
    :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
    body { margin: 0; min-height: 100dvh; display: grid; place-items: center; padding: 1.5rem; background: Canvas; color: CanvasText; }
    article { max-width: 24rem; width: 100%; border: 1px solid rgba(148,163,184,0.35); border-radius: 1.25rem; padding: 1.5rem; text-align: center; }
    .amt { font-size: 2rem; font-weight: 800; margin: 0.5rem 0; }
    .links { display: grid; gap: 0.5rem; margin-top: 1rem; }
    .links a { display: block; padding: 0.65rem 1rem; border-radius: 0.75rem; background: #059669; color: #fff; text-decoration: none; font-weight: 600; font-size: 0.875rem; }
    .links a.alt { background: #334155; }
    .qr { margin: 1rem auto; width: 160px; height: 160px; background: #fff; padding: 0.5rem; border-radius: 0.75rem; }
  </style>
</head>
<body>
  <article>
    <div style="font-size:0.75rem;font-weight:700;color:#059669;">@Splittel Payment Card (${escapeHtml(status)})</div>
    <h1 style="font-size:1.15rem;margin:0.5rem 0 0;">${escapeHtml(debtor)} → ${escapeHtml(creditor)}</h1>
    <div class="amt">${escapeHtml(currency)} ${escapeHtml(amount)}</div>
    ${card ? `<div class="qr"><img src="${card.qr_code_data_uri}" alt="SBP QR code for ${escapeHtml(debtor)} to ${escapeHtml(creditor)}" width="160" height="160"></div>` : ""}
    ${
      card
        ? `<div class="links">
            <a href="${escapeHtml(card.links.sbp_url)}" rel="noopener noreferrer">Pay via SBP (Быстрый перевод)</a>
            <a href="${escapeHtml(card.links.stripe_payment_url)}" class="alt" rel="noopener noreferrer">Pay via Stripe</a>
          </div>`
        : ""
    }
  </article>
</body>
</html>`);
  });

  // Google Connected Console Required Legal Pages (`/terms` & `/privacy`)
  app.get("/terms", (_req: Request, res: Response) => {
    res.type("html").send(`<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Splittel (@Splittel) — Terms of Service</title></head>
<body style="font-family:system-ui,sans-serif;max-width:44rem;margin:2rem auto;padding:0 1rem;line-height:1.6;">
  <h1>Splittel (@Splittel) — Terms of Service</h1>
  <p>Splittel provides automated receipt splitting, group expense calculation, and payment link generation for Google Connected Apps (Gemini &amp; Google Search).</p>
  <p>Calculations in the Free Tier operate without registration. Account-linked actions (saving expense history, personal payment links, and confirming transaction settlements) require explicit user authorization via OAuth 2.1.</p>
</body>
</html>`);
  });

  app.get("/privacy", (_req: Request, res: Response) => {
    res.type("html").send(`<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Splittel (@Splittel) — Privacy Policy</title></head>
<body style="font-family:system-ui,sans-serif;max-width:44rem;margin:2rem auto;padding:0 1rem;line-height:1.6;">
  <h1>Splittel (@Splittel) — Privacy Policy</h1>
  <p>Splittel processes receipt line items, participant first names, and group expense amounts solely to compute check splits and settlement links requested by the user.</p>
  <p>Crowdsourced dish price benchmarks pass through an automated GDPR PII Anonymization Pipeline that strips all personal names, card numbers, and fiscal receipt identifiers before storage.</p>
  <p>When OAuth 2.1 Account Linking (<code>openid</code>, <code>profile</code>, <code>email</code>) is used, profile identifiers are stored exclusively to persist user-requested expense history and payment link preferences.</p>
</body>
</html>`);
  });

  // Healthcheck with isolated secret status (never leaks credentials)
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      app: SPLITTEL_APP_NAME,
      handle: SPLITTEL_APP_HANDLE,
      category: SPLITTEL_CATEGORY,
      storage_driver: store.getActiveDriver(),
      postgis_enabled: store.isPostGisEnabled(),
      redis_sync: redisSync.getStatus(),
      r2_storage: r2Storage.isConfigured() ? "configured" : "disabled",
      gemini_vision: envReport.geminiVisionConfigured ? "configured" : "disabled",
      rate_limit_rpm: appConfig.RATE_LIMIT_MAX_REQUESTS,
      receipt_scan_rate_limit_rpm: appConfig.RECEIPT_SCAN_RATE_LIMIT_MAX,
      jwt_isolated: envReport.jwtSecretIsolated,
      https_enabled: appConfig.HTTPS_ENABLED,
      sessions: transportManager.getActiveSessionCounts(),
      timestamp: new Date().toISOString(),
    });
  });

  const shutdown = async (): Promise<void> => {
    await shutdownOcrWorkers();
    await transportManager.shutdown();
    await redisSync.close();
    await store.close();
  };

  return {
    app,
    store,
    redisSync,
    r2Storage,
    oauthProvider,
    transportManager,
    shutdown,
  };
}
