// Gen-Spa Style Validator v4.2 - スライド内部要素のスタイル統一を自動検証・修正

(function() {
    'use strict';

    // スタイルルールの定義（スライド内部要素のみ・厳密な統一）
    const STYLE_RULES = {
        // タイトル階層（厳密な統一）
        titles: {
            h1: {
                fontSize: { exact: 46, unit: 'px' },
                fontWeight: [700, 'bold'],
                lineHeight: { exact: 1.2 },
                color: ['#00447c'],
                marginBottom: { exact: 32, unit: 'px' }
            },
            h2: {
                fontSize: { exact: 36, unit: 'px' },
                fontWeight: [700, 'bold'],
                lineHeight: { exact: 1.3 },
                color: ['#00447c'],
                marginBottom: { exact: 24, unit: 'px' }
            },
            h3: {
                fontSize: { exact: 26, unit: 'px' },
                fontWeight: [600, 'bold'],
                lineHeight: { exact: 1.4 },
                color: ['#00447c'],
                marginBottom: { exact: 16, unit: 'px' }
            },
            h4: {
                fontSize: { exact: 20, unit: 'px' },
                fontWeight: [600, 'bold'],
                lineHeight: { exact: 1.4 },
                marginBottom: { exact: 12, unit: 'px' }
            }
        },
        
        // テキスト要素（厳密な統一）
        text: {
            p: {
                fontSize: { exact: 15, unit: 'px' },
                lineHeight: { exact: 1.6 },
                marginBottom: { exact: 16, unit: 'px' },
                color: ['#333333']
            },
            li: {
                fontSize: { exact: 15, unit: 'px' },
                lineHeight: { exact: 1.6 },
                marginBottom: { exact: 10, unit: 'px' },
                color: ['#333333']
            }
        },
        
        // カード要素（統一）
        cards: {
            '.stat-card': {
                padding: { exact: 24, unit: 'px' },
                borderLeftWidth: { exact: 4, unit: 'px' },
                backgroundColor: ['#f8f9fa']
            },
            '.tool-card': {
                padding: { exact: 24, unit: 'px' },
                borderLeftWidth: { exact: 4, unit: 'px' }
            },
            '.approach-card': {
                padding: { exact: 24, unit: 'px' },
                borderTopWidth: { exact: 3, unit: 'px' }
            },
            '.insight-card': {
                padding: { exact: 24, unit: 'px' },
                borderLeftWidth: { exact: 4, unit: 'px' },
                backgroundColor: ['#f8f9fa']
            }
        },
        
        // 間隔の一貫性
        spacing: {
            sectionMargin: { exact: 48, unit: 'px' },
            elementGap: { exact: 24, unit: 'px' }
        }
    };

    // 検証結果を保存
    let validationResults = [];

    // スタイルを検証
    function validateStyles() {
        console.log('🔍 Gen-Spa v4.2 スライド内部スタイル検証を開始...');
        validationResults = [];
        
        // タイトル要素の検証
        validateTitleHierarchy();
        
        // テキスト要素の検証
        validateTextElements();
        
        // カード要素の検証
        validateCardElements();
        
        // 間隔の検証
        validateSpacing();
        
        // Tailwindクラスの検出
        detectTailwindClasses();
        
        return validationResults;
    }

    // タイトル階層の検証（スライド内部のみ）
    function validateTitleHierarchy() {
        const titles = {
            h1: document.querySelectorAll('.slide-container .title, .slide-container h1'),
            h2: document.querySelectorAll('.slide-container .section-title, .slide-container h2'),
            h3: document.querySelectorAll('.slide-container h3'),
            h4: document.querySelectorAll('.slide-container h4')
        };
        
        Object.entries(titles).forEach(([tag, elements]) => {
            elements.forEach((elem, index) => {
                const computed = window.getComputedStyle(elem);
                const rules = STYLE_RULES.titles[tag];
                
                if (!rules) return;
                
                // フォントサイズ検証（厳密一致）
                const fontSize = parseFloat(computed.fontSize);
                const expectedSize = rules.fontSize.exact;
                if (Math.abs(fontSize - expectedSize) > 0.5) {
                    validationResults.push({
                        element: elem,
                        type: 'fontSize',
                        current: fontSize,
                        expected: rules.fontSize,
                        severity: 'high',
                        selector: `${tag} (スライド${elem.closest('.slide-container').id})`
                    });
                }
                
                // 行間検証（厳密一致）
                const lineHeight = parseFloat(computed.lineHeight) / fontSize;
                const expectedLineHeight = rules.lineHeight.exact;
                if (Math.abs(lineHeight - expectedLineHeight) > 0.1) {
                    validationResults.push({
                        element: elem,
                        type: 'lineHeight',
                        current: lineHeight,
                        expected: rules.lineHeight,
                        severity: 'medium',
                        selector: `${tag} (スライド${elem.closest('.slide-container').id})`
                    });
                }
                
                // マージン検証（厳密一致）
                const marginBottom = parseFloat(computed.marginBottom);
                const expectedMargin = rules.marginBottom.exact;
                if (Math.abs(marginBottom - expectedMargin) > 2) {
                    validationResults.push({
                        element: elem,
                        type: 'marginBottom',
                        current: marginBottom,
                        expected: rules.marginBottom,
                        severity: 'medium',
                        selector: `${tag} (スライド${elem.closest('.slide-container').id})`
                    });
                }
            });
        });
    }

    // テキスト要素の検証（スライド内部のみ）
    function validateTextElements() {
        const textElements = {
            p: document.querySelectorAll('.slide-container p'),
            li: document.querySelectorAll('.slide-container li')
        };
        
        Object.entries(textElements).forEach(([tag, elements]) => {
            elements.forEach(elem => {
                // .text-sm, .text-xs などのクラスを持つ要素をスキップしない（修正対象）
                const computed = window.getComputedStyle(elem);
                const rules = STYLE_RULES.text[tag];
                
                const fontSize = parseFloat(computed.fontSize);
                const expectedSize = rules.fontSize.exact;
                if (Math.abs(fontSize - expectedSize) > 0.5) {
                    validationResults.push({
                        element: elem,
                        type: 'fontSize',
                        current: fontSize,
                        expected: rules.fontSize,
                        severity: 'high',
                        selector: `${tag} (スライド${elem.closest('.slide-container').id})`
                    });
                }
            });
        });
    }

    // カード要素の検証
    function validateCardElements() {
        Object.entries(STYLE_RULES.cards).forEach(([selector, rules]) => {
            const elements = document.querySelectorAll(`.slide-container ${selector}`);
            
            elements.forEach(elem => {
                const computed = window.getComputedStyle(elem);
                
                // パディング検証
                if (rules.padding) {
                    const padding = parseFloat(computed.paddingTop);
                    const expectedPadding = rules.padding.exact;
                    if (Math.abs(padding - expectedPadding) > 2) {
                        validationResults.push({
                            element: elem,
                            type: 'padding',
                            current: padding,
                            expected: rules.padding,
                            severity: 'medium',
                            selector: `${selector} (スライド${elem.closest('.slide-container').id})`
                        });
                    }
                }
            });
        });
    }

    // 間隔の検証
    function validateSpacing() {
        const sections = document.querySelectorAll('.slide-container');
        
        sections.forEach((section, index) => {
            if (index > 0) {
                const computed = window.getComputedStyle(section);
                const marginBottom = parseFloat(computed.marginBottom);
                const expectedMargin = STYLE_RULES.spacing.sectionMargin.exact;
                
                if (Math.abs(marginBottom - expectedMargin) > 4) {
                    validationResults.push({
                        element: section,
                        type: 'sectionSpacing',
                        current: marginBottom,
                        expected: STYLE_RULES.spacing.sectionMargin,
                        severity: 'low',
                        selector: `セクション間隔 (${section.id})`
                    });
                }
            }
        });
    }

    // Tailwindクラスの検出
    function detectTailwindClasses() {
        const tailwindTextClasses = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
        const elements = document.querySelectorAll('.slide-container *');
        
        elements.forEach(elem => {
            const classList = Array.from(elem.classList);
            const hasTailwindText = classList.some(cls => tailwindTextClasses.includes(cls));
            
            if (hasTailwindText) {
                validationResults.push({
                    element: elem,
                    type: 'tailwindClass',
                    current: classList.join(' '),
                    expected: 'カスタムCSSクラス',
                    severity: 'medium',
                    selector: `Tailwindクラス検出 (${elem.tagName.toLowerCase()})`
                });
            }
        });
    }

    // スタイルを自動修正
    function autoFixStyles() {
        console.log('🔧 スタイルの自動修正を開始...');
        let fixCount = 0;
        
        validationResults.forEach(result => {
            if (result.severity === 'high' || result.severity === 'medium') {
                fixCount += fixStyle(result);
            }
        });
        
        console.log(`✅ ${fixCount}個のスタイルを修正しました`);
        return fixCount;
    }

    // 個別のスタイル修正
    function fixStyle(result) {
        const { element, type, expected } = result;
        
        try {
            switch (type) {
                case 'fontSize':
                    const targetSize = expected.exact || ((expected.min + expected.max) / 2);
                    element.style.setProperty('font-size', `${targetSize}${expected.unit}`, 'important');
                    // Tailwindクラスを削除
                    element.classList.remove('text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl');
                    break;
                    
                case 'lineHeight':
                    const targetLineHeight = expected.exact || ((expected.min + expected.max) / 2);
                    element.style.setProperty('line-height', targetLineHeight.toString(), 'important');
                    break;
                    
                case 'marginBottom':
                    const targetMargin = expected.exact || ((expected.min + expected.max) / 2);
                    element.style.setProperty('margin-bottom', `${targetMargin}${expected.unit}`, 'important');
                    break;
                    
                case 'padding':
                    const targetPadding = expected.exact || ((expected.min + expected.max) / 2);
                    element.style.setProperty('padding', `${targetPadding}${expected.unit}`, 'important');
                    break;
                    
                case 'tailwindClass':
                    // Tailwindのテキストサイズクラスを削除
                    element.classList.remove('text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl');
                    break;
            }
            
            return 1;
        } catch (e) {
            console.error('修正エラー:', e);
            return 0;
        }
    }

    // 自律的ループで修正
    async function runAutoFixLoop(maxIterations = 5) {
        console.log('🔄 自律的スタイル修正ループを開始...');
        console.log('対象: スライド内部要素のみ（ナビゲーションは除外）');
        let iteration = 0;
        let totalIssues = Infinity;
        
        while (iteration < maxIterations && totalIssues > 0) {
            iteration++;
            console.log(`\n--- イテレーション ${iteration} ---`);
            
            // 検証実行
            const results = validateStyles();
            totalIssues = results.filter(r => r.severity === 'high' || r.severity === 'medium').length;
            
            console.log(`発見された問題: ${totalIssues}個`);
            
            // 詳細ログ
            if (totalIssues > 0) {
                console.log('問題の詳細:');
                results.filter(r => r.severity === 'high' || r.severity === 'medium')
                    .slice(0, 5) // 最初の5件のみ表示
                    .forEach(r => {
                        console.log(`  - ${r.selector}: ${r.type} (現在値: ${r.current}, 期待値: ${r.expected.exact || r.expected})`);
                    });
            }
            
            if (totalIssues === 0) {
                console.log('✨ すべてのスライド内部スタイルが統一されました！');
                break;
            }
            
            // 修正実行
            const fixed = autoFixStyles();
            
            // 少し待機（DOMの更新を待つ）
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // 修正が進んでいない場合は終了
            if (fixed === 0) {
                console.log('⚠️ これ以上の自動修正は困難です');
                break;
            }
        }
        
        // 最終レポート
        generateReport();
    }

    // レポート生成
    function generateReport() {
        const finalResults = validateStyles();
        const highSeverity = finalResults.filter(r => r.severity === 'high').length;
        const mediumSeverity = finalResults.filter(r => r.severity === 'medium').length;
        const lowSeverity = finalResults.filter(r => r.severity === 'low').length;
        
        console.log('\n📊 最終レポート:');
        console.log(`- 重大な問題: ${highSeverity}個`);
        console.log(`- 中程度の問題: ${mediumSeverity}個`);
        console.log(`- 軽微な問題: ${lowSeverity}個`);
        
        if (highSeverity === 0 && mediumSeverity === 0) {
            console.log('🎉 スライドのスタイルは完全に統一されています！');
            console.log('統一された値:');
            console.log('  - h1/タイトル: 46px');
            console.log('  - h2/セクション: 36px');
            console.log('  - h3: 26px');
            console.log('  - h4: 20px');
            console.log('  - 本文/リスト: 15px');
        }
        
        return {
            high: highSeverity,
            medium: mediumSeverity,
            low: lowSeverity,
            total: finalResults.length
        };
    }

    // 手動実行用のAPI
    window.GenSpaStyleValidator = {
        validate: validateStyles,
        autoFix: autoFixStyles,
        runAutoFixLoop: runAutoFixLoop,
        generateReport: generateReport
    };

    // DOMロード後に自動実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => runAutoFixLoop(), 1000);
        });
    } else {
        setTimeout(() => runAutoFixLoop(), 1000);
    }

})();