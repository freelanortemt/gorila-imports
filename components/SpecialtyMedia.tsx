"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent } from "react";
import type { Specialty } from "@/lib/specialties";

type SpecialtyMediaProps = {
  audience: string;
  visual: Specialty["visual"];
};

export function SpecialtyMedia({ audience, visual }: SpecialtyMediaProps) {
  const frameRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    frame.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
    frame.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
    frame.style.setProperty("--light-x", `${event.clientX - rect.left}px`);
    frame.style.setProperty("--light-y", `${event.clientY - rect.top}px`);
  };

  const resetPointer = () => {
    const frame = frameRef.current;
    if (!frame) return;

    frame.style.setProperty("--tilt-x", "0deg");
    frame.style.setProperty("--tilt-y", "0deg");
    frame.style.setProperty("--light-x", "50%");
    frame.style.setProperty("--light-y", "42%");
  };

  return (
    <motion.figure
      ref={frameRef}
      className="specialty-media"
      initial={{ opacity: 0, y: 34, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onBlur={resetPointer}
      tabIndex={0}
    >
      <div className="specialty-media-picture">
        <Image src={visual.image} alt={visual.alt} width={980} height={1240} priority sizes="(max-width: 900px) 92vw, 420px" />
      </div>

      <figcaption className="specialty-media-caption">
        <span>{visual.kicker}</span>
        <p>{visual.caption}</p>
      </figcaption>

      <div className="specialty-media-markers" aria-label="Pontos clínicos da especialidade">
        {visual.markers.map(([label, value]) => (
          <div key={label}>
            <strong>{label}</strong>
            <small>{value}</small>
          </div>
        ))}
      </div>

      <p className="specialty-media-audience">{audience}</p>
    </motion.figure>
  );
}
