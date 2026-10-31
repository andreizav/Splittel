import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import type { Response } from "express";
import { createRemoteJWKSet, jwtVerify, SignJWT } from "jose";
import type { OAuthRegisteredClientsStore } from "@modelcontextprotocol/sdk/server/auth/clients.js";
import {
  InvalidGrantError,
  InvalidTokenError,
} from "@modelcontextprotocol/sdk/server/auth/errors.js";
import type {
  AuthorizationParams,
  OAuthServerProvider,
} from "@modelcontextprotocol/sdk/server/auth/provider.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import type {
  OAuthClientInformationFull,
  OAuthTokenRevocationRequest,
  OAuthTokens,
} from "@modelcontextprotocol/sdk/shared/auth.js";

/**
 * Standard OAuth 2.1 / OIDC scopes required by Google Connected Apps Platform
 * Account Linking (`openid`, `profile`, `email`).
 */
export const SPLITTEL_SCOPES = ["openid", "profile", "email"] as const;

interface StoredAuthCode {
  code: string;
  clientId: string;
  subject: string;
  email: string;
  name: string;
  codeChallenge: string;
  redirectUri: string;
  scopes: string[];
  resource?: URL;
  expiresAtMs: number;
}

interface StoredRefreshToken {
  token: string;
  clientId: string;
  subject: string;
  email: string;
  name: string;
  scopes: string[];
  resource?: URL;
  expiresAtMs: number;
}

class InMemoryClientsStore implements OAuthRegisteredClientsStore {
  private readonly clients = new Map<string, OAuthClientInformationFull>();

  constructor() {
    const now = Math.floor(Date.now() / 1000);
    // Google Auth Platform client pre-configured with "Use this client for an AI-powered agent" enabled
    const googleAgentClient = {
      client_id: "google-connected-apps",
      client_id_issued_at: now,
      client_name: "Google Connected Apps Platform (Gemini & Search AI Agent)",
      redirect_uris: [
        "https://gemini.google.com/oauth/callback",
        "https://www.google.com/oauth/callback",
        "https://oauth-redirect.googleusercontent.com/r/splittel",
        "http://localhost:6274/oauth/callback",
        "http://127.0.0.1:6274/oauth/callback",
        "http://localhost:6276/oauth/callback",
        "http://127.0.0.1:6276/oauth/callback",
      ],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      scope: SPLITTEL_SCOPES.join(" "),
      use_this_client_for_an_ai_powered_agent: true,
    } as OAuthClientInformationFull;

    this.clients.set("google-connected-apps", googleAgentClient);
  }

  getClient(clientId: string): OAuthClientInformationFull | undefined {
    return this.clients.get(clientId);
  }

  registerClient(
    clientMetadata: Omit<
      OAuthClientInformationFull,
      "client_id" | "client_id_issued_at"
    >
  ): OAuthClientInformationFull {
    const partial = clientMetadata as Partial<OAuthClientInformationFull>;
    const full = {
      ...clientMetadata,
      client_id: partial.client_id ?? randomUUID(),
      client_id_issued_at:
        partial.client_id_issued_at ?? Math.floor(Date.now() / 1000),
      use_this_client_for_an_ai_powered_agent: true,
    } as OAuthClientInformationFull;
    this.clients.set(full.client_id, full);
    return full;
  }
}

export interface SplittelOAuthOptions {
  issuerUrl: string;
  audience: string;
  jwtSecret: string;
  uiActionSecret: string;
  jwksUri?: string;
}

export class SplittelOAuthProvider implements OAuthServerProvider {
  public readonly clientsStore = new InMemoryClientsStore();
  private readonly authCodes = new Map<string, StoredAuthCode>();
  private readonly refreshTokens = new Map<string, StoredRefreshToken>();
  private readonly revokedTokens = new Set<string>();
  private readonly secretKey: Uint8Array;
  private readonly remoteJwks?: ReturnType<typeof createRemoteJWKSet>;

  constructor(private readonly opts: SplittelOAuthOptions) {
    this.secretKey = new TextEncoder().encode(opts.jwtSecret);
    if (opts.jwksUri && opts.jwksUri.trim().length > 0) {
      this.remoteJwks = createRemoteJWKSet(new URL(opts.jwksUri));
    }
  }

