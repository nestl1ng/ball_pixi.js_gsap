'use client'
import { Assets } from 'pixi.js';
import { useRef, useEffect } from 'react';

export default function Maincanvas() {

    const container = useRef();

    useEffect(() => {
        let isUnmounted = false;
        (
            async () => {
                const { default: CanvasBall } = await import("../controllers/ball/CanvasBall");
                if (isUnmounted) return;
                let ball = CanvasBall.instance;
                container.current.appendChild(ball.app.view);
                ball.paintFrame();
                const ballImg = await Assets.load("/ball.png");
                ball.paintBall(ballImg);
                ball.jumpBall();
            }
        )();

        return () => {
            isUnmounted = true;
        }
    }, [])

    return (
        <div className='soccer-ball' ref={container}>
        </div>
    )
}
