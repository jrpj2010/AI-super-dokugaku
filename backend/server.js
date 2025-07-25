require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: '5mb' })); // リクエストボディのサイズ制限を増やす (会話データが大きくなる可能性)

// CORSを許可する
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8088', 'http://localhost:8089']; // http://localhost:8089 を追加
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

// 環境変数のAPIキーはフォールバックまたは開発用として保持
const FALLBACK_GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!FALLBACK_GEMINI_API_KEY) {
  console.warn("警告: 環境変数にGEMINI_API_KEYが設定されていません。リクエスト毎のAPIキー指定が必須となります。");
}

// --- APIレスポンスのクリーニング (フロントエンドから移植) ---
function cleanApiResponse(responseText) {
  if (!responseText) return null;
  let cleaned = responseText.trim();

  // Markdownコードブロックを除去 (```json ... ``` や ``` ... ```)
  // 開始パターン: ```json (改行) または ``` (改行)
  // 終了パターン: (改行) ```
  cleaned = cleaned.replace(/^```(?:json)?\s*[\r\n]*/, '');
  cleaned = cleaned.replace(/[\r\n]*\s*```$/, '');

  // 場合によっては、APIがJSONを返しつつも前後に余計なテキストを付与することがあるため、
  // JSONの開始 '{' または '[' と終了 '}' または ']' を見つけて抽出することも考慮できるが、
  // まずは上記のMarkdown除去の改善で様子を見る。
  cleaned = cleaned.trim(); // 念のため再度trim
  return cleaned;
}

// --- Gemini API呼び出しヘルパー (APIキーを引数で受け取るように変更) ---
async function callGenerativeApiModel(apiKey, modelName, promptText, attempt = 1, maxAttempts = 3) {
  if (!apiKey || apiKey.trim() === "") {
    console.error("API呼び出しエラー: APIキーが提供されていません。");
    throw new Error("APIキーが提供されていません。");
  }
  if (!modelName) {
    console.error("API呼び出しエラー: モデル名が指定されていません。");
    throw new Error("モデル名が指定されていません。");
  }

  let genAI_local;
  try {
    genAI_local = new GoogleGenerativeAI(apiKey);
  } catch (initError) {
    console.error("GoogleGenerativeAIクライアントの初期化に失敗しました。APIキーの形式を確認してください。", initError);
    throw new Error("GoogleGenerativeAIクライアントの初期化に失敗しました。提供されたAPIキーに問題がある可能性があります。");
  }

  console.log(`Gemini API呼び出し開始 (試行 ${attempt}/${maxAttempts}): モデル ${modelName}`);
  try {
    const model = genAI_local.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini API呼び出し成功。");
    return text;
  } catch (error) {
    console.error(`Gemini API呼び出し中にエラーが発生しました (試行 ${attempt}/${maxAttempts}):`, error.message);
    if (attempt < maxAttempts) {
      console.log(`${attempt + 1}回目の試行を行います...`);
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); //指数バックオフ的な待機
      return callGenerativeApiModel(apiKey, modelName, promptText, attempt + 1, maxAttempts);
    }
    console.error("Gemini API呼び出しに失敗しました。最大試行回数に達しました。");
    throw error; // 最終的なエラーをスロー
  }
}

