"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas").then((module) => module.HeroCanvas), {
  ssr: false,
  loading: () => null
});

function useCanvasEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const compactViewport = window.matchMedia("(max-width: 900px)").matches;
    const liteMode = new URLSearchParams(window.location.search).has("lite");

    if (reducedMotion || coarsePointer || compactViewport || liteMode) return;

    const enable = () => setEnabled(true);
    const idleId = window.requestIdleCallback(enable, { timeout: 1200 });

    return () => {
      window.cancelIdleCallback(idleId);
    };
  }, []);

  return enabled;
}

export function WebGLHero() {
  const canvasEnabled = useCanvasEnabled();

  return (
    <div className="webgl-stage" aria-hidden="true" data-webgl-hero>
      <div className="hero-photo-backdrop" />
      {canvasEnabled ? <HeroCanvas /> : null}
      <div className="clinical-lightfield">
        <span />
        <span />
      </div>
      <div className="kinetic-veil">
        <span />
        <span />
        <span />
      </div>
      <div className="diagnostic-sweep" />
      <div className="orbital-signature">
        <span />
        <span />
      </div>
      <div className="volumetric-glow" />
      <div className="cinema-vignette" />
    </div>
  );
}
