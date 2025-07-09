#!/usr/bin/env python3
"""
Gen-Spa Ultimate v5.1 - 小説プロット版 自動サーバー起動スクリプト
TANREN株式会社 CEO 佐藤勝彦様専用

このスクリプトは以下の機能を提供します：
1. ローカルHTTPサーバーの自動起動
2. CORS問題の完全解決
3. ブラウザの自動起動
4. ポート競合の自動解決
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import socket
import time
from pathlib import Path

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """CORS対応のHTTPリクエストハンドラー"""
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        """ログメッセージをカスタマイズ"""
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def find_available_port(start_port=8000, max_attempts=10):
    """利用可能なポートを見つける"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except socket.error:
            continue
    return None

def main():
    """メイン実行関数"""
    print("=" * 60)
    print("🚀 Gen-Spa Ultimate v5.1 - 小説プロット版")
    print("📚 直感型プロッターのための小説執筆術")
    print("🏢 TANREN株式会社 CEO 佐藤勝彦様専用")
    print("=" * 60)
    
    # 現在のディレクトリを確認
    current_dir = Path.cwd()
    index_file = current_dir / "index-fullscreen.html"
    
    if not index_file.exists():
        print("❌ エラー: index-fullscreen.html が見つかりません")
        print(f"📁 現在のディレクトリ: {current_dir}")
        print("💡 解決方法: 小説プロット版フォルダ内でスクリプトを実行してください")
        input("Enterキーを押して終了...")
        sys.exit(1)
    
    # 利用可能なポートを検索
    port = find_available_port()
    if port is None:
        print("❌ エラー: 利用可能なポートが見つかりません")
        print("💡 他のアプリケーションを終了してから再試行してください")
        input("Enterキーを押して終了...")
        sys.exit(1)
    
    # サーバー設定
    handler = CORSHTTPRequestHandler
    server_address = ('', port)
    
    try:
        with socketserver.TCPServer(server_address, handler) as httpd:
            server_url = f"http://localhost:{port}"
            
            print(f"✅ サーバー起動成功!")
            print(f"🌐 URL: {server_url}")
            print(f"📁 ディレクトリ: {current_dir}")
            print(f"🔄 ポート: {port}")
            print()
            print("🎯 Gen-Spa Ultimate v5.1 - 小説プロット版の特徴:")
            print("   • 固定1280x720px表示（投資ファンドレベル品質）")
            print("   • 表ストーリーと裏ストーリーの完全解説")
            print("   • アイデンティティ・プロット革命")
            print("   • W理論による感情曲線設計")
            print("   • 直感型プロッター向け実践メソッド")
            print()
            print("⌨️  操作方法:")
            print("   ← → : スライド移動")
            print("   Space : 次のスライド")
            print("   F11 : フルスクリーンモード")
            print("   ESC : フルスクリーン終了")
            print("   H : キーボードヘルプ表示")
            print()
            print("🔄 サーバーを停止するには Ctrl+C を押してください")
            print("=" * 60)
            
            # ブラウザを自動起動
            try:
                webbrowser.open(server_url)
                print(f"🌐 ブラウザを自動起動しました: {server_url}")
            except Exception as e:
                print(f"⚠️  ブラウザの自動起動に失敗: {e}")
                print(f"🔗 手動でアクセス: {server_url}")
            
            print()
            print("📊 アクセスログ:")
            print("-" * 40)
            
            # サーバー開始
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n" + "=" * 60)
        print("🛑 サーバーを停止しました")
        print("✨ Gen-Spa Ultimate v5.1 - 小説プロット版をご利用いただき")
        print("   ありがとうございました！")
        print()
        print("💎 佐藤勝彦様の小説執筆活動を心より応援しています")
        print("📚 素晴らしい物語の創造をお祈りしております")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ サーバーエラー: {e}")
        print("💡 ポートが使用中の可能性があります。他のアプリケーションを")
        print("   終了してから再試行してください。")
        input("Enterキーを押して終了...")
        sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n💥 予期せぬエラー: {e}")
        print("🔧 解決方法:")
        print("   1. Pythonが正しくインストールされているか確認")
        print("   2. ファイアウォール設定を確認")
        print("   3. 管理者権限で実行を試行")
        input("Enterキーを押して終了...")
        sys.exit(1)