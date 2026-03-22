import { type RefObject } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  heroTextRef1: RefObject<HTMLHeadingElement | null>;
  introFinished: boolean;
  onNavigate: (direction: 'left' | 'right') => void;
}

const Hero = ({ heroTextRef1, introFinished, onNavigate }: HeroProps) => {
  return (
    <section className="relative w-screen h-screen flex flex-col justify-center items-center overflow-hidden shrink-0">
      {/* Background Video & Brown Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dlk93aehl/video/upload/v1774184312/Untitled_design.mp4"
        />
        {/* Brown overlay for yellow text pop */}
        <div className="absolute inset-0 bg-[#3A2618]/60 mix-blend-multiply"></div>
      </div>

      {/* Main Text Content */}
      <div className="z-10 relative flex flex-col items-center justify-center">
        <h1
          ref={heroTextRef1}
          className={`text-6xl sm:text-8xl md:text-10xl lg:text-[12rem] font-display text-[#FDF4DC] drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] uppercase text-center tracking-tighter leading-[0.8] ${introFinished ? '' : 'opacity-0'}`}
        >
          ESPASYO
        </h1>
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
      `}</style>
    </section>
  );
};

export default Hero;