// --- プロンプト生成関数 (フロントエンドから移植・調整) ---
function createThematicChunksPrompt(speakerBlocks) {
  let summarizedConversationForTheme = "";
  speakerBlocks.forEach((block, index) => {
    const firstMessage = block.messages && block.messages.length > 0 ? block.messages[0] : "（内容なし）";
    summarizedConversationForTheme += `ブロックID ${block.blockId} (話者 ${block.speaker}): ${firstMessage.substring(0, 50)}...\\n---\\n`;
  });

  const prompt = `
あなたは高度な会話構造アナリストです。以下の「話者ごとの発言ブロックの連続」を注意深く読み、会話の流れにおける意味のある区切りや話題の転換点を特定し、会話全体を複数の「テーマセグメント」に分割してください。

**指示:**
1.  各「テーマセグメント」は、会話の自然な話題のまとまりを表すものとします。大項目やサブトピックレベルの区切りを意識してください。あまりに細かすぎる分割は避け、かといって大きすぎる括りにもしないでください。**議事録全体で5～15程度のテーマセグメントに分割されるのが理想的です。**
2.  各テーマセグメントには、その内容を的確に表す簡潔な「タイトル」（例：契約条件の詳細確認、サポート体制への質問、今後のスケジュール調整など、30字以内）を付けてください。
3.  **最重要: 各テーマセグメントオブジェクトには、必ず \`speaker_block_ids\` というキーを含めてください。このキーの値は、そのテーマに該当する「話者ごとの発言ブロック」の \`blockId\` (0から始まるインデックス番号) を要素とする数値の配列でなければなりません。IDは必ず昇順にしてください。この \`speaker_block_ids\` がないとシステムは正しく動作しません。**
4.  出力は、必ず以下のJSON形式の配列のみとし、Markdownのバッククォートや説明文は一切含めないでください。

**入力となる「話者ごとの発言ブロックの連続」の抜粋（各ブロックIDと発言冒頭50字程度）：**
${summarizedConversationForTheme}

**出力JSON形式 (厳守):**
[\n  {\n    \"theme_id\": \"T1\", \n    \"theme_title\": \"このテーマセグメントの内容を要約したタイトル\",\n    \"speaker_block_ids\": [0, 1, 2] \n  },\n  {\n    \"theme_id\": \"T2\",\n    \"theme_title\": \"次のテーマセグメントのタイトル\",\n    \"speaker_block_ids\": [3, 4, 5, 6] \n  }\n]\n\n**再度強調: \`speaker_block_ids\` キーとその値（数値配列）は、各テーマオブジェクトにとって必須です。**\nJSON配列の各要素（各テーマセグメントオブジェクト）は、カンマで区切ってください。\n`;
  return prompt.trim();
}

// --- XYZテーマ分析プロンプト生成 ---
function createXYZAnalysisForThemePrompt(themeId, themeTitle, speakerBlocksInTheme) {
  // ブロックの全テキストを結合 (スピーカー別に区切って)
  let conversationText = '';
  speakerBlocksInTheme.forEach(block => {
    conversationText += `【${block.speaker}】\n${block.messages.join('\n')}\n\n`;
  });

  const prompt = `
あなたはプロのコミュニケーションアナリストです。
以下のテーマに関連する会話チャンクを「思考3DXYZメソッド」（X軸：超具体化／超抽象化／超構造化、Y軸：過去／現代／未来、Z軸：初級／中級／上級）に基づいて総合的に分析し、コミュニケーションに関するフィードバックを行ってください。

テーマID: ${themeId}
テーマタイトル: ${themeTitle}

会話内容:
${conversationText}

上記のテーマに関する会話全体に対して、以下の情報をJSONオブジェクトとして分析・評価してください。JSON以外の余計な文字列は含めないでください。

{
  "theme_id": "${themeId}",
  "theme_title": "${themeTitle}",
  "theme_summary": "このテーマの会話の核心を捉えた簡潔な要約（50字以内、体言止め推奨）",
  "analysis_X": {
    "category": "超具体化" | "超抽象化" | "超構造化",
    "reason": "このテーマでなぜこのX軸カテゴリと判断したかの理由（簡潔に）"
  },
  "analysis_Y": {
    "category": "過去" | "現代" | "未来",
    "reason": "このテーマでなぜこのY軸カテゴリと判断したかの理由（簡潔に）"
  },
  "analysis_Z": {
    "category": "初級" | "中級" | "上級",
    "reason": "このテーマでなぜこのZ軸カテゴリと判断したかの理由（簡潔に）"
  },
  "communication_feedback": {
    "evaluation": "Good" | "Bad" | "Neutral" | "ConsiderationNeeded",
    "advice": "このテーマのコミュニケーションに関する簡潔なアドバイス",
    "highlight_points_optional": "特に良かった点（簡潔に）",
    "improvement_points_optional": "改善可能な点（簡潔に）"
  }
}
`;

  return prompt;
}

