// 2カラムレイアウトコンポーネント（音声コメント表示用）

import React, { useState, useRef, useEffect } from 'react';
import { VoiceCommentList, VoiceCommentInfo, VoiceCommentInput } from '../components/VoiceComment';
import { HighlightInfo } from '../components/TextHighlighter';
import { useRealtimeComments, useRealtimeHighlights } from '../hooks/useSupabaseRealtime';

// レイアウトスタイル
export enum LayoutStyle {
  SIDE_BY_SIDE = 'side-by-side',
  OVERLAY = 'overlay',
  FLOATING = 'floating',
  RESPONSIVE = 'responsive'
}

// プロパティ
interface TwoColumnLayoutProps {
  // メインコンテンツ
  children: React.ReactNode;
  
  // コメント関連
  fileId: string;
  comments: VoiceCommentInfo[];
  onCommentAdd?: (comment: Omit<VoiceCommentInfo, 'id' | 'userId' | 'createdAt'>) => void;
  onCommentReply?: (commentId: string) => void;
  onCommentResolve?: (commentId: string) => void;
  onCommentDelete?: (commentId: string) => void;
  
  // ハイライト関連
  highlights: HighlightInfo[];
  
  // レイアウト設定
  layoutStyle?: LayoutStyle;
  sidebarWidth?: number | string;
  showSidebar?: boolean;
  collapsible?: boolean;
  className?: string;
}

