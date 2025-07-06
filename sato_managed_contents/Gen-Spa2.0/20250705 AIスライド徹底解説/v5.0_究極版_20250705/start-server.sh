#!/bin/bash

# Gen-Spa Ultimate v5.0 ローカルサーバー起動スクリプト (macOS/Linux)

echo ""
echo "🚀 Gen-Spa Ultimate v5.0 ローカルサーバー起動"
echo "================================================"
echo ""

# Pythonの存在確認
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ エラー: Pythonがインストールされていません"
    echo ""
    echo "解決方法:"
    echo "macOS: brew install python3"
    echo "Ubuntu: sudo apt-get install python3"
    echo "CentOS: sudo yum install python3"
    echo ""
    read -p "Enterキーを押して終了..."
    exit 1
fi

# index.htmlの存在確認
if [ ! -f "index.html" ]; then
    echo "❌ エラー: index.htmlが見つかりません"
    echo "現在のディレクトリ: $(pwd)"
    echo "Gen-Spa Ultimate v5.0のフォルダ内で実行してください"
    echo ""
    read -p "Enterキーを押して終了..."
    exit 1
fi

echo "✅ Python確認完了"
echo "✅ index.html確認完了"
echo ""
echo "📊 プレゼンテーションサーバーを起動中..."
echo "⚠️  サーバーを停止するには Ctrl+C を押してください"
echo ""

# Python3を優先して使用
if command -v python3 &> /dev/null; then
    python3 start-server.py
else
    python start-server.py
fi