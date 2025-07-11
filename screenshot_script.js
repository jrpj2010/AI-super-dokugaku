const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureAllTips() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  
  const page = await browser.newPage();
  
  // ビューポートを設定（フルスクリーンサイズ）
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  
  const baseUrl = 'http://127.0.0.1:5500/sato_managed_contents/AI%E8%B6%85%E7%8B%AC%E5%AD%A6%E3%80%80%E5%9F%B7%E7%AD%86%E9%96%A2%E9%80%A3/20250711%20SB%E3%82%AF%E3%83%AA%E3%82%A8%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96%E5%AE%9A%E4%BE%8B/%E7%AC%AC%E4%B8%80%E9%83%A8%20JSON%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80/index.html';
  const screenshotDir = '/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250711 SBクリエイティブ定例/第一部 JSONフォルダ/screenshots/';
  
  try {
    // 最初のページに移動
    console.log('Navigating to:', baseUrl);
    await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    for (let i = 1; i <= 50; i++) {
      console.log(`Capturing Tips ${i}...`);
      
      // 2-3秒待機
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // スクリーンショットを撮影（全画面）
      const filename = `tips_${i.toString().padStart(2, '0')}.png`;
      const filepath = path.join(screenshotDir, filename);
      
      await page.screenshot({
        path: filepath,
        fullPage: true
      });
      
      console.log(`Saved: ${filename}`);
      
      // 最後のページでない場合は次のページに移動
      if (i < 50) {
        try {
          // 複数の可能性を試す
          const nextButtonSelectors = [
            'button:has-text("次のTips →")',
            '.next-button',
            '[onclick*="next"]',
            'button[onclick*="next"]',
            'a[onclick*="next"]',
            '.next',
            '#next-button',
            'button:contains("次")',
            'a:contains("次")'
          ];
          
          let buttonClicked = false;
          for (const selector of nextButtonSelectors) {
            try {
              await page.click(selector);
              buttonClicked = true;
              console.log(`Clicked next button with selector: ${selector}`);
              break;
            } catch (e) {
              // このセレクターでは見つからない、次を試す
              continue;
            }
          }
          
          if (!buttonClicked) {
            console.log('Button click failed, trying arrow key...');
            // ボタンクリックが失敗した場合は右矢印キーを使用
            await page.keyboard.press('ArrowRight');
          }
          
          // ページの読み込みを待つ
          await new Promise(resolve => setTimeout(resolve, 1500));
          
        } catch (error) {
          console.log(`Error navigating to next page: ${error.message}`);
          // 右矢印キーを試す
          await page.keyboard.press('ArrowRight');
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }
    
    console.log('All screenshots captured successfully!');
    
  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
}

captureAllTips().catch(console.error);