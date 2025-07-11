// テキストハイライトコンポーネント

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { analyticsTracker } from '../services/analytics/tracker';

// ハイライトタイプ
export enum HighlightType {
  IMPORTANT = 'important',
  QUESTION = 'question',
  ACTION = 'action',
  DECISION = 'decision',
  CUSTOM = 'custom'
}

// ハイライトカラー
const HIGHLIGHT_COLORS: Record<HighlightType, string> = {
  [HighlightType.IMPORTANT]: '#ffff00', // 黄色
  [HighlightType.QUESTION]: '#ff69b4', // ピンク
  [HighlightType.ACTION]: '#90ee90', // 薄緑
  [HighlightType.DECISION]: '#87ceeb', // スカイブルー
  [HighlightType.CUSTOM]: '#ffa500' // オレンジ
};

// ハイライトアイコン
const HIGHLIGHT_ICONS: Record<HighlightType, string> = {
  [HighlightType.IMPORTANT]: '⭐',
  [HighlightType.QUESTION]: '❓',
  [HighlightType.ACTION]: '✓',
  [HighlightType.DECISION]: '🎯',
  [HighlightType.CUSTOM]: '📌'
};

// ハイライト情報
export interface HighlightInfo {
  id: string;
  start: number;
  end: number;
  text: string;
  type: HighlightType;
  color: string;
  notes?: string;
  createdAt: Date;
}

// プロパティ
interface TextHighlighterProps {
  text: string;
  highlights: HighlightInfo[];
  onHighlight?: (highlight: Omit<HighlightInfo, 'id' | 'createdAt'>) => void;
  onHighlightClick?: (highlight: HighlightInfo) => void;
  onHighlightDelete?: (highlightId: string) => void;
  onHighlightUpdate?: (highlightId: string, updates: Partial<HighlightInfo>) => void;
  readOnly?: boolean;
  className?: string;
  fileId?: string;
}

