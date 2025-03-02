
import * as THREE from 'three';

export function createWorkoutModel(): THREE.Group {
  const workoutGroup = new THREE.Group();
  
  // Create a yoga mat base
  const matGeometry = new THREE.BoxGeometry(2.5, 0.05, 1.5);
  const matMaterial = new THREE.MeshPhongMaterial({ color: 0xE5DEFF });
  const mat = new THREE.Mesh(matGeometry, matMaterial);
  mat.position.y = -0.3;
  mat.receiveShadow = true;
  workoutGroup.add(mat);
  
  // Create modern dumbbell
  const createDumbbell = (x: number, color: number) => {
    const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 16);
    const handleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8E9196,
      metalness: 0.8,
      shininess: 100
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(x, 0, 0);
    handle.castShadow = true;
    
    const weight1Geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.25, 24);
    const weightMaterial = new THREE.MeshPhongMaterial({ 
      color: color,
      shininess: 60
    });
    const weight1 = new THREE.Mesh(weight1Geometry, weightMaterial);
    weight1.rotation.z = Math.PI / 2;
    weight1.position.set(x - 0.5, 0, 0);
    weight1.castShadow = true;
    
    const weight2 = new THREE.Mesh(weight1Geometry, weightMaterial);
    weight2.rotation.z = Math.PI / 2;
    weight2.position.set(x + 0.5, 0, 0);
    weight2.castShadow = true;
    
    const dumbbellGroup = new THREE.Group();
    dumbbellGroup.add(handle);
    dumbbellGroup.add(weight1);
    dumbbellGroup.add(weight2);
    return dumbbellGroup;
  };
  
  const dumbbell1 = createDumbbell(-0.6, 0x23978F);
  const dumbbell2 = createDumbbell(0.6, 0xE18B7B);
  
  workoutGroup.add(dumbbell1);
  workoutGroup.add(dumbbell2);
  
  // Add a modern fitness tracker
  const trackerGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.7);
  const trackerMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x129C75,
    shininess: 100
  });
  const tracker = new THREE.Mesh(trackerGeometry, trackerMaterial);
  tracker.position.set(0, -0.8, 0.3);
  tracker.castShadow = true;
  
  // Add screen to tracker
  const screenGeometry = new THREE.PlaneGeometry(0.4, 0.5);
  const screenMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x0E3331,
    emissive: 0x23978F,
    emissiveIntensity: 0.2
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 0.07, 0);
  screen.rotation.x = -Math.PI / 2;
  tracker.add(screen);
  
  workoutGroup.add(tracker);
  workoutGroup.rotation.x = -Math.PI / 12;
  
  return workoutGroup;
}
