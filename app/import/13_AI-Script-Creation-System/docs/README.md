# AI-Script-Creation-System ドキュメント

## 概要

AI-Script-Creation-Systemは、AIを活用してあらゆる執筆作業を支援する汎用的な執筆支援システムです。小説、ビジネス書籍、技術書など、様々なジャンルの執筆を効率化し、高品質なコンテンツ作成を実現します。

## 主要機能

### 1. 自動バージョン管理システム
- **plot.md/outline.md**の変更履歴を自動保存
- 章執筆完了時の自動バージョン作成
- 差分（diff）の自動生成と保存
- 任意のバージョンへの復元機能

### 2. 進捗の自動追跡と可視化
- 執筆状況のリアルタイム更新（✅完了、📝執筆中、⏳未着手）
- 文字数の自動集計と進捗率表示
- 章別・節別の詳細な進捗レポート
- 視覚的なプログレスバー表示

### 3. UserInput自動展開機能
- UserInputフォルダーへのファイル投入で自動分類
- 内容解析による適切なディレクトリへの配置
- 重複処理防止機能
- 処理ログの自動生成

### 4. ジャンル別最適化
- **ビジネス書籍**: 概念管理、ケーススタディ統合、実践可能性評価
- **小説**: キャラクター管理、プロット整合性チェック、文体の一貫性
- **技術書**: コード例管理、技術用語の一貫性、図表参照チェック

### 5. 品質保証システム
- ジャンル別の品質基準設定
- 自動品質評価とスコアリング
- 改善提案の自動生成
- 継続的な品質向上サイクル

## システム構成

```
AI-Script-Creation-System/
├── config/                        # 設定ファイル
│   ├── variables.yaml            # 汎用変数定義
│   ├── business_book_template.yaml
│   ├── business_book_structures.yaml
│   └── default_business_book_config.yaml
├── prompts/                      # プロンプトテンプレート
│   └── business_book_prompts.yaml
├── src/                          # コアモジュール
│   ├── version_manager.py        # バージョン管理
│   ├── outline_updater.py        # アウトライン自動更新
│   ├── business_book_manager.py  # ビジネス書籍管理
│   ├── business_book_validator.py # 品質検証
│   ├── case_study_manager.py     # ケーススタディ管理
│   └── user_input_processor.py   # UserInput自動処理
├── novel_system/                 # 小説執筆システム
├── sample_business_book/         # サンプルプロジェクト
├── UserInput/                    # 素材投入フォルダー
└── docs/                         # ドキュメント
```

## デフォルト設定（ビジネス書籍）

### 章構成
- **10章構成**（11セクション）
  - 第0章：序章挨拶文
  - 第1-8章：本編（8章）
  - 第9章：最後に
  - 第10章：参考情報まとめ

### 文字数設定
- **1章あたり**: 20,000字
- **章構成**: 4節
- **1節あたり**: 5,000字
- **総文字数**: 200,000字（10章×20,000字）

## 使い方

### 1. プロジェクトの初期化

```bash
# 新規プロジェクトディレクトリを作成
mkdir my_business_book
cd my_business_book

# 設定ファイルをコピー
cp ../sample_business_book/project_config.yaml ./

# 必要なディレクトリを作成
mkdir -p concepts case_studies references chapters versions quality_reports UserInput
```

### 2. UserInput機能の使用

1. `UserInput/`フォルダーに素材ファイルを配置
2. 自動処理を実行：
   ```bash
   python ../src/user_input_processor.py .
   ```
3. ファイルが自動的に適切なディレクトリに分類される

### 3. 執筆とバージョン管理

```python
from src.business_book_manager import BusinessBookManager

# マネージャーの初期化
manager = BusinessBookManager(".")

# 章の執筆後、進捗を更新
manager.update_chapter_progress(1, 20000, status="completed")
# → outline.mdが自動更新され、バージョンが保存される
```

### 4. 品質チェック

```python
from src.business_book_validator import BusinessBookValidator

# 品質検証
validator = BusinessBookValidator()
report = validator.validate_chapter(chapter_text, 1)
print(report.to_markdown())
```

## カスタマイズ

### 変数の設定
`config/variables.yaml`で以下をカスタマイズ可能：
- プロジェクトタイプ
- 文字数設定
- 文体設定
- 品質基準

### 新しいジャンルの追加
1. ジャンル用の設定テンプレートを作成
2. 専用のManagerクラスを実装
3. 品質基準を定義
4. プロンプトテンプレートを作成

## トラブルシューティング

### よくある問題

1. **UserInputファイルが処理されない**
   - ファイル形式が対応しているか確認
   - `.processed_log.json`を削除して再実行

2. **outline.mdが更新されない**
   - 手動で進捗サマリーを更新：
     ```python
     manager.outline_updater.add_progress_summary()
     ```

3. **バージョンを復元したい**
   - バージョン履歴を確認後、復元：
     ```python
     manager.version_manager.restore_version("version_id")
     ```

## サポート

- Issues: [GitHubリポジトリ]/issues
- ドキュメント: このディレクトリ内のファイルを参照
- サンプル: `sample_business_book/`ディレクトリを参照