# TANREN Deep Research App v1.0.0

AIエージェントによる多角的な企業分析レポートを生成するWebアプリケーション

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jrpj2010/tanren-deep-research)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.22-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

## 🌟 特徴

### v1.0.0 の新機能
- ⚡ **並列処理システム**: 複数セクションの同時生成により高速化
- 📈 **最大64,000トークン出力**: 従来の8倍の詳細なレポート生成
- 🔄 **リアルタイム進捗表示**: セクションごとの生成状況を可視化
- 🎯 **2025年最新情報対応**: Gemini 2.5による最新データの反映
- 🐳 **Dockerコンテナ対応**: 簡単なデプロイとスケーラビリティ

### 主要機能
- 📝 曖昧なテーマから詳細な分析レポートを自動生成
- 🔍 PEST分析、SWOT分析、競争環境分析などの多角的な分析
- 📊 マークダウン形式でのプレビュー表示
- 💾 レポートのダウンロード機能（.md形式）
- 🚀 Gemini 2.5 Flash/Proによる高品質な分析
- 🌐 日本語完全対応

## セットアップ

### 1. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを編集し、Gemini APIキーを設定してください：

```
GEMINI_API_KEY=your_actual_api_key_here
```

APIキーは[Google AI Studio](https://aistudio.google.com/app/apikey)から取得できます。

### 2. 依存関係のインストール

```bash
cd apps/deep-research-app
pnpm install
```

### 3. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで http://localhost:3000 を開いてください。

## 使い方

1. テキストフィールドに分析したいテーマを入力
   - 例：「次世代エネルギー市場の展望」
   - 例：「日本の観光業が抱える課題と機会」
   - 例：「AI技術がもたらす製造業の変革」

2. 「分析開始」ボタンをクリック

3. AIが以下の内容を含む詳細なレポートを生成：
   - エグゼクティブサマリー
   - 市場環境分析
   - PEST分析
   - SWOT分析
   - 競争環境分析（ポーターの5つの力）
   - 戦略的推奨事項
   - リスクと対策

4. 生成されたレポートをプレビューで確認

5. 「ダウンロード」ボタンでマークダウンファイルとして保存

## Docker での実行

### ローカルビルド

```bash
docker build -t deep-research-app .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_api_key deep-research-app
```

### Cloud Run へのデプロイ

```bash
# Google Cloud にログイン
gcloud auth login

# プロジェクトを設定
gcloud config set project YOUR_PROJECT_ID

# Cloud Run にデプロイ
gcloud run deploy deep-research-app \
  --source . \
  --region asia-northeast1 \
  --set-env-vars GEMINI_API_KEY=your_api_key \
  --allow-unauthenticated
```

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Generative AI (Gemini 2.5 Pro)
- React Markdown
- Docker / Cloud Run対応

## 開発コマンド

```bash
# 開発サーバー
pnpm dev

# ビルド
pnpm build

# 本番サーバー
pnpm start

# リント
pnpm lint

# 型チェック
pnpm typecheck
```

## 📚 ドキュメント

- [要件定義書](./要件定義.md) - プロジェクトの要件と成功基準
- [技術定義書](./技術定義.md) - 技術スタックとアーキテクチャ
- [テスト定義書](./テスト定義.md) - テスト方針とテストケース

## 🚀 リリースノート

### v1.0.0 (2025-06-27)
- 🎉 初回リリース
- ⚡ 並列処理システムの実装
- 📈 最大64,000トークン出力対応
- 🔄 リアルタイム進捗表示機能
- 🐳 Dockerコンテナ対応
- 📝 包括的なドキュメント整備

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更を行う場合は、まずイシューを作成して変更内容について議論してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 👥 開発者

- **TANREN株式会社**
- CEO: 佐藤勝彦

## 📞 お問い合わせ

- GitHub Issues: [https://github.com/jrpj2010/tanren-deep-research/issues](https://github.com/jrpj2010/tanren-deep-research/issues)
- Email: [お問い合わせ先]

---
Made with ❤️ by TANREN