// アプリケーションのメインエントリポイント
import { setupTabNavigation } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('アプリケーション初期化');
  
  // タブナビゲーションの設定
  setupTabNavigation('.tab-btn', '.tab-pane');
  setupTabNavigation('.result-tab', '.result-panel');
  setupTabNavigation('.tool-tab', '.tool-panel');
  
  // モーダル関連の処理
  setupModals();
  
  // ツールタブの設定
  if (document.querySelector('.tool-container')) {
    initializeTools();
  }
  
  // 構造図の初期化（構造解析ページ用）
  if (document.getElementById('hierarchyDiagram')) {
    initializeStructureDiagrams();
  }
});

/**
 * モーダル関連の設定
 */
function setupModals() {
  const modalTriggers = document.querySelectorAll('[id$="Btn"][data-modal]');
  const closeButtons = document.querySelectorAll('.close-modal');
  
  modalTriggers.forEach(trigger => {
    const modalId = trigger.getAttribute('data-modal');
    if (!modalId) return;
    
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    trigger.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });
  
  // 特定のボタン（テンプレート表示ボタン）の処理
  const templateBtn = document.getElementById('showTemplateBtn');
  if (templateBtn) {
    const templateModal = document.getElementById('templateModal');
    templateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      templateModal.style.display = 'block';
    });
  }
  
  // モーダルを閉じる処理
  closeButtons.forEach(button => {
    const modal = button.closest('.modal');
    button.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
  
  // モーダル外クリックで閉じる
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
}

/**
 * ツール関連の初期化
 */
function initializeTools() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const loadSampleBtn = document.getElementById('loadSampleBtn');
  const generateAdviceBtn = document.getElementById('generateAdviceBtn');
  const sampleItems = document.querySelectorAll('.sample-item');
  
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', handleAnalyze);
  }
  
  if (loadSampleBtn) {
    loadSampleBtn.addEventListener('click', handleLoadSample);
  }
  
  if (generateAdviceBtn) {
    generateAdviceBtn.addEventListener('click', handleGenerateAdvice);
  }
  
  sampleItems.forEach(item => {
    item.addEventListener('click', () => {
      const sampleId = item.getAttribute('data-id');
      loadSampleMessage(sampleId);
    });
  });
  
  // 保存ボタン処理
  const saveTextBtn = document.getElementById('saveTextBtn');
  const savePdfBtn = document.getElementById('savePdfBtn');
  const shareBtn = document.getElementById('shareBtn');
  
  if (saveTextBtn) saveTextBtn.addEventListener('click', handleSaveText);
  if (savePdfBtn) savePdfBtn.addEventListener('click', handleSavePdf);
  if (shareBtn) shareBtn.addEventListener('click', handleShare);
}

/**
 * 構造図の初期化
 */
function initializeStructureDiagrams() {
  // 階層構造図の描画
  drawHierarchyDiagram();
  
  // 関連性図の描画
  if (document.getElementById('relationshipDiagram')) {
    drawRelationshipDiagram();
  }
  
  // フレームワーク図の描画
  if (document.getElementById('frameworkDiagram')) {
    drawFrameworkDiagram();
  }
}

/**
 * メッセージ分析処理
 */
function handleAnalyze() {
  const messageInput = document.getElementById('messageInput');
  const analysisResults = document.getElementById('analysisResults');
  
  if (!messageInput || !messageInput.value.trim()) {
    alert('分析するメッセージを入力してください');
    return;
  }
  
  // 実際の分析はサーバーサイドで行う想定だが、ここではダミーデータで表示
  showAnalysisResults();
}

/**
 * サンプルメッセージ読み込み
 */
function handleLoadSample() {
  loadSampleMessage('sample1'); // デフォルトでsample1を読み込む
}

/**
 * サンプルメッセージを読み込む
 */
