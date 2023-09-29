'use client'
import BallImg from '../public/ball.png'
import { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
// import { gsap } from "gsap/dist/gsap";

export default function Maincanvas() {
  class CanvasBall {
    constructor(app, ref) {
      this.ref = ref
      this.app = app;
      this.frame;
      this.ball;
    }

    paintCanvas() {
      this.ref.current.appendChild(this.app.view);
    }

    paintFrame(frame) {
      if (typeof this.app !== 'undefined') {
        this.frame = frame;
        this.frame.beginFill(0x666666);
        this.frame.drawRect(0, 0, 800, 800);
        this.frame.position.set(4, 4);
        this.app.stage.addChild(this.frame);
      }
    }

    paintBall(ball) {
      if (typeof this.frame !== 'undefined') {
        this.ball = ball;
        this.ball.width = 50;
        this.ball.height = 50;
        this.ball.x = 0;
        this.ball.y = 750;

        this.frame.eventMode = 'static';
        this.frame.cursor = 'pointer';
        this.frame.addChild(this.ball);
      }
    }
  }
  
  const app = new PIXI.Application({ width: 808, height: 808 });
  const canvasDiv = useRef();
  let ball = new CanvasBall(app, canvasDiv);

  useEffect(() => {
    ball.paintCanvas();

    let frame = new PIXI.Graphics();
    ball.paintFrame(frame);

    let ballSprite = PIXI.Sprite.from(BallImg.src);
    ball.paintBall(ballSprite);
  }, [])

  return (
    <div className='canvas' ref={canvasDiv}>
    </div>
  )
}
