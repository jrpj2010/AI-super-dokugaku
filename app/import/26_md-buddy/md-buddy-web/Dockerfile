# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係のインストール
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# ソースコードのコピーとビルド
COPY . .

# .envファイルがあればコピー（ビルド時に環境変数を読み込むため）
COPY .env* ./

# ビルド時の環境変数設定（プロダクション用のプレースホルダー）
ARG VITE_GEMINI_API_KEY=""
ARG VITE_GEMINI_MODEL="gemini-pro"
ARG VITE_SUPABASE_URL=""
ARG VITE_SUPABASE_ANON_KEY=""
ARG VITE_APP_NAME="MD Buddy"
ARG VITE_APP_VERSION="2.0.0"
ARG VITE_APP_ENV="production"

# 環境変数をビルドプロセスに渡す
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV VITE_GEMINI_MODEL=$VITE_GEMINI_MODEL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_APP_ENV=$VITE_APP_ENV

RUN pnpm build

# 実行ステージ
FROM nginx:alpine

# Nginxの設定
COPY --from=builder /app/dist /usr/share/nginx/html

# SPAのための設定
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]