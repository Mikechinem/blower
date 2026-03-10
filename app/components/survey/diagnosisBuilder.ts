import type { SurveyAnswers } from './types'
import { PAIN_LABELS, DURATION_TEXT, DREAM_TEXT } from './data'

export interface DiagnosisContent {
  profileTag: string
  diagnosisTitle: string
  diagnosisBody: string
  diagnosisHighlight: string
  whyBody: string
  benefits: Array<{ icon: string; title: string; desc: string }>
  orderSub: string
}

const CONDITION_NAMES: Record<string, string> = {
  back:    'Chronic Lumbar Tension Syndrome',
  knees:   'Progressive Joint Deterioration',
  neck:    'Cervical Myofascial Pain Syndrome',
  legs:    'Peripheral Circulatory Tension',
  general: 'Systemic Musculoskeletal Fatigue',
}

const DIAGNOSIS_BODY: Record<string, (duration: string) => string> = {
  back: (d) =>
    `Your answers indicate a pattern consistent with <strong>chronic lumbar tension</strong> — where the deep muscles along your spine and lower back have been under sustained stress for <strong>${d}</strong>. Over time, this causes muscle fibres to tighten, reducing blood flow to the area, compressing nearby nerves, and generating persistent pain signals even when you're resting.`,
  knees: (d) =>
    `Your responses point to <strong>progressive joint deterioration</strong> in the knee area — a condition where cartilage and surrounding soft tissue have been under repeated mechanical stress for <strong>${d}</strong>. This causes inflammation, reduced synovial fluid circulation, and increasing stiffness — especially noticeable in the morning or during cold weather.`,
  neck: (d) =>
    `Your pattern suggests <strong>cervical myofascial tension</strong> — chronic tightness in the neck, shoulder, and upper back muscles that has built up over <strong>${d}</strong>. This compresses blood vessels and nerves travelling from the spine to the head, which explains headaches, shoulder tension, and that constant feeling of stiffness.`,
  legs: (d) =>
    `Your answers suggest <strong>peripheral circulatory restriction</strong> — reduced blood flow and oxygen delivery to the lower limbs over a period of <strong>${d}</strong>. This causes leg cramps, heaviness, aching, and poor recovery after activity. It often worsens with prolonged sitting or standing.`,
  general: (d) =>
    `Your profile indicates <strong>systemic musculoskeletal fatigue</strong> — where multiple muscle groups and connective tissues throughout the body have been under chronic stress for <strong>${d}</strong>. This widespread tension depletes cellular energy, disturbs sleep, and creates a cycle of fatigue, pain, and low recovery.`,
}

const BENEFITS_MAP: Record<string, Array<{ icon: string; title: string; desc: string }>> = {
  back: [
    { icon: '🔥', title: 'Deep Lumbar Muscle Relief',       desc: 'Far-infrared heat penetrates 4–6cm into tissue, relaxing the deep spinal muscles that surface treatments cannot reach.' },
    { icon: '🩸', title: 'Restored Blood Flow to Spine',    desc: 'Improved circulation brings fresh oxygen and nutrients directly to the compressed tissue along your lower back.' },
  ],
  knees: [
    { icon: '🦵', title: 'Joint Lubrication & Stiffness Relief', desc: 'Gentle deep heat activates synovial fluid production, reducing the friction and stiffness in your knee joints.' },
    { icon: '💪', title: 'Reduced Inflammatory Response',         desc: 'Cellular heat therapy helps calm the inflammatory cycle that keeps your joints swollen and painful.' },
  ],
  neck: [
    { icon: '🧠', title: 'Cervical Nerve Decompression',    desc: 'Relaxing tight neck and shoulder muscles reduces pressure on the nerves responsible for your headaches.' },
    { icon: '😌', title: 'Shoulder & Upper Back Release',    desc: 'Penetrating warmth loosens the fascia and muscle groups that hold tension in your neck and shoulders.' },
  ],
  legs: [
    { icon: '🩸', title: 'Peripheral Circulation Boost',   desc: 'Terahertz energy stimulates microcirculation in the lower limbs, addressing the root cause of your leg discomfort.' },
    { icon: '⚡', title: 'Cellular Energy Restoration',     desc: 'Improved oxygen delivery to leg tissue reduces cramps, heaviness and the aching that builds throughout the day.' },
  ],
  general: [
    { icon: '🌊', title: 'Whole-Body Muscle Relaxation',   desc: 'Far-infrared warmth systematically relaxes all major muscle groups, breaking the full-body tension cycle.' },
    { icon: '🔋', title: 'Cellular Energy Recovery',        desc: 'Deep thermal stimulation reactivates the body\'s natural repair processes, rebuilding energy from within.' },
  ],
}

