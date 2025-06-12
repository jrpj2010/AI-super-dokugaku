# Gen-Spa 2.0 - 次世代プレゼンテーション生成システム

Gen-Spa 2.0は、Gemini APIを活用して会議の文字起こしや資料テキストから高品質なプレゼンテーション一式を自動生成するWebアプリケーションです。

## 🌟 主な特徴

- 📝 **多様なプレゼンテーションスタイル**: Flash Impact、Visual Heavy、Zen Mincho等の豊富なテンプレート
- 🤖 **AI駆動の自動生成**: Gemini 2.5 Pro/Flash（最大65,536トークン出力対応）
- 📊 **インタラクティブプレゼン**: スライドナビゲーション付きHTML出力
- 🎨 **カスタマイズ可能**: スライド数（3-50枚）やAIモデルの選択が可能
- ☁️ **Cloud Ready**: Google Cloud Runでの本番デプロイ対応
- 🔒 **セキュリティ重視**: サーバーサイドプロキシによるAPIキー保護

## 🚀 クイックスタート

### 前提条件
- Node.js 18以上
- Google Cloud Project（Cloud Run利用時）
- Gemini API Key

### ローカル開発

```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd app/import/21_gen-spa-2

# 2. 依存関係をインストール
npm install

# 3. 環境変数を設定
echo "GEMINI_API_KEY=your-gemini-api-key-here" > .env.local

# 4. 開発サーバーを起動
npm run dev

# 5. ブラウザでアクセス
open http://localhost:5173
```

### 本番デプロイ（Cloud Run）

```bash
# 環境変数を設定
export PROJECT_ID=your-google-cloud-project-id
export GEMINI_API_KEY=your-gemini-api-key

# Cloud Runにデプロイ（Buildpacksを使用）
gcloud run deploy gen-spa-2-0 \
  --source=. \
  --region=us-west1 \
  --allow-unauthenticated \
  --port=3000 \
  --set-env-vars="GEMINI_API_KEY=$GEMINI_API_KEY" \
  --timeout=300
```

## 🛠️ 技術仕様

### アーキテクチャ

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  React Frontend │────▶│  Express Proxy  │────▶│   Gemini API    │
│   (TypeScript)  │◀────│    (Node.js)    │◀────│  (Google Cloud) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │  jsonrepair     │
         │              │  (JSON修復)     │
         │              └─────────────────┘
         ▼
┌─────────────────┐
│  HTML Generator │
│  (Tailwind CSS) │
└─────────────────┘
```

### 技術スタック

- **フロントエンド**: 
  - React 19 + TypeScript
  - Tailwind CSS
  - Vite（ビルドツール）
  - react-markdown（Markdown処理）

- **バックエンド**: 
  - Express.js（プロキシサーバー）
  - jsonrepair（壊れたJSON自動修復）
  - CORS対応

- **AI/ML**: 
  - Google Gemini 2.5 Pro/Flash
  - 最大65,536トークン出力対応
  - 自動フォールバック機能

- **インフラ**: 
  - Google Cloud Run
  - Docker/Buildpacks
  - nginx（静的ファイル配信）

## 📚 開発における主要な問題と解決策

### 1. JSON解析エラー問題

**問題**: Gemini APIからの大規模JSONレスポンスがパースエラーを起こす

**解決策**:
- 文字列リテラル内のみ改行文字をエスケープ
- jsonrepairライブラリによる自動修復機能
- 2段階のエラーハンドリング

```typescript
// jsonrepairによる自動修復
try {
  parsedData = JSON.parse(finalJson);
} catch (e1) {
  const repaired = jsonrepair(cleanedJson);
  parsedData = JSON.parse(repaired);
}
```

### 2. セキュリティ対策

**実装済み対策**:
- APIキーはサーバー側で管理（環境変数）
- Express.jsプロキシ経由でAPI呼び出し
- CORS設定による不正アクセス防止
- セキュリティヘッダーの適切な設定

### 3. スケーラビリティ

**最適化内容**:
- Cloud Run: 2GB RAM, 2vCPU
- タイムアウト: 5分（300秒）
- ペイロード制限: 50MB
- 自動リトライ機能（最大3回）

## 🔍 トラブルシューティング

### よくある問題

1. **「APIキーが有効ではありません」エラー**
   - 環境変数 `GEMINI_API_KEY` または `API_KEY` が正しく設定されているか確認
   - Cloud Runの環境変数設定を確認

2. **JSONパースエラー**
   - ブラウザコンソールで `jsonrepair successful` ログを確認
   - 入力テキストが長すぎる場合は短縮を検討

3. **タイムアウトエラー**
   - より短いプロンプトを使用
   - スライド数を減らす（推奨: 10枚以下）

### デバッグコマンド

```bash
# Cloud Runのログを確認
gcloud run services logs read gen-spa-2-0 --region=us-west1 --limit=50

# サービスの詳細確認
gcloud run services describe gen-spa-2-0 --region=us-west1

# 最新リビジョンの確認
gcloud run revisions list --service=gen-spa-2-0 --region=us-west1
```

## 📋 今後の改善TODO

### セキュリティ強化
- [ ] DOMPurifyによるXSS対策の実装
- [ ] Content Security Policy (CSP) の設定
- [ ] 入力値バリデーションの強化
- [ ] iframeサンドボックスの強化

### パフォーマンス最適化
- [ ] レート制限の実装（express-rate-limit）
- [ ] キューシステムの導入（Bull等）
- [ ] ストリーミングレスポンスの実装
- [ ] Service Workerによるキャッシング

### コード品質向上
- [ ] 本番環境でのconsole.log制御
- [ ] エラーハンドリングの統一化
- [ ] TypeScriptの型定義強化（any型の排除）
- [ ] ユニットテストの追加

### 機能拡張
- [ ] 多言語対応（i18n）
- [ ] プレゼンテーションのPDF/PowerPoint出力
- [ ] リアルタイムコラボレーション機能
- [ ] テンプレートのカスタマイズ機能

## 🤝 開発者向け情報

### ディレクトリ構造

```
21_gen-spa-2/
├── App.tsx                  # メインReactコンポーネント
├── components/              # UIコンポーネント
│   ├── GeneratedFilesPreview.tsx
│   └── LoadingSpinner.tsx
├── services/               
│   └── geminiService.ts    # Gemini API統合・フォールバック
├── utils/
│   └── htmlGenerators.ts   # HTML生成ロジック
├── server.js               # Express.jsプロキシサーバー
├── constants.ts            # 定数定義
├── types.ts                # TypeScript型定義
└── promptTemplates.ts      # プロンプトテンプレート設定
```

### 主要な設計判断

1. **サーバープロキシアーキテクチャ**: セキュリティのため、APIキーをクライアントに露出させない
2. **jsonrepair導入**: Gemini APIの"壊れたJSON"問題への対応
3. **タイムスタンプベースのキャッシュバスティング**: Vite設定でビルドごとに新しいファイル名
4. **モノリシック構造**: シンプルさを優先し、過度な分割は避ける

## 📄 ライセンス

このプロジェクトは開発中のプロトタイプです。商用利用前に適切なライセンスを設定してください。

---

最終更新日: 2025年6月11日
開発者: Claude Code (Opus 4) with 佐藤勝彦様