
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
  systemPromptPath: string; // Path to the Markdown file containing the system prompt
  isEditable?: boolean; // For future template editing
  isCustom?: boolean;   // For future custom templates
}