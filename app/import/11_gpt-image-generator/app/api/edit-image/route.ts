import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"

// OpenAI APIクライアントの初期化関数
const createOpenAIClient = (apiKey: string) => {
  return new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  })
}

export async function POST(req: NextRequest) {
  try {
    const { image, mask, prompt, size = "1536x1024", quality = "medium", n = 1, apiKey = "" } = await req.json()

    if (!image) {
      return NextResponse.json({ error: "画像データが必要です" }, { status: 400 })
    }

    // APIキーの検証
    if (!apiKey && !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "APIキーが設定されていません。.envファイルにOPENAI_API_KEYを設定するか、設定画面でAPIキーを入力してください。" },
        { status: 400 }
      )
    }

    // OpenAIクライアントの作成
    const openai = createOpenAIClient(apiKey)

    // OpenAI APIを呼び出して画像を編集
    const response = await openai.images.edit({
      model: "gpt-image-1", // GPT-Image-1モデルを使用
      image: image, // base64エンコードされた画像
      mask: mask, // オプションのマスク画像
      prompt: prompt,
      n: Math.min(Math.max(n, 1), 10), // 1～10の範囲に制限
      size: size === "auto" ? undefined : size, // "auto"の場合はundefinedに
      quality: quality, // "auto", "high", "medium", "low"をサポート
      // gpt-image-1はresponse_formatパラメータをサポートしない（常にbase64）
    })

    // 生成成功の場合
    if (response.data && response.data.length > 0) {
      // gpt-image-1は常にbase64エンコードされた画像を返す
      const imageData = response.data[0]?.b64_json
      if (imageData) {
        return NextResponse.json({
          success: true,
          imageUrl: `data:image/png;base64,${imageData}`,
          // 将来的な拡張のために全ての画像URLを含める
          allImageUrls: response.data.map((img) => `data:image/png;base64,${img.b64_json}`),
        })
      } else {
        throw new Error("画像データが取得できませんでした")
      }
    } else {
      throw new Error("画像データが取得できませんでした")
    }
  } catch (error: any) {
    console.error("Image editing error:", error)
    
    // エラーメッセージのカスタマイズ
    let errorMessage = "画像編集中にエラーが発生しました"
    if (error.code === 'invalid_api_key') {
      errorMessage = "APIキーが無効です。設定画面から正しいAPIキーを入力してください"
    } else if (error.status === 401) {
      errorMessage = "APIキーが認証されませんでした。APIキーを確認してください"
    } else if (error.status === 429) {
      errorMessage = "APIの使用制限に達しました。しばらく待ってから再試行してください"  
    } else if (error.status === 400) {
      errorMessage = "リクエストが無効です。画像データやプロンプトを確認してください"
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 },
    )
  }
}
