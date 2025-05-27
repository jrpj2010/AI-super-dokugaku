// グローバル変数としてエディターコンテンツを保持
let editorContent = '';
let isFullscreenMode = false;
let wysiwygReady = false;
let pendingWysiwygContent = null;

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
  // WYSIWYGエディターフレームからのメッセージをリッスン
  window.addEventListener('message', function(event) {
    if (event.data.type === 'editor-content-update') {
      editorContent = event.data.content;
      syncEditorContent();
    } else if (event.data.type === 'wysiwyg-content-updated') {
      console.log('WYSIWYG更新確認:', event.data);
    } else if (event.data.type === 'wysiwyg-ready') {
      console.log('WYSIWYG準備完了シグナル受信');
      wysiwygReady = true;
      // 保留中のコンテンツがあれば送信
      if (pendingWysiwygContent) {
        console.log('保留中のコンテンツを送信中...');
        const wysiwygFrame = document.getElementById('wysiwyg-frame');
        if (wysiwygFrame && wysiwygFrame.contentWindow) {
          wysiwygFrame.contentWindow.postMessage({
            type: 'set-content',
            content: pendingWysiwygContent
          }, '*');
          pendingWysiwygContent = null;
        }
      }
    }
  });

  // タブ切り替え時のコンテンツ同期
  setupTabSwitching();
  
  // ローディングオーバーレイ要素の作成
  createLoadingOverlay();
  
  // エスケープキーでフルスクリーンモードを終了
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isFullscreenMode) {
      updateEditorViewMode(false);
      
      // Alpine.jsの状態も更新
      const alpine = getAlpineData();
      if (alpine) {
        alpine.isFullscreen = false;
      }
    }
  });
});

// ローディングオーバーレイ要素の作成
function createLoadingOverlay() {
  // すでに存在する場合は作成しない
  if (document.getElementById('loading-overlay')) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'loading-overlay';
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
  
  const spinnerContainer = document.createElement('div');
  spinnerContainer.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center';
  
  const spinner = document.createElement('div');
  spinner.className = 'w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4';
  
  const message = document.createElement('p');
  message.className = 'text-lg font-medium text-gray-700 dark:text-gray-300';
  message.textContent = 'HTMLを生成中...';
  
  spinnerContainer.appendChild(spinner);
  spinnerContainer.appendChild(message);
  overlay.appendChild(spinnerContainer);
  
  document.body.appendChild(overlay);
}

// ローディングオーバーレイの表示・非表示
function toggleLoadingOverlay(show) {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  
  overlay.classList.toggle('hidden', !show);
}

// エディターコンテンツを取得
function getEditorContent() {
  return editorContent;
}

