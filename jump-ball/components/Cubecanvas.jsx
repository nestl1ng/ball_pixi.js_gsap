"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep } from "../components/features/gameSlice";

export default function Maincanvas() {
  const container = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.initGame.gameState);
  const [threeCube, setThreeCube] = useState(null);

  const stateObj = useMemo(() => {
    return {
      initialization() {
        let renderer = threeCube.webGLRenderer();
        container.current.appendChild(renderer.domElement);
      },
    };
  }, [threeCube]);

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      const { default: ThreeCube } = await import(
        "../controllers/cube/ThreeCube"
      );

      if (isUnmounted) return;
      let cube = ThreeCube.instance;
      setThreeCube(cube);
    })();

    return () => {
      isUnmounted = true;
    };
  }, []);

  useEffect(() => {
    if (!threeCube) return;
    let isUnmountedSec = false;
    (async () => {
      await threeCube[`${state}Action`]?.();
      if (isUnmountedSec) return;
      dispatch(nextStep());
    })();

    stateObj[state]?.();

    return () => {
      isUnmountedSec = true;
    };
  }, [state, threeCube]);

  return <div className="three-cube" ref={container}></div>;
}
