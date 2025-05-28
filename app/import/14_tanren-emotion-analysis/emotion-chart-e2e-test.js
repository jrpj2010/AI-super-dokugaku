const puppeteer = require('puppeteer');

(async () => {
  let browser;
  
  try {
    console.log('🚀 感情トレンドチャートE2Eテスト開始...');
    
    browser = await puppeteer.launch({
      headless: false, // UIを表示して確認
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1280, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // コンソールログをキャプチャ
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('❌ ブラウザエラー:', msg.text());
      } else if (msg.text().includes('sentiment') || msg.text().includes('emotion')) {
        console.log('📊 感情データ:', msg.text());
      }
    });
    
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('✅ ページが読み込まれました');
    
    // リアルタイム分析タブに切り替え
    await page.click('[aria-label="リアルタイム分析モード"]');
    await page.waitForTimeout(1000);
    
    // 初期状態の確認
    const initialChartMessage = await page.$eval(
      '.h-48 p.text-gray-400',
      el => el?.textContent
    ).catch(() => null);
    
    console.log('📝 初期状態:', initialChartMessage || 'チャートが表示されています');
    
    // カメラとマイクの権限を許可
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('http://localhost:3000', ['camera', 'microphone']);
    
    // 開始ボタンをクリック
    console.log('🎬 録画を開始...');
    await page.click('button[aria-label="録画を開始"]');
    
    // カメラ許可ダイアログが表示される場合の処理
    await page.waitForTimeout(2000);
    
    // 録画が開始されたことを確認
    const isRecording = await page.$('div.animate-pulse:has-text("録画中")');
    if (!isRecording) {
      console.error('❌ 録画が開始されませんでした');
      return;
    }
    
    console.log('✅ 録画が開始されました');
    
    // 感情データの更新を監視
    let dataPoints = [];
    const checkInterval = setInterval(async () => {
      try {
        // チャート内のデータポイントを確認
        const chartData = await page.evaluate(() => {
          // EmotionTrendChartコンポーネントのデータを取得
          const chartElement = document.querySelector('[data-testid="line-chart"]');
          if (chartElement) {
            const dataAttr = chartElement.getAttribute('data-chart-data');
            return dataAttr ? JSON.parse(dataAttr) : null;
          }
          
          // Rechartsの実際のSVG要素から情報を取得
          const svgPaths = document.querySelectorAll('.recharts-line path');
          if (svgPaths.length > 0) {
            return { pathCount: svgPaths.length, hasData: true };
          }
          
          return null;
        });
        
        if (chartData) {
          console.log('📊 チャートデータ:', chartData);
          dataPoints.push(chartData);
        }
        
        // センチメントデータの表示を確認
        const hasChartContent = await page.evaluate(() => {
          const chart = document.querySelector('.h-48');
          const message = chart?.querySelector('p.text-gray-400');
          return !message || message.style.display === 'none';
        });
        
        if (hasChartContent) {
          console.log('✅ チャートにデータが表示されています');
        }
        
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    }, 1000);
    
    // 10秒間録画
    console.log('⏱️ 10秒間録画します...');
    await page.waitForTimeout(10000);
    
    // データ監視を停止
    clearInterval(checkInterval);
    
    // 録画を停止
    console.log('⏹️ 録画を停止...');
    await page.click('button[aria-label="録画を停止"]');
    await page.waitForTimeout(2000);
    
    // 結果の確認
    console.log('\n📊 === テスト結果 ===');
    console.log(`収集されたデータポイント数: ${dataPoints.length}`);
    
    if (dataPoints.length > 0) {
      console.log('✅ 感情データがリアルタイムで更新されました');
    } else {
      console.log('❌ 感情データが更新されませんでした');
    }
    
    // スクリーンショットを保存
    await page.screenshot({ 
      path: 'emotion-chart-test-result.png',
      fullPage: true 
    });
    console.log('📸 スクリーンショットを保存しました: emotion-chart-test-result.png');
    
  } catch (error) {
    console.error('❌ テストエラー:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log('\n✅ テスト完了');
  }
})();