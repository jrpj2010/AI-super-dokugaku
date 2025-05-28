"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Maximize2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

interface EmotionRecord {
  timestamp: number
  emotions: {
    joy: number
    anger: number
    sadness: number
    surprise: number
    fear: number
    confidence: number
    confusion: number
    interest: number
  }
  facialExpression: string
  insight: string
}

interface TranscriptSegment {
  startTime: number
  endTime: number
  text: string
}

interface SessionData {
  id: string
  duration: number
  transcript: string
  emotions: EmotionRecord[]
  transcriptSegments?: TranscriptSegment[]
}

interface VideoPlayerProps {
  videoUrl: string
  sessionData: SessionData | null
}

export default function VideoPlayer({ videoUrl, sessionData }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(sessionData?.duration || 0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentEmotion, setCurrentEmotion] = useState<EmotionRecord | null>(null)
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(-1)

  // ビデオのメタデータが読み込まれたとき
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      
      const handleLoadedMetadata = () => {
        setDuration(video.duration)
      }
      
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime)
        updateCurrentEmotion(video.currentTime)
        updateActiveSegment(video.currentTime)
      }
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('timeupdate', handleTimeUpdate)
      
      // 初期の感情データを設定
      if (sessionData?.emotions?.length) {
        updateCurrentEmotion(0)
      }
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoUrl, sessionData])

  // 現在の時刻に対応する感情データを更新
  const updateCurrentEmotion = (time: number) => {
    if (!sessionData?.emotions || sessionData.emotions.length === 0) return
    
    const timeMs = time * 1000
    let closestEmotion = sessionData.emotions[0]
    
    for (const emotion of sessionData.emotions) {
      if (emotion.timestamp <= timeMs) {
        closestEmotion = emotion
      } else {
        break
      }
    }
    
    setCurrentEmotion(closestEmotion)
  }

  // 現在の時刻に対応する文字起こしセグメントを更新
  const updateActiveSegment = (time: number) => {
    if (!sessionData?.transcriptSegments) return
    
    const activeIndex = sessionData.transcriptSegments.findIndex(
      segment => time >= segment.startTime && time < segment.endTime
    )
    
    setActiveSegmentIndex(activeIndex)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleSpeedChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = value[0]
      setPlaybackRate(value[0])
    }
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return
      
      switch (e.key) {
        case ' ':
          e.preventDefault()
          handlePlayPause()
          break
        case 'ArrowRight':
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
          break
        case 'ArrowLeft':
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
          break
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, duration])

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">ビデオが利用できません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div ref={containerRef} data-testid="video-container" className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          data-testid="video-player"
          src={videoUrl}
          className="w-full h-auto"
          onClick={handlePlayPause}
        />
        
        {/* ビデオコントロール */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="space-y-2">
            {/* プログレスバー */}
            <Slider
              data-testid="video-progress"
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
            
            {/* コントロールボタン */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" />
                      一時停止
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      再生
                    </>
                  )}
                </Button>
                
                <div className="text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-2">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* 再生速度 */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="speed" className="text-white text-sm">再生速度</label>
                  <select
                    id="speed"
                    value={playbackRate}
                    onChange={(e) => handleSpeedChange([parseFloat(e.target.value)])}
                    className="bg-white/20 text-white rounded px-2 py-1 text-sm"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize2 className="w-4 h-4 mr-1" />
                  フルスクリーン
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 同期表示エリア */}
      {sessionData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 現在の感情データ */}
          {currentEmotion && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">現在の感情分析</h3>
                <p className="text-sm text-gray-600">表情: {currentEmotion.facialExpression}</p>
                <p className="text-sm text-gray-600">インサイト: {currentEmotion.insight}</p>
                <div className="mt-2 space-y-1">
                  <div className="text-xs">
                    喜び: {currentEmotion.emotions.joy}% | 
                    自信: {currentEmotion.emotions.confidence}% | 
                    興味: {currentEmotion.emotions.interest}%
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* 文字起こし */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">文字起こし</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {sessionData.transcriptSegments ? (
                  sessionData.transcriptSegments.map((segment, index) => (
                    <p
                      key={index}
                      className={`text-sm p-1 rounded transition-colors ${
                        index === activeSegmentIndex ? 'bg-yellow-100' : ''
                      }`}
                    >
                      {segment.text}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">{sessionData.transcript}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}