import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import os from "os"

// 一時ファイルディレクトリ
const TEMP_DIR = path.join(os.tmpdir(), "gpt-image-generator")

// 1時間以上経過したファイルを削除
const MAX_AGE_MS = 60 * 60 * 1000

export async function POST(req: NextRequest) {
  try {
    const dirExists = await fs.access(TEMP_DIR).then(() => true).catch(() => false)
    if (!dirExists) {
      return NextResponse.json({ message: "No temp directory to clean" })
    }

    const files = await fs.readdir(TEMP_DIR)
    const now = Date.now()
    let deletedCount = 0

    for (const file of files) {
      if (!file.endsWith('.png')) continue
      
      const filePath = path.join(TEMP_DIR, file)
      const stats = await fs.stat(filePath)
      const age = now - stats.mtimeMs

      if (age > MAX_AGE_MS) {
        await fs.unlink(filePath)
        deletedCount++
      }
    }

    return NextResponse.json({ 
      message: `Cleaned up ${deletedCount} old temporary images` 
    })
  } catch (error) {
    console.error("Error cleaning up temporary images:", error)
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 })
  }
}