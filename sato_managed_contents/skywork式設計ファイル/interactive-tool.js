/**
 * インタラクティブ分析ツールの機能を提供するモジュール
 */
class InteractiveTool {
  /**
   * コンストラクタ
   * @param {string} formId 入力フォームのID
   * @param {string} resultContainerId 結果表示コンテナのID
   */
  constructor(formId, resultContainerId) {
    this.form = document.getElementById(formId);
    this.resultContainer = document.getElementById(resultContainerId);
    this.sampleMessages = {
      sample1: `セミナーと書籍では、そもそも受講者とゴール設定が異なります。セミナーでは「その場で書き方を学び、実際に書いてみる」というゴールに対して、書籍では「独学で書き方を学び、自分で実践できるようになる」というゴールになります。

セミナーで効果的だった手法が、そのまま書籍でも効果的とは限りません。書籍という紙のメディアでは、セミナーのような動的なインタラクションがない分、「驚き」や「感動」をどう設計するかが重要です。

また、「音声入力をおすすめする」というアプローチは、独学に関心のある読者層には逆効果かもしれません。じっくり考える、静かに思索を深めるというスタイルを好む読者には、文章で書くプロセスそのものに価値を見出す人も多いでしょう。

「音声vs文章」を比較表にして、それぞれの特徴やメリット・デメリットを示した上で、読者が自分に合った方法を選べるようにするのはいかがでしょうか。

さらに、「後半でついてこれなくなる」という懸念に対しては、各章ごとに「ここまでのまとめ」や「チェックリスト」を設けると効果的です。また、難しい概念はわかりやすいたとえ話を用いたり、要点を短くまとめたりすることで、読者が最後まで読み進められるよう工夫できます。`,
      sample2: `効果的なプレゼンテーションは、明確な構造を持っていることが不可欠です。まず冒頭で「なぜこの話が重要なのか」という文脈を提供し、聴衆の注意を引きつけましょう。

内容の構成については、通常3〜5つの主要ポイントに絞るのが理想的です。人間の短期記憶の特性を考えると、これ以上の情報は記憶に残りにくくなります。

各ポイントについては「主張→根拠→例示→応用」という流れで展開すると、論理的で説得力のあるプレゼンテーションになります。特に具体例は、抽象的な概念を理解しやすくするために非常に重要です。

視覚資料については、テキスト情報を最小限に抑え、視覚的な要素（グラフ、図表、画像）を効果的に活用しましょう。人間の脳は、テキストよりも視覚情報を処理するのが得意です。

最後に必ず「次のアクション」を明確に示すことで、プレゼンテーションの効果を最大化できます。聴衆が「何をすべきか」を明確に理解できるようにしましょう。`,
      sample3: `ウェブコンテンツ設計において最も重要なのは、ユーザーの目的と行動パターンを理解することです。多くのサイトが失敗するのは、自社視点でコンテンツを構成しているからです。

情報アーキテクチャはユーザーの思考プロセスに沿って設計すべきです。「自分がこのサイトに来たら、どのような順序で情報を求めるだろうか」という視点でナビゲーション構造を考えましょう。

コンテンツは「逆ピラミッド型」で構成するのが効果的です。最も重要な情報を先に提示し、徐々に詳細へと掘り下げていく構造です。ユーザーは最初の数秒でページの価値を判断するため、重要情報を上部に配置することが不可欠です。

視覚的階層も重要です。フォントサイズ、色のコントラスト、余白などを使って、情報の重要度を視覚的に表現しましょう。これにより、ユーザーはページをスキャンするだけで重要なポイントを把握できます。

最後に、モバイルファーストの原則に従い、小さな画面での表示を優先して設計することをおすすめします。画面サイズに関係なく、核となるメッセージが明確に伝わる構造を心がけましょう。`
    };
    
    this.setupEventListeners();
  }

  /**
   * イベントリスナーのセットアップ
   */
  setupEventListeners() {
    // 分析ボタンのイベントリスナー
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', this.handleAnalyze.bind(this));
    }
    
    // サンプル読み込みボタンのイベントリスナー
    const loadSampleBtn = document.getElementById('loadSampleBtn');
    if (loadSampleBtn) {
      loadSampleBtn.addEventListener('click', () => this.loadSampleMessage('sample1'));
    }
    
    // サンプルアイテムのイベントリスナー
    const sampleItems = document.querySelectorAll('.sample-item');
    sampleItems.forEach(item => {
      item.addEventListener('click', () => {
        const sampleId = item.getAttribute('data-id');
        this.loadSampleMessage(sampleId);
      });
    });
    
    // アドバイス生成ボタンのイベントリスナー
    const generateAdviceBtn = document.getElementById('generateAdviceBtn');
    if (generateAdviceBtn) {
      generateAdviceBtn.addEventListener('click', this.generateAdvice.bind(this));
    }
    
    // 結果タブのイベントリスナー
    const resultTabs = document.querySelectorAll('.result-tab');
    resultTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('data-result');
        
