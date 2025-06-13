const puppeteer = require('puppeteer');
const path = require('path');

async function captureAllSlides() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });

    const page = await browser.newPage();
    
    // HTMLファイルを開く
    const filePath = `file://${path.resolve(__dirname, '20250114_小倉編集長メッセージ_構造化分析プレゼンテーション.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // スライドタイトルのマッピング
    const slideTitles = [
        '01_タイトル',
        '02_問題の核心構造',
        '03_3つの根本的ギャップ',
        '04_メディア特性の構造的比較',
        '05_独学者ペルソナの深層構造',
        '06_音声入力問題の本質',
        '07_学習スタイルの多様性マトリクス',
        '08_読者脱落の構造的要因',
        '09_脱落防止の戦略的フレームワーク',
        '10_書籍メディアの戦略的活用',
        '11_デジタルアナログのハイブリッド戦略',
        '12_セミナー書籍の戦略的差別化',
        '13_成功指標の多次元的設計',
        '14_編集方針の構造的整理',
        '15_リスクの構造的マネジメント',
        '16_実装への戦略的ロードマップ',
        '17_独自価値の戦略的創出',
        '18_成功への5つの重要要因',
        '19_具体的アクションプラン',
        '20_結論_新たな地平へ'
    ];

    // 各スライドをキャプチャ
    for (let i = 0; i < slideTitles.length; i++) {
        if (i > 0) {
            // 次のスライドボタンをクリック
            await page.click('.nav-btn:last-child');
            await page.waitForTimeout(1000); // アニメーション待機
        }

        // スクリーンショットを撮影
        const fileName = `slides_images/slide_${slideTitles[i]}.png`;
        await page.screenshot({ 
            path: fileName,
            fullPage: false
        });
        
        console.log(`Captured: ${fileName}`);
    }

    await browser.close();
    console.log('All slides captured successfully!');
}

// 実行
captureAllSlides().catch(console.error);