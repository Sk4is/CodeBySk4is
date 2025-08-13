import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutMePage";
import Skills from "./pages/SkillsPage";
import { initSmoothScroll } from "./components/SmoothScroll/smoothScroll";
import "./index.css";

const App = () => {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre-mi" element={<About />} />
      <Route path="/habilidades" element={<Skills />} />
    </Routes>
  );
};

export default App;
