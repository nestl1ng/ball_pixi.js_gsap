import * as THREE from "three";

export default class ThreeCube {
  static get instance() {
    if (!this._instance) {
      this._instance = new ThreeCube();
    }
    return this._instance;
  }

  static _instance = null;

  constructor() {
    this.fov = 75;
    this.aspect = 2;
    this.near = 0.1;
    this.far = 5;
    this.boxWidth = 1;
    this.boxHeight = 1;
    this.boxDepth = 1;

    this.maxRad = 2;
    this.step = this.getRandomNum(this.maxRad);
    this.randNumb = Math.round(this.getRandomNum(2));

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isIntersected;
  }

  loadingManifestAction() {}

  async loadingAssetsAction() {}

  webGLRenderer() {
    return (this.renderer = new THREE.WebGLRenderer({ antialias: true }));
  }

  initializationAction() {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
    this.geometry = new THREE.BoxGeometry(
      this.boxWidth,
      this.boxHeight,
      this.boxDepth
    );
    this.material = new THREE.MeshLambertMaterial({ color: "red" });
    this.cubeFigure = new THREE.Mesh(this.geometry, this.material);
    this.scene = new THREE.Scene();
  }

  initLevelAction() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 2;
    this.scene.add(this.cubeFigure);

    this.light = new THREE.DirectionalLight(0xffffff, 3);
    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);
    this.renderer.render(this.scene, this.camera);
  }

  playingAction() {
    window.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });

    window.addEventListener("click", () => {
      this.cubeTarget();
    });

    window.addEventListener("resize", () => {
        this.onWindowResize();
      });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera);
}

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  cubeTarget(){
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.isIntersected = this.raycaster.intersectObject(this.cubeFigure);
    if (this.isIntersected.length > 0) {
        this.lineupCube()
    }
  }

  lineupCube() {
    this.renderer.render(this.scene, this.camera);
    if (
      this.cubeFigure.rotation.x +
        this.cubeFigure.rotation.y +
        this.cubeFigure.rotation.z <=
      this.step
    ) {
      if (this.randNumb === 0) {
        this.cubeFigure.rotation.x += 0.01;
      } else if (this.randNumb === 1) {
        this.cubeFigure.rotation.y += 0.01;
      } else if (this.randNumb === 2) {
        this.cubeFigure.rotation.z += 0.01;
      }
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(this.lineupCube.bind(this));
    } else {
      this.step += this.getRandomNum(this.maxRad);
      this.randNumb = Math.round(this.getRandomNum(2));
    }
  }

  getRandomNum(max) {
    let rand = Math.random() * max;
    return +rand.toFixed(2);
  }
}
