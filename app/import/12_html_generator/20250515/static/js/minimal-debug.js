// 最小限のデバッグウィンドウとAPI初期化スクリプト
(function() {
    'use strict';
    
    // デバッグウィンドウの初期化
    function initDebugWindow() {
        const debugWindow = document.createElement('div');
        debugWindow.id = 'debug-window';
        debugWindow.className = 'debug-window';
        debugWindow.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; height: 30px; background-color: #000000; color: #ffff00; font-family: monospace; font-size: 12px; border-top: 1px solid #333333; z-index: 9998; padding: 5px 10px; overflow: hidden;';
        debugWindow.innerHTML = '<span style="color: #ffff00;">DEBUG MODE:</span> <span id="debug-content" style="color: #ffff00;">[システム] 起動完了</span>';
        document.body.appendChild(debugWindow);
    }
    
    // APIイベントのログ関数（グローバルに公開）
    window.logApiEvent = function(message) {
        const content = document.getElementById('debug-content');
        if (content) {
            const timestamp = new Date().toLocaleTimeString('ja-JP');
            content.textContent = `[${timestamp}] ${message}`;
        }
    };
    
    // APIキーの状態をチェックして表示を更新
    function updateApiKeyStatus() {
        const apiKey = localStorage.getItem('anthropic_api_key');
        if (apiKey) {
            window.logApiEvent('[API] 接続準備完了 - いつでもHTML生成可能です');
        } else {
            window.logApiEvent('[システム] APIキー未設定 - 設定画面でAPIキーを入力してください');
        }
    }
    
    // DOMContentLoadedで初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initDebugWindow();
            updateApiKeyStatus();
        });
    } else {
        initDebugWindow();
        updateApiKeyStatus();
    }
    
    // localStorageの変更を監視
    window.addEventListener('storage', function(e) {
        if (e.key === 'anthropic_api_key') {
            updateApiKeyStatus();
        }
    });
})();