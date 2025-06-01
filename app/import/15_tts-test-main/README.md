# 🎭 感情表現型音声合成システム

Google Gemini 2.5 Flash Preview TTSモデルを使用した、複数話者対応の感情表現型音声合成システムです。

## 🚀 主な特徴

- **複数話者対応**: 異なる話者に異なる音声を割り当て可能
- **感情表現**: 各発話に感情（喜び、悲しみ、怒り等）を付与可能
- **リアルタイム生成**: Gemini 2.5 Flash Preview TTSによる高速な音声生成
- **WebUI**: 直感的なWebインターフェースで会話を作成
- **日本語対応**: 日本語の自然な音声生成をサポート

## 📋 前提条件

- Node.js (v18.0.0 以降)
- pnpm
- Google AI Studio APIキー
  1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
  2. API キーを作成
  3. 安全な場所に保管

## 🛠️ インストール

1. 依存関係をインストールします：
```bash
pnpm install
```

2. `.env` ファイルを作成し、API キーを設定します：
```bash
cp .env.example .env
# .envファイルを編集して、実際のAPIキーを設定
```

## 🚀 使い方

プロジェクトを実行するには、以下のコマンドを使用します：

```bash
pnpm start
```

## 📝 実行結果

実行すると、以下のファイルが生成されます：
- `output.pcm`: 生のPCMオーディオデータ
- `output.wav`: 再生可能なWAVファイル

## 🎯 利用可能な音声

- **Kore**: 男性的な声
- **Puck**: 女性的な声  
- **Aoede**: 中性的な声
- **Charon**: 低い男性声

## 🌐 WebUIの使用方法

1. サーバーを起動:
```bash
pnpm server
```

2. ブラウザでアクセス:
```
http://localhost:8080/demo
```

3. 会話を作成:
   - 話者を選択
   - 感情を選択（オプション）
   - テキストを入力
   - 「音声を生成」をクリック

## 📡 API エンドポイント

### 単一テキスト音声生成
```bash
POST /api/tts
Content-Type: application/json

{
  "text": "こんにちは、世界！"
}
```

### 複数話者会話生成
```bash
POST /api/conversation
Content-Type: application/json

{
  "conversation": [
    {"speaker": "Joe", "text": "やあ、元気？", "emotion": "happy"},
    {"speaker": "Jane", "text": "うん、元気だよ！", "emotion": "excited"}
  ],
  "speakers": [
    {"name": "Joe", "voice": "Kore"},
    {"name": "Jane", "voice": "Puck"}
  ]
}

## 🐳 Dockerを使用した実行

```bash
# Dockerイメージのビルド
docker build -t gemini-tts .

# コンテナの実行
docker run -e GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here gemini-tts
```

## 🔧 開発

```bash
# 開発モード（ファイル変更を監視）
pnpm dev

# TypeScriptのビルド
pnpm build

# 型チェック
pnpm type-check

# リント
pnpm lint

# フォーマット
pnpm format
```

## 📂 プロジェクト構造

```
.
├── main.ts          # メインスクリプト
├── package.json     # パッケージ設定
├── tsconfig.json    # TypeScript設定
├── .env.example     # 環境変数のサンプル
├── Dockerfile       # Docker設定
└── README.md        # このファイル
```

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容について議論してください。

## 📝 ライセンス

MIT