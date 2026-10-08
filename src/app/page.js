import {
  Approach,
  Company,
  Contact,
  Domains,
  Faq,
  Hero,
  Mindset,
  Patents,
  Pilot,
  Practice,
  Products,
  ProofBand,
  Security,
} from '@/features/home'
import { pages } from '@/content/pages'

const meta = pages.home

export const metadata = {
  title: {
    absolute: `${meta.ogTitle}`,
  },
  description: meta.description,
  alternates: {
    canonical: meta.path,
  },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: meta.path,
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBand />
      <Domains />
      <Products />
      <Practice />
      <Security />
      <Pilot />
      <Faq />
      <Mindset />
      <Approach />
      <Patents />
      <Company />
      <Contact />
    </>
  )
}
