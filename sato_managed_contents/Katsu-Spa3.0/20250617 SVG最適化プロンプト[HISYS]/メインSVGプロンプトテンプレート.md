/* @theme hitachi-2025-master-v2 */

@import 'default';
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");

:root {
  --hitachi-red: #FA000F;
  --base-font-size: 18pt;
  --base-padding: 60px;
}

/* --- 全スライド共通の基本設定 --- */
section {
  font-family: "Noto Sans JP", "Yu Gothic UI", sans-serif;
  font-size: var(--base-font-size);
  color: #333;
  padding: 50px var(--base-padding);
  background-color: #fff;
  background-image: url("https://tanren.notion.site/image/attachment%3Acb1d3d60-1a74-482c-9977-d59f70bd6027%3A%E5%9B%B31.svg?table=block&id=21b31bbd-522c-806c-9314-fa7bdaf959df&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&userId=&cache=v2");
  background-position: top 30px right 40px;
  background-repeat: no-repeat;
  background-size: 100px;
}

/* --- フッターのスタイル --- */
footer {
  font-size: 8pt; color: #888; position: absolute; bottom: 25px;
  left: var(--base-padding); right: var(--base-padding); display: flex; justify-content: space-between;
}
footer::after { content: "©Hitachi Systems, Ltd. 2025. All rights reserved"; }

/* --- テキスト要素の基本スタイル --- */
h1 { font-size: 48pt; color: var(--hitachi-red); margin-bottom: 20px; line-height: 1.2; font-weight: 700; }
h2 { font-size: 28pt; color: #000; padding-bottom: 10px; border-bottom: 2px solid var(--hitachi-red); font-weight: 700; }
h3 { font-size: 20pt; color: var(--hitachi-red); margin-top: 30px; margin-bottom: 15px; border-left: 5px solid var(--hitachi-red); padding-left: 10px; font-weight: 700;}
ul, ol { line-height: 1.7; }

/* --- 表紙、目次、中扉、背景バリエーション --- */
section.title {
  color: #fff;
  background-image: url("https://tanren.notion.site/image/attachment%3A812981ac-53df-4c90-9c50-76b318c91422%3A%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-06-24_0.38.04.png?table=block&id=21b31bbd-522c-8066-93ed-fac44611e2eb&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=2000&userId=&cache=v2"), url("https://tanren.notion.site/image/attachment%3Ae24fc73e-77c9-48b8-9a78-a82440ba13e1%3A%E5%9B%B32.svg?table=block&id=21b31bbd-522c-80a5-8ee0-d4fd53eb9ee7&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&userId=&cache=v2");
  background-position: center center, top 50px left 60px; background-size: cover, 180px; padding: var(--base-padding);
}
section.title h1 { font-size: 50pt; color: #fff; border: none; }
section.title h2 { font-size: 30pt; color: #fff; border: none; padding-top: 10px; }
section.title footer { display: none; }
section.agenda ol { list-style: none; counter-reset: agenda-counter; margin-left: 0; }
section.agenda ol li { counter-increment: agenda-counter; font-size: 24pt; line-height: 1.8; margin-bottom: 15px; }
section.agenda ol li::before { content: counter(agenda-counter) ". "; font-weight: 700; color: var(--hitachi-red); }
section.bridge { display: flex; flex-direction: column; justify-content: center; text-align: center; }
section.bridge h1 { font-size: 90pt; color: #ccc; margin: 0; }
section.bridge h2 { font-size: 40pt; color: var(--hitachi-red); border: none; margin-top: 10px; }
section.bg2, section.bg3 { background-position: center center, top 30px right 40px; background-size: cover, 100px; background-repeat: no-repeat; }
section.bg2 { background-image: url("https://tanren.notion.site/image/attachment%3A5e59cdf3-a1d0-4b3c-92fa-5cc20ce73980%3Aimage.png?table=block&id=21b31bbd-522c-807a-a4b2-f41b58405440&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=1420&userId=&cache=v2"), url("https://tanren.notion.site/image/attachment%3A5e59cdf3-a1d0-4b3c-92fa-5cc20ce73980%3Aimage.png?table=block&id=21b31bbd-522c-807a-a4b2-f41b58405440&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=1420&userId=&cache=v2"); color: #fff; }
section.bg2 h2, section.bg2 h3 { color: #fff; border-color: #fff; }
section.bg2 footer { color: #fff; }
section.bg3 { background-image: url("https://tanren.notion.site/image/attachment%3A3e7ee351-497f-450b-a37c-53463c3d143c%3A%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-06-24_0.37.24.png?table=block&id=21b31bbd-522c-8021-b574-ea4efcb97eda&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=2000&userId=&cache=v2"), url("https://tanren.notion.site/image/attachment%3Acb1d3d60-1a74-482c-9977-d59f70bd6027%3A%E5%9B%B31.svg?table=block&id=21b31bbd-522c-806c-9314-fa7bdaf959df&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&userId=&cache=v2"); }

/* --- ★★★複数カラムレイアウト用 ★★★ --- */
.multi-columns {
  display: grid;
  /* --cols変数で列数を制御。デフォルトは2。インラインstyleで上書き可能 */
  grid-template-columns: repeat(var(--cols, 2), 1fr);
  gap: 40px;
  /* ★重要：すべてのカラムを上端で揃える */
  align-items: start;
  margin-top: 30px; /* 見出しとの間に適切な余白を追加 */
}
/* カラム内の最初の要素が持つ余計な上マージンをリセットし、高さを完全に揃える */
.multi-columns > div > *:first-child {
  margin-top: 0;
}

/* --- 最終スライド  --- */
section.end {
  background-color: #fff;
  background-image: url("https://tanren.notion.site/image/attachment%3Ac2ac09bc-73d0-4226-a76a-63497ea27002%3A%E5%9B%B33.svg?table=block&id=21b31bbd-522c-806d-9ab5-fe379b86bfdd&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&userId=&cache=v2");
  background-position: center; background-repeat: no-repeat; background-size: 300px;
}
section.end > * { display: none; }
