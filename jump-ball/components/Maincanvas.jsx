'use client'
import {useRef, useEffect} from 'react';

export default function Maincanvas() {

    const container = useRef();
    /*

    let ball = CanvasBall.getInstance(app, canvasDiv);*/

    useEffect(() => {
        let isUnmounted = false;

        (
            async () => {
                const {default: CanvasBall} = await import("../controllers/ball/CanvasBall");
                if (isUnmounted) return;
                container.current.appendChild(CanvasBall.instance.app.view);
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
