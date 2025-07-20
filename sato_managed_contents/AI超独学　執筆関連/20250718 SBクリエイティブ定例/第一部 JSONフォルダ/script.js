// Tipsデータを格納する配列
let tipsData = [];
let currentTipIndex = 0;

// 実際に存在するファイルのリスト（フォルダ別に整理）
const existingFiles = [
    // 初級（13個）
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
    
    // 中級（21個）
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
    
    // 中級上（16個）
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
    
    // 画像の更新（簡略化されたロジック）
    const tipNumber = (index + 1).toString().padStart(2, '0');
    const fileName = tip.fileName || '';
    
    // ファイル名からベース名を抽出（JSONファイル名と同じパターンを使用）
    const baseNameMatch = fileName.match(/\d+_(.*?)\.json$/);
    let baseName = '';
    if (baseNameMatch) {
        baseName = baseNameMatch[1];
    }
    
    // 画像パスの設定（複数のファイル名パターンに対応）
    // パターン1: XX_name-01-Before.png / XX_name-02-After.png （実際のファイル名）
    // パターン2: XX_name_before.png / XX_name_after.png （フォールバック）
    let traditionalImagePath = '';
    let aiMethodImagePath = '';
    
    // まずパターン1を試す（実際のファイル名パターン）
    const pattern1Before = `images/${tipNumber}_${baseName}-01-Before.png`;
    const pattern1After = `images/${tipNumber}_${baseName}-02-After.png`;
    
    // パターン2（フォールバック）
    const pattern2Before = `images/${tipNumber}_${baseName}_before.png`;
    const pattern2After = `images/${tipNumber}_${baseName}_after.png`;
    
    // 実際に存在するパスを使用（フォールバック付き）
    traditionalImagePath = pattern1Before;
    aiMethodImagePath = pattern1After;
    
    // 画像要素の更新
    const traditionalImg = document.getElementById('traditionalImage');
    const aiMethodImg = document.getElementById('aiMethodImage');
    
    // 画像読み込みエラー時の処理
    traditionalImg.onerror = function() {
        console.log(`Failed to load: ${this.src}, trying pattern 2...`);
        this.src = pattern2Before;
    };
    
    aiMethodImg.onerror = function() {
        console.log(`Failed to load: ${this.src}, trying pattern 2...`);
        this.src = pattern2After;
    };
    
    traditionalImg.src = traditionalImagePath;
    aiMethodImg.src = aiMethodImagePath;
    
    console.log(`Traditional image: ${traditionalImagePath} (fallback: ${pattern2Before})`);
    console.log(`AI method image: ${aiMethodImagePath} (fallback: ${pattern2After})`);
    
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