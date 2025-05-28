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

  const initializeRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('このブラウザは音声認識に対応していません')
      return null
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'ja-JP'

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.results.length - 5; i < event.results.length; i++) {
        if (i < 0) continue
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript)
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
      setIsListening(false)
      // 自動再接続は行わない（明示的な制御のため）
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
      } catch (e) {
        console.error('Failed to start recognition:', e)
        setError('音声認識の開始に失敗しました')
      }
    }
  }, [initializeRecognition])

  const stopListening = useCallback(() => {
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