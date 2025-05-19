// 分析結果保存API
// 分析結果をローカルストレージに保存するエンドポイント

import { createErrorResponse } from '../../../lib/api-utils';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// 保存先ディレクトリ
const SAVE_DIR = path.join(process.cwd(), 'saved-analysis');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR, { recursive: true });
}

export async function POST(request) {
  try {
    const { analysisResults, scriptText, timestamp } = await request.json();

    if (!analysisResults || !scriptText) {
      return createErrorResponse(new Error("必須パラメータが不足しています"), 400);
    }

    // 保存用のデータ構造
    const saveData = {
      id: uuidv4(),
      timestamp: timestamp || new Date().toISOString(),
      scriptText,
      analysisResults,
    };

    // ファイル名の作成
    const fileName = `analysis_${saveData.id}.json`;
    const filePath = path.join(SAVE_DIR, fileName);

    // ファイルに保存
    fs.writeFileSync(filePath, JSON.stringify(saveData, null, 2), 'utf8');

    return new Response(JSON.stringify({
      success: true,
      id: saveData.id,
      fileName
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("分析結果保存エラー:", error);
    return createErrorResponse(error, 500, "分析結果の保存中にエラーが発生しました");
  }
}

// 分析結果の一覧取得
export async function GET() {
  try {
    // 保存されている分析結果一覧を取得
    const files = fs.readdirSync(SAVE_DIR).filter(file => file.endsWith('.json'));

    // 各ファイルから必要な情報を抽出
    const analysisList = files.map(file => {
      const filePath = path.join(SAVE_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);

      // 必要な情報だけを返す
      return {
        id: data.id,
        timestamp: data.timestamp,
        fileName: file,
        // 最初のテーマタイトルを取得（一覧表示用）
        firstThemeTitle: data.analysisResults[0]?.theme_title || '無題の分析',
        themeCount: data.analysisResults.length
      };
    });

    // 新しい順に並べ替え
    analysisList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return new Response(JSON.stringify(analysisList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("分析結果一覧取得エラー:", error);
    return createErrorResponse(error, 500, "分析結果一覧の取得中にエラーが発生しました");
  }
}
