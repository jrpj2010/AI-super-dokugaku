// Gemini API レート制限対策用のユーティリティ

interface RateLimiterOptions {
  maxRequestsPerMinute: number;
  retryAttempts: number;
  retryDelay: number;
}

export class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private requestCount = 0;
  private resetTime = Date.now() + 60000;

  constructor(private options: RateLimiterOptions) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.executeWithRetry(fn);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async executeWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: any;
    
    for (let attempt = 0; attempt < this.options.retryAttempts; attempt++) {
      try {
        // レート制限チェック
        await this.checkRateLimit();
        
        // 実行
        const result = await fn();
        this.requestCount++;
        
        return result;
      } catch (error: any) {
        lastError = error;
        
        // レート制限エラーの場合は待機
        if (error.status === 429 || error.message?.includes('rate limit')) {
          const delay = this.options.retryDelay * Math.pow(2, attempt);
          console.log(`Rate limit hit, waiting ${delay}ms before retry...`);
          await this.sleep(delay);
        } else {
          // その他のエラーは即座に再スロー
          throw error;
        }
      }
    }
    
    throw lastError;
  }

  private async checkRateLimit() {
    const now = Date.now();
    
    // リセット時間を過ぎたらカウントをリセット
    if (now >= this.resetTime) {
      this.requestCount = 0;
      this.resetTime = now + 60000;
    }
    
    // レート制限に達している場合は待機
    if (this.requestCount >= this.options.maxRequestsPerMinute) {
      const waitTime = this.resetTime - now;
      console.log(`Rate limit reached, waiting ${waitTime}ms...`);
      await this.sleep(waitTime);
      this.requestCount = 0;
      this.resetTime = Date.now() + 60000;
    }
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }

    this.processing = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// デフォルトのレート制限設定
export const geminiRateLimiter = new RateLimiter({
  maxRequestsPerMinute: 60, // Gemini API の制限に応じて調整
  retryAttempts: 3,
  retryDelay: 1000, // 1秒から指数バックオフ
});