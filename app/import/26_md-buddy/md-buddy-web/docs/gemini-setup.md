# Google Gemini API セットアップガイド

## 📋 目次

1. [はじめに](#はじめに)
2. [前提条件](#前提条件)
3. [APIキーの取得](#apiキーの取得)
4. [プロジェクト設定](#プロジェクト設定)
5. [環境変数の設定](#環境変数の設定)
6. [接続テスト](#接続テスト)
7. [詳細設定](#詳細設定)
8. [セキュリティ設定](#セキュリティ設定)
9. [トラブルシューティング](#トラブルシューティング)
10. [料金と使用制限](#料金と使用制限)

## はじめに

このガイドでは、MD BuddyでGoogle Gemini APIを使用するための設定手順を説明します。Gemini APIは、音声認識、自然言語処理、Markdown生成の中核を担っています。

### Gemini APIとは

Google Gemini APIは、Googleの最新AI技術を活用したマルチモーダルAI APIです。以下の機能を提供します：

- **音声認識**: 高精度な音声テキスト変換
- **自然言語理解**: 文脈を理解した処理
- **構造化生成**: 整形されたテキスト出力
- **リアルタイム処理**: ストリーミング対応

## 前提条件

### 必要なもの

- Googleアカウント
- Google Cloud Platformへのアクセス
- クレジットカード（無料枠あり）
- Node.js 18以上
- npm または pnpm

### 推奨環境

- OS: Windows 10+, macOS 10.15+, Ubuntu 20.04+
- ブラウザ: Chrome, Firefox, Safari最新版
- インターネット: 安定した高速接続

## APIキーの取得

### Step 1: Google AI Studioにアクセス

1. [Google AI Studio](https://makersuite.google.com/app/apikey)にアクセス
2. Googleアカウントでログイン

### Step 2: APIキーの作成

```bash
# 1. "Get API key"ボタンをクリック
# 2. "Create API key in new project"を選択
# 3. プロジェクト名を入力（例: md-buddy-voice）
# 4. "Create"をクリック
```

### Step 3: APIキーの保存

⚠️ **重要**: APIキーは安全に保管してください

```bash
# APIキーの例
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 4: APIキーの確認

```bash
# cURLでテスト
curl -H "Content-Type: application/json" \
     -H "x-goog-api-key: YOUR_API_KEY" \
     -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent \
     -d '{
       "contents": [{
         "parts":[{"text": "Hello, Gemini!"}]
       }]
     }'
```

## プロジェクト設定

### 1. 依存関係のインストール

```bash
# プロジェクトディレクトリに移動
cd md-buddy-web

# 依存関係をインストール
pnpm install
```

### 2. 必要なパッケージ

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.1.0",
    "dotenv": "^16.0.0"
  }
}
```

### 3. TypeScript設定

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "target": "ES2020",
    "moduleResolution": "node"
  }
}
```

## 環境変数の設定

### 1. .envファイルの作成

```bash
# .env.localファイルを作成
cp .env.example .env.local
```

### 2. 環境変数の設定

```bash
# .env.local
# Gemini API設定
VITE_GEMINI_API_KEY=your-api-key-here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com
VITE_GEMINI_MODEL=gemini-pro
VITE_GEMINI_VOICE_MODEL=gemini-pro-vision

# オプション設定
VITE_GEMINI_MAX_TOKENS=2048
VITE_GEMINI_TEMPERATURE=0.7
VITE_GEMINI_TOP_P=0.95
VITE_GEMINI_TOP_K=40

# レート制限
VITE_GEMINI_RATE_LIMIT_REQUESTS=60
VITE_GEMINI_RATE_LIMIT_WINDOW=60000

# セキュリティ
VITE_GEMINI_ENABLE_PROXY=true
VITE_GEMINI_ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
```

### 3. 環境変数の説明

| 変数名 | 説明 | 必須 | デフォルト |
|--------|------|------|------------|
| VITE_GEMINI_API_KEY | APIキー | ✅ | - |
| VITE_GEMINI_API_URL | API エンドポイント | ✅ | googleapis.com |
| VITE_GEMINI_MODEL | 使用モデル | ❌ | gemini-pro |
| VITE_GEMINI_MAX_TOKENS | 最大トークン数 | ❌ | 2048 |
| VITE_GEMINI_TEMPERATURE | 創造性パラメータ | ❌ | 0.7 |

## 接続テスト

### 1. テストスクリプトの実行

```typescript
// test-gemini-connection.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testConnection() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Hello, test connection!");
    console.log("✅ 接続成功:", result.response.text());
  } catch (error) {
    console.error("❌ 接続失敗:", error);
  }
}

testConnection();
```

### 2. 実行コマンド

```bash
# TypeScriptの実行
npx tsx test-gemini-connection.ts
```

### 3. 期待される出力

```
✅ 接続成功: Hello! Connection test successful. How can I help you today?
```

## 詳細設定

### モデル選択

#### 利用可能なモデル

| モデル | 用途 | 特徴 |
|--------|------|------|
| gemini-pro | テキスト生成 | 高速、低コスト |
| gemini-pro-vision | マルチモーダル | 音声・画像対応 |
| gemini-ultra | 高性能 | 最高精度（制限あり） |

#### モデル設定例

```typescript
// 用途別設定
const modelConfigs = {
  // 音声転写用
  transcription: {
    model: "gemini-pro-vision",
    generationConfig: {
      temperature: 0.1,
      topK: 1,
      topP: 0.1,
      maxOutputTokens: 1024,
    }
  },
  
  // Markdown生成用
  markdown: {
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  },
  
  // 要約用
  summary: {
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.3,
      topK: 10,
      topP: 0.5,
      maxOutputTokens: 512,
    }
  }
};
```

### ストリーミング設定

```typescript
// ストリーミングレスポンス
const streamingConfig = {
  // バッファサイズ
  bufferSize: 1024 * 1024, // 1MB
  
  // タイムアウト
  timeout: 30000, // 30秒
  
  // リトライ設定
  retry: {
    maxAttempts: 3,
    backoffMs: 1000,
    maxBackoffMs: 10000
  }
};
```

### プロンプトエンジニアリング

```typescript
// 効果的なプロンプト設定
const promptTemplates = {
  // 会議メモ用
  meeting: `
    以下の音声転写から会議メモを作成してください：
    - 参加者を特定
    - 主要な議題を箇条書き
    - 決定事項を明確に
    - アクションアイテムを抽出
    
    転写内容：{transcript}
  `,
  
  // ブログ記事用
  blog: `
    以下の内容からブログ記事を作成してください：
    - SEOに配慮したタイトル
    - 導入部で読者の興味を引く
    - 見出しで構造化
    - 結論で要点をまとめる
    
    内容：{content}
  `
};
```

## セキュリティ設定

### 1. APIキーの保護

```typescript
// ❌ 悪い例：ハードコーディング
const apiKey = "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// ✅ 良い例：環境変数
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ✅ より安全：プロキシ経由
const response = await fetch('/api/gemini-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt })
});
```

### 2. CORS設定

```typescript
// Vite設定（vite.config.ts）
export default {
  server: {
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('x-goog-api-key', process.env.GEMINI_API_KEY);
          });
        }
      }
    }
  }
};
```

### 3. レート制限

```typescript
// レート制限の実装
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 60, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }
}
```

### 4. データ暗号化

```typescript
// 音声データの暗号化
async function encryptAudioData(audioBuffer: ArrayBuffer): Promise<EncryptedData> {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    audioBuffer
  );
  
  return { encrypted, iv, key };
}
```

## トラブルシューティング

### よくあるエラーと対処法

#### 1. 認証エラー

```json
{
  "error": {
    "code": 401,
    "message": "API key not valid"
  }
}
```

**解決方法:**
- APIキーが正しいか確認
- APIキーが有効か確認
- 環境変数が正しく設定されているか確認

#### 2. クォータ超過

```json
{
  "error": {
    "code": 429,
    "message": "Quota exceeded"
  }
}
```

**解決方法:**
- 使用量を確認
- レート制限を実装
- 必要に応じて有料プランにアップグレード

#### 3. ネットワークエラー

```
TypeError: Failed to fetch
```

**解決方法:**
- インターネット接続を確認
- ファイアウォール設定を確認
- プロキシ設定を確認

#### 4. モデルエラー

```json
{
  "error": {
    "code": 400,
    "message": "Model not found"
  }
}
```

**解決方法:**
- モデル名が正しいか確認
- モデルが利用可能な地域か確認
- APIバージョンが最新か確認

### デバッグ方法

```typescript
// デバッグモードの有効化
const DEBUG = import.meta.env.DEV;

