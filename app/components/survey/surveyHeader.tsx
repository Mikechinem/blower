'use client'

const STAGE_LABELS = ['Your Body', 'Impact', 'History', 'Lifestyle', 'Results']

const Q_TO_STAGE: Record<number, number> = {
  1: 0, 2: 0, 3: 1, 4: 1, 5: 1,
  6: 2, 7: 2, 8: 3, 9: 3, 10: 3,
  11: 4, 12: 4,
}

interface SurveyHeaderProps {
  currentQ: number | null // null on intro/loading/results
}

export default function SurveyHeader({ currentQ }: SurveyHeaderProps) {
  const progressPct = currentQ ? ((currentQ - 1) / 12) * 100 : currentQ === null ? 0 : 100
  const activeStage = currentQ ? Q_TO_STAGE[currentQ] ?? 0 : -1

  return (
    <div className="bg-[#1B3A2D] sticky top-0 z-50">
      {/* Brand bar */}
      <div className="flex items-center justify-center gap-2.5 px-6 py-3.5">
        <span className="font-serif text-white text-lg font-semibold tracking-wide">
          Emesol Wellness Home
        </span>
        <span className="bg-[#C8923A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase">
          Free Assessment
        </span>
      </div>

      {/* Progress section */}
      {currentQ !== null && (
        <div className="px-6 pb-3.5">
          <div className="max-w-xl mx-auto">
            {/* Stage labels */}
            <div className="flex justify-between mb-1.5">
              {STAGE_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={`text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300
                    ${i === activeStage ? 'text-[#E8B96A]' : 'text-white/40'}
                  `}
                >
                  {label}
                </span>
              ))}
            </div>
            {/* Progress bar */}
            <div className="h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C8923A] to-[#E8B96A] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}