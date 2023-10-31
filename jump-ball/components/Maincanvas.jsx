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
      container.current.appendChild(ball.app.view);
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
  }, [state, canvasBall]);

  return <div className="soccer-ball" ref={container}></div>;
}
