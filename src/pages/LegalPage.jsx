import { Link, useLocation } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import { site } from '@/config/site'

const pages = {
  privacy: {
    title: 'Privacy',
    body: 'Craton Technologies respects the confidentiality of technical files, contact details, and evaluation materials shared with us. This page will publish our full privacy policy as it is finalized for enterprise evaluation. Until then, contact us for data-handling questions.',
  },
  terms: {
    title: 'Terms',
    body: 'Use of this website and any pilot materials is governed by agreements provided during evaluation. This page is a placeholder for published terms of use.',
  },
  accessibility: {
    title: 'Accessibility',
    body: 'We aim for WCAG 2.2 AA on this marketing site — semantic landmarks, keyboard access, focus states, and respect for reduced motion. If you encounter a barrier, please email us and we will prioritize a fix.',
  },
}

export default function LegalPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const page = pages[slug]

  if (!page) return null

  return (
    <section className="pad-x mx-auto max-w-3xl py-28 md:py-36">
      <Seo title={`${page.title} · ${site.name}`} path={`/${slug}`} />
      <p className="mono-label text-muted">{site.name}</p>
      <h1 className="mt-4 text-[clamp(2.4rem,5vw,3.8rem)] font-normal tracking-tight">
        {page.title}
      </h1>
      <p className="mt-6 text-[16px] leading-[1.75] text-muted-ink">{page.body}</p>
      <p className="mt-6 text-[14px] text-muted">
        Contact:{' '}
        <a className="text-accent hover:text-cream" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex text-[13px] font-medium text-cream/80 hover:text-cream"
      >
        ← Back to home
      </Link>
    </section>
  )
}
