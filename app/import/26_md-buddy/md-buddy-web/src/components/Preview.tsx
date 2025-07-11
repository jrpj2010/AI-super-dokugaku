import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { parseMarkdown } from '../utils/markdown';
import { MarkdownToolbar } from './MarkdownToolbar';
import { Editor as SimpleEditor } from './Editor';
import { handlePasteEvent } from '../utils/clipboard';

interface PreviewProps {
  content: string;
  fileName?: string;
  isEditMode?: boolean;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  onSelectionChange?: (text: string) => void;
  onVoiceInput?: () => void;
  isRecording?: boolean;
  onToggleEditMode?: (editMode: boolean) => void;
  onSave?: () => void;
  isSaving?: boolean;
  onAIGenerate?: () => void;
  hasSelectedText?: boolean;
  isAnalyzing?: boolean;
  onInsertAtCursor?: (text: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ 
  content, 
  fileName, 
  isEditMode = false,
  editContent = '',
  onEditContentChange,
  onSelectionChange,
  onVoiceInput,
  isRecording = false,
  onToggleEditMode,
  onSave,
  isSaving = false,
  onAIGenerate,
  hasSelectedText = false,
  isAnalyzing = false,
  onInsertAtCursor
}) => {
  const displayContent = isEditMode ? editContent : content;
  const html = useMemo(() => parseMarkdown(displayContent), [displayContent]);
  const editorRef = useRef<any>(null);
  const insertMarkdownRef = useRef<(before: string, after?: string, placeholder?: string) => void>();

  // カーソル位置にテキストを挿入する関数
  const insertTextAtCursor = useCallback((text: string) => {
    const editor = editorRef.current;
    if (editor && isEditMode) {
      const selection = editor.getSelection();
      if (selection) {
        const operation = {
          range: selection,
          text: text,
          forceMoveMarkers: true
        };
        editor.executeEdits('voice-insert', [operation]);
        
        // カーソル位置を挿入したテキストの末尾に移動
        const model = editor.getModel();
        if (model) {
          const newContent = model.getValue();
          if (onEditContentChange) {
            onEditContentChange(newContent);
          }
        }
      }
    }
  }, [isEditMode, onEditContentChange]);

  // onInsertAtCursorコールバックをeditorのAPIに接続
  useEffect(() => {
    if (onInsertAtCursor) {
      // 外部から呼び出し可能な関数として設定
      (window as any)._insertAtCursor = insertTextAtCursor;
    }
  }, [onInsertAtCursor, insertTextAtCursor]);

  // クリップボード画像ペースト処理
  const handleEditorPaste = useCallback(async (event: ClipboardEvent) => {
    const result = await handlePasteEvent(event);
    
    if (result.success && result.markdown && onEditContentChange) {
      // 現在のカーソル位置に画像マークダウンを挿入
      const editor = editorRef.current;
      if (editor) {
        const position = editor.getPosition();
        const model = editor.getModel();
        
        if (model && position) {
          const range = {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          };
          
          // 画像マークダウンを挿入
          const operation = {
            range,
            text: result.markdown,
            forceMoveMarkers: true
          };
          
          editor.executeEdits('clipboard-image-paste', [operation]);
          
          // 通知表示
          console.log('画像がペーストされました:', result.fileName);
          (window as any).debugLog?.(`画像がペーストされました: ${result.fileName}`, 'success');
        }
      }
    } else if (!result.success) {
      console.warn('画像ペーストエラー:', result.error);
      (window as any).debugLog?.(`画像ペーストエラー: ${result.error}`, 'warn');
    }
  }, [onEditContentChange]);

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      const editor = editorRef.current;
      if (editor && (editor as any).cleanupPasteListener) {
        (editor as any).cleanupPasteListener();
      }
    };
  }, []);

  if (!content && !isEditMode) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-8">
          <div className="bg-gray-100 rounded-full p-8 inline-block mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">プレビューエリア</h3>
          <p className="text-gray-500">マークダウンファイルを選択すると、ここにプレビューが表示されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {fileName && (
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">{fileName}</h2>
        </div>
      )}
      
      {/* MarkdownToolbarを常に表示 */}
      <MarkdownToolbar
        onInsertMarkdown={(before, after, placeholder) => {
          if (insertMarkdownRef.current) {
            insertMarkdownRef.current(before, after, placeholder);
          } else if (editorRef.current && isEditMode) {
            // Monaco Editor用のフォールバック
            const position = editorRef.current.getPosition();
            const selection = editorRef.current.getSelection();
            const selectedText = editorRef.current.getModel().getValueInRange(selection);
            const textToInsert = selectedText || placeholder || '';
            
            editorRef.current.executeEdits('', [{
              range: selection,
              text: before + textToInsert + (after || ''),
              forceMoveMarkers: true
            }]);
            
            // カーソル位置を調整
            if (!selectedText && placeholder) {
              const newPosition = {
                lineNumber: position.lineNumber,
                column: position.column + before.length
              };
              editorRef.current.setPosition(newPosition);
              editorRef.current.setSelection({
                startLineNumber: newPosition.lineNumber,
                startColumn: newPosition.column,
                endLineNumber: newPosition.lineNumber,
                endColumn: newPosition.column + placeholder.length
              });
            }
          }
        }}
        isEditMode={isEditMode}
        onVoiceInput={onVoiceInput}
        isRecording={isRecording}
        onToggleEditMode={onToggleEditMode}
        onSave={onSave}
        onAIGenerate={onAIGenerate}
        hasSelectedText={hasSelectedText}
        isAnalyzing={isAnalyzing}
      />
      
      {isEditMode ? (
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 text-sm text-gray-600 flex items-center justify-between">
            <span>コードエディター</span>
            <span className="text-xs text-gray-500">Ctrl+S で保存</span>
          </div>
          <div className="flex-1">
            <Editor
              defaultLanguage="markdown"
              value={editContent}
              onChange={(value) => {
                if (onEditContentChange && value !== undefined) {
                  onEditContentChange(value);
                }
              }}
              onMount={(editor) => {
                editorRef.current = editor;
                
                // テキスト選択変更イベントリスナーを追加
                const selectionDisposable = editor.onDidChangeCursorSelection((event) => {
                  const selection = editor.getSelection();
                  if (selection && !selection.isEmpty() && onSelectionChange) {
                    const selectedText = editor.getModel()?.getValueInRange(selection) || '';
                    onSelectionChange(selectedText);
                  } else if (onSelectionChange) {
                    onSelectionChange('');
                  }
                });
                
                // クリップボード画像ペーストイベントリスナーを追加
                const disposable = editor.onDidPaste((event: any) => {
                  // イベントから実際のClipboardEventを取得する必要がある
                  // Monaco Editorのペーストイベントは制限があるため、
                  // DOM要素に直接イベントリスナーを追加
                  const domElement = editor.getDomNode();
                  if (domElement) {
                    domElement.addEventListener('paste', handleEditorPaste);
                  }
                });
                
                // DOM要素に直接ペーストイベントリスナーを追加
                const domElement = editor.getDomNode();
                if (domElement) {
                  domElement.addEventListener('paste', handleEditorPaste);
                }
                
                // クリーンアップ関数をeditorに保存
                (editor as any).cleanupPasteListener = () => {
                  if (domElement) {
                    domElement.removeEventListener('paste', handleEditorPaste);
                  }
                  if (disposable) {
                    disposable.dispose();
                  }
                  if (selectionDisposable) {
                    selectionDisposable.dispose();
                  }
                };
              }}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                bracketPairColorization: {
                  enabled: true
                }
              }}
            />
          </div>
          {/* ステータスバー */}
          <div className="bg-gray-900 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Markdown</span>
              <span className="text-gray-400">UTF-8</span>
            </div>
            <div className="flex items-center gap-2">
              {isSaving ? (
                <span className="text-yellow-400 flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-400"></div>
                  保存中...
                </span>
              ) : (
                <span className="text-green-400">すべての変更を保存しました</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div 
            className="prose prose-lg max-w-4xl mx-auto p-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </div>
  );
};