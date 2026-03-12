'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { fbEvent } from './facebookPixel'
import type { SurveyAnswers } from './types'
import { buildDiagnosis } from './diagnosisBuilder'
import OrderForm from './OrderForm'

interface ResultsScreenProps {
  answers: SurveyAnswers
  onOrderSuccess: () => void
}

// ── Product gallery images ──
const PRODUCT_IMAGES = [
  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/blow4.jpeg?updatedAt=1773228874916', alt: 'Terahertz Blower device' },
  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/blow6.jpeg?updatedAt=1773228875784', alt: 'Terahertz Blower in use' },
  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/blow2.jpeg?updatedAt=1773228875420', alt: 'Terahertz Blower features' },
]

// ── Testimonials ──
const TESTIMONIALS = [
  {
    name: 'Mrs. Adebayo',
    location: 'Lekki, Lagos',
    quote: `My husband had serious back pain for over 2 years. He tried injections, physiotherapy, everything. After just 3 weeks of using the Terahertz Blower, he sleeps through the night and goes to work without complaining. The money we are saving on hospital bills alone is worth it.`,
    stars: 5,
  },
  {
    name: 'Chioma Okonkwo',
    location: 'Abuja',
    quote: `I suffered knee pain for 5 years. Every morning I struggled to walk. I was spending ₦15,000 every month on pain relievers. After one month of using this device the pain has reduced so much I can walk to the market and back without suffering. I wish I found this earlier.`,
    stars: 5,
  },
  {
    name: 'Alhaji Musa T.',
    location: 'Kaduna',
    quote: `After just 3 weeks the joint pain in my knees reduced so much. I can now move around freely without any problem. My whole family has noticed the difference. This is a real solution, not just a temporary fix like the drugs I was taking before.`,
    stars: 5,
  },
]

