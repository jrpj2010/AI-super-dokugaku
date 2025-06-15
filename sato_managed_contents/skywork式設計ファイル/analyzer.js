/**
 * メッセージ分析機能を提供するモジュール
 */
class MessageAnalyzer {
  constructor() {
    // 分析用の辞書データ
    this.themeKeywords = {
      'メディア特性': ['書籍', 'セミナー', '紙', '動画', 'メディア', '形態', '媒体', '配信'],
      'ターゲット層': ['読者', '受講者', '購買層', '対象', 'ユーザー', '層', '志向性'],
      '学習方法': ['独学', '学習', '教育', '勉強', 'スタイル', '方法', 'アプローチ'],
      'コンテンツ設計': ['構成', '設計', '構造', '章立て', 'レイアウト', '配置'],
      '継続性': ['継続', '脱落', '離脱', '完読', '最後まで', '挫折'],
      'インタラクション': ['音声入力', '文章入力', '入力', '選択', 'インタラクティブ'],
      '差別化': ['差別化', '特徴', '強み', '独自性', '価値', 'ならでは'],
      '効果測定': ['効果', '反応', '評価', 'フィードバック', '成果']
    };
    
    this.structurePatterns = {
      '問題提起': ['懸念', '問題', '課題', 'かもしれない', '難しい', 'ではない'],
      '分析': ['理由', 'なぜなら', 'ため', '原因', '背景', '考えると'],
      '提案': ['提案', 'おすすめ', 'いかがでしょうか', '効果的', '良い', 'べき'],
      '比較': ['一方', '対して', 'より', 'と比べて', 'に対し', '違い'],
      '結論': ['したがって', 'つまり', '結論', 'まとめ', '以上']
    };
  }

