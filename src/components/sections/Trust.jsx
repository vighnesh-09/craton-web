import { Eye, Scale, ShieldCheck } from 'lucide-react'

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
    <section id="trust" className="section-pad bg-canvas" aria-label="Trust">
      <div className="shell">
        <p className="kicker">Trust</p>
        <h2 className="display mt-3 max-w-[16ch] text-cream">
          Built for work where{' '}
          <span className="serif text-accent">trust is non-negotiable.</span>
        </h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-[var(--radius)] border border-[var(--hairline)] bg-paper px-5 py-5 transition-colors hover:border-accent"
            >
              <item.icon className="text-accent" size={20} strokeWidth={1.6} />
              <h3 className="mt-4 text-[1.1rem] font-medium text-cream">{item.title}</h3>
              <p className="lede mt-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
