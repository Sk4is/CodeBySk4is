import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ft-wrap" id="footer">
      {/* línea neón superior */}
      <div className="ft-divider" aria-hidden="true" />

      <div className="ft-inner">
        {/* Brand */}
        <div className="ft-brand">
          <a href="/" className="ft-logo">
            <img src="/images/logo.png" alt="CodeBySk4is" />
          </a>
          <p className="ft-tagline">CodeBySk4is — build, learn, ship.</p>
        </div>

        {/* Navegación */}
        <nav className="ft-nav" aria-label="Footer">
          <div className="ft-col">
            <h3>Secciones</h3>
            <ul>
              <li>
                <a href="#sobre-mi">Sobre mí</a>
              </li>
              <li>
                <a href="#habilidades">Habilidades</a>
              </li>
              <li>
                <a href="#proyectos">Proyectos</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="ft-col">
            <h3>Contacto</h3>
            <ul>
              <li>
                <a href="mailto:sk4is@example.com">sk4is@example.com</a>
              </li>
              <li>
                <a
                  href="https://github.com/tuUsuario"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tuUsuario"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="ft-col">
            <h3>Sígueme</h3>
            <div className="ft-social">
              <a
                className="ico"
                href="https://github.com/tuUsuario"
                aria-label="GitHub"
              >
                {/* GitHub */}
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.19-3.37-1.19-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2z"
                  />
                </svg>
              </a>
              <a
                className="ico"
                href="https://x.com/tuUsuario"
                aria-label="X/Twitter"
              >
                {/* X */}
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M18.9 2H22l-8.6 9.8L22.7 22h-6.6l-5.2-6.8L4 22H1l9.4-10.7L1.1 2h6.7l4.7 6.2L18.9 2z"
                  />
                </svg>
              </a>
              <a
                className="ico"
                href="https://www.linkedin.com/in/tuUsuario"
                aria-label="LinkedIn"
              >
                {/* LinkedIn */}
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.06c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.81 2.67 4.81 6.14V24h-4v-7.1c0-1.69-.03-3.88-2.37-3.88-2.38 0-2.74 1.86-2.74 3.77V24h-4V8z"
                  />
                </svg>
              </a>
              <a
                className="ico"
                href="mailto:sk4is@example.com"
                aria-label="Email"
              >
                {/* Mail */}
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* línea fin + copy */}
      <div className="ft-bottom">
        <small>
          © {new Date().getFullYear()} CodeBySk4is. Todos los derechos
          reservados.
        </small>
        <a
          href="#top"
          className="ft-top"
          aria-label="Volver arriba"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          ↑
        </a>
      </div>
    </footer>
  );
}
