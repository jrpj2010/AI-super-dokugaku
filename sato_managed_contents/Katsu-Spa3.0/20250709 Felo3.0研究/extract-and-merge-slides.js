// Feloスライドを1つのHTMLファイルに統合するスクリプト

const fs = require('fs');
const path = require('path');

// スライドファイルのリスト
const slideFiles = [
  'slide-01-title.html',
  'slide-02.html',
  'slide-03.html',
  'slide-04.html',
  'slide-05.html',
  'slide-06.html',
  'slide-07.html',
  'slide-08.html',
  'slide-09.html',
  'slide-10.html',
  'slide-11.html',
  'slide-12.html',
  'slide-13.html',
  'slide-14.html',
  'slide-15.html',
  'slide-16.html',
  'slide-17.html',
  'slide-18.html',
  'slide-19.html',
  'slide-20-end.html'
];

const sourceDir = './felo-slides-reconstructed';
const outputFile = './felo-all-slides-integrated.html';

// 各スライドからbodyの内容を抽出
function extractSlideContent(htmlContent, slideNumber) {
  // bodyタグの内容を抽出
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  
  let bodyContent = bodyMatch[1];
  
  // スライドのIDを追加
  bodyContent = bodyContent.replace(
    /<div class="slide/g,
    `<div id="slide-${slideNumber}" class="slide-page" style="display: none;"><div class="slide`
  );
  
  // 閉じタグを追加
  bodyContent = bodyContent.replace(/<\/body>[\s\S]*$/, '') + '</div>';
  
  return bodyContent;
}

// CSSを抽出して統合
function extractStyles(htmlContent) {
  const styles = [];
  const styleMatches = htmlContent.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  
  for (const match of styleMatches) {
    styles.push(match[1]);
  }
  
  return styles;
}

// メインの処理
let allSlides = [];
let allStyles = new Set();

// 各スライドを読み込んで処理
slideFiles.forEach((file, index) => {
  const filePath = path.join(sourceDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // スタイルを収集
    const styles = extractStyles(content);
    styles.forEach(style => allStyles.add(style.trim()));
    
    // スライドコンテンツを抽出
    const slideContent = extractSlideContent(content, index + 1);
    allSlides.push(slideContent);
    
    console.log(`✅ ${file} を処理しました`);
  }
});

// 統合HTMLを作成
const integratedHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生成AIのビジネス実装 - 完全版スライド</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        ${Array.from(allStyles).join('\n')}
        
        /* 追加のビューアースタイル */
        .slide-page {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
        }
        
        .slide-page.active {
            display: block;
        }
        
        .viewer-wrapper {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1a1a1a;
            position: relative;
            overflow: hidden;
        }
        
        .slide-container {
            width: 1280px;
            height: 720px;
            position: relative;
            background: white;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            transform-origin: center center;
        }
        
        .navigation {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 20px;
            align-items: center;
            background: rgba(255,255,255,0.95);
            padding: 15px 30px;
            border-radius: 50px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 1000;
        }
        
        .nav-btn {
            padding: 10px 20px;
            background: #007BFF;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        .nav-btn:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        
        .nav-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        
        .slide-counter {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            min-width: 100px;
            text-align: center;
        }
        
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255,255,255,0.2);
            z-index: 1001;
        }
        
        .progress-fill {
            height: 100%;
            background: #007BFF;
            transition: width 0.3s;
        }
        
        /* レスポンシブ対応 */
        @media (max-width: 1300px) {
            .slide-container {
                transform: scale(0.8);
            }
        }
        
        @media (max-width: 1000px) {
            .slide-container {
                transform: scale(0.6);
            }
        }
        
        @media (max-width: 768px) {
            .slide-container {
                transform: scale(0.5);
            }
        }
        
        /* フルスクリーンモード */
        .fullscreen .navigation {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .fullscreen:hover .navigation {
            opacity: 1;
        }
        
        /* アニメーション */
        .slide-transition {
            animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    </style>
</head>
<body>
    <div class="viewer-wrapper">
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        
        <div class="slide-container" id="slideContainer">
            ${allSlides.join('\n')}
        </div>
        
        <div class="navigation">
            <button class="nav-btn" id="prevBtn">
                <i class="fas fa-chevron-left"></i> 前へ
            </button>
            <div class="slide-counter" id="slideCounter">1 / ${slideFiles.length}</div>
            <button class="nav-btn" id="nextBtn">
                次へ <i class="fas fa-chevron-right"></i>
            </button>
            <button class="nav-btn" id="fullscreenBtn">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    </div>
    
    <script>
        let currentSlide = 0;
        const totalSlides = ${slideFiles.length};
        
        const slideContainer = document.getElementById('slideContainer');
        const slideCounter = document.getElementById('slideCounter');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const progressFill = document.getElementById('progressFill');
        
        function showSlide(index) {
            // すべてのスライドを非表示
            document.querySelectorAll('.slide-page').forEach(slide => {
                slide.classList.remove('active');
            });
            
            // 現在のスライドを表示
            const currentSlideElement = document.getElementById(\`slide-\${index + 1}\`);
            if (currentSlideElement) {
                currentSlideElement.classList.add('active');
                currentSlideElement.classList.add('slide-transition');
                
                setTimeout(() => {
                    currentSlideElement.classList.remove('slide-transition');
                }, 500);
            }
            
            // UIを更新
            slideCounter.textContent = \`\${index + 1} / \${totalSlides}\`;
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === totalSlides - 1;
            
            // プログレスバーを更新
            progressFill.style.width = \`\${((index + 1) / totalSlides) * 100}%\`;
        }
        
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        }
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                document.body.classList.add('fullscreen');
            } else {
                document.exitFullscreen();
                document.body.classList.remove('fullscreen');
            }
        }
        
        // イベントリスナー
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });
        
        // タッチジェスチャー対応
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide();
            }
        }
        
        // 初期表示
        showSlide(0);
        
        // ウィンドウサイズ変更時の対応
        function adjustScale() {
            const container = document.querySelector('.slide-container');
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const slideWidth = 1280;
            const slideHeight = 720;
            
            const scaleX = (windowWidth * 0.9) / slideWidth;
            const scaleY = (windowHeight * 0.9) / slideHeight;
            const scale = Math.min(scaleX, scaleY, 1);
            
            container.style.transform = \`scale(\${scale})\`;
        }
        
        window.addEventListener('resize', adjustScale);
        adjustScale();
    </script>
</body>
</html>`;

// ファイルを書き込み
fs.writeFileSync(outputFile, integratedHTML);

console.log('\n✅ 統合HTMLファイルの作成が完了しました！');
console.log(`📄 出力ファイル: ${outputFile}`);
console.log(`📊 統合されたスライド数: ${allSlides.length}`);
console.log('\n🎯 使い方:');
console.log('   - 矢印キー: スライド移動');
console.log('   - Fキー: フルスクリーン');
console.log('   - タッチ: スワイプでスライド移動');