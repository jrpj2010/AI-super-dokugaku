export interface SrtEntry {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
  speaker?: string;
  emotion?: string;
}

export function parseSrt(srtContent: string): SrtEntry[] {
  const entries: SrtEntry[] = [];
  const blocks = srtContent.trim().split(/\n\n+/);
  
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;
    
    const id = parseInt(lines[0]);
    const [startTime, endTime] = lines[1].split(' --> ');
    const text = lines.slice(2).join(' ');
    
    // 話者を抽出（「話者名：」のパターン）
    const speakerMatch = text.match(/^([^：:]+)[：:]/);
    let speaker = '';
    let cleanText = text;
    
    if (speakerMatch) {
      speaker = speakerMatch[1].trim();
      cleanText = text.substring(speakerMatch[0].length).trim();
    }
    
    entries.push({
      id,
      startTime,
      endTime,
      text: cleanText,
      speaker
    });
  }
  
  return entries;
}

export function srtToConversation(entries: SrtEntry[]) {
  return entries.map(entry => ({
    speaker: entry.speaker || 'ナレーター',
    text: entry.text,
    emotion: entry.emotion || ''
  }));
}