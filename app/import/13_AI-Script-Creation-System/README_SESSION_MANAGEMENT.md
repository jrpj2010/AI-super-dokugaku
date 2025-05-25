# セッション管理システム - 使い方ガイド

## 概要

このセッション管理システムは、Claudeの制限による中断があっても、スムーズに執筆を再開できるように設計されています。

## 主な機能

### 1. 自動セッション保存
- 執筆の進捗を自動的に記録
- 中断時点の状態を保存
- チェックポイントの作成

### 2. 再開支援
- 前回の作業内容を即座に確認
- 次のステップを明確に提示
- 必要なコンテキストを復元

### 3. 進捗追跡
- リアルタイムの進捗表示
- 章別・セクション別の詳細
- 視覚的なプログレスバー

## 使い方

### 執筆を再開する

```bash
# 現在の状況を確認
python src/show_progress.py

# 前回の続きから再開
python src/continue_writing.py

# 特定の章から再開
python src/continue_writing.py --chapter 2

# 特定のセクションから再開
python src/continue_writing.py --chapter 2 --section 3
```

### 進捗を確認する

```bash
# 全体の進捗を表示
python src/show_progress.py

# 特定の章の詳細を表示
python src/show_progress.py --chapter 2
```

### チェックポイントを作成する

```bash
# 現在の内容をチェックポイントとして保存
python src/continue_writing.py --checkpoint --chapter 2 --section 3 --content current_content.md
```

## Claudeとの連携方法

### 1. セッションの開始時

```python
# Claudeに以下を伝える
「前回の続きから第2章の執筆を再開したいです」

# システムが自動的に以下を実行：
1. セッション情報の読み込み
2. 進捗状況の確認
3. 次のセクションの特定
4. 執筆コンテキストの準備
```

### 2. 中断時の対応

```python
# Claudeの制限に達した場合：
1. 現在までの内容を保存
2. チェックポイントを作成
3. セッション状態を更新

# 次回の再開時に伝える内容：
「/Users/jrpj2010/vibe-coding/app/import/13_AI-Script-Creation-System
このパスの第2章の執筆を続けたいです」
```

### 3. 進捗の記録

システムが自動的に以下を記録：
- 執筆した文字数
- 完成したセクション
- 作業日時
- 次のステップ

## ファイル構造

```
project_root/
├── .session_state.json      # 最新のセッション状態
├── .checkpoints/            # チェックポイント保存
│   ├── checkpoint_*.json    # メタデータ
│   └── checkpoint_*_content.md  # 実際のコンテンツ
├── .writing_progress.json   # 詳細な進捗情報
└── .daily_logs/            # 日次の作業ログ
    └── log_YYYY-MM-DD.json
```

## トラブルシューティング

### Q: 前回の状態が読み込めない
A: `.session_state.json`ファイルが存在するか確認してください。

### Q: 進捗が正しく表示されない
A: `python src/show_progress.py --chapter [章番号]`で詳細を確認してください。

### Q: チェックポイントから復元したい
A: 最新のチェックポイントは`.checkpoints/`ディレクトリに保存されています。

## ベストプラクティス

1. **定期的なチェックポイント作成**
   - 各セクション完成時
   - 重要な内容を書いた後

2. **明確な再開メッセージ**
   - プロジェクトパスを明示
   - 具体的な章・セクション番号

3. **進捗の定期確認**
   - 日次で全体進捗を確認
   - 週次で品質レビュー

## 今後の拡張予定

- [ ] Web UIでの進捗表示
- [ ] 自動バックアップ機能
- [ ] 複数プロジェクトの管理
- [ ] チーム執筆のサポート