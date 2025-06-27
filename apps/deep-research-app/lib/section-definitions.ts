export interface SectionDefinition {
  id: string
  title: string
  promptTemplate: string
  maxTokens: number
  priority: number // 実行優先順位
  dependencies?: string[] // 依存する他のセクションID
}

export const sectionDefinitions: SectionDefinition[] = [
  {
    id: 'executive-summary',
    title: 'エグゼクティブサマリー',
    promptTemplate: `
テーマ「{topic}」について、経営コンサルタントとしてエグゼクティブサマリーを作成してください。

## エグゼクティブサマリー

以下の観点を含めて、3-5項目で簡潔にまとめてください：
- 市場の現状と主要な発見事項
- 重要な機会とリスク
- 戦略的推奨事項の概要
- 期待される成果

重要：
- 具体的な数値やデータを含める
- 実際の企業名や製品名を正確に記載（例：ix2500ではなくScanSnap iX1500/iX1600など）
- 2025年6月時点の最新情報を反映
- 引用元がある場合は[1]のような番号を付ける
`,
    maxTokens: 10000,
    priority: 1
  },
  {
    id: 'market-analysis',
    title: '市場環境分析',
    promptTemplate: `
テーマ「{topic}」について、詳細な市場環境分析を行ってください。

## 1. 市場環境分析

### 1.1 市場規模と成長性
- 現在の市場規模（具体的な金額）
- 過去5年間の成長率
- 今後5年間の市場予測
- 地域別の市場動向

### 1.2 主要プレイヤー
主要企業を表形式で整理：
| 企業名 | 市場シェア | 主力製品 | 特徴 |
|--------|-----------|---------|------|
| 例：富士通/PFU | XX% | ScanSnap iXシリーズ | 高速スキャン、クラウド連携 |

### 1.3 技術トレンド
- AI/OCR技術の進化
- クラウド連携の高度化
- モバイル対応の拡充
- セキュリティ機能の強化

重要：製品名や型番は正確に記載すること（ix2500という製品は存在しない可能性があります。最新の製品ラインナップを確認してください）
`,
    maxTokens: 15000,
    priority: 1
  },
  {
    id: 'pest-analysis',
    title: 'PEST分析',
    promptTemplate: `
テーマ「{topic}」についてPEST分析を実施してください。

## 2. PEST分析

### 2.1 政治的要因 (Political)
- デジタル化推進政策
- 個人情報保護法の影響
- 電子帳簿保存法の改正
- 政府のDX推進施策

### 2.2 経済的要因 (Economic)
- 経済成長率とIT投資動向
- 為替レートの影響
- オフィス機器市場の成長性
- コスト削減ニーズ

### 2.3 社会的要因 (Social)
- リモートワークの定着
- ペーパーレス化の進展
- 環境意識の高まり
- 働き方改革の影響

### 2.4 技術的要因 (Technological)
- AI技術の進化
- クラウドサービスの普及
- 5G/6Gの展開
- IoT技術の活用

2025年6月時点の最新動向を反映してください。
`,
    maxTokens: 12000,
    priority: 2
  },
  {
    id: 'swot-analysis',
    title: 'SWOT分析',
    promptTemplate: `
テーマ「{topic}」についてSWOT分析を実施してください。

## 3. SWOT分析

### 3.1 強み (Strengths)
- 製品の技術的優位性
- ブランド認知度
- 販売ネットワーク
- サポート体制

### 3.2 弱み (Weaknesses)
- 価格競争力
- 新規参入への対応
- 技術革新のスピード
- 市場シェアの課題

### 3.3 機会 (Opportunities)
- DX市場の拡大
- 新興国市場の成長
- 新技術の活用可能性
- パートナーシップの機会

### 3.4 脅威 (Threats)
- 競合他社の動向
- 技術の陳腐化リスク
- 市場の成熟化
- 代替ソリューションの登場

具体的な企業名、製品名、数値を含めて分析してください。
`,
    maxTokens: 12000,
    priority: 2
  },
  {
    id: 'competitive-analysis',
    title: '競争環境分析',
    promptTemplate: `
テーマ「{topic}」についてポーターの5つの力による競争環境分析を行ってください。

## 4. 競争環境分析（ポーターの5つの力）

### 4.1 新規参入の脅威
- 参入障壁の高さ
- 必要な投資規模
- 技術的ハードル
- ブランド構築の難易度

### 4.2 代替品の脅威
- スマートフォンアプリ
- クラウドサービス
- 複合機のスキャン機能
- AIベースの新ソリューション

### 4.3 買い手の交渉力
- 顧客の価格感度
- スイッチングコスト
- 購買力の集中度

### 4.4 売り手の交渉力
- 部品サプライヤーの状況
- 技術ライセンスの依存度
- 代替サプライヤーの有無

### 4.5 競合他社との競争
- 主要競合の分析（キヤノン、エプソン、ブラザーなど）
- 差別化要因
- 価格競争の激しさ

2025年の最新の競争状況を反映してください。
`,
    maxTokens: 15000,
    priority: 3
  },
  {
    id: 'strategic-recommendations',
    title: '戦略的推奨事項',
    promptTemplate: `
テーマ「{topic}」について、具体的で実行可能な戦略的推奨事項を提示してください。

## 5. 戦略的推奨事項

### 5.1 短期的施策（1年以内）
1. 製品ラインナップの最適化
2. マーケティング戦略の見直し
3. 販売チャネルの強化
4. 顧客サポートの改善

### 5.2 中期的施策（1-3年）
1. 新技術の導入（AI、IoT）
2. 新市場への参入
3. パートナーシップの構築
4. ビジネスモデルの変革

### 5.3 長期的施策（3年以上）
1. 次世代製品の開発
2. グローバル展開の加速
3. エコシステムの構築
4. 新規事業の創出

各施策について、期待効果、必要リソース、実施スケジュールを明記してください。
`,
    maxTokens: 15000,
    priority: 3,
    dependencies: ['market-analysis', 'swot-analysis']
  },
  {
    id: 'risk-mitigation',
    title: 'リスクと対策',
    promptTemplate: `
テーマ「{topic}」に関する主要リスクとその対策を分析してください。

## 6. リスクと対策

### 6.1 主要リスク

#### 技術リスク
- 技術の陳腐化
- セキュリティ脆弱性
- 互換性の問題

#### 市場リスク
- 需要の減少
- 競合の激化
- 価格下落圧力

#### 事業リスク
- サプライチェーンの混乱
- 人材不足
- 規制変更

### 6.2 リスク軽減策

各リスクに対して：
- 予防措置
- 早期発見の仕組み
- 対応プラン
- 影響最小化策

リスクマトリックスで優先順位を明確化してください。
`,
    maxTokens: 10000,
    priority: 4,
    dependencies: ['swot-analysis', 'competitive-analysis']
  },
  {
    id: 'conclusion',
    title: '結論',
    promptTemplate: `
テーマ「{topic}」についての分析を総括し、結論を述べてください。

## 7. 結論

### 総括
- 市場の現状と将来性
- 主要な機会と課題
- 推奨戦略の要点

### 成功のための重要要因
1. 優先的に取り組むべき施策
2. 必要な組織能力
3. 期待される成果

### 最終提言
経営層への具体的なアクションプラン

---

*このレポートは {date} に作成されました。*
`,
    maxTokens: 8000,
    priority: 5,
    dependencies: ['executive-summary', 'strategic-recommendations']
  },
  {
    id: 'references',
    title: '参考文献',
    promptTemplate: `
これまでの分析で使用した参考文献をまとめてください。

## 参考文献

以下の形式で記載：
[1] タイトル - 出典元（URL）
[2] タイトル - 出典元（URL）
...

注意：
- 実在する信頼できる情報源のみ記載
- 2025年6月時点で最新の情報を優先
- 業界レポート、公式発表、専門誌などを含める
`,
    maxTokens: 5000,
    priority: 5,
    dependencies: ['conclusion']
  }
]

// セクションのバッチ処理グループ
export const sectionBatches = [
  ['executive-summary', 'market-analysis'],           // バッチ1
  ['pest-analysis', 'swot-analysis'],                // バッチ2
  ['competitive-analysis', 'strategic-recommendations'], // バッチ3
  ['risk-mitigation', 'conclusion', 'references']     // バッチ4
]