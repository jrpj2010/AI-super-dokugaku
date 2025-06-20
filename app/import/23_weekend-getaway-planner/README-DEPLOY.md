# 週末プランナーAI - Cloud Runデプロイガイド

## 📋 前提条件

1. Google Cloud アカウントの作成
2. Google Cloud CLI (gcloud) のインストール
3. 請求先アカウントの設定

## 🚀 デプロイ手順

### 1. Google Cloud CLIのセットアップ

```bash
# gcloud CLIのインストール（Mac）
brew install google-cloud-sdk

# ログイン
gcloud auth login

# プロジェクトの作成（初回のみ）
gcloud projects create weekend-planner-v3 --name="Weekend Planner V3"

# プロジェクトIDの確認
gcloud projects list
```

### 2. 必要なAPIの有効化

```bash
# プロジェクトIDを設定
export PROJECT_ID="weekend-planner-v3"
gcloud config set project $PROJECT_ID

# 必要なAPIを有効化
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 3. デプロイの実行

```bash
# deploy.shのプロジェクトIDを更新
sed -i '' 's/your-project-id/weekend-planner-v3/g' deploy.sh

# デプロイ実行
./deploy.sh
```

### 4. 環境変数の設定（オプション）

Hotpepper APIキーを使用する場合：

```bash
gcloud run services update weekend-planner-v3 \
  --update-env-vars NEXT_PUBLIC_HOTPEPPER_API_KEY=your-api-key \
  --region asia-northeast1
```

## 💰 コスト見積もり

Cloud Runは従量課金制で、以下の無料枠があります：

- **リクエスト**: 月200万リクエストまで無料
- **CPU時間**: 月180,000 vCPU秒まで無料
- **メモリ**: 月360,000 GiB秒まで無料

小規模な利用では無料枠内で収まることが多いです。

## 🔍 トラブルシューティング

### ビルドエラーの場合

```bash
# ビルドログの確認
gcloud builds list --limit=5

# 詳細ログの確認
gcloud builds log [BUILD_ID]
```

### デプロイ後のエラー

```bash
# ログの確認
gcloud run logs read --service=weekend-planner-v3 --region=asia-northeast1

# サービスの詳細確認
gcloud run services describe weekend-planner-v3 --region=asia-northeast1
```

### メモリ不足エラー

```bash
# メモリを増やす
gcloud run services update weekend-planner-v3 \
  --memory=2Gi \
  --region=asia-northeast1
```

## 🔄 更新とロールバック

### アプリケーションの更新

```bash
# コード変更後、再デプロイ
./deploy.sh
```

### 前のバージョンにロールバック

```bash
# リビジョン一覧を確認
gcloud run revisions list --service=weekend-planner-v3 --region=asia-northeast1

# 特定のリビジョンに100%のトラフィックを向ける
gcloud run services update-traffic weekend-planner-v3 \
  --to-revisions=weekend-planner-v3-00002-abc=100 \
  --region=asia-northeast1
```

## 🛡️ セキュリティ設定

### 認証を有効にする場合

```bash
# 認証を要求する設定に変更
gcloud run services update weekend-planner-v3 \
  --no-allow-unauthenticated \
  --region=asia-northeast1

# 特定のユーザーにアクセス権を付与
gcloud run services add-iam-policy-binding weekend-planner-v3 \
  --member="user:example@gmail.com" \
  --role="roles/run.invoker" \
  --region=asia-northeast1
```

## 📊 モニタリング

Google Cloud Consoleで以下を確認できます：

1. **Cloud Run** > サービス名をクリック
2. **指標**タブで以下を確認：
   - リクエスト数
   - レイテンシ
   - CPU使用率
   - メモリ使用率
   - エラー率

## 🗑️ リソースの削除

使用しなくなった場合：

```bash
# サービスの削除
gcloud run services delete weekend-planner-v3 --region=asia-northeast1

# プロジェクト全体の削除（注意！）
gcloud projects delete $PROJECT_ID
```