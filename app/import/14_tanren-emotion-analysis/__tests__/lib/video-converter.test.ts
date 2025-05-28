import { 
  isMP4RecordingSupported, 
  getBestVideoFormat, 
  generateVideoFilename, 
  downloadVideoBlob,
  getVideoFormatInfo 
} from '@/lib/video-converter'

// Mock MediaRecorder
const mockIsTypeSupported = jest.fn()
global.MediaRecorder = {
  isTypeSupported: mockIsTypeSupported
} as any

// Mock DOM methods
const mockCreateElement = jest.spyOn(document, 'createElement')
const mockAppendChild = jest.spyOn(document.body, 'appendChild')
const mockRemoveChild = jest.spyOn(document.body, 'removeChild')
const mockCreateObjectURL = jest.fn()
const mockRevokeObjectURL = jest.fn()

global.URL.createObjectURL = mockCreateObjectURL
global.URL.revokeObjectURL = mockRevokeObjectURL

describe('Video Converter Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCreateObjectURL.mockReturnValue('blob:http://localhost/test')
  })

  describe('isMP4RecordingSupported', () => {
    it('should return true when MP4 is supported', () => {
      mockIsTypeSupported.mockReturnValue(true)
      
      const result = isMP4RecordingSupported()
      
      expect(result).toBe(true)
      expect(mockIsTypeSupported).toHaveBeenCalledWith(expect.stringContaining('video/mp4'))
    })

    it('should return false when MP4 is not supported', () => {
      mockIsTypeSupported.mockReturnValue(false)
      
      const result = isMP4RecordingSupported()
      
      expect(result).toBe(false)
    })

    it('should return false when MediaRecorder is not available', () => {
      const originalMediaRecorder = global.MediaRecorder
      delete (global as any).MediaRecorder
      
      const result = isMP4RecordingSupported()
      
      expect(result).toBe(false)
      
      global.MediaRecorder = originalMediaRecorder
    })
  })

  describe('getBestVideoFormat', () => {
    it('should return MP4 format when supported', () => {
      mockIsTypeSupported.mockImplementation((type) => type.includes('mp4'))
      
      const result = getBestVideoFormat()
      
      expect(result.extension).toBe('mp4')
      expect(result.mimeType).toContain('video/mp4')
    })

    it('should return WebM format when MP4 is not supported', () => {
      mockIsTypeSupported.mockImplementation((type) => type.includes('webm'))
      
      const result = getBestVideoFormat()
      
      expect(result.extension).toBe('webm')
      expect(result.mimeType).toContain('video/webm')
    })

    it('should return default WebM when nothing is supported', () => {
      mockIsTypeSupported.mockReturnValue(false)
      
      const result = getBestVideoFormat()
      
      expect(result).toEqual({ mimeType: 'video/webm', extension: 'webm' })
    })
  })

  describe('generateVideoFilename', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-01-15T10:30:45.123Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should generate filename with MP4 extension by default', () => {
      const filename = generateVideoFilename('123456')
      
      expect(filename).toBe('tanren_session_123456_2024-01-15T10-30-45.mp4')
    })

    it('should generate filename with custom extension', () => {
      const filename = generateVideoFilename('789012', 'webm')
      
      expect(filename).toBe('tanren_session_789012_2024-01-15T10-30-45.webm')
    })
  })

  describe('downloadVideoBlob', () => {
    it('should create and click download link with MP4 extension', () => {
      const mockBlob = new Blob(['test'], { type: 'video/mp4' })
      const mockAnchor = { 
        href: '', 
        download: '', 
        click: jest.fn() 
      }
      
      mockCreateElement.mockReturnValue(mockAnchor as any)
      
      downloadVideoBlob(mockBlob, '123456', 'mp4')
      
      expect(mockCreateElement).toHaveBeenCalledWith('a')
      expect(mockAnchor.href).toBe('blob:http://localhost/test')
      expect(mockAnchor.download).toMatch(/^tanren_session_123456_.*\.mp4$/)
      expect(mockAnchor.click).toHaveBeenCalled()
      expect(mockAppendChild).toHaveBeenCalledWith(mockAnchor)
      expect(mockRemoveChild).toHaveBeenCalledWith(mockAnchor)
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/test')
    })

    it('should handle WebM extension correctly', () => {
      const mockBlob = new Blob(['test'], { type: 'video/webm' })
      const mockAnchor = { 
        href: '', 
        download: '', 
        click: jest.fn() 
      }
      
      mockCreateElement.mockReturnValue(mockAnchor as any)
      
      downloadVideoBlob(mockBlob, '789012', 'webm')
      
      expect(mockAnchor.download).toMatch(/^tanren_session_789012_.*\.webm$/)
    })
  })

  describe('getVideoFormatInfo', () => {
    it('should return MP4 info for MP4 mime type', () => {
      const info = getVideoFormatInfo('video/mp4;codecs=h264')
      
      expect(info).toEqual({
        format: 'MP4',
        codec: 'H.264',
        displayName: 'MP4 (H.264)'
      })
    })

    it('should return WebM VP9 info', () => {
      const info = getVideoFormatInfo('video/webm;codecs=vp9')
      
      expect(info).toEqual({
        format: 'WebM',
        codec: 'VP9',
        displayName: 'WebM (VP9)'
      })
    })

    it('should return WebM VP8 info', () => {
      const info = getVideoFormatInfo('video/webm;codecs=vp8')
      
      expect(info).toEqual({
        format: 'WebM',
        codec: 'VP8',
        displayName: 'WebM (VP8)'
      })
    })

    it('should handle unknown format', () => {
      const info = getVideoFormatInfo('video/unknown')
      
      expect(info).toEqual({
        format: 'Unknown',
        codec: 'Unknown',
        displayName: 'Unknown Format'
      })
    })
  })
})