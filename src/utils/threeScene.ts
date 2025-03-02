import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jspi/controls/OrbitControls';
import { ModelType } from './three/modelTypes';
import { setupScene, setupLighting, handleResize, SceneElements } from './three/sceneSetup';
import { createModels } from './three/modelBuilders';

// Scene management class
export class ThreeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls | null = null;
  private models: Record<string, THREE.Group> = {};
  private animations: Record<string, THREE.AnimationMixer[]> = {};
  private clock = new THREE.Clock();
  private currentModel: string | null = null;
  private resizeHandler: (() => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    // Initialize scene elements
    const sceneElements = setupScene(canvas);
    this.scene = sceneElements.scene;
    this.camera = sceneElements.camera;
    this.renderer = sceneElements.renderer;
    this.clock = sceneElements.clock;
    
    // Add lighting to the scene
    setupLighting(this.scene);
    
    // Handle window resizing
    this.resizeHandler = handleResize(this.camera, this.renderer);
    
    // Start animation loop
    this.animate();
    
    // Initialize enhanced models
    this.models = createModels();
    
    // Hide all models initially
    Object.values(this.models).forEach(model => {
      model.visible = false;
      this.scene.add(model);
    });
  }

  // Animation loop
  private animate = () => {
    requestAnimationFrame(this.animate);
    
    // Update animations
    const delta = this.clock.getDelta();
    Object.values(this.animations).forEach(mixers => {
      mixers.forEach(mixer => mixer.update(delta));
    });
    
    // Rotate current model gently
    if (this.currentModel && this.models[this.currentModel]) {
      this.models[this.currentModel].rotation.y += 0.002;
    }
    
    // Update controls if available
    if (this.controls) {
      this.controls.update();
    }
    
    this.renderer.render(this.scene, this.camera);
  };

  // Show a specific model
  showModel(modelType: ModelType) {
    // Hide all models
    Object.entries(this.models).forEach(([type, model]) => {
      model.visible = type === modelType;
    });
    
    // Set current active model
    this.currentModel = modelType;
    
    // Reset camera and model position
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
    
    // If model exists, make it visible and reset position/rotation
    const model = this.models[modelType];
    if (model) {
      model.visible = true;
      
      // Set base rotation based on model type, but keep any active animation
      const baseXRotation = ['notes', 'goals'].includes(modelType) ? -Math.PI / 6 : -Math.PI / 12;
      model.rotation.x = baseXRotation;
      
      // Ensure the model is in the scene
      if (!this.scene.children.includes(model)) {
        this.scene.add(model);
      }
    }
    
    // Return the selected model for further manipulation
    return model;
  }

  // Clean up resources
  dispose() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    // Dispose geometries and materials
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
    
    // Dispose renderer
    this.renderer.dispose();
  }
}

// Re-export ModelType
export { ModelType };
