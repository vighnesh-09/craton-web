'use client'

import ProofMarquee from '@/components/ui/ProofMarquee'

/** Sits below the full-viewport hero — visible after scrolling past 100vh */
export default function ProofBand() {
  return (
    <section
      id="proof"
      aria-label="Company proof points"
      className="relative z-10 bg-craton text-hero-fg"
    >
      <ProofMarquee />
    </section>
  )
}
