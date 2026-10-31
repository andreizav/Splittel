import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import {
  createSplittelMcpServer,
  type CreateSplittelMcpDeps,
} from "./server.js";

interface ActiveStreamableSession {
  sessionId: string;
  server: McpServer;
  transport: StreamableHTTPServerTransport;
  createdAtMs: number;
  lastSeenMs: number;
}

interface ActiveLegacySseSession {
  sessionId: string;
  server: McpServer;
  transport: SSEServerTransport;
  createdAtMs: number;
}

/**
 * Ensures `Accept` header complies with MCP Streamable HTTP transport negotiation
 * while detecting whether the caller explicitly requested an SSE response stream
 * or prefers an immediate `application/json` payload (e.g., Cloud Run / curl JSON-RPC).
 */
function normalizePostAcceptHeader(req: Request): { wantsEventStream: boolean } {
  const rawAccept = req.headers.accept ?? "";
  const wantsEventStream = rawAccept.includes("text/event-stream");
  if (
    !rawAccept.includes("application/json") ||
    !rawAccept.includes("text/event-stream")
  ) {
    req.headers.accept = "application/json, text/event-stream";
  }
  return { wantsEventStream };
}

export class McpTransportManager {
  private readonly streamableSessions = new Map<string, ActiveStreamableSession>();
  private readonly sseSessions = new Map<string, ActiveLegacySseSession>();
  private readonly cleanupInterval: NodeJS.Timeout;

  constructor(
    private readonly deps: CreateSplittelMcpDeps,
    private readonly sessionTtlMs = 30 * 60 * 1000
  ) {
    this.cleanupInterval = setInterval(() => {
      const cutoff = Date.now() - this.sessionTtlMs;
      for (const [id, session] of this.streamableSessions.entries()) {
        if (session.lastSeenMs < cutoff) {
          void session.transport.close().catch(() => undefined);
          void session.server.close().catch(() => undefined);
          this.streamableSessions.delete(id);
        }
      }
    }, 60_000);
    this.cleanupInterval.unref();
  }

  /**
   * Handles POST /mcp (Streamable HTTP JSON-RPC 2.0):
   * 1. `initialize` without session -> creates stateful session (`mcp-session-id` header)
   * 2. Subsequent call with `mcp-session-id` -> routes to stateful session
   * 3. Direct call without `mcp-session-id` (stateless JSON-RPC mode) -> executes ephemerally
   */
  async handlePostMcp(req: Request, res: Response): Promise<void> {
    const { wantsEventStream } = normalizePostAcceptHeader(req);
    const headerSessionId = req.headers["mcp-session-id"];
    const sessionId = Array.isArray(headerSessionId)
      ? headerSessionId[0]
      : headerSessionId;

    // Case 1: Existing stateful session
    if (sessionId) {
      const existing = this.streamableSessions.get(sessionId);
      if (!existing) {
        res.status(404).json({
          jsonrpc: "2.0",
          error: {
            code: -32001,
            message: `MCP session not found or expired: ${sessionId}`,
          },
          id: null,
        });
        return;
      }
      existing.lastSeenMs = Date.now();
      await existing.transport.handleRequest(req, res, req.body);
      return;
    }

    // Case 2: New stateful session via `initialize`
    if (isInitializeRequest(req.body)) {
      const mcpServer = createSplittelMcpServer(this.deps);
      let createdSessionId: string | undefined;

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        enableJsonResponse: !wantsEventStream,
        onsessioninitialized: (sid) => {
          createdSessionId = sid;
          this.streamableSessions.set(sid, {
            sessionId: sid,
            server: mcpServer,
            transport,
            createdAtMs: Date.now(),
            lastSeenMs: Date.now(),
          });
        },
        onsessionclosed: (sid) => {
          this.streamableSessions.delete(sid);
        },
      });

      transport.onclose = () => {
        if (createdSessionId) {
          this.streamableSessions.delete(createdSessionId);
        }
      };

