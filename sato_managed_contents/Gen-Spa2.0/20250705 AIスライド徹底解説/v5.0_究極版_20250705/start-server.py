#!/usr/bin/env python3
"""
Gen-Spa Ultimate v5.0 ローカルサーバー起動スクリプト
Python 3.x対応（Python 2.x/3.x自動判定）

使用方法:
    python start-server.py
    または
    python3 start-server.py

ポート: 8000 (デフォルト)
URL: http://localhost:8000
"""

import sys
import os
import webbrowser
import socket
from pathlib import Path

def check_port_available(port):
    """指定されたポートが利用可能かチェック"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', port))
    sock.close()
    return result != 0

def find_available_port(start_port=8000):
    """利用可能なポートを見つける"""
    port = start_port
    while not check_port_available(port) and port < start_port + 100:
        port += 1
    return port

def main():
    # 現在のディレクトリを確認
    current_dir = Path.cwd()
    index_file = current_dir / "index.html"
    
    if not index_file.exists():
        print("❌ エラー: index.htmlが見つかりません")
        print(f"現在のディレクトリ: {current_dir}")
        print("Gen-Spa Ultimate v5.0のフォルダ内で実行してください")
        input("Enterキーを押して終了...")
        return
    
    # 利用可能なポートを確認
    port = find_available_port(8000)
    
    print("🚀 Gen-Spa Ultimate v5.0 ローカルサーバーを起動します...")
    print(f"📁 ディレクトリ: {current_dir}")
    print(f"🌐 ポート: {port}")
    print(f"🔗 URL: http://localhost:{port}")
    print("✨ ブラウザが自動で開きます...")
    print("\n⚠️  サーバーを停止するには Ctrl+C を押してください")
    print("-" * 50)
    
    # Python 2/3 互換性チェック
    try:
        # Python 3
        from http.server import HTTPServer, SimpleHTTPRequestHandler
        server_class = HTTPServer
        handler_class = SimpleHTTPRequestHandler
    except ImportError:
        # Python 2
        from BaseHTTPServer import HTTPServer
        from SimpleHTTPServer import SimpleHTTPRequestHandler
        server_class = HTTPServer
        handler_class = SimpleHTTPRequestHandler
    
    try:
        # サーバー起動
        server_address = ('', port)
        httpd = server_class(server_address, handler_class)
        
        # ブラウザを開く
        url = f"http://localhost:{port}"
        webbrowser.open(url)
        
        print(f"✅ サーバーが正常に起動しました: {url}")
        print("📊 プレゼンテーションをお楽しみください！")
        
        # サーバー実行
        httpd.serve_forever()
        
    except KeyboardInterrupt:
        print("\n\n🛑 サーバーを停止しています...")
        httpd.shutdown()
        print("✅ サーバーが正常に停止されました")
        
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        print("\n解決方法:")
        print("1. ポート8000が他のプロセスで使用されていないか確認")
        print("2. Pythonが正しくインストールされているか確認")
        print("3. ファイアウォールの設定を確認")
        input("Enterキーを押して終了...")

if __name__ == "__main__":
    main()