import React, { useEffect, useRef, useState } from "react";
import "./Background.css";

export default function Background({
  lettersSpeed = 0.25,
  maxOffset = 220,
  mouseTilt = 6,
  mouseShift = 24
}) {
  const wrapRef = useRef(null);
  const lettersRef = useRef(null);

  const [animClass, setAnimClass] = useState("page-enter");
  useEffect(() => {
    const t = setTimeout(() => setAnimClass("page-enter page-enter-active"), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!wrapRef.current || !lettersRef.current) return;

        const rect = wrapRef.current.getBoundingClientRect();
        let offset = (-rect.top) * lettersSpeed;
        if (maxOffset) {
          const lim = Math.abs(maxOffset);
          if (offset >  lim) offset =  lim;
          if (offset < -lim) offset = -lim;
        }
        lettersRef.current.style.setProperty("--ly", `${Math.round(offset)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [lettersSpeed, maxOffset]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (!wrapRef.current || !lettersRef.current) return;

    let rafId = null;
    let tx = 0, ty = 0, rX = 0, rY = 0;
    let kx = 0, ky = 0, krX = 0, krY = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      kx = Math.max(-1, Math.min(1, nx)) * mouseShift;
      ky = 0;
      krY = Math.max(-1, Math.min(1, nx)) * mouseTilt;
      krX = Math.max(-1, Math.min(1, -ny)) * mouseTilt;
      if (!rafId) tick();
    };

    const tick = () => {
      tx = lerp(tx, kx, 0.12);
      ty = lerp(ty, ky, 0.12);
      rX = lerp(rX, krX, 0.12);
      rY = lerp(rY, krY, 0.12);

      lettersRef.current.style.setProperty("--mx", `${tx.toFixed(2)}px`);
      lettersRef.current.style.setProperty("--rx", `${rX.toFixed(2)}deg`);
      lettersRef.current.style.setProperty("--ry", `${rY.toFixed(2)}deg`);

      if (Math.abs(tx - kx) > 0.1 || Math.abs(rX - krX) > 0.1 || Math.abs(rY - krY) > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const el = wrapRef.current;
    el.addEventListener("mousemove", onMove, { passive: true });

    const onLeave = () => {
      kx = 0; ky = 0; krX = 0; krY = 0;
      if (!rafId) tick();
    };
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseShift, mouseTilt]);

  return (
    <div ref={wrapRef} className={`bg-fixed ${animClass}`}>
      <img src="/images/fondoMono.png" alt="Fondo" className="bg-image" />
      <img
        ref={lettersRef}
        src="/images/logoLetras.png"
        alt="Letras"
        className="letters-overlay"
      />
    </div>
  );
}
