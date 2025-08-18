import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [enter, setEnter] = useState(false);

  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setEnter(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    const fullName = `${form.firstName} ${form.lastName}`.trim();

    const fd = new FormData();
    fd.append("firstName", form.firstName);
    fd.append("lastName", form.lastName);
    fd.append("email", form.email);
    fd.append("message", form.message);

    fd.append("_captcha", "false");
    fd.append("_template", "box");
    fd.append("_subject", `Mensaje de ${fullName} — CodeBySk4is`);
    fd.append("_replyto", form.email);
    fd.append("_from", `${fullName} — CodeBySk4is`);

    try {
      const res = await fetch("https://formsubmit.co/adrianperezagredano@gmail.com", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("No se pudo enviar el mensaje.");
      setSent(true);
      setForm({ firstName: "", lastName: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError("Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className={`contact-wrap ${enter ? "page-enter page-enter-active" : "page-enter"}`}
    >
      <div
        ref={bgRef}
        className="contact-bg-img"
        style={{ backgroundImage: 'url("/images/fondoContacto.png")' }}
        aria-hidden="true"
      />
      <div className="contact-bg" aria-hidden="true" />

      <div className="contact-container">
        <header className="contact-header">
          <h2>Contacto</h2>
          <p>¿Tienes una idea o proyecto? Escríbeme y te respondo enseguida.</p>
        </header>

        {sent && (
          <div className="popup-success" role="status" aria-live="polite">
            ✅ ¡Tu mensaje se envió correctamente!
          </div>
        )}
        {error && (
          <div className="popup-error" role="alert">
            {error}
          </div>
        )}

        <div className="contact-grid">
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Nombre
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Apellidos
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="msg-label">
              Mensaje
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="contact-btn">
              Enviar mensaje
            </button>
          </form>

          <aside className="contact-info">
            <div className="info-card">
              <h3>Información</h3>
              <ul>
                <li><strong>Nombre:</strong> Adrián Pérez Agredano</li>
                <li><strong>Email:</strong> adrianperezagredano@gmail.com</li>
                <li><strong>Respuesta:</strong> Inmediata 🚀</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
