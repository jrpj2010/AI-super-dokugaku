# HTML Generator App - デプロイメントガイド

## 概要

このドキュメントでは、HTML Generator App v1.0.0をGoogle Cloud Runにデプロイする手順を説明します。

- **プロジェクトID**: gemini-20241115
- **リージョン**: asia-northeast1
- **サービス名**: html-generator-app
- **本番URL**: https://html-generator-app-632969986222.asia-northeast1.run.app/

## 🚀 バージョン情報

- **現在のバージョン**: v1.0.0
- **リリース日**: 2025-05-27
- **主な特徴**:
  - Cloud Run版とローカル版の統合
  - 環境変数によるモデル切り替え
  - ヘルスチェックエンドポイント
  - 包括的なテストスイート

## 📋 前提条件

1. Google Cloud CLIがインストールされている
2. 適切な権限を持つGCPアカウント
3. Anthropic APIキー
4. Docker（ローカルテスト用）

## 🔧 環境変数

必須の環境変数:
- `ANTHROPIC_API_KEY`: Anthropic APIキー（必須）

オプションの環境変数:
- `CLAUDE_MODEL`: デフォルトモデル（デフォルト: claude-3-5-sonnet-20241022）
- `CLAUDE_THINKING_MODEL`: Thinkingモード用モデル（デフォルト: claude-3-7-sonnet-20250219）
- `PORT`: アプリケーションポート（デフォルト: 8080）
- `FLASK_ENV`: Flask環境（production/development）

## 📦 デプロイ方法

### 方法1: GitHub Actions（推奨）

1. **GitHub Secretsの設定**:
   ```
   GCP_SA_KEY: サービスアカウントのJSONキー
   ```

2. **自動デプロイ**:
   - `main`ブランチにプッシュすると自動デプロイ
   - Actions タブで進行状況を確認

### 方法2: Cloud Build

```bash
# プロジェクトディレクトリで実行
gcloud builds submit --config cloudbuild.yaml
```

### 方法3: 手動デプロイ

```bash
# 1. プロジェクトを設定
gcloud config set project gemini-20241115

# 2. ソースからデプロイ（推奨）
cd 20250515
gcloud run deploy html-generator-app \
  --source . \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --concurrency 80 \
  --max-instances 100 \
  --set-env-vars ANTHROPIC_API_KEY=your-api-key-here

# または、Dockerイメージを使用
docker build -t gcr.io/gemini-20241115/html-generator-app:v1.0.0 .
docker push gcr.io/gemini-20241115/html-generator-app:v1.0.0
gcloud run deploy html-generator-app \
  --image gcr.io/gemini-20241115/html-generator-app:v1.0.0 \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated
```

## 🧪 デプロイ前のテスト

### ローカルテスト
```bash
cd 20250515
./test-local.sh
```

### Dockerテスト
```bash
cd 20250515
./test-docker.sh
```

## 🔍 デプロイ後の確認

1. **ヘルスチェック**:
   ```bash
   curl https://html-generator-app-632969986222.asia-northeast1.run.app/health
   ```

2. **ログの確認**:
   ```bash
   gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=html-generator-app" \
     --limit 50 --format json
   ```

3. **メトリクスの確認**:
   - [Cloud Runコンソール](https://console.cloud.google.com/run/detail/asia-northeast1/html-generator-app/metrics)

## 🛠️ トラブルシューティング

### よくある問題

1. **APIキーエラー**:
   - 環境変数 `ANTHROPIC_API_KEY` が正しく設定されているか確認
   - Cloud Runの環境変数を更新: 
     ```bash
     gcloud run services update html-generator-app \
       --region asia-northeast1 \
       --update-env-vars ANTHROPIC_API_KEY=your-new-key
     ```

2. **メモリ不足**:
   - メモリを増やす:
     ```bash
     gcloud run services update html-generator-app \
       --region asia-northeast1 \
       --memory 1Gi
     ```

3. **タイムアウト**:
   - タイムアウトを延長:
     ```bash
     gcloud run services update html-generator-app \
       --region asia-northeast1 \
       --timeout 600
     ```

## 📝 バージョン管理

### タグの作成
```bash
git tag -a v1.0.1 -m "Bug fixes and improvements"
git push origin v1.0.1
```

### リリースノートの記載
GitHubのReleasesページで以下を記載:
- 変更点
- 新機能
- バグ修正
- Breaking Changes

## 🔄 ロールバック手順

問題が発生した場合のロールバック:

```bash
# 前のリビジョンを確認
gcloud run revisions list --service html-generator-app --region asia-northeast1

# 特定のリビジョンにトラフィックを戻す
gcloud run services update-traffic html-generator-app \
  --region asia-northeast1 \
  --to-revisions=html-generator-app-00005-l49=100
```

## 📞 サポート

問題が発生した場合:
1. [GitHub Issues](https://github.com/jrpj2010/html-generator-app/issues)
2. Cloud Runのログを確認
3. このドキュメントのトラブルシューティングセクションを参照

---

最終更新: 2025-05-27 | バージョン: 1.0.0