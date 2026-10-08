'use client'

import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { themes } from '@/config/theme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

/**
 * V7 Labs ParticleFunnel — ported from their Framer/Three.js component.
 * @see https://www.v7labs.com/
 * Source: ParticleFunnel (framerusercontent.com/modules/.../ParticleFunnel.js)
 */

const SEGMENTS = 150
const MAX_TRAIL = 50
const MAX_LINES = 200
const MAX_SIGNALS = 200

/** Tuned to match V7’s live hero (amber signals, charcoal funnel). */
const CONFIG = Object.freeze({
  lineCount: 80,
  signalCount: 90,
  spreadHeight: 30,
  // Screen % where the fan meets. ~59.5% is the open gap just left of the sculpture on a wide desktop.
  convergePointX: 59.5,
  curvePower: 0.82,
  waveSpeed: 2.4,
  waveHeight: 0.15,
  lineOpacity: 0.55,
  speedGlobal: 0.35,
  trailLength: 10,
})

function readCssColor(name) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || themes.light.vars[name]
}

function themeSignalColors() {
  return {
    colorLine: readCssColor('--signal-line'),
    colorSignal: readCssColor('--signal-pulse'),
  }
}

/**
 * Exact V7 path math: fan on the left → converge → flat trunk to the right.
 */
function getPathPoint(t, lineIndex, time, out, cfg, visibleW, lineCount) {
  const cpx = cfg.convergePointX / 100
  const effCurveLen = cpx * visibleW
  const totalLen = visibleW
  const x = -effCurveLen + t * totalLen
  let y = 0
  const spreadFactor = (lineIndex / lineCount - 0.5) * 2

  if (x < 0 && effCurveLen > 0) {
    const ratio = (x + effCurveLen) / effCurveLen
    let shape = (Math.cos(ratio * Math.PI) + 1) / 2
    shape = Math.pow(shape, cfg.curvePower)
    y = spreadFactor * cfg.spreadHeight * shape
    y +=
      Math.sin(time * cfg.waveSpeed + x * 0.1 + lineIndex) *
      cfg.waveHeight *
      shape
  }

  out.set(x, y, 0)
}

/**
 * Same Three.js ParticleFunnel effect V7 uses on their homepage.
 */
