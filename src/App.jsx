import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import { initSmoothScroll } from "./components/SmoothScroll/smoothScroll";
import "./index.css";

const App = () => {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
