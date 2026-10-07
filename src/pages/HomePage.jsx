import Seo from '@/components/seo/Seo'
import { pages } from '@/content/pages'
import { Contact, Features, Hero, Showcase, Studio } from '@/features/home'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'

const meta = pages.home

export default function HomePage() {
  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        ogTitle={meta.ogTitle}
        ogDescription={meta.ogDescription}
        robots={meta.robots}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      <Hero />
      <Features />
      <Showcase />
      <Studio />
      <Contact />
    </>
  )
}
