#!/bin/bash

# Cloud Run 更新用スクリプト
# 使用方法: ./update-cloud-run.sh YOUR_PROJECT_ID YOUR_OPENAI_API_KEY

PROJECT_ID=$1
OPENAI_API_KEY=$2
REGION="asia-northeast1"
SERVICE_NAME="gpt-image-generator-app"
REPOSITORY_NAME="gpt-image-generator-repo"

if [ -z "$PROJECT_ID" ] || [ -z "$OPENAI_API_KEY" ]; then
    echo "使用方法: $0 YOUR_PROJECT_ID YOUR_OPENAI_API_KEY"
    exit 1
fi

echo "プロジェクトを設定中..."
gcloud config set project $PROJECT_ID

echo "最新コードをビルド中..."
IMAGE_TAG="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY_NAME/$SERVICE_NAME:$(date +%Y%m%d%H%M%S)"
gcloud builds submit --tag $IMAGE_TAG .

echo "Cloud Runサービスを更新中..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_TAG \
    --region $REGION \
    --update-env-vars "OPENAI_API_KEY=$OPENAI_API_KEY,NODE_ENV=production"

echo "更新が完了しました！"
echo "サービスURL:"
gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'