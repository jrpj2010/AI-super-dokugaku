// Gen-Spa Editor v1.0 - インライン編集・エクスポート機能

(function() {
    'use strict';

    // グローバル変数
    let isEditMode = false;
    let originalContent = {};
    let editHistory = [];
    let googleSlidesUrl = '';

    // 初期化
    function initEditor() {
        // 編集モードボタンを追加
        addEditButton();
        
        // PDFエクスポートボタンを追加
        addPdfButton();
        
        // Googleスライドエクスポートボタンを追加
        addGoogleSlidesButton();
        
        // localStorageから保存内容を復元
        restoreContent();
        
        // キーボードショートカット設定
        setupKeyboardShortcuts();
        
        // 自動保存機能
        setupAutoSave();
    }

    // 編集モードボタンの追加
    function addEditButton() {
        const nav = document.querySelector('nav');
        const editSection = document.createElement('div');
        editSection.className = 'edit-controls mt-6 pt-6 border-t border-gray-700';
        editSection.innerHTML = `
            <button id="edit-toggle" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2 transition-colors">
                <i class="fas fa-edit mr-2"></i>編集モード
            </button>
            <button id="save-changes" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-2 transition-colors hidden">
                <i class="fas fa-save mr-2"></i>変更を保存
            </button>
            <button id="discard-changes" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mb-2 transition-colors hidden">
                <i class="fas fa-times mr-2"></i>変更を破棄
            </button>
            <div class="text-xs text-gray-400 mt-2">
                <i class="fas fa-info-circle"></i> Ctrl+E で編集モード切替
            </div>
        `;
        nav.appendChild(editSection);

        // イベントリスナー設定
        document.getElementById('edit-toggle').addEventListener('click', toggleEditMode);
        document.getElementById('save-changes').addEventListener('click', saveChanges);
        document.getElementById('discard-changes').addEventListener('click', discardChanges);
    }

    // PDFエクスポートボタンの追加
    function addPdfButton() {
        const nav = document.querySelector('nav');
        const pdfSection = document.createElement('div');
        pdfSection.className = 'export-controls mt-4';
        pdfSection.innerHTML = `
            <button id="export-pdf" class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded mb-2 transition-colors">
                <i class="fas fa-file-pdf mr-2"></i>PDF出力
            </button>
        `;
        nav.appendChild(pdfSection);

        document.getElementById('export-pdf').addEventListener('click', exportToPdf);
    }

    // Googleスライドエクスポートボタンの追加
    function addGoogleSlidesButton() {
        const nav = document.querySelector('nav');
        const googleSection = document.createElement('div');
        googleSection.className = 'google-controls';
        googleSection.innerHTML = `
            <button id="export-google" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded mb-2 transition-colors">
                <i class="fab fa-google mr-2"></i>Googleスライドへ
            </button>
            <div id="google-progress" class="hidden mt-2">
                <div class="text-xs text-gray-400 mb-1">エクスポート中...</div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                    <div id="progress-bar" class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>
        `;
        nav.appendChild(googleSection);

        document.getElementById('export-google').addEventListener('click', exportToGoogleSlides);
    }

    // 編集モードの切り替え
    function toggleEditMode() {
        isEditMode = !isEditMode;
        const editToggle = document.getElementById('edit-toggle');
        const saveBtn = document.getElementById('save-changes');
        const discardBtn = document.getElementById('discard-changes');

        if (isEditMode) {
            // 編集モード開始
            editToggle.innerHTML = '<i class="fas fa-eye mr-2"></i>プレビューモード';
            editToggle.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            editToggle.classList.add('bg-gray-600', 'hover:bg-gray-700');
            saveBtn.classList.remove('hidden');
            discardBtn.classList.remove('hidden');
            
            enableEditing();
        } else {
            // 編集モード終了
            editToggle.innerHTML = '<i class="fas fa-edit mr-2"></i>編集モード';
            editToggle.classList.remove('bg-gray-600', 'hover:bg-gray-700');
            editToggle.classList.add('bg-blue-600', 'hover:bg-blue-700');
            saveBtn.classList.add('hidden');
            discardBtn.classList.add('hidden');
            
            disableEditing();
        }
    }

    // 編集を有効化
    function enableEditing() {
        const editableElements = document.querySelectorAll('h1, h2, h3, p, li, span:not(.page-number):not(.stat-number), div.text-gray-700');
        
        editableElements.forEach((elem, index) => {
            // 元のコンテンツを保存
            originalContent[index] = elem.innerHTML;
            
            // contenteditable属性を追加
            elem.setAttribute('contenteditable', 'true');
            elem.classList.add('editable-element');
            
            // 編集時のスタイル
            elem.addEventListener('focus', function() {
                this.classList.add('editing-active');
                showEditingToolbar(this);
            });
            
            elem.addEventListener('blur', function() {
                this.classList.remove('editing-active');
                // ツールバーを遅延して非表示（ボタンクリックを許可）
                setTimeout(() => hideEditingToolbar(), 200);
            });
            
            // 編集内容の追跡
            elem.addEventListener('input', function() {
                trackChange(index, this.innerHTML);
            });
            
            // キーボードショートカット
            elem.addEventListener('keydown', handleEditingShortcuts);
            
            // テキスト選択時にツールバーを表示
            elem.addEventListener('mouseup', function() {
                setTimeout(() => {
                    if (window.getSelection().toString().trim()) {
                        showEditingToolbar(this);
                    }
                }, 10);
            });
        });

        // 編集モード用のスタイルを追加
        addEditStyles();
        
        // 編集ツールバーを作成
        createEditingToolbar();
    }

    // 編集を無効化
    function disableEditing() {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        
        editableElements.forEach(elem => {
            elem.removeAttribute('contenteditable');
            elem.classList.remove('editable-element', 'editing-active');
            elem.removeEventListener('keydown', handleEditingShortcuts);
        });

        // 編集モード用のスタイルを削除
        removeEditStyles();
        
        // 編集ツールバーを削除
        removeEditingToolbar();
    }

    // 編集モード用スタイルの追加
    function addEditStyles() {
        const style = document.createElement('style');
        style.id = 'edit-mode-styles';
        style.textContent = `
            .editable-element {
                outline: 1px dashed #ddd;
                outline-offset: 2px;
                transition: all 0.2s ease;
            }
            .editable-element:hover {
                background-color: rgba(59, 130, 246, 0.05);
                outline-color: #3b82f6;
            }
            .editing-active {
                background-color: rgba(59, 130, 246, 0.1) !important;
                outline: 2px solid #3b82f6 !important;
                outline-offset: 2px;
            }
            
            /* 編集ツールバーのスタイル */
            #editing-toolbar {
                position: fixed;
                background: #1f2937;
                color: white;
                padding: 8px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: none;
                z-index: 1000;
                user-select: none;
            }
            
            #editing-toolbar button {
                background: transparent;
                border: none;
                color: white;
                padding: 6px 10px;
                margin: 0 2px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: background-color 0.2s;
            }
            
            #editing-toolbar button:hover {
                background-color: rgba(59, 130, 246, 0.5);
            }
            
            #editing-toolbar button.active {
                background-color: #3b82f6;
            }
            
            #editing-toolbar .separator {
                display: inline-block;
                width: 1px;
                height: 20px;
                background: #4b5563;
                margin: 0 8px;
                vertical-align: middle;
            }
        `;
        document.head.appendChild(style);
    }

    // 編集モード用スタイルの削除
    function removeEditStyles() {
        const style = document.getElementById('edit-mode-styles');
        if (style) style.remove();
    }

    // 変更を保存
    function saveChanges() {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        const savedContent = {};
        
        editableElements.forEach((elem, index) => {
            savedContent[index] = elem.innerHTML;
        });
        
        // localStorageに保存
        localStorage.setItem('genSpaContent', JSON.stringify(savedContent));
        localStorage.setItem('genSpaLastSaved', new Date().toISOString());
        
        // 成功メッセージ
        showNotification('変更を保存しました', 'success');
        
        // 編集モードを終了
        toggleEditMode();
    }

    // 変更を破棄
    function discardChanges() {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        
        editableElements.forEach((elem, index) => {
            if (originalContent[index]) {
                elem.innerHTML = originalContent[index];
            }
        });
        
        // 編集モードを終了
        toggleEditMode();
        
        showNotification('変更を破棄しました', 'info');
    }

    // localStorageから内容を復元
    function restoreContent() {
        const savedContent = localStorage.getItem('genSpaContent');
        if (!savedContent) return;
        
        const content = JSON.parse(savedContent);
        const elements = document.querySelectorAll('h1, h2, h3, p, li, span:not(.page-number):not(.stat-number), div.text-gray-700');
        
        elements.forEach((elem, index) => {
            if (content[index]) {
                elem.innerHTML = content[index];
            }
        });
        
        const lastSaved = localStorage.getItem('genSpaLastSaved');
        if (lastSaved) {
            console.log('最終保存:', new Date(lastSaved).toLocaleString());
        }
    }

    // PDF出力
    function exportToPdf() {
        // 印刷用スタイルを一時的に適用
        const printStyle = document.createElement('link');
        printStyle.rel = 'stylesheet';
        printStyle.href = './gen-spa-print.css';
        document.head.appendChild(printStyle);
        
        // 少し待ってから印刷ダイアログを開く
        setTimeout(() => {
            window.print();
            
            // 印刷後にスタイルを削除
            setTimeout(() => {
                printStyle.remove();
            }, 1000);
        }, 500);
    }

    // Googleスライドへのエクスポート
    async function exportToGoogleSlides() {
        const progressDiv = document.getElementById('google-progress');
        const progressBar = document.getElementById('progress-bar');
        const exportBtn = document.getElementById('export-google');
        
        // UI更新
        progressDiv.classList.remove('hidden');
        exportBtn.disabled = true;
        exportBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        try {
            // Google API Clientの初期化確認
            if (typeof gapi === 'undefined') {
                throw new Error('Google API Client が読み込まれていません');
            }
            
            // 環境判定
            const isDevelopment = window.location.hostname === 'localhost' || 
                                window.location.hostname === '127.0.0.1' ||
                                window.location.protocol === 'file:';
            
            if (isDevelopment) {
                // 開発環境：.envファイルのAPIキーを使用
                showNotification('開発環境モード: APIキーを使用してエクスポート', 'info');
                await exportWithApiKey();
            } else {
                // 本番環境：OAuth認証フロー
                showNotification('認証が必要です', 'info');
                
                // Google認証の初期化
                await window.GoogleAuthConfig.initGoogleApiClient();
                
                // サインイン確認
                if (!window.GoogleAuthConfig.isSignedIn()) {
                    const signedIn = await window.GoogleAuthConfig.signIn();
                    if (!signedIn) {
                        throw new Error('Google認証がキャンセルされました');
                    }
                }
                
                await exportWithOAuth();
            }
            
        } catch (error) {
            showNotification('エクスポートに失敗しました: ' + error.message, 'error');
        } finally {
            // UI復元
            progressDiv.classList.add('hidden');
            exportBtn.disabled = false;
            exportBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            progressBar.style.width = '0%';
        }
    }
    
    // APIキーを使用したエクスポート（開発環境用）
    async function exportWithApiKey() {
        const slides = collectSlideData();
        updateProgress(document.getElementById('progress-bar'), 20);
        
        try {
            // Google APIの初期化
            await loadGoogleApi();
            
            // APIキーで認証
            gapi.client.setApiKey('AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI'); // Gemini APIキーを使用
            
            await gapi.client.load('slides', 'v1');
            
            updateProgress(document.getElementById('progress-bar'), 40);
            
            // プレゼンテーション作成
            const createResponse = await gapi.client.slides.presentations.create({
                title: document.title || 'Gen-Spa エクスポート'
            });
            
            const presentationId = createResponse.result.presentationId;
            updateProgress(document.getElementById('progress-bar'), 60);
            
            // スライドを追加
            const requests = [];
            slides.forEach((slide, index) => {
                const slideRequests = createSlideRequests(slide, index);
                requests.push(...slideRequests);
            });
            
            // バッチ更新
            await gapi.client.slides.presentations.batchUpdate({
                presentationId: presentationId,
                requests: requests
            });
            
            updateProgress(document.getElementById('progress-bar'), 100);
            
            googleSlidesUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;
            showNotification('Googleスライドへのエクスポートが完了しました！', 'success');
            
            setTimeout(() => {
                window.open(googleSlidesUrl, '_blank');
            }, 1000);
            
        } catch (error) {
            console.error('Export error:', error);
            throw new Error('エクスポート中にエラーが発生しました: ' + error.message);
        }
    }
    
    // OAuth認証を使用したエクスポート（本番環境用）
    async function exportWithOAuth() {
        const slides = collectSlideData();
        updateProgress(document.getElementById('progress-bar'), 20);
        
        // Google Slides APIでプレゼンテーション作成
        const response = await gapi.client.slides.presentations.create({
            title: document.title || 'Gen-Spa エクスポート'
        });
        
        const presentationId = response.result.presentationId;
        
        // スライドを追加
        const requests = [];
        for (let i = 0; i < slides.length; i++) {
            const slideRequests = createSlideRequests(slides[i], i);
            requests.push(...slideRequests);
        }
        
        // バッチ更新
        await gapi.client.slides.presentations.batchUpdate({
            presentationId: presentationId,
            requests: requests
        });
        
        googleSlidesUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;
        showNotification('Googleスライドへのエクスポートが完了しました！', 'success');
        
        setTimeout(() => {
            window.open(googleSlidesUrl, '_blank');
        }, 1000);
    }
    
    // Google APIの読み込み
    function loadGoogleApi() {
        return new Promise((resolve, reject) => {
            if (typeof gapi !== 'undefined' && gapi.client) {
                resolve();
                return;
            }
            
            gapi.load('client', () => {
                gapi.client.init({
                    // APIキーは後で設定
                }).then(() => {
                    resolve();
                }).catch(reject);
            });
        });
    }
    
    // スライドリクエストの作成
    function createSlideRequests(slideData, index) {
        const requests = [];
        const slideId = `slide_${index}`;
        
        // スライド作成
        requests.push({
            createSlide: {
                objectId: slideId,
                slideLayoutReference: {
                    predefinedLayout: 'BLANK'
                }
            }
        });
        
        // タイトル追加
        if (slideData.title) {
            requests.push({
                createShape: {
                    objectId: `${slideId}_title`,
                    shapeType: 'TEXT_BOX',
                    elementProperties: {
                        pageObjectId: slideId,
                        size: {
                            width: { magnitude: 720, unit: 'PT' },
                            height: { magnitude: 50, unit: 'PT' }
                        },
                        transform: {
                            scaleX: 1,
                            scaleY: 1,
                            translateX: 0,
                            translateY: 20,
                            unit: 'PT'
                        }
                    }
                }
            });
            
            requests.push({
                insertText: {
                    objectId: `${slideId}_title`,
                    text: slideData.title
                }
            });
        }
        
        // コンテンツを解析して追加（簡略化された実装）
        // 実際にはHTMLをパースして適切な要素を作成する必要がある
        
        return requests;
    }

    // スライドデータの収集
    function collectSlideData() {
        const slides = document.querySelectorAll('section.slide-container');
        const slideData = [];
        
        slides.forEach((slide, index) => {
            const title = slide.querySelector('h1, h2')?.textContent || `スライド ${index + 1}`;
            const content = slide.innerHTML;
            const charts = slide.querySelectorAll('canvas');
            
            slideData.push({
                index: index + 1,
                title: title,
                content: content,
                hasCharts: charts.length > 0,
                chartCount: charts.length
            });
        });
        
        return slideData;
    }

    // エクスポート処理のシミュレーション（削除予定）
    function simulateSlideExport(index, total) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`スライド ${index + 1}/${total} をエクスポート中...`);
                resolve();
            }, 300);
        });
    }

    // 進捗バーの更新
    function updateProgress(progressBar, percent) {
        progressBar.style.width = percent + '%';
    }

    // 通知の表示
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification fixed bottom-4 right-4 p-4 rounded-lg text-white z-50 transform transition-all duration-300 translate-y-full`;
        
        // タイプに応じた色設定
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            info: 'bg-blue-600',
            warning: 'bg-yellow-600'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // アニメーション
        setTimeout(() => {
            notification.classList.remove('translate-y-full');
        }, 100);
        
        // 自動削除
        setTimeout(() => {
            notification.classList.add('translate-y-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // キーボードショートカット
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+E または Cmd+E で編集モード切替
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                toggleEditMode();
            }
            
            // Ctrl+S または Cmd+S で保存
            if ((e.ctrlKey || e.metaKey) && e.key === 's' && isEditMode) {
                e.preventDefault();
                saveChanges();
            }
            
            // Ctrl+P または Cmd+P でPDF出力
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                exportToPdf();
            }
        });
    }

    // 自動保存
    function setupAutoSave() {
        let autoSaveTimer;
        
        document.addEventListener('input', (e) => {
            if (e.target.hasAttribute('contenteditable')) {
                clearTimeout(autoSaveTimer);
                autoSaveTimer = setTimeout(() => {
                    if (isEditMode) {
                        const editableElements = document.querySelectorAll('[contenteditable="true"]');
                        const tempContent = {};
                        
                        editableElements.forEach((elem, index) => {
                            tempContent[index] = elem.innerHTML;
                        });
                        
                        localStorage.setItem('genSpaTempContent', JSON.stringify(tempContent));
                        console.log('自動保存完了');
                    }
                }, 2000); // 2秒後に自動保存
            }
        });
    }

    // 変更の追跡
    function trackChange(index, newContent) {
        editHistory.push({
            index: index,
            content: newContent,
            timestamp: new Date().toISOString()
        });
        
        // 履歴は最新100件まで保持
        if (editHistory.length > 100) {
            editHistory = editHistory.slice(-100);
        }
    }
    
    // 編集ツールバーの作成
    function createEditingToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'editing-toolbar';
        toolbar.innerHTML = `
            <button data-command="bold" title="太字 (Ctrl+B)"><i class="fas fa-bold"></i></button>
            <button data-command="italic" title="斜体 (Ctrl+I)"><i class="fas fa-italic"></i></button>
            <button data-command="underline" title="下線 (Ctrl+U)"><i class="fas fa-underline"></i></button>
            <span class="separator"></span>
            <button data-command="h1" title="見出し1">H1</button>
            <button data-command="h2" title="見出し2">H2</button>
            <button data-command="h3" title="見出し3">H3</button>
            <span class="separator"></span>
            <button data-command="link" title="リンク (Ctrl+K)"><i class="fas fa-link"></i></button>
            <button data-command="removeFormat" title="書式をクリア"><i class="fas fa-eraser"></i></button>
        `;
        
        document.body.appendChild(toolbar);
        
        // ツールバーボタンのイベント設定
        toolbar.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault(); // フォーカスを失わないように
            });
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                executeCommand(command);
            });
        });
    }
    
    // 編集ツールバーを表示
    function showEditingToolbar(element) {
        const toolbar = document.getElementById('editing-toolbar');
        if (!toolbar) return;
        
        // 選択テキストがある場合のみ表示
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // ツールバーの位置を設定
        toolbar.style.display = 'block';
        toolbar.style.left = `${rect.left + (rect.width / 2) - (toolbar.offsetWidth / 2)}px`;
        toolbar.style.top = `${rect.top - toolbar.offsetHeight - 10}px`;
        
        // 画面外にはみ出ないよう調整
        const toolbarRect = toolbar.getBoundingClientRect();
        if (toolbarRect.left < 10) {
            toolbar.style.left = '10px';
        } else if (toolbarRect.right > window.innerWidth - 10) {
            toolbar.style.left = `${window.innerWidth - toolbar.offsetWidth - 10}px`;
        }
        
        // アクティブな書式をハイライト
        updateToolbarButtons();
    }
    
    // 編集ツールバーを非表示
    function hideEditingToolbar() {
        const toolbar = document.getElementById('editing-toolbar');
        if (toolbar && !toolbar.matches(':hover')) {
            toolbar.style.display = 'none';
        }
    }
    
    // ツールバーを削除
    function removeEditingToolbar() {
        const toolbar = document.getElementById('editing-toolbar');
        if (toolbar) {
            toolbar.remove();
        }
    }
    
    // コマンドを実行
    function executeCommand(command) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        
        switch (command) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'underline':
                document.execCommand('underline', false, null);
                break;
            case 'h1':
            case 'h2':
            case 'h3':
                document.execCommand('formatBlock', false, command);
                break;
            case 'link':
                const url = prompt('リンクURLを入力してください:');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
                break;
            case 'removeFormat':
                document.execCommand('removeFormat', false, null);
                break;
        }
        
        // ボタンの状態を更新
        updateToolbarButtons();
    }
    
    // ツールバーボタンの状態を更新
    function updateToolbarButtons() {
        const toolbar = document.getElementById('editing-toolbar');
        if (!toolbar) return;
        
        toolbar.querySelectorAll('button').forEach(btn => {
            const command = btn.dataset.command;
            let isActive = false;
            
            switch (command) {
                case 'bold':
                    isActive = document.queryCommandState('bold');
                    break;
                case 'italic':
                    isActive = document.queryCommandState('italic');
                    break;
                case 'underline':
                    isActive = document.queryCommandState('underline');
                    break;
            }
            
            if (isActive) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // 編集ショートカットの処理
    function handleEditingShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    executeCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    executeCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    executeCommand('underline');
                    break;
                case 'k':
                    e.preventDefault();
                    executeCommand('link');
                    break;
            }
        }
    }

    // DOMContentLoaded時に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEditor);
    } else {
        initEditor();
    }

})();