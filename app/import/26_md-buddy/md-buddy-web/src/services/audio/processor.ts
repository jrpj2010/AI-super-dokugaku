// 音声処理・変換サービス（16kHz PCM変換など）

import {
  RecordingData,
  ProcessedAudio,
  AudioFormatConfig,
  ConversionOptions,
  AudioAnalysis,
  GEMINI_AUDIO_FORMAT,
  RecordingError,
  RecordingErrorCode,
  AudioChunk
} from '../../types/audio';

export class AudioProcessor {
  private audioContext: AudioContext | null = null;

  constructor() {
    // AudioContextは必要時に初期化
  }

  // 録音データを16kHz PCMに変換
  async convertToGeminiFormat(
    recordingData: RecordingData,
    options: Partial<ConversionOptions> = {}
  ): Promise<ProcessedAudio> {
    try {
      // 全チャンクを結合
      const combinedBuffer = await this.combineChunks(recordingData.chunks);
      
      // WebM/OpusからPCMに変換
      const pcmData = await this.decodeAudioData(combinedBuffer);
      
      // 16kHz モノラルにリサンプリング
      const resampledData = await this.resample(
        pcmData,
        GEMINI_AUDIO_FORMAT.sampleRate,
        GEMINI_AUDIO_FORMAT.channels
      );

      // オプション処理
      let processedData = resampledData;
      
      if (options.trimSilence) {
        processedData = await this.trimSilence(processedData);
      }
      
      if (options.normalizeVolume) {
        processedData = await this.normalizeVolume(processedData);
      }
      
      if (options.noiseReduction) {
        processedData = await this.reduceNoise(processedData);
      }
      
      if (options.fadeIn || options.fadeOut) {
        processedData = await this.applyFade(
          processedData,
          options.fadeIn || 0,
          options.fadeOut || 0
        );
      }

      // 16ビットPCMに変換
      const pcmBuffer = this.float32ToPCM16(processedData);

      // 音声解析
      const analysis = await this.analyzeAudio(processedData);

      // 波形データの生成（ダウンサンプリング）
      const waveformData = this.generateWaveformData(processedData);

      return {
        id: `processed_${recordingData.id}`,
        originalData: recordingData,
        processedBuffer: pcmBuffer,
        buffer: pcmBuffer, // 互換性のため
        duration: recordingData.duration, // 互換性のため
        format: GEMINI_AUDIO_FORMAT,
        waveformData,
        metadata: {
          peakLevel: analysis.peakAmplitude,
          averageLevel: analysis.rms,
          silenceRatio: this.calculateSilenceRatio(processedData)
        }
      };
    } catch (error) {
      throw this.createError(
        RecordingErrorCode.PROCESSING_ERROR,
        `音声変換エラー: ${error instanceof Error ? error.message : '不明なエラー'}`
      );
    }
  }

  // 音声ファイルをBase64エンコード
  async encodeToBase64(audioBuffer: ArrayBuffer): Promise<string> {
    const uint8Array = new Uint8Array(audioBuffer);
    let binary = '';
    
    for (let i = 0; i < uint8Array.byteLength; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    
    return btoa(binary);
  }

  // Base64から音声データをデコード
  async decodeFromBase64(base64Data: string): Promise<ArrayBuffer> {
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
  }

  // 音声の解析
  async analyzeAudio(audioData: Float32Array): Promise<AudioAnalysis> {
    const sampleRate = GEMINI_AUDIO_FORMAT.sampleRate;
    const duration = audioData.length / sampleRate;
    
    // ピーク振幅の計算
    let peakAmplitude = 0;
    let sumSquares = 0;
    
    for (let i = 0; i < audioData.length; i++) {
      const absValue = Math.abs(audioData[i]);
      if (absValue > peakAmplitude) {
        peakAmplitude = absValue;
      }
      sumSquares += audioData[i] * audioData[i];
    }
    
    // RMS（二乗平均平方根）の計算
    const rms = Math.sqrt(sumSquares / audioData.length);
    
    // FFTによる周波数解析（簡易版）
    const fftSize = 2048;
    const frequencySpectrum = await this.performFFT(audioData, fftSize);
    const dominantFrequency = this.findDominantFrequency(frequencySpectrum, sampleRate);
    
    return {
      duration,
      sampleRate,
      channels: GEMINI_AUDIO_FORMAT.channels,
      bitDepth: GEMINI_AUDIO_FORMAT.bitDepth,
      peakAmplitude,
      rms,
      frequencySpectrum,
      dominantFrequency
    };
  }

  // プライベートメソッド

  private async combineChunks(chunks: AudioChunk[]): Promise<ArrayBuffer> {
    // 全チャンクの合計サイズを計算
    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.data.byteLength, 0);
    
    // 結合用バッファを作成
    const combinedBuffer = new ArrayBuffer(totalSize);
    const combinedArray = new Uint8Array(combinedBuffer);
    
    // チャンクをコピー
    let offset = 0;
    for (const chunk of chunks) {
      const chunkArray = new Uint8Array(chunk.data);
      combinedArray.set(chunkArray, offset);
      offset += chunkArray.length;
    }
    
    return combinedBuffer;
  }