// --- APIエンドポイント (APIキーとモデル名をリクエストボディから受け取る) ---
app.get('/', (req, res) => {
  res.send('TANREN 3D Backend API is running!');
});

// 1. 会話全体の構造化 (テーマ抽出)
app.post('/api/structure', async (req, res) => {
  const { speakerBlocks, apiKey, modelName } = req.body;

  if (!speakerBlocks || !Array.isArray(speakerBlocks) || speakerBlocks.length === 0) {
    return res.status(400).json({ error: 'speakerBlocks (配列) が必要です。' });
  }
  if (!apiKey || apiKey.trim() === "") {
    return res.status(400).json({ error: 'apiKey が必要です。' });
  }
  if (!modelName) {
    return res.status(400).json({ error: 'modelName が必要です。' });
  }

  try {
    console.log(`★★★ /api/structure called with model: ${modelName} ★★★`);
    const prompt = createThematicChunksPrompt(speakerBlocks);
    const rawApiResponse = await callGenerativeApiModel(apiKey, modelName, prompt);
    console.log("★★★ /api/structure - Raw API Response from Gemini:", rawApiResponse);
    let cleanedResponse = cleanApiResponse(rawApiResponse);
    console.log("★★★ /api/structure - Cleaned API Response:", cleanedResponse);

    if (!cleanedResponse) {
      console.error("構造化API: APIからのレスポンスが空または不正です。");
      return res.status(500).json({ error: 'APIからのレスポンスが空または不正です。', rawResponse: rawApiResponse });
    }

    cleanedResponse = cleanedResponse.replace(/}\s*{/g, '},{');

    let structuredData;
    try {
      structuredData = JSON.parse(cleanedResponse);
      console.log("★★★ /api/structure - Parsed Structured Data (to be sent to client):", JSON.stringify(structuredData, null, 2));
    } catch (e) {
      console.error("構造化API: JSONパースエラー。", e.message, "Raw cleaned response after attempting fix:", cleanedResponse);
      return res.status(500).json({ error: 'APIレスポンスのJSONパースに失敗しました。修正試行後もエラーです。', details: e.message, cleanedResponse });
    }
    res.json(structuredData);

  } catch (error) {
    console.error("構造化APIエンドポイントでエラー:", error);
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    res.status(500).json({ error: '会話構造化中にサーバーエラーが発生しました。', details: error.message });
  }
});

