// Tipsデータを格納する配列
let tipsData = [];
let currentTipIndex = 0;

// JSONファイル名のリスト（50個まで対応）
const jsonFiles = [];
for (let i = 1; i <= 50; i++) {
    const num = i.toString().padStart(2, '0');
    jsonFiles.push(`${num}_kyoko_beginner_few-shot-prompt.json`);
}

// 実際に存在するファイルのリスト（全50個）
const existingFiles = [
    '01_kyoko_beginner_few-shot-prompt.json',
    '02_kyoko_beginner_persona-setting.json',
    '03_kyoko_beginner_copilot-email-draft.json',
    '04_kyoko_beginner_teams-summary.json',
    '05_kyoko_beginner_gemini-wall-hitting.json',
    '06_kyoko_beginner_ai-english-conversation.json',
    '07_kyoko_beginner_100-ideas.json',
    '08_kyoko_beginner_simplification.json',
    '09_kyoko_beginner_web-summary.json',
    '10_kyoko_beginner_transcription.json',
    '11_kyoko_intermediate_prompt-design-4-steps.json',
    '12_kyoko_intermediate_copilot-for-excel.json',
    '13_kyoko_intermediate_gemini-in-sheets.json',
    '14_kyoko_intermediate_notion-ai-task-extraction.json',
    '15_kyoko_intermediate_excel-macro-automation.json',
    '16_kyoko_intermediate_copilot-coaching.json',
    '17_kyoko_intermediate_ai-brainstorming.json',
    '18_kyoko_intermediate_linkedin-profile.json',
    '19_kyoko_intermediate_gemini-trip-planning.json',
    '20_kyoko_intermediate_notebooklm-self-learning.json',
    '21_kyoko_advanced_competitor-analysis.json',
    '22_kyoko_advanced_niche-market-analysis.json',
    '23_kyoko_advanced_linkedin-career-path.json',
    '24_kyoko_advanced_copilot-illustration.json',
    '25_kyoko_advanced_dify-app-builder.json',
    '26_tatsuya_beginner_devils-advocate.json',
    '27_tatsuya_beginner_word-to-powerpoint.json',
    '28_tatsuya_beginner_copilot-notebook.json',
    '29_tatsuya_beginner_gemini-in-workspace.json',
    '30_tatsuya_beginner_1on1-analysis.json',
    '31_tatsuya_beginner_personalized-news-report.json',
    '32_tatsuya_beginner_voice-memo-structuring.json',
    '33_tatsuya_beginner_analogy-generation.json',
    '34_tatsuya_beginner_academic-paper-summary.json',
    '35_tatsuya_beginner_chatgpt-for-management.json',
    '36_tatsuya_intermediate_chain-of-thought.json',
    '37_tatsuya_intermediate_self-consistency.json',
    '38_tatsuya_intermediate_copilot-for-excel-insights.json',
    '39_tatsuya_intermediate_gemini-deep-research.json',
    '40_tatsuya_intermediate_notion-ai-project-summary.json',
    '41_tatsuya_intermediate_work-process-redesign.json',
    '42_tatsuya_intermediate_content-creation.json',
    '43_tatsuya_intermediate_gemini-multimodal-analysis.json',
    '44_tatsuya_intermediate_ai-era-output-thinking.json',
    '45_tatsuya_intermediate_customer-feedback-analysis.json',
    '46_tatsuya_advanced_react-prompting.json',
    '47_tatsuya_advanced_notebooklm-knowledge-base.json',
    '48_tatsuya_advanced_n8n-ai-agent.json',
    '49_tatsuya_advanced_future-career-strategy.json',
    '50_tatsuya_advanced_dify-for-teams.json'
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
    
    for (const fileName of existingFiles) {
        try {
            const response = await fetch(fileName);
            if (response.ok) {
                const data = await response.json();
                tipsData.push(data);
            }
        } catch (error) {
            console.error(`Error loading ${fileName}:`, error);
        }
    }
    
    console.log(`Loaded ${tipsData.length} tips`);
}

// 指定されたインデックスのTipsを表示
function displayTip(index) {
    if (index < 0 || index >= tipsData.length) return;
    
    currentTipIndex = index;
    const tip = tipsData[index];
    
    // 左ページの更新
    document.getElementById('tipsTitle').textContent = tip.tipsName || '';
    document.getElementById('traditionalMethod').textContent = tip.traditionalMethodDiagram || '';
    document.getElementById('aiMethod').textContent = tip.aiMethodDiagram || '';
    
    // 課題の本質とAIソリューションの更新
    const footerText = document.querySelector('.footer-text p');
    footerText.textContent = tip.solutionText || '';
    
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
    
    // Tips番号の更新
    const tipsLabel = document.querySelector('.tips-label');
    tipsLabel.textContent = `Tips${(index + 1).toString().padStart(2, '0')}`;
    
    // セレクターの選択状態を更新
    document.getElementById('tipsSelector').value = index.toString();
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