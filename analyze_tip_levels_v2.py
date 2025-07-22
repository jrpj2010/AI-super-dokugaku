#!/usr/bin/env python3
import json
import os
from collections import defaultdict

def analyze_tip_levels():
    base_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250718 SBクリエイティブ定例/第一部 JSONフォルダ"
    
    # Dictionary to store tips by level
    tips_by_level = defaultdict(list)
    
    # Walk through the directories
    for folder in ['01_beginner', '02_intermediate', '03_advanced']:
        folder_path = os.path.join(base_dir, folder)
        if os.path.exists(folder_path):
            for filename in os.listdir(folder_path):
                if filename.endswith('.json'):
                    file_path = os.path.join(folder_path, filename)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                            
                        # Extract tip number from filename
                        tip_number = filename.split('_')[0]
                        
                        # Get level and tips name
                        level = data.get('level', 'Unknown')
                        tips_name = data.get('tipsName', 'No title')
                        
                        tips_by_level[level].append({
                            'number': tip_number,
                            'title': tips_name,
                            'folder': folder,
                            'filename': filename
                        })
                    except Exception as e:
                        print(f"Error reading {filename}: {e}")
    
    # Sort tips within each level by number
    for level in tips_by_level:
        tips_by_level[level].sort(key=lambda x: int(x['number']))
    
    return tips_by_level

def print_analysis():
    tips_by_level = analyze_tip_levels()
    
    print("=" * 80)
    print("AI超独学 Tips Level Distribution Analysis (Updated)")
    print("=" * 80)
    print()
    
    # Summary statistics
    print("## Summary Statistics:")
    print("-" * 40)
    level_order = ['初級', '中級', '中級(上)', '上級']
    for level in level_order:
        if level in tips_by_level:
            count = len(tips_by_level[level])
            percentage = (count / 50) * 100
            print(f"{level}: {count} tips ({percentage:.0f}%)")
    print(f"Total: {sum(len(tips) for tips in tips_by_level.values())} tips")
    print()
    
    # Distribution by folder
    print("## Distribution by Folder:")
    print("-" * 40)
    folder_stats = defaultdict(lambda: defaultdict(int))
    for level, tips in tips_by_level.items():
        for tip in tips:
            folder_stats[tip['folder']][level] += 1
    
    for folder in ['01_beginner', '02_intermediate', '03_advanced']:
        print(f"\n{folder}:")
        for level in level_order:
            if level in folder_stats[folder]:
                print(f"  {level}: {folder_stats[folder][level]} tips")
    
    # Detailed listing by level
    for level in level_order:
        if level in tips_by_level:
            print(f"\n## {level} Level Tips ({len(tips_by_level[level])} tips):")
            print("-" * 80)
            for tip in tips_by_level[level]:
                print(f"Tips {tip['number']}: {tip['title']}")
            print()

if __name__ == "__main__":
    print_analysis()