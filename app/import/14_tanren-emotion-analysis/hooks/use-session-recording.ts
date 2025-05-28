import { useCallback, useRef, useState, useEffect } from 'react'

export interface SessionData {
  id: string
  startTime: Date
  endTime?: Date
  duration: number
  videoBlob?: Blob
  transcript: string
  emotions: EmotionRecord[]
  insights: string[]
}

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

interface UseSessionRecordingOptions {
  maxDuration?: number // Maximum recording duration in seconds
  mimeType?: string
}

export function useSessionRecording({
  maxDuration = 60,
  mimeType = 'video/webm'
}: UseSessionRecordingOptions = {}) {
  const [isRecording, setIsRecording] = useState(false)
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])
  const startTimeRef = useRef<Date | null>(null)
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const sessionDataRef = useRef<SessionData | null>(null)

  // Start recording session
  const startRecording = useCallback((stream: MediaStream) => {
    if (!stream || isRecording) {
      return
    }

    try {
      // Check if the mimeType is supported
      const options: MediaRecorderOptions = {}
      if (MediaRecorder.isTypeSupported(mimeType)) {
        options.mimeType = mimeType
      }

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorderRef.current = mediaRecorder
      recordedChunksRef.current = []

      // Initialize session data
      const sessionId = `session_${Date.now()}`
      startTimeRef.current = new Date()
      
      const newSession: SessionData = {
        id: sessionId,
        startTime: startTimeRef.current,
        duration: 0,
        transcript: '',
        emotions: [],
        insights: []
      }
      
      sessionDataRef.current = newSession
      setCurrentSession(newSession)

      // Handle data available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      // Handle recording stop
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: mimeType })
        
        if (sessionDataRef.current) {
          sessionDataRef.current.videoBlob = blob
          sessionDataRef.current.endTime = new Date()
          setCurrentSession({ ...sessionDataRef.current })
        }
      }

      // Start recording
      mediaRecorder.start(1000) // Collect data every second
      setIsRecording(true)
      setRecordingDuration(0)

      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          const newDuration = prev + 1
          
          // Auto-stop at max duration
          if (newDuration >= maxDuration) {
            stopRecording()
          }
          
          return newDuration
        })
      }, 1000)

    } catch (error) {
      console.error('Failed to start recording:', error)
      setIsRecording(false)
    }
  }, [isRecording, maxDuration, mimeType])

  // Stop recording session
  const stopRecording = useCallback(() => {
    if (!isRecording || !mediaRecorderRef.current) {
      return
    }

    try {
      // Stop the media recorder
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }

      // Clear duration timer
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current)
        durationIntervalRef.current = null
      }

      // Update session duration
      if (sessionDataRef.current && startTimeRef.current) {
        sessionDataRef.current.duration = recordingDuration
        sessionDataRef.current.endTime = new Date()
        setCurrentSession({ ...sessionDataRef.current })
      }

      setIsRecording(false)
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }, [isRecording, recordingDuration])

  // Add emotion data to session
  const addEmotionData = useCallback((emotionRecord: EmotionRecord) => {
    if (!sessionDataRef.current || !isRecording) {
      return
    }

    sessionDataRef.current.emotions.push(emotionRecord)
    
    // Add insight if it's new
    if (emotionRecord.insight && !sessionDataRef.current.insights.includes(emotionRecord.insight)) {
      sessionDataRef.current.insights.push(emotionRecord.insight)
    }
  }, [isRecording])

  // Update transcript
  const updateTranscript = useCallback((transcript: string) => {
    if (!sessionDataRef.current) {
      return
    }

    sessionDataRef.current.transcript = transcript
  }, [])

  // Get recorded video URL
  const getVideoUrl = useCallback(() => {
    if (!currentSession?.videoBlob) {
      return null
    }

    return URL.createObjectURL(currentSession.videoBlob)
  }, [currentSession])

  // Download recorded video
  const downloadVideo = useCallback(() => {
    if (!currentSession?.videoBlob) {
      return
    }

    const url = URL.createObjectURL(currentSession.videoBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tanren_session_${currentSession.id}.webm`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [currentSession])

  // Export session data as JSON
  const exportSessionData = useCallback(() => {
    if (!currentSession) {
      return null
    }

    // Create a copy without the video blob for JSON export
    const exportData = {
      ...currentSession,
      videoBlob: undefined,
      videoSize: currentSession.videoBlob?.size || 0
    }

    return exportData
  }, [currentSession])

  // Reset session
  const resetSession = useCallback(() => {
    setCurrentSession(null)
    sessionDataRef.current = null
    recordedChunksRef.current = []
    setRecordingDuration(0)
  }, [])

  // Save session to localStorage
  const saveSession = useCallback(async () => {
    if (!currentSession) {
      return { success: false, error: 'No session to save' }
    }

    try {
      // Get existing sessions from localStorage
      const existingSessions = localStorage.getItem('tanren_sessions')
      let sessions = []
      
      if (existingSessions) {
        try {
          sessions = JSON.parse(existingSessions)
        } catch (e) {
          console.error('Error parsing existing sessions:', e)
          sessions = []
        }
      }

      // セッションデータを整形 (without video blob for localStorage)
      const sessionToSave = {
        id: currentSession.id,
        startTime: currentSession.startTime,
        endTime: currentSession.endTime,
        duration: currentSession.duration,
        transcript: currentSession.transcript,
        emotions: currentSession.emotions,
        insights: currentSession.insights,
        videoSize: currentSession.videoBlob?.size || 0
      }

      // Add new session
      sessions.push(sessionToSave)

      // Limit to 10 sessions (remove oldest)
      if (sessions.length > 10) {
        sessions = sessions.slice(-10)
      }

      // Save to localStorage
      localStorage.setItem('tanren_sessions', JSON.stringify(sessions))

      return { success: true, sessionId: currentSession.id }
    } catch (error) {
      console.error('Error saving session:', error)
      
      // Check if it's a quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        return { 
          success: false, 
          error: 'Storage quota exceeded' 
        }
      }
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save session' 
      }
    }
  }, [currentSession])

  // Load sessions from localStorage
  const loadSessions = useCallback(async () => {
    try {
      const sessionsData = localStorage.getItem('tanren_sessions')
      
      if (!sessionsData) {
        return { success: true, sessions: [] }
      }

      const sessions = JSON.parse(sessionsData)
      return { success: true, sessions }
    } catch (error) {
      console.error('Error loading sessions:', error)
      return { success: false, sessions: [] }
    }
  }, [])

  // Store video URL ref for cleanup
  const videoUrlRef = useRef<string | null>(null)

  // Cleanup video URL on unmount
  useEffect(() => {
    return () => {
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current)
      }
    }
  }, [])

  // Override getVideoUrl to store URL for cleanup
  const getVideoUrlWithCleanup = useCallback(() => {
    if (!currentSession?.videoBlob) {
      return null
    }

    // Revoke old URL if exists
    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current)
    }

    // Create new URL
    const url = URL.createObjectURL(currentSession.videoBlob)
    videoUrlRef.current = url
    return url
  }, [currentSession])

  // Export session data as CSV
  const exportAsCSV = useCallback(() => {
    if (!currentSession || !currentSession.emotions || currentSession.emotions.length === 0) {
      return 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,facialExpression,insight\n'
    }

    // Add metadata as comments
    const metadata = [
      `# Session ID: ${currentSession.id}`,
      `# Date: ${new Date(currentSession.startTime).toLocaleDateString('ja-JP')}`,
      `# Duration: ${Math.floor(currentSession.duration / 60)}:${(currentSession.duration % 60).toString().padStart(2, '0')}`,
      `# Transcript: ${currentSession.transcript}`,
      ''
    ].join('\n')

    // CSV headers
    const headers = 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,facialExpression,insight'

    // CSV data rows
    const rows = currentSession.emotions.map(emotion => {
      const timestamp = new Date(emotion.timestamp).toISOString()
      const values = [
        timestamp,
        emotion.emotions.joy || 0,
        emotion.emotions.anger || 0,
        emotion.emotions.sadness || 0,
        emotion.emotions.surprise || 0,
        emotion.emotions.fear || 0,
        emotion.emotions.confidence || 0,
        emotion.emotions.interest || 0,
        `"${(emotion.facialExpression || '').replace(/"/g, '""')}"`,
        `"${(emotion.insight || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
      ]
      return values.join(',')
    })

    return metadata + headers + '\n' + rows.join('\n')
  }, [currentSession])

  // Export session data as PDF (stub for now)
  const exportAsPDF = useCallback(async () => {
    if (!currentSession) {
      throw new Error('No session data to export')
    }

    // This would require a PDF library like jsPDF or pdfmake
    // For now, return a mock implementation
    const pdfContent = `
TANREN Emotion Analysis Report
==============================
Session ID: ${currentSession.id}
Date: ${new Date(currentSession.startTime).toLocaleDateString('ja-JP')}
Duration: ${Math.floor(currentSession.duration / 60)}:${(currentSession.duration % 60).toString().padStart(2, '0')}

Transcript:
${currentSession.transcript}

Emotion Data:
${currentSession.emotions.map(e => `- ${new Date(e.timestamp).toLocaleTimeString()}: ${e.facialExpression} (${e.insight})`).join('\n')}
    `

    // Create a text blob for now (would be PDF in real implementation)
    return new Blob([pdfContent], { type: 'application/pdf' })
  }, [currentSession])

  return {
    isRecording,
    recordingDuration,
    currentSession,
    startRecording,
    stopRecording,
    addEmotionData,
    updateTranscript,
    getVideoUrl: getVideoUrlWithCleanup,
    downloadVideo,
    exportSessionData,
    resetSession,
    saveSession,
    loadSessions,
    exportAsCSV,
    exportAsPDF
  }
}