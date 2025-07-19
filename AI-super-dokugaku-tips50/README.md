# AI超独学 第1部 Tips見開きビューワー

美麗なデザインで全50個のTipsを見開きレイアウトで表示するWebアプリケーションです。

## アクセス

https://jrpj2010.github.io/AI-super-dokugaku/

## 機能

- **全50個のTips**を3つのレベルに分けて収録
  - 初級（Tips 01-13）：13個
  - 中級（Tips 14-34）：21個  
  - 中級上（Tips 35-50）：16個
- 美麗な見開きレイアウト
  - 左ページ：従来の独学法とAI超独学法の比較図解
  - 右ページ：3つのステップと効果
- レスポンシブデザイン対応
- 矢印キー（←→）またはボタンでナビゲーション
- セレクターで直接ジャンプ可能

## 技術スタック

- HTML5 / CSS3 / JavaScript
- Tailwind CSS
- Font Awesome
- Noto Sans JP Font
- KatsuSparkデザインシステム

## ローカル開発

```bash
# Python3でローカルサーバーを起動
python3 -m http.server 8000
```

http://localhost:8000 でアクセス

## ファイル構成

```
├── index.html       # メインページ
├── styles.css       # スタイルシート
├── script.js        # JavaScriptロジック
├── favicon.ico      # ファビコン
├── イラスト/        # Tips画像（Before/After）
├── 初級/            # Tips 01-13のJSONデータ
├── 中級/            # Tips 14-34のJSONデータ
└── 中級上/          # Tips 35-50のJSONデータ
```

---

🎯 Generated with [Claude Code](https://claude.ai/code)