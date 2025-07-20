#!/bin/bash
# AI超独学Tips50ビューワー用ローカルサーバー起動スクリプト

echo "AI超独学Tips50ビューワーを起動しています..."
echo ""
echo "以下のいずれかのURLをブラウザで開いてください："
echo "  http://localhost:8080"
echo "  http://127.0.0.1:8080"
echo ""
echo "終了するには Ctrl+C を押してください"
echo ""

# Python3のHTTPサーバーを起動
python3 -m http.server 8080