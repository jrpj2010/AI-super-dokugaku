// Feloスライド完全抽出スクリプト v3.0 - 判定条件を緩和
console.log('🎯 Felo完全抽出スクリプト v3.0 - 改良版');

// ユーティリティ：計算済みスタイルを取得してインラインスタイルに変換
function getComputedStyleString(element) {
    const computed = window.getComputedStyle(element);
    const important = [
        'display', 'position', 'top', 'right', 'bottom', 'left',
        'width', 'height', 'padding', 'margin', 'border',
        'background', 'color', 'font', 'text', 'line-height',
        'box-shadow', 'border-radius', 'overflow', 'z-index',
        'flex', 'grid', 'gap', 'align', 'justify',
        'transform', 'transition', 'opacity', 'min-', 'max-'
    ];
    
    let styleStr = '';
    for (const prop of important) {
        for (let i = 0; i < computed.length; i++) {
            const key = computed[i];
            if (key.startsWith(prop)) {
                const value = computed.getPropertyValue(key);
                if (value && value !== 'none' && value !== 'normal' && value !== 'auto' && value !== '0px') {
                    styleStr += `${key}: ${value}; `;
                }
            }
        }
    }
    
    return styleStr;
}

// 要素の完全なクローンを作成（スタイル込み）
function cloneWithStyles(element) {
    const clone = element.cloneNode(true);
    
    // 元の要素とその子要素すべてにスタイルを適用
    const origElements = [element, ...element.querySelectorAll('*')];
    const cloneElements = [clone, ...clone.querySelectorAll('*')];
    
    origElements.forEach((origEl, index) => {
        const cloneEl = cloneElements[index];
        if (cloneEl) {
            const existingStyle = cloneEl.getAttribute('style') || '';
            const computedStyle = getComputedStyleString(origEl);
            cloneEl.setAttribute('style', existingStyle + ' ' + computedStyle);
            
            if (origEl.className) {
                cloneEl.className = origEl.className;
            }
        }
    });
    
    return clone;
}

// メインの抽出関数
async function extractPerfectSlides() {
    console.log('📋 スライドの検索を開始...');
    
    // デバッグ：最初のセレクタで見つかった20個の要素を使用
    const mainSelector = '#slidesWrapper > div > div > div';
    let slideElements = document.querySelectorAll(mainSelector);
    console.log(`セレクタ "${mainSelector}": ${slideElements.length}個の要素を発見`);
    
    if (slideElements.length === 0) {
        // 代替セレクタを試す
        const alternativeSelectors = [
            '#slidesWrapper section',
            '#slidesWrapper article',
            '#slidesWrapper > div > div > *',
            'main > div > div > *',
            '[id*="slide"]',
            '[class*="slide"]'
        ];
        
        for (const selector of alternativeSelectors) {
            slideElements = document.querySelectorAll(selector);
            console.log(`代替セレクタ "${selector}": ${slideElements.length}個の要素`);
            if (slideElements.length >= 10) break;
        }
    }
    
    // 要素の詳細をデバッグ
    if (slideElements.length > 0) {
        console.log('🔍 要素の詳細を確認中...');
        slideElements.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const text = el.innerText || '';
            console.log(`要素 ${i + 1}: 幅=${rect.width}, 高さ=${rect.height}, テキスト長=${text.length}`);
        });
    }
    
    // すべての要素を有効とみなす（条件を大幅に緩和）
    const validSlides = Array.from(slideElements).filter((el, index) => {
        // 最低限のフィルタリングのみ
        const text = el.innerText || '';
        return text.length > 0; // テキストが1文字でもあればOK
    });
    
    console.log(`✅ ${validSlides.length}個の有効なスライドを確認`);
    
    // 全体のスタイルシートを取得
    const globalStyles = await extractGlobalStyles();
    
    // 各スライドを処理
    const slides = [];
    for (let i = 0; i < validSlides.length; i++) {
        const element = validSlides[i];
        console.log(`🔄 スライド ${i + 1} を処理中...`);
        
        // スタイル付きでクローン
        const clonedElement = cloneWithStyles(element);
        
        // タイトルを取得（より柔軟に）
        const titleEl = element.querySelector('h1, h2, h3, [class*="text-2xl"], [class*="text-3xl"], [class*="text-xl"], strong');
        const title = titleEl ? titleEl.innerText : 
                     element.innerText.substring(0, 50) || 
                     `スライド ${i + 1}`;
        
        slides.push({
            number: i + 1,
            title: title.trim(),
            html: clonedElement.outerHTML,
            originalHTML: element.outerHTML,
            globalStyles: globalStyles
        });
    }
    
    return slides;
}

