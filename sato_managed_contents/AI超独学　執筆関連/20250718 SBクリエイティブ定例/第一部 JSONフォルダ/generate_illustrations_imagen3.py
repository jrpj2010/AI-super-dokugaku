#!/usr/bin/env python3
"""
イラスト自動生成スクリプト（Google Imagen3版）
MCPツール経由でGoogle Imagen3を使用して画像を生成
"""

import csv
import os
import json
import time
import subprocess
import re
from datetime import datetime
from typing import List, Dict, Optional
import logging

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('illustration_generation_imagen3.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

class Imagen3Generator:
    def __init__(self, csv_path: str, output_dir: str):
        self.csv_path = csv_path
        self.output_dir = output_dir
        self.progress_file = os.path.join(output_dir, 'progress_imagen3.json')
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
        """プロンプトを簡略化してGoogle Imagen3で処理しやすくする"""
        # 長い共通部分を削除
        prompt = prompt.replace("Japanese graphic recording style, infographic, hand-drawn, monochrome, black and white, 4:3 aspect ratio.", "")
        prompt = prompt.strip()
        
        # さらに簡潔にする
        if len(prompt) > 300:
            # 重要な部分を抽出
            prompt = prompt[:300] + "..."
        
        # シンプルなプロンプトに変換
        return f"Simple black and white illustration: {prompt}"
    
    def create_python_script(self, prompt_id: str, prompt_text: str) -> str:
        """Google Imagen3を呼び出すPythonスクリプトを生成"""
        script_path = os.path.join(self.output_dir, f"temp_generate_{prompt_id}.py")
        
        # プロンプトを簡略化
        simplified_prompt = self.simplify_prompt(prompt_text)
        
        script_content = f'''
import subprocess
import sys

# MCPツールを使用して画像生成
try:
    from mcp__t2i_google_imagen3__imagen_t2i import imagen_t2i
    
    result = imagen_t2i(
        prompt="""{simplified_prompt}""",
        aspect_ratio="4:3",
        auto_download=True,
        auto_open=False,
        output_directory="{self.output_dir}",
        filename_prefix="{prompt_id}"
    )
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {{str(e)}}")
    sys.exit(1)
'''
        
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(script_content)
        
        return script_path
    
    def generate_image_with_subprocess(self, prompt_data: Dict[str, str], retry_count: int = 3) -> bool:
        """サブプロセスで画像を生成"""
        prompt_id = prompt_data['id']
        prompt_text = prompt_data['prompt']
        
        for attempt in range(retry_count):
            try:
                logging.info(f"画像生成開始 ({attempt + 1}/{retry_count}): {prompt_id}")
                
                # スクリプトを作成
                script_path = self.create_python_script(prompt_id, prompt_text)
                
                # Claudeコマンドで実行
                claude_command = f'claude "{script_path}を実行してください"'
                
                result = subprocess.run(
                    claude_command,
                    shell=True,
                    capture_output=True,
                    text=True,
                    timeout=180  # 3分のタイムアウト
                )
                
                # 一時スクリプトを削除
                if os.path.exists(script_path):
                    os.remove(script_path)
                
                if result.returncode == 0 and "SUCCESS" in result.stdout:
                    logging.info(f"画像生成成功: {prompt_id}")
                    return True
                else:
                    logging.error(f"画像生成失敗 ({attempt + 1}/{retry_count}): {prompt_id}")
                    if result.stderr:
                        logging.error(f"エラー: {result.stderr}")
                    
                    if attempt < retry_count - 1:
                        time.sleep(10)  # リトライ前に10秒待機
                        
            except subprocess.TimeoutExpired:
                logging.error(f"タイムアウト ({attempt + 1}/{retry_count}): {prompt_id}")
                if attempt < retry_count - 1:
                    time.sleep(15)  # タイムアウト後は15秒待機
                    
            except Exception as e:
                logging.error(f"予期しないエラー ({attempt + 1}/{retry_count}): {prompt_id} - {str(e)}")
                if attempt < retry_count - 1:
                    time.sleep(10)
                    
        return False
    
    def generate_image_direct(self, prompt_data: Dict[str, str]) -> bool:
        """直接画像を生成（テスト用のダミー実装）"""
        prompt_id = prompt_data['id']
        
        # ここで実際のMCPツールを呼び出す
        # 現在はダミーファイルを作成
        dummy_file = os.path.join(self.output_dir, f"{prompt_id}_dummy.txt")
        with open(dummy_file, 'w', encoding='utf-8') as f:
            f.write(f"ID: {prompt_id}\n")
            f.write(f"Prompt: {prompt_data['prompt']}\n")
            f.write(f"Generated: {datetime.now()}\n")
        
        return True
    
    def run(self, start_from: int = 0, limit: Optional[int] = None, use_dummy: bool = False):
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
            if use_dummy:
                success = self.generate_image_direct(prompt_data)
            else:
                success = self.generate_image_with_subprocess(prompt_data)
            
            if success:
                success_count += 1
                self.processed_ids.add(prompt_id)
                self.save_progress()  # 成功するたびに進捗を保存
            else:
                failed_ids.append(prompt_id)
                logging.error(f"最終的に失敗: {prompt_id}")
            
            # 次の生成まで少し待機（APIレート制限対策）
            if i < len(remaining_prompts) - 1:
                wait_time = 5 if use_dummy else 10  # 本番は10秒待機
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
            with open(os.path.join(self.output_dir, 'failed_ids_imagen3.json'), 'w', encoding='utf-8') as f:
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
    use_dummy = False
    
    if '--test' in sys.argv:
        limit = 3
        logging.info("テストモード: 最初の3個のみ処理")
    
    if '--dummy' in sys.argv:
        use_dummy = True
        logging.info("ダミーモード: ダミーファイルを生成")
    
    if '--start' in sys.argv:
        idx = sys.argv.index('--start')
        if idx + 1 < len(sys.argv):
            start_from = int(sys.argv[idx + 1])
    
    if '--limit' in sys.argv:
        idx = sys.argv.index('--limit')
        if idx + 1 < len(sys.argv):
            limit = int(sys.argv[idx + 1])
    
    generator = Imagen3Generator(csv_path, output_dir)
    
    print("="*50)
    print("イラスト自動生成スクリプト（Google Imagen3版）")
    print("="*50)
    print(f"CSVファイル: {csv_path}")
    print(f"出力ディレクトリ: {output_dir}")
    print(f"開始位置: {start_from}")
    print(f"処理数制限: {limit if limit else '無制限'}")
    print(f"モード: {'ダミー' if use_dummy else '本番'}")
    print("="*50)
    
    print("\n⚠️  注意事項:")
    print("- 各画像生成には約30秒〜1分かかります")
    print("- 98個すべて処理するには約2〜3時間かかる見込みです")
    print("- 途中で中断しても進捗は保存されます")
    print("- Ctrl+Cで安全に中断できます")
    print("="*50)
    
    if not use_dummy and limit is None:
        response = input("\n本番モードで実行しますか？ (y/n): ")
        if response.lower() != 'y':
            print("実行をキャンセルしました。")
            return
    
    try:
        generator.run(start_from=start_from, limit=limit, use_dummy=use_dummy)
    except KeyboardInterrupt:
        logging.info("\nユーザーによる中断")
        logging.info("進捗は保存されました。再実行時に続きから処理されます。")
    except Exception as e:
        logging.error(f"エラーが発生しました: {str(e)}", exc_info=True)
        

if __name__ == "__main__":
    main()