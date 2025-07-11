interface Subtitle {
  index: number;
  startTime: number;
  endTime: number;
  text: string;
}

/**
 * SRTファイルを解析して字幕データを返す
 */
export function parseSRT(srtContent: string): Subtitle[] {
  const subtitles: Subtitle[] = [];
  const blocks = srtContent.trim().split(/\n\n+/);
  
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;
    
    const index = parseInt(lines[0]);
    const timeLine = lines[1];
    const text = lines.slice(2).join('\n');
    
    // タイムコードをパース (00:00:00,000 --> 00:00:02,500)
    const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
    if (!timeMatch) continue;
    
    const startTime = 
      parseInt(timeMatch[1]) * 3600 + // hours
      parseInt(timeMatch[2]) * 60 +   // minutes
      parseInt(timeMatch[3]) +         // seconds
      parseInt(timeMatch[4]) / 1000;   // milliseconds
    
    const endTime = 
      parseInt(timeMatch[5]) * 3600 + // hours
      parseInt(timeMatch[6]) * 60 +   // minutes
      parseInt(timeMatch[7]) +         // seconds
      parseInt(timeMatch[8]) / 1000;   // milliseconds
    
    subtitles.push({
      index,
      startTime,
      endTime,
      text
    });
  }
  
  return subtitles;
}

/**
 * 字幕データをSRT形式に変換
 */
export function formatSRT(subtitles: Subtitle[]): string {
  return subtitles.map(sub => {
    const startTime = formatTime(sub.startTime);
    const endTime = formatTime(sub.endTime);
    return `${sub.index}\n${startTime} --> ${endTime}\n${sub.text}`;
  }).join('\n\n');
}

/**
 * 秒数をSRTタイムコード形式に変換
 */
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);
  
  return `${pad(hours)}:${pad(mins)}:${pad(secs)},${pad(millis, 3)}`;
}

function pad(num: number, digits: number = 2): string {
  return num.toString().padStart(digits, '0');
}