const fs = require('fs');
const path = require('path');

// 共通のSVGヘッダー
function getSVGHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
    </style>
    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f9f9f9"/>
      <stop offset="100%" style="stop-color:#f5f5f5"/>
    </linearGradient>
    <filter id="textShadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feFlood flood-color="#000000" flood-opacity="0.5"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>`;
}

// 共通の背景とロゴ
function getCommonBackground() {
  return `
  <!-- 背景 -->
  <rect width="1280" height="720" fill="#ffffff"/>

  <!-- ロゴ -->
  <image xlink:href="https://tanren.notion.site/image/attachment%3Acb1d3d60-1a74-482c-9977-d59f70bd6027%3A%E5%9B%B31.svg?table=block&id=21b31bbd-522c-806c-9314-fa7bdaf959df&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&userId=&cache=v2"
         x="1140" y="30" width="100" height="100"/>`;
}

// 共通のフッター
function getFooter() {
  return `
  <!-- フッター -->
  <text x="60" y="695" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="11" fill="#888888">
    ©Hitachi Systems, Ltd. 2025. All rights reserved.
  </text>
</svg>`;
}

// タイトルセクション
function getTitleSection(title) {
  return `
  <!-- タイトル -->
  <g>
    <text x="60" y="90"
          font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif"
          font-size="37" fill="#000000" font-weight="700">
      ${title}
    </text>
    <line x1="60" y1="110" x2="${60 + title.length * 30}" y2="110"
          stroke="#FA000F" stroke-width="2"/>
  </g>`;
}

// スライド4: なぜ今、「言語化」が最強の武器なのか？
function generateSlide04() {
  const title = "なぜ今、「言語化」が最強の武器なのか？";
  const content = `
  <title>スライド4: ${title}</title>
  ${getSVGHeader()}
  ${getCommonBackground()}
  ${getTitleSection(title)}

  <!-- 2カラムレイアウト -->
  <g transform="translate(60, 160)">
    <!-- 左カラム -->
    <g transform="translate(0, 0)">
      <text x="0" y="0" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="24" fill="#000000" font-weight="700">
        AIの進化と、私たちに残された課題
      </text>

      <text x="0" y="50" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        <tspan x="0" dy="0">AIの性能は日々向上しています。しかし、多くの人が</tspan>
        <tspan x="0" dy="30">「期待通りの答えが返ってこない」と感じています。</tspan>
      </text>

      <text x="0" y="140" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        <tspan x="0" dy="0">その根本原因は、AIの性能ではなく、私たちの</tspan>
        <tspan x="0" dy="30" font-weight="700" fill="#FA000F">「伝え方」</tspan>
        <tspan dy="0">にあります。</tspan>
      </text>

      <text x="0" y="230" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        <tspan x="0" dy="0">頭の中のモヤモヤした思考をそのままAIに投げても、</tspan>
        <tspan x="0" dy="30">AIも混乱してしまいます。AIに的確に指示を出す能力は、</tspan>
        <tspan x="0" dy="30" font-weight="700">思考を整理し、言葉にする能力（＝言語化力）</tspan>
        <tspan dy="0">と</tspan>
        <tspan x="0" dy="30">同義なのです。</tspan>
      </text>
    </g>

    <!-- 右カラム: 図解 -->
    <g transform="translate(640, 50)">
      <!-- 人間の頭（モヤモヤ） -->
      <circle cx="100" cy="100" r="60" fill="#f0f0f0" stroke="#333333" stroke-width="2"/>
      <text x="100" y="110" text-anchor="middle" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#666666">
        モヤモヤ...
      </text>

      <!-- 矢印 -->
      <path d="M 180 100 L 280 100" stroke="#333333" stroke-width="2" marker-end="url(#arrowhead)"/>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333333"/>
        </marker>
      </defs>

      <!-- AI（困惑） -->
      <rect x="300" y="60" width="80" height="80" rx="10" fill="#e0e0e0" stroke="#333333" stroke-width="2"/>
      <text x="340" y="105" text-anchor="middle" font-family="'Noto Sans JP', sans-serif" font-size="24" fill="#333333">
        AI
      </text>
      <text x="340" y="130" text-anchor="middle" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#666666">
        ?
      </text>

      <!-- 下部の説明 -->
      <text x="240" y="200" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="20" fill="#FA000F" font-weight="700">
        言語化力 = AI活用力
      </text>
    </g>
  </g>

  ${getFooter()}`;

  return content;
}

