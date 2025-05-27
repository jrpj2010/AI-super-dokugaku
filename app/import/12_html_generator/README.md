# HTML Generator App

[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/jrpj2010/html-generator-app/releases)
[![Release Date](https://img.shields.io/badge/release%20date-2025年5月27日-green.svg)](https://github.com/jrpj2010/html-generator-app/releases)
[![License](https://img.shields.io/badge/license-Private-red.svg)](LICENSE)

AIを活用したHTML生成アプリケーションです。

**現在のバージョン: v1.0.1 - 2025年5月27日版**

## 概要

このアプリケーションは、AIを使用してHTMLコンテンツを動的に生成・編集するためのツールです。

## ファイル構成

```
12_html_generator/
├── edithtml.html        # HTMLエディターのメインファイル
├── システムプロンプト.md  # AI用のシステムプロンプト定義
├── 20250515/           # 生成されたHTMLファイルのアーカイブ
└── template/           # HTMLテンプレートファイル
```

## 主な機能

- **HTMLエディター**: `edithtml.html` - インタラクティブなHTML編集インターフェース
- **AIプロンプト**: `システムプロンプト.md` - AI生成のためのプロンプト設定
- **テンプレート管理**: 再利用可能なHTMLテンプレート
- **バージョン管理**: 日付ごとのファイル管理

## 使い方

1. `edithtml.html` をブラウザで開く
2. AIプロンプトを使用してHTMLを生成
3. 生成されたHTMLを編集・カスタマイズ
4. 必要に応じてテンプレートとして保存

## システムプロンプトについて

`システムプロンプト.md` ファイルには、AIがHTMLを生成する際の指示や制約が定義されています。このファイルを編集することで、生成されるHTMLの品質やスタイルを調整できます。

## バージョン履歴

- **v1.0.1** (2025年5月27日) - バージョン表記の統一、ヘルスチェック改善
- **v1.0.0** (2025年5月27日) - 初回リリース、Cloud Runとローカル版の統合

## ライセンス

このプロジェクトは個人使用を目的としています。

---

© 2025 TANREN Inc. - HTML Generator App v1.0.1