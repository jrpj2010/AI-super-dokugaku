#!/bin/bash

# Gen-Spa 2.0 Cloud Run Deploy Script
# このスクリプトはGen-Spa 2.0アプリケーションをGoogle Cloud Runにデプロイします

set -e

# 色付きログ出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 設定値
PROJECT_ID=${PROJECT_ID:-"your-project-id"}
REGION=${REGION:-"asia-northeast1"}
SERVICE_NAME="gen-spa-2"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

log_info "Gen-Spa 2.0のCloud Runデプロイを開始します..."
log_info "Project ID: ${PROJECT_ID}"
log_info "Region: ${REGION}"
log_info "Service Name: ${SERVICE_NAME}"

# 必要なAPIの有効化確認
log_info "必要なAPIが有効化されているか確認中..."
gcloud services enable cloudbuild.googleapis.com cloudrun.googleapis.com

# Dockerイメージをビルド
log_info "Dockerイメージをビルドしています..."
docker build -t ${IMAGE_NAME}:latest .

# Google Container Registryにプッシュ
log_info "イメージをContainer Registryにプッシュしています..."
docker push ${IMAGE_NAME}:latest

# Cloud Runにデプロイ
log_info "Cloud Runサービスをデプロイしています..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300s \
  --concurrency 80 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production,GEMINI_API_KEY=${GEMINI_API_KEY}" \
  --project ${PROJECT_ID}

# デプロイ結果の取得
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')

log_info "デプロイが完了しました！"
log_info "サービスURL: ${SERVICE_URL}"
log_info ""
log_info "環境変数の設定確認:"
log_info "- GEMINI_API_KEY: ${GEMINI_API_KEY:+設定済み}"

if [ -z "$GEMINI_API_KEY" ]; then
    log_warn "GEMINI_API_KEYが設定されていません。"
    log_warn "以下のコマンドで設定してください:"
    log_warn "export GEMINI_API_KEY=your-gemini-api-key"
    log_warn "または、Cloud Run Consoleから直接設定してください。"
fi

log_info ""
log_info "デバッグ情報:"
log_info "ログを確認: gcloud logging tail \"resource.type=cloud_run_revision AND resource.labels.service_name=${SERVICE_NAME}\" --project=${PROJECT_ID}"
log_info "サービス詳細: gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --project=${PROJECT_ID}"