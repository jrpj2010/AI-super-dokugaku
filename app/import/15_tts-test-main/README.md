# Gemini 2.5 TTS - 全話者対応音声合成システム v1.1.0

Google Gemini 2.5 Flash/Pro Preview TTSモデルを使用した、日本語対応の高品質音声合成Webアプリケーションです。

## 🌟 主な機能

### 1. シンプル音声生成
- テキストを入力して即座に音声を生成
- 30種類以上の話者から選択可能
- リアルタイムストリーミング再生

### 2. 複数話者対話
- 最大2名の話者による自然な対話音声を生成
- 話者ごとに感情（喜び、悲しみ、怒り、興奮、落ち着き）を設定可能
- 会話のトーンを自動最適化

### 3. SRT字幕ファイル対応
- SRTファイルをアップロードまたはテキスト入力で処理
- 話者を自動認識し、適切な音声を割り当て
- タイムコードに基づいた正確な音声生成

### 4. カスタムインタラクション（v1.1.0新機能）
- AI（Gemini 2.5 Flash Preview）による自動スタイル生成
- 「疲れた様子で話す」「明るく元気に話す」など、細かな表現指定
- 手動でのスタイルカスタマイズも可能

## 🗣️ 話者の特徴（実際の聴き比べに基づく分類）

### 女性の声
- **Leda**: アニメ声・若い女性・明るい
- **Aoede**: 成人女性・セクシー・少し声枯れ
- **Callirrhoe**: 成人女性・AIっぽい・聞きなれた
- **Laomedeia**: 成人女性・落ち着いた・ナレーター向き
- 他12種類

### 男性の声
- **Puck**: 成人男性・ナレーター向き・誠実そう
- **Charon**: 成人男性・落ち着いた・頭が良さそう
- **Enceladus**: ヒロシ・落ち着いた・父親
- **Algieba**: 成人男性・声枯れ・詐欺師・ダミ声
- 他14種類

## 🚀 デプロイ済みURL

https://tts-test-main-632969986222.asia-northeast1.run.app

## 💻 ローカル開発

### 必要な環境
- Node.js 18以上
- Google Cloud SDK
- Gemini API Key

### セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/jrpj2010/tts-test-main.git
cd tts-test-main
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.example .env
# .envファイルを編集してGOOGLE_GENERATIVE_AI_API_KEYを設定
```

4. 開発サーバーを起動
```bash
npm run dev
```

5. ブラウザで http://localhost:8080 を開く

### ビルド

```bash
npm run build
```

## 🐳 Docker対応

### Dockerビルド
```bash
docker build -t tts-test-main .
```

### Docker実行
```bash
docker run -p 8080:8080 -e GOOGLE_GENERATIVE_AI_API_KEY=your-api-key tts-test-main
```

## ☁️ Cloud Runへのデプロイ

```bash
gcloud run deploy tts-test-main \
  --source=. \
  --region=asia-northeast1 \
  --allow-unauthenticated \
  --project=your-project-id
```

## 📝 API仕様

### POST /api/tts
単一話者の音声生成

```json
{
  "text": "こんにちは",
  "voice": "Puck",
  "model": "gemini-2.5-flash-preview-tts",
  "style": "明るく元気に話す"
}
```

### POST /api/conversation
複数話者の対話音声生成

```json
{
  "conversation": [
    { "speaker": "田中", "text": "おはようございます", "emotion": "happy" },
    { "speaker": "佐藤", "text": "おはようございます", "emotion": "" }
  ],
  "speakers": [
    { "name": "田中", "voice": "Leda" },
    { "name": "佐藤", "voice": "Puck" }
  ],
  "model": "gemini-2.5-flash-preview-tts",
  "style": "朝の挨拶、爽やかに"
}
```

### POST /api/generate-style
スタイル自動生成

```json
{
  "text": "今日は本当に暑いですね...",
  "type": "simple"
}
```

## ⚠️ 制限事項

- API レート制限: 1分あたり10リクエストまで
- 複数話者対話: 最大2名まで
- 処理時間: Cloud Runのタイムアウト（5分）以内
- 対応言語: 24言語（日本語、英語、中国語、韓国語など）

## 🛠️ 技術スタック

- **フロントエンド**: Vanilla JavaScript, HTML5, CSS3
- **バックエンド**: Node.js, TypeScript
- **AI/ML**: Google Gemini 2.5 Flash/Pro Preview
- **インフラ**: Google Cloud Run, Docker
- **音声処理**: Web Audio API, wav library

## 📄 ライセンス

MIT License

## 🤝 貢献

Issues や Pull Requests は歓迎します。

## 📞 連絡先

質問や要望がある場合は、GitHubのIssuesでお知らせください。

---

**Made with ❤️ by TANREN Inc.**