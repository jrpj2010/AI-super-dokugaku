import { create } from 'zustand';
import type { MarkdownFile } from '../types';

interface VoiceSessionState {
  isRecording: boolean;
  transcript: string;
  generatedMarkdown: string;
  audioLevel: number;
  sessionId: string | null;
}

interface FileStore {
  files: MarkdownFile[];
  selectedFileId: string | null;
  directoryHandle: any | null;
  isEditMode: boolean;
  editContent: string;
  
  // Voice State
  voiceSession: VoiceSessionState;
  
  // Actions
  setFiles: (files: MarkdownFile[]) => void;
  addFile: (file: MarkdownFile) => void;
  updateFile: (id: string, updates: Partial<MarkdownFile>) => void;
  removeFile: (id: string) => void;
  selectFile: (id: string | null) => void;
  setDirectoryHandle: (handle: any) => void;
  setEditMode: (isEdit: boolean) => void;
  setEditContent: (content: string) => void;
  saveCurrentFile: () => Promise<void>;
  createNewFile: (folderPath: string) => Promise<void>;
  renameFile: (id: string, newName: string) => Promise<void>;
  
  // Voice Actions
  startVoiceRecording: () => void;
  stopVoiceRecording: () => void;
  updateTranscript: (transcript: string) => void;
  updateGeneratedMarkdown: (markdown: string) => void;
  updateAudioLevel: (level: number) => void;
  createFileFromVoice: (markdown: string, fileName?: string) => Promise<void>;
  appendToCurrentFile: (markdown: string) => Promise<void>;
  resetVoiceSession: () => void;
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  selectedFileId: null,
  directoryHandle: null,
  isEditMode: false,
  editContent: '',
  
  // Voice State
  voiceSession: {
    isRecording: false,
    transcript: '',
    generatedMarkdown: '',
    audioLevel: 0,
    sessionId: null
  },
  
  setFiles: (files) => set({ files }),
  
  addFile: (file) => set((state) => ({ 
    files: [...state.files, file] 
  })),
  
  updateFile: (id, updates) => set((state) => ({
    files: state.files.map(f => f.id === id ? { ...f, ...updates } : f)
  })),
  
  removeFile: (id) => set((state) => ({
    files: state.files.filter(f => f.id !== id),
    selectedFileId: state.selectedFileId === id ? null : state.selectedFileId
  })),
  
  selectFile: (id) => {
    const file = get().files.find(f => f.id === id);
    set({ 
      selectedFileId: id,
      editContent: file?.content || ''
    });
  },
  
  setDirectoryHandle: (handle) => set({ directoryHandle: handle }),
  
  setEditMode: (isEdit) => set({ isEditMode: isEdit }),
  
  setEditContent: (content) => set({ editContent: content }),
  
  saveCurrentFile: async () => {
    const { selectedFileId, editContent, files, directoryHandle } = get();
    if (!selectedFileId || !directoryHandle) return;
    
    const file = files.find(f => f.id === selectedFileId);
    if (!file) return;
    
    try {
      // ファイルパスを分解してディレクトリとファイル名を取得
      const pathParts = file.path?.split('/').filter(Boolean) || [];
      const fileName = pathParts.pop() || file.name;
      
      // ディレクトリハンドルをたどる
      let currentHandle = directoryHandle;
      for (const part of pathParts) {
        currentHandle = await currentHandle.getDirectoryHandle(part);
      }
      
      // ファイルハンドルを取得して書き込み
      const fileHandle = await currentHandle.getFileHandle(fileName);
      const writable = await fileHandle.createWritable();
      await writable.write(editContent);
      await writable.close();
      
      // ストアを更新
      set((state) => ({
        files: state.files.map(f => 
          f.id === selectedFileId 
            ? { ...f, content: editContent, lastModified: new Date() }
            : f
        )
      }));
    } catch (error) {
      console.error('Failed to save file:', error);
      throw error;
    }
  },
  
  createNewFile: async (folderPath: string) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    const fileName = `新規ドキュメント_${timestamp}.md`;
    const content = `# 新規ドキュメント\n\n作成日: ${now.toLocaleString('ja-JP')}\n\n`;
    
    const newFile: MarkdownFile = {
      id: `${Date.now()}`,
      name: fileName,
      content,
      lastModified: now,
      updatedAt: now,
      createdAt: now,
      path: folderPath ? `${folderPath}/${fileName}` : fileName
    };
    
    set((state) => ({
      files: [...state.files, newFile],
      selectedFileId: newFile.id,
      editContent: content,
      isEditMode: true
    }));
    
    // directoryHandleがある場合のみファイルシステムに保存
    const { directoryHandle } = get();
    if (directoryHandle) {
      try {
        const pathParts = folderPath.split('/').filter(Boolean);
        let currentHandle = directoryHandle;
        for (const part of pathParts) {
          currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
        }
        
        const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
      } catch (error) {
        console.error('Failed to save file to filesystem:', error);
        // エラーがあってもメモリ上のファイルは作成されている
      }
    }
    
