import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { cn } from '@/lib/cn'

const TAU = Math.PI * 2
const HOLD = 3.4
const TRANS = 1.8
const PHASES = [
  { id: 0, label: 'Ideas', caption: 'Scattered possibility.' },
  { id: 1, label: 'Focus', caption: 'Ideas find their centre.' },
  { id: 2, label: 'Innovation', caption: 'A solution takes shape.' },
  { id: 3, label: 'Forward', caption: 'Infinite possibility, in motion.' },
  { id: 4, label: 'Craton', caption: 'Bold ideas, engineered forward.' },
]
const P = PHASES.length
const SEG = HOLD + TRANS
const CYCLE = SEG * P

/** Brand particle sprites — teal + ember; wordmark follows theme. */
const PALETTES = {
  dark: {
    teal: '110,232,214',
    tealDim: '46,180,160',
    ember: '255,196,140',
    emberDim: '232,160,100',
    glow: '255,230,190',
    haloHot: '255,220,170',
    haloMid: '240,178,122',
    wordMain: '#eef8f4',
    wordSub: '#f0b27a',
    alphaBoost: 1.35,
  },
  light: {
    teal: '11,111,96',
    tealDim: '15,143,123',
    ember: '180,110,55',
    emberDim: '140,90,45',
    glow: '210,140,80',
    haloHot: '200,130,70',
    haloMid: '15,143,123',
    wordMain: '#152821',
    wordSub: '#0b6f60',
    alphaBoost: 1.15,
  },
}

const WM = { w: 1600, h: 667, u: 1600 / 720 }

function mulberry(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]
function lemniscate(t) {
  return [2.5 * Math.cos(t), 1.18 * Math.sin(2 * t), 0.7 * Math.sin(t)]
}
function frameAt(fn, t) {
  const c = fn(t)
  const a = fn(t - 1e-4)
  const b = fn(t + 1e-4)
  const tan = norm([b[0] - a[0], b[1] - a[1], b[2] - a[2]])
  const n = norm(cross(tan, [0, 0, 1]))
  const bn = norm(cross(tan, n))
  return { c, n, b: bn }
}

function bulbR(y) {
  if (y > 1.4) return 0
  if (y >= -0.35) return Math.sqrt(Math.max(0, 1 - (y - 0.4) * (y - 0.4)))
  if (y >= -0.78) {
    const k = (y + 0.78) / 0.43
    return 0.43 + 0.23 * k * k
  }
  if (y >= -1.22) return 0.43 + 0.035 * Math.sin((y + 0.78) * 38)
  if (y >= -1.45) {
    const k = (y + 1.45) / 0.23
    return 0.17 + 0.26 * Math.sqrt(k)
  }
  return 0
}

