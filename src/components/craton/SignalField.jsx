import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

/**
 * Faceted technical core for the hero.
 * Remote model: Khronos 2CylinderEngine (CC0, ~1.8MB).
 * A local torus knot stays in the scene until that file loads, and stays
 * if the request 404s, so the hero is never an empty wash.
 */
const MODEL_URL =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Binary/2CylinderEngine.glb'

function isLightMode() {
  return document.documentElement.dataset.mode !== 'dark'
}

function makeCore() {
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.92, 0.28, 160, 18, 2, 3),
  )
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.035, 12, 80))
  ring.rotation.x = Math.PI / 2.4
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1))
  const group = new THREE.Group()
  group.add(knot, ring, core)
  group.userData.fallback = true
  return group
}

function fitObject(object, target = 2.35) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  object.position.sub(center)
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  object.scale.setScalar(target / maxDim)
}

export default function SignalField({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active) return undefined

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrowQuery = window.matchMedia('(max-width: 1023px)')
    let reduced = reducedQuery.matches
    let narrow = narrowQuery.matches

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40)
    camera.position.set(0, 0.15, 6.2)

    const solid = new THREE.MeshStandardMaterial({
      color: 0x152433,
      metalness: 0.62,
      roughness: 0.28,
    })
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xb8fbff,
      metalness: 0.04,
      roughness: 0.06,
      transmission: 0.78,
      thickness: 0.55,
      ior: 1.45,
      transparent: true,
      opacity: 0.94,
      emissive: 0x00a8c4,
      emissiveIntensity: 0.22,
    })

    const key = new THREE.DirectionalLight(0xfff6ea, 1.35)
    key.position.set(3.2, 4.2, 5)
    const rim = new THREE.DirectionalLight(0x3df0ff, 6.5)
    rim.position.set(-4.5, 1.2, -3.2)
    const rim2 = new THREE.DirectionalLight(0x00a8c4, 2.4)
    rim2.position.set(2.2, -1.4, -2)
    const ambient = new THREE.AmbientLight(0xd7e6f2, 0.42)
    scene.add(key, rim, rim2, ambient)

    const rig = new THREE.Group()
    const fallback = makeCore()
    rig.add(fallback)
    scene.add(rig)

    const paint = (light) => {
      const material = light ? solid : glass
      rig.traverse((node) => {
        if (node.isMesh) node.material = material
      })
      key.intensity = light ? 1.45 : 0.85
      rim.intensity = light ? 7.2 : 4.2
      rim.color.set(light ? 0x22e6ff : 0x7af6ff)
      rim2.intensity = light ? 2.8 : 1.6
      ambient.intensity = light ? 0.38 : 0.55
      renderer.toneMappingExposure = light ? 1.18 : 1.05
    }
    paint(isLightMode())

    let loaded = null
    const loader = new GLTFLoader()
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (!renderer.domElement.isConnected) return
        const model = gltf.scene
        fitObject(model, narrow ? 1.85 : 2.45)
        loaded = model
        rig.remove(fallback)
        fallback.traverse((node) => {
          if (node.geometry) node.geometry.dispose()
        })
        rig.add(model)
        paint(isLightMode())
        frame()
      },
      undefined,
      () => {
        /* torus knot stays */
      },
    )

    const fit = () => {
      narrow = narrowQuery.matches
      const host = canvas.parentElement
      const w = canvas.clientWidth || host?.clientWidth || 480
      const h = canvas.clientHeight || host?.clientHeight || 640
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.position.z = narrow ? 7.1 : 6.15
      camera.updateProjectionMatrix()
      if (loaded) fitObject(loaded, narrow ? 1.85 : 2.45)
      else rig.scale.setScalar(narrow ? 0.78 : 1)
    }
    fit()

    const pointer = { x: 0, y: 0 }
    const tilt = { x: 0, y: 0 }
    const hero = canvas.closest('section') || canvas.parentElement

    const scrollTurn = () => {
      if (!hero) return 0
      const lenis = window.lenis
      const y = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY || 0
      const top = hero.offsetTop || 0
      const height = hero.offsetHeight || window.innerHeight
      const progress = Math.min(Math.max((y - top) / height, 0), 1)
      return progress * Math.PI * 2
    }

    let raf = 0
    let running = false
    let onScreen = true
    let visible = document.visibilityState !== 'hidden'

    const frame = () => {
      if (!reduced) {
        tilt.y += (pointer.x * 0.42 - tilt.y) * 0.07
        tilt.x += (pointer.y * 0.28 - tilt.x) * 0.07
        rig.rotation.y = scrollTurn() + tilt.y
        rig.rotation.x = tilt.x
      } else {
        rig.rotation.set(0.15, 0.45, 0)
      }
      renderer.render(scene, camera)
      canvas.dataset.drew = `${renderer.info.render.calls}:${rig.children.length}:${camera.position.z.toFixed(1)}`
    }

    const tick = () => {
      raf = 0
      if (!running) return
      frame()
      if (onScreen && visible && !reduced) raf = requestAnimationFrame(tick)
    }

    const sync = () => {
      const should = onScreen && visible && !reduced
      if (should && !running) {
        running = true
        raf = requestAnimationFrame(tick)
      } else if (!should && running) {
        running = false
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      }
      if (!should) frame()
    }

    const onPointer = (event) => {
      if (reduced) return
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const onScroll = () => {
      if (!running) frame()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0.05 },
    )
    if (hero) io.observe(hero)

    const onVis = () => {
      visible = document.visibilityState !== 'hidden'
      sync()
    }

    const onMode = () => {
      paint(isLightMode())
      frame()
    }
    const modeObserver = new MutationObserver(onMode)
    modeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode'],
    })

    const onMotion = () => {
      reduced = reducedQuery.matches
      sync()
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', fit)
    document.addEventListener('visibilitychange', onVis)
    reducedQuery.addEventListener('change', onMotion)
    narrowQuery.addEventListener('change', fit)

    const lenis = window.lenis
    if (lenis?.on) lenis.on('scroll', onScroll)

    sync()

    return () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      modeObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', fit)
      document.removeEventListener('visibilitychange', onVis)
      reducedQuery.removeEventListener('change', onMotion)
      narrowQuery.removeEventListener('change', fit)
      if (lenis?.off) lenis.off('scroll', onScroll)
      fallback.traverse((node) => {
        if (node.geometry) node.geometry.dispose()
      })
      solid.dispose()
      glass.dispose()
      pmrem.dispose()
      scene.environment?.dispose?.()
      renderer.dispose()
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute right-0 top-[8%] z-[1] h-[84%] w-[min(46vw,640px)] max-lg:left-1/2 max-lg:right-auto max-lg:top-auto max-lg:bottom-3 max-lg:h-[30%] max-lg:w-[min(78vw,360px)] max-lg:-translate-x-1/2"
    />
  )
}
