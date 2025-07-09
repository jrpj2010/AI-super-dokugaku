o3スライドプロンプト
```以下コピペ

# ==========================================================
# 💡 汎用「鎌利式」プレゼン・テンプレート（MARP用）
#    ─ 16:9 ワイド + 上下黒縁 + Noto Sans JP ─
# ==========================================================
marp: true
size: 3:2 image                    # ← 横ワイド
paginate: true
backgroundColor: "var(--color-bg)"
theme: default

# ----------------------------------------------------------
# 1. グローバル変数 & フォント読み込み
# ----------------------------------------------------------
style: |
@import url("fonts.googleapis.com/css2?family=No…");
:root {
/* ===== カラースキーマ ===== */
--color-bg:      #ffffff;   /* 背景色 */
--color-text:    #202020;   /* 基本文字色 */
--color-accent:  #E60033;   /* アクセントライン */
--color-border:  #000000;   /* 上下黒縁 */

/* ===== サイズ & 余白 ===== */
--border-h: 40px;           /* 黒縁高さ (px) */
--pad-v: 8%;                /* 上下余白 */
--pad-h: 10%;               /* 左右余白 */

/* ===== フォントサイズ ===== */
--fs-title: 60pt;
--fs-h2:    48pt;
--fs-body:  32pt;
--fs-note:  20pt;
}

/* ===== 共通スタイル ===== */
section {
font-family: "Noto Sans JP", sans-serif;
color: var(--color-text);
background: var(--color-bg);
padding: var(--pad-v) var(--pad-h);
}

/* ===== 上下黒縁 (wide-frameクラス) ===== */
.wide-frame { position: relative; }
.wide-frame::before,
.wide-frame::after  {
content: "";
position: absolute;
left: 0; right: 0;
height: var(--border-h);
background: var(--color-border);
}
.wide-frame::before { top: 0; }
.wide-frame::after  { bottom: 0; }

/* ===== 見出し書式 ===== */
h1, h2 { font-weight: 700; }
h1 { font-size: var(--fs-title); }
h2 { font-size: var(--fs-h2);    }
p, ul, ol { font-size: var(--fs-body); }

/* ===== アクセントライン ===== */
.accent-line {
display: inline-block;
padding-bottom: 4px;
border-bottom: 6px solid var(--color-accent);
}

# ----------------------------------------------------------
# 2. スライド雛形（「Agenda」も汎用化）
# ----------------------------------------------------------
slides:
# 1 ───── タイトル ──────────────────────────
- id: title
class: "lead wide-frame"
content: |
# <span class="accent-line">{{テーマ}}</span>
<!-- ここにメインビジュアル例 -->
<!-- <img src="./hero_image.png" width="100%" alt="cover"> -->

# 2 ───── Agenda（自動生成可） ──────────────
- id: agenda
class: "wide-frame"
content: |
## <span class="accent-line">Agenda</span>
<!-- ★下記リストはテーマによって変更し必要数だけ残す or 追加してください -->
{{1. 背景と課題
2. 原因の深掘り
3. ソリューション概要
4. 効果（数値）
5. 導入ステップ
6. 競合比較 / 市場優位
7. ROI / ビジネスインパクト
8. まとめ & Next Action}}

# 3 ───── 本文スライド以降 ────────────────
# - クラス wide-frame を付けて上下黒縁を維持
# - 見出しは 13 文字以内 → .accent-line を適用
#
# 例:
# - id: problem
#   class: "wide-frame"
#   content: |
#     ## <span class="accent-line">課題</span>
#     <img src="./problem_visual.png" style="float:left;width:45%">
#     **○○○に10分かかる現状**
#     - 年○時間のムダ
#     - ユーザー不満増大

# ----------------------------------------------------------
# ❗️User Input
# ----------------------------------------------------------
"""{{あなたのテーマ}}"""をワイド画像で作成します。
まずは、Agendaを考えて作成して。
