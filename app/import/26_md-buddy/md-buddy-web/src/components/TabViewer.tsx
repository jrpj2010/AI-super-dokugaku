import { useState, useEffect } from 'react';
import { FileItem } from '@/store/fileStore';
import { AudioPlayer } from './AudioPlayer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { FileText, Music, Subtitles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabViewerProps {
  currentFile: FileItem;
  files: FileItem[];
  isEditMode: boolean;
  editContent: string;
  onEditContentChange: (content: string) => void;
  onFileChange: (fileId: string) => void;
}

export function TabViewer({
  currentFile,
  files,
  isEditMode,
  editContent,
  onEditContentChange,
  onFileChange
}: TabViewerProps) {
  const [activeTab, setActiveTab] = useState(currentFile.id);
  const [relatedFiles, setRelatedFiles] = useState<FileItem[]>([]);

  // 現在のファイルと同じフォルダ内の関連ファイルを探す
  useEffect(() => {
    const folderPath = currentFile.name.substring(0, currentFile.name.lastIndexOf('/'));
    const related = files.filter(file => {
      if (file.id === currentFile.id) return true;
      
      const fileFolderPath = file.name.substring(0, file.name.lastIndexOf('/'));
      if (fileFolderPath !== folderPath) return false;
      
      // サポートするファイルタイプ
      const supportedExtensions = ['.md', '.webm', '.mp3', '.wav', '.srt'];
      return supportedExtensions.some(ext => file.name.endsWith(ext));
    });
    
    setRelatedFiles(related);
    setActiveTab(currentFile.id);
  }, [currentFile, files]);

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.md')) return <FileText className="w-4 h-4" />;
    if (fileName.endsWith('.webm') || fileName.endsWith('.mp3') || fileName.endsWith('.wav')) return <Music className="w-4 h-4" />;
    if (fileName.endsWith('.srt')) return <Subtitles className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getFileName = (fullPath: string) => {
    return fullPath.substring(fullPath.lastIndexOf('/') + 1);
  };

  const renderContent = () => {
    const activeFile = relatedFiles.find(f => f.id === activeTab) || currentFile;
    
    // 音声ファイルの場合
    if (activeFile.name.endsWith('.webm') || activeFile.name.endsWith('.mp3') || activeFile.name.endsWith('.wav')) {
      // 同じフォルダ内のSRTファイルを探す
      const srtFile = relatedFiles.find(f => f.name.endsWith('.srt'));
      return (
        <AudioPlayer 
          audioFile={activeFile} 
          subtitleFile={srtFile}
        />
      );
    }
    
    // SRTファイルの場合
    if (activeFile.name.endsWith('.srt')) {
      return (
        <div className="p-4 overflow-y-auto h-full">
          <pre className="text-sm font-mono whitespace-pre-wrap">{activeFile.content}</pre>
        </div>
      );
    }
    
    // Markdownファイルの場合
    if (isEditMode && activeFile.id === currentFile.id) {
      return (
        <textarea
          value={editContent}
          onChange={(e) => onEditContentChange(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
          placeholder="Markdownを入力..."
        />
      );
    }
    
    return (
      <div className="p-4 overflow-y-auto h-full">
        <MarkdownRenderer content={activeFile.content} />
      </div>
    );
  };

  // タブが1つしかない場合はタブバーを表示しない
  if (relatedFiles.length <= 1) {
    return <div className="h-full">{renderContent()}</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* タブバー */}
      <div className="flex border-b bg-gray-50 dark:bg-gray-800">
        {relatedFiles.map((file) => (
          <button
            key={file.id}
            onClick={() => {
              setActiveTab(file.id);
              if (file.id !== currentFile.id) {
                onFileChange(file.id);
              }
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              activeTab === file.id
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            {getFileIcon(file.name)}
            <span>{getFileName(file.name)}</span>
          </button>
        ))}
      </div>
      
      {/* コンテンツエリア */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}