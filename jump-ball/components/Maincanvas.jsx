"use client";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep } from "../components/features/gameSlice";

export default function Maincanvas() {
  const container = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.initGame.gameState);
  const [canvasBall, setCanvasBall] = useState(null);

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      const { default: CanvasBall } = await import("../controllers/ball/CanvasBall");
      if (isUnmounted) return;
      let ball = CanvasBall.instance;
      setCanvasBall(ball);
    })();

    return () => {
      isUnmounted = true;
    };
  }, []);

  useEffect(() => {
    if (!canvasBall) return;
    (async () => {
      await canvasBall[`${state}Action`]?.();
      dispatch(nextStep());
    })();
    if(state==='initialization'){
        container.current.appendChild(canvasBall.app.view);
    }
  }, [state, canvasBall]);

  return <div className="soccer-ball" ref={container}></div>;
}
