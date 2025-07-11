// ストリーミングデータバッファ管理

import { AudioChunk } from '../types/audio';

// バッファ設定
interface BufferConfig {
  maxSize: number;          // 最大バッファサイズ（バイト）
  chunkSize: number;        // チャンクサイズ（バイト）
  maxAge: number;           // 最大保持時間（ミリ秒）
  overflowStrategy: 'drop-oldest' | 'drop-newest' | 'pause' | 'error';
}

// デフォルト設定
const DEFAULT_BUFFER_CONFIG: BufferConfig = {
  maxSize: 10 * 1024 * 1024,  // 10MB
  chunkSize: 1024,            // 1KB
  maxAge: 30000,              // 30秒
  overflowStrategy: 'drop-oldest'
};

// ストリーミングバッファクラス
export class StreamBuffer {
  private buffer: ArrayBuffer[] = [];
  private timestamps: number[] = [];
  private totalSize: number = 0;
  private config: BufferConfig;
  private listeners: Set<(data: ArrayBuffer) => void> = new Set();

  constructor(config: Partial<BufferConfig> = {}) {
    this.config = { ...DEFAULT_BUFFER_CONFIG, ...config };
  }

  // データの追加
  write(data: ArrayBuffer): boolean {
    const now = Date.now();
    
    // 古いデータのクリーンアップ
    this.cleanupOldData(now);
    
    // オーバーフロー処理
    if (this.totalSize + data.byteLength > this.config.maxSize) {
      if (!this.handleOverflow(data.byteLength)) {
        return false;
      }
    }
    
    // データを追加
    this.buffer.push(data);
    this.timestamps.push(now);
    this.totalSize += data.byteLength;
    
    // リスナーに通知
    this.notifyListeners(data);
    
    return true;
  }

  // データの読み取り（先頭から指定サイズ）
  read(size?: number): ArrayBuffer | null {
    if (this.buffer.length === 0) {
      return null;
    }
    
    if (!size) {
      // サイズ指定なしの場合は全てのデータを結合
      return this.readAll();
    }
    
    const chunks: ArrayBuffer[] = [];
    let currentSize = 0;
    let index = 0;
    
    while (index < this.buffer.length && currentSize < size) {
      const chunk = this.buffer[index];
      const remainingSize = size - currentSize;
      
      if (chunk.byteLength <= remainingSize) {
        // チャンク全体を取得
        chunks.push(chunk);
        currentSize += chunk.byteLength;
        index++;
      } else {
        // チャンクの一部を取得
        const partialChunk = chunk.slice(0, remainingSize);
        chunks.push(partialChunk);
        currentSize += partialChunk.byteLength;
        
        // 残りのチャンクを更新
        const remainingChunk = chunk.slice(remainingSize);
        this.buffer[index] = remainingChunk;
        break;
      }
    }
    
    // 取得したチャンクをバッファから削除
    this.buffer.splice(0, index);
    this.timestamps.splice(0, index);
    this.totalSize -= currentSize;
    
    return this.combineChunks(chunks);
  }

  // 全データの読み取り
  readAll(): ArrayBuffer | null {
    if (this.buffer.length === 0) {
      return null;
    }
    
    const combined = this.combineChunks(this.buffer);
    this.clear();
    
    return combined;
  }

  // データの覗き見（バッファから削除しない）
  peek(size?: number): ArrayBuffer | null {
    if (this.buffer.length === 0) {
      return null;
    }
    
    if (!size) {
      return this.combineChunks(this.buffer);
    }
    
    const chunks: ArrayBuffer[] = [];
    let currentSize = 0;
    let index = 0;
    
    while (index < this.buffer.length && currentSize < size) {
      const chunk = this.buffer[index];
      const remainingSize = size - currentSize;
      
      if (chunk.byteLength <= remainingSize) {
        chunks.push(chunk);
        currentSize += chunk.byteLength;
      } else {
        const partialChunk = chunk.slice(0, remainingSize);
        chunks.push(partialChunk);
        currentSize += partialChunk.byteLength;
        break;
      }
      
      index++;
    }
    
    return this.combineChunks(chunks);
  }

  // バッファのクリア
  clear(): void {
    this.buffer = [];
    this.timestamps = [];
    this.totalSize = 0;
  }

  // バッファ情報の取得
  getInfo(): {
    size: number;
    chunkCount: number;
    maxSize: number;
    utilization: number;
    oldestTimestamp: number | null;
    newestTimestamp: number | null;
  } {
    return {
      size: this.totalSize,
      chunkCount: this.buffer.length,
      maxSize: this.config.maxSize,
      utilization: this.totalSize / this.config.maxSize,
      oldestTimestamp: this.timestamps[0] || null,
      newestTimestamp: this.timestamps[this.timestamps.length - 1] || null
    };
  }

  // データリスナーの追加
  addListener(listener: (data: ArrayBuffer) => void): void {
    this.listeners.add(listener);
  }

  // データリスナーの削除
  removeListener(listener: (data: ArrayBuffer) => void): void {
    this.listeners.delete(listener);
  }

  // プライベートメソッド

  private cleanupOldData(currentTime: number): void {
    const cutoffTime = currentTime - this.config.maxAge;
    let removeCount = 0;
    
    for (let i = 0; i < this.timestamps.length; i++) {
      if (this.timestamps[i] < cutoffTime) {
        this.totalSize -= this.buffer[i].byteLength;
        removeCount++;
      } else {
        break;
      }
    }
    
    if (removeCount > 0) {
      this.buffer.splice(0, removeCount);
      this.timestamps.splice(0, removeCount);
    }
  }

