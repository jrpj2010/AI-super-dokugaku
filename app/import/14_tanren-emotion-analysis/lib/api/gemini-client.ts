import { GoogleGenerativeAI } from '@google/generative-ai'

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

// モデルの設定
const model = genAI.getGenerativeModel({ 
  model: process.env.GOOGLE_AI_MODEL || 'gemini-2.5-pro-preview-05-06'
})

export interface EmotionAnalysisRequest {
  text: string
  imageBase64?: string
  audioBase64?: string
}

export interface EmotionAnalysisResponse {
  emotions: {
    happiness: number
    surprise: number
    fear: number
    disgust: number
    anger: number
    sadness: number
  }
  sentiment: {
    positive: number
    negative: number
    neutral: number
  }
  conversationMetrics?: {
    blinkRate: number
    calmness: number
    speechSpeed: number
    pauseDuration: number
    fluency: number
  }
  faceMetrics?: {
    faceMovement: number
    sightMovement: number
  }
  summary: string
}

export async function analyzeEmotion(request: EmotionAnalysisRequest): Promise<EmotionAnalysisResponse> {
  try {
    const prompt = `
あなたは感情分析の専門家です。以下の情報から感情状態を分析してください。

テキスト: ${request.text}

以下のJSON形式で回答してください：
{
  "emotions": {
    "happiness": 0-100の数値,
    "surprise": 0-100の数値,
    "fear": 0-100の数値,
    "disgust": 0-100の数値,
    "anger": 0-100の数値,
    "sadness": 0-100の数値
  },
  "sentiment": {
    "positive": 0-100の数値,
    "negative": 0-100の数値,
    "neutral": 0-100の数値
  },
  "conversationMetrics": {
    "blinkRate": 0-100の数値,
    "calmness": 0-100の数値,
    "speechSpeed": 0-100の数値,
    "pauseDuration": 0-100の数値,
    "fluency": 0-100の数値
  },
  "faceMetrics": {
    "faceMovement": 0-100の数値,
    "sightMovement": 0-100の数値
  },
  "summary": "簡潔な分析サマリー"
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // JSONレスポンスを抽出
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid response format')
    }
    
    return JSON.parse(jsonMatch[0]) as EmotionAnalysisResponse
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to analyze emotion')
  }
}

export async function analyzeMultimodal(
  text: string,
  imageBase64?: string,
  audioBase64?: string
): Promise<EmotionAnalysisResponse> {
  try {
    const parts: any[] = [
      {
        text: `
あなたはマルチモーダル感情分析の専門家です。提供された情報（テキスト、画像、音声）から総合的に感情状態を分析してください。

分析対象のテキスト: ${text}

以下のJSON形式で詳細な分析結果を提供してください：
{
  "emotions": {
    "happiness": 0-100,
    "surprise": 0-100,
    "fear": 0-100,
    "disgust": 0-100,
    "anger": 0-100,
    "sadness": 0-100
  },
  "sentiment": {
    "positive": 0-100,
    "negative": 0-100,
    "neutral": 0-100
  },
  "conversationMetrics": {
    "blinkRate": 0-100,
    "calmness": 0-100,
    "speechSpeed": 0-100,
    "pauseDuration": 0-100,
    "fluency": 0-100
  },
  "faceMetrics": {
    "faceMovement": 0-100,
    "sightMovement": 0-100
  },
  "summary": "分析結果の要約"
}
`
      }
    ]

    // 画像データがある場合は追加
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64
        }
      })
    }

    const result = await model.generateContent(parts)
    const response = await result.response
    const responseText = response.text()
    
    // JSONレスポンスを抽出
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid response format')
    }
    
    return JSON.parse(jsonMatch[0]) as EmotionAnalysisResponse
  } catch (error) {
    console.error('Gemini Multimodal API Error:', error)
    throw new Error('Failed to analyze multimodal content')
  }
}