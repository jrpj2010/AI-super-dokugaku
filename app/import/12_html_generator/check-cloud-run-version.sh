#!/bin/bash

# Cloud Runから現在のイメージ情報を取得
echo "=== Cloud Run サービス情報 ==="
gcloud run services describe html-generator-app \
  --region=asia-northeast1 \
  --project=gemini-20241115 \
  --format=json > cloud-run-service.json

# イメージURLを抽出
IMAGE_URL=$(cat cloud-run-service.json | jq -r '.spec.template.spec.containers[0].image')
echo "現在のイメージ: $IMAGE_URL"

# デプロイ日時を確認
echo -e "\n=== デプロイ履歴 ==="
gcloud run revisions list \
  --service=html-generator-app \
  --region=asia-northeast1 \
  --project=gemini-20241115 \
  --limit=5 \
  --format="table(metadata.name, metadata.creationTimestamp, spec.containers[0].image:label=IMAGE)"

# コンテナイメージの詳細を確認
echo -e "\n=== コンテナイメージの詳細 ==="
gcloud container images describe $IMAGE_URL --project=gemini-20241115

# 必要に応じてイメージをダウンロード
echo -e "\n=== イメージをローカルにダウンロードしますか？ (y/n) ==="
read -r response
if [[ "$response" == "y" ]]; then
    docker pull $IMAGE_URL
    
    # ファイルを抽出
    mkdir -p cloud-run-files
    docker create --name temp-extract $IMAGE_URL
    docker cp temp-extract:/app/app.py ./cloud-run-files/
    docker cp temp-extract:/app/requirements.txt ./cloud-run-files/
    docker cp temp-extract:/app/Dockerfile ./cloud-run-files/ 2>/dev/null || echo "Dockerfile not found in container"
    docker rm temp-extract
    
    echo "ファイルを cloud-run-files/ に抽出しました"
    
    # 差分を確認
    echo -e "\n=== ローカルファイルとの差分 ==="
    diff -u ./20250515/app.py ./cloud-run-files/app.py || true
    diff -u ./20250515/requirements.txt ./cloud-run-files/requirements.txt || true
fi