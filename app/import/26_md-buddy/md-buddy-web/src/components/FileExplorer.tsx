import React, { useState } from 'react';
import type { MarkdownFile } from '../types';

interface FileExplorerProps {
  files: MarkdownFile[];
  selectedFileId: string | null;
  onSelectFile: (id: string) => void;
  onRemoveFile: (id: string) => void;
  onCreateFile: (folderPath: string) => Promise<void>;
  onRenameFile: (id: string, newName: string) => Promise<void>;
  setFiles: (files: MarkdownFile[]) => void;
  setDirectoryHandle: (handle: any) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  selectedFileId,
  onSelectFile,
  onRemoveFile,
  onCreateFile,
  onRenameFile,
  setFiles,
  setDirectoryHandle,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleFolderSelect = async () => {
    try {
      // @ts-ignore - File System Access APIはまだ型定義が不完全
      const dirHandle = await window.showDirectoryPicker();
      const filesArray: File[] = [];
      
      async function readDirectory(dirHandle: any, path = '') {
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file') {
            // Markdown、音声、SRTファイルを読み込む
            const supportedExtensions = ['.md', '.webm', '.mp3', '.wav', '.srt'];
            if (supportedExtensions.some(ext => entry.name.endsWith(ext))) {
              const file = await entry.getFile();
              // ファイルにパス情報を追加
              Object.defineProperty(file, 'webkitRelativePath', {
                value: path + entry.name,
                writable: false
              });
              filesArray.push(file);
            }
          } else if (entry.kind === 'directory') {
            await readDirectory(entry, path + entry.name + '/');
          }
        }
      }

      await readDirectory(dirHandle);
      
      // MarkdownFileオブジェクトに変換
      const newFiles: MarkdownFile[] = [];
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const path = (file as any).webkitRelativePath || '';
        
        // テキストファイル（MD, SRT）は読み込む
        if (file.name.endsWith('.md') || file.name.endsWith('.srt')) {
          const content = await file.text();
          newFiles.push({
            id: `${Date.now()}-${i}`,
            name: path || file.name,
            content,
            lastModified: new Date(file.lastModified),
            path: path
          });
        }
        // 音声ファイルは現在の型では扱えないため、表示のみ
        // 将来的にFileItem型を使用するように修正が必要
      }
      
      setFiles(newFiles);
      setDirectoryHandle(dirHandle);
      
      // 最初のファイルを自動選択
      if (newFiles.length > 0) {
        onSelectFile(newFiles[0].id);
      }
    } catch (err) {
      // ユーザーがキャンセルした場合は何もしない
      console.log('Folder selection cancelled');
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: MarkdownFile[] = [];
      
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (file.name.endsWith('.md')) {
          const content = await file.text();
          newFiles.push({
            id: `${Date.now()}-${i}`,
            name: file.name,
            content,
            lastModified: new Date(file.lastModified),
            path: ''
          });
        }
      }
      
      setFiles([...files, ...newFiles]);
      
      if (newFiles.length > 0) {
        onSelectFile(newFiles[0].id);
      }
    }
  };
  
  const handleRename = async (fileId: string) => {
    if (renameValue.trim() && renameValue.endsWith('.md')) {
      await onRenameFile(fileId, renameValue);
      setRenamingFileId(null);
      setRenameValue('');
    }
  };

  // ファイルをフォルダ構造に整理
  const organizeFilesByFolder = () => {
    const folderStructure: { [key: string]: MarkdownFile[] } = {
      '/': []
    };

    files.forEach(file => {
      const path = (file as any).path || '';
      if (path) {
        const folders = path.split('/').slice(0, -1);
        const folderPath = folders.length > 0 ? '/' + folders.join('/') : '/';
        if (!folderStructure[folderPath]) {
          folderStructure[folderPath] = [];
        }
        folderStructure[folderPath].push(file);
      } else {
        folderStructure['/'].push(file);
      }
    });

    return folderStructure;
  };

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  const folderStructure = organizeFilesByFolder();
  const folders = Object.keys(folderStructure).sort();

  return (
    <div className="flex flex-col h-full">
      {/* ツールバー */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            エクスプローラー
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onCreateFile('/')}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="新規ファイル作成"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button
              onClick={handleFolderSelect}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="フォルダを開く"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* ファイル選択ボタン */}
        <label className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer transition-colors text-sm" title="Markdownファイルを追加">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          ファイルを追加
          <input
            type="file"
            multiple
            accept=".md"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      {/* ファイルツリー */}
      <div className="flex-1 overflow-y-auto">
        {files.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p className="text-sm mb-2">フォルダが空です</p>
            <p className="text-xs">フォルダを選択するか、ファイルを追加してください</p>
          </div>
        ) : (
          <div className="py-2">
            {folders.map(folder => (
              <div key={folder}>
                {folder !== '/' && (
                  <button
                    onClick={() => toggleFolder(folder)}
                    className="w-full flex items-center gap-1 px-3 py-1 hover:bg-gray-800 text-sm"
                  >
                    <svg
                      className={`w-3 h-3 transition-transform ${
                        expandedFolders.has(folder) ? 'rotate-90' : ''
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    <span className="text-gray-300">{folder.split('/').pop()}</span>
                  </button>
                )}
                
                {(folder === '/' || expandedFolders.has(folder)) && 
                  folderStructure[folder].map(file => (
                    <div
                      key={file.id}
                      className={`group flex items-center px-6 py-1.5 hover:bg-gray-800 cursor-pointer ${
                        selectedFileId === file.id ? 'bg-gray-700 border-l-2 border-blue-500' : ''
                      }`}
                      onClick={() => onSelectFile(file.id)}
                      onDoubleClick={() => {
                        setRenamingFileId(file.id);
                        setRenameValue(file.name);
                      }}
                    >
                      {file.name.endsWith('.webm') || file.name.endsWith('.mp3') || file.name.endsWith('.wav') ? (
                        <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      ) : file.name.endsWith('.srt') ? (
                        <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {renamingFileId === file.id ? (
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onBlur={() => handleRename(file.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleRename(file.id);
                            } else if (e.key === 'Escape') {
                              setRenamingFileId(null);
                              setRenameValue('');
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-gray-800 text-white text-sm px-1 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <span className={`flex-1 text-sm truncate ${
                          selectedFileId === file.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {file.name}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFile(file.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                      >
                        <svg className="w-3 h-3 text-gray-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};