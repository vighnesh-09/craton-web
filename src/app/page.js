import {
  Company,
  Contact,
  Domains,
  Faq,
  Hero,
  Pilot,
  Practice,
  Products,
  ProofBand,
  Security,
} from '@/features/home'
import { pages } from '@/content/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata(pages.home)

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
      <Company />
      <Faq />
      <Contact />
    </>
  )
}
