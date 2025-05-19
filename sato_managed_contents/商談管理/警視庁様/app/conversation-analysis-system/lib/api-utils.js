// API通信に関するユーティリティ関数

/**
 * GeminiAPIへのリクエストを行い、レスポンスを取得する
 * @param {string} prompt プロンプト文字列
 * @param {string} apiKey APIキー
 * @param {string} modelName モデル名
 * @param {number} maxTokens 最大トークン数
 * @param {number} temperature 温度
 * @returns {Promise<Object>} APIレスポンス
 */
export async function callGeminiAPI(prompt, apiKey, modelName, maxTokens = 2048, temperature = 0.2) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: temperature,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: maxTokens,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API エラー: ${errorData.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Gemini API呼び出しエラー:", error);
    throw error;
  }
}

/**
 * APIレスポンスからJSON部分を抽出する
 * @param {Object} apiResponse GeminiのAPIレスポンス
 * @param {boolean} isArray 配列形式のJSONを探すかどうか
 * @returns {Object} 抽出されたJSONオブジェクト
 */
export function extractJsonFromResponse(apiResponse, isArray = false) {
  try {
    // レスポンスからテキスト部分を結合
    let jsonContent = "";
    for (const part of apiResponse.candidates[0].content.parts) {
      jsonContent += part.text;
    }

    // JSON文字列から余分な部分を削除して抽出
    const pattern = isArray ? /\[[\s\S]*\]/ : /\{[\s\S]*\}/;
    const jsonMatch = jsonContent.match(pattern);

    if (!jsonMatch) {
      throw new Error("APIレスポンスから有効なJSONが抽出できませんでした");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("JSON抽出エラー:", error);
    throw error;
  }
}

/**
 * エラーレスポンスを生成する
 * @param {Error} error エラーオブジェクト
 * @param {number} statusCode ステータスコード
 * @param {string} defaultMessage デフォルトエラーメッセージ
 * @returns {Response} エラーレスポンス
 */
export function createErrorResponse(error, statusCode = 500, defaultMessage = "処理中にエラーが発生しました") {
  return new Response(JSON.stringify({
    error: error.message || defaultMessage
  }), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * 分析結果をキャッシュする簡易的なメモリキャッシュ
 */
let analysisCache = new Map();

/**
 * キャッシュからデータを取得する
 * @param {string} key キャッシュキー
 * @returns {Object|null} キャッシュされたデータまたはnull
 */
export function getFromCache(key) {
  if (!key) return null;

  const cachedItem = analysisCache.get(key);
  if (!cachedItem) return null;

  // キャッシュの有効期限をチェック（30分）
  if (Date.now() - cachedItem.timestamp > 30 * 60 * 1000) {
    analysisCache.delete(key);
    return null;
  }

  return cachedItem.data;
}

/**
 * データをキャッシュに保存する
 * @param {string} key キャッシュキー
 * @param {Object} data 保存するデータ
 */
export function saveToCache(key, data) {
  if (!key || !data) return;

  analysisCache.set(key, {
    data: data,
    timestamp: Date.now()
  });

  // キャッシュサイズ管理（最大100項目）
  if (analysisCache.size > 100) {
    // 最も古いエントリを削除
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [k, v] of analysisCache.entries()) {
      if (v.timestamp < oldestTime) {
        oldestTime = v.timestamp;
        oldestKey = k;
      }
    }

    if (oldestKey) {
      analysisCache.delete(oldestKey);
    }
  }
}

/**
 * キャッシュキーを生成する
 * @param {Array} args キャッシュキー生成に使用する引数
 * @returns {string} 生成されたキャッシュキー
 */
export function generateCacheKey(...args) {
  return args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }
    return String(arg);
  }).join('_');
}
