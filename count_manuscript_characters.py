#!/usr/bin/env python3
"""
SBクリエイティブ様 最終原稿の文字数カウントスクリプト
"""

import os
from pathlib import Path
from typing import List, Tuple
from datetime import datetime

def count_characters_in_file(filepath: Path) -> int:
    """ファイルの文字数をカウント"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # 改行やスペースも含めた総文字数
            total_chars = len(content)
            # 改行とスペースを除いた文字数
            chars_without_spaces = len(content.replace('\n', '').replace(' ', '').replace('\t', ''))
            return total_chars, chars_without_spaces
    except Exception as e:
        print(f"エラー: {filepath} - {str(e)}")
        return 0, 0

def process_folder(folder_path: str) -> List[Tuple[str, int, int]]:
    """フォルダ内の全.mdファイルの文字数をカウント"""
    results = []
    folder = Path(folder_path)
    
    if not folder.exists():
        print(f"フォルダが見つかりません: {folder_path}")
        return results
    
    # .mdファイルを取得（ファイル名順にソート）
    md_files = sorted(folder.glob("*.md"))
    
    for md_file in md_files:
        total_chars, chars_no_spaces = count_characters_in_file(md_file)
        results.append((md_file.name, total_chars, chars_no_spaces))
    
    return results

def create_summary_table(results: List[Tuple[str, int, int]]) -> List[List[str]]:
    """結果をテーブル形式に整形"""
    table = [['ファイル名', '総文字数（改行・スペース含む）', '文字数（改行・スペース除く）']]
    
    total_with_spaces = 0
    total_without_spaces = 0
    
    for filename, chars_with_spaces, chars_without_spaces in results:
        table.append([filename, f'{chars_with_spaces:,}', f'{chars_without_spaces:,}'])
        total_with_spaces += chars_with_spaces
        total_without_spaces += chars_without_spaces
    
    # 合計行を追加
    table.append(['【合計】', f'{total_with_spaces:,}', f'{total_without_spaces:,}'])
    
    return table

def print_table(table: List[List[str]]):
    """テーブルを整形して表示"""
    # 各列の最大幅を計算
    col_widths = []
    for i in range(len(table[0])):
        max_width = max(len(str(row[i])) for row in table)
        col_widths.append(max_width)
    
    # ヘッダーを表示
    print('|', end='')
    for i, cell in enumerate(table[0]):
        print(f' {cell:^{col_widths[i]}} |', end='')
    print()
    
    # 区切り線
    print('|', end='')
    for width in col_widths:
        print('-' * (width + 2) + '|', end='')
    print()
    
    # データ行を表示
    for row in table[1:]:
        print('|', end='')
        for i, cell in enumerate(row):
            if i == 0:  # ファイル名は左寄せ
                print(f' {cell:<{col_widths[i]}} |', end='')
            else:  # 数値は右寄せ
                print(f' {cell:>{col_widths[i]}} |', end='')
        print()

def write_csv(table: List[List[str]], filename: str):
    """CSVファイルに保存"""
    import csv
    with open(filename, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerows(table)

def main():
    # 対象フォルダ
    target_folder = "/Users/jrpj2010/vibe-coding/sato_managed_contents/商談管理/SBクリエイティブ株式会社様/20250630最終原稿："
    
    print(f"文字数カウントを開始します...")
    print(f"対象フォルダ: {target_folder}")
    print("-" * 80)
    
    # ファイルごとの文字数をカウント
    results = process_folder(target_folder)
    
    if not results:
        print("処理対象のファイルが見つかりませんでした。")
        return
    
    # 結果をテーブル形式で表示
    table = create_summary_table(results)
    
    print("\n【文字数カウント結果】")
    print_table(table)
    
    # CSVファイルとしても保存
    output_path = os.path.join(target_folder, "character_count_report_20250630_140848.csv")
    write_csv(table, output_path)
    print(f"\n結果をCSVファイルに保存しました: {output_path}")
    
    # 統計情報
    print("\n【統計情報】")
    print(f"総ファイル数: {len(results)}個")
    
    # 合計値を取得（最後の行から）
    total_with_spaces = int(table[-1][1].replace(',', ''))
    total_without_spaces = int(table[-1][2].replace(',', ''))
    
    print(f"総文字数（改行・スペース含む）: {total_with_spaces:,}文字")
    print(f"総文字数（改行・スペース除く）: {total_without_spaces:,}文字")
    
    if len(results) > 0:
        avg_chars = total_without_spaces // len(results)
        print(f"平均文字数/ファイル: {avg_chars:,}文字")

if __name__ == "__main__":
    main()