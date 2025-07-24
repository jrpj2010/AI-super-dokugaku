'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, Volume2, VolumeX, Info } from 'lucide-react'
import { generateSpeech } from '../actions'

export function MedicalTTS() {
  const [text, setText] = useState('肺の検査結果です。右葉上部に影が見られますが、左葉はきれいです。')
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [processedText, setProcessedText] = useState('')
  const [explanation, setExplanation] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    try {
      const result = await generateSpeech(text)
      
      if (result.success && result.processedText) {
        setProcessedText(result.processedText)
        if (result.explanation) {
          setExplanation(result.explanation)
        }
        
        if (result.audioUrl && audioRef.current) {
          audioRef.current.src = result.audioUrl
          audioRef.current.play()
          setIsPlaying(true)
        }
      } else {
        alert(result.error || '音声生成に失敗しました')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>テキスト入力</CardTitle>
          <CardDescription>
            医療用語を含むテキストを入力してください。自動的に正しい発音で読み上げられます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="例: 肺の検査結果です。右葉上部に影が見られますが、左葉はきれいです。"
            rows={5}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleGenerateSpeech}
              disabled={isLoading || !text.trim()}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  音声を生成
                </>
              )}
            </Button>
            {audioRef.current?.src && (
              <Button
                onClick={togglePlayPause}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    一時停止
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    再生
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {processedText && (
        <Card>
          <CardHeader>
            <CardTitle>処理されたSSML</CardTitle>
            <CardDescription>
              医療用語が発音記号に変換されたSSMLコードです
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{processedText}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {explanation && (
        <Card>
          <CardHeader>
            <CardTitle>医療用語の発音解説</CardTitle>
            <CardDescription>
              Gemini APIによる医療用語の読み方解説です
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{explanation}</div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>注意事項</AlertTitle>
        <AlertDescription>
          現在、Gemini TTS APIは外部テキストの直接読み上げに制限があります。
          音声生成機能を完全に実装するには、Google Cloud Text-to-Speech APIの設定が必要です。
        </AlertDescription>
      </Alert>

      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        className="hidden"
      />
    </div>
  )
}