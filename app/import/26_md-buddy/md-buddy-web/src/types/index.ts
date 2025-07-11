export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  lastModified: Date;
  path?: string; // フォルダパス情報
}