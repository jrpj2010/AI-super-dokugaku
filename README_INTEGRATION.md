# VibeCoding 統合プラットフォーム

## 概要

VibeCoding 統合プラットフォームは、複数のAIツールを一つのWebアプリケーションに統合したビジネス向けソリューションです。

## 🎯 統合の目的

- **ユーザビリティの向上**: 一つのURLですべての機能にアクセス
- **メンテナンスの簡素化**: 単一のコードベースで管理
- **コスト削減**: Cloud Runインスタンスの統合により運用コスト削減
- **開発効率の向上**: 共通コンポーネントの再利用

## 📦 統合されたサービス

### 現在利用可能

1. **スライド生成** (`/new-project`)
   - 議事録からプレゼンテーションスライドを自動生成
   - 元の場所: メインアプリケーション

2. **TTS（音声合成）** (`/tts`)
   - テキストを自然な音声に変換
   - 元の場所: `/app/import/15_tts-test-main`

3. **SRT音声変換** (`/srt`)
   - SRT字幕ファイルから音声を生成
   - 元の場所: `/app/import/15_tts-test-main`

### 統合予定

- プロンプト生成ツール
- リサーチアプリ
- 話者分離アプリ
- AI日記
- 画像生成ツール
- 感情分析ツール

## 🏗️ アーキテクチャ

```
vibe-coding/
├── app/                          # 統合Next.jsアプリケーション
│   ├── (root)/                   # ホームページ
│   ├── new-project/              # スライド生成
│   ├── tts/                      # TTS機能
│   ├── srt/                      # SRT音声変換
│   ├── api/                      # APIルート
│   │   ├── tts/                  # TTS API
│   │   └── srt-to-speech/        # SRT変換API
│   ├── components/               # 共通コンポーネント
│   └── lib/                      # 共通ライブラリ
```

## 🚀 デプロイ方法

### ローカル開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# http://localhost:3000 でアクセス
```

### Cloud Runへのデプロイ

```bash
# Buildpacksを使用した自動デプロイ
gcloud run deploy vibe-coding-integrated \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1
```

## 🔧 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **言語**: TypeScript
- **API**: Next.js API Routes → Server Actions（移行中）
- **デプロイ**: Google Cloud Run

## 📝 開発ガイドライン

### 新機能の追加方法

1. `/app`配下に新しいディレクトリを作成
2. `page.tsx`を作成して機能を実装
3. `/app/lib/navigation.ts`に新しいナビゲーション項目を追加
4. 必要に応じてAPIルートを`/app/api`に追加

### コーディング規約

- すべてのコンポーネントはTypeScriptで記述
- UIコンポーネントはshadcn/uiを使用
- スタイリングはTailwind CSSを使用
- 日本語でのコメントとドキュメント記載を推奨

## 🔐 環境変数

```env
# Google Cloud Text-to-Speech
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json

# OpenAI API（将来の機能用）
OPENAI_API_KEY=your-api-key

# その他の設定
NODE_ENV=production
```

## 📊 パフォーマンス目標

- ページ読み込み時間: 3秒以内
- Lighthouseスコア: 90以上
- 同時接続数: 100ユーザー以上

## 🐛 既知の問題

- TTS機能は現在モック実装（実際のAPIキーが必要）
- 大量のテキスト処理時にタイムアウトする可能性あり

## 📚 関連ドキュメント

- [非エンジニア向け利用ガイド](./INTEGRATION_GUIDE.md)
- [元のCLAUDE.md](./CLAUDE.md)
- [GitHub Issue #45](https://github.com/jrpj2010/claude-code-test/issues/45)

## 🤝 貢献方法

1. Issueを作成して機能提案や不具合報告
2. Pull Requestは`main`ブランチに対して作成
3. コミットメッセージは日本語OK

## 📄 ライセンス

プロプライエタリ - TANREN株式会社

---

最終更新: 2025年6月2日