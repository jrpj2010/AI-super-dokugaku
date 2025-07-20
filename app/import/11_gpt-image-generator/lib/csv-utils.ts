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
      } else if (char === ',' && !inQuotes) {
        // フィールドの区切り
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    // 最後のフィールドを追加
    result.push(current)
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