# 週末お出かけプランナー Ver1.2

実際の観光情報をWebから取得し、AIが分析して家族向けの週末お出かけプランを提案するWebアプリケーションです。

## 機能

- 実際の観光地情報をWebから取得（観光地データベース、OpenTripMap API）
- 取得した情報をGemini AIが分析・整理
- ユーザーの希望に基づいて3つの週末プランを自動生成
- 各プランの詳細情報（アクティビティ、場所、費用目安など）を表示
- 実際の観光地名を含む具体的で実現可能なプラン提案
- モダンで使いやすいUI

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Google Gemini API (2.5 Flash Lite)
- Docker / OrbStack

## データソース

### 現在実装済み
- 静的観光地データベース（東京、京都、大阪、北海道、沖縄、熱海、箱根、草津、鎌倉など15箇所以上）
- ホットペッパーグルメAPI（レストラン・グルメ情報）
- じゃらんnet（Playwright実装済み、要有効化）
- 楽天トラベル（Playwright実装済み、要有効化）

### APIキー取得方法
- ホットペッパーAPI: https://webservice.recruit.co.jp/ から無料で取得可能

## 環境変数

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite-preview-06-17
HOTPEPPER_API_KEY=your_hotpepper_api_key  # オプション
ENABLE_SCRAPING=false  # スクレイピングを有効にする場合はtrue
```

## 開発環境

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## Dockerでの実行

```bash
# Dockerイメージのビルド
docker build -t weekend-planner .

# コンテナの起動
docker run -p 3000:3000 --env-file .env.local weekend-planner

# または docker-compose を使用
docker-compose up
```

## デプロイ

Cloud Runへのデプロイ：

```bash
# Cloud Buildを使用したデプロイ
gcloud run deploy service \
  --source . \
  --region us-west1 \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=your_key,GEMINI_MODEL=gemini-2.5-flash-lite-preview-06-17"
```

## 更新履歴

### Ver1.2 (2025-06-19)
- ホットペッパーAPI正式統合（APIキー設定済み）
- リアルタイムでレストラン情報を取得
- エリア別の自動フィルタリング
- 飲み放題・食べ放題などの特徴表示

### Ver1.1 (2025-06-19)
- ホットペッパーグルメAPI統合準備
- 画像表示の修正（placehold.co対応）
- 価格情報とURLリンクの表示
- 観光地データベースの拡充（15箇所以上）
- より安定した画像プレースホルダー

### Ver1.0 (2025-06-19)
- 初回リリース
- 実際の観光地情報を使用したリコメンド機能
- 静的データベースとOpenTripMap APIの統合
- Gemini 2.5 Flash Liteによる情報分析
- Next.js App RouterとServer Actions実装