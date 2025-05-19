// 会話構造解析API
// スクリプトから会話テーマを特定し、構造化するエンドポイント

import { callGeminiAPI, extractJsonFromResponse, createErrorResponse, getFromCache, saveToCache, generateCacheKey } from '../../../lib/api-utils';

export async function POST(request) {
  try {
    const { speakerBlocks, apiKey, modelName } = await request.json();

    if (!speakerBlocks || !apiKey || !modelName) {
      return createErrorResponse(new Error("必須パラメータが不足しています"), 400);
    }

    // キャッシュキーを生成
    const cacheKey = generateCacheKey('structure', speakerBlocks, modelName);

    // キャッシュからデータを取得
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
      console.log("キャッシュから構造分析結果を取得しました");
      return new Response(JSON.stringify(cachedResult), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 会話内容を整形
    const conversationText = speakerBlocks.map(block => {
      return `【${block.speaker}】: ${block.messages.join(' ')}`;
    }).join('\n\n');

    // Gemini APIへのリクエスト本文
    const promptText = `
あなたは会話分析の専門家です。以下の会話スクリプトから、含まれる主要なテーマを特定してください。
各テーマは会話の内容的まとまりを表し、1つ以上の発言ブロックで構成されます。

会話スクリプト:
${conversationText}

会話から主要なテーマを3つ以内で特定し、以下の形式でJSON形式で出力してください:
[
  {
    "theme_id": 1,
    "theme_title": "テーマのタイトル",
    "speaker_block_ids": [関連する発言ブロックのID一覧]
  },
  ...
]

注意：
- 各テーマは会話の中で重要なトピックや話題を表します
- speaker_block_idsは0から始まる連番で、元の会話ブロックのIDを指定します
- JSONフォーマット以外の出力は含めないでください
    `;

    // タイムアウト設定（30秒）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      // APIリクエスト
      const apiResponse = await callGeminiAPI(
        promptText,
        apiKey,
        modelName,
        1024,
        0.2
      );

      // タイムアウトをクリア
      clearTimeout(timeoutId);

      // JSON抽出
      const thematicChunks = extractJsonFromResponse(apiResponse, true);

      // キャッシュに保存
      saveToCache(cacheKey, thematicChunks);

      return new Response(JSON.stringify(thematicChunks), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error("API要求がタイムアウトしました。しばらく待ってから再試行してください。");
      }
      throw error;
    }

  } catch (error) {
    console.error("構造解析APIエラー:", error);
    return createErrorResponse(error, 500, "会話構造の分析中にエラーが発生しました");
  }
}
