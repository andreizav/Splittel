import pg from "pg";
import {
  anonymizeReceiptForIndex,
  toPriceCentsBigInt,
} from "../domain/anonymizer.js";
import { parseAndSplitBill } from "../domain/billSplitter.js";
import {
  extractCategoriesFromItems,
  queryNearbyBenchmarksPostGis,
  type NearbyRestaurantBenchmark,
} from "../domain/cpaEngine.js";
import { extractAnonymousSnippet } from "../domain/recommendationEngine.js";
import type {
  ParsedBillBoard,
  PaymentCard,
  ReceiptSnippetRecord,
  TransactionRecord,
  TransactionStatus,
  UserPaymentProfile,
} from "../domain/types.js";
import type { RedisBillSync } from "../storage/redisSync.js";

const { Pool } = pg;

export interface SettleResult {
  transaction: TransactionRecord;
  previous_status: TransactionStatus;
  updated_bill?: ParsedBillBoard;
}

export class LedgerStore {
  private bills = new Map<string, ParsedBillBoard>();
  private transactions = new Map<string, TransactionRecord>();
  private paymentCards = new Map<string, PaymentCard>();
  private paymentProfiles = new Map<string, UserPaymentProfile>();
  private receiptSnippets: ReceiptSnippetRecord[] = [];
  private pgPool: pg.Pool | undefined;
  private pgActive = false;
  private postgisActive = false;

  constructor(
    private readonly options: {
      databaseUrl?: string;
      driver?: "auto" | "postgres" | "r2" | "memory";
      strict?: boolean;
      publicBaseUrl?: string;
      redisSync?: RedisBillSync;
    } = {}
  ) {}

  private saveBillSync(bill: ParsedBillBoard): void {
    this.bills.set(bill.bill_id, bill);
    this.receiptSnippets.push(
      extractAnonymousSnippet({
        bill_id: bill.bill_id,
        title: bill.title,
        currency: bill.currency,
        grand_total: bill.grand_total,
        items: bill.raw_items,
        people: bill.people,
      })
    );
    for (const share of bill.people_shares) {
      this.transactions.set(share.transaction_id, {
        transaction_id: share.transaction_id,
        kind: "bill_share",
        bill_id: bill.bill_id,
        debtor: share.person,
        creditor: "Table Organizer",
        amount: share.settlement_total_owed ?? share.total_owed,
        currency: share.settlement_currency ?? bill.currency,
        status: share.status,
        created_at: bill.created_at,
        settled_at: share.settled_at,
        settled_by: share.settled_by,
      });
    }
  }

  async initialize(): Promise<"postgres" | "memory"> {
    const driver = this.options.driver ?? "auto";
    const strictPostgres =
      Boolean(this.options.strict) || driver === "postgres" || driver === "r2";

    if (driver === "memory") {
      if (this.options.strict) {
        throw new Error(
          'LedgerStore initialization failed: STORAGE_DRIVER="memory" is forbidden in strict/production mode.'
        );
      }
      return "memory";
    }

    if (!this.options.databaseUrl?.trim()) {
      if (strictPostgres) {
        throw new Error(
          "LedgerStore initialization failed: DATABASE_URL is required in production, postgres, or r2 mode."
        );
      }
      return "memory";
    }

    const isLocalPostgres = /(?:@|\/\/)(?:localhost|127\.0\.0\.1|\[::1\])(?::|\/|$)/i.test(
      this.options.databaseUrl
    );
    const useSsl =
      /[?&]sslmode=(?:require|verify-ca|verify-full)/i.test(this.options.databaseUrl) &&
      !isLocalPostgres;

    let pool = new Pool({
      connectionString: this.options.databaseUrl,
      connectionTimeoutMillis: isLocalPostgres ? 1500 : 10000,
      max: 10,
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    });

    try {
      let client: pg.PoolClient | undefined;
      const maxAttempts = isLocalPostgres ? 1 : 4;
      let lastErr: unknown;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          client = await pool.connect();
          break;
        } catch (err) {
          lastErr = err;
          const msg = err instanceof Error ? err.message : String(err);
          // Automatically switch to permissive TLS if remote Postgres mandates SSL with self-signed cert
          if (!isLocalPostgres && !useSsl && /ssl|encryption|pg_hba/i.test(msg)) {
            await pool.end().catch(() => undefined);
            pool = new Pool({
              connectionString: this.options.databaseUrl,
              connectionTimeoutMillis: 10000,
              max: 10,
              ssl: { rejectUnauthorized: false },
            });
          } else if (attempt < maxAttempts) {
            await new Promise((r) => setTimeout(r, 1500));
          }
        }
      }
      if (!client) {
        throw lastErr ?? new Error("PostgreSQL connection failed");
      }
      try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`).catch(() => undefined);

        let hasPostgis = false;
        try {
          await client.query(`CREATE EXTENSION IF NOT EXISTS "postgis";`);
          hasPostgis = true;
        } catch {
          hasPostgis = false;
        }
        this.postgisActive = hasPostgis;

        // 1. Enums & Enterprise Relational Tables (`bills`, `receipt_items`, `debt_settlements`)
        await client.query(`
          DO $$ BEGIN
            CREATE TYPE bill_status AS ENUM ('OPEN', 'SETTLED', 'CANCELLED');
          EXCEPTION
            WHEN duplicate_object THEN NULL;
          END $$;