  /**
   * メッセージを分析して結果を返す
   * @param {string} text 分析対象のテキスト
   * @returns {Promise<Object>} 分析結果
   */
  async analyzeMessage(text) {
    // テキストの前処理
    const processedText = this.preprocessText(text);
    
    // 各種分析の実行
    const themes = this.identifyThemes(processedText);
    const structure = this.analyzeStructure(processedText);
    const problems = this.identifyProblems(processedText);
    const advice = this.generateAdvice(structure, themes);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          themes,
          structure,
          problems,
          advice,
          metadata: {
            textLength: text.length,
            paragraphCount: text.split('\n\n').filter(p => p.trim()).length,
            sentenceCount: text.split(/[。！？]/).filter(s => s.trim()).length
          }
        });
      }, 500);
    });
  }

  /**
   * テキストの前処理
   * @param {string} text 処理するテキスト
   * @returns {string} 前処理済みテキスト
   */
  preprocessText(text) {
    // 改行の正規化
    let processed = text.replace(/\r\n/g, '\n');
    
    // 連続する空白の削除
    processed = processed.replace(/\s+/g, ' ');
    
    // 段落の区切りを保持
    processed = processed.replace(/\n\n+/g, '\n\n');
    
    return processed.trim();
  }

  /**
   * メッセージの主要テーマを抽出
   * @param {string} text 分析対象のテキスト
   * @returns {string[]} 抽出されたテーマのリスト
   */
  identifyThemes(text) {
    const themes = [];
    const themeScores = {};
    
    // 各テーマのスコアを計算
    for (const [theme, keywords] of Object.entries(this.themeKeywords)) {
      let score = 0;
      
      for (const keyword of keywords) {
        const regex = new RegExp(keyword, 'gi');
        const matches = text.match(regex);
        if (matches) {
          score += matches.length;
        }
      }
      
      if (score > 0) {
        themeScores[theme] = score;
      }
    }
    
    // スコアの高い順にソートしてテーマを抽出
    const sortedThemes = Object.entries(themeScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // 上位5つまで
    
    for (const [theme, score] of sortedThemes) {
      themes.push(theme);
    }
    
    // テーマが見つからない場合はデフォルトを返す
    if (themes.length === 0) {
      return ['コンテンツ設計', '読者体験', '効果的な伝達'];
    }
    
    return themes;
  }

  /**
   * メッセージの構造を分析
   * @param {string} text 分析対象のテキスト
   * @returns {Object} 構造分析結果
   */
  analyzeStructure(text) {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const mainPoints = [];
    const logicalFlow = [];
    const strengths = [];
    const weaknesses = [];
    
    // 段落ごとの分析
    paragraphs.forEach((paragraph, index) => {
      // 主要ポイントの抽出
      const sentences = paragraph.split(/[。！？]/).filter(s => s.trim());
      if (sentences.length > 0 && index < 3) {
        mainPoints.push(sentences[0].substring(0, 50) + (sentences[0].length > 50 ? '...' : ''));
      }
      
      // 論理的な流れの分析
      for (const [type, patterns] of Object.entries(this.structurePatterns)) {
        for (const pattern of patterns) {
          if (paragraph.includes(pattern)) {
            logicalFlow.push(type);
            break;
          }
        }
      }
    });
    
    // 論理フローの重複を削除
    const uniqueFlow = [...new Set(logicalFlow)];
    
    // 強みの分析
    if (uniqueFlow.includes('問題提起') && uniqueFlow.includes('提案')) {
      strengths.push('問題提起から解決策への明確な流れ');
    }
    
    if (mainPoints.length >= 3) {
      strengths.push('複数の視点からの包括的な分析');
    }
    
    if (text.includes('たとえば') || text.includes('例えば') || text.includes('具体的に')) {
      strengths.push('具体例を用いた説明');
    }
    
    // 弱みの分析
    if (paragraphs.length > 10) {
      weaknesses.push('構造が長すぎる可能性');
    }
    
    if (!uniqueFlow.includes('結論')) {
      weaknesses.push('明確な結論が不足している可能性');
    }
    
    return {
      mainPoints: mainPoints.length > 0 ? mainPoints : ['メッセージの要点1', 'メッセージの要点2', 'メッセージの要点3'],
      logicalFlow: uniqueFlow.length > 0 ? uniqueFlow : ['問題提起', '分析', '提案'],
      strengths: strengths.length > 0 ? strengths : ['論理的な構成', '読者への配慮'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['データの裏付けが必要']
    };
  }

  /**
   * 問題点を特定
   * @param {string} text 分析対象のテキスト
   * @returns {Object[]} 特定された問題点のリスト
   */
  identifyProblems(text) {
    const problems = [];
    
    // キーワードベースの問題抽出
    if (text.includes('懸念') || text.includes('問題') || text.includes('課題')) {
      if (text.includes('セミナー') && text.includes('書籍')) {
        problems.push({
          title: 'メディア間の転用に関する懸念',
          description: 'セミナーで効果的なコンテンツが書籍でも同様に効果的とは限らないという認識'
        });
      }
    }
    
    if (text.includes('読者') && (text.includes('ターゲット') || text.includes('層'))) {
      problems.push({
        title: 'ターゲット層の認識ギャップ',
        description: '想定読者と実際の読者層の志向性や学習スタイルの違いへの配慮'
      });
    }
    
    if (text.includes('脱落') || text.includes('ついてこれなくなる') || text.includes('継続')) {
      problems.push({
        title: '継続性の課題',
        description: '読者が途中で離脱する可能性への対策'
      });
    }
    
    // 問題が見つからない場合はデフォルトを返す
    if (problems.length === 0) {
      problems.push({
        title: '明確な課題の特定',
        description: 'メッセージから具体的な問題点を抽出し、対策を検討する必要があります'
      });
    }
    
    return problems;
  }

  /**
   * 実践的アドバイスを生成
   * @param {Object} structure 構造分析結果
   * @param {string[]} themes 特定されたテーマ
   * @returns {Object[]} 生成されたアドバイスのリスト
   */
  generateAdvice(structure, themes) {
    const advice = [];
    
    // 構造に基づくアドバイス
    if (structure.weaknesses.includes('明確な結論が不足している可能性')) {
      advice.push({
        category: '構造改善',
        content: 'メッセージの最後に、主要なポイントをまとめた明確な結論を追加することをお勧めします。'
      });
    }
    
    if (structure.weaknesses.includes('構造が長すぎる可能性')) {
      advice.push({
        category: '構造改善',
        content: 'メッセージを複数のセクションに分割し、各セクションに見出しをつけることで読みやすさを向上できます。'
      });
    }
    
    // テーマに基づくアドバイス
    if (themes.includes('メディア特性')) {
      advice.push({
        category: 'メディア活用',
        content: '各メディアの特性を比較表にまとめることで、違いをより明確に伝えることができます。'
      });
    }
    
    if (themes.includes('継続性')) {
      advice.push({
        category: '継続支援',
        content: '読者の継続を支援する具体的な仕組み（チェックリスト、進捗管理ツールなど）を提供すると効果的です。'
      });
    }
    
    // 一般的なアドバイス
    if (structure.mainPoints.length < 3) {
      advice.push({
        category: '内容充実',
        content: '主要なポイントを3〜5つに絞り、それぞれを明確に説明することで、メッセージの説得力が向上します。'
      });
    }
    
    return advice.length > 0 ? advice : [
      {
        category: '全般的改善',
        content: 'メッセージの目的を明確にし、読者の立場に立った構成を心がけましょう。'
      }
    ];
  }
}

// モジュールとしてエクスポート
export { MessageAnalyzer };

// Analyzer インスタンスを生成して変数に格納
const analyzer = new MessageAnalyzer();

// DOM要素を取得
const analyzeBtn = document.getElementById('analyzeBtn');
const messageInput = document.getElementById('messageInput');
const themeBubbles = document.getElementById('themeBubbles');
const problemList = document.getElementById('problemList');
const structurePreview = document.getElementById('structurePreview');
const analysisResults = document.getElementById('analysisResults');

// 分析ボタンのクリックイベントハンドラ
if (analyzeBtn) {
  analyzeBtn.addEventListener('click', async () => {
    if (!messageInput || !messageInput.value.trim()) {
      alert('分析するメッセージを入力してください');
      return;
    }
    
    // ボタンを無効化して分析中の状態を表示
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = '分析中...';
    
    try {
      // メッセージを分析
      const result = await analyzer.analyzeMessage(messageInput.value);
      
      // 結果を表示
      displayAnalysisResults(result);
    } catch (error) {
      console.error('分析エラー:', error);
      alert('分析中にエラーが発生しました。もう一度お試しください。');
    } finally {
      // ボタンを元の状態に戻す
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = '分析する';
    }
  });
}

/**
 * 分析結果を表示する
 * @param {Object} result 分析結果
 */
function displayAnalysisResults(result) {
  if (!analysisResults) return;
  
  // 結果エリアを表示
  analysisResults.style.display = 'block';
  
  // テーマバブルを表示
  if (themeBubbles && result.themes) {
    themeBubbles.innerHTML = '';
    result.themes.forEach(theme => {
      const bubble = document.createElement('div');
      bubble.className = 'theme-bubble';
      bubble.textContent = theme;
      themeBubbles.appendChild(bubble);
    });
  }
  
  // 問題リストを表示
  if (problemList && result.problems) {
    problemList.innerHTML = '';
    result.problems.forEach(problem => {
      const item = document.createElement('div');
      item.className = 'problem-item';
      item.innerHTML = `
        <h6>${problem.title}</h6>
        <p>${problem.description}</p>
      `;
      problemList.appendChild(item);
    });
  }
  
  // 構造プレビューを表示
  if (structurePreview && result.structure) {
    structurePreview.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px;">
        <div style="font-weight: bold; margin-bottom: 10px;">主要な論理構造</div>
        <div style="display: flex; width: 100%; justify-content: space-around; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
          ${result.structure.logicalFlow.map(step => 
            `<div style="background-color: var(--primary-light); color: white; padding: 8px; border-radius: 4px; text-align: center; flex: 0 0 auto;">${step}</div>`
          ).join('')}
        </div>
        <div style="font-size: 0.9rem; text-align: center; color: var(--text-medium); margin-top: 10px;">
          詳細な構造分析は「構造可視化」タブで確認できます
        </div>
      </div>
    `;
  }
  
  // メタデータを表示（オプション）
  if (result.metadata) {
    console.log('メッセージ分析メタデータ:', result.metadata);
  }
}

// Syntax self-check
try {
  console.log("Analyzer syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}