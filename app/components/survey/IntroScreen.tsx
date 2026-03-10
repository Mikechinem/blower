'use client'

import Image from 'next/image'

interface IntroScreenProps {
  onStart: () => void
}

const FEATURES = [
  { icon: '🎯', text: 'Identifies your specific pain pattern and root cause' },
  { icon: '📋', text: 'Gives you a personalised wellness recommendation' },
  { icon: '💊', text: `Explains why painkillers haven't worked for you` },
]

const SOCIAL_PROOF = [
  { avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=face', name: 'Chioma A.' },
  { avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', name: 'Musa T.' },
  { avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face', name: 'Adebayo F.' },
]

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="animate-[fadeUp_0.6s_ease_both]">

      {/* ── Hero image ── */}
      <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop"
          alt="Happy pain-free woman enjoying life"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/80 via-[#1B3A2D]/20 to-transparent" />

        {/* Badge on image */}
        <div className="absolute top-4 left-4">
          <div className="inline-block bg-white/95 text-[#2D5E47] text-[11px] font-bold
            tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border border-[#4A8C6A]/20 shadow-md">
            🩺 Free Health Assessment
          </div>
        </div>

        {/* Caption at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/90 text-sm font-medium">
            Join <span className="text-[#E8B96A] font-bold">3,400+</span> Nigerians who found lasting relief
          </p>
        </div>
      </div>

      {/* ── Headline ── */}
      <div className="text-center mb-6">
        <h1 className="font-serif text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.25] text-[#1B3A2D] mb-4">
          Find Out{' '}
          <em className="italic text-[#C8923A] font-serif">Exactly</em>{' '}
          What Your Body Needs to Heal
        </h1>
        <p className="text-[#6B6B6B] text-base leading-[1.75] max-w-[500px] mx-auto">
          Answer 12 short questions and receive a personalised health report — the same
          diagnostic approach used by wellness practitioners — completely free.
        </p>
      </div>

      {/* ── Features + side image ── */}
      <div className="flex gap-4 mb-7 items-stretch">

        {/* Feature cards */}
        <div className="flex-1 flex flex-col gap-2.5">
          {FEATURES.map((f) => (
            <div key={f.text} className="flex items-start gap-2.5 bg-white/60 rounded-xl p-3
              border border-[#E2DDD6]">
              <div className="w-7 h-7 bg-[#1B3A2D] rounded-full flex items-center justify-center
                text-xs flex-shrink-0 mt-0.5">
                {f.icon}
              </div>
              <span className="text-sm text-[#3D3D3D] leading-snug">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Side lifestyle image */}
        <div className="relative w-28 sm:w-36 rounded-2xl overflow-hidden flex-shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop"
            alt="Active healthy person"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/30 to-transparent" />
        </div>
      </div>

      {/* ── Social proof ── */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex -space-x-2">
          {SOCIAL_PROOF.map((p) => (
            <div key={p.name} className="relative w-8 h-8 rounded-full overflow-hidden
              border-2 border-white shadow-sm">
              <Image src={p.avatar} alt={p.name} fill className="object-cover" />
            </div>
          ))}
        </div>
        <p className="text-xs text-[#6B6B6B]">
          <span className="font-bold text-[#1B3A2D]">3,400+</span> assessments completed this month
        </p>
      </div>

      {/* ── CTA ── */}
      <div className="text-center">
        <button
          onClick={onStart}
          className="bg-[#C8923A] text-white font-bold text-base px-10 py-4 rounded-2xl
            tracking-wide transition-all duration-250 cursor-pointer w-full sm:w-auto
            shadow-[0_6px_28px_rgba(200,146,58,0.35)]
            hover:bg-[#b57e2e] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(200,146,58,0.4)]"
        >
          Begin My Free Assessment →
        </button>
        <p className="text-xs text-[#6B6B6B] mt-3">
          ⏱ Takes less than 3 minutes · No registration required
        </p>
      </div>

    </div>
  )
}