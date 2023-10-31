import * as PIXI from "pixi.js";
import { gsap } from "gsap/dist/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import axios from "axios";

export default class CanvasBall {
  static get instance() {
    if (!this._instance) {
      this._instance = new CanvasBall();
    }
    return this._instance;
  }

  static _instance = null;

  constructor() {
    this.app;
    this.frame;
    this.stepX = 0;
    this.stepY = 775;
    this.ball;
    this.allData;
    this.tl = gsap.timeline();
    gsap.registerPlugin(MotionPathPlugin);
  }

  async loadingManifestAction() {
    const response = await axios.get("/configuration.json");
    this.allData = response.data;
  }

  async loadingAssetsAction() {
    this.ball = await PIXI.Assets.load(this.allData.assets.ballPng);
    this.ball = PIXI.Sprite.from(this.ball);
  }

  initializationAction() {
    this.app = new PIXI.Application({ width: 1008, height: 808 });
    this.frame = new PIXI.Graphics();
  }

  initLevelAction() {
    this.frame.beginFill(0x666666);
    this.frame.drawRect(0, 0, 1000, 800);
    this.frame.position.set(4, 4);
    this.frame.eventMode = "static";
    this.frame.cursor = "pointer";
    this.ball.width = 50;
    this.ball.height = 50;
    this.ball.x = 25;
    this.ball.y = 775;
    //  this.ball.position.y = 780;
    //  this.ball.scale.y = 0.015;
    this.ball.anchor.set(0.5);
    this.app.stage.addChild(this.frame);
    this.frame.addChild(this.ball);
  }

  playingAction(){
    this.frame.on("mousedown", () => {
      this.lineupBall();
    });
  }

  lineupBall() {
    this.tl
      .to(this.ball, {
        motionPath: [
          { x: this.stepX + 50, y: this.stepY - this.allData.jumpHeight },
          { x: this.stepX + 75, y: this.stepY - this.allData.jumpHeight * 1.2 },
          {
            x: this.stepX + 125,
            y: this.stepY - this.allData.jumpHeight * 1.2,
          },
        ],
        duration: this.allData.animationDuration,
        ease: "power3.out",
      })
      .to(
        this.ball,
        {
          duration: this.allData.animationDuration * 0.8,
          ease: "bounce.out",
          y: 775,
        },
        `-=${this.allData.animationDuration * 0.8}`
      )
      .to(
        this.ball.scale,
        {
          duration: this.allData.animationDuration * 0.066,
          x: 0.015,
        },
        `>-${this.allData.animationDuration * 0.533}`
      )
      .to(
        this.ball.position,
        {
          duration: this.allData.animationDuration * 0.066,
          y: 785,
        },
        "<"
      )
      .to(
        this.ball.scale,
        {
          duration: this.allData.animationDuration * 0.066,
          x: 0.022,
        },
        `<+${this.allData.animationDuration * 0.066}`
      )
      .to(
        this.ball,
        {
          duration: this.allData.animationDuration,
          ease: "power1.out",
          x: this.stepX + 200,
          rotation: "+=6.28319",
        },
        `-=${this.allData.animationDuration}`
      );

    this.stepX += 200;
  }
}
