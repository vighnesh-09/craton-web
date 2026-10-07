import { ShieldCheck, Eye, Scale } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import Glass from '@/components/ui/Glass'
import Section from '@/components/ui/Section'

const items = [
  {
    icon: Eye,
    title: 'Human-in-the-loop',
    body: 'Expert review and visible exceptions stay central. Our products support judgment — they do not replace it.',
  },
  {
    icon: Scale,
    title: 'Evidence you can audit',
    body: 'Outputs are tied to rules and source evidence so regulatory teams can challenge, revise, and own the work.',
  },
  {
    icon: ShieldCheck,
    title: 'Data handling with care',
    body: 'Technical files and review evidence are trust-critical. We design for least privilege, clear retention, and enterprise evaluation pathways.',
  },
]

export default function Trust() {
  return (
    <Section id="trust" tone="dark" className="!py-16">
      <Reveal
        as="h2"
        className="max-w-[18ch] text-[clamp(2rem,3.6vw,3.4rem)] font-normal tracking-[-0.04em]"
      >
        Built for work where{' '}
        <span className="serif text-accent">trust is non-negotiable.</span>
      </Reveal>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} as="li">
            <Glass className="h-full p-6" glow={i === 1}>
              <item.icon className="mb-4 text-accent" size={22} strokeWidth={1.6} />
              <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-cream/65">
                {item.body}
              </p>
            </Glass>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
