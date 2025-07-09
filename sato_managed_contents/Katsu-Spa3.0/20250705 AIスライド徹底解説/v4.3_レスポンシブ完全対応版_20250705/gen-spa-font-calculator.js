// Gen-Spa Font Calculator v4.3 - 動的フォントサイズ計算とデバッグ

(function() {
    'use strict';

    // 設定
    const CONFIG = {
        baseWidth: 1280,      // 基準幅
        baseHeight: 720,      // 基準高さ
        sidebarWidth: 256,    // サイドバー幅
        minScale: 0.5,        // 最小スケール
        maxScale: 1.5,        // 最大スケール
        debugMode: true,      // デバッグモード
        updateDelay: 100      // 更新遅延（ms）
    };

    // 基準フォントサイズ（1280px時）
    const BASE_SIZES = {
        h1: 46,
        h2: 36,
        h3: 26,
        h4: 20,
        text: 15,
        small: 13,
        stat: 32
    };

    // フォントサイズ計算機
    class FontCalculator {
        constructor() {
            this.slideContainers = [];
            this.resizeObserver = null;
            this.updateTimer = null;
            this.debugInfo = {};
        }

        // 初期化
        init() {
            console.log('🎯 Gen-Spa Font Calculator v4.3 起動');
            
            // スライドコンテナを取得
            this.slideContainers = document.querySelectorAll('.slide-container');
            
            if (this.slideContainers.length === 0) {
                console.warn('スライドコンテナが見つかりません');
                return;
            }

            // ResizeObserverを設定
            this.setupResizeObserver();
            
            // 初回計算
            this.updateAllSlides();
            
            // デバッグモードの設定
            if (CONFIG.debugMode) {
                this.enableDebugMode();
            }
        }

        // ResizeObserverの設定
        setupResizeObserver() {
            this.resizeObserver = new ResizeObserver(entries => {
                // デバウンス処理
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(() => {
                    this.updateAllSlides();
                }, CONFIG.updateDelay);
            });

            // 各スライドコンテナを監視
            this.slideContainers.forEach(container => {
                this.resizeObserver.observe(container);
            });
        }

        // すべてのスライドを更新
        updateAllSlides() {
            this.slideContainers.forEach((container, index) => {
                this.updateSlide(container, index);
            });

            if (CONFIG.debugMode) {
                this.updateDebugInfo();
            }
        }

        // 個別スライドの更新
        updateSlide(container, index) {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            
            // スケール計算
            const scale = this.calculateScale(width);
            
            // CSS変数を更新
            container.style.setProperty('--computed-scale', scale);
            container.style.setProperty('--slide-actual-width', `${width}px`);
            container.style.setProperty('--slide-actual-height', `${height}px`);
            
            // デバッグ情報を保存
            this.debugInfo[`slide-${index + 1}`] = {
                width: Math.round(width),
                height: Math.round(height),
                scale: scale.toFixed(3),
                aspectRatio: (width / height).toFixed(2)
            };
            
            // データ属性を更新（デバッグ用）
            if (CONFIG.debugMode) {
                container.setAttribute('data-slide-size', 
                    `${Math.round(width)}×${Math.round(height)} | Scale: ${scale.toFixed(2)}`);
            }
        }

        // スケール計算
        calculateScale(currentWidth) {
            // 基本スケール
            let scale = currentWidth / CONFIG.baseWidth;
            
            // 最小・最大制限
            scale = Math.max(CONFIG.minScale, Math.min(CONFIG.maxScale, scale));
            
            return scale;
        }

        // 実際のフォントサイズを計算
        calculateFontSize(baseSize, scale) {
            const minSize = baseSize * CONFIG.minScale;
            const maxSize = baseSize * CONFIG.maxScale;
            const targetSize = baseSize * scale;
            
            // clamp相当の処理
            return Math.max(minSize, Math.min(maxSize, targetSize));
        }

        // デバッグモードを有効化
        enableDebugMode() {
            document.body.classList.add('debug-mode');
            
            // デバッグパネルを作成
            this.createDebugPanel();
            
            // キーボードショートカット
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                    this.toggleDebugPanel();
                }
            });
        }

        // デバッグパネルの作成
        createDebugPanel() {
            const panel = document.createElement('div');
            panel.id = 'font-debug-panel';
            panel.innerHTML = `
                <div style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    font-family: monospace;
                    font-size: 12px;
                    max-width: 400px;
                    z-index: 10000;
                    display: none;
                ">
                    <h3 style="margin: 0 0 10px 0; font-size: 14px;">
                        🔍 Font Calculator Debug
                    </h3>
                    <div id="debug-content"></div>
                    <hr style="margin: 10px 0; opacity: 0.3;">
                    <div style="opacity: 0.7;">
                        Press Ctrl+Shift+D to toggle
                    </div>
                </div>
            `;
            document.body.appendChild(panel);
        }

        // デバッグ情報の更新
        updateDebugInfo() {
            const debugContent = document.getElementById('debug-content');
            if (!debugContent) return;

            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
                available: window.innerWidth - CONFIG.sidebarWidth
            };

            let html = `
                <div style="margin-bottom: 10px;">
                    <strong>ビューポート:</strong><br>
                    ${viewport.width} × ${viewport.height}px<br>
                    利用可能幅: ${viewport.available}px
                </div>
            `;

            // 各スライドの情報
            Object.entries(this.debugInfo).forEach(([slideId, info]) => {
                html += `
                    <div style="margin-bottom: 10px;">
                        <strong>${slideId}:</strong><br>
                        サイズ: ${info.width} × ${info.height}px<br>
                        スケール: ${info.scale}<br>
                        アスペクト比: ${info.aspectRatio}
                    </div>
                `;
            });

            // フォントサイズ計算例
            const currentScale = this.debugInfo['slide-1']?.scale || 1;
            html += `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.3);">
                    <strong>フォントサイズ (現在のスケール: ${currentScale}):</strong><br>
            `;

            Object.entries(BASE_SIZES).forEach(([element, baseSize]) => {
                const calculated = this.calculateFontSize(baseSize, parseFloat(currentScale));
                html += `${element}: ${calculated.toFixed(1)}px (基準: ${baseSize}px)<br>`;
            });

            html += '</div>';

            debugContent.innerHTML = html;
        }

        // デバッグパネルの表示切替
        toggleDebugPanel() {
            const panel = document.querySelector('#font-debug-panel > div');
            if (panel) {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
        }

        // フォントサイズの検証
        validateFontSizes() {
            const results = [];
            
            this.slideContainers.forEach((container, index) => {
                const elements = {
                    h1: container.querySelectorAll('h1, .title'),
                    h2: container.querySelectorAll('h2, .section-title'),
                    h3: container.querySelectorAll('h3'),
                    h4: container.querySelectorAll('h4'),
                    p: container.querySelectorAll('p'),
                    li: container.querySelectorAll('li')
                };

                Object.entries(elements).forEach(([tag, nodeList]) => {
                    nodeList.forEach(elem => {
                        const computed = window.getComputedStyle(elem);
                        const fontSize = parseFloat(computed.fontSize);
                        
                        results.push({
                            slide: index + 1,
                            element: tag,
                            fontSize: fontSize.toFixed(1),
                            expected: BASE_SIZES[tag] || BASE_SIZES.text
                        });
                    });
                });
            });

            return results;
        }

        // クリーンアップ
        destroy() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
            
            clearTimeout(this.updateTimer);
            
            const debugPanel = document.getElementById('font-debug-panel');
            if (debugPanel) {
                debugPanel.remove();
            }
        }
    }

    // グローバルAPIとして公開
    window.GenSpaFontCalculator = FontCalculator;

    // 自動初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const calculator = new FontCalculator();
            calculator.init();
            window.fontCalculator = calculator; // デバッグ用
        });
    } else {
        const calculator = new FontCalculator();
        calculator.init();
        window.fontCalculator = calculator; // デバッグ用
    }

})();