import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

interface BatchEmotionRequest {
  id: string
  image: string
  mimeType?: string
}

interface BatchEmotionResponse {
  id: string
  result?: {
    emotions: {
      joy: number
      anger: number
      sadness: number
      surprise: number
      fear: number
      confidence: number
      confusion: number
      interest: number
    }
    facialExpression: string
    insights: string
  }
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const { requests }: { requests: BatchEmotionRequest[] } = await request.json()

    if (!requests || !Array.isArray(requests) || requests.length === 0) {
      return NextResponse.json(
        { error: 'No requests provided' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ model: process.env.GOOGLE_AI_MODEL || 'gemini-2.0-flash-exp' })

    // Process all requests in parallel
    const responses = await Promise.all(
      requests.map(async (req): Promise<BatchEmotionResponse> => {
        try {
          const prompt = `Analyze the facial expression in this image and provide emotion scores.
Return the analysis in JSON format with the following structure:
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
  "facialExpression": "<brief description of facial expression>",
  "insights": "<brief insight about the emotional state>"
}

Focus on facial features and overall expression.
Ensure all emotion scores are between 0-100.
Return ONLY valid JSON, no additional text.`

          const result = await model.generateContent([
            prompt,
            {
              inlineData: {
                data: req.image,
                mimeType: req.mimeType || 'image/jpeg'
              }
            }
          ])

          const response = await result.response
          const text = response.text()

          // Extract JSON from response
          let jsonMatch = text.match(/\{[\s\S]*\}/)
          if (!jsonMatch) {
            throw new Error('No valid JSON found in response')
          }

          const analysisResult = JSON.parse(jsonMatch[0])

          // Validate and normalize emotion values
          const emotions = analysisResult.emotions
          const emotionKeys = ['joy', 'anger', 'sadness', 'surprise', 'fear', 'confidence', 'confusion', 'interest']
          
          for (const key of emotionKeys) {
            if (typeof emotions[key] !== 'number') {
              emotions[key] = 0
            } else {
              emotions[key] = Math.max(0, Math.min(100, emotions[key]))
            }
          }

          return {
            id: req.id,
            result: {
              emotions: emotions,
              facialExpression: analysisResult.facialExpression || 'Neutral expression',
              insights: analysisResult.insights || 'No specific insights detected'
            }
          }
        } catch (error) {
          console.error(`Error analyzing emotion for request ${req.id}:`, error)
          return {
            id: req.id,
            error: error instanceof Error ? error.message : 'Failed to analyze emotion'
          }
        }
      })
    )

    return NextResponse.json({ responses })

  } catch (error) {
    console.error('Batch emotion analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to process batch emotion analysis' },
      { status: 500 }
    )
  }
}