  async authorize(
    client: OAuthClientInformationFull,
    params: AuthorizationParams,
    res: Response
  ): Promise<void> {
    const code = `spl_code_${randomBytes(24).toString("hex")}`;
    const requestedScopes =
      params.scopes && params.scopes.length > 0
        ? params.scopes
        : [...SPLITTEL_SCOPES];

    const subject = `user_${client.client_id}`;
    this.authCodes.set(code, {
      code,
      clientId: client.client_id,
      subject,
      email: `${client.client_id}@users.splittel.app`,
      name: client.client_name ?? "Splittel User",
      codeChallenge: params.codeChallenge,
      redirectUri: params.redirectUri,
      scopes: requestedScopes,
      resource: params.resource,
      expiresAtMs: Date.now() + 5 * 60 * 1000,
    });

    const targetUrl = new URL(params.redirectUri);
    targetUrl.searchParams.set("code", code);
    if (params.state !== undefined) {
      targetUrl.searchParams.set("state", params.state);
    }

    res.redirect(302, targetUrl.toString());
  }

  async challengeForAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string
  ): Promise<string> {
    const stored = this.authCodes.get(authorizationCode);
    if (
      !stored ||
      stored.clientId !== client.client_id ||
      Date.now() > stored.expiresAtMs
    ) {
      this.authCodes.delete(authorizationCode);
      throw new InvalidGrantError("Invalid or expired authorization code");
    }
    return stored.codeChallenge;
  }

  async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    _codeVerifier?: string,
    redirectUri?: string,
    resource?: URL
  ): Promise<OAuthTokens> {
    const stored = this.authCodes.get(authorizationCode);
    this.authCodes.delete(authorizationCode);

    if (
      !stored ||
      stored.clientId !== client.client_id ||
      Date.now() > stored.expiresAtMs
    ) {
      throw new InvalidGrantError("Invalid or expired authorization code");
    }

    if (redirectUri && redirectUri !== stored.redirectUri) {
      throw new InvalidGrantError("redirect_uri mismatch");
    }

    const effectiveResource = resource ?? stored.resource;
    const accessToken = await this.issueAccessToken({
      clientId: client.client_id,
      subject: stored.subject,
      email: stored.email,
      name: stored.name,
      scopes: stored.scopes,
      resource: effectiveResource?.href,
      expiresInSeconds: 3600,
    });

    const refreshToken = `spl_rt_${randomBytes(32).toString("hex")}`;
    this.refreshTokens.set(refreshToken, {
      token: refreshToken,
      clientId: client.client_id,
      subject: stored.subject,
      email: stored.email,
      name: stored.name,
      scopes: stored.scopes,
      resource: effectiveResource,
      expiresAtMs: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });

    return {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token: refreshToken,
      scope: stored.scopes.join(" "),
    };
  }

  async exchangeRefreshToken(
    client: OAuthClientInformationFull,
    refreshToken: string,
    scopes?: string[],
    resource?: URL
  ): Promise<OAuthTokens> {
    if (this.revokedTokens.has(refreshToken)) {
      throw new InvalidGrantError("Refresh token has been revoked");
    }

    const stored = this.refreshTokens.get(refreshToken);
    if (
      !stored ||
      stored.clientId !== client.client_id ||
      Date.now() > stored.expiresAtMs
    ) {
      this.refreshTokens.delete(refreshToken);
      throw new InvalidGrantError("Invalid or expired refresh token");
    }

    this.refreshTokens.delete(refreshToken);

    const grantedScopes =
      scopes && scopes.length > 0
        ? scopes.filter((s) => stored.scopes.includes(s))
        : stored.scopes;

    const effectiveResource = resource ?? stored.resource;
    const accessToken = await this.issueAccessToken({
      clientId: client.client_id,
      subject: stored.subject,
      email: stored.email,
      name: stored.name,
      scopes: grantedScopes,
      resource: effectiveResource?.href,
      expiresInSeconds: 3600,
    });

    const nextRefreshToken = `spl_rt_${randomBytes(32).toString("hex")}`;
    this.refreshTokens.set(nextRefreshToken, {
      token: nextRefreshToken,
      clientId: client.client_id,
      subject: stored.subject,
      email: stored.email,
      name: stored.name,
      scopes: grantedScopes,
      resource: effectiveResource,
      expiresAtMs: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });

    return {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token: nextRefreshToken,
      scope: grantedScopes.join(" "),
    };
  }

  async issueAccessToken(params: {
    clientId: string;
    subject: string;
    email?: string;
    name?: string;
    scopes?: string[];
    resource?: string;
    expiresInSeconds?: number;
  }): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = params.expiresInSeconds ?? 3600;
    const scopes = params.scopes ?? [...SPLITTEL_SCOPES];
    const audience = params.resource ?? this.opts.audience;

    return new SignJWT({
      client_id: params.clientId,
      scope: scopes.join(" "),
      email: params.email ?? `${params.subject}@users.splittel.app`,
      name: params.name ?? params.subject,
    })
      .setProtectedHeader({ alg: "HS256", typ: "at+jwt" })
      .setIssuer(this.opts.issuerUrl)
      .setSubject(params.subject)
      .setAudience(audience)
      .setJti(randomUUID())
      .setIssuedAt(now)
      .setExpirationTime(now + expiresIn)
      .sign(this.secretKey);
  }

  async verifyAccessToken(token: string): Promise<AuthInfo> {
    if (!token || this.revokedTokens.has(token)) {
      throw new InvalidTokenError("Access token is missing or revoked");
    }

    try {
      const verifyResult = this.remoteJwks
        ? await jwtVerify(token, this.remoteJwks, {
            issuer: this.opts.issuerUrl,
          })
        : await jwtVerify(token, this.secretKey, {
            issuer: this.opts.issuerUrl,
          });

      const { payload } = verifyResult;
      if (payload.jti && this.revokedTokens.has(payload.jti)) {
        throw new InvalidTokenError("Access token jti has been revoked");
      }

      const audList = Array.isArray(payload.aud)
        ? payload.aud
        : payload.aud
          ? [payload.aud]
          : [];
      const normalizedExpectedAud = this.opts.audience.replace(/\/+$/, "");
      const normalizedIssuer = this.opts.issuerUrl.replace(/\/+$/, "");

      const matchedAud = audList.find((a) => {
        const clean = a.replace(/\/+$/, "");
        return clean === normalizedExpectedAud || clean === normalizedIssuer;
      });

      if (!matchedAud) {
        throw new InvalidTokenError(
          `Token audience mismatch: expected ${this.opts.audience}`
        );
      }

      const rawScope = typeof payload.scope === "string" ? payload.scope : "";
      const scopes = rawScope
        .split(/\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const clientId =
        typeof payload.client_id === "string"
          ? payload.client_id
          : typeof payload.azp === "string"
            ? payload.azp
            : "unknown-client";

      let resourceUrl: URL | undefined;
      try {
        resourceUrl = new URL(this.opts.audience);
      } catch {
        resourceUrl = undefined;
      }

      return {
        token,
        clientId,
        scopes,
        expiresAt: payload.exp,
        resource: resourceUrl,
        extra: {
          sub: payload.sub ?? clientId,
          email: payload.email,
          name: payload.name,
          jti: payload.jti,
        },
      };
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        throw err;
      }
      throw new InvalidTokenError(
        err instanceof Error ? err.message : "Failed to verify Bearer token"
      );
    }
  }

  async revokeToken(
    _client: OAuthClientInformationFull,
    request: OAuthTokenRevocationRequest
  ): Promise<void> {
    this.revokedTokens.add(request.token);
    this.refreshTokens.delete(request.token);
  }

  signUiActionToken(billId: string): string {
    return createHmac("sha256", this.opts.uiActionSecret)
      .update(`splittel:ui:settle:${billId}`)
      .digest("hex");
  }

  verifyUiActionToken(billId: string, candidateToken: string): boolean {
    if (!billId || !candidateToken) return false;
    const expected = this.signUiActionToken(billId);
    const a = Buffer.from(expected, "utf-8");
    const b = Buffer.from(candidateToken, "utf-8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  }
}
