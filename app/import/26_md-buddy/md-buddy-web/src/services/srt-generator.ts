// SRT字幕ファイル生成サービス
import { TranscriptSegment, SRTEntry } from '../types/transcript';
import { GeminiModel } from '../types/gemini';

// タイムスタンプをSRT形式に変換 (HH:MM:SS,mmm)
export function formatSRTTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${millis.toString().padStart(3, '0')}`;
}

// TranscriptSegmentからSRTエントリを生成
export function segmentsToSRT(segments: TranscriptSegment[]): string {
  const srtEntries: SRTEntry[] = segments.map((segment, index) => ({
    index: index + 1,
    startTime: formatSRTTimestamp(segment.startTime),
    endTime: formatSRTTimestamp(segment.endTime),
    text: segment.text
  }));
  
  return srtEntries.map(entry => 
    `${entry.index}\n${entry.startTime} --> ${entry.endTime}\n${entry.text}\n`
  ).join('\n');
}

// Gemini APIを使用してテキストからSRT字幕を生成
export async function generateSRTFromText(
  text: string,
  duration: number,
  options: {
    model?: GeminiModel;
    maxCharsPerLine?: number;
    maxLinesPerSubtitle?: number;
    minDuration?: number;
    maxDuration?: number;
  } = {}
): Promise<string> {
  const {
    model = GeminiModel.FLASH,
    maxCharsPerLine = 30,
    maxLinesPerSubtitle = 2,
    minDuration = 2,
    maxDuration = 4
  } = options;

  const totalSeconds = Math.floor(duration);
  
  const prompt = `
以下のテキストをSRT字幕形式に変換してください。

制約条件:
- 総再生時間: ${totalSeconds}秒
- 1行あたり最大${maxCharsPerLine}文字
- 1つの字幕は最大${maxLinesPerSubtitle}行
- 各字幕の表示時間は${minDuration}〜${maxDuration}秒
- 自然な文の区切りで分割
- 話者の息継ぎやポーズを考慮
- 読みやすさを重視

出力形式（厳密に以下の形式で出力）:
1
00:00:00,000 --> 00:00:02,500
最初の字幕テキスト

2
00:00:02,500 --> 00:00:05,000
次の字幕テキスト

テキスト:
${text}
`;

  try {
    // Gemini APIを使用してSRT生成
    const { convertTextToMarkdown } = await import('./gemini/markdown-converter');
    const response = await convertTextToMarkdown(prompt, model);
    
    // SRT形式の部分だけを抽出（Markdownコードブロックを除去）
    const srtMatch = response.markdown.match(/```(?:srt)?\n([\s\S]*?)```/);
    if (srtMatch) {
      return srtMatch[1].trim();
    }
    
    // コードブロックがない場合は全体を返す
    return response.markdown.trim();
  } catch (error: any) {
    (window as any).debugLog?.(`SRT生成エラー: ${error.message}`, 'error');
    throw error;
  }
}

// SRTファイルをダウンロード
export function downloadSRT(srtContent: string, fileName: string = 'subtitles.srt') {
  const blob = new Blob([srtContent], { type: 'text/srt;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 音声ファイルをダウンロード
export function downloadAudio(audioBlob: Blob, fileName: string = 'recording.webm') {
  const url = URL.createObjectURL(audioBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Markdownファイルをダウンロード
export function downloadMarkdown(content: string, fileName: string = 'document.md') {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}