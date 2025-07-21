// Tipsデータを格納する配列
let tipsData = [];
let currentTipIndex = 0;

// 実際に存在するファイルのリスト（フォルダ別に整理）
const existingFiles = [
    // 初級（13個）
    '01_beginner/01_beginner_organize-thoughts.json',
    '01_beginner/02_kyoko_beginner_web-summary.json',
    '01_beginner/03_tatsuya_beginner_personalized-news-report.json',
    '01_beginner/04_advanced_ai-research-agent.json',
    '01_beginner/05_tatsuya_beginner_gemini-in-workspace.json',
    '01_beginner/06_kyoko_intermediate_copilot-coaching.json',
    '01_beginner/07_kyoko_beginner_simplification.json',
    '01_beginner/08_tatsuya_beginner_word-to-powerpoint.json',
    '01_beginner/09_kyoko_advanced_copilot-illustration.json',
    '01_beginner/10_tatsuya_beginner_voice-memo-structuring.json',
    '01_beginner/11_kyoko_beginner_gemini-wall-hitting.json',
    '01_beginner/12_tatsuya_beginner_copilot-notebook.json',
    '01_beginner/13_beginner_portfolio-site.json',
    
    // 中級（21個）
    '02_intermediate/14_intermediate_custom-learning-roadmap.json',
    '02_intermediate/15_beginner_backward-thinking.json',
    '02_intermediate/16_advanced_stumbling-prediction.json',
    '02_intermediate/17_intermediate_learning-style.json',
    '02_intermediate/18_intermediate_emotion-wave-analysis.json',
    '02_intermediate/19_beginner_time-reminder.json',
    '02_intermediate/20_beginner_listen-to-books.json',
    '02_intermediate/21_beginner_youtube-to-text.json',
    '02_intermediate/22_tatsuya_beginner_academic-paper-summary.json',
    '02_intermediate/23_kyoko_intermediate_notebooklm-self-learning.json',
    '02_intermediate/24_beginner_personalized-quiz.json',
    '02_intermediate/25_intermediate_exam-analysis.json',
    '02_intermediate/26_beginner_daily-reflection.json',
    '02_intermediate/27_intermediate_feynman-technique.json',
    '02_intermediate/28_beginner_ai-english-teacher.json',
    '02_intermediate/29_intermediate_business-english.json',
    '02_intermediate/30_intermediate_motivation-coach.json',
    '02_intermediate/31_beginner_digital-certificate.json',
    '02_intermediate/32_intermediate_gamification-progress.json',
    '02_intermediate/33_intermediate_weekly-report.json',
    '02_intermediate/34_advanced_learning-community.json',
    
    // 中級上（16個）
    '03_advanced/35_intermediate_concept-map.json',
    '03_advanced/36_tatsuya_intermediate_gemini-deep-research.json',
    '03_advanced/37_advanced_fact-opinion-separation.json',
    '03_advanced/38_tatsuya_intermediate_chain-of-thought.json',
    '03_advanced/39_tatsuya_beginner_devils-advocate.json',
    '03_advanced/40_advanced_devil-advocate.json',
    '03_advanced/41_intermediate_business-plan-validation.json',
    '03_advanced/42_advanced_analyze-thinking-bias.json',
    '03_advanced/43_advanced_voice-memo-research.json',
    '03_advanced/44_intermediate_metaphor-creation.json',
    '03_advanced/45_intermediate_visualize-physics.json',
    '03_advanced/46_tatsuya_advanced_notebooklm-knowledge-base.json',
    '03_advanced/47_intermediate_market-value-career.json',
    '03_advanced/48_tatsuya_advanced_future-career-strategy.json',
    '03_advanced/49_beginner_book-recommendation.json',
    '03_advanced/50_tatsuya_intermediate_ai-era-output-thinking.json'
];

