import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google" // Vercel AI SDKのGoogleプロバイダー
import { z } from "zod"

// APIキーを環境変数から取得
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY

if (!GOOGLE_API_KEY) {
  console.warn("GOOGLE_GENERATIVE_AI_API_KEY is not set. API calls will likely fail.")
}

// LLMに生成させたいデータ構造をZodスキーマで定義（簡略化版）
// より短いレスポンスを生成するため、describe()を最小限に
const CoverDataSchema = z.object({
  documentType: z.string(),
  confidentialityLevel: z.string(),
  mainTitle: z.string(),
  subtitle: z.string(),
  metric1Value: z.string(),
  metric1Label: z.string(),
  metric2Value: z.string(),
  metric2Label: z.string(),
  metric3Value: z.string(),
  metric3Label: z.string(),
  author: z.string(),
  date: z.string(),
})

const AgendaItemSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const InsightItemSchema = z.object({
  title: z.string(),
  content: z.string(),
})

const AgendaDataSchema = z.object({
  agendaTitle: z.string().default("議事"),
  agendaSubtitle: z.string().default("本日"),
  agendaItems: z.array(AgendaItemSchema).length(3), // 3個固定
  insightsTitle: z.string().default("洞察"),
  insights: z.array(InsightItemSchema).length(1), // 1個固定
})

const ChartDatasetSchema = z.object({
  label: z.string(),
  data: z.array(z.number()),
})

const ChartDataSchema = z.object({
  labels: z.array(z.string()).max(6), // 最大6個に制限
  datasets: z.array(ChartDatasetSchema).length(1), // 1つに固定
})

const InsightDetailSchema = z.object({
  title: z.string(),
  content: z.string(),
})

const DetailDataASchema = z.object({
  pageTitle: z.string(),
  pageLabel: z.string(),
  chartTitle: z.string(),
  chartData: ChartDataSchema,
  chartCaption: z.string(),
  analysisTitle: z.string(),
  insights: z.array(InsightDetailSchema).length(1), // 1個固定
})

const ThankYouDataSchema = z.object({
  thanksCategory: z.string(),
  thanksEmoji: z.string(),
  thanksTitle: z.string(),
  thanksSubtitle: z.string(),
  nextStepsTitle: z.string(),
  nextSteps: z.array(z.string()).length(1), // 1個固定
  contactTitle: z.string(),
  contactName: z.string(),
  contactRole: z.string(),
  contactEmail: z.string(),
  thanksMessage: z.string(),
  author: z.string(),
  date: z.string(),
})

const PresentationDataSchema = z.object({
  coverData: CoverDataSchema,
  agendaData: AgendaDataSchema,
  detailDataA: DetailDataASchema, // MVPでは1つの詳細スライドパターンのみ
  thankYouData: ThankYouDataSchema,
})

// 日付を令和形式に変換する関数
function formatDateToJapaneseEra(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 令和元年は2019年5月1日から
  const reiwaYear = year - 2018
  
  return `令和${reiwaYear}年${month}月${day}日`
}

