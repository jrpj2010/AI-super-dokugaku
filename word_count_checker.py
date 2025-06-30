import os
import re

def count_characters(text):
    # Markdownのヘッダー、空行、特殊文字などを除外して文字数をカウント
    # 日本語の文字数をより正確に把握するため、単純なlen()を使用
    # 見出し（#）、箇条書き（-、*）、引用（>）などの記号は除外
    clean_text = re.sub(r'#+\s*|.>\s*|`{3,}[\s\S]*?`{3,}|-|\*|\s', '', text)
    return len(clean_text)

def check_word_counts(directory):
    targets = {
        "part1": 57000,
        "part2": 32000,
        "part3": 21000,
        "final": 4000,
    }

    file_mapping = {
        "part1": [f for f in os.listdir(directory) if f.startswith(("02_", "03_", "04_", "05_", "06_", "07_", "08_", "09_", "10_", "11_", "12_", "13_", "14_", "15_", "16_", "17_", "18_", "19_"))],
        "part2": [f for f in os.listdir(directory) if f.startswith(("20_", "21_", "22_", "23_"))],
        "part3": [f for f in os.listdir(directory) if f.startswith(("24_", "25_", "26_"))],
        "final": [f for f in os.listdir(directory) if f.startswith("27_")],
    }

    results = {}
    total_actual = 0
    total_target = sum(targets.values())

    print("--- 文字数校閲レポート ---")

    for part, files in file_mapping.items():
        part_char_count = 0
        for filename in files:
            filepath = os.path.join(directory, filename)
            if os.path.isfile(filepath):
                with open(filepath, 'r', encoding='shift_jis') as f:
                    content = f.read()
                    part_char_count += count_characters(content)
        
        target_count = targets[part]
        difference = part_char_count - target_count
        status = "達成" if difference >= 0 else "未達"
        
        results[part] = {
            "target": target_count,
            "actual": part_char_count,
            "difference": difference,
            "status": status
        }
        total_actual += part_char_count

    # 結果の表示
    part_names = {
        "part1": "第1部【超具体化】",
        "part2": "第2部【超抽象化】",
        "part3": "第3部【超構造化】",
        "final": "結び",
    }

    for part, res in results.items():
        print(f"\n■ {part_names[part]}")
        print(f"  目標文字数: {res['target']:,}字")
        print(f"  現在文字数: {res['actual']:,}字")
        print(f"  差分: {res['difference']:+,}字 [{res['status']}]")

    print("\n--- 総合結果 ---")
    total_difference = total_actual - total_target
    total_status = "達成" if total_difference >= 0 else "未達"
    print(f"目標合計: {total_target:,}字")
    print(f"現在合計: {total_actual:,}字")
    print(f"総合差分: {total_difference:+,}字 [{total_status}]")
    print("--------------------")

if __name__ == "__main__":
    manuscript_directory = "/Users/jrpj2010/vibe-coding/sato_managed_contents/商談管理/SBクリエイティブ株式会社様/20250630最終原稿："
    check_word_counts(manuscript_directory)
