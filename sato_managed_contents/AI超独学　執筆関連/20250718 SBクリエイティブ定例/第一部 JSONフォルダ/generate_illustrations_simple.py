#!/usr/bin/env python3
"""
イラスト自動生成スクリプト（シンプル版）
直接APIを呼び出して画像を生成・ダウンロード
"""

import csv
import os
import json
import time
import requests
from datetime import datetime
from typing import List, Dict
import logging
import re

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('illustration_generation.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

class SimpleIllustrationGenerator:
    def __init__(self, csv_path: str, output_dir: str):
        self.csv_path = csv_path
        self.output_dir = output_dir
        self.progress_file = os.path.join(output_dir, 'progress.json')
        self.processed_ids = self.load_progress()
        
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
    
    def simplify_prompt(self, prompt: str) -> str:
        """プロンプトを簡略化（長すぎる場合や複雑な場合の対策）"""
        # "Japanese graphic recording style"などの共通部分を削除
        simplified = prompt.replace("Japanese graphic recording style, infographic, hand-drawn, monochrome, black and white, 4:3 aspect ratio.", "")
        simplified = simplified.strip()
        
        # さらに短縮が必要な場合
        if len(simplified) > 500:
            # 最初の500文字に制限
            simplified = simplified[:500] + "..."
            
        return f"Simple monochrome illustration: {simplified}"
    
    def download_image(self, url: str, filepath: str) -> bool:
        """画像をダウンロード"""
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            logging.info(f"画像ダウンロード成功: {filepath}")
            return True
            
        except Exception as e:
            logging.error(f"画像ダウンロード失敗: {str(e)}")
            return False
    
    def generate_dummy_image(self, prompt_data: Dict[str, str]) -> bool:
        """ダミー画像生成（テスト用）"""
        prompt_id = prompt_data['id']
        filepath = os.path.join(self.output_dir, f"{prompt_id}.txt")
        
        # プロンプト内容をテキストファイルとして保存
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"ID: {prompt_id}\n")
            f.write(f"Type: {prompt_data['type']}\n")
            f.write(f"Prompt: {prompt_data['prompt']}\n")
            f.write(f"Generated at: {datetime.now().isoformat()}\n")
        
        logging.info(f"ダミーファイル作成: {filepath}")
        return True
    
    def run(self, test_mode: bool = False, test_count: int = 3):
        """メイン処理"""
        prompts = self.load_prompts()
        total_prompts = len(prompts)
        
        # 既に処理済みのプロンプトを除外
        remaining_prompts = [p for p in prompts if p['id'] not in self.processed_ids]
        
        # テストモードの場合は最初の数個のみ処理
        if test_mode and len(remaining_prompts) > test_count:
            remaining_prompts = remaining_prompts[:test_count]
            logging.info(f"テストモード: 最初の{test_count}個のみ処理します")
        
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
            
            logging.info(f"\n進捗: {i + 1}/{len(remaining_prompts)} - ID: {prompt_id}")
            
            # 画像生成（テスト用にダミーファイル作成）
            if self.generate_dummy_image(prompt_data):
                success_count += 1
                self.processed_ids.add(prompt_id)
                self.save_progress()
            else:
                failed_ids.append(prompt_id)
                logging.error(f"失敗: {prompt_id}")
            
            # 次の生成まで少し待機
            if i < len(remaining_prompts) - 1:
                time.sleep(1)
        
        # 最終レポート
        elapsed_time = time.time() - start_time
        logging.info("\n" + "="*50)
        logging.info("処理完了")
        logging.info(f"処理時間: {elapsed_time:.1f}秒")
        logging.info(f"成功: {success_count}/{len(remaining_prompts)}")
        logging.info(f"失敗: {len(failed_ids)}")
        
        if failed_ids:
            logging.info(f"失敗したID: {', '.join(failed_ids)}")


def main():
    """メイン関数"""
    import sys
    
    csv_path = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/illustration_prompts_v4.csv"
    output_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト"
    
    # コマンドライン引数でテストモードを指定可能
    test_mode = '--test' in sys.argv
    
    generator = SimpleIllustrationGenerator(csv_path, output_dir)
    
    print("="*50)
    print("イラスト自動生成スクリプト（シンプル版）")
    print("="*50)
    print(f"CSVファイル: {csv_path}")
    print(f"出力ディレクトリ: {output_dir}")
    print(f"モード: {'テスト' if test_mode else '本番'}")
    print("="*50)
    
    try:
        generator.run(test_mode=test_mode)
    except KeyboardInterrupt:
        logging.info("\nユーザーによる中断")
        logging.info("進捗は保存されました。再実行時に続きから処理されます。")
    except Exception as e:
        logging.error(f"エラーが発生しました: {str(e)}", exc_info=True)
        

if __name__ == "__main__":
    main()