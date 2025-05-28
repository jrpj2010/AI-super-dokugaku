import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptArea from '@/components/transcript-area';

describe('TranscriptArea Overflow and Scroll Behavior', () => {
  // Mock scrollIntoView and scrollTop
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have overflow-y-auto class for scrolling', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
    
    const container = screen.getByTestId('transcript-scroll-container');
    expect(container).toHaveClass('overflow-y-auto');
  });

  it('should have max-height constraint', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
    
    const container = screen.getByTestId('transcript-scroll-container');
    expect(container).toHaveClass('max-h-[10vh]');
  });

  it('should display long transcript with proper formatting', () => {
    const longTranscript = `こんにちは、今日は調子がいいです。
新しいプロジェクトを始めようと思っています。
最近、生成AIの技術がどんどん進化していて、本当に驚いています。
特にClaude 3.5のような大規模言語モデルの能力は、私たちの仕事のやり方を根本的に変えようとしています。
今後はAIと協働しながら、より創造的な仕事に集中できるようになるでしょう。
このような変化の時代に生きていることを、とてもワクワクしています。
新しい技術を学び続けることが大切だと思います。`;
    
    render(<TranscriptArea transcript={longTranscript} interimTranscript="" isListening={false} />);
    
    const textElement = screen.getByText(/こんにちは、今日は調子がいいです。/);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('whitespace-pre-wrap');
  });

  it('should auto-scroll to bottom when new transcript is added', async () => {
    const { rerender } = render(
      <TranscriptArea transcript="初期テキスト" interimTranscript="" isListening={false} />
    );
    
    const container = screen.getByTestId('transcript-scroll-container');
    let scrollTopValue = 0;
    Object.defineProperty(container, 'scrollTop', {
      get: () => scrollTopValue,
      set: (value) => { scrollTopValue = value; },
      configurable: true,
    });
    
    // Add new text
    rerender(
      <TranscriptArea 
        transcript="初期テキスト\n新しいテキストが追加されました。" 
        interimTranscript="" 
        isListening={false} 
      />
    );
    
    await waitFor(() => {
      expect(scrollTopValue).toBe(300); // scrollHeight(500) - clientHeight(200)
    });
  });

  it('should auto-scroll when interim transcript is updated', async () => {
    const { rerender } = render(
      <TranscriptArea transcript="既存のテキスト" interimTranscript="" isListening={true} />
    );
    
    const container = screen.getByTestId('transcript-scroll-container');
    let scrollTopValue = 0;
    Object.defineProperty(container, 'scrollTop', {
      get: () => scrollTopValue,
      set: (value) => { scrollTopValue = value; },
      configurable: true,
    });
    
    // Add interim transcript
    rerender(
      <TranscriptArea 
        transcript="既存のテキスト" 
        interimTranscript="現在認識中のテキスト..." 
        isListening={true} 
      />
    );
    
    await waitFor(() => {
      expect(scrollTopValue).toBe(300); // scrollHeight(500) - clientHeight(200)
    });
  });

  it('should show interim transcript in italic gray text', () => {
    render(
      <TranscriptArea 
        transcript="確定したテキスト" 
        interimTranscript="認識中のテキスト" 
        isListening={true} 
      />
    );
    
    const interimText = screen.getByText('認識中のテキスト');
    expect(interimText).toHaveClass('text-gray-400');
    expect(interimText).toHaveClass('italic');
  });

  it('should show placeholder when no transcript exists', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
    
    expect(screen.getByText('音声認識による文字起こしがここに表示されます...')).toBeInTheDocument();
  });

  it('should show listening message when actively listening', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={true} />);
    
    expect(screen.getByText('音声を認識中...')).toBeInTheDocument();
  });

  it('should display error message when error exists', () => {
    const errorMessage = '音声認識でエラーが発生しました';
    render(
      <TranscriptArea 
        transcript="" 
        interimTranscript="" 
        isListening={false} 
        error={errorMessage}
      />
    );
    
    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-red-500');
  });

  it('should handle very long continuous text without spaces', () => {
    const veryLongText = 'あ'.repeat(500); // 500文字の連続テキスト
    
    render(
      <TranscriptArea 
        transcript={veryLongText} 
        interimTranscript="" 
        isListening={false} 
      />
    );
    
    const container = screen.getByTestId('transcript-scroll-container');
    expect(container).toHaveClass('overflow-y-auto');
    
    // Check that the text is rendered
    const textElement = container.querySelector('p');
    expect(textElement).toHaveTextContent(veryLongText);
  });

  it('should preserve line breaks in transcript', () => {
    const multilineTranscript = `第一行のテキスト
第二行のテキスト
第三行のテキスト`;
    
    render(
      <TranscriptArea 
        transcript={multilineTranscript} 
        interimTranscript="" 
        isListening={false} 
      />
    );
    
    const textElement = screen.getByText(/第一行のテキスト/);
    expect(textElement).toHaveClass('whitespace-pre-wrap');
    expect(textElement.textContent).toContain('第一行のテキスト\n第二行のテキスト\n第三行のテキスト');
  });

  it('should not scroll when transcript length does not increase', async () => {
    const { rerender } = render(
      <TranscriptArea transcript="既存のテキスト" interimTranscript="" isListening={false} />
    );
    
    const container = screen.getByTestId('transcript-scroll-container');
    let scrollTopValue = 0;
    let scrollTopSetCount = 0;
    Object.defineProperty(container, 'scrollTop', {
      get: () => scrollTopValue,
      set: (value) => { 
        scrollTopValue = value;
        scrollTopSetCount++;
      },
      configurable: true,
    });
    
    // Reset count after initial render
    scrollTopSetCount = 0;
    
    // Rerender with same text
    rerender(
      <TranscriptArea 
        transcript="既存のテキスト" 
        interimTranscript="" 
        isListening={false} 
      />
    );
    
    await waitFor(() => {
      expect(scrollTopSetCount).toBe(0);
    });
  });

  it('should have smooth scrolling enabled', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
    
    const container = screen.getByTestId('transcript-scroll-container');
    expect(container).toHaveClass('scroll-smooth');
  });

  it('should have word-wrap styles to prevent text overflow', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
    
    const container = screen.getByTestId('transcript-scroll-container');
    expect(container).toHaveStyle({
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    });
    
    const textElement = container.querySelector('p');
    expect(textElement).toHaveClass('break-words');
  });

  it('should handle transcript updates during active recording', async () => {
    const { rerender } = render(
      <TranscriptArea 
        transcript="開始：" 
        interimTranscript="" 
        isListening={true} 
      />
    );
    
    // Simulate progressive updates
    rerender(
      <TranscriptArea 
        transcript="開始：今日は" 
        interimTranscript="天気が" 
        isListening={true} 
      />
    );
    
    expect(screen.getByText('開始：今日は')).toBeInTheDocument();
    expect(screen.getByText('天気が')).toBeInTheDocument();
    
    // Finalize the interim transcript
    rerender(
      <TranscriptArea 
        transcript="開始：今日は天気がいいですね。" 
        interimTranscript="" 
        isListening={true} 
      />
    );
    
    expect(screen.getByText('開始：今日は天気がいいですね。')).toBeInTheDocument();
    expect(screen.queryByText('天気が')).not.toBeInTheDocument();
  });
});