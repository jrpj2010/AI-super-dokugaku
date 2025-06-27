import { sectionBatches, sectionDefinitions } from './section-definitions'

export interface SectionResult {
  sectionId: string
  content: string
  title: string
  summary?: string
  error?: string
}

export interface ProcessingProgress {
  totalSections: number
  completedSections: number
  currentBatch: number
  totalBatches: number
  sectionsInProgress: string[]
}

type ProgressCallback = (progress: ProcessingProgress) => void
type SectionCallback = (result: SectionResult) => void

export class ParallelReportProcessor {
  private results: Map<string, SectionResult> = new Map()
  private progressCallback?: ProgressCallback
  private sectionCallback?: SectionCallback
  
  constructor(
    private topic: string,
    progressCallback?: ProgressCallback,
    sectionCallback?: SectionCallback
  ) {
    this.progressCallback = progressCallback
    this.sectionCallback = sectionCallback
  }

  async processReport(): Promise<Map<string, SectionResult>> {
    const totalSections = sectionDefinitions.length
    let completedSections = 0

    // バッチごとに処理
    for (let batchIndex = 0; batchIndex < sectionBatches.length; batchIndex++) {
      const batch = sectionBatches[batchIndex]
      
      // 進捗を通知
      this.notifyProgress({
        totalSections,
        completedSections,
        currentBatch: batchIndex + 1,
        totalBatches: sectionBatches.length,
        sectionsInProgress: batch
      })

      // バッチ内のセクションを並列処理
      const batchPromises = batch.map(sectionId => 
        this.processSection(sectionId)
      )

      // バッチの完了を待つ
      const batchResults = await Promise.allSettled(batchPromises)
      
      // 結果を処理
      batchResults.forEach((result, index) => {
        const sectionId = batch[index]
        completedSections++
        
        if (result.status === 'fulfilled') {
          this.results.set(sectionId, result.value)
          this.notifySection(result.value)
        } else {
          const errorResult: SectionResult = {
            sectionId,
            content: '',
            title: sectionDefinitions.find(s => s.id === sectionId)?.title || '',
            error: result.reason?.message || 'Unknown error'
          }
          this.results.set(sectionId, errorResult)
          this.notifySection(errorResult)
        }
      })
    }

    return this.results
  }

  private async processSection(sectionId: string): Promise<SectionResult> {
    const sectionDef = sectionDefinitions.find(s => s.id === sectionId)
    if (!sectionDef) {
      throw new Error(`Section definition not found: ${sectionId}`)
    }

    try {
      // 依存セクションの情報を収集
      const previousSections: Record<string, { title: string; summary: string }> = {}
      if (sectionDef.dependencies) {
        sectionDef.dependencies.forEach(depId => {
          const depResult = this.results.get(depId)
          if (depResult && !depResult.error) {
            previousSections[depId] = {
              title: depResult.title,
              summary: this.extractSummary(depResult.content)
            }
          }
        })
      }

      // APIを呼び出してセクションを生成
      const response = await fetch('/api/generate-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: this.topic,
          sectionId,
          previousSections
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // ストリーミングレスポンスを読み取る
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let content = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, { stream: true })
          content += chunk
        }
      }

      // セクションマーカーを除去
      content = content
        .replace(new RegExp(`__SECTION_START__${sectionId}__\\n`), '')
        .replace(new RegExp(`\\n__SECTION_END__${sectionId}__`), '')

      return {
        sectionId,
        content,
        title: sectionDef.title,
        summary: this.extractSummary(content)
      }

    } catch (error) {
      console.error(`Error processing section ${sectionId}:`, error)
      throw error
    }
  }

  private extractSummary(content: string, maxLength: number = 200): string {
    // コンテンツの最初の段落または最初の200文字を要約として使用
    const firstParagraph = content.split('\n\n')[0]
    if (firstParagraph.length <= maxLength) {
      return firstParagraph
    }
    return firstParagraph.substring(0, maxLength) + '...'
  }

  private notifyProgress(progress: ProcessingProgress) {
    if (this.progressCallback) {
      this.progressCallback(progress)
    }
  }

  private notifySection(result: SectionResult) {
    if (this.sectionCallback) {
      this.sectionCallback(result)
    }
  }

  // 品質チェック機能
  async validateResults(): Promise<{
    isValid: boolean
    issues: string[]
  }> {
    const issues: string[] = []

    // 各セクションの完全性をチェック
    for (const [sectionId, result] of this.results) {
      if (result.error) {
        issues.push(`セクション「${result.title}」でエラーが発生しました: ${result.error}`)
        continue
      }

      // コンテンツの長さチェック
      if (result.content.length < 100) {
        issues.push(`セクション「${result.title}」のコンテンツが短すぎます`)
      }

      // トピックとの関連性チェック（簡易版）
      const topicWords = this.topic.toLowerCase().split(/\s+/)
      const contentLower = result.content.toLowerCase()
      const relevanceScore = topicWords.filter(word => 
        contentLower.includes(word)
      ).length / topicWords.length

      if (relevanceScore < 0.3) {
        issues.push(`セクション「${result.title}」がトピック「${this.topic}」との関連性が低い可能性があります`)
      }
    }

    // 必須セクションの存在チェック
    const requiredSections = ['executive-summary', 'conclusion', 'references']
    for (const reqId of requiredSections) {
      const result = this.results.get(reqId)
      if (!result || result.error || !result.content) {
        issues.push(`必須セクション「${reqId}」が不完全です`)
      }
    }

    return {
      isValid: issues.length === 0,
      issues
    }
  }
}