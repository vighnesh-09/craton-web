import Reveal from '@/components/ui/Reveal'
import Section, { SectionHead } from '@/components/ui/Section'
import { site } from '@/config/site'

export default function Approach() {
  return (
    <Section id="approach" tone="light">
      <SectionHead
        eyebrow="03 / How we move forward"
        title={
          <Reveal
            as="h2"
            className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
          >
            Curious by nature.{' '}
            <span className="serif text-accent-deep">Rigorous by design.</span>
          </Reveal>
        }
      />

      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {site.steps.map((step, i) => (
          <Reveal
            key={step.n}
            delay={i * 0.07}
            as="li"
            className="glass-panel relative overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1"
          >
            <div className="relative z-10">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {step.n}
                </span>
                <span className="text-[13px] text-muted">{step.name}</span>
              </div>
              <div className="my-6 h-px w-full bg-gradient-to-r from-accent/50 to-transparent" />
              <h3 className="text-[1.25rem] font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {step.body}
              </p>
              <span className="mono-label mt-6 inline-block text-accent">
                {step.tag}
              </span>
            </div>

          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
