"use client"

import { useEffect, useRef } from "react"

interface TranscriptAreaProps {
  transcript: string
  interimTranscript?: string
  isListening: boolean
  error?: string | null
}

export default function TranscriptArea({
  transcript,
  interimTranscript = "",
  isListening,
  error = null
}: TranscriptAreaProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const previousTranscriptLength = useRef(transcript.length)

  // 新しいテキストが追加されたときに自動スクロール
  useEffect(() => {
    if (scrollContainerRef.current && transcript.length > previousTranscriptLength.current) {
      const element = scrollContainerRef.current
      element.scrollTop = element.scrollHeight - element.clientHeight
    }
    previousTranscriptLength.current = transcript.length
  }, [transcript])

  // 中間結果が更新されたときも自動スクロール
  useEffect(() => {
    if (scrollContainerRef.current && interimTranscript) {
      const element = scrollContainerRef.current
      element.scrollTop = element.scrollHeight - element.clientHeight
    }
  }, [interimTranscript])

  return (
    <div 
      ref={scrollContainerRef}
      data-testid="transcript-scroll-container"
      className="min-h-[100px] max-h-[250px] overflow-y-auto p-4 bg-gray-50 rounded-lg scroll-smooth border border-gray-200"
      style={{ 
        wordWrap: 'break-word', 
        overflowWrap: 'break-word',
        scrollBehavior: 'smooth'
      }}
    >
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words font-mono">
        {transcript}
        {interimTranscript && (
          <span className="text-gray-400 italic ml-1">{interimTranscript}</span>
        )}
        {!transcript && !interimTranscript && (
          <span className="text-gray-400 text-center block">
            {isListening ? "🎤 音声を認識中..." : "📝 音声認識による文字起こしがここに表示されます"}
          </span>
        )}
      </p>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}