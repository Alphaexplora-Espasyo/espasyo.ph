import { type RefObject, type MouseEvent, type TouchEvent, useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ServicesSectionProps {
  activeService: any;
  servicesContentRef: RefObject<HTMLDivElement | null>;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: () => void;
  serviceCategories: any[];
  currentIndex: number;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  setIsHovering: (val: boolean) => void;
  setTilt: (val: { x: number; y: number }) => void;
  tilt: { x: number; y: number };
  isHovering: boolean;
  prevSlide: () => void;
  nextSlide: () => void;
  handleGalleryClick: () => void;
  getSlideStyles: (index: number) => { className: string; isCenter: boolean };
}

const ServicesSection = ({
  activeService,
  servicesContentRef,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  serviceCategories,
  currentIndex,
  handleMouseMove,
  setIsHovering,
  setTilt,
  tilt,
  isHovering,
  prevSlide,
  nextSlide,
  handleGalleryClick,
  getSlideStyles,
}: ServicesSectionProps) => {
  // --- PARALLAX EFFECT ---
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const scrollCol = document.getElementById('main-scroll-column');
    if (!scrollCol) return;
    const handleScroll = () => {
      setScrollY(scrollCol.scrollTop);
    };
    scrollCol.addEventListener('scroll', handleScroll);
    return () => scrollCol.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full relative min-h-fit bg-transparent pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12">
      {/* STICKY GHOST TEXT LAYER: Corrected to emerge early and stay relatively centered */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <h1
          key={activeService.bgText}
          className="font-display text-[18vw] leading-none uppercase tracking-tighter text-[#F0EAD6] opacity-[0.035] whitespace-nowrap lg:whitespace-normal text-center px-4 will-change-transform"
          style={{
            transform: `translateY(${(scrollY * 0.1) - 100}px)`,
          }}
        >
          {activeService.bgText}
        </h1>
      </div>

      {/* FOREGROUND CONTENT: Floats over the centered background */}
      <div ref={servicesContentRef} className="w-full relative z-10 flex flex-col mt-[-100vh] pt-8 sm:pt-12 md:pt-16">

        {/* NEW: Why Espasyo at the TOP - Masked to hide background text */}
        <div className="w-full flex flex-col items-center bg-[#2C3628] relative z-20 pb-12">
          <div className="w-full max-w-5xl text-center pt-4 md:pt-6">
            <h3 className="font-display text-4xl uppercase tracking-widest mb-12 text-[#F0EAD6]/30">Why Espasyo?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4">
              <div>
                <h4 className="font-display text-2xl uppercase text-[#DFA878] mb-3 leading-none">LEGAL &<br />COMPLIANCE</h4>
                <p className="font-body text-sm text-[#F0EAD6]/70 leading-relaxed">We ensure your business meets all regulatory requirements without the headache.</p>
              </div>
              <div>
                <h4 className="font-display text-2xl uppercase text-[#DFA878] mb-3 leading-none">COST<br />EFFICIENT</h4>
                <p className="font-body text-sm text-[#F0EAD6]/70 leading-relaxed">Reduce overhead costs with our flexible virtual packages.</p>
              </div>
              <div>
                <h4 className="font-display text-2xl uppercase text-[#DFA878] mb-3 leading-none">TRUSTED &<br />DEPENDABLE</h4>
                <p className="font-body text-sm text-[#F0EAD6]/70 leading-relaxed">With 8 years experience supporting nearly 100 MSMEs.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 py-8 sm:py-12 md:py-16 w-full">
          <div className="flex flex-col items-center w-full max-w-5xl">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <p className="font-body text-xs sm:text-sm tracking-widest uppercase mb-2 text-[#F0EAD6]/60 font-medium">Our Expertise</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none text-[#F0EAD6]">SERVICES</h2>
            </div>

            <div
              className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] mb-4 sm:mb-6 md:mb-8 flex items-center justify-center perspective-1000 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {serviceCategories.map((service, index) => {
                const { className, isCenter } = getSlideStyles(index);
                return (
                  <div
                    key={`${service.title}-${index}`}
                    onMouseMove={isCenter ? handleMouseMove : undefined}
                    onMouseEnter={isCenter ? () => setIsHovering(true) : undefined}
                    onMouseLeave={isCenter ? () => { setIsHovering(false); setTilt({ x: 0, y: 0 }); } : undefined}
                    className={`absolute top-0 w-[90vw] sm:w-[80vw] md:w-72 h-[250px] sm:h-[300px] md:h-80 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${className}`}
                    style={{
                      transform: isCenter && isHovering
                        ? `translateX(-50%) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                        : undefined,
                      transition: isHovering ? 'transform 0.1s ease-out' : 'all 0.7s cubic-bezier(0.25,0.8,0.25,1)'
                    }}
                  >
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    {isCenter && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" style={{ opacity: isHovering ? 0.3 + (tilt.y / 20) : 0, transition: 'opacity 0.3s' }} />}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-end p-3 sm:p-4 md:p-6 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                      <h3 className="font-display text-sm sm:text-base md:text-xl uppercase tracking-tight text-[#FDF4DC] leading-tight">{service.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                <button onClick={prevSlide} className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 border-2 border-[#F0EAD6] text-[#F0EAD6] rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors font-bold text-sm md:text-lg">←</button>
                <div className="flex gap-2 sm:gap-2.5 md:gap-3">
                  {serviceCategories.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#DFA878] w-3 sm:w-4' : 'bg-[#F0EAD6]/20'}`} />
                  ))}
                </div>
                <button onClick={nextSlide} className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 border-2 border-[#F0EAD6] text-[#F0EAD6] rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors font-bold text-sm md:text-lg">→</button>
              </div>
              <button onClick={handleGalleryClick} className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2 border-2 border-[#F0EAD6] text-[#F0EAD6] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors">Show All Gallery</button>
            </div>

            {/* UPDATED: Milk Glass Detailed Services Container - Height now flexible to content */}
            <div className="w-full max-w-5xl relative mt-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500">
              {serviceCategories.map((service, index) => (
                <div
                  key={service.id}
                  className={`w-full p-6 sm:p-8 md:p-10 transition-all duration-500 ease-in-out ${index === currentIndex ? 'relative opacity-100 z-10' : 'absolute top-0 left-0 opacity-0 z-0 pointer-events-none'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 md:pb-8 mb-6 md:mb-8 gap-4">
                    <div className="text-left">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mb-2 text-[#F0EAD6]">
                        {service.title}
                      </h3>
                      <p className="font-body text-[#F0EAD6]/80 max-w-2xl text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFA878] block mb-1 font-body">Serviced by our trusted community:</span>
                      {service.providerLink ? (
                        <a
                          href={service.providerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-sm md:text-base uppercase tracking-wider text-[#F0EAD6] hover:text-[#DFA878] transition-colors underline decoration-white/20 hover:decoration-[#DFA878]/50 underline-offset-4 cursor-pointer"
                        >
                          {service.provider}
                        </a>
                      ) : (
                        <span className="font-display text-sm md:text-base uppercase tracking-wider text-[#F0EAD6]">
                          {service.provider}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Services Grid with Checkmarks and Nested Lists - Reverted to grid and removed box styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
                    {service.services.map((subService: any, idx: number) => (
                      <div key={idx} className="flex flex-col">
                        <h4 className="font-display text-lg sm:text-xl uppercase tracking-wide text-[#F0EAD6] mb-3 flex items-start gap-2">
                          <span className="text-[#DFA878] mt-1 shrink-0"><Check size={16} /></span>
                          {subService.title}
                        </h4>

                        {subService.items.length > 0 && (
                          <ul className="flex flex-col gap-2 pl-6">
                            {subService.items.map((item: string, i: number) => (
                              <li key={i} className="text-sm font-body text-[#F0EAD6]/60 leading-relaxed list-disc marker:text-[#DFA878]/30">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
