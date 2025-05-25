<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- フォント読込（Noto Serif JP & Noto Sans JP）-->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&family=Noto+Sans+JP:wght@400;600&display=swap" rel="stylesheet" />

<title>昭和明治モダン 3カラムスライド</title>

<style>
/* ベース変数 */
:root{
  --bg-main: #f4f1ea;
  --fg-main: #2c2c2c;
  --accent-a: #b3322b; /* 朱 */
  --accent-b: #1a5b66; /* 藍 */
  --accent-c: #653a5e; /* 紫 */
}

/* 16:9 スライドコンテナ */
.slide{
  font-family: 'Noto Sans JP', sans-serif;
  width: 1920px;    /* 固定幅 (必要に応じて変更可) */
  height: 1080px;   /* 固定高さ */
  box-sizing: border-box;
  background: var(--bg-main);
  color: var(--fg-main);
  margin: 0 auto;
  display: grid;
  grid-template-rows: 80px 1fr 60px; /* header, content, footer */
  overflow: hidden;
}

/* ヘッダー & フッター */
header, footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.05em;
}
header::after, footer::before{
  content:"";
  flex:1;
  height:1px;
  background: var(--fg-main);
  margin: 0 16px;
}

/* ３カラムグリッド */
.content{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 8px 24px;
  overflow: hidden;
  box-sizing: border-box;
}

/* 各カラムカード共通 */
.card{
  position: relative;
  background: #ffffff;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid var(--fg-main);
  box-shadow: 0 3px 6px rgba(0,0,0,.15);
}
.card h2{
  font-family: 'Noto Serif JP', serif;
  font-size: 24px;
  margin: 0 0 6px;
  letter-spacing: .06em;
  display:flex;
  align-items:center;
}
.card h2 span.icon{
  font-size:28px;
  margin-right:6px;
}

/* 各カラムのアクセントボーダー */
.card:nth-child(1){ border-color: var(--accent-a); }
.card:nth-child(2){ border-color: var(--accent-b); }
.card:nth-child(3){ border-color: var(--accent-c); }

/* 小見出し */
.subhead{
  font-size: 16px;
  font-weight: 600;
  margin: 4px 0 2px;
}
.highlight{
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
}
.small{
  font-size: 11px;
}

/* 実践ポイント (強調枠) */
.practice{
  border: 1px dashed var(--fg-main);
  padding: 8px 10px;
  margin-top: 6px;
  background: rgba(0,0,0,0.04);
  font-size: 12px;
}

/* グラフや図版用の枠 (例: SVG/Canvasを後で挿入) */
.figure{
  flex:1;
  min-height: 120px;
  margin: 4px 0;
  border: 1px solid var(--fg-main);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 14px;
  color: #777;
}

/* プロセスフロー矢印 (例) */
.flow{
  font-size: 12px;
  display:flex;
  gap:8px;
  margin: 4px 0;
}
.flow span{
  position:relative;
  padding:4px 8px 4px 14px;
  background: var(--bg-main);
  border:1px solid var(--fg-main);
}
.flow span::before{
  content:"";
  position:absolute;
  left:-7px; top:50%; transform:translateY(-50%);
  width:0; height:0;
  border-top:6px solid transparent;
  border-bottom:6px solid transparent;
  border-right:7px solid var(--fg-main);
}

/* アクセントの「線と丸」 */
.line-dot{
  width:100%;
  margin:4px 0 10px;
  height:6px;
  background:
    repeating-linear-gradient(90deg, var(--fg-main) 0 8px, transparent 8px 16px);
}
.line-dot::after{
  content:"";
  display:block;
  width:16px; height:16px;
  border-radius:50%;
  background: var(--fg-main);
  margin: -11px auto 0;
}

/* レスポンシブ (PC優先) */
@media (max-width: 1024px){
  .slide{ width:100%; height:auto; }
}
</style>
</head>
<body>

<div class="slide">

  <!-- --- ヘッダー --- -->
  <header>
    <span>{スライドタイトル}</span>
    <span>{サブタイトル / 日付}</span>
  </header>

  <!-- --- メイン３カラム --- -->
  <section class="content">

    <!-- === カラム１ === -->
    <article class="card">
      <h2><span class="icon">💡</span>{カラム1_テーマ}</h2>
      <div class="line-dot"></div>

      <div class="subhead">{カラム1_サブテーマ}</div>
      <p class="small">{カラム1_本質説明}</p>

      <div class="figure"><!-- 図表やチャートを後で挿入 --></div>

      <p class="highlight">{重要数値}<span class="small">{単位}</span></p>

      <div class="subhead">{カラム1_特徴タイトル}</div>
      <ul class="small">
        <li>{特徴1}</li>
        <li>{特徴2}</li>
      </ul>

      <div class="practice">
        <strong>{カラム1_実践見出し}</strong><br>
        • {カラム1_実践ポイント1}<br>
        • {カラム1_実践ポイント2}
      </div>
    </article>

    <!-- === カラム２ === -->
    <article class="card">
      <h2><span class="icon">🔧</span>{カラム2_テーマ}</h2>
      <div class="line-dot"></div>

      <div class="subhead">{カラム2_サブテーマ}</div>
      <p class="small">{カラム2_本質説明}</p>

      <div class="figure"></div>

      <div class="subhead">{カラム2_特徴タイトル}</div>
      <ul class="small">
        <li>{カラム2_ツール名1}：{カラム2_ツール特徴1}</li>
        <li>{カラム2_ツール名2}：{カラム2_ツール特徴2}</li>
      </ul>

      <div class="practice">
        <strong>{カラム2_実践見出し}</strong><br>
        • {カラム2_実践ポイント1}<br>
        • {カラム2_実践ポイント2}
      </div>
    </article>

    <!-- === カラム３ === -->
    <article class="card">
      <h2><span class="icon">🚀</span>{カラム3_テーマ}</h2>
      <div class="line-dot"></div>

      <div class="subhead">{カラム3_サブテーマ}</div>
      <p class="small">{カラム3_本質説明}</p>

      <div class="figure"></div>

      <p class="highlight">{重要数値}<span class="small">{単位}</span></p>

      <div class="subhead">{カラム3_特徴タイトル}</div>
      <ul class="small">
        <li>{カラム3_ツール名}：{カラム3_ツール特徴}</li>
      </ul>

      <div class="practice">
        <strong>{カラム3_実践見出し}</strong><br>
        • {カラム3_実践ポイント1}<br>
        • {カラム3_実践ポイント2}
      </div>
    </article>

  </section>

  <!-- --- フッター --- -->
  <footer>
    <span>{発表者名}</span>
    <span>© TANREN Inc.</span>
  </footer>

</div>

</body>
</html>
