'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  'Identifying your pain pattern…',
  'Mapping root cause to lifestyle factors…',
  'Cross-referencing treatment history…',
  'Preparing your personalised recommendation…',
]

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState<number>(-1)

  useEffect(() => {
    const timings = [400, 1200, 2100, 3000]

    timings.forEach((delay, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i])
        setActiveStep(i)
        if (i > 0) setDoneSteps((prev) => [...prev, i - 1])
      }, delay)
    })

    // Complete
    setTimeout(() => {
      setDoneSteps([0, 1, 2, 3])
      setActiveStep(-1)
      onComplete()
    }, 4200)
  }, [onComplete])

  return (
    <div className="text-center py-16 px-5 animate-[fadeUp_0.5s_ease_both]">
      {/* Spinner */}
      <div className="w-20 h-20 relative mx-auto mb-7">
        {/* Outer ring */}
        <div className="absolute inset-0 border-[3px] border-[#1B3A2D]/10 border-t-[#1B3A2D]
          rounded-full animate-spin [animation-duration:1.2s]" />
        {/* Inner ring */}
        <div className="absolute inset-[9px] border-2 border-[#C8923A]/15 border-b-[#C8923A]
          rounded-full animate-spin [animation-duration:1.8s] [animation-direction:reverse]" />
        {/* Centre dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-2.5 h-2.5 bg-[#1B3A2D] rounded-full" />
      </div>

      <h2 className="font-serif text-2xl text-[#1B3A2D] mb-2">
        Analysing Your Health Profile
      </h2>
      <p className="text-sm text-[#6B6B6B] mb-8">
        Please wait while we prepare your personalised assessment…
      </p>

      {/* Steps */}
      <div className="flex flex-col gap-3 max-w-xs mx-auto text-left">
        {STEPS.map((step, i) => {
          const isVisible = visibleSteps.includes(i)
          const isDone = doneSteps.includes(i)
          const isActive = activeStep === i

          return (
            <div
              key={step}
              className={`flex items-center gap-3 text-sm transition-all duration-400
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}
                ${isDone ? 'text-[#2D5E47] font-medium' : 'text-[#6B6B6B]'}
              `}
            >
              <div className={`
                w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]
                transition-all duration-300
                ${isDone ? 'bg-[#2D5E47] text-white' : ''}
                ${isActive ? 'bg-[#C8923A] animate-pulse' : ''}
                ${!isDone && !isActive ? 'bg-[#E2DDD6]' : ''}
              `}>
                {isDone ? '✓' : i + 1}
              </div>
              <span>{step}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}