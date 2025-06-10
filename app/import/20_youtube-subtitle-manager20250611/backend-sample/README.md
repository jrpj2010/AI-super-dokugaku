# YouTube Subtitle Manager - Backend Sample

このディレクトリには、YouTube Subtitle Managerのバックエンドプロキシサーバーのサンプル実装が含まれています。

## 概要

このバックエンドサーバーは以下の機能を提供します：

- YouTube Data API v3への安全なプロキシアクセス
- APIキーの環境変数での管理
- フロントエンドからのリクエストを受けて、YouTube APIにアクセスし、整形したデータを返す

## セットアップ

### 1. 依存関係のインストール

```bash
cd backend-sample
npm install
```

### 2. 環境変数の設定

`.env` ファイルを作成して、YouTube API キーを設定してください：

```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
PORT=3001
```

または、環境変数を直接設定：

```bash
export YOUTUBE_API_KEY=your_youtube_api_key_here
export PORT=3001
```

### 3. サーバーの起動

開発モード（自動再起動）：
```bash
npm run dev
```

本番モード：
```bash
npm start
```

## API エンドポイント

### GET /api/youtube/search

YouTube動画を検索します。

**クエリパラメータ：**
- `q` (必須): 検索クエリ
- `maxResults`: 最大結果数（デフォルト: 25）
- `pageToken`: ページネーション用トークン
- `order`: ソート順序（relevance, date, rating, viewCount, title）
- `videoDuration`: 動画の長さ（any, short, medium, long）
- `dateRange`: 日付範囲（any, hour, today, week, month, year）

**レスポンス例：**
```json
{
  "videos": [...],
  "nextPageToken": "...",
  "prevPageToken": "...",
  "totalResults": 1000,
  "resultsPerPage": 25
}
```

### GET /api/youtube/videos/:videoId

指定された動画IDの詳細情報を取得します。

**レスポンス例：**
```json
{
  "videoInfo": {
    "id": "video_id",
    "snippet": {...},
    "statistics": {...},
    "contentDetails": {...}
  },
  "captions": [...],
  "comments": [...]
}
```

### GET /health

ヘルスチェック用エンドポイント。

## フロントエンドからの利用

フロントエンドの `services/youtubeService.ts` で、`BACKEND_API_BASE_URL` を以下のように設定してください：

```typescript
const BACKEND_API_BASE_URL = 'http://localhost:3001/api/youtube';
```

## Cloud Run へのデプロイ

### 1. Dockerfile の作成

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

### 2. Cloud Run へのデプロイ

```bash
# Google Cloud にログイン
gcloud auth login

# プロジェクトを設定
gcloud config set project YOUR_PROJECT_ID

# Cloud Run にデプロイ
gcloud run deploy youtube-subtitle-backend \
  --source=. \
  --region=asia-northeast1 \
  --allow-unauthenticated \
  --set-env-vars YOUTUBE_API_KEY=your_api_key_here
```

## セキュリティ上の注意

- APIキーは必ず環境変数で管理し、コードにハードコードしないでください
- 本番環境では適切なCORS設定を行ってください
- レート制限やリクエスト検証を追加することを検討してください
- HTTPSを使用してください

## 開発ノート

このバックエンドサーバーは最小限の実装です。本番利用時は以下の機能追加を検討してください：

- 認証・認可機能
- レート制限
- ログ出力
- エラーハンドリングの強化
- リクエストキャッシュ
- モニタリング・ヘルスチェック機能