#!/usr/bin/env python3
"""
進捗表示スクリプト
現在の執筆進捗を視覚的に表示
"""

import argparse
import sys
from pathlib import Path
from datetime import datetime

# プロジェクトルートをPythonパスに追加
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.session_manager import WritingProgressTracker, RestartHelper


def format_progress_bar(percent: float, width: int = 50) -> str:
    """プログレスバーをフォーマット"""
    filled = int(width * percent / 100)
    bar = "█" * filled + "░" * (width - filled)
    return f"[{bar}] {percent:.1f}%"


def show_chapter_details(progress_tracker: WritingProgressTracker, chapter_num: int):
    """特定の章の詳細を表示"""
    chapter_progress = progress_tracker.get_chapter_progress(chapter_num)
    
    if not chapter_progress:
        print(f"第{chapter_num}章: データなし")
        return
        
    print(f"\n## 第{chapter_num}章の詳細")
    print(f"状態: {chapter_progress.get('status', '未着手')}")
    print(f"総文字数: {chapter_progress.get('total_chars', 0):,}文字")
    print(f"最終更新: {chapter_progress.get('last_updated', '不明')}")
    
    if 'sections' in chapter_progress:
        print("\n### セクション別進捗")
        for section_name, section_data in sorted(chapter_progress['sections'].items()):
            status_icon = "✅" if section_data['status'] == 'completed' else "📝" if section_data['status'] == 'in_progress' else "⏳"
            print(f"  {status_icon} {section_name}: {section_data['chars']:,}文字")


def show_overall_progress(project_root: str):
    """全体進捗を表示"""
    progress_tracker = WritingProgressTracker(project_root)
    restart_helper = RestartHelper(project_root)
    
    # 全体サマリー
    overall = progress_tracker.get_overall_progress()
    
    print("=" * 70)
    print("📚 AI超独学法 - 執筆進捗レポート")
    print("=" * 70)
    
    # 全体進捗
    print(f"\n## 全体進捗")
    print(f"章の進捗: {format_progress_bar(overall['chapters_progress_percent'])}")
    print(f"完成: {overall['completed_chapters']}/{overall['total_chapters']}章 | ")
    print(f"執筆中: {overall['in_progress_chapters']}章 | ")
    print(f"未着手: {overall['not_started_chapters']}章")
    
    print(f"\n文字数進捗: {format_progress_bar(overall['overall_progress_percent'])}")
    print(f"執筆済み: {overall['total_chars']:,}文字 / 目標: {overall['target_chars']:,}文字")
    
    # 章別サマリー
    print("\n## 章別進捗")
    print("-" * 60)
    
    for chapter_num in range(11):  # 0章から10章
        progress = progress_tracker.get_chapter_progress(chapter_num)
        
        if progress:
            status = progress.get('status', 'not_started')
            chars = progress.get('total_chars', 0)
            
            if status == 'completed':
                icon = "✅"
                bar = format_progress_bar(100, 20)
            elif status == 'in_progress':
                icon = "📝"
                percent = (chars / 20000) * 100  # 1章20,000文字想定
                bar = format_progress_bar(percent, 20)
            else:
                icon = "⏳"
                bar = format_progress_bar(0, 20)
                
            print(f"{icon} 第{chapter_num:2d}章: {bar} {chars:6,}文字")
        else:
            print(f"⏳ 第{chapter_num:2d}章: {format_progress_bar(0, 20)}      0文字")
            
    # セッション情報
    print("\n" + "=" * 70)
    print(restart_helper.generate_restart_summary())


def main():
    """メイン関数"""
    parser = argparse.ArgumentParser(description='執筆進捗を表示')
    parser.add_argument('--project', type=str,
                       default='/Users/jrpj2010/vibe-coding/app/import/13_AI-Script-Creation-System/projects/ai_super_learning',
                       help='プロジェクトルートパス')
    parser.add_argument('--chapter', type=int, help='特定の章の詳細を表示')
    
    args = parser.parse_args()
    
    if args.chapter is not None:
        progress_tracker = WritingProgressTracker(args.project)
        show_chapter_details(progress_tracker, args.chapter)
    else:
        show_overall_progress(args.project)


if __name__ == "__main__":
    main()