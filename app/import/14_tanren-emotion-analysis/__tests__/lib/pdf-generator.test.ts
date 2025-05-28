import { PDFGenerator } from '@/lib/pdf-generator'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Mock jsPDF
jest.mock('jspdf', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    addPage: jest.fn(),
    output: jest.fn(() => new Blob(['mock pdf content'], { type: 'application/pdf' })),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    text: jest.fn(),
    getTextWidth: jest.fn(() => 50)
  }))
}))

// Mock html2canvas
jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({
    toDataURL: jest.fn(() => 'data:image/png;base64,mockImageData'),
    width: 800,
    height: 1200
  }))
}))

describe('PDFGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('generateReportPDF', () => {
    it('should generate PDF from HTML element', async () => {
      const mockElement = document.createElement('div')
      mockElement.innerHTML = '<h1>Test Report</h1>'
      
      const pdfGenerator = new PDFGenerator()
      const options = {
        sessionId: 'test-session-123',
        timestamp: '2024-01-15T10:30:45'
      }
      
      const pdfBlob = await pdfGenerator.generateReportPDF(mockElement, options)
      
      expect(html2canvas).toHaveBeenCalledWith(mockElement, expect.objectContaining({
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      }))
      
      expect(pdfBlob).toBeInstanceOf(Blob)
      expect(pdfBlob.type).toBe('application/pdf')
    })

    it('should handle multi-page PDFs', async () => {
      const mockElement = document.createElement('div')
      mockElement.innerHTML = '<h1>Very Long Report</h1>'.repeat(100)
      
      // Mock a tall canvas that requires multiple pages
      const mockCanvas = {
        toDataURL: jest.fn(() => 'data:image/png;base64,mockImageData'),
        width: 800,
        height: 3000 // Very tall to require multiple pages
      }
      ;(html2canvas as jest.Mock).mockResolvedValueOnce(mockCanvas)
      
      const pdfGenerator = new PDFGenerator()
      const mockJsPDFInstance = (jsPDF as jest.MockedClass<typeof jsPDF>).mock.results[0].value
      
      const options = {
        sessionId: 'test-session-123',
        timestamp: '2024-01-15T10:30:45'
      }
      
      await pdfGenerator.generateReportPDF(mockElement, options)
      
      // Check that addPage was called for multi-page content
      expect(mockJsPDFInstance.addPage).toHaveBeenCalled()
    })

    it('should add footer to each page', async () => {
      const mockElement = document.createElement('div')
      mockElement.innerHTML = '<h1>Test Report</h1>'
      
      const pdfGenerator = new PDFGenerator()
      const mockJsPDFInstance = (jsPDF as jest.MockedClass<typeof jsPDF>).mock.results[0].value
      
      const options = {
        sessionId: 'test-session-123',
        timestamp: '2024-01-15T10:30:45'
      }
      
      await pdfGenerator.generateReportPDF(mockElement, options)
      
      // Check that footer text was added
      expect(mockJsPDFInstance.setFontSize).toHaveBeenCalledWith(10)
      expect(mockJsPDFInstance.setTextColor).toHaveBeenCalledWith(128, 128, 128)
      expect(mockJsPDFInstance.text).toHaveBeenCalledWith(
        'TANREN Ver 1.1.2',
        expect.any(Number),
        expect.any(Number)
      )
      expect(mockJsPDFInstance.text).toHaveBeenCalledWith(
        'Page 1',
        10,
        expect.any(Number)
      )
    })

    it('should handle errors gracefully', async () => {
      const mockElement = document.createElement('div')
      
      // Mock html2canvas to throw an error
      ;(html2canvas as jest.Mock).mockRejectedValueOnce(new Error('Canvas generation failed'))
      
      const pdfGenerator = new PDFGenerator()
      const options = {
        sessionId: 'test-session-123',
        timestamp: '2024-01-15T10:30:45'
      }
      
      await expect(pdfGenerator.generateReportPDF(mockElement, options))
        .rejects.toThrow('PDFの生成に失敗しました')
    })
  })

  describe('generateFileName', () => {
    it('should generate filename with correct format', () => {
      const sessionId = '123456789'
      const timestamp = '2024-01-15T10-30-45'
      
      const filename = PDFGenerator.generateFileName(sessionId, timestamp)
      
      expect(filename).toBe('tanren_emotion_report_123456789_2024-01-15T10-30-45.pdf')
    })

    it('should handle spaces and colons in timestamp', () => {
      const sessionId = '987654321'
      const timestamp = '2024-01-15 10:30:45'
      
      const filename = PDFGenerator.generateFileName(sessionId, timestamp)
      
      expect(filename).toBe('tanren_emotion_report_987654321_2024-01-15_10_30_45.pdf')
    })

    it('should handle empty sessionId', () => {
      const sessionId = ''
      const timestamp = '2024-01-15T10-30-45'
      
      const filename = PDFGenerator.generateFileName(sessionId, timestamp)
      
      expect(filename).toBe('tanren_emotion_report__2024-01-15T10-30-45.pdf')
    })
  })

  describe('integration with report content', () => {
    it('should capture all report sections', async () => {
      // Create a mock report element with all sections
      const mockReportElement = document.createElement('div')
      mockReportElement.id = 'analysis-report'
      mockReportElement.innerHTML = `
        <div class="header">
          <h2>2024年1月15日 10:30 のあなたの状態</h2>
          <p>録画時間: 5分30秒</p>
        </div>
        <div class="session-info">
          <p>セッションID: test-session-123</p>
        </div>
        <div class="emotion-stats">
          <h3>感情統計</h3>
          <div>喜び: 80%</div>
        </div>
        <div class="timeline">
          <h3>感情タイムライン</h3>
        </div>
        <div class="recommendations">
          <h3>推奨事項</h3>
          <p>積極的な姿勢が見られました</p>
        </div>
      `
      
      const pdfGenerator = new PDFGenerator()
      const options = {
        sessionId: 'test-session-123',
        timestamp: '2024-01-15T10:30:45'
      }
      
      const pdfBlob = await pdfGenerator.generateReportPDF(mockReportElement, options)
      
      expect(html2canvas).toHaveBeenCalledWith(
        mockReportElement,
        expect.any(Object)
      )
      expect(pdfBlob).toBeInstanceOf(Blob)
    })
  })
})