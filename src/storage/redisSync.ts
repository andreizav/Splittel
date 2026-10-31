import { EventEmitter } from "node:events";
import { randomUUID } from "node:crypto";
import { Redis } from "ioredis";
import type { ParsedBillBoard } from "../domain/types.js";

/**
 * Realtime Bill State Locking, 24h TTL Cache & Pub/Sub Sync Engine (`ioredis`).
 *
 * - Stores active bill state under `bill:state:{bill_id}` with 24h TTL (86,400s).
 * - Protects concurrent dish/tip/currency mutations via atomic distributed mutex locks.
 * - Broadcasts live updates via Redis Pub/Sub (`splittel:bill:updates:{bill_id}`)
 *   to synchronize all connected `/ui/bill-board` iframe clients in real time.
 * - Gracefully degrades to an in-process mutex + TTL cache + EventEmitter bus
 *   when Redis is offline or `driver === "memory"`.
 */

export const BILL_STATE_TTL_SECONDS = 86_400; // 24 hours
const BILL_UPDATES_PATTERN = "splittel:bill:updates:*";

const RELEASE_LOCK_LUA = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
`;

export function getBillStateRedisKey(billId: string): string {
  return `bill:state:${billId}`;
}

export function getBillLockRedisKey(billId: string): string {
  return `bill:lock:${billId}`;
}

export function getBillPubSubChannel(billId: string): string {
  return `splittel:bill:updates:${billId}`;
}

export interface BillRealtimeUpdateEvent {
  type: "bill_state_updated" | "settlement_updated";
  bill_id: string;
  updated_at: string;
  bill: ParsedBillBoard;
}

export type BillUpdateListener = (event: BillRealtimeUpdateEvent) => void;

export class RedisBillSync {
  private pubClient: Redis | null = null;
  private subClient: Redis | null = null;
  private redisActive = false;

  // Fallback in-memory TTL cache + FIFO mutex queues + local EventEmitter
  private memoryCache = new Map<string, { payload: string; expiresAt: number }>();
  private localMutexQueues = new Map<string, Promise<void>>();
  private emitter = new EventEmitter();

  constructor(
    private readonly options: {
      redisUrl?: string;
      enabled?: boolean;
      ttlSeconds?: number;
    } = {}
  ) {
    this.emitter.setMaxListeners(500);
  }

  public async initialize(): Promise<"redis" | "memory-fallback"> {
    if (this.options.enabled === false || !this.options.redisUrl) {
      return "memory-fallback";
    }

    const isLocalRedis = /(?:^|\/\/)(?:localhost|127\.0\.0\.1|\[::1\])(?::|\/|$)/i.test(
      this.options.redisUrl
    );
    const clientOptions = {
      lazyConnect: true,
      family: 0, // Dual-stack IPv4 + IPv6 (required for Railway `*.railway.internal` AAAA DNS)
      maxRetriesPerRequest: 2,
      enableOfflineQueue: false,
      connectTimeout: isLocalRedis ? 1200 : 8000,
      retryStrategy: (times: number) => {
        if (!this.redisActive) return null;
        return Math.min(times * 250, 2000);
      },
    };

    const maxAttempts = isLocalRedis ? 1 : 4;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const pub = new Redis(this.options.redisUrl, clientOptions);
      const sub = new Redis(this.options.redisUrl, clientOptions);

      // Prevent unhandled 'error' events if Redis is unreachable
      pub.on("error", () => undefined);
      sub.on("error", () => undefined);

      try {
        await Promise.all([pub.connect(), sub.connect()]);
        await pub.ping();

        await sub.psubscribe(BILL_UPDATES_PATTERN);
        sub.on("pmessage", (_pattern: string, channel: string, message: string) => {
          try {
            const parsed = JSON.parse(message) as BillRealtimeUpdateEvent;
            this.emitter.emit(channel, parsed);
          } catch {
            // Ignore malformed pub/sub frames
          }
        });

        this.pubClient = pub;
        this.subClient = sub;
        this.redisActive = true;
        return "redis";
      } catch {
        await Promise.allSettled([pub.quit(), sub.quit()]);
        pub.disconnect();
        sub.disconnect();
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1500));
        }
      }
    }

    this.pubClient = null;
    this.subClient = null;
    this.redisActive = false;
    return "memory-fallback";
  }

  public isRedisConnected(): boolean {
    return this.redisActive && this.pubClient !== null;
  }

  public getStatus(): "redis" | "memory-fallback" {
    return this.isRedisConnected() ? "redis" : "memory-fallback";
  }

  /**
   * Stores temporary bill state under `bill:state:{bill_id}` with 24-hour TTL.
   */
  public async cacheBillState(
    bill: ParsedBillBoard,
    ttlSeconds: number = this.options.ttlSeconds ?? BILL_STATE_TTL_SECONDS
  ): Promise<void> {
    const key = getBillStateRedisKey(bill.bill_id);
    const serialized = JSON.stringify(bill);

    if (this.redisActive && this.pubClient) {
      try {
        await this.pubClient.set(key, serialized, "EX", ttlSeconds);
        return;
      } catch {
        // Fall through to memory cache if transient Redis failure occurs
      }
    }

    this.memoryCache.set(key, {
      payload: serialized,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Reads cached bill state from `bill:state:{bill_id}` if not expired.
   */
  public async getCachedBillState(
    billId: string
  ): Promise<ParsedBillBoard | undefined> {
    const key = getBillStateRedisKey(billId);

    if (this.redisActive && this.pubClient) {
      try {
        const raw = await this.pubClient.get(key);
        if (raw) {
          return JSON.parse(raw) as ParsedBillBoard;
        }
      } catch {
        // Fall back to local cache
      }
    }

    const entry = this.memoryCache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      return undefined;
    }
    return JSON.parse(entry.payload) as ParsedBillBoard;
  }

  /**
   * Executes an async state mutation under an exclusive per-bill lock (`bill:lock:{bill_id}`)
   * to prevent lost updates when multiple friends tap dishes simultaneously.
   */
  public async withBillLock<T>(
    billId: string,
    fn: () => Promise<T>,
    lockTtlMs = 5000
  ): Promise<T> {
    if (this.redisActive && this.pubClient) {
      const lockKey = getBillLockRedisKey(billId);
      const lockToken = randomUUID();
      const deadline = Date.now() + lockTtlMs;
      let acquired = false;

      while (Date.now() < deadline) {
        try {
          const res = await this.pubClient.set(
            lockKey,
            lockToken,
            "PX",
            lockTtlMs,
            "NX"
          );
          if (res === "OK") {
            acquired = true;
            break;
          }
        } catch {
          // Redis degraded mid-flight — fall back to local queue
          break;
        }
        await new Promise((r) => setTimeout(r, 25));
      }

      if (acquired) {
        try {
          return await fn();
        } finally {
          await this.pubClient
            .eval(RELEASE_LOCK_LUA, 1, lockKey, lockToken)
            .catch(() => undefined);
        }
      }
    }

    // In-process FIFO mutex fallback
    const prev = this.localMutexQueues.get(billId) ?? Promise.resolve();
    let releaseLocal!: () => void;
    const currentGate = new Promise<void>((resolve) => {
      releaseLocal = resolve;
    });
    const chained = prev.then(() => currentGate);
    this.localMutexQueues.set(billId, chained);

    await prev;
    try {
      return await fn();
    } finally {
      releaseLocal();
      if (this.localMutexQueues.get(billId) === chained) {
        this.localMutexQueues.delete(billId);
      }
    }
  }

  /**
   * Publishes a real-time bill state update via Redis Pub/Sub (or local EventEmitter fallback)
   * and refreshes the 24h `bill:state:{bill_id}` cache key.
   */
  public async publishBillUpdate(
    bill: ParsedBillBoard,
    type: BillRealtimeUpdateEvent["type"] = "bill_state_updated"
  ): Promise<void> {
    await this.cacheBillState(bill);

    const channel = getBillPubSubChannel(bill.bill_id);
    const event: BillRealtimeUpdateEvent = {
      type,
      bill_id: bill.bill_id,
      updated_at: new Date().toISOString(),
      bill,
    };

    if (this.redisActive && this.pubClient) {
      try {
        await this.pubClient.publish(channel, JSON.stringify(event));
        return;
      } catch {
        // Fallback to local emitter
      }
    }

    this.emitter.emit(channel, event);
  }

  /**
   * Subscribes to live updates for a given `bill_id`. Returns an unsubscribe callback.
   */
  public subscribeToBill(
    billId: string,
    listener: BillUpdateListener
  ): () => void {
    const channel = getBillPubSubChannel(billId);
    this.emitter.on(channel, listener);
    return () => {
      this.emitter.off(channel, listener);
    };
  }

  public async close(): Promise<void> {
    this.emitter.removeAllListeners();
    this.memoryCache.clear();
    if (this.subClient) {
      await this.subClient.quit().catch(() => undefined);
      this.subClient.disconnect();
      this.subClient = null;
    }
    if (this.pubClient) {
      await this.pubClient.quit().catch(() => undefined);
      this.pubClient.disconnect();
      this.pubClient = null;
    }
    this.redisActive = false;
  }
}

