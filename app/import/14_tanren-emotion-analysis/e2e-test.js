const puppeteer = require('puppeteer');

async function runE2ETest() {
  console.log('🧪 TANREN感情分析プラットフォーム E2Eテスト開始...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  let score = 0;
  const maxScore = 100;
  
  try {
    // 1. ページ読み込みテスト
    console.log('📍 テスト1: ページ読み込み');
    await page.goto('https://tanren-emotion-analysis-632969986222.asia-northeast1.run.app/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    console.log('✅ ページが正常に読み込まれました');
    score += 10;
    
    // 2. タイトルとヘッダーの確認
    console.log('\n📍 テスト2: UI要素の確認');
    const title = await page.title();
    if (title.includes('TANREN')) {
      console.log('✅ タイトルが正しく設定されています:', title);
      score += 5;
    }
    
    const headerText = await page.$eval('h1', el => el.textContent);
    if (headerText === 'TANREN') {
      console.log('✅ ヘッダーが正しく表示されています');
      score += 5;
    }
    
    // 3. タブの存在確認
    console.log('\n📍 テスト3: タブナビゲーション');
    const dashboardTab = await page.$('[id*="trigger-dashboard"]');
    const reportTab = await page.$('[id*="trigger-report"]');
    
    if (dashboardTab && reportTab) {
      console.log('✅ 両方のタブが存在します');
      score += 10;
    }
    
    // 4. 開始ボタンの確認
    console.log('\n📍 テスト4: 開始ボタンの確認');
    const startButton = await page.$('button:has-text("開始")');
    if (startButton) {
      console.log('✅ 開始ボタンが存在します');
      score += 10;
    }
    
    // 5. レスポンシブデザインの確認
    console.log('\n📍 テスト5: レスポンシブデザイン');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    const mobileLayout = await page.$('.container.mx-auto');
    if (mobileLayout) {
      console.log('✅ モバイルレイアウトが適用されています');
      score += 10;
    }
    
    // 6. APIエンドポイントのテスト
    console.log('\n📍 テスト6: APIエンドポイント');
    const apiResponse = await page.evaluate(async () => {
      const response = await fetch('/api/analyze-emotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
          mimeType: 'image/png'
        })
      });
      return { status: response.status, ok: response.ok };
    });
    
    if (apiResponse.ok) {
      console.log('✅ 感情分析APIが正常に動作しています');
      score += 15;
    }
    
    // 7. エラーハンドリングの確認
    console.log('\n📍 テスト7: エラーハンドリング');
    const errorResponse = await page.evaluate(async () => {
      const response = await fetch('/api/analyze-emotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invalid: 'data' })
      });
      const data = await response.json();
      return { status: response.status, error: data.error };
    });
    
    if (errorResponse.status === 400 && errorResponse.error) {
      console.log('✅ エラーハンドリングが適切に機能しています');
      score += 10;
    }
    
    // 8. パフォーマンステスト
    console.log('\n📍 テスト8: パフォーマンス');
    const metrics = await page.metrics();
    const loadTime = metrics.TaskDuration;
    if (loadTime < 5000) {
      console.log(`✅ ページ読み込み時間が良好です: ${loadTime.toFixed(0)}ms`);
      score += 10;
    }
    
    // 9. アクセシビリティ基本チェック
    console.log('\n📍 テスト9: アクセシビリティ');
    const hasLangAttr = await page.$eval('html', el => el.getAttribute('lang') === 'ja');
    if (hasLangAttr) {
      console.log('✅ 言語属性が正しく設定されています');
      score += 5;
    }
    
    // 10. コンソールエラーのチェック
    console.log('\n📍 テスト10: コンソールエラー');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(2000);
    
    if (consoleErrors.length === 0) {
      console.log('✅ コンソールエラーはありません');
      score += 10;
    } else {
      console.log(`⚠️  ${consoleErrors.length}個のコンソールエラーが検出されました`);
      score += 5;
    }
    
  } catch (error) {
    console.error('❌ テストエラー:', error.message);
  } finally {
    await browser.close();
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

// テスト実行
runE2ETest().catch(console.error);