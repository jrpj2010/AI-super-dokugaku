import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import http from 'http';
import url from 'url';
import fs from 'fs/promises';
import wav from 'wav';
import { Readable } from 'stream';

dotenv.config();

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const PORT = process.env.PORT || 8080;

if (!GEMINI_API_KEY) {
  console.error('Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface Speaker {
  name: string;
  voice: string;
  emotion?: string;
}

interface ConversationLine {
  speaker: string;
  text: string;
  emotion?: string;
}

interface TTSRequest {
  text: string;
  voice?: string;
  model?: string;
  speakers?: Speaker[];
  conversation?: ConversationLine[];
  style?: string;
}

interface StyleRequest {
  text: string;
  type: 'simple' | 'conversation' | 'srt';
}

// スタイルキャッシュ（メモリ内キャッシュ）
const styleCache = new Map<string, { style: string; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1時間
const MIN_REQUEST_INTERVAL = 1000; // 最小呼び出し間隔1秒
let lastStyleRequestTime = 0;

async function generateAudio(text: string, options?: { speakers?: Speaker[], voice?: string, model?: string, style?: string }, retryCount: number = 0): Promise<Buffer> {
  try {
    const modelName = options?.model || 'gemini-2.5-flash-preview-tts';
    const model = genAI.getGenerativeModel({ 
      model: modelName
    });

    let generationConfig: any = {
      response_modalities: ['AUDIO']
    };

    // 単一話者の場合
    if (options?.voice && !options?.speakers) {
      generationConfig.speech_config = {
        voice_config: {
          prebuilt_voice_config: {
            voice_name: options.voice
          }
        }
      };
    }
    // 複数話者設定がある場合
    else if (options?.speakers && options.speakers.length > 0) {
      generationConfig.speech_config = {
        multi_speaker_voice_config: {
          speaker_voice_configs: options.speakers.map(speaker => ({
            speaker: speaker.name,
            voice_config: {
              prebuilt_voice_config: {
                voice_name: speaker.voice
              }
            }
          }))
        }
      };
    }

    // スタイル指示がある場合は、プロンプトの先頭に追加
    let finalText = text;
    if (options?.style) {
      finalText = `${options.style}:\n\n${text}`;
    }

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: finalText
        }]
      }],
      generationConfig
    } as any);
    
    const response = await result.response;
    
    if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      const audioData = response.candidates[0].content.parts[0].inlineData;
      const pcmBuffer = Buffer.from(audioData.data, 'base64');
      
      // PCMデータをWAV形式に変換
      return await pcmToWav(pcmBuffer);
    }
    
    throw new Error('No audio data in response');
  } catch (error: any) {
    // レート制限エラーの場合はリトライ
    if (error.message?.includes('429') && retryCount < 3) {
      console.log(`Rate limit hit, retrying after delay... (attempt ${retryCount + 1})`);
      // エラーメッセージから待機時間を抽出、なければ10秒待機
      const retryDelay = error.message.match(/retryDelay.*?(\d+)s/);
      const waitTime = retryDelay ? parseInt(retryDelay[1]) * 1000 : 10000;
      await delay(waitTime);
      return generateAudio(text, options, retryCount + 1);
    }
    throw error;
  }
}

// PCMデータをWAVフォーマットに変換
async function pcmToWav(pcmBuffer: Buffer, channels = 1, sampleRate = 24000): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate,
      bitDepth: 16
    });
    
    const chunks: Buffer[] = [];
    
    writer.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    
    writer.on('finish', () => {
      resolve(Buffer.concat(chunks));
    });
    
    writer.on('error', reject);
    
    // PCMデータを書き込み
    writer.write(pcmBuffer);
    writer.end();
  });
}

// 会話を解析してTTS用のプロンプトを生成
function formatConversation(lines: ConversationLine[]): string {
  let prompt = '';
  
  lines.forEach((line, index) => {
    if (index > 0) prompt += '\n';
    if (line.emotion) {
      prompt += `${line.speaker} (${line.emotion}): ${line.text}`;
    } else {
      prompt += `${line.speaker}: ${line.text}`;
    }
  });
  
  return prompt;
}

