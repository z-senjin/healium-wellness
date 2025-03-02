
import * as THREE from 'three';

export function createNotesModel(): THREE.Group {
  const notesGroup = new THREE.Group();
  
  // Create desk surface
  const deskGeometry = new THREE.BoxGeometry(2.5, 0.1, 2);
  const deskMaterial = new THREE.MeshPhongMaterial({ color: 0x23978F });
  const desk = new THREE.Mesh(deskGeometry, deskMaterial);
  desk.position.y = -0.4;
  desk.receiveShadow = true;
  notesGroup.add(desk);
  
  // Modern notebook
  const notebookGeometry = new THREE.BoxGeometry(1.5, 0.1, 2);
  const notebookMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFDE1D3,
    shininess: 30
  });
  const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
  notebook.castShadow = true;
  notebook.receiveShadow = true;
  notesGroup.add(notebook);
  
  // Pages (lines)
  for (let i = 0; i < 6; i++) {
    const lineGeometry = new THREE.PlaneGeometry(1.2, 0.01);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x23978F });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(0, 0.06, 0.7 - i * 0.25);
    line.rotation.x = -Math.PI / 2;
    notesGroup.add(line);
  }
  
  // Modern pen
  const penBodyGeometry = new THREE.CylinderGeometry(0.04, 0.03, 1, 16);
  const penTipGeometry = new THREE.ConeGeometry(0.03, 0.1, 16);
  const penBodyMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xF2D669,
    shininess: 80
  });
  const penTipMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x0E3331,
    shininess: 100
  });
  
  const penBody = new THREE.Mesh(penBodyGeometry, penBodyMaterial);
  const penTip = new THREE.Mesh(penTipGeometry, penTipMaterial);
  penTip.position.y = -0.55;
  
  const pen = new THREE.Group();
  pen.add(penBody);
  pen.add(penTip);
  pen.position.set(0.8, 0.2, -0.4);
  pen.rotation.set(0, 0, -Math.PI / 6);
  pen.castShadow = true;
  notesGroup.add(pen);
  
  // Add decorative elements
  const cupGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.4, 16);
  const cupMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xE18B7B,
    shininess: 50 
  });
  const cup = new THREE.Mesh(cupGeometry, cupMaterial);
  cup.position.set(-0.8, 0.2, -0.6);
  cup.castShadow = true;
  notesGroup.add(cup);
  
  notesGroup.rotation.set(-Math.PI / 6, 0, 0);
  
  return notesGroup;
}
