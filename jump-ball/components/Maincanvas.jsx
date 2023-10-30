'use client'
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
//import { loadingAssets,loadingManifest } from './features/gameSlice'

export default function Maincanvas() {
    const container = useRef();
    //const imgBall = useSelector(state => state.initGame.image);
    //const configuration = useSelector(state => state.initGame.configuration);
    //const dispatch = useDispatch();

    useEffect(() => {
        let isUnmounted = false;
        (
            async () => {
                const { default: CanvasBall } = await import("../controllers/ball/CanvasBall");
                if (isUnmounted) return;
                let ball = CanvasBall.instance;
                container.current.appendChild(ball.app.view);
                ball.paintFrame();
                ball.initConfigur();
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
