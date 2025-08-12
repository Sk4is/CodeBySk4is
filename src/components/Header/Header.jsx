import React, { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cambia estilo al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Evita scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const toggleMenu = () => setOpen((s) => !s);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a href="/" className="brand" aria-label="Ir al inicio">
            <img src="/images/logo.png" alt="Sk4is" className="brand-logo" />
          </a>

          <button
            className={`hamburger ${open ? "is-active" : ""}`}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Overlay + menú con blur */}
      <div
        className={`menu-overlay ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={closeMenu}
      >
        <nav
          id="main-menu"
          className="menu-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="menu-list">
            <li><a href="#inicio" onClick={closeMenu}>INICIO</a></li>
            <li><a href="#sobre-mi" onClick={closeMenu}>SOBRE MÍ</a></li>
            <li><a href="#habilidades" onClick={closeMenu}>HABILIDADES</a></li>
            <li><a href="#proyectos" onClick={closeMenu}>PROYECTOS</a></li>
            <li><a href="#contacto" onClick={closeMenu}>CONTACTO</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
