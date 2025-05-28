import { getOptimizedConfig } from '@/lib/performance-config'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

export class EmotionCache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private cleanupInterval: NodeJS.Timeout | null = null
  private defaultTTL: number
  
  constructor(defaultTTL?: number) {
    if (!defaultTTL && typeof window !== 'undefined') {
      const config = getOptimizedConfig()
      defaultTTL = config.cache.emotionCacheTTL * 1000
    }
    this.defaultTTL = defaultTTL || 60000 // Default 60 seconds
    // 定期的にキャッシュをクリーンアップ
    this.startCleanup()
  }
  
  // キャッシュにデータを設定
  set(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    })
  }
  
  // キャッシュからデータを取得
  get(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }
    
    // TTLをチェック
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }
  
  // キャッシュにデータが存在するかチェック
  has(key: string): boolean {
    const data = this.get(key)
    return data !== null
  }
  
  // キャッシュから削除
  delete(key: string): void {
    this.cache.delete(key)
  }
  
  // キャッシュをクリア
  clear(): void {
    this.cache.clear()
  }
  
  // キャッシュサイズを取得
  size(): number {
    return this.cache.size
  }
  
  // 期限切れのエントリをクリーンアップ
  private cleanup(): void {
    const now = Date.now()
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }
  
  // 定期的なクリーンアップを開始
  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 60000) // 1分ごと
  }
  
  // クリーンアップを停止
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
  }
  
  // フレームのハッシュを生成（キーとして使用）
  static generateFrameHash(dataUrl: string): string {
    // 簡単なハッシュ関数（実際の実装では、より堅牢なハッシュを使用）
    let hash = 0
    for (let i = 0; i < dataUrl.length; i += 100) {
      const char = dataUrl.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return hash.toString(36)
  }
}

// シングルトンインスタンス
let _emotionCache: EmotionCache<any> | null = null

export function getEmotionCache() {
  if (!_emotionCache) {
    _emotionCache = new EmotionCache()
  }
  return _emotionCache
}

export const emotionCache = {
  get: <T>(key: string) => getEmotionCache().get<T>(key),
  set: <T>(key: string, data: T, ttl?: number) => getEmotionCache().set(key, data, ttl),
  delete: (key: string) => getEmotionCache().delete(key),
  clear: () => getEmotionCache().clear(),
  has: (key: string) => getEmotionCache().has(key),
  cleanup: () => getEmotionCache().cleanup(),
  stopCleanup: () => getEmotionCache().stopCleanup()
}