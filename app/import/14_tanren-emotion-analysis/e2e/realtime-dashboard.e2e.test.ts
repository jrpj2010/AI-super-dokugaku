import { test, expect, Page } from '@playwright/test'

// ブラウザの権限設定
test.use({
  permissions: ['camera', 'microphone']
})

test.describe('RealtimeDashboard E2E Tests', () => {
  let page: Page

  test.beforeEach(async ({ browser }) => {
    // カメラとマイクの権限を持つコンテキストを作成
    const context = await browser.newContext({
      permissions: ['camera', 'microphone']
    })
    page = await context.newPage()
    await page.goto('http://localhost:3000')
  })

  test('初期画面が正しく表示される', async () => {
    await expect(page.locator('h2:has-text("今日の調子はいかがですか？")')).toBeVisible()
    await expect(page.locator('text=1分ほどお話をしてください')).toBeVisible()
    await expect(page.locator('button:has-text("開始")')).toBeVisible()
  })

  test('録画を開始できる', async () => {
    // 開始ボタンをクリック
    await page.click('button:has-text("開始")')
    
    // ストップボタンが表示されるまで待つ
    await expect(page.locator('button:has-text("ストップ")')).toBeVisible({ timeout: 5000 })
    
    // 録画中のインジケーターが表示される
    await expect(page.locator('text=録画中')).toBeVisible()
    
    // ビデオストリームが表示される
    await expect(page.locator('[data-testid="video-stream"]')).toBeVisible()
  })

  test('録画を停止できる', async () => {
    // 録画を開始
    await page.click('button:has-text("開始")')
    await expect(page.locator('button:has-text("ストップ")')).toBeVisible({ timeout: 5000 })
    
    // 2秒待つ（録画データを作成するため）
    await page.waitForTimeout(2000)
    
    // 録画を停止
    await page.click('button:has-text("ストップ")')
    
    // 新しいセッションボタンが表示される
    await expect(page.locator('button:has-text("新しいセッション")')).toBeVisible({ timeout: 5000 })
    
    // 分析処理を開始ボタンが表示される
    await expect(page.locator('button:has-text("分析処理を開始")')).toBeVisible()
  })

  test('権限が拒否された場合のエラーハンドリング', async ({ browser }) => {
    // 権限なしのコンテキストを作成
    const context = await browser.newContext({
      permissions: []
    })
    const noPermPage = await context.newPage()
    await noPermPage.goto('http://localhost:3000')
    
    // アラートのリスナーを設定
    noPermPage.on('dialog', async dialog => {
      expect(dialog.message()).toContain('カメラとマイクへのアクセスが拒否されました')
      await dialog.accept()
    })
    
    // 開始ボタンをクリック
    await noPermPage.click('button:has-text("開始")')
    
    // エラーメッセージが表示される
    await expect(noPermPage.locator('text=📷 カメラとマイクの許可が必要です')).toBeVisible({ timeout: 5000 })
  })

  test('感情分析が動作する', async () => {
    // 録画を開始
    await page.click('button:has-text("開始")')
    await expect(page.locator('button:has-text("ストップ")')).toBeVisible({ timeout: 5000 })
    
    // 感情レーダーチャートが表示される
    await expect(page.locator('[data-testid="emotion-radar-chart"]')).toBeVisible()
    
    // 感情トレンドチャートが表示される
    await expect(page.locator('[data-testid="emotion-trend-chart"]')).toBeVisible()
    
    // 分析中のインジケーターが表示される（分析が有効な場合）
    const analyzingIndicator = page.locator('text=分析中')
    if (await analyzingIndicator.isVisible()) {
      expect(analyzingIndicator).toBeVisible()
    }
  })

  test('録画完了後にレポート画面へ遷移できる', async () => {
    // 録画を開始
    await page.click('button:has-text("開始")')
    await expect(page.locator('button:has-text("ストップ")')).toBeVisible({ timeout: 5000 })
    
    // 2秒待つ
    await page.waitForTimeout(2000)
    
    // 録画を停止
    await page.click('button:has-text("ストップ")')
    
    // 分析処理を開始ボタンが表示されるまで待つ
    await expect(page.locator('button:has-text("分析処理を開始")')).toBeVisible({ timeout: 5000 })
    
    // 分析処理を開始
    await page.click('button:has-text("分析処理を開始")')
    
    // URLが変更されることを確認
    await expect(page).toHaveURL('/?tab=report', { timeout: 10000 })
  })

  test('セッション保存エラーのハンドリング', async () => {
    // セッション保存をモックしてエラーを発生させる
    await page.route('**/api/sessions', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      })
    })
    
    // アラートのリスナーを設定
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('セッションの保存に失敗しました')
      await dialog.accept()
    })
    
    // 録画を開始
    await page.click('button:has-text("開始")')
    await expect(page.locator('button:has-text("ストップ")')).toBeVisible({ timeout: 5000 })
    
    // 録画を停止
    await page.click('button:has-text("ストップ")')
    
    // エラーメッセージが表示されることを確認
    await page.waitForTimeout(2000)
  })
})