if (DEBUG) {
  console.log('API Request:', {
    url: apiUrl,
    method: 'POST',
    headers: { 'x-goog-api-key': '***' },
    body: requestBody
  });
}

// レスポンスログ
if (DEBUG) {
  console.log('API Response:', {
    status: response.status,
    headers: response.headers,
    body: await response.clone().text()
  });
}
```

## 料金と使用制限

### 無料枠

| 項目 | 制限 |
|------|------|
| リクエスト数 | 60回/分 |
| 文字数 | 10万文字/月 |
| 音声処理 | 100分/月 |

### 料金体系

| サービス | 料金 |
|----------|------|
| テキスト生成 | $0.00025/1K文字 |
| 音声処理 | $0.006/分 |
| ストリーミング | +20% |

### コスト最適化

```typescript
// キャッシュの実装
const cache = new Map<string, any>();

async function cachedGenerateContent(prompt: string) {
  const cacheKey = crypto.subtle.digest('SHA-256', 
    new TextEncoder().encode(prompt)
  );
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await generateContent(prompt);
  cache.set(cacheKey, result);
  
  // 1時間後に削除
  setTimeout(() => cache.delete(cacheKey), 3600000);
  
  return result;
}
```

### 使用量モニタリング

```typescript
// 使用量追跡
class UsageTracker {
  private usage = {
    requests: 0,
    characters: 0,
    audioMinutes: 0,
    lastReset: new Date()
  };

  track(type: 'request' | 'text' | 'audio', amount: number) {
    switch (type) {
      case 'request':
        this.usage.requests += 1;
        break;
      case 'text':
        this.usage.characters += amount;
        break;
      case 'audio':
        this.usage.audioMinutes += amount / 60;
        break;
    }
  }

  getUsage() {
    return { ...this.usage };
  }

  reset() {
    this.usage = {
      requests: 0,
      characters: 0,
      audioMinutes: 0,
      lastReset: new Date()
    };
  }
}
```

## 次のステップ

1. **基本設定の完了確認**
   - [ ] APIキーの取得
   - [ ] 環境変数の設定
   - [ ] 接続テストの成功

2. **アプリケーションへの統合**
   - [ ] プロキシサーバーの設定
   - [ ] エラーハンドリングの実装
   - [ ] レート制限の設定

3. **本番環境への準備**
   - [ ] セキュリティ対策の実施
   - [ ] モニタリングの設定
   - [ ] バックアップ計画の策定

---

## 📞 サポート

技術的な問題が発生した場合：

- **Gemini API ドキュメント**: https://ai.google.dev/docs
- **Google Cloud サポート**: https://cloud.google.com/support
- **MD Buddy サポート**: support@mdbuddy.com

---

*最終更新日: 2024年1月15日*