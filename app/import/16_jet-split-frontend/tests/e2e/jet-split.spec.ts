import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('ジェットスプリット E2Eテスト', () => {
  test('完全なワークフロー: SRTアップロードから各種ダウンロードまで', async ({ page }) => {
    // 1. トップページにアクセス
    await page.goto('/');
    
    // タイトルとデモボタンの存在確認
    await expect(page.locator('h1')).toContainText('ジェットスプリット');
    await expect(page.getByText('サンプルデータを読み込み')).toBeVisible();
    
    // 2. デモデータを読み込み
    await page.getByText('サンプルデータを読み込み').click();
    
    // ファイルが読み込まれたことを確認
    await expect(page.getByText('sample_webmarketing_seminar.srt')).toBeVisible();
    
    // 3. 章・チャプターを抽出
    await page.getByText('サンプルデータで章・チャプターを抽出').click();
    
    // 処理中の表示を確認
    await expect(page.getByText('Gemini AIで章・チャプターを抽出中...')).toBeVisible();
    
    // 処理完了を待つ（最大30秒）
    await expect(page.getByText('処理完了')).toBeVisible({ timeout: 30000 });
    
    // 4. 抽出結果の確認
    await expect(page.getByText('ステップ2: 抽出結果プレビュー')).toBeVisible();
    
    // テーブルヘッダーの確認
    await expect(page.getByRole('columnheader', { name: '章' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'チャプター' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'タイトル' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: '開始時間' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: '終了時間' })).toBeVisible();
    
    // データが表示されていることを確認
    const tableRows = page.locator('tbody tr');
    await expect(tableRows).toHaveCount(9); // サンプルデータは9チャプター
    
    // 5. 各種ダウンロードボタンの動作確認
    await expect(page.getByText('ステップ3: ファイルダウンロード')).toBeVisible();
    
    // Excelダウンロードボタンの存在確認
    const excelButton = page.getByRole('button', { name: /Excel形式/ });
    await expect(excelButton).toBeVisible();
    
    // CSVダウンロードボタンの存在確認
    const csvButton = page.getByRole('button', { name: /CSV形式/ });
    await expect(csvButton).toBeVisible();
    
    // バッチZIPダウンロードボタンの存在確認
    const zipButton = page.getByRole('button', { name: /バッチZIP/ });
    await expect(zipButton).toBeVisible();
    
    // 6. 使用方法の説明が表示されていることを確認
    await expect(page.getByText('バッチZIPの使用方法:')).toBeVisible();
    await expect(page.getByText('./jet_split.sh 動画ファイル名.mp4')).toBeVisible();
  });

  test('エラーハンドリング: 不正なファイルのアップロード', async ({ page }) => {
    await page.goto('/');
    
    // テキストファイルを作成してアップロード
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is not an SRT file')
    });
    
    // エラーメッセージの確認
    await expect(page.getByText('SRTファイルを選択してください')).toBeVisible();
  });

  test('レスポンシブデザイン: モバイル表示', async ({ page }) => {
    // モバイルビューポートに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // 主要要素が表示されていることを確認
    await expect(page.locator('h1')).toContainText('ジェットスプリット');
    await expect(page.getByText('サンプルデータを読み込み')).toBeVisible();
    
    // ドロップエリアが表示されていることを確認
    await expect(page.getByText('SRTファイルをここにドロップ')).toBeVisible();
  });

  test('リセット機能の動作確認', async ({ page }) => {
    await page.goto('/');
    
    // デモデータを読み込み
    await page.getByText('サンプルデータを読み込み').click();
    await expect(page.getByText('sample_webmarketing_seminar.srt')).toBeVisible();
    
    // リセットボタンをクリック
    await page.getByText('リセット').click();
    
    // ファイルがクリアされたことを確認
    await expect(page.getByText('SRTファイルをここにドロップ')).toBeVisible();
    await expect(page.getByText('sample_webmarketing_seminar.srt')).not.toBeVisible();
  });
});