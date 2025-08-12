import React, { useEffect, useRef } from "react";
import "./Background.css";

export default function Background({
  lettersSpeed = 0.25, // 0.1–0.35 = sutil; 0.4–0.6 = más marcado
  maxOffset = 220      // límite de píxeles para evitar salirse
}) {
  const wrapRef = useRef(null);
  const lettersRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const onScroll = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (!wrapRef.current) return;

      // distancia del top de la sección al top del viewport (negativa cuando ya pasaste el top)
      const rect = wrapRef.current.getBoundingClientRect();
      const yInSection = -rect.top; // px scrolleados dentro de la sección (≈ 0 en el inicio)

      // mueve menos que el scroll para dar sensación de profundidad
      let offset = yInSection * lettersSpeed;

      if (maxOffset) {
        const lim = Math.abs(maxOffset);
        if (offset >  lim) offset =  lim;
        if (offset < -lim) offset = -lim;
      }

      if (lettersRef.current) {
        lettersRef.current.style.setProperty("--ly", `${Math.round(offset)}px`);
      }
      rafRef.current = null;
    });
  };

  onScroll(); // posición inicial
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, [lettersSpeed, maxOffset]);


  return (
    <div ref={wrapRef} className="bg-fixed">
      <img src="/images/fondoMono.png" alt="Fondo" className="bg-image" />
      <img
        ref={lettersRef}
        src="/images/letters.png"
        alt="Letras"
        className="letters-overlay"
      />
    </div>
  );
}
