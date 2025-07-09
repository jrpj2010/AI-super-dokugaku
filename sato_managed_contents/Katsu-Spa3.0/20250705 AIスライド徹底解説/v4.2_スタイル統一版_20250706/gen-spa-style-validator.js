// Gen-Spa Style Validator - スタイルの一貫性を自動検証・修正

(function() {
    'use strict';

    // スタイルルールの定義
    const STYLE_RULES = {
        // タイトル階層
        titles: {
            h1: {
                fontSize: { min: 42, max: 48, unit: 'px' },
                fontWeight: [700, 'bold'],
                lineHeight: { min: 1.1, max: 1.3 },
                color: ['#00447c', '#006699'],
                marginBottom: { min: 20, max: 40, unit: 'px' }
            },
            h2: {
                fontSize: { min: 32, max: 38, unit: 'px' },
                fontWeight: [700, 'bold'],
                lineHeight: { min: 1.2, max: 1.4 },
                color: ['#00447c', '#006699'],
                marginBottom: { min: 16, max: 32, unit: 'px' }
            },
            h3: {
                fontSize: { min: 24, max: 28, unit: 'px' },
                fontWeight: [600, 700, 'bold'],
                lineHeight: { min: 1.3, max: 1.5 },
                marginBottom: { min: 12, max: 24, unit: 'px' }
            }
        },
        
        // テキスト要素
        text: {
            p: {
                fontSize: { min: 14, max: 16, unit: 'px' },
                lineHeight: { min: 1.5, max: 1.8 },
                marginBottom: { min: 12, max: 20, unit: 'px' }
            },
            li: {
                fontSize: { min: 14, max: 16, unit: 'px' },
                lineHeight: { min: 1.5, max: 1.8 },
                marginBottom: { min: 8, max: 12, unit: 'px' }
            }
        },
        
        // カード要素
        cards: {
            '.stat-card': {
                padding: { min: 20, max: 32, unit: 'px' },
                borderLeftWidth: { min: 3, max: 4, unit: 'px' },
                backgroundColor: ['#f8f9fa', '#f5f5f5']
            },
            '.tool-card': {
                padding: { min: 20, max: 32, unit: 'px' },
                borderLeftWidth: { min: 3, max: 4, unit: 'px' }
            }
        },
        
        // 間隔の一貫性
        spacing: {
            sectionMargin: { min: 40, max: 60, unit: 'px' },
            elementGap: { min: 16, max: 32, unit: 'px' }
        }
    };

    // 検証結果を保存
    let validationResults = [];

    // スタイルを検証
    function validateStyles() {
        console.log('🔍 Gen-Spa スタイル検証を開始...');
        validationResults = [];
        
        // タイトル要素の検証
        validateTitleHierarchy();
        
        // テキスト要素の検証
        validateTextElements();
        
        // カード要素の検証
        validateCardElements();
        
        // 間隔の検証
        validateSpacing();
        
        // 色の一貫性
        validateColors();
        
        return validationResults;
    }

    // タイトル階層の検証
    function validateTitleHierarchy() {
        const titles = {
            h1: document.querySelectorAll('.title, h1'),
            h2: document.querySelectorAll('.section-title, h2'),
            h3: document.querySelectorAll('h3')
        };
        
        Object.entries(titles).forEach(([tag, elements]) => {
            elements.forEach((elem, index) => {
                const computed = window.getComputedStyle(elem);
                const rules = STYLE_RULES.titles[tag];
                
                // フォントサイズ検証
                const fontSize = parseFloat(computed.fontSize);
                if (fontSize < rules.fontSize.min || fontSize > rules.fontSize.max) {
                    validationResults.push({
                        element: elem,
                        type: 'fontSize',
                        current: fontSize,
                        expected: rules.fontSize,
                        severity: 'high'
                    });
                }
                
                // 行間検証
                const lineHeight = parseFloat(computed.lineHeight) / fontSize;
                if (lineHeight < rules.lineHeight.min || lineHeight > rules.lineHeight.max) {
                    validationResults.push({
                        element: elem,
                        type: 'lineHeight',
                        current: lineHeight,
                        expected: rules.lineHeight,
                        severity: 'medium'
                    });
                }
                
                // マージン検証
                const marginBottom = parseFloat(computed.marginBottom);
                if (marginBottom < rules.marginBottom.min || marginBottom > rules.marginBottom.max) {
                    validationResults.push({
                        element: elem,
                        type: 'marginBottom',
                        current: marginBottom,
                        expected: rules.marginBottom,
                        severity: 'low'
                    });
                }
            });
        });
    }

    // テキスト要素の検証
    function validateTextElements() {
        const textElements = {
            p: document.querySelectorAll('p'),
            li: document.querySelectorAll('li')
        };
        
        Object.entries(textElements).forEach(([tag, elements]) => {
            elements.forEach(elem => {
                const computed = window.getComputedStyle(elem);
                const rules = STYLE_RULES.text[tag];
                
                const fontSize = parseFloat(computed.fontSize);
                if (fontSize < rules.fontSize.min || fontSize > rules.fontSize.max) {
                    validationResults.push({
                        element: elem,
                        type: 'fontSize',
                        current: fontSize,
                        expected: rules.fontSize,
                        severity: 'medium'
                    });
                }
            });
        });
    }

    // カード要素の検証
    function validateCardElements() {
        Object.entries(STYLE_RULES.cards).forEach(([selector, rules]) => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(elem => {
                const computed = window.getComputedStyle(elem);
                
                // パディング検証
                const padding = parseFloat(computed.paddingTop);
                if (padding < rules.padding.min || padding > rules.padding.max) {
                    validationResults.push({
                        element: elem,
                        type: 'padding',
                        current: padding,
                        expected: rules.padding,
                        severity: 'medium'
                    });
                }
            });
        });
    }

    // 間隔の検証
    function validateSpacing() {
        const sections = document.querySelectorAll('.slide-container');
        
        sections.forEach((section, index) => {
            if (index > 0) {
                const prevSection = sections[index - 1];
                const gap = section.offsetTop - (prevSection.offsetTop + prevSection.offsetHeight);
                
                if (gap < STYLE_RULES.spacing.sectionMargin.min || 
                    gap > STYLE_RULES.spacing.sectionMargin.max) {
                    validationResults.push({
                        element: section,
                        type: 'sectionSpacing',
                        current: gap,
                        expected: STYLE_RULES.spacing.sectionMargin,
                        severity: 'low'
                    });
                }
            }
        });
    }

    // 色の一貫性を検証
    function validateColors() {
        const primaryColors = ['#00447c', '#006699'];
        const accentColors = ['#3b82f6', '#10b981', '#8b5cf6'];
        
        // すべてのテキスト要素の色をチェック
        const allElements = document.querySelectorAll('*');
        const colorMap = new Map();
        
        allElements.forEach(elem => {
            const color = window.getComputedStyle(elem).color;
            if (color && color !== 'rgba(0, 0, 0, 0)') {
                if (!colorMap.has(color)) {
                    colorMap.set(color, []);
                }
                colorMap.get(color).push(elem);
            }
        });
        
        // 色の使用頻度をチェック
        console.log('🎨 使用されている色:', colorMap.size);
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
                    const targetSize = (expected.min + expected.max) / 2;
                    element.style.fontSize = `${targetSize}${expected.unit}`;
                    break;
                    
                case 'lineHeight':
                    const targetLineHeight = (expected.min + expected.max) / 2;
                    element.style.lineHeight = targetLineHeight.toString();
                    break;
                    
                case 'marginBottom':
                    const targetMargin = (expected.min + expected.max) / 2;
                    element.style.marginBottom = `${targetMargin}${expected.unit}`;
                    break;
                    
                case 'padding':
                    const targetPadding = (expected.min + expected.max) / 2;
                    element.style.padding = `${targetPadding}${expected.unit}`;
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
        let iteration = 0;
        let totalIssues = Infinity;
        
        while (iteration < maxIterations && totalIssues > 0) {
            iteration++;
            console.log(`\n--- イテレーション ${iteration} ---`);
            
            // 検証実行
            const results = validateStyles();
            totalIssues = results.filter(r => r.severity === 'high' || r.severity === 'medium').length;
            
            console.log(`発見された問題: ${totalIssues}個`);
            
            if (totalIssues === 0) {
                console.log('✨ すべてのスタイルが基準を満たしています！');
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
            console.log('🎉 スライドのスタイルは高品質基準を満たしています！');
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