// 画像ファイルのマッピングテーブル
// キー: JSONファイル名、値: { before: Before画像パス, after: After画像パス }
const imageMapping = {
    // 初級
    '01_beginner/01_beginner_organize-thoughts.json': {
        before: '01_beginner/01_beginner_organize-thoughts-01-Before.png',
        after: '01_beginner/01_beginner_organize-thoughts-02-After.png'
    },
    '01_beginner/02_kyoko_beginner_web-summary.json': {
        before: '01_beginner/02_kyoko_beginner_web-summary-01-Before.png',
        after: '01_beginner/02_kyoko_beginner_web-summary-02-After.png'
    },
    '01_beginner/03_tatsuya_beginner_personalized-news-report.json': {
        before: '01_beginner/03_tatsuya_beginner_personalized-news-report-01-Before.png',
        after: '01_beginner/03_tatsuya_beginner_personalized-news-report-02-After.png'
    },
    '01_beginner/04_advanced_ai-research-agent.json': {
        before: '01_beginner/04_advanced_ai-research-agent-01-Before.png',
        after: '01_beginner/04_advanced_ai-research-agent-02-After.png'
    },
    '01_beginner/05_tatsuya_beginner_gemini-in-workspace.json': {
        before: '01_beginner/05_tatsuya_beginner_gemini-in-workspace-01-Before.png',
        after: '01_beginner/05_tatsuya_beginner_gemini-in-workspace-02-After.png'
    },
    '01_beginner/06_kyoko_intermediate_copilot-coaching.json': {
        before: '01_beginner/06_kyoko_intermediate_copilot-coaching-01-Before.png',
        after: '01_beginner/06_kyoko_intermediate_copilot-coaching-02-After.png'
    },
    '01_beginner/07_kyoko_beginner_simplification.json': {
        before: '01_beginner/07_kyoko_beginner_simplification-01-Before.png',
        after: '01_beginner/07_kyoko_beginner_simplification-02-After.png'
    },
    '01_beginner/08_tatsuya_beginner_word-to-powerpoint.json': {
        before: '01_beginner/08_tatsuya_beginner_word-to-powerpoint-01-Before.png',
        after: '01_beginner/08_tatsuya_beginner_word-to-powerpoint-02-After.png'
    },
    '01_beginner/09_kyoko_advanced_copilot-illustration.json': {
        before: '01_beginner/09_kyoko_advanced_copilot-illustration-01-Before.png',
        after: '01_beginner/09_kyoko_advanced_copilot-illustration-02-After.png'
    },
    '01_beginner/10_tatsuya_beginner_voice-memo-structuring.json': {
        before: '01_beginner/10_tatsuya_beginner_voice-memo-structuring-01-Before.png',
        after: '01_beginner/10_tatsuya_beginner_voice-memo-structuring-02-After.png'
    },
    '01_beginner/11_kyoko_beginner_gemini-wall-hitting.json': {
        before: '01_beginner/11_kyoko_beginner_gemini-wall-hitting-01-Before.png',
        after: '01_beginner/11_kyoko_beginner_gemini-wall-hitting-02-After.png'
    },
    '01_beginner/12_tatsuya_beginner_copilot-notebook.json': {
        before: '01_beginner/12_tatsuya_beginner_copilot-notebook-01-Before.png',
        after: '01_beginner/12_tatsuya_beginner_copilot-notebook-02-After.png'
    },
    '01_beginner/13_beginner_portfolio-site.json': {
        before: '01_beginner/13_beginner_portfolio-site-01-Before.png',
        after: '01_beginner/13_beginner_portfolio-site-02-After.png'
    },
    
    // 中級
    '02_intermediate/14_intermediate_custom-learning-roadmap.json': {
        before: '02_intermediate/14_intermediate_custom-learning-roadmap-01-Before.png',
        after: '02_intermediate/14_intermediate_custom-learning-roadmap-02-After.png'
    },
    '02_intermediate/15_beginner_backward-thinking.json': {
        before: '02_intermediate/15_beginner_backward-thinking-01-Before.png',
        after: '02_intermediate/15_beginner_backward-thinking-02-After.png'
    },
    '02_intermediate/16_advanced_stumbling-prediction.json': {
        before: '02_intermediate/16_advanced_stumbling-prediction-01-Before.png',
        after: '02_intermediate/16_advanced_stumbling-prediction-02-After.png'
    },
    '02_intermediate/17_intermediate_learning-style.json': {
        before: '02_intermediate/17_intermediate_learning-style-01-Before.png',
        after: '02_intermediate/17_intermediate_learning-style-02-After.png'
    },
    '02_intermediate/18_intermediate_emotion-wave-analysis.json': {
        before: '02_intermediate/18_intermediate_emotion-wave-analysis-01-Before.png',
        after: '02_intermediate/18_intermediate_emotion-wave-analysis-02-After.png'
    },
    '02_intermediate/19_beginner_time-reminder.json': {
        before: '02_intermediate/19_beginner_time-reminder-01-Before.png',
        after: '02_intermediate/19_beginner_time-reminder-02-After.png'
    },
    '02_intermediate/20_beginner_listen-to-books.json': {
        before: '02_intermediate/20_beginner_listen-to-books-01-Before.png',
        after: '02_intermediate/20_beginner_listen-to-books-02-After.png'
    },
    '02_intermediate/21_beginner_youtube-to-text.json': {
        before: '02_intermediate/21_beginner_youtube-to-text-01-Before.png',
        after: '02_intermediate/21_beginner_youtube-to-text-02-After.png'
    },
    '02_intermediate/22_tatsuya_beginner_academic-paper-summary.json': {
        before: '02_intermediate/22_tatsuya_beginner_academic-paper-summary-01-Before.png',
        after: '02_intermediate/22_tatsuya_beginner_academic-paper-summary-02-After.png'
    },
    '02_intermediate/23_kyoko_intermediate_notebooklm-self-learning.json': {
        before: '02_intermediate/23_kyoko_intermediate_notebooklm-self-learning-01-Before.png',
        after: '02_intermediate/23_kyoko_intermediate_notebooklm-self-learning-02-After.png'
    },
    '02_intermediate/24_beginner_personalized-quiz.json': {
        before: '02_intermediate/24_beginner_personalized-quiz-01-Before.png',
        after: '02_intermediate/24_beginner_personalized-quiz-02-After.png'
    },
    '02_intermediate/25_intermediate_exam-analysis.json': {
        before: '02_intermediate/25_intermediate_exam-analysis-01-Before.png',
        after: '02_intermediate/25_intermediate_exam-analysis-02-After.png'
    },
    '02_intermediate/26_beginner_daily-reflection.json': {
        before: '02_intermediate/26_beginner_daily-reflection-01-Before.png',
        after: '02_intermediate/26_beginner_daily-reflection-02-After.png'
    },
    '02_intermediate/27_intermediate_feynman-technique.json': {
        before: '02_intermediate/27_intermediate_feynman-technique-01-Before.png',
        after: '02_intermediate/27_intermediate_feynman-technique-02-After.png'
    },
    '02_intermediate/28_beginner_ai-english-teacher.json': {
        before: '02_intermediate/28_beginner_ai-english-teacher-01-Before.png',
        after: '02_intermediate/28_beginner_ai-english-teacher-02-After.png'
    },
    '02_intermediate/29_intermediate_business-english.json': {
        before: '02_intermediate/29_intermediate_business-english-01-Before.png',
        after: '02_intermediate/29_intermediate_business-english-02-After.png'
    },
    '02_intermediate/30_intermediate_motivation-coach.json': {
        before: '02_intermediate/30_intermediate_motivation-coach-01-Before.png',
        after: '02_intermediate/30_intermediate_motivation-coach-02-After.png'
    },
    '02_intermediate/31_beginner_digital-certificate.json': {
        before: '02_intermediate/31_beginner_digital-certificate-01-Before.png',
        after: '02_intermediate/31_beginner_digital-certificate-02-After.png'
    },
    '02_intermediate/32_intermediate_gamification-progress.json': {
        before: '02_intermediate/32_intermediate_gamification-progress-01-Before.png',
        after: '02_intermediate/32_intermediate_gamification-progress-02-After.png'
    },
    '02_intermediate/33_intermediate_weekly-report.json': {
        before: '02_intermediate/33_intermediate_weekly-report-01-Before.png',
        after: '02_intermediate/33_intermediate_weekly-report-02-After.png'
    },
    '02_intermediate/34_advanced_learning-community.json': {
        before: '02_intermediate/34_advanced_learning-community-01-Before.png',
        after: '02_intermediate/34_advanced_learning-community-02-After.png'
    },
    
    // 上級
    '03_advanced/35_intermediate_concept-map.json': {
        before: '03_advanced/35_intermediate_concept-map-01-Before.png',
        after: '03_advanced/35_intermediate_concept-map-02-After.png'
    },
    '03_advanced/36_tatsuya_intermediate_gemini-deep-research.json': {
        before: '03_advanced/36_tatsuya_intermediate_gemini-deep-research-01-Before.png',
        after: '03_advanced/36_tatsuya_intermediate_gemini-deep-research-02-After.png'
    },
    '03_advanced/37_advanced_fact-opinion-separation.json': {
        before: '03_advanced/37_advanced_fact-opinion-separation-01-Before.png',
        after: '03_advanced/37_advanced_fact-opinion-separation-02-After.png'
    },
    '03_advanced/38_tatsuya_intermediate_chain-of-thought.json': {
        before: '03_advanced/38_tatsuya_intermediate_chain-of-thought-01-Before.png',
        after: '03_advanced/38_tatsuya_intermediate_chain-of-thought-02-After.png'
    },
    '03_advanced/39_tatsuya_beginner_devils-advocate.json': {
        before: '03_advanced/39_tatsuya_beginner_devils-advocate-01-Before.png',
        after: '03_advanced/39_tatsuya_beginner_devils-advocate-02-After.png'
    },
    '03_advanced/40_advanced_devil-advocate.json': {
        before: '03_advanced/40_advanced_devil-advocate-01-Before.png',
        after: '03_advanced/40_advanced_devil-advocate-02-After.png'
    },
    '03_advanced/41_intermediate_business-plan-validation.json': {
        before: '03_advanced/41_intermediate_business-plan-validation-01-Before.png',
        after: '03_advanced/41_intermediate_business-plan-validation-02-After.png'
    },
    '03_advanced/42_advanced_analyze-thinking-bias.json': {
        before: '03_advanced/42_advanced_analyze-thinking-bias-01-Before.png',
        after: '03_advanced/42_advanced_analyze-thinking-bias-02-After.png'
    },
    '03_advanced/43_advanced_voice-memo-research.json': {
        before: '03_advanced/43_advanced_voice-memo-research-01-Before.png',
        after: '03_advanced/43_advanced_voice-memo-research-02-After.png'
    },
    '03_advanced/44_intermediate_metaphor-creation.json': {
        before: '03_advanced/44_intermediate_metaphor-creation-01-Before.png',
        after: '03_advanced/44_intermediate_metaphor-creation-02-After.png'
    },
    '03_advanced/45_intermediate_visualize-physics.json': {
        before: '03_advanced/45_intermediate_visualize-physics-01-Before.png',
        after: '03_advanced/45_intermediate_visualize-physics-02-After.png'
    },
    '03_advanced/46_tatsuya_advanced_notebooklm-knowledge-base.json': {
        before: '03_advanced/46_tatsuya_advanced_notebooklm-knowledge-base-01-Before.png',
        after: '03_advanced/46_tatsuya_advanced_notebooklm-knowledge-base-02-After.png'
    },
    '03_advanced/47_intermediate_market-value-career.json': {
        before: '03_advanced/47_intermediate_market-value-career-01-Before.png',
        after: '03_advanced/47_intermediate_market-value-career-02-After.png'
    },
    '03_advanced/48_tatsuya_advanced_future-career-strategy.json': {
        before: '03_advanced/48_tatsuya_advanced_future-career-strategy-01-Before.png',
        after: '03_advanced/48_tatsuya_advanced_future-career-strategy-02-After.png'
    },
    '03_advanced/49_beginner_book-recommendation.json': {
        before: '03_advanced/49_beginner_book-recommendation-01-Before.png',
        after: '03_advanced/49_beginner_book-recommendation-02-After.png'
    },
    '03_advanced/50_tatsuya_intermediate_ai-era-output-thinking.json': {
        before: '03_advanced/50_tatsuya_intermediate_ai-era-output-thinking-01-Before.png',
        after: '03_advanced/50_tatsuya_intermediate_ai-era-output-thinking-02-After.png'
    }
};

