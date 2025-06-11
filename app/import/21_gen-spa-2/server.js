import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;

// CORS設定
app.use(cors());

// JSON parser
app.use(express.json({ limit: '10mb' }));

// API プロキシエンドポイント
app.use('/api-proxy', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: { 
          message: 'GEMINI_API_KEY or API_KEY environment variable not set',
          code: 500 
        } 
      });
    }

    // Gemini API URL の構築
    const geminiUrl = `https://generativelanguage.googleapis.com${req.path}?key=${apiKey}`;
    
    console.log('Proxying to:', geminiUrl);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    // fetch を使用してリクエストをプロキシ
    const response = await fetch(geminiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Gen-Spa-2.0/1.0.0'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const responseText = await response.text();
    
    console.log('Gemini API Response Status:', response.status);
    console.log('Gemini API Response:', responseText.substring(0, 500));

    if (!response.ok) {
      return res.status(response.status).json({
        error: {
          message: `Gemini API error: ${response.status} ${response.statusText}`,
          details: responseText,
          code: response.status
        }
      });
    }

    // Content-Type ヘッダーを設定
    const contentType = response.headers.get('content-type') || 'application/json';
    res.setHeader('Content-Type', contentType);
    
    // レスポンスを返す
    try {
      const jsonResponse = JSON.parse(responseText);
      res.json(jsonResponse);
    } catch (e) {
      res.send(responseText);
    }

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: {
        message: `Proxy error: ${error.message}`,
        code: 500
      }
    });
  }
});

// 静的ファイルの配信
app.use(express.static(path.join(__dirname, 'dist')));

// SPA のルーティング（すべてのルートを index.html にリダイレクト）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment variables:`);
  console.log(`- GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'Set' : 'Not set'}`);
  console.log(`- API_KEY: ${process.env.API_KEY ? 'Set' : 'Not set'}`);
  console.log(`- GEMINI_API_KEY value: ${process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'Not set'}`);
});