#!/bin/bash

# Cloud Run デプロイスクリプト
# 使用前に実行権限を付与: chmod +x deploy-cloud-run.sh

# 設定変数
PROJECT_ID=${GOOGLE_CLOUD_PROJECT_ID:-"your-project-id"}
REGION="asia-northeast1"  # 東京リージョン
SERVICE_NAME="tanren-emotion-analysis"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# カラー出力用
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 TANRENアプリケーションのCloud Runデプロイを開始します${NC}"

# 1. プロジェクトIDの確認
if [ "$PROJECT_ID" = "your-project-id" ]; then
    echo -e "${RED}エラー: GOOGLE_CLOUD_PROJECT_ID環境変数を設定してください${NC}"
    echo "export GOOGLE_CLOUD_PROJECT_ID=your-actual-project-id"
    exit 1
fi

echo -e "${GREEN}プロジェクトID: ${PROJECT_ID}${NC}"

# 2. gcloud設定の確認
echo -e "${YELLOW}gcloudプロジェクトを設定中...${NC}"
gcloud config set project ${PROJECT_ID}

# 3. 必要なAPIの有効化
echo -e "${YELLOW}必要なAPIを有効化中...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# 4. Dockerイメージのビルド
echo -e "${YELLOW}Dockerイメージをビルド中...${NC}"
docker build -t ${IMAGE_NAME} .

# 5. Container Registry/Artifact Registryへのプッシュ
echo -e "${YELLOW}イメージをプッシュ中...${NC}"
docker push ${IMAGE_NAME}

# 6. Cloud Runへのデプロイ
echo -e "${YELLOW}Cloud Runにデプロイ中...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production,GOOGLE_AI_MODEL=gemini-2.5-pro-preview-05-06" \
  --set-secrets "GOOGLE_AI_API_KEY=tanren-gemini-api-key:latest"

# 7. サービスURLの取得
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')

echo -e "${GREEN}✅ デプロイが完了しました！${NC}"
echo -e "${GREEN}サービスURL: ${SERVICE_URL}${NC}"
echo
echo -e "${YELLOW}注意事項:${NC}"
echo "1. Google Cloud Secret Managerに 'tanren-gemini-api-key' というシークレットを作成してください："
echo "   echo 'YOUR_API_KEY' | gcloud secrets create tanren-gemini-api-key --data-file=-"
echo "2. Cloud Runサービスアカウントにシークレットアクセス権限を付与してください"