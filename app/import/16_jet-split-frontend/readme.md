# 🚀 ジェットスプリット - セミナー動画自動分割システム

セミナー動画をAIが自動で章・チャプターに分割する非エンジニア向けWebアプリケーション

## 📋 概要

ジェットスプリットは、1時間超のセミナー動画を自動的に章・チャプター単位で分割するWebアプリケーションです。Whisperで生成したSRT字幕ファイルをアップロードするだけで、Google Gemini AIが内容を分析し、適切な分割ポイントを提案します。

### 主な特徴

- 🎯 **簡単操作**: ドラッグ&ドロップでSRTファイルをアップロード
- 🤖 **AI分析**: Gemini AIが字幕から章・チャプターを自動抽出
- 📊 **プレビュー機能**: 分割結果を表で確認
- 📥 **多形式出力**: Excel、CSV、バッチZIPをダウンロード
- ⚡ **無劣化分割**: FFmpegで画質を保ったまま高速分割

## 🛠 必要な環境

- Node.js 18以上
- pnpm（推奨）またはnpm
- FFmpeg 4.x以上（動画分割時のみ）
- Google Gemini API キー

## 🚀 インストール方法

### 1. リポジトリのクローン

```bash
git clone [リポジトリURL]
cd jet-split-frontend
```

### 2. 依存関係のインストール

```bash
pnpm install
# または
npm install
```

### 3. 環境変数の設定

`.env.example`をコピーして`.env`を作成し、Gemini APIキーを設定：

```bash
cp .env.example .env
```

`.env`ファイルを編集：
```
GEMINI_API_KEY=あなたのGemini_APIキー
```

### 4. 開発サーバーの起動

```bash
pnpm dev
# または
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

## 📖 使い方

### ステップ1: SRTファイルをアップロード

1. Whisperで動画から字幕ファイル（.srt）を生成
2. ブラウザでジェットスプリットを開く
3. SRTファイルをドラッグ&ドロップまたはクリックして選択

### ステップ2: AI分析

「章・チャプターを抽出」ボタンをクリックすると、Gemini AIが自動的に：
- 内容を分析して大テーマ（章）を識別
- 30〜120秒程度の小テーマ（チャプター）に分割
- 各セクションに適切なタイトルを付与

### ステップ3: ファイルダウンロード

分析結果を確認後、必要な形式でダウンロード：

- **Excel形式**: Numbers/Excelで編集可能
- **CSV形式**: 汎用データ形式
- **バッチZIP**: 動画分割用スクリプト一式

### ステップ4: 動画分割（バッチZIP使用）

1. 動画ファイルと同じフォルダにZIPを解凍
2. ターミナルで以下を実行：

```bash
chmod +x jet_split.sh
./jet_split.sh 動画ファイル名.mp4
```

## 🐳 Docker環境での実行

### Docker Composeを使用

```bash
docker-compose up -d
```

ブラウザで http://localhost:3016 にアクセス

### 本番用イメージのビルド

```bash
docker build -t jet-split-frontend .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key jet-split-frontend
```

## ☁️ Cloud Runへのデプロイ

### 前提条件

- Google Cloud SDKがインストールされていること
- プロジェクトが設定されていること

### デプロイ手順

```bash
# APIキーをSecret Managerに保存
gcloud secrets create gemini-api-key --data-file=-
# (APIキーを入力してCtrl+D)

# Cloud Runにデプロイ
gcloud run deploy jet-split-frontend \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-secrets GEMINI_API_KEY=gemini-api-key:latest
```

## 📁 プロジェクト構成

```
jet-split-frontend/
├── app/                    # Next.js App Router
│   ├── api/               # APIエンドポイント
│   │   ├── generate-batch/  # SRT分析・バッチ生成
│   │   └── download/        # ファイルダウンロード
│   └── page.tsx           # メインUI
├── components/            # UIコンポーネント
├── doc/                   # プロジェクトドキュメント
├── public/               # 静的ファイル
└── docker-compose.yml    # Docker設定
```

## 🔧 技術スタック

- **フロントエンド**: Next.js 15 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: Google Gemini 1.5 Flash
- **ファイル生成**: XLSX、JSZip
- **動画処理**: FFmpeg（ローカル実行）

## 📝 開発者向け情報

### ビルド

```bash
pnpm build
```

### 型チェック

```bash
pnpm tsc --noEmit
```

### カスタマイズ

- プロンプト調整: `app/api/generate-batch/route.ts`の`GEMINI_PROMPT`
- UI変更: `app/page.tsx`
- スタイル調整: Tailwind設定またはコンポーネント

## ⚠️ 注意事項

- SRTファイルは5MB以下
- Gemini APIの利用制限に注意
- 動画ファイルはサーバーに送信されません（ローカル処理）

## 🤝 貢献

Issue報告やPull Requestを歓迎します！

## 📄 ライセンス

MIT License

---

Created by TANREN Inc.