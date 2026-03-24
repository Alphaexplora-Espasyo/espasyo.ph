import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap"; // NEW IMPORT
import { ScrollTrigger } from "gsap/ScrollTrigger"; // NEW IMPORT

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

// Register ScrollTrigger globally here as well to be safe
gsap.registerPlugin(ScrollTrigger);

// Helper to reset scroll on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 2. CRITICAL: Sync Lenis scroll events with GSAP ScrollTrigger
    // This tells GSAP to update its calculations whenever Lenis scrolls the page.
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis to GSAP's Ticker
    // This ensures animations run in perfect sync with the smooth scroll
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert to milliseconds
    });

    // 4. Disable lag smoothing for smoother scroll performance
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="antialiased bg-[#FDF4DC] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