// メインコンポーネント
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  children,
  fileId,
  comments,
  onCommentAdd,
  onCommentReply,
  onCommentResolve,
  onCommentDelete,
  highlights,
  layoutStyle = LayoutStyle.RESPONSIVE,
  sidebarWidth = '350px',
  showSidebar: initialShowSidebar = true,
  collapsible = true,
  className = ''
}) => {
  const [showSidebar, setShowSidebar] = useState(initialShowSidebar);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [parentCommentId, setParentCommentId] = useState<string | undefined>();
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // リアルタイム同期
  const { data: realtimeComments } = useRealtimeComments(fileId);
  const { data: realtimeHighlights } = useRealtimeHighlights(fileId);
  
  // モバイル検出
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // レスポンシブ対応
  useEffect(() => {
    if (layoutStyle === LayoutStyle.RESPONSIVE) {
      setShowSidebar(!isMobile);
    }
  }, [isMobile, layoutStyle]);
  
  // コメント追加ハンドラー
  const handleCommentAdd = (comment: Omit<VoiceCommentInfo, 'id' | 'userId' | 'createdAt'>) => {
    if (onCommentAdd) {
      onCommentAdd(comment);
    }
    setShowCommentInput(false);
    setParentCommentId(undefined);
  };
  
  // 返信ハンドラー
  const handleReply = (commentId: string) => {
    setParentCommentId(commentId);
    setShowCommentInput(true);
    
    if (onCommentReply) {
      onCommentReply(commentId);
    }
  };
  
  // レイアウトスタイルの取得
  const getLayoutStyles = () => {
    const baseStyles = {
      container: {
        display: 'flex',
        height: '100%',
        position: 'relative' as const,
        overflow: 'hidden'
      },
      mainContent: {
        flex: 1,
        overflow: 'auto',
        position: 'relative' as const
      },
      sidebar: {
        overflow: 'auto',
        backgroundColor: '#f8f9fa',
        borderLeft: '1px solid #e0e0e0',
        transition: 'all 0.3s ease'
      }
    };
    
    switch (layoutStyle) {
      case LayoutStyle.SIDE_BY_SIDE:
        return {
          ...baseStyles,
          sidebar: {
            ...baseStyles.sidebar,
            width: showSidebar ? sidebarWidth : '0',
            opacity: showSidebar ? 1 : 0
          }
        };
        
      case LayoutStyle.OVERLAY:
        return {
          ...baseStyles,
          container: {
            ...baseStyles.container,
            position: 'relative' as const
          },
          sidebar: {
            ...baseStyles.sidebar,
            position: 'absolute' as const,
            right: showSidebar ? 0 : `-${sidebarWidth}`,
            top: 0,
            bottom: 0,
            width: sidebarWidth,
            zIndex: 100,
            boxShadow: '-4px 0 12px rgba(0,0,0,0.1)'
          }
        };
        
      case LayoutStyle.FLOATING:
        return {
          ...baseStyles,
          sidebar: {
            ...baseStyles.sidebar,
            position: 'fixed' as const,
            right: showSidebar ? '20px' : '-400px',
            top: '80px',
            bottom: '20px',
            width: sidebarWidth,
            maxWidth: '400px',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            zIndex: 1000
          }
        };
        
      case LayoutStyle.RESPONSIVE:
      default:
        if (isMobile) {
          return {
            ...baseStyles,
            container: {
              ...baseStyles.container,
              flexDirection: 'column' as const
            },
            sidebar: {
              ...baseStyles.sidebar,
              position: 'fixed' as const,
              bottom: showSidebar ? 0 : '-70vh',
              left: 0,
              right: 0,
              height: '70vh',
              width: '100%',
              borderLeft: 'none',
              borderTop: '1px solid #e0e0e0',
              borderRadius: '20px 20px 0 0',
              zIndex: 1000
            }
          };
        }
        return {
          ...baseStyles,
          sidebar: {
            ...baseStyles.sidebar,
            width: showSidebar ? sidebarWidth : '0',
            opacity: showSidebar ? 1 : 0
          }
        };
    }
  };
  
  const styles = getLayoutStyles();
  
  // 位置に関連するコメントとハイライトを取得
  const getRelatedItems = (position: number) => {
    const relatedComments = comments.filter(c => 
      Math.abs(c.position - position) < 50
    );
    const relatedHighlights = highlights.filter(h => 
      position >= h.start && position <= h.end
    );
    
    return { comments: relatedComments, highlights: relatedHighlights };
  };
  
  return (
    <div className={`two-column-layout ${className}`} style={styles.container}>
      {/* メインコンテンツエリア */}
      <div className="main-content" style={styles.mainContent}>
        {/* トグルボタン（コラプシブルの場合） */}
        {collapsible && (
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            style={{
              position: 'fixed',
              right: showSidebar ? 
                (layoutStyle === LayoutStyle.FLOATING ? '440px' : 
                 typeof sidebarWidth === 'string' ? `calc(${sidebarWidth} + 20px)` : `${sidebarWidth + 20}px`) : 
                '20px',
              top: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid #e0e0e0',
              backgroundColor: 'white',
              cursor: 'pointer',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {showSidebar ? '💬' : '💬'}
          </button>
        )}
        
        {/* 子要素（メインコンテンツ） */}
        <div onClick={(e) => {
          // クリック位置を計算してコメント追加位置を設定
          const rect = e.currentTarget.getBoundingClientRect();
          const position = e.clientY - rect.top + e.currentTarget.scrollTop;
          setSelectedPosition(position);
        }}>
          {children}
        </div>
        
        {/* フローティングコメント追加ボタン */}
        {selectedPosition !== null && (
          <button
            onClick={() => setShowCommentInput(true)}
            style={{
              position: 'absolute',
              left: '20px',
              top: `${selectedPosition}px`,
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            + コメント追加
          </button>
        )}
      </div>
      
      {/* サイドバー（コメント表示） */}
      <div ref={sidebarRef} className="comments-sidebar" style={styles.sidebar}>
        {showSidebar && (
          <div style={{ padding: '20px' }}>
            {/* ヘッダー */}
            <div style={{ 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                💬 コメント ({comments.length})
              </h3>
              {isMobile && (
                <button
                  onClick={() => setShowSidebar(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* 統計情報 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '20px',
              fontSize: '13px',
              color: '#666'
            }}>
              <div style={{
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {comments.filter(c => !c.isResolved).length}
                </div>
                <div>未解決</div>
              </div>
              <div style={{
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: 'bold', color: '#4caf50' }}>
                  {comments.filter(c => c.isResolved).length}
                </div>
                <div>解決済み</div>
              </div>
            </div>
            
            {/* コメントリスト */}
            {comments.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💭</div>
                <p>まだコメントがありません</p>
                <p style={{ fontSize: '14px' }}>
                  テキストを選択してコメントを追加しましょう
                </p>
              </div>
            ) : (
              <VoiceCommentList
                comments={realtimeComments.length > 0 ? realtimeComments : comments}
                onReply={handleReply}
                onResolve={onCommentResolve}
                onDelete={onCommentDelete}
              />
            )}
          </div>
        )}
      </div>
      
      {/* コメント入力ダイアログ */}
      {showCommentInput && selectedPosition !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <VoiceCommentInput
            position={selectedPosition}
            fileId={fileId}
            onCommentAdd={handleCommentAdd}
            onClose={() => {
              setShowCommentInput(false);
              setSelectedPosition(null);
              setParentCommentId(undefined);
            }}
            parentCommentId={parentCommentId}
          />
        </div>
      )}
      
      {/* モバイル用ドラッグハンドル */}
      {isMobile && showSidebar && (
        <div
          style={{
            position: 'fixed',
            bottom: '70vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#ccc',
            borderRadius: '2px',
            cursor: 'ns-resize',
            zIndex: 1001
          }}
        />
      )}
    </div>
  );
};

// プリセットレイアウトコンポーネント
export const SideBySideLayout: React.FC<Omit<TwoColumnLayoutProps, 'layoutStyle'>> = (props) => (
  <TwoColumnLayout {...props} layoutStyle={LayoutStyle.SIDE_BY_SIDE} />
);

export const OverlayLayout: React.FC<Omit<TwoColumnLayoutProps, 'layoutStyle'>> = (props) => (
  <TwoColumnLayout {...props} layoutStyle={LayoutStyle.OVERLAY} />
);

export const FloatingLayout: React.FC<Omit<TwoColumnLayoutProps, 'layoutStyle'>> = (props) => (
  <TwoColumnLayout {...props} layoutStyle={LayoutStyle.FLOATING} />
);

export const ResponsiveLayout: React.FC<Omit<TwoColumnLayoutProps, 'layoutStyle'>> = (props) => (
  <TwoColumnLayout {...props} layoutStyle={LayoutStyle.RESPONSIVE} />
);