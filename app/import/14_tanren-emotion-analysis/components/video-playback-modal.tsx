"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"
import { SessionData } from "@/hooks/use-session-recording"

interface VideoPlaybackModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string | null
  sessionData: SessionData | null
}

export default function VideoPlaybackModal({
  isOpen,
  onClose,
  videoUrl,
  sessionData
}: VideoPlaybackModalProps) {
  if (!videoUrl || !sessionData) {
    return null
  }

  // VideoPlayer用のデータ形式に変換
  const playerSessionData = {
    id: sessionData.id,
    duration: sessionData.duration,
    transcript: sessionData.transcript,
    emotions: sessionData.emotions,
    // TODO: transcriptSegmentsの実装が必要
    transcriptSegments: undefined
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            セッション録画の再生 - {new Date(sessionData.startTime).toLocaleString('ja-JP')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <VideoPlayer videoUrl={videoUrl} sessionData={playerSessionData} />
        </div>
        
        {/* セッション情報 */}
        <div className="mt-6 space-y-4">
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">セッション情報</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">開始時刻:</span>
                <span className="ml-2">{new Date(sessionData.startTime).toLocaleString('ja-JP')}</span>
              </div>
              {sessionData.endTime && (
                <div>
                  <span className="text-gray-600">終了時刻:</span>
                  <span className="ml-2">{new Date(sessionData.endTime).toLocaleString('ja-JP')}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">録画時間:</span>
                <span className="ml-2">{Math.floor(sessionData.duration / 60)}分{sessionData.duration % 60}秒</span>
              </div>
              <div>
                <span className="text-gray-600">感情データ数:</span>
                <span className="ml-2">{sessionData.emotions.length}件</span>
              </div>
            </div>
          </div>
          
          {/* インサイトサマリー */}
          {sessionData.insights.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">主なインサイト</h3>
              <ul className="list-disc list-inside space-y-1">
                {sessionData.insights.slice(0, 5).map((insight, index) => (
                  <li key={index} className="text-sm text-gray-600">{insight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}