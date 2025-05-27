/**
 * API設定管理とデバッグログ表示機能
 */

// APIキー管理クラス
class ApiKeyManager {
    constructor() {
        this.storageKey = 'anthropic_api_key_encrypted';
        this.debugLogger = new DebugLogger();
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
        this.debugLogger.log('✅ APIキーが安全に保存されました', 'success');
    }

    load() {
        const encrypted = localStorage.getItem(this.storageKey);
        if (!encrypted) {
            this.debugLogger.log('⚠️ APIキーが設定されていません', 'warning');
            return null;
        }
        const decrypted = this.decrypt(encrypted);
        if (decrypted) {
            this.debugLogger.log('✅ APIキーが読み込まれました', 'success');
        }
        return decrypted;
    }

    remove() {
        localStorage.removeItem(this.storageKey);
        this.debugLogger.log('🗑️ APIキーが削除されました', 'info');
    }

    exists() {
        return localStorage.getItem(this.storageKey) !== null;
    }
}

// デバッグログ表示クラス
class DebugLogger {
    constructor() {
        this.messages = [];
        this.maxMessages = 20; // メッセージ数を減らしてパフォーマンス改善
        this.currentStreamInterval = null; // ストリーミング管理
        this.createDebugWindow();
    }

    createDebugWindow() {
        // デバッグウィンドウがすでに存在する場合は作成しない
        if (document.getElementById('debug-window')) return;

        const debugWindow = document.createElement('div');
        debugWindow.id = 'debug-window';
        debugWindow.className = 'fixed bottom-0 left-0 right-0 bg-black text-yellow-300 font-mono text-xs p-4 max-h-48 overflow-y-auto';
        debugWindow.style.fontFamily = 'Consolas, Monaco, monospace';
        
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-2 text-green-400';
        header.innerHTML = `
            <span class="font-bold">🖥️ システム状態モニター</span>
            <button id="toggle-debug" class="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">
                最小化
            </button>
        `;
        
        const content = document.createElement('div');
        content.id = 'debug-content';
        content.className = 'space-y-1';
        
        debugWindow.appendChild(header);
        debugWindow.appendChild(content);
        document.body.appendChild(debugWindow);

        // 最小化ボタンの処理
        document.getElementById('toggle-debug').addEventListener('click', () => {
            const isMinimized = debugWindow.classList.toggle('minimized');
            if (isMinimized) {
                debugWindow.style.height = '40px';
                content.style.display = 'none';
                document.getElementById('toggle-debug').textContent = '展開';
            } else {
                debugWindow.style.height = '';
                content.style.display = 'block';
                document.getElementById('toggle-debug').textContent = '最小化';
            }
        });
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString('ja-JP');
        const logEntry = {
            timestamp,
            message,
            type
        };
        
        this.messages.push(logEntry);
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }
        
