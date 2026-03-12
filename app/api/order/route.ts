import { NextRequest, NextResponse } from 'next/server'
import type { OrderData } from '@/components/survey/types'
import { PAIN_LABELS } from '@/components/survey/data'
import { sendCAPIEvent } from '@/lib/capiHelper'

// ── Replace with your WhatsApp number (international format, no + or spaces) ──
const WHATSAPP_NUMBER = '2349014397694'

export async function POST(req: NextRequest) {
  try {
    const body: OrderData = await req.json()
    const { name, phone, address, state, quantity, answers } = body

    // Validate
    if (!name || !phone || !address || !state) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Build human-readable WhatsApp message
    const painArea  = PAIN_LABELS[answers.q1 ?? ''] ?? 'Not specified'
    const duration  = answers.q2 ?? 'Not specified'
    const priceMap  = { '1': '₦180,000', '2': '₦350,000', '3': '₦520,000' }
    const priceValueMap = { '1': 180000, '2': 350000, '3': 520000 }
    const price     = priceMap[quantity as keyof typeof priceMap]

    const message = [
      `🛒 *NEW ORDER — Terahertz Blower*`,
      ``,
      `*Customer Details*`,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      `📍 Address: ${address}, ${state}`,
      ``,
      `*Order Summary*`,
      `📦 Quantity: ${quantity} unit(s)`,
      `💰 Amount: ${price}`,
      ``,
      `*Health Profile*`,
      `🩺 Pain Area: ${painArea}`,
      `⏱ Duration: ${duration}`,
      `📊 Severity (1–10): ${answers.q4 ?? 'N/A'}`,
      ``,
      `*Previous Treatments Tried*`,
      `${(answers.q6 ?? []).join(', ') || 'None'}`,
      ``,
      `_Order placed via Survey Funnel_`,
    ].join('\n')

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    // Optional: log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 New Order:', body)
      console.log('🔗 WhatsApp URL:', whatsappUrl)
    }

    // ── Fire CAPI Purchase event ──
    const userAgent = req.headers.get('user-agent') ?? ''
    const referer   = req.headers.get('referer') ?? ''

    await sendCAPIEvent({
      eventName: 'Purchase',
      phone,
      name,
      city: state,
      clientUserAgent: userAgent,
      sourceUrl: referer,
      customData: {
        currency: 'NGN',
        value: priceValueMap[quantity as keyof typeof priceValueMap] ?? 180000,
        content_name: 'Terahertz Blower',
        content_type: 'product',
        num_items: Number(quantity),
      },
    })

    return NextResponse.json({ success: true, whatsappUrl })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}