
import * as THREE from 'three';

export function createMealModel(): THREE.Group {
  const mealGroup = new THREE.Group();
  
  // Create a base platform
  const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
  const baseMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x129C75,
    shininess: 100,
    specular: 0x333333
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -0.5;
  base.receiveShadow = true;
  mealGroup.add(base);
  
  // Modern plate
  const plateGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.08, 32);
  const plateMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFEF7CD, 
    shininess: 80,
    specular: 0xffffff
  });
  const plate = new THREE.Mesh(plateGeometry, plateMaterial);
  plate.receiveShadow = true;
  mealGroup.add(plate);
  
  // Add vegetables and food items
  const foodItems = [
    { 
      geometry: new THREE.SphereGeometry(0.2, 24, 24), 
      material: new THREE.MeshPhongMaterial({ color: 0xE18B7B }),
      position: { x: 0.5, y: 0.2, z: 0.3 }
    },
    { 
      geometry: new THREE.BoxGeometry(0.3, 0.15, 0.3), 
      material: new THREE.MeshPhongMaterial({ color: 0x23978F }),
      position: { x: -0.4, y: 0.15, z: 0.4 }
    },
    { 
      geometry: new THREE.ConeGeometry(0.2, 0.5, 16), 
      material: new THREE.MeshPhongMaterial({ color: 0xF2D669 }),
      position: { x: 0, y: 0.3, z: -0.5 }
    },
    { 
      geometry: new THREE.TorusGeometry(0.15, 0.05, 16, 32), 
      material: new THREE.MeshPhongMaterial({ color: 0xD6BCFA }),
      position: { x: -0.6, y: 0.1, z: -0.2 }
    },
    { 
      geometry: new THREE.DodecahedronGeometry(0.15), 
      material: new THREE.MeshPhongMaterial({ color: 0xE5DEFF }),
      position: { x: 0.7, y: 0.15, z: -0.3 }
    }
  ];
  
  foodItems.forEach(item => {
    const food = new THREE.Mesh(item.geometry, item.material);
    food.position.set(item.position.x, item.position.y, item.position.z);
    food.castShadow = true;
    mealGroup.add(food);
  });
  
  // Add utensils
  const forkGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
  const utensilesMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x8E9196,
    metalness: 0.8,
    shininess: 100
  });
  const fork = new THREE.Mesh(forkGeometry, utensilesMaterial);
  fork.position.set(1.1, 0.05, 0.5);
  fork.rotation.z = Math.PI / 2;
  fork.rotation.y = Math.PI / 6;
  fork.castShadow = true;
  mealGroup.add(fork);
  
  // Prepare the complete group
  mealGroup.position.set(0, 0, 0);
  mealGroup.rotation.x = -Math.PI / 12;
  
  return mealGroup;
}
