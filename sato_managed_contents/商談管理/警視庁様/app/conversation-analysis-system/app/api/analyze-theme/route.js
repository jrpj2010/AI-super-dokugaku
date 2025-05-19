// テーマ分析API
// 特定したテーマごとに思考3DXYZ分析を行うエンドポイント

import { callGeminiAPI, extractJsonFromResponse, createErrorResponse, getFromCache, saveToCache, generateCacheKey } from '../../../lib/api-utils';

export async function POST(request) {
  try {
    const { themeId, themeTitle, speakerBlocksInTheme, apiKey, modelName } = await request.json();

    if (!themeId || !themeTitle || !speakerBlocksInTheme || !apiKey || !modelName) {
      return createErrorResponse(new Error("必須パラメータが不足しています"), 400);
    }

    // キャッシュキーを生成
    const cacheKey = generateCacheKey('theme_analysis', themeId, themeTitle, speakerBlocksInTheme, modelName);

    // キャッシュからデータを取得
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
      console.log(`キャッシュからテーマ分析結果を取得しました (テーマID: ${themeId})`);
      return new Response(JSON.stringify(cachedResult), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // テーマに関連する会話内容を整形
    const conversationText = speakerBlocksInTheme.map(block => {
      return `【${block.speaker}】: ${block.messages.join(' ')}`;
    }).join('\n\n');

    // Gemini APIへのリクエスト本文
    const promptText = `
あなたは思考3DXYZメソッドに基づく会話分析の専門家です。
特定のテーマに関する会話を受け取り、X軸（思考の型）、Y軸（時間軸）、Z軸（知識レベル）の観点から分析してください。

■テーマ: ${themeTitle}

■会話内容:
${conversationText}

■分析指示:
以下の思考3DXYZ分析フレームワークに基づいて、このテーマの会話を分析してください。

1. X軸（思考の型）分析:
   - 具体化: 具体的事例、詳細な説明、現実の例示
   - 抽象化: 概念、全体像、大局的視点
   - 構造化: 仕組み、体系、関係性の整理

2. Y軸（時間軸）分析:
   - 過去: 経験、歴史、以前の出来事
   - 現代: 現状、課題、今の状況
   - 未来: 予測、展望、将来の計画

3. Z軸（知識レベル）分析:
   - 初級: 基礎知識、入門レベル
   - 中級: 応用知識、ある程度の経験
   - 上級: 専門知識、高度な知見

■出力形式:
分析結果を以下のJSON形式で出力してください。JSONフォーマット以外の出力は含めないでください。

{
  "theme_id": ${themeId},
  "theme_title": "${themeTitle}",
  "theme_summary": "テーマの概要を簡潔に説明",
  "analysis_X": {
    "category": "「具体化」「抽象化」「構造化」のいずれか",
    "reason": "その判断理由（特徴的な表現や内容に基づく説明）"
  },
  "analysis_Y": {
    "category": "「過去」「現代」「未来」のいずれか",
    "reason": "その判断理由（時間軸に関する特徴的な表現や内容）"
  },
  "analysis_Z": {
    "category": "「初級」「中級」「上級」のいずれか",
    "reason": "その判断理由（知識レベルを示す専門用語や説明の深さ）"
  },
  "communication_feedback": {
    "evaluation": "「Good」「Neutral」「Needs Improvement」のいずれか",
    "advice": "コミュニケーションに関するアドバイス",
    "highlight_points_optional": "特に良かった点（任意・ある場合のみ）",
    "improvement_points_optional": "改善点（任意・ある場合のみ）"
  }
}
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
        2048,
        0.2
      );

      // タイムアウトをクリア
      clearTimeout(timeoutId);

      // JSON抽出
      const analysisResult = extractJsonFromResponse(apiResponse, false);

      // キャッシュに保存
      saveToCache(cacheKey, analysisResult);

      return new Response(JSON.stringify(analysisResult), {
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
    console.error("テーマ分析APIエラー:", error);
    return createErrorResponse(error, 500, "テーマ分析中にエラーが発生しました");
  }
}
