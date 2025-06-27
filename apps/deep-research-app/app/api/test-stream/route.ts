import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const messages = [
        'テスト: ストリーミング開始\n',
        'これは段階的に送信されるメッセージです。\n',
        '1秒ごとに新しい行が追加されます。\n',
        'ストリーミングが正常に動作しています！\n',
        '完了しました。'
      ]
      
      for (const msg of messages) {
        controller.enqueue(encoder.encode(msg))
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}