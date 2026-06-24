# syntax=docker/dockerfile:1

# =========================================
# STAGE 1 — Dépendances
# =========================================
FROM node:22-alpine AS deps

WORKDIR /app

RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm config set fetch-timeout 300000

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# =========================================
# STAGE 2 — Build
# =========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_TELEMETRY_DISABLED=1

# Cache .next/cache → compilateur Next incrémental entre builds
RUN --mount=type=cache,target=/app/.next/cache npm run build

# =========================================
# STAGE 3 — Runner (image minimale)
# =========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Dossier de la base SQLite — possédé par nextjs pour que le volume
# nommé s'initialise avec les bons droits d'écriture.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O - http://localhost:3000 || exit 1

CMD ["node", "server.js"]
