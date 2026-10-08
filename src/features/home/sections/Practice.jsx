'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import SiteContainer from '@/components/layout/SiteContainer'
import { practice } from '@/content/home'
import { SectionEyebrow } from '@/features/home/components/SectionHeading'

function Panel({ item, index }) {
  return (
    <article className="flex h-svh w-screen shrink-0 flex-col justify-center px-5 pb-16 pt-20 text-ink sm:px-8 sm:pt-24">
      <div className="mx-auto grid h-full max-h-[40rem] w-full max-w-site items-stretch gap-6 lg:max-h-none lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10">
        <div className="flex min-w-0 flex-col justify-center">
          {index === 0 ? (
            <SectionEyebrow
              num={practice.eyebrow.num}
              label={practice.eyebrow.label}
              tone="light"
              className="mb-7"
            />
          ) : (
            <p className="mb-7 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
              {practice.eyebrow.num} / {practice.eyebrow.label}
            </p>
          )}

          <p className="font-display text-[4.5rem] font-semibold leading-none tracking-[-0.06em] text-ink/10 sm:text-[5.5rem]">
            {item.num}
          </p>

          <p className="-mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            {item.domain}
          </p>

          <h3 className="mt-4 max-w-[12ch] font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
            {item.title}{' '}
            <span className="font-serif font-normal italic tracking-[-0.03em] text-ink-soft">
              {item.titleAccent}
            </span>
          </h3>

          <p className="mt-5 max-w-[34ch] font-body text-[15px] leading-[1.65] text-ink/60">
            {item.copy}
          </p>
        </div>

        <div className="flex min-h-[16rem] flex-col overflow-hidden rounded-[1.35rem] border border-line bg-white shadow-[0_18px_50px_rgba(30,42,58,0.08)] lg:min-h-0">
          <div className="relative min-h-[12rem] flex-1">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 58vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>

          <ul className="grid gap-px bg-line sm:grid-cols-3">
            {item.beats.map((beat) => (
              <li key={beat.title} className="bg-white px-4 py-3.5">
                <p className="font-display text-[13.5px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                  {beat.title}
                </p>
                <p className="mt-1 line-clamp-3 font-body text-[12px] leading-relaxed text-ink/55">
                  {beat.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function Progress({ progress, count }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="flex items-center gap-4">
      <div className="h-px w-28 overflow-hidden bg-line sm:w-40">
        <motion.div className="h-full origin-left bg-ink" style={{ width }} />
      </div>
      <p className="font-mono text-[10px] tabular-nums text-ink/45">
        01 / 0{count}
      </p>
    </div>
  )
}

function StaticPractice() {
  return (
    <section
      id={practice.id}
      aria-labelledby="h-practice"
      className="bg-foam px-6 py-24 text-ink sm:px-8 md:py-32"
    >
      <SiteContainer>
        <SectionEyebrow
          num={practice.eyebrow.num}
          label={practice.eyebrow.label}
          tone="light"
          className="mb-6"
        />
        <h2
          id="h-practice"
          className="max-w-[16ch] font-display text-[clamp(2.1rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
        >
          {practice.title}{' '}
          <span className="font-serif text-[1.06em] font-normal italic text-ink-soft">
            {practice.titleAccent}
          </span>
        </h2>
        <p className="mt-5 max-w-[40ch] font-body text-[15px] text-ink/60">
          {practice.aside}
        </p>
        <div className="mt-14 space-y-12">
          {practice.panels.map((item) => (
            <div
              key={item.id}
              className="border-t border-line pt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                  {item.num} · {item.domain}
                </p>
                <h3 className="mt-4 font-display text-[1.75rem] font-semibold tracking-[-0.03em]">
                  {item.title}{' '}
                  <span className="font-serif font-normal italic text-ink-soft">
                    {item.titleAccent}
                  </span>
                </h3>
                <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink/60">
                  {item.copy}
                </p>
              </div>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl lg:mt-0">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}

export default function Practice() {
  const reduced = useReducedMotion()
  const trackRef = useRef(null)
  const count = practice.panels.length

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((count - 1) / count) * 100}%`],
  )

  if (reduced) return <StaticPractice />

  return (
    <section
      id={practice.id}
      ref={trackRef}
      aria-labelledby="h-practice"
      className="relative bg-foam text-ink"
      style={{ height: `${count * 100}vh` }}
    >
      <h2 id="h-practice" className="sr-only">
        {practice.title} {practice.titleAccent}
      </h2>

      {/* Full viewport pins; the whole screen slides through all four panels */}
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ x, width: `${count * 100}%` }}
          className="flex h-full will-change-transform"
        >
          {practice.panels.map((item, index) => (
            <Panel key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <SiteContainer className="flex items-center justify-between gap-4 px-6 pb-6 sm:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
              {practice.hint}
            </p>
            <Progress progress={scrollYProgress} count={count} />
          </SiteContainer>
        </div>
      </div>
    </section>
  )
}