const SHARED_BENEFITS = [
  { icon: '😴', title: 'Better Sleep Quality',         desc: 'As pain and muscle tension reduce, your nervous system calms — allowing deeper, more restorative sleep at night.' },
  { icon: '🏠', title: 'Use at Home, Anytime',          desc: 'No clinic appointments. No waiting rooms. 15–30 minutes in your own home whenever you need it.' },
]

export function buildDiagnosis(answers: SurveyAnswers): DiagnosisContent {
  const pain     = answers.q1  ?? 'general'
  const duration = DURATION_TEXT[answers.q2 ?? 'long'] ?? 'an extended period'
  const tried    = answers.q6  ?? []
  const sleep    = answers.q9  ?? 'disturbed'
  const dream    = answers.q11 ?? 'family'

  const profileTag = `Profile: ${PAIN_LABELS[pain] ?? 'Chronic Pain'} · ${
    ['senior1','senior2','mid2'].includes(answers.q10 ?? '')
      ? 'Age-Related Tissue Degeneration'
      : 'Chronic Muscle Tension'
  }`

  const conditionName = CONDITION_NAMES[pain] ?? CONDITION_NAMES['general']
  const diagnosisTitle = `You Are Experiencing: ${conditionName}`

  const diagFn = DIAGNOSIS_BODY[pain] ?? DIAGNOSIS_BODY['general']
  const diagnosisBody = diagFn(duration)

  const diagnosisHighlight = sleep !== 'good'
    ? `<strong>Important:</strong> Your sleep difficulties are directly linked to this condition — pain activates your nervous system at night, preventing deep restorative sleep. This is a major reason why your body hasn't been healing on its own.`
    : `Your body has been dealing with this for <strong>${duration}</strong>. The longer deep-tissue tension is left unaddressed, the harder it becomes for cells to repair themselves — which is why the pain keeps returning.`

  // Why failed
  const hasDrugs    = tried.includes('drugs')
  const hasHospital = tried.includes('hospital')
  const hasNothing  = tried.includes('nothing')

  let whyBody: string
  if (hasNothing) {
    whyBody = `You haven't tried formal treatments yet — which actually puts you in a better position than most. <strong>Starting with the right therapy now</strong>, before the condition deepens further, gives you the best chance of fast, lasting recovery.`
  } else if (hasDrugs && hasHospital) {
    whyBody = `You've tried both <strong>painkillers and hospital treatment</strong> — yet the pain persists. Painkillers block pain signals at the nerve level, but do nothing to address the <strong>restricted blood flow and cellular oxygen deprivation</strong> at the root of your condition. Without restoring circulation at the tissue level, the pain always returns.`
  } else if (hasDrugs) {
    whyBody = `You've relied on <strong>painkillers</strong> — and they've likely given you temporary relief at best. Your pain is rooted in <strong>poor deep-tissue circulation and cellular oxygen depletion</strong>. No painkiller addresses this. The moment the drug wears off, your cells are still starved of oxygen and the pain returns.`
  } else {
    whyBody = `The treatments you've explored haven't reached the <strong>root cause</strong> of your condition. Most standard approaches address pain at the surface level without restoring the <strong>deep cellular circulation</strong> that your tissue urgently needs to heal itself.`
  }

  const specificBenefits = BENEFITS_MAP[pain] ?? BENEFITS_MAP['general']
  const benefits = [...specificBenefits, ...SHARED_BENEFITS]

  const dreamText = DREAM_TEXT[dream] ?? 'live without pain'
  const orderSub = `Based on your health profile, the Terahertz Blower is the recommended therapy device for your ${PAIN_LABELS[pain] ?? 'condition'}. It is specifically suited to help you ${dreamText}.`

  return { profileTag, diagnosisTitle, diagnosisBody, diagnosisHighlight, whyBody, benefits, orderSub }
}