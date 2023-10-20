import * as PIXI from "pixi.js";
import { gsap } from "gsap/dist/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default class CanvasBall {
  static get instance() {
    if (!this._instance) {
      this._instance = new CanvasBall();
    }
    return this._instance;
  }

  static _instance = null;

  constructor() {
    this.app = new PIXI.Application({ width: 808, height: 808 });
    this.frame = new PIXI.Graphics();

    this.stepX = 0;
    this.stepY = 775;
    this.ball;
    this.tl = gsap.timeline();
    gsap.registerPlugin(MotionPathPlugin);
  }

  paintFrame() {
    if (typeof this.app !== "undefined") {
      this.frame.beginFill(0x666666);
      this.frame.drawRect(0, 0, 800, 800);
      this.frame.position.set(4, 4);
      this.app.stage.addChild(this.frame);
    }
  }

  paintBall(ball) {
    if (typeof this.frame !== "undefined") {
      this.ball = PIXI.Sprite.from(ball);
      this.ball.width = 50;
      this.ball.height = 50;
      this.ball.x = 25;
      this.ball.y = 775;
      //  this.ball.position.y = 780;
      //  this.ball.scale.y = 0.015;
      this.ball.anchor.set(0.5);

      this.frame.eventMode = "static";
      this.frame.cursor = "pointer";
      this.frame.addChild(this.ball);
    }
  }

  jumpBall() {
    this.frame.on("mousedown", () => {
      this.lineupBall();
    });
  }

  lineupBall() {
    this.tl
      .to(this.ball, {
        motionPath: [
          { x: this.stepX + 50, y: this.stepY - 50 },
          { x: this.stepX + 75, y: this.stepY - 60 },
          { x: this.stepX + 125, y: this.stepY - 60 },
        ],
        duration: 1.5,
        ease: "power3.out",
      })
      .to(
        this.ball,
        {
          duration: 1.2,
          ease: "bounce.out",
          y: 775,
        },
        "-=1.2"
      ).to(
        this.ball.scale,
        {
          duration: 0.1,
          x: 0.015,
        },
        ">-0.8"
      )
      .to(
        this.ball.position,
        {
          duration: 0.1,
          y: 785,
        },
        "<"
      )
      .to(
        this.ball.scale,
        {
          duration: 0.1,
          x: 0.022,
        },
        "<+0.1"
      )
      .to(
        this.ball,
        {
          duration: 1.5,
          ease: "power1.out",
          x: this.stepX + 200,
          rotation: "+=6.28319",
        },
        "-=1.5"
      );

    this.stepX += 200;
  }
}
