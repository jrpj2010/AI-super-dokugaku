import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmotionRadarChart from '@/components/emotion-radar-chart';
import EmotionTrendChart from '@/components/emotion-trend-chart';
import { FaceMap } from '@/components/face-map';
import { SessionRecording } from '@/components/session-recording';
import { TranscriptDisplay } from '@/components/transcript-display';
import { VoiceMetrics } from '@/components/voice-metrics';

describe('Initial Empty States', () => {
  describe('EmotionRadarChart', () => {
    it('should display empty state message before session starts', () => {
      render(<EmotionRadarChart data={undefined} />);
      expect(screen.getByText('セッション開始時に感情分析が表示されます')).toBeInTheDocument();
    });

    it('should not display any chart elements when data is null', () => {
      const { container } = render(<EmotionRadarChart data={undefined} />);
      expect(container.querySelector('.recharts-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('EmotionTrendChart', () => {
    it('should display empty state message before session starts', () => {
      render(<EmotionTrendChart data={[]} />);
      expect(screen.getByText('セッション開始時に感情推移が表示されます')).toBeInTheDocument();
    });

    it('should not display chart when data is empty', () => {
      const { container } = render(<EmotionTrendChart data={[]} />);
      expect(container.querySelector('.recharts-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('FaceMap', () => {
    it('should display waiting message before landmarks are detected', () => {
      render(<FaceMap landmarks={null} />);
      expect(screen.getByText('顔認識を待機中...')).toBeInTheDocument();
    });

    it('should not display canvas when landmarks are null', () => {
      const { container } = render(<FaceMap landmarks={null} />);
      expect(container.querySelector('canvas')).not.toBeInTheDocument();
    });
  });

  describe('TranscriptDisplay', () => {
    it('should display empty state when no transcript exists', () => {
      render(<TranscriptDisplay transcript="" />);
      expect(screen.getByText('音声認識待機中...')).toBeInTheDocument();
    });

    it('should have proper scroll container styles', () => {
      const { container } = render(<TranscriptDisplay transcript="" />);
      const scrollContainer = container.querySelector('[data-testid="transcript-container"]');
      expect(scrollContainer).toHaveClass('overflow-y-auto');
    });
  });

  describe('VoiceMetrics', () => {
    it('should display zero values before session starts', () => {
      render(<VoiceMetrics metrics={{ pitch: 0, volume: 0, speed: 0 }} />);
      
      // Check that gauges are rendered but with zero values
      expect(screen.getByText('ピッチ')).toBeInTheDocument();
      expect(screen.getByText('音量')).toBeInTheDocument();
      expect(screen.getByText('話速')).toBeInTheDocument();
    });
  });

  describe('SessionRecording', () => {
    it('should not display any recordings when sessions array is empty', () => {
      render(<SessionRecording sessions={[]} />);
      expect(screen.getByText('録画セッションがありません')).toBeInTheDocument();
    });

    it('should hide recording indicator when not recording', () => {
      render(<SessionRecording sessions={[]} />);
      expect(screen.queryByText('録画中')).not.toBeInTheDocument();
    });
  });
});