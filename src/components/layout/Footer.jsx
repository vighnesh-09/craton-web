import { Link } from 'react-router-dom'
import BrandLogo from '@/components/ui/BrandLogo'
import { site } from '@/config/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c141c] pb-6 pt-8 text-[#f4f7fa]">
      <p className="shell type-h2 text-[#f4f7fa]">
        Craton.
      </p>
      <div className="shell mb-6 grid gap-6 lg:grid-cols-[1.1fr_1.4fr_0.8fr]">
        <a href="#top" className="self-start" aria-label={site.name}>
          <BrandLogo size="lg" inverted />
        </a>
        <p className="type-body max-w-xl text-on-navy">
          Craton Technologies is an innovation-driven product company based in
          Frisco, Texas. It invents, protects, and ships AI-enabled products for
          regulated and evidence-heavy industries — beginning with RAccelerator
          for EU MDR and IVDR — and applies the same method across agentic
          commerce and new domains.
        </p>
        <nav
          className="flex flex-col gap-3 text-[13px] text-on-navy-soft"
          aria-label="Footer"
        >
          <a href="#about" className="link-draw w-fit hover:text-on-navy-strong">
            Company
          </a>
          <a href="#products" className="link-draw w-fit hover:text-on-navy-strong">
            Product
          </a>
          <a href="#contact" className="link-draw w-fit text-accent hover:text-on-navy-strong">
            Contact
          </a>
        </nav>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-white/15 pt-6 text-[12px] text-on-navy-soft sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {site.legalName}. All rights reserved.</span>
        <div className="flex flex-wrap gap-5">
          <Link to="/privacy" className="link-draw hover:text-on-navy-strong">
            Privacy
          </Link>
          <Link to="/terms" className="link-draw hover:text-on-navy-strong">
            Terms
          </Link>
          <Link to="/accessibility" className="link-draw hover:text-on-navy-strong">
            Accessibility
          </Link>
        </div>
        <a href="#top" className="hover:text-on-navy-strong">
          Back to the top ↑
        </a>
      </div>
    </footer>
  )
}

