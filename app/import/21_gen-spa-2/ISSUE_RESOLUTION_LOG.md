# Gen-Spa 2.0 開発イシュー解決ログ

## 日付: 2025年6月11日

### 開発者
- メイン開発者: Claude Code (Opus 4)
- ユーザー: 佐藤勝彦様（TANREN株式会社 CEO）

---

## 🔥 主要な問題と解決の経緯

### 1. **セキュリティ違反問題** (2025/06/11 16:00頃)

#### 問題
- `@google/genai` SDKをクライアント側で直接使用
- APIキーがブラウザに露出する重大なセキュリティ違反
- Google公式ドキュメントで明確に禁止されている実装

#### 発見の経緯
- 同じエラーが3回繰り返し発生
- ユーザーから「３度目の同じ失敗ループだ、なにしてんの？」との指摘
- Web検索により公式ガイドラインを確認

#### 解決策
```typescript
// ❌ 誤った実装（クライアント側）
import { GoogleGenerativeAI } from '@google/genai';
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ 正しい実装（サーバープロキシ経由）
export class GeminiService {
  private baseUrl = '/api-proxy';
  // サーバー経由でAPI呼び出し
}
```

---

### 2. **JSON解析エラー問題** (2025/06/11 17:00頃)

#### 問題
```
Expected property name or '}' in JSON at position 1 (line 1 column 2)
```
- Gemini APIからの大量のJSONレスポンスがパースできない
- 改行文字の不適切なエスケープが原因

#### 根本原因
```typescript
// ❌ 問題のあったコード
cleaned = cleaned
  .replace(/(?<!\\)\n/g, '\\n')  // 文字列外の改行も変換してしまう！
```
これにより、JSON構造の外側（オブジェクトの区切りなど）の改行も`\n`に変換され、JSONが破壊されていた。

#### 解決策
```typescript
// ✅ 修正後：文字列リテラル内部のみエスケープ
cleaned = cleaned.replace(
  /"(?:[^"\\]|\\.)*"/gs,
  (str) =>
    str
      .replace(/\r\n/g, '\\n')
      .replace(/\n/g,  '\\n')
      .replace(/\r/g,  '\\r')
      .replace(/\t/g,  '\\t')
);
```

---

### 3. **トークン制限の誤解** (2025/06/11 17:30頃)

#### 問題
- 最大出力トークンを8,192と誤認識
- 実際はGemini 2.5 Flash/Proは**65,536トークン（64K）**対応

#### 発見の経緯
- ユーザーがGoogle AI Studioのスクリーンショットを提供
- Web検索で最新ドキュメントを確認

#### 解決策
```typescript
// ❌ 古い設定
maxOutputTokens: Math.min(8000, currentSlideCount * 800 + 2000)

// ✅ 正しい設定
maxOutputTokens: 65536
```

---

### 4. **壊れたJSON自動修復** (2025/06/11 18:00頃)

#### 問題
- Gemini APIが時々以下を含む"壊れたJSON"を返す：
  - 末尾カンマ `, }`
  - コメント行 `// ...`
  - 制御文字 0x00-0x1F

#### 解決策
```bash
npm install jsonrepair
```

```typescript
import { jsonrepair } from 'jsonrepair';

try {
  parsedData = JSON.parse(finalJson);
} catch (e1) {
  console.warn('First JSON.parse() failed - trying jsonrepair...');
  const repaired = jsonrepair(cleanedJson);
  parsedData = JSON.parse(repaired);
}
```

---

### 5. **キャッシュ問題** (2025/06/11 18:30頃)

#### 問題
- Cloud Runが古いJavaScriptファイルを配信し続ける
- Viteのタイムスタンプ付きファイル名が更新されない

#### 解決策
```bash
# 強制的に新しいリビジョンをデプロイ
gcloud run deploy gen-spa-2-0 --tag=latest
gcloud run services update-traffic gen-spa-2-0 --to-latest
```

---

## 📊 最終的な修正まとめ

1. **セキュリティ**: サーバープロキシアーキテクチャの実装
2. **JSON解析**: 文字列内のみエスケープ + jsonrepair導入
3. **スケーラビリティ**: 65536トークン対応 + 5分タイムアウト
4. **デプロイ**: キャッシュ問題の解決とトラフィック管理

## 🎯 学んだ教訓

1. **セキュリティファースト**: APIキーは絶対にクライアント側に露出させない
2. **最新ドキュメント確認**: 知識が古い場合は必ずWeb検索で確認
3. **エラーハンドリング**: 複数の修復戦略を用意（jsonrepairなど）
4. **デプロイ管理**: Cloud Runのリビジョンとトラフィック管理の重要性

---

最終的に、すべての問題が解決され、Gen-Spa 2.0は安定して動作するようになりました。