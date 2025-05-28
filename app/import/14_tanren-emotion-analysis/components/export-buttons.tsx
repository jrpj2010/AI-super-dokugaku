'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useSessionRecording } from '@/hooks/use-session-recording'

export function ExportButtons() {
  const { currentSession, isRecording, exportAsCSV, exportAsPDF } = useSessionRecording()

  const handleCSVDownload = () => {
    if (!currentSession || !exportAsCSV) return

    const csvContent = exportAsCSV()
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    // Extract session ID (remove 'session_' prefix if present)
    const sessionId = currentSession.id.replace('session_', '')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `tanren_emotion_report_${sessionId}_${timestamp}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  const handlePDFDownload = async () => {
    if (!currentSession || !exportAsPDF) return

    try {
      const pdfBlob = await exportAsPDF()
      const url = URL.createObjectURL(pdfBlob)
      
      // Extract session ID (remove 'session_' prefix if present)
      const sessionId = currentSession.id.replace('session_', '')
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `tanren_emotion_report_${sessionId}_${timestamp}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF生成エラー:', error)
    }
  }

  const isDisabled = !currentSession || isRecording

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleCSVDownload}
        disabled={isDisabled}
        variant="outline"
        size="sm"
      >
        <Download className="mr-2 h-4 w-4" />
        CSVダウンロード
      </Button>
      
      <Button
        onClick={handlePDFDownload}
        disabled={isDisabled}
        variant="outline"
        size="sm"
      >
        <Download className="mr-2 h-4 w-4" />
        PDFダウンロード
      </Button>
    </div>
  )
}