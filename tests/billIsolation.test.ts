import { randomUUID } from "node:crypto";
import https from "node:https";
import type { AddressInfo } from "node:net";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { loadConfig } from "../src/config/env.js";
import { createSplittelRuntime, type SplittelRuntime } from "../src/app.js";
import { ensureTlsCredentials } from "../src/utils/devTls.js";

describe("Multi-Tenant Session Isolation & OAuth Role Segmentation (billIsolation.test.ts)", () => {
  let tempDir: string;
  let runtime: SplittelRuntime;
  let httpsServer: https.Server;
  let httpsBaseUrl: string;

  let tokenUserA: string;
  let tokenUserB: string;

  const subUserA = "sub_user_alice_01";
  const subUserB = "sub_user_bob_02";

  beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    tempDir = mkdtempSync(join(tmpdir(), "splittel-iso-"));
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

    // Issue OAuth 2.1 Access Tokens for User A and User B
    tokenUserA = await runtime.oauthProvider.issueAccessToken({
      clientId: "google-workspace-client",
      subject: subUserA,
      email: "alice@splittel.app",
      name: "Алиса",
      scopes: ["openid", "profile", "email"],
    });

    tokenUserB = await runtime.oauthProvider.issueAccessToken({
      clientId: "google-workspace-client",
      subject: subUserB,
      email: "bob@splittel.app",
      name: "Боб",
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

  describe("Section 1: Route Restructuring & Pure Bill Isolation", () => {
    it("serves GET /ui/bill-board with 200 and generates a clean UUIDv4 bill session when omitted", async () => {
      const res = await request(httpsServer).get("/ui/bill-board");
      expect(res.status).toBe(200);

      const match = res.text.match(
        /<script id="splittel-bootstrap" type="application\/json">([\s\S]*?)<\/script>/
      );
      expect(match).not.toBeNull();
      const bootstrap = JSON.parse(match![1]!);

      expect(bootstrap.billId).toBeDefined();
      expect(bootstrap.bill).toBeNull();
      expect(bootstrap.billId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it("serves an isolated empty board for an unknown bill_id without global state fallback", async () => {
      const randomBillId = randomUUID();
      const res = await request(httpsServer).get(
        `/ui/bill-board?bill_id=${randomBillId}`
      );
      expect(res.status).toBe(200);
      expect(res.text).toContain(`"billId":"${randomBillId}"`);
      expect(res.text).toContain(`"bill":null`);
    });
  });

  describe("Section 2: Guest vs Registered (OAuth 2.1) User Authorization", () => {
    it("blocks unauthenticated guests from accessing persistent history (401 Unauthorized)", async () => {
      const res = await request(httpsServer).get("/api/user/history");
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("unauthorized");
    });

    it("allows registered users with valid Bearer token to access persistent history", async () => {
      const res = await request(httpsServer)
        .get("/api/user/history")
        .set("Authorization", `Bearer ${tokenUserA}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.id).toBe(subUserA);
      expect(res.body.user.name).toBe("Алиса");
      expect(res.body.user.email).toBe("alice@splittel.app");
      expect(Array.isArray(res.body.bills)).toBe(true);
      expect(res.body.analytics).toBeDefined();
      expect(Array.isArray(res.body.contacts)).toBe(true);
    });
  });

  describe("Section 1 & 2: Cross-Tenant Session Isolation (User A vs User B)", () => {
    const billIdA = randomUUID();
    const billIdB = randomUUID();

    it("creates isolated bills for User A and User B and indexes them under their respective profiles", async () => {
      // Create Bill A by User A
      const createResA = await request(httpsServer)
        .post("/api/bills/new")
        .set("Authorization", `Bearer ${tokenUserA}`)
        .send({
          bill_id: billIdA,
          title: "Trattoria Roma — Столик Алисы",
          currency: "RUB",
          people: ["Алиса", "Даша"],
          raw_items: [
            { item_name: "Пицца Маргарита", price: 650, quantity: 1 },
            { item_name: "Паста Карбонара", price: 550, quantity: 1 },
          ],
          tip_percentage: 10,
        });

      expect(createResA.status).toBe(200);
      expect(createResA.body.bill.bill_id).toBe(billIdA);
      expect(createResA.body.bill.owner_sub).toBe(subUserA);

      // Create Bill B by User B
      const createResB = await request(httpsServer)
        .post("/api/bills/new")
        .set("Authorization", `Bearer ${tokenUserB}`)
        .send({
          bill_id: billIdB,
          title: "Tokyo Ramen Bar — Столик Боба",
          currency: "RUB",
          people: ["Боб", "Макс"],
          raw_items: [
            { item_name: "Рамен Тонкоцу", price: 700, quantity: 1 },
            { item_name: "Зеленый чай", price: 200, quantity: 1 },
          ],
          tip_percentage: 10,
        });

      expect(createResB.status).toBe(200);
      expect(createResB.body.bill.bill_id).toBe(billIdB);
      expect(createResB.body.bill.owner_sub).toBe(subUserB);
    });

    it("guarantees User A UI view strictly contains Bill A data and zero Bill B data", async () => {
      const resA = await request(httpsServer).get(
        `/ui/bill-board?bill_id=${billIdA}`
      );
      expect(resA.status).toBe(200);
      expect(resA.text).toContain("Trattoria Roma");
      expect(resA.text).toContain("Пицца Маргарита");
      expect(resA.text).not.toContain("Tokyo Ramen Bar");
      expect(resA.text).not.toContain("Рамен Тонкоцу");
    });

    it("guarantees User B UI view strictly contains Bill B data and zero Bill A data", async () => {
      const resB = await request(httpsServer).get(
        `/ui/bill-board?bill_id=${billIdB}`
      );
      expect(resB.status).toBe(200);
      expect(resB.text).toContain("Tokyo Ramen Bar");
      expect(resB.text).toContain("Рамен Тонкоцу");
      expect(resB.text).not.toContain("Trattoria Roma");
      expect(resB.text).not.toContain("Пицца Маргарита");
    });

    it("verifies User A history contains only Bill A, and User B history contains only Bill B", async () => {
      const historyA = await request(httpsServer)
        .get("/api/user/history")
        .set("Authorization", `Bearer ${tokenUserA}`);

      expect(historyA.status).toBe(200);
      const billIdsA = historyA.body.bills.map(
        (b: { bill_id: string }) => b.bill_id
      );
      expect(billIdsA).toContain(billIdA);
      expect(billIdsA).not.toContain(billIdB);

      const historyB = await request(httpsServer)
        .get("/api/user/history")
        .set("Authorization", `Bearer ${tokenUserB}`);

      expect(historyB.status).toBe(200);
      const billIdsB = historyB.body.bills.map(
        (b: { bill_id: string }) => b.bill_id
      );
      expect(billIdsB).toContain(billIdB);
      expect(billIdsB).not.toContain(billIdA);
    });
  });

  describe("Section 3: Shareable Co-Claiming & Proportional Split Recalculation", () => {
    const sharedBillId = randomUUID();

    beforeAll(async () => {
      // Create initial bill with 2 items and single participant
      await request(httpsServer)
        .post("/api/bills/new")
        .send({
          bill_id: sharedBillId,
          title: "Кафе Дружба",
          currency: "RUB",
          people: ["Алиса"],
          raw_items: [
            { item_name: "Хачапури по-аджарски", price: 600, quantity: 1 },
            { item_name: "Лимонад Тархун", price: 300, quantity: 1 },
          ],
          tip_percentage: 10,
        });
    });

    it("allows a guest opening the shared link to claim a dish via POST /api/bills/:billId/claim", async () => {
      const claimRes = await request(httpsServer)
        .post(`/api/bills/${sharedBillId}/claim`)
        .send({
          item_id: "item_1",
          user_id: "guest_carol_uuid",
          user_name: "Кэрол",
          action: "claim",
        });

      expect(claimRes.status).toBe(200);
      expect(claimRes.body.success).toBe(true);

      const bill = claimRes.body.bill;
      // Item 1 has claimant
      const item1 = bill.raw_items[0];
      expect(item1.claimedBy).toBeDefined();
      expect(
        item1.claimedBy.some(
          (c: { userName: string }) => c.userName === "Кэрол"
        )
      ).toBe(true);

      // Кэрол added to participants list
      expect(bill.people).toContain("Кэрол");

      // Grand total check: Subtotal 900 + 10% Tip (90) = 990
      expect(bill.grand_total).toBe(990);

      // Cent-exact mathematical split:
      // Item 1 (600) shared between Алиса and Кэрол (300 each)
      // Item 2 (300) unassigned or Алиса -> Алиса has Tarhun
      const sumShares = bill.people_shares.reduce(
        (sum: number, s: { total_owed: number }) => sum + s.total_owed,
        0
      );
      expect(Math.round(sumShares * 100)).toBe(Math.round(bill.grand_total * 100));
    });

    it("toggles claim off when the same user claims the dish again", async () => {
      const unclaimRes = await request(httpsServer)
        .post(`/api/bills/${sharedBillId}/claim`)
        .send({
          item_id: "item_1",
          user_id: "guest_carol_uuid",
          user_name: "Кэрол",
          action: "toggle",
        });

      expect(unclaimRes.status).toBe(200);
      const item1 = unclaimRes.body.bill.raw_items[0];
      expect(
        item1.claimedBy.some(
          (c: { userName: string }) => c.userName === "Кэрол"
        )
      ).toBe(false);
    });

    it("returns 404 for claim on non-existent bill", async () => {
      const res = await request(httpsServer)
        .post(`/api/bills/${randomUUID()}/claim`)
        .send({
          item_id: "item_1",
          user_id: "guest_user",
          user_name: "Гость",
        });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("bill_not_found");
    });
  });
});
