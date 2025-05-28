import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// セッションデータを保存するディレクトリ
const SESSIONS_DIR = path.join(process.cwd(), 'data', 'sessions')

// ディレクトリが存在することを確認
async function ensureSessionsDir() {
  try {
    await fs.access(SESSIONS_DIR)
  } catch {
    await fs.mkdir(SESSIONS_DIR, { recursive: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json()

    // セッションIDの検証
    if (!sessionData.id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // セッションディレクトリを確保
    await ensureSessionsDir()

    // セッションデータをJSONファイルとして保存
    const fileName = `${sessionData.id}.json`
    const filePath = path.join(SESSIONS_DIR, fileName)

    // videoBlobは保存しない（サイズが大きいため）
    const dataToSave = {
      ...sessionData,
      videoBlob: undefined,
      videoBlobSize: sessionData.videoBlob?.size || 0
    }

    await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2))

    return NextResponse.json({
      success: true,
      sessionId: sessionData.id,
      message: 'Session saved successfully'
    })

  } catch (error) {
    console.error('Error saving session:', error)
    return NextResponse.json(
      { error: 'Failed to save session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureSessionsDir()

    // セッションファイル一覧を取得
    const files = await fs.readdir(SESSIONS_DIR)
    const sessionFiles = files.filter(file => file.endsWith('.json'))

    // 各セッションファイルを読み込み
    const sessions = await Promise.all(
      sessionFiles.map(async (file) => {
        const filePath = path.join(SESSIONS_DIR, file)
        const content = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(content)
      })
    )

    // 開始時刻でソート（新しい順）
    sessions.sort((a, b) => {
      const dateA = new Date(a.startTime).getTime()
      const dateB = new Date(b.startTime).getTime()
      return dateB - dateA
    })

    return NextResponse.json({
      sessions,
      total: sessions.length
    })

  } catch (error) {
    console.error('Error loading sessions:', error)
    return NextResponse.json(
      { error: 'Failed to load sessions' },
      { status: 500 }
    )
  }
}

// 特定のセッションを削除
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`)
    
    try {
      await fs.unlink(filePath)
      return NextResponse.json({
        success: true,
        message: 'Session deleted successfully'
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}