// エディターコンテンツを設定
function setEditorContent(html) {
  console.log('setEditorContent called, html length:', html ? html.length : 0);
  editorContent = html;
  
  // WYSIWYGエディターを更新
  const wysiwygFrame = document.getElementById('wysiwyg-frame');
  console.log('WYSIWYG frame exists:', !!wysiwygFrame);
  console.log('WYSIWYG frame src:', wysiwygFrame ? wysiwygFrame.src : 'N/A');
  console.log('WYSIWYG frame display style:', wysiwygFrame ? window.getComputedStyle(wysiwygFrame.parentElement).display : 'N/A');
  
  if (wysiwygFrame) {
    // WYSIWYGが準備完了しているか確認
    if (!wysiwygReady) {
      console.log('WYSIWYG not ready yet, queuing content...');
      pendingWysiwygContent = html;
      return;
    }
    
    // フレームが完全に読み込まれているか確認
    const checkAndSendContent = () => {
      try {
        // contentWindowの存在を確認
        if (!wysiwygFrame.contentWindow) {
          console.log('WYSIWYG frame contentWindow not ready, retrying...');
          setTimeout(checkAndSendContent, 100);
          return;
        }
        
        // contentDocumentも確認（アクセス可能性チェック）
        const frameDoc = wysiwygFrame.contentDocument || wysiwygFrame.contentWindow.document;
        if (!frameDoc || frameDoc.readyState !== 'complete') {
          console.log('WYSIWYG frame document not ready, state:', frameDoc ? frameDoc.readyState : 'null');
          setTimeout(checkAndSendContent, 100);
          return;
        }
        
        // editor-content要素の存在を確認
        const editorElement = frameDoc.getElementById('editor-content');
        if (!editorElement) {
          console.log('WYSIWYG editor-content element not found, retrying...');
          setTimeout(checkAndSendContent, 100);
          return;
        }
        
        console.log('WYSIWYG frame ready, sending content...');
        // WYSIWYGフレームのwindowに直接送信
        wysiwygFrame.contentWindow.postMessage({
          type: 'set-content',
          content: html
        }, '*');
        console.log('Message posted to WYSIWYG frame contentWindow');
        
        // 念のため、src属性も確認
        if (wysiwygFrame.src && wysiwygFrame.src.includes('wysiwyg')) {
          console.log('WYSIWYG frame has correct src');
        }
        
        // フォールバック: 直接DOMを操作（同一オリジンの場合のみ可能）
        try {
          const frameDoc = wysiwygFrame.contentDocument || wysiwygFrame.contentWindow.document;
          const editorElement = frameDoc.getElementById('editor-content');
          if (editorElement && editorElement.innerHTML !== html) {
            console.log('Fallback: Setting content directly in iframe DOM');
            editorElement.innerHTML = html;
          }
        } catch (e) {
          console.log('Direct DOM access not possible (expected for cross-origin), relying on postMessage');
        }
      } catch (e) {
        console.error('Error checking WYSIWYG frame:', e);
        // クロスオリジンエラーの場合でも、メッセージは送信してみる
        if (wysiwygFrame.contentWindow) {
          wysiwygFrame.contentWindow.postMessage({
            type: 'set-content',
            content: html
          }, '*');
          console.log('Message posted despite error (might be cross-origin)');
        }
      }
    };
    
    // すぐに試して、必要なら再試行
    checkAndSendContent();
  }
  
  // コードエディターを更新
  const codeEditor = document.getElementById('code-editor');
  console.log('Code editor exists:', !!codeEditor);
  if (codeEditor) {
    codeEditor.value = html;
    console.log('Code editor updated');
  }
  
  // プレビューを更新
  updatePreview(html);
  console.log('Preview updated');
}

