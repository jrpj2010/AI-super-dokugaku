# TANREN感情分析アプリ 更新・デプロイ手順書

このドキュメントは、TANREN感情分析アプリケーションの更新からデプロイまでの標準作業手順を記載しています。

## 前提条件

- Git がインストールされていること
- GitHub アカウントがあり、リポジトリへのアクセス権があること
- Google Cloud SDK (gcloud) がインストールされていること
- Google Cloud プロジェクト `gemini-20241115` へのアクセス権があること

## 作業手順

### 1. Git をコミットする

#### 1.1 変更内容の確認
```bash
cd /Users/jrpj2010/vibe-coding/app/import/14_tanren-emotion-analysis
git status
```

#### 1.2 変更をステージング
```bash
git add -A
```

#### 1.3 コミット
```bash
git commit -m "fix: [v1.1.X] 修正内容の簡潔な説明"
```

**コミットメッセージの規則:**
- `fix:` バグ修正
- `feat:` 新機能追加
- `docs:` ドキュメント変更
- `style:` コードスタイルの変更
- `refactor:` リファクタリング
- `test:` テストの追加・修正
- `chore:` ビルドプロセスやツールの変更

### 2. GitHub にバージョンアップをアップロードする

#### 2.1 バージョン番号の更新
```bash
# package.json のバージョンを更新
# 例: 1.1.5 → 1.1.6
```

**package.json の編集:**
```json
{
  "name": "my-v0-project",
  "version": "1.1.6",  // ← ここを更新
  "private": true,
  ...
}
```

#### 2.2 バージョン更新をコミット
```bash
git add package.json
git commit -m "chore: bump version to 1.1.6"
```

#### 2.3 GitHub へプッシュ
```bash
git push origin main
```

**エラーが出た場合:**
```bash
# リモートの変更を取り込む
git pull origin main --rebase

# 再度プッシュ
git push origin main
```

### 3. Cloud Run にデプロイする

#### 3.1 Google Cloud 認証の確認
```bash
gcloud auth list
```

**認証されていない場合:**
```bash
gcloud auth login
```

#### 3.2 プロジェクトの設定
```bash
gcloud config set project gemini-20241115
```

#### 3.3 ビルドとデプロイの実行

**方法1: ソースから直接デプロイ（推奨）**
```bash
cd /Users/jrpj2010/vibe-coding/app/import/14_tanren-emotion-analysis

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
```

**方法2: Cloud Build を使用**
```bash
gcloud builds submit --config=cloudbuild.yaml
```

#### 3.4 デプロイの確認

**デプロイ状況の確認:**
```bash
# サービスの状態を確認
gcloud run services describe tanren-emotion-analysis --region asia-northeast1

# URLを取得
gcloud run services describe tanren-emotion-analysis --region asia-northeast1 --format="value(status.url)"
```

**バージョンの確認:**
```bash
# デプロイされたバージョンを確認
curl -s https://tanren-emotion-analysis-q6fk4arjta-an.a.run.app/api/version
```

## トラブルシューティング

### よくあるエラーと対処法

#### 1. ビルドエラー
```bash
# ローカルでビルドを確認
pnpm run build
```

#### 2. デプロイタイムアウト
- デプロイには5-10分かかることがあります
- `gcloud run services list` でステータスを確認

#### 3. 権限エラー
```bash
# プロジェクトの確認
gcloud config get-value project

# 正しいプロジェクトに切り替え
gcloud config set project gemini-20241115
```

## 一括実行スクリプト

以下の内容を `deploy-all.sh` として保存し、実行権限を付与して使用できます：

```bash
#!/bin/bash
set -e

# 色付き出力
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== TANREN 感情分析アプリ デプロイ開始 ===${NC}"

# 1. Git コミット
echo -e "${YELLOW}1. Git コミット中...${NC}"
cd /Users/jrpj2010/vibe-coding/app/import/14_tanren-emotion-analysis
git add -A
git commit -m "$1" || echo "変更なし"

# 2. GitHub へプッシュ
echo -e "${YELLOW}2. GitHub へプッシュ中...${NC}"
git push origin main

# 3. Cloud Run デプロイ
echo -e "${YELLOW}3. Cloud Run へデプロイ中...${NC}"
gcloud config set project gemini-20241115
gcloud run deploy tanren-emotion-analysis \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated

# 4. 確認
echo -e "${YELLOW}4. デプロイ確認中...${NC}"
sleep 10
curl -s https://tanren-emotion-analysis-q6fk4arjta-an.a.run.app/api/version

echo -e "${GREEN}=== デプロイ完了 ===${NC}"
```

**使用方法:**
```bash
chmod +x deploy-all.sh
./deploy-all.sh "fix: 修正内容の説明"
```

## 重要な注意事項

1. **本番環境URL**: https://tanren-emotion-analysis-q6fk4arjta-an.a.run.app
2. **プロジェクトID**: gemini-20241115
3. **プロジェクト番号**: 632969986222
4. **リージョン**: asia-northeast1
5. **サービス名**: tanren-emotion-analysis

## 更新履歴

- 2025-05-29: v1.1.5 デプロイ手順書作成