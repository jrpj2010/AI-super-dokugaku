#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
画像ファイルをCSVのIDに基づいてリネームするスクリプト
"""

import os
import json
import csv
import shutil
from datetime import datetime
import logging

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('rename_images_log.txt', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

def load_csv_data(csv_path):
    """CSVファイルを読み込み、IDとプロンプトのマッピングを作成"""
    id_to_prompt = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            id_to_prompt[row['ID']] = row['Prompt_JP']
    return id_to_prompt

def load_metadata(metadata_path):
    """metadata.jsonを読み込み、プロンプトとファイル名のマッピングを作成"""
    with open(metadata_path, 'r', encoding='utf-8') as f:
        metadata = json.load(f)
    
    prompt_to_filename = {}
    for image in metadata['images']:
        prompt_to_filename[image['prompt']] = image['fileName']
    
    return prompt_to_filename

def create_mapping(id_to_prompt, prompt_to_filename):
    """CSVのIDと実際のファイル名のマッピングを作成"""
    id_to_filename = {}
    unmapped_ids = []
    
    for csv_id, prompt in id_to_prompt.items():
        if prompt in prompt_to_filename:
            id_to_filename[csv_id] = prompt_to_filename[prompt]
        else:
            unmapped_ids.append(csv_id)
            logging.warning(f"マッピングできませんでした: ID={csv_id}")
    
    return id_to_filename, unmapped_ids

def rename_files(image_dir, id_to_filename):
    """画像ファイルをリネーム"""
    renamed_count = 0
    failed_count = 0
    rename_log = []
    
    for new_name, old_filename in id_to_filename.items():
        old_path = os.path.join(image_dir, old_filename)
        new_path = os.path.join(image_dir, f"{new_name}.png")
        
        if os.path.exists(old_path):
            try:
                # 既に目的のファイル名が存在する場合は一時的な名前にする
                if os.path.exists(new_path) and old_path != new_path:
                    temp_path = os.path.join(image_dir, f"temp_{old_filename}")
                    shutil.move(old_path, temp_path)
                    old_path = temp_path
                
                shutil.move(old_path, new_path)
                renamed_count += 1
                rename_log.append({
                    'old_name': old_filename,
                    'new_name': f"{new_name}.png",
                    'status': 'success'
                })
                logging.info(f"リネーム成功: {old_filename} → {new_name}.png")
            except Exception as e:
                failed_count += 1
                rename_log.append({
                    'old_name': old_filename,
                    'new_name': f"{new_name}.png",
                    'status': 'failed',
                    'error': str(e)
                })
                logging.error(f"リネーム失敗: {old_filename} → {new_name}.png, エラー: {e}")
        else:
            failed_count += 1
            rename_log.append({
                'old_name': old_filename,
                'new_name': f"{new_name}.png",
                'status': 'not_found'
            })
            logging.warning(f"ファイルが見つかりません: {old_filename}")
    
    return renamed_count, failed_count, rename_log

def main():
    # パス設定
    base_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ"
    csv_path = os.path.join(base_dir, "illustration_prompts_v6.csv")
    metadata_path = os.path.join(base_dir, "generated_images_2025-07-20-3/metadata.json")
    image_dir = os.path.join(base_dir, "generated_images_2025-07-20-3/images")
    
    logging.info("=== 画像リネーム処理開始 ===")
    
    # Step 1: CSVデータ読み込み
    logging.info("CSVファイルを読み込み中...")
    id_to_prompt = load_csv_data(csv_path)
    logging.info(f"CSVから{len(id_to_prompt)}個のIDを読み込みました")
    
    # Step 2: メタデータ読み込み
    logging.info("metadata.jsonを読み込み中...")
    prompt_to_filename = load_metadata(metadata_path)
    logging.info(f"metadataから{len(prompt_to_filename)}個のファイル情報を読み込みました")
    
    # Step 3: マッピング作成
    logging.info("ファイル名マッピングを作成中...")
    id_to_filename, unmapped_ids = create_mapping(id_to_prompt, prompt_to_filename)
    logging.info(f"マッピング完了: {len(id_to_filename)}個のファイル")
    
    if unmapped_ids:
        logging.warning(f"マッピングできなかったID: {unmapped_ids}")
    
    # マッピング結果を保存
    mapping_result = {
        'timestamp': datetime.now().isoformat(),
        'total_csv_ids': len(id_to_prompt),
        'mapped_count': len(id_to_filename),
        'unmapped_count': len(unmapped_ids),
        'unmapped_ids': unmapped_ids,
        'mapping': {k: v for k, v in id_to_filename.items()}
    }
    
    with open(os.path.join(base_dir, 'rename_mapping.json'), 'w', encoding='utf-8') as f:
        json.dump(mapping_result, f, ensure_ascii=False, indent=2)
    
    # Step 4: リネーム実行
    logging.info("ファイルのリネームを開始...")
    renamed_count, failed_count, rename_log = rename_files(image_dir, id_to_filename)
    
    # Step 5: 結果レポート作成
    report = {
        'timestamp': datetime.now().isoformat(),
        'summary': {
            'total_files': len(id_to_filename),
            'renamed_successfully': renamed_count,
            'failed': failed_count,
            'unmapped_ids': len(unmapped_ids)
        },
        'details': rename_log
    }
    
    with open(os.path.join(base_dir, 'rename_report.json'), 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    logging.info("=== リネーム処理完了 ===")
    logging.info(f"成功: {renamed_count}個, 失敗: {failed_count}個")
    logging.info("詳細はrename_report.jsonをご確認ください")

if __name__ == "__main__":
    main()