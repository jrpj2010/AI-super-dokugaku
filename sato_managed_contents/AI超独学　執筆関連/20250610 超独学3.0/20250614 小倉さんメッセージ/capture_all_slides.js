// スライドキャプチャスクリプト
async function captureAllSlides() {
    const totalSlides = 20;
    const results = [];
    
    // 最初のスライドに戻る
    currentSlide = 0;
    showSlide(0);
    
    for (let i = 0; i < totalSlides; i++) {
        // 現在のスライドを表示
        currentSlide = i;
        showSlide(i);
        
        // アニメーション完了を待つ
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // スライド番号を記録
        results.push({
            slideNumber: i + 1,
            title: document.querySelector('.slide.active .slide-header')?.textContent || 
                   document.querySelector('.slide.active h1')?.textContent || 
                   `Slide ${i + 1}`
        });
        
        console.log(`Slide ${i + 1} ready for capture`);
    }
    
    return results;
}

// 実行
captureAllSlides();