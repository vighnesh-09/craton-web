import { site } from '@/config/site'

export default function Proof() {
  return (
    <section className="border-y border-current/15 bg-ink text-cream" aria-label="Proof">
      <ul className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {site.proof.map((item, index) => (
          <li
            key={item.label}
            className="min-w-0 border-b border-current/15 py-6 sm:py-8 lg:border-r lg:border-b-0 lg:px-5 lg:py-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <p className="type-label">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="type-stat mt-2 break-words">{item.value}</p>
            <p className="type-body mt-2 max-w-[22ch] text-muted-ink">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
