import type { QuestionConfig } from './types'

export const QUESTIONS: QuestionConfig[] = [
  {
    id: 'q1',
    stage: 'Stage 1 — Understanding Your Body',
    number: 1,
    text: 'Where do you feel the most pain or discomfort in your body?',
    sub: `Select the area that bothers you most. We'll build your health profile from here.`,
    options: [
      { value: 'back',    icon: '🔙', label: 'Back / Waist',                        description: 'Lower back pain, waist pain, spine discomfort' },
      { value: 'knees',   icon: '🦵', label: 'Knees / Joints',                       description: 'Knee pain, hip joints, stiff or swollen joints' },
      { value: 'neck',    icon: '🤕', label: 'Neck / Shoulders / Head',              description: 'Headaches, shoulder tension, neck stiffness' },
      { value: 'legs',    icon: '🦶', label: 'Legs / Feet',                          description: 'Leg cramps, foot pain, poor circulation' },
      { value: 'general', icon: '🌡️', label: 'General body fatigue / Multiple areas', description: 'Widespread tiredness, aching all over' },
    ],
  },
  {
    id: 'q2',
    stage: 'Stage 1 — Understanding Your Body',
    number: 2,
    text: 'How long have you been dealing with this pain or discomfort?',
    sub: 'Duration helps us understand how deep the problem has become.',
    twoCol: true,
    options: [
      { value: 'short',   label: 'Less than 1 month', description: 'Recently started' },
      { value: 'medium',  label: '1 – 6 months',       description: 'A few months now' },
      { value: 'long',    label: '6 months – 2 years', description: 'Becoming chronic' },
      { value: 'chronic', label: 'More than 2 years',  description: 'Long-term suffering' },
    ],
  },
  {
    id: 'q3',
    stage: `Stage 2 — How It's Affecting You`,
    number: 3,
    text: 'Which of these best describes your daily experience?',
    sub: 'Choose the one that feels most familiar to you.',
    options: [
      { value: 'morning', icon: '🌅', label: 'I wake up stiff and sore every morning',        description: 'Pain is worst when I first get out of bed' },
      { value: 'evening', icon: '🌆', label: 'Pain builds and gets worse as the day goes on',  description: `By evening I'm really struggling` },
      { value: 'reduced', icon: '🚶', label: `I've had to reduce my activity and movement`,    description: 'Avoiding certain actions to prevent pain' },
      { value: 'sleep',   icon: '😴', label: 'The pain disturbs my sleep at night',            description: `I wake up or can't sleep because of it` },
    ],
  },
  {
    id: 'q5',
    stage: `Stage 2 — How It's Affecting You`,
    number: 5,
    text: 'Has this pain affected any of the following in your life?',
    sub: 'Select all that apply.',
    multi: true,
    options: [
      { value: 'sleep',    icon: '😴', label: 'Sleep quality',          description: 'Difficulty falling asleep or staying asleep' },
      { value: 'work',     icon: '💼', label: 'Ability to work',         description: 'Pain limits my productivity or attendance' },
      { value: 'family',   icon: '👨‍👩‍👧', label: 'Family and social life', description: 'I miss out on activities or time with loved ones' },
      { value: 'mood',     icon: '😔', label: 'Mood and energy levels',  description: 'I feel low, frustrated or drained because of it' },
      { value: 'mobility', icon: '🚶', label: 'Mobility and movement',   description: 'Walking, bending, climbing stairs' },
    ],
  },
  {
    id: 'q6',
    stage: 'Stage 3 — Your Treatment History',
    number: 6,
    text: 'What have you already tried to manage this pain?',
    sub: `Be honest — this helps us understand why you haven't found lasting relief yet.`,
    multi: true,
    options: [
      { value: 'drugs',    icon: '💊', label: 'Painkillers or prescription drugs', description: 'Panadol, Ibuprofen, Diclofenac etc.' },
      { value: 'hospital', icon: '🏥', label: 'Hospital or clinic visits',          description: 'Consultations, injections, scans' },
      { value: 'physio',   icon: '🏃', label: 'Physiotherapy or massage',           description: 'Physical therapy sessions' },
      { value: 'herbal',   icon: '🌿', label: 'Herbal remedies or supplements',     description: 'Local medicines, herbs, or health supplements' },
      { value: 'nothing',  icon: '🤷', label: 'Nothing yet',                        description: `I haven't tried anything formal` },
    ],
  },
  {
    id: 'q7',
    stage: 'Stage 3 — Your Treatment History',
    number: 7,
    text: `How would you describe the results of what you've tried so far?`,
    sub: 'This is important — it tells us where the gap is in your current approach.',
    options: [
      { value: 'stopped',   icon: '🔄', label: 'It worked at first but stopped working', description: 'I built a tolerance or the relief faded' },
      { value: 'temporary', icon: '⏱️', label: 'Only gives temporary relief',             description: 'Pain always comes back after a few hours' },
      { value: 'expensive', icon: '💸', label: 'Too expensive to sustain',                description: `I can't keep affording this every month` },
      { value: 'never',     icon: '❌', label: 'Never worked at all',                     description: 'No meaningful improvement' },
      { value: 'notried',   icon: '🆕', label: `I haven't tried anything yet`,            description: 'Just starting to look for solutions' },
    ],
  },
  {
    id: 'q8',
    stage: 'Stage 4 — Your Lifestyle',
    number: 8,
    text: 'How would you describe your typical daily routine?',
    sub: 'Lifestyle is one of the biggest hidden drivers of chronic pain.',
    options: [
      { value: 'sitting',  icon: '💻', label: 'Mostly sitting — desk or office work', description: 'I spend most of the day seated' },
      { value: 'standing', icon: '🏪', label: 'On my feet all day',                   description: 'Trading, shop work, long hours standing' },
      { value: 'physical', icon: '⚒️', label: 'Physical or manual labour',            description: 'Heavy lifting, farming, construction, etc.' },
      { value: 'mixed',    icon: '🔀', label: 'Mixed / varies each day',              description: 'My routine changes regularly' },
      { value: 'retired',  icon: '🏡', label: 'Retired / mostly at home',             description: 'Limited daily activity' },
    ],
  },
  {
    id: 'q9',
    stage: 'Stage 4 — Your Lifestyle',
    number: 9,
    text: 'How would you describe your sleep?',
    sub: 'Poor sleep and chronic pain have a direct relationship — poor sleep makes pain worse, and pain makes sleep harder.',
    options: [
      { value: 'good',      icon: '✅', label: 'I sleep well most nights',        description: 'No major sleep issues' },
      { value: 'tired',     icon: '😓', label: 'I wake up tired and unrefreshed', description: 'Sleep hours are okay but quality is poor' },
      { value: 'disturbed', icon: '😰', label: 'Pain disturbs my sleep',           description: 'I wake up at night because of discomfort' },
      { value: 'struggle',  icon: '🌙', label: 'I struggle to fall asleep',        description: `My mind or body won't settle at night` },
    ],
  },
  {
    id: 'q10',
    stage: 'Stage 4 — Your Lifestyle',
    number: 10,
    text: 'What is your approximate age range?',
    sub: 'Age helps us understand the likely biological cause of your symptoms.',
    twoCol: true,
    options: [
      { value: 'young',   label: 'Under 35' },
      { value: 'mid1',    label: '35 – 45' },
      { value: 'mid2',    label: '46 – 55' },
      { value: 'senior1', label: '56 – 65' },
      { value: 'senior2', label: 'Over 65' },
    ],
  },
  {
    id: 'q11',
    stage: 'Stage 5 — Almost There',
    number: 11,
    text: 'If this pain were completely gone, what would you do first?',
    sub: 'Picture it clearly. What does a pain-free life look like for you?',
    options: [
      { value: 'work',   icon: '💪', label: 'Go back to work or business fully',        description: 'Be productive without suffering' },
      { value: 'sleep',  icon: '😌', label: 'Sleep through the night peacefully',        description: 'Wake up feeling truly rested' },
      { value: 'family', icon: '👨‍👩‍👧‍👦', label: 'Play with my children or grandchildren', description: 'Be present for the people I love' },
      { value: 'travel', icon: '🚶', label: 'Move freely — walk, travel, go out',        description: 'Regain my independence and mobility' },
    ],
  },
  {
    id: 'q12',
    stage: 'Stage 5 — Final Question',
    number: 12,
    text: 'How serious are you about finally solving this problem?',
    sub: 'Be honest — your answer helps us match you with the right recommendation.',
    options: [
      { value: 'serious', icon: '🔥', label: 'Very serious — I am ready to try something new', description: `I've had enough of living with this pain` },
      { value: 'open',    icon: '🤔', label: 'Somewhat serious — open to exploring options',    description: 'I want to learn more before deciding' },
      { value: 'curious', icon: '👀', label: 'Just curious for now',                             description: 'No immediate urgency' },
    ],
  },
]

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT — Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
]

export const PAIN_LABELS: Record<string, string> = {
  back:    'Back & Waist Pain',
  knees:   'Knee & Joint Pain',
  neck:    'Neck, Shoulder & Head Pain',
  legs:    'Leg & Circulatory Pain',
  general: 'General Body Pain & Fatigue',
}

export const DURATION_TEXT: Record<string, string> = {
  short:   'a few weeks',
  medium:  'several months',
  long:    'over a year',
  chronic: 'more than two years',
}

export const DREAM_TEXT: Record<string, string> = {
  work:   'go back to work and be fully productive',
  sleep:  'sleep through the night without pain',
  family: 'play with your family without limitations',
  travel: 'move freely and travel without restriction',
}