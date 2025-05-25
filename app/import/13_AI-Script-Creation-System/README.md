# AI-Script-Creation-System

あらゆる執筆作業に最適化された汎用AI執筆支援システム。小説、ビジネス書籍、技術書など、様々なジャンルの執筆を効率化します。

## 🌟 主要機能

### 1. **自動バージョン管理システム**
- `plot.md`（小説）や`outline.md`（ビジネス書）の変更を自動的にバージョン管理
- 各章の執筆完了時に自動でバージョンを保存
- 差分（diff）の自動生成と保存
- 任意のバージョンへの復元機能

### 2. **進捗の自動追跡と可視化**
- 執筆状況をリアルタイムで更新（✅完了、📝執筆中、⏳未着手）
- 文字数の自動集計
- 進捗率の視覚的表示
- 章別の詳細な進捗レポート

### 3. **ジャンル別最適化**
- **小説**: キャラクター管理、プロット整合性チェック、文体の一貫性
- **ビジネス書籍**: 概念管理、ケーススタディ統合、実践可能性評価
- **技術書**: コード例管理、技術用語の一貫性、図表参照チェック

### 4. **品質保証システム**
- ジャンル別の品質基準
- 自動品質評価とスコアリング
- 改善提案の自動生成
- 継続的な品質向上サイクル

## 📁 プロジェクト構造

```
AI-Script-Creation-System/
├── config/                        # 設定ファイル
│   ├── variables.yaml            # 汎用変数定義
│   ├── business_book_template.yaml
│   └── business_book_structures.yaml
├── prompts/                      # プロンプトテンプレート
│   └── business_book_prompts.yaml
├── src/                          # コアモジュール
│   ├── version_manager.py        # バージョン管理
│   ├── outline_updater.py        # アウトライン自動更新
│   ├── business_book_manager.py  # ビジネス書籍管理
│   ├── business_book_validator.py # 品質検証
│   └── case_study_manager.py     # ケーススタディ管理
├── novel_system/                 # 小説執筆システム（既存）
│   ├── plot_manager.py
│   ├── chapter_generator.py
│   └── validator.py
└── sample_business_book/         # サンプルプロジェクト
    ├── outline.md
    ├── project_config.yaml
    ├── concepts/
    └── case_studies/
```

## 🚀 クイックスタート

### 1. システムのセットアップ

```bash
# リポジトリのクローン
git clone [repository-url]
cd AI-Script-Creation-System

# 依存関係のインストール
pip install -r requirements.txt
```

### 2. 新規プロジェクトの作成

#### ビジネス書籍の場合

```python
from src.business_book_manager import BusinessBookManager

# プロジェクトディレクトリを作成
project_name = "my_business_book"
os.makedirs(project_name, exist_ok=True)

# 設定ファイルをコピー
shutil.copy("sample_business_book/project_config.yaml", f"{project_name}/")

# マネージャーを初期化
manager = BusinessBookManager(project_name)
```

#### 小説の場合

```python
from novel_system.plot_manager import PlotManager

# プロジェクトディレクトリを作成
project_name = "my_novel"
os.makedirs(project_name, exist_ok=True)

# plot.mdを作成
# ... (プロット内容を記述)

# マネージャーを初期化
manager = PlotManager(project_name)
```

## 💡 使用例

### ビジネス書籍の執筆

```python
# 1. プロジェクトの初期化
manager = BusinessBookManager("my_business_book")

# 2. 章のコンテキスト取得
context = manager.get_chapter_context(1)

# 3. 章の執筆（AIを使用）
# ここでAI APIを呼び出して章を生成

# 4. 品質チェック
validator = BusinessBookValidator()
report = validator.validate_chapter(chapter_text, 1, context)

# 5. 進捗の更新（自動でoutline.mdが更新される）
manager.update_chapter_progress(1, len(chapter_text), status="completed")
```

### バージョン管理

```python
# バージョン履歴の確認
history = manager.version_manager.get_version_history()

# 特定バージョンとの差分表示
diff = manager.version_manager.get_diff("20240120_100000", "20240120_150000")

# バージョンの復元
manager.version_manager.restore_version("20240120_100000")
```

## 🔧 カスタマイズ

### 変数の設定

`config/variables.yaml`を編集して、プロジェクト固有の設定を定義：

```yaml
project:
  type: "{{project_type}}"
  title: "{{project_title}}"
  author: "{{author_name}}"
  target_words: "{{target_words}}"
```

### 新しいジャンルの追加

1. ジャンル用の設定テンプレートを作成
2. 専用のManagerクラスを実装
3. 品質基準を定義
4. プロンプトテンプレートを作成

## 📊 品質基準

### ビジネス書籍
- **読みやすさ**: 文章の長さ、専門用語の説明
- **構造**: セクション構成、導入と結論
- **コンテンツ比率**: 事例30%、理論40%、実践30%
- **実践可能性**: 具体的なアクションアイテム
- **一貫性**: 用語の統一、論理的な流れ

### 小説
- **文字数**: 目標文字数との差異
- **文体**: 一貫した語り口
- **キャラクター**: 性格の一貫性、口調の統一
- **プロット**: ストーリーの整合性
- **セリフ比率**: 30-60%の範囲

## 🤝 コントリビューション

1. Issueで機能提案や不具合報告
2. Pull Requestで改善提案
3. ドキュメントの改善
4. 新しいジャンルのテンプレート追加

## 📝 ライセンス

[ライセンス情報を記載]

## 🔗 関連リンク

- [プロジェクトドキュメント](docs/)
- [サンプルプロジェクト](sample_business_book/)
- [API リファレンス](docs/api_reference.md)

---

## 更新履歴

### v2.0.0 (2024-01-20)
- ビジネス書籍執筆機能を追加
- 自動バージョン管理システムを実装
- 進捗の自動追跡機能を追加
- 品質検証システムの大幅改善

### v1.0.0
- 初回リリース（ライトノベル執筆特化）