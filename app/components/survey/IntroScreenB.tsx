'use client'

import Image from 'next/image'
import { fbEvent } from './facebookPixel'
interface IntroScreenProps {
  onStart: () => void
}

const HERO_IMAGE = 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/lower_back_pain_gone.png'

const SOCIAL_PROOF = [
  { avatar: 'https://ik.imagekit.io/j1e78ujalr/social-proof/sp3.png', name: 'Chioma A.' },
  { avatar: 'https://ik.imagekit.io/j1e78ujalr/social-proof/sp2.png', name: 'Musa T.' },
  { avatar: 'https://ik.imagekit.io/j1e78ujalr/social-proof/sp1.png', name: 'Adebayo F.' },
]

const WHAT_YOU_GET = [
  { icon: '🩺', title: 'Your Pain Diagnosis', desc: 'Know exactly what is causing your pain and why it keeps returning' },
  { icon: '💊', title: 'Why Drugs Are Failing You', desc: 'Understand the real reason painkillers have not worked long-term' },
  { icon: '🎯', title: 'Your Personal Solution', desc: 'Get a tailored recommendation matched to your specific condition' },
]

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="animate-[fadeUp_0.6s_ease_both]">

      {/* ── ① PATTERN INTERRUPT — Bold stat bar ── */}
      <div className="bg-[#1B3A2D] rounded-2xl px-4 py-3 mb-5 flex items-center gap-3">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <p className="text-white text-sm leading-snug">
          <span className="text-[#E8B96A] font-bold">9 out of 10 Nigerians</span> treating
          chronic pain are doing it wrong — and making it worse without knowing.
        </p>
      </div>

      {/* ── ② HERO IMAGE — Problem-first visual ── */}
      <div className="relative w-full h-60 sm:h-80 rounded-2xl overflow-hidden mb-5">
        <Image
          src={HERO_IMAGE}
          alt="Nigerian woman suffering from back pain"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Lighter gradient — let the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/70 via-transparent to-transparent" />

        {/* Free badge — top left */}
        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center gap-1.5 bg-white text-[#2D5E47] text-[11px]
            font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full shadow-lg">
            🩺 Free Health Assessment
          </div>
        </div>

        {/* Social proof row — bottom of image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5">
          <div className="flex -space-x-2 flex-shrink-0">
            {SOCIAL_PROOF.map((p) => (
              <div key={p.name} className="relative w-7 h-7 rounded-full overflow-hidden
                border-2 border-white shadow-sm">
                <Image src={p.avatar} alt={p.name} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <p className="text-white text-xs font-medium">
            <span className="text-[#E8B96A] font-bold">3,400+</span> Nigerians finally pain-free this month
          </p>
        </div>
      </div>

      {/* ── ③ PAIN-FIRST HEADLINE ── */}
      <div className="mb-5">
        <h1 className="font-serif text-[clamp(1.7rem,5vw,2.4rem)] leading-[1.25] text-[#1B3A2D] mb-3">
          Still in Pain After Trying{' '}
          <em className="italic text-[#C8923A]">Everything?</em>{' '}
          Here is Why — and What Actually Works
        </h1>

        {/* ── ④ EMPATHY SUBTEXT ── */}
        <p className="text-[#3D3D3D] text-base leading-[1.8]">
          If painkillers, hospital visits and physiotherapy have not given you lasting relief —
          <strong className="text-[#1B3A2D]"> it is not your fault.</strong> The root cause
          is being missed. This free 3-minute assessment will show you exactly what it is
          and what your body actually needs to heal.
        </p>
      </div>

      {/* ── ⑤ DIVIDER ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-[#E2DDD6]" />
        <span className="text-xs text-[#6B6B6B] font-medium whitespace-nowrap">What you will receive</span>
        <div className="flex-1 h-px bg-[#E2DDD6]" />
      </div>

      {/* ── ⑥ WHAT YOU GET — benefit cards ── */}
      <div className="flex flex-col gap-3 mb-6">
        {WHAT_YOU_GET.map((item) => (
          <div key={item.title}
            className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E2DDD6]
              shadow-[0_2px_12px_rgba(27,58,45,0.06)]">
            <div className="w-10 h-10 bg-[#1B3A2D] rounded-xl flex items-center justify-center
              text-lg flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-[#1B3A2D] mb-0.5">{item.title}</p>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.desc}</p>
            </div>
            {/* Green tick */}
            <div className="ml-auto flex-shrink-0 w-5 h-5 bg-[#4A8C6A]/15 rounded-full
              flex items-center justify-center">
              <span className="text-[#2D5E47] text-[10px] font-bold">✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── ⑦ TRUST ROW ── */}
      <div className="flex justify-center gap-5 mb-6 flex-wrap">
        {[
          { icon: '🔒', text: 'Private & Secure' },
          { icon: '⚡', text: 'Results in 3 mins' },
          { icon: '🆓', text: '100% Free' },
        ].map((t) => (
          <div key={t.text} className="flex items-center gap-1.5">
            <span className="text-base">{t.icon}</span>
            <span className="text-xs text-[#6B6B6B] font-medium">{t.text}</span>
          </div>
        ))}
      </div>

      {/* ── ⑧ CTA — curiosity-driven ── */}
      <div className="text-center">
       <button
    onClick={() => {
    fbEvent('Lead', { content_name: 'variant_b_optimised' })
    fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName: 'Lead', customData: { content_name: 'variant_b_optimised' } }),
  })
  onStart()
}}
  className="bg-[#C8923A] text-white font-bold text-base px-8 py-4 rounded-2xl
    tracking-wide transition-all duration-250 cursor-pointer w-full
    shadow-[0_6px_28px_rgba(200,146,58,0.35)]
    hover:bg-[#b57e2e] hover:-translate-y-0.5
    hover:shadow-[0_10px_36px_rgba(200,146,58,0.45)]"
>
  Find Out Why You Are Still in Pain →
</button>

        {/* Micro reassurance */}
        <p className="text-xs text-[#6B6B6B] mt-3 leading-relaxed">
          ⏱ Takes less than 3 minutes · No registration · No payment required
        </p>
      </div>

    </div>
  )
}