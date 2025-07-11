// MD Buddy v0.002 クイックテスト
const http = require('http');

// HTTPリクエストでアプリケーションの状態を確認
const options = {
  hostname: '127.0.0.1',
  port: 8081,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`ステータスコード: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('✅ アプリケーションは正常に動作しています');
    console.log('\n確認事項:');
    console.log('1. デバッグウィンドウを開いて v0.002 が表示されているか確認');
    console.log('2. ヘッダーに録音ボタンが表示されているか確認');
    console.log('3. 録音開始時に新規ファイルが左サイドバーに表示されるか確認');
  } else {
    console.log('❌ アプリケーションが応答していません');
  }
});

req.on('error', (error) => {
  console.error(`エラー: ${error.message}`);
  console.log('開発サーバーが起動していることを確認してください');
});

req.end();