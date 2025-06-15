/**
 * 実践的アドバイスページの特定の機能を提供するモジュール
 */

// PracticalAdviceManagerクラスをエクスポート用に追加
export class PracticalAdviceManager {
  constructor() {
    // アドバイステンプレート
    this.adviceTemplates = {
      '構造改善': [
        {
          title: 'セクション分けの明確化',
          description: '各セクションの役割（問題提起→分析→提案）を視覚的に区別しましょう',
          actions: [
            'セクションごとに異なる背景色やアイコンを使用',
            '各セクションの開始時に「このセクションでは〜」という導入文を追加',
            '目次や番号付けで全体構造を可視化'
          ]
        }
      ],
      'メディア活用': [
        {
          title: '比較表の作成',
          description: '異なるメディアの特性を一目で理解できる比較表を作成しましょう',
          actions: [
            'セミナーと書籍の特徴を表形式で整理',
            '各メディアの長所・短所を並列表示',
            '読者の状況に応じた選択基準を提示'
          ]
        }
      ],
      '継続支援': [
        {
          title: 'チェックポイントの設置',
          description: '読者が自分の理解度を確認できるポイントを設けましょう',
          actions: [
            '各章末に「理解度チェックリスト」を配置',
            '「ここまでの要点」セクションを追加',
            '自己評価用の質問を用意'
          ]
        }
      ],
      '読者配慮': [
        {
          title: '多様な学習スタイルへの対応',
          description: '異なる学習スタイルを持つ読者に配慮した設計をしましょう',
          actions: [
            '視覚型・聴覚型・体感型の学習者向けコンテンツを用意',
            '複数の説明方法（文章・図・例）を併用',
            '選択可能な学習パスを提供'
          ]
        }
      ]
    };
  }
  
  /**
   * 分析結果に基づいてアドバイスを生成
   * @param {Object} analysisResult - 分析結果
   * @returns {Object[]} 生成されたアドバイス
   */
  generateAdvice(analysisResult) {
    const advice = [];
    
    // テーマに基づいてアドバイスを選択
    if (analysisResult.themes) {
      analysisResult.themes.forEach(theme => {
        const relatedAdvice = this.getAdviceByTheme(theme);
        advice.push(...relatedAdvice);
      });
    }
    
    return advice;
  }
  
  /**
   * テーマに基づいてアドバイスを取得
   * @param {string} theme - テーマ
   * @returns {Object[]} 関連するアドバイス
   */
  getAdviceByTheme(theme) {
    const advice = [];
    
    // テーマとアドバイスカテゴリのマッピング
    const themeMapping = {
      'メディア特性': 'メディア活用',
      'ターゲット層': '読者配慮',
      '継続性': '継続支援',
      'コンテンツ設計': '構造改善'
    };
    
    const category = themeMapping[theme];
    if (category && this.adviceTemplates[category]) {
      advice.push(...this.adviceTemplates[category].map(template => ({
        category,
        ...template
      })));
    }
    
    return advice;
  }
  
  /**
   * 実装ステップを生成
   * @param {Object[]} advice - アドバイスリスト
   * @returns {Object[]} 実装ステップ
   */
  generateImplementationSteps(advice) {
    return advice.map((item, index) => ({
      order: index + 1,
      title: item.title,
      description: item.description,
      tasks: item.actions.map(action => ({
        action,
        priority: 'medium',
        estimatedTime: '30-60分'
      }))
    }));
  }
}

// 既存のDOMContentLoadedイベントリスナー
document.addEventListener('DOMContentLoaded', () => {
  // タブ機能のセットアップ
  setupTabs();
  
  // モーダルのセットアップ
  setupModal();
});

/**
 * タブ機能のセットアップ
 */
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブクラスの切り替え
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // 対応するタブパネルの表示切り替え
      const tabId = button.getAttribute('data-tab');
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
          pane.classList.add('active');
        }
      });
    });
  });
}

/**
 * モーダルのセットアップ
 */
function setupModal() {
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
  
  // テンプレートフォームのリセットボタン
  const resetButton = document.querySelector('.template-btns .btn.secondary');
  const textareas = document.querySelectorAll('.template-section textarea');
  
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      textareas.forEach(textarea => {
        textarea.value = '';
      });
    });
  }
  
  // 保存ボタン
  const saveButton = document.querySelector('.template-btns .btn.primary');
  
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      const templateData = {};
      let isValid = true;
      
      textareas.forEach(textarea => {
        const section = textarea.closest('.template-section').querySelector('h5').textContent;
        templateData[section] = textarea.value;
        
        if (!textarea.value.trim()) {
          isValid = false;
          textarea.classList.add('error');
        } else {
          textarea.classList.remove('error');
        }
      });
      
      if (isValid) {
        saveTemplateData(templateData);
        templateModal.style.display = 'none';
        
        // 保存完了メッセージ
        showNotification('テンプレートを保存しました');
      } else {
        showNotification('すべてのフィールドを入力してください', 'error');
      }
    });
  }
}

/**
 * テンプレートデータを保存
 * @param {Object} data 保存するテンプレートデータ
 */
function saveTemplateData(data) {
  // 実際のアプリケーションでは、ローカルストレージやサーバーに保存
  console.log('Template data saved:', data);
}

/**
 * 通知メッセージを表示
 * @param {string} message 表示するメッセージ
 * @param {string} type メッセージの種類（'success'または'error'）
 */
function showNotification(message, type = 'success') {
  // 既存の通知を削除
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // 新しい通知を作成
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // 通知をドキュメントに追加
  document.body.appendChild(notification);
  
  // アニメーション効果
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // 数秒後に通知を削除
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Syntax self-check
try {
  console.log("Practical advice module syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}