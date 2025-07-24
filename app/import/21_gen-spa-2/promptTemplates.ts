import { PromptTemplate } from './types';

export const STANDARD_TEMPLATE_ID = 'standard-v1';
export const STARTUP_PITCH_TEMPLATE_ID = 'startup-pitch-v1';
export const VISUAL_HEAVY_TEMPLATE_ID = 'visual-heavy-v1';
export const ZEN_MINCHO_TEMPLATE_ID = 'zen-mincho-v1';
export const FLASH_IMPACT_TEMPLATE_ID = 'flash-impact-v1';


export const STANDARD_TEMPLATE: PromptTemplate = {
  id: STANDARD_TEMPLATE_ID,
  name: '標準スタイル',
  description: '標準的でバランスの取れた情報量とデザインのプレゼンテーションを生成します。',
  systemPromptPath: 'prompt-templates/standard-v1.md',
  templateType: 'gen-spa'
};

export const STARTUP_PITCH_TEMPLATE: PromptTemplate = {
  id: STARTUP_PITCH_TEMPLATE_ID,
  name: 'スタートアップピッチ風',
  description: '1スライド1メッセージ、大きなフォント、視覚的インパクトを重視したスタイルです。',
  systemPromptPath: 'prompt-templates/startup-pitch-v1.md',
  templateType: 'gen-spa'
};

export const VISUAL_HEAVY_TEMPLATE: PromptTemplate = {
  id: VISUAL_HEAVY_TEMPLATE_ID,
  name: 'ビジュアル重視スタイル',
  description: 'フリー画像やAI生成画像を積極的に活用し、各スライドが視覚的に豊かになることを目指します。',
  systemPromptPath: 'prompt-templates/visual-heavy-v1.md',
  templateType: 'gen-spa'
};

export const ZEN_MINCHO_TEMPLATE: PromptTemplate = {
  id: ZEN_MINCHO_TEMPLATE_ID,
  name: 'Zen芸術スタイル (明朝)',
  description: '明朝体を基調とし、余白を活かしたミニマルで落ち着いた「禅」を感じさせるデザインを目指します。',
  systemPromptPath: 'prompt-templates/zen-mincho-v1.md',
  templateType: 'gen-spa'
};

export const FLASH_IMPACT_TEMPLATE: PromptTemplate = {
  id: FLASH_IMPACT_TEMPLATE_ID,
  name: 'フラッシュインパクトスタイル',
  description: '巨大フォントで一言メッセージを画面いっぱいに表示。記憶への定着を最優先します。',
  systemPromptPath: 'prompt-templates/flash-impact-v1.md',
  templateType: 'gen-spa'
};

export const AVAILABLE_PROMPT_TEMPLATES: PromptTemplate[] = [
  STANDARD_TEMPLATE,
  STARTUP_PITCH_TEMPLATE,
  VISUAL_HEAVY_TEMPLATE,
  ZEN_MINCHO_TEMPLATE,
  FLASH_IMPACT_TEMPLATE,
];