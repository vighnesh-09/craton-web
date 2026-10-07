import Reveal from '@/components/ui/Reveal'
import { site } from '@/config/site'

export default function Proof() {
  return (
    <section
      id="proof"
      aria-label="Proof"
      className="pad-x relative z-10 border-y border-line bg-ink/80 py-10 backdrop-blur-sm sm:py-12"
    >
      <div className="mx-auto grid max-w-[1400px] gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {site.proof.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.05} as="div">
            <p className="text-[clamp(1.65rem,2.4vw,2.1rem)] font-semibold tracking-[-0.03em] text-cream">
              {item.value}
            </p>
            <p className="mt-2 max-w-[22ch] text-[13px] leading-snug text-muted">
              {item.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
