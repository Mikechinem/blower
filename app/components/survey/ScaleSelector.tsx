'use client'

interface ScaleSelectorProps {
  value: number | undefined
  onChange: (val: number) => void
}

export default function ScaleSelector({ value, onChange }: ScaleSelectorProps) {
  return (
    <div className="bg-[#FFFDF9] border-[1.5px] border-[#E2DDD6] rounded-2xl p-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`
              w-11 h-11 rounded-xl border-2 text-base font-semibold
              transition-all duration-200
              ${value === n
                ? 'bg-[#1B3A2D] border-[#1B3A2D] text-white shadow-md'
                : 'bg-[#FFFDF9] border-[#E2DDD6] text-[#3D3D3D] hover:border-[#7BAE8A] hover:bg-[#7BAE8A]/10'
              }
            `}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-3 px-1">
        <span className="text-xs text-[#6B6B6B]">Mild</span>
        <span className="text-xs text-[#6B6B6B]">Moderate</span>
        <span className="text-xs text-[#6B6B6B]">Severe</span>
      </div>
    </div>
  )
}