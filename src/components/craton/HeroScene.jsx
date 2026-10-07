import { Float, RoundedBox, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function EvidenceCore({ scrollRef }) {
  const group = useRef(null)
  const ring = useRef(null)

  useFrame((state, delta) => {
    const s = scrollRef?.current ?? 0
    if (!group.current) return
    group.current.rotation.y += delta * 0.16 + s * 0.0015
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0.22 + s * 0.5,
      0.06,
    )
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.07
    if (ring.current) {
      ring.current.rotation.z -= delta * 0.22
      ring.current.rotation.x = 0.55 + s * 0.35
    }
  })

  const nodes = useMemo(
    () =>
      [
        [1.35, 0.32, 0.18],
        [-1.15, 0.5, -0.32],
        [0.18, -1.0, 0.65],
        [-0.5, -0.32, 1.1],
        [0.8, 0.85, -0.85],
        [-0.08, 1.1, 0.4],
      ].map((p, i) => ({
        position: p,
        scale: 0.075 + (i % 3) * 0.018,
      })),
    [],
  )

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          {/* Standard material — transmission/physical was a GPU sink */}
          <meshStandardMaterial
            color="#7ed9c8"
            metalness={0.2}
            roughness={0.22}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[0.7, 0.2, 0]}>
        <torusGeometry args={[1.22, 0.018, 8, 32]} />
        <meshStandardMaterial
          color="#0f8f7b"
          emissive="#2bb89f"
          emissiveIntensity={0.35}
          metalness={0.45}
          roughness={0.28}
        />
      </mesh>

      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={node.scale}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial
            color={i % 2 ? '#e09a5f' : '#3ecfba'}
            emissive={i % 2 ? '#e09a5f' : '#0f8f7b'}
            emissiveIntensity={0.42}
            roughness={0.38}
          />
        </mesh>
      ))}

      <Sparkles
        count={12}
        scale={3}
        size={2}
        speed={0.25}
        opacity={0.45}
        color="#a8e6d8"
      />

      <Float speed={1.4} floatIntensity={0.4}>
        <RoundedBox
          args={[0.5, 0.64, 0.07]}
          radius={0.035}
          position={[1.5, -0.12, 0.35]}
          rotation={[0.12, -0.45, 0.08]}
        >
          <meshStandardMaterial
            color="#f4f7f5"
            metalness={0.1}
            roughness={0.4}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
      </Float>
    </group>
  )
}

export default function HeroScene({ scrollRef }) {
  return (
    <Canvas
      dpr={[1, 1.15]}
      frameloop="always"
      camera={{ position: [0, 0.12, 4.15], fov: 38 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={1.05} />
      <EvidenceCore scrollRef={scrollRef} />
    </Canvas>
  )
}