// グローバルスタイルシートを抽出
async function extractGlobalStyles() {
    let styles = '';
    
    try {
        // Tailwindの基本的なスタイルを取得
        const tailwindBase = `
        /* Tailwind基本スタイル */
        *, ::before, ::after { box-sizing: border-box; }
        html { line-height: 1.5; -webkit-text-size-adjust: 100%; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
        body { margin: 0; }
        img, svg { display: block; vertical-align: middle; }
        img { max-width: 100%; height: auto; }
        `;
        styles += tailwindBase;
        
        // 現在のページのスタイルシートから抽出
        for (const sheet of document.styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (const rule of rules) {
                    // 重要なルールのみ抽出
                    if (rule.cssText && (
                        rule.cssText.includes('bg-') || 
                        rule.cssText.includes('text-') || 
                        rule.cssText.includes('dark:') ||
                        rule.cssText.includes('rounded') ||
                        rule.cssText.includes('shadow') ||
                        rule.cssText.includes('p-') ||
                        rule.cssText.includes('m-') ||
                        rule.cssText.includes('flex') ||
                        rule.cssText.includes('grid')
                    )) {
                        styles += rule.cssText + '\n';
                    }
                }
            } catch (e) {
                // クロスオリジンエラーは無視
            }
        }
    } catch (e) {
        console.warn('グローバルスタイルの抽出で一部エラー:', e);
    }
    
    return styles;
}

// 完全なHTMLドキュメントを生成
function generatePerfectHTML(slide) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${slide.title} - Felo Slide ${slide.number}</title>
    <style>
        /* グローバルスタイル */
        ${slide.globalStyles}
        
        /* 基本スタイル */
        body {
            background-color: #E9EDF1;
            min-height: 100vh;
            padding: 20px;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .slide-wrapper {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        /* ダークモード対応 */
        @media (prefers-color-scheme: dark) {
            body { background-color: #2B313A; }
        }
        
        /* テキストスタイルの補強 */
        h1, h2, h3 { font-weight: bold; margin-bottom: 1rem; }
        p { margin-bottom: 1rem; line-height: 1.6; }
        ul, ol { margin-bottom: 1rem; padding-left: 2rem; }
        li { margin-bottom: 0.5rem; }
        strong { font-weight: bold; color: #e74c3c; }
        
        /* カードスタイル（Feloのデフォルト） */
        .slide-content {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        @media (prefers-color-scheme: dark) {
            .slide-content { 
                background: #1f2937; 
                color: #f3f4f6;
            }
        }
    </style>
</head>
<body>
    <div class="slide-wrapper">
        <div class="slide-content">
            ${slide.html}
        </div>
    </div>
</body>
</html>`;
}

// 実行
(async function() {
    console.log('🚀 抽出を開始します...');
    
    // ページの準備を待つ
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // スライドを抽出
    const slides = await extractPerfectSlides();
    
    if (slides.length === 0) {
        console.error('❌ スライドの抽出に失敗しました');
        console.log('💡 ヒント: ページを完全にロードしてから再実行してください');
        return;
    }
    
    console.log(`✅ ${slides.length}個のスライドを抽出完了！`);
    
    // グローバル変数に保存
    window.feloExtractedSlides = slides;
    
    // 保存関数
    window.savePerfectSlide = function(num) {
        const slide = slides[num - 1];
        if (!slide) {
            console.error(`スライド ${num} が存在しません`);
            return;
        }
        
        const html = generatePerfectHTML(slide);
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${num}.html`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log(`✅ ${num}.html を保存しました`);
    };
    
    window.saveAllPerfectSlides = function() {
        console.log(`💾 ${slides.length}個のスライドを保存開始...`);
        slides.forEach((slide, index) => {
            setTimeout(() => {
                window.savePerfectSlide(index + 1);
            }, index * 300);
        });
    };
    
    // プレビュー機能
    window.previewSlide = function(num = 1) {
        const slide = slides[num - 1];
        if (!slide) {
            console.error(`スライド ${num} が存在しません`);
            return;
        }
        
        const html = generatePerfectHTML(slide);
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    };
    
    console.log('\n📋 === 使い方 ===');
    console.log('全保存: window.saveAllPerfectSlides()');
    console.log('個別保存: window.savePerfectSlide(1)');
    console.log('プレビュー: window.previewSlide(1)');
    console.log('\n👉 次のコマンドをコピペして実行:');
    console.log('window.saveAllPerfectSlides()');
})();