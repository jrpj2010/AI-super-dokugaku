// モックデータとシミュレーション関数

export interface EmotionData {
  happiness: number
  surprise: number
  fear: number
  disgust: number
  anger: number
  sadness: number
}

export interface SentimentData {
  positive: number
  negative: number
  neutral: number
}

export interface FaceMetrics {
  faceMovement: number
  sightMovement: number
}

export interface ConversationMetrics {
  blinkRate: number
  calmness: number
  speechSpeed: number
  pauseDuration: number
  fluency: number
}

// 感情データを生成する関数
export function generateEmotionData(time: number): EmotionData {
  const base = {
    happiness: 30,
    surprise: 10,
    fear: 5,
    disgust: 5,
    anger: 10,
    sadness: 15,
  }

  // 時間に応じて変動を加える
  const variation = Math.sin(time * 0.1) * 20
  const noise = () => (Math.random() - 0.5) * 10

  return {
    happiness: Math.max(0, Math.min(100, base.happiness + variation + noise())),
    surprise: Math.max(0, Math.min(100, base.surprise + noise())),
    fear: Math.max(0, Math.min(100, base.fear + noise())),
    disgust: Math.max(0, Math.min(100, base.disgust + noise())),
    anger: Math.max(0, Math.min(100, base.anger - variation * 0.5 + noise())),
    sadness: Math.max(0, Math.min(100, base.sadness - variation * 0.3 + noise())),
  }
}

// センチメントデータを生成する関数
export function generateSentimentData(emotions: EmotionData): SentimentData {
  const positive = emotions.happiness + emotions.surprise * 0.5
  const negative = emotions.anger + emotions.sadness + emotions.fear + emotions.disgust
  const total = positive + negative

  if (total === 0) {
    return { positive: 0, negative: 0, neutral: 100 }
  }

  const positivePercent = (positive / total) * 100
  const negativePercent = (negative / total) * 100
  const neutralPercent = Math.max(0, 100 - positivePercent - negativePercent)

  return {
    positive: Math.round(positivePercent),
    negative: Math.round(negativePercent),
    neutral: Math.round(neutralPercent),
  }
}

// 顔と視線のメトリクスを生成
export function generateFaceMetrics(time: number): FaceMetrics {
  return {
    faceMovement: Math.max(0, Math.min(100, 50 + Math.sin(time * 0.05) * 30 + (Math.random() - 0.5) * 20)),
    sightMovement: Math.max(0, Math.min(100, 60 + Math.cos(time * 0.07) * 25 + (Math.random() - 0.5) * 15)),
  }
}

// 会話メトリクスを生成
export function generateConversationMetrics(): ConversationMetrics {
  return {
    blinkRate: Math.random() * 40 + 30, // 30-70
    calmness: Math.random() * 30 + 60, // 60-90
    speechSpeed: Math.random() * 40 + 40, // 40-80
    pauseDuration: Math.random() * 30 + 20, // 20-50
    fluency: Math.random() * 30 + 65, // 65-95
  }
}

// 発話シミュレーション用のサンプルテキスト
export const sampleUtterances = [
  "こんにちは、今日はお天気も良くて気持ちがいいですね。",
  "最近、新しいプロジェクトが始まって忙しくしています。",
  "でも、チームメンバーと協力して進められているので楽しいです。",
  "週末は友人と出かける予定があります。",
  "久しぶりに会うので、とても楽しみにしています。",
  "仕事とプライベートのバランスを保つのは大切ですよね。",
  "最近読んだ本がとても面白かったです。",
  "自己啓発の本で、新しい視点を得ることができました。",
  "健康にも気を使うようになりました。",
  "毎朝のウォーキングが日課になっています。",
]

// 時系列データを生成する関数
export function generateTimeSeriesData(length: number = 60) {
  const data = []
  for (let i = 0; i < length; i++) {
    const emotions = generateEmotionData(i)
    const sentiment = generateSentimentData(emotions)
    data.push({
      time: i,
      emotions,
      sentiment,
    })
  }
  return data
}