#!/bin/bash

# 会話フロービジュアライザー × Haconiwa セットアップスクリプト
# 非エンジニア向けの簡単セットアップツール

echo "🎯 会話フロービジュアライザー × Haconiwa セットアップ"
echo "=================================================="
echo ""

# 色の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# OS判定
OS="Unknown"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
fi

echo "検出されたOS: $OS"
echo ""

# 1. tmuxのインストール確認
echo "1️⃣  tmuxの確認..."
if command -v tmux &> /dev/null; then
    echo -e "${GREEN}✓ tmuxはインストール済みです${NC}"
else
    echo -e "${YELLOW}tmuxがインストールされていません${NC}"
    if [[ "$OS" == "macOS" ]]; then
        echo "Homebrewでインストールします..."
        if command -v brew &> /dev/null; then
            brew install tmux
        else
            echo -e "${RED}Homebrewがインストールされていません${NC}"
            echo "以下のコマンドでHomebrewをインストールしてください:"
            echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
            exit 1
        fi
    elif [[ "$OS" == "Linux" ]]; then
        echo "apt-getでインストールします..."
        sudo apt-get update && sudo apt-get install -y tmux
    fi
fi

# 2. Python3の確認
echo ""
echo "2️⃣  Python3の確認..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo -e "${GREEN}✓ Python $PYTHON_VERSION がインストール済みです${NC}"
else
    echo -e "${RED}Python3がインストールされていません${NC}"
    if [[ "$OS" == "macOS" ]]; then
        echo "brew install python3 でインストールしてください"
    fi
    exit 1
fi

# 3. Claude Codeの確認
echo ""
echo "3️⃣  Claude Codeの確認..."
if command -v claude &> /dev/null; then
    echo -e "${GREEN}✓ Claude Codeはインストール済みです${NC}"
else
    echo -e "${YELLOW}Claude Codeがインストールされていません${NC}"
    echo "インストール方法: https://docs.anthropic.com/en/docs/claude-code/getting-started"
fi

# 4. APIキーの確認
echo ""
echo "4️⃣  Anthropic APIキーの確認..."
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo -e "${YELLOW}APIキーが設定されていません${NC}"
    echo "APIキーを入力してください（表示されません）:"
    read -s API_KEY
    echo ""
    
    # .zshrcまたは.bash_profileに追加
    if [[ "$SHELL" == *"zsh"* ]]; then
        echo "export ANTHROPIC_API_KEY=\"$API_KEY\"" >> ~/.zshrc
        source ~/.zshrc
    else
        echo "export ANTHROPIC_API_KEY=\"$API_KEY\"" >> ~/.bash_profile
        source ~/.bash_profile
    fi
    echo -e "${GREEN}✓ APIキーを設定しました${NC}"
else
    echo -e "${GREEN}✓ APIキーは設定済みです${NC}"
fi

# 5. Haconiwaのインストール
echo ""
echo "5️⃣  Haconiwaのインストール..."
pip3 install --upgrade pip > /dev/null 2>&1
pip3 install haconiwa --upgrade > /dev/null 2>&1

if command -v haconiwa &> /dev/null; then
    HACONIWA_VERSION=$(haconiwa --version 2>/dev/null || echo "version unknown")
    echo -e "${GREEN}✓ Haconiwaがインストールされました${NC}"
else
    echo -e "${YELLOW}Haconiwaのインストールに問題があるかもしれません${NC}"
    echo "以下を試してください:"
    echo "python3 -m pip install haconiwa --upgrade"
fi

# 6. プロジェクトディレクトリの確認
echo ""
echo "6️⃣  プロジェクトディレクトリの確認..."
CURRENT_DIR=$(pwd)
if [[ "$CURRENT_DIR" == *"24_conversation-flow-visualizer"* ]]; then
    echo -e "${GREEN}✓ 正しいディレクトリにいます${NC}"
else
    echo -e "${YELLOW}プロジェクトディレクトリに移動してください:${NC}"
    echo "cd ~/vibe-coding/app/import/24_conversation-flow-visualizer"
fi

# 7. YAMLファイルの確認
echo ""
echo "7️⃣  設定ファイルの確認..."
if [ -f "conversation-flow-haconiwa.yaml" ]; then
    echo -e "${GREEN}✓ conversation-flow-haconiwa.yaml が見つかりました${NC}"
else
    echo -e "${RED}conversation-flow-haconiwa.yaml が見つかりません${NC}"
    exit 1
fi

# セットアップ完了
echo ""
echo "=========================================="
echo -e "${GREEN}🎉 セットアップが完了しました！${NC}"
echo "=========================================="
echo ""
echo "次のステップ:"
echo ""
echo "1. Haconiwaで開発環境を起動:"
echo "   ${GREEN}haconiwa apply -f conversation-flow-haconiwa.yaml${NC}"
echo ""
echo "2. 別のターミナルでモニタリング:"
echo "   ${GREEN}haconiwa monitor -c conversation-flow-company --japanese${NC}"
echo ""
echo "3. セッションから離脱するには:"
echo "   ${YELLOW}Ctrl+b, d${NC}"
echo ""
echo "4. 再接続するには:"
echo "   ${GREEN}haconiwa space attach -c conversation-flow-company${NC}"
echo ""
echo "詳しい使い方は HACONIWA_GUIDE.md を参照してください。"
echo ""