#!/usr/bin/env python3
"""
第4章生成スクリプト
"""

import os
import sys
from pathlib import Path

# novel_systemディレクトリを追加
sys.path.insert(0, str(Path(__file__).parent.parent / "novel_system"))

from novel_system.auto_generate import AutoGenerateWorkflow

def main():
    print("🚀 第4章「アルカディアへの旅路」生成スクリプトを開始")
    
    # プロジェクトルートを指定
    project_root = str(Path(__file__).parent.parent)
    
    try:
        # ワークフローを初期化
        workflow = AutoGenerateWorkflow(project_root)
        
        # 第4章を生成
        config = {
            'target_chars': 20000,
            'dialogue_ratio': 0.45,
            'sections_per_chapter': 4
        }
        
        result = workflow.generate_single_chapter(4, config, validate=True, save_output=True)
        
        if result['success']:
            print(f"✅ 第4章生成成功！")
            print(f"文字数: {result['stats']['total_characters']:,}文字")
            if result['quality_report']:
                print(f"品質スコア: {result['quality_report'].overall_score:.2f}")
            print(f"生成ファイル: {result['files_created']}")
        else:
            print(f"❌ 第4章生成失敗: {result.get('error', '不明なエラー')}")
            sys.exit(1)
            
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()