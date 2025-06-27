import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null

export async function POST(request: NextRequest) {
  if (!genAI) {
    return NextResponse.json(
      { 
        error: 'Gemini APIキーがサーバー側で設定されていません。' 
      },
      { status: 500 }
    )
  }

  try {
    const { topic } = await request.json()
    if (!topic) {
      return NextResponse.json({ error: 'トピックが指定されていません。' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `
あなたは経営コンサルタントとして、以下のテーマについて詳細な分析レポートを作成してください。

重要な指示：
1. 情報源を引用する際は、文末に [1]、[2] のような番号を付けてください
2. 各引用番号は、実際のウェブサイト、報告書、統計データなどに対応させてください
3. 推測や一般的な知識の場合は引用番号を付けないでください
4. レポートの最後に「## 参考文献」セクションを設け、以下の形式で記載してください：
   [1] 記事タイトル - 出典元（URL）
   [2] 記事タイトル - 出典元（URL）

テーマ: ${topic}

以下の構成で、マークダウン形式のレポートを作成してください：

# ${topic}に関する分析レポート

## エグゼクティブサマリー
（主要な発見事項と推奨事項を3-5項目で簡潔にまとめる）

## 1. 市場環境分析

### 1.1 市場規模と成長性
（現在の市場規模、成長率、将来予測を数値を交えて分析）

### 1.2 主要プレイヤー
（主要企業とその市場シェア、特徴を表形式で整理）

### 1.3 技術トレンド
（関連する技術革新や業界トレンドを箇条書きで）

## 2. PEST分析

### 2.1 政治的要因 (Political)
### 2.2 経済的要因 (Economic)
### 2.3 社会的要因 (Social)
### 2.4 技術的要因 (Technological)

## 3. SWOT分析

### 3.1 強み (Strengths)
### 3.2 弱み (Weaknesses)
### 3.3 機会 (Opportunities)
### 3.4 脅威 (Threats)

## 4. 競争環境分析（ポーターの5つの力）

### 4.1 新規参入の脅威
### 4.2 代替品の脅威
### 4.3 買い手の交渉力
### 4.4 売り手の交渉力
### 4.5 競合他社との競争

## 5. 戦略的推奨事項

### 5.1 短期的施策（1年以内）
### 5.2 中期的施策（1-3年）
### 5.3 長期的施策（3年以上）

## 6. リスクと対策

### 6.1 主要リスク
### 6.2 リスク軽減策

## 7. 結論

---

*このレポートは ${new Date().toLocaleDateString('ja-JP')} に作成されました。*

注意事項：
- 具体的な数値やデータを可能な限り含め、その出典（企業名、調査機関、発表年など）を併記する
- 表やリストを活用して読みやすくする
- 専門用語には簡潔な説明を付ける
- 実践的で実行可能な推奨事項を提示する
- 各セクションで使用した参考情報の出典を明記する
- 推測や一般論の場合は「推定」「一般的に」などの表現を使って明確化する

## 参考文献
（各引用番号に対応する出典を以下の形式で記載）
[番号] タイトル - 出典元（URL）
`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // 参考文献を抽出
    const references = []
    const refSection = text.match(/## 参考文献[\s\S]*$/m)
    if (refSection) {
      const refLines = refSection[0].split('\n').slice(1)
      for (const line of refLines) {
        const match = line.match(/\[(\d+)\]\s*(.+?)\s*-\s*(.+?)(?:\s*\((https?:\/\/[^\s)]+)\))?/)
        if (match) {
          references.push({
            number: parseInt(match[1]),
            title: match[2].trim(),
            source: match[3].trim(),
            url: match[4] || ''
          })
        }
      }
    }

    return NextResponse.json({ report: text, references })

  } catch (error) {
    console.error('Report generation error:', error)
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。'
    return NextResponse.json(
      { 
        error: 'レポート生成中にサーバーでエラーが発生しました。',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
