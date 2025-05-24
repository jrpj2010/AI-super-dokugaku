#!/usr/bin/env python3
"""
文字数カウントスクリプト
複数のMarkdownファイルの文字数を集計
"""

import os
import glob
import sys
from pathlib import Path


def count_characters_in_file(filepath):
    """ファイルの文字数をカウント"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Markdownの見出しやメタデータを除外して本文のみカウント
            lines = content.split('\n')
            body_lines = []
            for line in lines:
                # 見出し行を除外
                if not line.startswith('#') and not line.startswith('---'):
                    body_lines.append(line)
            body_content = '\n'.join(body_lines)
            return len(body_content)
    except Exception as e:
        print(f"エラー: {filepath} - {e}")
        return 0


def main():
    """メイン処理"""
    print("📊 文字数カウントツール")
    print("=" * 50)
    
    # プロジェクトルートディレクトリを設定
    project_root = Path(__file__).parent.parent
    os.chdir(project_root)
    
    # 章ファイルをカウント
    chapter_files = glob.glob("chapter_*.md")
    chapter_files.sort()
    
    total_chars = 0
    
    print("📖 章別文字数:")
    for filepath in chapter_files:
        char_count = count_characters_in_file(filepath)
        total_chars += char_count
        print(f"  {filepath}: {char_count:,}文字")
    
    # その他のファイルもカウント
    other_files = ["climax.md", "ending_01.md", "ending_02.md", "ending_03.md"]
    
    print("\n📝 その他ファイル:")
    for filepath in other_files:
        if os.path.exists(filepath):
            char_count = count_characters_in_file(filepath)
            total_chars += char_count
            print(f"  {filepath}: {char_count:,}文字")
    
    print("\n" + "=" * 50)
    print(f"📊 総文字数: {total_chars:,}文字")
    
    # 目標達成確認
    target = 150000
    achievement_rate = (total_chars / target) * 100
    print(f"🎯 目標達成率: {achievement_rate:.1f}% ({total_chars:,}/{target:,}文字)")
    
    if total_chars >= target:
        print("✅ 目標文字数達成！")
    else:
        shortage = target - total_chars
        print(f"📈 あと{shortage:,}文字で目標達成")


if __name__ == "__main__":
    main()