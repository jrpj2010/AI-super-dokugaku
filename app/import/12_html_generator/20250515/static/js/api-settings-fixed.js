/**
 * API設定管理とデバッグログ表示機能（修正版）
 * - デバッグウィンドウはAPI通信時のみ反応
 * - 設定ボタンが確実に動作
 * - 絵文字を削除し、日本語のみ使用
 */

// APIキー管理クラス
class ApiKeyManager {
    constructor() {
        this.storageKey = 'anthropic_api_key_encrypted';
    }

    // 簡易暗号化（本番環境ではより強力な暗号化を推奨）
    encrypt(text) {
        return btoa(encodeURIComponent(text));
    }

    decrypt(text) {
        try {
            return decodeURIComponent(atob(text));
        } catch {
            return null;
        }
    }

    save(apiKey) {
        const encrypted = this.encrypt(apiKey);
        localStorage.setItem(this.storageKey, encrypted);
    }

    load() {
        const encrypted = localStorage.getItem(this.storageKey);
        if (!encrypted) return null;
        return this.decrypt(encrypted);
    }

    remove() {
        localStorage.removeItem(this.storageKey);
    }

    exists() {
        return localStorage.getItem(this.storageKey) !== null;
    }
}

// デバッグログ表示クラス（API通信専用）
class DebugLogger {
    constructor() {
        this.createDebugWindow();
    }

