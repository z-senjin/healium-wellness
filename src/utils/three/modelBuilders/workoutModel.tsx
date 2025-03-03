
import React from 'react';

export function WorkoutModel() {
  return (
    <group rotation={[-Math.PI / 12, 0, 0]}>
      {/* Yoga mat base */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.05, 1.5]} />
        <meshPhongMaterial color={0xE5DEFF} />
      </mesh>
      
      {/* Dumbbell 1 */}
      <group>
        {/* Handle */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
          <meshPhongMaterial 
            color={0x8E9196}
            metalness={0.8}
            shininess={100}
          />
        </mesh>
        
        {/* Weight 1 */}
        <mesh position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.25, 24]} />
          <meshPhongMaterial 
            color={0x23978F}
            shininess={60}
          />
        </mesh>
        
        {/* Weight 2 */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.25, 24]} />
          <meshPhongMaterial 
            color={0x23978F}
            shininess={60}
          />
        </mesh>
      </group>
      
      {/* Dumbbell 2 */}
      <group>
        {/* Handle */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
          <meshPhongMaterial 
            color={0x8E9196}
            metalness={0.8}
            shininess={100}
          />
        </mesh>
        
        {/* Weight 1 */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.25, 24]} />
          <meshPhongMaterial 
            color={0xE18B7B}
            shininess={60}
          />
        </mesh>
        
        {/* Weight 2 */}
        <mesh position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.25, 24]} />
          <meshPhongMaterial 
            color={0xE18B7B}
            shininess={60}
          />
        </mesh>
      </group>
      
      {/* Fitness tracker */}
      <group position={[0, -0.8, 0.3]} castShadow>
        <mesh>
          <boxGeometry args={[0.5, 0.12, 0.7]} />
          <meshPhongMaterial 
            color={0x129C75}
            shininess={100}
          />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshPhongMaterial 
            color={0x0E3331}
            emissive={0x23978F}
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}