export async function POST(req: Request) {
  if (!GOOGLE_API_KEY) {
    return NextResponse.json({ error: "APIキーが設定されていません。管理者にお問い合わせください。" }, { status: 500 })
  }

  try {
    const { customerInfo, contextInfo, infoSources, presentationTitle, model: modelName } = await req.json()

    // リクエストのログ出力（デバッグ用）
    console.log("Request received:", {
      customerInfo,
      contextInfo,
      presentationTitle,
      modelName,
      sourcesCount: infoSources?.length || 0
    })

    if (!presentationTitle) {
      return NextResponse.json({ error: "プレゼンテーションタイトルは必須です。" }, { status: 400 })
    }

    // Geminiモデルのインスタンス化
    const model = google(modelName || "gemini-2.5-flash-preview-05-20", { apiKey: GOOGLE_API_KEY })
    
    // 現在の日付を令和形式で取得
    const currentDate = formatDateToJapaneseEra(new Date())

    // プロンプトの組み立て
    const sourcesText = infoSources
      .map((s: { label: string; content: string }) => `[${s.label}]:\n${s.content}`)
      .join("\n\n")
    const prompt = `
あなたはプロフェッショナルなコンサルティング品質のプレゼンテーション作成の専門家です。
入力された情報に基づいて、適切なプレゼンテーションデータをJSON形式で生成してください。

基本情報:
- タイトル: ${presentationTitle}
- 顧客: ${customerInfo || "顧客名"}
- 概要: ${contextInfo || "プレゼンテーション概要"}
- 情報ソース: ${sourcesText}

以下の4つのスライドデータを生成してください:

1. coverData（表紙）: 
   - documentType: 文書の種別（提案書、報告書、勉強会資料など）
   - confidentialityLevel: 機密レベル（社外秘、厳秘、公開など）
   - mainTitle: メインタイトル（入力されたタイトルを使用）
   - subtitle: サブタイトル（顧客名を含む）
   - metric1Value, metric1Label: 関連する重要指標1
   - metric2Value, metric2Label: 関連する重要指標2
   - metric3Value, metric3Label: 関連する重要指標3
   - author: 適切な著者名または組織名
   - date: "${currentDate}"

2. agendaData（議事次第）:
   - agendaTitle: "議事次第"
   - agendaSubtitle: "本日の内容"
   - agendaItems: 3つの議題（各項目にtitleとdescription）
   - insightsTitle: "重要ポイント"
   - insights: 1つの重要な洞察（titleとcontent）

3. detailDataA（詳細分析）:
   - pageTitle: 詳細ページのタイトル
   - pageLabel: ページラベル
   - chartTitle: グラフのタイトル
   - chartData: 
     - labels: 6個のラベル
     - datasets: [{label: "データ名", data: [6個の数値]}]
   - chartCaption: グラフの説明文
   - analysisTitle: "分析と考察"
   - insights: 1つの洞察（titleとcontent）

4. thankYouData（締めくくり）:
   - thanksCategory: 文書カテゴリ
   - thanksEmoji: 適切な絵文字
   - thanksTitle: "ご清聴ありがとうございました"
   - thanksSubtitle: 締めの言葉
   - nextStepsTitle: "次のステップ"
   - nextSteps: ["次のアクション"]（1つ）
   - contactTitle: "お問い合わせ"
   - contactName: 担当者名
   - contactRole: 役職
   - contactEmail: contact@example.com
   - thanksMessage: 感謝のメッセージ
   - author: 適切な著者名または組織名
   - date: "${currentDate}"

注意事項:
- 入力された情報源を活用して、具体的で説得力のある内容を生成
- 各項目は簡潔で分かりやすい表現を使用
- グラフデータは内容に応じた適切な数値を生成
- 全体的に一貫性のある内容となるよう配慮
`

    console.log("Generating presentation with model:", modelName || "gemini-2.5-flash-preview-05-20")
    
    const { object: presentationData } = await generateObject({
      model,
      schema: PresentationDataSchema,
      prompt,
      maxTokens: 4000, // Cloud Runでの安定性を考慮して増やす
      temperature: 0.7, // 生成の柔軟性を確保
    })

    console.log("Presentation generated successfully")
    
    return NextResponse.json({ message: "プレゼンテーション生成成功", data: presentationData }, { status: 200 })
  } catch (error: any) {
    console.error("Error in API route:", error)
    let errorMessage = "プレゼンテーションの生成中に不明なエラーが発生しました。"
    if (error.message) {
      errorMessage = error.message
    }
    // AI SDKのエラーの場合、詳細が含まれていることがある
    if (error.cause && typeof error.cause === "object" && "message" in error.cause) {
      errorMessage += ` (詳細: ${error.cause.message})`
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
