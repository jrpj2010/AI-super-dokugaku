#!/usr/bin/env python3
"""
文字数カウントスクリプト
"""

import re
from pathlib import Path

def count_characters(file_path):
    """ファイルの文字数、セリフ比率などを計算"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 総文字数
    total_chars = len(content)
    
    # セリフ部分の抽出
    dialogue_matches = re.findall(r'「([^」]*)」', content)
    dialogue_chars = sum(len(match) for match in dialogue_matches)
    dialogue_ratio = dialogue_chars / total_chars if total_chars > 0 else 0
    
    # 構造分析
    sections = content.count('##')
    paragraphs = len([p for p in content.split('\n\n') if p.strip()])
    
    # キャラクター登場回数
    characters = ['リン', 'ソラ', 'パズー', 'ローズ', 'グレイソン', 'アルテミス']
    char_mentions = {}
    for char in characters:
        count = content.count(char)
        if count > 0:
            char_mentions[char] = count
    
    return {
        'total_chars': total_chars,
        'dialogue_chars': dialogue_chars,
        'dialogue_ratio': dialogue_ratio,
        'dialogue_count': len(dialogue_matches),
        'sections': sections,
        'paragraphs': paragraphs,
        'char_mentions': char_mentions
    }

def main():
    chapter_file = Path("chapter_01.md")
    if not chapter_file.exists():
        print("❌ chapter_01.mdが見つかりません")
        return
    
    stats = count_characters(chapter_file)
    
    print("📊 第1章「空からの来訪者」統計")
    print("=" * 40)
    print(f"📏 総文字数: {stats['total_chars']:,}文字")
    print(f"💬 セリフ文字数: {stats['dialogue_chars']:,}文字")
    print(f"📊 セリフ比率: {stats['dialogue_ratio']:.1%}")
    print(f"🗣️ セリフ数: {stats['dialogue_count']}個")
    print(f"📐 節数: {stats['sections']}")
    print(f"📝 段落数: {stats['paragraphs']}")
    
    print("\n👥 キャラクター登場回数:")
    for char, count in stats['char_mentions'].items():
        print(f"  {char}: {count}回")
    
    print("\n✅ 要件達成確認:")
    print(f"📏 20,000文字以上: {'✅ 達成' if stats['total_chars'] >= 20000 else '❌ 未達成'}")
    print(f"💬 セリフ比率30-60%: {'✅ 達成' if 0.30 <= stats['dialogue_ratio'] <= 0.60 else '❌ 未達成'}")
    print(f"📐 4節構成: {'✅ 達成' if stats['sections'] >= 4 else '❌ 未達成'}")

if __name__ == "__main__":
    main()