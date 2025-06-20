# 🚀 クイックスタート - 5分で始める会話フロービジュアライザー開発

## 📋 3ステップで開発環境を構築

### ステップ1: セットアップスクリプトを実行
```bash
# プロジェクトディレクトリに移動
cd ~/vibe-coding/app/import/24_conversation-flow-visualizer

# セットアップスクリプトを実行
./setup-haconiwa.sh
```

### ステップ2: 開発環境を起動
```bash
# Haconiwaで8人のAIエージェント環境を作成
haconiwa apply -f conversation-flow-haconiwa.yaml
```

### ステップ3: 緊急タスクを実行
tmuxセッションに入ったら、以下の操作で緊急タスクを開始：

1. **AI/ML部屋に移動**: `Ctrl+b, 1`
2. **Gemini専門家に移動**: `Ctrl+b, →`（右矢印）
3. **以下をコピペして実行**:

```
緊急タスク：Geminiモデル移行を実行してください。
1. index.tsxを読み込んで現在のモデル設定を確認
2. gemini-2.5-flash-preview-04-17 を gemini-2.5-flash に変更
3. モデル名を環境変数 GEMINI_MODEL に外部化
4. 動作確認のためのテストコードも作成
期限は7月15日なので、今すぐ実装をお願いします。
```

---

## 🎮 基本操作チートシート

### tmux操作（必須3つ）
| やりたいこと | 操作方法 |
|------------|---------|
| セッションから抜ける | `Ctrl+b, d` |
| 部屋を切り替える | `Ctrl+b, 0` or `1` |
| エージェント間を移動 | `Ctrl+b, 矢印キー` |

### よく使うコマンド
```bash
# 進捗を見る（別ターミナルで）
haconiwa monitor -c conversation-flow-company --japanese

# 作業を再開
haconiwa space attach -c conversation-flow-company

# 完全停止
haconiwa space stop -c conversation-flow-company
```

---

## 🤖 現在のAIエージェント配置

### Frontend Room（Window 0）
- **ペイン0**: fe-lead（フロントエンドリード）
- **ペイン1**: fe-ui-dev（UI開発）
- **ペイン2**: fe-state-dev（状態管理）
- **ペイン3**: fe-test-dev（テスト）

### AI/ML Room（Window 1）
- **ペイン0**: ai-lead（AI/MLリード）
- **ペイン1**: ai-gemini-dev（Gemini専門家）👈 **緊急タスク担当**
- **ペイン2**: ai-nlp-dev（NLP/TF-IDF）
- **ペイン3**: ai-deps-dev（依存関係分析）

---

## 📝 今すぐやるべきタスク

### 🚨 最優先: Geminiモデル移行（7月15日期限）
担当: ai-gemini-dev
```
gemini-2.5-flash-preview-04-17 → gemini-2.5-flash
```

### 🔥 高優先: TF-IDF実装
担当: ai-nlp-dev
```
TFIDFAnalyzerクラスを実装してください。
DEVELOPMENT_PLAN.mdのセクション3.1を参照。
```

### 📊 中優先: 依存関係UI
担当: fe-ui-dev
```
DependencyEdgeコンポーネントを作成してください。
点線のSVGエッジとツールチップを実装。
```

---

## ❓ 困ったときは

### Q: 画面が固まった
```bash
# Ctrl+b, d で一旦抜けて
haconiwa space attach -c conversation-flow-company
```

### Q: どのエージェントが何をしているか分からない
```bash
# 別ターミナルで監視
haconiwa monitor -c conversation-flow-company --japanese
```

### Q: 間違えて終了してしまった
```bash
# 再度起動（作業内容は保持される）
haconiwa apply -f conversation-flow-haconiwa.yaml
```

---

## 📚 詳細情報

- **完全ガイド**: [HACONIWA_GUIDE.md](HACONIWA_GUIDE.md)
- **開発計画**: [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md)
- **プロジェクト状況**: [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

**さあ、8人のAIエージェントと一緒に開発を始めましょう！** 🚀