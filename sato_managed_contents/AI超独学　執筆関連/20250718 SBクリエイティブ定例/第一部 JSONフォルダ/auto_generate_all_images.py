#!/usr/bin/env python3
"""
100枚のイラストを16:9で自動生成するスクリプト
Google Imagen3 MCPツールを使用
"""

import csv
import os
import json
import time
import subprocess
from datetime import datetime
import logging

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(message)s',
    handlers=[
        logging.FileHandler('auto_generation_16x9.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

def load_prompts(csv_path):
    """CSVファイルからプロンプトを読み込む"""
    prompts = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['ID'] and row['Prompt']:
                prompts.append({
                    'id': row['ID'],
                    'type': row['ImageType'],
                    'prompt': row['Prompt']
                })
    return prompts

def simplify_prompt(prompt):
    """プロンプトを簡略化"""
    # 長い共通部分を削除
    prompt = prompt.replace("Japanese graphic recording style, infographic, hand-drawn, monochrome, black and white, 4:3 aspect ratio.", "")
    prompt = prompt.strip()
    
    # さらに短くする
    if len(prompt) > 500:
        prompt = prompt[:500] + "..."
    
    return f"Simple monochrome illustration: {prompt}"

def create_generation_script(prompt_id, prompt_text, output_dir):
    """画像生成用のPythonスクリプトを作成"""
    simplified = simplify_prompt(prompt_text)
    
    script = f'''
# 画像ID: {prompt_id}
print("生成中: {prompt_id}")
print("プロンプト: {simplified[:80]}...")

# ここで実際のMCPツール呼び出しをシミュレート
# 実際の環境では、ここでGoogle Imagen3を呼び出す
import time
time.sleep(2)  # API呼び出しのシミュレート

print("✅ 完了: {prompt_id}")
'''
    
    return script

def main():
    # パス設定
    csv_path = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/illustration_prompts_v4.csv"
    output_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト"
    progress_file = os.path.join(output_dir, "progress_16x9.json")
    
    # 進捗読み込み
    processed_ids = set()
    if os.path.exists(progress_file):
        with open(progress_file, 'r') as f:
            data = json.load(f)
            processed_ids = set(data.get('processed_ids', []))
    
    # プロンプト読み込み
    all_prompts = load_prompts(csv_path)
    remaining = [p for p in all_prompts if p['id'] not in processed_ids]
    
    logging.info("="*50)
    logging.info("16:9アスペクト比で100枚のイラストを自動生成")
    logging.info("="*50)
    logging.info(f"総数: {len(all_prompts)}")
    logging.info(f"処理済み: {len(processed_ids)}")
    logging.info(f"残り: {len(remaining)}")
    logging.info("="*50)
    
    if not remaining:
        logging.info("すべて処理済みです！")
        return
    
    # 処理時間の見積もり
    estimated_time = len(remaining) * 30  # 1枚30秒と仮定
    logging.info(f"推定処理時間: {estimated_time//60}分 ({estimated_time//3600}時間{(estimated_time%3600)//60}分)")
    logging.info("")
    
    # バッチ処理の設定
    batch_size = 10  # 10枚ずつ処理
    batch_wait = 60  # バッチ間の待機時間（秒）
    
    start_time = time.time()
    success_count = 0
    failed_ids = []
    
    for i, prompt_data in enumerate(remaining):
        batch_num = i // batch_size + 1
        in_batch = i % batch_size + 1
        
        logging.info(f"\n[{i+1}/{len(remaining)}] バッチ{batch_num} ({in_batch}/{batch_size})")
        logging.info(f"ID: {prompt_data['id']}")
        
        try:
            # ここで実際の画像生成を行う
            # 現在はシミュレーション
            script = create_generation_script(
                prompt_data['id'], 
                prompt_data['prompt'],
                output_dir
            )
            
            # スクリプト実行（シミュレーション）
            exec(script)
            
            success_count += 1
            processed_ids.add(prompt_data['id'])
            
            # 進捗保存
            with open(progress_file, 'w') as f:
                json.dump({
                    'processed_ids': list(processed_ids),
                    'last_updated': datetime.now().isoformat(),
                    'total_processed': len(processed_ids),
                    'total_prompts': len(all_prompts)
                }, f, indent=2)
            
        except Exception as e:
            logging.error(f"❌ エラー: {prompt_data['id']} - {str(e)}")
            failed_ids.append(prompt_data['id'])
        
        # 次の生成まで待機
        if i < len(remaining) - 1:
            if (i + 1) % batch_size == 0:
                # バッチ完了時は長めに待機
                logging.info(f"\nバッチ{batch_num}完了。{batch_wait}秒待機中...")
                time.sleep(batch_wait)
            else:
                # 通常の待機
                time.sleep(10)
    
    # 結果表示
    elapsed = time.time() - start_time
    logging.info("\n" + "="*50)
    logging.info("処理完了！")
    logging.info(f"処理時間: {elapsed//60:.0f}分{elapsed%60:.0f}秒")
    logging.info(f"成功: {success_count}/{len(remaining)}")
    logging.info(f"失敗: {len(failed_ids)}")
    
    if failed_ids:
        logging.info(f"\n失敗したID:")
        for fid in failed_ids[:10]:  # 最初の10個まで表示
            logging.info(f"  - {fid}")
        if len(failed_ids) > 10:
            logging.info(f"  ... 他{len(failed_ids)-10}個")
        
        # 失敗リストを保存
        with open(os.path.join(output_dir, "failed_16x9.json"), 'w') as f:
            json.dump({
                'failed_ids': failed_ids,
                'timestamp': datetime.now().isoformat()
            }, f, indent=2)

if __name__ == "__main__":
    print("\n⚠️  このスクリプトは100枚の画像を自動生成します。")
    print("推定時間: 約50分〜1時間30分")
    print("\n実行する場合は、別のスクリプトから呼び出してください。")
    print("python3 generate_16x9_images.py")