import React, { useRef, useCallback } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export const Editor: React.FC<EditorProps> = ({ content, onChange, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Markdownを挿入する関数
  const insertMarkdown = useCallback((before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      content.substring(0, start) + 
      before + 
      textToInsert + 
      after + 
      content.substring(end);
    
    onChange(newContent);
    
    // カーソル位置を調整
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        // テキストが選択されていた場合は、装飾後のテキストを選択
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + textToInsert.length
        );
      } else {
        // プレースホルダーの場合は、プレースホルダーを選択
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + placeholder.length
        );
      }
    }, 0);
  }, [content, onChange]);

  // エディターの参照を親コンポーネントに公開
  React.useImperativeHandle(
    // @ts-ignore
    Editor.insertMarkdown,
    () => insertMarkdown,
    [insertMarkdown]
  );

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      spellCheck={false}
    />
  );
};

// 静的プロパティとして公開
Editor.insertMarkdown = React.createRef<(before: string, after?: string, placeholder?: string) => void>();