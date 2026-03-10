'use client'

import { useState, useCallback } from 'react'
import type { SurveyScreen, SurveyAnswers } from './types'
import { QUESTIONS } from './data'

import SurveyHeader from './surveyHeader'   // 👈 fixed casing
import IntroScreen from './IntroScreen'
import QuestionScreen from './QuestionScreen'
import LoadingScreen from './LoadingScreen'
import ResultsScreen from './ResultsScreen'
import SuccessScreen from './SuccessScreen'

const Q_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function SurveyFunnel() {        // 👈 fixed capital S
  const [screen, setScreen] = useState<SurveyScreen>('intro')
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [multiAnswers, setMultiAnswers] = useState<Record<string, string[]>>({})

  const currentQ: number | null =
    screen.startsWith('q') ? parseInt(screen.slice(1)) : null

  function getConfig(qNum: number) {
    if (qNum === 4) return null
    return QUESTIONS.find((q) => q.number === qNum) ?? null
  }

  function goToQ(n: number) {
    setScreen(`q${n}` as SurveyScreen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNext(currentNum: number) {
    const nextNum = Q_ORDER[Q_ORDER.indexOf(currentNum) + 1]
    if (nextNum) {
      goToQ(nextNum)
    } else {
      setScreen('loading')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBack(currentNum: number) {
    const prevNum = Q_ORDER[Q_ORDER.indexOf(currentNum) - 1]
    if (prevNum) goToQ(prevNum)
    else setScreen('intro')
  }

  function handleSingleSelect(qId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qId]: value as never }))
  }

  function handleMultiToggle(qId: string, value: string) {
    setMultiAnswers((prev) => {
      const current = prev[qId] ?? []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      setAnswers((a) => ({ ...a, [qId]: updated as never }))
      return { ...prev, [qId]: updated }
    })
  }

  function handleScaleSelect(value: number) {
    setAnswers((prev) => ({ ...prev, q4: value }))
  }

  const handleLoadingComplete = useCallback(() => {
    setScreen('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const fullAnswers: SurveyAnswers = {
    ...answers,
    q5: (multiAnswers['q5'] ?? []) as SurveyAnswers['q5'],
    q6: (multiAnswers['q6'] ?? []) as SurveyAnswers['q6'],
  }

  const progressQ = currentQ ?? (screen === 'results' || screen === 'success' ? 13 : null)

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <SurveyHeader currentQ={progressQ} />

      <main className="max-w-2xl mx-auto px-5 py-8 pb-16">

        {screen === 'intro' && (
          <IntroScreen onStart={() => { setScreen('q1'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        )}

        {Q_ORDER.filter((n) => n !== 4).map((qNum) => {
          const config = getConfig(qNum)
          if (!config || screen !== `q${qNum}`) return null
          return (
            <QuestionScreen
              key={qNum}
              config={config}
              singleValue={answers[config.id as keyof SurveyAnswers] as string | undefined}
              multiValue={multiAnswers[config.id] ?? []}
              onSingleSelect={handleSingleSelect}
              onMultiToggle={handleMultiToggle}
              onScaleSelect={handleScaleSelect}
              onNext={() => handleNext(qNum)}
              onBack={() => handleBack(qNum)}
              isFirst={qNum === 1}
              nextLabel={qNum === 12 ? 'See My Results →' : 'Continue →'}
            />
          )
        })}

        {screen === 'q4' && (
          <QuestionScreen
            config={{
              id: 'q4',
              stage: "Stage 2 — How It's Affecting You",
              number: 4,
              text: 'On a scale of 1–10, how would you rate your daily discomfort right now?',
              sub: '1 = barely noticeable · 10 = severe and constant',
              options: [],
            }}
            scaleValue={answers.q4}
            onSingleSelect={handleSingleSelect}
            onMultiToggle={handleMultiToggle}
            onScaleSelect={handleScaleSelect}
            onNext={() => handleNext(4)}
            onBack={() => handleBack(4)}
          />
        )}

        {screen === 'loading' && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}

        {screen === 'results' && (
          <ResultsScreen
            answers={fullAnswers}
            onOrderSuccess={() => {
              setScreen('success')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

        {screen === 'success' && <SuccessScreen />}
      </main>

      {screen !== 'success' && (
        <footer className="bg-[#1B3A2D]/[0.05] border-t border-[#E2DDD6] py-4 px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-7">
            {['🔒 Secure & Private', '🚚 Free Delivery', '💳 Pay on Delivery', '⭐ 4.9/5 Rating'].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-[#6B6B6B] font-medium">
                {item}
              </div>
            ))}
          </div>
        </footer>
      )}
    </div>
  )
}