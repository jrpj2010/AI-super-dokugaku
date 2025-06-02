import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { chapters } = await request.json()

    // jet_split.shスクリプトの生成
    const shellScript = generateJetSplitScript(chapters)

    // cuts.txtファイルの生成
    const cutsContent = chapters
      .map((c: any) => `${c.sho}_${String(c.chapter).padStart(3, "0")}_${slugify(c.title)}.mp4,${c.start},${c.end}`)
      .join("\n")

    // 章チャプター一覧の生成
    const chapterList = chapters.map((c: any) => `${c.sho},${c.chapter},${c.title},${c.start},${c.end}`).join("\n")

    // モックZIPデータ（実際の実装ではJSZipなどを使用）
    const zipData = generateMockZipData({
      "jet_split.sh": shellScript,
      "cuts.txt": cutsContent,
      "chapters.csv": "sho,chapter,title,start,end\n" + chapterList,
      "README.md": generateReadme(),
    })

    return new NextResponse(zipData, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="jet_split_batch.zip"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "バッチZIPファイルの生成に失敗しました" }, { status: 500 })
  }
}

function generateJetSplitScript(chapters: any[]) {
  const script = `#!/bin/bash

# ジェットスプリット - 動画自動分割スクリプト
# 使用方法: ./jet_split.sh 動画ファイル名.mp4

if [ $# -eq 0 ]; then
    echo "使用方法: ./jet_split.sh 動画ファイル名.mp4"
    exit 1
fi

IN="$1"

if [ ! -f "$IN" ]; then
    echo "エラー: ファイル '$IN' が見つかりません"
    exit 1
fi

echo "動画分割を開始します: $IN"
echo "分割数: ${chapters.length}個のチャプター"
echo ""

${chapters
  .map((c: any, index: number) => {
    const filename = `${c.sho}_${String(c.chapter).padStart(3, "0")}_${slugify(c.title)}.mp4`
    return `echo "[${index + 1}/${chapters.length}] ${filename} を作成中..."
ffmpeg -y -i "$IN" -ss ${c.start} -to ${c.end} -c copy "${filename}"`
  })
  .join("\n")}

echo ""
echo "✅ 分割完了！${chapters.length}個のファイルが作成されました。"
echo "作成されたファイル:"
${chapters
  .map((c: any) => {
    const filename = `${c.sho}_${String(c.chapter).padStart(3, "0")}_${slugify(c.title)}.mp4`
    return `echo "  - ${filename}"`
  })
  .join("\n")}
`
  return script
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function generateReadme() {
  return `# ジェットスプリット - 動画分割バッチ

## 使用方法

1. このZIPファイルを動画ファイルと同じフォルダに解凍してください
2. ターミナル（コマンドプロンプト）を開き、解凍したフォルダに移動してください
3. 以下のコマンドを実行してください：

\`\`\`bash
chmod +x jet_split.sh
./jet_split.sh 動画ファイル名.mp4
\`\`\`

## 必要な環境

- FFmpeg 4.x以上がインストールされていること
- macOS または Linux環境

## 注意事項

- 分割処理には時間がかかる場合があります
- 元の動画ファイルは変更されません
- 分割されたファイルは同じフォルダに保存されます

## ファイル説明

- \`jet_split.sh\`: 分割実行スクリプト
- \`cuts.txt\`: 分割情報ファイル
- \`chapters.csv\`: 章・チャプター一覧
- \`README.md\`: このファイル
`
}

function generateMockZipData(files: Record<string, string>) {
  // 実際の実装ではJSZipライブラリを使用
  // ここではモックデータを返す
  const content = Object.entries(files)
    .map(([filename, content]) => `${filename}:\n${content}\n\n`)
    .join("---\n")

  return new TextEncoder().encode(content)
}
