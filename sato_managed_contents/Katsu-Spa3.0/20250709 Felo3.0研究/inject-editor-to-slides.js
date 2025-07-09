// Feloスライドに編集機能を注入するスクリプト
// このスクリプトを実行すると、各スライドHTMLに編集機能が追加されます

const fs = require('fs');
const path = require('path');

const slidesDir = './felo-slides-reconstructed';

// 編集機能のJavaScriptコード
const editorScript = `
<script>
// Felo風インライン編集機能
(function() {
    // エディターツールバーのHTML
    const toolbarHTML = \`
    <div id="feloEditor" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: white;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10000;
        font-family: 'Noto Sans JP', sans-serif;
    ">
        <!-- フォント選択 -->
        <select id="fontSelector" style="
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            font-size: 14px;
            min-width: 180px;
            cursor: pointer;
        ">
            <option value="">デフォルトフォント</option>
            <option value="'Noto Sans JP', sans-serif">Noto Sans Japanese</option>
            <option value="'Noto Serif JP', serif">Noto Serif Japanese</option>
            <option value="'Noto Sans KR', sans-serif">Noto Sans Korean</option>
            <option value="'Nanum Gothic', sans-serif">나눔고딕 (Nanum Gothic)</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'STSong', '宋体', serif">宋体</option>
            <option value="'STHeiti', '黑体', sans-serif">黑体</option>
            <option value="'Microsoft JhengHei', sans-serif">正黑體</option>
            <option value="'PMingLiU', serif">新細明體</option>
        </select>
        
        <!-- フォントサイズ -->
        <select id="sizeSelector" style="
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            font-size: 14px;
            width: 80px;
            cursor: pointer;
        ">
            <option value="">サイズ</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="28">28</option>
            <option value="30">30</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="72">72</option>
        </select>
        
        <div style="width: 1px; height: 30px; background: #e0e0e0;"></div>
        
        <!-- テキストスタイル -->
        <button class="style-btn" data-action="bold" title="太字">
            <i class="fas fa-bold"></i>
        </button>
        <button class="style-btn" data-action="italic" title="斜体">
            <i class="fas fa-italic"></i>
        </button>
        <button class="style-btn" data-action="underline" title="下線">
            <i class="fas fa-underline"></i>
        </button>
        
        <div style="width: 1px; height: 30px; background: #e0e0e0;"></div>
        
        <!-- テキスト配置 -->
        <button class="style-btn" data-action="alignLeft" title="左揃え">
            <i class="fas fa-align-left"></i>
        </button>
        <button class="style-btn" data-action="alignCenter" title="中央揃え">
            <i class="fas fa-align-center"></i>
        </button>
        <button class="style-btn" data-action="alignRight" title="右揃え">
            <i class="fas fa-align-right"></i>
        </button>
        
        <div style="width: 1px; height: 30px; background: #e0e0e0;"></div>
        
        <!-- その他 -->
        <button class="style-btn" data-action="delete" title="削除">
            <i class="fas fa-trash"></i>
        </button>
        
        <!-- 閉じるボタン -->
        <button id="closeEditor" style="
            margin-left: auto;
            padding: 6px 12px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        ">
            エディターを閉じる
        </button>
    </div>
    \`;
    
    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = \`
        .style-btn {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            color: #333;
            transition: all 0.2s;
        }
        
        .style-btn:hover {
            background: #f5f5f5;
            border-color: #007BFF;
        }
        
        .style-btn.active {
            background: #007BFF;
            color: white;
            border-color: #007BFF;
        }
        
        .editable-hover {
            outline: 2px dashed #007BFF !important;
            outline-offset: 2px !important;
            cursor: text !important;
        }
        
        .editable-selected {
            outline: 2px solid #007BFF !important;
            outline-offset: 2px !important;
            background: rgba(0, 123, 255, 0.05) !important;
        }
        
        body.editor-mode {
            padding-top: 60px !important;
        }
        
        [contenteditable="true"]:focus {
            outline: 2px solid #007BFF !important;
            outline-offset: 2px !important;
        }
    \`;
    document.head.appendChild(style);
    
    let selectedElement = null;
    let editorEnabled = false;
    
    // エディター初期化
    function initEditor() {
        // ツールバーを追加
        document.body.insertAdjacentHTML('afterbegin', toolbarHTML);
        document.body.classList.add('editor-mode');
        
        // すべてのテキスト要素を編集可能にする
        const editableSelectors = 'h1, h2, h3, h4, h5, h6, p, span, li, td, th, div:not(#feloEditor)';
        document.querySelectorAll(editableSelectors).forEach(el => {
            // 空の要素やスクリプトを含む要素は除外
            if (el.textContent.trim() && !el.querySelector('script')) {
                el.setAttribute('contenteditable', 'true');
                el.classList.add('editable');
                
                // ホバー効果
                el.addEventListener('mouseenter', () => {
                    if (!el.classList.contains('editable-selected')) {
                        el.classList.add('editable-hover');
                    }
                });
                
                el.addEventListener('mouseleave', () => {
                    el.classList.remove('editable-hover');
                });
                
                // クリックで選択
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectElement(el);
                });
                
                // 編集時の処理
                el.addEventListener('input', () => {
                    console.log('Content changed:', el.textContent);
                });
            }
        });
        
        // イベントリスナー設定
        setupEventListeners();
        editorEnabled = true;
    }
    
    // 要素を選択
    function selectElement(el) {
        // 以前の選択を解除
        document.querySelectorAll('.editable-selected').forEach(e => {
            e.classList.remove('editable-selected');
        });
        
        selectedElement = el;
        el.classList.add('editable-selected');
        el.focus();
        
        // 現在のスタイルを反映
        updateToolbar();
    }
    
    // ツールバーの状態を更新
    function updateToolbar() {
        if (!selectedElement) return;
        
        const styles = window.getComputedStyle(selectedElement);
        
        // フォントサイズ
        const fontSize = parseInt(styles.fontSize);
        document.getElementById('sizeSelector').value = fontSize || '';
        
        // スタイルボタンの状態
        document.querySelector('[data-action="bold"]').classList.toggle('active', 
            styles.fontWeight === '700' || styles.fontWeight === 'bold');
        document.querySelector('[data-action="italic"]').classList.toggle('active', 
            styles.fontStyle === 'italic');
        document.querySelector('[data-action="underline"]').classList.toggle('active', 
            styles.textDecoration.includes('underline'));
    }
    
    // イベントリスナー設定
    function setupEventListeners() {
        // フォント変更
        document.getElementById('fontSelector').addEventListener('change', (e) => {
            if (selectedElement && e.target.value) {
                selectedElement.style.fontFamily = e.target.value;
            }
        });
        
        // サイズ変更
        document.getElementById('sizeSelector').addEventListener('change', (e) => {
            if (selectedElement && e.target.value) {
                selectedElement.style.fontSize = e.target.value + 'px';
            }
        });
        
        // スタイルボタン
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (!selectedElement) return;
                
                switch(action) {
                    case 'bold':
                        const isBold = window.getComputedStyle(selectedElement).fontWeight === '700';
                        selectedElement.style.fontWeight = isBold ? 'normal' : 'bold';
                        break;
                    case 'italic':
                        const isItalic = window.getComputedStyle(selectedElement).fontStyle === 'italic';
                        selectedElement.style.fontStyle = isItalic ? 'normal' : 'italic';
                        break;
                    case 'underline':
                        const hasUnderline = selectedElement.style.textDecoration.includes('underline');
                        selectedElement.style.textDecoration = hasUnderline ? 'none' : 'underline';
                        break;
                    case 'alignLeft':
                        selectedElement.style.textAlign = 'left';
                        break;
                    case 'alignCenter':
                        selectedElement.style.textAlign = 'center';
                        break;
                    case 'alignRight':
                        selectedElement.style.textAlign = 'right';
                        break;
                    case 'delete':
                        if (confirm('この要素を削除しますか？')) {
                            selectedElement.remove();
                            selectedElement = null;
                        }
                        break;
                }
                updateToolbar();
            });
        });
        
        // エディターを閉じる
        document.getElementById('closeEditor').addEventListener('click', () => {
            if (confirm('編集内容を保存しますか？')) {
                saveChanges();
            }
            closeEditor();
        });
        
        // 背景クリックで選択解除
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.editable') && !e.target.closest('#feloEditor')) {
                document.querySelectorAll('.editable-selected').forEach(el => {
                    el.classList.remove('editable-selected');
                });
                selectedElement = null;
            }
        });
        
        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'b':
                        e.preventDefault();
                        document.querySelector('[data-action="bold"]').click();
                        break;
                    case 'i':
                        e.preventDefault();
                        document.querySelector('[data-action="italic"]').click();
                        break;
                    case 'u':
                        e.preventDefault();
                        document.querySelector('[data-action="underline"]').click();
                        break;
                    case 's':
                        e.preventDefault();
                        saveChanges();
                        break;
                }
            }
        });
    }
    
    // 変更を保存
    function saveChanges() {
        const htmlContent = document.documentElement.outerHTML;
        console.log('保存する内容:', htmlContent);
        alert('変更を保存しました（コンソールログを確認）');
    }
    
    // エディターを閉じる
    function closeEditor() {
        document.getElementById('feloEditor').remove();
        document.body.classList.remove('editor-mode');
        document.querySelectorAll('[contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.classList.remove('editable', 'editable-hover', 'editable-selected');
        });
        editorEnabled = false;
    }
    
    // 編集モード切り替えボタンを追加
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '編集モード';
    toggleButton.style.cssText = \`
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    \`;
    
    toggleButton.addEventListener('click', () => {
        if (editorEnabled) {
            closeEditor();
        } else {
            initEditor();
        }
    });
    
    document.body.appendChild(toggleButton);
})();
</script>
`;

// 各スライドファイルに編集機能を注入
function injectEditorToSlides() {
    const slideFiles = fs.readdirSync(slidesDir).filter(file => file.endsWith('.html') && file.startsWith('slide-'));
    
    slideFiles.forEach(file => {
        const filePath = path.join(slidesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // すでに編集機能が追加されているかチェック
        if (content.includes('feloEditor')) {
            console.log(`⏭️  ${file} - すでに編集機能が追加されています`);
            return;
        }
        
        // </body>タグの前に編集機能のスクリプトを挿入
        content = content.replace('</body>', `${editorScript}\n</body>`);
        
        // Font Awesomeが含まれていない場合は追加
        if (!content.includes('font-awesome')) {
            content = content.replace('</head>', 
                '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">\n</head>');
        }
        
        // ファイルを保存
        fs.writeFileSync(filePath, content);
        console.log(`✅ ${file} - 編集機能を追加しました`);
    });
    
    console.log('\n✨ すべてのスライドに編集機能を追加しました！');
    console.log('💡 各スライドを開いて、右下の「編集モード」ボタンをクリックしてください');
}

// 実行
injectEditorToSlides();