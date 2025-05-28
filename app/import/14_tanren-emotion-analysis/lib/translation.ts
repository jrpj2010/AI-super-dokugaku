// 感情表現の日英辞書
const emotionDictionary: Record<string, string> = {
  // 基本感情
  'happy': '幸せ',
  'happiness': '幸福',
  'joyful': '喜び',
  'joy': '喜び',
  'sad': '悲しい',
  'sadness': '悲しみ',
  'angry': '怒り',
  'anger': '怒り',
  'surprised': '驚き',
  'surprise': '驚き',
  'fear': '恐れ',
  'fearful': '恐怖',
  'disgusted': '嫌悪',
  'disgust': '嫌悪',
  'confident': '自信',
  'confidence': '自信',
  'confused': '困惑',
  'confusion': '困惑',
  'interested': '興味',
  'interest': '興味',
  
  // 表情関連
  'neutral': 'ニュートラル',
  'neutral expression': '中立的な表情',
  'smiling': '笑顔',
  'smile': '笑顔',
  'frowning': 'しかめ面',
  'frown': 'しかめ面',
  'raised eyebrows': '眉を上げている',
  'eyes wide': '目を見開いている',
  'eyes closed': '目を閉じている',
  'mouth open': '口を開けている',
  'lips pressed': '唇を押し付けている',
  
  // 感情の強度
  'very': 'とても',
  'slightly': 'やや',
  'somewhat': 'ある程度',
  'extremely': '非常に',
  'mildly': '軽度に',
  'moderately': '適度に',
  'intensely': '激しく',
  
  // 感情状態の説明
  'relaxed': 'リラックスした',
  'tense': '緊張した',
  'calm': '穏やかな',
  'excited': '興奮した',
  'engaged': '集中した',
  'distracted': '注意散漫な',
  'focused': '集中している',
  'attentive': '注意深い',
  'thoughtful': '思慮深い',
  'contemplative': '瞑想的な',
  'anxious': '不安な',
  'worried': '心配している',
  'content': '満足している',
  'pleased': '喜んでいる',
  'displeased': '不満な',
  'uncomfortable': '不快な',
  'comfortable': '快適な',
  
  // 一般的なフレーズ
  'showing': '示している',
  'appears': '見える',
  'seems': '思われる',
  'displaying': '表している',
  'expressing': '表現している',
  'emotional state': '感情状態',
  'facial expression': '表情',
  'body language': 'ボディランゲージ',
  'eye contact': 'アイコンタクト',
  'positive': 'ポジティブ',
  'negative': 'ネガティブ',
  'mixed emotions': '複雑な感情',
  'genuine': '本物の',
  'forced': '作られた',
  
  // 分析関連
  'analysis': '分析',
  'detected': '検出された',
  'observed': '観察された',
  'indicates': '示している',
  'suggests': '示唆している',
  'reveals': '明らかにしている',
  'high level of': '高いレベルの',
  'low level of': '低いレベルの',
  'moderate level of': '中程度のレベルの',
  
  // 顔の部位
  'eyes': '目',
  'eyebrows': '眉',
  'mouth': '口',
  'face': '顔',
  'forehead': '額',
  'cheeks': '頬',
  'chin': '顎',
  'nose': '鼻'
}

// フレーズパターンと翻訳ルール
const phrasePatterns: Array<{pattern: RegExp, replacement: string | ((match: any) => string)}> = [
  // "The person appears [emotion]" -> "その人は[感情]に見えます"
  {
    pattern: /the person appears (\w+)/gi,
    replacement: (match: RegExpMatchArray) => {
      const emotion = match[1].toLowerCase()
      return `その人は${translateWord(emotion)}に見えます`
    }
  },
  // "Shows/Showing [emotion]" -> "[感情]を示している"
  {
    pattern: /shows?\s+(\w+)/gi,
    replacement: (match: RegExpMatchArray) => {
      const emotion = match[1].toLowerCase()
      return `${translateWord(emotion)}を示している`
    }
  },
  // "[Adjective] [emotion]" -> "[形容詞][感情]"
  {
    pattern: /(very|slightly|somewhat|extremely|mildly|moderately|intensely)\s+(\w+)/gi,
    replacement: (match: RegExpMatchArray) => {
      const intensity = match[1].toLowerCase()
      const emotion = match[2].toLowerCase()
      return `${translateWord(intensity)}${translateWord(emotion)}`
    }
  },
  // "with [characteristic]" -> "[特徴]を伴って"
  {
    pattern: /with\s+(\w+)/gi,
    replacement: (match: RegExpMatchArray) => {
      const characteristic = match[1].toLowerCase()
      return `${translateWord(characteristic)}を伴って`
    }
  }
]

/**
 * 単語を翻訳
 */
function translateWord(word: string): string {
  const lowerWord = word.toLowerCase()
  return emotionDictionary[lowerWord] || word
}

/**
 * 文章を翻訳（辞書ベース）
 */
export function translateEmotionText(text: string): string {
  if (!text) return ''
  
  let translatedText = text
  
  // フレーズパターンを適用
  for (const { pattern, replacement } of phrasePatterns) {
    translatedText = translatedText.replace(pattern, replacement as any)
  }
  
  // 残りの単語を辞書で置換
  // より長い語句から順に置換（部分マッチを防ぐため）
  const sortedKeys = Object.keys(emotionDictionary).sort((a, b) => b.length - a.length)
  
  for (const key of sortedKeys) {
    // 単語境界を考慮した正規表現（日本語の単語も含む）
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(?<![a-zA-Z])${escapedKey}(?![a-zA-Z])`, 'gi')
    translatedText = translatedText.replace(regex, emotionDictionary[key])
  }
  
  // 基本的な英語の接続詞も翻訳
  translatedText = translatedText
    .replace(/\band\b/gi, 'と')
    .replace(/\bor\b/gi, 'または')
    .replace(/\bbut\b/gi, 'しかし')
    .replace(/\bwith\b/gi, 'と共に')
    .replace(/\bof\b/gi, 'の')
    .replace(/\bin\b/gi, 'で')
    .replace(/\bat\b/gi, 'で')
    .replace(/\bthe\b/gi, '')
    .replace(/\ba\b/gi, '')
    .replace(/\ban\b/gi, '')
  
  // 文末の調整
  if (translatedText.endsWith('.')) {
    translatedText = translatedText.slice(0, -1) + '。'
  }
  
  return translatedText.trim()
}

/**
 * 感情分析結果を翻訳
 */
export interface TranslatedEmotionResult {
  facialExpression: string
  insights: string
}

export function translateEmotionAnalysis(
  facialExpression: string,
  insights: string
): TranslatedEmotionResult {
  return {
    facialExpression: translateEmotionText(facialExpression),
    insights: translateEmotionText(insights)
  }
}

/**
 * 感情ラベルの翻訳
 */
export const emotionLabels: Record<string, string> = {
  joy: '喜び',
  anger: '怒り',
  sadness: '悲しみ',
  surprise: '驚き',
  fear: '恐れ',
  confidence: '自信',
  confusion: '困惑',
  interest: '興味',
  trust: '信頼',
  anticipation: '期待',
  disgust: '嫌悪'
}