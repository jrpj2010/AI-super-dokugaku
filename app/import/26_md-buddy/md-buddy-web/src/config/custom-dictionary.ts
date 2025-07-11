// 音声認識用カスタム辞書設定

// 業界・分野カテゴリ
export enum IndustryCategory {
  TECHNOLOGY = 'technology',
  FINANCE = 'finance',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  LEGAL = 'legal',
  MARKETING = 'marketing',
  MANUFACTURING = 'manufacturing',
  REAL_ESTATE = 'real_estate',
  CONSULTING = 'consulting',
  GENERAL = 'general'
}

// 専門用語エントリ
export interface DictionaryEntry {
  term: string;
  pronunciation?: string; // 発音表記
  alternatives: string[]; // 音声認識で認識される可能性のある表記
  category: IndustryCategory;
  description?: string;
  context?: string[]; // 使用される文脈
  priority: 'high' | 'medium' | 'low'; // 認識優先度
}

// 辞書設定
export interface DictionaryConfig {
  enabledCategories: IndustryCategory[];
  customEntries: DictionaryEntry[];
  recognitionThreshold: number; // 認識信頼度の閾値
  autoCorrection: boolean; // 自動修正を有効にするか
  contextAware: boolean; // 文脈を考慮するか
}

// 技術系専門用語
const TECHNOLOGY_TERMS: DictionaryEntry[] = [
  {
    term: 'API',
    pronunciation: 'エーピーアイ',
    alternatives: ['えーぴーあい', 'アピ', 'エイピアイ'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'Application Programming Interface',
    context: ['開発', 'プログラミング', 'システム'],
    priority: 'high'
  },
  {
    term: 'DevOps',
    pronunciation: 'デブオプス',
    alternatives: ['でぶおぷす', 'デボプス', 'でぼぷす'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'Development and Operations',
    context: ['開発', '運用', 'インフラ'],
    priority: 'high'
  },
  {
    term: 'Kubernetes',
    pronunciation: 'クーベルネティス',
    alternatives: ['くーべるねてぃす', 'クーバネティス', 'K8s', 'ケーエイトエス'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'コンテナオーケストレーションプラットフォーム',
    context: ['コンテナ', 'インフラ', 'オーケストレーション'],
    priority: 'medium'
  },
  {
    term: 'React',
    pronunciation: 'リアクト',
    alternatives: ['りあくと', 'リエクト'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'JavaScriptライブラリ',
    context: ['フロントエンド', 'JavaScript', 'UI'],
    priority: 'high'
  },
  {
    term: 'TypeScript',
    pronunciation: 'タイプスクリプト',
    alternatives: ['たいぷすくりぷと', 'TS', 'ティーエス'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'JavaScript拡張言語',
    context: ['プログラミング', 'JavaScript', '型安全'],
    priority: 'high'
  },
  {
    term: 'GraphQL',
    pronunciation: 'グラフキューエル',
    alternatives: ['ぐらふきゅーえる', 'グラフQL', 'GQL'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'データクエリ言語',
    context: ['API', 'データ', 'クエリ'],
    priority: 'medium'
  },
  {
    term: 'Docker',
    pronunciation: 'ドッカー',
    alternatives: ['どっかー', 'ドッカ'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'コンテナプラットフォーム',
    context: ['コンテナ', 'デプロイ', 'インフラ'],
    priority: 'high'
  },
  {
    term: 'PostgreSQL',
    pronunciation: 'ポストグレエスキューエル',
    alternatives: ['ぽすとぐれえすきゅーえる', 'PostgreSQL', 'ポスグレ'],
    category: IndustryCategory.TECHNOLOGY,
    description: 'リレーショナルデータベース',
    context: ['データベース', 'SQL', 'RDBMS'],
    priority: 'medium'
  }
];

// 金融系専門用語
const FINANCE_TERMS: DictionaryEntry[] = [
  {
    term: 'KPI',
    pronunciation: 'ケーピーアイ',
    alternatives: ['けーぴーあい', 'キーピーアイ'],
    category: IndustryCategory.FINANCE,
    description: 'Key Performance Indicator',
    context: ['指標', '評価', 'パフォーマンス'],
    priority: 'high'
  },
  {
    term: 'ROI',
    pronunciation: 'アールオーアイ',
    alternatives: ['あーるおーあい', 'ロイ'],
    category: IndustryCategory.FINANCE,
    description: 'Return on Investment',
    context: ['投資', '収益', '効果'],
    priority: 'high'
  },
  {
    term: 'EBITDA',
    pronunciation: 'イービットダー',
    alternatives: ['いーびっとだー', 'エビドダ'],
    category: IndustryCategory.FINANCE,
    description: '利息・税金・減価償却控除前利益',
    context: ['財務', '利益', '指標'],
    priority: 'medium'
  },
  {
    term: 'FinTech',
    pronunciation: 'フィンテック',
    alternatives: ['ふぃんてっく', 'フィンテク'],
    category: IndustryCategory.FINANCE,
    description: 'Financial Technology',
    context: ['金融', 'テクノロジー', 'イノベーション'],
    priority: 'high'
  }
];

// 医療系専門用語
const HEALTHCARE_TERMS: DictionaryEntry[] = [
  {
    term: 'EHR',
    pronunciation: 'イーエイチアール',
    alternatives: ['いーえいちあーる', 'エイチアール'],
    category: IndustryCategory.HEALTHCARE,
    description: 'Electronic Health Record',
    context: ['電子カルテ', '医療記録', 'システム'],
    priority: 'high'
  },
  {
    term: 'HIPAA',
    pronunciation: 'ヒッパー',
    alternatives: ['ひっぱー', 'ハイパー'],
    category: IndustryCategory.HEALTHCARE,
    description: 'Health Insurance Portability and Accountability Act',
    context: ['医療', 'プライバシー', 'コンプライアンス'],
    priority: 'medium'
  }
];

// 教育系専門用語
const EDUCATION_TERMS: DictionaryEntry[] = [
  {
    term: 'LMS',
    pronunciation: 'エルエムエス',
    alternatives: ['えるえむえす', 'ラーニングマネジメントシステム'],
    category: IndustryCategory.EDUCATION,
    description: 'Learning Management System',
    context: ['学習', '管理', 'eラーニング'],
    priority: 'high'
  },
  {
    term: 'MOOC',
    pronunciation: 'ムーク',
    alternatives: ['むーく', 'モーク'],
    category: IndustryCategory.EDUCATION,
    description: 'Massive Open Online Course',
    context: ['オンライン', '講座', '大規模'],
    priority: 'medium'
  }
];

// 法務系専門用語
const LEGAL_TERMS: DictionaryEntry[] = [
  {
    term: 'NDA',
    pronunciation: 'エヌディーエー',
    alternatives: ['えぬでぃーえー', 'ネダ'],
    category: IndustryCategory.LEGAL,
    description: 'Non-Disclosure Agreement',
    context: ['機密保持', '契約', '法務'],
    priority: 'high'
  },
  {
    term: 'SLA',
    pronunciation: 'エスエルエー',
    alternatives: ['えすえるえー', 'スラ'],
    category: IndustryCategory.LEGAL,
    description: 'Service Level Agreement',
    context: ['サービス', '品質', '契約'],
    priority: 'high'
  },
  {
    term: 'GDPR',
    pronunciation: 'ジーディーピーアール',
    alternatives: ['じーでぃーぴーあーる', 'ゲデプル'],
    category: IndustryCategory.LEGAL,
    description: 'General Data Protection Regulation',
    context: ['データ保護', 'プライバシー', 'EU'],
    priority: 'medium'
  }
];

// マーケティング系専門用語
const MARKETING_TERMS: DictionaryEntry[] = [
  {
    term: 'CTR',
    pronunciation: 'シーティーアール',
    alternatives: ['しーてぃーあーる', 'クリックスルーレート'],
    category: IndustryCategory.MARKETING,
    description: 'Click Through Rate',
    context: ['広告', 'クリック', '指標'],
    priority: 'high'
  },
  {
    term: 'CPA',
    pronunciation: 'シーピーエー',
    alternatives: ['しーぴーえー', 'コストパーアクション'],
    category: IndustryCategory.MARKETING,
    description: 'Cost Per Action',
    context: ['広告', 'コスト', '獲得'],
    priority: 'high'
  },
  {
    term: 'SEO',
    pronunciation: 'エスイーオー',
    alternatives: ['えすいーおー', 'セオ'],
    category: IndustryCategory.MARKETING,
    description: 'Search Engine Optimization',
    context: ['検索', '最適化', 'マーケティング'],
    priority: 'high'
  }
];

// 一般ビジネス用語
const GENERAL_TERMS: DictionaryEntry[] = [
  {
    term: 'MVP',
    pronunciation: 'エムブイピー',
    alternatives: ['えむぶいぴー', 'ミニマムバイアブルプロダクト'],
    category: IndustryCategory.GENERAL,
    description: 'Minimum Viable Product',
    context: ['プロダクト', '開発', 'スタートアップ'],
    priority: 'high'
  },
  {
    term: 'B2B',
    pronunciation: 'ビーツービー',
    alternatives: ['びーつーびー', 'ビジネストゥビジネス'],
    category: IndustryCategory.GENERAL,
    description: 'Business to Business',
    context: ['ビジネス', '企業間', '取引'],
    priority: 'high'
  },
  {
    term: 'B2C',
    pronunciation: 'ビーツーシー',
    alternatives: ['びーつーしー', 'ビジネストゥコンシューマー'],
    category: IndustryCategory.GENERAL,
    description: 'Business to Consumer',
    context: ['ビジネス', '一般消費者', '販売'],
    priority: 'high'
  },
  {
    term: 'SaaS',
    pronunciation: 'サース',
    alternatives: ['さーす', 'サス', 'ソフトウェアアズアサービス'],
    category: IndustryCategory.GENERAL,
    description: 'Software as a Service',
    context: ['ソフトウェア', 'クラウド', 'サービス'],
    priority: 'high'
  }
];

// 全辞書データ
export const DICTIONARY_ENTRIES: Record<IndustryCategory, DictionaryEntry[]> = {
  [IndustryCategory.TECHNOLOGY]: TECHNOLOGY_TERMS,
  [IndustryCategory.FINANCE]: FINANCE_TERMS,
  [IndustryCategory.HEALTHCARE]: HEALTHCARE_TERMS,
  [IndustryCategory.EDUCATION]: EDUCATION_TERMS,
  [IndustryCategory.LEGAL]: LEGAL_TERMS,
  [IndustryCategory.MARKETING]: MARKETING_TERMS,
  [IndustryCategory.MANUFACTURING]: [],
  [IndustryCategory.REAL_ESTATE]: [],
  [IndustryCategory.CONSULTING]: [],
  [IndustryCategory.GENERAL]: GENERAL_TERMS
};

// デフォルト辞書設定
export const DEFAULT_DICTIONARY_CONFIG: DictionaryConfig = {
  enabledCategories: [
    IndustryCategory.TECHNOLOGY,
    IndustryCategory.GENERAL
  ],
  customEntries: [],
  recognitionThreshold: 0.7,
  autoCorrection: true,
  contextAware: true
};

// 辞書管理クラス
export class CustomDictionary {
  private config: DictionaryConfig;
  private termMap: Map<string, DictionaryEntry> = new Map();
  private alternativeMap: Map<string, string> = new Map(); // 代替表記 -> 正式用語

  constructor(config: Partial<DictionaryConfig> = {}) {
    this.config = { ...DEFAULT_DICTIONARY_CONFIG, ...config };
    this.buildMaps();
  }

  // 設定の更新
  updateConfig(config: Partial<DictionaryConfig>): void {
    this.config = { ...this.config, ...config };
    this.buildMaps();
  }

  // カテゴリの有効化/無効化
  enableCategory(category: IndustryCategory): void {
    if (!this.config.enabledCategories.includes(category)) {
      this.config.enabledCategories.push(category);
      this.buildMaps();
    }
  }

  disableCategory(category: IndustryCategory): void {
    this.config.enabledCategories = this.config.enabledCategories.filter(
      c => c !== category
    );
    this.buildMaps();
  }

  // カスタムエントリの追加
  addCustomEntry(entry: DictionaryEntry): void {
    this.config.customEntries.push(entry);
    this.addEntryToMaps(entry);
  }

  // テキストの自動修正
  correctText(text: string): string {
    if (!this.config.autoCorrection) {
      return text;
    }

    let correctedText = text;

    // 代替表記を正式用語に置換
    for (const [alternative, correctTerm] of this.alternativeMap.entries()) {
      const regex = new RegExp(`\\b${alternative}\\b`, 'gi');
      correctedText = correctedText.replace(regex, correctTerm);
    }

    return correctedText;
  }

  // 用語の検索
  findTerm(term: string): DictionaryEntry | undefined {
    // 完全一致
    const exactMatch = this.termMap.get(term.toLowerCase());
    if (exactMatch) return exactMatch;

    // 代替表記からの検索
    const correctTerm = this.alternativeMap.get(term.toLowerCase());
    if (correctTerm) {
      return this.termMap.get(correctTerm.toLowerCase());
    }

    return undefined;
  }

  // 類似用語の検索
  findSimilarTerms(query: string, limit: number = 5): DictionaryEntry[] {
    const queryLower = query.toLowerCase();
    const matches: Array<{ entry: DictionaryEntry; score: number }> = [];

    for (const [term, entry] of this.termMap.entries()) {
      const score = this.calculateSimilarity(queryLower, term);
      if (score > 0.3) { // 閾値
        matches.push({ entry, score });
      }

      // 代替表記も検索
      for (const alt of entry.alternatives) {
        const altScore = this.calculateSimilarity(queryLower, alt.toLowerCase());
        if (altScore > 0.3) {
          matches.push({ entry, score: altScore });
        }
      }
    }

    return matches
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(m => m.entry);
  }

  // 文脈に基づく用語提案
  suggestTermsForContext(context: string[]): DictionaryEntry[] {
    const suggestions: DictionaryEntry[] = [];

    for (const [_, entry] of this.termMap.entries()) {
      if (entry.context) {
        const contextMatch = entry.context.some(ctx => 
          context.some(userCtx => 
            userCtx.toLowerCase().includes(ctx.toLowerCase()) ||
            ctx.toLowerCase().includes(userCtx.toLowerCase())
          )
        );

        if (contextMatch) {
          suggestions.push(entry);
        }
      }
    }

    // 優先度でソート
    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // 認識精度向上のためのプロンプト生成
  generateRecognitionPrompt(): string {
    const highPriorityTerms = this.getHighPriorityTerms();
    
    if (highPriorityTerms.length === 0) {
      return '';
    }

    const termList = highPriorityTerms
      .map(entry => `- ${entry.term}（${entry.pronunciation || entry.term}）`)
      .join('\n');

    return `音声認識時は以下の専門用語に特に注意してください：

${termList}

これらの用語が音声で言及された場合は、正確な表記で記録してください。`;
  }

  // 高優先度の用語取得
  getHighPriorityTerms(): DictionaryEntry[] {
    return Array.from(this.termMap.values())
      .filter(entry => entry.priority === 'high')
      .slice(0, 20); // 最大20個
  }

  // 有効なカテゴリの用語取得
  getActiveTerms(): DictionaryEntry[] {
    return Array.from(this.termMap.values());
  }

  // 統計情報の取得
  getStatistics(): {
    totalTerms: number;
    byCategory: Record<IndustryCategory, number>;
    byPriority: Record<'high' | 'medium' | 'low', number>;
    customTerms: number;
  } {
    const entries = this.getActiveTerms();
    
    const byCategory: Record<IndustryCategory, number> = {} as Record<IndustryCategory, number>;
    const byPriority: Record<'high' | 'medium' | 'low', number> = {
      high: 0,
      medium: 0,
      low: 0
    };

    entries.forEach(entry => {
      byCategory[entry.category] = (byCategory[entry.category] || 0) + 1;
      byPriority[entry.priority]++;
    });

    return {
      totalTerms: entries.length,
      byCategory,
      byPriority,
      customTerms: this.config.customEntries.length
    };
  }

  // プライベートメソッド

  private buildMaps(): void {
    this.termMap.clear();
    this.alternativeMap.clear();

    // 有効なカテゴリの用語を追加
    for (const category of this.config.enabledCategories) {
      const entries = DICTIONARY_ENTRIES[category] || [];
      entries.forEach(entry => this.addEntryToMaps(entry));
    }

    // カスタムエントリを追加
    this.config.customEntries.forEach(entry => this.addEntryToMaps(entry));
  }

  private addEntryToMaps(entry: DictionaryEntry): void {
    const termLower = entry.term.toLowerCase();
    this.termMap.set(termLower, entry);

    // 代替表記のマッピング
    entry.alternatives.forEach(alt => {
      this.alternativeMap.set(alt.toLowerCase(), entry.term);
    });
  }

  private calculateSimilarity(str1: string, str2: string): number {
    // 簡易的な類似度計算（Levenshtein距離ベース）
    const len1 = str1.length;
    const len2 = str2.length;

    if (len1 === 0) return len2 === 0 ? 1 : 0;
    if (len2 === 0) return 0;

    const matrix: number[][] = Array(len1 + 1)
      .fill(null)
      .map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const maxLen = Math.max(len1, len2);
    return 1 - matrix[len1][len2] / maxLen;
  }
}

// シングルトンインスタンス
export const customDictionary = new CustomDictionary();

// 便利な関数
export function getActiveDictionary(): CustomDictionary {
  return customDictionary;
}

export function enableDictionaryCategory(category: IndustryCategory): void {
  customDictionary.enableCategory(category);
}

export function disableDictionaryCategory(category: IndustryCategory): void {
  customDictionary.disableCategory(category);
}

export function correctTextWithDictionary(text: string): string {
  return customDictionary.correctText(text);
}

export function findDictionaryTerm(term: string): DictionaryEntry | undefined {
  return customDictionary.findTerm(term);
}

export function generateDictionaryPrompt(): string {
  return customDictionary.generateRecognitionPrompt();
}