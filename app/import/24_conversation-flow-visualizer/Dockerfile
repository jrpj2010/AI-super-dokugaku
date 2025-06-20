# Node.js 20のベースイメージを使用
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール（開発依存関係も含む）
RUN npm ci

# アプリケーションのソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# 本番環境用の軽量サーバーをインストール
RUN npm install -g serve

# ポート設定
EXPOSE 8080

# アプリケーションを起動
CMD ["serve", "-s", "dist", "-l", "8080"]