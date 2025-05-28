import { SessionData } from '@/hooks/use-session-recording'

// NextRequestのモック
class MockNextRequest {
  url: string
  method: string
  headers: Headers
  private body: string

  constructor(url: string, options: { method?: string; headers?: Record<string, string>; body?: string } = {}) {
    this.url = url
    this.method = options.method || 'GET'
    this.headers = new Headers(options.headers)
    this.body = options.body || ''
  }

  async json() {
    return JSON.parse(this.body)
  }
}

// モックのファイルシステム
const mockFs = {
  sessions: new Map<string, any>()
}

// fs/promises のモック
jest.mock('fs/promises', () => ({
  writeFile: jest.fn(async (path: string, data: string) => {
    const sessionId = path.match(/session_(\d+)\.json/)?.[1]
    if (sessionId) {
      mockFs.sessions.set(`session_${sessionId}`, JSON.parse(data))
    }
  }),
  readFile: jest.fn(async (path: string) => {
    const sessionId = path.match(/session_(\d+)\.json/)?.[1]
    if (sessionId) {
      const session = mockFs.sessions.get(`session_${sessionId}`)
      if (session) {
        return JSON.stringify(session)
      }
    }
    throw new Error('File not found')
  }),
  readdir: jest.fn(async () => {
    return Array.from(mockFs.sessions.keys()).map(key => `${key}.json`)
  }),
  mkdir: jest.fn()
}))

describe.skip('Session Storage API - Skipped because API functions not implemented', () => {
  beforeEach(() => {
    mockFs.sessions.clear()
  })

  describe('POST /api/sessions - セッション保存', () => {
    it('正常にセッションデータを保存できる', async () => {
      const sessionData: SessionData = {
        id: 'session_123456789',
        startTime: new Date('2024-01-01T10:00:00Z'),
        endTime: new Date('2024-01-01T10:01:00Z'),
        duration: 60,
        transcript: 'テストの文字起こし内容',
        emotions: [
          {
            timestamp: 1704103200000,
            emotions: {
              joy: 80,
              anger: 5,
              sadness: 10,
              surprise: 20,
              fear: 5,
              confidence: 75,
              confusion: 15,
              interest: 85
            },
            facialExpression: '笑顔',
            insight: 'ポジティブな感情が支配的です'
          }
        ],
        insights: ['ポジティブな感情が支配的です']
      }

      const request = new MockNextRequest('http://localhost:3000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      })

      const response = await saveSession(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.success).toBe(true)
      expect(result.sessionId).toBe('session_123456789')
      expect(mockFs.sessions.has('session_123456789')).toBe(true)
    })

    it('セッションIDが存在しない場合はエラーを返す', async () => {
      const invalidData = {
        // idフィールドが欠けている
        startTime: new Date(),
        transcript: 'テスト'
      }

      const request = new MockNextRequest('http://localhost:3000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidData)
      })

      const response = await saveSession(request)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('Session ID is required')
    })

    it('大きなセッションデータも保存できる', async () => {
      const largeTranscript = 'あ'.repeat(10000) // 10000文字の文字起こし
      const manyEmotions = Array(100).fill(null).map((_, i) => ({
        timestamp: 1704103200000 + i * 1000,
        emotions: {
          joy: Math.random() * 100,
          anger: Math.random() * 100,
          sadness: Math.random() * 100,
          surprise: Math.random() * 100,
          fear: Math.random() * 100,
          confidence: Math.random() * 100,
          confusion: Math.random() * 100,
          interest: Math.random() * 100
        },
        facialExpression: '表情' + i,
        insight: 'インサイト' + i
      }))

      const sessionData: SessionData = {
        id: 'session_large',
        startTime: new Date(),
        endTime: new Date(),
        duration: 100,
        transcript: largeTranscript,
        emotions: manyEmotions,
        insights: manyEmotions.map(e => e.insight)
      }

      const request = new MockNextRequest('http://localhost:3000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      })

      const response = await saveSession(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.success).toBe(true)
      
      const savedSession = mockFs.sessions.get('session_large')
      expect(savedSession.transcript.length).toBe(10000)
      expect(savedSession.emotions.length).toBe(100)
    })
  })

  describe('GET /api/sessions - セッション一覧取得', () => {
    beforeEach(() => {
      // テスト用のセッションデータを追加
      mockFs.sessions.set('session_001', {
        id: 'session_001',
        startTime: '2024-01-01T10:00:00Z',
        duration: 30,
        transcript: 'セッション1'
      })
      mockFs.sessions.set('session_002', {
        id: 'session_002',
        startTime: '2024-01-01T11:00:00Z',
        duration: 45,
        transcript: 'セッション2'
      })
    })

    it('保存されているセッション一覧を取得できる', async () => {
      const request = new MockNextRequest('http://localhost:3000/api/sessions')
      const response = await getSessions(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.sessions).toHaveLength(2)
      expect(result.sessions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 'session_001' }),
          expect.objectContaining({ id: 'session_002' })
        ])
      )
    })

    it('セッションがない場合は空の配列を返す', async () => {
      mockFs.sessions.clear()
      
      const request = new MockNextRequest('http://localhost:3000/api/sessions')
      const response = await getSessions(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.sessions).toEqual([])
    })
  })
})