import React, { useMemo, useState, useEffect, useRef } from "react";
import "./Skills.css";

const CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "design", label: "Diseño" },
  { id: "testing", label: "Testing" },
  { id: "others", label: "Otros" },
];

const SKILLS = [
  {
    name: "HTML5",
    level: 90,
    category: "frontend",
    tags: ["Semántica", "Accesibilidad"],
  },
  {
    name: "CSS3",
    level: 88,
    category: "frontend",
    tags: ["Responsive", "Animations"],
  },
  {
    name: "JavaScript",
    level: 86,
    category: "frontend",
    tags: ["APIs", "Performance"],
  },
  {
    name: "React",
    level: 85,
    category: "frontend",
    tags: ["Hooks", "SPA", "Rutas"],
  },
  {
    name: "TypeScript",
    level: 60,
    category: "frontend",
    tags: ["Tipado", "Interfaces"],
  },
  {
    name: "PHP",
    level: 60,
    category: "backend",
    tags: ["Laravel", "Web"],
  },
  {
    name: "Java",
    level: 75,
    category: "backend",
    tags: ["POO", "Spring"],
  },
  {
    name: "Base de Datos",
    level: 72,
    category: "backend",
    tags: ["Modelado", "Optimización"],
  },
  { name: "Vite", level: 78, category: "frontend", tags: ["Build rápido"] },
  {
    name: "Node.js",
    level: 72,
    category: "backend",
    tags: ["Express", "APIs REST"],
  },
  {
    name: "SQL",
    level: 70,
    category: "backend",
    tags: ["Consultas", "Índices"],
  },
  {
    name: "PL/SQL (Oracle)",
    level: 68,
    category: "backend",
    tags: ["Procedimientos", "Funciones"],
  },
  {
    name: "Git / GitHub",
    level: 82,
    category: "devops",
    tags: ["Flow", "PRs", "Issues"],
  },
  { name: "Docker", level: 58, category: "devops", tags: ["Contenedores"] },
  { name: "Figma", level: 80, category: "design", tags: ["Prototipos", "UI"] },
  { name: "Jest", level: 52, category: "testing", tags: ["Unit Tests"] },
  {
    name: "Accesibilidad (a11y)",
    level: 60,
    category: "others",
    tags: ["WCAG", "Semántica"],
  },
  {
    name: "SEO Técnico",
    level: 60,
    category: "others",
    tags: ["Metas", "Sitemaps"],
  },
];

const HIGHLIGHTS = [
  { label: "Stack principal", value: "React / Node" },
  { label: "Proyectos", value: "+10" },
  { label: "Experiencia", value: "6 meses" },
  { label: "Producción", value: "Deploy CI/CD" },
];

export default function Skills() {
  const [active, setActive] = useState("all");
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

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
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const yInSection = -rect.top;
      const bgOff = yInSection * 0.12;
      if (bgRef.current)
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

    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [active]);

  const filtered = useMemo(() => {
    if (active === "all") return SKILLS;
    return SKILLS.filter((s) => s.category === active);
  }, [active]);

  return (
    <section
      className={`skills-wrap ${
        enter ? "page-enter page-enter-active" : "page-enter"
      }`}
      id="habilidades"
      ref={sectionRef}
    >
      <div
        ref={bgRef}
        className="skills-bg-img"
        style={{
          backgroundImage: 'url("/images/fondoHabilidades.png")',
        }}
        aria-hidden="true"
      />

      <div className="skills-bg" aria-hidden="true" />

      <div className="skills-container">
        <header className="skills-header">
          <h2>Habilidades</h2>
          <p className="skills-sub">
            Tecnologías, herramientas y competencias que utilizo a diario para
            construir experiencias rápidas, accesibles y con buena DX.
          </p>
          <div className="skills-highlights">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="hl-card">
                <span className="hl-value">{h.value}</span>
                <span className="hl-label">{h.label}</span>
              </div>
            ))}
          </div>
        </header>

        <div
          className="skills-filter"
          role="tablist"
          aria-label="Filtrar habilidades"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={`pill ${active === cat.id ? "is-active" : ""}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((s) => (
            <article
              key={`${active}-${s.name}`}
              className="skill-card hidden"
              aria-label={`${s.name} nivel ${s.level}%`}
            >
              <div className="skill-top">
                <h3>{s.name}</h3>
                <span className="skill-level">{labelFromLevel(s.level)}</span>
              </div>

              <div className="bar">
                <span className="bar-fill" style={{ width: `${s.level}%` }} />
              </div>

              {s.tags?.length ? (
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <h1>Competencias e Idiomas</h1>
        <div className="skills-bottom">
          <div className="soft">
            <h3>Soft skills</h3>
            <ul>
              <li>Autocontrol</li>
              <li>Resolución de problemas</li>
              <li>Trabajo en equipo</li>
              <li>Autonomía y proactividad</li>
              <li>Aprendizaje continuo</li>
              <li>Organización</li>
              <li>Responsabilidad</li>
              <li>Paciencia</li>
              <li>Empatía</li>
            </ul>
          </div>
          <div className="langs">
            <h3>Idiomas</h3>
            <ul>
              <li>Español — Nativo</li>
              <li>Inglés — B1</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function labelFromLevel(n) {
  if (n >= 85) return "Experto";
  if (n >= 70) return "Avanzado";
  if (n >= 55) return "Intermedio";
  return "Básico";
}
