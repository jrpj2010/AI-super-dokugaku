// ストリーミングMarkdown表示コンポーネント
import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';

interface StreamingMarkdownProps {
  content: string;
  isStreaming: boolean;
  className?: string;
  showCursor?: boolean;
}

export const StreamingMarkdown: React.FC<StreamingMarkdownProps> = ({
  content,
  isStreaming,
  className = '',
  showCursor = true
}) => {
  const [displayContent, setDisplayContent] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // コンテンツのストリーミング表示
  useEffect(() => {
    if (isStreaming && content.length > displayContent.length) {
      const timer = setTimeout(() => {
        setDisplayContent(content.slice(0, displayContent.length + 1));
      }, 10); // 10msごとに1文字追加
      
      return () => clearTimeout(timer);
    } else if (!isStreaming) {
      setDisplayContent(content);
    }
  }, [content, displayContent, isStreaming]);

  // カーソルの点滅
  useEffect(() => {
    if (showCursor && isStreaming) {
      const interval = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [showCursor, isStreaming]);

  // 自動スクロール
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayContent]);

  // Markdownをパース
  const parsedContent = marked(displayContent || '');

  return (
    <div 
      ref={containerRef}
      className={`overflow-y-auto transition-all duration-200 ${className}`}
    >
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div 
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
        {isStreaming && showCursor && (
          <span 
            className={`inline-block w-0.5 h-5 bg-blue-500 ml-0.5 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-100`}
          />
        )}
      </div>
      
      {/* ストリーミング中のインジケーター */}
      {isStreaming && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span>変換中...</span>
        </div>
      )}
    </div>
  );
};