    return newFile.id;
  },
  
  renameFile: async (id: string, newName: string) => {
    const { files, directoryHandle } = get();
    const file = files.find(f => f.id === id);
    if (!file || !directoryHandle) return;
    
    try {
      // ファイルパスを分解
      const pathParts = file.path?.split('/').filter(Boolean) || [];
      const oldName = pathParts.pop() || file.name;
      
      // ディレクトリハンドルをたどる
      let currentHandle = directoryHandle;
      for (const part of pathParts) {
        currentHandle = await currentHandle.getDirectoryHandle(part);
      }
      
      // 古いファイルの内容を読み取り
      const oldFileHandle = await currentHandle.getFileHandle(oldName);
      const oldFile = await oldFileHandle.getFile();
      const content = await oldFile.text();
      
      // 新しいファイルを作成
      const newFileHandle = await currentHandle.getFileHandle(newName, { create: true });
      const writable = await newFileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      
      // 古いファイルを削除
      await currentHandle.removeEntry(oldName);
      
      // ストアを更新
      const newPath = pathParts.length > 0 ? `${pathParts.join('/')}/${newName}` : newName;
      set((state) => ({
        files: state.files.map(f => 
          f.id === id 
            ? { ...f, name: newName, path: newPath }
            : f
        )
      }));
    } catch (error) {
      console.error('Failed to rename file:', error);
      throw error;
    }
  },
  
  // Voice Actions
  startVoiceRecording: () => {
    set((state) => ({
      voiceSession: {
        ...state.voiceSession,
        isRecording: true,
        transcript: '',
        generatedMarkdown: '',
        sessionId: `voice-${Date.now()}`
      }
    }));
  },
  
  stopVoiceRecording: () => {
    set((state) => ({
      voiceSession: {
        ...state.voiceSession,
        isRecording: false,
        audioLevel: 0
      }
    }));
  },
  
  updateTranscript: (transcript) => {
    set((state) => ({
      voiceSession: {
        ...state.voiceSession,
        transcript
      }
    }));
  },
  
  updateGeneratedMarkdown: (markdown) => {
    set((state) => ({
      voiceSession: {
        ...state.voiceSession,
        generatedMarkdown: markdown
      }
    }));
  },
  
  updateAudioLevel: (level) => {
    set((state) => ({
      voiceSession: {
        ...state.voiceSession,
        audioLevel: level
      }
    }));
  },
  
  createFileFromVoice: async (markdown, folderName) => {
    const timestamp = new Date();
    const defaultFolderName = `音声メモ_${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')}_${String(timestamp.getHours()).padStart(2, '0')}-${String(timestamp.getMinutes()).padStart(2, '0')}-${String(timestamp.getSeconds()).padStart(2, '0')}`;
    const finalFolderName = folderName || defaultFolderName;
    const fileName = `${finalFolderName}/content.md`;
    
    const newFile: MarkdownFile = {
      id: `voice-${Date.now()}`,
      name: fileName,
      content: markdown,
      lastModified: timestamp,
      updatedAt: timestamp,
      createdAt: timestamp,
      path: fileName
    };
    
    set((state) => ({
      files: [...state.files, newFile],
      selectedFileId: newFile.id,
      editContent: markdown,
      isEditMode: false
    }));
    
    // ディレクトリハンドルがある場合は実際のファイルも作成
    const { directoryHandle } = get();
    if (directoryHandle) {
      try {
        // フォルダを作成
        const folderHandle = await directoryHandle.getDirectoryHandle(finalFolderName, { create: true });
        const fileHandle = await folderHandle.getFileHandle('content.md', { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(markdown);
        await writable.close();
      } catch (error) {
        console.error('Failed to save voice file:', error);
      }
    }
    
    return newFile.id;
  },
  
  appendToCurrentFile: async (markdown) => {
    const { selectedFileId, files, editContent, isEditMode } = get();
    if (!selectedFileId) return;
    
    const file = files.find(f => f.id === selectedFileId);
    if (!file) return;
    
    const currentContent = isEditMode ? editContent : file.content;
    const newContent = currentContent + '\n\n' + markdown;
    
    set((state) => ({
      editContent: newContent,
      files: state.files.map(f => 
        f.id === selectedFileId 
          ? { ...f, content: newContent, lastModified: new Date() }
          : f
      )
    }));
    
    // 編集モードでない場合は自動保存
    if (!isEditMode) {
      await get().saveCurrentFile();
    }
  },
  
  resetVoiceSession: () => {
    set((state) => ({
      voiceSession: {
        isRecording: false,
        transcript: '',
        generatedMarkdown: '',
        audioLevel: 0,
        sessionId: null
      }
    }));
  }
}));