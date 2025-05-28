import { getOptimizedConfig } from '@/lib/performance-config'

const config = getOptimizedConfig()

interface BatchRequest<T> {
  id: string
  data: T
  timestamp: number
}

interface BatchResponse<T> {
  id: string
  result: T | null
  error?: string
}

export class BatchProcessor<TRequest, TResponse> {
  private queue: BatchRequest<TRequest>[] = []
  private processing = false
  private batchTimer: NodeJS.Timeout | null = null
  
  constructor(
    private processBatch: (requests: BatchRequest<TRequest>[]) => Promise<BatchResponse<TResponse>[]>,
    private batchSize: number = config.emotionAnalysis.batchSize,
    private batchDelay: number = 1000
  ) {}
  
  async add(data: TRequest): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const request: BatchRequest<TRequest> = {
        id: Math.random().toString(36).substr(2, 9),
        data,
        timestamp: Date.now()
      }
      
      // リクエストの結果を待つためのハンドラを登録
      const handler = (response: BatchResponse<TResponse>) => {
        if (response.id === request.id) {
          if (response.error) {
            reject(new Error(response.error))
          } else {
            resolve(response.result!)
          }
          this.removeHandler(handler)
        }
      }
      
      this.addHandler(handler)
      this.queue.push(request)
      
      // バッチ処理のスケジュール
      this.scheduleBatch()
    })
  }
  
  private handlers: ((response: BatchResponse<TResponse>) => void)[] = []
  
  private addHandler(handler: (response: BatchResponse<TResponse>) => void) {
    this.handlers.push(handler)
  }
  
  private removeHandler(handler: (response: BatchResponse<TResponse>) => void) {
    const index = this.handlers.indexOf(handler)
    if (index > -1) {
      this.handlers.splice(index, 1)
    }
  }
  
  private scheduleBatch() {
    // 既にバッチタイマーが動いている場合はスキップ
    if (this.batchTimer) return
    
    // キューがバッチサイズに達した場合は即座に処理
    if (this.queue.length >= this.batchSize) {
      this.processBatchQueue()
      return
    }
    
    // バッチ遅延後に処理
    this.batchTimer = setTimeout(() => {
      this.processBatchQueue()
    }, this.batchDelay)
  }
  
  private async processBatchQueue() {
    if (this.processing || this.queue.length === 0) return
    
    this.processing = true
    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
      this.batchTimer = null
    }
    
    // バッチサイズ分のリクエストを取り出す
    const batch = this.queue.splice(0, this.batchSize)
    
    try {
      const responses = await this.processBatch(batch)
      
      // 各レスポンスをハンドラに通知
      responses.forEach(response => {
        this.handlers.forEach(handler => handler(response))
      })
    } catch (error) {
      // エラーの場合はすべてのリクエストにエラーを返す
      batch.forEach(request => {
        const errorResponse: BatchResponse<TResponse> = {
          id: request.id,
          result: null,
          error: error instanceof Error ? error.message : 'Batch processing failed'
        }
        this.handlers.forEach(handler => handler(errorResponse))
      })
    } finally {
      this.processing = false
      
      // まだキューにリクエストがある場合は次のバッチをスケジュール
      if (this.queue.length > 0) {
        this.scheduleBatch()
      }
    }
  }
  
  // キューのクリア
  clear() {
    this.queue = []
    this.handlers = []
    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
      this.batchTimer = null
    }
  }
  
  // キューのサイズを取得
  getQueueSize() {
    return this.queue.length
  }
}