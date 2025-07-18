#!/usr/bin/env python3
"""
イラスト自動生成スクリプト（Fal.ai Imagen4 Ultra版）
MCP経由でFal.ai Imagen4 Ultraを使用して画像を生成
"""

import csv
import os
import json
import time
import requests
from datetime import datetime
from typing import List, Dict, Optional
import logging
import subprocess
import re

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('illustration_generation_fal.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

class FalImagenGenerator:
    def __init__(self, csv_path: str, output_dir: str):
        self.csv_path = csv_path
        self.output_dir = output_dir
        self.progress_file = os.path.join(output_dir, 'progress_fal.json')
        self.processed_ids = self.load_progress()
        
        # MCP エンドポイント
        self.mcp_url = "https://mcp-veo3-fast-only-20250709-220921-05b3effb-zl3xx5lsaq-uc.a.run.app/t2i/fal/imagen4/ultra"
        
        # 出力ディレクトリが存在しない場合は作成
        os.makedirs(output_dir, exist_ok=True)
        
    def load_progress(self) -> set:
        """処理済みのIDを読み込む"""
        if os.path.exists(self.progress_file):
            try:
                with open(self.progress_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return set(data.get('processed_ids', []))
            except:
                return set()
        return set()
    
    def save_progress(self):
        """処理済みのIDを保存"""
        with open(self.progress_file, 'w', encoding='utf-8') as f:
            json.dump({
                'processed_ids': list(self.processed_ids),
                'last_updated': datetime.now().isoformat()
            }, f, ensure_ascii=False, indent=2)
    
    def load_prompts(self) -> List[Dict[str, str]]:
        """CSVファイルからプロンプトを読み込む"""
        prompts = []
        with open(self.csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['ID'] and row['Prompt']:  # 有効な行のみ
                    prompts.append({
                        'id': row['ID'],
                        'type': row['ImageType'],
                        'prompt': row['Prompt']
                    })
        return prompts
    
    def generate_image_with_fal(self, prompt_data: Dict[str, str], retry_count: int = 3) -> bool:
        """Fal.ai Imagen4 Ultraで画像を生成"""
        prompt_id = prompt_data['id']
        prompt_text = prompt_data['prompt']
        
        for attempt in range(retry_count):
            try:
                logging.info(f"画像生成開始 ({attempt + 1}/{retry_count}): {prompt_id}")
                
                # リクエストペイロード
                payload = {
                    "prompt": prompt_text,
                    "aspect_ratio": "4:3",
                    "output_directory": self.output_dir,
                    "filename_prefix": prompt_id,
                    "auto_download": True,
                    "auto_open": False
                }
                
                # HTTPリクエストを送信
                response = requests.post(
                    self.mcp_url,
                    json=payload,
                    headers={'Content-Type': 'application/json'},
                    timeout=120
                )
                
                if response.status_code == 200:
                    result = response.json()
                    logging.info(f"画像生成成功: {prompt_id}")
                    
                    # レスポンスから画像URLを取得してダウンロード
                    if 'url' in result or 'image_url' in result:
                        image_url = result.get('url') or result.get('image_url')
                        if self.download_image(image_url, prompt_id):
                            return True
                    else:
                        logging.warning(f"画像URLが見つかりません: {result}")
                        return True  # URLがなくても成功とみなす場合
                else:
                    logging.error(f"APIエラー ({attempt + 1}/{retry_count}): {response.status_code}")
                    logging.error(f"レスポンス: {response.text}")
                    
                    if attempt < retry_count - 1:
                        time.sleep(10)  # リトライ前に10秒待機
                        
            except requests.Timeout:
                logging.error(f"タイムアウト ({attempt + 1}/{retry_count}): {prompt_id}")
                if attempt < retry_count - 1:
                    time.sleep(15)  # タイムアウト後は15秒待機
                    
            except Exception as e:
                logging.error(f"予期しないエラー ({attempt + 1}/{retry_count}): {prompt_id} - {str(e)}")
                if attempt < retry_count - 1:
                    time.sleep(10)
                    
        return False
    
    def download_image(self, url: str, prompt_id: str) -> bool:
        """画像をダウンロード"""
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            filepath = os.path.join(self.output_dir, f"{prompt_id}.png")
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            logging.info(f"画像ダウンロード成功: {filepath}")
            return True
            
        except Exception as e:
            logging.error(f"画像ダウンロード失敗: {str(e)}")
            return False
    
    def run(self, start_from: int = 0, limit: Optional[int] = None):
        """メイン処理"""
        prompts = self.load_prompts()
        total_prompts = len(prompts)
        
        # 既に処理済みのプロンプトを除外
        remaining_prompts = [p for p in prompts if p['id'] not in self.processed_ids]
        
        # 開始位置の調整
        if start_from > 0:
            remaining_prompts = remaining_prompts[start_from:]
        
        # 処理数の制限
        if limit:
            remaining_prompts = remaining_prompts[:limit]
        
        logging.info(f"総プロンプト数: {total_prompts}")
        logging.info(f"処理済み: {len(self.processed_ids)}")
        logging.info(f"処理予定: {len(remaining_prompts)}")
        
        if not remaining_prompts:
            logging.info("すべてのプロンプトが処理済みです。")
            return
        
        start_time = time.time()
        success_count = 0
        failed_ids = []
        
        for i, prompt_data in enumerate(remaining_prompts):
            prompt_id = prompt_data['id']
            
            logging.info(f"\n進捗: {i + 1}/{len(remaining_prompts)} ({len(self.processed_ids) + i + 1}/{total_prompts})")
            logging.info(f"ID: {prompt_id}")
            
            # 画像生成
            if self.generate_image_with_fal(prompt_data):
                success_count += 1
                self.processed_ids.add(prompt_id)
                self.save_progress()  # 成功するたびに進捗を保存
            else:
                failed_ids.append(prompt_id)
                logging.error(f"最終的に失敗: {prompt_id}")
            
            # 次の生成まで少し待機（APIレート制限対策）
            if i < len(remaining_prompts) - 1:
                wait_time = 5  # 5秒待機
                logging.info(f"次の生成まで{wait_time}秒待機...")
                time.sleep(wait_time)
        
        # 最終レポート
        elapsed_time = time.time() - start_time
        logging.info("\n" + "="*50)
        logging.info("処理完了")
        logging.info(f"処理時間: {elapsed_time:.1f}秒 ({elapsed_time/60:.1f}分)")
        logging.info(f"成功: {success_count}/{len(remaining_prompts)}")
        logging.info(f"失敗: {len(failed_ids)}")
        
        if failed_ids:
            logging.info(f"失敗したID: {', '.join(failed_ids)}")
            
            # 失敗したIDを別ファイルに保存
            with open(os.path.join(self.output_dir, 'failed_ids_fal.json'), 'w', encoding='utf-8') as f:
                json.dump({
                    'failed_ids': failed_ids,
                    'timestamp': datetime.now().isoformat()
                }, f, ensure_ascii=False, indent=2)


def main():
    """メイン関数"""
    import sys
    
    csv_path = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/illustration_prompts_v4.csv"
    output_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト"
    
    # コマンドライン引数
    start_from = 0
    limit = None
    
    if '--test' in sys.argv:
        limit = 3
        logging.info("テストモード: 最初の3個のみ処理")
    
    if '--start' in sys.argv:
        idx = sys.argv.index('--start')
        if idx + 1 < len(sys.argv):
            start_from = int(sys.argv[idx + 1])
    
    if '--limit' in sys.argv:
        idx = sys.argv.index('--limit')
        if idx + 1 < len(sys.argv):
            limit = int(sys.argv[idx + 1])
    
    generator = FalImagenGenerator(csv_path, output_dir)
    
    print("="*50)
    print("イラスト自動生成スクリプト（Fal.ai Imagen4 Ultra版）")
    print("="*50)
    print(f"CSVファイル: {csv_path}")
    print(f"出力ディレクトリ: {output_dir}")
    print(f"開始位置: {start_from}")
    print(f"処理数制限: {limit if limit else '無制限'}")
    print("="*50)
    
    try:
        generator.run(start_from=start_from, limit=limit)
    except KeyboardInterrupt:
        logging.info("\nユーザーによる中断")
        logging.info("進捗は保存されました。再実行時に続きから処理されます。")
    except Exception as e:
        logging.error(f"エラーが発生しました: {str(e)}", exc_info=True)
        

if __name__ == "__main__":
    main()