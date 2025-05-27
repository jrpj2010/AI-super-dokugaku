# ステージ1: Node.js環境でTailwind CSSをビルド
FROM node:18-slim as builder

WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm install

# Tailwind CSS設定ファイルと入力用HTML/JSファイルをコピー
COPY tailwind.config.js ./
COPY templates ./templates
COPY static/js ./static/js
# 入力となるCSSファイル
COPY static/css/input.css ./static/css/input.css

# 出力ディレクトリを作成
RUN mkdir -p static/css

# Tailwind CSS をビルド
RUN npx tailwindcss -i ./static/css/input.css -o ./static/css/tailwind.css --minify

# ステージ2: Python環境でFlaskアプリケーションを実行
FROM python:3.9-slim

# メタデータラベル
LABEL maintainer="TANREN Inc."
LABEL version="1.1.0"
LABEL release_date="2025-05-27"
LABEL description="HTML Generator App - v1.1.0 - 2025年5月27日版"

WORKDIR /app

# ビルドステージから生成されたtailwind.cssをコピー
COPY --from=builder /app/static/css/tailwind.css /app/static/css/tailwind.css

# Pythonの依存関係ファイルをコピー
COPY requirements.txt ./

# Pythonの依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY app.py .
COPY templates ./templates
COPY static ./static
# .envファイルは含めず、実行時に環境変数を渡す

# ポートを開放 (Cloud Runは通常8080を期待)
EXPOSE 8080

# 環境変数を設定
ENV PYTHONPATH /app
ENV PORT 8080
ENV FLASK_ENV production

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8080/health').raise_for_status()"

# アプリケーションを実行 (Gunicornを使用)
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "--threads", "4", "--worker-class", "gthread", "app:app"]
