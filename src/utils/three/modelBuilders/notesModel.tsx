
import React from 'react';

export function NotesModel() {
  // Create an array for the notebook lines
  const lines = Array.from({ length: 6 }, (_, i) => (
    <mesh 
      key={`line-${i}`} 
      position={[0, 0.06, 0.7 - i * 0.25]} 
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[1.2, 0.01]} />
      <meshBasicMaterial color={0x23978F} />
    </mesh>
  ));
  
  return (
    <group rotation={[-Math.PI / 6, 0, 0]}>
      {/* Desk surface */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.1, 2]} />
        <meshPhongMaterial color={0x23978F} />
      </mesh>
      
      {/* Modern notebook */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshPhongMaterial 
          color={0xFDE1D3}
          shininess={30}
        />
      </mesh>
      
      {/* Notebook lines */}
      {lines}
      
      {/* Pen group */}
      <group position={[0.8, 0.2, -0.4]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        {/* Pen body */}
        <mesh>
          <cylinderGeometry args={[0.04, 0.03, 1, 16]} />
          <meshPhongMaterial 
            color={0xF2D669}
            shininess={80}
          />
        </mesh>
        
        {/* Pen tip */}
        <mesh position={[0, -0.55, 0]}>
          <coneGeometry args={[0.03, 0.1, 16]} />
          <meshPhongMaterial 
            color={0x0E3331}
            shininess={100}
          />
        </mesh>
      </group>
      
      {/* Cup */}
      <mesh position={[-0.8, 0.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 16]} />
        <meshPhongMaterial 
          color={0xE18B7B}
          shininess={50}
        />
      </mesh>
    </group>
  );
}
