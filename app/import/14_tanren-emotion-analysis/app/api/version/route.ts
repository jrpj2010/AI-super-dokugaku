import { NextResponse } from 'next/server'
import { VERSION_DISPLAY } from '@/lib/version'

export async function GET() {
  return NextResponse.json({
    version: VERSION_DISPLAY,
    timestamp: new Date().toISOString()
  })
}