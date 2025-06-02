import { type NextRequest, NextResponse } from "next/server"
import * as XLSX from 'xlsx'

interface ChapterData {
  sho: number
  chapter: number
  title: string
  start: string
  end: string
}

export async function POST(request: NextRequest) {
  try {
    const { chapters } = await request.json() as { chapters: ChapterData[] }
    
    if (!chapters || !Array.isArray(chapters) || chapters.length === 0) {
      return NextResponse.json(
        { error: 'チャプターデータが必要です' },
        { status: 400 }
      )
    }
    
    // ワークブックを作成
    const workbook = XLSX.utils.book_new()
    
    // データを整形
    const worksheetData = [
      ['章', 'チャプター', 'タイトル', '開始時間', '終了時間'],
      ...chapters.map(ch => [
        ch.sho,
        ch.chapter,
        ch.title,
        ch.start,
        ch.end
      ])
    ]
    
    // ワークシートを作成
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
    
    // 列幅を設定
    worksheet['!cols'] = [
      { wch: 8 },   // 章
      { wch: 12 },  // チャプター
      { wch: 40 },  // タイトル
      { wch: 12 },  // 開始時間
      { wch: 12 }   // 終了時間
    ]
    
    // ワークシートをワークブックに追加
    XLSX.utils.book_append_sheet(workbook, worksheet, 'チャプター一覧')
    
    // Excelファイルをバッファとして生成
    const buffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx',
      bookSST: false
    })
    
    // レスポンスを返す
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="chapters.xlsx"',
      },
    })
    
  } catch (error) {
    console.error('Excel generation error:', error)
    return NextResponse.json(
      { error: 'Excelファイルの生成に失敗しました' },
      { status: 500 }
    )
  }
}
