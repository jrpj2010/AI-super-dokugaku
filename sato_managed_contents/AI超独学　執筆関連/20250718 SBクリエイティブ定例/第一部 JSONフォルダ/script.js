// Tipsデータを格納する配列
let tipsData = [];
let currentTipIndex = 0;

// 実際に存在するファイルのリスト（全100個）
const existingFiles = [
    '01_beginner_organize-thoughts.json',
    '02_intermediate_idea-100-knock.json',
    '03_advanced_devil-advocate.json',
    '04_intermediate_extract-debate-axis.json',
    '05_intermediate_concept-map.json',
    '06_advanced_analyze-thinking-bias.json',
    '07_beginner_backward-thinking.json',
    '08_intermediate_emotion-wave-analysis.json',
    '09_advanced_summon-great-minds.json',
    '10_advanced_find-life-purpose.json',
    '11_beginner_listen-to-books.json',
    '12_intermediate_translate-research-papers.json',
    '13_beginner_youtube-to-text.json',
    '14_intermediate_exam-analysis.json',
    '15_beginner_ai-english-teacher.json',
    '16_advanced_ai-research-agent.json',
    '17_intermediate_metaphor-creation.json',
    '18_advanced_fact-opinion-separation.json',
    '19_intermediate_feynman-technique.json',
    '20_beginner_personalized-quiz.json',
    '21_intermediate_custom-learning-roadmap.json',
    '22_advanced_historical-simulation.json',
    '23_intermediate_visualize-physics.json',
    '24_beginner_book-recommendation.json',
    '25_advanced_voice-memo-research.json',
    '26_beginner_instant-writing.json',
    '27_beginner_prep-report.json',
    '28_intermediate_business-english.json',
    '29_advanced_presentation-story.json',
    '30_intermediate_catchcopy-persona.json',
    '31_beginner_weakness-to-strength.json',
    '32_intermediate_market-value-career.json',
    '33_advanced_story-structure.json',
    '34_intermediate_blog-structure.json',
    '35_beginner_beginner-manual.json',
    '36_advanced_code-debug-refactor.json',
    '37_beginner_vibe-graph.json',
    '38_intermediate_business-plan-validation.json',
    '39_advanced_side-business-ideas.json',
    '40_beginner_portfolio-site.json',
    '41_beginner_baby-step-plan.json',
    '42_intermediate_motivation-coach.json',
    '43_beginner_daily-reflection.json',
    '44_intermediate_gamification-progress.json',
    '45_advanced_learning-community.json',
    '46_beginner_time-reminder.json',
    '47_intermediate_learning-style.json',
    '48_advanced_stumbling-prediction.json',
    '49_beginner_digital-certificate.json',
    '50_intermediate_weekly-report.json',
    '51_kyoko_beginner_few-shot-prompt.json',
    '52_kyoko_beginner_persona-setting.json',
    '53_kyoko_beginner_copilot-email-draft.json',
    '54_kyoko_beginner_teams-summary.json',
    '55_kyoko_beginner_gemini-wall-hitting.json',
    '56_kyoko_beginner_ai-english-conversation.json',
    '57_kyoko_beginner_100-ideas.json',
    '58_kyoko_beginner_simplification.json',
    '59_kyoko_beginner_web-summary.json',
    '60_kyoko_beginner_transcription.json',
    '61_kyoko_intermediate_prompt-design-4-steps.json',
    '62_kyoko_intermediate_copilot-for-excel.json',
    '63_kyoko_intermediate_gemini-in-sheets.json',
    '64_kyoko_intermediate_notion-ai-task-extraction.json',
    '65_kyoko_intermediate_excel-macro-automation.json',
    '66_kyoko_intermediate_copilot-coaching.json',
    '67_kyoko_intermediate_ai-brainstorming.json',
    '68_kyoko_intermediate_linkedin-profile.json',
    '69_kyoko_intermediate_gemini-trip-planning.json',
    '70_kyoko_intermediate_notebooklm-self-learning.json',
    '71_kyoko_advanced_competitor-analysis.json',
    '72_kyoko_advanced_niche-market-analysis.json',
    '73_kyoko_advanced_linkedin-career-path.json',
    '74_kyoko_advanced_copilot-illustration.json',
    '75_kyoko_advanced_dify-app-builder.json',
    '76_tatsuya_beginner_devils-advocate.json',
    '77_tatsuya_beginner_word-to-powerpoint.json',
    '78_tatsuya_beginner_copilot-notebook.json',
    '79_tatsuya_beginner_gemini-in-workspace.json',
    '80_tatsuya_beginner_1on1-analysis.json',
    '81_tatsuya_beginner_personalized-news-report.json',
    '82_tatsuya_beginner_voice-memo-structuring.json',
    '83_tatsuya_beginner_analogy-generation.json',
    '84_tatsuya_beginner_academic-paper-summary.json',
    '85_tatsuya_beginner_chatgpt-for-management.json',
    '86_tatsuya_intermediate_chain-of-thought.json',
    '87_tatsuya_intermediate_self-consistency.json',
    '88_tatsuya_intermediate_copilot-for-excel-insights.json',
    '89_tatsuya_intermediate_gemini-deep-research.json',
    '90_tatsuya_intermediate_notion-ai-project-summary.json',
    '91_tatsuya_intermediate_work-process-redesign.json',
    '92_tatsuya_intermediate_content-creation.json',
    '93_tatsuya_intermediate_gemini-multimodal-analysis.json',
    '94_tatsuya_intermediate_ai-era-output-thinking.json',
    '95_tatsuya_intermediate_customer-feedback-analysis.json',
    '96_tatsuya_advanced_react-prompting.json',
    '97_tatsuya_advanced_notebooklm-knowledge-base.json',
    '98_tatsuya_advanced_n8n-ai-agent.json',
    '99_tatsuya_advanced_future-career-strategy.json',
    '100_tatsuya_advanced_dify-for-teams.json'
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
    
    // 初期化時にページ情報を更新
    if (tipsData.length > 0) {
        document.getElementById('pageInfo').textContent = `1 / ${tipsData.length}`;
    }
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