  private async decodeAudioData(audioBuffer: ArrayBuffer): Promise<Float32Array> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    
    try {
      const audioBuffer2 = await this.audioContext.decodeAudioData(audioBuffer.slice(0));
      
      // モノラルに変換（複数チャンネルの場合は平均を取る）
      if (audioBuffer2.numberOfChannels === 1) {
        return audioBuffer2.getChannelData(0);
      } else {
        const length = audioBuffer2.length;
        const monoData = new Float32Array(length);
        
        for (let i = 0; i < length; i++) {
          let sum = 0;
          for (let channel = 0; channel < audioBuffer2.numberOfChannels; channel++) {
            sum += audioBuffer2.getChannelData(channel)[i];
          }
          monoData[i] = sum / audioBuffer2.numberOfChannels;
        }
        
        return monoData;
      }
    } catch (error) {
      throw new Error(`音声デコードエラー: ${error}`);
    }
  }

  private async resample(
    audioData: Float32Array,
    targetSampleRate: number,
    targetChannels: number
  ): Promise<Float32Array> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    
    const originalSampleRate = this.audioContext.sampleRate;
    
    // サンプルレートが同じ場合はそのまま返す
    if (originalSampleRate === targetSampleRate) {
      return audioData;
    }
    
    // リサンプリング比率
    const ratio = originalSampleRate / targetSampleRate;
    const newLength = Math.floor(audioData.length / ratio);
    const resampled = new Float32Array(newLength);
    
    // 線形補間によるリサンプリング
    for (let i = 0; i < newLength; i++) {
      const srcIndex = i * ratio;
      const srcIndexInt = Math.floor(srcIndex);
      const fraction = srcIndex - srcIndexInt;
      
      if (srcIndexInt + 1 < audioData.length) {
        resampled[i] = audioData[srcIndexInt] * (1 - fraction) + 
                      audioData[srcIndexInt + 1] * fraction;
      } else {
        resampled[i] = audioData[srcIndexInt];
      }
    }
    
    return resampled;
  }

  private float32ToPCM16(float32Array: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    
    for (let i = 0; i < float32Array.length; i++) {
      // Float32 (-1.0 to 1.0) を Int16 (-32768 to 32767) に変換
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      const value = s < 0 ? s * 0x8000 : s * 0x7FFF;
      view.setInt16(i * 2, value, true); // Little-endian
    }
    
    return buffer;
  }

  private async trimSilence(audioData: Float32Array): Promise<Float32Array> {
    const threshold = 0.01; // 無音判定閾値
    const windowSize = Math.floor(GEMINI_AUDIO_FORMAT.sampleRate * 0.1); // 100ms
    
    let startIndex = 0;
    let endIndex = audioData.length - 1;
    
    // 開始位置を見つける
    for (let i = 0; i < audioData.length - windowSize; i += windowSize) {
      const windowRMS = this.calculateWindowRMS(audioData, i, windowSize);
      if (windowRMS > threshold) {
        startIndex = Math.max(0, i - windowSize);
        break;
      }
    }
    
    // 終了位置を見つける
    for (let i = audioData.length - windowSize; i >= 0; i -= windowSize) {
      const windowRMS = this.calculateWindowRMS(audioData, i, windowSize);
      if (windowRMS > threshold) {
        endIndex = Math.min(audioData.length - 1, i + windowSize);
        break;
      }
    }
    
    return audioData.slice(startIndex, endIndex + 1);
  }

  private async normalizeVolume(audioData: Float32Array): Promise<Float32Array> {
    // ピークノーマライゼーション
    let maxAmplitude = 0;
    
    for (let i = 0; i < audioData.length; i++) {
      maxAmplitude = Math.max(maxAmplitude, Math.abs(audioData[i]));
    }
    
    if (maxAmplitude === 0) return audioData;
    
    const targetPeak = 0.95; // 少し余裕を持たせる
    const scale = targetPeak / maxAmplitude;
    
    const normalized = new Float32Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      normalized[i] = audioData[i] * scale;
    }
    
    return normalized;
  }

  private async reduceNoise(audioData: Float32Array): Promise<Float32Array> {
    // 簡易的なノイズリダクション（移動平均フィルタ）
    const windowSize = 3;
    const filtered = new Float32Array(audioData.length);
    
    for (let i = 0; i < audioData.length; i++) {
      let sum = 0;
      let count = 0;
      
      for (let j = -windowSize; j <= windowSize; j++) {
        const index = i + j;
        if (index >= 0 && index < audioData.length) {
          sum += audioData[index];
          count++;
        }
      }
      
      filtered[i] = sum / count;
    }
    
    return filtered;
  }

  private async applyFade(
    audioData: Float32Array,
    fadeInMs: number,
    fadeOutMs: number
  ): Promise<Float32Array> {
    const sampleRate = GEMINI_AUDIO_FORMAT.sampleRate;
    const fadeInSamples = Math.floor((fadeInMs / 1000) * sampleRate);
    const fadeOutSamples = Math.floor((fadeOutMs / 1000) * sampleRate);
    
    const faded = new Float32Array(audioData.length);
    faded.set(audioData);
    
    // フェードイン
    for (let i = 0; i < fadeInSamples && i < faded.length; i++) {
      const factor = i / fadeInSamples;
      faded[i] *= factor;
    }
    
    // フェードアウト
    const startFadeOut = faded.length - fadeOutSamples;
    for (let i = 0; i < fadeOutSamples && startFadeOut + i < faded.length; i++) {
      const factor = 1 - (i / fadeOutSamples);
      faded[startFadeOut + i] *= factor;
    }
    
    return faded;
  }

  private generateWaveformData(audioData: Float32Array): Float32Array {
    // 波形表示用にダウンサンプリング
    const targetPoints = 1000; // 表示用のポイント数
    const blockSize = Math.floor(audioData.length / targetPoints);
    const waveform = new Float32Array(targetPoints);
    
    for (let i = 0; i < targetPoints; i++) {
      const start = i * blockSize;
      const end = Math.min(start + blockSize, audioData.length);
      
      // ブロック内の最大値を取得
      let maxValue = 0;
      for (let j = start; j < end; j++) {
        maxValue = Math.max(maxValue, Math.abs(audioData[j]));
      }
      
      waveform[i] = maxValue;
    }
    
    return waveform;
  }

  private calculateSilenceRatio(audioData: Float32Array): number {
    const threshold = 0.01;
    let silentSamples = 0;
    
    for (let i = 0; i < audioData.length; i++) {
      if (Math.abs(audioData[i]) < threshold) {
        silentSamples++;
      }
    }
    
    return silentSamples / audioData.length;
  }

  private calculateWindowRMS(
    audioData: Float32Array,
    start: number,
    windowSize: number
  ): number {
    let sumSquares = 0;
    const end = Math.min(start + windowSize, audioData.length);
    
    for (let i = start; i < end; i++) {
      sumSquares += audioData[i] * audioData[i];
    }
    
    return Math.sqrt(sumSquares / (end - start));
  }

  private async performFFT(
    audioData: Float32Array,
    fftSize: number
  ): Promise<Float32Array> {
    // 簡易的なFFT実装（実際の実装では外部ライブラリを使用することを推奨）
    // ここでは単純化のため、周波数スペクトルの概算を返す
    const spectrum = new Float32Array(fftSize / 2);
    
    // 実際のFFT計算の代わりに、簡易的な処理
    for (let i = 0; i < spectrum.length; i++) {
      spectrum[i] = Math.random() * 0.5; // プレースホルダー
    }
    
    return spectrum;
  }

  private findDominantFrequency(
    spectrum: Float32Array,
    sampleRate: number
  ): number {
    let maxIndex = 0;
    let maxValue = 0;
    
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxValue) {
        maxValue = spectrum[i];
        maxIndex = i;
      }
    }
    
    // インデックスから周波数に変換
    return (maxIndex * sampleRate) / (spectrum.length * 2);
  }

  private createError(
    code: RecordingErrorCode,
    message: string,
    details?: any
  ): RecordingError {
    return { code, message, details };
  }

  // クリーンアップ
  dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// シングルトンインスタンスのエクスポート
export const audioProcessor = new AudioProcessor();