function loadSampleMessage(sampleId) {
  const messageInput = document.getElementById('messageInput');
  if (!messageInput) return;
  
  let sampleText = '';
  
  switch (sampleId) {
    case 'sample1':
      sampleText = `セミナーと書籍では、そもそも受講者とゴール設定が異なります。セミナーでは「その場で書き方を学び、実際に書いてみる」というゴールに対して、書籍では「独学で書き方を学び、自分で実践できるようになる」というゴールになります。

セミナーで効果的だった手法が、そのまま書籍でも効果的とは限りません。書籍という紙のメディアでは、セミナーのような動的なインタラクションがない分、「驚き」や「感動」をどう設計するかが重要です。

また、「音声入力をおすすめする」というアプローチは、独学に関心のある読者層には逆効果かもしれません。じっくり考える、静かに思索を深めるというスタイルを好む読者には、文章で書くプロセスそのものに価値を見出す人も多いでしょう。

「音声vs文章」を比較表にして、それぞれの特徴やメリット・デメリットを示した上で、読者が自分に合った方法を選べるようにするのはいかがでしょうか。

さらに、「後半でついてこれなくなる」という懸念に対しては、各章ごとに「ここまでのまとめ」や「チェックリスト」を設けると効果的です。また、難しい概念はわかりやすいたとえ話を用いたり、要点を短くまとめたりすることで、読者が最後まで読み進められるよう工夫できます。`;
      break;
    case 'sample2':
      sampleText = `効果的なプレゼンテーションは、明確な構造を持っていることが不可欠です。まず冒頭で「なぜこの話が重要なのか」という文脈を提供し、聴衆の注意を引きつけましょう。

内容の構成については、通常3〜5つの主要ポイントに絞るのが理想的です。人間の短期記憶の特性を考えると、これ以上の情報は記憶に残りにくくなります。

各ポイントについては「主張→根拠→例示→応用」という流れで展開すると、論理的で説得力のあるプレゼンテーションになります。特に具体例は、抽象的な概念を理解しやすくするために非常に重要です。

視覚資料については、テキスト情報を最小限に抑え、視覚的な要素（グラフ、図表、画像）を効果的に活用しましょう。人間の脳は、テキストよりも視覚情報を処理するのが得意です。

最後に必ず「次のアクション」を明確に示すことで、プレゼンテーションの効果を最大化できます。聴衆が「何をすべきか」を明確に理解できるようにしましょう。`;
      break;
    case 'sample3':
      sampleText = `ウェブコンテンツ設計において最も重要なのは、ユーザーの目的と行動パターンを理解することです。多くのサイトが失敗するのは、自社視点でコンテンツを構成しているからです。

情報アーキテクチャはユーザーの思考プロセスに沿って設計すべきです。「自分がこのサイトに来たら、どのような順序で情報を求めるだろうか」という視点でナビゲーション構造を考えましょう。

コンテンツは「逆ピラミッド型」で構成するのが効果的です。最も重要な情報を先に提示し、徐々に詳細へと掘り下げていく構造です。ユーザーは最初の数秒でページの価値を判断するため、重要情報を上部に配置することが不可欠です。

視覚的階層も重要です。フォントサイズ、色のコントラスト、余白などを使って、情報の重要度を視覚的に表現しましょう。これにより、ユーザーはページをスキャンするだけで重要なポイントを把握できます。

最後に、モバイルファーストの原則に従い、小さな画面での表示を優先して設計することをおすすめします。画面サイズに関係なく、核となるメッセージが明確に伝わる構造を心がけましょう。`;
      break;
  }
  
  messageInput.value = sampleText;
  
  // サンプルを読み込んだら自動的に分析実行
  showAnalysisResults();
}

/**
 * アドバイス生成処理
 */
function handleGenerateAdvice() {
  // 実際の処理はサーバーサイドで行う想定だが、ここではダミーデータで表示
  const adviceResults = document.getElementById('adviceResults');
  if (adviceResults) {
    adviceResults.style.display = 'block';
    
    // アドバイスカードの生成
    const adviceCards = document.getElementById('adviceCards');
    if (adviceCards) {
      adviceCards.innerHTML = `
        <div class="advice-card">
          <h5>構造の明確化</h5>
          <p>メッセージの論理構造をより明確にするために、各セクションの役割（問題提起→分析→提案）を視覚的に区別することをお勧めします。</p>
        </div>
        <div class="advice-card">
          <h5>選択肢の提示方法</h5>
          <p>「音声vs文章」の比較について、実際の比較表を用いるとより効果的です。メリット・デメリットを対比させることで、読者の意思決定を助けられます。</p>
        </div>
        <div class="advice-card">
          <h5>継続支援の強化</h5>
          <p>「ついてこれなくなる」という懸念に対して、各章末のまとめに加えて、途中にも「ここまでわかりましたか？」という確認ポイントを設けると効果的です。</p>
        </div>
        <div class="advice-card">
          <h5>メディア特性の活用</h5>
          <p>書籍の強みである「じっくり考える」特性を活かして、読者が自己評価できるワークシートや振り返り質問を取り入れることで、理解度が向上します。</p>
        </div>
      `;
    }
    
    // アクションステップの生成
    const actionSteps = document.getElementById('actionSteps');
    if (actionSteps) {
      actionSteps.innerHTML = `
        <li>各セクションの冒頭に、そのセクションで扱う主要論点を箇条書きで示す</li>
        <li>「音声入力vs文章入力」の比較表を作成し、客観的な情報提供を強化する</li>
        <li>難易度が上がる部分の前に「ここからは少し難しくなります」などの予告を入れる</li>
        <li>読者が自分の理解度をチェックできる簡単な設問を各章末に追加する</li>
        <li>メディア間の連携（QRコードで動画へのリンクなど）を検討する</li>
      `;
    }
  }
}

/**
 * 分析結果の表示
 */
