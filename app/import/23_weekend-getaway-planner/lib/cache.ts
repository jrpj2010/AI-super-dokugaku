// キャッシュマネージャー
class CacheManager {
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5分

  // キャッシュに保存
  set(key: string, data: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.DEFAULT_TTL);
    this.cache.set(key, { data, expiry });
  }

  // キャッシュから取得
  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  // キャッシュクリア
  clear(): void {
    this.cache.clear();
  }

  // 期限切れエントリーの削除
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// シングルトンインスタンス
export const cache = new CacheManager();

// 定期的なクリーンアップ（ブラウザ環境でのみ実行）
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 60 * 1000); // 1分ごと
}

// キャッシュキー生成ヘルパー
export function generateCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${params[key]}`)
    .join('|');
  return `${prefix}:${sortedParams}`;
}