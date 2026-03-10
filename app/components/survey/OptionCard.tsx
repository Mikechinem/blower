'use client'

import type { OptionItem } from './types'

interface OptionCardProps {
  option: OptionItem
  selected: boolean
  multi?: boolean
  onSelect: (value: string) => void
}

export default function OptionCard({ option, selected, multi = false, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`
        w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border-[1.5px]
        transition-all duration-200 group relative overflow-hidden
        ${selected
          ? 'border-[#1B3A2D] bg-[#1B3A2D]/[0.06] shadow-[0_0_0_3px_rgba(27,58,45,0.08)]'
          : 'border-[#E2DDD6] bg-[#FFFDF9] hover:border-[#7BAE8A] hover:shadow-md hover:-translate-y-px'
        }
      `}
    >
      {/* Hover overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-[#1B3A2D]/[0.03] to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
      `} />

      {/* Check indicator */}
      <div className={`
        flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-all duration-200
        ${multi ? 'rounded-md' : 'rounded-full'}
        ${selected
          ? 'bg-[#1B3A2D] border-[#1B3A2D]'
          : 'border-[#E2DDD6]'
        }
      `}>
        {selected && (
          <span className="text-white text-[10px] font-bold leading-none">
            {multi ? '✓' : ''}
          </span>
        )}
        {selected && !multi && (
          <span className="w-2 h-2 rounded-full bg-white block" />
        )}
      </div>

      {/* Icon */}
      {option.icon && (
        <span className="text-xl flex-shrink-0">{option.icon}</span>
      )}

      {/* Label + description */}
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-[#1A1A1A] leading-snug">
          {option.label}
        </span>
        {option.description && (
          <span className="block text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">
            {option.description}
          </span>
        )}
      </div>
    </button>
  )
}