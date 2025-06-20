#\!/bin/bash

# シンプルな5人体制のtmuxセットアップ

SESSION="simple-team"

# セッションを作成
tmux new-session -d -s $SESSION -n "開発チーム"

# ウィンドウレイアウト：
# +------------------------+
# |        社長           |
# +------------------------+
# |    開発マネージャー     |
# +---------+---------+----+
# | フロント | AI機能 | テスト |
# | エンド  | 開発者 | 担当  |
# +---------+---------+----+

# 最初のペーン（社長）
tmux send-keys -t $SESSION:0.0 "echo '🏢 社長: プロジェクト全体管理'" Enter
tmux send-keys -t $SESSION:0.0 "echo '現在のタスク: Geminiモデル移行の承認と進捗確認'" Enter

# 横分割して開発マネージャー
tmux split-window -t $SESSION:0 -v -p 70
tmux send-keys -t $SESSION:0.1 "echo '👔 開発マネージャー: タスク管理'" Enter
tmux send-keys -t $SESSION:0.1 "echo '現在のタスク: 3人の開発者のタスク調整'" Enter

# 開発マネージャーのペーンを3分割
tmux split-window -t $SESSION:0.1 -h -p 66
tmux send-keys -t $SESSION:0.2 "echo '💻 AI機能開発者: TF-IDF実装'" Enter

tmux split-window -t $SESSION:0.2 -h -p 50
tmux send-keys -t $SESSION:0.3 "echo '🧪 テスト担当者: 品質保証'" Enter

# フロントエンド開発者のペーンに戻って設定
tmux select-pane -t $SESSION:0.1
tmux send-keys "echo '🎨 フロントエンド開発者: UI実装'" Enter

# 各ペーンでディレクトリ移動
for i in {0..3}; do
    tmux send-keys -t $SESSION:0.$i "cd ~/vibe-coding/app/import/24_conversation-flow-visualizer" Enter
    tmux send-keys -t $SESSION:0.$i "clear" Enter
done

# 各役割の表示
tmux send-keys -t $SESSION:0.0 "echo -e '\\n【社長】\\n役割: 全体の意思決定\\nタスク: プロジェクト承認と進捗確認\\n'" Enter
tmux send-keys -t $SESSION:0.1 "echo -e '\\n【開発マネージャー】\\n役割: タスク分配と進捗管理\\nタスク: 開発者への指示と調整\\n'" Enter
tmux send-keys -t $SESSION:0.2 "echo -e '\\n【フロントエンド開発者】\\n役割: UI/UX実装\\nタスク: 依存関係表示機能の実装\\n'" Enter
tmux send-keys -t $SESSION:0.3 "echo -e '\\n【AI機能開発者】\\n役割: AI/ML機能実装\\nタスク: TF-IDF分析の最適化\\n'" Enter
tmux send-keys -t $SESSION:0.4 "echo -e '\\n【テスト担当者】\\n役割: 品質保証\\nタスク: パフォーマンステスト実行\\n'" Enter

echo "✅ シンプルな5人体制のセットアップ完了！"
echo ""
echo "📌 使い方:"
echo "  tmux attach -t $SESSION    # セッションに接続"
echo ""
echo "🎮 操作方法:"
echo "  Control+b → 矢印キー      # ペーン間を移動"
echo "  Control+b → d            # セッションから抜ける"
echo ""
echo "👥 メンバー配置:"
echo "  ペーン0: 社長（全体管理）"
echo "  ペーン1: 開発マネージャー（タスク管理）"
echo "  ペーン2: フロントエンド開発者"
echo "  ペーン3: AI機能開発者"
echo "  ペーン4: テスト担当者"
