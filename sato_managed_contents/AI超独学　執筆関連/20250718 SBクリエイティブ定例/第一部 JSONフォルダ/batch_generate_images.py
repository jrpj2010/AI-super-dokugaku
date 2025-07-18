#!/usr/bin/env python3
"""
バッチ画像生成スクリプト
Google Imagen3 MCPツールを使用して順次画像を生成
"""

import csv
import os
import json
import time
from datetime import datetime
import sys

# プロジェクトのパスを追加
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

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
    if len(prompt) > 400:
        prompt = prompt[:400] + "..."
    
    return f"Simple monochrome illustration: {prompt}"

def generate_single_image(prompt_data, output_dir):
    """1つの画像を生成"""
    try:
        # MCPツールをインポート
        from mcp__t2i_google_imagen3__imagen_t2i import imagen_t2i
        
        prompt_id = prompt_data['id']
        prompt_text = simplify_prompt(prompt_data['prompt'])
        
        print(f"\n生成中: {prompt_id}")
        print(f"プロンプト（簡略版）: {prompt_text[:100]}...")
        
        # 画像生成
        result = imagen_t2i(
            prompt=prompt_text,
            aspect_ratio="4:3",
            auto_download=True,
            auto_open=False,
            output_directory=output_dir,
            filename_prefix=prompt_id
        )
        
        print(f"✅ 成功: {prompt_id}")
        return True
        
    except Exception as e:
        print(f"❌ エラー: {prompt_id} - {str(e)}")
        return False

def main():
    # パス設定
    csv_path = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/illustration_prompts_v4.csv"
    output_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト"
    progress_file = os.path.join(output_dir, "batch_progress.json")
    
    # 進捗読み込み
    processed_ids = set()
    if os.path.exists(progress_file):
        with open(progress_file, 'r') as f:
            data = json.load(f)
            processed_ids = set(data.get('processed_ids', []))
    
    # プロンプト読み込み
    all_prompts = load_prompts(csv_path)
    remaining_prompts = [p for p in all_prompts if p['id'] not in processed_ids]
    
    print("="*50)
    print("バッチ画像生成スクリプト")
    print("="*50)
    print(f"総数: {len(all_prompts)}")
    print(f"処理済み: {len(processed_ids)}")
    print(f"残り: {len(remaining_prompts)}")
    print("="*50)
    
    if not remaining_prompts:
        print("すべて処理済みです！")
        return
    
    # コマンドライン引数で処理数を制限
    limit = None
    if len(sys.argv) > 1:
        try:
            limit = int(sys.argv[1])
            print(f"処理数制限: {limit}個")
            remaining_prompts = remaining_prompts[:limit]
        except:
            pass
    
    print(f"\n{len(remaining_prompts)}個の画像を生成します。")
    print("予想時間:", len(remaining_prompts) * 0.5, "〜", len(remaining_prompts) * 1, "分")
    
    # 確認
    if limit is None:
        response = input("\n続行しますか？ (y/n): ")
        if response.lower() != 'y':
            print("キャンセルしました。")
            return
    
    # 処理開始
    start_time = time.time()
    success_count = 0
    failed_ids = []
    
    for i, prompt_data in enumerate(remaining_prompts):
        print(f"\n[{i+1}/{len(remaining_prompts)}]", end="")
        
        if generate_single_image(prompt_data, output_dir):
            success_count += 1
            processed_ids.add(prompt_data['id'])
            
            # 進捗保存
            with open(progress_file, 'w') as f:
                json.dump({
                    'processed_ids': list(processed_ids),
                    'last_updated': datetime.now().isoformat()
                }, f, indent=2)
        else:
            failed_ids.append(prompt_data['id'])
        
        # 次の生成まで待機（レート制限対策）
        if i < len(remaining_prompts) - 1:
            print("10秒待機中...")
            time.sleep(10)
    
    # 結果表示
    elapsed_time = time.time() - start_time
    print("\n" + "="*50)
    print("処理完了！")
    print(f"処理時間: {elapsed_time:.1f}秒 ({elapsed_time/60:.1f}分)")
    print(f"成功: {success_count}/{len(remaining_prompts)}")
    print(f"失敗: {len(failed_ids)}")
    
    if failed_ids:
        print(f"\n失敗したID:")
        for fid in failed_ids:
            print(f"  - {fid}")
        
        # 失敗リストを保存
        with open(os.path.join(output_dir, "failed_batch.json"), 'w') as f:
            json.dump({
                'failed_ids': failed_ids,
                'timestamp': datetime.now().isoformat()
            }, f, indent=2)

if __name__ == "__main__":
    main()