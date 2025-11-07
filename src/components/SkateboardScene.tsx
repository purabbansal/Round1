import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Skateboard } from './Skateboard'
import * as THREE from 'three'

type SkateboardSceneProps = {
  wheelTextureURLs: string[]
  wheelTextureURL: string
  deckTextureURLs: string[]
  deckTextureURL: string
  truckColor: string
  boltColor: string
}

export function SkateboardScene(props: SkateboardSceneProps) {
  const skateboardRef = useRef<THREE.Group>(null)

  // Subtle idle animation
  useFrame(({ clock }) => {
    if (skateboardRef.current) {
      skateboardRef.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.05
      skateboardRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.005
    }
  })

  return (
    <Canvas shadows camera={{ position: [0, 0.5, 2.5], fov: 50 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Suspense fallback={null}>
        <Environment preset="city" background={false} />
        <group ref={skateboardRef}>
          <Skateboard {...props} />
        </group>
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={2.5} blur={1} far={0.5} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3.5} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  )
}
