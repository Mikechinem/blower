import { NextRequest, NextResponse } from 'next/server'
import type { OrderData } from '@/components/survey/types'
import { PAIN_LABELS } from '@/components/survey/data'

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
    const price     = priceMap[quantity]

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

    return NextResponse.json({ success: true, whatsappUrl })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}