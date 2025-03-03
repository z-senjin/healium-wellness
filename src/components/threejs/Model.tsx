import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const groupRef = useRef()
  const loader = useGLTF('/models/hamburger.glb') // Use useGLTF instead of useLoader
    console.log(loader);
  return (
    <group ref={groupRef} {...props}>
      <primitive object={loader.scene} />
    </group>

  )
}

// Preload the model for better performance
useGLTF.preload("/models/hamburger.glb")