          DO $$ BEGIN
            CREATE TYPE item_category AS ENUM ('mains', 'drinks', 'desserts', 'starters', 'other');
          EXCEPTION
            WHEN duplicate_object THEN NULL;
          END $$;

          DO $$ BEGIN
            CREATE TYPE settlement_status AS ENUM ('PENDING', 'PAID');
          EXCEPTION
            WHEN duplicate_object THEN NULL;
          END $$;

          CREATE TABLE IF NOT EXISTS bills (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            external_bill_id TEXT UNIQUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            total_amount BIGINT NOT NULL CHECK (total_amount >= 0),
            currency VARCHAR(8) NOT NULL DEFAULT 'RUB',
            status bill_status NOT NULL DEFAULT 'OPEN',
            organizer_user_id TEXT NULL,
            image_url TEXT NULL
          );

          CREATE TABLE IF NOT EXISTS debt_settlements (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            external_txn_id TEXT UNIQUE,
            bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
            debtor_name TEXT NOT NULL,
            creditor_name TEXT NOT NULL,
            amount_cents BIGINT NOT NULL CHECK (amount_cents >= 0),
            status settlement_status NOT NULL DEFAULT 'PENDING',
            payment_link TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        if (hasPostgis) {
          await client.query(`
            CREATE TABLE IF NOT EXISTS receipt_items (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
              item_name_raw TEXT NOT NULL,
              item_name_clean TEXT NOT NULL,
              category item_category NOT NULL DEFAULT 'other',
              price_cents BIGINT NOT NULL CHECK (price_cents >= 0),
              currency VARCHAR(8) NOT NULL,
              restaurant_name TEXT NULL,
              location GEOMETRY(Point, 4326) NULL,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS idx_receipt_items_location_gist ON receipt_items USING GIST (location);
          `);
        } else {
          await client.query(`
            CREATE TABLE IF NOT EXISTS receipt_items (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
              item_name_raw TEXT NOT NULL,
              item_name_clean TEXT NOT NULL,
              category item_category NOT NULL DEFAULT 'other',
              price_cents BIGINT NOT NULL CHECK (price_cents >= 0),
              currency VARCHAR(8) NOT NULL,
              restaurant_name TEXT NULL,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
          `);
        }

        // 2. Document projection tables for instant interactive matrix hydrated views
        await client.query(`
          CREATE TABLE IF NOT EXISTS splittel_bills (
            bill_id TEXT PRIMARY KEY,
            owner_sub TEXT,
            payload JSONB NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
          CREATE TABLE IF NOT EXISTS splittel_transactions (
            transaction_id TEXT PRIMARY KEY,
            bill_id TEXT,
            payload JSONB NOT NULL,
            status TEXT NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
          CREATE TABLE IF NOT EXISTS splittel_payment_profiles (
            sub TEXT PRIMARY KEY,
            payload JSONB NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);
      } finally {
        client.release();
      }
      this.pgPool = pool;
      this.pgActive = true;
      return "postgres";
    } catch (err) {
      await pool.end().catch(() => undefined);
      if (strictPostgres) {
        throw err;
      }
      return "memory";
    }
  }

  getActiveDriver(): "postgres" | "memory" {
    return this.pgActive ? "postgres" : "memory";
  }

  isPostGisEnabled(): boolean {
    return this.postgisActive;
  }

  getPgPool(): pg.Pool | undefined {
    return this.pgPool;
  }

  async queryNearbyBenchmarks(params: {
    lat: number;
    lng: number;
    currency: string;
    items: Array<{ item_name: string }>;
    excludeRestaurantName?: string;
    radiusMeters?: number;
  }): Promise<NearbyRestaurantBenchmark[]> {
    return queryNearbyBenchmarksPostGis(this.pgPool, this.postgisActive, {
      lat: params.lat,
      lng: params.lng,
      currency: params.currency,
      categories: extractCategoriesFromItems(params.items),
      excludeRestaurantName: params.excludeRestaurantName,
      radiusMeters: params.radiusMeters,
    });
  }

  async close(): Promise<void> {
    if (this.pgPool) {
      await this.pgPool.end();
      this.pgPool = undefined;
      this.pgActive = false;
      this.postgisActive = false;
    }
  }

  private deriveBillStatus(
    bill: ParsedBillBoard
  ): "OPEN" | "SETTLED" | "CANCELLED" {
    if (bill.people_shares.length === 0) return "OPEN";
    if (bill.people_shares.every((s) => s.status === "PAID")) return "SETTLED";
    if (bill.people_shares.every((s) => s.status === "CANCELLED")) {
      return "CANCELLED";
    }
    return "OPEN";
  }

  async saveBill(
    bill: ParsedBillBoard,
    options: { recordReceiptItems?: boolean } = {}
  ): Promise<void> {
    // Strictly forbid storing raw base64 / data URIs in DB — only HTTPS CDN URLs allowed
    if (bill.image_url && !/^https?:\/\//i.test(bill.image_url)) {
      bill.image_url = null;
    }

    this.saveBillSync(bill);

    if (this.options.redisSync) {
      await this.options.redisSync.cacheBillState(bill);
    }

    if (this.pgActive && this.pgPool) {
      const totalCents = toPriceCentsBigInt(bill.grand_total).toString();
      const billStatus = this.deriveBillStatus(bill);

      // 1. Upsert into normalized `bills` table
      const billRow = await this.pgPool.query<{ id: string }>(
        `INSERT INTO bills (external_bill_id, created_at, total_amount, currency, status, organizer_user_id, image_url)
         VALUES ($1, $2::timestamptz, $3::bigint, $4, $5::bill_status, $6, $7)
         ON CONFLICT (external_bill_id) DO UPDATE SET
           total_amount = EXCLUDED.total_amount,
           currency = EXCLUDED.currency,
           status = EXCLUDED.status,
           organizer_user_id = COALESCE(EXCLUDED.organizer_user_id, bills.organizer_user_id),
           image_url = COALESCE(EXCLUDED.image_url, bills.image_url)
         RETURNING id`,
        [
          bill.bill_id,
          bill.created_at,
          totalCents,
          bill.currency,
          billStatus,
          bill.owner_sub ?? null,
          bill.image_url ?? null,
        ]
      );

      const billUuid = billRow.rows[0]?.id;

      // 2. Insert PII-anonymized dish records into `receipt_items` (only on initial creation)
      if (billUuid && options.recordReceiptItems !== false) {
        const existingItemsCount = await this.pgPool.query<{ cnt: number }>(
          `SELECT COUNT(*)::int AS cnt FROM receipt_items WHERE bill_id = $1`,
          [billUuid]
        );
        if ((existingItemsCount.rows[0]?.cnt ?? 0) === 0) {
          const anonymized = anonymizeReceiptForIndex({
            restaurant_name: bill.title,
            geo_location: bill.geo_location ?? null,
            currency: bill.currency,
            items: bill.raw_items.map((i) => ({
              item_name: i.item_name,
              price: i.price,
            })),
            participant_names: bill.people,
          });

          for (const rec of anonymized) {
            if (this.postgisActive && rec.geo_location) {
              await this.pgPool.query(
                `INSERT INTO receipt_items (
                   bill_id, item_name_raw, item_name_clean, category, price_cents, currency, restaurant_name, location
                 ) VALUES (
                   $1, $2, $3, $4::item_category, $5::bigint, $6, $7,
                   ST_SetSRID(ST_MakePoint($8, $9), 4326)
                 )`,
                [
                  billUuid,
                  rec.item_name_clean, // Never persist un-scrubbed PII in raw column either
                  rec.item_name_clean,
                  rec.category,
                  rec.price_cents.toString(),
                  rec.currency,
                  rec.restaurant_name,
                  rec.geo_location.lng,
                  rec.geo_location.lat,
                ]
              );
            } else {
              await this.pgPool.query(
                `INSERT INTO receipt_items (
                   bill_id, item_name_raw, item_name_clean, category, price_cents, currency, restaurant_name
                 ) VALUES ($1, $2, $3, $4::item_category, $5::bigint, $6, $7)`,
                [
                  billUuid,
                  rec.item_name_clean,
                  rec.item_name_clean,
                  rec.category,
                  rec.price_cents.toString(),
                  rec.currency,
                  rec.restaurant_name,
                ]
              );
            }
          }
        }
      }

      // 3. Upsert into normalized `debt_settlements`
      if (billUuid) {
        for (const share of bill.people_shares) {
          const amountCents = toPriceCentsBigInt(
            share.settlement_total_owed ?? share.total_owed
          ).toString();
          const dbStatus: "PENDING" | "PAID" =
            share.status === "PAID" ? "PAID" : "PENDING";
          const paymentLink =
            share.payment.sbp_link ||
            share.payment.stripe_link ||
            share.payment.pay_url;

          await this.pgPool.query(
            `INSERT INTO debt_settlements (
               external_txn_id, bill_id, debtor_name, creditor_name, amount_cents, status, payment_link
             ) VALUES ($1, $2, $3, $4, $5::bigint, $6::settlement_status, $7)
             ON CONFLICT (external_txn_id) DO UPDATE SET
               amount_cents = EXCLUDED.amount_cents,
               status = EXCLUDED.status,
               payment_link = EXCLUDED.payment_link`,
            [
              share.transaction_id,
              billUuid,
              share.person,
              "Table Organizer",
              amountCents,
              dbStatus,
              paymentLink,
            ]
          );
        }
      }

      // 4. Upsert hydrated matrix state for fast UI loads
      await this.pgPool.query(
        `INSERT INTO splittel_bills (bill_id, owner_sub, payload, created_at, updated_at)
         VALUES ($1, $2, $3::jsonb, $4::timestamptz, NOW())
         ON CONFLICT (bill_id) DO UPDATE SET owner_sub = COALESCE(EXCLUDED.owner_sub, splittel_bills.owner_sub), payload = EXCLUDED.payload, updated_at = NOW()`,
        [bill.bill_id, bill.owner_sub ?? null, JSON.stringify(bill), bill.created_at]
      );

      for (const share of bill.people_shares) {
        const txn = this.transactions.get(share.transaction_id);
        if (txn) {
          await this.pgPool.query(
            `INSERT INTO splittel_transactions (transaction_id, bill_id, payload, status, updated_at)
             VALUES ($1, $2, $3::jsonb, $4, NOW())
             ON CONFLICT (transaction_id) DO UPDATE SET payload = EXCLUDED.payload, status = EXCLUDED.status, updated_at = NOW()`,
            [txn.transaction_id, bill.bill_id, JSON.stringify(txn), txn.status]
          );
        }
      }
    }
  }

  async getBill(billId?: string): Promise<ParsedBillBoard | undefined> {
    if (!billId || !billId.trim()) {
      return undefined;
    }

    const cleanBillId = billId.trim();

    // 1. Check Redis 24h TTL state cache first
    if (this.options.redisSync) {
      const cached = await this.options.redisSync.getCachedBillState(cleanBillId);
      if (cached) {
        this.bills.set(cleanBillId, cached);
        return cached;
      }
    }

    // 2. Check in-memory map
    const mem = this.bills.get(cleanBillId);
    if (mem) return mem;

    // 3. Fallback to PostgreSQL
    if (this.pgActive && this.pgPool) {
      const res = await this.pgPool.query<{ payload: ParsedBillBoard }>(
        `SELECT payload FROM splittel_bills WHERE bill_id = $1`,
        [cleanBillId]
      );
      if (res.rows[0]?.payload) {
        const hydrated = res.rows[0].payload;
        this.bills.set(cleanBillId, hydrated);
        if (this.options.redisSync) {
          await this.options.redisSync.cacheBillState(hydrated);
        }
        return hydrated;
      }
    }

    return undefined;
  }

  /**
   * Recomputes a bill's splits under an atomic Redis lock (`bill:lock:{bill_id}`),
   * updates the 24h Redis state cache (`bill:state:{bill_id}`), persists to PostgreSQL,
   * and broadcasts the live update over Redis Pub/Sub to all connected iframe clients.
   */
  async updateBillInteractiveState(
    billId: string,
    updates: {
      assignments?: Record<string, string[]>;
      tip_percentage?: number;
      currency?: string;
      settlement_currency?: string;
      exchange_rate?: number;
    }
  ): Promise<ParsedBillBoard | undefined> {
    const runUpdate = async (): Promise<ParsedBillBoard | undefined> => {
      const current = await this.getBill(billId);
      if (!current) return undefined;

      const existingStatuses = new Map<
        string,
        { status: TransactionStatus; settled_at?: string; settled_by?: string }
      >();
      for (const share of current.people_shares) {
        existingStatuses.set(share.person.trim().toLowerCase(), {
          status: share.status,
          settled_at: share.settled_at,
          settled_by: share.settled_by,
        });
      }

      const nextCurrency = updates.currency ?? current.currency;
      const nextSettlementCurrency =
        updates.settlement_currency ??
        (updates.currency ? nextCurrency : current.settlement_currency);

      let nearbyBenchmarks: NearbyRestaurantBenchmark[] | undefined;
      if (current.geo_location) {
        nearbyBenchmarks = await this.queryNearbyBenchmarks({
          lat: current.geo_location.lat,
          lng: current.geo_location.lng,
          currency: nextCurrency,
          items: current.raw_items,
          excludeRestaurantName: current.title,
        });
      }

      const recomputed = await parseAndSplitBill({
        billId: current.bill_id,
        title: current.title,
        currency: nextCurrency,
        settlement_currency: nextSettlementCurrency,
        exchange_rate: updates.exchange_rate ?? current.exchange_rate,
        ownerSub: current.owner_sub,
        image_url: current.image_url,
        geo_location: current.geo_location,
        nearbyBenchmarks,
        baseUrl: this.options.publicBaseUrl ?? "https://localhost:3443",
        raw_items: current.raw_items.map((i) => ({
          item_name: i.item_name,
          price: i.price,
          quantity: i.quantity,
        })),
        people: current.people,
        assignments: updates.assignments ?? current.assignments,
        tip_percentage: updates.tip_percentage ?? current.tip_percentage,
        tax_amount: current.tax_amount,
        existingStatuses,
      });

      await this.saveBill(recomputed, { recordReceiptItems: false });

      if (this.options.redisSync) {
        await this.options.redisSync.publishBillUpdate(
          recomputed,
          "bill_state_updated"
        );
      }

      return recomputed;
    };

    if (this.options.redisSync) {
      return this.options.redisSync.withBillLock(billId, runUpdate);
    }
    return runUpdate();
  }

  async savePaymentCards(cards: PaymentCard[]): Promise<void> {
    for (const card of cards) {
      this.paymentCards.set(card.transaction_id, card);
      const txn: TransactionRecord = {
        transaction_id: card.transaction_id,
        kind: "settlement_card",
        debtor: card.debtor,
        creditor: card.creditor,
        amount: card.amount,
        currency: card.currency,
        status: card.status,
        created_at: card.created_at,
      };
      this.transactions.set(card.transaction_id, txn);

      if (this.pgActive && this.pgPool) {
        await this.pgPool.query(
          `INSERT INTO splittel_transactions (transaction_id, bill_id, payload, status, updated_at)
           VALUES ($1, NULL, $2::jsonb, $3, NOW())
           ON CONFLICT (transaction_id) DO UPDATE SET payload = EXCLUDED.payload, status = EXCLUDED.status, updated_at = NOW()`,
          [txn.transaction_id, JSON.stringify(txn), txn.status]
        );
      }
    }
  }

  async getPaymentCard(transactionId: string): Promise<PaymentCard | undefined> {
    return this.paymentCards.get(transactionId);
  }

  async getTransaction(transactionId: string): Promise<TransactionRecord | undefined> {
    const mem = this.transactions.get(transactionId);
    if (mem) return mem;

    if (this.pgActive && this.pgPool) {
      const res = await this.pgPool.query<{ payload: TransactionRecord }>(
        `SELECT payload FROM splittel_transactions WHERE transaction_id = $1`,
        [transactionId]
      );
      if (res.rows[0]?.payload) {
        this.transactions.set(transactionId, res.rows[0].payload);
        return res.rows[0].payload;
      }
    }
    return undefined;
  }

  async updateTransactionStatus(
    transactionId: string,
    targetStatus: "PAID" | "CANCELLED",
    actor = "user"
  ): Promise<SettleResult> {
    let existing = await this.getTransaction(transactionId);
    const now = new Date().toISOString();

    if (!existing) {
      existing = {
        transaction_id: transactionId,
        kind: "manual",
        debtor: "Participant",
        creditor: "Group Ledger",
        amount: 0,
        currency: "RUB",
        status: "PENDING",
        created_at: now,
      };
    }

    const previousStatus = existing.status;
    const updatedTxn: TransactionRecord = {
      ...existing,
      status: targetStatus,
      settled_at: targetStatus === "PAID" ? now : undefined,
      settled_by: actor,
    };
    this.transactions.set(transactionId, updatedTxn);

    const card = this.paymentCards.get(transactionId);
    if (card) {
      card.status = targetStatus;
    }

    let updatedBill: ParsedBillBoard | undefined;
    if (updatedTxn.bill_id) {
      const bill = await this.getBill(updatedTxn.bill_id);
      if (bill) {
        for (const share of bill.people_shares) {
          if (share.transaction_id === transactionId) {
            share.status = targetStatus;
            share.settled_at = targetStatus === "PAID" ? now : undefined;
            share.settled_by = actor;
          }
        }
        updatedBill = bill;
        this.bills.set(bill.bill_id, bill);

        if (this.pgActive && this.pgPool) {
          const nextBillStatus = this.deriveBillStatus(bill);
          await this.pgPool.query(
            `UPDATE bills SET status = $2::bill_status WHERE external_bill_id = $1`,
            [bill.bill_id, nextBillStatus]
          );
          await this.pgPool.query(
            `UPDATE debt_settlements SET status = $2::settlement_status WHERE external_txn_id = $1`,
            [transactionId, targetStatus === "PAID" ? "PAID" : "PENDING"]
          );
          await this.pgPool.query(
            `UPDATE splittel_bills SET payload = $2::jsonb, updated_at = NOW() WHERE bill_id = $1`,
            [bill.bill_id, JSON.stringify(bill)]
          );
        }

        if (this.options.redisSync) {
          await this.options.redisSync.publishBillUpdate(
            bill,
            "settlement_updated"
          );
        }
      }
    }

    if (this.pgActive && this.pgPool) {
      await this.pgPool.query(
        `INSERT INTO splittel_transactions (transaction_id, bill_id, payload, status, updated_at)
         VALUES ($1, $2, $3::jsonb, $4, NOW())
         ON CONFLICT (transaction_id) DO UPDATE SET payload = EXCLUDED.payload, status = EXCLUDED.status, updated_at = NOW()`,
        [
          updatedTxn.transaction_id,
          updatedTxn.bill_id ?? null,
          JSON.stringify(updatedTxn),
          updatedTxn.status,
        ]
      );
    }

    return {
      transaction: updatedTxn,
      previous_status: previousStatus,
      updated_bill: updatedBill,
    };
  }

  // Account-Linked Expense History & Personal Payment Details (SBP / Stripe)
  async getUserHistory(sub: string): Promise<ParsedBillBoard[]> {
    if (this.pgActive && this.pgPool) {
      try {
        const res = await this.pgPool.query<{ payload: ParsedBillBoard }>(
          `SELECT payload FROM splittel_bills WHERE owner_sub = $1 ORDER BY created_at DESC`,
          [sub]
        );
        if (res.rows.length > 0) {
          return res.rows.map((r) => r.payload);
        }
      } catch {
        // fallback to memory map
      }
    }
    const list: ParsedBillBoard[] = [];
    for (const bill of this.bills.values()) {
      if (bill.owner_sub === sub) {
        list.push(bill);
      }
    }
    return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  /**
   * Interactive Co-Claiming: allows any participant viewing the bill to tap and toggle dish claims.
   * Recalculates all shares, taxes, and tips dynamically using proportional allocation.
   */
  async claimDishOnBill(params: {
    billId: string;
    itemIdOrIndex: string | number;
    userId: string;
    userName: string;
    action?: "toggle" | "claim" | "unclaim";
  }): Promise<ParsedBillBoard | undefined> {
    const bill = await this.getBill(params.billId);
    if (!bill) return undefined;

    const items = [...bill.raw_items];
    let targetIdx = -1;
    if (typeof params.itemIdOrIndex === "number") {
      targetIdx = params.itemIdOrIndex;
    } else {
      targetIdx = items.findIndex(
        (it, idx) =>
          it.item_id === params.itemIdOrIndex ||
          `item_${idx + 1}` === params.itemIdOrIndex ||
          it.item_name.trim().toLowerCase() === String(params.itemIdOrIndex).trim().toLowerCase()
      );
    }

    if (targetIdx < 0 || targetIdx >= items.length) {
      return undefined;
    }

    const targetItem = { ...items[targetIdx]! };
    const currentClaimants = Array.isArray(targetItem.claimedBy)
      ? [...targetItem.claimedBy]
      : [];

    const existingClaimIdx = currentClaimants.findIndex(
      (c) =>
        c.userId === params.userId ||
        c.userName.toLowerCase() === params.userName.toLowerCase()
    );

    const action = params.action ?? "toggle";
    if (action === "toggle") {
      if (existingClaimIdx >= 0) {
        currentClaimants.splice(existingClaimIdx, 1);
      } else {
        currentClaimants.push({
          userId: params.userId,
          userName: params.userName.trim(),
          claimedAt: new Date().toISOString(),
        });
      }
    } else if (action === "claim" && existingClaimIdx < 0) {
      currentClaimants.push({
        userId: params.userId,
        userName: params.userName.trim(),
        claimedAt: new Date().toISOString(),
      });
    } else if (action === "unclaim" && existingClaimIdx >= 0) {
      currentClaimants.splice(existingClaimIdx, 1);
    }

    targetItem.claimedBy = currentClaimants;
    items[targetIdx] = targetItem;

    const rawItemsInput = items.map((it) => ({
      item_name: it.item_name,
      price: it.price,
      quantity: it.quantity,
      claimedBy: it.claimedBy,
    }));

    const existingStatuses = new Map<
      string,
      { status: TransactionStatus; settled_at?: string; settled_by?: string }
    >();
    for (const share of bill.people_shares) {
      existingStatuses.set(share.person, {
        status: share.status,
        settled_at: share.settled_at,
        settled_by: share.settled_by,
      });
    }

    const updatedBill = await parseAndSplitBill({
      raw_items: rawItemsInput,
      people: bill.people.length > 0 ? bill.people : [params.userName.trim()],
      assignments: bill.assignments,
      tip_percentage: bill.tip_percentage,
      tax_amount: bill.tax_amount,
      currency: bill.currency,
      settlement_currency: bill.settlement_currency,
      exchange_rate: bill.exchange_rate,
      title: bill.title,
      baseUrl: this.options.publicBaseUrl,
      billId: bill.bill_id,
      existingStatuses,
      ownerSub: bill.owner_sub,
      image_url: bill.image_url,
      geo_location: bill.geo_location,
    });

    await this.saveBill(updatedBill, { recordReceiptItems: false });
    return updatedBill;
  }

  async attachBillToUserHistory(
    billId: string,
    sub: string
  ): Promise<ParsedBillBoard | undefined> {
    const bill = await this.getBill(billId);
    if (!bill) return undefined;
    bill.owner_sub = sub;
    await this.saveBill(bill, { recordReceiptItems: false });
    return bill;
  }

  async savePaymentProfile(
    profile: UserPaymentProfile
  ): Promise<UserPaymentProfile> {
    this.paymentProfiles.set(profile.sub, profile);
    if (this.pgActive && this.pgPool) {
      await this.pgPool.query(
        `INSERT INTO splittel_payment_profiles (sub, payload, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (sub) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
        [profile.sub, JSON.stringify(profile)]
      );
    }
    return profile;
  }

  async getPaymentProfile(sub: string): Promise<UserPaymentProfile | undefined> {
    const mem = this.paymentProfiles.get(sub);
    if (mem) return mem;
    if (this.pgActive && this.pgPool) {
      const res = await this.pgPool.query<{ payload: UserPaymentProfile }>(
        `SELECT payload FROM splittel_payment_profiles WHERE sub = $1`,
        [sub]
      );
      if (res.rows[0]?.payload) {
        this.paymentProfiles.set(sub, res.rows[0].payload);
        return res.rows[0].payload;
      }
    }
    return undefined;
  }
}
