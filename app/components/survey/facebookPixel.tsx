'use client'

import { useEffect } from 'react'

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!
// ── Helper to fire browser pixel events ──
export function fbEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params ?? {})
  }
}

export default function FacebookPixel() {
  useEffect(() => {
    if ((window as any).fbq) return

    // Set up fbq queue before script loads
    const win = window as any
    const fbq: any = function (...args: any[]) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    win.fbq = fbq
    win._fbq = fbq

    // Inject the pixel script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    // Init and fire PageView
    win.fbq('init', PIXEL_ID)
    win.fbq('track', 'PageView')
  }, [])

  return null
}