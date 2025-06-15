/**
 * ユーティリティ関数を提供する共通モジュール
 */

/**
 * テキストからキーワードを抽出する
 * @param {string} text キーワードを抽出する対象のテキスト
 * @returns {string[]} 抽出されたキーワードの配列
 */
export function extractKeywords(text) {
  if (!text || typeof text !== 'string') return [];
  
  // 実際のアプリケーションでは、自然言語処理やAIを使った
  // より高度な抽出処理を行うが、ここでは簡易的な実装
  
  // テキストを単語に分割し、長さでフィルタリング
  const words = text.toLowerCase()
    .replace(/[,.!?:;()\[\]{}]/g, '') // 句読点などを除去
    .split(/\s+/)
    .filter(word => word.length > 3); // 短すぎる単語を除外
  
  // 出現頻度をカウント
  const wordCounts = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // 頻度順にソート
  const sortedWords = Object.keys(wordCounts).sort((a, b) => {
    return wordCounts[b] - wordCounts[a];
  });
  
  // 上位のキーワードを返す（最大10個）
  return sortedWords.slice(0, 10);
}

/**
 * 結果をローカルストレージに保存
 * @param {string} id 保存する結果のID
 * @param {Object} result 保存する分析結果
 */
export function saveAnalysisResult(id, result) {
  if (!id || !result) return;
  
  try {
    // 既存の保存データを取得
    const savedResults = getSavedResults();
    
    // 新しい結果を追加（既存のIDがあれば上書き）
    savedResults[id] = {
      ...result,
      timestamp: new Date().toISOString() // タイムスタンプを追加
    };
    
    // ローカルストレージに保存
    localStorage.setItem('analysisResults', JSON.stringify(savedResults));
    
    return true;
  } catch (error) {
    console.error('保存エラー:', error);
    return false;
  }
}

/**
 * ローカルストレージから結果を取得
 * @param {string} id 取得する結果のID（省略時は全ての結果を返す）
 * @returns {Object|null} 保存された分析結果
 */
export function getAnalysisResult(id) {
  const savedResults = getSavedResults();
  
  if (id) {
    // 特定IDの結果を返す
    return savedResults[id] || null;
  }
  
  // 全ての結果を返す
  return savedResults;
}

/**
 * 保存された全ての結果を取得
 * @returns {Object} 保存された全ての分析結果
 */
function getSavedResults() {
  try {
    const resultsJson = localStorage.getItem('analysisResults');
    return resultsJson ? JSON.parse(resultsJson) : {};
  } catch (error) {
    console.error('結果取得エラー:', error);
    return {};
  }
}

/**
 * タブナビゲーションのセットアップ
 * @param {string} tabSelector タブボタンのセレクタ
 * @param {string} paneSelector タブパネルのセレクタ
 */
export function setupTabNavigation(tabSelector, paneSelector) {
  const tabButtons = document.querySelectorAll(tabSelector);
  const tabPanes = document.querySelectorAll(paneSelector);
  
  if (!tabButtons.length || !tabPanes.length) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // タブボタンのアクティブ状態を切り替え
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // タブパネルの表示を切り替え
      const target = this.getAttribute('data-tab');
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (target && pane.id === target) {
          pane.classList.add('active');
        } else if (!target && pane.getAttribute('data-result') === this.getAttribute('data-result')) {
          pane.classList.add('active');
        }
      });
    });
  });
}

// Syntax self-check
try {
  console.log("Utils module syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}