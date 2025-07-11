export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  lastModified: Date;
  path?: string; // フォルダパス情報
  updatedAt?: Date;
  createdAt?: Date;
}

// 音声ファイルやSRTファイルも扱えるように拡張
export interface FileItem extends Omit<MarkdownFile, 'content'> {
  content: string | Blob;
  type: 'markdown' | 'audio' | 'text';
}