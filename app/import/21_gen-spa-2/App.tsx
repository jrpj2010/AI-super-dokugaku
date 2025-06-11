
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { PresentationData, GeneratedFiles, PromptTemplate } from './types';
import { HtmlGenerator } from './utils/htmlGenerators';
import { LoadingSpinner } from './components/LoadingSpinner';
import { GeneratedFilesPreview } from './components/GeneratedFilesPreview';
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

const APP_TITLE_JP = "Gen-Spa 2.0";

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

  const [fetchedSystemPromptContent, setFetchedSystemPromptContent] = useState<string | null>(null);
  const [isFetchingPrompt, setIsFetchingPrompt] = useState<boolean>(false);
  const [promptFetchError, setPromptFetchError] = useState<string | null>(null);

  const geminiService = useMemo(() => new GeminiService(), []);
  const htmlGenerator = useMemo(() => new HtmlGenerator(), []);

  const currentSelectedTemplate = useMemo(() => {
    return AVAILABLE_PROMPT_TEMPLATES.find(t => t.id === selectedPromptTemplateId);
  }, [selectedPromptTemplateId]);

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
        // More robust path construction
        let path = currentSelectedTemplate.systemPromptPath;
        // If systemPromptPath is already absolute (starts with /), use it.
        // Otherwise, prepend a / or process.env.PUBLIC_URL if available.
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }
        // For environments where PUBLIC_URL is set (e.g., Create React App deployment)
        // Ensure not to double slash if PUBLIC_URL is '/' or empty.
        const publicUrl = process.env.PUBLIC_URL || '';
        path = `${publicUrl}${path}`.replace(/\/\//g, '/'); // Avoid double slashes


        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`プロンプトファイルの読み込みに失敗しました: ${response.status} ${response.statusText} (Path: ${path})`);
        }
        const text = await response.text();
        setFetchedSystemPromptContent(text);
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

    try {
      const presentationData: PresentationData = await geminiService.generatePresentationContent(
        userInput,
        selectedModel,
        fetchedSystemPromptContent,
        desiredSlideCount
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

    } catch (e: any) {
      console.error('プレゼンテーション生成エラー:', e);
      setError(`プレゼンテーションの生成に失敗しました: ${e.message}`);
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
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-rose-700">{APP_TITLE_JP}</h1>
        <p className="mt-2 text-lg text-gray-600">Powered by Gemini ({currentModelDisplayName})</p>
         {!geminiService.isApiKeySet() && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-500 rounded-md text-yellow-700">
            <strong>警告:</strong> Gemini APIキーが設定されていません。このアプリケーションの動作にはAPIキーが必要です。<code>API_KEY</code> 環境変数を設定してください。
          </div>
        )}
      </header>

      <main className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-6 sm:p-8 border border-gray-200">
        <section className="mb-6">
          <div className="flex justify-between items-end mb-1">
            <label htmlFor="promptTemplateSelect" className="block text-md font-medium text-gray-700">
              プレゼンテーションスタイルを選択:
            </label>
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
          <select
            id="promptTemplateSelect"
            value={selectedPromptTemplateId}
            onChange={(e) => setSelectedPromptTemplateId(e.target.value)}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition-shadow duration-150 mb-1"
            disabled={isLoading || isFetchingPrompt}
          >
            {AVAILABLE_PROMPT_TEMPLATES.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
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
    </div>
  );
};

export default App;
