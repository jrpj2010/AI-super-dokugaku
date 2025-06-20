# 🎯 会話フロービジュアライザー × Haconiwa 開発ガイド

**対象**: 非エンジニアの学生向け  
**作成日**: 2025年6月20日  
**プロジェクト**: 会話フロービジュアライザー

## 📋 目次

1. [はじめに](#はじめに)
2. [事前準備](#事前準備)
3. [Haconiwaのインストール](#haconiwaのインストール)
4. [開発環境の起動](#開発環境の起動)
5. [tmuxの基本操作](#tmuxの基本操作)
6. [AIエージェントへの指示方法](#aiエージェントへの指示方法)
7. [日々の開発フロー](#日々の開発フロー)
8. [トラブルシューティング](#トラブルシューティング)

---

## 🌟 はじめに

Haconiwa（箱庭）は、複数のAIエージェント（Claude Code）が同時に作業できる開発環境を作るツールです。tmuxという画面分割ツールを使って、8人のAIエージェントが並行して開発を進められます。

### メリット
- 🤖 複数のAIが同時に作業
- 📊 リアルタイムで進捗確認
- 🔄 タスクの並行処理
- 💡 非エンジニアでも使える

---

## 🛠️ 事前準備

### 1. Homebrewのインストール（macOSの場合）

ターミナルを開いて以下を実行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. tmuxのインストール

```bash
# macOS
brew install tmux

# Ubuntu/Debian
sudo apt-get install tmux
```

### 3. Pythonの確認

```bash
# バージョン確認（3.8以上が必要）
python3 --version

# もしpython3がない場合
brew install python3
```

### 4. Claude Codeの準備

1. [Anthropic](https://console.anthropic.com/)でAPIキーを取得
2. ターミナルで設定：

```bash
# .zshrcまたは.bash_profileに追加
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

---

## 📦 Haconiwaのインストール

```bash
# pipのアップグレード
pip3 install --upgrade pip

# Haconiwaのインストール
pip3 install haconiwa --upgrade

# インストール確認
haconiwa --version
```

---

## 🚀 開発環境の起動

### ステップ1: プロジェクトディレクトリに移動

```bash
cd ~/vibe-coding/app/import/24_conversation-flow-visualizer
```

### ステップ2: YAMLファイルの確認

```bash
# ファイルが作成されているか確認
ls -la conversation-flow-haconiwa.yaml

# 内容を確認
cat conversation-flow-haconiwa.yaml
```

### ステップ3: Haconiwaで環境構築

```bash
# 開発環境を起動（自動的にtmuxセッションに接続）
haconiwa apply -f conversation-flow-haconiwa.yaml
```

⚠️ **注意**: Haconiwaは現在アルファ版のため、一部機能が動作しない可能性があります。

---

## 🖥️ tmuxの基本操作

tmuxは画面を分割して複数の作業を同時に行えるツールです。

### 重要なキー操作

| 操作 | キー | 説明 |
|------|------|------|
| プレフィックス | `Ctrl+b` | すべての操作の前に押す |
| セッション離脱 | `Ctrl+b, d` | 作業を残したまま抜ける |
| ウィンドウ切替 | `Ctrl+b, 0` or `1` | Frontend/AI-ML部屋の切替 |
| ペイン移動 | `Ctrl+b, 矢印キー` | エージェント間の移動 |
| ペインズーム | `Ctrl+b, z` | 1つのペインを全画面表示 |
| ペイン番号表示 | `Ctrl+b, q` | ペイン番号を確認 |

### 画面構成

```
[Frontend Room - Window 0]
┌─────────────┬─────────────┐
│ fe-lead     │ fe-ui-dev   │
│ (ペイン0)    │ (ペイン1)    │
├─────────────┼─────────────┤
│ fe-state-dev│ fe-test-dev │
│ (ペイン2)    │ (ペイン3)    │
└─────────────┴─────────────┘

[AI/ML Room - Window 1]
┌─────────────┬─────────────┐
│ ai-lead     │ ai-gemini   │
│ (ペイン0)    │ (ペイン1)    │
├─────────────┼─────────────┤
│ ai-nlp-dev  │ ai-deps-dev │
│ (ペイン2)    │ (ペイン3)    │
└─────────────┴─────────────┘
```

---

## 🗣️ AIエージェントへの指示方法

各ペインにはClaude Codeが起動しています。日本語で自然に指示できます。

### 例1: Geminiモデル移行（緊急タスク）

1. AI/ML Roomに移動：`Ctrl+b, 1`
2. ai-gemini-devペインに移動：`Ctrl+b, →`
3. 以下を入力：

```
index.tsxファイルを読み込んで、Geminiモデルの設定を確認してください。
現在使用中のgemini-2.5-flash-preview-04-17を、gemini-2.5-flashに移行する必要があります。
モデル名を環境変数化して、簡単に切り替えられるようにしてください。
```

### 例2: TF-IDF実装

ai-nlp-devペインで：

```
DEVELOPMENT_PLAN.mdのセクション3.1を参考に、TFIDFAnalyzerクラスを実装してください。
日本語のテキストを適切に処理できるトークナイザーも含めてください。
lib/tfidf.tsファイルに作成してください。
```

### 例3: UI実装

fe-ui-devペインで：

```
DependencyEdgeというReactコンポーネントを作成してください。
SVGで点線のエッジを描画し、ホバー時にキーワードを表示するツールチップを実装してください。
DEVELOPMENT_PLAN.mdのセクション3.3.1を参考にしてください。
```

---

## 📅 日々の開発フロー

### 朝の作業開始

```bash
# 1. プロジェクトディレクトリへ移動
cd ~/vibe-coding/app/import/24_conversation-flow-visualizer

# 2. 既存のセッションに再接続
haconiwa space attach -c conversation-flow-company

# 3. 別ターミナルでモニタリング開始
haconiwa monitor -c conversation-flow-company --japanese
```

### 作業中

1. **タスクの確認**: PROJECT_STATUS.mdで優先順位を確認
2. **エージェントへの指示**: 各ペインで作業を指示
3. **進捗モニタリング**: 別ターミナルでCPU使用率を確認
4. **ペイン間の連携**: 関連するタスクは隣接するエージェントで実施

### 作業終了

```bash
# セッションから離脱（作業は継続される）
# Ctrl+b, d

# 完全に停止する場合
haconiwa space stop -c conversation-flow-company
```

---

## 🔧 トラブルシューティング

### Q1: "command not found: haconiwa"

```bash
# パスを確認
echo $PATH

# pip3で再インストール
pip3 uninstall haconiwa
pip3 install haconiwa --upgrade

# それでもダメな場合
python3 -m pip install haconiwa --upgrade
```

### Q2: tmuxセッションが応答しない

```bash
# セッション一覧を確認
tmux list-sessions

# 強制的にセッションを終了
tmux kill-session -t conversation-flow-company

# Haconiwaで再作成
haconiwa apply -f conversation-flow-haconiwa.yaml
```

### Q3: Claude Codeが動作しない

```bash
# APIキーの確認
echo $ANTHROPIC_API_KEY

# 設定されていない場合
export ANTHROPIC_API_KEY="your-api-key"

# Claude Codeのインストール確認
which claude
```

### Q4: ペインが小さすぎて見づらい

```bash
# ペインをズーム（全画面表示）
# Ctrl+b, z

# 元に戻す
# もう一度 Ctrl+b, z
```

### Q5: 間違えてセッションを削除してしまった

```bash
# ディレクトリを保持したまま再作成
haconiwa apply -f conversation-flow-haconiwa.yaml
```

---

## 💡 便利なTips

### 1. よく使うコマンドのエイリアス設定

```bash
# ~/.zshrcに追加
alias haconiwa-start='cd ~/vibe-coding/app/import/24_conversation-flow-visualizer && haconiwa apply -f conversation-flow-haconiwa.yaml'
alias haconiwa-monitor='haconiwa monitor -c conversation-flow-company --japanese'
alias haconiwa-attach='haconiwa space attach -c conversation-flow-company'
```

### 2. tmuxのカスタマイズ

```bash
# ~/.tmux.confを作成
echo "set -g mouse on" >> ~/.tmux.conf  # マウスでペイン選択可能に
```

### 3. 作業ログの保存

```bash
# tmuxのログを保存
tmux pipe-pane -o "cat >> ~/tmux-log-$(date +%Y%m%d).txt"
```

---

## 📚 参考資料

- [Haconiwa公式リポジトリ](https://github.com/dai-motoki/haconiwa)
- [tmuxチートシート](https://tmuxcheatsheet.com/)
- [Claude Code公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code)
- プロジェクトドキュメント:
  - HANDOVER_DOCUMENT.md - 現在の状況
  - DEVELOPMENT_PLAN.md - 詳細な実装計画
  - PROJECT_STATUS.md - タスクの優先順位

---

## 🎯 次のアクション

1. **最優先**: Geminiモデル移行（7月15日期限）
2. **高優先**: TF-IDF基礎実装
3. **中優先**: 依存関係UI実装

頑張ってください！複数のAIエージェントがあなたの開発をサポートします。🚀