    createDebugWindow() {
        // デバッグウィンドウがすでに存在する場合は作成しない
        if (document.getElementById('debug-window')) return;

        const debugWindow = document.createElement('div');
        debugWindow.id = 'debug-window';
        debugWindow.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #000; color: #FFFF00; font-family: monospace; font-size: 12px; padding: 5px 10px; height: 30px; line-height: 20px; border-top: 1px solid #333;">
                <span style="color: #00FF00;">システムステータスモニター:</span>
                <span id="debug-content">[システム] 起動完了しました</span>
            </div>
        `;
        document.body.appendChild(debugWindow);
    }

    // API通信ログのみ表示（1行のみ）
    logApiEvent(message) {
        const content = document.getElementById('debug-content');
        if (!content) return;

        const timestamp = new Date().toLocaleTimeString('ja-JP');
        content.textContent = `[${timestamp}] ${message}`;
    }
}

// グローバルインスタンス
const apiKeyManager = new ApiKeyManager();
const debugLogger = new DebugLogger();

// 初期化（DOMContentLoaded）
document.addEventListener('DOMContentLoaded', function() {
    console.log('[DEBUG] DOMContentLoaded fired');
    
    // 初期チェック（デバッグログには出力しない）
    const hasApiKey = apiKeyManager.exists();
    console.log('[DEBUG] API Key exists:', hasApiKey);

    // 設定ボタンのイベントリスナー設定
    setupSettingsButton();
    
    // 設定モーダルの初期化
    setupSettingsModal();
});

// 設定ボタンのセットアップ
function setupSettingsButton() {
    // 少し遅延させて確実に要素を取得
    setTimeout(() => {
        const settingsBtn = document.getElementById('settings-btn');
        console.log('[DEBUG] Settings button found:', !!settingsBtn);
        
        if (settingsBtn) {
            // 既存のリスナーを削除
            const newBtn = settingsBtn.cloneNode(true);
            settingsBtn.parentNode.replaceChild(newBtn, settingsBtn);
            
            // 新しいリスナーを追加
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('[DEBUG] Settings button clicked');
                showSettingsModal();
            });
        } else {
            console.error('[ERROR] Settings button not found in DOM');
        }
    }, 100);
}

// 設定モーダルを表示
function showSettingsModal() {
    const modal = document.getElementById('settings-modal');
    console.log('[DEBUG] Modal found:', !!modal);
    
    if (modal) {
        // 確実に表示
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.style.zIndex = '10000';
        
        // 既存のAPIキーを読み込み
        const apiKeyInput = document.getElementById('api-key-input');
        if (apiKeyInput) {
            const existingKey = apiKeyManager.load();
            if (existingKey) {
                apiKeyInput.value = existingKey;
            }
        }
        
        console.log('[DEBUG] Modal display set to flex');
    } else {
        console.error('[ERROR] Settings modal not found');
        alert('設定画面の表示に失敗しました。ページを再読み込みしてください。');
    }
}

// 設定モーダルの初期化
function setupSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) {
        console.error('[ERROR] Settings modal not found during setup');
        return;
    }
    
    // 閉じるボタン
    const closeBtn = document.getElementById('close-settings');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideSettingsModal();
        });
    }
    
    // モーダル背景クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideSettingsModal();
        }
    });
    
    // APIキー表示切り替え
    const toggleBtn = document.getElementById('toggle-api-key');
    const apiKeyInput = document.getElementById('api-key-input');
    if (toggleBtn && apiKeyInput) {
        toggleBtn.addEventListener('click', function() {
            const icon = toggleBtn.querySelector('.material-icons');
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
                if (icon) icon.textContent = 'visibility_off';
            } else {
                apiKeyInput.type = 'password';
                if (icon) icon.textContent = 'visibility';
            }
        });
    }
    
    // 検証ボタン
    const validateBtn = document.getElementById('validate-api-key');
    if (validateBtn) {
        validateBtn.addEventListener('click', validateApiKey);
    }
    
    // 保存ボタン
    const saveBtn = document.getElementById('save-api-key');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveApiKey);
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

// APIキー検証
async function validateApiKey() {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    
    if (!apiKey) {
        showStatus('APIキーを入力してください', 'error');
        return;
    }
    
    // API通信開始をログ
    debugLogger.logApiEvent('[API通信] APIキー検証を開始しました');
    showStatus('検証中...', 'info');
    
    try {
        const response = await fetch('/validate-api-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ api_key: apiKey })
        });
        
        const result = await response.json();
        
        if (result.success) {
            debugLogger.logApiEvent('[API通信] APIキーの検証に成功しました');
            showStatus('APIキーは有効です', 'success');
        } else {
            debugLogger.logApiEvent('[API通信] APIキーの検証に失敗しました');
            showStatus(result.error || 'APIキーが無効です', 'error');
        }
    } catch (error) {
        debugLogger.logApiEvent('[API通信] APIキー検証中にエラーが発生しました');
        showStatus('検証中にエラーが発生しました', 'error');
        console.error('[ERROR]', error);
    }
}

// APIキー保存
function saveApiKey() {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    
    if (!apiKey) {
        showStatus('APIキーを入力してください', 'error');
        return;
    }
    
    if (!apiKey.startsWith('sk-')) {
        showStatus('無効なAPIキー形式です', 'error');
        return;
    }
    
    apiKeyManager.save(apiKey);
    showStatus('APIキーを保存しました', 'success');
    
    // 1秒後にモーダルを閉じる
    setTimeout(() => {
        hideSettingsModal();
    }, 1000);
}

// ステータス表示
function showStatus(message, type) {
    const statusDiv = document.getElementById('api-key-status');
    const statusText = statusDiv ? statusDiv.querySelector('.status-text') : null;
    
    if (!statusDiv || !statusText) return;
    
    statusDiv.classList.remove('hidden');
    statusText.textContent = message;
    
    // スタイルリセット
    statusDiv.className = statusDiv.className.replace(/bg-\w+-\d+/g, '').replace(/text-\w+-\d+/g, '');
    
    // タイプに応じたスタイル適用
    if (type === 'success') {
        statusDiv.classList.add('bg-green-100', 'text-green-700');
    } else if (type === 'error') {
        statusDiv.classList.add('bg-red-100', 'text-red-700');
    } else {
        statusDiv.classList.add('bg-blue-100', 'text-blue-700');
    }
}

// グローバル公開（他のスクリプトから使用可能）
window.apiKeyManager = apiKeyManager;
window.debugLogger = debugLogger;