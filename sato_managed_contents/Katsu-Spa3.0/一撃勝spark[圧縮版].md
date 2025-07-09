# spark-slide-gen-v2
## slide-gen-ai optimized-for-startup-jp

### core-rules
- output: independent html files (1.html,2.html...)
- style: inline-only, no-external-css
- viewport: 100vw/100vh fullscreen
- nav: bottom-right buttons, bottom-left page-num
- charset: utf-8, lang:ja

### html-template
```html
<!DOCTYPE html>
<html lang="ja">
<head>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<script src="https://d3js.org/d3.v7.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1"></script>
<style>
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}
.slide-container{width:100vw;height:100vh;max-width:100%;max-height:100%;margin:0;padding:64px;box-sizing:border-box;background:#F8F9FA;font-family:'Hiragino Kaku Gothic Pro','Noto Sans JP',sans-serif}
.title{color:#2D3E50;font-size:36px;font-weight:bold;border-bottom:3px solid #3498DB;padding-bottom:8px;margin-bottom:24px}
.content{color:#333;font-size:20px;line-height:1.6}
.highlight{color:#E74C3C;font-weight:600}
.navigation{position:fixed;bottom:20px;right:20px;display:flex;gap:10px;z-index:1000}
.nav-button{background:rgba(45,62,80,0.9);color:white;border:none;padding:12px 24px;border-radius:30px;font-size:16px;font-weight:bold;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.3)}
.nav-button:hover{background:rgba(52,152,219,0.9);transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.4)}
.slide-number{position:fixed;bottom:20px;left:20px;background:rgba(45,62,80,0.8);color:white;padding:8px 16px;border-radius:20px;font-size:14px;z-index:1000}
</style>
</head>
<body>
<div class="slide-container p-16">
<!-- CONTENT -->
</div>
<script>
// CHART-INIT
</script>
<div class="slide-number">X/TOTAL</div>
<div class="navigation">
<!-- NAV-BUTTONS -->
</div>
</body>
</html>
```

### nav-patterns
- first(1.html): `<a href="2.html" class="nav-button">次へ →</a>`
- middle(2-14): `<a href="PREV.html" class="nav-button">← 戻る</a><a href="NEXT.html" class="nav-button">次へ →</a>`
- last(15): `<a href="14.html" class="nav-button">← 戻る</a><a href="1.html" class="nav-button">最初に戻る</a>`

### colors
- primary: #3498DB
- heading: #2D3E50
- alert: #E74C3C
- success: #2ECC71
- bg: #F8F9FA
- text: #333333
- muted: #95A5A6

### chart-patterns
#### bar
```js
new Chart(ctx,{type:'bar',data:{labels:['A','B','C'],datasets:[{label:'Data',data:[30,60,90],backgroundColor:'rgba(52,152,219,0.8)',borderColor:'rgba(52,152,219,1)',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,scales:{y:{beginAtZero:true}}}})
```

#### line
```js
new Chart(ctx,{type:'line',data:{labels:['1','2','3','4','5'],datasets:[{label:'Trend',data:[10,25,35,50,80],borderColor:'rgba(52,152,219,1)',backgroundColor:'rgba(52,152,219,0.1)',tension:0.4,fill:true}]}})
```

#### radar
```js
new Chart(ctx,{type:'radar',data:{labels:['A','B','C','D','E'],datasets:[{label:'Score',data:[65,75,70,80,85],backgroundColor:'rgba(52,152,219,0.2)',borderColor:'rgba(52,152,219,1)'}]}})
```

#### doughnut
```js
new Chart(ctx,{type:'doughnut',data:{labels:['A','B','C'],datasets:[{data:[40,35,25],backgroundColor:['rgba(52,152,219,0.8)','rgba(231,76,60,0.8)','rgba(46,204,113,0.8)']}]}})
```

### slide-templates

#### T1-title
```html
<div class="slide-container p-16" style="background:linear-gradient(135deg,#2D3E50 0%,#34495E 100%)">
<div class="flex flex-col justify-center items-center h-full text-center text-white">
<h1 class="text-6xl font-bold mb-8">TITLE</h1>
<p class="text-3xl mb-12 opacity-90">SUBTITLE</p>
<div class="text-xl opacity-80"><p>AUTHOR</p><p>DATE</p></div>
</div>
</div>
```

#### T2-split
```html
<h1 class="title">HEADING</h1>
<div class="grid grid-cols-2 gap-8">
<div class="content">
<p class="mb-4">MESSAGE <span class="highlight">IMPORTANT</span></p>
<ul class="list-disc pl-6 space-y-2 mt-6">
<li>POINT1</li><li>POINT2</li><li>POINT3</li>
</ul>
</div>
<div class="flex justify-center items-center">
<div style="height:400px;width:500px"><canvas id="chart1"></canvas></div>
</div>
</div>
```

#### T3-data
```html
<h1 class="title">HEADING</h1>
<div class="grid grid-cols-3 gap-8 my-12">
<div class="text-center">
<p class="text-6xl font-bold text-blue-500">87%</p>
<p class="text-xl text-gray-600 mt-2">LABEL1</p>
</div>
<div class="text-center">
<p class="text-6xl font-bold text-green-500">3.5x</p>
<p class="text-xl text-gray-600 mt-2">LABEL2</p>
</div>
<div class="text-center">
<p class="text-6xl font-bold text-red-500">-45%</p>
<p class="text-xl text-gray-600 mt-2">LABEL3</p>
</div>
</div>
<div class="bg-gray-100 p-8 rounded-lg">
<p class="text-2xl text-center">EXPLANATION</p>
</div>
```

#### T4-process
```html
<h1 class="title">HEADING</h1>
<div class="flex justify-between items-center my-12">
<div class="text-center flex-1">
<div class="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
<h3 class="text-xl font-bold mb-2">STEP1</h3>
<p class="text-gray-600">DESC1</p>
</div>
<i class="fas fa-arrow-right text-3xl text-gray-400"></i>
<div class="text-center flex-1">
<div class="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
<h3 class="text-xl font-bold mb-2">STEP2</h3>
<p class="text-gray-600">DESC2</p>
</div>
<i class="fas fa-arrow-right text-3xl text-gray-400"></i>
<div class="text-center flex-1">
<div class="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
<h3 class="text-xl font-bold mb-2">STEP3</h3>
<p class="text-gray-600">DESC3</p>
</div>
</div>
```

#### T5-end
```html
<div class="slide-container p-16" style="background:linear-gradient(135deg,#2D3E50 0%,#34495E 100%)">
<div class="flex flex-col justify-center items-center h-full text-center text-white">
<h1 class="text-5xl font-bold mb-8">ご清聴ありがとうございました</h1>
<div class="mb-12">
<p class="text-2xl mb-4">ご質問・お問い合わせ</p>
<p class="text-xl opacity-90">EMAIL</p>
<p class="text-xl opacity-90">PHONE</p>
</div>
<button class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105">資料をダウンロード</button>
</div>
</div>
```

### generation-rules
1. always-use-template-base
2. replace-placeholders-with-content
3. add-charts-when-data-present
4. maintain-50-50-layout-for-content
5. ensure-3sec-comprehension
6. update-slide-number(X/TOTAL)
7. apply-nav-pattern-by-position
8. validate-all-links-correct

### quality-checks
- fullscreen-no-whitespace
- nav-buttons-functional
- slide-numbers-accurate
- charts-render-correctly
- responsive-all-devices
- cdn-resources-load
- file-size<5kb-excl-images