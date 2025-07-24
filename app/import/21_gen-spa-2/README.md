# Katsu-Spa 3.0 - 汎用プレゼンテーション生成システム

Katsu-Spa 3.0は、Gemini APIを活用して様々な形式のプロンプトから高品質なプレゼンテーション一式を自動生成するWebアプリケーションです。Gen-Spa 2.0から進化し、汎用的なプロンプト形式に対応したより柔軟なシステムとして生まれ変わりました。

## 🌟 v3.0の新機能

- 🚀 **汎用プロンプト対応**: Gen-Spa、MARP、その他あらゆる形式のプロンプトに対応
- ⚠️ **柔軟なバリデーション**: 警告レベルでの検証により、様々なプロンプトでの作成が可能
- 🔄 **自動フォーマット検出**: レスポンス形式を自動判定して適切に処理
- 🛠️ **改善されたエラー処理**: JSON解析失敗時の汎用形式フォールバック
- 🎯 **テンプレートタイプ**: gen-spa / marp / generic の3形式をサポート

## 🐳 Orbstackでの起動方法（推奨）

### APIキーエラーが出る場合

1. **新しいGemini APIキーを取得**
   - https://makersuite.google.com/app/apikey にアクセス
   - Googleアカウントでログイン
   - "Create API Key" をクリック
   - 新しいAPIキーをコピー

2. **.envファイルを更新**
   ```bash
   # .envファイルを編集
   GEMINI_API_KEY=your_new_api_key_here
   API_KEY=your_new_api_key_here
   ```

3. **Orbstackで起動**
   ```bash
   # プロジェクトディレクトリに移動
   cd /Users/jrpj2010/vibe-coding/app/import/21_gen-spa-2
   
   # Docker Composeで起動
   docker-compose up -d
   
   # ログを確認
   docker-compose logs -f
   
   # ブラウザでアクセス
   open http://localhost:8080
   ```

4. **停止する場合**
   ```bash
   docker-compose down
   ```

## 🌟 主な特徴

- 📝 **多様なプレゼンテーションスタイル**: Flash Impact、Visual Heavy、Zen Mincho等の豊富なテンプレート
- 🤖 **AI駆動の自動生成**: Gemini 2.5 Pro/Flash（最大65,536トークン出力対応）
- 📊 **インタラクティブプレゼン**: スライドナビゲーション付きHTML出力
- 🎨 **カスタマイズ可能**: スライド数（3-50枚）やAIモデルの選択が可能
- ☁️ **Cloud Ready**: Google Cloud Runでの本番デプロイ対応
- 🔒 **セキュリティ重視**: サーバーサイドプロキシによるAPIキー保護
- 🔄 **汎用プロンプト対応**: あらゆる形式のプロンプトに柔軟に対応

## 🚀 クイックスタート

### 前提条件
- Node.js 18以上
- Google Cloud Project（Cloud Run利用時）
- Gemini API Key

### ローカル開発

```bash
# 1. リポジトリをクローン
git clone https://github.com/jrpj2010/gen-spa-2.git
cd gen-spa-2

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
gcloud run deploy katsu-spa-3-0 \
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
         │              │  Format Detector│
         │              │  (Gen-Spa/MARP/ │
         │              │    Generic)     │
         │              └─────────────────┘
         ▼
┌─────────────────┐
│  HTML Generator │
│  (Tailwind CSS) │
└─────────────────┘
```

### 対応プロンプト形式

1. **Gen-Spa形式**: 従来のJSON構造形式
   ```json
   {
     "presentationTitle": "...",
     "analysisAndDesignDocument": "...",
     "slides": [...]
   }
   ```

2. **MARP形式**: Markdown Presentation形式
   ```markdown
   ---
   marp: true
   ---
   # タイトル
   内容...
   ```

3. **Generic形式**: 汎用テキスト形式
   - あらゆるテキスト形式に対応
   - 自動的にスライドに分割
   - 構造化データ（JSON配列）も自動処理

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
  - 汎用レスポンス処理

- **インフラ**: 
  - Google Cloud Run
  - Docker/Buildpacks
  - nginx（静的ファイル配信）

## 📚 v3.0での主要改善点

### 1. 汎用プロンプト対応

