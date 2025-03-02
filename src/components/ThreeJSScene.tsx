
import React, { useEffect, useRef } from 'react';
import { ThreeScene, ModelType } from '../utils/threeScene';

interface ThreeJSSceneProps {
  activeModel: ModelType;
}

const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ activeModel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    // Initialize scene only once
    if (canvasRef.current && !sceneRef.current) {
      try {
        sceneRef.current = new ThreeScene(canvasRef.current);
      } catch (error) {
        console.error('Error initializing Three.js scene:', error);
      }
    }

    // Clean up on unmount
    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

  // Update active model when changed
  useEffect(() => {
    if (sceneRef.current) {
      try {
        sceneRef.current.showModel(activeModel);
      } catch (error) {
        console.error('Error showing model:', error);
      }
    }
  }, [activeModel]);

  return <canvas ref={canvasRef} className="three-canvas" />;
};

export default ThreeJSScene;
