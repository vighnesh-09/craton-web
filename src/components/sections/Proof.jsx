import { site } from '@/config/site'

export default function Proof() {
  return (
    <section className="border-y border-current/15 bg-ink text-cream" aria-label="Proof">
      <ul className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {site.proof.map((item, index) => (
          <li
            key={item.label}
            className="border-b border-current/15 py-8 lg:border-r lg:border-b-0 lg:pr-6 lg:pl-0 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6"
          >
            <p className="font-mono text-[12px] tracking-[0.16em] text-accent-text">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mt-2 font-serif text-[clamp(2.4rem,4.2vw,4.2rem)] leading-none tracking-[-0.045em]">
              {item.value}
            </p>
            <p className="mt-2 max-w-[18ch] text-[14px] leading-snug text-muted-ink">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
