export interface ParsedCSV {
  headers: string[]
  rows: string[][]
}

export function parseCSV(csvText: string): ParsedCSV {
  // 改行で分割（複数の改行形式に対応）
  const lines = csvText.trim().split(/\r?\n/)
  
  if (lines.length === 0) {
    return { headers: [], rows: [] }
  }
  
  // 区切り文字を自動検出（タブまたはカンマ）
  const firstLine = lines[0]
  const tabCount = (firstLine.match(/\t/g) || []).length
  const commaCount = (firstLine.match(/,/g) || []).length
  const delimiter = tabCount > commaCount ? '\t' : ','
  
  // CSVのパース（引用符対応版）
  const parseRow = (row: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      const nextChar = row[i + 1]
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // エスケープされた引用符
          current += '"'
          i++ // 次の引用符をスキップ
        } else {
          // 引用符の開始/終了
          inQuotes = !inQuotes
        }
      } else if (char === delimiter && !inQuotes) {
        // フィールドの区切り
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    
    // 最後のフィールドを追加
    result.push(current.trim())
    return result
  }
  
  // ヘッダーを取得
  const headers = parseRow(lines[0])
  
  // データ行を取得（空行をスキップ）
  const rows = lines.slice(1)
    .map(line => parseRow(line))
    .filter(row => row.some(cell => cell.trim() !== ''))
  
  return { headers, rows }
}

export function extractPromptsFromCSV(csv: ParsedCSV, columnIndex: number): string[] {
  return csv.rows
    .map(row => row[columnIndex] || '')
    .filter(prompt => prompt.trim() !== '')
}

// CSVから管理ナンバー、ファイル名、プロンプトを抽出する新しい関数
export interface ExtractedData {
  managementNo: string
  fileName: string
  prompt: string
}

export function extractFullDataFromCSV(csv: ParsedCSV): ExtractedData[] {
  return csv.rows
    .map(row => ({
      managementNo: row[0] || '',  // 第1列: no
      fileName: row[1] || '',       // 第2列: ID
      prompt: row[2] || ''          // 第3列: Prompt_JP
    }))
    .filter(data => 
      // プロンプトが存在し、管理ナンバーまたはファイル名のいずれかが存在する行のみ抽出
      data.prompt.trim() !== '' && 
      (data.managementNo.trim() !== '' || data.fileName.trim() !== '')
    )
}

// CSVフォーマットの検証
export function validateCSVFormat(csv: ParsedCSV): { isValid: boolean; message: string } {
  // ヘッダーの確認（オプション）
  const expectedHeaders = ['no', 'ID', 'Prompt_JP']
  
  if (csv.headers.length > 0 && csv.headers.length >= 3) {
    // ヘッダーがある場合は推奨フォーマットかチェック
    const hasExpectedHeaders = 
      csv.headers[0].toLowerCase().includes('no') &&
      csv.headers[1].toLowerCase().includes('id') &&
      csv.headers[2].toLowerCase().includes('prompt')
    
    if (!hasExpectedHeaders) {
      return {
        isValid: true, // 警告のみで続行可能
        message: 'ヘッダーが推奨フォーマット（no, ID, Prompt_JP）と異なりますが、続行できます。'
      }
    }
  }
  
  // 最低限3列あることを確認
  if (csv.rows.length === 0) {
    return {
      isValid: false,
      message: 'CSVデータが空です。'
    }
  }
  
  const hasValidRows = csv.rows.some(row => row.length >= 3)
  if (!hasValidRows) {
    return {
      isValid: false,
      message: 'CSVは最低3列（no, ID, Prompt_JP）必要です。'
    }
  }
  
  return {
    isValid: true,
    message: ''
  }
}