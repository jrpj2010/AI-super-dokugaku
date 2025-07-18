#!/usr/bin/env python3
"""
イラスト自動生成スクリプト
Google Imagen3を使用してCSVファイルのプロンプトから画像を順次生成
"""

import csv
import os
import json
import time
import subprocess
import urllib.request
from datetime import datetime
from typing import List, Dict, Optional
import logging

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('illustration_generation.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

class IllustrationGenerator:
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
    
    def generate_image_with_claude(self, prompt_data: Dict[str, str], retry_count: int = 3) -> bool:
        """Claude Code経由で画像を生成（MCPツールを使用）"""
        prompt_id = prompt_data['id']
        prompt_text = prompt_data['prompt']
        
        for attempt in range(retry_count):
            try:
                logging.info(f"画像生成開始 ({attempt + 1}/{retry_count}): {prompt_id}")
                
                # claudeコマンドを使用してMCPツールを呼び出す
                # 注意: この部分は実際のMCPツールの呼び出し方法に応じて調整が必要
                claude_command = f'''claude "
MCPツールのmcp__t2i-google-imagen3__imagen_t2iを使用して以下のプロンプトで画像を生成してください。
プロンプト: {prompt_text}
アスペクト比: 4:3
出力ディレクトリ: {self.output_dir}
ファイル名プレフィックス: {prompt_id}
自動ダウンロード: true
自動オープン: false
"'''
                
                # コマンド実行
                result = subprocess.run(
                    claude_command,
                    shell=True,
                    capture_output=True,
                    text=True,
                    timeout=120  # 2分のタイムアウト
                )
                
                if result.returncode == 0:
                    logging.info(f"画像生成成功: {prompt_id}")
                    return True
                else:
                    logging.error(f"画像生成失敗 ({attempt + 1}/{retry_count}): {prompt_id}")
                    logging.error(f"エラー: {result.stderr}")
                    
                    if attempt < retry_count - 1:
                        time.sleep(5)  # リトライ前に5秒待機
                        
            except subprocess.TimeoutExpired:
                logging.error(f"タイムアウト ({attempt + 1}/{retry_count}): {prompt_id}")
                if attempt < retry_count - 1:
                    time.sleep(10)  # タイムアウト後は10秒待機
                    
            except Exception as e:
                logging.error(f"予期しないエラー ({attempt + 1}/{retry_count}): {prompt_id} - {str(e)}")
                if attempt < retry_count - 1:
                    time.sleep(5)
                    
        return False
    
    def run(self):
        """メイン処理"""
        prompts = self.load_prompts()
        total_prompts = len(prompts)
        
        # 既に処理済みのプロンプトを除外
        remaining_prompts = [p for p in prompts if p['id'] not in self.processed_ids]
        
        logging.info(f"総プロンプト数: {total_prompts}")
        logging.info(f"処理済み: {len(self.processed_ids)}")
        logging.info(f"残り: {len(remaining_prompts)}")
        
        if not remaining_prompts:
            logging.info("すべてのプロンプトが処理済みです。")
            return
        
        start_time = time.time()
        success_count = 0
        failed_ids = []
        
        for i, prompt_data in enumerate(remaining_prompts):
            prompt_id = prompt_data['id']
            
            logging.info(f"\n進捗: {i + 1}/{len(remaining_prompts)} ({len(self.processed_ids) + i + 1}/{total_prompts})")
            
            # 画像生成
            if self.generate_image_with_claude(prompt_data):
                success_count += 1
                self.processed_ids.add(prompt_id)
                self.save_progress()  # 成功するたびに進捗を保存
            else:
                failed_ids.append(prompt_id)
                logging.error(f"最終的に失敗: {prompt_id}")
            
            # 次の生成まで少し待機（APIレート制限対策）
            if i < len(remaining_prompts) - 1:
                time.sleep(3)
        
        # 最終レポート
        elapsed_time = time.time() - start_time
        logging.info("\n" + "="*50)
        logging.info("処理完了")
        logging.info(f"処理時間: {elapsed_time:.1f}秒")
        logging.info(f"成功: {success_count}/{len(remaining_prompts)}")
        logging.info(f"失敗: {len(failed_ids)}")
        
        if failed_ids:
            logging.info(f"失敗したID: {', '.join(failed_ids)}")
            
            # 失敗したIDを別ファイルに保存
            with open(os.path.join(self.output_dir, 'failed_ids.json'), 'w', encoding='utf-8') as f:
                json.dump({
                    'failed_ids': failed_ids,
                    'timestamp': datetime.now().isoformat()
                }, f, ensure_ascii=False, indent=2)


def main():
    """メイン関数"""
    csv_path = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/illustration_prompts_v4.csv"
    output_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ/イラスト"
    
    generator = IllustrationGenerator(csv_path, output_dir)
    
    print("="*50)
    print("イラスト自動生成スクリプト")
    print("="*50)
    print(f"CSVファイル: {csv_path}")
    print(f"出力ディレクトリ: {output_dir}")
    print("="*50)
    
    try:
        generator.run()
    except KeyboardInterrupt:
        logging.info("\nユーザーによる中断")
        logging.info("進捗は保存されました。再実行時に続きから処理されます。")
    except Exception as e:
        logging.error(f"エラーが発生しました: {str(e)}", exc_info=True)
        

if __name__ == "__main__":
    main()