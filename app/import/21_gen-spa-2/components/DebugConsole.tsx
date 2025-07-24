import React, { useRef, useEffect } from 'react';
import { DebugLog } from '../types';

interface DebugConsoleProps {
  logs: DebugLog[];
  isVisible: boolean;
}

export const DebugConsole: React.FC<DebugConsoleProps> = ({ logs, isVisible }) => {
  const consoleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const formatLog = (log: DebugLog): string => {
    const timestamp = log.timestamp;
    const levelEmoji = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      success: '✅'
    }[log.level];

    let message = `[${timestamp}] ${levelEmoji} ${log.message}`;
    
    if (log.details) {
      if (typeof log.details === 'object') {
        try {
          const detailsStr = JSON.stringify(log.details, null, 2);
          message += `\n詳細データ:\n${detailsStr}`;
        } catch (e) {
          message += `\n詳細データ: ${log.details}`;
        }
      } else {
        message += `\n詳細: ${log.details}`;
      }
    }
    
    return message;
  };

  const downloadLogs = () => {
    const logContent = logs.map(formatLog).join('\n\n---\n\n');
    const markdown = `# Gen-Spa 2.0 デバッグログ

生成日時: ${new Date().toLocaleString('ja-JP')}

## ログ内容

${logContent}

## システム情報
- ブラウザ: ${navigator.userAgent}
- 画面サイズ: ${window.innerWidth} x ${window.innerHeight}
`;

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gen-spa-debug-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t-2 border-yellow-400 p-2 z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-yellow-400 font-bold text-sm">🔧 デバッグコンソール</span>
        <div className="space-x-2">
          <button
            onClick={() => {
              if (consoleRef.current) {
                consoleRef.current.select();
                document.execCommand('copy');
                alert('ログをコピーしました！');
              }
            }}
            className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
          >
            コピー
          </button>
          <button
            onClick={downloadLogs}
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
          >
            ダウンロード
          </button>
        </div>
      </div>
      <textarea
        ref={consoleRef}
        readOnly
        value={logs.map(formatLog).join('\n\n')}
        className="w-full h-24 bg-black text-yellow-400 font-mono text-xs p-2 rounded resize-none"
        placeholder="APIの動作状況がここに表示されます..."
      />
    </div>
  );
};