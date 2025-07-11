// デバッグウィンドウコンポーネント
import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Trash2, Circle } from 'lucide-react';
import { APP_VERSION, BUILD_DATE, VERSION_NAME } from '../constants/version';

interface LogEntry {
  timestamp: string;
  message: string;
  level: 'info' | 'warn' | 'error' | 'success';
}

interface ActionEntry {
  timestamp: string;
  action: string;
  details?: string;
  status: 'pending' | 'success' | 'error';
}

interface DebugWindowProps {
  className?: string;
}

export const DebugWindow: React.FC<DebugWindowProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [actions, setActions] = useState<ActionEntry[]>([]);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [activeTab, setActiveTab] = useState<'logs' | 'actions'>('logs');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // グローバルなログ関数を登録
  useEffect(() => {
    const logFunction = (message: string, level: LogEntry['level'] = 'info') => {
      const entry: LogEntry = {
        timestamp: new Date().toLocaleTimeString('ja-JP'),
        message,
        level
      };
      setLogs(prev => [...prev, entry]);
    };

    const actionFunction = (action: string, details?: string, status: ActionEntry['status'] = 'success') => {
      const entry: ActionEntry = {
        timestamp: new Date().toLocaleTimeString('ja-JP'),
        action,
        details,
        status
      };
      setActions(prev => [...prev, entry]);
    };

    // グローバルに公開
    (window as any).debugLog = logFunction;
    (window as any).debugAction = actionFunction;

    // 初期メッセージ
    logFunction('デバッグウィンドウを初期化しました', 'success');
    actionFunction('システム起動', 'MD Buddy v' + APP_VERSION, 'success');
    
    // クリーンアップ
    return () => {
      delete (window as any).debugLog;
      delete (window as any).debugAction;
    };
  }, []);

  // API接続チェック
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        // LocalStorageから設定を読み込み
        const settings = localStorage.getItem('md-buddy-settings');
        const apiKey = settings ? JSON.parse(settings).apiKey : import.meta.env.VITE_GEMINI_API_KEY;
        
        if (!apiKey || apiKey === 'your-api-key') {
          throw new Error('Gemini APIキーが設定されていません');
        }

        // 簡単な接続テスト（実際のAPIエンドポイントを使用）
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
          { method: 'GET' }
        );

        if (response.ok) {
          setApiStatus('connected');
          (window as any).debugLog?.('Gemini API接続OK - スタンバイ状態', 'success');
          (window as any).debugAction?.('API接続確認', 'Gemini API接続成功', 'success');
        } else {
          throw new Error(`API応答エラー: ${response.status}`);
        }
      } catch (error: any) {
        setApiStatus('error');
        (window as any).debugLog?.(`API接続エラー: ${error.message}`, 'error');
        (window as any).debugAction?.('API接続確認', error.message, 'error');
      }
    };

    checkApiConnection();
    
    // 30秒ごとに再チェック
    const interval = setInterval(checkApiConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // ログが追加されたら自動スクロール
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => {
    setLogs([]);
    (window as any).debugLog?.('ログをクリアしました', 'info');
  };

  const clearActions = () => {
    setActions([]);
    (window as any).debugAction?.('アクション履歴クリア', '', 'success');
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected': return 'API接続OK';
      case 'error': return 'API接続エラー';
      default: return 'API接続確認中...';
    }
  };

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 transition-all duration-300 z-50 ${
        isExpanded ? 'h-64' : 'h-8'
      } ${className}`}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between h-8 px-4 bg-black cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          <span className="text-yellow-400 text-xs font-mono">DEBUG</span>
          <span className="text-blue-400 text-xs font-mono">v{APP_VERSION}</span>
          <div className="flex items-center gap-2">
            <Circle className={`w-2 h-2 fill-current ${getStatusColor()}`} />
            <span className={`text-xs font-mono ${getStatusColor()}`}>{getStatusText()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (activeTab === 'logs') {
                  clearLogs();
                } else {
                  clearActions();
                }
              }}
              className="text-gray-400 hover:text-white transition-colors"
              title={activeTab === 'logs' ? 'ログをクリア' : 'アクション履歴をクリア'}
            >
              <Trash2 size={14} />
            </button>
          )}
          {isExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronUp size={14} className="text-gray-400" />}
        </div>
      </div>

      {/* 展開時のコンテンツ */}
      {isExpanded && (
        <div className="flex flex-col h-full bg-gray-900">
          {/* タブ */}
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-1 text-xs font-mono ${
                activeTab === 'logs' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('logs')}
            >
              ログ ({logs.length})
            </button>
            <button
              className={`px-4 py-1 text-xs font-mono ${
                activeTab === 'actions' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('actions')}
            >
              アクション履歴 ({actions.length})
            </button>
          </div>

          {/* タブコンテンツ */}
          {activeTab === 'logs' ? (
            <div 
              ref={logContainerRef}
              className="flex-1 overflow-y-auto p-2 font-mono text-xs"
            >
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-4">ログはまだありません</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="py-0.5">
                    <span className="text-gray-500">[{log.timestamp}]</span>
                    <span className={`ml-2 ${getLogColor(log.level)}`}>{log.message}</span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
              {actions.length === 0 ? (
                <div className="text-gray-500 text-center py-4">アクション履歴はまだありません</div>
              ) : (
                actions.map((action, index) => (
                  <div key={index} className="py-1 flex items-start gap-2">
                    <span className="text-gray-500">[{action.timestamp}]</span>
                    <span className={`${
                      action.status === 'success' ? 'text-green-400' : 
                      action.status === 'error' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {action.action}
                    </span>
                    {action.details && (
                      <span className="text-gray-400">- {action.details}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};