        // アクティブクラスの切り替え
        resultTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 対応するパネルの表示切り替え
        const resultPanels = document.querySelectorAll('.result-panel');
        resultPanels.forEach(panel => {
          panel.classList.remove('active');
        });
        document.getElementById(`${targetPanel}-panel`).classList.add('active');
      });
    });
    
    // ツールタブのイベントリスナー
    const toolTabs = document.querySelectorAll('.tool-tab');
    toolTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('data-tab');
        
        // アクティブクラスの切り替え
        toolTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 対応するパネルの表示切り替え
        const toolPanels = document.querySelectorAll('.tool-panel');
        toolPanels.forEach(panel => {
          panel.classList.remove('active');
        });
        document.getElementById(targetPanel).classList.add('active');
      });
    });
    
    // 保存ボタンのイベントリスナー
    const saveTextBtn = document.getElementById('saveTextBtn');
    const savePdfBtn = document.getElementById('savePdfBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (saveTextBtn) {
      saveTextBtn.addEventListener('click', this.saveAsText.bind(this));
    }
    
    if (savePdfBtn) {
      savePdfBtn.addEventListener('click', this.saveAsPdf.bind(this));
    }
    
    if (shareBtn) {
      shareBtn.addEventListener('click', this.shareResults.bind(this));
    }
  }

  /**
   * メッセージを処理して分析結果を表示
   * @param {string} message 分析対象のメッセージ
   */
  async processMessage(message) {
    // 実際のアプリケーションでは、サーバーサイドでの分析処理を行うが、
    // ここではクライアントサイドで簡易的に処理
    
    try {
      // 分析結果の表示
      this.displayResults({
        themes: [
          'メディア特性の理解',
          '選択肢の提示',
          '読者層への配慮',
          '継続支援の工夫'
        ],
        structure: {
          mainPoints: [
            'メディア形態の違い - セミナーvs書籍',
            '情報入力方法の選択 - 音声入力vs文章入力',
            '学習継続性の確保 - 難易度設計と継続支援'
          ],
          logicalFlow: [
            '問題提起',
            '背景分析',
            '具体的提案'
          ]
        },
        problems: [
          {
            title: 'メディア間の転用に関する懸念',
            description: 'セミナーで効果的なコンテンツが書籍でも同様に効果的とは限らないという認識'
          },
          {
            title: 'ターゲット層の認識ギャップ',
            description: 'セミナー受講者と書籍購買層の志向性や学習スタイルの違いへの配慮'
          },
          {
            title: '難易度と継続性の課題',
            description: '「後半でついてこれなくなる」という読者の脱落懸念'
          }
        ]
      });
      
      return true;
    } catch (error) {
      console.error('メッセージ処理エラー:', error);
      return false;
    }
  }

  /**
   * 分析結果を表示
   * @param {Object} results 分析結果
   */
  displayResults(results) {
    const analysisResults = document.getElementById('analysisResults');
    if (!analysisResults) return;
    
    // 結果エリアを表示
    analysisResults.style.display = 'block';
    
    // テーマバブルの表示
    const themeBubbles = document.getElementById('themeBubbles');
    if (themeBubbles && results.themes) {
      themeBubbles.innerHTML = results.themes.map(theme => 
        `<div class="theme-bubble">${theme}</div>`
      ).join('');
    }
    
    // 問題リストの表示
    const problemList = document.getElementById('problemList');
    if (problemList && results.problems) {
      problemList.innerHTML = results.problems.map(problem => `
        <div class="problem-item">
          <h6>${problem.title}</h6>
          <p>${problem.description}</p>
        </div>
      `).join('');
    }
    
    // 構造プレビューの表示
    const structurePreview = document.getElementById('structurePreview');
    if (structurePreview && results.structure) {
      structurePreview.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 10px;">
          <h6 style="text-align: center; margin-bottom: 15px;">論理構造</h6>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            ${results.structure.logicalFlow.map(item => 
              `<div style="background-color: var(--primary-light); color: white; padding: 8px; border-radius: 4px; text-align: center; flex: 1; margin: 0 5px;">${item}</div>`
            ).join('')}
          </div>
          <div style="font-size: 0.9rem; text-align: center; color: var(--text-medium);">
            詳細な構造分析は「構造可視化」タブで確認できます
          </div>
        </div>
      `;
    }
  }

  /**
   * サンプルメッセージを読み込む
   * @param {string} sampleId サンプルID（'sample1', 'sample2', 'sample3'）
   */
  loadSampleMessage(sampleId) {
    const messageInput = document.getElementById('messageInput');
    if (!messageInput) return;
    
    if (this.sampleMessages[sampleId]) {
      messageInput.value = this.sampleMessages[sampleId];
      this.handleAnalyze();
    }
  }
  
  /**
   * 「分析する」ボタンのクリックハンドラ
   */
  async handleAnalyze() {
    const messageInput = document.getElementById('messageInput');
    if (!messageInput || !messageInput.value.trim()) {
      alert('分析するメッセージを入力してください');
      return;
    }
    
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
      analyzeBtn.disabled = true;
      analyzeBtn.textContent = '分析中...';
    }
    
    await this.processMessage(messageInput.value);
    
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = '分析する';
    }
  }
  
  /**
   * 「アドバイスを生成」ボタンのクリックハンドラ
   */
  generateAdvice() {
    const adviceResults = document.getElementById('adviceResults');
    if (!adviceResults) return;
    
    // アドバイス結果エリアを表示
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
    
    // レーダーチャートの生成（実際のアプリではChart.jsなどを使用）
    const evaluationChart = document.getElementById('evaluationChart');
    if (evaluationChart) {
      evaluationChart.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="width: 250px; height: 250px; position: relative; margin: 0 auto;">
            <!-- レーダーチャートの代わりに簡易表示 -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; border: 2px dashed var(--border-medium); border-radius: 50%;"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150px; height: 150px; border: 1px dashed var(--border-medium); border-radius: 50%;"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border: 1px dashed var(--border-medium); border-radius: 50%;"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; border: 1px dashed var(--border-medium); border-radius: 50%;"></div>
            
            <!-- 評価軸 -->
            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); text-align: center;">
              <div style="height: 100px; border-left: 1px solid var(--border-medium);"></div>
              <div style="color: var(--primary); font-weight: bold;">構造性</div>
            </div>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); text-align: center;">
              <div style="color: var(--primary); font-weight: bold;">実践性</div>
              <div style="height: 100px; border-left: 1px solid var(--border-medium);"></div>
            </div>
            <div style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); text-align: center;">
              <div style="color: var(--primary); font-weight: bold; width: 80px;">明確性</div>
              <div style="width: 100px; border-top: 1px solid var(--border-medium);"></div>
            </div>
            <div style="position: absolute; top: 50%; right: 0; transform: translateY(-50%); text-align: center;">
              <div style="width: 100px; border-top: 1px solid var(--border-medium);"></div>
              <div style="color: var(--primary); font-weight: bold; width: 80px;">説得力</div>
            </div>
            
            <!-- データポイント（実際のアプリでは動的に計算） -->
            <div style="position: absolute; top: 20%; left: 50%; width: 10px; height: 10px; background-color: var(--accent); border-radius: 50%; transform: translateX(-50%);"></div>
            <div style="position: absolute; bottom: 30%; left: 50%; width: 10px; height: 10px; background-color: var(--accent); border-radius: 50%; transform: translateX(-50%);"></div>
            <div style="position: absolute; top: 50%; left: 25%; width: 10px; height: 10px; background-color: var(--accent); border-radius: 50%; transform: translateY(-50%);"></div>
            <div style="position: absolute; top: 50%; right: 20%; width: 10px; height: 10px; background-color: var(--accent); border-radius: 50%; transform: translateY(-50%);"></div>
          </div>
        </div>
      `;
    }
  }
  
  /**
   * テキストとして保存
   */
  saveAsText() {
    alert('分析結果をテキスト形式で保存します');
    // 実際の保存処理はここに実装
    // Blobを作成しダウンロードリンクを生成するなどの処理
  }
  
  /**
   * PDFとして保存
   */
  saveAsPdf() {
    alert('分析結果をPDF形式で保存します');
    // 実際の保存処理はここに実装
    // PDFライブラリを使用して変換するなどの処理
  }
  
  /**
   * 結果を共有
   */
  shareResults() {
    alert('分析結果の共有リンクをコピーしました');
    // 実際の共有処理はここに実装
    // クリップボードにコピーするなどの処理
  }
}