// プレビューiframeを更新
function updatePreview(html) {
  const previewFrame = document.getElementById('preview-frame');
  if (previewFrame) {
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDoc.open();
    previewDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <link rel="stylesheet" href="/static/css/tailwind.css">
      </head>
      <body>
        ${html}
      </body>
      </html>
    `);
    previewDoc.close();
  }
}

// 思考プロセス出力をフォーマット
function formatThinkingOutput(thinking) {
  if (!thinking) return '';
  
  // 簡易マークダウン変換（見出し、コードブロック、リスト処理などを追加）
  return thinking
    // マークダウンの見出しをHTML見出しタグに変換
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
    // コードブロックを処理
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 my-3 rounded overflow-auto"><code>$1</code></pre>')
    // インラインコード
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    // 順序なしリスト
    .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
    // 順序付きリスト
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    // 改行を保持
    .replace(/\n/g, '<br>');
}

// エディター間でコンテンツを同期
function syncEditorContent() {
  const codeEditor = document.getElementById('code-editor');
  if (codeEditor) {
    codeEditor.value = editorContent;
  }
  updatePreview(editorContent);
}

// タブ切り替え機能を設定
function setupTabSwitching() {
  // ボタンクリックでタブ切り替えを監視するシンプルな方法
  document.addEventListener('click', function(event) {
    const button = event.target.closest('button[x-on\\:click], button[x-show], button[x-bind]');
    if (button) {
      // タブ切り替え後に適切な処理を行うための遅延
      setTimeout(() => {
        const codeTab = document.getElementById('code-editor');
        const previewTab = document.getElementById('preview-frame');
        const wysiwygTab = document.getElementById('wysiwyg-frame');
        
        // コードタブがアクティブになったら
        if (codeTab && !codeTab.closest('[style*="display: none"]')) {
          codeTab.value = editorContent;
        }
        // プレビュータブがアクティブになったら
        else if (previewTab && !previewTab.closest('[style*="display: none"]')) {
          updatePreview(editorContent);
        }
        // WYSIWYGタブがアクティブになったら
        else if (wysiwygTab && !wysiwygTab.closest('[style*="display: none"]')) {
          console.log('WYSIWYG tab activated, updating content...');
          // WYSIWYGタブがアクティブになったときにコンテンツを送信
          if (wysiwygTab.contentWindow) {
            wysiwygTab.contentWindow.postMessage({
              type: 'set-content',
              content: editorContent
            }, '*');
            console.log('Content sent to WYSIWYG on tab activation');
          }
        }
      }, 50);
    }
  });

  // コードエディターの変更イベントを監視
  const codeEditor = document.getElementById('code-editor');
  if (codeEditor) {
    codeEditor.addEventListener('input', function() {
      editorContent = codeEditor.value;
      
      // WYSIWYG更新
      const wysiwygFrame = document.getElementById('wysiwyg-frame');
      if (wysiwygFrame && wysiwygFrame.contentWindow) {
        wysiwygFrame.contentWindow.postMessage({
          type: 'set-content',
          content: editorContent
        }, '*');
      }
      
      // プレビュー更新
      updatePreview(editorContent);
    });
  }
}

// HTMLを生成するためのプロンプト送信
async function generateHTML() {
  // データ取得とバリデーション
  const body = getRequestBody();
  if (!body) return;

  try {
    // UI状態の更新
    setLoadingState(true);
    clearError();
    
    // デバッグログ（API通信のみ）
    if (window.logApiEvent) {
      window.logApiEvent('[API通信] HTML生成リクエストを準備中...');
      
      // プロンプトの文字数も表示
      const systemLen = body.system_prompt.length;
      const userLen = body.user_prompt.length;
      window.logApiEvent(`[API通信] プロンプト準備完了 (システム: ${systemLen}文字, ユーザー: ${userLen}文字)`);
      
      if (body.use_thinking) {
        window.logApiEvent('[API通信] シンキングモード: 有効');
      }
      window.logApiEvent('[API通信] HTML生成リクエストを送信中...');
    }
    
    // 生成開始メッセージ
    showInfoToast('HTMLの生成を開始しました...');
    
    // API呼び出し
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    
    if (window.logApiEvent) {
      window.logApiEvent('[API通信] サーバーからレスポンスを受信中...');
    }
    
    // エラーチェック
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'HTMLの生成に失敗しました');
    }
    
    // レスポンス処理
    if (window.logApiEvent) {
      window.logApiEvent('[API通信] HTMLコードを解析中...');
    }
    const data = await response.json();
    
    // デバッグ：レスポンスデータの確認
    console.log('API Response:', data);
    if (data.html) {
      console.log('HTML length:', data.html.length);
      console.log('HTML preview:', data.html.substring(0, 200));
      if (window.logApiEvent) {
        window.logApiEvent(`[API通信] HTML生成成功 (${data.html.length}文字)`);
      }
    } else {
      console.error('No HTML in response:', data);
      if (window.logApiEvent) {
        window.logApiEvent('[警告] レスポンスにHTMLが含まれていません');
      }
    }
    
    if (window.logApiEvent) {
      window.logApiEvent('[API通信] エディタに結果を反映中...');
    }
    processResponse(data);
    
    // デバッグログ - 成功（API通信のみ）
    if (window.logApiEvent) {
      window.logApiEvent('[API通信] レスポンスを受信しました');
      window.logApiEvent('[API通信] HTML生成が完了しました');
    }
    
    // 成功メッセージ
    showSuccessToast('HTMLが生成されました！');
    
  } catch (error) {
    console.error('HTMLの生成エラー:', error);
    showErrorToast(`エラー: ${error.message}`);
    
    // デバッグログ - エラー
    if (window.logApiEvent) {
      window.logApiEvent(`[エラー] HTML生成失敗: ${error.message}`);
    }
  } finally {
    setLoadingState(false);
    
    // デバッグログ - 完了（API通信のみ）
    if (window.debugLogger && window.debugLogger.logApiEvent) {
      window.debugLogger.logApiEvent('[API通信] 処理が完了しました');
    }
  }
}

// リクエストボディを取得
function getRequestBody() {
  const systemPromptElem = document.querySelector('[x-model="systemPrompt"]');
  const userPromptElem = document.querySelector('[x-model="userPrompt"]');
  const useThinkingElem = document.querySelector('#thinking-mode');
  const useWebSearchElem = document.querySelector('#web-search-mode');
  
  if (!systemPromptElem || !userPromptElem) {
    console.error('プロンプト入力要素が見つかりません');
    return null;
  }
  
  // APIキーを取得（localStorageから直接取得）
  const apiKey = localStorage.getItem('anthropic_api_key');
  
  if (!apiKey) {
    showError('APIキーが設定されていません。設定画面でAPIキーを入力してください。');
    if (window.logApiEvent) {
      window.logApiEvent('[エラー] APIキー未設定 - 設定画面で設定してください');
    }
    return null;
  }
  
  return {
    system_prompt: systemPromptElem.value,
    user_prompt: userPromptElem.value,
    use_thinking: useThinkingElem ? useThinkingElem.checked : false,
    use_web_search: useWebSearchElem ? useWebSearchElem.checked : false,
    api_key: apiKey
  };
}

// ローディング状態の設定
function setLoadingState(loading) {
  // Alpine.jsデータ更新
  const alpine = getAlpineData();
  if (alpine) {
    alpine.loading = loading;
  }
  
  // オーバーレイ表示切替
  toggleLoadingOverlay(loading);
  
  // ボタンの状態更新
  const generateButton = document.querySelector('button[onclick*="generateHTML"], button[x-on\\:click*="generateHTML"]');
  if (generateButton) {
    if (loading) {
      generateButton.setAttribute('disabled', 'disabled');
    } else {
      generateButton.removeAttribute('disabled');
    }
  }
}

// エラー状態のクリア
function clearError() {
  const alpine = getAlpineData();
  if (alpine) {
    alpine.error = null;
  }
}

// レスポンスの処理
function processResponse(data) {
  console.log('processResponse called with:', data);
  
  // HTMLコンテンツの設定
  if (data.html) {
    console.log('Calling setEditorContent with HTML length:', data.html.length);
    setEditorContent(data.html);
    
    // WYSIWYGタブをアクティブにする（Thinking出力がない場合）
    if (!data.thinking) {
      const alpine = getAlpineData();
      if (alpine) {
        alpine.activeTab = 'wysiwyg';
        console.log('Switched to WYSIWYG tab');
        
        // タブ切り替え後に再度コンテンツを送信
        setTimeout(() => {
          const wysiwygFrame = document.getElementById('wysiwyg-frame');
          if (wysiwygFrame && wysiwygFrame.contentWindow) {
            wysiwygFrame.contentWindow.postMessage({
              type: 'set-content',
              content: data.html
            }, '*');
            console.log('Content re-sent to WYSIWYG after tab switch');
          }
        }, 100);
      }
    }
  } else {
    console.error('No HTML in processResponse data');
  }
  
  // Thinking出力の処理
  if (data.thinking) {
    const alpine = getAlpineData();
    if (alpine) {
      alpine.thinkingOutput = formatThinkingOutput(data.thinking);
      alpine.showThinking = true;
      alpine.activeTab = 'thinking';
    } else {
      displayThinkingOutput(formatThinkingOutput(data.thinking));
    }
  }
}

// Alpine.jsデータの取得 (安全なアクセス)
function getAlpineData() {
  try {
    const appElement = document.querySelector('[x-data]');
    if (!appElement) return null;
    
    // Alpineが初期化されているか確認
    if (window.Alpine && appElement.__x) {
      return appElement.__x.getUnobservedData ? appElement.__x.getUnobservedData() : appElement.__x.$data;
    }
    return null;
  } catch (e) {
    console.error('Alpineデータへのアクセスエラー:', e);
    return null;
  }
}

// 成功トースト表示
function showSuccessToast(message) {
  const alpine = getAlpineData();
  if (alpine) {
    alpine.toast = {
      show: true,
      message: message,
      type: 'success'
    };
  } else {
    showSimpleToast(message, 'success');
  }
}

// エラートースト表示
function showErrorToast(message) {
  const alpine = getAlpineData();
  if (alpine) {
    alpine.toast = {
      show: true,
      message: message,
      type: 'error'
    };
    
    alpine.error = typeof message === 'string' ? message : 'エラーが発生しました';
  } else {
    showSimpleToast(message, 'error');
  }
}

// 情報トースト表示
function showInfoToast(message) {
  const alpine = getAlpineData();
  if (alpine) {
    alpine.toast = {
      show: true,
      message: message,
      type: 'info'
    };
  } else {
    showSimpleToast(message, 'info');
  }
}

// Alpine.jsなしで思考プロセス表示用の代替関数
function displayThinkingOutput(thinkingHtml) {
  // コンテナを作成
  let container = document.getElementById('thinking-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'thinking-container';
    container.className = 'fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-75 z-50 flex justify-center items-center';
    
    const content = document.createElement('div');
    content.className = 'bg-white dark:bg-gray-800 rounded-lg p-4 max-w-3xl max-h-[80vh] overflow-auto';
    
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4';
    
    const title = document.createElement('h3');
    title.className = 'text-lg font-bold';
    title.textContent = 'Claude の思考プロセス';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'text-gray-500 hover:text-gray-700';
    closeBtn.textContent = '×';
    closeBtn.onclick = function() {
      document.body.removeChild(container);
    };
    
    const thinkingContent = document.createElement('div');
    thinkingContent.className = 'font-mono text-sm whitespace-pre-wrap';
    thinkingContent.innerHTML = thinkingHtml;
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    content.appendChild(header);
    content.appendChild(thinkingContent);
    container.appendChild(content);
    
    document.body.appendChild(container);
  } else {
    const thinkingContent = container.querySelector('div > div');
    if (thinkingContent) {
      thinkingContent.innerHTML = thinkingHtml;
    }
  }
}

// 簡易トースト通知（Alpine.jsなしの場合）
function showSimpleToast(message, type) {
  const bgColor = type === 'error' ? 'bg-red-500' : 
                  type === 'success' ? 'bg-green-500' : 
                  'bg-blue-500';
  
  const toastContainer = document.createElement('div');
  toastContainer.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${bgColor} text-white`;
  toastContainer.textContent = message;
  
  document.body.appendChild(toastContainer);
  
  setTimeout(() => {
    toastContainer.remove();
  }, 3000);
}

// HTMLをダウンロード
function downloadHtml() {
  const html = getEditorContent();
  
  if (!html.trim()) {
    showErrorToast('ダウンロードするHTMLコンテンツがありません');
    return;
  }
  
  // 完全なHTMLドキュメントを作成
  const fullHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated HTML</title>
</head>
<body>
${html}
</body>
</html>`;
  
  const blob = new Blob([fullHtml], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "generated.html";
  a.click();
  URL.revokeObjectURL(a.href);
  
  showSuccessToast('HTMLがダウンロードされました！');
}

// エディタービューモードの更新（通常/全画面）
function updateEditorViewMode(fullscreen) {
  isFullscreenMode = fullscreen;
  
  // コンテナ要素のスタイルを調整
  const mainContainer = document.querySelector('.flex.flex-col.lg\\:flex-row.gap-6');
  const editorContainer = document.querySelector('[class*="lg:w-1/2"]:not([x-show])');
  const mainContent = document.getElementById('main-content');
  
  if (mainContent) {
    if (fullscreen) {
      // 親コンテナの制約を解除
      mainContent.style.maxWidth = '100%';
      mainContent.style.width = '100%';
      mainContent.style.padding = '0';
      mainContent.style.margin = '0';
    } else {
      // 通常モードに戻す
      mainContent.style.maxWidth = '';
      mainContent.style.width = '';
      mainContent.style.padding = '';
      mainContent.style.margin = '';
    }
  }
  
  if (mainContainer && editorContainer) {
    if (fullscreen) {
      // 全画面モード時にコンテナ要素のスタイルを調整
      mainContainer.style.padding = '0';
      mainContainer.style.margin = '0';
      mainContainer.style.maxWidth = '100vw';
      mainContainer.style.width = '100vw';
      
      // エディタコンテナを画面いっぱいに
      editorContainer.style.width = '100%';
      editorContainer.style.maxWidth = '100%';
      editorContainer.style.left = '0';
      editorContainer.style.right = '0';
      
      // 角丸を無効化
      const editorCard = editorContainer.querySelector('.shadow.sm\\:rounded-lg');
      if (editorCard) {
        editorCard.style.borderRadius = '0';
        editorCard.style.maxWidth = '100vw';
      }
    } else {
      // 通常モードに戻す
      mainContainer.style.padding = '';
      mainContainer.style.margin = '';
      mainContainer.style.maxWidth = '';
      mainContainer.style.width = '';
      
      editorContainer.style.width = '';
      editorContainer.style.maxWidth = '';
      editorContainer.style.left = '';
      editorContainer.style.right = '';
      
      const editorCard = editorContainer.querySelector('.shadow.sm\\:rounded-lg');
      if (editorCard) {
        editorCard.style.borderRadius = '';
        editorCard.style.maxWidth = '';
      }
    }
  }
  
  // プレビューの高さとサイズを調整
  setTimeout(() => {
    if (fullscreen) {
      // 全画面モード時、プレビュー更新とサイズ調整
      updatePreview(editorContent);
      
      // 高さを調整
      const tabContent = document.querySelector('div[class*="h-[600px]"]');
      if (tabContent) {
        tabContent.style.height = 'calc(100vh - 120px)';
      }
    } else {
      // 通常モードに戻したときもプレビュー更新
      updatePreview(editorContent);
      
      // 高さをリセット
      const tabContent = document.querySelector('div[class*="h-[600px]"]');
      if (tabContent) {
        tabContent.style.height = '';
      }
    }
  }, 100);
  
  // WYSIWYGエディタの更新通知
  const wysiwygFrame = document.getElementById('wysiwyg-frame');
  if (wysiwygFrame && wysiwygFrame.contentWindow) {
    wysiwygFrame.contentWindow.postMessage({
      type: 'layout-change',
      isFullscreen: fullscreen
    }, '*');
  }
}

// グローバル関数として公開 (Alpine.js・DOM両方で利用可能に)
window.generateHTML = generateHTML;  // 関数名を変更し、直接generateHTML関数を割り当て
window.downloadHTML = downloadHtml;
window.getEditorContent = getEditorContent;
window.setEditorContent = setEditorContent;
window.updateEditorViewMode = updateEditorViewMode;