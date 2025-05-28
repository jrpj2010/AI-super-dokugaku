/**
 * Video converter utility for converting WebM to MP4 format
 * Note: Browser-based conversion has limitations. For production use,
 * consider server-side conversion or using MediaRecorder with MP4 support
 * where available (Safari).
 */

/**
 * Check if MP4 recording is supported by the browser
 */
export function isMP4RecordingSupported(): boolean {
  if (!window.MediaRecorder) {
    return false
  }
  
  // Check for MP4 support in MediaRecorder
  const mp4Types = [
    'video/mp4',
    'video/mp4;codecs=h264',
    'video/mp4;codecs=avc1',
    'video/mp4;codecs="avc1.42E01E"',
    'video/mp4;codecs="avc1.42E01E,mp4a.40.2"'
  ]
  
  return mp4Types.some(type => MediaRecorder.isTypeSupported(type))
}

/**
 * Get the best supported video format for recording
 */
export function getBestVideoFormat(): { mimeType: string; extension: string } {
  if (!window.MediaRecorder) {
    return { mimeType: 'video/webm', extension: 'webm' }
  }
  
  // Priority order: MP4 > WebM
  const formats = [
    { mimeType: 'video/mp4;codecs="avc1.42E01E,mp4a.40.2"', extension: 'mp4' },
    { mimeType: 'video/mp4;codecs=h264,aac', extension: 'mp4' },
    { mimeType: 'video/mp4;codecs=h264', extension: 'mp4' },
    { mimeType: 'video/mp4', extension: 'mp4' },
    { mimeType: 'video/webm;codecs=vp9,opus', extension: 'webm' },
    { mimeType: 'video/webm;codecs=vp8,opus', extension: 'webm' },
    { mimeType: 'video/webm;codecs=vp9', extension: 'webm' },
    { mimeType: 'video/webm;codecs=vp8', extension: 'webm' },
    { mimeType: 'video/webm', extension: 'webm' }
  ]
  
  for (const format of formats) {
    if (MediaRecorder.isTypeSupported(format.mimeType)) {
      return format
    }
  }
  
  // Default fallback
  return { mimeType: 'video/webm', extension: 'webm' }
}

/**
 * Simple WebM to MP4 converter using browser-based approach
 * Note: This is a basic implementation. For production use,
 * consider using FFmpeg.wasm or server-side conversion.
 */
export async function convertWebMToMP4(webmBlob: Blob): Promise<Blob> {
  // For now, we'll return the original blob since browser-based
  // WebM to MP4 conversion is complex and requires libraries like FFmpeg.wasm
  // which would significantly increase bundle size.
  
  // In a production environment, you would either:
  // 1. Use MediaRecorder with MP4 support where available (Safari)
  // 2. Send to server for conversion
  // 3. Use FFmpeg.wasm for client-side conversion
  
  console.warn('WebM to MP4 conversion not implemented. Returning original WebM blob.')
  return webmBlob
}

/**
 * Generate filename for video recording
 */
export function generateVideoFilename(sessionId: string, extension: string = 'mp4'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  return `tanren_session_${sessionId}_${timestamp}.${extension}`
}

/**
 * Download video blob with proper filename
 */
export function downloadVideoBlob(
  blob: Blob, 
  sessionId: string, 
  extension: string = 'mp4'
): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = generateVideoFilename(sessionId, extension)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Get video format info for display
 */
export function getVideoFormatInfo(mimeType: string): {
  format: string
  codec: string
  displayName: string
} {
  if (mimeType.includes('mp4')) {
    return {
      format: 'MP4',
      codec: mimeType.includes('h264') || mimeType.includes('avc1') ? 'H.264' : 'Unknown',
      displayName: 'MP4 (H.264)'
    }
  } else if (mimeType.includes('webm')) {
    let codec = 'Unknown'
    if (mimeType.includes('vp9')) codec = 'VP9'
    else if (mimeType.includes('vp8')) codec = 'VP8'
    
    return {
      format: 'WebM',
      codec,
      displayName: `WebM (${codec})`
    }
  }
  
  return {
    format: 'Unknown',
    codec: 'Unknown',
    displayName: 'Unknown Format'
  }
}