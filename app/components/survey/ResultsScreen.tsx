'use client'

import type { SurveyAnswers } from './types'
import { buildDiagnosis } from './diagnosisBuilder'
import OrderForm from './OrderForm'

interface ResultsScreenProps {
  answers: SurveyAnswers
  onOrderSuccess: () => void
}

export default function ResultsScreen({ answers, onOrderSuccess }: ResultsScreenProps) {
  const dx = buildDiagnosis(answers)

  return (
    <div className="animate-[fadeUp_0.6s_ease_both]">

      {/* ── Results header card ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1B3A2D] to-[#2D5E47]
        rounded-2xl p-6 mb-6 text-center text-white">
        {/* Decorative circles */}
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
        <p
          className="text-sm text-[#3D3D3D] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: dx.diagnosisBody }}
        />
        <div className="mt-3.5 bg-[#C8923A]/10 border border-[#C8923A]/25 rounded-xl p-3.5">
          <p
            className="text-sm text-[#3D3D3D] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: dx.diagnosisHighlight }}
          />
        </div>
      </DiagnosisCard>

      {/* ── Why failed card ── */}
      <DiagnosisCard label="💊 Why Previous Treatments Haven't Worked" title="The Real Reason You're Still in Pain">
        <p
          className="text-sm text-[#3D3D3D] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: dx.whyBody }}
        />
      </DiagnosisCard>

      {/* ── Benefits ── */}
      <div className="mb-5">
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
                <strong className="block text-sm font-semibold text-[#1A1A1A] mb-0.5">
                  {b.title}
                </strong>
                <span className="text-xs text-[#6B6B6B] leading-relaxed">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-[#E2DDD6] my-5" />

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
      {/* Left accent bar */}
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