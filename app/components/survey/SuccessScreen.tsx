'use client'

export default function SuccessScreen() {
  return (
    <div className="text-center py-10 px-5 animate-[fadeUp_0.6s_ease_both]">
      <div className="w-20 h-20 bg-[#1B3A2D]/10 rounded-full flex items-center justify-center
        text-[2.2rem] mx-auto mb-6">
        🎉
      </div>
      <h2 className="font-serif text-[1.8rem] text-[#1B3A2D] mb-3">
        Order Received!
      </h2>
      <p className="text-sm text-[#6B6B6B] leading-[1.75] max-w-sm mx-auto">
        Thank you! Your order has been placed successfully. Our delivery team will
        contact you within 24 hours to confirm your delivery details. Your Terahertz
        Blower will arrive within 2–5 business days.
      </p>
    </div>
  )
}