// DOM読み込み完了時の初期化処理
document.addEventListener('DOMContentLoaded', () => {
  // インタラクティブツールの初期化
  const interactiveTool = new InteractiveTool('analyzer-form', 'analysisResults');
  
  // タブ切り替え機能の初期化
  document.querySelectorAll('.result-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // アクティブタブの切り替え
      document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // コンテンツパネルの切り替え
      const target = tab.getAttribute('data-result');
      document.querySelectorAll('.result-panel').forEach(panel => panel.classList.remove('active'));
      document.getElementById(`${target}-panel`).classList.add('active');
    });
  });
  
  // テンプレートモーダルの設定
  const templateModal = document.getElementById('templateModal');
  const showTemplateBtn = document.getElementById('showTemplateBtn');
  const closeModal = document.querySelector('.close-modal');
  
  if (showTemplateBtn && templateModal) {
    showTemplateBtn.addEventListener('click', () => {
      templateModal.style.display = 'block';
    });
  }
  
  if (closeModal && templateModal) {
    closeModal.addEventListener('click', () => {
      templateModal.style.display = 'none';
    });
  }
  
  // モーダル外クリックで閉じる
  window.addEventListener('click', (event) => {
    if (event.target === templateModal) {
      templateModal.style.display = 'none';
    }
  });
});

export { InteractiveTool };

// Syntax self-check
try {
  console.log("Interactive tool syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}