      await mcpServer.connect(transport);
      await transport.handleRequest(req, res, req.body);
      return;
    }

    // Case 3: Stateless JSON-RPC 2.0 invocation directly on POST /mcp
    const ephemeralServer = createSplittelMcpServer(this.deps);
    const statelessTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: !wantsEventStream,
    });

    res.on("close", () => {
      void statelessTransport.close().catch(() => undefined);
      void ephemeralServer.close().catch(() => undefined);
    });

    await ephemeralServer.connect(statelessTransport);
    await statelessTransport.handleRequest(req, res, req.body);
  }

  /**
   * Handles GET /mcp (Streamable HTTP standalone SSE notification stream).
   */
  async handleGetMcp(req: Request, res: Response): Promise<void> {
    const headerSessionId = req.headers["mcp-session-id"];
    const sessionId = Array.isArray(headerSessionId)
      ? headerSessionId[0]
      : headerSessionId;

    if (!sessionId) {
      res.status(400).json({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message:
            "Missing Mcp-Session-Id header for GET /mcp SSE stream. Initialize via POST /mcp first or connect to GET /sse.",
        },
        id: null,
      });
      return;
    }

    const existing = this.streamableSessions.get(sessionId);
    if (!existing) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: {
          code: -32001,
          message: `MCP session not found: ${sessionId}`,
        },
        id: null,
      });
      return;
    }

    if (!req.headers.accept?.includes("text/event-stream")) {
      req.headers.accept = "text/event-stream";
    }

    existing.lastSeenMs = Date.now();
    await existing.transport.handleRequest(req, res);
  }

  /**
   * Handles DELETE /mcp (Explicit stateful session termination).
   */
  async handleDeleteMcp(req: Request, res: Response): Promise<void> {
    const headerSessionId = req.headers["mcp-session-id"];
    const sessionId = Array.isArray(headerSessionId)
      ? headerSessionId[0]
      : headerSessionId;

    if (!sessionId) {
      res.status(400).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Missing Mcp-Session-Id header" },
        id: null,
      });
      return;
    }

    const existing = this.streamableSessions.get(sessionId);
    if (!existing) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32001, message: `MCP session not found: ${sessionId}` },
        id: null,
      });
      return;
    }

    await existing.transport.handleRequest(req, res);
    this.streamableSessions.delete(sessionId);
    await existing.server.close().catch(() => undefined);
  }

  /**
   * Handles GET /sse (Dedicated SSE transport endpoint for SSE-based Remote MCP clients).
   */
  async handleLegacySseConnect(_req: Request, res: Response): Promise<void> {
    const mcpServer = createSplittelMcpServer(this.deps);
    const transport = new SSEServerTransport("/messages", res);
    const sid = transport.sessionId;

    this.sseSessions.set(sid, {
      sessionId: sid,
      server: mcpServer,
      transport,
      createdAtMs: Date.now(),
    });

    res.on("close", () => {
      this.sseSessions.delete(sid);
      void mcpServer.close().catch(() => undefined);
    });

    await mcpServer.connect(transport);
  }

  /**
   * Handles POST /messages?sessionId=... for SSE Remote MCP clients.
   */
  async handleLegacySseMessage(req: Request, res: Response): Promise<void> {
    const sessionId =
      typeof req.query.sessionId === "string" ? req.query.sessionId : "";
    const session = this.sseSessions.get(sessionId);
    if (!session) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: {
          code: -32001,
          message: `Active SSE session not found for sessionId=${sessionId}`,
        },
        id: null,
      });
      return;
    }

    await session.transport.handlePostMessage(req, res, req.body);
  }

  getActiveSessionCounts(): { streamable: number; sse: number } {
    return {
      streamable: this.streamableSessions.size,
      sse: this.sseSessions.size,
    };
  }

  async shutdown(): Promise<void> {
    clearInterval(this.cleanupInterval);
    for (const session of this.streamableSessions.values()) {
      await session.transport.close().catch(() => undefined);
      await session.server.close().catch(() => undefined);
    }
    this.streamableSessions.clear();

    for (const session of this.sseSessions.values()) {
      await session.transport.close().catch(() => undefined);
      await session.server.close().catch(() => undefined);
    }
    this.sseSessions.clear();
  }
}

