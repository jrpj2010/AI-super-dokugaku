#!/bin/bash

echo "=== ローカル環境での動作確認 ==="

# Python仮想環境を作成（まだない場合）
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# 仮想環境を有効化
echo "Activating virtual environment..."
source venv/bin/activate

# 依存関係をインストール
echo "Installing dependencies..."
pip install -r requirements.txt

# .envファイルの確認
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update .env with your ANTHROPIC_API_KEY"
    exit 1
fi

# テストを実行
echo "Running unit tests..."
pytest test_app.py -v

# アプリケーションを起動（バックグラウンド）
echo "Starting Flask app..."
python app.py &
APP_PID=$!

# アプリケーションが起動するまで待機
sleep 3

# ヘルスチェック
echo "Running health check..."
curl -f http://localhost:8080/health

# 各エンドポイントのテスト
echo -e "\nTesting endpoints..."
echo "1. Index page:"
curl -s http://localhost:8080/ | head -n 5

echo -e "\n2. WYSIWYG page:"
curl -s http://localhost:8080/wysiwyg | head -n 5

echo -e "\n3. Manual page:"
curl -s http://localhost:8080/manual | head -n 5

# アプリケーションを停止
echo -e "\nStopping Flask app..."
kill $APP_PID

echo "=== ローカルテスト完了 ==="