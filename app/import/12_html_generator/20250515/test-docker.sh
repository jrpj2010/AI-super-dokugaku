#!/bin/bash

echo "=== Docker環境でのテスト実行 ==="

# .envファイルが存在しない場合は.env.exampleをコピー
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update .env with your ANTHROPIC_API_KEY"
    exit 1
fi

# Dockerイメージをビルド
echo "Building Docker image..."
docker build -t html-generator-app:test .

# テスト用コンテナを起動
echo "Starting test container..."
docker run -d \
    --name html-generator-test \
    -p 8080:8080 \
    --env-file .env \
    html-generator-app:test

# コンテナが起動するまで待機
echo "Waiting for container to start..."
sleep 5

# ヘルスチェック
echo "Running health check..."
curl -f http://localhost:8080/health || echo "Health check failed"

# テストを実行
echo "Running tests..."
docker exec html-generator-test python -m pytest test_app.py -v

# クリーンアップ
echo "Cleaning up..."
docker stop html-generator-test
docker rm html-generator-test

echo "=== テスト完了 ==="