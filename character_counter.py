#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI超独学原稿 文字数カウンター
各章の文字数を正確に測定し、目標文字数（7,000-9,000文字）との差分を表示
"""

import os
import re

def count_characters(file_path):
    """ファイルの文字数をカウント（空白・改行含む）"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return len(content)
    except FileNotFoundError:
        return 0

def count_characters_no_spaces(file_path):
    """ファイルの文字数をカウント（空白・改行除く）"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # 空白、タブ、改行を除去
        content_no_spaces = re.sub(r'\s', '', content)
        return len(content_no_spaces)
    except FileNotFoundError:
        return 0

def analyze_chapter(file_path, chapter_name, target_min=7000, target_max=9000):
    """章の文字数を分析"""
    total_chars = count_characters(file_path)
    no_space_chars = count_characters_no_spaces(file_path)
    
    print(f"\n=== {chapter_name} ===")
    print(f"ファイルパス: {file_path}")
    print(f"総文字数（空白込み）: {total_chars:,}文字")
    print(f"実質文字数（空白除く）: {no_space_chars:,}文字")
    
    # 目標文字数との差分
    if no_space_chars > target_max:
        over = no_space_chars - target_max
        print(f"❌ 目標超過: {over:,}文字オーバー（{target_max:,}文字以下にする必要）")
        reduction_rate = (over / no_space_chars) * 100
        print(f"📉 削減必要率: {reduction_rate:.1f}%")
    elif no_space_chars < target_min:
        under = target_min - no_space_chars
        print(f"⚠️  目標不足: {under:,}文字不足（{target_min:,}文字以上推奨）")
    else:
        print(f"✅ 目標範囲内: {target_min:,}-{target_max:,}文字")
    
    return no_space_chars

def main():
    """メイン処理"""
    base_path = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250722 現在最終原稿/最終原稿"
    
    chapters = [
        ("18_第3部_第9章_初級編7日間プログラム.md", "第9章：初級編"),
        ("19_第3部_第10章_中級編4週間ロードマップ.md", "第10章：中級編"),
        ("20_第3部_第11章_上級編ゲームチェンジャー.md", "第11章：上級編")
    ]
    
    print("🔢 AI超独学 第3部 文字数分析レポート")
    print("=" * 50)
    
    total_chars = 0
    for filename, chapter_name in chapters:
        file_path = os.path.join(base_path, filename)
        char_count = analyze_chapter(file_path, chapter_name)
        total_chars += char_count
    
    print(f"\n=== 全体サマリー ===")
    print(f"第3部合計文字数: {total_chars:,}文字")
    print(f"目標合計: 21,000-27,000文字（3章×7,000-9,000文字）")
    
    if total_chars > 27000:
        over = total_chars - 27000
        print(f"❌ 全体で{over:,}文字オーバー")
    elif total_chars < 21000:
        under = 21000 - total_chars
        print(f"⚠️  全体で{under:,}文字不足")
    else:
        print(f"✅ 全体は目標範囲内")

if __name__ == "__main__":
    main()