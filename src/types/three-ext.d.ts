
// Type declaration for Three.js examples
declare module 'three/examples/jspi/controls/OrbitControls' {
  import { Camera, EventDispatcher } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement);
    update(): void;
    dispose(): void;
  }
}
