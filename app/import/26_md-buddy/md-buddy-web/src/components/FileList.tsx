import React from 'react';
import type { MarkdownFile } from '../types';

interface FileListProps {
  files: MarkdownFile[];
  selectedFileId: string | null;
  onSelectFile: (id: string) => void;
  onRemoveFile: (id: string) => void;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  selectedFileId,
  onSelectFile,
  onRemoveFile
}) => {

  return (
    <div className="divide-y divide-gray-200">
      {files.map((file) => (
        <div
          key={file.id}
          className={`group flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-150 ${
            selectedFileId === file.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'
          }`}
          onClick={() => onSelectFile(file.id)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <svg className={`w-4 h-4 flex-shrink-0 ${
                selectedFileId === file.id ? 'text-blue-600' : 'text-gray-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${
                  selectedFileId === file.id ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(file.lastModified).toLocaleString('ja-JP', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile(file.id);
            }}
            className="ml-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};