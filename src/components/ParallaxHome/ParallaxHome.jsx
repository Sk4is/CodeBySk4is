import React, { useEffect, useRef } from "react";
import "./ParallaxHome.css";

const tiles = [
  { label: "SOBRE MÍ",    href: "#sobre-mi",    src: "/images/sobreMi.png",    alt: "Sobre mí" },
  { label: "HABILIDADES", href: "#habilidades", src: "/images/habilidades.png", alt: "Habilidades" },
  { label: "PROYECTOS",   href: "#proyectos",   src: "/images/proyectos.png",   alt: "Proyectos" },
  { label: "CONTACTO",    href: "#contacto",    src: "/images/contacto.png",    alt: "Contacto" },
];

export default function ParallaxHome({
  backgroundSrc = "/images/fondo.png",
  bgSpeed = 0.12,   // 0.08–0.16 = lejano
  fgExtra = 0.06,   // 0.04–0.10 = cercano (extra al movimiento normal)
  maxOffset = 320   // límite de seguridad (px)
}) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const handler = () => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const yInSection = -rect.top

    const bgOff = yInSection * 0.12  // lejano
    const fgOff = yInSection * 0.06  // cercano

    if (bgRef.current)  bgRef.current.style.setProperty("--py", `${bgOff.toFixed(0)}px`)
    // si usas gridRef para las tarjetas: gridRef.current.style.setProperty("--fy", `${fgOff.toFixed(0)}px`)
  }

  handler()

  // usa lenis si existe; si no, fallback a scroll
  const lenis = window.__lenis
  if (lenis) {
    lenis.on('scroll', handler)
    return () => lenis.off('scroll', handler)
  } else {
    const onScroll = () => requestAnimationFrame(handler)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }
}, [])


  return (
    <section ref={sectionRef} className="pt-wrap">
      {/* Fondo que se mueve más lento */}
      <div
        ref={bgRef}
        className="pt-bg"
        style={{ backgroundImage: `url("${backgroundSrc}")` }}
        aria-hidden="true"
      />

      {/* Contenido por delante */}
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
