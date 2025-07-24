
export interface SlideContent {
  slideNumber: number;
  title: string;
  contentHtml: string; // HTML content for the slide body
  highlightedKeywords?: string[];
  visualElementSuggestion?: string; // e.g., "Bar chart showing X vs Y"
  layoutType?: string; // e.g., "title_and_content", "image_with_caption"
  notes?: string;
}

export interface PresentationData {
  presentationTitle: string;
  analysisAndDesignDocument: string; // Markdown content
  slides: SlideContent[];
}

export interface GeneratedFile {
  name: string;
  content: string;
}

export interface GeneratedFiles {
  analysisAndDesign: GeneratedFile;
  individualSlides: GeneratedFile[];
  interactivePresentation: GeneratedFile;
  // unifiedPresentation: GeneratedFile; // Removed as requested
  dashboardIndex: GeneratedFile;
}

// Used to structure Gemini's response
export interface GeminiResponseFormat {
  presentationTitle: string;
  analysisAndDesignDocument: string;
  slides: SlideContent[];
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  systemPromptPath?: string; // Path to the Markdown file containing the system prompt (for default templates)
  content?: string;          // Direct content (for custom templates)
  isEditable?: boolean;      // Whether the template can be edited
  isCustom?: boolean;        // Whether this is a custom template
  templateType?: 'gen-spa' | 'marp' | 'generic'; // Template format type
}

// バリデーション結果の型定義
export interface ValidationResult {
  level: 'error' | 'warning' | 'info';
  errors: string[];
  warnings: string[];
  isValid: boolean; // エラーがない場合true
  canProceed: boolean; // 警告があっても続行可能な場合true
}

// デバッグログの型定義
export interface DebugLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: any;
}

// アプリ設定の型定義
export interface AppSettings {
  apiKey?: string;
  debugMode: boolean;
  selectedModel: string;
  customPromptTemplates?: PromptTemplate[]; // カスタムプロンプトテンプレートの配列
}