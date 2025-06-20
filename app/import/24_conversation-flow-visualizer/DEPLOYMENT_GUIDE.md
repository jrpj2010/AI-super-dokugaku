# 会話フロービジュアライザー デプロイメントガイド

## 概要
このアプリケーションは音声ファイル（MP3、M4A、WAV、WebM）をアップロードし、Google Gemini APIを使用して文字起こし・話者識別を行い、会話の流れを可視化するツールです。

## 主な機能
- 🎤 リアルタイム録音・文字起こし
- 📁 音声ファイルアップロード（MP3、M4A対応）
- 👥 話者識別機能
- 🔗 TF-IDFベースの依存関係分析
- 📊 会話フローの視覚化

## Cloud Runへのデプロイ手順

### 1. 事前準備
```bash
# Google Cloud CLIがインストールされていることを確認
gcloud --version

# プロジェクトIDを設定
export PROJECT_ID=your-project-id
gcloud config set project $PROJECT_ID
```

### 2. APIキーの設定
`.env.production`ファイルを確認し、Gemini APIキーが正しく設定されていることを確認：
```
VITE_GEMINI_API_KEY=AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI
```

### 3. Dockerイメージのビルドとプッシュ
```bash
# Cloud Buildを使用してビルド
gcloud builds submit --tag gcr.io/$PROJECT_ID/conversation-flow-visualizer

# または、ローカルでビルドしてプッシュ
docker build -t gcr.io/$PROJECT_ID/conversation-flow-visualizer .
docker push gcr.io/$PROJECT_ID/conversation-flow-visualizer
```

### 4. Cloud Runへのデプロイ
```bash
# Cloud Runサービスをデプロイ
gcloud run deploy conversation-flow-visualizer \
  --image gcr.io/$PROJECT_ID/conversation-flow-visualizer \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1
```

### 5. 簡易デプロイ（Buildpacksを使用）
Dockerfileなしでも直接デプロイ可能：
```bash
gcloud run deploy conversation-flow-visualizer \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated
```

## 使用方法

### 音声ファイルのアップロード
1. 「📁 ファイル選択」ボタンをクリック
2. MP3、M4A、WAV、WebMファイルを選択（推奨：8分以内）
3. 自動的に文字起こし・話者識別が開始
4. 結果が会話ノードとして表示

### 営業トーク分析のベストプラクティス
- 商談録音は話者が明確に区別できる品質で録音
- 8分程度の録音が最適（長すぎると処理時間が増大）
- 重要な決定事項や提案は自動的にハイライト表示

## トラブルシューティング

### デプロイエラーの対処
```bash
# ログを確認
gcloud run services logs read conversation-flow-visualizer --region asia-northeast1

# サービスの状態を確認
gcloud run services describe conversation-flow-visualizer --region asia-northeast1
```

### パフォーマンス調整
メモリ不足の場合：
```bash
gcloud run services update conversation-flow-visualizer \
  --memory 2Gi \
  --region asia-northeast1
```

## セキュリティ設定
本番環境では以下を推奨：
1. APIキーをSecret Managerで管理
2. 認証を有効化（--no-allow-unauthenticated）
3. CORSの適切な設定

## コスト管理
- Cloud Run: リクエストベースの課金（アイドル時は無料）
- 推定コスト: 軽度な使用で月額$5-20
- Gemini API: 使用量に応じた従量課金

## 更新履歴
- v1.0: 初版リリース（録音機能のみ）
- v2.0: 音声ファイルアップロード機能追加
- v2.1: 話者識別機能の実装
- v2.2: 営業トーク分析の最適化