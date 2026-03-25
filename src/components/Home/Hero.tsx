import { useState, useEffect, type RefObject } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/assets/landing/1.png',
  '/assets/landing/2.png',
  '/assets/landing/3.png',
  '/assets/landing/4.png',
  '/assets/landing/5.png',
  '/assets/landing/6.png',
  '/assets/landing/7.png',
  '/assets/landing/8.png',
  '/assets/landing/9.png',
  '/assets/landing/10.png',
  '/assets/landing/11.png'
];

interface HeroProps {
  heroTextRef1?: RefObject<HTMLHeadingElement | null>;
  introFinished: boolean;
  onNavigate: (direction: 'left' | 'right') => void;
}

const Hero = ({ introFinished, onNavigate }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen h-screen flex flex-col justify-center items-center overflow-hidden shrink-0">
      {/* Background Slideshow & Brown Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {/*
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dlk93aehl/video/upload/v1774184312/Untitled_design.mp4"
        />
        */}

        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <div
              className="w-full h-full bg-cover bg-center animate-breathe"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}

        {/* Brown overlay for yellow text pop */}
        <div className="absolute inset-0 bg-[#3A2618]/60 mix-blend-multiply z-10"></div>
      </div>

      {/* --- DIRECTIONAL NAVIGATION ARROWS --- */}
      <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>

        {/* Left Arrow -> Our Story */}
        <button
          onClick={() => onNavigate('left')}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center gap-2 text-[#FDF4DC] hover:text-white transition-all group"
        >
          <div className="w-12 h-12 rounded-full border border-[#FDF4DC]/30 bg-[#3A2618]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#3A2618]/40 transition-all">
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">Our Story</span>
        </button>

        {/* Right Arrow -> Testimonials/Community */}
        <button
          onClick={() => onNavigate('right')}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center gap-2 text-[#FDF4DC] hover:text-white transition-all group"
        >
          <div className="w-12 h-12 rounded-full border border-[#FDF4DC]/30 bg-[#3A2618]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#3A2618]/40 transition-all">
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">Community</span>
        </button>

      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-500 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-[#FDF4DC]/60">Our Services</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FDF4DC]/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#FDF4DC] animate-scroll-line" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
        @keyframes breathe {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-breathe {
          animation: breathe 16s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
