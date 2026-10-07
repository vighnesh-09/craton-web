import Reveal from '@/components/ui/Reveal'
import Glass from '@/components/ui/Glass'
import { site } from '@/config/site'

export default function Proof() {
  return (
    <section id="proof" aria-label="Proof" className="pad-x relative z-10 py-4">
      <Glass className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8" glow>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {site.proof.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} as="li">
              <p className="text-[clamp(1.5rem,2.3vw,2rem)] font-medium tracking-tight text-cream">
                {item.value}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-muted">{item.label}</p>
            </Reveal>
          ))}
        </ul>
      </Glass>
    </section>
  )
}