// ローディング関連の変数
let totalFiles = 0;
let loadedFiles = 0;

// ローディング画面の更新
function updateLoadingProgress() {
    const progressFill = document.getElementById('progressFill');
    const loadingDetails = document.getElementById('loadingDetails');
    
    if (progressFill && loadingDetails) {
        const percentage = totalFiles > 0 ? (loadedFiles / totalFiles) * 100 : 0;
        progressFill.style.width = `${percentage}%`;
        loadingDetails.textContent = `${loadedFiles} / ${totalFiles} ファイル`;
    }
}

// ローディング画面を非表示にする
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const container = document.querySelector('.container');
    
    if (loadingScreen && container) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            container.style.display = 'block';
        }, 500);
    }
}

// ページロード時の初期化
window.addEventListener('DOMContentLoaded', async () => {
    // 総ファイル数を設定（JSONファイル50個 + 画像ファイル100個）
    totalFiles = 150;
    loadedFiles = 0;
    
    updateLoadingProgress();
    
    await loadAllTips();
    displayTip(0);
    populateTipsSelector();
    
    // ローディング完了後、少し待ってから画面遷移
    setTimeout(() => {
        hideLoadingScreen();
    }, 300);
});

// すべてのTipsデータを読み込む
async function loadAllTips() {
    tipsData = [];
    
    console.log('Starting to load tips...');
    
    // JSONファイルの数に基づいて総ファイル数を再計算
    totalFiles = existingFiles.length * 3; // 各Tipsに1つのJSON + 2つの画像
    loadedFiles = 0;
    
    for (const fileName of existingFiles) {
        try {
            // 相対パスでファイルを読み込む
            const response = await fetch(fileName);
            console.log(`Loading ${fileName}: ${response.status}`);
            
            if (response.ok) {
                const data = await response.json();
                tipsData.push({
                    ...data,
                    fileName: fileName // デバッグ用にファイル名も保存
                });
                console.log(`Successfully loaded: ${fileName}`);
                
                // JSONファイル読み込み完了
                loadedFiles++;
                updateLoadingProgress();
                
                // 対応する画像ファイルをプリロード
                if (imageMapping[fileName]) {
                    // Before画像をプリロード
                    const beforeImg = new Image();
                    beforeImg.onload = () => {
                        loadedFiles++;
                        updateLoadingProgress();
                    };
                    beforeImg.onerror = () => {
                        loadedFiles++;
                        updateLoadingProgress();
                    };
                    beforeImg.src = imageMapping[fileName].before;
                    
                    // After画像をプリロード
                    const afterImg = new Image();
                    afterImg.onload = () => {
                        loadedFiles++;
                        updateLoadingProgress();
                    };
                    afterImg.onerror = () => {
                        loadedFiles++;
                        updateLoadingProgress();
                    };
                    afterImg.src = imageMapping[fileName].after;
                } else {
                    // 画像がない場合も進捗を更新
                    loadedFiles += 2;
                    updateLoadingProgress();
                }
            } else {
                console.warn(`Failed to load ${fileName}: ${response.status} ${response.statusText}`);
                // 失敗した場合も進捗を更新
                loadedFiles += 3;
                updateLoadingProgress();
            }
        } catch (error) {
            console.error(`Error loading ${fileName}:`, error);
            // エラーの場合も進捗を更新
            loadedFiles += 3;
            updateLoadingProgress();
        }
        
        // 読み込み中のアニメーションを少し見せるため、わずかに遅延
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    console.log(`Successfully loaded ${tipsData.length} / ${existingFiles.length} tips`);
    
    // 初期化時にページ情報を更新
    if (tipsData.length > 0) {
        document.getElementById('pageInfo').textContent = `1 / ${tipsData.length}`;
    } else {
        document.getElementById('pageInfo').textContent = 'データが見つかりません';
        console.error('No tips data loaded. Please check file paths and server configuration.');
    }
}

// テキストを構造化してHTMLに変換
function formatContent(text) {
    if (!text) return '';
    
    // 箇条書きを検出してリスト化
    if (text.includes('・')) {
        const items = text.split('・').filter(item => item.trim());
        return '<ul class="step-list">' + items.map(item => `<li>${item.trim()}</li>`).join('') + '</ul>';
    }
    
    // 番号付きリストを検出
    if (text.match(/^\d+[\.\)）]/m)) {
        const lines = text.split('\n');
        return '<ol class="step-list">' + lines
            .filter(line => line.trim())
            .map(line => line.replace(/^\d+[\.\)）]\s*/, ''))
            .map(line => `<li>${line.trim()}</li>`)
            .join('') + '</ol>';
    }
    
    // 「」で囲まれたキーワードを太字に
    text = text.replace(/「([^」]+)」/g, '<strong class="keyword">「$1」</strong>');
    
    // 「。」で改行してパラグラフ化
    const sentences = text.split('。').filter(s => s.trim());
    if (sentences.length > 1) {
        return sentences.map(s => `<p>${s.trim()}。</p>`).join('');
    }
    
    // 改行を<br>に変換
    return text.replace(/\n/g, '<br>');
}

