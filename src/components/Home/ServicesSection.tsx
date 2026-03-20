import { type RefObject, type MouseEvent, type TouchEvent } from 'react';
import { Check } from 'lucide-react';
import Services360 from './Services360';

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
  return (
    <section className="h-screen shrink-0 bg-transparent border-l-2 border-[#FDF4DC]/20 relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-[96px]" style={{ width: '100vw' }}>
      {/* UPDATED: Dynamic Background Text using the new `bgText` property */}
      <div
        key={activeService.bgText} // Key forces re-render/animation on change
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 animate-fade-in"
      >
        <h1 className="font-display text-[12vw] sm:text-[14vw] md:text-[16vw] lg:text-[18vw] leading-none uppercase tracking-tighter text-[#3E4A35] opacity-30 whitespace-nowrap">
          {activeService.bgText}
        </h1>
      </div>

      <div ref={servicesContentRef} className="w-full relative z-10 flex flex-col">
        <Services360 />

        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 py-12 sm:py-16 md:py-24 w-full min-h-screen">
          <div className="flex flex-col items-center w-full max-w-5xl">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <p className="font-body text-xs sm:text-sm tracking-widest uppercase mb-2 opacity-80">Our Expertise</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none">SERVICES</h2>
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
                <button onClick={prevSlide} className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 border-2 border-[#FDF4DC] rounded-full flex items-center justify-center hover:bg-[#FDF4DC] hover:text-[#3A2618] transition-colors font-bold text-sm md:text-lg">←</button>
                <div className="flex gap-2 sm:gap-2.5 md:gap-3">
                  {serviceCategories.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#FDF4DC] w-3 sm:w-4' : 'bg-[#FDF4DC]/30'}`} />
                  ))}
                </div>
                <button onClick={nextSlide} className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 border-2 border-[#FDF4DC] rounded-full flex items-center justify-center hover:bg-[#FDF4DC] hover:text-[#3A2618] transition-colors font-bold text-sm md:text-lg">→</button>
              </div>
              <button onClick={handleGalleryClick} className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2 border-2 border-[#FDF4DC] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FDF4DC] hover:text-[#3A2618] transition-colors">Show All Gallery</button>
            </div>

            {/* UPDATED: Detailed Services Container below Carousel (Stacked Grid for consistent max-height) */}
            <div className="w-full max-w-5xl relative mt-8 grid">
              {serviceCategories.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`col-start-1 row-start-1 w-full bg-[#FDF4DC]/5 border border-[#FDF4DC]/10 rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 pointer-events-none translate-y-4'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#FDF4DC]/20 pb-6 md:pb-8 mb-6 md:mb-8 gap-4">
                    <div className="text-left">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mb-2 text-[#FDF4DC]">
                        {service.title}
                      </h3>
                      <p className="font-body opacity-70 max-w-2xl text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-1">Provided by</span>
                      {service.providerLink ? (
                        <a
                          href={service.providerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-base sm:text-lg md:text-xl uppercase tracking-wider text-[#FDF4DC] hover:text-white transition-colors underline decoration-[#FDF4DC]/30 hover:decoration-white/70 underline-offset-4 cursor-pointer"
                        >
                          {service.provider}
                        </a>
                      ) : (
                        <span className="font-display text-base sm:text-lg md:text-xl uppercase tracking-wider text-[#FDF4DC]">
                          {service.provider}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Services Grid with Checkmarks and Nested Lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {service.services.map((subService: any, idx: number) => (
                      <div key={idx} className="flex flex-col">
                        <h4 className="font-display text-lg sm:text-xl uppercase tracking-wide text-[#FDF4DC] mb-3 flex items-start gap-2">
                          <span className="text-[#FDF4DC] mt-1 shrink-0"><Check size={16} /></span>
                          {subService.title}
                        </h4>

                        {subService.items.length > 0 && (
                          <ul className="flex flex-col gap-2 pl-6">
                            {subService.items.map((item: string, i: number) => (
                              <li key={i} className="text-sm font-body text-[#FDF4DC]/60 leading-relaxed list-disc marker:text-[#DDA79A]/50">
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

          <div className="w-full max-w-5xl text-center border-t border-[#FDF4DC]/20 pt-16 mt-16">
            <h3 className="font-display text-4xl uppercase tracking-widest mb-12 opacity-60">Why Espasyo?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4">
              <div><h4 className="font-display text-2xl uppercase text-[#FDF4DC] mb-3 leading-none">LEGAL &<br />COMPLIANCE</h4><p className="font-body text-sm opacity-80 leading-relaxed">We ensure your business meets all regulatory requirements without the headache.</p></div>
              <div><h4 className="font-display text-2xl uppercase text-[#FDF4DC] mb-3 leading-none">COST<br />EFFICIENT</h4><p className="font-body text-sm opacity-80 leading-relaxed">Reduce overhead costs with our flexible virtual packages.</p></div>
              <div><h4 className="font-display text-2xl uppercase text-[#FDF4DC] mb-3 leading-none">TRUSTED &<br />DEPENDABLE</h4><p className="font-body text-sm opacity-80 leading-relaxed">With 8 years experience supporting nearly 100 MSMEs.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
