import os
import re

def restore_original_files():
    """
    Restores the original 'fix*.md' files from the aggregated markdown files.
    """
    source_dir = '/Users/jrpj2010/vibe-coding/sato_managed_contents/メンタル辞書'
    aggregated_files = [
        "1_autonomic_nervous_system.md",
        "2_mental_illness.md",
        "3_orthostatic_dysregulation.md",
        "4_stress_management.md",
        "5_developmental_disorders.md"
    ]

    restored_count = 0
    for agg_filename in aggregated_files:
        agg_filepath = os.path.join(source_dir, agg_filename)

        try:
            with open(agg_filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            print(f"警告: {agg_filepath} が見つかりません。スキップします。")
            continue

        # Split content based on the separator '---' and the original file marker
        articles = re.split(r'---\n# Original file: ', content)

        for article in articles:
            if not article.strip():
                continue

            # The first line of each chunk is the original filename
            lines = article.split('\n', 1)
            original_filename = lines[0]

            if not original_filename.startswith('fix') or not original_filename.endswith('.md'):
                continue

            file_content = lines[1] if len(lines) > 1 else ''

            # Write to the original file
            restore_path = os.path.join(source_dir, original_filename)
            with open(restore_path, 'w', encoding='utf-8') as rf:
                rf.write(file_content.strip())

            restored_count += 1

    print(f"{restored_count}個のファイルを復元しました。")

if __name__ == '__main__':
    restore_original_files()
