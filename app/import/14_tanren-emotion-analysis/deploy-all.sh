#!/bin/bash
set -e

# 色付き出力
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== TANREN 感情分析アプリ v1.1.6 緊急デプロイ開始 ===${NC}"

# 現在のバージョンを確認
CURRENT_VERSION=$(grep '"version"' package.json | cut -d'"' -f4)
echo -e "${YELLOW}現在のバージョン: ${CURRENT_VERSION}${NC}"

if [ "$CURRENT_VERSION" != "1.1.6" ]; then
    echo -e "${RED}エラー: バージョンが1.1.6ではありません！${NC}"
    exit 1
fi

# 1. ビルドテスト
echo -e "${YELLOW}1. ローカルビルドテスト中...${NC}"
pnpm run build

# 2. Git コミット
echo -e "${YELLOW}2. Git コミット中...${NC}"
cd /Users/jrpj2010/vibe-coding/app/import/14_tanren-emotion-analysis
git add -A
git commit -m "emergency_fix: CRITICAL - v1.1.6 Complete functionality restoration for production" || echo "変更なし"

# 3. GitHub へプッシュ
echo -e "${YELLOW}3. GitHub へプッシュ中...${NC}"
git push origin main

# 4. Cloud Run デプロイ
echo -e "${YELLOW}4. Cloud Run へデプロイ中...${NC}"
gcloud config set project gemini-20241115

# ソースから直接デプロイ
gcloud run deploy tanren-emotion-analysis \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production,GOOGLE_AI_MODEL=gemini-2.5-pro-preview-05-06 \
  --set-secrets GOOGLE_AI_API_KEY=tanren-gemini-api-key:latest

# 5. デプロイ確認
echo -e "${YELLOW}5. デプロイ確認中...${NC}"
sleep 30
DEPLOYED_VERSION=$(curl -s https://tanren-emotion-analysis-q6fk4arjta-an.a.run.app/api/version | grep -o '"version":"[^"]*"' | cut -d'"' -f4)
echo -e "${GREEN}デプロイされたバージョン: ${DEPLOYED_VERSION}${NC}"

if [ "$DEPLOYED_VERSION" = "TANREN Ver 1.1.6" ]; then
    echo -e "${GREEN}=== デプロイ成功！v1.1.6が正常に稼働しています ===${NC}"
else
    echo -e "${RED}=== 警告: デプロイされたバージョンが期待値と異なります ===${NC}"
fi

echo -e "${GREEN}本番URL: https://tanren-emotion-analysis-q6fk4arjta-an.a.run.app${NC}"