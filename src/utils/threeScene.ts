
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
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Handle window resize
    window.addEventListener('resize', this.handleResize);
    
    // Start animation loop
    this.animate();
    
    // Initialize basic models
    this.createBasicModels();
  }

  // Create simple geometric models for each feature
  private createBasicModels() {
    // Meal tracking model - plate with food items
    const mealGroup = new THREE.Group();
    
    // Plate
    const plateGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const plateMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f3ff });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    mealGroup.add(plate);
    
    // Food items (simplified)
    const food1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0x9b87f5 })
    );
    food1.position.set(0.5, 0.2, 0);
    mealGroup.add(food1);
    
    const food2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.2, 0.4),
      new THREE.MeshPhongMaterial({ color: 0x6e59a5 })
    );
    food2.position.set(-0.5, 0.2, 0.3);
    mealGroup.add(food2);
    
    const food3 = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.6, 16),
      new THREE.MeshPhongMaterial({ color: 0xd6bcfa })
    );
    food3.position.set(0, 0.3, -0.5);
    mealGroup.add(food3);
    
    mealGroup.position.set(0, 0, 0);
    mealGroup.scale.set(0.8, 0.8, 0.8);
    this.models['meal'] = mealGroup;
    
    // Workout tracking model - dumbbells and tracker
    const workoutGroup = new THREE.Group();
    
    // Create dumbbell base
    const createDumbbell = (x: number) => {
      const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
      const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x6e6e6e });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(x, 0, 0);
      
      const weight1Geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
      const weightMaterial = new THREE.MeshPhongMaterial({ color: 0x9b87f5 });
      const weight1 = new THREE.Mesh(weight1Geometry, weightMaterial);
      weight1.rotation.z = Math.PI / 2;
      weight1.position.set(x - 0.6, 0, 0);
      
      const weight2 = new THREE.Mesh(weight1Geometry, weightMaterial);
      weight2.rotation.z = Math.PI / 2;
      weight2.position.set(x + 0.6, 0, 0);
      
      const dumbbellGroup = new THREE.Group();
      dumbbellGroup.add(handle);
      dumbbellGroup.add(weight1);
      dumbbellGroup.add(weight2);
      return dumbbellGroup;
    };
    
    const dumbbell1 = createDumbbell(-0.8);
    const dumbbell2 = createDumbbell(0.8);
    
    workoutGroup.add(dumbbell1);
    workoutGroup.add(dumbbell2);
    
    // Add a fitness tracker
    const trackerGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.7);
    const trackerMaterial = new THREE.MeshPhongMaterial({ color: 0xd6bcfa });
    const tracker = new THREE.Mesh(trackerGeometry, trackerMaterial);
    tracker.position.set(0, -0.8, 0);
    
    // Add screen to tracker
    const screenGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.5);
    const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x1A1F2C });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.06, 0);
    tracker.add(screen);
    
    workoutGroup.add(tracker);
    workoutGroup.scale.set(0.8, 0.8, 0.8);
    this.models['workout'] = workoutGroup;
    
    // Notes model - notebook with pen
    const notesGroup = new THREE.Group();
    
    // Notebook
    const notebookGeometry = new THREE.BoxGeometry(1.5, 0.1, 2);
    const notebookMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
    notesGroup.add(notebook);
    
    // Pages (lines)
    for (let i = 0; i < 5; i++) {
      const lineGeometry = new THREE.BoxGeometry(1.2, 0.01, 0.02);
      const lineMaterial = new THREE.MeshPhongMaterial({ color: 0x9b87f5 });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0, 0.06, 0.6 - i * 0.3);
      notesGroup.add(line);
    }
    
    // Pen
    const penGeometry = new THREE.CylinderGeometry(0.05, 0.01, 1.2, 16);
    const penMaterial = new THREE.MeshPhongMaterial({ color: 0x6e59a5 });
    const pen = new THREE.Mesh(penGeometry, penMaterial);
    pen.position.set(0.7, 0.1, -0.5);
    pen.rotation.set(0, 0, -Math.PI / 6);
    notesGroup.add(pen);
    
    notesGroup.rotation.set(-Math.PI / 6, 0, 0);
    notesGroup.scale.set(0.8, 0.8, 0.8);
    this.models['notes'] = notesGroup;
    
    // Goals model - checklist with tasks
    const goalsGroup = new THREE.Group();
    
    // Clipboard
    const clipboardGeometry = new THREE.BoxGeometry(1.5, 0.1, 2);
    const clipboardMaterial = new THREE.MeshPhongMaterial({ color: 0xe5deff });
    const clipboard = new THREE.Mesh(clipboardGeometry, clipboardMaterial);
    goalsGroup.add(clipboard);
    
    // Clip at top
    const clipGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.2);
    const clipMaterial = new THREE.MeshPhongMaterial({ color: 0x9b87f5 });
    const clip = new THREE.Mesh(clipGeometry, clipMaterial);
    clip.position.set(0, 0.05, -0.8);
    goalsGroup.add(clip);
    
    // Checkboxes and text lines
    const createChecklistItem = (z: number, checked: boolean) => {
      const boxGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.15);
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(-0.5, 0.06, z);
      
      if (checked) {
        // Checkmark (simplified as a small box)
        const checkGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.1);
        const checkMaterial = new THREE.MeshPhongMaterial({ color: 0x6e59a5 });
        const check = new THREE.Mesh(checkGeometry, checkMaterial);
        check.position.set(0, 0.01, 0);
        box.add(check);
      }
      
      // Text line
      const lineGeometry = new THREE.BoxGeometry(0.8, 0.01, 0.03);
      const lineMaterial = new THREE.MeshPhongMaterial({ color: 0x1A1F2C });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0.25, 0, 0);
      
      const itemGroup = new THREE.Group();
      itemGroup.add(box);
      itemGroup.add(line);
      
      return itemGroup;
    };
    
    const item1 = createChecklistItem(0.6, true);
    const item2 = createChecklistItem(0.3, true);
    const item3 = createChecklistItem(0, false);
    const item4 = createChecklistItem(-0.3, false);
    
    goalsGroup.add(item1);
    goalsGroup.add(item2);
    goalsGroup.add(item3);
    goalsGroup.add(item4);
    
    goalsGroup.rotation.set(-Math.PI / 6, 0, 0);
    goalsGroup.scale.set(0.8, 0.8, 0.8);
    this.models['goals'] = goalsGroup;
    
    // Hide all models initially
    Object.values(this.models).forEach(model => {
      model.visible = false;
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
      this.models[this.currentModel].rotation.y += 0.005;
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
      model.rotation.set(
        modelType === 'notes' || modelType === 'goals' ? -Math.PI / 6 : 0,
        0,
        0
      );
      
      // Add the model to scene if not already added
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
