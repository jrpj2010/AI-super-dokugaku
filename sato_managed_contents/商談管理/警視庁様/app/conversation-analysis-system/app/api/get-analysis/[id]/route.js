// 保存済み分析結果取得API
// 特定のIDの分析結果を取得するエンドポイント

import { createErrorResponse } from '../../../../lib/api-utils';
import fs from 'fs';
import path from 'path';

// 保存先ディレクトリ
const SAVE_DIR = path.join(process.cwd(), 'saved-analysis');

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return createErrorResponse(new Error("分析IDが指定されていません"), 400);
    }

    // ファイル名からIDを特定する方法
    const fileName = `analysis_${id}.json`;
    const filePath = path.join(SAVE_DIR, fileName);

    // ファイルの存在確認
    if (!fs.existsSync(filePath)) {
      return createErrorResponse(new Error("指定された分析結果が見つかりません"), 404);
    }

    // ファイルを読み込み
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const analysisData = JSON.parse(fileContent);

    return new Response(JSON.stringify(analysisData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("分析結果取得エラー:", error);
    return createErrorResponse(error, 500, "分析結果の取得中にエラーが発生しました");
  }
}
