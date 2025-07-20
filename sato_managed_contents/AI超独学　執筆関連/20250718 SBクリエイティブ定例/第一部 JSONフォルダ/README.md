# AI超独学 第1部 Tips50ビューワー

## 重要：ローカルサーバーが必要です

CORSポリシーにより、`file://`プロトコルでは正しく動作しません。必ずローカルサーバーを起動してください。

## 使い方

### 1. ローカルサーバーの起動

**方法1: 起動スクリプトを使用（推奨）**
```bash
# ターミナルで実行
./start-server.sh
```

**方法2: Pythonコマンドを直接実行**
```bash
# このフォルダに移動
cd "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ"

# サーバー起動
python3 -m http.server 8080
```

### 2. ブラウザでアクセス

サーバー起動後、以下のURLをブラウザで開いてください：
- http://localhost:8080
- または http://127.0.0.1:8080

**注意：index.htmlをダブルクリックして開いても動作しません！**

### 3. 操作方法

- **矢印ボタン** または **キーボードの左右矢印キー**：Tips間を移動
- **セレクトボックス**：特定のTipsに直接ジャンプ

## 機能

- 全50個のTips
  - 初級（beginner）：Tips 01-13
  - 中級（intermediate）：Tips 14-34
  - 中級上（advanced）：Tips 35-50
- 美麗な見開きレイアウト
- Before/After画像の表示
- 3ステップの詳細説明

## ファイル構成

```
第一部 JSONフォルダ/
├── index.html          # メインのHTMLファイル
├── script.js           # JavaScriptロジック
├── styles.css          # スタイルシート
├── start-server.sh     # サーバー起動スクリプト
├── images/             # Tips画像（Before/After）
├── beginner/           # 初級Tips JSONファイル（13個）
├── intermediate/       # 中級Tips JSONファイル（21個）
└── advanced/           # 中級上Tips JSONファイル（16個）
```

## トラブルシューティング

### 「Access to fetch ... has been blocked by CORS policy」エラーが出る場合
- ローカルサーバーを起動していない可能性があります
- 上記の手順1を実行してください

### ポートが使用中の場合
別のポート番号を指定してください：
```bash
python3 -m http.server 8081
```
その後、http://localhost:8081 でアクセスしてください。

### サーバーを停止する場合
ターミナルで `Ctrl+C` を押してください。

---

🎯 Generated with [Claude Code](https://claude.ai/code)