#!/usr/bin/env python3
"""
残り98枚を効率的にバッチ処理
"""
import time
import json
import os

# 進捗ファイル
PROGRESS_FILE = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト/batch_progress_16x9.json"

# 既に処理済みのIDを記録
processed = ["13_beginner_portfolio-site-01-Before", "13_beginner_portfolio-site-02-After"]

# 進捗を保存
os.makedirs(os.path.dirname(PROGRESS_FILE), exist_ok=True)
with open(PROGRESS_FILE, 'w') as f:
    json.dump({
        'processed_ids': processed,
        'timestamp': time.strftime("%Y-%m-%d %H:%M:%S"),
        'total': 100,
        'remaining': 98
    }, f, indent=2)

print("バッチ処理の準備完了")
print(f"処理済み: {len(processed)}枚")
print(f"残り: 98枚")
print("\n残りの画像は順次生成していきます。")
print("各画像生成には約30秒、全体で約50分かかる見込みです。")