function buildShapes(N, seed) {
  const R = mulberry(seed)
  const C = Math.round(N * 0.13)
  const swarm = new Float32Array(N * 3)
  const sphere = new Float32Array(N * 3)
  const bulb = new Float32Array(N * 3)
  const loop = new Float32Array(N * 3)
  const jit = new Float32Array(N * 3)

  for (let i = 0; i < N; i++) {
    const k = i * 3
    const copper = i < C

    {
      const u = R()
      const v = R()
      const w = R()
      const r = Math.cbrt(u) * 1.05
      const th = v * TAU
      const ph = Math.acos(2 * w - 1)
      swarm[k] = 2.7 * r * Math.sin(ph) * Math.cos(th)
      swarm[k + 1] = 1.55 * r * Math.sin(ph) * Math.sin(th)
      swarm[k + 2] = 1.3 * r * Math.cos(ph)
    }
    jit[k] = R() * TAU
    jit[k + 1] = R() * TAU
    jit[k + 2] = 0.4 + R() * 0.8

    {
      const n = copper ? C : N - C
      const j = copper ? i : i - C
      const y = 1 - ((j + 0.5) / n) * 2
      const r = Math.sqrt(1 - y * y)
      const ph = j * 2.399963
      const rad = copper ? 0.42 : 1.42
      sphere[k] = rad * r * Math.cos(ph)
      sphere[k + 1] = rad * y
      sphere[k + 2] = rad * r * Math.sin(ph)
    }

    if (copper) {
      const t = R()
      let x
      let y
      let z
      if (t < 0.28) {
        const side = t < 0.14 ? -1 : 1
        const s = R()
        x = side * 0.3
        y = -0.5 + s * 0.75
        z = (R() - 0.5) * 0.06
      } else {
        const s = R()
        x = -0.3 + 0.6 * s
        y = 0.23 + 0.14 * Math.sin(s * Math.PI * 8)
        z = 0.05 * Math.cos(s * Math.PI * 8)
      }
      bulb[k] = x * 1.15
      bulb[k + 1] = y * 1.15
      bulb[k + 2] = z * 1.15
    } else {
      let y
      let r
      for (let tries = 0; tries < 40; tries++) {
        y = -1.45 + R() * 2.85
        r = bulbR(y)
        if (R() * 1.0 < r) break
      }
      const ph = R() * TAU
      bulb[k] = r * Math.cos(ph) * 1.15
      bulb[k + 1] = y * 1.15
      bulb[k + 2] = r * Math.sin(ph) * 1.15
    }

    {
      const t = R() * TAU
      const f = frameAt(lemniscate, t)
      const ph = copper ? -1.6 + (R() - 0.5) * 0.22 : R() * TAU
      const rad =
        0.3 + 0.055 * Math.cos(t * 2 + 0.5) + (copper ? 0.012 : 0)
      loop[k] =
        f.c[0] + (f.n[0] * Math.cos(ph) + f.b[0] * Math.sin(ph)) * rad
      loop[k + 1] =
        f.c[1] + (f.n[1] * Math.cos(ph) + f.b[1] * Math.sin(ph)) * rad
      loop[k + 2] =
        f.c[2] + (f.n[2] * Math.cos(ph) + f.b[2] * Math.sin(ph)) * rad
    }
  }

  return { shapes: [swarm, sphere, bulb, loop], jit, C }
}

function textCanvas(font, ls, text, y, color) {
  const c = document.createElement('canvas')
  c.width = WM.w
  c.height = WM.h
  const x = c.getContext('2d', { willReadFrequently: true })
  x.fillStyle = color
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.font = font
  try {
    x.letterSpacing = ls
  } catch {
    /* letterSpacing unsupported */
  }
  x.fillText(text, WM.w / 2, y)
  return c
}

function buildWordmark(N, C, seed, out, colors) {
  const R = mulberry(seed)
  const u = WM.u
  const main = textCanvas(
    `600 ${172 * u}px "Plus Jakarta Sans",system-ui,sans-serif`,
    `${-10 * u}px`,
    'craton',
    128 * u,
    colors.wordMain,
  )
  const sub = textCanvas(
    `500 ${34 * u}px "JetBrains Mono",ui-monospace,monospace`,
    `${11 * u}px`,
    'TECHNOLOGIES',
    258 * u,
    colors.wordSub,
  )
  const ink = (cv) => {
    const d = cv.getContext('2d').getImageData(0, 0, WM.w, WM.h).data
    const pts = []
    for (let i = 3; i < d.length; i += 4) if (d[i] > 140) pts.push(i >> 2)
    return pts
  }
  const pm = ink(main)
  const ps = ink(sub)
  const put = (k, px) => {
    const x = (px % WM.w) + R()
    const y = Math.floor(px / WM.w) + R()
    out[k] = ((x - WM.w / 2) / WM.w) * 5.4
    out[k + 1] = (-(y - WM.h / 2) / WM.w) * 5.4 + 0.1
    out[k + 2] = (R() - 0.5) * 0.03
  }
  for (let i = 0; i < N; i++) {
    const k = i * 3
    const src = i < C ? ps : pm
    if (src.length) put(k, src[Math.floor(R() * src.length)])
  }
  return { main, sub }
}

