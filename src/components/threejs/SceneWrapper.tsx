import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model' // Import your Model component

export default function SceneWrapper() {
  return (
    <Canvas camera={{ position: [0, 5, 7], fov: 1 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />
      <Model position={[0, 0, 0]} scale={1} />
    </Canvas>
  )
}
