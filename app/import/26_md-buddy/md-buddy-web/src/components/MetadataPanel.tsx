// メタデータパネルコンポーネント
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Tag, Hash, FileText, Brain, Clock, ChevronDown, ChevronRight,
  User, Folder, Globe, Lock, Version, BookOpen, Link, Image, Code,
  CheckSquare, Star, Edit3, Save, X, Plus, AlertCircle, BarChart2
} from 'lucide-react';

interface MetadataPanelProps {
  content?: string;
  fileName?: string;
  lastModified?: Date;
  className?: string;
  isFileSelected?: boolean;
}

// 包括的なメタデータ構造
interface ComprehensiveMetadata {
  // 基本情報
  title: string;
  author: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  version: string;
  
  // 分類情報
  category: string;
  tags: string[];
  keywords: string[];
  
  // 内容情報
  description: string;
  summary: string;
  language: string;
  
  // 統計情報
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  readingTime: number; // 分
  paragraphCount: number;
  sentenceCount: number;
  headingCount: number;
  linkCount: number;
  codeBlockCount: number;
  imageCount: number;
  tableCount: number;
  listCount: number;
  todoCount: number;
  todoCompletedCount: number;
  
  // 公開情報
  status: 'draft' | 'review' | 'published' | 'archived';
  visibility: 'private' | 'public' | 'restricted';
  publishedAt: Date | null;
  
  // 関連情報
  relatedFiles: string[];
  references: string[];
  
  // SEO情報
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  
  // カスタムフィールド
  customFields: Record<string, string>;
  
  // 抽出エンティティ
  entities: {
    people: string[];
    organizations: string[];
    locations: string[];
    dates: string[];
    urls: string[];
    emails: string[];
  };
}

const defaultMetadata: ComprehensiveMetadata = {
  title: '',
  author: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  version: '1.0.0',
  category: '',
  tags: [],
  keywords: [],
  description: '',
  summary: '',
  language: 'ja',
  wordCount: 0,
  charCount: 0,
  charCountNoSpaces: 0,
  readingTime: 0,
  paragraphCount: 0,
  sentenceCount: 0,
  headingCount: 0,
  linkCount: 0,
  codeBlockCount: 0,
  imageCount: 0,
  tableCount: 0,
  listCount: 0,
  todoCount: 0,
  todoCompletedCount: 0,
  status: 'draft',
  visibility: 'private',
  publishedAt: null,
  relatedFiles: [],
  references: [],
  seoTitle: '',
  seoDescription: '',
  seoKeywords: [],
  customFields: {},
  entities: {
    people: [],
    organizations: [],
    locations: [],
    dates: [],
    urls: [],
    emails: []
  }
};

