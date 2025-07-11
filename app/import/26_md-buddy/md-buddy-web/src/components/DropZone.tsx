import React, { useCallback, useState } from 'react';

interface DropZoneProps {
  onFilesDropped: (files: FileList) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesDropped }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesDropped(e.dataTransfer.files);
    }
  }, [onFilesDropped]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesDropped(e.target.files);
    }
  }, [onFilesDropped]);

  return (
    <div
      className={`relative w-full border-2 border-dashed rounded-lg transition-all duration-200 ${
        isDragging 
          ? 'border-blue-500 bg-blue-50 scale-105' 
          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
      }`}
      onDrag={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept=".md"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center py-8 pointer-events-none">
        <div className={`p-4 rounded-full transition-all duration-200 ${
          isDragging ? 'bg-blue-100 scale-110' : 'bg-gray-100'
        }`}>
          <svg
            className={`w-10 h-10 transition-colors ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className={`text-sm font-medium mt-3 ${isDragging ? 'text-blue-600' : 'text-gray-700'}`}>
          {isDragging ? 'ドロップしてください' : 'マークダウンファイルをドラッグ&ドロップ'}
        </p>
        <p className="text-xs text-gray-500 mt-1">または クリックして選択</p>
      </div>
    </div>
  );
};