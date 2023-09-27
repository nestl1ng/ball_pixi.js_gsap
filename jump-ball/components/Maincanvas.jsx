'use client'
import BallImg from '../public/ball.png'
import { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
// import { gsap } from "gsap/dist/gsap";

export default function Maincanvas() {
  const app = new PIXI.Application({ width: 808, height: 808 });
  const canvasDiv = useRef();

  useEffect(() => {
    canvasDiv.current.appendChild(app.view);

    let frame = new PIXI.Graphics();
    frame.beginFill(0x666666);
    frame.drawRect(0, 0, 800, 800);
    frame.position.set(4, 4);
    app.stage.addChild(frame);

    let ball = PIXI.Sprite.from(BallImg.src);
    ball.width = 50;
    ball.height = 50;
    ball.x = 0;
    ball.y = 750;

    frame.eventMode = 'static';
    frame.cursor = 'pointer';
    frame.addChild(ball);
  }, [])

  return (
    <div className='canvas' ref={canvasDiv}>
    </div>
  )
}