export const MetadataPanel: React.FC<MetadataPanelProps> = ({
  content = '',
  fileName,
  lastModified,
  className = '',
  isFileSelected = false
}) => {
  const [metadata, setMetadata] = useState<ComprehensiveMetadata>(defaultMetadata);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    classification: true,
    content: true,
    stats: true,
    publication: false,
    related: false,
    seo: false,
    custom: false,
    entities: false
  });

  // コンテンツからメタデータを自動抽出
  useEffect(() => {
    if (!content || !isFileSelected) return;

    const newMetadata = { ...metadata };

    // タイトル抽出（最初の見出しまたはファイル名）
    const titleMatch = content.match(/^#\s+(.+)$/m);
    newMetadata.title = titleMatch ? titleMatch[1] : (fileName || '無題');

    // 文書統計
    newMetadata.charCount = content.length;
    newMetadata.charCountNoSpaces = content.replace(/\s/g, '').length;
    newMetadata.wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    newMetadata.readingTime = Math.ceil(newMetadata.wordCount / 400); // 日本語は400文字/分
    
    // 段落数
    newMetadata.paragraphCount = content.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    
    // 文数（。！？で区切る）
    const sentenceMatches = content.match(/[^。！？]+[。！？]/g);
    newMetadata.sentenceCount = sentenceMatches ? sentenceMatches.length : 0;
    
    // 見出し数
    const headingMatches = content.match(/^#{1,6}\s+.+$/gm);
    newMetadata.headingCount = headingMatches ? headingMatches.length : 0;
    
    // リンク数
    const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);
    newMetadata.linkCount = linkMatches ? linkMatches.length : 0;
    
    // コードブロック数
    const codeBlockMatches = content.match(/```[\s\S]*?```/g);
    newMetadata.codeBlockCount = codeBlockMatches ? codeBlockMatches.length : 0;
    
    // 画像数
    const imageMatches = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
    newMetadata.imageCount = imageMatches ? imageMatches.length : 0;
    
    // テーブル数
    const tableMatches = content.match(/\|.+\|[\s\S]*?\|.+\|/g);
    newMetadata.tableCount = tableMatches ? tableMatches.length : 0;
    
    // リスト数
    const listMatches = content.match(/^[\s]*[-*+]\s+.+$/gm);
    const orderedListMatches = content.match(/^[\s]*\d+\.\s+.+$/gm);
    newMetadata.listCount = (listMatches ? listMatches.length : 0) + (orderedListMatches ? orderedListMatches.length : 0);
    
    // TODO項目数
    const todoMatches = content.match(/^[\s]*-\s*\[([ x])\]\s*.+$/gm);
    if (todoMatches) {
      newMetadata.todoCount = todoMatches.length;
      const completedMatches = todoMatches.filter(todo => todo.includes('[x]'));
      newMetadata.todoCompletedCount = completedMatches.length;
    }

    // タグ抽出（#で始まる単語）
    const tagMatches = content.match(/#[\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g);
    newMetadata.tags = tagMatches ? [...new Set(tagMatches)] : [];

    // キーワード抽出（頻出単語）
    const words = content
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    newMetadata.keywords = Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([word]) => word);

    // サマリー生成（最初の段落）
    const firstParagraph = content.split(/\n\n+/)[0];
    newMetadata.summary = firstParagraph.length > 200 
      ? firstParagraph.substring(0, 200) + '...'
      : firstParagraph;

    // エンティティ抽出
    // URL
    const urlMatches = content.match(/https?:\/\/[^\s]+/g);
    newMetadata.entities.urls = urlMatches ? [...new Set(urlMatches)] : [];
    
    // Email
    const emailMatches = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    newMetadata.entities.emails = emailMatches ? [...new Set(emailMatches)] : [];
    
    // 日付
    const dateMatches = content.match(/\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日|\d{4}\/\d{1,2}\/\d{1,2}|\d{4}-\d{1,2}-\d{1,2}/g);
    newMetadata.entities.dates = dateMatches ? [...new Set(dateMatches)] : [];

    // 更新日時
    newMetadata.updatedAt = lastModified || new Date();

    setMetadata(newMetadata);
  }, [content, fileName, lastModified, isFileSelected]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const startEditing = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    if (editingField) {
      setMetadata(prev => ({
        ...prev,
        [editingField]: tempValue
      }));
      setEditingField(null);
      setTempValue('');
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const addToArray = (field: string) => {
    const value = prompt(`新しい${field === 'tags' ? 'タグ' : field === 'keywords' ? 'キーワード' : '項目'}を入力:`);
    if (value) {
      setMetadata(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof ComprehensiveMetadata] as string[]), value]
      }));
    }
  };

  const removeFromArray = (field: string, index: number) => {
    setMetadata(prev => ({
      ...prev,
      [field]: (prev[field as keyof ComprehensiveMetadata] as string[]).filter((_, i) => i !== index)
    }));
  };

  if (!isFileSelected) {
    return (
      <div className={`bg-gray-50 h-full overflow-y-auto ${className}`}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart2 size={20} />
            メタ情報
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">ファイルが選択されていません</p>
            <p className="text-sm text-gray-500">
              ファイルを選択すると、ここにメタ情報が表示されます
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 h-full overflow-y-auto ${className}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart2 size={20} />
          メタ情報
        </h2>
        
        <div className="space-y-3">
          {/* 基本情報 */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection('basic')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <FileText size={18} />
                基本情報
              </span>
              {expandedSections.basic ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.basic && (
              <div className="px-4 pb-4 space-y-3">
                {/* タイトル */}
                <div>
                  <label className="text-xs text-gray-500">タイトル</label>
                  {editingField === 'title' ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border rounded"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Save size={16} />
                      </button>
                      <button onClick={cancelEdit} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <p className="text-sm text-gray-900">{metadata.title || '無題'}</p>
                      <button
                        onClick={() => startEditing('title', metadata.title)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* 作者 */}
                <div>
                  <label className="text-xs text-gray-500">作者</label>
                  {editingField === 'author' ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border rounded"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Save size={16} />
                      </button>
                      <button onClick={cancelEdit} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <p className="text-sm text-gray-900">{metadata.author || '未設定'}</p>
                      <button
                        onClick={() => startEditing('author', metadata.author)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* 日時情報 */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <label className="text-xs text-gray-500">作成日時</label>
                    <p className="text-gray-900">
                      {metadata.createdAt ? new Date(metadata.createdAt).toLocaleDateString('ja-JP') : '-'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">更新日時</label>
                    <p className="text-gray-900">
                      {metadata.updatedAt ? new Date(metadata.updatedAt).toLocaleDateString('ja-JP') : '-'}
                    </p>
                  </div>
                </div>

                {/* バージョン */}
                <div>
                  <label className="text-xs text-gray-500">バージョン</label>
                  {editingField === 'version' ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border rounded"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Save size={16} />
                      </button>
                      <button onClick={cancelEdit} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <p className="text-sm text-gray-900">{metadata.version}</p>
                      <button
                        onClick={() => startEditing('version', metadata.version)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 分類情報 */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection('classification')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <Folder size={18} />
                分類情報
              </span>
              {expandedSections.classification ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.classification && (
              <div className="px-4 pb-4 space-y-3">
                {/* カテゴリー */}
                <div>
                  <label className="text-xs text-gray-500">カテゴリー</label>
                  {editingField === 'category' ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border rounded"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Save size={16} />
                      </button>
                      <button onClick={cancelEdit} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <p className="text-sm text-gray-900">{metadata.category || '未分類'}</p>
                      <button
                        onClick={() => startEditing('category', metadata.category)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* タグ */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-gray-500">タグ</label>
                    <button
                      onClick={() => addToArray('tags')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {metadata.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full flex items-center gap-1 group"
                      >
                        {tag}
                        <button
                          onClick={() => removeFromArray('tags', idx)}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* キーワード */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-gray-500">キーワード</label>
                    <button
                      onClick={() => addToArray('keywords')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {metadata.keywords.slice(0, 10).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded flex items-center gap-1 group"
                      >
                        {keyword}
                        <button
                          onClick={() => removeFromArray('keywords', idx)}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 内容情報 */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection('content')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <BookOpen size={18} />
                内容情報
              </span>
              {expandedSections.content ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.content && (
              <div className="px-4 pb-4 space-y-3">
                {/* 説明 */}
                <div>
                  <label className="text-xs text-gray-500">説明</label>
                  {editingField === 'description' ? (
                    <div className="mt-1">
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Save size={16} />
                        </button>
                        <button onClick={cancelEdit} className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group">
                      <p className="text-sm text-gray-900">
                        {metadata.description || '説明を追加...'}
                      </p>
                      <button
                        onClick={() => startEditing('description', metadata.description)}
                        className="mt-1 text-xs text-blue-600 hover:text-blue-700"
                      >
                        編集
                      </button>
                    </div>
                  )}
                </div>

                {/* サマリー */}
                <div>
                  <label className="text-xs text-gray-500">サマリー（自動生成）</label>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {metadata.summary}
                  </p>
                </div>

                {/* 言語 */}
                <div>
                  <label className="text-xs text-gray-500">言語</label>
                  <p className="text-sm text-gray-900">{metadata.language === 'ja' ? '日本語' : metadata.language}</p>
                </div>
              </div>
            )}
          </div>

          {/* 統計情報 */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection('stats')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <Hash size={18} />
                統計情報
              </span>
              {expandedSections.stats ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.stats && (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">文字数:</span>
                    <span className="font-medium">{metadata.charCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">文字数(空白除く):</span>
                    <span className="font-medium">{metadata.charCountNoSpaces.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">単語数:</span>
                    <span className="font-medium">{metadata.wordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">読了時間:</span>
                    <span className="font-medium">{metadata.readingTime}分</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">段落数:</span>
                    <span className="font-medium">{metadata.paragraphCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">文数:</span>
                    <span className="font-medium">{metadata.sentenceCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">見出し:</span>
                    <span className="font-medium">{metadata.headingCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">リンク:</span>
                    <span className="font-medium">{metadata.linkCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">画像:</span>
                    <span className="font-medium">{metadata.imageCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">コード:</span>
                    <span className="font-medium">{metadata.codeBlockCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">テーブル:</span>
                    <span className="font-medium">{metadata.tableCount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">リスト:</span>
                    <span className="font-medium">{metadata.listCount}</span>
                  </div>
                  {metadata.todoCount > 0 && (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">TODO:</span>
                        <span className="font-medium">{metadata.todoCount}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">完了:</span>
                        <span className="font-medium">{metadata.todoCompletedCount}/{metadata.todoCount}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 公開情報 */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection('publication')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <Globe size={18} />
                公開情報
              </span>
              {expandedSections.publication ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.publication && (
              <div className="px-4 pb-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-500">ステータス</label>
                  <select
                    value={metadata.status}
                    onChange={(e) => setMetadata(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full mt-1 px-2 py-1 text-sm border rounded"
                  >
                    <option value="draft">下書き</option>
                    <option value="review">レビュー中</option>
                    <option value="published">公開済み</option>
                    <option value="archived">アーカイブ</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">公開範囲</label>
                  <select
                    value={metadata.visibility}
                    onChange={(e) => setMetadata(prev => ({ ...prev, visibility: e.target.value as any }))}
                    className="w-full mt-1 px-2 py-1 text-sm border rounded"
                  >
                    <option value="private">非公開</option>
                    <option value="public">公開</option>
                    <option value="restricted">限定公開</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">公開日時</label>
                  <p className="text-sm text-gray-900">
                    {metadata.publishedAt ? new Date(metadata.publishedAt).toLocaleDateString('ja-JP') : '未公開'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* エンティティ */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection('entities')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <Brain size={18} />
                抽出エンティティ
              </span>
              {expandedSections.entities ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedSections.entities && (
              <div className="px-4 pb-4 space-y-3 text-sm">
                {metadata.entities.dates.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">日付</p>
                    <div className="flex flex-wrap gap-1">
                      {metadata.entities.dates.map((date, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {metadata.entities.urls.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">URL</p>
                    <div className="space-y-1">
                      {metadata.entities.urls.map((url, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-600 hover:underline truncate"
                        >
                          {url}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {metadata.entities.emails.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">メールアドレス</p>
                    <div className="flex flex-wrap gap-1">
                      {metadata.entities.emails.map((email, idx) => (
                        <span key={idx} className="text-xs text-gray-700">
                          {email}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};