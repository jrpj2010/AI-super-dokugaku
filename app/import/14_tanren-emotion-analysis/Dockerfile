# ステージ1: 依存関係のインストール
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとlockファイルをコピー
COPY package.json pnpm-lock.yaml ./

# pnpmをインストール
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# ステージ2: ビルド
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数の設定（ビルド時）
ENV NEXT_TELEMETRY_DISABLED=1

# Clean any existing build artifacts
RUN rm -rf .next

RUN corepack enable pnpm && pnpm run build

# ステージ3: 本番環境
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 非rootユーザーの作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 必要なファイルのみコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 所有権を変更
RUN chown -R nextjs:nodejs /app

USER nextjs

# Cloud Run用のポート設定
EXPOSE 8080
ENV PORT=8080

# Next.jsの本番サーバーを起動
CMD ["node", "server.js"]