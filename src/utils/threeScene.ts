import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jspi/controls/OrbitControls';

// Feature model types
export type ModelType = 'meal' | 'workout' | 'notes' | 'goals';

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

  constructor(canvas: HTMLCanvasElement) {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Set up camera
    this.camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 0, 5);
    
    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xF2D669, 0.8, 10);
    pointLight.position.set(-3, 2, 1);
    this.scene.add(pointLight);

    // Handle window resize
    window.addEventListener('resize', this.handleResize);
    
    // Start animation loop
    this.animate();
    
    // Initialize enhanced models
    this.createEnhancedModels();
  }

  // Create improved geometric models for each feature
  private createEnhancedModels() {
    // Meal tracking model - modern plate with styled food
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
    this.models['meal'] = mealGroup;
    
    // Workout tracking model - improved fitness equipment
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
    const trackerGeometry = new THREE.RoundedBoxGeometry(0.5, 0.12, 0.7, 8, 0.08);
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
    this.models['workout'] = workoutGroup;
    
    // Notes model - modern journal with pen
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
    this.models['notes'] = notesGroup;
    
    // Goals model - modern checklist with achievements
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
      const boxGeometry = new THREE.RoundedBoxGeometry(0.15, 0.15, 0.03, 4, 0.04);
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
    this.models['goals'] = goalsGroup;
    
    // Hide all models initially
    Object.values(this.models).forEach(model => {
      model.visible = false;
      this.scene.add(model);
    });
  }

  // Handle window resize
  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

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
    window.removeEventListener('resize', this.handleResize);
    
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
