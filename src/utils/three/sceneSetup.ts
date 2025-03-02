
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jspi/controls/OrbitControls';

export interface SceneElements {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  controls: OrbitControls | null;
}

export function setupScene(canvas: HTMLCanvasElement): SceneElements {
  // Create scene
  const scene = new THREE.Scene();
    
  // Set up camera
  const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.set(0, 0, 5);
    
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Create clock for animations
  const clock = new THREE.Clock();
  
  return { scene, camera, renderer, clock, controls: null };
}

export function setupLighting(scene: THREE.Scene): void {
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);
  
  // Add point light
  const pointLight = new THREE.PointLight(0xF2D669, 0.8, 10);
  pointLight.position.set(-3, 2, 1);
  scene.add(pointLight);
}

export function handleResize(
  camera: THREE.PerspectiveCamera, 
  renderer: THREE.WebGLRenderer
): () => void {
  const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  window.addEventListener('resize', resizeHandler);
  return resizeHandler;
}
