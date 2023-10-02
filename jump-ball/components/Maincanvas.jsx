'use client'
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
                const { default: ballImg } = await import("../public/ball.png");
                ball.paintBall(ballImg.src);
                ball.jumpBall();
            }
        )();

        return () => {
            isUnmounted = true;
        }
    }, [])

    return (
        <div className='canvas' ref={container}>
        </div>
    )
}
