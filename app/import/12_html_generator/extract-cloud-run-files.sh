#!/bin/bash

# Cloud Runのコンテナイメージからファイルを抽出
IMAGE_URL="asia-northeast1-docker.pkg.dev/gemini-20241115/cloud-run-source-deploy/html-generator-app@sha256:3dacbae23ebcf08c7c338509e7f620e8ddd36fbefcfb9c508898b07c1e1615b8"

echo "=== Cloud Runコンテナイメージからファイルを抽出 ==="
echo "イメージ: $IMAGE_URL"

# イメージをプル
echo "イメージをダウンロード中..."
docker pull $IMAGE_URL

# コンテナを作成（起動せずに）
docker create --name cloud-run-extract $IMAGE_URL

# ファイルを抽出
echo "ファイルを抽出中..."
docker cp cloud-run-extract:/app/app.py ./cloud-run-files/app.py 2>/dev/null || echo "app.py not found"
docker cp cloud-run-extract:/app/requirements.txt ./cloud-run-files/requirements.txt 2>/dev/null || echo "requirements.txt not found"
docker cp cloud-run-extract:/app/templates ./cloud-run-files/templates 2>/dev/null || echo "templates not found"
docker cp cloud-run-extract:/app/static ./cloud-run-files/static 2>/dev/null || echo "static not found"

# コンテナを削除
docker rm cloud-run-extract

echo "=== 抽出完了 ==="
ls -la cloud-run-files/