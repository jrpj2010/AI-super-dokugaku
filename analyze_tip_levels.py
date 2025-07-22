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
    print("AI超独学 Tips Level Distribution Analysis")
    print("=" * 80)
    print()
    
    # Summary statistics
    print("## Summary Statistics:")
    print("-" * 40)
    for level in ['初級', '中級', '上級']:
        if level in tips_by_level:
            count = len(tips_by_level[level])
            print(f"{level}: {count} tips")
    print(f"Total: {sum(len(tips) for tips in tips_by_level.values())} tips")
    print()
    
    # Detailed listing
    for level in ['初級', '中級', '上級']:
        if level in tips_by_level:
            print(f"\n## {level} Level Tips ({len(tips_by_level[level])} tips):")
            print("-" * 80)
            for tip in tips_by_level[level]:
                print(f"Tips {tip['number']}: {tip['title']}")
                print(f"   Location: {tip['folder']}/{tip['filename']}")
            print()
    
    # Pattern Analysis
    print("\n## Pattern Analysis:")
    print("-" * 80)
    
    # Check folder vs actual level mismatches
    mismatches = []
    for level, tips in tips_by_level.items():
        for tip in tips:
            expected_folder = {
                '初級': '01_beginner',
                '中級': '02_intermediate', 
                '上級': '03_advanced'
            }.get(level, '')
            
            if expected_folder and tip['folder'] != expected_folder:
                mismatches.append({
                    'tip': tip['number'],
                    'title': tip['title'],
                    'actual_level': level,
                    'folder': tip['folder'],
                    'expected_folder': expected_folder
                })
    
    if mismatches:
        print("\n### Folder-Level Mismatches Found:")
        for mismatch in sorted(mismatches, key=lambda x: int(x['tip'])):
            print(f"Tips {mismatch['tip']}: Level={mismatch['actual_level']}, "
                  f"Folder={mismatch['folder']} (expected: {mismatch['expected_folder']})")
    else:
        print("\n### No folder-level mismatches found!")
    
    # Analyze filename patterns
    print("\n### Filename Level Indicators vs Actual Levels:")
    filename_mismatches = []
    for level, tips in tips_by_level.items():
        for tip in tips:
            # Extract level from filename
            filename_parts = tip['filename'].split('_')
            if len(filename_parts) >= 2:
                filename_level = filename_parts[1]
                expected_filename_level = {
                    '初級': 'beginner',
                    '中級': 'intermediate',
                    '上級': 'advanced'
                }.get(level, '')
                
                if expected_filename_level and filename_level != expected_filename_level:
                    filename_mismatches.append({
                        'tip': tip['number'],
                        'actual_level': level,
                        'filename_level': filename_level,
                        'filename': tip['filename']
                    })
    
    if filename_mismatches:
        print("\nFilename level indicators that don't match actual levels:")
        for mismatch in sorted(filename_mismatches, key=lambda x: int(x['tip'])):
            print(f"Tips {mismatch['tip']}: {mismatch['filename']} "
                  f"(filename says '{mismatch['filename_level']}' but level is '{mismatch['actual_level']}')")

if __name__ == "__main__":
    print_analysis()