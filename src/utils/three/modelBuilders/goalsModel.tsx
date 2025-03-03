
import React from 'react';

// Helper component for checklist items
const ChecklistItem = ({ position, checked }: { position: number, checked: boolean }) => (
  <group>
    {/* Checkbox */}
    <mesh position={[-0.5, 0.06, position]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
      <boxGeometry args={[0.15, 0.15, 0.03]} />
      <meshPhongMaterial 
        color={checked ? 0x129C75 : 0xFFFFFF}
        shininess={60}
      />
      
      {checked && (
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshPhongMaterial 
            color={0xFFFFFF}
            emissive={0xFFFFFF}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </mesh>
    
    {/* Text line */}
    <mesh position={[-0.25, 0.06, position]} rotation={[Math.PI, 0, 0]}>
      <planeGeometry args={[0.8, 0.1]} />
      <meshBasicMaterial 
        color={0x0E3331}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  </group>
);

export function GoalsModel() {
  return (
    <group rotation={[-Math.PI / 6, 0, 0]}>
      {/* Base board */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <boxGeometry args={[2, 0.1, 2.5]} />
        <meshPhongMaterial color={0x129C75} />
      </mesh>
      
      {/* Clipboard */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.08, 2]} />
        <meshPhongMaterial 
          color={0xE5DEFF}
          shininess={30}
        />
      </mesh>
      
      {/* Clip at top */}
      <mesh position={[0, 0.05, -0.8]} castShadow>
        <boxGeometry args={[1.2, 0.12, 0.2]} />
        <meshPhongMaterial 
          color={0x23978F}
          shininess={80}
        />
      </mesh>
      
      {/* Checklist items */}
      <ChecklistItem position={0.6} checked={true} />
      <ChecklistItem position={0.3} checked={true} />
      <ChecklistItem position={0} checked={false} />
      <ChecklistItem position={-0.3} checked={false} />
      
      {/* Medal */}
      <group position={[0.8, 0.1, -0.6]} rotation={[-Math.PI / 3, 0, 0]} castShadow>
        {/* Medal base */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshPhongMaterial 
            color={0xF2D669}
            metalness={0.8}
            shininess={100}
          />
        </mesh>
        
        {/* Medal ribbon */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.1, 0.4, 0.02]} />
          <meshPhongMaterial color={0xE18B7B} />
        </mesh>
      </group>
    </group>
  );
}