// 指定されたインデックスのTipsを表示
function displayTip(index) {
    if (index < 0 || index >= tipsData.length) {
        console.error(`Invalid index: ${index}. Available range: 0-${tipsData.length - 1}`);
        return;
    }
    
    currentTipIndex = index;
    const tip = tipsData[index];
    
    // データの存在を確認
    if (!tip) {
        console.error(`No tip data at index ${index}`);
        return;
    }
    
    console.log(`Displaying tip ${index + 1}: ${tip.tipsName || 'Unknown'}`);
    
    // 左ページの更新（Tipsタイトルは20文字で制限）
    const tipsTitle = tip.tipsName || '';
    document.getElementById('tipsTitle').textContent = tipsTitle.length > 20 ? tipsTitle.substring(0, 20) + '...' : tipsTitle;
    document.getElementById('traditionalMethod').textContent = tip.traditionalMethodDiagram || '';
    document.getElementById('aiMethod').textContent = tip.aiMethodDiagram || '';
    
    // 画像の更新（マッピングテーブルを使用）
    const fileName = tip.fileName || '';
    
    // 画像パスをマッピングテーブルから取得
    let traditionalImagePath = '';
    let aiMethodImagePath = '';
    
    if (imageMapping[fileName]) {
        traditionalImagePath = imageMapping[fileName].before;
        aiMethodImagePath = imageMapping[fileName].after;
        console.log(`Using mapped images for ${fileName}`);
    } else {
        // マッピングが見つからない場合は空の画像パスを使用（画像を表示しない）
        console.warn(`No image mapping found for ${fileName}`);
        traditionalImagePath = '';
        aiMethodImagePath = '';
        
        // 画像を非表示にして代替テキストを表示
        const traditionalImg = document.getElementById('traditionalImage');
        const aiMethodImg = document.getElementById('aiMethodImage');
        
        if (traditionalImg && aiMethodImg) {
            traditionalImg.style.display = 'none';
            aiMethodImg.style.display = 'none';
            
            // 既存のエラーメッセージを削除
            document.querySelectorAll('.image-error').forEach(error => error.remove());
            
            // 代替テキストを追加
            const addErrorMessage = (parent) => {
                const altText = document.createElement('div');
                altText.className = 'image-error';
                altText.textContent = '画像マッピングが見つかりません';
                parent.appendChild(altText);
            };
            
            addErrorMessage(traditionalImg.parentElement);
            addErrorMessage(aiMethodImg.parentElement);
            
            return; // 画像の設定をスキップ
        }
    }
    
    // 画像要素の更新
    const traditionalImg = document.getElementById('traditionalImage');
    const aiMethodImg = document.getElementById('aiMethodImage');
    
    // 画像読み込みエラー時の処理（一度だけ実行されるように修正）
    traditionalImg.onerror = function() {
        if (this.dataset.errorHandled === 'true') return; // 既にエラー処理済みの場合はスキップ
        this.dataset.errorHandled = 'true';
        
        console.error(`Failed to load traditional image: ${this.src}`);
        this.style.display = 'none'; // 画像が見つからない場合は非表示にする
        
        // 既存のエラーメッセージがあれば削除
        const existingError = this.parentElement.querySelector('.image-error');
        if (existingError) existingError.remove();
        
        // 代替テキストを表示
        const altText = document.createElement('div');
        altText.className = 'image-error';
        altText.textContent = '画像を読み込めませんでした';
        this.parentElement.appendChild(altText);
    };
    
    aiMethodImg.onerror = function() {
        if (this.dataset.errorHandled === 'true') return; // 既にエラー処理済みの場合はスキップ
        this.dataset.errorHandled = 'true';
        
        console.error(`Failed to load AI method image: ${this.src}`);
        this.style.display = 'none'; // 画像が見つからない場合は非表示にする
        
        // 既存のエラーメッセージがあれば削除
        const existingError = this.parentElement.querySelector('.image-error');
        if (existingError) existingError.remove();
        
        // 代替テキストを表示
        const altText = document.createElement('div');
        altText.className = 'image-error';
        altText.textContent = '画像を読み込めませんでした';
        this.parentElement.appendChild(altText);
    };
    
    // エラー処理をリセット（前の画像のエラーハンドラを削除）
    traditionalImg.style.display = 'block';
    aiMethodImg.style.display = 'block';
    traditionalImg.dataset.errorHandled = 'false'; // エラーハンドリングフラグをリセット
    aiMethodImg.dataset.errorHandled = 'false';
    
    // 既存のエラーメッセージを削除
    const existingErrors = document.querySelectorAll('.image-error');
    existingErrors.forEach(error => error.remove());
    
    // 画像パスを設定する前にデフォルト画像をチェック
    if (traditionalImagePath === 'images/default-before.png' || aiMethodImagePath === 'images/default-after.png') {
        console.warn(`Using default images for ${fileName}`);
    }
    
    traditionalImg.src = traditionalImagePath;
    aiMethodImg.src = aiMethodImagePath;
    
    console.log(`Traditional image: ${traditionalImagePath}`);
    console.log(`AI method image: ${aiMethodImagePath}`);
    
    // 課題の本質とAIソリューションの更新（右ページ下部に移動）
    const solutionText = document.getElementById('solutionContent');
    if (solutionText) {
        solutionText.textContent = tip.solutionText || '';
    }
    
    // 右ページの更新（構造化されたHTMLとして表示）
    document.getElementById('step1Title').textContent = tip.step1Headline || '';
    document.getElementById('step1Content').innerHTML = formatContent(tip.step1Example || '');
    
    document.getElementById('step2Title').textContent = tip.step2Headline || '';
    document.getElementById('step2Content').innerHTML = formatContent(tip.step2Example || '');
    
    document.getElementById('step3Title').textContent = tip.step3Headline || '';
    document.getElementById('step3Content').innerHTML = formatContent(tip.step3Example || '');
    
    document.getElementById('effectContent').innerHTML = formatContent(tip.effect || '');
    
    // ページ情報の更新
    document.getElementById('pageInfo').textContent = `${index + 1} / ${tipsData.length}`;
    
    // ナビゲーションボタンの状態更新
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === tipsData.length - 1;
    
    // Tips番号の更新
    const tipsLabel = document.querySelector('.tips-label');
    if (tipsLabel) {
        tipsLabel.textContent = `Tips${(index + 1).toString().padStart(2, '0')}`;
    }
    
    // セレクターの選択状態を更新
    const selector = document.getElementById('tipsSelector');
    if (selector) {
        selector.value = index.toString();
    }
}

// 前のTipsへ
function prevTip() {
    if (currentTipIndex > 0) {
        displayTip(currentTipIndex - 1);
    }
}

// 次のTipsへ
function nextTip() {
    if (currentTipIndex < tipsData.length - 1) {
        displayTip(currentTipIndex + 1);
    }
}

// セレクターからTipsを選択
function selectTip(value) {
    const index = parseInt(value);
    if (!isNaN(index)) {
        displayTip(index);
    }
}

// Tipsセレクターにオプションを追加
function populateTipsSelector() {
    const selector = document.getElementById('tipsSelector');
    selector.innerHTML = '<option value="">Tipsを選択...</option>';
    
    tipsData.forEach((tip, index) => {
        const option = document.createElement('option');
        option.value = index.toString();
        option.textContent = `Tips${(index + 1).toString().padStart(2, '0')}`; // タイトルを削除
        selector.appendChild(option);
    });
}

// キーボード操作のサポート
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTip();
    } else if (e.key === 'ArrowRight') {
        nextTip();
    }
});