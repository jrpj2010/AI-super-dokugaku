import os
import re
import json

def classify_and_split_files():
    """
    Reads the combined markdown file, classifies the content into 5 genres,
    and writes them to separate files.
    """
    # ジャンルとキーワードの定義
    genres = {
        "1_autonomic_nervous_system": ["自律神経", "交感神経", "副交感神経"],
        "2_mental_illness": ["うつ", "鬱", "双極性障害", "躁うつ"],
        "3_orthostatic_dysregulation": ["起立性調節障害"],
        "4_stress_management": ["ストレス", "断捨離", "休み方", "不眠", "不安"],
        "5_developmental_disorders": ["ADHD", "発達障害"],
    }

    source_dir = "sato_managed_contents/メンタル辞書"
    original_files = [f for f in os.listdir(source_dir) if f.startswith('fix') and f.endswith('.md')]

    # 出力ファイル用の準備
    output_files = {name: open(os.path.join(source_dir, f"{name}.md"), "w", encoding="utf-8") for name in genres.keys()}

    for filename in original_files:
        try:
            with open(os.path.join(source_dir, filename), "r", encoding="utf-8") as f:
                content = f.read()
        except FileNotFoundError:
            print(f"{filename} が見つかりません。")
            continue

        best_genre = None
        max_count = -1

        # 各ファイルがどのジャンルに最も近いか判定
        for genre_name, keywords in genres.items():
            count = sum(content.count(kw) for kw in keywords)
            if count > max_count:
                max_count = count
                best_genre = genre_name

        # 最も一致するジャンルに書き込む
        if best_genre and max_count > 0:
            output_files[best_genre].write(f"---\n# Original file: {filename}\n{content}\n")
        else:
            # キーワードに一致しないものは、便宜上ストレス管理に分類
            output_files["4_stress_management"].write(f"---\n# Original file: {filename}\n{content}\n")

    # ファイルを閉じる
    for f in output_files.values():
        f.close()

    print("ファイルの分類と分割が完了しました。")

def generate_qa_from_files():
    """
    Generates Q&A in JSONL format from the classified markdown files.
    """
    qa_pairs = []
    source_dir = "sato_managed_contents/メンタル辞書"
    genre_files = [os.path.join(source_dir, f"{name}.md") for name in [
        "1_autonomic_nervous_system",
        "2_mental_illness",
        "3_orthostatic_dysregulation",
        "4_stress_management",
        "5_developmental_disorders"
    ]]

    for file_path in genre_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            continue

        # 文章を意味のある単位（段落）に分割
        # --- をセパレータとして記事単位で区切る
        articles = content.split('---')

        for article in articles:
            if not article.strip():
                continue

            # 80文字以上の日本語を含む段落を対象
            paragraphs = [p.strip() for p in re.split(r'\n{2,}', article) if len(p.strip()) > 80 and re.search(r'[ぁ-んァ-ン一-龥]', p)]

            for para in paragraphs:
                # 簡単なQ&A生成ロジック
                first_sentence = re.split(r'[。！？]', para.strip())[0]
                if not first_sentence or len(first_sentence) < 10:
                    continue

                # 質問の生成
                if "なぜ" in para or "理由" in para:
                    question = f"{first_sentence}のはなぜですか？"
                elif "方法" in para or "どうすれば" in para or "対策" in para:
                    question = f"{first_sentence}にはどうすれば良いですか？"
                elif "とは" in para or "について" in para:
                    question = f"{first_sentence}について詳しく教えてください。"
                else:
                    question = f"{first_sentence}とは何ですか？"

                answer = para.replace("\n", " ")

                qa_pairs.append({"question": question, "answer": answer})

                if len(qa_pairs) >= 500:
                    break
            if len(qa_pairs) >= 500:
                break
        if len(qa_pairs) >= 500:
            break

    # JSONLファイルに書き出す
    with open('mental_health_qa.jsonl', 'w', encoding='utf-8') as f:
        for pair in qa_pairs:
            f.write(json.dumps(pair, ensure_ascii=False) + '\n')

    print(f"{len(qa_pairs)}個のQ&Aを mental_health_qa.jsonl に出力しました。")


if __name__ == '__main__':
    # 元の統合ファイルを結合する処理は削除
    classify_and_split_files()
    generate_qa_from_files()

    # 一時ファイルの削除処理も不要になったため削除
    # if os.path.exists("all_mental_health.md"):
    #     os.remove("all_mental_health.md")
    #     print("一時ファイル all_mental_health.md を削除しました。")
