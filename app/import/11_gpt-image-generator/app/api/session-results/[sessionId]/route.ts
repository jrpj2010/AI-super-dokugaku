import { NextRequest, NextResponse } from "next/server"

// generate-stream/route.ts と同じキャッシュオブジェクトを参照
if (!(global as any)._sessionResultsCache) {
  (global as any)._sessionResultsCache = {}
}
const sessionResultsCache: { [sessionId: string]: Array<{ id: string; status: string; imageUrl?: string; message?: string }> } = (global as any)._sessionResultsCache

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ sessionId: string }> }
) {
  const params = await props.params
  const { sessionId } = params

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required from path" }, { status: 400 })
  }

  console.log(`[API SESSION-RESULTS] Received GET request for session ID: ${sessionId}`)

  const results = sessionResultsCache[sessionId]

  if (!results) {
    console.log(`[API SESSION-RESULTS] No cache entry found for session ID: ${sessionId}`)
    return NextResponse.json({ 
      error: "Results not found for this session ID. It might have expired, or the generation process hasn't started/completed." 
    }, { status: 404 })
  }
  
  console.log(`[API SESSION-RESULTS] Found ${results.length} items in cache for session ID: ${sessionId}`)
  return NextResponse.json({ images: results })
}