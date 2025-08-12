// ./components/SmoothScroll/smoothScroll.js
import Lenis from '@studio-freight/lenis'

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 0.6, // estable, rápida, sin exceso de cola
    easing: (t) => 1 - Math.pow(1 - t, 2), // arranca rápido, frena suave
    wheelMultiplier: 1.0, // velocidad al scroll
    touchMultiplier: 1.4,
    smooth: true,
    smoothTouch: false
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  window.__lenis = lenis
}
