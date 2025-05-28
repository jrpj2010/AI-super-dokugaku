# TANREN感情分析プラットフォーム

リアルタイム感情分析を行うロールプレイ診断プラットフォームです。

## 機能

- 🎥 リアルタイムカメラ・マイク入力
- 🗣️ 音声認識による会話テキスト化
- 😊 AI駆動の感情分析（Google Gemini AI）
- 📊 感情データのリアルタイム可視化
- 🎬 セッション録画・再生機能
- ⚡ パフォーマンス最適化（キャッシング、バッチ処理）

## 技術スタック

- Next.js 15 + TypeScript
- React 19
- Google Gemini 2.0 Flash API
- WebRTC (getUserMedia)
- Web Speech API
- Docker + Cloud Run

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成:

```bash
cp .env.example .env.local
```

Google AI Studio APIキーを取得して設定:
- https://aistudio.google.com/ でAPIキーを生成
- `.env.local`の`GOOGLE_AI_API_KEY`に設定

### 3. 開発サーバーの起動

```bash
pnpm dev
```

http://localhost:3000 でアクセス可能

## テスト

```bash
# 単体テストの実行
pnpm test

# カバレッジレポート付きテスト
pnpm test:coverage

# ウォッチモードでテスト
pnpm test:watch
```

## デプロイ

### Cloud Runへのデプロイ

1. Google Cloud CLIをインストール・認証
2. プロジェクトIDを設定:
   ```bash
   export PROJECT_ID="your-gcp-project-id"
   export GOOGLE_AI_API_KEY="your-api-key"
   ```
3. デプロイスクリプトを実行:
   ```bash
   ./deploy.sh
   ```

詳細は[deployment-guide.md](./deployment-guide.md)を参照。

## プロジェクト構造

```
app/
├── api/              # APIルート
├── components/       # Reactコンポーネント
├── hooks/           # カスタムフック
├── lib/             # ユーティリティ・設定
├── types/           # TypeScript型定義
└── page.tsx         # メインページ

hooks/
├── use-media-stream.ts      # WebRTCメディア管理
├── use-speech-recognition.ts # 音声認識
├── use-emotion-analysis.ts   # 感情分析
└── use-session-recording.ts  # セッション録画

lib/
├── api/             # API関連
├── cache/           # キャッシュ実装
└── performance-config.ts # パフォーマンス設定
```

## パフォーマンス設定

`lib/performance-config.ts`で調整可能:
- フレームキャプチャ間隔: 3秒（デフォルト）
- APIバッチ処理間隔: 5秒
- キャッシュTTL: 5分
- 最大キャッシュサイズ: 100エントリー

## ライセンス

MIT License