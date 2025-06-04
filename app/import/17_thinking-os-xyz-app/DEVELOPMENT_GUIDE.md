# 開発ガイド

## 🚀 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
# pnpmを使用（推奨）
pnpm install

# またはnpmを使用
npm install
```

### 2. 環境変数の設定

```bash
# .env.localファイルを作成
cp .env.example .env.local

# .env.localを編集して必要な値を設定
```

### 3. 開発サーバーの起動

```bash
# 通常の起動
pnpm dev

# Docker環境で起動
docker compose up
```

アプリケーションは http://localhost:3000 でアクセスできます。

## 📁 プロジェクト構造

```
17_thinking-os-xyz-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── components/            # UIコンポーネント
│   └── ui/               # shadcn/ui コンポーネント
├── lib/                   # ユーティリティ関数
├── docs/                  # ドキュメント
└── mockups/              # デザインモックアップ
```

## 🛠 主要な技術スタック

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Container**: Docker

## 📝 開発のヒント

### UIコンポーネントの追加

shadcn/uiコンポーネントを追加する場合：

```bash
npx shadcn-ui@latest add [component-name]
```

### 型安全性

TypeScriptの型チェック：

```bash
pnpm type-check
```

### コードフォーマット

```bash
pnpm format
```

## 🐳 Docker開発

### ビルドと起動

```bash
# イメージのビルド
docker compose build

# コンテナの起動
docker compose up

# バックグラウンドで起動
docker compose up -d
```

### ログの確認

```bash
docker compose logs -f app
```

### 停止

```bash
docker compose down
```

## 🚀 本番デプロイ

Google Cloud Runへのデプロイ：

```bash
# Dockerイメージのビルド
docker build -t thinking-os-xyz-app .

# Cloud Runへデプロイ（要Google Cloud SDK）
gcloud run deploy thinking-os-xyz-app \
  --source . \
  --region asia-northeast1
```

## 🧪 テスト

```bash
# テストの実行
pnpm test

# ウォッチモード
pnpm test:watch
```

## 📚 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [要件定義書](./docs/要件定義書.md)
- [技術仕様書](./docs/技術仕様書.md)