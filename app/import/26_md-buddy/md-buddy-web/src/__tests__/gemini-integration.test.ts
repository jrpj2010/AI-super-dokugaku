// Gemini API統合テスト

import { GeminiLiveClient, ConnectionState } from '../services/gemini/gemini-live-client';
import { MarkdownConverter, ConversionType, OutputFormat } from '../services/gemini/markdown-converter';
import { MeetingNotesPrompts, MeetingType } from '../services/gemini/prompts/meeting-notes';
import { ActionExtractor, ActionType } from '../services/gemini/action-extractor';
import { GeminiProxy } from '../services/api/gemini-proxy';
import { GeminiErrorHandler, GeminiErrorCode } from '../services/gemini/error-handler';

// WebSocketモック
class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;

  constructor(public url: string) {
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      if (this.onopen) {
        this.onopen(new Event('open'));
      }
    }, 100);
  }

  send(data: string | ArrayBuffer) {
    if (this.readyState !== MockWebSocket.OPEN) {
      throw new Error('WebSocket is not open');
    }
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
  }
}

// グローバルモック
(global as any).WebSocket = MockWebSocket;

// Fetchモック
global.fetch = jest.fn();

describe('Gemini API統合テスト', () => {
  describe('GeminiLiveClient', () => {
    let client: GeminiLiveClient;
    const mockApiKey = 'test-api-key-1234567890';

    beforeEach(() => {
      client = new GeminiLiveClient(mockApiKey);
    });

    afterEach(() => {
      client.disconnect();
    });

    it('WebSocket接続を確立できる', (done) => {
      client.on('open', () => {
        expect(client.getConnectionState()).toBe(ConnectionState.CONNECTED);
        done();
      });

      client.connect();
    });

    it('メッセージを送信できる', (done) => {
      client.on('open', () => {
        const testMessage = { type: 'text', content: 'テストメッセージ' };
        const result = client.send(testMessage);
        expect(result).toBe(true);
        done();
      });

      client.connect();
    });

    it('音声データを送信できる', (done) => {
      client.on('open', () => {
        const audioData = new ArrayBuffer(1000);
        const result = client.sendAudio(audioData);
        expect(result).toBe(true);
        done();
      });

      client.connect();
    });

    it('接続エラーを処理できる', (done) => {
      client.on('error', (error) => {
        expect(error).toBeDefined();
        done();
      });

      const ws = client.connect();
      setTimeout(() => {
        if (ws.onerror) {
          ws.onerror(new Event('error'));
        }
      }, 50);
    });

    it('再接続を実行できる', async () => {
      await new Promise<void>((resolve) => {
        client.on('open', () => resolve());
        client.connect();
      });

      client.disconnect();
      expect(client.getConnectionState()).toBe(ConnectionState.DISCONNECTED);

      await new Promise<void>((resolve) => {
        client.on('open', () => resolve());
        client.connect();
      });

      expect(client.getConnectionState()).toBe(ConnectionState.CONNECTED);
    });
  });

  describe('MarkdownConverter', () => {
    let converter: MarkdownConverter;

    beforeEach(() => {
      converter = new MarkdownConverter({ apiKey: 'test-key' });
      
      // fetchモックの設定
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [{
            content: {
              parts: [{
                text: '# テスト見出し\n\nテスト内容'
              }]
            }
          }]
        })
      });
    });

    it('音声をMarkdownに変換できる', async () => {
      const audioData = {
        processedBuffer: new ArrayBuffer(1000),
        duration: 5
      };

      const result = await converter.convertAudioToMarkdown(audioData, {
        type: ConversionType.MEETING_NOTES,
        outputFormat: OutputFormat.MARKDOWN
      });

      expect(result.markdown).toContain('# テスト見出し');
      expect(result.metadata.conversionType).toBe(ConversionType.MEETING_NOTES);
      expect(result.metadata.duration).toBe(5);
    });

    it('テキストをMarkdownに変換できる', async () => {
      const text = 'これはテストテキストです。';

      const result = await converter.convertTextToMarkdown(text, {
        type: ConversionType.ARTICLE,
        language: 'ja'
      });

      expect(result.markdown).toBeDefined();
      expect(result.metadata.sourceType).toBe('text');
      expect(result.metadata.language).toBe('ja');
    });

    it('複数の出力形式をサポートする', async () => {
      const text = 'テスト内容';

      // HTML形式
      const htmlResult = await converter.convertTextToMarkdown(text, {
        outputFormat: OutputFormat.HTML
      });
      expect(htmlResult.metadata.outputFormat).toBe(OutputFormat.HTML);

      // プレーンテキスト形式
      const plainResult = await converter.convertTextToMarkdown(text, {
        outputFormat: OutputFormat.PLAIN_TEXT
      });
      expect(plainResult.metadata.outputFormat).toBe(OutputFormat.PLAIN_TEXT);
    });

    it('エラーを適切に処理する', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('ネットワークエラー'));

      await expect(
        converter.convertTextToMarkdown('テスト')
      ).rejects.toThrow();
    });
  });

  describe('MeetingNotesPrompts', () => {
    it('会議タイプごとに適切なプロンプトを生成する', () => {
      const config = {
        meetingType: MeetingType.STANDUP,
        language: 'ja' as const,
        participants: ['Alice', 'Bob'],
        duration: 15
      };

      const prompt = MeetingNotesPrompts.generatePrompt(config);

      expect(prompt).toContain('スタンドアップミーティング');
      expect(prompt).toContain('Alice');
      expect(prompt).toContain('Bob');
    });

    it('業界固有のプロンプトを生成できる', () => {
      const techPrompt = MeetingNotesPrompts.generateIndustrySpecificPrompt('tech', 'ja');
      expect(techPrompt).toContain('技術');

      const financePrompt = MeetingNotesPrompts.generateIndustrySpecificPrompt('finance', 'en');
      expect(financePrompt).toContain('financial');
    });
  });

  describe('ActionExtractor', () => {
    let extractor: ActionExtractor;

    beforeEach(() => {
      extractor = new ActionExtractor({ apiKey: 'test-key' });

      // モックレスポンス
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  actions: [
                    {
                      type: ActionType.TASK,
                      text: 'レポートを作成する',
                      assignee: 'Alice',
                      dueDate: '2024-12-31',
                      priority: 'high'
                    }
                  ]
                })
              }]
            }
          }]
        })
      });
    });

    it('テキストからアクションアイテムを抽出できる', async () => {
      const text = 'Aliceはレポートを作成する必要があります。期限は年末までです。';

      const result = await extractor.extractActions(text);

      expect(result.actions.length).toBeGreaterThan(0);
      expect(result.actions[0].type).toBe(ActionType.TASK);
      expect(result.actions[0].assignee).toBe('Alice');
    });

    it('特定のアクションタイプのみを抽出できる', async () => {
      const text = 'タスクと決定事項が含まれるテキスト';

      const result = await extractor.extractSpecificActions(
        text,
        [ActionType.TASK],
        { language: 'ja' }
      );

      expect(result.every(action => action.type === ActionType.TASK)).toBe(true);
    });
  });

  describe('GeminiProxy', () => {
    let proxy: GeminiProxy;

    beforeEach(() => {
      proxy = new GeminiProxy({
        apiUrl: 'https://generativelanguage.googleapis.com',
        apiKey: 'test-key',
        rateLimit: { requests: 10, windowMs: 60000 }
      });
    });

    it('APIリクエストを実行できる', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 'success' })
      });

      const result = await proxy.request('/v1/test', {
        method: 'POST',
        body: { test: true }
      });

      expect(result).toEqual({ result: 'success' });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('generativelanguage.googleapis.com'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-key'
          })
        })
      );
    });

    it('レート制限を適用する', async () => {
      // 10回のリクエストを実行
      const promises = [];
      for (let i = 0; i < 10; i++) {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: i })
        });
        promises.push(proxy.request('/v1/test'));
      }

      await Promise.all(promises);

      // 11回目はレート制限エラー
      await expect(proxy.request('/v1/test')).rejects.toThrow('レート制限');
    });

    it('ストリーミングレスポンスを処理できる', async () => {
      const mockStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"text":"test"}\n\n'));
          controller.close();
        }
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockStream
      });

      const stream = await proxy.request('/v1/stream', { stream: true });
      expect(stream).toBeInstanceOf(ReadableStream);
    });
  });

  describe('GeminiErrorHandler', () => {
    it('エラーコードを正しく分類する', () => {
      const authError = GeminiErrorHandler.parseError({
        error: { code: 401, message: 'Unauthorized' }
      });
      expect(authError.code).toBe(GeminiErrorCode.AUTH_ERROR);

      const networkError = GeminiErrorHandler.parseError(
        new TypeError('Failed to fetch')
      );
      expect(networkError.code).toBe(GeminiErrorCode.NETWORK_ERROR);
    });

    it('復旧提案を提供する', () => {
      const error = {
        code: GeminiErrorCode.QUOTA_EXCEEDED,
        message: 'クォータを超過しました'
      };

      const suggestions = GeminiErrorHandler.getRecoverySuggestions(error);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some(s => s.includes('待機'))).toBe(true);
    });

    it('ユーザーフレンドリーなメッセージを生成する', () => {
      const error = {
        code: GeminiErrorCode.INVALID_API_KEY,
        message: 'Invalid API key'
      };

      const userMessage = GeminiErrorHandler.getUserFriendlyMessage(error);
      expect(userMessage).toContain('APIキー');
      expect(userMessage).not.toContain('Invalid');
    });
  });

  describe('統合シナリオテスト', () => {
    it('音声録音からMarkdown生成までの完全なフロー', async () => {
      // 1. 音声データの準備
      const audioData = new ArrayBuffer(10000);
      
      // 2. GeminiLiveClientで接続
      const client = new GeminiLiveClient('test-key');
      await new Promise<void>((resolve) => {
        client.on('open', resolve);
        client.connect();
      });

      // 3. 音声データ送信
      const sendResult = client.sendAudio(audioData);
      expect(sendResult).toBe(true);

      // 4. Markdown変換
      const converter = new MarkdownConverter({ apiKey: 'test-key' });
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          candidates: [{
            content: {
              parts: [{
                text: '# 会議メモ\n\n## 参加者\n- Alice\n- Bob\n\n## アクションアイテム\n- レポート作成（Alice）'
              }]
            }
          }]
        })
      });

      const result = await converter.convertAudioToMarkdown(
        { processedBuffer: audioData, duration: 60 },
        { type: ConversionType.MEETING_NOTES }
      );

      expect(result.markdown).toContain('会議メモ');
      expect(result.markdown).toContain('Alice');

      // 5. アクション抽出
      const extractor = new ActionExtractor({ apiKey: 'test-key' });
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  actions: [{
                    type: ActionType.TASK,
                    text: 'レポート作成',
                    assignee: 'Alice'
                  }]
                })
              }]
            }
          }]
        })
      });

      const actions = await extractor.extractActions(result.markdown);
      expect(actions.actions.length).toBeGreaterThan(0);
      expect(actions.actions[0].assignee).toBe('Alice');

      // クリーンアップ
      client.disconnect();
    });
  });
});