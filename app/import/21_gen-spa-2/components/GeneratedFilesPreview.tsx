
import React, { useState, useCallback } from 'react';
import { GeneratedFiles, GeneratedFile } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// JSZip is loaded via CDN in index.html and accessed globally
// declare var JSZip: any; // For type safety if needed

interface GeneratedFilesPreviewProps {
  files: GeneratedFiles;
  presentationTitle: string;
}

const ActionButton: React.FC<{ onClick: () => void; label: string; icon?: string; colorClass: string, title?: string }> = 
  ({ onClick, label, icon, colorClass, title }) => (
  <button
    onClick={onClick}
    title={title || label}
    className={`inline-flex items-center justify-center text-white font-semibold py-2 px-3 rounded-lg text-xs sm:text-sm transition-colors duration-150 mr-2 mb-2 ${colorClass}`}
  >
    {icon && <span className="mr-1.5 text-sm">{icon}</span>}
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden">{icon || label.substring(0,3)}</span>
  </button>
);


export const GeneratedFilesPreview: React.FC<GeneratedFilesPreviewProps> = ({ files, presentationTitle }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'individual' | 'analysis' | 'dashboard'>('interactive');
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'html' | 'markdown'>('html');


  const openPreviewModal = (content: string, title: string, type: 'html' | 'markdown' = 'html') => {
    if (type === 'html') {
      const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      setPreviewContent(url); // Store URL for iframe src
    } else {
      setPreviewContent(content); // Store raw markdown for react-markdown
    }
    setPreviewTitle(title);
    setPreviewType(type);
  };

  const closePreviewModal = () => {
    if (previewType === 'html' && previewContent?.startsWith('blob:')) {
      URL.revokeObjectURL(previewContent); // Clean up blob URL
    }
    setPreviewContent(null);
    setPreviewTitle(null);
  };

  const handleDownload = (file: GeneratedFile, type: string = 'text/plain') => {
    const blob = new Blob([file.content], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCopy = async (content: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      alert(`${fileName} の内容をクリップボードにコピーしました。`);
    } catch (err) {
      console.error(`${fileName}のコピーに失敗:`, err);
      alert(`${fileName} のコピーに失敗しました。コンソールログを確認してください。`);
    }
  };

  const handleDownloadAllIndividualSlides = useCallback(async () => {
    if (!files.individualSlides || files.individualSlides.length === 0) return;
    // @ts-ignore JSZip is global
    const zip = new JSZip();
    files.individualSlides.forEach(slideFile => {
      zip.file(slideFile.name, slideFile.content);
    });
    try {
      // @ts-ignore JSZip is global
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const fileName = `${presentationTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_individual_slides.zip`;
      
      const tempA = document.createElement('a');
      const url = URL.createObjectURL(zipBlob);
      tempA.href = url;
      tempA.download = fileName;
      document.body.appendChild(tempA);
      tempA.click();
      document.body.removeChild(tempA);
      URL.revokeObjectURL(url);

    } catch (error) {
        console.error("ZIPファイルの生成またはダウンロードに失敗しました:", error);
        alert("ZIPファイルの作成に失敗しました。");
    }
  }, [files.individualSlides, presentationTitle]);


  const renderFileEntryActions = (file: GeneratedFile, type: string = 'text/plain') => {
    const isHtml = file.name.endsWith('.html');
    const isMd = file.name.endsWith('.md');
    return (
        <div className="flex flex-wrap items-center">
            <ActionButton onClick={() => handleDownload(file, type)} label="DL" icon="💾" colorClass="bg-green-600 hover:bg-green-700" title={`ダウンロード: ${file.name}`}/>
            <ActionButton onClick={() => handleCopy(file.content, file.name)} label="コピー" icon="📋" colorClass="bg-blue-600 hover:bg-blue-700" title={`コンテンツをコピー: ${file.name}`}/>
            {isHtml && (
                 <ActionButton onClick={() => openPreviewModal(file.content, file.name, 'html')} label="プレビュー" icon="👁️" colorClass="bg-rose-600 hover:bg-rose-700" title={`プレビュー: ${file.name}`}/>
            )}
            {isMd && (
                 <ActionButton onClick={() => openPreviewModal(file.content, file.name, 'markdown')} label="プレビュー" icon="👁️" colorClass="bg-purple-600 hover:bg-purple-700" title={`プレビュー: ${file.name}`}/>
            )}
        </div>
    );
  }
  
  const renderDashboardContent = () => { // "ファイル一覧" tab content
    const allGeneratedFilesForDashboard = [
        // files.unifiedPresentation was removed
        { ...files.interactivePresentation, type: 'text/html', description: 'キーボード操作の従来型スライドショー。'},
        { ...files.analysisAndDesign, type: 'text/markdown', description: 'AIの分析と設計ドキュメント。'},
        ...files.individualSlides.map(f => ({ ...f, type: 'text/html', description: `個別スライド: ${f.name.replace('.html','')}` })),
    ];
    
    return (
        <div>
            <h3 className="text-xl font-semibold mb-3 text-rose-700">生成ファイル一覧</h3>
            <p className="text-gray-600 mb-4 text-sm">各ファイルのダウンロード、内容コピー、またはHTML/Markdownプレビューが可能です。</p>
            <ul className="space-y-3">
                {allGeneratedFilesForDashboard.map(file => (
                    <li key={file.name} className="p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                            <span className="font-medium text-gray-800 block">{file.name}</span>
                            <span className="text-xs text-gray-500 block mt-1">{file.description}</span>
                        </div>
                        <div className="mt-2 sm:mt-0">
                           {renderFileEntryActions(file, file.type)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
  }


  const renderContent = () => {
    switch(activeTab) {
        case 'interactive':
            return (
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-rose-700">🎬 インタラクティブ・プレゼンテーション</h3>
                    <p className="text-gray-700 mb-2">従来型のスライドショー形式です。キーボード（左/右矢印キーまたはスペースキー）で操作します。</p>
                    {renderFileEntryActions(files.interactivePresentation, 'text/html')}
                </div>
            );
        case 'individual':
            return (
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-rose-700">📄 個別スライド</h3>
                    <div className="mb-4">
                      <ActionButton 
                        onClick={handleDownloadAllIndividualSlides} 
                        label="全スライドを一括ダウンロード (.zip)" 
                        icon="📦" 
                        colorClass="bg-teal-600 hover:bg-teal-700"
                      />
                    </div>
                    <p className="text-gray-700 mb-2">各スライドが個別のHTMLファイルとして生成されます。</p>
                    <ul className="space-y-3">
                        {files.individualSlides.map(slideFile => (
                            <li key={slideFile.name} className="p-3 bg-gray-100 rounded-md border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center">
                                <span className="font-medium text-gray-800">{slideFile.name}</span>
                                <div className="mt-2 sm:mt-0">
                                   {renderFileEntryActions(slideFile, 'text/html')}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'analysis':
             return (
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-rose-700">📊 分析と構成設計ドキュメント</h3>
                    <p className="text-gray-700 mb-2">AIによる思考プロセス、ストーリーライン、設計方針などをMarkdown形式で記録したものです。</p>
                    {renderFileEntryActions(files.analysisAndDesign, 'text/markdown')}
                    <h4 className="text-md font-semibold mt-3 mb-1 text-gray-700">内容プレビュー (Markdown):</h4>
                    <div className="mt-2 p-3 bg-gray-50 text-sm text-gray-800 rounded-md max-h-96 overflow-y-auto border-2 border-rose-600 prose prose-sm max-w-3xl mx-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {files.analysisAndDesign.content}
                        </ReactMarkdown>
                    </div>
                </div>
            );
        case 'dashboard': // This is now "ファイル一覧"
            return renderDashboardContent();
        default: return null;
    }
  }
  
  const TabButton: React.FC<{tabKey: string, currentTab: string, label: string, onClick: (tabKey: string) => void}> = 
    ({tabKey, currentTab, label, onClick}) => (
    <button
        onClick={() => onClick(tabKey)}
        className={`px-3 py-2 sm:px-4 font-medium text-sm rounded-t-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-500
                    ${activeTab === tabKey 
                        ? 'bg-rose-700 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}
    >
        {label}
    </button>
  );


  return (
    <section className="mt-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-rose-700">
        生成されたプレゼンテーション：「{presentationTitle}」
      </h2>
      
      <div className="border-b border-rose-600 mb-0">
          <nav className="-mb-px flex space-x-1 overflow-x-auto pb-0" aria-label="Tabs">
              <TabButton tabKey="interactive" currentTab={activeTab} label="インタラクティブ版" onClick={() => setActiveTab('interactive')} />
              <TabButton tabKey="individual" currentTab={activeTab} label={`個別 (${files.individualSlides.length})`} onClick={() => setActiveTab('individual')} />
              <TabButton tabKey="analysis" currentTab={activeTab} label="分析MD" onClick={() => setActiveTab('analysis')} />
              <TabButton tabKey="dashboard" currentTab={activeTab} label="ファイル一覧" onClick={() => setActiveTab('dashboard')} />
          </nav>
      </div>

      <div className="p-4 bg-white rounded-b-lg min-h-[200px] border border-gray-200 border-t-0">
        {renderContent()}
      </div>

      {previewContent && previewTitle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-gray-300">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-rose-700 truncate pr-4">{previewTitle}</h3>
                <button
                    onClick={closePreviewModal}
                    className="text-white bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded-md text-sm font-medium"
                >
                    閉じる
                </button>
            </div>
            {previewType === 'html' && previewContent.startsWith('blob:') ? (
              <iframe
                src={previewContent}
                title={previewTitle}
                className="w-full h-full border-2 border-gray-300 rounded-md bg-white"
                sandbox="allow-scripts allow-same-origin" 
              />
            ) : previewType === 'markdown' ? (
              <div className="w-full h-full border-2 border-rose-600 rounded-md bg-white overflow-y-auto p-4 prose prose-sm max-w-3xl mx-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {previewContent}
                </ReactMarkdown>
              </div>
            ) : <p>プレビュータイプが無効か、コンテンツがありません。</p>}
          </div>
        </div>
      )}
    </section>
  );
};