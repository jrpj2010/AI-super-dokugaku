import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 })
    }

    // SRTファイルの内容を読み取り
    const content = await file.text()

    // モックデータ（実際の実装ではGemini APIを呼び出し）
    const mockChapters = [
      {
        sho: 1,
        chapter: 1,
        title: "イントロダクション",
        start: "00:00:00",
        end: "00:02:30",
      },
      {
        sho: 1,
        chapter: 2,
        title: "基本概念の説明",
        start: "00:02:30",
        end: "00:05:15",
      },
      {
        sho: 1,
        chapter: 3,
        title: "実践例の紹介",
        start: "00:05:15",
        end: "00:08:45",
      },
      {
        sho: 2,
        chapter: 4,
        title: "応用技術の解説",
        start: "00:08:45",
        end: "00:12:20",
      },
      {
        sho: 2,
        chapter: 5,
        title: "ケーススタディ",
        start: "00:12:20",
        end: "00:15:30",
      },
      {
        sho: 3,
        chapter: 6,
        title: "まとめと今後の展望",
        start: "00:15:30",
        end: "00:18:00",
      },
    ]

    // 実際の実装では、ここでGemini APIを呼び出してSRTファイルから章・チャプターを抽出
    // const chapters = await extractChaptersWithGemini(content)

    return NextResponse.json({
      chapters: mockChapters,
      message: "章・チャプターの抽出が完了しました",
    })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "ファイルの処理中にエラーが発生しました" }, { status: 500 })
  }
}
