
import React from 'react';
import * as THREE from 'three';

export function MealModel() {
  return (
    <group rotation={[-Math.PI / 12, 0, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshPhongMaterial 
          color={0x129C75} 
          shininess={100} 
          specular={new THREE.Color(0x333333)} 
        />
      </mesh>
      
      {/* Modern plate */}
      <mesh receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.08, 32]} />
        <meshPhongMaterial 
          color={0xFEF7CD} 
          shininess={80}
          specular={new THREE.Color(0xffffff)} 
        />
      </mesh>
      
      {/* Food item 1 */}
      <mesh position={[0.5, 0.2, 0.3]} castShadow>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshPhongMaterial color={0xE18B7B} />
      </mesh>
      
      {/* Food item 2 */}
      <mesh position={[-0.4, 0.15, 0.4]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshPhongMaterial color={0x23978F} />
      </mesh>
      
      {/* Food item 3 */}
      <mesh position={[0, 0.3, -0.5]} castShadow>
        <coneGeometry args={[0.2, 0.5, 16]} />
        <meshPhongMaterial color={0xF2D669} />
      </mesh>
      
      {/* Food item 4 */}
      <mesh position={[-0.6, 0.1, -0.2]} castShadow>
        <torusGeometry args={[0.15, 0.05, 16, 32]} />
        <meshPhongMaterial color={0xD6BCFA} />
      </mesh>
      
      {/* Food item 5 */}
      <mesh position={[0.7, 0.15, -0.3]} castShadow>
        <dodecahedronGeometry args={[0.15]} />
        <meshPhongMaterial color={0xE5DEFF} />
      </mesh>
      
      {/* Fork */}
      <mesh 
        position={[1.1, 0.05, 0.5]} 
        rotation={[0, Math.PI / 6, Math.PI / 2]} 
        castShadow
      >
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshPhongMaterial 
          color={0x8E9196}
          metalness={0.8}
          shininess={100}
        />
      </mesh>
    </group>
  );
}