// コンポーネント
export const TextHighlighter: React.FC<TextHighlighterProps> = ({
  text,
  highlights,
  onHighlight,
  onHighlightClick,
  onHighlightDelete,
  onHighlightUpdate,
  readOnly = false,
  className = '',
  fileId
}) => {
  const [selection, setSelection] = useState<{
    start: number;
    end: number;
    text: string;
  } | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightInfo | null>(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  // テキスト選択処理
  const handleTextSelection = useCallback(() => {
    if (readOnly) return;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !textRef.current) return;

    const range = sel.getRangeAt(0);
    const selectedText = sel.toString().trim();
    
    if (selectedText.length === 0) return;

    // 選択範囲の開始・終了位置を計算
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(textRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;
    const end = start + selectedText.length;

    setSelection({ start, end, text: selectedText });

    // メニュー位置を設定
    const rect = range.getBoundingClientRect();
    setMenuPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setShowMenu(true);
  }, [readOnly]);

  // 選択解除処理
  const handleClearSelection = useCallback(() => {
    setSelection(null);
    setShowMenu(false);
    setSelectedHighlight(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  // ハイライト作成
  const createHighlight = useCallback((type: HighlightType) => {
    if (!selection || !onHighlight) return;

    const highlight = {
      start: selection.start,
      end: selection.end,
      text: selection.text,
      type,
      color: HIGHLIGHT_COLORS[type],
      notes: noteText || undefined
    };

    onHighlight(highlight);

    // アナリティクス記録
    if (fileId) {
      analyticsTracker.trackHighlight(
        fileId,
        selection.start,
        selection.end,
        selection.text,
        type,
        HIGHLIGHT_COLORS[type],
        noteText || undefined
      );
    }

    handleClearSelection();
    setNoteText('');
  }, [selection, onHighlight, fileId, noteText, handleClearSelection]);

  // ハイライトクリック処理
  const handleHighlightClick = useCallback((highlight: HighlightInfo, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedHighlight(highlight);
    setNoteText(highlight.notes || '');
    
    if (onHighlightClick) {
      onHighlightClick(highlight);
    }

    // ポップアップメニューを表示
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setMenuPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 5
    });
    setShowMenu(true);
  }, [onHighlightClick]);

  // ハイライト削除
  const handleDeleteHighlight = useCallback(() => {
    if (selectedHighlight && onHighlightDelete) {
      onHighlightDelete(selectedHighlight.id);
      handleClearSelection();
    }
  }, [selectedHighlight, onHighlightDelete, handleClearSelection]);

  // ノート更新
  const handleUpdateNote = useCallback(() => {
    if (selectedHighlight && onHighlightUpdate) {
      onHighlightUpdate(selectedHighlight.id, { notes: noteText });
      setShowNoteDialog(false);
      handleClearSelection();
    }
  }, [selectedHighlight, onHighlightUpdate, noteText, handleClearSelection]);

  // テキストレンダリング
  const renderHighlightedText = useCallback(() => {
    if (highlights.length === 0) {
      return <span>{text}</span>;
    }

    // ハイライトをソート
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
    const elements: React.ReactNode[] = [];
    let lastEnd = 0;

    sortedHighlights.forEach((highlight, index) => {
      // ハイライト前のテキスト
      if (highlight.start > lastEnd) {
        elements.push(
          <span key={`text-${index}`}>
            {text.substring(lastEnd, highlight.start)}
          </span>
        );
      }

      // ハイライト部分
      elements.push(
        <span
          key={`highlight-${highlight.id}`}
          className="highlight-span"
          style={{
            backgroundColor: highlight.color,
            cursor: 'pointer',
            position: 'relative',
            padding: '2px 0'
          }}
          onClick={(e) => handleHighlightClick(highlight, e)}
          title={highlight.notes || `${HIGHLIGHT_ICONS[highlight.type]} ${highlight.type}`}
        >
          {highlight.text}
          {highlight.notes && (
            <span className="highlight-note-indicator">
              💬
            </span>
          )}
        </span>
      );

      lastEnd = highlight.end;
    });

    // 最後のテキスト
    if (lastEnd < text.length) {
      elements.push(
        <span key="text-last">
          {text.substring(lastEnd)}
        </span>
      );
    }

    return elements;
  }, [text, highlights, handleHighlightClick]);

  // イベントリスナー設定
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(handleTextSelection, 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && !((event.target as HTMLElement).closest('.highlight-menu'))) {
        handleClearSelection();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleTextSelection, handleClearSelection, showMenu]);

  return (
    <div className={`text-highlighter ${className}`}>
      {/* テキスト表示エリア */}
      <div
        ref={textRef}
        className="highlight-text-area"
        style={{
          lineHeight: '1.8',
          padding: '16px',
          userSelect: readOnly ? 'none' : 'text',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {renderHighlightedText()}
      </div>

      {/* ハイライトメニュー */}
      {showMenu && (
        <div
          className="highlight-menu"
          style={{
            position: 'fixed',
            left: `${menuPosition.x}px`,
            top: `${menuPosition.y}px`,
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '8px',
            zIndex: 1000,
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}
        >
          {selection && !selectedHighlight ? (
            // 新規ハイライト作成メニュー
            <>
              {Object.entries(HighlightType).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    if (value === HighlightType.CUSTOM) {
                      setShowNoteDialog(true);
                    } else {
                      createHighlight(value);
                    }
                  }}
                  className="highlight-type-button"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: HIGHLIGHT_COLORS[value],
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  title={value}
                >
                  {HIGHLIGHT_ICONS[value]}
                </button>
              ))}
            </>
          ) : selectedHighlight ? (
            // 既存ハイライト編集メニュー
            <>
              <button
                onClick={() => setShowNoteDialog(true)}
                className="highlight-action-button"
                style={{
                  padding: '6px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {selectedHighlight.notes ? '💬 ノート編集' : '💬 ノート追加'}
              </button>
              <button
                onClick={handleDeleteHighlight}
                className="highlight-action-button"
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ff4444',
                  borderRadius: '4px',
                  backgroundColor: '#ffeeee',
                  color: '#ff4444',
                  cursor: 'pointer'
                }}
              >
                🗑️ 削除
              </button>
            </>
          ) : null}
        </div>
      )}

      {/* ノート入力ダイアログ */}
      {showNoteDialog && (
        <div
          className="highlight-note-dialog"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            padding: '20px',
            zIndex: 1001,
            width: '300px'
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
            {selectedHighlight ? 'ノートを編集' : 'ノートを追加'}
          </h3>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="ノートを入力..."
            style={{
              width: '100%',
              height: '80px',
              padding: '8px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: '14px'
            }}
            autoFocus
          />
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setShowNoteDialog(false);
                setNoteText('');
              }}
              style={{
                padding: '6px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
            <button
              onClick={() => {
                if (selectedHighlight) {
                  handleUpdateNote();
                } else {
                  createHighlight(HighlightType.CUSTOM);
                }
                setShowNoteDialog(false);
              }}
              style={{
                padding: '6px 16px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              保存
            </button>
          </div>
        </div>
      )}

      <style>{`
        .highlight-span:hover {
          filter: brightness(0.9);
          outline: 2px solid rgba(0,0,0,0.2);
        }
        
        .highlight-note-indicator {
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 12px;
          background: white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .highlight-type-button:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .highlight-action-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

// ハイライト統計コンポーネント
export const HighlightStats: React.FC<{ highlights: HighlightInfo[] }> = ({ highlights }) => {
  const stats = highlights.reduce((acc, highlight) => {
    acc[highlight.type] = (acc[highlight.type] || 0) + 1;
    return acc;
  }, {} as Record<HighlightType, number>);

  return (
    <div className="highlight-stats" style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>
        ハイライト統計
      </h4>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {Object.entries(stats).map(([type, count]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: HIGHLIGHT_COLORS[type as HighlightType],
                borderRadius: '4px',
                textAlign: 'center',
                lineHeight: '20px',
                fontSize: '12px'
              }}
            >
              {HIGHLIGHT_ICONS[type as HighlightType]}
            </span>
            <span style={{ fontSize: '14px' }}>
              {count}
            </span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#666' }}>
          合計: {highlights.length}
        </div>
      </div>
    </div>
  );
};