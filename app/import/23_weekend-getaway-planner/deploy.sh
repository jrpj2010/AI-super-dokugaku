#!/bin/bash
set -e

# プロジェクトの設定
PROJECT_ID="gemini-20241115"
SERVICE_NAME="weekend-planner-v3"
REGION="asia-northeast1"

echo "🚀 Cloud Runへのデプロイを開始します..."

# 1. プロジェクトの設定
echo "1. プロジェクトを設定中..."
gcloud config set project $PROJECT_ID

# 2. Artifact Registryの設定（初回のみ）
echo "2. Artifact Registryを確認中..."
REPO_NAME="cloud-run-source-deploy"
if ! gcloud artifacts repositories describe $REPO_NAME --location=$REGION &>/dev/null; then
  echo "   Artifact Registryリポジトリを作成中..."
  gcloud artifacts repositories create $REPO_NAME \
    --repository-format=docker \
    --location=$REGION \
    --description="Cloud Run source deployments"
fi

# 3. Cloud Buildでビルド & デプロイ
echo "3. Cloud Buildでビルド & デプロイ中..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --timeout 60 \
  --max-instances 10 \
  --min-instances 0 \
  --port 8080 \
  --set-env-vars="NODE_ENV=production"

# 4. サービスURLの取得
echo "4. デプロイ完了!"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
echo "🎉 アプリケーションURL: $SERVICE_URL"

# 5. 追加情報
echo ""
echo "📌 その他のコマンド:"
echo "  - ログを見る: gcloud run logs read --service=$SERVICE_NAME --region=$REGION"
echo "  - サービス詳細: gcloud run services describe $SERVICE_NAME --region=$REGION"
echo "  - トラフィック管理: gcloud run services update-traffic $SERVICE_NAME --region=$REGION"