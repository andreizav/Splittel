import { createHash, randomBytes } from "node:crypto";
import https from "node:https";
import type { AddressInfo } from "node:net";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { loadConfig } from "../src/config/env.js";
import { createSplittelRuntime, type SplittelRuntime } from "../src/app.js";
import { ensureTlsCredentials } from "../src/utils/devTls.js";
import {
  SPLITTEL_APP_DESCRIPTION,
  SPLITTEL_SERVER_INSTRUCTIONS,
  SPLITTEL_UI_RESOURCE_URI,
} from "../src/mcp/server.js";

describe("@Splittel Comprehensive Remote MCP Specification Suite", () => {
  let tempDir: string;
  let runtime: SplittelRuntime;
  let httpsServer: https.Server;
  let httpsBaseUrl: string;
  let accessToken: string;

  beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    tempDir = mkdtempSync(join(tmpdir(), "splittel-tls-"));
    const tls = ensureTlsCredentials({
      certPath: join(tempDir, "cert.pem"),
      keyPath: join(tempDir, "key.pem"),
      allowAutoGenerate: true,
    });

    httpsServer = https.createServer({ cert: tls.cert, key: tls.key });
    await new Promise<void>((resolveListen) => {
      httpsServer.listen(0, "127.0.0.1", () => resolveListen());
    });
    const port = (httpsServer.address() as AddressInfo).port;
    httpsBaseUrl = `https://localhost:${port}`;

    const testConfig = loadConfig({
      NODE_ENV: "test",
      HOST: "127.0.0.1",
      PORT: String(port),
      HTTPS_ENABLED: "true",
      PUBLIC_BASE_URL: httpsBaseUrl,
      OAUTH_ISSUER_URL: httpsBaseUrl,
      OAUTH_AUDIENCE: `${httpsBaseUrl}/mcp`,
      STORAGE_DRIVER: "memory",
      OAUTH_ENFORCE_ON_ALL_MCP: "false",
    });

    runtime = await createSplittelRuntime(testConfig);
    httpsServer.on("request", runtime.app);

    accessToken = await runtime.oauthProvider.issueAccessToken({
      clientId: "google-connected-apps",
      subject: "user_gemini_ru_01",
      email: "organizer@splittel.app",
      name: "Андрей",
      scopes: ["openid", "profile", "email"],
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolveClose) =>
      httpsServer.close(() => resolveClose())
    );
    await runtime.shutdown();
    rmSync(tempDir, { recursive: true, force: true });
  });

  it("validates connected-app-manifest.json against Google Connected Console publishing rules", async () => {
    const manifestRaw = readFileSync(
      resolve(process.cwd(), "connected-app-manifest.json"),
      "utf-8"
    );
    const manifest = JSON.parse(manifestRaw) as {
      app_name: string;
      category: string;
      description: string;
      primary_integration_route: string;
      capabilities: string[];
      example_prompts: string[];
      oauth2_security: {
        scopes: string[];
        google_auth_platform: { use_this_client_for_an_ai_powered_agent: boolean };
      };
    };

    expect(manifest.app_name).toBe("Splittel");
    expect(manifest.category).toBe("Finance / Productivity");
    expect(manifest.description).toBe(SPLITTEL_APP_DESCRIPTION);
    // Max 30 words requirement
    expect(manifest.description.trim().split(/\s+/).length).toBeLessThanOrEqual(
      30
    );
    expect(manifest.primary_integration_route).toBe(
      "Remote MCP Server (HTTPS / SSE)"
    );
    expect(manifest.capabilities.length).toBeGreaterThanOrEqual(3);
    for (const cap of manifest.capabilities) {
      expect(/^\d/.test(cap)).toBe(false);
    }
    expect(manifest.example_prompts.length).toBeGreaterThanOrEqual(3);
    expect(manifest.example_prompts.length).toBeLessThanOrEqual(4);
    expect(manifest.oauth2_security.scopes).toEqual([
      "openid",
      "profile",
      "email",
    ]);
    expect(
      manifest.oauth2_security.google_auth_platform
        .use_this_client_for_an_ai_powered_agent
    ).toBe(true);

    // Legal URLs respond 200 OK
    await request(runtime.app).get("/terms").expect(200);
    await request(runtime.app).get("/privacy").expect(200);
  });

  it("exposes OAuth 2.1 PKCE (S256) with openid, profile, email scopes and /userinfo", async () => {
    const prmRes = await request(runtime.app)
      .get("/.well-known/oauth-protected-resource")
      .expect(200);

    expect(prmRes.body.scopes_supported).toEqual([
      "openid",
      "profile",
      "email",
    ]);
    expect(
      prmRes.body.google_auth_platform.use_this_client_for_an_ai_powered_agent
    ).toBe(true);

    const regRes = await request(runtime.app)
      .post("/register")
      .send({
        client_name: "Google Search AI Mode Agent",
        redirect_uris: ["https://www.google.com/oauth/callback"],
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
      })
      .expect(201);

    expect(regRes.body.use_this_client_for_an_ai_powered_agent).toBe(true);

    const clientId = regRes.body.client_id as string;
    const codeVerifier = randomBytes(32).toString("base64url");
    const codeChallenge = createHash("sha256")
      .update(codeVerifier)
      .digest("base64url");

    const authRes = await request(runtime.app)
      .get("/authorize")
      .query({
        response_type: "code",
        client_id: clientId,
        redirect_uri: "https://www.google.com/oauth/callback",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
        scope: "openid profile email",
        state: "google_state_42",
      })
      .expect(302);

    const redirectUrl = new URL(authRes.headers.location!);
    const code = redirectUrl.searchParams.get("code")!;

    const tokenRes = await request(runtime.app)
      .post("/token")
      .type("form")
      .send({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        code_verifier: codeVerifier,
        redirect_uri: "https://www.google.com/oauth/callback",
      })
      .expect(200);

    expect(tokenRes.body.scope).toBe("openid profile email");

    const userInfoRes = await request(runtime.app)
      .get("/userinfo")
      .set("Authorization", `Bearer ${tokenRes.body.access_token as string}`)
      .expect(200);

    expect(userInfoRes.body.email_verified).toBe(true);
  });

  it("supports Free Tier (Zero-Auth) anonymous calculation while requiring Account Linking on settle_up_action & account endpoints", async () => {
    // 1. Anonymous Zero-Auth call to parse_and_split_bill SUCCEEDS without Authorization header
    const anonParseRes = await request(runtime.app)
      .post("/mcp")
      .set("Content-Type", "application/json")
      .send({
        jsonrpc: "2.0",
        id: 10,
        method: "tools/call",
        params: {
          name: "parse_and_split_bill",
          arguments: {
            raw_items: [
              { item_name: "Хачапури", price: 650, quantity: 1 },
              { item_name: "Лимонад", price: 300, quantity: 2 },
            ],
            people: ["Саша", "Маша"],
            tip_percentage: 10,
            tax_amount: 50,
          },
        },
      })
      .expect(200);

    expect(anonParseRes.body.result.meta.ui.resourceUri).toBe(
      "ui://splittel/bill-board"
    );

    // 2. Anonymous Zero-Auth call to calculate_group_balance SUCCEEDS
    const anonBalanceRes = await request(runtime.app)
      .post("/mcp")
      .set("Content-Type", "application/json")
      .send({
        jsonrpc: "2.0",
        id: 11,
        method: "tools/call",
        params: {
          name: "calculate_group_balance",
          arguments: {
            expenses: [
              {
                description: "Отель в Сочи",
                paid_by: "Саша",
                amount: 9000,
                split_among: ["Саша", "Маша", "Дима"],
              },
            ],
          },
        },
      })
      .expect(200);

    expect(
      anonBalanceRes.body.result.structuredContent.settlement_matrix
    ).toHaveLength(2);

    // 3. Anonymous call to settle_up_action triggers 401 Account Linking challenge
    const unauthSettle = await request(runtime.app)
      .post("/mcp")
      .set("Content-Type", "application/json")
      .send({
        jsonrpc: "2.0",
        id: 12,
        method: "tools/call",
        params: {
          name: "settle_up_action",
          arguments: {
            transaction_id: "txn_123",
            status: "PAID",
          },
        },
      })
      .expect(401);

    expect(unauthSettle.headers["www-authenticate"]).toContain(
      'scope="openid profile email"'
    );

    // 4. Account-linked endpoints require OAuth 2.1 Bearer token
    await request(runtime.app).get("/api/account/history").expect(401);
    await request(runtime.app).put("/api/account/payment-profile").expect(401);

    await request(runtime.app)
      .put("/api/account/payment-profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        display_name: "Андрей",
        sbp_phone: "+79991234567",
        sbp_bank: "T-Bank",
        stripe_payment_link: "https://buy.stripe.com/test_andrey",
      })
      .expect(200);
  });

  it("connects via HTTPS StreamableHTTPClientTransport and executes all 4 tools + UI resource with exact schemas", async () => {
    const client = new Client({
      name: "gemini-connected-apps-host",
      version: "1.0.0",
    });

    const transport = new StreamableHTTPClientTransport(
      new URL(`${httpsBaseUrl}/mcp`),
      {
        requestInit: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    await client.connect(transport);

    expect(client.getInstructions()).toBe(SPLITTEL_SERVER_INSTRUCTIONS);

    const toolsList = await client.listTools();
    const parseTool = toolsList.tools.find(
      (t) => t.name === "parse_and_split_bill"
    )!;
    expect(parseTool.annotations?.readOnlyHint).toBe(true);
    expect(parseTool.inputSchema.required).toEqual(["raw_items", "people"]);

    const balanceTool = toolsList.tools.find(
      (t) => t.name === "calculate_group_balance"
    )!;
    expect(balanceTool.annotations?.readOnlyHint).toBe(true);

    const cardTool = toolsList.tools.find(
      (t) => t.name === "generate_payment_card"
    )!;
    expect(cardTool.inputSchema.required).toEqual(["settlements"]);

    const settleTool = toolsList.tools.find((t) => t.name === "settle_up_action")!;
    expect(settleTool.annotations?.destructiveHint).toBe(true);
    expect(settleTool.inputSchema.required).toEqual([
      "transaction_id",
      "status",
    ]);

    // Tool 1: parse_and_split_bill (authenticated -> saved to user history)
    const splitRes = await client.callTool({
      name: "parse_and_split_bill",
      arguments: {
        raw_items: [
          { item_name: "Стейк", price: 2000, quantity: 1 },
          { item_name: "Бутылка вина", price: 1600, quantity: 1 },
        ],
        people: ["Я", "Саша"],
        assignments: {
          Я: ["Стейк", "Бутылка вина"],
          Саша: ["Бутылка вина"],
        },
        tip_percentage: 10,
        tax_amount: 180,
      },
    });

    expect(
      (splitRes as { meta?: { ui?: { resourceUri?: string } } }).meta?.ui
        ?.resourceUri
    ).toBe(SPLITTEL_UI_RESOURCE_URI);

    const bill = (
      splitRes.structuredContent as {
        bill: {
          bill_id: string;
          share_url: string;
          grand_total: number;
          people_shares: Array<{ person: string; transaction_id: string }>;
        };
      }
    ).bill;
    // Subtotal 3600 + tax 180 + tip 360 = 4140
    expect(bill.grand_total).toBe(4140);
    expect(bill.share_url).toContain(`/ui/bill-board?bill_id=${bill.bill_id}`);

    // Verify bill was automatically saved to Account-Linked history
    const historyRes = await request(runtime.app)
      .get("/api/account/history")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
    expect(historyRes.body.count).toBeGreaterThanOrEqual(1);

    // Read UI Resource `ui://splittel/bill-board`
    const uiResource = await client.readResource({
      uri: SPLITTEL_UI_RESOURCE_URI,
    });
    const html = uiResource.contents[0]?.text ?? "";
    expect(uiResource.contents[0]?.mimeType).toBe("text/html;profile=mcp-app");
    expect(html).toContain("Itemized Check Matrix");
    expect(html).toContain('data-tip-preset="15"');
    expect(html).toContain("Pay via Link / SBP QR");

    // Tool 2: calculate_group_balance
    const groupRes = await client.callTool({
      name: "calculate_group_balance",
      arguments: {
        expenses: [
          {
            description: "Аренда авто",
            paid_by: "Я",
            amount: 6000,
            split_among: ["Я", "Саша", "Маша"],
          },
        ],
      },
    });
    const settlements = (
      groupRes.structuredContent as {
        settlements: Array<{ debtor: string; creditor: string; amount: number }>;
      }
    ).settlements;
    expect(settlements).toHaveLength(2);

    // Tool 3: generate_payment_card
    const cardsRes = await client.callTool({
      name: "generate_payment_card",
      arguments: { settlements },
    });
    const paymentCards = (
      cardsRes.structuredContent as {
        payment_cards: Array<{ links: { sbp_url: string; stripe_payment_url: string } }>;
      }
    ).payment_cards;
    expect(paymentCards).toHaveLength(2);
    expect(paymentCards[0]!.links.sbp_url).toContain("https://qr.nspk.ru/");

    // Tool 4: settle_up_action (PAID -> CANCELLED)
    const txnId = bill.people_shares[0]!.transaction_id;
    const paidRes = await client.callTool({
      name: "settle_up_action",
      arguments: { transaction_id: txnId, status: "PAID" },
    });
    expect(
      (paidRes.structuredContent as { transaction: { status: string } })
        .transaction.status
    ).toBe("PAID");

    const cancelRes = await client.callTool({
      name: "settle_up_action",
      arguments: { transaction_id: txnId, status: "CANCELLED" },
    });
    expect(
      (cancelRes.structuredContent as { transaction: { status: string } })
        .transaction.status
    ).toBe("CANCELLED");

    // Multi-currency end-to-end check (EUR receipt -> RUB settlement)
    const fxSplitRes = await client.callTool({
      name: "parse_and_split_bill",
      arguments: {
        title: "Bistro Paris",
        currency: "EUR",
        settlement_currency: "RUB",
        exchange_rate: 105,
        raw_items: [
          { item_name: "Steak Frites", price: 28, quantity: 1 },
          { item_name: "Chablis Bottle", price: 32, quantity: 1 },
        ],
        people: ["Я", "Саша"],
        assignments: {
          Я: ["Steak Frites", "Chablis Bottle"],
          Саша: ["Chablis Bottle"],
        },
        tip_percentage: 10,
      },
    });
    const fxBill = (
      fxSplitRes.structuredContent as {
        bill: {
          currency: string;
          settlement_currency: string;
          grand_total: number;
          settlement_grand_total: number;
        };
      }
    ).bill;
    expect(fxBill.currency).toBe("EUR");
    expect(fxBill.settlement_currency).toBe("RUB");
    expect(fxBill.grand_total).toBe(66);
    expect(fxBill.settlement_grand_total).toBe(6930);

    const fxUiResource = await client.readResource({
      uri: SPLITTEL_UI_RESOURCE_URI,
    });
    expect(fxUiResource.contents[0]?.text ?? "").toContain("bill-settlement-total");

    await client.close();
  });

  it("supports Scenario B & C interactive dish toggling, tip pills, and SSE transport", async () => {
    const latestBill = (await runtime.store.getBill())!;

    // Scenario C: Friend opens shared group link and updates dish assignments + 15% tip without login
    const patchRes = await request(runtime.app)
      .patch(`/api/bills/${encodeURIComponent(latestBill.bill_id)}/state`)
      .send({
        tip_percentage: 15,
        assignments: {
          [latestBill.people[0]!]: [latestBill.raw_items[0]!.item_name],
        },
      })
      .expect(200);

    expect(patchRes.body.bill.tip_percentage).toBe(15);

    const boardRes = await request(runtime.app)
      .get(`/ui/bill-board?bill_id=${encodeURIComponent(latestBill.bill_id)}&theme=dark`)
      .expect(200);
    expect(boardRes.text).toContain('closedby="any"');
    expect(boardRes.text).toContain("Pay via Link / SBP QR");

    // Verify SSE /sse endpoint
    const sseChunk = await new Promise<string>((resolveSse, rejectSse) => {
      const req = https.get(`${httpsBaseUrl}/sse`, (res) => {
        expect(res.statusCode).toBe(200);
        res.on("data", (chunk: Buffer) => {
          const text = chunk.toString("utf-8");
          if (text.includes("event: endpoint")) {
            req.destroy();
            resolveSse(text);
          }
        });
      });
      req.on("error", (err) => {
        if ((err as NodeJS.ErrnoException).code !== "ECONNRESET") {
          rejectSse(err);
        }
      });
    });

    expect(sseChunk).toContain("/messages?sessionId=");
  });

  it("supports receipt parsing and direct bill creation from the web UI", async () => {
    // 1. Parse receipt text
    const parseRes = await request(runtime.app)
      .post("/api/receipts/parse")
      .send({
        text: "Пиццерия Неаполь\nПицца Маргарита 650\nКола 200\nНДС 20% 120",
      })
      .expect(200);

    expect(parseRes.body.parsed.title).toBe("Пиццерия Неаполь");
    expect(parseRes.body.parsed.items).toHaveLength(2);
    expect(parseRes.body.parsed.taxAmount).toBe(120);

    // 2. Direct creation of a new bill from UI modal
    const createRes = await request(runtime.app)
      .post("/api/bills/new")
      .send({
        title: "Пиццерия Неаполь",
        currency: "RUB",
        tip_percentage: 10,
        tax_amount: 120,
        people: ["Я", "Дима"],
        raw_items: [
          { item_name: "Пицца Маргарита", price: 650, quantity: 1 },
          { item_name: "Кола", price: 200, quantity: 1 },
        ],
      })
      .expect(200);

    expect(createRes.body.success).toBe(true);
    expect(createRes.body.bill.title).toBe("Пиццерия Неаполь");
    // Subtotal: 850 + tax 120 + tip 85 = 1055
    expect(createRes.body.bill.grand_total).toBe(1055);
    expect(createRes.body.uiActionToken).toBeDefined();

    // Verify it is served at /ui/bill-board with mobile-first camera UX & zero mock data
    const uiRes = await request(runtime.app)
      .get(`/ui/bill-board?bill_id=${createRes.body.bill.bill_id}`)
      .expect(200);
    expect(uiRes.text).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
    );
    expect(uiRes.text).toContain('id="receipt-file-input"');
    expect(uiRes.text).toContain('name="receipt_photo"');
    expect(uiRes.text).toContain('accept="image/*"');
    expect(uiRes.text).toContain('capture="environment"');
    expect(uiRes.text).toContain("Сканировать чек 📷");
    expect(uiRes.text).toContain("new-bill-dialog");
    expect(uiRes.text).toContain("Пиццерия Неаполь");
    expect(uiRes.text).not.toContain("Вставить пример");
    expect(uiRes.text).not.toContain("Bistro Gusto");
    expect(uiRes.text).not.toContain("Ужин с друзьями");
  });
});
