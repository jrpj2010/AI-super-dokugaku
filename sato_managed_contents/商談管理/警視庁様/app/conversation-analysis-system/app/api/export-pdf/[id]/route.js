// PDF出力API
// 分析結果をPDF形式で出力するエンドポイント

import { createErrorResponse } from '../../../../lib/api-utils';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// 保存先ディレクトリ
const SAVE_DIR = path.join(process.cwd(), 'saved-analysis');
const PDF_DIR = path.join(process.cwd(), 'pdf-exports');

// PDFディレクトリが存在しない場合は作成
if (!fs.existsSync(PDF_DIR)) {
  fs.mkdirSync(PDF_DIR, { recursive: true });
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return createErrorResponse(new Error("分析IDが指定されていません"), 400);
    }

    // 分析データファイルのパス
    const fileName = `analysis_${id}.json`;
    const filePath = path.join(SAVE_DIR, fileName);

    // ファイルの存在確認
    if (!fs.existsSync(filePath)) {
      return createErrorResponse(new Error("指定された分析結果が見つかりません"), 404);
    }

    // 分析データの読み込み
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const analysisData = JSON.parse(fileContent);

    // PDF出力先のパス
    const pdfFileName = `analysis_${id}_${new Date().toISOString().replace(/:/g, '-')}.pdf`;
    const pdfFilePath = path.join(PDF_DIR, pdfFileName);

    // HTML形式に変換
    const htmlContent = generateHtml(analysisData);

    // Puppeteerを使用してPDFを生成
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // HTMLコンテンツをセット
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // PDFとして保存
    await page.pdf({
      path: pdfFilePath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();

    // PDFファイルを読み込み、レスポンスとして返す
    const pdfBuffer = fs.readFileSync(pdfFilePath);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pdfFileName}"`
      }
    });

  } catch (error) {
    console.error("PDF出力エラー:", error);
    return createErrorResponse(error, 500, "PDF出力中にエラーが発生しました");
  }
}

/**
 * 分析結果からHTML文書を生成する
 * @param {Object} analysisData 分析データ
 * @returns {string} HTML文書
 */
function generateHtml(analysisData) {
  const { timestamp, scriptText, analysisResults } = analysisData;

  // 日付のフォーマット
  const formattedDate = new Date(timestamp).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // テーマ分析結果のHTML生成
  const themesHtml = analysisResults.map(theme => `
    <div class="theme">
      <h2>${theme.theme_title}</h2>
      <div class="theme-summary">
        <h3>テーマ要約</h3>
        <p>${theme.theme_summary || '要約なし'}</p>
      </div>

      <div class="analysis-xyz">
        <h3>XYZ分析</h3>
        <div class="xyz-grid">
          <div class="xyz-item">
            <h4>X軸: ${theme.analysis_X?.category || '不明'}</h4>
            <p>${theme.analysis_X?.reason || '分析なし'}</p>
          </div>
          <div class="xyz-item">
            <h4>Y軸: ${theme.analysis_Y?.category || '不明'}</h4>
            <p>${theme.analysis_Y?.reason || '分析なし'}</p>
          </div>
          <div class="xyz-item">
            <h4>Z軸: ${theme.analysis_Z?.category || '不明'}</h4>
            <p>${theme.analysis_Z?.reason || '分析なし'}</p>
          </div>
        </div>
      </div>

      ${theme.communication_feedback ? `
      <div class="communication-feedback">
        <h3>コミュニケーション評価</h3>
        <div class="evaluation">
          <span class="evaluation-label">${theme.communication_feedback.evaluation || '評価なし'}</span>
          <p>${theme.communication_feedback.advice || 'アドバイスなし'}</p>
        </div>

        ${theme.communication_feedback.highlight_points_optional ? `
        <div class="highlight-points">
          <h4>良かった点</h4>
          <p>${theme.communication_feedback.highlight_points_optional}</p>
        </div>
        ` : ''}

        ${theme.communication_feedback.improvement_points_optional ? `
        <div class="improvement-points">
          <h4>改善点</h4>
          <p>${theme.communication_feedback.improvement_points_optional}</p>
        </div>
        ` : ''}
      </div>
      ` : ''}
    </div>
  `).join('');

  // スクリプト全文を整形
  const formattedScript = scriptText.split('\n').map(line => `<p>${line}</p>`).join('');

  // 完全なHTML文書
  return `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>思考3DXYZ分析レポート</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 20px;
      }
      .report-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }
      .report-title {
        font-size: 24px;
        color: #2563eb;
        margin-bottom: 10px;
      }
      .report-date {
        color: #666;
        font-size: 14px;
      }
      .theme {
        margin-bottom: 40px;
        padding: 20px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background-color: #f9fafb;
      }
      h2 {
        color: #1e40af;
        padding-bottom: 8px;
        border-bottom: 2px solid #3b82f6;
        margin-top: 0;
      }
      h3 {
        color: #1e40af;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 16px;
      }
      h4 {
        color: #4b5563;
        margin-bottom: 8px;
        font-size: 14px;
      }
      .theme-summary {
        background-color: #eff6ff;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 20px;
      }
      .xyz-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
      }
      .xyz-item {
        background-color: #f8fafc;
        padding: 15px;
        border-radius: 6px;
        border-left: 3px solid #3b82f6;
      }
      .communication-feedback {
        margin-top: 20px;
        background-color: #f8fafc;
        padding: 15px;
        border-radius: 6px;
      }
      .evaluation {
        margin-bottom: 15px;
      }
      .evaluation-label {
        display: inline-block;
        padding: 4px 8px;
        background-color: #dbeafe;
        color: #1e40af;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .highlight-points {
        background-color: #f0fdf4;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .improvement-points {
        background-color: #fef2f2;
        padding: 10px;
        border-radius: 4px;
      }
      .script-section {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
      .script-container {
        background-color: #f8fafc;
        padding: 15px;
        border-radius: 6px;
        white-space: pre-wrap;
        font-family: monospace;
        font-size: 12px;
        max-height: 300px;
        overflow-y: auto;
      }
      @media print {
        .theme {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .xyz-grid {
          display: block;
        }
        .xyz-item {
          margin-bottom: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="report-header">
      <div class="report-title">思考3DXYZ会話分析レポート</div>
      <div class="report-date">作成日時: ${formattedDate}</div>
    </div>

    <div class="themes-section">
      ${themesHtml}
    </div>

    <div class="script-section">
      <h2>分析スクリプト</h2>
      <div class="script-container">
        ${formattedScript}
      </div>
    </div>
  </body>
  </html>
  `;
}
