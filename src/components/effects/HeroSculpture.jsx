'use client'

import { useEffect, useRef } from 'react'
import { themes } from '@/config/theme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import {
  WM,
  buildShapes,
  buildWordmark,
  mulberry,
} from '@/lib/sculpture/shapes'

/**
 * Faithful port of craton-v2.html hero sculpture:
 * swarm → sphere → bulb → infinity → wordmark (loop).
 */
const HOLD = 2.2
const TRANS = 1.15
const SEG = HOLD + TRANS
const P = 5
const CYCLE = SEG * P
const DEPTH_BUCKETS = 48

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

function ease(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x)
}

function readToken(name) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || themes.light.vars[name]
}

let colorProbe
function rgbChannels(color) {
  if (!colorProbe) {
    const probe = document.createElement('canvas')
    probe.width = probe.height = 1
    colorProbe = probe.getContext('2d', { willReadFrequently: true })
  }
  colorProbe.clearRect(0, 0, 1, 1)
  colorProbe.fillStyle = color
  colorProbe.fillRect(0, 0, 1, 1)
  const [r, g, b] = colorProbe.getImageData(0, 0, 1, 1).data
  return [r, g, b]
}

function mixChannels(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

function channelsToTriplet(rgb) {
  return `${rgb[0]},${rgb[1]},${rgb[2]}`
}

/** Body particles follow hero-soft; accent particles follow copper. */
function readSculpturePalette() {
  const soft = rgbChannels(readToken('--hero-soft'))
  const muted = rgbChannels(readToken('--hero-muted'))
  const copper = rgbChannels(readToken('--copper'))
  const craton = rgbChannels(readToken('--craton'))
  return {
    plat: channelsToTriplet(soft),
    platDim: channelsToTriplet(muted),
    cop: channelsToTriplet(copper),
    copDim: channelsToTriplet(mixChannels(copper, craton, 0.5)),
    glow: channelsToTriplet(mixChannels(copper, soft, 0.4)),
    wordMain: readToken('--hero-soft'),
    wordSub: readToken('--copper'),
  }
}

/**
 * Right-side particle sculpture over the existing hero background.
 */
export default function HeroSculpture({ className }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    let ctx
    try {
      ctx = canvas.getContext('2d', { alpha: true })
    } catch {
      return
    }
    if (!ctx) return

    const mobile = matchMedia('(max-width: 900px)').matches
    // Fewer particles + cheaper depth order = smoother frame pacing
    const N = mobile ? 900 : 2000
    const { shapes: base, jit, C } = buildShapes(N, 3)
    const shapes = [...base, new Float32Array(N * 3)]
    let palette = readSculpturePalette()
    let wm = buildWordmark(N, C, 9, shapes[4], {
      main: palette.wordMain,
      sub: palette.wordSub,
    })

    const rebuildWordmark = () => {
      wm = buildWordmark(N, C, 9, shapes[4], {
        main: palette.wordMain,
        sub: palette.wordSub,
      })
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(rebuildWordmark).catch(() => {})
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
    let rotY = -0.35
    let shine = 0
    let solid = 0
    let textK = 0
    let raf = 0
    let running = false
    const fil = [0, 0, 1, 1]
    const pos = new Float32Array(N * 3)
    const depth = new Float32Array(N)
    const order = new Int32Array(N)
    const bucketHeads = new Int32Array(DEPTH_BUCKETS)
    const bucketNext = new Int32Array(N)
    for (let i = 0; i < N; i++) order[i] = i

    let spPlat = makeSprite(palette.plat)
    let spPlatDim = makeSprite(palette.platDim)
    let spCop = makeSprite(palette.cop)
    let spCopDim = makeSprite(palette.copDim)
    let spGlow = makeSprite(palette.glow)

    function applyThemeColors() {
      palette = readSculpturePalette()
      spPlat = makeSprite(palette.plat)
      spPlatDim = makeSprite(palette.platDim)
      spCop = makeSprite(palette.cop)
      spCopDim = makeSprite(palette.copDim)
      spGlow = makeSprite(palette.glow)
      rebuildWordmark()
    }

    function resize() {
      const r = wrap.getBoundingClientRect()
      const nextW = Math.max(0, r.width)
      const nextH = Math.max(0, r.height)
      if (nextW < 2 || nextH < 2) return false

      W = nextW
      H = nextH
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const bw = Math.round(W * dpr)
      const bh = Math.round(H * dpr)
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return true
    }

    /** O(n) depth order — avoids Array.sort every frame */
    function orderByDepth() {
      bucketHeads.fill(-1)
      for (let i = 0; i < N; i++) {
        const t = (depth[i] + 2.4) / 4.8
        const b = Math.max(
          0,
          Math.min(DEPTH_BUCKETS - 1, (t * DEPTH_BUCKETS) | 0),
        )
        bucketNext[i] = bucketHeads[b]
        bucketHeads[b] = i
      }
      let o = 0
      for (let b = 0; b < DEPTH_BUCKETS; b++) {
        let i = bucketHeads[b]
        while (i !== -1) {
          order[o++] = i
          i = bucketNext[i]
        }
      }
    }

    function compute(t) {
      const cyc = ((t % CYCLE) + CYCLE) % CYCLE
      const seg = Math.floor(cyc / SEG)
      const local = cyc - seg * SEG
      const from = seg
      const to = (seg + 1) % P
      const p = local < HOLD ? 0 : (local - HOLD) / TRANS
      const A = shapes[from]
      const B = shapes[to]
      const wOf = (n) =>
        (from === n ? 1 - ease(p) : 0) + (to === n ? ease(p) : 0)
      const swarmW = wOf(0)
      const bulbW = wOf(2)
      const textW = wOf(4)
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
      const f = Math.min(W / 7.4, H / 4.1) * D

      for (let i = 0; i < N; i++) {
        const k = i * 3
        const e = ease((p - stag[i] * 0.45) / 0.55)
        const arc = Math.sin(e * Math.PI) * 0.5
        let x = A[k] + (B[k] - A[k]) * e + Math.cos(jit[k]) * arc * 0.5
        let y =
          A[k + 1] +
          (B[k + 1] - A[k + 1]) * e +
          Math.sin(jit[k + 1]) * arc * 0.35
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
        pos[k + 1] = H * 0.5 - y2 * s + H * 0.02
        pos[k + 2] = s
        depth[i] = z2
      }

      orderByDepth()

      {
        const y = 0.26 * 1.15
        const y2 = y * cx
        const z2 = y * sx
        const s = f / (D - z2)
        fil[0] = W * 0.5
        fil[1] = H * 0.5 - y2 * s + H * 0.02
        fil[2] = s
        fil[3] = f / D
      }
    }

    function draw() {
      if (W < 2 || H < 2) return
      ctx.clearRect(0, 0, W, H)
      // Slightly larger dots so fewer particles still read as dense
      const base = mobile ? 0.026 : 0.022

      if (shine > 0.01) {
        const r = fil[2] * 1.3
        const g = ctx.createRadialGradient(
          fil[0],
          fil[1],
          0,
          fil[0],
          fil[1],
          r,
        )
        g.addColorStop(0, `rgba(${palette.glow},${0.5 * shine})`)
        g.addColorStop(0.3, `rgba(${palette.cop},${0.2 * shine})`)
        g.addColorStop(1, `rgba(${palette.cop},0)`)
        ctx.fillStyle = g
        ctx.fillRect(fil[0] - r, fil[1] - r, r * 2, r * 2)
      }

      for (let n = 0; n < N; n++) {
        const i = order[n]
        const k = i * 3
        const d = (depth[i] + 2.2) / 4.4
        const cop = i < C
        let sz =
          Math.max(1.1, base * pos[k + 2] * (0.7 + d * 0.6)) *
          (1 - 0.4 * textK)

        if (cop && shine > 0.01) {
          sz *= 1 + 0.8 * shine
          ctx.globalAlpha = Math.min(1, 0.55 + d * 0.45 + shine * 0.5)
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

        if (!cop && shine > 0.01) {
          ctx.globalAlpha = Math.min(1, 0.35 + d * 0.65 + shine * 0.18)
        } else {
          ctx.globalAlpha = Math.min(1, 0.35 + d * 0.65 + textK * 0.45)
        }

        ctx.drawImage(
          cop
            ? d > 0.45
              ? spCop
              : spCopDim
            : d > 0.45
              ? spPlat
              : spPlatDim,
          pos[k] - sz,
          pos[k + 1] - sz,
          sz * 2,
          sz * 2,
        )
      }

      if (solid > 0.01) {
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

    function frame(now) {
      if (!running) return
      if (!last) last = now
      // Cap spikes; scale time so motion stays snappy without hitching
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      time += dt * 1.35
      rotY = -0.3 + 0.55 * Math.sin(time * 0.34)
      if (W >= 2) {
        compute(time)
        draw()
      }
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (running || reduced) return
      running = true
      last = 0
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    function paintStill() {
      if (!resize()) return
      compute(time)
      draw()
    }

    function ensureSizedAndPaint() {
      if (!resize()) return false
      if (reduced) {
        time = 3 * SEG
        rotY = -0.35
        compute(time)
        draw()
      } else if (!running) {
        compute(time)
        draw()
        start()
      } else {
        compute(time)
        draw()
      }
      canvas.style.opacity = '1'
      return true
    }

    /* Wait for real layout — first paint often has 0×0 (caused 1px canvas). */
    const ro = new ResizeObserver(() => {
      ensureSizedAndPaint()
    })
    ro.observe(wrap)

    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              ensureSizedAndPaint()
              if (!reduced) start()
            } else {
              stop()
            }
          })
        },
        { threshold: 0.02 },
      )
      io.observe(wrap)
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ensureSizedAndPaint()
      })
    })

    const onTheme = () => {
      applyThemeColors()
      paintStill()
    }
    const themeRoot = document.documentElement
    themeRoot.addEventListener('craton:themechange', onTheme)

    return () => {
      stop()
      ro.disconnect()
      io?.disconnect()
      themeRoot.removeEventListener('craton:themechange', onTheme)
    }
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn(
        'pointer-events-none absolute z-[2] hidden lg:block',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full opacity-0 transition-opacity duration-[900ms]"
      />
    </div>
  )
}
