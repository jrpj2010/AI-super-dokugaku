
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { PresentationData, GeneratedFiles, PromptTemplate, AppSettings } from './types';
import { HtmlGenerator } from './utils/htmlGenerators';
import { LoadingSpinner } from './components/LoadingSpinner';
import { GeneratedFilesPreview } from './components/GeneratedFilesPreview';
import { DebugConsole } from './components/DebugConsole';
import { SettingsModal } from './components/SettingsModal';
import { PromptTemplateModal } from './components/PromptTemplateModal';
import { useDebugLogger } from './hooks/useDebugLogger';
import { PromptTemplateService } from './services/promptTemplateService';
import {
  AVAILABLE_MODELS,
  DEFAULT_MODEL_ID,
  AVAILABLE_PROMPT_TEMPLATES,
  DEFAULT_PROMPT_TEMPLATE_ID,
  DEFAULT_SLIDE_COUNT,
  MIN_SLIDE_COUNT,
  MAX_SLIDE_COUNT
} from './constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const APP_TITLE_JP = "Katsu-Spa 3.0";

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFiles | null>(null);
  const [presentationTitle, setPresentationTitle] = useState<string>('私のプレゼンテーション');
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL_ID);
  const [selectedPromptTemplateId, setSelectedPromptTemplateId] = useState<string>(DEFAULT_PROMPT_TEMPLATE_ID);
  const [desiredSlideCount, setDesiredSlideCount] = useState<number>(DEFAULT_SLIDE_COUNT);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);
  const [showPromptTemplateModal, setShowPromptTemplateModal] = useState<boolean>(false);
  const [availableTemplates, setAvailableTemplates] = useState<PromptTemplate[]>([]);

  const [fetchedSystemPromptContent, setFetchedSystemPromptContent] = useState<string | null>(null);
  const [isFetchingPrompt, setIsFetchingPrompt] = useState<boolean>(false);
  const [promptFetchError, setPromptFetchError] = useState<string | null>(null);
  
  // 設定関連の状態
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('genSpaSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      debugMode: true, // デフォルトでデバッグモードON
      selectedModel: DEFAULT_MODEL_ID,
      apiKey: undefined
    };
  });

  // デバッグログ
  const { logs, logInfo, logWarning, logError, logSuccess, clearLogs } = useDebugLogger();

  const geminiService = useMemo(() => {
    const service = new GeminiService();
    service.setDebugCallback((level, message, details) => {
      switch (level) {
        case 'info':
          logInfo(message, details);
          break;
        case 'warning':
          logWarning(message, details);
          break;
        case 'error':
          logError(message, details);
          break;
        case 'success':
          logSuccess(message, details);
          break;
      }
    });
    return service;
  }, [logInfo, logWarning, logError, logSuccess]);
  
  const htmlGenerator = useMemo(() => new HtmlGenerator(), []);

  // 設定が変更されたときの処理
  useEffect(() => {
    localStorage.setItem('genSpaSettings', JSON.stringify(appSettings));
    geminiService.setUserApiKey(appSettings.apiKey);
    setSelectedModel(appSettings.selectedModel);
  }, [appSettings, geminiService]);

  // プロンプトテンプレートの読み込み
  useEffect(() => {
    // デバッグコールバックを設定
    PromptTemplateService.setDebugCallback((level, message, details) => {
      switch (level) {
        case 'info':
          logInfo(message, details);
          break;
        case 'warning':
          logWarning(message, details);
          break;
        case 'error':
          logError(message, details);
          break;
        case 'success':
          logSuccess(message, details);
          break;
      }
    });
    
    // 既存テンプレートの移行チェック
    logInfo('カスタムテンプレートの移行チェックを開始します');
    const hasMigrated = PromptTemplateService.migrateOldTemplates();
    
    if (hasMigrated) {
      logSuccess('カスタムテンプレートの移行が完了しました。3秒後に自動的にページを再読み込みします...');
      // 3秒後に自動リロード
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    
    loadTemplates();
  }, [logInfo, logWarning, logError, logSuccess]);

  const loadTemplates = () => {
    const templates = PromptTemplateService.getAllTemplates();
    setAvailableTemplates(templates);
    
    // 選択中のテンプレートがまだ存在するか確認
    if (!templates.find(t => t.id === selectedPromptTemplateId) && templates.length > 0) {
      setSelectedPromptTemplateId(templates[0].id);
    }
  };

  const currentSelectedTemplate = useMemo(() => {
    return availableTemplates.find(t => t.id === selectedPromptTemplateId);
  }, [selectedPromptTemplateId, availableTemplates]);

  useEffect(() => {
    const fetchPromptContent = async () => {
      if (!currentSelectedTemplate) {
        setFetchedSystemPromptContent(null);
        setPromptFetchError("有効なプレゼンテーションスタイルが選択されていません。");
        return;
      }
      setIsFetchingPrompt(true);
      setPromptFetchError(null);
      setFetchedSystemPromptContent(null); // Reset content while fetching new one
      try {
        const content = await PromptTemplateService.getTemplateContent(currentSelectedTemplate);
        setFetchedSystemPromptContent(content);
      } catch (e: any) {
        console.error('プロンプトファイル取得エラー:', e);
        setPromptFetchError(`${e.message}`);
        setFetchedSystemPromptContent(null);
      } finally {
        setIsFetchingPrompt(false);
      }
    };

    fetchPromptContent();
  }, [currentSelectedTemplate]);


  const handleGeneratePresentation = useCallback(async () => {
    if (!userInput.trim()) {
      setError('プレゼンテーション用の入力テキストを入力してください。');
      logError('入力エラー', 'プレゼンテーション用の入力テキストが空です');
      return;
    }
    if (!geminiService.isApiKeySet()) {
        setError('Gemini APIキーが設定されていません。API_KEY環境変数を設定してください。');
        return;
    }
    if (isFetchingPrompt || !fetchedSystemPromptContent || promptFetchError) {
      setError('プレゼンテーションスタイルのプロンプトが正しく読み込まれていません。エラーメッセージを確認するか、しばらく待ってから再試行してください。');
      return;
    }
    if (desiredSlideCount < MIN_SLIDE_COUNT || desiredSlideCount > MAX_SLIDE_COUNT) {
      setError(`スライド枚数は ${MIN_SLIDE_COUNT} から ${MAX_SLIDE_COUNT} の間で指定してください。`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedFiles(null);
    clearLogs(); // 新しい生成開始時にログをクリア

    try {
      logInfo('生成パラメータ設定', {
        モデル: selectedModel,
        スタイル: currentSelectedTemplate?.name,
        スライド数: desiredSlideCount
      });

      const presentationData: PresentationData = await geminiService.generatePresentationContent(
        userInput,
        selectedModel,
        fetchedSystemPromptContent,
        desiredSlideCount,
        currentSelectedTemplate?.templateType
      );
      setPresentationTitle(presentationData.presentationTitle);

      const analysisMd = htmlGenerator.generateAnalysisMd(presentationData);
      const individualSlidesHtml: { name: string; content: string }[] = presentationData.slides.map((slide, index) => ({
        name: `${index + 1}.html`,
        content: htmlGenerator.generateIndividualSlideHtml(slide, index + 1, presentationData.presentationTitle, presentationData.slides.length),
      }));
      const interactivePresentationHtml = htmlGenerator.generateInteractivePresentationHtml(presentationData);
      const dashboardIndexHtml = htmlGenerator.generateDashboardIndexHtml(presentationData, individualSlidesHtml.map(s => s.name));

      setGeneratedFiles({
        analysisAndDesign: { name: '分析と構成設計.md', content: analysisMd },
        individualSlides: individualSlidesHtml,
        interactivePresentation: { name: 'presentation.html', content: interactivePresentationHtml },
        dashboardIndex: { name: 'dashboard_index.html', content: dashboardIndexHtml },
      });

      logSuccess('プレゼンテーション生成完了！', {
        タイトル: presentationData.presentationTitle,
        ファイル数: 3 + individualSlidesHtml.length
      });

    } catch (e: any) {
      console.error('プレゼンテーション生成エラー:', e);
      const errorMessage = `プレゼンテーションの生成に失敗しました: ${e.message}`;
      setError(errorMessage);
      logError('プレゼンテーション生成エラー', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, geminiService, htmlGenerator, selectedModel, fetchedSystemPromptContent, desiredSlideCount, isFetchingPrompt, promptFetchError]);

  const currentModelDisplayName = useMemo(() => {
    return AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel;
  }, [selectedModel]);

  const displayPromptForModal = useMemo(() => {
    if (isFetchingPrompt) return "プロンプトを読み込み中...";
    if (promptFetchError) return `エラー: ${promptFetchError}`;
    if (!fetchedSystemPromptContent) return "プロンプト内容がありません。";

    return fetchedSystemPromptContent
      .replace('{{NUM_SLIDES}}', desiredSlideCount.toString())
      .replace('{{USER_INPUT}}', '[ここに入力テキストが挿入されます]');
  }, [fetchedSystemPromptContent, desiredSlideCount, isFetchingPrompt, promptFetchError]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8 text-center relative">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="absolute right-0 top-0 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          title="設定"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <h1 className="text-4xl sm:text-5xl font-bold text-rose-700">{APP_TITLE_JP}</h1>
        <p className="mt-2 text-lg text-gray-600">Powered by Gemini ({currentModelDisplayName})</p>
         {!geminiService.isApiKeySet() && !appSettings.apiKey && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-500 rounded-md text-yellow-700">
            <strong>警告:</strong> Gemini APIキーが設定されていません。設定ボタン（⚙️）からAPIキーを設定するか、<code>API_KEY</code> 環境変数を設定してください。
          </div>
        )}
      </header>

      <main className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-6 sm:p-8 border border-gray-200">
        <section className="mb-6">
          <div className="flex justify-between items-end mb-1">
            <label htmlFor="promptTemplateSelect" className="block text-md font-medium text-gray-700">
              プレゼンテーションスタイルを選択:
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPromptTemplateModal(true)}
                className="text-xs text-rose-600 hover:text-rose-800 underline"
                title="プロンプトテンプレートを管理"
              >
                テンプレート管理
              </button>
              {currentSelectedTemplate && (
                <button
                  onClick={() => setShowPromptModal(true)}
                  className="text-xs text-rose-600 hover:text-rose-800 underline disabled:opacity-50"
                  disabled={isLoading || isFetchingPrompt}
                  title="選択中のスタイルの詳細な指示内容を表示します"
                >
                  {isFetchingPrompt ? '読込中...' : (promptFetchError ? '内容表示(エラー)' : 'スタイル内容を表示')}
                </button>
              )}
            </div>
          </div>
          <select
            id="promptTemplateSelect"
            value={selectedPromptTemplateId}
            onChange={(e) => setSelectedPromptTemplateId(e.target.value)}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition-shadow duration-150 mb-1"
            disabled={isLoading || isFetchingPrompt}
          >
            {availableTemplates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name} {template.isCustom && '(カスタム)'}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 h-4">{currentSelectedTemplate?.description || 'スタイルを選択してください。'}</p>
          {promptFetchError && !isFetchingPrompt && <p className="text-xs text-red-500 mt-1">エラー: {promptFetchError}</p>}
        </section>

        <section className="mb-6">
          <label htmlFor="userInput" className="block text-xl font-semibold mb-2 text-gray-800">
            会議の文字起こしや資料テキストを入力してください:
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="ここに内容を貼り付けてください..."
            rows={10}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition-shadow duration-150"
            disabled={isLoading || isFetchingPrompt}
          />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <section className="mb-6">
            <label htmlFor="slideCount" className="block text-md font-medium text-gray-700 mb-1">
              希望スライド枚数 (約):
            </label>
            <input
              type="number"
              id="slideCount"
              value={desiredSlideCount}
              onChange={(e) => {
                  let val = parseInt(e.target.value, 10);
                  if (isNaN(val)) val = MIN_SLIDE_COUNT;
                  setDesiredSlideCount(val);
              }}
              onBlur={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val) || val < MIN_SLIDE_COUNT) val = MIN_SLIDE_COUNT;
                if (val > MAX_SLIDE_COUNT) val = MAX_SLIDE_COUNT;
                setDesiredSlideCount(val);
              }}
              min={MIN_SLIDE_COUNT}
              max={MAX_SLIDE_COUNT}
              className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition-shadow duration-150"
              disabled={isLoading || isFetchingPrompt}
            />
             <p className="text-xs text-gray-500 mt-1">{MIN_SLIDE_COUNT}～{MAX_SLIDE_COUNT}枚の範囲で指定できます。</p>
          </section>

          <section className="mb-6">
            <label htmlFor="modelSelect" className="block text-md font-medium text-gray-700 mb-1">
              使用するAIモデルを選択:
            </label>
            <select
              id="modelSelect"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition-shadow duration-150"
              disabled={isLoading || isFetchingPrompt}
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </section>
        </div>


        <section className="mb-6">
          <div className="flex justify-center">
            <button
              onClick={handleGeneratePresentation}
              disabled={isLoading || isFetchingPrompt || !!promptFetchError || !userInput.trim() || !geminiService.isApiKeySet() || !currentSelectedTemplate || !fetchedSystemPromptContent}
              className="px-6 py-3 min-w-[280px] h-[60px] flex items-center justify-center bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner /> : '🚀 プレゼンテーション一式を生成'}
            </button>
          </div>
        </section>

        {error && (
          <section className="mb-6 p-4 bg-red-100 border border-red-500 text-red-700 rounded-md">
            <h2 className="font-bold text-lg mb-1">エラー:</h2>
            <p>{error}</p>
          </section>
        )}

        {generatedFiles && !isLoading && (
          <GeneratedFilesPreview files={generatedFiles} presentationTitle={presentationTitle} />
        )}
      </main>

      {showPromptModal && currentSelectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-rose-700">スタイル内容: {currentSelectedTemplate.name}</h3>
              <button
                onClick={() => setShowPromptModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
                title="閉じる"
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto pr-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">AIへのシステムプロンプト (テンプレート):</h4>
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm max-w-none">
                  {displayPromptForModal}
                </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full max-w-4xl mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {APP_TITLE_JP}. All rights reserved (conceptually).</p>
        <p>入力内容に関する必要な権利を保有し、Gemini APIの利用規約を遵守していることを確認してください。</p>
      </footer>

      {/* 設定モーダル */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={appSettings}
        onSave={setAppSettings}
      />

      {/* デバッグコンソール */}
      <DebugConsole
        logs={logs}
        isVisible={appSettings.debugMode}
      />

      {/* プロンプトテンプレート管理モーダル */}
      <PromptTemplateModal
        isOpen={showPromptTemplateModal}
        onClose={() => setShowPromptTemplateModal(false)}
        onTemplateUpdate={loadTemplates}
      />
    </div>
  );
};

export default App;
