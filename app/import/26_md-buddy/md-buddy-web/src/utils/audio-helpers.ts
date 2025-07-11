// 音声処理のユーティリティ関数

import { AudioFormatConfig, GEMINI_AUDIO_FORMAT, ProcessedAudio, RecordingData } from '../types/audio';

// 音声ファイルのMIMEタイプを判定
export function detectAudioMimeType(buffer: ArrayBuffer): string | null {
  const uint8Array = new Uint8Array(buffer);
  
  // WAVファイル: "RIFF" と "WAVE"
  if (uint8Array[0] === 0x52 && uint8Array[1] === 0x49 && 
      uint8Array[2] === 0x46 && uint8Array[3] === 0x46 &&
      uint8Array[8] === 0x57 && uint8Array[9] === 0x41 &&
      uint8Array[10] === 0x56 && uint8Array[11] === 0x45) {
    return 'audio/wav';
  }
  
  // WebM: 0x1A 0x45 0xDF 0xA3
  if (uint8Array[0] === 0x1A && uint8Array[1] === 0x45 &&
      uint8Array[2] === 0xDF && uint8Array[3] === 0xA3) {
    return 'audio/webm';
  }
  
  // OGG: "OggS"
  if (uint8Array[0] === 0x4F && uint8Array[1] === 0x67 &&
      uint8Array[2] === 0x67 && uint8Array[3] === 0x53) {
    return 'audio/ogg';
  }
  
  // MP3: ID3タグまたはFFで始まる
  if ((uint8Array[0] === 0x49 && uint8Array[1] === 0x44 && uint8Array[2] === 0x33) ||
      (uint8Array[0] === 0xFF && (uint8Array[1] & 0xE0) === 0xE0)) {
    return 'audio/mpeg';
  }
  
  // MP4/M4A: ftypを含む
  if (uint8Array[4] === 0x66 && uint8Array[5] === 0x74 &&
      uint8Array[6] === 0x79 && uint8Array[7] === 0x70) {
    return 'audio/mp4';
  }
  
  return null;
}

// 時間フォーマット（秒 → mm:ss）
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 時間フォーマット（秒 → hh:mm:ss）
export function formatLongTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return formatTime(seconds);
}

// ファイルサイズのフォーマット
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// サンプルレートの表示用フォーマット
export function formatSampleRate(sampleRate: number): string {
  if (sampleRate >= 1000) {
    return `${(sampleRate / 1000).toFixed(1)}kHz`;
  }
  return `${sampleRate}Hz`;
}

// 音声データのサイズを計算
export function calculateAudioSize(
  duration: number,
  format: AudioFormatConfig
): number {
  // バイト数 = サンプルレート × 秒数 × チャンネル数 × (ビット深度 / 8)
  return Math.ceil(
    format.sampleRate * duration * format.channels * (format.bitDepth / 8)
  );
}

// 音声レベルを正規化（0-1の範囲に）
export function normalizeAudioLevel(level: number, min: number = 0, max: number = 255): number {
  return Math.max(0, Math.min(1, (level - min) / (max - min)));
}

// デシベル（dB）への変換
export function toDecibels(amplitude: number): number {
  if (amplitude <= 0) return -Infinity;
  return 20 * Math.log10(amplitude);
}

// デシベルから振幅への変換
export function fromDecibels(db: number): number {
  return Math.pow(10, db / 20);
}

// 音声データのピーク検出
export function findPeaks(
  audioData: Float32Array,
  threshold: number = 0.3,
  minDistance: number = 200
): number[] {
  const peaks: number[] = [];
  
  for (let i = 1; i < audioData.length - 1; i++) {
    const current = Math.abs(audioData[i]);
    const prev = Math.abs(audioData[i - 1]);
    const next = Math.abs(audioData[i + 1]);
    
    // ローカルピークの検出
    if (current > prev && current > next && current > threshold) {
      // 最小距離のチェック
      if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDistance) {
        peaks.push(i);
      }
    }
  }
  
  return peaks;
}

// 無音区間の検出
export function detectSilence(
  audioData: Float32Array,
  threshold: number = 0.01,
  minDuration: number = 0.1,
  sampleRate: number = GEMINI_AUDIO_FORMAT.sampleRate
): Array<{ start: number; end: number }> {
  const silenceRegions: Array<{ start: number; end: number }> = [];
  const minSamples = Math.floor(minDuration * sampleRate);
  
  let silenceStart: number | null = null;
  let silenceLength = 0;
  
  for (let i = 0; i < audioData.length; i++) {
    const amplitude = Math.abs(audioData[i]);
    
    if (amplitude < threshold) {
      if (silenceStart === null) {
        silenceStart = i;
      }
      silenceLength++;
    } else {
      if (silenceStart !== null && silenceLength >= minSamples) {
        silenceRegions.push({
          start: silenceStart / sampleRate,
          end: i / sampleRate
        });
      }
      silenceStart = null;
      silenceLength = 0;
    }
  }
  
  // 最後の無音区間
  if (silenceStart !== null && silenceLength >= minSamples) {
    silenceRegions.push({
      start: silenceStart / sampleRate,
      end: audioData.length / sampleRate
    });
  }
  
  return silenceRegions;
}