function makeSprite(rgb) {
  const s = document.createElement('canvas')
  s.width = s.height = 48
  const c = s.getContext('2d')
  const g = c.createRadialGradient(20, 18, 2, 24, 24, 24)
  g.addColorStop(0, `rgba(${rgb},1)`)
  g.addColorStop(0.45, `rgba(${rgb},.85)`)
  g.addColorStop(1, `rgba(${rgb},0)`)
  c.fillStyle = g
  c.fillRect(0, 0, 48, 48)
  return s
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

/**
 * Client-HTML particle morph (Ideas→Focus→Innovation→Forward→Craton)
 * with Craton teal + ember sprites on a transparent canvas.
 */
export default function ParticleSculpture({
  className,
  canvasClassName,
  controlsClassName,
  showControls = true,
  compact = false,
  /** Larger projection + denser particles for full-bleed hero stages. */
  heroScale = false,
  themeMode = 'dark',
}) {
  const wrapRef = useRef(null)
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const apiRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)
  const colors = PALETTES[themeMode] || PALETTES.dark

  useEffect(() => {
    setPaused(reduced)
  }, [reduced])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = hostRef.current
    const wrap = wrapRef.current
    if (!canvas || !host || !wrap) return undefined

    let ctx
    try {
      ctx = canvas.getContext('2d', { alpha: true })
    } catch {
      ctx = null
    }
    if (!ctx) return undefined

    setReady(false)
    const COLORS = colors
    const alphaBoost = COLORS.alphaBoost || 1
    // Hero uses solid HTML brand — never build/draw particle wordmark (phase 4) or solid letter sprites
    const phaseCount = heroScale ? 4 : P
    const cycleLen = SEG * phaseCount
    const mobile = window.matchMedia('(max-width: 900px)').matches
    const N = heroScale
      ? mobile
        ? 2000
        : 3400
      : mobile
        ? 1500
        : 2800
    const { shapes, jit, C } = buildShapes(N, 3)
    // Only allocate wordmark target shape outside hero (phases 0–3 only when heroScale)
    if (!heroScale) shapes.push(new Float32Array(N * 3))
    let wm = { main: null, sub: null }
    if (!heroScale) {
      wm = buildWordmark(N, C, 9, shapes[4], COLORS)
      if (document.fonts?.ready) {
        document.fonts.ready
          .then(() => {
            wm = buildWordmark(N, C, 9, shapes[4], COLORS)
          })
          .catch(() => {})
      }
    }

    const stag = new Float32Array(N)
    {
      const R = mulberry(5)
      for (let i = 0; i < N; i++) stag[i] = R()
    }

    let W = 0
    let H = 0
    let dpr = 1
    let time = 0
    let last = 0
    let curPhase = 0
    let rotY = -0.35
    let shine = 0
    let solid = 0
    let textK = 0
    let raf = 0
    let runningPaused = reduced
    let onScreen = true
    const fil = [0, 0, 1, 1]
    const pos = new Float32Array(N * 3)
    const depth = new Float32Array(N)
    const order = new Int32Array(N)
    for (let i = 0; i < N; i++) order[i] = i

    const spTeal = makeSprite(COLORS.teal)
    const spTealDim = makeSprite(COLORS.tealDim)
    const spEmber = makeSprite(COLORS.ember)
    const spEmberDim = makeSprite(COLORS.emberDim)
    const spGlow = makeSprite(COLORS.glow)

    const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x))

    const notifyPhase = (id) => {
      if (id === curPhase) return
      curPhase = id
      setPhase(id)
    }

    function resize() {
      const r = host.getBoundingClientRect()
      W = Math.max(1, r.width)
      H = Math.max(1, r.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function compute(t) {
      const cyc = ((t % cycleLen) + cycleLen) % cycleLen
      const seg = Math.floor(cyc / SEG)
      const local = cyc - seg * SEG
      const from = seg
      const to = (seg + 1) % phaseCount
      const p = local < HOLD ? 0 : (local - HOLD) / TRANS
      if (p > 0.5) notifyPhase(to)
      else notifyPhase(from)

      const A = shapes[from]
      const B = shapes[to]
      const wOf = (n) =>
        (from === n ? 1 - ease(p) : 0) + (to === n ? ease(p) : 0)
      const swarmW = wOf(0)
      const bulbW = wOf(2)
      const textW = heroScale ? 0 : wOf(4)
      solid = Math.max(0, Math.min(1, (textW - 0.55) / 0.45))
      solid = solid * solid * (3 - 2 * solid)
      textK = textW
      shine = Math.max(0, Math.min(1, (bulbW - 0.72) / 0.28))
      shine =
        shine *
        shine *
        (3 - 2 * shine) *
        (0.8 + 0.2 * Math.sin(t * 3.1) + 0.06 * Math.sin(t * 17))

      const ry = rotY * (1 - textW)
      const cy = Math.cos(ry)
      const sy = Math.sin(ry)
      const tilt = -0.16 * (1 - textW)
      const cx = Math.cos(tilt)
      const sx = Math.sin(tilt)
      const D = 7.2
      // Hero: centered morph that fits the stage (no bottom cut-off)
      const f = heroScale
        ? Math.min(W / 5.6, H / 3.4) * D
        : Math.min(W / 7.4, H / 4.1) * D
      const yBias = heroScale ? 0 : H * 0.02

      for (let i = 0; i < N; i++) {
        const k = i * 3
        const e = ease((p - stag[i] * 0.45) / 0.55)
        const arc = Math.sin(e * Math.PI) * 0.5
        let x = A[k] + (B[k] - A[k]) * e + Math.cos(jit[k]) * arc * 0.5
        let y =
          A[k + 1] + (B[k + 1] - A[k + 1]) * e + Math.sin(jit[k + 1]) * arc * 0.35
        let z =
          A[k + 2] +
          (B[k + 2] - A[k + 2]) * e +
          Math.sin(jit[k] + jit[k + 1]) * arc * 0.5
        if (swarmW > 0) {
          const a = jit[k + 2] * swarmW * 0.28
          x += Math.sin(t * jit[k + 2] * 1.7 + jit[k]) * a
          y += Math.cos(t * jit[k + 2] * 1.3 + jit[k + 1]) * a
          z += Math.sin(t * jit[k + 2] * 1.1 + jit[k] * 2) * a
        }
        const x1 = x * cy + z * sy
        const z1 = -x * sy + z * cy
        const y2 = y * cx - z1 * sx
        const z2 = y * sx + z1 * cx
        const s = f / (D - z2)
        pos[k] = W * 0.5 + x1 * s
        pos[k + 1] = H * 0.5 - y2 * s + yBias
        pos[k + 2] = s
        depth[i] = z2
      }
      order.sort((a, b) => depth[a] - depth[b])
      {
        const y = 0.26 * 1.15
        const y2 = y * cx
        const z2 = y * sx
        const s = f / (D - z2)
        fil[0] = W * 0.5
        fil[1] = H * 0.5 - y2 * s + yBias
        fil[2] = s
        fil[3] = f / D
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const base = heroScale
        ? mobile
          ? 0.032
          : 0.028
        : mobile
          ? 0.021
          : 0.017
      if (shine > 0.01) {
        const r = fil[2] * 1.3
        const g = ctx.createRadialGradient(fil[0], fil[1], 0, fil[0], fil[1], r)
        g.addColorStop(0, `rgba(${COLORS.haloHot},${0.55 * shine})`)
        g.addColorStop(0.3, `rgba(${COLORS.haloMid},${0.24 * shine})`)
        g.addColorStop(1, 'rgba(15,143,123,0)')
        ctx.fillStyle = g
        ctx.fillRect(fil[0] - r, fil[1] - r, r * 2, r * 2)
      }
      for (let n = 0; n < N; n++) {
        const i = order[n]
        const k = i * 3
        const d = (depth[i] + 2.2) / 4.4
        const ember = i < C
        let sz =
          Math.max(1.25, base * pos[k + 2] * (0.75 + d * 0.65)) *
          (1 - 0.35 * textK)
        if (ember && shine > 0.01) {
          sz *= 1 + 0.8 * shine
          ctx.globalAlpha = Math.min(
            1,
            (0.55 + d * 0.45 + shine * 0.5) * alphaBoost,
          )
          ctx.drawImage(
            spGlow,
            pos[k] - sz * 1.8,
            pos[k + 1] - sz * 1.8,
            sz * 3.6,
            sz * 3.6,
          )
          ctx.drawImage(spGlow, pos[k] - sz, pos[k + 1] - sz, sz * 2, sz * 2)
          continue
        }
        if (!ember && shine > 0.01) {
          ctx.globalAlpha = Math.min(
            1,
            (0.4 + d * 0.65 + shine * 0.18) * alphaBoost,
          )
        } else {
          ctx.globalAlpha = Math.min(
            1,
            (0.42 + d * 0.65 + textK * 0.45) * alphaBoost,
          )
        }
        ctx.drawImage(
          ember
            ? d > 0.45
              ? spEmber
              : spEmberDim
            : d > 0.45
              ? spTeal
              : spTealDim,
          pos[k] - sz,
          pos[k + 1] - sz,
          sz * 2,
          sz * 2,
        )
      }
      if (solid > 0.01 && wm.main && wm.sub) {
        const s = fil[3]
        const kx = (s * 5.4) / WM.w
        const dw = WM.w * kx
        const dh = WM.h * kx
        const dx = W * 0.5 - dw * 0.5
        const dy = H * 0.5 + H * 0.02 - 0.1 * s - (WM.h / 2) * kx
        ctx.globalAlpha = solid * 0.96
        ctx.drawImage(wm.main, dx, dy, dw, dh)
        ctx.drawImage(wm.sub, dx, dy, dw, dh)
      }
      ctx.globalAlpha = 1
    }

    function tick(now) {
      if (!last) last = now
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!runningPaused) time += dt
      rotY = -0.3 + 0.55 * Math.sin(time * 0.21)
      compute(time)
      draw()
      raf = runningPaused ? 0 : requestAnimationFrame(tick)
    }

    function start() {
      if (!raf && onScreen && !runningPaused) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }

    function stop() {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    function jumpToPhase(k, forceStill) {
      const id = ((k % phaseCount) + phaseCount) % phaseCount
      time =
        ((id + phaseCount - 1) % phaseCount) * SEG +
        HOLD +
        (forceStill ? TRANS : TRANS * 0.5)
      curPhase = id
      setPhase(id)
      if (forceStill || runningPaused) {
        compute(time)
        draw()
      } else start()
    }

    function setPausedState(next) {
      runningPaused = next
      setPaused(next)
      if (next) {
        stop()
        compute(time)
        draw()
      } else start()
    }

    apiRef.current = {
      jumpToPhase,
      setPausedState,
      getPaused: () => runningPaused,
    }

    resize()
    const onResize = () => {
      resize()
      compute(time)
      draw()
    }
    window.addEventListener('resize', onResize)

    if (reduced) {
      time = 3 * SEG
      rotY = -0.35
      compute(time)
      draw()
    } else {
      compute(0)
      draw()
      start()
    }
    setReady(true)

    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            onScreen = en.isIntersecting
            if (en.isIntersecting) {
              if (!runningPaused) start()
            } else stop()
          })
        },
        { threshold: 0.02 },
      )
      io.observe(wrap)
    }

    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      io?.disconnect()
      apiRef.current = null
    }
  }, [reduced, colors, heroScale, themeMode])

  const goPhase = (k) => {
    apiRef.current?.jumpToPhase(k, reduced || paused)
  }

  const togglePause = () => {
    apiRef.current?.setPausedState(!paused)
  }

  const active = PHASES[phase]

  return (
    <div
      ref={wrapRef}
      className={cn('relative h-full w-full', className)}
      aria-hidden={!showControls}
    >
      <div
        ref={hostRef}
        className={cn('absolute inset-0', canvasClassName)}
      >
        {/* Depth veil behind particles so morph reads on busy photo */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-[6%] z-0 rounded-[40%] blur-3xl',
            themeMode === 'light'
              ? 'bg-[radial-gradient(ellipse_at_center,rgba(244,247,245,0.4),transparent_70%)]'
              : 'bg-[radial-gradient(ellipse_at_center,rgba(10,20,18,0.5),transparent_72%)]',
          )}
        />
        <canvas
          ref={canvasRef}
          className={cn(
            'absolute inset-0 z-[1] block h-full w-full transition-opacity duration-700',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>

      {showControls ? (
        <div
          className={cn(
            'pointer-events-auto absolute z-10',
            compact
              ? 'inset-x-0 bottom-0 px-1 pb-0'
              : 'inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4',
            controlsClassName,
          )}
          role="group"
          aria-label="Hero sculpture phases"
        >
          {compact ? (
            <div className="flex items-center justify-center gap-2 opacity-70">
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  data-phase={p.id}
                  aria-label={`${p.label}: ${p.caption}`}
                  aria-pressed={phase === p.id}
                  onClick={() => goPhase(p.id)}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition',
                    phase === p.id
                      ? 'scale-125 bg-accent'
                      : 'bg-cream/25 hover:bg-cream/45',
                  )}
                />
              ))}
              <button
                type="button"
                onClick={togglePause}
                aria-pressed={paused}
                aria-label={
                  paused
                    ? 'Play decorative animation'
                    : 'Pause decorative animation'
                }
                className="ml-2 text-[10px] text-muted transition hover:text-cream"
              >
                {paused ? 'Play' : 'Pause'}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <p className="serif text-[13px] text-cream/70 sm:text-[14px]">
                  {active.caption}
                </p>
                <span className="font-mono text-[8px] tracking-[0.14em] text-[var(--ember)]">
                  0{phase + 1} / 05
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                {PHASES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    data-phase={p.id}
                    aria-pressed={phase === p.id}
                    onClick={() => goPhase(p.id)}
                    className={cn(
                      'relative flex min-h-8 flex-col gap-0.5 border-t border-line pt-1.5 text-left text-[9px] text-muted transition hover:text-cream sm:min-h-9 sm:text-[10px]',
                      phase === p.id && 'text-cream',
                    )}
                  >
                    {phase === p.id ? (
                      <span
                        key={`hold-${p.id}-${paused}`}
                        className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-100 bg-accent"
                        style={
                          !paused && !reduced
                            ? {
                                animation: `craton-phase-hold ${HOLD}s linear forwards`,
                              }
                            : { transform: 'scaleX(1)' }
                        }
                      />
                    ) : (
                      <span className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-accent" />
                    )}
                    <span className="font-mono text-[7.5px] tracking-[0.12em] text-muted">
                      0{p.id + 1}
                    </span>
                    {p.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={togglePause}
                aria-pressed={paused}
                aria-label={
                  paused
                    ? 'Play decorative animation'
                    : 'Pause decorative animation'
                }
                className="mt-1.5 inline-flex items-center gap-2 text-[10px] text-muted transition hover:text-cream"
              >
                <span className="inline-flex gap-[3px]" aria-hidden>
                  <i className="block h-2 w-[1.5px] bg-current" />
                  <i className="block h-2 w-[1.5px] bg-current" />
                </span>
                {paused ? 'Play motion' : 'Pause motion'}
              </button>
            </>
          )}
          <p className="sr-only">
            A field of scattered points gathers into a sphere, takes the shape
            of a light bulb whose filament lights up, opens into an infinity
            loop, and settles into the Craton Technologies wordmark. The
            animation is decorative; all information is in the page text.
          </p>
        </div>
      ) : (
        <p className="sr-only">
          {heroScale
            ? 'Decorative particle sculpture morphing through ideas, focus, innovation, and forward motion behind the headline.'
            : 'Decorative particle sculpture morphing through ideas, focus, innovation, and the Craton wordmark.'}
        </p>
      )}
    </div>
  )
}
