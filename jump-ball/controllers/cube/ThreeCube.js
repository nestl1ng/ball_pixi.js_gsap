import * as THREE from "three";
import { gsap } from "gsap/dist/gsap";

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
    this.cubeTarget = this.cubeTarget.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.uniforms = {
      colorA: { type: "vec3", value: new THREE.Color(0xfcc603) },
      colorB: { type: "vec3", value: new THREE.Color(0xfc0303) },
      time: { value: 1 },
    };

    this.step = this.getRandomNum(0, 2);
    this.stepCounter = 0;
    this.randNumb = Math.round(this.getRandomNum(0, 5));
    this.smooth = 0.01;

    this.isIntersected;
    this.tl = gsap.timeline();
  }

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
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      fragmentShader: this.fragmentShader(),
      vertexShader: this.vertexShader(),
    });
    this.cubeFigure = new THREE.Mesh(this.geometry, this.material);
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.light = new THREE.DirectionalLight(0xffffff, 3);
    this.scene.fog = new THREE.Fog(0xcccccc, this.near, this.far);
    this.scene.background = new THREE.Color(0xcccccc);
  }

  initLevelAction() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 3;
    this.scene.add(this.cubeFigure);

    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);
    this.renderer.render(this.scene, this.camera);
  }

  playingAction() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("click", this.cubeTarget);
    window.addEventListener("resize", this.onWindowResize);
    this.renderScene();
    this.runTime();
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  }

  cubeTarget() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.isIntersected = this.raycaster.intersectObject(this.cubeFigure);
    if (this.isIntersected.length > 0) {
      this.lineupCube();
    }
  }

  lineupCube() {
    gsap.to(this.cubeFigure.rotation, {
      [this.getRandomRotation()]: `+=${this.getRandomNum(-2, 2)}`,
      duration: 2,
      ease: "power1.out",
    });
  }

  getRandomRotation() {
    const numb = Math.round(this.getRandomNum(0, 2));
    const a = ["x", "y", "z"];
    return a[numb];
  }

  getRandomNum(min, max) {
    let rand;
    if (max) {
      rand = Math.random() * (max - min) + min;
    } else {
      rand = Math.random() * min;
    }
    return +rand.toFixed(2);
  }

  runTime() {
    gsap.to(this.cubeFigure.material.uniforms.time, {
      value: "+=10",
      duration: 3,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.renderScene.bind(this));
  }

  vertexShader() {
    return `
      varying vec3 vUv; 
      varying vec3 vposition;

      void main() {
        vUv = position; 
        vposition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
  }

  fragmentShader() {
    return `
    varying vec3 vUv;
    varying vec3 vposition;
    uniform float time;

    void main() {
      vec4 color = vec4( vposition.y, vposition.y, 1.0, 1.0 );
			color.y += sin( vposition.y * 10.0 + time );
      gl_FragColor = color;
    }
`;
  }
}
