import Seo from '@/components/seo/Seo'
import About from '@/components/sections/About'
import Approach from '@/components/sections/Approach'
import ClipMask from '@/components/sections/ClipMask'
import Contact from '@/components/sections/Contact'
import DomainScroll from '@/components/sections/DomainScroll'
import EvidenceWipe from '@/components/sections/EvidenceWipe'
import FilmStrip from '@/components/sections/FilmStrip'
import Hero from '@/components/sections/Hero'
import Mindset from '@/components/sections/Mindset'
import Products from '@/components/sections/Products'
import Proof from '@/components/sections/Proof'
import ScaleWords from '@/components/sections/ScaleWords'
import ScrollRail from '@/components/sections/ScrollRail'
import StatementBand from '@/components/sections/StatementBand'
import Trust from '@/components/sections/Trust'
import Voices from '@/components/sections/Voices'

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <ScrollRail />
      <DomainScroll />
      <Products />
      <EvidenceWipe />
      <FilmStrip />
      <Proof />
      <ClipMask />
      <Voices />
      <ScaleWords />
      <Approach />
      <Mindset />
      <About />
      <StatementBand />
      <Trust />
      <Contact />
    </>
  )
}
