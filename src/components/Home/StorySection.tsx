import { useState, useRef, useEffect, type MouseEvent } from 'react';

interface StorySectionProps {
  testimonialData: any[];
  handleViewAllClick: () => void;
  handleGalleryTransition: () => void;
  handlePolaroidClick: (item: any, e: MouseEvent<HTMLDivElement>) => void;
}

const StorySection = ({
  testimonialData,
  handleViewAllClick,
  handleGalleryTransition,
  handlePolaroidClick
}: StorySectionProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scrollEl = scrollAreaRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute visibility flags based on scroll progress (0 to 1)
  const originStoryVisible = scrollProgress > 0.3;
  const missionVisible = scrollProgress > 0.7;

  return (
    <div 
      ref={scrollAreaRef}
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-[#FDF4DC] transition-colors duration-1000"
      data-lenis-prevent="true"
    >
      {/* THE MASK: Completely hides polaroids that scroll up out of the green frame. Sits flush with top spacing. */}
      {/* On mobile: 152px top space. On desktop: 168px top space. */}
      <div className="sticky top-0 left-0 w-full h-[152px] md:h-[168px] bg-[#FDF4DC] z-[60] pointer-events-none -mb-[152px] md:-mb-[168px] border-b-[8px] border-[#FDF4DC]"></div>

      <div className="relative z-10 flex flex-col md:flex-row w-full min-h-[max-content] px-4 sm:px-6 md:pl-8 md:pr-12 pt-[152px] md:pt-[168px] gap-2 sm:gap-6 md:gap-8 pb-32">
        
        {/* TEXT PANEL (Mobile: Top, Desktop: Right) */}
        {/* Sticky keeps it on screen securely as you naturally scroll through the full page container! */}
        <div id="our-story" className="order-1 md:order-2 flex-none md:flex-1 md:w-1/2 h-[40vh] min-h-[300px] md:h-[calc(100vh-180px)] sticky top-[152px] md:top-[168px] z-20 flex flex-col justify-start md:justify-center bg-[#FDF4DC] md:bg-transparent -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:pl-16 mb-2 md:mb-0">
          
          <div className="relative w-full h-full overflow-hidden">
            {/* Panel 1: Intro */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${originStoryVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] text-[#4B533E]">Our Story</h2>
              <div className="max-w-3xl font-body text-sm sm:text-lg md:text-xl opacity-80 leading-relaxed space-y-2 sm:space-y-6 text-justify text-[#4B533E]">
                <p>ESPASYO Coworking &amp; Office Space nurtures a dynamic community from a diverse array of businesses &amp; individuals across various sectors.</p>
                <p>Established in 2018 by a group of educators, ESPASYO promotes engagement &amp; collaboration among like-minded professionals.</p>
                <p className="font-bold pb-4 md:pb-0 text-[#B56A54]">Scroll to see our origin story.</p>
              </div>
            </div>

            {/* Panel 2: Origin Story */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${originStoryVisible && !missionVisible ? 'opacity-100 translate-y-0' : originStoryVisible && missionVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <p className="font-display text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-3 font-bold text-[#B56A54]">Origin Story</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] text-[#4B533E]">How It All Started</h2>
              <div className="max-w-3xl font-body text-xs sm:text-base md:text-lg opacity-80 leading-relaxed space-y-2 sm:space-y-5 text-justify text-[#4B533E]">
                <p>It began with a simple observation by our founder, <strong>Ms. Tina</strong>. She noticed that many talented freelancers and small business owners were isolated — working from noisy cafes or lonely bedrooms.</p>
                <p>She didn't want to build just another office hub with cubicles. She envisioned a sanctuary — a place where creatives could collide, collaborate, and grow together.</p>
              </div>
              <blockquote className="mt-4 sm:mt-8 italic text-sm sm:text-xl md:text-2xl leading-relaxed opacity-90 font-display border-l-4 pl-3 sm:pl-6 pb-4 md:pb-0 border-[#B56A54] text-[#4B533E]">
                "Espasyo isn't about the desk you rent. It's about the person sitting next to you."
              </blockquote>
            </div>

            {/* Panel 3: Mission */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <p className="font-display text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-3 font-bold text-[#B56A54]">Mission</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] text-[#4B533E]">OUR COLLECTIVE IMPACT</h2>
              <div className="max-w-3xl font-body text-xs sm:text-base md:text-lg opacity-80 leading-relaxed space-y-2 sm:space-y-5 text-justify text-[#4B533E]">
                <p>ESPASYO is committed to providing accessible, innovative, and professional workspace and virtual business solutions that support entrepreneurs, freelancers, and growing enterprises—through space, service, and a strong community network.</p>
              </div>
              <blockquote className="mt-4 sm:mt-8 italic text-sm sm:text-lg md:text-xl leading-relaxed opacity-90 font-display border-l-4 pl-3 sm:pl-6 pb-4 md:pb-0 border-[#B56A54] text-[#4B533E]">
                "A COMMUNITY OF ENTREPRENEURS EMPOWERED TO CONNECT, COLLABORATE AND SUCCEED."
              </blockquote>
            </div>
          </div>
        </div>

        {/* POLAROIDS FRAME (Mobile: Bottom, Desktop: Left) */}
        <div className="order-2 md:order-1 flex-1 relative w-full pointer-events-none mt-2 md:mt-0">
          
          {/* THE FIXED GREEN BACKGROUND! Sticky enforces it behaves like a rigid picture frame on desktop. */}
          <div className="hidden md:block sticky top-[168px] w-full h-[calc(100vh-180px)] bg-[#4B533E] rounded-3xl shadow-inner z-[5]"></div>

          {/* POLAROIDS FOREGROUND. Stretches height and draws Native Scrolling vertically over the frame. */}
          {/* On Mobile: The bg color is applied here directly. On Desktop: It's transparent since the sticky frame is behind it. */}
          <div className="relative z-10 flex flex-col items-center gap-y-16 lg:gap-y-24 md:-mt-[calc(100vh-180px)] py-12 md:py-16 px-4 md:px-8 pointer-events-auto w-full bg-[#4B533E] md:bg-transparent rounded-3xl md:rounded-none shadow-inner md:shadow-none">
            {testimonialData.filter(item => !item.isViewAll).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={(e) => handlePolaroidClick(item, e)}
                  className={`polaroid-entry bg-[#FDF4DC] p-4 sm:p-6 md:p-8 lg:p-12 pb-16 sm:pb-20 md:pb-24 lg:pb-32 polaroid-shadow hover:scale-[1.02] transition-transform duration-500 ease-out w-full max-w-[400px] md:max-w-[550px] lg:max-w-[700px] group rounded-xl mx-auto cursor-pointer`}
                >
                  <div className="aspect-square w-full overflow-hidden mb-4 sm:mb-5 md:mb-6 relative rounded-lg bg-[#3A2618]/5 shadow-inner flex items-center justify-center">
                    <img src={item.src || ''} alt={item.caption} className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-mono font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#482216] tracking-tight leading-tight">{item.caption}</h3>
                  </div>
                </div>
              );
            })}

            {/* Grouped CTAs with smaller gap */}
            <div className="flex flex-col items-center w-full gap-y-4 sm:gap-y-6 lg:gap-y-8 w-full max-w-[400px] md:max-w-[550px] lg:max-w-[700px]">
              {/* View Testimonials CTA */}
              <div 
                onClick={handleViewAllClick} 
                className="w-full bg-[#FDF4DC] polaroid-shadow rounded-2xl py-6 sm:py-8 lg:py-10 flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.02] mx-auto"
              >
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest mb-2 transition-colors text-[#4B533E] group-hover:text-[#B56A54] text-center">View All Testimonials</h3>
                <div className="text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-2 text-[#4B533E] group-hover:text-[#B56A54]">→</div>
              </div>

              {/* View entire gallery CTA button */}
              <button 
                onClick={handleGalleryTransition}
                className="w-full bg-[#FDF4DC] polaroid-shadow rounded-2xl py-6 sm:py-8 lg:py-10 flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.02] mx-auto"
              >
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest mb-2 transition-colors text-[#4B533E] group-hover:text-[#B56A54] text-center">View The Gallery</h3>
                <div className="text-xl sm:text-2xl transform transition-transform duration-300 group-hover:translate-x-2 text-[#4B533E] group-hover:text-[#B56A54]">→</div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StorySection;

