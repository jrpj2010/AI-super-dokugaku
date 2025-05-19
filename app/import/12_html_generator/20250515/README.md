# Flask + Claude 3.7 Sonnet HTML Generator

## 概要

Azure VM（Ubuntu 22.04）上で動作する Flask 製 Web アプリケーションです。このアプリケーションは以下の機能を提供します：

1. **システムプロンプト**（編集可、LocalStorage に保存）と**ユーザープロンプト**を結合して
2. **Claude 3.7 Sonnet** へ送信し、返却された **HTML** を
3. **WYSIWYG** / **コード** / **プレビュー** の 3 モードで編集・閲覧
4. クリック 1 つで **HTML ファイルをダウンロード**
5. **Thinking モード** と **Web検索モード** の選択が可能

## 機能

- システムプロンプトの編集・保存（LocalStorage使用）
- ユーザープロンプトの入力
- Claude 3.7 Sonnet（20250219）を使ったHTML生成
- 3モード編集（WYSIWYG / コード / プレビュー）
- HTML編集機能（見出し、リスト、テーブル、リンク、画像など）
- HTMLファイルのダウンロード
- レスポンシブデザイン（モバイル対応）
- ダークモード対応
- エラーハンドリング（トースト通知）
- CSPによるセキュリティ確保

### 拡張モード: Claude 3.7 Sonnetの特殊機能

- **Thinking モード**: Claude の詳細な思考プロセスを表示。HTML生成の背景にある考え方を確認できます。トークンバジェットは16,000トークンに設定されています。
- **Web検索モード**: インターネット検索（web_search_20250305）を活用して最新情報に基づいたHTMLを生成。検索結果はレスポンスに引用として含まれます。

## セットアップ手順

### 前提条件

- Python 3.10以上
- Anthropic API キー（Claude 3.7 Sonnetへのアクセス権が必要）

### インストール手順

1. リポジトリをクローン/展開：

```bash
git clone <リポジトリURL>
cd <プロジェクトディレクトリ>
```

2. `.env` ファイルを作成し、API キーを設定：

```bash
echo "ANTHROPIC_API_KEY=sk-xxxxxxxxxxxxxxxx" > .env
```

3. 必要なパッケージをインストール：

```bash
pip install -r requirements.txt
```

必要なパッケージ:
- Flask 3.0.0
- python-dotenv 1.0.0
- requests 2.31.0
- anthropic 0.51以上（最新バージョン推奨）

### アプリケーションの起動

```bash
python -m flask run
```

デフォルトでは http://127.0.0.1:5000/ でアプリケーションにアクセスできます。

本番環境では、Gunicorn等のWSGIサーバーを使用してください：

```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## 使用上の注意

- API キーが含まれる `.env` ファイルは、Git にコミットしないでください。
- Claude 生成物の利用はユーザー責任となります。
- 外部スクリプトは CDN（cdn.jsdelivr.net、cdnjs.cloudflare.com と Google Fonts）に限定しています。
- 生成されたHTMLはダウンロード時に完全なHTMLドキュメントとして保存されます。
- Web検索モードは応答時間が長くなることがあります。また、検索結果の精度はClaudeの検索機能に依存します。
- Thinking モードとWeb検索モードを両方有効にすると、処理時間がさらに長くなる場合があります。

## ディレクトリ構成

```
/html-generator
 ├─ app.py              # Flask アプリ本体
 ├─ templates/
 │   ├─ layout.html     # 共通レイアウト（Tailwind）
 │   ├─ index.html      # メイン画面
 │   └─ wysiwyg.html    # WYSIWYG エディター
 ├─ static/
 │   ├─ js/
 │   │   └─ editor.js   # WYSIWYG／コード／プレビュー切替
 │   └─ css/
 │       ├─ tailwind.css  # Tailwind CSS
 │       ├─ input.css     # Tailwind入力ファイル
 │       └─ custom.css    # 追加スタイル
 ├─ requirements.txt      # 依存関係
 └─ README.md
```

## 特殊モードの使い方

### Thinking モード

1. 「生成オプション」セクションで「Thinking モード」をチェック
2. HTML生成ボタンをクリック
3. 生成完了後、自動的に「思考プロセス」タブが表示される
4. Claudeの思考プロセスを確認し、HTMLがどのように生成されたかを理解

### Web検索モード

1. 「生成オプション」セクションで「Web検索 モード」をチェック
2. HTML生成ボタンをクリック（応答時間が長くなります）
3. Web検索を活用したHTMLが生成される（検索結果は引用として含まれます）
4. この機能を使用するシステムプロンプトの例:
   - 「最新のiPhone情報を含むランディングページを作成してください」
   - 「2025年の最新のWeb開発トレンドを解説するブログページを作成してください」

## 更新履歴

- 2025年5月: Claude 3.7 Sonnet（20250219）に対応、Web検索機能の強化（web_search_20250305ツール使用）
- 2025年4月: Thinking機能の実装、トークンバジェット拡大（16,000トークン）