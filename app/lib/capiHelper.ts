import crypto from 'crypto'

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!
const ACCESS_TOKEN = process.env.FB_CAPI_ACCESS_TOKEN!
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`

function hash(value: string) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

interface CAPIEventParams {
  eventName: string
  eventTime?: number
  phone?: string
  name?: string
  city?: string
  customData?: Record<string, unknown>
  clientUserAgent?: string
  sourceUrl?: string
}

export async function sendCAPIEvent({
  eventName,
  eventTime,
  phone,
  name,
  city,
  customData,
  clientUserAgent,
  sourceUrl,
}: CAPIEventParams) {
  const userData: Record<string, string> = {}

  if (phone) userData.ph = hash(phone.replace(/\D/g, ''))
  if (name)  userData.fn = hash(name.split(' ')[0])
  if (city)  userData.ct = hash(city)

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime ?? Math.floor(Date.now() / 1000),
        event_source_url: sourceUrl ?? 'https://diancolimswellness.com.ng/survey',
        action_source: 'website',
        user_data: {
          ...userData,
          client_user_agent: clientUserAgent ?? '',
        },
        custom_data: customData ?? {},
      },
    ],
  }

  try {
    const res = await fetch(CAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    if (!res.ok) console.error('CAPI error:', json)
    return json
  } catch (err) {
    console.error('CAPI fetch failed:', err)
  }
}