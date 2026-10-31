import request from "supertest";
import { describe, expect, it } from "vitest";
import { loadConfig, validateStartupEnv } from "../src/config/env.js";
import {
  RECEIPT_SCAN_RATE_LIMIT_MESSAGE,
  assertStrictProductionEnv,
  createSplittelRuntime,
  isAllowedCorsOrigin,
  isMcpReceiptScanRequest,
  receiptScanLimiter,
} from "../src/app.js";
import { foodPriceTracker } from "../src/domain/foodPriceTracker.js";
import {
  DEFAULT_RADIUS_METERS,
  formatPostGisRadiusQuery,
  generateCpaRecommendation,
  renderCpaPromoCardHtml,
} from "../src/domain/cpaEngine.js";
import { R2ReceiptStorageAdapter } from "../src/storage/r2Adapter.js";
import { RedisBillSync } from "../src/storage/redisSync.js";
import { parseAndSplitBill } from "../src/domain/billSplitter.js";

describe("Enterprise Infrastructure: PostGIS, CPA Engine, R2, Redis Sync & Security", () => {
  it("formats parameterized PostGIS ST_DWithin 1000m spatial queries with (lng, lat) SRID 4326 order", () => {
    const query = formatPostGisRadiusQuery({
      lat: 32.0608,
      lng: 34.7706,
      currency: "ils",
      categories: ["mains", "drinks"],
      excludeRestaurantName: "Current Cafe",
    });

    expect(query.text).toContain("ST_DWithin");
    expect(query.text).toContain("ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography");
    expect(query.text).toContain("FROM receipt_items");
    expect(query.text).toContain("AND (restaurant_name IS NULL OR LOWER(restaurant_name) <> LOWER($6))");

    // $1 = longitude (34.7706), $2 = latitude (32.0608), $3 = currency, $4 = categories, $5 = 1000m, $6 = excluded restaurant
    expect(query.values).toEqual([
      34.7706,
      32.0608,
      "ILS",
      ["mains", "drinks"],
      DEFAULT_RADIUS_METERS,
      "Current Cafe",
    ]);

    expect(() =>
      formatPostGisRadiusQuery({ lat: 125, lng: 34.77, currency: "ILS" })
    ).toThrow(/Invalid geographic coordinates/);
  });

  it("returns null CPA snippet when no live benchmarks exist, and renders CTA widget HTML from live PostGIS / tracker data", () => {
    foodPriceTracker.reset();

    // 1. Explicit empty state (null) when no PostGIS or crowdsourced benchmarks exist
    const emptyRec = generateCpaRecommendation({
      title: "Rothschild Cafe",
      grand_total: 160,
      currency: "ILS",
      people_count: 2,
      items: [
        {
          item_id: "item_1",
          item_name: "Shakshuka",
          price: 58,
          quantity: 2,
          line_total: 116,
        },
      ],
    });
    expect(emptyRec).toBeNull();
    expect(renderCpaPromoCardHtml(emptyRec)).toBe("");

    // 2. Live PostGIS spatial benchmark within 1000m produces verified CPA card
    const spatialRec = generateCpaRecommendation({
      title: "Expensive Spot",
      grand_total: 200,
      currency: "ILS",
      people_count: 2,
      items: [
        {
          item_id: "item_1",
          item_name: "Shakshuka",
          price: 70,
          quantity: 1,
          line_total: 70,
        },
      ],
      nearbyBenchmarks: [
        {
          restaurant_name: "Jaffa Falafel Corner",
          category: "mains",
          sample_count: 12,
          avg_price_cents: 4900, // 49 ILS vs 70 ILS -> 30% cheaper
          min_price_cents: 4400,
          distance_meters: 340,
        },
      ],
    });
    expect(spatialRec).not.toBeNull();
    expect(spatialRec!.partner_name).toBe("Jaffa Falafel Corner");
    expect(spatialRec!.savings_percent).toBe(30);
    expect(spatialRec!.promo_code).toBe("SPLITTEL");
    expect(spatialRec!.cta_text).toBe("Забронировать со скидкой");

    const html = renderCpaPromoCardHtml(spatialRec);
    expect(html).toContain("cpa-promo-widget");
    expect(html).toContain("Забронировать со скидкой");
    expect(html).toContain('data-promo-code="SPLITTEL"');
  });

  it("throws explicit startup errors when NODE_ENV='production' or STORAGE_DRIVER='r2' lacks R2 or DATABASE_URL credentials", () => {
    expect(() =>
      loadConfig({
        NODE_ENV: "production",
        DATABASE_URL: "postgresql://postgres:pass@localhost:5432/splittel",
        R2_ACCESS_KEY_ID: "",
        R2_SECRET_ACCESS_KEY: "",
      })
    ).toThrow(/R2_ACCESS_KEY_ID/);

    expect(() =>
      loadConfig({
        NODE_ENV: "development",
        STORAGE_DRIVER: "r2",
        DATABASE_URL: "postgresql://postgres:pass@localhost:5432/splittel",
        R2_ACCESS_KEY_ID: "key_present",
        R2_SECRET_ACCESS_KEY: "",
      })
    ).toThrow(/R2_SECRET_ACCESS_KEY/);

    expect(() =>
      loadConfig({
        NODE_ENV: "production",
        DATABASE_URL: "",
        R2_ACCESS_KEY_ID: "key_present",
        R2_SECRET_ACCESS_KEY: "secret_present",
      })
    ).toThrow(/DATABASE_URL/);

    const baseCfg = loadConfig({
      NODE_ENV: "test",
      STORAGE_DRIVER: "memory",
    });
    expect(() =>
      assertStrictProductionEnv({
        ...baseCfg,
        NODE_ENV: "production",
        R2_ACCESS_KEY_ID: "key_present",
        R2_SECRET_ACCESS_KEY: "secret_present",
        STORAGE_DRIVER: "memory",
      })
    ).toThrow(/STORAGE_DRIVER="memory" is forbidden/);
  });

  it("uploads receipt images via Cloudflare R2 S3 adapter with UUID keys and returns HTTPS CDN URL", async () => {
    const sentCommands: unknown[] = [];
    const mockS3 = {
      send: async (cmd: unknown) => {
        sentCommands.push(cmd);
        return {};
      },
    };

    const r2 = new R2ReceiptStorageAdapter({
      bucketName: "splittel-receipts",
      publicBaseUrl: "https://cdn.splittel.app",
      s3Client: mockS3 as never,
    });

    expect(r2.isConfigured()).toBe(true);

    // Fake PNG magic header (89 50 4E 47)
    const pngBytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const dataUri = `data:image/png;base64,${pngBytes.toString("base64")}`;

    const { upload } = await r2.uploadBase64Receipt(dataUri);
    expect(upload.uploaded).toBe(true);
    expect(upload.bucket).toBe("splittel-receipts");
    expect(upload.contentType).toBe("image/png");
    expect(upload.key).toMatch(/^receipts\/\d{4}\/\d{2}\/\d{2}\/[0-9a-f-]+\.png$/);
    expect(upload.imageUrl).toBe(`https://cdn.splittel.app/${upload.key}`);
    expect(sentCommands).toHaveLength(1);
  });

  it("serializes concurrent mutations with RedisBillSync locks, 24h TTL state cache, and Pub/Sub updates", async () => {
    const sync = new RedisBillSync({ enabled: false });
    await sync.initialize();

    const bill = await parseAndSplitBill({
      title: "Sync Test",
      currency: "ILS",
      people: ["Dan", "Noa"],
      raw_items: [{ item_name: "Hummus", price: 40, quantity: 1 }],
    });

    const receivedEvents: string[] = [];
    const unsub = sync.subscribeToBill(bill.bill_id, (ev) => {
      receivedEvents.push(ev.type);
    });

    await sync.publishBillUpdate(bill, "bill_state_updated");
    const cached = await sync.getCachedBillState(bill.bill_id);
    expect(cached?.bill_id).toBe(bill.bill_id);
    expect(receivedEvents).toEqual(["bill_state_updated"]);

    // Verify FIFO lock serialization
    const executionOrder: number[] = [];
    await Promise.all([
      sync.withBillLock(bill.bill_id, async () => {
        await new Promise((r) => setTimeout(r, 20));
        executionOrder.push(1);
      }),
      sync.withBillLock(bill.bill_id, async () => {
        executionOrder.push(2);
      }),
    ]);
    expect(executionOrder).toEqual([1, 2]);

    unsub();
    await sync.close();
  });

  it("enforces express-rate-limit, Google/Gemini CORS policy, and startup secret isolation", async () => {
    // 1. CORS allowlist checks
    expect(
      isAllowedCorsOrigin(
        "https://gemini.google.com",
        "https://splittel-production.up.railway.app",
        "production"
      )
    ).toBe(true);
    expect(
      isAllowedCorsOrigin(
        "https://www.google.com",
        "https://splittel-production.up.railway.app",
        "production"
      )
    ).toBe(true);
    expect(
      isAllowedCorsOrigin(
        "https://app.gemini.google.com",
        "https://splittel-production.up.railway.app",
        "production"
      )
    ).toBe(true);
    expect(
      isAllowedCorsOrigin(
        "https://attacker.evil.com",
        "https://splittel-production.up.railway.app",
        "production"
      )
    ).toBe(false);

    // 2. Rate limit enforcement & R2_PUBLIC_DOMAIN normalization test
    const r2Cfg = loadConfig({
      NODE_ENV: "test",
      R2_ACCOUNT_ID: "https://acct12345.r2.cloudflarestorage.com/",
      R2_PUBLIC_DOMAIN: "pub-example123.r2.dev/",
      R2_PUBLIC_BASE_URL: "",
      R2_ENDPOINT: "",
    });
    expect(r2Cfg.R2_ACCOUNT_ID).toBe("acct12345");
    expect(r2Cfg.R2_ENDPOINT).toBe("https://acct12345.r2.cloudflarestorage.com");
    expect(r2Cfg.R2_PUBLIC_BASE_URL).toBe("https://pub-example123.r2.dev");

    const cfg = loadConfig({
      NODE_ENV: "test",
      STORAGE_DRIVER: "memory",
      RATE_LIMIT_MAX_REQUESTS: "3",
      RATE_LIMIT_WINDOW_MS: "60000",
    });

    const runtime = await createSplittelRuntime(cfg);
    try {
      await request(runtime.app).get("/ui/bill-board").expect(200);
      await request(runtime.app).get("/ui/bill-board").expect(200);
      const third = await request(runtime.app).get("/ui/bill-board").expect(200);
      expect(third.headers["ratelimit"]).toBeDefined();

      // 4th request exceeds limit -> 429 Too Many Requests
      const blocked = await request(runtime.app).get("/ui/bill-board").expect(429);
      expect(blocked.body.error).toBe("rate_limit_exceeded");

      // Verify /health exposes subsystem flags without leaking secrets
      const health = await request(runtime.app).get("/health").expect(200);
      expect(health.body.jwt_isolated).toBe(true);
      expect(health.body.rate_limit_rpm).toBe(3);
      expect(health.body.receipt_scan_rate_limit_rpm).toBe(5);
      expect(JSON.stringify(health.body)).not.toContain(cfg.JWT_SECRET);
      expect(JSON.stringify(health.body)).not.toContain("postgrespassword");
    } finally {
      await runtime.shutdown();
    }
  });

  it("caps /api/receipts/scan and /mcp OCR calls strictly at 5 scans/minute via receiptScanLimiter and validates GEMINI_API_KEY diagnostics", async () => {
    expect(typeof receiptScanLimiter).toBe("function");
    expect(
      isMcpReceiptScanRequest({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "parse_and_split_bill",
          arguments: {
            image_url: "https://cdn.splittel.app/receipts/1.jpg",
            raw_items: [{ item_name: "Hummus", price: 42, quantity: 1 }],
            people: ["Dan"],
          },
        },
      })
    ).toBe(true);
    expect(
      isMcpReceiptScanRequest({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "calculate_group_balance",
          arguments: { expenses: [] },
        },
      })
    ).toBe(false);

    const cfgNoGemini = loadConfig({
      NODE_ENV: "test",
      STORAGE_DRIVER: "memory",
      GEMINI_API_KEY: "",
    });
    const reportNoGemini = validateStartupEnv(cfgNoGemini);
    expect(reportNoGemini.geminiVisionConfigured).toBe(false);
    expect(
      reportNoGemini.warnings.some((w) => w.includes("GEMINI_API_KEY not set"))
    ).toBe(true);

    const cfgWithGemini = loadConfig({
      NODE_ENV: "test",
      STORAGE_DRIVER: "memory",
      GEMINI_API_KEY: "AIzaSyTestKeyForStartupValidationCheck",
    });
    const reportWithGemini = validateStartupEnv(cfgWithGemini);
    expect(reportWithGemini.geminiVisionConfigured).toBe(true);

    const runtime = await createSplittelRuntime(cfgNoGemini);
    try {
      // First 5 receipt scans within 1 minute succeed
      for (let i = 1; i <= 5; i++) {
        const res = await request(runtime.app)
          .post("/api/receipts/scan")
          .send({
            text: `מסעדת שקשוקה\n58.00 שקשוקה חריפה 1\nסה"כ 58.00 ש״ח`,
            currency_hint: "ILS",
          })
          .expect(200);
        expect(res.body.success).toBe(true);
        expect(res.body.parsed.detectedCurrency).toBe("ILS");
        expect(res.body.parsed.items).toEqual([
          { item_name: "שקשוקה חריפה", price: 58, quantity: 1 },
        ]);
      }

      // 6th scan within 1 minute is blocked with HTTP 429 and exact rate-limit error message
      const blockedScan = await request(runtime.app)
        .post("/api/receipts/scan")
        .send({
          text: "58.00 שקשוקה 1",
          currency_hint: "ILS",
        })
        .expect(429);

      expect(blockedScan.body).toEqual(RECEIPT_SCAN_RATE_LIMIT_MESSAGE);

      // MCP OCR tool call (bearing image_url) from same IP is also blocked by the 5/min scan cap
      const blockedMcpScan = await request(runtime.app)
        .post("/mcp")
        .set("Content-Type", "application/json")
        .send({
          jsonrpc: "2.0",
          id: 99,
          method: "tools/call",
          params: {
            name: "parse_and_split_bill",
            arguments: {
              image_url: "https://cdn.splittel.app/receipts/hebrew.jpg",
              raw_items: [{ item_name: "שקשוקה", price: 58, quantity: 1 }],
              people: ["דן", "נועה"],
            },
          },
        })
        .expect(429);
      expect(blockedMcpScan.body).toEqual(RECEIPT_SCAN_RATE_LIMIT_MESSAGE);

      // Non-OCR MCP calls (e.g., calculate_group_balance) remain unaffected!
      await request(runtime.app)
        .post("/mcp")
        .set("Content-Type", "application/json")
        .send({
          jsonrpc: "2.0",
          id: 100,
          method: "tools/call",
          params: {
            name: "calculate_group_balance",
            arguments: {
              expenses: [
                {
                  description: "Taxi",
                  paid_by: "Dan",
                  amount: 100,
                  split_among: ["Dan", "Noa"],
                },
              ],
            },
          },
        })
        .expect(200);
    } finally {
      await runtime.shutdown();
    }
  });
});

