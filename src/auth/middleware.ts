import type { NextFunction, Request, RequestHandler, Response } from "express";
import {
  InsufficientScopeError,
  InvalidTokenError,
  OAuthError,
} from "@modelcontextprotocol/sdk/server/auth/errors.js";
import type { OAuthTokenVerifier } from "@modelcontextprotocol/sdk/server/auth/provider.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { SPLITTEL_SCOPES } from "./oauthProvider.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthInfo;
    }
  }
}

export interface ProtectedMcpAuthOptions {
  verifier: OAuthTokenVerifier;
  resourceMetadataUrl: string;
  enforceOnAllMcp: boolean;
  protectedToolNames?: string[];
  requiredScopes?: string[];
}

const DEFAULT_PROTECTED_TOOLS = ["settle_up_action"];

function inspectToolCall(body: unknown): {
  isToolCall: boolean;
  toolNames: string[];
} {
  if (!body) return { isToolCall: false, toolNames: [] };
  const messages = Array.isArray(body) ? body : [body];
  const names: string[] = [];
  let isToolCall = false;

  for (const msg of messages) {
    if (
      msg &&
      typeof msg === "object" &&
      "method" in msg &&
      (msg as { method?: unknown }).method === "tools/call"
    ) {
      isToolCall = true;
      const name = (msg as { params?: { name?: string } }).params?.name;
      if (name) names.push(name);
    }
  }
  return { isToolCall, toolNames: names };
}

export function sendWwwAuthenticateError(
  res: Response,
  status: 401 | 403,
  resourceMetadataUrl: string,
  error?: OAuthError,
  requiredScopes: readonly string[] = SPLITTEL_SCOPES
): void {
  const parts: string[] = [`Bearer realm="Splittel MCP"`];
  if (error) {
    parts.push(`error="${error.errorCode}"`);
    parts.push(`error_description="${error.message.replace(/"/g, "'")}"`);
  }
  if (requiredScopes.length > 0) {
    parts.push(`scope="${requiredScopes.join(" ")}"`);
  }
  parts.push(`resource_metadata="${resourceMetadataUrl}"`);

  res.setHeader("WWW-Authenticate", parts.join(", "));
  res.status(status).json(
    error
      ? error.toResponseObject()
      : {
          error: "unauthorized",
          error_description:
            "Account Linking required: provide an OAuth 2.1 Bearer token (openid profile email).",
        }
  );
}

/**
 * Tiered OAuth 2.1 Gate for Google Connected Apps:
 * - **Free Tier (Zero-Auth)**: Anonymous check parsing (`parse_and_split_bill`),
 *   group balance calculation (`calculate_group_balance`), and payment card
 *   generation (`generate_payment_card`) work without login.
 * - **Account Linking (Auth Required)**: Invoking `settle_up_action` (or any
 *   configured protected tool) requires a valid OAuth 2.1 Bearer token with
 *   `openid` (or `profile` / `email`), returning HTTP `401` + `WWW-Authenticate`
 *   so Gemini / Google Search triggers Account Linking seamlessly.
 * - Whenever a Bearer token IS supplied on any request, it is cryptographically
 *   verified so authenticated sessions automatically attach user context (`req.auth`).
 */
export function createMcpBearerGate(
  options: ProtectedMcpAuthOptions
): RequestHandler {
  const protectedTools = new Set(
    options.protectedToolNames ?? DEFAULT_PROTECTED_TOOLS
  );
  const requiredScopes = options.requiredScopes ?? [...SPLITTEL_SCOPES];

  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const { toolNames } = inspectToolCall(req.body);
    const invokesProtectedTool = toolNames.some((n) => protectedTools.has(n));
    const mustAuthenticate = options.enforceOnAllMcp || invokesProtectedTool;

    if (!authHeader) {
      if (mustAuthenticate) {
        sendWwwAuthenticateError(
          res,
          401,
          options.resourceMetadataUrl,
          new InvalidTokenError(
            "OAuth 2.1 Account Linking required for settle_up_action"
          ),
          requiredScopes
        );
        return;
      }
      // Zero-Auth Free Tier: allow anonymous calculation & UI discovery
      next();
      return;
    }

    const [scheme, token, ...extraParts] = authHeader.trim().split(/\s+/);
    if (
      !scheme ||
      scheme.toLowerCase() !== "bearer" ||
      !token ||
      extraParts.length > 0
    ) {
      sendWwwAuthenticateError(
        res,
        401,
        options.resourceMetadataUrl,
        new InvalidTokenError(
          "Malformed Authorization header; expected 'Bearer <token>'"
        ),
        requiredScopes
      );
      return;
    }

    try {
      const authInfo = await options.verifier.verifyAccessToken(token);

      if (
        authInfo.expiresAt !== undefined &&
        authInfo.expiresAt < Math.floor(Date.now() / 1000)
      ) {
        throw new InvalidTokenError("Bearer token has expired");
      }

      if (invokesProtectedTool) {
        const acceptedAccountScopes = [
          ...requiredScopes,
          "mcp:tools",
          "splittel:write",
        ];
        const hasValidScope = acceptedAccountScopes.some((s) =>
          authInfo.scopes.includes(s)
        );
        // Reject tokens explicitly restricted to read-only
        const isExplicitReadOnly =
          authInfo.scopes.includes("splittel:read") &&
          !authInfo.scopes.includes("splittel:write") &&
          !authInfo.scopes.includes("openid");

        if (!hasValidScope || isExplicitReadOnly) {
          throw new InsufficientScopeError(
            `Account Linking scope required: ${requiredScopes.join(" ")}`
          );
        }
      }

      req.auth = authInfo;
      next();
    } catch (err) {
      if (err instanceof InsufficientScopeError) {
        sendWwwAuthenticateError(
          res,
          403,
          options.resourceMetadataUrl,
          err,
          requiredScopes
        );
        return;
      }
      if (err instanceof InvalidTokenError) {
        sendWwwAuthenticateError(
          res,
          401,
          options.resourceMetadataUrl,
          err,
          requiredScopes
        );
        return;
      }
      sendWwwAuthenticateError(
        res,
        401,
        options.resourceMetadataUrl,
        new InvalidTokenError("Token verification failed"),
        requiredScopes
      );
    }
  };
}

/**
 * Strict OAuth 2.1 Bearer middleware for Account-Linked REST endpoints:
 * - Saving/reading expense history (`/api/account/history`)
 * - Configuring personal SBP/Stripe payment details (`/api/account/payment-profile`)
 * - OIDC `/userinfo`
 */
export function requireAccountLinking(options: {
  verifier: OAuthTokenVerifier;
  resourceMetadataUrl: string;
}): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      sendWwwAuthenticateError(
        res,
        401,
        options.resourceMetadataUrl,
        new InvalidTokenError(
          "OAuth 2.1 Bearer token required for Account-Linked operations"
        ),
        SPLITTEL_SCOPES
      );
      return;
    }

    const token = authHeader.slice(7).trim();
    try {
      const authInfo = await options.verifier.verifyAccessToken(token);
      if (
        authInfo.expiresAt !== undefined &&
        authInfo.expiresAt < Math.floor(Date.now() / 1000)
      ) {
        throw new InvalidTokenError("Bearer token has expired");
      }
      req.auth = authInfo;
      next();
    } catch (err) {
      sendWwwAuthenticateError(
        res,
        401,
        options.resourceMetadataUrl,
        err instanceof InvalidTokenError
          ? err
          : new InvalidTokenError("Invalid Bearer token"),
        SPLITTEL_SCOPES
      );
    }
  };
}
