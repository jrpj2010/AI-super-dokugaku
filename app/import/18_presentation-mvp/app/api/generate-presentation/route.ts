import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google" // Vercel AI SDKのGoogleプロバイダー
import { z } from "zod"

// APIキーを環境変数から取得
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY

if (!GOOGLE_API_KEY) {
  console.warn("GOOGLE_GENERATIVE_AI_API_KEY is not set. API calls will likely fail.")
}

// LLMに生成させたいデータ構造をZodスキーマで定義
// これはdummy-data.tsの型定義と一致させる
const CoverDataSchema = z.object({
  documentType: z.string().describe("例: 事業計画書, 戦略提案書"),
  confidentialityLevel: z.string().describe("例: 社外秘, 部外秘, 公開"),
  mainTitle: z.string().describe("プレゼンテーションのメインタイトル"),
  subtitle: z.string().describe("プレゼンテーションのサブタイトル"),
  metric1Value: z.string().describe("主要指標1の値"),
  metric1Label: z.string().describe("主要指標1のラベル"),
  metric2Value: z.string().describe("主要指標2の値"),
  metric2Label: z.string().describe("主要指標2のラベル"),
  metric3Value: z.string().describe("主要指標3の値"),
  metric3Label: z.string().describe("主要指標3のラベル"),
  author: z.string().describe("作成者名または組織名"),
  date: z.string().describe("作成日 (例: 令和七年六月五日)"),
})

const AgendaItemSchema = z.object({
  title: z.string().describe("アジェンダ項目のタイトル"),
  description: z.string().describe("アジェンダ項目の短い説明"),
})

const InsightItemSchema = z.object({
  title: z.string().describe("洞察のタイトル"),
  content: z.string().describe("洞察の具体的な内容"),
})

const AgendaDataSchema = z.object({
  agendaTitle: z.string().default("アジェンダ").describe("アジェンダスライドのタイトル"),
  agendaSubtitle: z.string().default("本日の議題").describe("アジェンダスライドのサブタイトル"),
  agendaItems: z.array(AgendaItemSchema).min(2).max(5).describe("アジェンダの主要項目 (2-5個)"),
  insightsTitle: z.string().default("重要な洞察").describe("重要な洞察セクションのタイトル"),
  insights: z.array(InsightItemSchema).min(1).max(3).describe("重要な洞察 (1-3個)"),
})

const ChartDatasetSchema = z.object({
  label: z.string().describe("データセットのラベル (例: 売上)"),
  data: z.array(z.number()).describe("数値データの配列"),
  backgroundColor: z.string().optional().describe("背景色 (例: rgba(140, 39, 76, 0.7))"),
  borderColor: z.string().optional().describe("枠線の色 (例: rgba(140, 39, 76, 1))"),
  borderWidth: z.number().optional().default(1),
  borderRadius: z.number().optional().default(4),
})

const ChartDataSchema = z.object({
  labels: z.array(z.string()).describe("グラフのX軸ラベル (例: ['1月', '2月', '3月'])"),
  datasets: z.array(ChartDatasetSchema).min(1).describe("グラフのデータセット"),
})

const InsightDetailSchema = z.object({
  icon: z.enum(["info", "checkCircle", "alertCircle"]).optional().describe("アイコンの種類"),
  iconBgClass: z.string().optional().describe("アイコン背景のTailwindクラス"),
  title: z.string().describe("洞察のタイトル"),
  titleColorClass: z.string().optional().describe("タイトル文字色のTailwindクラス"),
  content: z.string().describe("洞察の具体的な内容"),
  label: z.string().optional().describe("洞察のラベル (例: ポジティブ, 要注意)"),
  labelBgClass: z.string().optional().describe("ラベル背景のTailwindクラス"),
  labelTextColorClass: z.string().optional().describe("ラベル文字色のTailwindクラス"),
  borderColorClass: z.string().optional().describe("左枠線のTailwindクラス"),
})

const DetailDataASchema = z.object({
  pageTitle: z.string().describe("詳細スライドのページタイトル"),
  pageLabel: z.string().describe("ページラベル (例: データ分析)"),
  chartTitle: z.string().describe("グラフエリアのタイトル"),
  chartIndicatorIcon: z.enum(["trendingUp", "activity", "barChart3"]).optional().describe("グラフ指標アイコン"),
  chartData: ChartDataSchema.describe("グラフデータ"),
  chartCaption: z.string().describe("グラフのキャプション"),
  analysisTitle: z.string().describe("分析結果セクションのタイトル"),
  insights: z.array(InsightDetailSchema).min(1).max(4).describe("分析結果の洞察 (1-4個)"),
})

