import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Full-bleed sheets behind the headline. Built with three — no model file.
 */
export default function FileSheets({ reduced }) {
  const host = useRef(null)

  useEffect(() => {
    const el = host.current
    if (!el) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40)
    camera.position.set(0, 0.1, 9)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const narrow = () => el.clientWidth < 1024
    const isDark = () => document.documentElement.dataset.mode === 'dark'

    const sheetGeo = new THREE.PlaneGeometry(4.6, 6.2)
    const sheets = []
    const build = () => {
      sheets.forEach((mesh) => {
        scene.remove(mesh)
        mesh.material.dispose()
      })
      sheets.length = 0
      const count = narrow() ? 4 : 6
      for (let i = 0; i < count; i += 1) {
        const mat = new THREE.MeshBasicMaterial({
          color: isDark() ? 0x163044 : 0xb4c0cb,
          transparent: true,
          opacity: isDark() ? 0.78 : 0.62,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
        const mesh = new THREE.Mesh(sheetGeo, mat)
        const spread = count === 4 ? 1.7 : 1.45
        mesh.position.set((i - (count - 1) / 2) * spread, i % 2 === 0 ? -0.15 : 0.28, -i * 0.42)
        mesh.rotation.set(-0.12, (i - count / 2) * 0.22, (i % 2 === 0 ? -1 : 1) * 0.04)
        mesh.userData.spin = (i % 2 === 0 ? 1 : -1) * 0.0016
        mesh.userData.baseY = mesh.position.y
        scene.add(mesh)
        sheets.push(mesh)
      }
    }
    build()

    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 6.8, 0.02),
      new THREE.MeshBasicMaterial({
        color: 0x00a8c4,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      }),
    )
    edge.position.set(-5, 0, 0.6)
    scene.add(edge)

    const paintTheme = () => {
      const dark = isDark()
      sheets.forEach((mesh) => {
        mesh.material.color.set(dark ? 0x1a3a52 : 0xa8b6c2)
        mesh.material.opacity = dark ? 0.8 : 0.7
      })
    }
    paintTheme()

    let visible = true
    let raf = 0
    const started = performance.now()

    const resize = () => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    const frame = (now) => {
      raf = 0
      if (document.hidden || !visible) return
      const t = (now - started) / 1000
      if (!reduced) {
        sheets.forEach((mesh, i) => {
          mesh.rotation.y += mesh.userData.spin
          mesh.position.y = mesh.userData.baseY + Math.sin(t * 0.7 + i) * 0.08
        })
        const sweep = (t % 6) / 6
        edge.position.x = -5.2 + sweep * 10.4
      }
      paintTheme()
      renderer.render(scene, camera)
      kick()
    }

    const kick = () => {
      if (raf || document.hidden || !visible) return
      raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      kick()
    })
    io.observe(el)

    const onPage = () => kick()
    document.addEventListener('visibilitychange', onPage)

    const ro = new ResizeObserver(() => {
      const wasNarrow = sheets.length <= 4
      resize()
      if (wasNarrow !== narrow()) build()
      paintTheme()
      if (reduced) renderer.render(scene, camera)
    })
    ro.observe(el)

    if (reduced) renderer.render(scene, camera)
    else kick()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onPage)
      sheetGeo.dispose()
      edge.geometry.dispose()
      edge.material.dispose()
      sheets.forEach((mesh) => mesh.material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [reduced])

  return <div ref={host} className="pointer-events-none absolute inset-0 z-0" aria-hidden />
}
