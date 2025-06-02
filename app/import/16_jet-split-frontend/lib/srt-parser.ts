// SRTパーサー関数を独立したモジュールとして抽出
export function parseSRT(content: string): { text: string; timestamps: Array<{ start: string; end: string }> } {
  const blocks = content.trim().split(/\n\n+/)
  const subtitles: string[] = []
  const timestamps: Array<{ start: string; end: string }> = []
  
  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length >= 3) {
      // タイムコードを抽出
      const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/)
      if (timeMatch) {
        timestamps.push({
          start: timeMatch[1].replace(',', '.'),
          end: timeMatch[2].replace(',', '.')
        })
      }
      // 字幕テキストを抽出
      const textLines = lines.slice(2).join(' ')
      subtitles.push(textLines)
    }
  }
  
  return { text: subtitles.join('\n'), timestamps }
}