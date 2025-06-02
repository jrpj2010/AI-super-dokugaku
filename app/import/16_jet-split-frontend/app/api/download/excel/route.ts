import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { chapters } = await request.json()

    // 実際の実装では、openpyxlやExcelJSを使用してExcelファイルを生成
    // ここではモックレスポンス
    const excelData = generateMockExcelData(chapters)

    return new NextResponse(excelData, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="chapters.xlsx"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Excelファイルの生成に失敗しました" }, { status: 500 })
  }
}

function generateMockExcelData(chapters: any[]) {
  // モックのExcelデータ（実際の実装では適切なライブラリを使用）
  const csvContent = [
    "sho,chapter,title,start,end",
    ...chapters.map((c) => `${c.sho},${c.chapter},"${c.title}",${c.start},${c.end}`),
  ].join("\n")

  return new TextEncoder().encode(csvContent)
}
