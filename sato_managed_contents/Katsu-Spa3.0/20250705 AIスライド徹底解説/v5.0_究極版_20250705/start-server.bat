@echo off
chcp 65001 >nul
echo.
echo 🚀 Gen-Spa Ultimate v5.0 ローカルサーバー起動
echo ================================================
echo.

:: Pythonの存在確認
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ エラー: Pythonがインストールされていません
    echo.
    echo 解決方法:
    echo 1. https://www.python.org/ からPythonをダウンロード
    echo 2. インストール時に "Add Python to PATH" をチェック
    echo 3. コンピューターを再起動
    echo.
    pause
    exit /b
)

:: index.htmlの存在確認
if not exist "index.html" (
    echo ❌ エラー: index.htmlが見つかりません
    echo 現在のフォルダ: %cd%
    echo Gen-Spa Ultimate v5.0のフォルダ内で実行してください
    echo.
    pause
    exit /b
)

echo ✅ Python確認完了
echo ✅ index.html確認完了
echo.
echo 📊 プレゼンテーションサーバーを起動中...
echo ⚠️  サーバーを停止するには Ctrl+C を押してください
echo.

:: Pythonサーバー起動
python start-server.py

pause