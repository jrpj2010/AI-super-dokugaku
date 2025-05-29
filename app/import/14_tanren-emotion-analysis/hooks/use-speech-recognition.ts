import { useState, useEffect, useRef, useCallback } from 'react'

// Web Speech APIの型定義
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const isListeningRef = useRef(false) // リスニング状態をrefでも管理
  const lastRestartTimeRef = useRef<number>(0) // 最後に再起動した時刻
  const reconnectIntervalRef = useRef<NodeJS.Timeout | null>(null) // 定期再接続用タイマー

  const initializeRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('このブラウザは音声認識に対応していません')
      return null
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.maxAlternatives = 1
    recognition.interimResults = true
    recognition.lang = 'ja-JP'

    recognition.onstart = () => {
      console.log('[SpeechRecognition] onstartイベント')
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('[SpeechRecognition] onresultイベント:', {
        resultIndex: event.resultIndex,
        resultsLength: event.results.length,
        timestamp: new Date().toISOString()
      });
      
      let finalTranscript = ''
      let interimTranscript = ''

      // 最新の結果のみを処理
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' '
        } else {
          interimTranscript += result[0].transcript
        }
      }

      if (finalTranscript) {
        setTranscript(prev => {
          // 重複を避けるため、新しいテキストのみを追加
          const newText = prev + finalTranscript
          
          // 最大文字数制限（50,000文字、約150KB）
          const MAX_TRANSCRIPT_LENGTH = 50000
          
          if (newText.length > MAX_TRANSCRIPT_LENGTH) {
            // 古い部分を削除して新しい部分を保持
            const trimmedText = '...' + newText.slice(-(MAX_TRANSCRIPT_LENGTH - 3))
            console.warn('[SpeechRecognition] 文字起こしが最大長を超えたため、古い部分を削除しました')
            return trimmedText
          }
          
          console.log('[SpeechRecognition] 文字起こし更新:', { 
            previousLength: prev.length, 
            addedText: finalTranscript,
            totalLength: newText.length 
          })
          return newText
        })
      }
      setInterimTranscript(interimTranscript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      let errorMessage = '音声認識でエラーが発生しました'
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = '音声が検出されませんでした'
          break
        case 'audio-capture':
          errorMessage = 'マイクが利用できません'
          break
        case 'not-allowed':
          errorMessage = 'マイクへのアクセスが許可されていません'
          break
        case 'network':
          errorMessage = 'ネットワークエラーが発生しました'
          break
      }
      
      setError(errorMessage)
      setIsListening(false)
    }

    recognition.onend = () => {
      console.log('[SpeechRecognition] onendイベント発生');
      
      // 長時間のセッションでは自動的に再開する
      if (isListeningRef.current && recognitionRef.current) {
        console.log('[SpeechRecognition] 音声認識を自動再開します');
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('[SpeechRecognition] 再開エラー:', error);
        }
      }
      
      // リスニング中に終了した場合は自動再接続
      if (isListeningRef.current) {
        console.log('[SpeechRecognition] 自動再接続を試みます');
        setTimeout(() => {
          if (isListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
              console.log('[SpeechRecognition] 再接続成功');
            } catch (e) {
              console.error('[SpeechRecognition] 再接続失敗:', e);
              setError('音声認識が中断されました');
              setIsListening(false);
            }
          }
        }, 100); // 100ms後に再接続
      } else {
        setIsListening(false);
      }
    }

    return recognition
  }, [error])

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    const recognition = initializeRecognition()
    if (recognition) {
      recognitionRef.current = recognition
      setTranscript('')
      setInterimTranscript('')
      
      try {
        recognition.start()
        setIsListening(true)
        isListeningRef.current = true
        setError(null)
        lastRestartTimeRef.current = Date.now()
        console.log('[SpeechRecognition] 開始成功')
        
        // 50秒ごとに再接続するタイマーを設定（Chromeの60秒制限に対応）
        if (reconnectIntervalRef.current) {
          clearInterval(reconnectIntervalRef.current)
        }
        reconnectIntervalRef.current = setInterval(() => {
          if (isListeningRef.current && recognitionRef.current) {
            console.log('[SpeechRecognition] 定期再接続実行')
            recognitionRef.current.stop()
            // stopイベントがonendをトリガーし、そこで再接続される
          }
        }, 50000) // 50秒
      } catch (e) {
        console.error('Failed to start recognition:', e)
        setError('音声認識の開始に失敗しました')
      }
    }
  }, [initializeRecognition])

  const stopListening = useCallback(() => {
    console.log('[SpeechRecognition] 停止呼び出し')
    isListeningRef.current = false
    
    // 定期再接続タイマーをクリア
    if (reconnectIntervalRef.current) {
      clearInterval(reconnectIntervalRef.current)
      reconnectIntervalRef.current = null
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsListening(false)
    setInterimTranscript('')
  }, [])

  useEffect(() => {
    return () => {
      stopListening()
    }
  }, [stopListening])

  return {
    transcript,
    interimTranscript,
    isListening,
    error,
    startListening,
    stopListening
  }
}