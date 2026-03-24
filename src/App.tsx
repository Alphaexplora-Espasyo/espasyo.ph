import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
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

  const GlobalCTA = () => {
    const { pathname } = useLocation();
    if (pathname === '/contact' || pathname === '/resources') return null;
  
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === '/') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('scrollToSection', { detail: 'contact' }));
      }
    };
    return (
      <Link to="/contact" onClick={handleClick} title="Want to join the community?" className="fixed bottom-6 right-4 md:right-8 z-[150] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-[#B56A54] text-[#FDF4DC] rounded-full shadow-2xl hover:scale-110 hover:bg-[#3A2618] transition-all duration-300 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="group-hover:animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
      </Link>
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="antialiased bg-[#FDF4DC] min-h-screen relative">
        <GlobalCTA />
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
