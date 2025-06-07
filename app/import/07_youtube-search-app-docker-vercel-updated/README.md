# YouTube字幕マネージャー v2.0.0

## 概要

このアプリケーションは、YouTubeの動画を検索し、字幕を取得・管理するためのツールです。

### 🎉 v2.0.0の新機能

- **yt-dlpによる字幕取得**: より確実な字幕取得を実現
- **プロキシサポート**: クラウド環境でのIP制限を回避
- **改善された字幕取得成功率**: 複数の取得方法を組み合わせて成功率を向上

### 主な機能

- キーワードによる動画検索
- 日付、動画の長さ、並び順によるフィルタリング
- 動画の字幕取得と表示（3つの方法で試行）
- 字幕のダウンロード（Markdown形式）
- デバッグパネル（通信ログの表示）

### 技術スタック

#### バックエンド
- Python 3.10
- Flask
- YouTube Data API
- YouTube Transcript API
- yt-dlp（v2024.5.27）

#### フロントエンド
- React
- TypeScript
- Material-UI
- Axios

### デプロイ方法

詳細なデプロイ手順については、`deployment-guide.md`を参照してください。

### 環境変数

#### 必須
- `YOUTUBE_API_KEY`: YouTube Data APIのキー

#### オプション（プロキシ設定）
- `HTTP_PROXY`: HTTPプロキシのURL（例: `http://proxy.example.com:8080`）
- `HTTPS_PROXY`: HTTPSプロキシのURL
- `TOR_PROXY`: Torプロキシ（例: `socks5://127.0.0.1:9050`）

### ライセンス

このプロジェクトはMITライセンスの下で公開されています。
