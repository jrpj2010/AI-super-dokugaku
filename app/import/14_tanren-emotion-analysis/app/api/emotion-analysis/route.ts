import { NextRequest, NextResponse } from 'next/server'
import { analyzeEmotion, analyzeMultimodal } from '@/lib/api/gemini-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, imageBase64, audioBase64 } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // 画像データがある場合はマルチモーダル分析を使用
    let result
    if (imageBase64) {
      result = await analyzeMultimodal(text, imageBase64, audioBase64)
    } else {
      result = await analyzeEmotion({ text, imageBase64, audioBase64 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze emotion' },
      { status: 500 }
    )
  }
}

// CORS対応（必要に応じて）
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}