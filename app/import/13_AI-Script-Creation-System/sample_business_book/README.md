# ビジネス書籍サンプルプロジェクト

このディレクトリは、AI-Script-Creation-Systemを使用してビジネス書籍を執筆するサンプルプロジェクトです。

## プロジェクト概要

- **書籍タイトル**: AI時代のビジネス変革戦略
- **サブタイトル**: データとテクノロジーで実現する持続的成長
- **対象読者**: 経営者・管理職・DX推進担当者
- **目標文字数**: 80,000字（各章8,000字×10章）

## ディレクトリ構造

```
sample_business_book/
├── README.md                 # このファイル
├── project_config.yaml       # プロジェクト設定
├── outline.md               # 書籍のアウトライン（自動更新）
├── concepts/                # 重要概念の定義
│   └── ai_transformation.md
├── case_studies/           # ケーススタディ
│   └── toyota_predictive_maintenance.yaml
├── chapters/               # 生成された章（執筆時に作成）
├── versions/              # アウトラインのバージョン履歴
└── quality_reports/       # 品質検証レポート
```

## 使用方法

### 1. 初期設定

```bash
# プロジェクトディレクトリに移動
cd sample_business_book

# 必要なディレクトリを作成
mkdir -p chapters versions quality_reports
```

### 2. 章の執筆

```python
from src.business_book_manager import BusinessBookManager
from src.business_book_generator import BusinessBookGenerator

# マネージャーの初期化
manager = BusinessBookManager("sample_business_book")

# 第1章のコンテキスト取得
context = manager.get_chapter_context(1)

# 章の生成
generator = BusinessBookGenerator(manager)
chapter_text = generator.generate_chapter(1)

# 品質チェックと改善
improved_text = generator.improve_chapter(chapter_text, 1)
```

### 3. 進捗の確認

outline.mdは自動的に更新され、以下の情報が記録されます：
- 各章の執筆状況（✅完了、📝執筆中、⏳未着手）
- 現在の文字数
- 進捗率
- 最終更新日時

### 4. バージョン管理

すべての変更は`versions/`ディレクトリに自動保存され、いつでも過去のバージョンに戻すことができます。

## 主要機能

### ✨ 自動更新されるアウトライン
- 章を執筆するたびにoutline.mdが自動更新
- 進捗状況が視覚的に表示
- バージョン履歴の自動保存

### 📚 ケーススタディ管理
- 業界別・テーマ別に整理された事例
- 章の内容に応じて自動的に適切な事例を推薦
- 複数の形式（詳細版、簡潔版、インライン版）で出力

### 🎯 品質保証
- ビジネス書籍特有の品質基準でチェック
- 事例・理論・実践のバランスを自動評価
- 改善提案の自動生成

### 🔄 継続的改善
- 執筆済み章の品質レポート
- AIによる改善提案
- 読者フィードバックの反映

## カスタマイズ

### プロジェクト設定の変更

`project_config.yaml`を編集して、以下をカスタマイズできます：
- 書籍のタイトルと基本情報
- 章構成と文字数
- 文体とトーン
- 品質基準

### 新しい概念の追加

```bash
# concepts/ディレクトリに新しいMarkdownファイルを作成
# 例: concepts/digital_transformation.md
```

### 新しいケーススタディの追加

```bash
# case_studies/ディレクトリにYAMLファイルを作成
# テンプレートは case_studies/templates/case_study_template.yaml を参照
```

## トラブルシューティング

### アウトラインが更新されない場合
```python
# 手動で更新を実行
manager.outline_updater.add_progress_summary()
```

### バージョンを復元したい場合
```python
# バージョン履歴を確認
history = manager.version_manager.get_version_history()

# 特定のバージョンに復元
manager.version_manager.restore_version("20240120_100000")
```

## 次のステップ

1. 概念定義とケーススタディを充実させる
2. 第1章から順番に執筆を開始
3. 各章の品質レポートを確認し、必要に応じて改善
4. 全章完成後、全体の一貫性をチェック
5. 最終レビューと出版準備

---

このサンプルプロジェクトは、AI-Script-Creation-Systemの機能を最大限に活用し、高品質なビジネス書籍を効率的に執筆するためのテンプレートです。