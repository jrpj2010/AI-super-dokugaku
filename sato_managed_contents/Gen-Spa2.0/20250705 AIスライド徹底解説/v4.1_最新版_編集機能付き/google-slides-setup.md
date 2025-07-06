# Google Slides API セットアップガイド

## 概要
Gen-Spa v4.1では、Google Slides APIを使用してHTMLスライドをGoogleスライドにエクスポートできます。
現在は開発環境でのテスト実装ですが、本番環境では適切な認証設定が必要です。

## セットアップ手順

### 1. Google Cloud Projectの作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクト名: `gen-spa-slides-export` など

### 2. Google Slides APIの有効化

1. 左メニューから「APIとサービス」→「ライブラリ」
2. 「Google Slides API」を検索
3. 「有効にする」をクリック

### 3. 認証情報の作成

#### 開発環境用（APIキー）
1. 「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「APIキー」
3. APIキーに制限を設定：
   - アプリケーションの制限: HTTPリファラー
   - APIの制限: Google Slides API

#### 本番環境用（OAuth 2.0）
1. 「認証情報を作成」→「OAuth クライアント ID」
2. アプリケーションの種類: ウェブアプリケーション
3. 承認済みのJavaScriptオリジン:
   - `http://localhost:3000`（開発用）
   - `https://yourdomain.com`（本番用）

### 4. 環境変数の設定

`.env`ファイルに以下を追加：
```
GOOGLE_API_KEY=your_api_key_here
GOOGLE_CLIENT_ID=your_client_id_here
```

## 現在の実装状況

### 実装済み機能
- ✅ リッチテキストエディタツールバー（太字、斜体、下線、見出し、リンク）
- ✅ PDF印刷時の適切なマージン（15mm = 約50px）
- ✅ Google Slides APIの基本的な統合

### 制限事項
- 現在はAPIキー認証のみ（開発環境）
- HTMLの複雑な要素（Chart.jsグラフなど）は画像変換が必要
- スライドのレイアウトは基本的なテキストと画像のみ

## トラブルシューティング

### 「リクエストされたファイルは存在しません」エラー
- APIキーの権限を確認
- Google Slides APIが有効になっているか確認
- CORSの設定を確認（本番環境）

### 認証エラー
- OAuth同意画面の設定を確認
- スコープが正しく設定されているか確認
- クライアントIDが正しいか確認

## 今後の改善予定

1. **完全なOAuth2.0実装**
   - ユーザー認証フロー
   - リフレッシュトークン管理

2. **高度な変換機能**
   - Chart.jsグラフの画像変換
   - 複雑なレイアウトの再現
   - アニメーション効果の追加

3. **双方向同期**
   - Googleスライドからの変更を反映
   - リアルタイム共同編集