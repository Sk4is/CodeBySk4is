import React, { useEffect, useRef, useState } from "react";
import "./ParallaxHome.css";

const tiles = [
  { label: "SOBRE MÍ",    href: "/sobre-mi",    src: "/images/sobreMi.png",    alt: "Sobre mí" },
  { label: "HABILIDADES", href: "/habilidades", src: "/images/habilidades.png", alt: "Habilidades" },
  { label: "PROYECTOS",   href: "/proyectos",   src: "/images/proyectos.png",   alt: "Proyectos" },
  { label: "CONTACTO",    href: "/contacto",    src: "/images/contacto.png",    alt: "Contacto" },
];

export default function ParallaxHome({
  backgroundSrc = "/images/fondo.png",
}) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);

  const [animClass, setAnimClass] = useState("page-enter");
  useEffect(() => {
    const t = setTimeout(() => {
      setAnimClass("page-enter page-enter-active");
    }, 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const yInSection = -rect.top;

      const bgOff = yInSection * 0.12;
      if (bgRef.current) bgRef.current.style.setProperty("--py", `${bgOff.toFixed(0)}px`);
    };

    handler();

    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    } else {
      const onScroll = () => requestAnimationFrame(handler);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <section ref={sectionRef} className={`pt-wrap ${animClass}`}>
      <div
        ref={bgRef}
        className="pt-bg"
        style={{ backgroundImage: `url("${backgroundSrc}")` }}
        aria-hidden="true"
      />

      <div className="pt-content">
        <h1>Secciones</h1>
        <div className="pt-container">
          <div ref={gridRef} className="pt-grid" role="list">
            {tiles.map((t, i) => (
              <a key={i} href={t.href} className="pt-tile" role="listitem" aria-label={t.label}>
                <img className="pt-img" src={t.src} alt={t.alt} loading="lazy" />
                <span className="pt-label">{t.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
