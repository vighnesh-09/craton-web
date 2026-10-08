'use client'

import { ArrowUp } from 'lucide-react'
import BrandMark from '@/components/ui/BrandMark'
import FooterWordmark from '@/components/ui/FooterWordmark'
import SiteContainer from '@/components/layout/SiteContainer'
import { site } from '@/config/site'
import { footerCopy } from '@/content/home'
import {
  footerLegalNav,
  footerNav,
  footerProductNav,
} from '@/content/navigation'
import { useSiteLink } from '@/hooks/useSiteLink'

const COPYRIGHT_YEAR = 2026

export default function Footer() {
  const follow = useSiteLink()

  const go = (href) => (event) => {
    follow(href)(event)
  }

  return (
    <footer id="footer" className="bg-craton text-hero-fg">
      {/* Professional content band */}
      <div className="border-b border-line-on-dark px-6 py-16 sm:px-8 md:py-20">
        <SiteContainer>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <BrandMark
                href="#top"
                tone="on-dark"
                ariaLabel="Craton Technologies — back to top"
                onClick={go('#top')}
              />
              <p className="mt-6 max-w-[40ch] font-body text-[14px] leading-[1.75] text-hero-body">
                {footerCopy.boiler}
              </p>
              <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-hero-muted">
                {site.foundingLocation.locality}, {site.foundingLocation.region} ·{' '}
                {site.tagline}
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-copper">
                  Navigate
                </p>
                <ul className="mt-4 space-y-3">
                  {footerNav.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={go(link.href)}
                        className="font-body text-[14px] text-hero-nav transition-colors duration-200 hover:text-hero-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-copper">
                  Products
                </p>
                <ul className="mt-4 space-y-3">
                  {footerProductNav.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={go(link.href)}
                        className="font-body text-[14px] text-hero-nav transition-colors duration-200 hover:text-hero-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-copper">
                  Legal
                </p>
                <ul className="mt-4 space-y-3">
                  {footerLegalNav.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={go(link.href)}
                        className="font-body text-[14px] text-hero-nav transition-colors duration-200 hover:text-hero-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-copper">
                  Connect
                </p>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href={`mailto:${site.contactEmail}`}
                      className="font-body text-[14px] text-hero-nav transition-colors duration-200 hover:text-hero-fg"
                    >
                      {site.contactEmail}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={go('#contact')}
                      className="font-body text-[14px] text-hero-nav transition-colors duration-200 hover:text-hero-fg"
                    >
                      Start a conversation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#top"
                      onClick={go('#top')}
                      className="inline-flex items-center gap-2 font-body text-[14px] text-hero-nav transition-colors duration-200 hover:text-copper"
                    >
                      Back to the top
                      <ArrowUp size={14} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SiteContainer>
      </div>

      {/* Page-bottom closeout — full-bleed wordmark + copyright */}
      <div className="flex flex-col items-stretch pt-14 sm:pt-20">
        <div className="w-full px-2 sm:px-3 md:px-4">
          <FooterWordmark />
        </div>

        <p className="px-6 pb-10 pt-4 text-center font-display text-[11px] font-medium uppercase leading-[1.1] tracking-[0.08em] text-hero-fg/55 sm:pb-14 sm:pt-5 sm:text-[12px]">
          Copyright © {COPYRIGHT_YEAR} {site.shortName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
