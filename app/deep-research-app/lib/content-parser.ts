import { ReportSection } from './report-structure'

export interface ParsedSection {
  id: string
  title: string
  content: string
  subsections?: ParsedSection[]
}

export function parseReportContent(content: string, reportStructure: ReportSection[]): Map<string, string> {
  const sectionContentMap = new Map<string, string>()
  
  if (!content) return sectionContentMap
  
  // コンテンツを行ごとに分割
  const lines = content.split('\n')
  let currentSectionId = ''
  let currentContent: string[] = []
  let currentLevel = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // ヘッダーを検出
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headerMatch) {
      const level = headerMatch[1].length
      const title = headerMatch[2].trim()
      
      // 前のセクションのコンテンツを保存
      if (currentSectionId && currentContent.length > 0) {
        sectionContentMap.set(currentSectionId, currentContent.join('\n').trim())
      }
      
      // 新しいセクションを開始
      const matchedSection = findSectionByTitle(title, reportStructure)
      if (matchedSection) {
        currentSectionId = matchedSection.id
        currentContent = [line] // ヘッダーも含める
        currentLevel = level
      } else {
        // マッチしないヘッダーも現在のセクションに追加
        currentContent.push(line)
      }
    } else {
      // ヘッダー以外の行は現在のセクションに追加
      currentContent.push(line)
    }
  }
  
  // 最後のセクションのコンテンツを保存
  if (currentSectionId && currentContent.length > 0) {
    sectionContentMap.set(currentSectionId, currentContent.join('\n').trim())
  }
  
  // エグゼクティブサマリーを特別処理（タイトルが完全一致しない場合があるため）
  if (!sectionContentMap.has('executive-summary')) {
    const execSummaryMatch = content.match(/##\s*エグゼクティブサマリー[\s\S]*?(?=##\s*\d+\.|$)/m)
    if (execSummaryMatch) {
      sectionContentMap.set('executive-summary', execSummaryMatch[0].trim())
    }
  }
  
  return sectionContentMap
}

function findSectionByTitle(title: string, sections: ReportSection[]): ReportSection | null {
  // タイトルの正規化（番号や記号を除去）
  const normalizedTitle = title
    .replace(/^\d+\.?\s*/, '') // 先頭の番号を除去
    .replace(/[（(].*?[）)]/g, '') // 括弧内を除去
    .trim()
  
  for (const section of sections) {
    // セクションタイトルも正規化
    const normalizedSectionTitle = section.title
      .replace(/^\d+\.?\s*/, '')
      .replace(/[（(].*?[）)]/g, '')
      .trim()
    
    if (normalizedSectionTitle === normalizedTitle || 
        title.includes(section.title) || 
        section.title.includes(normalizedTitle)) {
      return section
    }
    
    // サブセクションも検索
    if (section.subsections) {
      const subsection = findSectionByTitle(title, section.subsections)
      if (subsection) return subsection
    }
  }
  
  return null
}

// セクション内のコンテンツを整形する関数
export function formatSectionContent(content: string): string {
  if (!content) return ''
  
  // 最初のヘッダーを除去（既にセクションタイトルとして表示されるため）
  const withoutFirstHeader = content.replace(/^#{1,6}\s+.+\n?/, '')
  
  return withoutFirstHeader.trim()
}