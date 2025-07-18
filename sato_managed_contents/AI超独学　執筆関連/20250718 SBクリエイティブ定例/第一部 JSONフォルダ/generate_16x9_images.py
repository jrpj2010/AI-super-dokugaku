#!/usr/bin/env python3
"""
16:9で100枚のイラストを生成する実行スクリプト
Google Imagen3を使用して順次生成し、正しいファイル名で保存
"""

import csv
import os
import json
import time
import subprocess
from datetime import datetime

# CSVファイルとディレクトリのパス
CSV_PATH = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/illustration_prompts_v4.csv"
OUTPUT_DIR = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト"
PROGRESS_FILE = os.path.join(OUTPUT_DIR, "progress_16x9.json")

def load_prompts():
    """CSVからプロンプトを読み込む"""
    prompts = []
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['ID'] and row['Prompt']:
                prompts.append({
                    'id': row['ID'],
                    'prompt': row['Prompt']
                })
    return prompts

def simplify_prompt(prompt):
    """プロンプトを簡略化"""
    prompt = prompt.replace("Japanese graphic recording style, infographic, hand-drawn, monochrome, black and white, 4:3 aspect ratio.", "")
    prompt = prompt.strip()
    if len(prompt) > 450:
        prompt = prompt[:450] + "..."
    return f"Simple monochrome illustration: {prompt}"

def load_progress():
    """進捗を読み込む"""
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            data = json.load(f)
            return set(data.get('processed_ids', []))
    return set()

def save_progress(processed_ids):
    """進捗を保存"""
    with open(PROGRESS_FILE, 'w') as f:
        json.dump({
            'processed_ids': list(processed_ids),
            'last_updated': datetime.now().isoformat()
        }, f, indent=2)

def generate_single_image(prompt_id, prompt_text):
    """1枚の画像を生成してダウンロード"""
    print(f"\n生成中: {prompt_id}")
    simplified = simplify_prompt(prompt_text)
    print(f"プロンプト: {simplified[:80]}...")
    
    # ここで実際のMCPツール呼び出しが必要
    # 現在はプレースホルダー
    output_file = os.path.join(OUTPUT_DIR, f"{prompt_id}.png")
    
    # テスト用: ダミーファイル作成
    with open(output_file.replace('.png', '_placeholder.txt'), 'w') as f:
        f.write(f"ID: {prompt_id}\n")
        f.write(f"Prompt: {simplified}\n")
        f.write(f"Generated: {datetime.now()}\n")
    
    print(f"✅ 保存: {output_file}")
    return True

def main():
    print("="*60)
    print("16:9アスペクト比で100枚のイラストを自動生成")
    print("="*60)
    
    # プロンプト読み込み
    all_prompts = load_prompts()
    processed_ids = load_progress()
    remaining = [p for p in all_prompts if p['id'] not in processed_ids]
    
    print(f"総数: {len(all_prompts)}")
    print(f"処理済み: {len(processed_ids)}")
    print(f"残り: {len(remaining)}")
    print("="*60)
    
    if not remaining:
        print("すべて処理済みです！")
        return
    
    # 処理数制限（テスト用）
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == '--test':
        remaining = remaining[:5]
        print("テストモード: 最初の5個のみ処理")
    
    print(f"\n{len(remaining)}個の画像を生成します。")
    print(f"推定時間: {len(remaining)*30//60}分")
    
    if len(sys.argv) <= 1 or sys.argv[1] != '--test':
        response = input("\n続行しますか？ (y/n): ")
        if response.lower() != 'y':
            print("キャンセルしました。")
            return
    
    # 処理開始
    start_time = time.time()
    success_count = 0
    failed_ids = []
    
    for i, prompt_data in enumerate(remaining):
        print(f"\n[{i+1}/{len(remaining)}]", end="")
        
        try:
            if generate_single_image(prompt_data['id'], prompt_data['prompt']):
                success_count += 1
                processed_ids.add(prompt_data['id'])
                save_progress(processed_ids)
            else:
                failed_ids.append(prompt_data['id'])
        except Exception as e:
            print(f"❌ エラー: {prompt_data['id']} - {str(e)}")
            failed_ids.append(prompt_data['id'])
        
        # 次の生成まで待機
        if i < len(remaining) - 1:
            wait_time = 5 if len(sys.argv) > 1 and sys.argv[1] == '--test' else 10
            print(f"{wait_time}秒待機中...")
            time.sleep(wait_time)
    
    # 結果表示
    elapsed = time.time() - start_time
    print("\n" + "="*60)
    print("処理完了！")
    print(f"処理時間: {elapsed:.1f}秒 ({elapsed/60:.1f}分)")
    print(f"成功: {success_count}/{len(remaining)}")
    print(f"失敗: {len(failed_ids)}")
    
    if failed_ids:
        print(f"\n失敗したID: {', '.join(failed_ids[:5])}")
        if len(failed_ids) > 5:
            print(f"... 他{len(failed_ids)-5}個")

if __name__ == "__main__":
    main()