import React, { useEffect, useRef, useState, useMemo } from "react";
import "./Projects.css";

const PROJECTS = [
  {
    title: "GameVault",
    href: "https://game-vault-omega.vercel.app",
    cover: "/images/gameVault.png",
    year: "2025",
    tags: ["React", "Vite", "JavaScript"],
    desc: "Plataforma donde podrás explorar y coleccionar juegos.",
    longDesc:
      "GameVault es una plataforma moderna todo-en-uno para los jugadores, donde se pueden descubrir, coleccionar y disfrutar videojuegos de una manera única. Ofrece un catálogo amplio y en constante crecimiento, con los últimos lanzamientos, éxitos populares, clásicos atemporales y joyas ocultas de todos los géneros.",
    features: [
      "Catálogo filtrable",
      "Búsqueda avanzada",
      "Animaciones",
      "Tema claro/oscuro",
    ],
    stack: ["React", "Vite", "CSS3", "HTML5", "JavaScript", "Express", "MySQL", "Axios", "React Router"],
    repo: "https://github.com/Sk4is/gameVault",
    demo: "https://game-vault-omega.vercel.app",
    target: "_blank",
  },
  {
    title: "Hotel Johnnie Walker",
    href: "https://hoteljohnniewalker.vercel.app",
    cover: "/images/hotelJohnnieWalker.png",
    year: "2025",
    tags: ["React", "Vite" , "JavaScript", "API"],
    desc: "Experiencia profesional e interactiva para el hotel Johnnie Walker.",
    longDesc:
      "La página web del Johnnie Walker Hotel es el portal oficial donde los visitantes pueden conocer el hotel, sus servicios y realizar reservas.",
    features: ["Información avanzada de habitaciones", "Detalles del restaurante", "Visión general de los servicios y facilidades disponibles", "Opción de reservar habitaciones en línea"],
    stack: ["Vite", "JavaScript", "JSON Server", "React", "Tailwind CSS", "React Router", "Emailjs", "Cloudinary", "Framer Motion"],
    repo: "https://github.com/RubenMRDev/hotelJohnnieWalker.git",
    demo: "https://hoteljohnniewalker.vercel.app",
    target: "_blank",
  },
  {
    title: "Eye Of The Doom",
    href: "https://eye-of-the-doom.vercel.app",
    cover: "/images/eyeOfTheDoom.png",
    year: "2024",
    tags: ["JavaScript", "CSS3", "HTML5"],
    desc: "Juego de azar y supervivencia inspirado en la clásica Wheel of Doom.",
    longDesc:
      "En Eye Of The Doom los jugadores asumen el papel de astronautas inmóviles, incapaces de escapar de la mirada de un enorme ojo amenazante que domina el campo de batalla. Este ojo dispara rayos mortales al azar, eliminando uno a uno a los participantes hasta que solo queda un sobreviviente: el ganador absoluto.",
    features: ["Modos de juego", "Clasificación", "Giroscopio", "Efectos de sonido"],
    stack: ["JavaScript", "CSS3", "HTML5", "Bootstrap"],
    repo: "https://github.com/LozzDev/EyeOfTheDoom.git",
    demo: "https://eye-of-the-doom.vercel.app",
    target: "_blank",
  },
  {
    title: "To Do List",
    href: "https://to-do-list-rose-theta-11.vercel.app",
    cover: "/images/toDoList.png",
    year: "2024",
    tags: ["React", "Charts", "API"],
    desc: "Panel con gráficos en tiempo real y dark mode.",
    longDesc:
      "Consumo de API en streaming, caching y actualización en vivo de gráficas con diseño dark accesible.",
    features: ["Streaming SSE", "Cache SWR", "Export CSV"],
    stack: ["React", "Recharts", "SWR"],
    repo: "https://github.com/Sk4is/toDoList",
    demo: "https://to-do-list-rose-theta-11.vercel.app",
    target: "_blank",
  },
  {
    title: "Breeze Flow",
    cover: "/images/breezeFlow.png",
    year: "2025",
    tags: ["React", "Charts", "API"],
    desc: "Panel con gráficos en tiempo real y dark mode.",
    longDesc:
      "Consumo de API en streaming, caching y actualización en vivo de gráficas con diseño dark accesible.",
    features: ["Streaming SSE", "Cache SWR", "Export CSV"],
    stack: ["React", "Recharts", "SWR"],
    repo: "https://github.com/Bimai6/breeze-flow",
    target: "_blank",
  },
  {
    title: "Móstoles Web Agency",
    href: "https://mostoles-web-design-silo.vercel.app",
    cover: "/images/mostoles.png",
    year: "2025",
    tags: ["React", "Charts", "API"],
    desc: "Panel con gráficos en tiempo real y dark mode.",
    longDesc:
      "Consumo de API en streaming, caching y actualización en vivo de gráficas con diseño dark accesible.",
    features: ["Streaming SSE", "Cache SWR", "Export CSV"],
    stack: ["React", "Recharts", "SWR"],
    repo: "https://github.com/Sk4is/mostoles-web-design-silo",
    demo: "https://mostoles-web-design-silo.vercel.app",
    target: "_blank",
  },
  {
    title: "Alcalá Web Agency",
    cover: "/images/alcala.png",
    year: "2025",
    tags: ["React", "Charts", "API"],
    desc: "Panel con gráficos en tiempo real y dark mode.",
    longDesc:
      "Consumo de API en streaming, caching y actualización en vivo de gráficas con diseño dark accesible.",
    features: ["Streaming SSE", "Cache SWR", "Export CSV"],
    stack: ["React", "Recharts", "SWR"],
    repo: "https://github.com/Sk4is/alcala-web-craft",
    target: "_blank",
  },
  {
    title: "Skull King",
    href: "https://skull-king-theta.vercel.app",
    cover: "/images/skullKing.png",
    year: "2026",
    tags: ["React", "Charts", "API"],
    desc: "Panel con gráficos en tiempo real y dark mode.",
    longDesc:
      "Consumo de API en streaming, caching y actualización en vivo de gráficas con diseño dark accesible.",
    features: ["Streaming SSE", "Cache SWR", "Export CSV"],
    stack: ["React", "Recharts", "SWR"],
    repo: "https://github.com/Sk4is/skull-king",
    demo: "https://skull-king-theta.vercel.app",
    target: "_blank",
  },
  {
    title: "Tetris",
    cover: "/images/tetris.png",
    year: "2025",
    tags: ["React", "Charts", "API"],
    desc: "Panel con gráficos en tiempo real y dark mode.",
    longDesc:
      "Consumo de API en streaming, caching y actualización en vivo de gráficas con diseño dark accesible.",
    features: ["Streaming SSE", "Cache SWR", "Export CSV"],
    stack: ["React", "Recharts", "SWR"],
    repo: "https://github.com/Sk4is/tetris",
    target: "_blank",
  },
];

