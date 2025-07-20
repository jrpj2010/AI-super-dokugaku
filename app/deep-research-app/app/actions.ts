'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Gemini APIキーの取得（環境変数から）
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function generateReport(topic: string): Promise<string> {
  if (!genAI) {
    return `
# 設定エラー

Gemini APIキーがサーバー側で設定されていません。

**解決策:**
1. プロジェクトルートにある .env ファイルを確認してください。
2. GEMINI_API_KEY=YOUR_API_KEY の形式でキーが正しく設定されているか確認してください。

*タイムスタンプ: ${new Date().toISOString()}*
`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `
あなたは経営コンサルタントとして、以下のテーマについて詳細な分析レポートを作成してください。

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
- 具体的な数値やデータを可能な限り含める
- 表やリストを活用して読みやすくする
- 専門用語には簡潔な説明を付ける
- 実践的で実行可能な推奨事項を提示する
`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('Report generation error:', error)
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。'
    return `
# レポート生成エラー

レポートの生成中に問題が発生しました。サーバー側のログを確認してください。

**エラー詳細:**
\`\`\`
${errorMessage}
\`\`\`

**考えられる原因:**
- Gemini APIキーが正しく設定されていない。
- Gemini APIの無料利用枠を超過した。
- ネットワーク接続に問題がある。

*タイムスタンプ: ${new Date().toISOString()}*
`
  }
}