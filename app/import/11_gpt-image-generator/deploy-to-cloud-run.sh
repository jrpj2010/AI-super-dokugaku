#!/bin/bash

# Cloud Run デプロイスクリプト
# 使用方法: ./deploy-to-cloud-run.sh YOUR_PROJECT_ID YOUR_OPENAI_API_KEY

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

echo "必要なAPIを有効化中..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable run.googleapis.com

echo "Artifact Registryリポジトリを作成中..."
gcloud artifacts repositories create $REPOSITORY_NAME \
    --repository-format=docker \
    --location=$REGION \
    --description="gpt-image-generator application images" \
    || echo "リポジトリは既に存在します"

echo "Dockerイメージをビルド中..."
IMAGE_TAG="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY_NAME/$SERVICE_NAME:latest"
gcloud builds submit --tag $IMAGE_TAG .

echo "Cloud Runにデプロイ中..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_TAG \
    --platform managed \
    --region $REGION \
    --port 3000 \
    --allow-unauthenticated \
    --cpu 2 \
    --memory 2Gi \
    --timeout 600s \
    --concurrency 100 \
    --set-env-vars "OPENAI_API_KEY=$OPENAI_API_KEY,NODE_ENV=production" \
    --min-instances 0 \
    --max-instances 10

echo "デプロイが完了しました！"
echo "サービスURL:"
gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'