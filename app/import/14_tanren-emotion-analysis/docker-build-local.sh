#!/bin/bash

# ローカルDockerビルド・テストスクリプト

# カラー出力用
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🐳 TANRENアプリケーションのローカルDockerビルドを開始します${NC}"

# 1. 既存のコンテナを停止
echo -e "${YELLOW}既存のコンテナを停止中...${NC}"
docker-compose down

# 2. Dockerイメージのビルド
echo -e "${YELLOW}Dockerイメージをビルド中...${NC}"
docker-compose build --no-cache

# 3. コンテナの起動
echo -e "${YELLOW}コンテナを起動中...${NC}"
docker-compose up -d

# 4. 起動確認
echo -e "${YELLOW}コンテナの起動を確認中...${NC}"
sleep 5

# コンテナの状態を確認
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ コンテナが正常に起動しました！${NC}"
    echo -e "${GREEN}アプリケーションURL: http://localhost:8080${NC}"
    echo
    echo -e "${YELLOW}ログを確認するには:${NC}"
    echo "docker-compose logs -f"
    echo
    echo -e "${YELLOW}コンテナを停止するには:${NC}"
    echo "docker-compose down"
else
    echo -e "${RED}❌ コンテナの起動に失敗しました${NC}"
    echo -e "${YELLOW}ログを確認してください:${NC}"
    docker-compose logs
    exit 1
fi