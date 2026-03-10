'use client'

import { useState } from 'react'
import { NIGERIAN_STATES } from './data'
import type { OrderData, SurveyAnswers } from './types'

const PRICE_OPTIONS = [
  { qty: '1' as const, label: '1 Terahertz Blower',  badge: null,       price: '₦180,000' },
  { qty: '2' as const, label: '2 Terahertz Blowers', badge: 'Save ₦10k', price: '₦350,000' },
  { qty: '3' as const, label: '3 Terahertz Blowers', badge: 'Best Value', price: '₦520,000' },
]

const GUARANTEES = [
  'Payment on Delivery — only pay when it arrives at your door',
  'Free nationwide delivery to all 36 states',
  'Delivery within 2–5 business days',
]

interface OrderFormProps {
  orderSub: string
  answers: SurveyAnswers
  onSuccess: () => void
}

export default function OrderForm({ orderSub, answers, onSuccess }: OrderFormProps) {
  const [qty, setQty] = useState<'1' | '2' | '3'>('1')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!name.trim() || !phone.trim() || !address.trim() || !state) {
      setError('Please fill in all delivery details to complete your order.')
      return
    }
    setError('')
    setLoading(true)

    const payload: OrderData = { name, phone, address, state, quantity: qty, answers }

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      // If API returns a WhatsApp URL, open it
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank')
      }
      onSuccess()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1B3A2D] rounded-2xl p-6 mt-7">
      <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#E8B96A] mb-2.5">
        🛒 Your Prescribed Solution
      </p>
      <h3 className="font-serif text-[1.4rem] text-white leading-snug mb-1.5">
        The Terahertz Therapeutic Blower
      </h3>
      <p className="text-sm text-white/60 mb-6 leading-relaxed">{orderSub}</p>

      {/* Quantity selector */}
      <div className="flex flex-col gap-2.5 mb-6">
        {PRICE_OPTIONS.map((opt) => (
          <button
            key={opt.qty}
            type="button"
            onClick={() => setQty(opt.qty)}
            className={`
              flex items-center justify-between px-4 py-3.5 rounded-xl border-[1.5px]
              transition-all duration-200 text-left cursor-pointer
              ${qty === opt.qty
                ? 'border-[#C8923A] bg-[#C8923A]/12'
                : 'border-white/12 bg-white/7 hover:border-[#C8923A]/50 hover:bg-white/10'
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                transition-all duration-200
                ${qty === opt.qty ? 'border-[#C8923A]' : 'border-white/30'}
              `}>
                {qty === opt.qty && (
                  <div className="w-2 h-2 rounded-full bg-[#C8923A]" />
                )}
              </div>
              <span className="text-sm font-medium text-white">{opt.label}</span>
              {opt.badge && (
                <span className="bg-[#C8923A] text-white text-[10px] font-bold px-2 py-0.5
                  rounded-full tracking-wider uppercase">
                  {opt.badge}
                </span>
              )}
            </div>
            <span className="text-base font-bold text-[#E8B96A]">{opt.price}</span>
          </button>
        ))}
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-3.5 mb-5">
        {[
          { label: 'Full Name',        value: name,    setter: setName,    type: 'text', placeholder: 'Enter your full name' },
          { label: 'Phone Number',     value: phone,   setter: setPhone,   type: 'tel',  placeholder: 'e.g. 08012345678' },
          { label: 'Delivery Address', value: address, setter: setAddress, type: 'text', placeholder: 'Street, area, city' },
        ].map((field) => (
          <div key={field.label} className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/65">
              {field.label}
            </label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              placeholder={field.placeholder}
              className="bg-white/8 border-[1.5px] border-white/15 rounded-xl px-4 py-3
                text-white placeholder-white/35 text-sm font-medium outline-none
                focus:border-[#C8923A] focus:bg-white/12 transition-all duration-200"
            />
          </div>
        ))}

        {/* State select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-white/65">
            State
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="bg-[#1B3A2D] border-[1.5px] border-white/15 rounded-xl px-4 py-3
              text-white text-sm font-medium outline-none appearance-none
              focus:border-[#C8923A] transition-all duration-200"
          >
            <option value="" className="bg-[#1B3A2D]">Select your state</option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s} className="bg-[#1B3A2D]">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guarantees */}
      <div className="flex flex-col gap-2 mb-5">
        {GUARANTEES.map((g) => (
          <div key={g} className="flex items-center gap-2 text-xs text-white/65">
            <span className="text-[#E8B96A]">✅</span>
            {g}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-300 text-sm mb-3 text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`
          w-full flex items-center justify-center gap-2 py-4 rounded-2xl
          text-base font-bold text-white tracking-wide transition-all duration-250
          ${loading
            ? 'bg-[#C8923A]/60 cursor-not-allowed'
            : 'bg-gradient-to-br from-[#C8923A] to-[#b57e2e] cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(200,146,58,0.45)]'
          }
          shadow-[0_6px_28px_rgba(200,146,58,0.35)]
        `}
      >
        {loading ? '⏳ Processing…' : '📦 Place My Order Now'}
      </button>

      <p className="text-center text-[11px] text-white/40 mt-3 leading-relaxed">
        You will NOT be charged until your package is delivered.<br />
        You can confirm the product before paying.
      </p>
    </div>
  )
}