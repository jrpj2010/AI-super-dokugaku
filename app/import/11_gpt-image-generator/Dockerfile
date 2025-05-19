# ビルドステージ
FROM node:18-alpine AS builder

# pnpmをインストール
RUN npm install -g pnpm

# 作業ディレクトリを設定
WORKDIR /app

# パッケージマネージャーのファイルをコピー
COPY package.json pnpm-lock.yaml* ./

# 依存関係をインストール
RUN pnpm install

# ソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN pnpm run build

# 実行ステージ
FROM node:18-alpine AS runner

# 作業ディレクトリを設定
WORKDIR /app

# 本番環境用の環境変数を設定
ENV NODE_ENV=production
ENV PORT=3000

# 必要なファイルをビルドステージからコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# OpenAI APIキーを環境変数から取得するための準備
# 注意: 実際の運用では、Docker Secretsやボリュームマウントなどでより安全に管理することを推奨
ENV OPENAI_API_KEY=""

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["node", "server.js"]
