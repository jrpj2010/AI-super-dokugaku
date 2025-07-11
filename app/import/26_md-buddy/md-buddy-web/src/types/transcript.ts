// トランスクリプト関連の型定義

export interface TranscriptSegment {
  id: string;
  text: string;
  startTime: number; // 秒単位
  endTime: number;   // 秒単位
  confidence?: number;
  isFinal: boolean;
  speaker?: string;  // 話者情報（将来の拡張用）
}

export interface TranscriptData {
  segments: TranscriptSegment[];
  totalDuration: number;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

// SRT字幕フォーマット用
export interface SRTEntry {
  index: number;
  startTime: string; // "00:00:01,500" format
  endTime: string;
  text: string;
}

// 音声録音セッション
export interface RecordingSession {
  id: string;
  audioBlob?: Blob;
  audioUrl?: string;
  transcript: TranscriptData;
  markdown?: string;
  srt?: string;
  createdAt: Date;
}