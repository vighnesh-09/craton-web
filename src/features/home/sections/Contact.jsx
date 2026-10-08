'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import SiteContainer from '@/components/layout/SiteContainer'
import { env } from '@/config/env'
import { contact } from '@/content/home'
import { cn } from '@/lib/cn'

const ease = [0.22, 1, 0.36, 1]

function TopicField({ id, labelId, value, topics, onChange, fieldClass }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [placement, setPlacement] = useState('below')
  const [maxHeight, setMaxHeight] = useState(null)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  const selectedIndex = Math.max(0, topics.indexOf(value))
  const listId = `${id}-listbox`

  const openAt = (index) => {
    const count = topics.length
    setActiveIndex((index + count) % count)
    setOpen(true)
  }

  const commit = (index) => {
    const next = topics[index]
    if (next && next !== value) onChange(next)
    setOpen(false)
    buttonRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus({ preventScroll: true })
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useLayoutEffect(() => {
    if (!open || !buttonRef.current || !listRef.current) return undefined

    const measure = () => {
      const button = buttonRef.current.getBoundingClientRect()
      const list = listRef.current
      if (!list) return

      const gap = 8
      const header = document.querySelector('header')
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0
      const spaceBelow = Math.max(0, window.innerHeight - button.bottom - gap)
      const spaceAbove = Math.max(0, button.top - Math.max(gap, headerBottom + gap))
      const needed = list.scrollHeight
      const below = spaceBelow >= needed || spaceBelow >= spaceAbove
      const available = Math.floor(below ? spaceBelow : spaceAbove)
      const nextPlacement = below ? 'below' : 'above'

      setPlacement((prev) => (prev === nextPlacement ? prev : nextPlacement))
      setMaxHeight((prev) => (prev === available ? prev : available))
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [open, topics])

  useLayoutEffect(() => {
    if (!open || !listRef.current) return
    const option = listRef.current.querySelector('[data-active="true"]')
    if (!option) return
    const list = listRef.current
    const top = option.offsetTop
    const bottom = top + option.offsetHeight
    if (top < list.scrollTop) list.scrollTop = top
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight
    }
  }, [open, activeIndex, placement, maxHeight])

  const onKeyDown = (event) => {
    const count = topics.length
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) openAt(selectedIndex + 1)
        else setActiveIndex((index) => (index + 1) % count)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!open) openAt(selectedIndex - 1)
        else setActiveIndex((index) => (index - 1 + count) % count)
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        setOpen(true)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(count - 1)
        setOpen(true)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (!open) openAt(selectedIndex)
        else commit(activeIndex)
        break
      case 'Escape':
        if (!open) break
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
        break
      case 'Tab':
        if (open) setOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        aria-labelledby={`${labelId} ${id}`}
        onClick={() => {
          if (open) setOpen(false)
          else openAt(selectedIndex)
        }}
        onKeyDown={onKeyDown}
        className={cn(
          fieldClass,
          'flex items-center justify-between gap-3 text-left',
          open && 'border-copper',
        )}
      >
        <span className="min-w-0 truncate">{value}</span>
        <ChevronDown
          aria-hidden
          size={16}
          className={cn(
            'shrink-0 text-hero-muted transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          style={maxHeight ? { maxHeight } : undefined}
          onMouseDown={(event) => event.preventDefault()}
          className={cn(
            'absolute left-0 z-30 w-full overflow-auto rounded-xl border border-line-on-dark bg-[color-mix(in_srgb,var(--hero-base)_88%,var(--hero-fg))] p-1.5 shadow-[0_16px_40px_color-mix(in_srgb,var(--craton)_50%,transparent)]',
            placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          {topics.map((topic, index) => {
            const selected = topic === value
            const active = index === activeIndex
            return (
              <li
                key={topic}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={selected}
                data-active={active ? 'true' : undefined}
                data-cursor="hover"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
                className={cn(
                  'flex min-h-11 items-center rounded-lg px-3 py-2.5 font-body text-[14.5px] leading-snug text-hero-fg',
                  active ? 'bg-lagoon/20' : selected && 'bg-hero-fg/10',
                )}
              >
                {topic}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

const initial = {
  name: '',
  email: '',
  company: '',
  topic: contact.topics[0],
  message: '',
}

export default function Contact() {
  const reduced = usePrefersReducedMotion()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setStatus('')
  }

  const selectDoor = (label) => {
    setField('topic', label)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = contact.form.nameError
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = contact.form.emailError
    }
    return next
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    const subject = encodeURIComponent(`[Craton] ${form.topic}`)
    const body = encodeURIComponent(
      [
        form.message.trim() || '(no message)',
        '',
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        form.company.trim() ? `Company: ${form.company.trim()}` : null,
        `Conversation: ${form.topic}`,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    window.location.href = `mailto:${env.contactEmail}?subject=${subject}&body=${body}`
    setStatus(contact.form.success)
  }

  const fieldClass =
    'mt-2 w-full border-0 border-b border-line-on-dark bg-transparent px-0 py-2.5 font-body text-[14.5px] text-hero-fg outline-none transition-colors placeholder:text-hero-muted/50 focus:border-copper'

  return (
    <section
      id={contact.id}
      aria-labelledby="h-contact"
      className="bg-craton py-24 text-hero-fg md:py-32"
    >
      <SiteContainer>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="mb-6 inline-flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-hero-muted">
            <span aria-hidden className="inline-block h-px w-7 bg-copper" />
            {contact.kicker}
            <span aria-hidden className="text-copper">
              +
            </span>
          </p>

          <h2
            id="h-contact"
            className="max-w-[18ch] font-display text-[clamp(2.25rem,4.8vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-hero-fg"
          >
            {contact.title}{' '}
            <span className="font-serif text-[1.06em] font-normal italic tracking-[-0.03em] text-hero-soft">
              {contact.titleAccent}
            </span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.06, ease }}
          >
            <p className="mb-7 max-w-[40ch] font-body text-[15px] leading-[1.75] text-hero-body">
              {contact.lead}
            </p>

            <div
              role="group"
              aria-label="Choose how you want to work with Craton"
              className="grid gap-0 border-t border-line-on-dark sm:grid-cols-2"
            >
              {contact.doors.map((door) => {
                const active = form.topic === door.label
                return (
                  <button
                    key={door.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectDoor(door.label)}
                    className={`relative border-b border-line-on-dark px-0 py-5 text-left transition-colors duration-300 sm:odd:pr-5 sm:even:pl-5 sm:even:border-l ${
                      active
                        ? 'text-hero-fg'
                        : 'text-hero-muted hover:text-hero-soft'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-px origin-left bg-copper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active ? 'w-full scale-x-100' : 'w-full scale-x-0'
                      } ${door.id === 'partner' || door.id === 'join' ? 'sm:left-5 sm:w-[calc(100%-1.25rem)]' : ''}`}
                    />
                    <b className="block font-display text-[1.05rem] font-semibold tracking-[-0.02em]">
                      {door.label}
                    </b>
                    <span className="mt-2 block max-w-[32ch] font-body text-[13px] leading-relaxed text-hero-body">
                      {door.copy}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            noValidate
            onSubmit={onSubmit}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.1, ease }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="f-name"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted"
                >
                  {contact.form.nameLabel}
                </label>
                <input
                  id="f-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  className={fieldClass}
                />
                {errors.name ? (
                  <p className="mt-2 font-body text-[12px] text-coral">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="f-email"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted"
                >
                  {contact.form.emailLabel}
                </label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={fieldClass}
                />
                {errors.email ? (
                  <p className="mt-2 font-body text-[12px] text-coral">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="f-company"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted"
                >
                  {contact.form.companyLabel}
                </label>
                <input
                  id="f-company"
                  name="company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => setField('company', e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label
                  id="f-topic-label"
                  htmlFor="f-topic"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted"
                >
                  {contact.form.topicLabel}
                </label>
                <TopicField
                  id="f-topic"
                  labelId="f-topic-label"
                  value={form.topic}
                  topics={contact.topics}
                  onChange={(topic) => setField('topic', topic)}
                  fieldClass={fieldClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="f-msg"
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-hero-muted"
              >
                {contact.form.messageLabel}
              </label>
              <textarea
                id="f-msg"
                name="message"
                rows={3}
                placeholder={contact.form.messagePlaceholder}
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-hero-cta px-6 text-[13px] font-semibold text-craton transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                {contact.form.submit}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <p className="max-w-[28ch] font-body text-[12px] leading-relaxed text-hero-muted">
                {contact.form.note}
              </p>
            </div>

            {status ? (
              <p role="status" className="font-body text-[13px] text-copper">
                {status}
              </p>
            ) : null}
          </motion.form>
        </div>
      </SiteContainer>
    </section>
  )
}
