// Feloスライドのリストラクチャリングスクリプト
// このスクリプトを実行して、スライドファイルを整理します

const fs = require('fs');
const path = require('path');

// ソースとターゲットのディレクトリ
const sourceDir = './export/felo.ai/ppt-html/8o5jkVuh44LYJxUhvfrW7R';
const targetDir = './felo-slides-reconstructed';

// ファイル名のマッピング
const fileMapping = {
  '1PROeTEMjcVs.html': 'slide-01-title.html',
  '2PROkjBpJXWL.html': 'slide-02.html',
  '3PROiGkynxIJ.html': 'slide-03.html',
  '4PROkGQGlwFR.html': 'slide-04.html',
  '5PROYYOvQaXB.html': 'slide-05.html',
  '6PRORmCFHrkZ.html': 'slide-06.html',
  '7PROMClxTLwZ.html': 'slide-07.html',
  '8PROQHbKUyIm.html': 'slide-08.html',
  '9PROAsLfFrnz.html': 'slide-09.html',
  '10PRObyMJUuGZ.html': 'slide-10.html',
  '11PROLZSuVwET.html': 'slide-11.html',
  '12PROnpvSUXKy.html': 'slide-12.html',
  '13PROJFkQkWnO.html': 'slide-13.html',
  '14PRODuGopyni.html': 'slide-14.html',
  '15PROyOqTZXSo.html': 'slide-15.html',
  '16PRORjbjOfWu.html': 'slide-16.html',
  '17PROoKDAWDnF.html': 'slide-17.html',
  '18PROIiPcMAWZ.html': 'slide-18.html',
  '19PROGRvfKKCf.html': 'slide-19.html',
  '20PRONrFQiSjW.html': 'slide-20-end.html'
};

// ディレクトリを作成
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// スライドタイトルを抽出する関数
function extractSlideTitle(htmlContent) {
  // h1タグから主要なタイトルを抽出
  const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
  if (h1Match) {
    // HTMLタグを除去
    return h1Match[1].replace(/<[^>]*>/g, '').trim();
  }
  // h2タグから抽出
  const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/);
  if (h2Match) {
    return h2Match[1].replace(/<[^>]*>/g, '').trim();
  }
  return 'No Title';
}

// スライドインデックスを作成
const slideIndex = [];

// ファイルをコピーして整理
Object.entries(fileMapping).forEach(([oldName, newName]) => {
  const sourcePath = path.join(sourceDir, oldName);
  const targetPath = path.join(targetDir, newName);
  
  if (fs.existsSync(sourcePath)) {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const title = extractSlideTitle(content);
    
    // ファイルをコピー
    fs.copyFileSync(sourcePath, targetPath);
    
    // インデックスに追加
    slideIndex.push({
      file: newName,
      originalFile: oldName,
      title: title,
      slideNumber: parseInt(newName.match(/\d+/)[0])
    });
    
    console.log(`✅ ${oldName} → ${newName} (${title})`);
  } else {
    console.log(`❌ ${oldName} not found`);
  }
});

// スライド番号順にソート
slideIndex.sort((a, b) => a.slideNumber - b.slideNumber);

// インデックスファイルを作成
const indexContent = {
  title: "Feloスライド - 生成AIのビジネス実装",
  slideCount: slideIndex.length,
  slides: slideIndex,
  exportDate: new Date().toISOString(),
  structure: {
    width: 1280,
    height: 720,
    format: "HTML5",
    styles: ["Tailwind CSS", "Font Awesome", "Noto Sans JP"]
  }
};

fs.writeFileSync(
  path.join(targetDir, 'slide-index.json'),
  JSON.stringify(indexContent, null, 2)
);

// 統合HTMLビューアーを作成
const viewerHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feloスライドビューアー - 生成AIのビジネス実装</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Noto Sans JP', sans-serif;
            background: #f0f0f0;
        }
        .viewer-container {
            display: flex;
            height: 100vh;
        }
        .slide-list {
            width: 250px;
            background: #fff;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            overflow-y: auto;
        }
        .slide-item {
            padding: 15px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            transition: background 0.3s;
        }
        .slide-item:hover {
            background: #f5f5f5;
        }
        .slide-item.active {
            background: #007BFF;
            color: white;
        }
        .slide-viewer {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .slide-frame {
            width: 1280px;
            height: 720px;
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            background: white;
        }
        .controls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            background: white;
            padding: 10px;
            border-radius: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        .control-btn {
            padding: 10px 20px;
            background: #007BFF;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 16px;
        }
        .control-btn:hover {
            background: #0056b3;
        }
        .control-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="viewer-container">
        <div class="slide-list" id="slideList"></div>
        <div class="slide-viewer">
            <iframe id="slideFrame" class="slide-frame"></iframe>
        </div>
    </div>
    <div class="controls">
        <button class="control-btn" id="prevBtn">前へ</button>
        <span id="slideInfo" style="padding: 10px 20px;">1 / 20</span>
        <button class="control-btn" id="nextBtn">次へ</button>
    </div>
    
    <script>
        const slides = ${JSON.stringify(slideIndex)};
        let currentSlide = 0;
        
        const slideList = document.getElementById('slideList');
        const slideFrame = document.getElementById('slideFrame');
        const slideInfo = document.getElementById('slideInfo');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // スライドリストを生成
        slides.forEach((slide, index) => {
            const item = document.createElement('div');
            item.className = 'slide-item';
            item.innerHTML = \`
                <div style="font-weight: bold;">スライド \${slide.slideNumber}</div>
                <div style="font-size: 14px; margin-top: 5px;">\${slide.title}</div>
            \`;
            item.onclick = () => loadSlide(index);
            slideList.appendChild(item);
        });
        
        function loadSlide(index) {
            currentSlide = index;
            slideFrame.src = slides[index].file;
            slideInfo.textContent = \`\${index + 1} / \${slides.length}\`;
            
            // アクティブクラスを更新
            document.querySelectorAll('.slide-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            
            // ボタンの状態を更新
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === slides.length - 1;
        }
        
        prevBtn.onclick = () => {
            if (currentSlide > 0) loadSlide(currentSlide - 1);
        };
        
        nextBtn.onclick = () => {
            if (currentSlide < slides.length - 1) loadSlide(currentSlide + 1);
        };
        
        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentSlide > 0) {
                loadSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
                loadSlide(currentSlide + 1);
            }
        });
        
        // 初期ロード
        loadSlide(0);
    </script>
</body>
</html>`;

fs.writeFileSync(
  path.join(targetDir, 'viewer.html'),
  viewerHTML
);

console.log('\n✅ スライドの整理が完了しました！');
console.log(`📁 出力先: ${targetDir}`);
console.log(`🖼️ スライド数: ${slideIndex.length}`);
console.log(`📄 viewer.htmlを開いてスライドを閲覧できます`);