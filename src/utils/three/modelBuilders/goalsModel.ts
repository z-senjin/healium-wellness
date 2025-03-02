
import * as THREE from 'three';

export function createGoalsModel(): THREE.Group {
  const goalsGroup = new THREE.Group();
  
  // Create a base platform
  const boardGeometry = new THREE.BoxGeometry(2, 0.1, 2.5);
  const boardMaterial = new THREE.MeshPhongMaterial({ color: 0x129C75 });
  const board = new THREE.Mesh(boardGeometry, boardMaterial);
  board.position.y = -0.4;
  board.receiveShadow = true;
  goalsGroup.add(board);
  
  // Clipboard
  const clipboardGeometry = new THREE.BoxGeometry(1.5, 0.08, 2);
  const clipboardMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xE5DEFF,
    shininess: 30
  });
  const clipboard = new THREE.Mesh(clipboardGeometry, clipboardMaterial);
  clipboard.castShadow = true;
  goalsGroup.add(clipboard);
  
  // Clip at top
  const clipGeometry = new THREE.BoxGeometry(1.2, 0.12, 0.2);
  const clipMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x23978F,
    shininess: 80
  });
  const clip = new THREE.Mesh(clipGeometry, clipMaterial);
  clip.position.set(0, 0.05, -0.8);
  clip.castShadow = true;
  goalsGroup.add(clip);
  
  // Create a more detailed checklist
  const createChecklistItem = (z: number, checked: boolean, text: string) => {
    // Modern checkbox
    const boxGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.03);
    const boxMaterial = new THREE.MeshPhongMaterial({ 
      color: checked ? 0x129C75 : 0xFFFFFF,
      shininess: 60 
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(-0.5, 0.06, z);
    box.rotation.x = -Math.PI / 2;
    box.castShadow = true;
    
    if (checked) {
      // Checkmark (simplified as a small box)
      const checkGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.01);
      const checkMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 0.3
      });
      const check = new THREE.Mesh(checkGeometry, checkMaterial);
      check.position.set(0, 0, 0.02);
      box.add(check);
    }
    
    // Text line
    const lineGeometry = new THREE.PlaneGeometry(0.8, 0.1);
    const lineMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0E3331,
      transparent: true,
      opacity: 0.8
    });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(0.25, 0, 0);
    line.rotation.x = Math.PI;
    
    const itemGroup = new THREE.Group();
    itemGroup.add(box);
    itemGroup.add(line);
    
    return itemGroup;
  };
  
  const item1 = createChecklistItem(0.6, true, "Morning Workout");
  const item2 = createChecklistItem(0.3, true, "Healthy Breakfast");
  const item3 = createChecklistItem(0, false, "Meditation Session");
  const item4 = createChecklistItem(-0.3, false, "Evening Walk");
  
  goalsGroup.add(item1);
  goalsGroup.add(item2);
  goalsGroup.add(item3);
  goalsGroup.add(item4);
  
  // Add decorative achievement medal
  const medalBaseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
  const medalRibbonGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.02);
  const medalBaseMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xF2D669,
    metalness: 0.8,
    shininess: 100
  });
  const medalRibbonMaterial = new THREE.MeshPhongMaterial({ color: 0xE18B7B });
  
  const medalBase = new THREE.Mesh(medalBaseGeometry, medalBaseMaterial);
  const medalRibbon = new THREE.Mesh(medalRibbonGeometry, medalRibbonMaterial);
  medalRibbon.position.y = 0.2;
  
  const medal = new THREE.Group();
  medal.add(medalBase);
  medal.add(medalRibbon);
  medal.position.set(0.8, 0.1, -0.6);
  medal.rotation.x = -Math.PI / 3;
  medal.castShadow = true;
  goalsGroup.add(medal);
  
  goalsGroup.rotation.set(-Math.PI / 6, 0, 0);
  
  return goalsGroup;
}