const ThankYouDataSchema = z.object({
  thanksCategory: z.string().default("御礼").describe("サンキュースライドのカテゴリ"),
  thanksEmoji: z.string().default("🌸").describe("絵文字 (例: 🎉, 🌸)"),
  thanksTitle: z.string().default("ご清聴ありがとうございました").describe("サンキュースライドのメインタイトル"),
  thanksSubtitle: z.string().describe("サンキュースライドのサブタイトル"),
  nextStepsTitle: z.string().default("次のステップ").describe("次のステップセクションのタイトル"),
  nextSteps: z.array(z.string()).min(1).max(3).describe("具体的な次のステップ (1-3個)"),
  contactTitle: z.string().default("お問い合わせ").describe("連絡先セクションのタイトル"),
  contactName: z.string().describe("担当者名または部署名"),
  contactRole: z.string().describe("役職または組織名"),
  contactEmail: z.string().email().describe("連絡先メールアドレス"),
  contactPhone: z.string().optional().describe("連絡先電話番号"),
  thanksMessage: z.string().describe("感謝のメッセージ"),
  author: z.string().describe("作成者名または組織名 (表紙と合わせる)"),
  date: z.string().describe("作成日 (表紙と合わせる)"),
})

const PresentationDataSchema = z.object({
  coverData: CoverDataSchema,
  agendaData: AgendaDataSchema,
  detailDataA: DetailDataASchema, // MVPでは1つの詳細スライドパターンのみ
  thankYouData: ThankYouDataSchema,
})

export async function POST(req: Request) {
  if (!GOOGLE_API_KEY) {
    return NextResponse.json({ error: "APIキーが設定されていません。管理者にお問い合わせください。" }, { status: 500 })
  }

  try {
    const { customerInfo, contextInfo, infoSources, presentationTitle, model: modelName } = await req.json()

    if (!presentationTitle) {
      return NextResponse.json({ error: "プレゼンテーションタイトルは必須です。" }, { status: 400 })
    }

    // Geminiモデルのインスタンス化
    const model = google(modelName || "gemini-1.5-flash-latest", { apiKey: GOOGLE_API_KEY })

    // プロンプトの組み立て
    const sourcesText = infoSources
      .map((s: { label: string; content: string }) => `[${s.label}]:\n${s.content}`)
      .join("\n\n")
    const prompt = `
あなたはプロのプレゼンテーション作成アシスタントです。
以下の情報に基づいて、魅力的で説得力のある「明治モダン」スタイルのプレゼンテーション資料のデータをJSON形式で生成してください。
生成するデータは、指定されたZodスキーマに厳密に従う必要があります。
特に、日本語の表現は「明治時代」の格調高い文語調と現代的なビジネス用語を適切に織り交ぜ、洗練された印象にしてください。
日付は和暦（例: 令和七年六月五日）を使用してください。

# プレゼンテーション基本情報
- タイトル: ${presentationTitle}
- 作成者: 株式会社 明治モダン企画 (これは固定でお願いします)
- 日付: ${new Date().toLocaleDateString("ja-JP-u-ca-japanese", { era: "long", year: "numeric", month: "long", day: "numeric" })}

# 対象顧客
${customerInfo || "指定なし"}

# コンテキスト・背景
${contextInfo || "指定なし"}

# 情報ソース
${sourcesText || "指定なし"}

# 生成指示
上記の情報を踏まえ、以下の各スライドのデータを生成してください。
- CoverData: プレゼンテーションの表紙。タイトル、サブタイトル、主要指標などを魅力的に。
- AgendaData: アジェンダ。主要な議題と、それに関連する重要な洞察を提示。
- DetailDataA: 詳細スライド。現状分析や提案内容をグラフとテキストで具体的に説明。グラフデータも適切に生成してください。
- ThankYouData: 謝辞スライド。感謝の言葉、次のステップ、連絡先を記載。

各項目の内容は、与えられた情報を最大限活用し、創造的かつ論理的に構成してください。
特に、DetailDataAのグラフデータ(chartData)は、提示された情報から推測できるような現実的な数値を設定してください。
例えば、市場成長に関する情報があれば、グラフの数値も成長傾向を示すようにしてください。
グラフのラベル(labels)は6つ程度、データセット(datasets)は1つでお願いします。
各テキストフィールドは、具体的で簡潔な内容にしてください。
`

    const { object: presentationData } = await generateObject({
      model,
      schema: PresentationDataSchema,
      prompt,
      maxTokens: modelName === "gemini-1.5-pro-latest" ? 8000 : 4000, // モデルによって調整
      temperature: 0.5, // 少し創造性を抑え、指示に忠実に
    })

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
