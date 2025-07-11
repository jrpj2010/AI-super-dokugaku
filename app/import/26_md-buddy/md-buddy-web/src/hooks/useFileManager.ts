import { useState, useCallback } from 'react';
import type { MarkdownFile } from '../types';

export function useFileManager() {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const addFiles = useCallback(async (fileList: FileList) => {
    const newFiles: MarkdownFile[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.name.endsWith('.md')) {
        const content = await file.text();
        const path = (file as any).webkitRelativePath || '';
        newFiles.push({
          id: `${Date.now()}-${i}`,
          name: file.name,
          content,
          lastModified: new Date(file.lastModified),
          path: path
        });
      }
    }
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // 最初のファイルを自動選択
    if (newFiles.length > 0 && !selectedFileId) {
      setSelectedFileId(newFiles[0].id);
    }
  }, [selectedFileId]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (selectedFileId === id) {
      setSelectedFileId(null);
    }
  }, [selectedFileId]);

  const selectFile = useCallback((id: string) => {
    setSelectedFileId(id);
  }, []);

  const selectedFile = files.find(f => f.id === selectedFileId);

  return {
    files,
    selectedFile,
    selectedFileId,
    addFiles,
    removeFile,
    selectFile
  };
}