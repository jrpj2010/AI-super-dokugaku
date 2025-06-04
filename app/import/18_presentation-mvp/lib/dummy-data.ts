// Dummy data for presentation slides

export interface CoverData {
  documentType: string
  confidentialityLevel: string
  mainTitle: string
  subtitle: string
  metric1Value: string
  metric1Label: string
  metric2Value: string
  metric2Label: string
  metric3Value: string
  metric3Label: string
  author: string
  date: string
}

export const dummyCoverData: CoverData = {
  documentType: "事業計画書",
  confidentialityLevel: "部外秘",
  mainTitle: "伝統と革新の融合 (ダミー)",
  subtitle: "新時代のジャパニーズモダン・ブランド戦略 (ダミー)",
  metric1Value: "200%",
  metric1Label: "目標顧客層認知度",
  metric2Value: "1.5億円",
  metric2Label: "初年度売上目標",
  metric3Value: "12ヶ月",
  metric3Label: "ブランド展開計画",
  author: "株式会社 明治モダン企画",
  date: "令和七年六月五日", // Japanese date format
}

export interface AgendaItem {
  title: string
  description: string
}

export interface InsightItem {
  title: string
  content: string
}

export interface AgendaData {
  agendaTitle: string
  agendaSubtitle: string
  agendaItems: AgendaItem[]
  insightsTitle: string
  insights: InsightItem[]
}

export const dummyAgendaData: AgendaData = {
  agendaTitle: "御提案内容 (ダミー)",
  agendaSubtitle: "本日の協議事項",
  agendaItems: [
    { title: "市場背景と機会", description: "現代における伝統美への再評価と、新たな市場機会について考察します。" },
    {
      title: "ブランドコンセプト",
      description: "「明治スタイル」を基調とした、現代に響くブランドの世界観を定義します。",
    },
    {
      title: "展開戦略と目標",
      description: "具体的な商品展開、マーケティング戦略、および事業目標についてご説明します。",
    },
  ],
  insightsTitle: "着眼点",
  insights: [
    { title: "本物の価値の追求", content: "上質な素材と職人技による、長く愛される製品開発が鍵となります。" },
    { title: "物語性の重視", content: "ブランド背景にある歴史や文化をストーリーとして伝え、共感を醸成します。" },
    { title: "国内外への発信", content: "国内市場での確固たる地位確立と、海外市場への戦略的展開を両立します。" },
  ],
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[] // Optional for LLM flexibility
    borderColor?: string | string[] // Optional
    borderWidth?: number
    borderRadius?: number
  }[]
}

export interface InsightDetail {
  icon?: "info" | "checkCircle" | "alertCircle" | string
  iconBgClass?: string
  title: string
  titleColorClass?: string
  content: string
  label?: string
  labelBgClass?: string
  labelTextColorClass?: string
  borderColorClass?: string
}

export interface DetailDataA {
  pageTitle: string
  pageLabel: string
  chartTitle: string
  chartIndicatorIcon?: "trendingUp" | "activity" | "barChart3" | string
  chartData: ChartData
  chartCaption: string
  analysisTitle: string
  insights: InsightDetail[]
}

export const dummyDetailDataA: DetailDataA = {
  pageTitle: "市場分析：顧客関心度 (ダミー)",
  pageLabel: "市場調査",
  chartTitle: "関連キーワード検索数推移",
  chartIndicatorIcon: "trendingUp",
  chartData: {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
      {
        label: "検索ボリューム",
        data: [320, 350, 330, 370, 480, 510], // Reduced values for dummy
        backgroundColor: "rgba(140, 39, 76, 0.7)",
        borderColor: "rgba(140, 39, 76, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  },
  chartCaption: "過去6ヶ月間の主要キーワード検索ボリューム（月間）",
  analysisTitle: "分析結果と考察",
  insights: [
    {
      icon: "info",
      title: "関心の高まり",
      content: "「和モダン」「明治ロマン」等のキーワード検索数が顕著に増加傾向にあります。",
      label: "市場トレンド",
      borderColorClass: "border-wine-red",
      iconBgClass: "bg-wine-red/10",
      titleColorClass: "text-wine-red",
      labelBgClass: "bg-wine-red/10",
      labelTextColorClass: "text-wine-red",
    },
    {
      icon: "checkCircle",
      title: "ターゲット層の明確化",
      content: "特に30代～40代の女性層において、高品質な和テイスト製品への関心が高いことが示唆されます。",
      label: "顧客インサイト",
      borderColorClass: "border-accent-green",
      iconBgClass: "bg-accent-green/10",
      titleColorClass: "text-accent-green-dark",
      labelBgClass: "bg-accent-green/10",
      labelTextColorClass: "text-accent-green-dark",
    },
    {
      icon: "alertCircle",
      title: "競合の動向",
      content: "類似コンセプトの小規模ブランドが散見されるものの、市場リーダーは不在の状況です。",
      label: "競争環境",
      borderColorClass: "border-accent-yellow",
      iconBgClass: "bg-accent-yellow/10",
      titleColorClass: "text-accent-yellow-dark",
      labelBgClass: "bg-accent-yellow/10",
      labelTextColorClass: "text-accent-yellow-dark",
    },
  ],
}

export interface ThankYouData {
  thanksCategory: string
  thanksEmoji: string
  thanksTitle: string
  thanksSubtitle: string
  nextStepsTitle: string
  nextSteps: string[]
  contactTitle: string
  contactName: string
  contactRole: string
  contactEmail: string
  contactPhone?: string // Optional
  thanksMessage: string
  author: string
  date: string
}

export const dummyThankYouData: ThankYouData = {
  thanksCategory: "御礼",
  thanksEmoji: "🌸",
  thanksTitle: "御清聴誠に有難う御座いました (ダミー)",
  thanksSubtitle: "本提案が貴社の一助となれば幸いです。ご質問等、何なりとお申し付けください。",
  nextStepsTitle: "今後の進め方",
  nextSteps: ["本日の議事録と資料の送付", "詳細ヒアリングのお願い（担当部門様）", "具体的な事業計画案の策定と再提案"],
  contactTitle: "連絡先",
  contactName: "企画営業部",
  contactRole: "株式会社 明治モダン企画",
  contactEmail: "info@example-meiji.com",
  contactPhone: "03-1234-5678",
  thanksMessage: "今後ともご指導ご鞭撻のほど、宜しくお願い申し上げます。",
  author: "株式会社 明治モダン企画",
  date: "令和七年六月五日",
}
