import React, { useMemo, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { parseMarkdown } from '../utils/markdown';
import { MarkdownToolbar } from './MarkdownToolbar';
import { Editor as SimpleEditor } from './Editor';

interface PreviewProps {
  content: string;
  fileName?: string;
  isEditMode?: boolean;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  onVoiceInput?: () => void;
  isRecording?: boolean;
  onToggleEditMode?: (editMode: boolean) => void;
}

export const Preview: React.FC<PreviewProps> = ({ 
  content, 
  fileName, 
  isEditMode = false,
  editContent = '',
  onEditContentChange,
  onVoiceInput,
  isRecording = false,
  onToggleEditMode
}) => {
  const displayContent = isEditMode ? editContent : content;
  const html = useMemo(() => parseMarkdown(displayContent), [displayContent]);
  const editorRef = useRef<any>(null);
  const insertMarkdownRef = useRef<(before: string, after?: string, placeholder?: string) => void>();

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
      
      {isEditMode ? (
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 text-sm text-gray-600 flex items-center justify-between">
            <span>コードエディター</span>
            <span className="text-xs text-gray-500">Ctrl+S で保存</span>
          </div>
          <MarkdownToolbar
            onInsertMarkdown={(before, after, placeholder) => {
              if (insertMarkdownRef.current) {
                insertMarkdownRef.current(before, after, placeholder);
              } else if (editorRef.current) {
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
          />
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