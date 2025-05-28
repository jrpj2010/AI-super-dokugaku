"use client"

interface Session {
  id: string
  timestamp: string
  duration: number
  videoUrl?: string
}

interface SessionRecordingProps {
  sessions: Session[]
  isRecording?: boolean
}

export function SessionRecording({ sessions, isRecording = false }: SessionRecordingProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>録画セッションがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isRecording && (
        <div className="flex items-center space-x-2 text-red-500">
          <span className="animate-pulse">●</span>
          <span>録画中</span>
        </div>
      )}
      
      <div className="space-y-2">
        {sessions.map((session) => (
          <div key={session.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{new Date(session.timestamp).toLocaleString('ja-JP')}</p>
                <p className="text-sm text-gray-500">{Math.floor(session.duration / 60)}分{session.duration % 60}秒</p>
              </div>
              {session.videoUrl && (
                <button className="text-blue-500 hover:text-blue-600">
                  再生
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}