import React from "react";
import "./Background.css";

export default function Background() {
  return (
    <div className="bg-fixed">
      <img src="/images/fondoMono.png" alt="Fondo" className="bg-image" />
      <img src="/images/letters.png" alt="Letras" className="letters-overlay" />
    </div>
  );
}
