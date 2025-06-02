# ビルドステージ
FROM node:20-alpine AS builder

# pnpmを有効化
RUN corepack enable

WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json pnpm-lock.yaml* ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# アプリケーションコードをコピー
COPY . .

# TypeScriptをビルド
RUN pnpm build

# 本番ステージ
FROM node:20-alpine

# pnpmを有効化
RUN corepack enable

WORKDIR /app

# 必要なファイルのみコピー
COPY --from=builder /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/index.html ./
COPY --from=builder /app/demo.html ./
COPY --from=builder /app/demo-srt.html ./

# 本番用依存関係のみインストール
RUN pnpm install --prod --frozen-lockfile

# Cloud Runのポート設定
ENV PORT=8080
EXPOSE 8080

# HTTPサーバーとして動作させる
CMD ["node", "dist/server.js"]