        this.render();
    }

    render() {
        const content = document.getElementById('debug-content');
        if (!content) return;

        content.innerHTML = this.messages.map(entry => {
            let color = 'text-yellow-300';
            if (entry.type === 'success') color = 'text-green-400';
            if (entry.type === 'error') color = 'text-red-400';
            if (entry.type === 'warning') color = 'text-orange-400';
            
            return `<div class="${color}">[${entry.timestamp}] ${entry.message}</div>`;
        }).join('');
        
        // 自動スクロール
        content.scrollTop = content.scrollHeight;
    }

    streamText(text, callback) {
        // 既存のストリーミングをクリア
        if (this.currentStreamInterval) {
            clearInterval(this.currentStreamInterval);
        }
        
        let index = 0;
        this.currentStreamInterval = setInterval(() => {
            if (index < text.length) {
                this.log(text.substring(0, index + 1), 'info');
                index++;
            } else {
                clearInterval(this.currentStreamInterval);
                this.currentStreamInterval = null;
                if (callback) callback();
            }
        }, 50);
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    const apiKeyManager = new ApiKeyManager();
    const debugLogger = apiKeyManager.debugLogger;

    // 初期状態をログ
    debugLogger.log('🚀 システムが起動しました', 'success');
    debugLogger.log('📡 API通信の準備を開始しています...', 'info');

    // APIキーの存在チェック
    setTimeout(() => {
        if (apiKeyManager.exists()) {
            debugLogger.log('✨ APIキーが検出されました', 'success');
            debugLogger.log('🎉 準備完了！HTMLの生成が可能です', 'success');
        } else {
            debugLogger.log('⚠️ APIキーが設定されていません', 'warning');
            debugLogger.log('💡 右上の設定ボタンからAPIキーを設定してください', 'info');
        }
    }, 1000);

    // 設定モーダルの処理
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const apiKeyInput = document.getElementById('api-key-input');
    const toggleApiKey = document.getElementById('toggle-api-key');
    const validateBtn = document.getElementById('validate-api-key');
    const saveBtn = document.getElementById('save-api-key');
    const statusDiv = document.getElementById('api-key-status');
    const statusText = statusDiv.querySelector('.status-text');

    // 設定ボタンクリック
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (settingsModal) {
                // hiddenクラスを削除し、display:flexを設定
                settingsModal.classList.remove('hidden');
                settingsModal.style.display = 'flex';
                debugLogger.log('⚙️ 設定画面を開きました', 'info');
                
                // 既存のAPIキーを読み込み
                const existingKey = apiKeyManager.load();
                if (existingKey && apiKeyInput) {
                    apiKeyInput.value = existingKey;
                }
            } else {
                debugLogger.log('❌ 設定モーダルが見つかりません', 'error');
            }
        });
    } else {
        debugLogger.log('❌ 設定ボタンが見つかりません', 'error');
    }

    // モーダルを閉じる
    if (closeSettings) {
        closeSettings.addEventListener('click', () => {
            settingsModal.style.display = 'none';
            settingsModal.classList.add('hidden');
            debugLogger.log('⚙️ 設定画面を閉じました', 'info');
        });
    }

    // モーダル外クリックで閉じる
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.style.display = 'none';
                settingsModal.classList.add('hidden');
            }
        });
    }

    // APIキーの表示/非表示切り替え
    if (toggleApiKey) {
        toggleApiKey.addEventListener('click', () => {
            const input = apiKeyInput;
            const icon = toggleApiKey.querySelector('.material-icons');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility_off';
            } else {
                input.type = 'password';
                icon.textContent = 'visibility';
            }
        });
    }

    // APIキー検証
    if (validateBtn) {
        validateBtn.addEventListener('click', async () => {
            const apiKey = apiKeyInput.value.trim();
            
            if (!apiKey) {
                showStatus('APIキーを入力してください', 'error');
                return;
            }

            debugLogger.log('🔍 APIキーの検証を開始します...', 'info');
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
                    showStatus('✅ APIキーは有効です', 'success');
                    debugLogger.log('✅ APIキーの検証に成功しました', 'success');
                } else {
                    showStatus(`❌ ${result.error}`, 'error');
                    debugLogger.log(`❌ APIキーの検証に失敗: ${result.error}`, 'error');
                }
            } catch (error) {
                showStatus('検証中にエラーが発生しました', 'error');
                debugLogger.log('❌ APIキーの検証中にエラーが発生しました', 'error');
            }
        });
    }

    // APIキー保存
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const apiKey = apiKeyInput.value.trim();
            
            if (!apiKey) {
                showStatus('APIキーを入力してください', 'error');
                return;
            }
            
            if (!apiKey.startsWith('sk-')) {
                showStatus('無効なAPIキー形式です', 'error');
                return;
            }
            
            apiKeyManager.save(apiKey);
            showStatus('✅ APIキーを保存しました', 'success');
            
            // 1秒後にモーダルを閉じる
            setTimeout(() => {
                settingsModal.style.display = 'none';
                settingsModal.classList.add('hidden');
                
                // 保存後の確認メッセージをストリーミング表示
                debugLogger.streamText('🎊 APIキーが正常に保存されました！システムの準備が整いました。', () => {
                    debugLogger.log('✨ HTMLジェネレーターをお使いいただけます', 'success');
                });
            }, 1000);
        });
    }

    // ステータス表示関数
    function showStatus(message, type) {
        statusDiv.classList.remove('hidden', 'bg-green-100', 'bg-red-100', 'bg-blue-100', 
                                    'text-green-700', 'text-red-700', 'text-blue-700',
                                    'dark:bg-green-900/30', 'dark:bg-red-900/30', 'dark:bg-blue-900/30',
                                    'dark:text-green-400', 'dark:text-red-400', 'dark:text-blue-400');
        
        if (type === 'success') {
            statusDiv.classList.add('bg-green-100', 'text-green-700', 'dark:bg-green-900/30', 'dark:text-green-400');
        } else if (type === 'error') {
            statusDiv.classList.add('bg-red-100', 'text-red-700', 'dark:bg-red-900/30', 'dark:text-red-400');
        } else {
            statusDiv.classList.add('bg-blue-100', 'text-blue-700', 'dark:bg-blue-900/30', 'dark:text-blue-400');
        }
        
        statusText.textContent = message;
    }

    // グローバル関数として公開（他のスクリプトから使用可能）
    window.apiKeyManager = apiKeyManager;
    window.debugLogger = debugLogger;
});