function ProjectCard({ p, idx, open, onToggle }) {
  const panelRef = useRef(null);
  const panelId = `proj-details-${idx}`;
  const external = /^https?:\/\//i.test(p.href);
  const linkProps = external
    ? { href: p.href, target: "_blank", rel: "noreferrer" }
    : { href: p.href };

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    if (open) {
      el.style.height = el.scrollHeight + "px";
      const toAuto = () => {
        if (open) el.style.height = "auto";
      };
      el.addEventListener("transitionend", toAuto, { once: true });
    } else {
      const current = el.getBoundingClientRect().height;
      el.style.height = current + "px";
      el.offsetHeight;
      el.style.height = "0px";
    }
  }, [open]);

  return (
    <article className="proj-card hidden">
      <a className="proj-link" aria-label={`Abrir ${p.title}`} {...linkProps}>
        <div className="proj-cover">
          <img src={p.cover} alt={p.title} loading="lazy" />
          <span className="proj-year">{p.year}</span>
          <div className="proj-overlay">
            <h3 className="proj-title">
              {p.title} <i aria-hidden>↗</i>
            </h3>
          </div>
        </div>
      </a>

      <div className="proj-meta">
        <div className="proj-tags">
          {p.tags?.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {p.desc ? <p className="proj-desc">{p.desc}</p> : null}

        <button
          type="button"
          className={`proj-toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {open ? "Ocultar detalles" : "Ver detalles"}
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
          </svg>
        </button>

        <div
          id={panelId}
          ref={panelRef}
          className={`proj-details ${open ? "open" : ""}`}
          role="region"
          aria-label={`Detalles de ${p.title}`}
        >
          <div className="proj-details-inner">
            {p.longDesc && <p className="long">{p.longDesc}</p>}

            <div className="details-cols">
              {p.features?.length ? (
                <div>
                  <h4>Destacado</h4>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {p.stack?.length ? (
                <div>
                  <h4>Tecnologías</h4>
                  <div className="chips">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {(p.repo || p.demo) && (
              <div className="detail-links">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="mini-cta"
                  >
                    Demo
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="mini-cta ghost"
                  >
                    Código
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  const [openIdx, setOpenIdx] = useState(null);

  const [enter, setEnter] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEnter(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handler = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const yInSection = -rect.top;
      const bgOff = yInSection * 0.12;
      bgRef.current.style.setProperty("--py", `${bgOff.toFixed(0)}px`);
    };

    handler();
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    } else {
      const onScroll = () => requestAnimationFrame(handler);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal");
            e.target.classList.remove("hidden");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sectionRef.current
      ?.querySelectorAll(".proj-card")
      ?.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cards = useMemo(() => PROJECTS, []);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className={`projects-wrap ${
        enter ? "page-enter page-enter-active" : "page-enter"
      }`}
    >
      <div
        ref={bgRef}
        className="projects-bg-img"
        style={{ backgroundImage: 'url("/images/fondoProyectos.png")' }}
        aria-hidden="true"
      />
      <div className="projects-bg" aria-hidden="true" />

      <div className="projects-container">
        <header className="projects-header">
          <h2>Proyectos</h2>
          <p className="projects-sub">
            Una selección de trabajos recientes. Haz clic en la imagen/título
            para abrir el proyecto o usa <b>Ver detalles</b> para más info.
          </p>
        </header>

        <div className="projects-grid">
          {cards.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              idx={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
