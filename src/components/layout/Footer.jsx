import { Link } from 'react-router-dom'
import { site } from '@/config/site'

export default function Footer() {
  return (
    <footer className="pad-x border-t border-line bg-ink pb-10 pt-16 text-cream">
      <div className="mb-12 grid gap-10 lg:grid-cols-[1.1fr_1.4fr_0.8fr]">
        <a href="#top" className="flex items-end gap-2.5 self-start">
          <span className="text-[1.7rem] font-semibold leading-none tracking-[-0.06em]">
            craton
          </span>
          <span className="mono-label mb-0.5 max-w-[4.5rem] text-[7.5px] leading-tight text-muted">
            Techno­logies
          </span>
        </a>
        <p className="max-w-xl text-[14px] leading-relaxed text-cream/65">
          Craton Technologies is an innovation-driven product company based in
          Frisco, Texas. It invents, protects, and ships AI-enabled products for
          regulated and evidence-heavy industries — beginning with RAccelerator
          for EU MDR and IVDR — and applies the same method across agentic
          commerce and new domains.
        </p>
        <nav
          className="flex flex-col gap-3 text-[13px] text-cream/70"
          aria-label="Footer"
        >
          <a href="#about" className="hover:text-cream">
            Company
          </a>
          <a href="#raccelerator" className="hover:text-cream">
            RAccelerator
          </a>
          <a href="#reviewsintel" className="hover:text-cream">
            ReviewsIntel
          </a>
          <a href="#contact" className="hover:text-cream">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {site.legalName}. All rights reserved.</span>
        <div className="flex flex-wrap gap-5">
          <Link to="/privacy" className="hover:text-cream">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-cream">
            Terms
          </Link>
          <Link to="/accessibility" className="hover:text-cream">
            Accessibility
          </Link>
        </div>
        <a href="#top" className="hover:text-cream">
          Back to the top ↑
        </a>
      </div>
    </footer>
  )
}

