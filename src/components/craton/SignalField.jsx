import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * One slow cyan light across a navy field. The band crosses in about
 * seven seconds so the motion is readable in the first two seconds.
 * It stays soft so the headline stays the subject.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;
    float cycle = 7.0;
    float travel = fract(uTime / cycle);
    float x = uv.x * 1.35 - 0.18;
    float band = exp(-pow((x - travel) * 2.4, 2.0));
    float lift = smoothstep(0.0, 0.22, uv.y) * smoothstep(1.0, 0.38, uv.y);
    float horizon = exp(-pow((uv.y - 0.34) * 2.6, 2.0));

    vec3 deep = vec3(0.027, 0.055, 0.078);
    vec3 navy = vec3(0.055, 0.102, 0.141);
    vec3 slate = vec3(0.118, 0.165, 0.227);
    vec3 cyan = vec3(0.0, 0.659, 0.769);

    float vignette = smoothstep(1.15, 0.25, length((uv - vec2(0.5, 0.46)) * vec2(1.15, 1.0)));
    vec3 col = mix(deep, navy, vignette);
    col = mix(col, slate, horizon * 0.22);
    col += cyan * band * lift * 0.38;
    col += cyan * horizon * 0.035;

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function SignalField({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active) return undefined

    const narrow = window.matchMedia('(max-width: 1023px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const still = narrow || reduced

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = { uTime: { value: still ? 2.4 : 0 } }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    const fit = () => {
      const host = canvas.parentElement
      const w = host?.clientWidth || window.innerWidth
      const h = host?.clientHeight || window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(w, h, false)
    }
    fit()

    let raf = 0
    let running = false
    let onScreen = true
    let visible = document.visibilityState !== 'hidden'
    const clock = new THREE.Clock()

    const frame = () => {
      renderer.render(scene, camera)
    }

    const tick = () => {
      raf = 0
      if (!running) return
      uniforms.uTime.value += clock.getDelta()
      frame()
      if (onScreen && visible) raf = requestAnimationFrame(tick)
    }

    const sync = () => {
      const should = onScreen && visible && !still
      if (should && !running) {
        running = true
        clock.getDelta()
        raf = requestAnimationFrame(tick)
      } else if (!should && running) {
        running = false
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const host = canvas.parentElement
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0.05 },
    )
    if (host) io.observe(host)
    const onVis = () => {
      visible = document.visibilityState !== 'hidden'
      sync()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('resize', fit)

    if (still) {
      fit()
      frame()
    } else {
      sync()
    }

    return () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', fit)
      mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
