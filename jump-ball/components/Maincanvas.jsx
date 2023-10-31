"use client";
import { useRef, useEffect, useState, useMemo, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep } from "../components/features/gameSlice";

export default function Maincanvas() {
  const container = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.initGame.gameState);
  const [canvasBall, setCanvasBall] = useState(null);

  const stateObj = useMemo(() => {
    return {
    initialization() {
        container.current.appendChild(canvasBall.app.view);
      }
  }
  }, [canvasBall]);

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      const { default: CanvasBall } = await import(
        "../controllers/ball/CanvasBall"
      );
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
    let isUnmountedSec = false;
    (async () => {
      await canvasBall[`${state}Action`]?.();
      dispatch(nextStep());
      if (isUnmountedSec) return;
    })();

    stateObj[state]?.();

    return () => {
      isUnmountedSec = true;
    };
  }, [state, canvasBall]);

  return <div className="soccer-ball" ref={container}></div>;
}
