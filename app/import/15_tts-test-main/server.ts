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

async function generateAudio(text: string, speakers?: Speaker[]): Promise<Buffer> {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash-preview-tts'
  });

  let generationConfig: any = {
    response_modalities: ['AUDIO']
  };

  // 複数話者設定がある場合
  if (speakers && speakers.length > 0) {
    generationConfig.speech_config = {
      multi_speaker_voice_config: {
        speaker_voice_configs: speakers.map(speaker => ({
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

  const result = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{
        text: text
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
  let prompt = 'TTS the following conversation:\n';
  
  lines.forEach(line => {
    if (line.emotion) {
      prompt += `${line.speaker} (${line.emotion}): ${line.text}\n`;
    } else {
      prompt += `${line.speaker}: ${line.text}\n`;
    }
  });
  
  return prompt;
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
  if (pathname === '/health' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy',
      service: 'Gemini TTS Demo',
      model: 'gemini-2.5-flash-preview-tts'
    }));
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
        const { text } = JSON.parse(body);
        
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Text is required' }));
          return;
        }
        
        console.log('Generating audio for:', text);
        const audioBuffer = await generateAudio(text);
        
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
        const { conversation, speakers } = JSON.parse(body);
        
        if (!conversation || !Array.isArray(conversation)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Conversation array is required' }));
          return;
        }
        
        console.log('Generating multi-speaker audio...');
        const prompt = formatConversation(conversation);
        const audioBuffer = await generateAudio(prompt, speakers);
        
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
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Demo page: http://localhost:${PORT}/demo`);
  console.log(`SRT Demo page: http://localhost:${PORT}/srt`);
});