'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'
import yaml from 'js-yaml'
import fs from 'fs/promises'
import path from 'path'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateSpeech(originalText: string) {
  try {
    // YAMLファイルを読み込む
    const yamlPath = path.join(process.cwd(), 'app/import/27_medical-tts/tts_pronunciation_lexicon.yaml')
    const yamlContent = await fs.readFile(yamlPath, 'utf-8')
    const lexicon = yaml.load(yamlContent) as any

    // テキストを前処理してSSMLに置換
    let processedText = originalText
    if (lexicon && lexicon.medical_terms) {
      for (const item of lexicon.medical_terms) {
        const term = item.term
        const ssmlSolution = item.solution.ssml_precise_ipa
        if (processedText.includes(term)) {
          processedText = processedText.replace(new RegExp(term, 'g'), ssmlSolution)
        }
      }
    }

    // 最終的なSSMLテキスト
    const finalSSML = `<speak>${processedText}</speak>`

    // Gemini APIを使用してテキストを生成（音声生成の代替案）
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    
    const prompt = `
以下のSSMLテキストを解析して、医療用語の正しい読み方を日本語で説明してください：

${finalSSML}

特に注目すべき医療用語とその発音を一覧にしてください。
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const explanation = response.text()

    // 実際の音声生成にはGoogle Cloud Text-to-Speech APIが必要です
    // ここでは、処理されたSSMLとGeminiの解説を返します
    
    return {
      success: true,
      processedText: finalSSML,
      explanation: explanation,
      audioUrl: null, // 実際の音声URLはGoogle Cloud TTS APIから取得
      error: 'Gemini TTS APIは外部テキストの直接読み上げに制限があるため、Google Cloud Text-to-Speech APIの使用を推奨します。'
    }

  } catch (error) {
    console.error('Error in generateSpeech:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '音声生成中にエラーが発生しました'
    }
  }
}