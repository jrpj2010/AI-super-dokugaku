"use client"

interface TranscriptDisplayProps {
  transcript: string
}

export function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  return (
    <div 
      data-testid="transcript-container"
      className="min-h-[80px] max-h-[10vh] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
      style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
    >
      {transcript ? (
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
          {transcript}
        </p>
      ) : (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          音声認識待機中...
        </p>
      )}
    </div>
  )
}