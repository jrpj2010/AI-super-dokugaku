// SRT/字幕ファイルパーサー
// SRT, VTT, TXT形式に対応

export interface SubtitleEntry {
  index: number;
  startTime: number; // ミリ秒
  endTime: number;   // ミリ秒
  text: string;
  speaker?: string;  // 話者識別（推測）
}

export interface ParsedSubtitle {
  entries: SubtitleEntry[];
  format: 'srt' | 'vtt' | 'txt' | 'unknown';
  totalDuration: number;
}

export class SRTParser {
  
  /**
   * ファイル内容を解析してSubtitleEntryの配列に変換
   */
  parseSubtitleFile(content: string, filename: string): ParsedSubtitle {
    const format = this.detectFormat(content, filename);
    
    try {
      switch (format) {
        case 'srt':
          return this.parseSRT(content);
        case 'vtt':
          return this.parseVTT(content);
        case 'txt':
          return this.parsePlainText(content);
        default:
          throw new Error(`サポートされていないファイル形式: ${format}`);
      }
    } catch (error) {
      console.error('字幕ファイルの解析エラー:', error);
      // フォールバック: プレーンテキストとして処理
      return this.parsePlainText(content);
    }
  }

  /**
   * ファイル形式を検出
   */
  private detectFormat(content: string, filename: string): 'srt' | 'vtt' | 'txt' | 'unknown' {
    const extension = filename.toLowerCase().split('.').pop();
    
    // 拡張子による判定
    if (extension === 'srt') return 'srt';
    if (extension === 'vtt') return 'vtt';
    if (extension === 'txt') return 'txt';
    
    // 内容による判定
    if (content.includes('WEBVTT')) return 'vtt';
    if (/^\d+\s*\n\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}/m.test(content)) return 'srt';
    
    return 'txt';
  }

  /**
   * SRT形式の解析
   */
  private parseSRT(content: string): ParsedSubtitle {
    const entries: SubtitleEntry[] = [];
    const blocks = content.trim().split(/\n\s*\n/);
    
    for (const block of blocks) {
      const lines = block.trim().split('\n');
      if (lines.length < 3) continue;
      
      const indexLine = lines[0].trim();
      const timeLine = lines[1].trim();
      const textLines = lines.slice(2);
      
      // インデックス解析
      const index = parseInt(indexLine);
      if (isNaN(index)) continue;
      
      // タイムスタンプ解析
      const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
      if (!timeMatch) continue;
      
      const startTime = this.parseTime(timeMatch[1], timeMatch[2], timeMatch[3], timeMatch[4]);
      const endTime = this.parseTime(timeMatch[5], timeMatch[6], timeMatch[7], timeMatch[8]);
      
      // テキスト結合
      const text = textLines.join(' ').trim();
      if (!text) continue;
      
      // 話者識別
      const speaker = this.identifySpeaker(text);
      
      entries.push({
        index,
        startTime,
        endTime,
        text: this.cleanText(text),
        speaker
      });
    }
    
    const totalDuration = entries.length > 0 ? Math.max(...entries.map(e => e.endTime)) : 0;
    
    return {
      entries,
      format: 'srt',
      totalDuration
    };
  }

  /**
   * VTT形式の解析
   */
  private parseVTT(content: string): ParsedSubtitle {
    const entries: SubtitleEntry[] = [];
    const lines = content.split('\n');
    let index = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // タイムスタンプ行を検出
      const timeMatch = line.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
      if (!timeMatch) continue;
      
      const startTime = this.parseTime(timeMatch[1], timeMatch[2], timeMatch[3], timeMatch[4]);
      const endTime = this.parseTime(timeMatch[5], timeMatch[6], timeMatch[7], timeMatch[8]);
      
      // 次の行からテキストを取得
      const textLines: string[] = [];
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== '') {
        textLines.push(lines[j].trim());
        j++;
      }
      
      const text = textLines.join(' ').trim();
      if (!text) continue;
      
      const speaker = this.identifySpeaker(text);
      
      entries.push({
        index: ++index,
        startTime,
        endTime,
        text: this.cleanText(text),
        speaker
      });
      
      i = j; // 処理済み行をスキップ
    }
    
    const totalDuration = entries.length > 0 ? Math.max(...entries.map(e => e.endTime)) : 0;
    
    return {
      entries,
      format: 'vtt',
      totalDuration
    };
  }

  /**
   * プレーンテキストの解析
   */
  private parsePlainText(content: string): ParsedSubtitle {
    const entries: SubtitleEntry[] = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentTime = 0;
    const averageDuration = 3000; // 1行あたり3秒と仮定
    
    lines.forEach((line, index) => {
      const text = line.trim();
      if (!text) return;
      
      const startTime = currentTime;
      const endTime = currentTime + averageDuration;
      const speaker = this.identifySpeaker(text);
      
      entries.push({
        index: index + 1,
        startTime,
        endTime,
        text: this.cleanText(text),
        speaker
      });
      
      currentTime = endTime;
    });
    
    return {
      entries,
      format: 'txt',
      totalDuration: currentTime
    };
  }

  /**
   * 時間をミリ秒に変換
   */
  private parseTime(hours: string, minutes: string, seconds: string, milliseconds: string): number {
    return parseInt(hours) * 3600000 + 
           parseInt(minutes) * 60000 + 
           parseInt(seconds) * 1000 + 
           parseInt(milliseconds);
  }

  /**
   * 話者識別（簡易版）
   */
  private identifySpeaker(text: string): string {
    // 既存の話者マーカーを検出
    const speakerMatch = text.match(/^(話者\d+|Speaker\s*\d+|[A-Z][a-z]+)[:：]/);
    if (speakerMatch) {
      return speakerMatch[1];
    }
    
    // 文頭の名前パターンを検出
    const nameMatch = text.match(/^([A-Z][a-z]+|[あ-ん]{2,4})[:：]/);
    if (nameMatch) {
      return nameMatch[1];
    }
    
    // 質問文か回答文かで簡易判定
    if (text.includes('？') || text.includes('?') || text.includes('ですか')) {
      return '話者1'; // 質問者
    }
    
    return '話者2'; // 回答者
  }

  /**
   * テキストのクリーニング
   */
  private cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // HTMLタグ除去
      .replace(/\{[^}]*\}/g, '') // VTTスタイル除去
      .replace(/\[[^\]]*\]/g, '') // 注釈除去
      .replace(/\s+/g, ' ') // 連続空白を単一空白に
      .trim();
  }

  /**
   * SubtitleEntryをNode形式に変換
   */
  convertToNodes(parsed: ParsedSubtitle): Array<{id: string, text: string}> {
    return parsed.entries.map((entry, index) => ({
      id: `subtitle-${index}`,
      text: entry.speaker ? `${entry.speaker}：${entry.text}` : entry.text
    }));
  }

  /**
   * サポートされているファイル形式のリスト
   */
  static getSupportedFormats(): string[] {
    return ['.srt', '.vtt', '.txt'];
  }

  /**
   * ファイル形式の説明
   */
  static getFormatDescription(): Record<string, string> {
    return {
      'srt': 'SubRip字幕ファイル（タイムスタンプ付き）',
      'vtt': 'WebVTT字幕ファイル（タイムスタンプ付き）', 
      'txt': 'プレーンテキストファイル（行ごとに分割）'
    };
  }
}