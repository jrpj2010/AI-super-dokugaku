# GPT Image Generator

OpenAI の DALL-E を使用した画像生成アプリケーションです。

## 機能

- マスタープロンプトを使用した複数画像の一括生成
- SSE（Server-Sent Events）によるリアルタイム進捗表示
- 生成画像の一括ダウンロード
- セッションベースのフォールバック機構
- 履歴管理機能

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (状態管理)
- OpenAI API (DALL-E)
- Docker

## 環境構築

### 必要な環境

- Node.js 18以上
- pnpm (推奨) または npm
- Docker (オプション)

### セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/jrpj2010/gpt-image-generator.git
cd gpt-image-generator
```

2. 依存関係をインストール
```bash
pnpm install
```

3. 環境変数を設定
```bash
cp .env.example .env
# .env ファイルを編集して OPENAI_API_KEY を設定
```

4. 開発サーバーを起動
```bash
pnpm dev
```

## Docker での実行

```bash
docker-compose up -d
```

## Cloud Run へのデプロイ

```bash
./deploy-to-cloud-run.sh YOUR_PROJECT_ID YOUR_OPENAI_API_KEY
```

## ライセンス

MIT License