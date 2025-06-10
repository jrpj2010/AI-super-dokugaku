
import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetailView from './components/VideoDetailView';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import SettingsModal, { getApiKey } from './components/SettingsModal';
import { APP_TITLE } from './constants';
import { Video, VideoDetails, SearchFilters, SearchResult } from './types';
import * as youtubeService from './services/youtubeService';
import { ExclamationTriangleIcon, InformationCircleIcon, Cog6ToothIcon } from './components/icons';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({ dateRange: 'any', videoLength: 'any', sortBy: 'relevance' });
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDetails | null>(null);
  
  const [currentPageToken, setCurrentPageToken] = useState<string | undefined>(undefined);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(undefined);
  const [totalResults, setTotalResults] = useState<number>(0);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState<boolean>(false);

  const addDebugLog = useCallback((message: string) => {
    setDebugLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 99)]);
  },[]);

  useEffect(() => {
    // Load API key from localStorage on app initialization
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
      addDebugLog("アプリケーションが初期化されました。保存されたAPIキーを読み込みました。");
    } else {
      addDebugLog("アプリケーションが初期化されました。APIキーが設定されていません。");
    }
  }, [addDebugLog]);

  const handleApiKeySave = (newKey: string) => {
    setApiKey(newKey);
    if (newKey) {
      addDebugLog(`APIキーが保存されました: ${newKey.substring(0, 8)}...`);
    } else {
      addDebugLog("APIキーが削除されました。");
    }
  };

  const handleSearch = useCallback(async (query: string, currentFilters: SearchFilters, pageToken?: string) => {
    if (!apiKey) {
      setError('APIキーが設定されていません。設定画面からYouTube Data API v3キーを入力してください。');
      return;
    }

    addDebugLog(`検索開始 (YouTube API): "${query}", フィルター: ${JSON.stringify(currentFilters)}, pageToken: ${pageToken || '最初のページ'}`);
    setIsLoading(true);
    setError(null);
    setSelectedVideo(null); 
    setSearchQuery(query);
    setFilters(currentFilters);

    try {
      const result: SearchResult = await youtubeService.searchVideos(query, currentFilters, pageToken);
      setVideos(result.videos);
      setTotalResults(result.totalResults);
      setNextPageToken(result.nextPageToken);
      setPrevPageToken(result.prevPageToken);
      setCurrentPageToken(pageToken);

      addDebugLog(`検索成功 (YouTube API): ${result.videos.length}件の結果 (総計 ${result.totalResults}件)`);
      if (result.videos.length === 0) {
        addDebugLog("結果0件。");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`動画検索エラー: ${errorMsg}`);
      addDebugLog(`動画検索エラー: ${errorMsg}`);
      setVideos([]);
      setTotalResults(0);
      setNextPageToken(undefined);
      setPrevPageToken(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, addDebugLog]);

  const handleSelectVideo = useCallback(async (video: Video) => {
    if (!apiKey) {
      setError('APIキーが設定されていません。設定画面からYouTube Data API v3キーを入力してください。');
      return;
    }

    addDebugLog(`動画選択 (YouTube API): "${video.title}" (ID: ${video.id})`);
    setIsLoading(true);
    setError(null);
    setSelectedVideo(null);
    try {
      const details = await youtubeService.getVideoDetails(video.id);
      if (details) {
        setSelectedVideo(details);
        addDebugLog(`動画詳細取得成功 (YouTube API): ${details.title}`);
      } else {
        setError('選択された動画の詳細が見つかりませんでした。');
        addDebugLog(`動画詳細取得エラー: ID ${video.id} の詳細が見つかりません。`);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`動画詳細取得エラー: ${errorMsg}`);
      addDebugLog(`動画詳細取得エラー: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, addDebugLog]);

  const handleCloseDetailView = () => {
    addDebugLog("動画詳細ビューを閉じる");
    setSelectedVideo(null);
  };

  const handlePageChange = (token?: string) => {
    handleSearch(searchQuery, filters, token);
  };

  const handleDownload = useCallback((videoDetails: VideoDetails) => {
    addDebugLog(`ダウンロード準備: ${videoDetails.title}`);
    const { title, description, subtitles, comments, videoUrl, channelTitle } = videoDetails;
    
    let markdownContent = `# ${title}\n\n`;
    markdownContent += `**チャンネル (Channel):** ${channelTitle}\n`;
    markdownContent += `**URL:** ${videoUrl}\n\n`;
    markdownContent += `## 説明 (Description)\n${description || '説明なし (No description)'}\n\n`;

    if (subtitles && subtitles.length > 0) {
      markdownContent += `## 利用可能な字幕トラック (Available Subtitle Tracks)\n`;
      subtitles.forEach(track => {
        markdownContent += `- ${track.langName} (${track.langCode})${track.isAutoGenerated ? ' (自動生成)' : ''}${track.kind ? ` [${track.kind}]` : ''}\n`;
      });
      markdownContent += `\n(注: 字幕のテキスト内容は現在のバージョンではエクスポートされません。)\n\n`;
    } else {
      markdownContent += `## 字幕 (Subtitles)\n利用可能な字幕トラックはありません。(No subtitle tracks available.)\n\n`;
    }

    if (comments && comments.length > 0) {
      markdownContent += `## コメント (Comments)\n`;
      comments.forEach(comment => {
        markdownContent += `**${comment.authorName}** (${youtubeService.timeAgo(comment.publishedAt)}):\n`;
        markdownContent += `${comment.text}\n`;
        markdownContent += `Likes: ${comment.likeCount}, Replies: ${comment.replyCount}\n\n`;
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            markdownContent += `  - **${reply.authorName}** (${youtubeService.timeAgo(reply.publishedAt)}):\n`;
            markdownContent += `    ${reply.text}\n`;
            markdownContent += `    Likes: ${reply.likeCount}\n\n`;
          });
        }
      });
    } else {
       markdownContent += `## コメント (Comments)\n利用可能なコメントはありません。(No comments available.)\n\n`;
    }

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'youtube_content'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addDebugLog(`Markdownファイル生成完了: ${a.download}`);
    alert('情報がMarkdown形式でダウンロードされました。(Information downloaded as Markdown.)');
  }, [addDebugLog]);
  
  useEffect(() => {
    if(searchQuery || filters) setError(null);
  }, [searchQuery, filters]);


  return (
    <>
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 w-full flex-grow">
      <div className="w-full max-w-4xl">
        <header className="mb-6 text-center relative">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {APP_TITLE}
          </h1>
           <button
            onClick={() => setShowSettingsModal(true)}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="Open settings"
          >
            <Cog6ToothIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </header>
        
        {!apiKey && (
          <div className="my-4 p-4 bg-yellow-800 bg-opacity-30 border border-yellow-700 text-yellow-200 rounded-md flex items-start" role="alert">
            <ExclamationTriangleIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">APIキーが設定されていません (API Key Not Set)</p>
              <p className="text-sm break-words">
                YouTubeデータを検索するには、設定画面からYouTube Data API v3キーを入力してください。
                (To search YouTube data, please enter your YouTube Data API v3 key in the settings.)
              </p>
            </div>
          </div>
        )}

        <SearchBar 
            onSearch={(q, f) => handleSearch(q, f, undefined)}
            isLoading={isLoading} 
            initialQuery={searchQuery} 
            initialFilters={filters} 
            disabled={!apiKey} // Search is disabled when no API key
        />

        {error && (
          <div className="my-4 p-4 bg-red-800 border border-red-700 text-red-100 rounded-md flex items-start" role="alert">
            <ExclamationTriangleIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">エラー (Error)</p>
              <p className="text-sm break-words">{error}</p>
            </div>
          </div>
        )}

        {apiKey && (
          <div className="my-4 p-4 bg-green-800 bg-opacity-30 border border-green-700 text-green-200 rounded-md flex items-start" role="alert">
            <InformationCircleIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-1 text-green-400" />
            <div>
              <p className="font-semibold">APIキーが設定されています (API Key Configured)</p>
              <p className="text-sm break-words">
                YouTubeデータの検索が可能です。上の検索バーからキーワードを入力して動画を検索してください。
                (YouTube data search is available. Enter keywords in the search bar above to search for videos.)
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-40 my-4">
            <LoadingSpinner size="w-12 h-12" />
          </div>
        )}
        
        {!isLoading && !error && !selectedVideo && videos.length === 0 && searchQuery && (
           <VideoList videos={[]} onSelectVideo={() => {}} isLoading={false} />
        )}

        {!isLoading && !selectedVideo && videos.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-4">{totalResults.toLocaleString()} 件の動画が見つかりました。(Found {totalResults.toLocaleString()} videos.)</p>
            <VideoList videos={videos} onSelectVideo={handleSelectVideo} isLoading={isLoading} />
            <Pagination 
                onPageChange={handlePageChange} 
                isLoading={isLoading} 
                prevPageToken={prevPageToken}
                nextPageToken={nextPageToken}
            />
          </>
        )}
        
        {!isLoading && !selectedVideo && videos.length === 0 && !searchQuery && !error && (
             <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-800 text-gray-400 rounded-lg p-6 text-center my-4">
                <InformationCircleIcon className="w-12 h-12 mb-4 text-blue-500"/>
                <p className="text-lg">動画を検索してください。(Search for videos.)</p>
                <p className="text-sm">上の検索バーにキーワードを入力し、「検索」ボタンを押してください。</p>
                <p className="text-sm mt-1">(Enter a keyword in the search bar above and click 'Search'.)</p>
             </div>
        )}

        {!isLoading && selectedVideo && (
          <VideoDetailView video={selectedVideo} onClose={handleCloseDetailView} onDownload={handleDownload} />
        )}
        
        <div className="mt-12">
            <button 
                onClick={() => setShowDebug(!showDebug)} 
                className="text-sm text-gray-400 hover:text-gray-200 mb-2"
                aria-expanded={showDebug}
                aria-controls="debug-log-panel"
            >
                {showDebug ? 'デバッグログを隠す (Hide Debug Log)' : 'デバッグログを表示 (Show Debug Log)'}
            </button>
            {showDebug && (
                <div id="debug-log-panel" className="bg-gray-950 p-4 rounded-lg shadow-inner max-h-60 overflow-y-auto border border-gray-700">
                    <h3 className="text-md font-semibold text-gray-300 mb-2">通信ログ (Communication Log)</h3>
                    {debugLog.length === 0 && <p className="text-sm text-gray-500">ログエントリがありません。(No log entries yet.)</p>}
                    <ul className="space-y-1">
                    {debugLog.map((log, index) => (
                        <li key={index} className="text-xs text-gray-400 font-mono break-all">{log}</li>
                    ))}
                    </ul>
                </div>
            )}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} YouTube Subtitle Manager.</p>
           <div className="mt-2 p-3 bg-gray-800 rounded-md border border-gray-700 max-w-2xl mx-auto text-left text-xs">
            <h4 className="font-semibold text-gray-300">セキュリティに関する注意 (Security Note):</h4>
            <p className="mt-1">
              このアプリケーションは現在、APIキーをブラウザのローカルストレージに保存しています。
              これは開発・テスト用の構成であり、本番環境ではAPIキーをバックエンドサーバーで管理することを強く推奨します。
            </p>
            <p className="mt-1">
              (This application currently stores the API key in the browser's localStorage. This is a development/testing configuration. For production environments, it's strongly recommended to manage API keys on a backend server.)
            </p>
          </div>
        </footer>
      </div>
    </div>
    <SettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)}
        onApiKeySave={handleApiKeySave}
        currentApiKey={apiKey}
    />
    </>
  );
};

export default App;