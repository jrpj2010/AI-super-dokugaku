#!/bin/bash

# エラーが発生したら即座に終了
set -e

# 色付きログ出力用の関数
log() {
    echo -e "\033[0;32m[$(date +'%Y-%m-%d %H:%M:%S')]\033[0m $1"
}

error() {
    echo -e "\033[0;31m[ERROR]\033[0m $1" >&2
}

# プロジェクトIDとリージョンの設定
PROJECT_ID=${PROJECT_ID:-"your-project-id"}
REGION=${REGION:-"asia-northeast1"}
SERVICE_NAME="tanren-emotion-analysis"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

log "Starting deployment of ${SERVICE_NAME} to Cloud Run..."

# 1. Google Cloud認証の確認
log "Checking Google Cloud authentication..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    error "Not authenticated with Google Cloud. Please run 'gcloud auth login'"
    exit 1
fi

# 2. プロジェクトの設定
log "Setting project to ${PROJECT_ID}..."
gcloud config set project ${PROJECT_ID}

# 3. 必要なAPIの有効化
log "Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 4. シークレットの作成（存在しない場合）
log "Creating/updating secrets..."
if ! gcloud secrets describe tanren-google-ai-key >/dev/null 2>&1; then
    log "Creating secret for Google AI API key..."
    echo -n "${GOOGLE_AI_API_KEY}" | gcloud secrets create tanren-google-ai-key --data-file=-
else
    log "Updating secret for Google AI API key..."
    echo -n "${GOOGLE_AI_API_KEY}" | gcloud secrets versions add tanren-google-ai-key --data-file=-
fi

# 5. Cloud RunサービスアカウントにSecret Managerへのアクセス権限を付与
log "Granting Secret Manager access to Cloud Run service account..."
PROJECT_NUMBER=$(gcloud projects describe ${PROJECT_ID} --format="value(projectNumber)")
gcloud secrets add-iam-policy-binding tanren-google-ai-key \
    --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

# 6. ローカルビルドとテスト（オプション）
if [ "$SKIP_LOCAL_BUILD" != "true" ]; then
    log "Building Docker image locally for testing..."
    docker build -t ${SERVICE_NAME}:local .
    
    log "Running local container test..."
    docker run --rm -d -p 8080:8080 --name ${SERVICE_NAME}-test ${SERVICE_NAME}:local
    sleep 5
    
    if curl -f http://localhost:8080 >/dev/null 2>&1; then
        log "Local test passed!"
    else
        error "Local test failed!"
        docker stop ${SERVICE_NAME}-test
        exit 1
    fi
    
    docker stop ${SERVICE_NAME}-test
fi

# 7. Cloud Buildを使用してデプロイ
log "Submitting build to Cloud Build..."
gcloud builds submit \
    --config=cloudbuild.yaml \
    --substitutions=_PROJECT_ID=${PROJECT_ID} \
    .

# 8. デプロイの確認
log "Verifying deployment..."
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
    --region=${REGION} \
    --format="value(status.url)")

if [ -z "$SERVICE_URL" ]; then
    error "Failed to get service URL"
    exit 1
fi

log "Service deployed successfully!"
log "Service URL: ${SERVICE_URL}"

# 9. ヘルスチェック
log "Performing health check..."
if curl -f "${SERVICE_URL}" >/dev/null 2>&1; then
    log "Health check passed!"
else
    error "Health check failed!"
    exit 1
fi

log "Deployment completed successfully!"
log ""
log "Next steps:"
log "1. Test the application at: ${SERVICE_URL}"
log "2. Monitor logs: gcloud run logs read --service=${SERVICE_NAME} --region=${REGION}"
log "3. View metrics: https://console.cloud.google.com/run/detail/${REGION}/${SERVICE_NAME}/metrics"