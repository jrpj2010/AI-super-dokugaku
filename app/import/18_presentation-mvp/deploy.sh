#!/bin/bash

# 環境変数を確認
if [ -z "$GOOGLE_GENERATIVE_AI_API_KEY" ]; then
  echo "Error: GOOGLE_GENERATIVE_AI_API_KEY is not set"
  exit 1
fi

echo "Starting deployment to Cloud Run..."

# Cloud Runへデプロイ
gcloud run deploy presentation-mvp \
  --source . \
  --region=asia-northeast1 \
  --platform=managed \
  --allow-unauthenticated \
  --memory=2Gi \
  --cpu=4 \
  --timeout=300s \
  --max-instances=10 \
  --concurrency=100 \
  --set-env-vars="GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}" \
  --project=gemini-20241115

echo "Deployment complete!"
echo "Service URL: https://presentation-mvp-632969986222.asia-northeast1.run.app"