// スライド5: Day 1 のゴール
function generateSlide05() {
  const title = "Day 1 のゴール";
  const content = `
  <title>スライド5: ${title}</title>
  ${getSVGHeader()}
  ${getCommonBackground()}
  ${getTitleSection(title)}

  <g transform="translate(60, 160)">
    <text x="0" y="0" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="28" fill="#FA000F" font-weight="700">
      思考の「型」を手に入れる
    </text>

    <text x="0" y="60" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="20" fill="#333333">
      本日のゴールは非常にシンプルです。皆様に、ご自身の思考を整理するための<tspan font-weight="700">「型」</tspan>を身につけていただきます。
    </text>

    <!-- 3つのポイント -->
    <g transform="translate(100, 140)">
      <!-- ポイント1 -->
      <g transform="translate(0, 0)">
        <circle cx="30" cy="30" r="25" fill="#FA000F"/>
        <text x="30" y="38" text-anchor="middle" font-family="'Noto Sans JP', sans-serif" font-size="20" fill="#ffffff" font-weight="700">
          1
        </text>
        <text x="80" y="20" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
          自分の思考のクセ（どこで詰まるか）を客観的に認識する。
        </text>
      </g>

      <!-- ポイント2 -->
      <g transform="translate(0, 100)">
        <circle cx="30" cy="30" r="25" fill="#FA000F"/>
        <text x="30" y="38" text-anchor="middle" font-family="'Noto Sans JP', sans-serif" font-size="20" fill="#ffffff" font-weight="700">
          2
        </text>
        <text x="80" y="20" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
          複雑な問題を分解し、構造化するためのフレームワークを習得する。
        </text>
      </g>

      <!-- ポイント3 -->
      <g transform="translate(0, 200)">
        <circle cx="30" cy="30" r="25" fill="#FA000F"/>
        <text x="30" y="38" text-anchor="middle" font-family="'Noto Sans JP', sans-serif" font-size="20" fill="#ffffff" font-weight="700">
          3
        </text>
        <text x="80" y="20" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
          <tspan x="80" dy="0">AIがなくても、ロジカルに考え、話すための</tspan>
          <tspan x="80" dy="25" font-weight="700">一生モノのポータブルスキル</tspan>
          <tspan dy="0">を築く。</tspan>
        </text>
      </g>
    </g>
  </g>

  ${getFooter()}`;

  return content;
}

// スライド6: 「言語化」の2ステップ：分解と構造化
function generateSlide06() {
  const title = "「言語化」の2ステップ：分解と構造化";
  const content = `
  <title>スライド6: ${title}</title>
  ${getSVGHeader()}
  ${getCommonBackground()}
  ${getTitleSection(title)}

  <text x="60" y="160" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="20" fill="#333333">
    「言語化」とは、頭の中の漠然とした大きな塊を、2つのステップで明確にすることです。
  </text>

  <!-- 2カラムレイアウト -->
  <g transform="translate(100, 220)">
    <!-- Step 1: 分解 -->
    <g transform="translate(0, 0)">
      <rect x="-20" y="-20" width="480" height="280" rx="8" fill="url(#boxGrad)" stroke="#FA000F" stroke-width="2"/>

      <text x="220" y="20" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="24" fill="#FA000F" font-weight="700">
        Step 1: 分解
      </text>

      <text x="220" y="60" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        大きな課題やアイデアを、扱いやすい
      </text>
      <text x="220" y="85" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        小さな要素に切り分けるプロセス。
      </text>

      <!-- 図解 -->
      <g transform="translate(160, 120)">
        <!-- 大きな塊 -->
        <rect x="0" y="0" width="120" height="80" rx="10" fill="#e0e0e0" stroke="#666666" stroke-width="2"/>

        <!-- 矢印 -->
        <path d="M 60 90 L 60 110" stroke="#FA000F" stroke-width="2" marker-end="url(#arrowhead2)"/>
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="5" refY="7" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#FA000F"/>
          </marker>
        </defs>

        <!-- 小さな要素 -->
        <g transform="translate(-40, 120)">
          <rect x="0" y="0" width="40" height="30" rx="5" fill="#FA000F" opacity="0.3" stroke="#FA000F" stroke-width="1"/>
          <rect x="50" y="0" width="40" height="30" rx="5" fill="#FA000F" opacity="0.3" stroke="#FA000F" stroke-width="1"/>
          <rect x="100" y="0" width="40" height="30" rx="5" fill="#FA000F" opacity="0.3" stroke="#FA000F" stroke-width="1"/>
        </g>
      </g>
    </g>

    <!-- Step 2: 構造化 -->
    <g transform="translate(560, 0)">
      <rect x="-20" y="-20" width="480" height="280" rx="8" fill="url(#boxGrad)" stroke="#FA000F" stroke-width="2"/>

      <text x="220" y="20" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="24" fill="#FA000F" font-weight="700">
        Step 2: 構造化
      </text>

      <text x="220" y="60" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        分解した要素を、相手に伝わるように
      </text>
      <text x="220" y="85" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic UI', sans-serif" font-size="18" fill="#333333">
        論理的な順序で並べ替え、関係性を示すプロセス。
      </text>

      <!-- 図解 -->
      <g transform="translate(140, 120)">
        <!-- 構造化された要素 -->
        <rect x="60" y="0" width="60" height="40" rx="5" fill="#FA000F" opacity="0.8" stroke="#FA000F" stroke-width="2"/>
        <rect x="0" y="60" width="60" height="40" rx="5" fill="#FA000F" opacity="0.5" stroke="#FA000F" stroke-width="1"/>
        <rect x="120" y="60" width="60" height="40" rx="5" fill="#FA000F" opacity="0.5" stroke="#FA000F" stroke-width="1"/>

        <!-- 接続線 -->
        <line x1="90" y1="40" x2="30" y2="60" stroke="#FA000F" stroke-width="1"/>
        <line x1="90" y1="40" x2="150" y2="60" stroke="#FA000F" stroke-width="1"/>
      </g>
    </g>
  </g>

  ${getFooter()}`;

  return content;
}

// すべてのスライドを生成する関数
function generateAllSlides() {
  const slides = [
    // 既に作成済みのスライド1-3はスキップ
    { num: 4, generator: generateSlide04 },
    { num: 5, generator: generateSlide05 },
    { num: 6, generator: generateSlide06 },
    // 残りのスライドも同様に追加...
  ];

  slides.forEach(slide => {
    const content = slide.generator();
    const filename = `slide_${String(slide.num).padStart(2, '0')}_content.svg`;
    fs.writeFileSync(path.join(__dirname, filename), content, 'utf8');
    console.log(`Generated: ${filename}`);
  });
}

// 実行
generateAllSlides();
