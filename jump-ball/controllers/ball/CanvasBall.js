import * as PIXI from "pixi.js";
import { gsap } from "gsap/dist/gsap";

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
    this.ball;
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
      this.ball.x = 0;
      this.ball.y = 750;

      this.frame.eventMode = "static";
      this.frame.cursor = "pointer";
      this.frame.addChild(this.ball);
    }
  }

  jumpBall() {
    var tl = gsap.timeline();
    this.frame.on("mousedown", () => {
      tl.to(this.ball, {
        duration: 1.5,
        ease: "circ",
        x: "+=100",
        y: "-=100",
      }).to(
        this.ball,
        {
          duration: 1,
          ease: "bounce.out",
          y: 750,
        },
        "-=1"
      );
      //   gsap.to(this.ball, {
      //     duration: 2.5,
      //     ease: "circ",
      //     x: this.ball.x + 50,
      //     y: this.ball.y - 100,
      //   });
      //   setTimeout(() => {
      //     gsap.to(this.ball, { duration: 2.5, ease: "bounce.out", y: 750 });
      //   }, 500);
    });
  }
}
