import {
  generateEmotionData,
  generateSentimentData,
  generateFaceMetrics,
  generateConversationMetrics,
  generateTimeSeriesData,
} from '@/lib/mock-data'

describe('Mock Data Generation Functions', () => {
  describe('generateEmotionData', () => {
    it('should generate emotion data with all required properties', () => {
      const data = generateEmotionData(0)
      
      expect(data).toHaveProperty('happiness')
      expect(data).toHaveProperty('surprise')
      expect(data).toHaveProperty('fear')
      expect(data).toHaveProperty('disgust')
      expect(data).toHaveProperty('anger')
      expect(data).toHaveProperty('sadness')
    })

    it('should generate values within 0-100 range', () => {
      for (let i = 0; i < 10; i++) {
        const data = generateEmotionData(i)
        
        expect(data.happiness).toBeGreaterThanOrEqual(0)
        expect(data.happiness).toBeLessThanOrEqual(100)
        expect(data.surprise).toBeGreaterThanOrEqual(0)
        expect(data.surprise).toBeLessThanOrEqual(100)
        expect(data.fear).toBeGreaterThanOrEqual(0)
        expect(data.fear).toBeLessThanOrEqual(100)
        expect(data.disgust).toBeGreaterThanOrEqual(0)
        expect(data.disgust).toBeLessThanOrEqual(100)
        expect(data.anger).toBeGreaterThanOrEqual(0)
        expect(data.anger).toBeLessThanOrEqual(100)
        expect(data.sadness).toBeGreaterThanOrEqual(0)
        expect(data.sadness).toBeLessThanOrEqual(100)
      }
    })

    it('should generate different values for different time inputs', () => {
      const data1 = generateEmotionData(0)
      const data2 = generateEmotionData(10)
      
      // At least one emotion should be different
      const isDifferent = 
        data1.happiness !== data2.happiness ||
        data1.surprise !== data2.surprise ||
        data1.fear !== data2.fear ||
        data1.disgust !== data2.disgust ||
        data1.anger !== data2.anger ||
        data1.sadness !== data2.sadness
      
      expect(isDifferent).toBe(true)
    })
  })

  describe('generateSentimentData', () => {
    it('should generate sentiment data based on emotions', () => {
      const emotions = {
        happiness: 60,
        surprise: 20,
        fear: 5,
        disgust: 5,
        anger: 5,
        sadness: 5,
      }
      
      const sentiment = generateSentimentData(emotions)
      
      expect(sentiment).toHaveProperty('positive')
      expect(sentiment).toHaveProperty('negative')
      expect(sentiment).toHaveProperty('neutral')
    })

    it('should calculate sentiment percentages correctly', () => {
      const emotions = {
        happiness: 80,
        surprise: 20,
        fear: 0,
        disgust: 0,
        anger: 0,
        sadness: 0,
      }
      
      const sentiment = generateSentimentData(emotions)
      
      // Positive should be high
      expect(sentiment.positive).toBeGreaterThan(50)
      expect(sentiment.negative).toBeLessThan(50)
    })

    it('should handle zero emotions', () => {
      const emotions = {
        happiness: 0,
        surprise: 0,
        fear: 0,
        disgust: 0,
        anger: 0,
        sadness: 0,
      }
      
      const sentiment = generateSentimentData(emotions)
      
      expect(sentiment.positive).toBe(0)
      expect(sentiment.negative).toBe(0)
      expect(sentiment.neutral).toBe(100)
    })
  })

  describe('generateFaceMetrics', () => {
    it('should generate face metrics with required properties', () => {
      const metrics = generateFaceMetrics(0)
      
      expect(metrics).toHaveProperty('faceMovement')
      expect(metrics).toHaveProperty('sightMovement')
    })

    it('should generate values within 0-100 range', () => {
      for (let i = 0; i < 10; i++) {
        const metrics = generateFaceMetrics(i)
        
        expect(metrics.faceMovement).toBeGreaterThanOrEqual(0)
        expect(metrics.faceMovement).toBeLessThanOrEqual(100)
        expect(metrics.sightMovement).toBeGreaterThanOrEqual(0)
        expect(metrics.sightMovement).toBeLessThanOrEqual(100)
      }
    })
  })

  describe('generateConversationMetrics', () => {
    it('should generate conversation metrics with all properties', () => {
      const metrics = generateConversationMetrics()
      
      expect(metrics).toHaveProperty('blinkRate')
      expect(metrics).toHaveProperty('calmness')
      expect(metrics).toHaveProperty('speechSpeed')
      expect(metrics).toHaveProperty('pauseDuration')
      expect(metrics).toHaveProperty('fluency')
    })

    it('should generate values within expected ranges', () => {
      for (let i = 0; i < 10; i++) {
        const metrics = generateConversationMetrics()
        
        expect(metrics.blinkRate).toBeGreaterThanOrEqual(30)
        expect(metrics.blinkRate).toBeLessThanOrEqual(70)
        expect(metrics.calmness).toBeGreaterThanOrEqual(60)
        expect(metrics.calmness).toBeLessThanOrEqual(90)
        expect(metrics.speechSpeed).toBeGreaterThanOrEqual(40)
        expect(metrics.speechSpeed).toBeLessThanOrEqual(80)
        expect(metrics.pauseDuration).toBeGreaterThanOrEqual(20)
        expect(metrics.pauseDuration).toBeLessThanOrEqual(50)
        expect(metrics.fluency).toBeGreaterThanOrEqual(65)
        expect(metrics.fluency).toBeLessThanOrEqual(95)
      }
    })
  })

  describe('generateTimeSeriesData', () => {
    it('should generate time series data with default length', () => {
      const data = generateTimeSeriesData()
      
      expect(data).toHaveLength(60)
    })

    it('should generate time series data with custom length', () => {
      const data = generateTimeSeriesData(30)
      
      expect(data).toHaveLength(30)
    })

    it('should generate data points with correct structure', () => {
      const data = generateTimeSeriesData(5)
      
      data.forEach((point, index) => {
        expect(point).toHaveProperty('time', index)
        expect(point).toHaveProperty('emotions')
        expect(point).toHaveProperty('sentiment')
        expect(point.emotions).toHaveProperty('happiness')
        expect(point.sentiment).toHaveProperty('positive')
      })
    })
  })
})