'use client'
import {useRef, useEffect} from 'react';
import BallImg from '../public/ball.png'

export default function Maincanvas() {

    const container = useRef();

    useEffect(() => {
        let isUnmounted = false;

        (
            async () => {
                const {default: CanvasBall} = await import("../controllers/ball/CanvasBall");

                if (isUnmounted) return;
                let ball = CanvasBall.instance;
                container.current.appendChild(ball.app.view);
                ball.paintFrame();
                ball.paintBall(BallImg.src);
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
