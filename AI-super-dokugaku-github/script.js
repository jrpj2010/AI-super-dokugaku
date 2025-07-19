// Tipsデータを格納する配列
let tipsData = [];
let currentTipIndex = 0;

// 実際に存在するファイルのリスト（フォルダ別に整理）
const existingFiles = [
    // beginner（13個）
    'beginner/01_beginner_organize-thoughts.json',
    'beginner/02_kyoko_beginner_web-summary.json',
    'beginner/03_tatsuya_beginner_personalized-news-report.json',
    'beginner/04_advanced_ai-research-agent.json',
    'beginner/05_tatsuya_beginner_gemini-in-workspace.json',
    'beginner/06_kyoko_intermediate_copilot-coaching.json',
    'beginner/07_kyoko_beginner_simplification.json',
    'beginner/08_tatsuya_beginner_word-to-powerpoint.json',
    'beginner/09_kyoko_advanced_copilot-illustration.json',
    'beginner/10_tatsuya_beginner_voice-memo-structuring.json',
    'beginner/11_kyoko_beginner_gemini-wall-hitting.json',
    'beginner/12_tatsuya_beginner_copilot-notebook.json',
    'beginner/13_beginner_portfolio-site.json',
    
    // intermediate（21個）
    'intermediate/14_intermediate_custom-learning-roadmap.json',
    'intermediate/15_beginner_backward-thinking.json',
    'intermediate/16_advanced_stumbling-prediction.json',
    'intermediate/17_intermediate_learning-style.json',
    'intermediate/18_intermediate_emotion-wave-analysis.json',
    'intermediate/19_beginner_time-reminder.json',
    'intermediate/20_beginner_listen-to-books.json',
    'intermediate/21_beginner_youtube-to-text.json',
    'intermediate/22_tatsuya_beginner_academic-paper-summary.json',
    'intermediate/23_kyoko_intermediate_notebooklm-self-learning.json',
    'intermediate/24_beginner_personalized-quiz.json',
    'intermediate/25_intermediate_exam-analysis.json',
    'intermediate/26_beginner_daily-reflection.json',
    'intermediate/27_intermediate_feynman-technique.json',
    'intermediate/28_beginner_ai-english-teacher.json',
    'intermediate/29_intermediate_business-english.json',
    'intermediate/30_intermediate_motivation-coach.json',
    'intermediate/31_beginner_digital-certificate.json',
    'intermediate/32_intermediate_gamification-progress.json',
    'intermediate/33_intermediate_weekly-report.json',
    'intermediate/34_advanced_learning-community.json',
    
    // advanced（16個）
    'advanced/35_intermediate_concept-map.json',
    'advanced/36_tatsuya_intermediate_gemini-deep-research.json',
    'advanced/37_advanced_fact-opinion-separation.json',
    'advanced/38_tatsuya_intermediate_chain-of-thought.json',
    'advanced/39_tatsuya_beginner_devils-advocate.json',
    'advanced/40_advanced_devil-advocate.json',
    'advanced/41_intermediate_business-plan-validation.json',
    'advanced/42_advanced_analyze-thinking-bias.json',
    'advanced/43_advanced_voice-memo-research.json',
    'advanced/44_intermediate_metaphor-creation.json',
    'advanced/45_intermediate_visualize-physics.json',
    'advanced/46_tatsuya_advanced_notebooklm-knowledge-base.json',
    'advanced/47_intermediate_market-value-career.json',
    'advanced/48_tatsuya_advanced_future-career-strategy.json',
    'advanced/49_beginner_book-recommendation.json',
    'advanced/50_tatsuya_intermediate_ai-era-output-thinking.json'
];

// ページロード時の初期化
window.addEventListener('DOMContentLoaded', async () => {
    await loadAllTips();
    displayTip(0);
    populateTipsSelector();
});

// すべてのTipsデータを読み込む
async function loadAllTips() {
    tipsData = [];
    
    console.log('Starting to load tips...');
    
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
            } else {
                console.warn(`Failed to load ${fileName}: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error loading ${fileName}:`, error);
        }
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
    
    // ヘッダーのタイトル更新
    const headerTitle = document.getElementById('tipsTitle');
    if (headerTitle) {
        headerTitle.textContent = tip.tipsName || '';
    }
    
    // 左ページの更新
    const traditionalMethod = document.getElementById('traditionalMethod');
    if (traditionalMethod) {
        traditionalMethod.textContent = tip.traditionalMethodDiagram || '';
    }
    
    const aiMethod = document.getElementById('aiMethod');
    if (aiMethod) {
        aiMethod.textContent = tip.aiMethodDiagram || '';
    }
    
    // 画像の更新（簡略化されたロジック）
    const tipNumber = (index + 1).toString().padStart(2, '0');
    const fileName = tip.fileName || '';
    
    // ファイル名からベース名を抽出（JSONファイル名と同じパターンを使用）
    const baseNameMatch = fileName.match(/\d+_(.*?)\.json$/);
    let baseName = '';
    if (baseNameMatch) {
        baseName = baseNameMatch[1];
    }
    
    // 画像パスの設定（イラストフォルダの実際のファイル名パターンに合わせる）
    const traditionalImagePath = `イラスト/${tipNumber}_${baseName}-01-Before.png`;
    const aiMethodImagePath = `イラスト/${tipNumber}_${baseName}-02-After.png`;
    
    document.getElementById('traditionalImage').src = traditionalImagePath;
    document.getElementById('aiMethodImage').src = aiMethodImagePath;
    
    console.log(`Traditional image: ${traditionalImagePath}`);
    console.log(`AI method image: ${aiMethodImagePath}`);
    
    // 課題の本質とAIソリューションの更新（右ページ下部に移動）
    const solutionText = document.getElementById('solutionContent');
    if (solutionText) {
        solutionText.textContent = tip.solutionText || '';
    }
    
    // 右ページの更新
    document.getElementById('step1Title').textContent = tip.step1Headline || '';
    document.getElementById('step1Content').textContent = tip.step1Example || '';
    
    document.getElementById('step2Title').textContent = tip.step2Headline || '';
    document.getElementById('step2Content').textContent = tip.step2Example || '';
    
    document.getElementById('step3Title').textContent = tip.step3Headline || '';
    document.getElementById('step3Content').textContent = tip.step3Example || '';
    
    document.getElementById('effectContent').textContent = tip.effect || '';
    
    // ページ情報の更新
    document.getElementById('pageInfo').textContent = `${index + 1} / ${tipsData.length}`;
    
    // ナビゲーションボタンの状態更新
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === tipsData.length - 1;
    
    // Tips番号の更新（ヘッダー内）
    const tipsNumber = document.getElementById('tipsNumber');
    if (tipsNumber) {
        tipsNumber.textContent = `Tips${(index + 1).toString().padStart(2, '0')}`;
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
        option.textContent = `Tips${(index + 1).toString().padStart(2, '0')}: ${tip.tipsName}`;
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