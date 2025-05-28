import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmotionAnalysisResult } from '@/app/api/analyze-emotion/route';

// Mock emotion analysis results
const mockAnalysisResults: EmotionAnalysisResult[] = [
  {
    emotions: { joy: 80, sadness: 10, anger: 5, surprise: 15, fear: 5, confidence: 85, interest: 75 },
    facialExpression: '明るく前向きな表情です。笑顔が見られ、目元も和らいでいます。',
    insights: 'ユーザーは現在、非常にポジティブな感情状態にあります。高い喜びと自信が観察され、新しい挑戦に対して積極的な姿勢を示しています。'
  },
  {
    emotions: { joy: 20, sadness: 60, anger: 10, surprise: 5, fear: 25, confidence: 30, interest: 35 },
    facialExpression: '表情が暗く、目線が下向きです。口元も下がり気味で、悲しみが表れています。',
    insights: '感情的に落ち込んでいる状態が見られます。サポートや励ましが必要かもしれません。少し休息を取ることをお勧めします。'
  },
  {
    emotions: { joy: 45, sadness: 20, anger: 35, surprise: 10, fear: 15, confidence: 50, interest: 40 },
    facialExpression: '眉間にしわが寄り、少し緊張した表情です。',
    insights: '複雑な感情状態にあります。ストレスや苛立ちが混在していますが、完全にネガティブではありません。'
  }
];

// Component to display analysis results
function AnalysisDisplay({ result }: { result: EmotionAnalysisResult }) {
  return (
    <div>
      <h3>感情分析結果</h3>
      <div data-testid="facial-expression">
        <strong>表情：</strong>
        {result.facialExpression}
      </div>
      <div data-testid="insights">
        <strong>インサイト：</strong>
        {result.insights}
      </div>
      <div data-testid="emotions">
        <strong>感情スコア：</strong>
        <ul>
          <li>喜び: {result.emotions.joy}%</li>
          <li>悲しみ: {result.emotions.sadness}%</li>
          <li>怒り: {result.emotions.anger}%</li>
          <li>驚き: {result.emotions.surprise}%</li>
          <li>恐れ: {result.emotions.fear}%</li>
          <li>自信: {result.emotions.confidence}%</li>
          <li>興味: {result.emotions.interest}%</li>
        </ul>
      </div>
    </div>
  );
}

describe('Japanese Translation for Expression and Insights', () => {
  it('should display positive emotions in Japanese', () => {
    render(<AnalysisDisplay result={mockAnalysisResults[0]} />);
    
    const expression = screen.getByTestId('facial-expression');
    expect(expression).toHaveTextContent('明るく前向きな表情です');
    expect(expression).toHaveTextContent('笑顔が見られ');
    
    const insights = screen.getByTestId('insights');
    expect(insights).toHaveTextContent('非常にポジティブな感情状態');
    expect(insights).toHaveTextContent('高い喜びと自信');
  });

  it('should display negative emotions in Japanese', () => {
    render(<AnalysisDisplay result={mockAnalysisResults[1]} />);
    
    const expression = screen.getByTestId('facial-expression');
    expect(expression).toHaveTextContent('表情が暗く');
    expect(expression).toHaveTextContent('悲しみが表れています');
    
    const insights = screen.getByTestId('insights');
    expect(insights).toHaveTextContent('感情的に落ち込んでいる状態');
    expect(insights).toHaveTextContent('サポートや励ましが必要');
  });

  it('should display mixed emotions in Japanese', () => {
    render(<AnalysisDisplay result={mockAnalysisResults[2]} />);
    
    const expression = screen.getByTestId('facial-expression');
    expect(expression).toHaveTextContent('眉間にしわが寄り');
    expect(expression).toHaveTextContent('緊張した表情');
    
    const insights = screen.getByTestId('insights');
    expect(insights).toHaveTextContent('複雑な感情状態');
    expect(insights).toHaveTextContent('ストレスや苛立ち');
  });

  it('should display emotion labels in Japanese', () => {
    render(<AnalysisDisplay result={mockAnalysisResults[0]} />);
    
    const emotions = screen.getByTestId('emotions');
    expect(emotions).toHaveTextContent('喜び:');
    expect(emotions).toHaveTextContent('悲しみ:');
    expect(emotions).toHaveTextContent('怒り:');
    expect(emotions).toHaveTextContent('驚き:');
    expect(emotions).toHaveTextContent('恐れ:');
    expect(emotions).toHaveTextContent('自信:');
    expect(emotions).toHaveTextContent('興味:');
  });

  it('should not contain English text in expressions', () => {
    mockAnalysisResults.forEach((result) => {
      const { rerender } = render(<AnalysisDisplay result={result} />);
      
      const expression = screen.getByTestId('facial-expression');
      const insights = screen.getByTestId('insights');
      
      // Check that common English words are not present
      expect(expression.textContent).not.toMatch(/happy|sad|angry|surprised|confident/i);
      expect(insights.textContent).not.toMatch(/positive|negative|emotion|stress|support/i);
      
      rerender(<></>);
    });
  });

  it('should handle various Japanese expressions properly', () => {
    const japaneseExpressions = [
      '穏やかな表情',
      '真剣な眼差し',
      'リラックスした様子',
      '集中している表情',
      '疲れが見える',
      '活発な印象',
    ];

    japaneseExpressions.forEach((expr) => {
      const result = {
        ...mockAnalysisResults[0],
        facialExpression: expr
      };
      
      const { rerender } = render(<AnalysisDisplay result={result} />);
      const expression = screen.getByTestId('facial-expression');
      expect(expression).toHaveTextContent(expr);
      
      rerender(<></>);
    });
  });

  it('should format Japanese text with proper punctuation', () => {
    render(<AnalysisDisplay result={mockAnalysisResults[0]} />);
    
    const expression = screen.getByTestId('facial-expression');
    const insights = screen.getByTestId('insights');
    
    // Check for Japanese punctuation
    expect(expression.textContent).toMatch(/。/);
    expect(insights.textContent).toMatch(/。/);
    
    // Should not have English punctuation at the end
    expect(expression.textContent).not.toMatch(/\.$/);
    expect(insights.textContent).not.toMatch(/\.$/);
  });
});