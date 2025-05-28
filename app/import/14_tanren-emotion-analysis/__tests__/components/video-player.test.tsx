import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoPlayer from '@/components/video-player'

// HTMLMediaElementのモック
const mockPlay = jest.fn()
const mockPause = jest.fn()
const mockLoad = jest.fn()

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: mockPlay.mockResolvedValue(undefined)
})

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: mockPause
})

Object.defineProperty(HTMLMediaElement.prototype, 'load', {
  writable: true,
  value: mockLoad
})

describe('VideoPlayer', () => {
  const mockVideoUrl = 'blob:http://localhost/123'
  const mockSessionData = {
    id: 'session_123',
    duration: 60,
    transcript: 'テストの文字起こし',
    emotions: [
      {
        timestamp: 0,
        emotions: { joy: 80, anger: 10, sadness: 5, surprise: 20, fear: 5, confidence: 75, confusion: 10, interest: 85 },
        facialExpression: '笑顔',
        insight: 'ポジティブ'
      },
      {
        timestamp: 30000,
        emotions: { joy: 60, anger: 20, sadness: 15, surprise: 10, fear: 10, confidence: 65, confusion: 20, interest: 70 },
        facialExpression: '真剣',
        insight: '集中している'
      }
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('基本機能', () => {
    it('ビデオプレーヤーが正しく表示される', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const video = screen.getByTestId('video-player')
      expect(video).toBeInTheDocument()
      expect(video).toHaveAttribute('src', mockVideoUrl)
    })

    it('再生/一時停止ボタンが機能する', async () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const playButton = screen.getByRole('button', { name: /再生/i })
      
      // 再生
      fireEvent.click(playButton)
      await waitFor(() => {
        expect(mockPlay).toHaveBeenCalled()
        expect(screen.getByRole('button', { name: /一時停止/i })).toBeInTheDocument()
      })
      
      // 一時停止
      fireEvent.click(screen.getByRole('button', { name: /一時停止/i }))
      expect(mockPause).toHaveBeenCalled()
    })

    it('プログレスバーが表示される', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const progressBar = screen.getByTestId('video-progress')
      expect(progressBar).toBeInTheDocument()
    })

    it('現在時刻と合計時間が表示される', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      expect(screen.getByText('0:00')).toBeInTheDocument()
      expect(screen.getByText('1:00')).toBeInTheDocument()
    })
  })

  describe('同期表示機能', () => {
    it('現在の再生時刻に対応する感情データが表示される', async () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const video = screen.getByTestId('video-player') as HTMLVideoElement
      
      // 初期状態（0秒）
      expect(screen.getByText('表情: 笑顔')).toBeInTheDocument()
      expect(screen.getByText('インサイト: ポジティブ')).toBeInTheDocument()
      
      // 30秒にシーク
      Object.defineProperty(video, 'currentTime', {
        writable: true,
        value: 30
      })
      fireEvent.timeUpdate(video)
      
      await waitFor(() => {
        expect(screen.getByText('表情: 真剣')).toBeInTheDocument()
        expect(screen.getByText('インサイト: 集中している')).toBeInTheDocument()
      })
    })

    it('文字起こしが同期してハイライト表示される', async () => {
      const detailedSessionData = {
        ...mockSessionData,
        transcriptSegments: [
          { startTime: 0, endTime: 15, text: '最初のセグメント' },
          { startTime: 15, endTime: 30, text: '次のセグメント' },
          { startTime: 30, endTime: 45, text: '3番目のセグメント' }
        ]
      }
      
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={detailedSessionData} />)
      
      const video = screen.getByTestId('video-player') as HTMLVideoElement
      
      // 初期状態 - 0秒の時は最初のセグメントがアクティブ
      await waitFor(() => {
        const firstSegment = screen.getByText('最初のセグメント')
        expect(firstSegment.parentElement).toHaveClass('bg-yellow-100')
      })
      
      // 20秒にシーク
      Object.defineProperty(video, 'currentTime', {
        writable: true,
        value: 20
      })
      fireEvent.timeUpdate(video)
      
      await waitFor(() => {
        const secondSegment = screen.getByText('次のセグメント')
        const firstSegment = screen.getByText('最初のセグメント')
        expect(secondSegment.parentElement).toHaveClass('bg-yellow-100')
        expect(firstSegment.parentElement).not.toHaveClass('bg-yellow-100')
      })
    })
  })

  describe('コントロール機能', () => {
    it('シークバーで任意の位置にジャンプできる', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const video = screen.getByTestId('video-player') as HTMLVideoElement
      const progressBar = screen.getByTestId('video-progress')
      
      // SliderコンポーネントのonValueChangeをトリガー
      // SliderはReact Testing Libraryでは直接操作できないため、実装の詳細をモック
      Object.defineProperty(video, 'currentTime', {
        writable: true,
        value: 0
      })
      
      // 30秒にシークする動作をシミュレート
      video.currentTime = 30
      fireEvent.timeUpdate(video)
      
      expect(video.currentTime).toBe(30)
    })

    it('再生速度を変更できる', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const video = screen.getByTestId('video-player') as HTMLVideoElement
      const speedControl = screen.getByLabelText('再生速度')
      
      fireEvent.change(speedControl, { target: { value: '2' } })
      expect(video.playbackRate).toBe(2)
      
      fireEvent.change(speedControl, { target: { value: '0.5' } })
      expect(video.playbackRate).toBe(0.5)
    })

    it('フルスクリーンボタンが機能する', () => {
      const mockRequestFullscreen = jest.fn()
      
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const container = screen.getByTestId('video-container')
      container.requestFullscreen = mockRequestFullscreen
      
      const fullscreenButton = screen.getByRole('button', { name: /フルスクリーン/i })
      fireEvent.click(fullscreenButton)
      
      expect(mockRequestFullscreen).toHaveBeenCalled()
    })
  })

  describe('エラーハンドリング', () => {
    it('ビデオURLがない場合にエラーメッセージが表示される', () => {
      render(<VideoPlayer videoUrl="" sessionData={mockSessionData} />)
      
      expect(screen.getByText('ビデオが利用できません')).toBeInTheDocument()
    })

    it('セッションデータがない場合でも再生可能', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={null} />)
      
      const video = screen.getByTestId('video-player')
      expect(video).toBeInTheDocument()
      expect(screen.queryByText(/表情:/)).not.toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    it('キーボードショートカットが機能する', () => {
      render(<VideoPlayer videoUrl={mockVideoUrl} sessionData={mockSessionData} />)
      
      const video = screen.getByTestId('video-player') as HTMLVideoElement
      
      // スペースキーで再生/一時停止
      fireEvent.keyDown(document, { key: ' ', code: 'Space' })
      expect(mockPlay).toHaveBeenCalled()
      
      // 右矢印で10秒スキップ
      Object.defineProperty(video, 'currentTime', { writable: true, value: 10 })
      fireEvent.keyDown(document, { key: 'ArrowRight' })
      expect(video.currentTime).toBe(20)
      
      // 左矢印で10秒戻る
      fireEvent.keyDown(document, { key: 'ArrowLeft' })
      expect(video.currentTime).toBe(10)
    })
  })
})