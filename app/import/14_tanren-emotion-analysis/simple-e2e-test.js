const https = require('https');

async function runSimpleE2ETest() {
  console.log('🧪 TANREN感情分析プラットフォーム E2Eテスト（簡易版）開始...\n');
  
  let score = 0;
  const maxScore = 100;
  
  // 1. ページ読み込みテスト
  console.log('📍 テスト1: ページ読み込み');
  const pageLoadTest = await testPageLoad();
  if (pageLoadTest.success) {
    console.log('✅ ページが正常に読み込まれました');
    score += 20;
  } else {
    console.log('❌ ページ読み込みエラー:', pageLoadTest.error);
  }
  
  // 2. APIエンドポイントテスト
  console.log('\n📍 テスト2: 感情分析API');
  const apiTest = await testEmotionAPI();
  if (apiTest.success) {
    console.log('✅ APIが正常に動作しています');
    console.log('   レスポンス:', JSON.stringify(apiTest.data, null, 2));
    score += 30;
  } else {
    console.log('❌ APIエラー:', apiTest.error);
  }
  
  // 3. エラーハンドリングテスト
  console.log('\n📍 テスト3: エラーハンドリング');
  const errorTest = await testErrorHandling();
  if (errorTest.success) {
    console.log('✅ エラーハンドリングが適切です');
    score += 20;
  } else {
    console.log('❌ エラーハンドリングに問題があります');
  }
  
  // 4. レスポンスタイムテスト
  console.log('\n📍 テスト4: パフォーマンス');
  const perfTest = await testPerformance();
  if (perfTest.success) {
    console.log(`✅ レスポンスタイムが良好です: ${perfTest.time}ms`);
    score += 20;
  } else {
    console.log(`⚠️  レスポンスタイムが遅いです: ${perfTest.time}ms`);
    score += 10;
  }
  
  // 5. セッションAPIテスト
  console.log('\n📍 テスト5: セッションAPI');
  const sessionTest = await testSessionAPI();
  if (sessionTest.success) {
    console.log('✅ セッションAPIが動作しています');
    score += 10;
  } else {
    console.log('❌ セッションAPIエラー:', sessionTest.error);
  }
  
  // スコア集計
  console.log('\n' + '='.repeat(50));
  console.log(`📊 テストスコア: ${score}/${maxScore} (${(score/maxScore*100).toFixed(1)}%)`);
  
  if (score >= 90) {
    console.log('🎉 優秀！品質基準を満たしています');
  } else if (score >= 70) {
    console.log('👍 良好ですが、改善の余地があります');
  } else {
    console.log('⚠️  改善が必要です');
  }
  
  console.log('='.repeat(50));
  
  return score;
}

function testPageLoad() {
  return new Promise((resolve) => {
    https.get('https://tanren-emotion-analysis-632969986222.asia-northeast1.run.app/', (res) => {
      if (res.statusCode === 200) {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: `Status ${res.statusCode}` });
      }
    }).on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
  });
}

function testEmotionAPI() {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      mimeType: 'image/png'
    });
    
    const options = {
      hostname: 'tanren-emotion-analysis-632969986222.asia-northeast1.run.app',
      path: '/api/analyze-emotion',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode === 200 && json.emotions) {
            resolve({ success: true, data: json });
          } else {
            resolve({ success: false, error: `Status ${res.statusCode}` });
          }
        } catch (e) {
          resolve({ success: false, error: 'Invalid JSON response' });
        }
      });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
    
    req.write(data);
    req.end();
  });
}

function testErrorHandling() {
  return new Promise((resolve) => {
    const data = JSON.stringify({ invalid: 'data' });
    
    const options = {
      hostname: 'tanren-emotion-analysis-632969986222.asia-northeast1.run.app',
      path: '/api/analyze-emotion',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode === 400 && json.error) {
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        } catch (e) {
          resolve({ success: false });
        }
      });
    });
    
    req.on('error', () => {
      resolve({ success: false });
    });
    
    req.write(data);
    req.end();
  });
}

function testPerformance() {
  return new Promise((resolve) => {
    const start = Date.now();
    
    https.get('https://tanren-emotion-analysis-632969986222.asia-northeast1.run.app/', (res) => {
      const time = Date.now() - start;
      resolve({ success: time < 2000, time });
    }).on('error', () => {
      resolve({ success: false, time: -1 });
    });
  });
}

function testSessionAPI() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'tanren-emotion-analysis-632969986222.asia-northeast1.run.app',
      path: '/api/sessions',
      method: 'GET'
    };
    
    https.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: `Status ${res.statusCode}` });
      }
    }).on('error', (err) => {
      resolve({ success: false, error: err.message });
    }).end();
  });
}

// テスト実行
runSimpleE2ETest().catch(console.error);