// エネルギー計算（RMS）
export function calculateRMS(audioData: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < audioData.length; i++) {
    sum += audioData[i] * audioData[i];
  }
  return Math.sqrt(sum / audioData.length);
}

// ゼロクロッシング率の計算
export function calculateZeroCrossingRate(audioData: Float32Array): number {
  let crossings = 0;
  for (let i = 1; i < audioData.length; i++) {
    if ((audioData[i] >= 0 && audioData[i - 1] < 0) ||
        (audioData[i] < 0 && audioData[i - 1] >= 0)) {
      crossings++;
    }
  }
  return crossings / (audioData.length - 1);
}

// 音声データのダウンサンプリング
export function downsample(
  audioData: Float32Array,
  targetLength: number
): Float32Array {
  if (audioData.length <= targetLength) {
    return audioData;
  }
  
  const ratio = audioData.length / targetLength;
  const downsampled = new Float32Array(targetLength);
  
  for (let i = 0; i < targetLength; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.floor((i + 1) * ratio);
    
    // 区間内の最大値を取得
    let max = 0;
    for (let j = start; j < end && j < audioData.length; j++) {
      max = Math.max(max, Math.abs(audioData[j]));
    }
    
    downsampled[i] = max;
  }
  
  return downsampled;
}

// WAVヘッダーの作成
export function createWavHeader(
  dataLength: number,
  format: AudioFormatConfig = GEMINI_AUDIO_FORMAT
): ArrayBuffer {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);
  
  // "RIFF"
  view.setUint8(0, 0x52);
  view.setUint8(1, 0x49);
  view.setUint8(2, 0x46);
  view.setUint8(3, 0x46);
  
  // ファイルサイズ - 8
  view.setUint32(4, dataLength + 36, true);
  
  // "WAVE"
  view.setUint8(8, 0x57);
  view.setUint8(9, 0x41);
  view.setUint8(10, 0x56);
  view.setUint8(11, 0x45);
  
  // "fmt "
  view.setUint8(12, 0x66);
  view.setUint8(13, 0x6D);
  view.setUint8(14, 0x74);
  view.setUint8(15, 0x20);
  
  // fmt チャンクサイズ
  view.setUint32(16, 16, true);
  
  // オーディオフォーマット (1 = PCM)
  view.setUint16(20, 1, true);
  
  // チャンネル数
  view.setUint16(22, format.channels, true);
  
  // サンプルレート
  view.setUint32(24, format.sampleRate, true);
  
  // バイトレート
  const byteRate = format.sampleRate * format.channels * (format.bitDepth / 8);
  view.setUint32(28, byteRate, true);
  
  // ブロックアライン
  view.setUint16(32, format.channels * (format.bitDepth / 8), true);
  
  // ビット深度
  view.setUint16(34, format.bitDepth, true);
  
  // "data"
  view.setUint8(36, 0x64);
  view.setUint8(37, 0x61);
  view.setUint8(38, 0x74);
  view.setUint8(39, 0x61);
  
  // データチャンクサイズ
  view.setUint32(40, dataLength, true);
  
  return buffer;
}

// PCMデータをWAVファイルに変換
export function pcmToWav(pcmData: ArrayBuffer, format: AudioFormatConfig = GEMINI_AUDIO_FORMAT): ArrayBuffer {
  const header = createWavHeader(pcmData.byteLength, format);
  const wav = new ArrayBuffer(header.byteLength + pcmData.byteLength);
  const wavView = new Uint8Array(wav);
  
  wavView.set(new Uint8Array(header), 0);
  wavView.set(new Uint8Array(pcmData), header.byteLength);
  
  return wav;
}

// 録音データから音声ファイルを生成
export async function createAudioFile(
  processedAudio: ProcessedAudio,
  fileName: string = 'recording.wav'
): Promise<File> {
  const wavData = pcmToWav(processedAudio.processedBuffer, processedAudio.format);
  const blob = new Blob([wavData], { type: 'audio/wav' });
  return new File([blob], fileName, { type: 'audio/wav' });
}

// ブラウザのオーディオ再生サポートチェック
export function checkAudioSupport(): {
  webAudioAPI: boolean;
  mediaRecorder: boolean;
  getUserMedia: boolean;
  audioContext: boolean;
} {
  return {
    webAudioAPI: 'AudioContext' in window || 'webkitAudioContext' in window,
    mediaRecorder: 'MediaRecorder' in window,
    getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    audioContext: !!window.AudioContext || !!(window as any).webkitAudioContext
  };
}

// 音声録音の権限チェック
export async function checkMicrophonePermission(): Promise<PermissionState> {
  if (!navigator.permissions || !navigator.permissions.query) {
    // Permissions APIがサポートされていない場合
    return 'prompt';
  }
  
  try {
    const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return result.state;
  } catch (error) {
    // エラーが発生した場合はプロンプト状態として扱う
    return 'prompt';
  }
}

// 音声デバイスの変更を監視
export function watchAudioDevices(callback: (devices: MediaDeviceInfo[]) => void): () => void {
  const handleDeviceChange = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter(device => device.kind === 'audioinput');
    callback(audioInputs);
  };
  
  navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
  
  // 初回実行
  handleDeviceChange();
  
  // クリーンアップ関数を返す
  return () => {
    navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
  };
}