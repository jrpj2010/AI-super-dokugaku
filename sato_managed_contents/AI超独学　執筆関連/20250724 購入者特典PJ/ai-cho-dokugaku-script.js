// AI超独学 プロンプトアシスタント メインスクリプト

document.addEventListener('DOMContentLoaded', function() {
  // DOM要素の取得
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const tipsIndex = document.getElementById('tips-index');
  const promptContainer = document.getElementById('prompt-container');

  // サイドバーの開閉
  hamburger.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Tipsインデックスの生成
  function generateIndex() {
    tipsIndex.innerHTML = '';
    
    chapters.forEach(chapter => {
      // 章見出し
      const chapterHeader = document.createElement('div');
      chapterHeader.className = 'list-group-item list-group-item-action bg-light fw-bold';
      chapterHeader.textContent = `第${chapter.number}章: ${chapter.title}`;
      tipsIndex.appendChild(chapterHeader);
      
      // 各Tipsのリンク
      const chapterTips = tipsData.filter(tip => tip.chapter === chapter.number);
      chapterTips.forEach(tip => {
        const tipLink = document.createElement('a');
        tipLink.href = `#${tip.id}`;
        tipLink.className = 'list-group-item list-group-item-action ps-4';
        tipLink.textContent = `${tip.id}. ${tip.title}`;
        tipLink.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToTip(tip.id);
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
        });
        tipsIndex.appendChild(tipLink);
      });
    });
  }

  // プロンプトカードの生成
  function generatePromptCards() {
    promptContainer.innerHTML = '';
    
    tipsData.forEach(tip => {
      const card = document.createElement('div');
      card.className = 'card mb-4 shadow-sm';
      card.id = tip.id;
      
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      
      // Tips番号とタイトル
      const title = document.createElement('h3');
      title.className = 'h5 fw-bold mb-3';
      title.innerHTML = `<span class="text-primary">Tip ${tip.id}</span><br>${tip.title}`;
      cardBody.appendChild(title);
      
      // こんな方におすすめ
      const targetSection = document.createElement('div');
      targetSection.className = 'mb-3';
      targetSection.innerHTML = '<h6 class="fw-bold">【こんな方におすすめ】</h6>';
      const targetList = document.createElement('ul');
      targetList.className = 'small';
      tip.targetAudience.forEach(target => {
        const li = document.createElement('li');
        li.textContent = target;
        targetList.appendChild(li);
      });
      targetSection.appendChild(targetList);
      cardBody.appendChild(targetSection);
      
      // プロンプト編集エリア
      const promptSection = document.createElement('div');
      promptSection.className = 'mb-3';
      promptSection.innerHTML = '<h6 class="fw-bold">万能プロンプト</h6>';
      
      const promptEditor = document.createElement('div');
      promptEditor.className = 'prompt-editor border rounded p-3 bg-light';
      promptEditor.contentEditable = true;
      promptEditor.dataset.tipId = tip.id;
      promptEditor.innerHTML = formatPromptWithPlaceholders(tip);
      
      promptSection.appendChild(promptEditor);
      cardBody.appendChild(promptSection);
      
      // ボタングループ
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'btn-group';
      
      const copyButton = document.createElement('button');
      copyButton.className = 'btn btn-primary btn-sm';
      copyButton.textContent = 'コピー';
      copyButton.addEventListener('click', () => copyPrompt(promptEditor));
      
      const resetButton = document.createElement('button');
      resetButton.className = 'btn btn-outline-secondary btn-sm';
      resetButton.textContent = 'リセット';
      resetButton.addEventListener('click', () => resetPromptEditor(promptEditor, tip));
      
      buttonGroup.appendChild(copyButton);
      buttonGroup.appendChild(resetButton);
      cardBody.appendChild(buttonGroup);
      
      // 効果・効能
      const benefitsSection = document.createElement('div');
      benefitsSection.className = 'mt-3 small text-muted';
      benefitsSection.innerHTML = `<strong>この武器で得られる力:</strong> ${tip.benefits}`;
      cardBody.appendChild(benefitsSection);
      
      card.appendChild(cardBody);
      promptContainer.appendChild(card);
    });
  }

  // プロンプトを編集可能な形式にフォーマット
  function formatPromptWithPlaceholders(tip) {
    let formattedPrompt = tip.universalPrompt.template;
    
    tip.universalPrompt.variables.forEach(variable => {
      const placeholder = `<span class="prompt-placeholder" contenteditable="true" data-variable="${variable.name}" title="${variable.description}">${variable.placeholder}</span>`;
      formattedPrompt = formattedPrompt.replace(`{{${variable.name}}}`, placeholder);
    });
    
    return formattedPrompt;
  }

  // プロンプトをコピー
  async function copyPrompt(promptEditor) {
    // プレースホルダーの値を取得
    const placeholders = promptEditor.querySelectorAll('.prompt-placeholder');
    let promptText = promptEditor.textContent;
    
    try {
      await navigator.clipboard.writeText(promptText);
      
      // コピー成功のフィードバック
      const copyButton = promptEditor.parentElement.nextElementSibling.querySelector('.btn-primary');
      const originalText = copyButton.textContent;
      copyButton.textContent = 'コピーしました！';
      copyButton.classList.add('btn-success');
      copyButton.classList.remove('btn-primary');
      
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.classList.add('btn-primary');
        copyButton.classList.remove('btn-success');
      }, 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
      alert('コピーに失敗しました。手動でテキストを選択してコピーしてください。');
    }
  }

  // プロンプトエディタをリセット
  function resetPromptEditor(promptEditor, tip) {
    promptEditor.innerHTML = formatPromptWithPlaceholders(tip);
  }

  // 特定のTipsにスクロール
  function scrollToTip(tipId) {
    const element = document.getElementById(tipId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // ハイライト効果
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 2000);
    }
  }

  // URLハッシュからの直接アクセス対応
  function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      setTimeout(() => scrollToTip(hash), 100);
    }
  }

  // プレースホルダーのクリックイベント処理
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('prompt-placeholder')) {
      // 全選択状態にする
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(e.target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });

  // 初期化
  generateIndex();
  generatePromptCards();
  handleHashChange();

  // ハッシュ変更の監視
  window.addEventListener('hashchange', handleHashChange);
});