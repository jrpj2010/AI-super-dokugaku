/**
 * シンプルで確実に動作するAPI設定管理
 */

// デバッグウィンドウを作成（1行のみ）
function createDebugWindow() {
    if (document.getElementById('debug-window')) return;
    
    const debugWindow = document.createElement('div');
    debugWindow.id = 'debug-window';
    debugWindow.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #000; color: #FFFF00; font-family: monospace; font-size: 12px; padding: 5px 10px; height: 30px; line-height: 20px; border-top: 1px solid #333; z-index: 9998;';
    debugWindow.innerHTML = '<span style="color: #00FF00;">システムステータスモニター:</span> <span id="debug-content">[システム] 起動完了しました</span>';
    document.body.appendChild(debugWindow);
}

// API通信ログ出力
function logApiEvent(message) {
    const content = document.getElementById('debug-content');
    if (content) {
        const timestamp = new Date().toLocaleTimeString('ja-JP');
        content.textContent = `[${timestamp}] ${message}`;
    }
}

// APIキー管理
const apiKeyManager = {
    save: function(apiKey) {
        localStorage.setItem('anthropic_api_key', apiKey);
    },
    load: function() {
        return localStorage.getItem('anthropic_api_key');
    },
    exists: function() {
        return !!localStorage.getItem('anthropic_api_key');
    }
};

// 設定モーダルを表示
function showSettingsModal() {
    console.log('[DEBUG] showSettingsModal called');
    const modal = document.getElementById('settings-modal');
    
    if (!modal) {
        console.error('[ERROR] Settings modal not found');
        // 再度探す
        setTimeout(function() {
            const retryModal = document.getElementById('settings-modal');
            if (retryModal) {
                console.log('[DEBUG] Modal found on retry');
                retryModal.style.display = 'flex';
                retryModal.classList.remove('hidden');
            } else {
                alert('設定画面が見つかりません。ページを再読み込みしてください。');
            }
        }, 100);
        return;
    }
    
    // 確実に表示 - 複数の方法で試す
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    
    // z-indexを最前面に
    modal.style.zIndex = '999999';
    
    console.log('[DEBUG] Modal displayed, styles:', {
        display: modal.style.display,
        visibility: modal.style.visibility,
        classList: modal.classList.toString()
    });
    
    // APIキーを読み込み
    const apiKeyInput = document.getElementById('api-key-input');
    if (apiKeyInput) {
        const savedKey = apiKeyManager.load();
        if (savedKey) {
            apiKeyInput.value = savedKey;
        }
    }
}

// 設定モーダルを非表示
function hideSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
}

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    console.log('[DEBUG] Page loaded');
    
    // デバッグウィンドウ作成
    createDebugWindow();
    
    // 設定ボタンにイベントリスナーを追加（確実に）
    const settingsBtn = document.getElementById('settings-btn');
    console.log('[DEBUG] Settings button found:', !!settingsBtn);
    
    if (settingsBtn) {
        // クリックイベントを直接追加
        settingsBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[DEBUG] Settings button clicked (onclick)');
            showSettingsModal();
            return false;
        };
        
        // addEventListenerでも追加（二重の保険）
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[DEBUG] Settings button clicked (addEventListener)');
        }, true); // キャプチャフェーズで実行
        
        console.log('[DEBUG] Event listeners attached');
    } else {
        console.error('[ERROR] Settings button not found!');
        // 1秒後に再試行
        setTimeout(function() {
            const btn = document.getElementById('settings-btn');
            if (btn) {
                console.log('[DEBUG] Settings button found on retry');
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showSettingsModal();
                };
            }
        }, 1000);
    }
    
    // モーダルの閉じるボタン
    const closeBtn = document.getElementById('close-settings');
    if (closeBtn) {
        closeBtn.onclick = function() {
            hideSettingsModal();
        };
    }
    
    // モーダル背景クリックで閉じる
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                hideSettingsModal();
            }
        };
    }
    
    // APIキー表示切り替え
    const toggleBtn = document.getElementById('toggle-api-key');
    const apiKeyInput = document.getElementById('api-key-input');
    if (toggleBtn && apiKeyInput) {
        toggleBtn.onclick = function() {
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
            } else {
                apiKeyInput.type = 'password';
            }
        };
    }
    
    // 検証ボタン
    const validateBtn = document.getElementById('validate-api-key');
    if (validateBtn) {
        validateBtn.onclick = async function() {
            const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
            if (!apiKey) {
                alert('APIキーを入力してください');
                return;
            }
            
            logApiEvent('[API通信] APIキー検証を開始しました');
            
            try {
                const response = await fetch('/validate-api-key', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({api_key: apiKey})
                });
                
                const result = await response.json();
                if (result.success) {
                    logApiEvent('[API通信] APIキーの検証に成功しました');
                    alert('APIキーは有効です');
                } else {
                    logApiEvent('[API通信] APIキーの検証に失敗しました');
                    alert('APIキーが無効です: ' + (result.error || ''));
                }
            } catch (error) {
                logApiEvent('[API通信] 検証中にエラーが発生しました');
                alert('エラーが発生しました');
            }
        };
    }
    
    // 保存ボタン
    const saveBtn = document.getElementById('save-api-key');
    if (saveBtn) {
        saveBtn.onclick = function() {
            const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
            if (!apiKey) {
                alert('APIキーを入力してください');
                return;
            }
            
            apiKeyManager.save(apiKey);
            alert('APIキーを保存しました');
            setTimeout(function() {
                hideSettingsModal();
            }, 1000);
        };
    }
});

// DOMContentLoadedでも設定（念のため）
document.addEventListener('DOMContentLoaded', function() {
    console.log('[DEBUG] DOMContentLoaded fired');
});

// グローバルに公開
window.apiKeyManager = apiKeyManager;
window.debugLogger = {logApiEvent: logApiEvent};