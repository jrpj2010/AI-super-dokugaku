import React from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link2, 
  Code, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  Table,
  Image,
  Strikethrough,
  CheckSquare,
  Minus,
  FileCode,
  Mic,
  Eye,
  FileText,
  Save,
  Sparkles,
  Loader2
} from 'lucide-react';

interface MarkdownToolbarProps {
  onInsertMarkdown: (before: string, after?: string, placeholder?: string) => void;
  isEditMode: boolean;
  onVoiceInput?: () => void;
  isRecording?: boolean;
  onToggleEditMode?: (editMode: boolean) => void;
  onSave?: () => void;
  onAIGenerate?: () => void;
  hasSelectedText?: boolean;
  isAnalyzing?: boolean;
}

export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ 
  onInsertMarkdown, 
  isEditMode,
  onVoiceInput,
  isRecording = false,
  onToggleEditMode,
  onSave,
  onAIGenerate,
  hasSelectedText = false,
  isAnalyzing = false
}) => {
  // プレビューモードでも最低限のツールバーを表示

  const toolbarItems = [
    {
      icon: <Bold size={16} />,
      title: '太字 (Ctrl+B)',
      action: () => onInsertMarkdown('**', '**', '太字テキスト'),
      group: 'format'
    },
    {
      icon: <Italic size={16} />,
      title: '斜体 (Ctrl+I)',
      action: () => onInsertMarkdown('*', '*', '斜体テキスト'),
      group: 'format'
    },
    {
      icon: <Strikethrough size={16} />,
      title: '取り消し線',
      action: () => onInsertMarkdown('~~', '~~', '取り消し線テキスト'),
      group: 'format'
    },
    {
      icon: <Code size={16} />,
      title: 'インラインコード',
      action: () => onInsertMarkdown('`', '`', 'コード'),
      group: 'format'
    },
    {
      divider: true
    },
    {
      icon: <Heading1 size={16} />,
      title: '見出し1',
      action: () => onInsertMarkdown('# ', '', '見出し1'),
      group: 'heading'
    },
    {
      icon: <Heading2 size={16} />,
      title: '見出し2',
      action: () => onInsertMarkdown('## ', '', '見出し2'),
      group: 'heading'
    },
    {
      icon: <Heading3 size={16} />,
      title: '見出し3',
      action: () => onInsertMarkdown('### ', '', '見出し3'),
      group: 'heading'
    },
    {
      divider: true
    },
    {
      icon: <List size={16} />,
      title: '箇条書き',
      action: () => onInsertMarkdown('- ', '', 'リスト項目'),
      group: 'list'
    },
    {
      icon: <ListOrdered size={16} />,
      title: '番号付きリスト',
      action: () => onInsertMarkdown('1. ', '', 'リスト項目'),
      group: 'list'
    },
    {
      icon: <CheckSquare size={16} />,
      title: 'チェックリスト',
      action: () => onInsertMarkdown('- [ ] ', '', 'タスク'),
      group: 'list'
    },
    {
      divider: true
    },
    {
      icon: <Link2 size={16} />,
      title: 'リンク',
      action: () => onInsertMarkdown('[', '](URL)', 'リンクテキスト'),
      group: 'insert'
    },
    {
      icon: <Image size={16} />,
      title: '画像（クリップボードから画像をCtrl+Vでペースト可能）',
      action: () => onInsertMarkdown('![', '](URL)', '代替テキスト'),
      group: 'insert'
    },
    {
      icon: <Quote size={16} />,
      title: '引用',
      action: () => onInsertMarkdown('> ', '', '引用テキスト'),
      group: 'insert'
    },
    {
      icon: <FileCode size={16} />,
      title: 'コードブロック',
      action: () => onInsertMarkdown('```\n', '\n```', 'コード'),
      group: 'insert'
    },
    {
      icon: <Table size={16} />,
      title: 'テーブル',
      action: () => onInsertMarkdown(
        '| 列1 | 列2 | 列3 |\n|------|------|------|\n| ',
        ' |      |      |',
        'セル'
      ),
      group: 'insert'
    },
    {
      icon: <Minus size={16} />,
      title: '水平線',
      action: () => onInsertMarkdown('\n---\n', '', ''),
      group: 'insert'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex items-center gap-1 flex-wrap">
        {/* AI音声入力ボタン */}
        {onVoiceInput && (
          <>
            <button
              onClick={onVoiceInput}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-all ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title="AIパネル (Ctrl+R)"
            >
              <Mic size={16} />
              <span>{isRecording ? '録音停止' : 'AIパネル'}</span>
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
          </>
        )}
        
        {/* AI議事録生成ボタン */}
        {onAIGenerate && isEditMode && (
          <>
            <button
              onClick={onAIGenerate}
              disabled={!hasSelectedText || isAnalyzing}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-all ${
                hasSelectedText && !isAnalyzing
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title={isAnalyzing ? '議事録生成中...' : '選択範囲をAIで議事録化'}
            >
              {isAnalyzing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              <span>{isAnalyzing ? '生成中...' : 'AI議事録'}</span>
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
          </>
        )}
        
        {/* プレビュー/編集切り替えボタン */}
        {onToggleEditMode && (
          <>
            <button
              onClick={() => onToggleEditMode(!isEditMode)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-all"
              title={`${isEditMode ? 'プレビュー' : '編集'}モードに切り替え (Ctrl+E)`}
            >
              {isEditMode ? <Eye size={16} /> : <FileText size={16} />}
              <span>{isEditMode ? 'プレビュー' : '編集'}</span>
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
          </>
        )}
        {/* マークダウンツールバー（編集モードのみ） */}
        {isEditMode && toolbarItems.map((item, index) => {
          if (item.divider) {
            return (
              <div
                key={`divider-${index}`}
                className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"
              />
            );
          }

          const isFormatButton = item.group === 'format';
          const isDisabled = isFormatButton && !hasSelectedText;
          
          return (
            <button
              key={`${item.group}-${index}`}
              onClick={isDisabled ? undefined : item.action}
              disabled={isDisabled}
              title={isDisabled ? 'テキストを選択してください' : item.title}
              className={`p-2 rounded transition-colors group ${
                isDisabled 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className={`${
                isDisabled 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
              }`}>
                {item.icon}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};