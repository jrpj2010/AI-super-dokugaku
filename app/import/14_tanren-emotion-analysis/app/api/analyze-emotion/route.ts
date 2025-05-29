import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || '')

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType = 'image/jpeg' } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400, headers: corsHeaders }
      )
    }

    if (!process.env.GOOGLE_AI_API_KEY && !process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500, headers: corsHeaders }
      )
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: process.env.GOOGLE_AI_MODEL || 'gemini-2.0-flash-exp' })

    const prompt = `この画像の人物の表情を分析し、感情スコアを提供してください。
以下の構造のJSON形式で分析結果を返してください：
{
  "emotions": {
    "joy": <0-100>,
    "anger": <0-100>,
    "sadness": <0-100>,
    "surprise": <0-100>,
    "fear": <0-100>,
    "confidence": <0-100>,
    "confusion": <0-100>,
    "interest": <0-100>
  },
  "facialExpression": "表情の簡潔な説明（日本語で）",
  "insights": "感情状態に関する洞察（日本語で）"
}

分析のポイント：
- 顔の特徴（目、眉、口）
- 全体的な表情と微細な表情
- フレーム内に見えるボディランゲージ
- エンゲージメントレベルと注意力

重要事項：
- facialExpressionとinsightsは自然な日本語で記述してください
- 一般的な感情表現を使用：喜んでいる、悲しそう、怒っている、驚いている、自信がある、困惑している、興味を示している
- 簡潔に（10-15文字以内）
- facialExpression: 見たままを説明（例：「眉を上げて微笑んでいる」「目を細めて眉をひそめている」）
- insights: 意味のある洞察（例：「真の喜びと関与を示している」「疲れているが集中している」）

すべての感情スコアは0～100の範囲で、強度のパーセンテージを表します。
有効なJSONのみを返し、追加のテキストは含めないでください。`

    // Generate content with image
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: mimeType
        }
      }
    ])

    const response = await result.response
    const text = response.text()

    // Try to extract JSON from the response
    let jsonMatch = text.match(/\{[\s\S]*\}/)
    let analysisResult
    
    if (!jsonMatch) {
      // Gemini APIが期待するJSON形式で返さない場合のフォールバック
      console.warn('No JSON found in Gemini response, using fallback')
      analysisResult = {
        emotions: {
          joy: 0,
          anger: 0,
          sadness: 0,
          surprise: 0,
          fear: 0,
          confidence: 50,
          confusion: 0,
          interest: 50
        },
        facialExpression: 'Unable to analyze - API response format issue',
        insights: 'Analysis temporarily unavailable. Please try again.'
      }
    } else {
      try {
        analysisResult = JSON.parse(jsonMatch[0])
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        // パースエラーの場合もフォールバック
        analysisResult = {
          emotions: {
            joy: 0,
            anger: 0,
            sadness: 0,
            surprise: 0,
            fear: 0,
            confidence: 50,
            confusion: 0,
            interest: 50
          },
          facialExpression: 'Analysis error',
          insights: 'Unable to process the image at this time.'
        }
      }
    }

    // Validate the response structure
    if (!analysisResult.emotions || typeof analysisResult.emotions !== 'object') {
      throw new Error('Invalid emotion data structure')
    }

    // Ensure all emotion values are numbers between 0-100
    const emotions = analysisResult.emotions
    const emotionKeys = ['joy', 'anger', 'sadness', 'surprise', 'fear', 'confidence', 'confusion', 'interest']
    
    for (const key of emotionKeys) {
      if (typeof emotions[key] !== 'number') {
        emotions[key] = 0
      } else {
        emotions[key] = Math.max(0, Math.min(100, emotions[key]))
      }
    }

    return NextResponse.json({
      emotions: emotions,
      facialExpression: analysisResult.facialExpression || 'Neutral expression',
      insights: analysisResult.insights || 'No specific insights detected'
    }, { headers: corsHeaders })

  } catch (error) {
    console.error('Emotion analysis error:', error)
    
    // Return a more specific error message
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API configuration error' },
          { status: 500, headers: corsHeaders }
        )
      } else if (error.message.includes('JSON')) {
        return NextResponse.json(
          { error: 'Failed to parse emotion analysis results' },
          { status: 500, headers: corsHeaders }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to analyze emotions' },
      { status: 500, headers: corsHeaders }
    )
  }
}