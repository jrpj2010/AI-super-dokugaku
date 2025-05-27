#!/bin/bash

# Cloud Run のソースコードをダウンロード
echo "=== Cloud Run のソースコードをダウンロード ==="

# Google Cloud Storage からソースコードをダウンロード
SOURCE_URL="gs://run-sources-gemini-20241115-asia-northeast1/services/html-generator-app/1747641764.203846-a2a21837d8554c6180b981fef1d28b88.zip"

echo "ソースコードURL: $SOURCE_URL"

# ダウンロード
gsutil cp "$SOURCE_URL" cloud-run-source.zip

# 解凍
mkdir -p cloud-run-source
unzip -o cloud-run-source.zip -d cloud-run-source/

echo "=== ダウンロード完了 ==="
echo "cloud-run-source/ ディレクトリに解凍されました"

# ファイル一覧を表示
echo -e "\n=== ファイル一覧 ==="
find cloud-run-source -type f -name "*.py" -o -name "*.txt" -o -name "Dockerfile" | head -20