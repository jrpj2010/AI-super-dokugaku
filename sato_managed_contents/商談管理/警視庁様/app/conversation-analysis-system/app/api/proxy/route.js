// APIプロキシ
// 外部APIにCORSヘッダーを付与して中継する

export async function POST(request) {
  try {
    const { url, method, headers, body } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({
        error: "URLが指定されていません"
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // リクエストヘッダーの設定（機密情報は除外）
    const requestHeaders = {};
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        // 安全なヘッダーのみ転送
        if (!['cookie', 'authorization'].includes(key.toLowerCase())) {
          requestHeaders[key] = value;
        }
      }
    }

    // APIリクエスト
    const apiResponse = await fetch(url, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...requestHeaders
      },
      body: body ? JSON.stringify(body) : undefined
    });

    // レスポンスデータ
    const data = await apiResponse.json();

    // CORSヘッダー付きでレスポンス
    return new Response(JSON.stringify(data), {
      status: apiResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error("プロキシAPIエラー:", error);

    return new Response(JSON.stringify({
      error: error.message || "プロキシ処理中にエラーが発生しました"
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// CORS用のプリフライトリクエスト対応
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