**改善点**: あらゆる形式のプロンプトに対応
- MARPフォーマット対応
- カスタムプロンプト形式対応
- 警告レベルでのバリデーション（エラーでも作成可能）

```typescript
// 自動フォーマット検出
const effectiveTemplateType = templateType || this.detectResponseType(rawResponse);

// 形式別処理
switch (effectiveTemplateType) {
  case 'marp': return this.processMarpResponse(rawResponse, inputText);
  case 'generic': return this.processGenericResponse(rawResponse, inputText);
  default: // Gen-Spa形式の処理
}
```

### 2. エラー処理の改善

**改善点**: JSON解析失敗時の汎用形式フォールバック
- 構造化データの自動スライド化
- 長いコンテンツの自動分割
- 無限リロードループの修正

### 3. ユーザビリティ向上

**改善点**: より直感的な操作性
- 柔軟なバリデーション（警告のみ）
- 自動テンプレート移行システム
- 改善されたデバッグコンソール

## 🔍 トラブルシューティング

### よくある問題

1. **「APIキーが有効ではありません」エラー**
   - 環境変数 `GEMINI_API_KEY` または `API_KEY` が正しく設定されているか確認
   - Cloud Runの環境変数設定を確認

2. **プロンプト形式エラー**
   - v3.0では警告のみで作成可能
   - 任意の形式のプロンプトを入力してください

3. **自動リロードループ**
   - v3.0で修正済み
   - 移行完了フラグで制御

### デバッグコマンド

```bash
# Cloud Runのログを確認
gcloud run services logs read katsu-spa-3-0 --region=us-west1 --limit=50

# サービスの詳細確認
gcloud run services describe katsu-spa-3-0 --region=us-west1

# 最新リビジョンの確認
gcloud run revisions list --service=katsu-spa-3-0 --region=us-west1
```

## 📋 今後の改善TODO

### セキュリティ強化
- [ ] DOMPurifyによるXSS対策の実装
- [ ] Content Security Policy (CSP) の設定
- [ ] 入力値バリデーションの強化

### パフォーマンス最適化
- [ ] レート制限の実装（express-rate-limit）
- [ ] キューシステムの導入（Bull等）
- [ ] ストリーミングレスポンスの実装

### 機能拡張
- [ ] より多くのプロンプト形式対応
- [ ] リアルタイムプレビュー機能
- [ ] テンプレートのインポート/エクスポート
- [ ] 多言語対応（i18n）

## 🤝 開発者向け情報

### ディレクトリ構造

```
21_gen-spa-2/
├── App.tsx                     # メインReactコンポーネント
├── components/                 # UIコンポーネント
│   ├── GeneratedFilesPreview.tsx
│   ├── LoadingSpinner.tsx
│   └── PromptTemplateModal.tsx # テンプレート管理UI
├── services/               
│   ├── geminiService.ts        # Gemini API統合・汎用形式対応
│   └── promptTemplateService.ts # テンプレート管理・移行処理
├── utils/
│   └── htmlGenerators.ts       # HTML生成ロジック
├── server.js                   # Express.jsプロキシサーバー
├── constants.ts                # 定数定義
├── types.ts                    # TypeScript型定義
├── promptTemplates.ts          # プロンプトテンプレート設定
└── IMPLEMENTATION_PLAYBOOK.md   # 実装ガイドライン
```

### v3.0での主要な設計判断

1. **汎用プロンプト対応**: 様々な形式に対応することでユーザビリティを向上
2. **フォールバック処理**: エラー時でも何らかの結果を返すことを優先
3. **バリデーション柔軟化**: 厳密な検証よりもユーザーの意図を尊重
4. **自動移行システム**: 旧バージョンからのスムーズな移行

## 📄 更新履歴

### v3.0 (2025年7月24日)
- 汎用プロンプト形式対応
- MARP形式サポート
- エラー処理改善
- 自動リロードループ修正
- バリデーション柔軟化

### v2.0 (2025年6月11日)
- 初期リリース
- Gen-Spa形式対応
- Gemini API統合

## 📄 ライセンス

このプロジェクトは開発中のプロトタイプです。商用利用前に適切なライセンスを設定してください。

---

最終更新日: 2025年7月24日  
開発者: Claude Code (Sonnet 4) with 佐藤勝彦様