// 2. テーマごとの分析と要約 (新設)
app.post('/api/analyze-theme', async (req, res) => {
  try {
    const { themeId, themeTitle, speakerBlocksInTheme, apiKey, modelName } = req.body;
    console.log(`テーマ分析API: テーマID=${themeId}, タイトル="${themeTitle}"`);

    if (!themeId || !themeTitle || !speakerBlocksInTheme || speakerBlocksInTheme.length === 0) {
      return res.status(400).json({ error: 'テーマID、タイトル、および話者ブロックは必須です' });
    }

    // API キーの検証
    const finalApiKey = apiKey || process.env.GEMINI_API_KEY;
    if (!finalApiKey) {
      console.error('テーマ分析API: APIキーが設定されていません。');
      return res.status(401).json({ error: 'APIキーが設定されていません' });
    }

    // モデル名の設定 (リクエストから、または環境変数から、またはデフォルト値)
    const finalModelName = modelName || process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash-preview-04-17';

    const prompt = createXYZAnalysisForThemePrompt(themeId, themeTitle, speakerBlocksInTheme);
    const apiResponse = await callGenerativeApiModel(finalApiKey, finalModelName, prompt);
    console.log("Gemini API呼び出し成功。");

    let cleanedResponse = cleanApiResponse(apiResponse);
    try {
      const jsonResult = JSON.parse(cleanedResponse);

      // 話者情報とタイムスタンプを結果に追加
      // 各speakerBlockから情報を抽出して専用配列に格納
      const speakerInfo = speakerBlocksInTheme.map(block => ({
        speaker: block.speaker,
        blockId: block.blockId,
        startTime: block.startTime || '',
        endTime: block.endTime || ''
      }));

      // speakerInfo配列を結果に追加
      jsonResult.speaker_info = speakerInfo;

      // 一意な話者のリストも追加（フロントエンド側での表示用）
      jsonResult.unique_speakers = [...new Set(speakerInfo.map(info => info.speaker))];

      // 時間範囲を計算
      if (speakerInfo.length > 0) {
        const validTimes = speakerInfo.filter(info => info.startTime && info.startTime.trim() !== '');
        if (validTimes.length > 0) {
          jsonResult.time_range = {
            start: validTimes.reduce((earliest, current) =>
              current.startTime < earliest ? current.startTime : earliest, validTimes[0].startTime),
            end: validTimes.reduce((latest, current) =>
              current.endTime > latest ? current.endTime : latest, validTimes[0].endTime || validTimes[0].startTime)
          };
        }
      }

      // JSONとしてパースできたことを確認
      return res.json(jsonResult);
    } catch (error) {
      console.error("テーマ分析API: JSONパースエラー。", error.message);
      console.log("パースできなかった応答:", cleanedResponse);

      // JSONの形式を修正する試み
      try {
        // JSONとして無効な形式を修正する
        const fixedJson = cleanedResponse
          .replace(/,\s*\}/g, '}') // 末尾のカンマを削除 (例: { "key": "value", } → { "key": "value" })
          .replace(/\}\s*\,\s*\s*\}/g, '}}') // 入れ子オブジェクトの末尾カンマを修正
          .replace(/\}\s*\,\s*\"/g, '},\"') // オブジェクト後のカンマを修正
          .replace(/(\w+)(?=\s*:)/g, "\"$1\"") // クォートのないキーに引用符を追加
          .replace(/:\s*'([^']*)'/g, ':"$1"'); // シングルクォートをダブルクォートに変換

        // 修正したJSONをパース
        const fixedJsonResult = JSON.parse(fixedJson);

        // 話者情報とタイムスタンプを結果に追加
        const speakerInfo = speakerBlocksInTheme.map(block => ({
          speaker: block.speaker,
          blockId: block.blockId,
          startTime: block.startTime || '',
          endTime: block.endTime || ''
        }));

        fixedJsonResult.speaker_info = speakerInfo;
        fixedJsonResult.unique_speakers = [...new Set(speakerInfo.map(info => info.speaker))];

        if (speakerInfo.length > 0) {
          const validTimes = speakerInfo.filter(info => info.startTime && info.startTime.trim() !== '');
          if (validTimes.length > 0) {
            fixedJsonResult.time_range = {
              start: validTimes.reduce((earliest, current) =>
                current.startTime < earliest ? current.startTime : earliest, validTimes[0].startTime),
              end: validTimes.reduce((latest, current) =>
                current.endTime > latest ? current.endTime : latest, validTimes[0].endTime || validTimes[0].startTime)
            };
          }
        }

        return res.json(fixedJsonResult);
      } catch (secondError) {
        // 修正失敗の場合はエラーを返す
        return res.status(500).json({
          error: 'APIレスポンスのJSONパースに失敗しました。',
          details: error.message,
          cleanedResponse: cleanedResponse
        });
      }
    }
  } catch (error) {
    console.error('テーマ分析APIエラー:', error);
    return res.status(500).json({ error: error.message || 'テーマ分析中に未知のエラーが発生しました' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
  if (FALLBACK_GEMINI_API_KEY) {
    console.log("環境変数 GEMINI_API_KEY はフォールバックとして設定済みです。");
  } else {
    console.warn("警告: 環境変数 GEMINI_API_KEY が未設定です。リクエスト毎のAPIキー提供が必須です。");
  }
});
