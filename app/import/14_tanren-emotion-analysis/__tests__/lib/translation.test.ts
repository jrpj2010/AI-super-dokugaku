import { translateEmotionText, translateEmotionAnalysis, emotionLabels } from '@/lib/translation'

describe('Translation Utility', () => {
  describe('translateEmotionText', () => {
    it('should translate basic emotions', () => {
      expect(translateEmotionText('happy')).toBe('幸せ')
      expect(translateEmotionText('sad')).toBe('悲しい')
      expect(translateEmotionText('angry')).toBe('怒り')
      expect(translateEmotionText('surprised')).toBe('驚き')
    })

    it('should translate emotion with intensity', () => {
      expect(translateEmotionText('very happy')).toBe('とても幸せ')
      expect(translateEmotionText('slightly sad')).toBe('やや悲しい')
      expect(translateEmotionText('extremely angry')).toBe('非常に怒り')
    })

    it('should translate facial expressions', () => {
      expect(translateEmotionText('neutral expression')).toBe('中立的な表情')
      expect(translateEmotionText('smiling')).toBe('笑顔')
      expect(translateEmotionText('frowning')).toBe('しかめ面')
    })

    it('should translate complex sentences', () => {
      expect(translateEmotionText('The person appears happy')).toBe('その人は幸せに見えます')
      expect(translateEmotionText('Shows confidence with a smile')).toBe('自信を示している を伴って 笑顔')
    })

    it('should handle empty or null input', () => {
      expect(translateEmotionText('')).toBe('')
      expect(translateEmotionText(null as any)).toBe('')
      expect(translateEmotionText(undefined as any)).toBe('')
    })

    it('should preserve untranslatable words', () => {
      expect(translateEmotionText('unknown emotion')).toContain('unknown')
    })

    it('should translate connecting words', () => {
      expect(translateEmotionText('happy and excited')).toBe('幸せ と 興奮した')
      expect(translateEmotionText('sad but thoughtful')).toBe('悲しい しかし 思慮深い')
    })

    it('should handle mixed case', () => {
      expect(translateEmotionText('HAPPY')).toBe('幸せ')
      expect(translateEmotionText('Happy')).toBe('幸せ')
      expect(translateEmotionText('hApPy')).toBe('幸せ')
    })

    it('should translate sentence endings', () => {
      expect(translateEmotionText('The person is happy.')).toBe('person is 幸せ。')
    })
  })

  describe('translateEmotionAnalysis', () => {
    it('should translate both facial expression and insights', () => {
      const result = translateEmotionAnalysis(
        'Showing happiness with raised eyebrows',
        'The person appears very confident and engaged'
      )
      
      expect(result.facialExpression).toContain('幸福')
      expect(result.facialExpression).toContain('眉を上げている')
      expect(result.insights).toContain('その人は')
      expect(result.insights).toContain('自信')
      expect(result.insights).toContain('集中した')
    })

    it('should handle empty inputs', () => {
      const result = translateEmotionAnalysis('', '')
      expect(result.facialExpression).toBe('')
      expect(result.insights).toBe('')
    })
  })

  describe('emotionLabels', () => {
    it('should contain all required emotion labels', () => {
      const requiredEmotions = [
        'joy', 'anger', 'sadness', 'surprise', 'fear',
        'confidence', 'confusion', 'interest', 'trust',
        'anticipation', 'disgust'
      ]
      
      requiredEmotions.forEach(emotion => {
        expect(emotionLabels).toHaveProperty(emotion)
        expect(typeof emotionLabels[emotion]).toBe('string')
        expect(emotionLabels[emotion].length).toBeGreaterThan(0)
      })
    })

    it('should have correct Japanese translations for emotion labels', () => {
      expect(emotionLabels.joy).toBe('喜び')
      expect(emotionLabels.anger).toBe('怒り')
      expect(emotionLabels.sadness).toBe('悲しみ')
      expect(emotionLabels.surprise).toBe('驚き')
      expect(emotionLabels.fear).toBe('恐れ')
      expect(emotionLabels.confidence).toBe('自信')
      expect(emotionLabels.confusion).toBe('困惑')
      expect(emotionLabels.interest).toBe('興味')
    })
  })

  describe('Edge cases', () => {
    it('should handle punctuation correctly', () => {
      expect(translateEmotionText('happy, sad, and angry')).toBe('幸せ, 悲しい, と 怒り')
    })

    it('should translate multiple occurrences of the same word', () => {
      expect(translateEmotionText('happy happy happy')).toBe('幸せ 幸せ 幸せ')
    })

    it('should handle long text', () => {
      const longText = 'The person appears happy and shows genuine interest while maintaining eye contact with confidence'
      const translated = translateEmotionText(longText)
      
      expect(translated).toContain('幸せ')
      expect(translated).toContain('興味')
      expect(translated).toContain('アイコンタクト')
      expect(translated).toContain('自信')
    })
  })
})