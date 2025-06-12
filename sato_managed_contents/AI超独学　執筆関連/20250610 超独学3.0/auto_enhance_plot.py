import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
FIX_DIR = BASE_DIR / "FIX" / "01_第1部_超具体化"
PLOT_PATH = BASE_DIR / "超詳細プロット.md"
OUTPUT_PATH = BASE_DIR / "超詳細プロット_expanded.md"

# ヘッダー行を保持するために、元のプロットを読み込む
with open(PLOT_PATH, "r", encoding="utf-8") as f:
    original_plot_lines = f.readlines()

# 対象となるTipファイルのパターン
TIP_PATTERN = re.compile(r"Tip\s*(\d+)[:：]\s*(.*)", re.IGNORECASE)

# テーマ単位でTip概要を辞書化
expanded_sections = {}

for root, _, files in os.walk(FIX_DIR):
    for file in files:
        if not file.endswith(".md"):
            continue
        file_path = Path(root) / file
        chapter_key = file_path.name  # 例: Tips_01-05_メール文書作成の革命.md
        tips_summary: list[str] = []

        current_num = None
        current_title = None
        before_text = None
        after_text = None

        def flush_current():
            if current_num and current_title:
                before = before_text or "..."
                after = after_text or "..."
                tips_summary.append(
                    f"- Tip{current_num} {current_title}（Before＝{before}／After＝{after}）"
                )

        with open(file_path, "r", encoding="utf-8") as f:
            for raw in f:
                line = raw.strip()

                # Tip 見出し検出
                if line.startswith("## Tip") or line.startswith("### Tip"):
                    # 直前の Tip を保存
                    flush_current()

                    # 新しい Tip 情報を初期化
                    current_num = None
                    current_title = None
                    before_text = None
                    after_text = None

                    m = TIP_PATTERN.search(line)
                    if m:
                        current_num = m.group(1)
                        current_title = m.group(2).strip()
                    continue

                # Before / After 行検出
                if line.startswith("### Before:"):
                    # 例: "### Before: 30分かけて推敲、それでも不安" → 内容部分を取得
                    before_text = line.split(":", 1)[1].strip()
                    continue
                if line.startswith("### After:"):
                    after_text = line.split(":", 1)[1].strip()
                    continue

            # ファイル終端で最後の Tip を flush
            flush_current()

        expanded_sections[chapter_key] = tips_summary

# ------------------------------
# 追加: 第2部・第3部の章内サブトピック抽出
# ------------------------------

def extract_chapter_topics(md_path: Path) -> dict[str, list[str]]:
    """markdown を読み取り、## 第n章 と ### ■ サブトピックを抽出
    Returns: {chapter_title: [sub1, sub2, ...]}"""
    chapter_pattern = re.compile(r"^##+\s*第(\d+)章[：:].*")
    sub_pattern = re.compile(r"^###.+?■\s*(.*)")

    results: dict[str, list[str]] = {}
    current_chapter = None

    with open(md_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            m_chap = chapter_pattern.match(line)
            if m_chap:
                current_chapter = line.lstrip("# ")  # フル見出しテキスト
                results[current_chapter] = []
                continue

            m_sub = sub_pattern.match(line)
            if m_sub and current_chapter:
                results[current_chapter].append(f"- {m_sub.group(1).strip()}")

    return results

# 抽出ファイルパス定義
PART2_FILE = BASE_DIR / "FIX" / "02_第2部_超抽象化.md"
PART3_FILE = BASE_DIR / "FIX" / "03_第3部_超構造化.md"

# 事前に抽出しておく
part2_topics = extract_chapter_topics(PART2_FILE)
part3_topics = extract_chapter_topics(PART3_FILE)

# ------------------------------

# 新しいプロットファイルを生成
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    for line in original_plot_lines:
        stripped = line.strip()
        f.write(line)

        # 第1部 Tips 一覧注入
        if stripped.startswith("- `Tips_"):
            filename = stripped.split("`")[1]
            if filename in expanded_sections:
                for tip_line in expanded_sections[filename]:
                    f.write("    " + tip_line + "\n")

        # 第2部・第3部 章トピック注入
        if stripped.startswith("#### 第"):
            heading_key = stripped.lstrip("# ").strip()
            target_topics = None
            if heading_key in part2_topics:
                target_topics = part2_topics[heading_key]
            elif heading_key in part3_topics:
                target_topics = part3_topics[heading_key]

            if target_topics:
                for sub in target_topics:
                    f.write("- " + sub.lstrip("- ") + "\n")

print(f"✅ Expanded plot written to {OUTPUT_PATH}")
