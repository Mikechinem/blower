export type PainLocation = 'back' | 'knees' | 'neck' | 'legs' | 'general'
export type Duration = 'short' | 'medium' | 'long' | 'chronic'
export type AgeGroup = 'young' | 'mid1' | 'mid2' | 'senior1' | 'senior2'
export type SleepQuality = 'good' | 'tired' | 'disturbed' | 'struggle'
export type DreamOutcome = 'work' | 'sleep' | 'family' | 'travel'
export type TreatmentHistory = 'drugs' | 'hospital' | 'physio' | 'herbal' | 'nothing'
export type LifeImpact = 'sleep' | 'work' | 'family' | 'mood' | 'mobility'

export type SurveyScreen =
  | 'intro'
  | 'q1' | 'q2' | 'q3' | 'q4' | 'q5'
  | 'q6' | 'q7' | 'q8' | 'q9' | 'q10'
  | 'q11' | 'q12'
  | 'loading'
  | 'results'
  | 'success'

export interface SurveyAnswers {
  q1?: PainLocation
  q2?: Duration
  q3?: string
  q4?: number
  q5?: LifeImpact[]
  q6?: TreatmentHistory[]
  q7?: string
  q8?: string
  q9?: SleepQuality
  q10?: AgeGroup
  q11?: DreamOutcome
  q12?: string
}

export interface OrderData {
  name: string
  phone: string
  address: string
  state: string
  quantity: '1' | '2' | '3'
  answers: SurveyAnswers
}

export interface OptionItem {
  value: string
  label: string
  description?: string
  icon?: string
}

export interface QuestionConfig {
  id: keyof SurveyAnswers
  stage: string
  number: number
  text: string
  sub?: string
  options: OptionItem[]
  multi?: boolean
  twoCol?: boolean
}