# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS builder

RUN apk add --no-cache openssl && corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
ENV DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/splittel
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN pnpm run build && pnpm prune --prod

# Pre-bundle LSTM OCR traineddata (Hebrew, English, Russian) for instant offline recognition
RUN mkdir -p /app/tessdata && \
    for lang in heb eng rus; do \
      wget -qO- "https://cdn.jsdelivr.net/npm/@tesseract.js-data/${lang}/4.0.0_best_int/${lang}.traineddata.gz" | gunzip > "/app/tessdata/${lang}.traineddata"; \
    done && \
    chmod -R a+rX /app/tessdata

FROM node:22-alpine AS runner
RUN apk add --no-cache openssl dumb-init libstdc++
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080 \
    HTTPS_ENABLED=false \
    TRUST_PROXY=true \
    TESSDATA_DIR=/app/tessdata \
    DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/splittel \
    REDIS_URL=redis://localhost:6379 \
    QDRANT_URL=http://localhost:6333

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tessdata ./tessdata
COPY connected-app-manifest.json ./
COPY scripts ./scripts

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]