export default function SignalFlowBackground({ className }) {
  const containerRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const cfg = { ...CONFIG, ...themeSignalColors() }
    const tempVec = new Vector3()

    let width = container.clientWidth || 800
    let height = container.clientHeight || 400

    const scene = new Scene()
    // Transparent — hero CSS supplies the charcoal base
    const camera = new PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.set(0, 0, 90)

    const fovRad = (45 * Math.PI) / 180
    const cameraZ = 90
    const visibleH = 2 * Math.tan(fovRad / 2) * cameraZ
    let visibleW = visibleH * (width / height)

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    const group = new Group()
    // ~6% of the camera's visible height — fan and pinch move together.
    group.position.y = visibleH * 0.02
    scene.add(group)

    const lineMaterial = new LineBasicMaterial({
      color: new Color(cfg.colorLine),
      transparent: true,
      opacity: cfg.lineOpacity,
    })

    const signalMaterial = new LineBasicMaterial({
      vertexColors: true,
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false,
    })

    const lines = []
    for (let i = 0; i < MAX_LINES; i += 1) {
      const geometry = new BufferGeometry()
      geometry.setAttribute(
        'position',
        new BufferAttribute(new Float32Array(SEGMENTS * 3), 3),
      )
      const line = new Line(geometry, lineMaterial)
      line.visible = i < cfg.lineCount
      group.add(line)
      lines.push(line)
    }

    const signals = []
    for (let i = 0; i < MAX_SIGNALS; i += 1) {
      const geometry = new BufferGeometry()
      geometry.setAttribute(
        'position',
        new BufferAttribute(new Float32Array(MAX_TRAIL * 3), 3),
      )
      geometry.setAttribute(
        'color',
        new BufferAttribute(new Float32Array(MAX_TRAIL * 3), 3),
      )
      const mesh = new Line(geometry, signalMaterial)
      mesh.visible = i < cfg.signalCount
      group.add(mesh)
      signals.push({
        mesh,
        laneIndex: Math.floor(Math.random() * cfg.lineCount),
        speed: 0.2 + Math.random() * 0.5,
        progress: Math.random(),
        historyX: new Float32Array(MAX_TRAIL),
        historyY: new Float32Array(MAX_TRAIL),
        historyIdx: 0,
        color: new Color(cfg.colorSignal),
      })
    }

    const syncThemeColors = () => {
      const next = themeSignalColors()
      cfg.colorLine = next.colorLine
      cfg.colorSignal = next.colorSignal
      lineMaterial.color.set(next.colorLine)
      for (const sig of signals) {
        sig.color.set(next.colorSignal)
      }
    }

    const themeRoot = document.documentElement
    themeRoot.addEventListener('craton:themechange', syncThemeColors)

    let isVisible = true
    let raf = 0
    let startTime = performance.now()

    const paintStatic = () => {
      const time = reducedMotion ? 0 : 0
      const activeLineCount = Math.min(cfg.lineCount, MAX_LINES)
      group.position.x = visibleW * (cfg.convergePointX / 100 - 0.5)

      for (let i = 0; i < MAX_LINES; i += 1) {
        const line = lines[i]
        const active = i < activeLineCount
        line.visible = active
        if (!active) continue
        const positions = line.geometry.attributes.position.array
        for (let j = 0; j < SEGMENTS; j += 1) {
          const t = j / (SEGMENTS - 1)
          getPathPoint(t, i, time, tempVec, cfg, visibleW, activeLineCount)
          positions[j * 3] = tempVec.x
          positions[j * 3 + 1] = tempVec.y
          positions[j * 3 + 2] = tempVec.z
        }
        line.geometry.attributes.position.needsUpdate = true
      }

      // Place signals once along lanes for the static frame
      const activeSignalCount = Math.min(cfg.signalCount, MAX_SIGNALS)
      const trailLen = Math.min(cfg.trailLength, MAX_TRAIL)
      for (let i = 0; i < MAX_SIGNALS; i += 1) {
        const sig = signals[i]
        const active = i < activeSignalCount
        sig.mesh.visible = active
        if (!active) continue
        if (sig.laneIndex >= activeLineCount) {
          sig.laneIndex = Math.floor(Math.random() * activeLineCount)
        }
        getPathPoint(
          sig.progress,
          sig.laneIndex,
          time,
          tempVec,
          cfg,
          visibleW,
          activeLineCount,
        )
        const positions = sig.mesh.geometry.attributes.position.array
        const colors = sig.mesh.geometry.attributes.color.array
        for (let j = 0; j < trailLen; j += 1) {
          positions[j * 3] = tempVec.x - j * 0.15
          positions[j * 3 + 1] = tempVec.y
          positions[j * 3 + 2] = 0
          const alpha = 1 - j / trailLen
          colors[j * 3] = sig.color.r * alpha
          colors[j * 3 + 1] = sig.color.g * alpha
          colors[j * 3 + 2] = sig.color.b * alpha
        }
        sig.mesh.geometry.setDrawRange(0, trailLen)
        sig.mesh.geometry.attributes.position.needsUpdate = true
        sig.mesh.geometry.attributes.color.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isVisible) return

      const time = (performance.now() - startTime) / 1000
      const activeLineCount = Math.min(cfg.lineCount, MAX_LINES)
      group.position.x = visibleW * (cfg.convergePointX / 100 - 0.5)

      for (let i = 0; i < MAX_LINES; i += 1) {
        const line = lines[i]
        const active = i < activeLineCount
        line.visible = active
        if (!active) continue
        const positions = line.geometry.attributes.position.array
        for (let j = 0; j < SEGMENTS; j += 1) {
          const t = j / (SEGMENTS - 1)
          getPathPoint(t, i, time, tempVec, cfg, visibleW, activeLineCount)
          positions[j * 3] = tempVec.x
          positions[j * 3 + 1] = tempVec.y
          positions[j * 3 + 2] = tempVec.z
        }
        line.geometry.attributes.position.needsUpdate = true
      }

      const activeSignalCount = Math.min(cfg.signalCount, MAX_SIGNALS)
      const trailLen = Math.min(cfg.trailLength, MAX_TRAIL)

      for (let i = 0; i < MAX_SIGNALS; i += 1) {
        const sig = signals[i]
        const active = i < activeSignalCount
        sig.mesh.visible = active
        if (!active) continue

        if (sig.laneIndex >= activeLineCount) {
          sig.laneIndex = Math.floor(Math.random() * activeLineCount)
        }

        sig.progress += sig.speed * 0.005 * cfg.speedGlobal
        if (sig.progress > 1) {
          sig.progress = 0
          sig.historyIdx = 0
        }

        getPathPoint(
          sig.progress,
          sig.laneIndex,
          time,
          tempVec,
          cfg,
          visibleW,
          activeLineCount,
        )

        const idx = sig.historyIdx % MAX_TRAIL
        sig.historyX[idx] = tempVec.x
        sig.historyY[idx] = tempVec.y
        sig.historyIdx += 1

        const len = Math.min(sig.historyIdx, trailLen)
        const positions = sig.mesh.geometry.attributes.position.array
        const colors = sig.mesh.geometry.attributes.color.array

        for (let j = 0; j < len; j += 1) {
          const histIdx = (sig.historyIdx - 1 - j + MAX_TRAIL) % MAX_TRAIL
          positions[j * 3] = sig.historyX[histIdx]
          positions[j * 3 + 1] = sig.historyY[histIdx]
          positions[j * 3 + 2] = 0
          const alpha = 1 - j / trailLen
          colors[j * 3] = sig.color.r * alpha
          colors[j * 3 + 1] = sig.color.g * alpha
          colors[j * 3 + 2] = sig.color.b * alpha
        }

        sig.mesh.geometry.setDrawRange(0, len)
        sig.mesh.geometry.attributes.position.needsUpdate = true
        sig.mesh.geometry.attributes.color.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    if (reducedMotion) {
      paintStatic()
    } else {
      animate()
    }

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      width = w
      height = h
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      visibleW = visibleH * (w / h)
      if (reducedMotion) paintStatic()
    })
    resizeObserver.observe(container)

    let inViewport = true
    const syncVisibility = () => {
      isVisible = inViewport && !document.hidden
    }

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        inViewport = entries[0]?.isIntersecting ?? true
        syncVisibility()
      },
      { threshold: 0 },
    )
    visibilityObserver.observe(container)

    const onVisibility = () => syncVisibility()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      themeRoot.removeEventListener('craton:themechange', syncThemeColors)
      lines.forEach((line) => line.geometry.dispose())
      signals.forEach((sig) => sig.mesh.geometry.dispose())
      lineMaterial.dispose()
      signalMaterial.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [reducedMotion])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className,
      )}
    />
  )
}
