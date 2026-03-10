// app/survey/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Health Assessment — Daps Wellness Home',
  description: 'Answer 12 questions and receive a personalised health report.',
}

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}