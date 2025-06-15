/**
 * シンプルなHTTPサーバー
 * Node.jsで実行: node server.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const BASE_DIR = __dirname;

// MIMEタイプの定義
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

// サーバーの作成
const server = http.createServer((req, res) => {
  // URLパスの処理
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(BASE_DIR, filePath);
  
  // ファイルの拡張子を取得
  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // ファイルの読み込みと送信
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // ファイルが見つからない場合
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <html>
            <head>
              <title>404 Not Found</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  text-align: center; 
                  padding: 50px;
                  background-color: #f5f5f5;
                }
                h1 { color: #333; }
                a { 
                  color: #2c6b97; 
                  text-decoration: none;
                  font-weight: bold;
                }
                a:hover { text-decoration: underline; }
              </style>
            </head>
            <body>
              <h1>404 - ページが見つかりません</h1>
              <p>リクエストされたファイル <code>${req.url}</code> は存在しません。</p>
              <p><a href="/">ホームページに戻る</a></p>
            </body>
          </html>
        `);
      } else {
        // その他のエラー
        res.writeHead(500);
        res.end(`サーバーエラー: ${error.code}`);
      }
    } else {
      // 成功時
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    }
  });
});

// サーバーの起動
server.listen(PORT, () => {
  console.log(`
========================================
メッセージ徹底解析サイト - 開発サーバー
========================================

サーバーが起動しました！

アクセスURL: http://localhost:${PORT}

利用可能なページ:
- ホーム: http://localhost:${PORT}/
- メッセージ分析: http://localhost:${PORT}/message_analysis.html
- 構造解析: http://localhost:${PORT}/structure_analysis.html
- 実践アドバイス: http://localhost:${PORT}/practical_advice.html
- 分析ツール: http://localhost:${PORT}/interactive_tool.html

終了するには Ctrl+C を押してください。
========================================
  `);
});

// 終了時の処理
process.on('SIGINT', () => {
  console.log('\nサーバーを停止しています...');
  server.close(() => {
    console.log('サーバーが停止しました。');
    process.exit(0);
  });
});