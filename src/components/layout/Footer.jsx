import { Link } from 'react-router-dom'
import { site } from '@/config/site'

export default function Footer() {
  return (
    <footer className="pad-x border-t border-line bg-ink pb-10 pt-16 text-cream">
      <div className="mb-12 grid gap-10 lg:grid-cols-[1.1fr_1.4fr_0.8fr]">
        <a href="#top" className="self-start" aria-label={site.name}>
          <span className="text-[1.7rem] font-semibold leading-none tracking-[-0.06em]">
            craton<span className="text-accent">.</span>
          </span>
          <span className="mt-2 block text-[12px] text-muted">Technologies</span>
        </a>
        <p className="max-w-xl text-[14px] leading-relaxed text-cream/65">
          Innovation-driven product company inventing AI for regulated, evidence-heavy
          work — starting with RAccelerator for EU MDR and IVDR, then applying the same
          method across agentic commerce and new domains.
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

