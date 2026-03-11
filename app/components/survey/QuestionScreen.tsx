'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { QuestionConfig } from './types'
import OptionCard from './OptionCard'
import ScaleSelector from './ScaleSelector'

interface QuestionScreenProps {
  config: QuestionConfig
  singleValue?: string
  multiValue?: string[]
  scaleValue?: number
  onSingleSelect: (qId: string, value: string) => void
  onMultiToggle: (qId: string, value: string) => void
  onScaleSelect: (value: number) => void
  onNext: () => void
  onBack: () => void
  isFirst?: boolean
  nextLabel?: string
}

// ── Real ImageKit images ──
const Q_IMAGES: Record<string, { src: string; alt: string }> = {
  q1:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm1.png?updatedAt=1773228883756', alt: 'Person experiencing body pain' },
  q2:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm2.png?updatedAt=1773228883510', alt: 'Person reflecting on health journey' },
  q3:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm3.png?updatedAt=1773228883932', alt: 'Person waking up in the morning' },
  q4:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm4.png?updatedAt=1773228883289', alt: 'Person assessing pain level' },
  q5:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm5.png?updatedAt=1773228884959', alt: 'Person affected by pain in daily life' },
  q6:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm6.png?updatedAt=1773228884120', alt: 'Various treatment options' },
  q7:  { src: 'https://ik.imagekit.io/j1e78ujalr/Terahartz%20blower/sm7.png?updatedAt=1773228884215', alt: 'Frustrated with treatment results' },
  q8:  { src: 'https://ik.imagekit.io/j1e78ujalr/sm8.png?updatedAt=1773230033803',                    alt: 'Person at work or daily routine' },
  q9:  { src: 'https://ik.imagekit.io/j1e78ujalr/sm9.png?updatedAt=1773230032907',                    alt: 'Person struggling with sleep' },
  q10: { src: 'https://ik.imagekit.io/j1e78ujalr/sm10.png?updatedAt=1773230034031',                   alt: 'People of different age groups' },
  q11: { src: 'https://ik.imagekit.io/j1e78ujalr/sm11.png?updatedAt=1773230034192',                   alt: 'Happy family enjoying pain free life' },
  q12: { src: 'https://ik.imagekit.io/j1e78ujalr/sm12.2.png',                                         alt: 'Person ready to take action' },
}

export default function QuestionScreen({
  config,
  singleValue,
  multiValue = [],
  scaleValue,
  onSingleSelect,
  onMultiToggle,
  onScaleSelect,
  onNext,
  onBack,
  isFirst = false,
  nextLabel = 'Continue →',
}: QuestionScreenProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [config.id])

  const isScale = config.id === 'q4'
  const canProceed = isScale
    ? scaleValue !== undefined
    : config.multi
      ? true
      : !!singleValue

  const qImage = Q_IMAGES[config.id]

  return (
    <div className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

      {/* ── Contextual image banner ── */}
      {qImage && (
        <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden mb-6">
          <Image
            src={qImage.src}
            alt={qImage.alt}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A2D]/75 via-[#1B3A2D]/30 to-transparent" />

          {/* Stage label + question number on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#E8B96A] mb-1">
              {config.stage}
            </p>
            <p className="text-xs text-white/70">
              Question {config.number} of 12
            </p>
          </div>
        </div>
      )}

      {/* ── Question text ── */}
      <h2 className="font-serif text-[clamp(1.3rem,4vw,1.75rem)] leading-[1.4] text-[#1B3A2D] mb-2">
        {config.text}
      </h2>
      {config.sub && (
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-7">{config.sub}</p>
      )}

      {/* ── Scale (Q4) ── */}
      {isScale && (
        <ScaleSelector value={scaleValue} onChange={onScaleSelect} />
      )}

      {/* ── Options grid ── */}
      {!isScale && (
        <div className={`flex flex-col gap-2.5 ${config.twoCol ? 'sm:grid sm:grid-cols-2' : ''}`}>
          {config.options.map((opt) => {
            const isSelected = config.multi
              ? multiValue.includes(opt.value)
              : singleValue === opt.value

            return (
              <OptionCard
                key={opt.value}
                option={opt}
                selected={isSelected}
                multi={config.multi}
                onSelect={(val) => {
                  if (config.multi) {
                    onMultiToggle(config.id as string, val)
                  } else {
                    onSingleSelect(config.id as string, val)
                  }
                }}
              />
            )
          })}
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex gap-3 mt-7 items-center">
        {!isFirst && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-5 py-3 border-[1.5px] border-[#E2DDD6]
              rounded-xl text-sm text-[#6B6B6B] font-medium transition-all duration-200
              hover:border-[#7BAE8A] hover:text-[#1B3A2D] cursor-pointer"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3.5 px-7 rounded-xl
            text-base font-semibold tracking-wide transition-all duration-250
            ${canProceed
              ? 'bg-[#1B3A2D] text-white hover:bg-[#2D5E47] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(27,58,45,0.25)] cursor-pointer'
              : 'bg-[#1B3A2D]/40 text-white/60 cursor-not-allowed'
            }
          `}
        >
          {nextLabel}
        </button>
      </div>

    </div>
  )
}