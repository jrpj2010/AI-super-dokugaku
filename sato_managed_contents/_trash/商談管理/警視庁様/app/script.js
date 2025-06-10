document.addEventListener('DOMContentLoaded', () => {
  console.log("会話分析アプリ (思考3DXYZ) 読み込み完了。");

  const settingsToggleButton = document.getElementById('settings-toggle-button');
  const settingsMenu = document.getElementById('settings-menu');
  const apiKeyInput = document.getElementById('api-key-input');
  const modelSelect = document.getElementById('model-select');
  const saveSettingsButton = document.getElementById('save-settings-button');

  const conversationNav = document.getElementById('conversation-nav');
  const scriptInput = document.getElementById('script-input');
  const analyzeButton = document.getElementById('analyze-button');
  const conversationDisplay = document.getElementById('conversation-display');
  const debugStatus = document.getElementById('debug-status');

  const detailModal = document.getElementById('analysis-detail-modal');
  const closeModalButton = document.getElementById('close-detail-modal');

  // --- 設定メニュー ---
  if (settingsToggleButton && settingsMenu) {
    settingsToggleButton.addEventListener('click', () => {
      settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', (event) => {
      if (!settingsMenu.contains(event.target) && !settingsToggleButton.contains(event.target)) {
        settingsMenu.style.display = 'none';
      }
    });
  }

  // --- 設定の読み込みと保存 (APIキーとモデル) ---
  const defaultApiKey = '';
  const defaultModel = 'gemini-2.5-flash-preview-04-17';

  apiKeyInput.value = localStorage.getItem('geminiApiKey_v3') || defaultApiKey;
  let modelToSet = localStorage.getItem('geminiModel_v3');
  let isStoredModelValid = false;
  if (modelToSet) {
    for (let i = 0; i < modelSelect.options.length; i++) {
      if (modelSelect.options[i].value === modelToSet) isStoredModelValid = true; break;
    }
  }
  if (!modelToSet || !isStoredModelValid) modelToSet = defaultModel;
  modelSelect.value = modelToSet;

  function updateAllDebugStatus() {
    const isApiKeySet = apiKeyInput.value.trim() !== '';
    const selectedModelText = (modelSelect.selectedIndex !== -1 && modelSelect.options[modelSelect.selectedIndex]) ? modelSelect.options[modelSelect.selectedIndex].text : defaultModel;
    if (!isApiKeySet) {
      updateDebugStatus(false, 'APIキー未設定。モデル: ' + selectedModelText);
    } else {
      updateDebugStatus(true, `API準備完了。モデル: ${selectedModelText}`);
    }
  }
  updateAllDebugStatus();

  if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', () => {
      localStorage.setItem('geminiApiKey_v3', apiKeyInput.value);
      localStorage.setItem('geminiModel_v3', modelSelect.value);
      alert('設定を保存しました。');
      settingsMenu.style.display = 'none';
      updateAllDebugStatus();
    });
  }

  function updateDebugStatus(isReady, message = null) {
    if (!debugStatus) return;
    if (message) {
      debugStatus.textContent = message;
      debugStatus.style.color = (!isReady && (message.toLowerCase().includes("エラー") || message.toLowerCase().includes("失敗") || message.toLowerCase().includes("未設定"))) ? '#dc3545' : '#28a745';
    } else {
      debugStatus.textContent = isReady ? '準備完了' : 'エラーまたは未設定';
      debugStatus.style.color = isReady ? '#28a745' : '#dc3545';
    }
  }

  // --- スクリプトパーサー ---
  function parseScript(scriptText) {
    const lines = scriptText.split('\n').filter(line => line.trim() !== '');
    const parsedUtterances = [];
    const timeRegex = /^\s*\[(\d{2}:\d{2}:\d{2}\.\d{3})\]\s*/;
    const speakerRegex = /^\s*([^:]+):\s*(.*)$/;
    lines.forEach((line, index) => {
      let timestamp = null;
      let remainingLine = line;
      const timeMatch = line.match(timeRegex);
      if (timeMatch) { timestamp = timeMatch[1]; remainingLine = line.substring(timeMatch[0].length); }
      const speakerMatch = remainingLine.match(speakerRegex);
      if (speakerMatch) parsedUtterances.push({ id_in_script: index, speaker: speakerMatch[1].trim(), message: speakerMatch[2].trim(), timestamp: timestamp });
      else if (remainingLine.trim()) parsedUtterances.push({ id_in_script: index, speaker: "不明", message: remainingLine.trim(), timestamp: timestamp });
    });
    return parsedUtterances;
  }

  // --- 話者ごと発言ブロック化 + タイムスタンプ集約 ---
  function parseScriptToSpeakerBlocks(parsedScript) {
    if (!parsedScript || parsedScript.length === 0) return [];
    const speakerBlocks = [];
    let currentBlock = null;
    parsedScript.forEach((utterance, index) => {
      const utteranceTimestamp = utterance.timestamp || `発言ID:${utterance.id_in_script}`;
      if (!currentBlock || currentBlock.speaker !== utterance.speaker) {
        if (currentBlock) speakerBlocks.push(currentBlock);
        currentBlock = { speaker: utterance.speaker, messages: [utterance.message], original_utterance_objects: [utterance], startTime: utteranceTimestamp, endTime: utteranceTimestamp, blockId: speakerBlocks.length };
      } else {
        currentBlock.messages.push(utterance.message); currentBlock.original_utterance_objects.push(utterance); currentBlock.endTime = utteranceTimestamp;
      }
    });
    if (currentBlock) speakerBlocks.push(currentBlock);
    return speakerBlocks;
  }

  // --- バックエンドAPI呼び出し ---
  const BACKEND_URL = '';

  async function callBackendApi(endpoint, payload) {
    const userApiKey = apiKeyInput.value.trim();
    const modelName = modelSelect.value;

    if (!userApiKey) {
      const errorMsg = 'APIキーが設定されていません。設定画面から入力してください。';
      updateDebugStatus(false, errorMsg);
      alert(errorMsg);
      throw new Error(errorMsg);
    }

    const fullPayload = { ...payload, apiKey: userApiKey, modelName };

    updateDebugStatus(true, `バックエンド通信中 (${endpoint})...`);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
        signal: AbortSignal.timeout(180000)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        const errorMessage = `APIエラー (${response.status}): ${errorData.message || errorData.error || '不明なエラー'}`;
        console.error(errorMessage, errorData);
        updateDebugStatus(false, errorMessage);
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      updateAllDebugStatus();
      return responseData;
    } catch (error) {
      console.error(`バックエンドAPI (${endpoint}) 呼び出し中にエラー:`, error);
      updateDebugStatus(false, `バックエンド接続エラー: ${error.message}`);
      throw error;
    }
  }

  // --- UI表示関連 (テーマ単位に変更) ---
  function displayStructuredConversation(thematicAnalyses) {
    conversationDisplay.innerHTML = '';
    conversationNav.innerHTML = '';
    if (!thematicAnalyses || thematicAnalyses.length === 0) {
      conversationDisplay.innerHTML = '<p class="text-gray-500">分析結果がありません。スクリプトを再確認してください。</p>';
      return;
    }

    thematicAnalyses.forEach(themeAnalysis => {
      const themeContainer = document.createElement('div');
      themeContainer.className = 'theme-block-container';

      // テーマヘッダー (タイトルとID)
      const themeHeader = document.createElement('div');
      themeHeader.className = 'theme-header';

      const titleElement = document.createElement('h2');
      titleElement.className = 'theme-title';
      titleElement.id = `theme-${themeAnalysis.theme_id}`;
      titleElement.textContent = themeAnalysis.theme_title;
      themeHeader.appendChild(titleElement);

      const idBadge = document.createElement('span');
      idBadge.className = 'theme-id-badge';
      idBadge.textContent = `ID: ${themeAnalysis.theme_id}`;
      themeHeader.appendChild(idBadge);

      themeContainer.appendChild(themeHeader);

      // テーマ分析コンテンツ
      themeContainer.appendChild(createThemeAnalysisElement(themeAnalysis));

      // ナビゲーションリンク
      const navLink = document.createElement('a');
      navLink.href = `#theme-${themeAnalysis.theme_id}`;
      navLink.textContent = themeAnalysis.theme_title;
      // アクティブリンクの追跡設定（後で初期化）
      navLink.addEventListener('click', function () {
        document.querySelectorAll('#conversation-nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      });
      conversationNav.appendChild(navLink);

      conversationDisplay.appendChild(themeContainer);
    });

    // 最初のテーマをハイライト（初期状態のアクティブテーマ）
    if (conversationNav.children.length > 0) {
      conversationNav.children[0].classList.add('active');
    }

    // スクロールスパイ機能：現在のテーマを自動ハイライト
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      document.querySelectorAll('.theme-block-container').forEach((container, index) => {
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        // スクロール位置がこのコンテナの範囲内
        if (scrollPosition >= containerTop && scrollPosition < containerTop + containerHeight) {
          document.querySelectorAll('#conversation-nav a').forEach(a => a.classList.remove('active'));
          if (conversationNav.children[index]) {
            conversationNav.children[index].classList.add('active');
          }
        }
      });
    });
  }

  function createThemeAnalysisElement(themeAnalysis) {
    const analysisElement = document.createElement('div');
    analysisElement.className = 'theme-analysis-item';

    // 参加者情報とタイムスタンプの抽出（データ形式に依存）
    const speakers = new Set();
    const timeInfo = { start: '', end: '' };

    // 分析データから話者情報と時間情報を抽出（実際のデータ構造に合わせる必要あり）
    if (themeAnalysis.speaker_info && Array.isArray(themeAnalysis.speaker_info)) {
      themeAnalysis.speaker_info.forEach(info => {
        if (info.speaker) speakers.add(info.speaker);
        if (info.startTime && (!timeInfo.start || info.startTime < timeInfo.start)) timeInfo.start = info.startTime;
        if (info.endTime && (!timeInfo.end || info.endTime > timeInfo.end)) timeInfo.end = info.endTime;
      });
    }

    // 1. テーマ要約セクション
    let analysisHtml = `
      <div class="theme-summary-container">
        <span class="label">テーマ要約</span>
        <p class="theme-summary">${themeAnalysis.theme_summary || 'テーマの要約がありません。'}</p>
      </div>
    `;

    // 2. 参加者とタイムスタンプ情報（データがある場合のみ）
    if (speakers.size > 0 || timeInfo.start || timeInfo.end) {
      analysisHtml += '<div class="theme-participants">';

      // 参加者一覧
      if (speakers.size > 0) {
        Array.from(speakers).forEach(speaker => {
          analysisHtml += `
            <div class="participant-badge">
              <span class="icon">👤</span> ${speaker}
            </div>`;
        });
      }

      // タイムスタンプ情報
      if (timeInfo.start && timeInfo.end) {
        analysisHtml += `
          <div class="time-badge">
            <span class="icon">🕒</span> ${timeInfo.start} - ${timeInfo.end}
          </div>`;
      }

      analysisHtml += '</div>';
    }

    // 3. XYZ分析セクション
    if (themeAnalysis.analysis_X && themeAnalysis.analysis_Y && themeAnalysis.analysis_Z) {
      analysisHtml += `
        <div class="xyz-analysis-container">
          <div class="xyz-analysis-header">思考3DXYZ分析</div>
          <div class="xyz-analysis-tags">
      `;

      // X軸 タグ
      analysisHtml += `
        <div class="xyz-tag x-${themeAnalysis.analysis_X.category.toLowerCase().replace(/\s+/g, '-')}">
          <div class="tag-label">X軸: ${themeAnalysis.analysis_X.category}</div>
          <div class="tag-reason">${themeAnalysis.analysis_X.reason || '理由なし'}</div>
        </div>`;

      // Y軸 タグ
      analysisHtml += `
        <div class="xyz-tag y-${themeAnalysis.analysis_Y.category.toLowerCase().replace(/\s+/g, '-')}">
          <div class="tag-label">Y軸: ${themeAnalysis.analysis_Y.category}</div>
          <div class="tag-reason">${themeAnalysis.analysis_Y.reason || '理由なし'}</div>
        </div>`;

      // Z軸 タグ
      analysisHtml += `
        <div class="xyz-tag z-${themeAnalysis.analysis_Z.category.toLowerCase().replace(/\s+/g, '-')}">
          <div class="tag-label">Z軸: ${themeAnalysis.analysis_Z.category}</div>
          <div class="tag-reason">${themeAnalysis.analysis_Z.reason || '理由なし'}</div>
        </div>`;

      analysisHtml += `
          </div>
        </div>
      `;
    }

    // 4. コミュニケーションフィードバックセクション
    if (themeAnalysis.communication_feedback) {
      analysisHtml += '<div class="communication-feedback">';
      analysisHtml += '<div class="communication-feedback-header">コミュニケーション評価</div>';

      // 評価バッジ
      let evalClass = 'eval-neutral';
      switch (themeAnalysis.communication_feedback.evaluation) {
        case 'Good': evalClass = 'eval-good'; break;
        case 'Bad': evalClass = 'eval-bad'; break;
        case 'ConsiderationNeeded': evalClass = 'eval-consideration'; break;
      }
      analysisHtml += `<div class="evaluation-badge ${evalClass}">${themeAnalysis.communication_feedback.evaluation || '評価なし'}</div>`;

      // アドバイス
      if (themeAnalysis.communication_feedback.advice) {
        analysisHtml += `<p class="advice">${themeAnalysis.communication_feedback.advice}</p>`;
      }

      // 良い点（オプション）
      if (themeAnalysis.communication_feedback.highlight_points_optional) {
        analysisHtml += `<p class="highlight">${themeAnalysis.communication_feedback.highlight_points_optional}</p>`;
      }

      // 改善点（オプション）
      if (themeAnalysis.communication_feedback.improvement_points_optional) {
        analysisHtml += `<p class="improvement">${themeAnalysis.communication_feedback.improvement_points_optional}</p>`;
      }

      analysisHtml += '</div>';
    }

    analysisElement.innerHTML = analysisHtml;
    return analysisElement;
  }

  function getXYZColor(category, axis) {
    const xColors = { "超具体化": "bg-blue-100 text-blue-700", "超抽象化": "bg-purple-100 text-purple-700", "超構造化": "bg-teal-100 text-teal-700" };
    const yColors = { "過去": "bg-orange-100 text-orange-700", "現代": "bg-lime-100 text-lime-700", "未来": "bg-cyan-100 text-cyan-700" };
    const zColors = { "初級": "bg-pink-100 text-pink-700", "中級": "bg-amber-100 text-amber-700", "上級": "bg-emerald-100 text-emerald-700" };
    switch (axis) {
      case 'X': return xColors[category] || 'bg-gray-200 text-gray-700';
      case 'Y': return yColors[category] || 'bg-gray-200 text-gray-700';
      case 'Z': return zColors[category] || 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  }

  function openSpeakerBlockDetailModal(blockId, allAnalysisResults) {
    if (!detailModal) return;

    const block = allAnalysisResults.find(b => b.blockId === blockId);
    if (!block) {
      console.error(`ブロックID ${blockId} の詳細が見つかりません。`);
      return;
    }

    // 各セクションの要素を取得
    const blockSummary = document.getElementById('modal-block-summary');
    const originalUtterances = document.getElementById('modal-original-utterances');
    const xCategory = document.getElementById('modal-x-category');
    const xReason = document.getElementById('modal-x-reason');
    const yCategory = document.getElementById('modal-y-category');
    const yReason = document.getElementById('modal-y-reason');
    const zCategory = document.getElementById('modal-z-category');
    const zReason = document.getElementById('modal-z-reason');
    const commEvaluation = document.getElementById('modal-comm-evaluation');
    const commAdvice = document.getElementById('modal-comm-advice');
    const commHighlight = document.getElementById('modal-comm-highlight');
    const commImprovement = document.getElementById('modal-comm-improvement');

    // データを各要素に設定
    if (blockSummary) blockSummary.textContent = block.summary || 'このブロックの要約はありません。';

    // 元の発言リストをクリアして再構築
    if (originalUtterances) {
      originalUtterances.innerHTML = '';
      if (block.original_utterance_objects && Array.isArray(block.original_utterance_objects)) {
        block.original_utterance_objects.forEach(utterance => {
          const li = document.createElement('li');
          const timeSpan = document.createElement('span');
          timeSpan.className = 'utterance-time';
          timeSpan.textContent = utterance.timestamp || '時刻不明';

          const speakerSpan = document.createElement('span');
          speakerSpan.className = 'utterance-speaker';
          speakerSpan.textContent = utterance.speaker || '話者不明';

          li.appendChild(timeSpan);
          li.appendChild(speakerSpan);
          li.appendChild(document.createTextNode(': ' + (utterance.message || '')));
          originalUtterances.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = '元の発言データがありません。';
        originalUtterances.appendChild(li);
      }
    }

    // XYZ分析情報
    if (xCategory && block.analysis_X) {
      xCategory.textContent = block.analysis_X.category || 'カテゴリなし';
      xCategory.className = `axis-category x-${(block.analysis_X.category || '').toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (xReason && block.analysis_X) xReason.textContent = block.analysis_X.reason || '理由の記載なし';

    if (yCategory && block.analysis_Y) {
      yCategory.textContent = block.analysis_Y.category || 'カテゴリなし';
      yCategory.className = `axis-category y-${(block.analysis_Y.category || '').toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (yReason && block.analysis_Y) yReason.textContent = block.analysis_Y.reason || '理由の記載なし';

    if (zCategory && block.analysis_Z) {
      zCategory.textContent = block.analysis_Z.category || 'カテゴリなし';
      zCategory.className = `axis-category z-${(block.analysis_Z.category || '').toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (zReason && block.analysis_Z) zReason.textContent = block.analysis_Z.reason || '理由の記載なし';

    // コミュニケーション評価
    if (commEvaluation && block.communication_feedback) {
      commEvaluation.textContent = block.communication_feedback.evaluation || '評価なし';

      // 評価に応じたクラス設定
      let evalClass = 'neutral';
      switch (block.communication_feedback.evaluation) {
        case 'Good': evalClass = 'good'; break;
        case 'Bad': evalClass = 'bad'; break;
        case 'ConsiderationNeeded': evalClass = 'consideration'; break;
        default: evalClass = 'neutral';
      }
      commEvaluation.className = `evaluation-badge-detail ${evalClass}`;
    }

    // アドバイス、良い点、改善点
    if (commAdvice && block.communication_feedback) {
      commAdvice.textContent = block.communication_feedback.advice || 'アドバイスなし';
    }

    if (commHighlight && block.communication_feedback) {
      if (block.communication_feedback.highlight_points_optional) {
        commHighlight.textContent = block.communication_feedback.highlight_points_optional;
        commHighlight.style.display = 'block';
      } else {
        commHighlight.style.display = 'none';
      }
    }

    if (commImprovement && block.communication_feedback) {
      if (block.communication_feedback.improvement_points_optional) {
        commImprovement.textContent = block.communication_feedback.improvement_points_optional;
        commImprovement.style.display = 'block';
      } else {
        commImprovement.style.display = 'none';
      }
    }

    // モーダルを表示
    detailModal.style.display = 'flex';
  }

  function setupDetailLinkListeners(allAnalysisResults) {
    // 詳細を表示するリンクにイベントリスナーを追加
    document.querySelectorAll('.view-details-link').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const blockId = parseInt(link.getAttribute('data-block-id'));
        if (!isNaN(blockId)) {
          openSpeakerBlockDetailModal(blockId, allAnalysisResults);
        }
      });
    });
  }

  if (closeModalButton && detailModal) {
    closeModalButton.addEventListener('click', () => detailModal.style.display = 'none');
    window.addEventListener('click', (event) => {
      if (event.target === detailModal) detailModal.style.display = 'none';
    });
  }

  // --- 分析実行ボタン ---
  if (analyzeButton) {
    analyzeButton.addEventListener('click', async () => {
      const scriptText = scriptInput.value;
      if (!scriptText.trim()) {
        alert('トークスクリプトを入力してください。');
        return;
      }

      conversationDisplay.innerHTML = `
        <div class="loading-spinner-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">会話分析実行中...</p>
        </div>`;
      conversationNav.innerHTML = '';
      updateDebugStatus(true, "スクリプトをパース中...");

      try {
        const parsedScript = parseScript(scriptText);
        const speakerBlocks = parseScriptToSpeakerBlocks(parsedScript);

        if (!speakerBlocks || speakerBlocks.length === 0) {
          updateDebugStatus(false, 'エラー: スクリプトから話者ブロックを抽出できませんでした。');
          conversationDisplay.innerHTML = '<p class="text-red-500">話者ブロックの抽出に失敗しました。スクリプト形式を確認してください。</p>';
          return;
        }

        updateDebugStatus(true, `話者ブロック数: ${speakerBlocks.length}。テーマ構造を分析中...`);
        const thematicChunks = await callBackendApi('/api/structure', { speakerBlocks });

        if (!thematicChunks || thematicChunks.length === 0) {
          updateDebugStatus(false, 'エラー: テーマ構造の取得に失敗しました。');
          conversationDisplay.innerHTML = '<p class="text-red-500">テーマ構造の取得に失敗しました。APIレスポンスを確認してください。</p>';
          return;
        }

        updateDebugStatus(true, `テーマ数: ${thematicChunks.length}。各テーマを詳細分析中...`);

        let allThemeAnalysisResults = [];
        let completedAnalyses = 0;
        const totalAnalyses = thematicChunks.length;

        const analysisPromises = thematicChunks.map(theme => {
          // テーマに属する話者ブロックのフルオブジェクトを取得
          const speakerBlocksInTheme = theme.speaker_block_ids
            .map(id => speakerBlocks.find(b => b.blockId === id))
            .filter(b => b); // nullやundefinedを除外

          if (speakerBlocksInTheme.length === 0) {
            // このテーマに該当する有効な話者ブロックがない場合 (通常はありえないが念のため)
            console.warn(`テーマID ${theme.theme_id} に該当する話者ブロックが見つかりません。スキップします。`);
            completedAnalyses++; // カウントは進める
            return Promise.resolve(null); // 空のPromiseを返す
          }

          return callBackendApi('/api/analyze-theme', {
            themeId: theme.theme_id,
            themeTitle: theme.theme_title,
            speakerBlocksInTheme: speakerBlocksInTheme
          })
            .then(result => {
              allThemeAnalysisResults.push(result);
              completedAnalyses++;
              updateDebugStatus(true, `テーマ分析進捗: ${completedAnalyses}/${totalAnalyses} (テーマID: ${theme.theme_id})`);
              return result;
            })
            .catch(error => {
              console.error(`テーマID ${theme.theme_id} の分析中にエラー:`, error);
              // エラー時もテーマIDを含めたオブジェクトを結果配列に追加 (表示でエラーだったことがわかるように)
              allThemeAnalysisResults.push({ theme_id: theme.theme_id, theme_title: theme.theme_title, error: true, message: error.message, theme_summary: "テーマ分析エラー" });
              completedAnalyses++;
              updateDebugStatus(true, `テーマ分析進捗(エラー含): ${completedAnalyses}/${totalAnalyses} (テーマID: ${theme.theme_id})`);
              return null; // エラー時はnullを返す
            });
        });

        await Promise.all(analysisPromises);

        updateDebugStatus(true, "全テーマ分析完了。表示を生成中...");
        const validResults = allThemeAnalysisResults.filter(r => r && !r.error && r.theme_id && r.theme_title);
        if (validResults.length > 0) {
          displayStructuredConversation(validResults);
        } else if (allThemeAnalysisResults.some(r => r && r.error)) {
          // エラーがあった場合は最初のものを表示（あるいは集約エラーメッセージ）
          const firstError = allThemeAnalysisResults.find(r => r && r.error);
          conversationDisplay.innerHTML = `<p class="text-red-600 font-semibold">テーマ分析中にエラーが発生しました: ${firstError.message || '不明なエラー'}</p><p class="text-xs text-gray-500 mt-2">詳細はコンソールまたはバックエンドログを確認してください。</p>`;
        } else {
          conversationDisplay.innerHTML = '<p class="text-gray-500">有効な分析結果が得られませんでした。</p>';
        }
        updateAllDebugStatus(); // 最終的なステータス更新

      } catch (error) {
        console.error('分析プロセス全体でエラーが発生しました:', error);
        updateDebugStatus(false, `全体エラー: ${error.message}`);
        conversationDisplay.innerHTML = `
          <div class="error-container" style="padding: 25px; color: #e53e3e; border-left: 4px solid #e53e3e; background-color: #fed7d7; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #742a2a; font-size: 1.3em; display: flex; align-items: center;"><span style="margin-right: 10px;">⚠️</span> 分析中にエラーが発生しました</h3>
            <p style="margin-bottom: 10px;">${error.message}</p>
            <p style="font-size: 0.9em; color: #742a2a;">コンソールで詳細を確認できます。</p>
          </div>`;
        updateAllDebugStatus(); // エラー発生時もステータス更新
      }
    });
  }

  // レンダリング完了後の処理
  document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      // XYZ凡例を作成
      const legendSection = document.createElement('div');
      legendSection.className = 'xyz-legend-section';
      legendSection.innerHTML = `
        <h4>思考3DXYZ凡例</h4>
        <div class="legend-item">
          <span class="tag x-gutaika">X</span>
          <span class="tag-name">超具体化</span>
          <span class="tag-description">特定の事例、数値、詳細な説明</span>
        </div>
        <div class="legend-item">
          <span class="tag x-chushoka">X</span>
          <span class="tag-name">超抽象化</span>
          <span class="tag-description">概念、理論、一般化された考え</span>
        </div>
        <div class="legend-item">
          <span class="tag x-kouzouka">X</span>
          <span class="tag-name">超構造化</span>
          <span class="tag-description">体系化、関係性の整理</span>
        </div>
        <div class="legend-item">
          <span class="tag y-kako">Y</span>
          <span class="tag-name">過去</span>
          <span class="tag-description">経験、実績、過去の事例</span>
        </div>
        <div class="legend-item">
          <span class="tag y-gendai">Y</span>
          <span class="tag-name">現代</span>
          <span class="tag-description">現状分析、今の課題</span>
        </div>
        <div class="legend-item">
          <span class="tag y-mirai">Y</span>
          <span class="tag-name">未来</span>
          <span class="tag-description">予測、計画、展望</span>
        </div>
        <div class="legend-item">
          <span class="tag z-shokyu">Z</span>
          <span class="tag-name">初級</span>
          <span class="tag-description">基本的な知識・技能</span>
        </div>
        <div class="legend-item">
          <span class="tag z-chukyu">Z</span>
          <span class="tag-name">中級</span>
          <span class="tag-description">応用的な知識・技能</span>
        </div>
        <div class="legend-item">
          <span class="tag z-jokyu">Z</span>
          <span class="tag-name">上級</span>
          <span class="tag-description">専門的な知識・技能</span>
        </div>
      `;
      sidebar.appendChild(legendSection);
    }
  });
});
