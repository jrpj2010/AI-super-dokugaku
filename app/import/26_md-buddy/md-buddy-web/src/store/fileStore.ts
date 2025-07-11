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
    const { directoryHandle } = get();
    if (!directoryHandle) return;
    
    try {
      // 新しいファイル名を生成
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `新規ドキュメント_${timestamp}.md`;
      
      // フォルダパスをたどる
      const pathParts = folderPath.split('/').filter(Boolean);
      let currentHandle = directoryHandle;
      for (const part of pathParts) {
        currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
      }
      
      // ファイルを作成
      const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      const content = `# 新規ドキュメント\n\n作成日: ${new Date().toLocaleString('ja-JP')}\n\n`;
      await writable.write(content);
      await writable.close();
      
      // ストアに追加
      const newFile: MarkdownFile = {
        id: `${Date.now()}`,
        name: fileName,
        content,
        lastModified: new Date(),
        path: folderPath ? `${folderPath}/${fileName}` : fileName
      };
      
      set((state) => ({
        files: [...state.files, newFile],
        selectedFileId: newFile.id,
        editContent: content
      }));
    } catch (error) {
      console.error('Failed to create file:', error);
      throw error;
    }
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
  
  createFileFromVoice: async (markdown, fileName) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    const defaultFileName = `音声メモ_${timestamp}.md`;
    const finalFileName = fileName || defaultFileName;
    
    const newFile: MarkdownFile = {
      id: `voice-${Date.now()}`,
      name: finalFileName,
      content: markdown,
      lastModified: new Date(),
      path: finalFileName
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
        const fileHandle = await directoryHandle.getFileHandle(finalFileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(markdown);
        await writable.close();
      } catch (error) {
        console.error('Failed to save voice file:', error);
      }
    }
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