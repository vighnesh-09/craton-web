import SiteContainer from '@/components/layout/SiteContainer'
import { env } from '@/config/env'
import { site } from '@/config/site'

const COPYRIGHT_YEAR = 2026

export default function Footer() {
  return (
    <footer className="border-t border-line bg-foam px-6 py-8">
      <SiteContainer className="flex flex-col items-start justify-between gap-4 text-sm text-ink/50 sm:flex-row sm:items-center">
        <p className="font-display font-semibold text-ink/70">{env.appName}</p>
        <p>
          © {COPYRIGHT_YEAR} {site.legalName}
        </p>
      </SiteContainer>
    </footer>
  )
}
