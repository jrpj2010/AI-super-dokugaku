# TANREN感情分析プラットフォーム - デプロイメントガイド

## 前提条件

1. Google Cloud Platformアカウント
2. gcloud CLIのインストールと認証
3. 以下のGoogle Cloud APIの有効化:
   - Cloud Run API
   - Cloud Build API
   - Secret Manager API
   - Container Registry API

## 環境変数の準備

Google AI Studio APIキーを取得:
1. https://aistudio.google.com/ にアクセス
2. APIキーを生成
3. 環境変数として設定:
   ```bash
   export GOOGLE_AI_API_KEY="your-api-key-here"
   ```

## デプロイ手順

### 1. プロジェクトIDの設定

```bash
export PROJECT_ID="your-gcp-project-id"
export REGION="asia-northeast1"  # または希望のリージョン
```

### 2. デプロイスクリプトの実行

```bash
./deploy.sh
```

このスクリプトは以下を自動的に実行します:
- Google Cloud認証の確認
- 必要なAPIの有効化
- シークレットの作成/更新
- Dockerイメージのビルドとプッシュ
- Cloud Runへのデプロイ
- ヘルスチェック

### 3. 手動デプロイ（オプション）

スクリプトを使用しない場合:

```bash
# シークレットの作成
echo -n "$GOOGLE_AI_API_KEY" | gcloud secrets create tanren-google-ai-key --data-file=-

# Cloud Buildでデプロイ
gcloud builds submit --config=cloudbuild.yaml --substitutions=_PROJECT_ID=$PROJECT_ID

# または直接デプロイ
gcloud run deploy tanren-emotion-analysis \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-secrets="GOOGLE_AI_API_KEY=tanren-google-ai-key:latest"
```

## デプロイ後の確認

### ログの確認
```bash
gcloud run logs read --service=tanren-emotion-analysis --region=asia-northeast1
```

### メトリクスの確認
Google Cloud Consoleで確認:
https://console.cloud.google.com/run

### トラブルシューティング

1. **ビルドエラー**: 
   - `pnpm-lock.yaml`が最新か確認
   - ローカルでビルドテスト: `docker build -t test .`

2. **起動エラー**:
   - ポート8080が正しく設定されているか確認
   - 環境変数が正しく設定されているか確認

3. **API接続エラー**:
   - Secret Managerの権限を確認
   - APIキーが有効か確認

## セキュリティ注意事項

1. APIキーは必ずSecret Managerで管理
2. 本番環境では認証を有効化することを推奨
3. CORSの設定を本番環境に合わせて調整

## コスト最適化

1. 最小インスタンス数を0に設定（アイドル時のコスト削減）
2. 適切なメモリ/CPU割り当て（現在: 1GB/1CPU）
3. リージョンの選択（asia-northeast1は日本のユーザー向け）

## 更新手順

```bash
# コードの更新後
git add .
git commit -m "Update: [変更内容]"

# 再デプロイ
./deploy.sh
```

## モニタリング

Cloud Runのダッシュボードで以下を監視:
- リクエスト数
- レスポンスタイム
- エラー率
- CPU/メモリ使用率

## バックアップとロールバック

Cloud Runは自動的に以前のリビジョンを保持します。
ロールバックが必要な場合:

```bash
gcloud run services update-traffic tanren-emotion-analysis \
  --to-revisions=REVISION_NAME=100 \
  --region=asia-northeast1
```