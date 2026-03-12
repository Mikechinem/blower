import { NextRequest, NextResponse } from 'next/server'
import { sendCAPIEvent } from '@/lib/capiHelper'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { eventName, customData } = body

  const userAgent = req.headers.get('user-agent') ?? ''
  const referer   = req.headers.get('referer') ?? ''

  await sendCAPIEvent({
    eventName,
    clientUserAgent: userAgent,
    sourceUrl: referer,
    customData: customData ?? {},
  })

  return NextResponse.json({ success: true })
}