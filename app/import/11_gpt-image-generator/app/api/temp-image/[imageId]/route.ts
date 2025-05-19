import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import os from "os"

// 一時ファイルディレクトリ
const TEMP_DIR = path.join(os.tmpdir(), "gpt-image-generator")

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ imageId: string }> }
) {
  try {
    const params = await props.params
    const { imageId } = params

    // セキュリティチェック: imageIdは英数字とハイフンのみ許可
    if (!/^[a-zA-Z0-9-]+$/.test(imageId)) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 })
    }

    const imagePath = path.join(TEMP_DIR, `${imageId}.png`)

    // ファイルの存在確認
    try {
      await fs.access(imagePath)
    } catch {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // 画像ファイルを読み込む
    const imageBuffer = await fs.readFile(imagePath)

    // 画像をレスポンスとして返す
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Error serving temporary image:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}