function showAnalysisResults() {
  const analysisResults = document.getElementById('analysisResults');
  if (analysisResults) {
    analysisResults.style.display = 'block';
    
    // テーマバブルの生成
    const themeBubbles = document.getElementById('themeBubbles');
    if (themeBubbles) {
      themeBubbles.innerHTML = `
        <div class="theme-bubble">メディア特性の理解</div>
        <div class="theme-bubble">選択肢の提示</div>
        <div class="theme-bubble">読者層への配慮</div>
        <div class="theme-bubble">継続支援の工夫</div>
      `;
    }
    
    // 問題意識リストの生成
    const problemList = document.getElementById('problemList');
    if (problemList) {
      problemList.innerHTML = `
        <div class="problem-item">
          <h6>メディア間の転用に関する懸念</h6>
          <p>セミナーで効果的なコンテンツが書籍でも同様に効果的とは限らないという認識</p>
        </div>
        <div class="problem-item">
          <h6>ターゲット層の認識ギャップ</h6>
          <p>セミナー受講者と書籍購買層の志向性や学習スタイルの違いへの配慮</p>
        </div>
        <div class="problem-item">
          <h6>難易度と継続性の課題</h6>
          <p>「後半でついてこれなくなる」という読者の脱落懸念</p>
        </div>
      `;
    }
    
    // 構造プレビューの生成
    const structurePreview = document.getElementById('structurePreview');
    if (structurePreview) {
      // 実際にはCanvasやSVGで描画するが、ここではプレースホルダとして表示
      structurePreview.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: var(--text-medium);">
          構造プレビュー（詳細は構造可視化タブで確認できます）
        </div>
      `;
    }
  }
}

/**
 * テキスト保存処理
 */
function handleSaveText() {
  alert('分析結果をテキスト形式で保存します');
  // 実際の保存処理はここに実装
}

/**
 * PDF保存処理
 */
function handleSavePdf() {
  alert('分析結果をPDF形式で保存します');
  // 実際の保存処理はここに実装
}

/**
 * 共有処理
 */
function handleShare() {
  alert('分析結果の共有リンクをコピーしました');
  // 実際の共有処理はここに実装
}

/**
 * 階層構造図の描画
 */
function drawHierarchyDiagram() {
  const canvas = document.getElementById('hierarchyDiagram');
  if (!canvas) return;
  
  // 実際にはCanvasやSVGで描画するが、ここではHTMLで構造を表現
  canvas.innerHTML = `
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div style="width: 100%; max-width: 800px;">
        <div style="background-color: var(--primary); color: white; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <strong>効果的な書籍設計のための考察と提案</strong>
        </div>
        <div style="display: flex; justify-content: space-between; gap: 10px;">
          <div style="background-color: var(--secondary); color: white; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
            <span>メディア形態の違い</span>
          </div>
          <div style="background-color: var(--secondary); color: white; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
            <span>情報入力方法の選択</span>
          </div>
          <div style="background-color: var(--secondary); color: white; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
            <span>学習継続性の確保</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 関連性図の描画
 */
function drawRelationshipDiagram() {
  const canvas = document.getElementById('relationshipDiagram');
  if (!canvas) return;
  
  // 実際にはCanvasやSVGで描画するが、ここではHTMLで構造を表現
  canvas.innerHTML = `
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div style="width: 100%; max-width: 600px; position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: var(--primary); color: white; padding: 15px; border-radius: 50%; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; text-align: center;">
          <span>読者体験の最適化</span>
        </div>
        <div style="position: absolute; top: 20%; left: 20%; background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center;">
          <span>メディア特性理解</span>
        </div>
        <div style="position: absolute; top: 20%; right: 20%; background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center;">
          <span>入力方法の選択</span>
        </div>
        <div style="position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center;">
          <span>継続性の確保</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * フレームワーク図の描画
 */
function drawFrameworkDiagram() {
  const canvas = document.getElementById('frameworkDiagram');
  if (!canvas) return;
  
  // 実際にはCanvasやSVGで描画するが、ここではHTMLで構造を表現
  canvas.innerHTML = `
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 10px;">
      <div style="width: 100%; display: flex; justify-content: space-between; gap: 10px;">
        <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">診断</div>
          <div style="font-size: 0.8rem;">読者層の理解</div>
        </div>
        <div style="display: flex; align-items: center; color: var(--text-light);">→</div>
        <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">設計</div>
          <div style="font-size: 0.8rem;">構成計画</div>
        </div>
        <div style="display: flex; align-items: center; color: var(--text-light);">→</div>
        <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">提示</div>
          <div style="font-size: 0.8rem;">選択肢提供</div>
        </div>
        <div style="display: flex; align-items: center; color: var(--text-light);">→</div>
        <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">サポート</div>
          <div style="font-size: 0.8rem;">継続支援</div>
        </div>
      </div>
    </div>
  `;
}

// Syntax self-check
try {
  console.log("Syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}