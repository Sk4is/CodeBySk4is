import React, { useEffect, useRef } from "react";
import "./Description.css";

export default function Description() {
  const sectionsRef = useRef([]);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("show")
        ),
      { threshold: 0.2 }
    );
    sectionsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
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
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <section ref={sectionRef} className="desc-wrap" id="curriculum">
      <div
        ref={bgRef}
        className="desc-bg"
        style={{ backgroundImage: 'url("/images/fondoSobreMi.png")' }}
        aria-hidden="true"
      />

      <div className="desc-content">
        <div className="desc-container">
          <h2 className="desc-title">SOBRE MÍ</h2>

          <div ref={addToRefs} className="desc-section hidden">
            <h3>Perfil</h3>
            <p>
              Hola! Mi nombre es Adrián y soy un profesional apasionado y
              comprometido con una sólida formación en desarrollo web (DAW) y
              desarrollo de aplicaciones multiplataforma (DAM). Mi experiencia
              abarca desde el diseño y la creación de sitios web fáciles de usar
              hasta el desarrollo de aplicaciones móviles versátiles. A lo largo
              de mis estudios, he adquirido un conocimiento profundo en una
              amplia gama de tecnologías, tanto en el desarrollo front-end como
              back-end.
            </p>
            Tengo habilidades en lenguajes como HTML, CSS, JavaScript, PHP, y
            frameworks como React y Angular, con un gran interés en seguir
            aprendiendo y mantenerme actualizado con las últimas tendencias y
            herramientas del mundo tecnológico.
            <p>
              Disfruto tanto de trabajar en entornos colaborativos como de
              gestionar proyectos de manera independiente. Me motiva encontrar
              soluciones innovadoras a problemas complejos y mejorar la
              experiencia del usuario, ya sea en equipo o de manera autónoma. Mi
              objetivo es aportar mis habilidades y creatividad a proyectos que
              tengan un impacto positivo en el espacio digital.
            </p>
          </div>

          <div ref={addToRefs} className="desc-section hidden">
            <h3>Formación</h3>
            <ul>
              <li>
                <strong>Título B1 - Cambridge.</strong> — Escuela de idiomas
                St.James (2018 - 2019)
              </li>
              <li>
                <strong>Título de bachillerato.</strong> — Colegio Aljarafe
                S.C.A (2019 - 2021)
              </li>
              <li>
                <strong>
                  Técnico superior en desarrollo de aplicaciones
                  multiplataforma.
                </strong> — Campus Camara, Sevilla (2021 - 2023)
              </li>
              <li>
                <strong>
                  Certificado en ciberseguridad defensiva y hacking ético.
                </strong> — UDEMY (2023 - 2024)
              </li>
              <li>
                <strong>
                  Técnico superior en desarrollo de aplicaciones web.
                </strong> — CEI (2024 - 2025)
              </li>
            </ul>
          </div>

          <div ref={addToRefs} className="desc-section hidden">
            <h3>Experiencia</h3>
            <ul>
              <li>
                <strong>Consultor de bases de datos de Oracle</strong> — SHS
                Consultores SL (Marzo 2023 - Junio 2023)
                <p>
                  Prácticas de empresa, enfocada al mantenimiento de la base de
                  datos del ayuntamiento de Sevilla, en particular:
                </p>
                <ul class="list">
                  <li>1. Mantenimiento de BBDD.</li>
                  <li>2. Corrección de errores.</li>
                  <li>3. Creación de funciones y procedimientos PL/SQL.</li>
                  <li>4. Uso de Oracle y lenguaje SQL.</li>
                  <li>5. Realización de fichas técnicas para las BBDD.</li>
                </ul>
              </li>
              <li>
                <strong>Desarrollador web</strong> — Doblerc Comunicaciones S.L.
                (Abril 2025 - Junio 2025)
                <p>
                  Prácticas de empresa, enfocada a la creación de páginas web,
                  dónde realizo un panel genérico para gestionar datos de
                  clientes y productos.
                </p>
              </li>
            </ul>
          </div>

          <div ref={addToRefs} className="desc-section hidden">
            <h3>Habilidades</h3>
            <div className="desc-skills">
              <span>Java</span>
              <span>SQL</span>
              <span>JavaScript</span>
              <span>React</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>Figma</span>
              <span>TypeScript</span>
              <span>Oracle</span>
              <span>Bases de Datos</span>
              <span>PHP</span>
              <span>Herramientas UML</span>
              <span>XML</span>
              <span>Android Studio</span>
              <span>Microsoft Visual Studio Code</span>
              <span>Laravel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
