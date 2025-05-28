import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptArea from '@/components/transcript-area';

describe('TranscriptArea Long Text E2E Test', () => {
  it('should handle extremely long transcript without UI breaking', async () => {
    // Generate very long transcript
    const longTranscript = `
      初めまして、本日は長文の文字起こしテストを行います。
      ${Array(50).fill('これは非常に長い文章のテストです。音声認識によって生成された文字起こしが画面に収まるかどうかを確認しています。').join(' ')}
      最後に、この長文が適切にスクロール可能で、UIが崩れていないことを確認します。
    `.trim();

    const { container } = render(
      <TranscriptArea 
        transcript={longTranscript} 
        interimTranscript="" 
        isListening={false} 
      />
    );

    const scrollContainer = screen.getByTestId('transcript-scroll-container');
    
    // Verify container has correct classes and styles
    expect(scrollContainer).toHaveClass('overflow-y-auto');
    expect(scrollContainer).toHaveClass('max-h-[10vh]');
    expect(scrollContainer).toHaveStyle({
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    });

    // Verify text element has break-words class
    const textElement = scrollContainer.querySelector('p');
    expect(textElement).toHaveClass('break-words');
    
    // Verify text content is present
    expect(textElement).toHaveTextContent('初めまして、本日は長文の文字起こしテストを行います。');
    
    // Simulate viewport height for 10vh calculation
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    // Get computed styles
    const computedStyle = window.getComputedStyle(scrollContainer);
    
    // Verify the container is scrollable (content height > container height)
    const scrollHeight = scrollContainer.scrollHeight;
    const clientHeight = scrollContainer.clientHeight;
    
    // Long text should cause overflow
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  });

  it('should auto-scroll when receiving continuous updates', async () => {
    const { rerender } = render(
      <TranscriptArea 
        transcript="開始" 
        interimTranscript="" 
        isListening={true} 
      />
    );

    const scrollContainer = screen.getByTestId('transcript-scroll-container');
    
    // Mock scroll properties
    let scrollTopValue = 0;
    Object.defineProperty(scrollContainer, 'scrollTop', {
      get: () => scrollTopValue,
      set: (value) => { scrollTopValue = value; },
      configurable: true,
    });
    Object.defineProperty(scrollContainer, 'scrollHeight', {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(scrollContainer, 'clientHeight', {
      configurable: true,
      value: 100, // 10vh of 1000px viewport
    });

    // Simulate continuous updates
    const updates = [
      "開始しました。",
      "開始しました。今日は天気がいいですね。",
      "開始しました。今日は天気がいいですね。新しいプロジェクトについて話しましょう。",
      "開始しました。今日は天気がいいですね。新しいプロジェクトについて話しましょう。まず最初に、要件定義から始めます。"
    ];

    for (const update of updates) {
      rerender(
        <TranscriptArea 
          transcript={update} 
          interimTranscript="..." 
          isListening={true} 
        />
      );

      await waitFor(() => {
        // Should scroll to bottom (scrollHeight - clientHeight)
        expect(scrollTopValue).toBe(400);
      });
    }
  });

  it('should not break UI with special characters and emojis', () => {
    const specialTranscript = `
      特殊文字テスト: !@#$%^&*()_+-=[]{}|;':",./<>?
      絵文字テスト: 😀😎🎉🔥💡🚀
      Unicode文字: 你好世界 مرحبا بالعالم Здравствуй мир
      改行とタブ:
      \t- インデントされた行
      \t\t- 深いインデント
      長いURL: https://example.com/very/long/path/that/might/break/the/layout/if/not/handled/properly/with/word/wrap
    `.trim();

    render(
      <TranscriptArea 
        transcript={specialTranscript} 
        interimTranscript="" 
        isListening={false} 
      />
    );

    const scrollContainer = screen.getByTestId('transcript-scroll-container');
    const textElement = scrollContainer.querySelector('p');
    
    // Verify special characters are displayed
    expect(textElement).toHaveTextContent('!@#$%^&*()');
    expect(textElement).toHaveTextContent('😀😎🎉');
    expect(textElement).toHaveTextContent('你好世界');
    
    // Verify whitespace preservation
    expect(textElement).toHaveClass('whitespace-pre-wrap');
    
    // Verify no horizontal overflow
    expect(scrollContainer).toHaveClass('overflow-y-auto');
    expect(textElement).toHaveClass('break-words');
  });
});