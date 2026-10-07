import Reveal from '@/components/ui/Reveal'
import Section, { SectionHead } from '@/components/ui/Section'
import { site } from '@/config/site'

export default function Mindset() {
  return (
    <Section id="mindset" tone="light">
      <SectionHead
        eyebrow="01 / The Craton mindset"
        title={
          <Reveal
            as="h2"
            className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-normal leading-[1.05] tracking-[-0.04em]"
          >
            The next breakthrough starts with a{' '}
            <span className="serif text-accent-deep">better question.</span>
          </Reveal>
        }
        aside={
          <Reveal
            delay={0.08}
            className="max-w-[48ch] text-[15px] leading-[1.75] text-muted md:text-base"

          >
            What if complex information could become clearer decisions? We bring
            bold thinking, deep research, and thoughtful architecture together
            for work where trust is the hard part.
          </Reveal>
        }
      />

      <ul className="grid border-t border-line-ink md:grid-cols-3">
        {site.beliefs.map((belief, i) => (
          <Reveal
            key={belief.title}
            delay={i * 0.08}
            as="li"
            className="border-line py-8 md:border-r md:px-7 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <span className="mb-5 inline-block h-1 w-10 bg-accent" />
            <h3 className="text-[1.35rem] font-medium tracking-tight">
              {belief.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              {belief.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>

  )
}
