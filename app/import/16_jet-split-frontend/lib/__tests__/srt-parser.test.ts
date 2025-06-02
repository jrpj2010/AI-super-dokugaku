// SRTパーサーのテスト
import { parseSRT } from '../srt-parser';

// パーサー関数を抽出（実際のコードから）
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

describe('SRTパーサー', () => {
  test('正常なSRTファイルをパースできる', () => {
    const srtContent = `1
00:00:00,000 --> 00:00:05,000
これは最初の字幕です

2
00:00:05,000 --> 00:00:10,000
これは2番目の字幕です`;

    const result = parseSRT(srtContent);
    
    expect(result.text).toBe('これは最初の字幕です\nこれは2番目の字幕です');
    expect(result.timestamps).toHaveLength(2);
    expect(result.timestamps[0]).toEqual({
      start: '00:00:00.000',
      end: '00:00:05.000'
    });
  });

  test('複数行の字幕テキストを正しく処理できる', () => {
    const srtContent = `1
00:00:00,000 --> 00:00:05,000
これは最初の行です
これは2行目です
これは3行目です`;

    const result = parseSRT(srtContent);
    
    expect(result.text).toBe('これは最初の行です これは2行目です これは3行目です');
    expect(result.timestamps).toHaveLength(1);
  });

  test('空のSRTファイルを処理できる', () => {
    const result = parseSRT('');
    
    expect(result.text).toBe('');
    expect(result.timestamps).toHaveLength(0);
  });

  test('不正なタイムコード形式をスキップする', () => {
    const srtContent = `1
00:00:00 -> 00:00:05
これはスキップされます

2
00:00:05,000 --> 00:00:10,000
これは正常に処理されます`;

    const result = parseSRT(srtContent);
    
    expect(result.text).toBe('これは正常に処理されます');
    expect(result.timestamps).toHaveLength(1);
  });

  test('UTF-8の日本語を正しく処理できる', () => {
    const srtContent = `1
00:00:00,000 --> 00:00:05,000
日本語の字幕：漢字、ひらがな、カタカナ、🎬絵文字`;

    const result = parseSRT(srtContent);
    
    expect(result.text).toBe('日本語の字幕：漢字、ひらがな、カタカナ、🎬絵文字');
  });
});