# ===== ビルドステージ =====
FROM node:20-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm install --legacy-peer-deps

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# ===== 実行ステージ =====
FROM node:20-alpine AS runner

WORKDIR /app

# セキュリティのため非rootユーザーを作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 必要なファイルをビルドステージからコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# ユーザーを切り替え
USER nextjs

# ポート3000を公開
EXPOSE 3000

# 環境変数を設定
ENV PORT 3000
ENV NODE_ENV production
# Node.jsのメモリ制限を設定
ENV NODE_OPTIONS="--max-old-space-size=768"

# アプリケーションを起動
CMD ["node", "server.js"]