// Feloスライド編集サーバー
// このサーバーを起動すると、ブラウザから直接スライドを編集・保存できます

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3333;

// ミドルウェア
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

// 保存エンドポイント
app.post('/save-slide', (req, res) => {
    const { filename, content } = req.body;
    
    if (!filename || !content) {
        return res.status(400).json({ error: 'ファイル名と内容が必要です' });
    }
    
    const filePath = path.join(__dirname, 'felo-slides-reconstructed', filename);
    
    try {
        // バックアップを作成
        const backupPath = filePath + '.backup';
        if (fs.existsSync(filePath)) {
            fs.copyFileSync(filePath, backupPath);
        }
        
        // ファイルを保存
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log(`✅ 保存成功: ${filename}`);
        res.json({ success: true, message: 'ファイルを保存しました' });
    } catch (error) {
        console.error('保存エラー:', error);
        res.status(500).json({ error: '保存に失敗しました' });
    }
});

// スライド一覧を取得
app.get('/list-slides', (req, res) => {
    const slidesDir = path.join(__dirname, 'felo-slides-reconstructed');
    const files = fs.readdirSync(slidesDir)
        .filter(file => file.endsWith('.html') && file.startsWith('slide-'))
        .map(file => ({
            filename: file,
            url: `/felo-slides-reconstructed/${file}`
        }));
    
    res.json(files);
});

// 編集機能を強化したバージョンのスクリプト
const enhancedEditorScript = `
<script>
// 保存機能付きFelo編集システム
(function() {
    const currentFile = window.location.pathname.split('/').pop();
    
    // 既存のエディタースクリプトに保存機能を追加
    const originalSaveChanges = window.saveChanges || function() {};
    
    window.saveChanges = async function() {
        const htmlContent = document.documentElement.outerHTML;
        
        try {
            const response = await fetch('http://localhost:${PORT}/save-slide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filename: currentFile,
                    content: htmlContent
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('ファイルを保存しました！');
                console.log('保存成功:', currentFile);
            } else {
                alert('保存に失敗しました: ' + result.error);
            }
        } catch (error) {
            console.error('保存エラー:', error);
            alert('サーバーに接続できません。サーバーが起動していることを確認してください。');
        }
    };
    
    // Ctrl+S で保存
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            window.saveChanges();
        }
    });
    
    // 保存インジケーター
    const saveIndicator = document.createElement('div');
    saveIndicator.style.cssText = \`
        position: fixed;
        top: 70px;
        right: 20px;
        padding: 10px 20px;
        background: #28a745;
        color: white;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        z-index: 10001;
    \`;
    saveIndicator.textContent = 'Ctrl+S で保存';
    document.body.appendChild(saveIndicator);
    
    // 編集モード時に表示
    const originalInitEditor = window.initEditor;
    window.initEditor = function() {
        if (originalInitEditor) originalInitEditor.apply(this, arguments);
        saveIndicator.style.opacity = '1';
        setTimeout(() => {
            saveIndicator.style.opacity = '0';
        }, 3000);
    };
})();
</script>
`;

// インデックスページを作成
app.get('/', (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Felo スライドエディター</title>
    <style>
        body {
            font-family: 'Noto Sans JP', sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
        }
        .slides-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .slide-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .slide-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .slide-card h3 {
            margin: 0 0 10px 0;
            color: #007BFF;
        }
        .slide-card a {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 16px;
            background: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.2s;
        }
        .slide-card a:hover {
            background: #0056b3;
        }
        .info-box {
            background: #e3f2fd;
            border-left: 4px solid #007BFF;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 4px;
        }
        .info-box h2 {
            margin-top: 0;
            color: #007BFF;
        }
        .info-box ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .info-box li {
            margin: 5px 0;
        }
        .server-status {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #28a745;
            color: white;
            border-radius: 4px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="server-status">サーバー稼働中 🟢</div>
    
    <div class="container">
        <h1>Felo スライドエディター</h1>
        
        <div class="info-box">
            <h2>使い方</h2>
            <ul>
                <li>下記のスライドをクリックして開く</li>
                <li>右下の「編集モード」ボタンをクリック</li>
                <li>テキストをクリックして編集</li>
                <li>ツールバーでフォントやサイズを変更</li>
                <li><strong>Ctrl+S</strong> で変更を保存</li>
            </ul>
        </div>
        
        <div class="slides-grid" id="slidesGrid">
            <!-- スライドリストはJavaScriptで動的に生成 -->
        </div>
    </div>
    
    <script>
        // スライド一覧を取得
        fetch('/list-slides')
            .then(res => res.json())
            .then(slides => {
                const grid = document.getElementById('slidesGrid');
                slides.forEach((slide, index) => {
                    const card = document.createElement('div');
                    card.className = 'slide-card';
                    card.innerHTML = \`
                        <h3>スライド \${index + 1}</h3>
                        <p>\${slide.filename}</p>
                        <a href="\${slide.url}" target="_blank">編集する</a>
                    \`;
                    grid.appendChild(card);
                });
            });
    </script>
</body>
</html>
    `;
    res.send(html);
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`
🚀 Felo編集サーバーが起動しました！

📌 アクセス方法:
   http://localhost:${PORT}

💡 使い方:
   1. ブラウザで上記URLにアクセス
   2. 編集したいスライドを選択
   3. 「編集モード」ボタンをクリック
   4. テキストを直接編集
   5. Ctrl+S で保存

🛑 サーバーを停止: Ctrl+C
    `);
});