// APIレート制限対応のための遅延関数
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// スタイル自動生成関数
async function generateStyle(text: string, type: 'simple' | 'conversation' | 'srt'): Promise<string> {
  // キャッシュキーを生成
  const cacheKey = `${type}:${text.substring(0, 50)}`;
  
  // キャッシュチェック
  const cached = styleCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached style:', cached.style);
    return cached.style;
  }
  
  // レート制限チェック
  const now = Date.now();
  if (now - lastStyleRequestTime < MIN_REQUEST_INTERVAL) {
    await delay(MIN_REQUEST_INTERVAL - (now - lastStyleRequestTime));
  }
  lastStyleRequestTime = Date.now();
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-preview-05-20'
    });
    
    let prompt = '';
    switch (type) {
      case 'simple':
        prompt = `以下のテキストの感情や文脈を分析し、音声読み上げのスタイル指示を100文字以内で生成してください。
指示は具体的で、感情表現（優しい、楽しい、落ち着いた等）、速度（ゆっくり、通常、速い）、トーン（明るい、暗い、中立的）を含めてください。

テキスト: "${text}"

スタイル指示:`;
        break;
        
      case 'conversation':
        prompt = `以下の会話テキストの全体的なトーンや話者間の関係性を分析し、音声読み上げのスタイル指示を100文字以内で生成してください。
指示は会話の雰囲気（フレンドリー、フォーマル、緊張感がある等）と各話者の役割や特徴を簡潔に含めてください。

会話テキスト: "${text}"

スタイル指示:`;
        break;
        
      case 'srt':
        prompt = `以下の字幕テキストのシーンの雰囲気や状況を分析し、音声読み上げのスタイル指示を100文字以内で生成してください。
指示はシーンの雰囲気（ドラマチック、コメディ、シリアス等）と適切な演技指示を含めてください。

字幕テキスト: "${text}"

スタイル指示:`;
        break;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const style = response.text().trim();
    
    // 100文字を超える場合は切り詰め
    const trimmedStyle = style.length > 100 ? style.substring(0, 97) + '...' : style;
    
    // キャッシュに保存
    styleCache.set(cacheKey, { style: trimmedStyle, timestamp: Date.now() });
    
    console.log('Generated new style:', trimmedStyle);
    return trimmedStyle;
    
  } catch (error) {
    console.error('Error generating style:', error);
    
    // エラー時のデフォルトスタイル
    const defaultStyles: Record<typeof type, string> = {
      simple: '自然で聞き取りやすい標準的な読み上げ',
      conversation: 'それぞれの話者が区別できるような自然な対話形式',
      srt: 'シーンに合わせた感情豊かな読み上げ'
    };
    
    return defaultStyles[type];
  }
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url || '', true);
  const pathname = parsedUrl.pathname;

  // ヘルスチェック
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy',
      service: 'Gemini TTS Demo',
      model: 'gemini-2.5-flash-preview-tts'
    }));
    return;
  }

  // トップページ（統合ページ）
  if (pathname === '/') {
    try {
      const indexHtml = await fs.readFile('./index.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(indexHtml);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Index page not found' }));
    }
    return;
  }

  // TTS API - 単一テキスト用
  if (pathname === '/api/tts' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { text, voice, model, style }: TTSRequest = JSON.parse(body);
        
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Text is required' }));
          return;
        }
        
        console.log('Generating audio for:', text, 'with voice:', voice || 'default', 'model:', model || 'default', 'style:', style || 'none');
        const audioBuffer = await generateAudio(text, { voice, model, style });
        
        res.writeHead(200, {
          'Content-Type': 'audio/wav',
          'Content-Length': audioBuffer.length
        });
        res.end(audioBuffer);
        
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
    return;
  }

  // 複数話者対応 API
  if (pathname === '/api/conversation' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { conversation, speakers, model, style }: TTSRequest = JSON.parse(body);
        
        if (!conversation || !Array.isArray(conversation)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Conversation array is required' }));
          return;
        }
        
        console.log('Generating multi-speaker audio with model:', model || 'default', 'style:', style || 'none');
        const prompt = formatConversation(conversation);
        const audioBuffer = await generateAudio(prompt, { speakers, model, style });
        
        res.writeHead(200, {
          'Content-Type': 'audio/wav',
          'Content-Length': audioBuffer.length
        });
        res.end(audioBuffer);
        
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
    return;
  }

  // SRTデモページ
  if (pathname === '/srt') {
    try {
      const srtDemoHtml = await fs.readFile('./demo-srt.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(srtDemoHtml);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'SRT demo page not found' }));
    }
    return;
  }

  // スタイル自動生成 API
  if (pathname === '/api/generate-style' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { text, type }: StyleRequest = JSON.parse(body);
        
        if (!text || !type) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Text and type are required' }));
          return;
        }
        
        if (!['simple', 'conversation', 'srt'].includes(type)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid type. Must be one of: simple, conversation, srt' }));
          return;
        }
        
        console.log('Generating style for:', type, 'text length:', text.length);
        const style = await generateStyle(text, type);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ style }));
        
      } catch (error) {
        console.error('Error in /api/generate-style:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
    return;
  }

  // デモページ
  if (pathname === '/demo') {
    // demo.htmlファイルを読み込んで返す
    try {
      const demoHtml = await fs.readFile('./demo.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(demoHtml);
    } catch (error) {
      // フォールバック（ファイルが読めない場合）
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini TTS Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        textarea {
            width: 100%;
            height: 150px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            resize: vertical;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        #status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            display: none;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .loading {
            background-color: #cce5ff;
            color: #004085;
            border: 1px solid #b8daff;
        }
        audio {
            width: 100%;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎙️ Gemini TTS Demo</h1>
        <p>Google Gemini 2.5 Flash Preview TTSモデルを使用した音声生成デモです。</p>
        
        <h2>テキストを入力してください：</h2>
        <textarea id="textInput" placeholder="ここに音声化したいテキストを入力してください...">こんにちは、これはGemini TTSモデルのテストです。</textarea>
        
        <button id="generateBtn" onclick="generateAudio()">音声を生成</button>
        
        <div id="status"></div>
        
        <audio id="audioPlayer" controls style="display: none;"></audio>
    </div>

    <script>
        async function generateAudio() {
            const text = document.getElementById('textInput').value;
            const status = document.getElementById('status');
            const button = document.getElementById('generateBtn');
            const audio = document.getElementById('audioPlayer');
            
            if (!text.trim()) {
                showStatus('テキストを入力してください。', 'error');
                return;
            }
            
            button.disabled = true;
            showStatus('音声を生成中...', 'loading');
            
            try {
                const response = await fetch('/api/tts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text })
                });
                
                if (!response.ok) {
                    throw new Error('音声生成に失敗しました');
                }
                
                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                
                audio.src = audioUrl;
                audio.style.display = 'block';
                audio.play();
                
                showStatus('音声が生成されました！', 'success');
                
            } catch (error) {
                showStatus('エラー: ' + error.message, 'error');
            } finally {
                button.disabled = false;
            }
        }
        
        function showStatus(message, type) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = type;
            status.style.display = 'block';
        }
    </script>
</body>
</html>
    `);
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Main page: http://localhost:${PORT}/`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Demo page: http://localhost:${PORT}/demo`);
  console.log(`SRT Demo page: http://localhost:${PORT}/srt`);
});