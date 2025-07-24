
import { PromptTemplate } from './types'; // Corrected import for PromptTemplate
import { AVAILABLE_PROMPT_TEMPLATES as templates } from './promptTemplates'; // Import array directly

export const APP_TITLE = 'Gen-Spa 2.0';

// 利用可能なモデルの定義 (GA版 - 2025年1月24日現在最新)
export const GEMINI_FLASH_MODEL_ID = 'gemini-2.5-flash';
export const GEMINI_PRO_MODEL_ID = 'gemini-2.5-pro';

export const AVAILABLE_MODELS = [
  { id: GEMINI_FLASH_MODEL_ID, name: 'デフォルト (2.5 Flash)' },
  { id: GEMINI_PRO_MODEL_ID, name: '高品質 (2.5 Pro)' },
];

export const DEFAULT_MODEL_ID = GEMINI_FLASH_MODEL_ID;

// 利用可能なプロンプトテンプレート（プレゼンテーションスタイル）
export const AVAILABLE_PROMPT_TEMPLATES: PromptTemplate[] = templates;
export const DEFAULT_PROMPT_TEMPLATE_ID = templates.length > 0 ? templates[0].id : '';

// スライド枚数関連
export const DEFAULT_SLIDE_COUNT = 7;
export const MIN_SLIDE_COUNT = 3;
export const MAX_SLIDE_COUNT = 50;


// Theme Colors for Light Theme with Wine-Red Accents
export const PAGE_BACKGROUND_COLOR = '#f8f9fa';
export const SLIDE_BACKGROUND_COLOR = '#FFFFFF';
export const SLIDE_BACKGROUND_COLOR_ALT = '#f9fafb';

export const TEXT_COLOR_DARK = '#212529';
export const TEXT_COLOR_MUTED = '#495057';
export const ACCENT_COLOR_PRIMARY = '#BE123C';
export const ACCENT_COLOR_SECONDARY = '#9F1239';

export const HIGHLIGHT_CLASS_NAME = 'highlight';
export const HIGHLIGHT_STYLES = `background-color: ${ACCENT_COLOR_PRIMARY}; color: white; padding: 0.1em 0.4em; border-radius: 0.3em; display: inline-block;`;

export const GOOGLE_FONTS_LINK_NOTO_SANS_JP = '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">';
export const TAILWIND_CDN_LINK = '<script src="https://cdn.tailwindcss.com"></script>';

export const FADE_IN_UP_ANIMATION_KEYFRAMES = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-400 { animation-delay: 0.4s; }
.animate-delay-600 { animation-delay: 0.6s; }
`;