export default function ResultsScreen({ answers, onOrderSuccess }: ResultsScreenProps) {
  const dx = buildDiagnosis(answers)

  useEffect(() => {
  fbEvent('ViewContent', { content_name: 'Health Assessment Results' })
  fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName: 'ViewContent', customData: { content_name: 'Health Assessment Results' } }) })
}, [])

  return (
    <div className="animate-[fadeUp_0.6s_ease_both]">

      {/* ── Results header card ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1B3A2D] to-[#2D5E47]
        rounded-2xl p-6 mb-6 text-center text-white">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/[0.04] rounded-full pointer-events-none" />
        <div className="absolute -bottom-8 -left-5 w-30 h-30 bg-[#C8923A]/12 rounded-full pointer-events-none" />
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#E8B96A] mb-3 relative z-10">
          ✅ Your Assessment Is Ready
        </p>
        <h2 className="font-serif text-[clamp(1.4rem,4vw,2rem)] leading-snug mb-3 relative z-10">
          Your Personal Health Report
        </h2>
        <span className="inline-block bg-[#C8923A]/20 border border-[#C8923A]/40
          text-[#E8B96A] text-xs font-medium px-4 py-1.5 rounded-full relative z-10">
          {dx.profileTag}
        </span>
      </div>

      {/* ── Diagnosis card ── */}
      <DiagnosisCard label="🩺 Clinical Assessment" title={dx.diagnosisTitle}>
        <p className="text-sm text-[#3D3D3D] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: dx.diagnosisBody }} />
        <div className="mt-3.5 bg-[#C8923A]/10 border border-[#C8923A]/25 rounded-xl p-3.5">
          <p className="text-sm text-[#3D3D3D] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: dx.diagnosisHighlight }} />
        </div>
      </DiagnosisCard>

      {/* ── Why failed card ── */}
      <DiagnosisCard label="💊 Why Previous Treatments Haven't Worked" title="The Real Reason You're Still in Pain">
        <p className="text-sm text-[#3D3D3D] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: dx.whyBody }} />
      </DiagnosisCard>

      {/* ── Benefits ── */}
      <div className="mb-6">
        <h3 className="font-serif text-xl text-[#1B3A2D] mb-4">
          🎯 What Your Body Specifically Needs
        </h3>
        <div className="flex flex-col divide-y divide-[#E2DDD6]">
          {dx.benefits.map((b) => (
            <div key={b.title} className="flex gap-3 items-start py-3">
              <div className="w-9 h-9 bg-[#1B3A2D]/8 rounded-xl flex items-center justify-center
                text-lg flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <strong className="block text-sm font-semibold text-[#1A1A1A] mb-0.5">{b.title}</strong>
                <span className="text-xs text-[#6B6B6B] leading-relaxed">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-[#E2DDD6] my-6" />

      {/* ── Product gallery ── */}
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#C8923A] mb-2">
          The Device
        </p>
        <h3 className="font-serif text-xl text-[#1B3A2D] mb-4">
          Terahertz Therapeutic Blower
        </h3>

        {/* Horizontal scrollable gallery */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {PRODUCT_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-56 h-48 rounded-2xl overflow-hidden snap-start
                border border-[#E2DDD6] shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-[#6B6B6B] mt-2 text-center">← Scroll to see more →</p>
      </div>

      <div className="h-px bg-[#E2DDD6] my-6" />

      {/* ── Testimonials ── */}
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#C8923A] mb-2">
          Real Results
        </p>
        <h3 className="font-serif text-xl text-[#1B3A2D] mb-4">
          What People Are Saying
        </h3>

        <div className="flex flex-col gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name}
              className="bg-[#FFFDF9] border-[1.5px] border-[#E2DDD6] rounded-2xl p-5 relative">
              {/* Quote mark */}
              <div className="absolute top-4 right-4 text-4xl text-[#1B3A2D]/10 font-serif leading-none select-none">
                "
              </div>
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-[#C8923A] text-sm">★</span>
                ))}
              </div>
              {/* Quote */}
              <p className="text-sm text-[#3D3D3D] leading-[1.8] mb-4 italic">
                "{t.quote}"
              </p>
              {/* Name + location */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#1B3A2D] rounded-full flex items-center justify-center
                  text-white text-xs font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{t.name}</p>
                  <p className="text-xs text-[#6B6B6B]">📍 {t.location}</p>
                </div>
                <div className="ml-auto bg-[#4A8C6A]/10 text-[#2D5E47] text-[10px] font-bold
                  px-2.5 py-1 rounded-full border border-[#4A8C6A]/20">
                  ✓ Verified Buyer
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Money Back Guarantee ── */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#C8923A]/30
        bg-gradient-to-br from-[#FFF8EE] to-[#FAF7F2] p-6 mb-6">

        {/* Decorative circle */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#C8923A]/08 rounded-full pointer-events-none" />

        <div className="flex gap-4 items-start">
          {/* Guarantee badge */}
          <div className="flex-shrink-0 w-16 h-16 bg-[#C8923A] rounded-full flex flex-col
            items-center justify-center text-white shadow-[0_4px_20px_rgba(200,146,58,0.35)]">
            <span className="text-xl">🛡️</span>
          </div>

          <div className="flex-1">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#C8923A] mb-1">
              100% Satisfaction
            </p>
            <h4 className="font-serif text-lg text-[#1B3A2D] leading-snug mb-2">
              Our Iron-Clad Money Back Guarantee
            </h4>
            <p className="text-sm text-[#3D3D3D] leading-[1.75]">
              We are so confident in the Terahertz Blower that we back every order with a
              <strong> full satisfaction guarantee</strong>. If you receive the device and
              are not completely satisfied, contact us and we will make it right.
              <strong> You have absolutely nothing to lose.</strong>
            </p>
          </div>
        </div>

        {/* Guarantee pillars */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { icon: '💳', title: 'Pay on Delivery', desc: 'Only pay when it arrives at your door' },
            { icon: '🚚', title: 'Free Delivery', desc: 'Nationwide delivery at no extra cost' },
            { icon: '📞', title: '24/7 Support', desc: 'We are always here to help you' },
          ].map((item) => (
            <div key={item.title}
              className="bg-white/80 rounded-xl p-3 text-center border border-[#E2DDD6]">
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs font-bold text-[#1B3A2D] mb-0.5">{item.title}</p>
              <p className="text-[10px] text-[#6B6B6B] leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Order form ── */}
      <OrderForm
        orderSub={dx.orderSub}
        answers={answers}
        onSuccess={onOrderSuccess}
      />
    </div>
  )
}

// ── Local sub-component ──
function DiagnosisCard({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative bg-[#FFFDF9] border-[1.5px] border-[#E2DDD6] rounded-2xl p-6 mb-4">
      <div className="absolute left-0 top-5 bottom-5 w-[3px] bg-gradient-to-b
        from-[#1B3A2D] to-[#7BAE8A] rounded-r-full" />
      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#C8923A] mb-2.5">
        {label}
      </p>
      <h3 className="font-serif text-lg text-[#1B3A2D] leading-snug mb-3">{title}</h3>
      {children}
    </div>
  )
}