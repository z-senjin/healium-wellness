
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { MealModel, WorkoutModel, NotesModel, GoalsModel } from '../utils/three/modelBuilders';
import { ModelType } from '../utils/three/modelTypes';

// Component for model rotation
const RotatingModel = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
};

interface ThreeJSSceneProps {
  activeModel: ModelType;
}

const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ activeModel }) => {
  return (
    <Canvas shadows className="three-canvas">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      {/* Add lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <pointLight position={[-3, 2, 1]} intensity={0.8} color="#F2D669" distance={10} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      
      {/* Render the active model */}
      <RotatingModel>
        {activeModel === 'meal' && <MealModel />}
        {activeModel === 'workout' && <WorkoutModel />}
        {activeModel === 'notes' && <NotesModel />}
        {activeModel === 'goals' && <GoalsModel />}
      </RotatingModel>
    </Canvas>
  );
};

export default ThreeJSScene;