  private handleOverflow(newDataSize: number): boolean {
    switch (this.config.overflowStrategy) {
      case 'drop-oldest':
        // 古いデータを削除して容量を確保
        while (this.totalSize + newDataSize > this.config.maxSize && this.buffer.length > 0) {
          const removedChunk = this.buffer.shift();
          this.timestamps.shift();
          if (removedChunk) {
            this.totalSize -= removedChunk.byteLength;
          }
        }
        return true;
        
      case 'drop-newest':
        // 新しいデータを拒否
        return false;
        
      case 'pause':
        // 一時停止（外部で処理する必要がある）
        return false;
        
      case 'error':
        // エラーを投げる
        throw new Error(`Buffer overflow: ${this.totalSize + newDataSize} > ${this.config.maxSize}`);
        
      default:
        return false;
    }
  }

  private combineChunks(chunks: ArrayBuffer[]): ArrayBuffer {
    if (chunks.length === 0) {
      return new ArrayBuffer(0);
    }
    
    if (chunks.length === 1) {
      return chunks[0];
    }
    
    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const combined = new ArrayBuffer(totalSize);
    const combinedView = new Uint8Array(combined);
    
    let offset = 0;
    for (const chunk of chunks) {
      const chunkView = new Uint8Array(chunk);
      combinedView.set(chunkView, offset);
      offset += chunk.byteLength;
    }
    
    return combined;
  }

  private notifyListeners(data: ArrayBuffer): void {
    for (const listener of this.listeners) {
      try {
        listener(data);
      } catch (error) {
        console.error('Stream buffer listener error:', error);
      }
    }
  }
}

// 音声チャンク用バッファ
export class AudioChunkBuffer {
  private chunks: AudioChunk[] = [];
  private maxChunks: number;
  private maxAge: number;

  constructor(maxChunks: number = 100, maxAge: number = 60000) {
    this.maxChunks = maxChunks;
    this.maxAge = maxAge;
  }

  // チャンクの追加
  addChunk(chunk: AudioChunk): void {
    this.chunks.push(chunk);
    
    // 古いチャンクの削除
    this.cleanup();
    
    // 最大数のチェック
    if (this.chunks.length > this.maxChunks) {
      this.chunks.shift();
    }
  }

  // チャンクの取得
  getChunks(count?: number): AudioChunk[] {
    if (count === undefined) {
      return [...this.chunks];
    }
    
    return this.chunks.slice(-count);
  }

  // 最新のチャンク
  getLatestChunk(): AudioChunk | null {
    return this.chunks[this.chunks.length - 1] || null;
  }

  // 指定時間範囲のチャンク
  getChunksInRange(startTime: number, endTime: number): AudioChunk[] {
    return this.chunks.filter(chunk => 
      chunk.timestamp >= startTime && chunk.timestamp <= endTime
    );
  }

  // 総サイズの計算
  getTotalSize(): number {
    return this.chunks.reduce((sum, chunk) => sum + chunk.data.byteLength, 0);
  }

  // クリア
  clear(): void {
    this.chunks = [];
  }

  private cleanup(): void {
    const now = Date.now();
    const cutoffTime = now - this.maxAge;
    
    this.chunks = this.chunks.filter(chunk => chunk.timestamp > cutoffTime);
  }
}

// ストリーミング統計
export class StreamStats {
  private bytesReceived: number = 0;
  private bytesProcessed: number = 0;
  private startTime: number = Date.now();
  private lastUpdateTime: number = Date.now();
  
  // データの受信を記録
  recordReceived(bytes: number): void {
    this.bytesReceived += bytes;
    this.lastUpdateTime = Date.now();
  }
  
  // データの処理を記録
  recordProcessed(bytes: number): void {
    this.bytesProcessed += bytes;
    this.lastUpdateTime = Date.now();
  }
  
  // 統計の取得
  getStats(): {
    bytesReceived: number;
    bytesProcessed: number;
    duration: number;
    receiveRate: number;
    processRate: number;
    bufferRatio: number;
  } {
    const duration = this.lastUpdateTime - this.startTime;
    const durationSeconds = duration / 1000;
    
    return {
      bytesReceived: this.bytesReceived,
      bytesProcessed: this.bytesProcessed,
      duration,
      receiveRate: durationSeconds > 0 ? this.bytesReceived / durationSeconds : 0,
      processRate: durationSeconds > 0 ? this.bytesProcessed / durationSeconds : 0,
      bufferRatio: this.bytesReceived > 0 ? this.bytesProcessed / this.bytesReceived : 0
    };
  }
  
  // リセット
  reset(): void {
    this.bytesReceived = 0;
    this.bytesProcessed = 0;
    this.startTime = Date.now();
    this.lastUpdateTime = Date.now();
  }
}

// ファクトリー関数
export function createAudioBuffer(config?: Partial<BufferConfig>): StreamBuffer {
  return new StreamBuffer({
    maxSize: 5 * 1024 * 1024,  // 5MB
    chunkSize: 1024,           // 1KB
    maxAge: 30000,             // 30秒
    overflowStrategy: 'drop-oldest',
    ...config
  });
}

export function createTextBuffer(config?: Partial<BufferConfig>): StreamBuffer {
  return new StreamBuffer({
    maxSize: 1024 * 1024,      // 1MB
    chunkSize: 256,            // 256B
    maxAge: 60000,             // 1分
    overflowStrategy: 'drop-oldest',
    ...config
  });
}