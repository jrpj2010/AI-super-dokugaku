import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { chapters } = await request.json()

    const csvContent = [
      "sho,chapter,title,start,end",
      ...chapters.map((c: any) => `${c.sho},${c.chapter},"${c.title}",${c.start},${c.end}`),
    ].join("\n")

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="chapters.csv"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "CSVファイルの生成に失敗しました" }, { status: 500 })
  }
}
