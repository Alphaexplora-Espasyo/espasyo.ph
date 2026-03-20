import { type RefObject, type MouseEvent } from 'react';

interface StorySectionProps {
  marqueeRef: RefObject<HTMLDivElement | null>;
  marqueeText: string[];
  introFinished: boolean;
  isDarkTheme: boolean;
  originStoryVisible: boolean;
  missionVisible: boolean;
  testimonialColumnRef: RefObject<HTMLDivElement | null>;
  testimonialData: any[];
  handleViewAllClick: (e: MouseEvent<HTMLDivElement>) => void;
  handlePolaroidClick: (item: any, e: MouseEvent<HTMLDivElement>) => void;
}

const StorySection = ({
  marqueeRef,
  marqueeText,
  introFinished,
  isDarkTheme,
  originStoryVisible,
  missionVisible,
  testimonialColumnRef,
  testimonialData,
  handleViewAllClick,
  handlePolaroidClick,
}: StorySectionProps) => {
  return (
    <section className="h-full flex shrink-0 overflow-hidden relative pt-[96px] pb-2 bg-transparent w-[100vw]">
      <div ref={marqueeRef} className={`w-[50px] sm:w-[60px] md:w-[70px] h-[calc(100vh-104px)] mx-2 border-2 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative bg-[#FDF4DC] border-[#3A2618] text-[#3A2618] ${introFinished ? '' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vh] flex gap-2 -rotate-90">
          <div className="animate-infinite-scroll flex gap-6 sm:gap-7 md:gap-8 shrink-0 items-center justify-around opacity-60">
            {marqueeText.map((text, i) => <h2 key={`t1-${i}`} className="font-display text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap">{text}</h2>)}
          </div>
          <div className="animate-infinite-scroll flex gap-6 sm:gap-7 md:gap-8 shrink-0 items-center justify-around opacity-60">
            {marqueeText.map((text, i) => <h2 key={`t2-${i}`} className="font-display text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap">{text}</h2>)}
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col md:grid md:grid-cols-2 gap-2 sm:gap-6 md:gap-8 h-full px-4 sm:px-6 md:pl-8 md:pr-12 relative pt-8 md:pt-0">
        <div id="our-story" className="order-1 md:order-2 flex-none h-[40%] min-h-[300px] md:h-full md:min-h-0 flex flex-col justify-center md:sticky top-0 px-2 sm:px-6 md:pl-16 mb-2 md:mb-0 z-10 relative overflow-hidden">
          {/* Panel 1: Intro — visible until origin story kicks in */}
          <div className={`absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:pl-16 transition-all duration-700 ease-in-out ${originStoryVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <h2 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]'}`}>Our Story</h2>
            <div className={`max-w-3xl font-body text-sm sm:text-lg md:text-xl opacity-80 leading-relaxed space-y-2 sm:space-y-6 text-justify transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]'}`}>
              <p>ESPASYO Coworking &amp; Office Space nurtures a dynamic community from a diverse array of businesses &amp; individuals across various sectors.</p>
              <p>Established in 2018 by a group of educators, ESPASYO promotes engagement &amp; collaboration among like-minded professionals.</p>
              <p className={`font-bold pb-4 md:pb-0 transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#B56A54]'}`}>Scroll to see our origin story.</p>
            </div>
          </div>

          {/* Panel 2: Origin Story — visible after first 3 polaroids */}
          <div className={`absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:pl-16 transition-all duration-700 ease-in-out ${originStoryVisible && !missionVisible ? 'opacity-100 translate-y-0' : originStoryVisible && missionVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
            <p className={`font-display text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-3 font-bold ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#B56A54]'}`}>Origin Story</p>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]'}`}>How It All Started</h2>
            <div className={`max-w-3xl font-body text-xs sm:text-base md:text-lg opacity-80 leading-relaxed space-y-2 sm:space-y-5 text-justify transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]'}`}>
              <p>It began with a simple observation by our founder, <strong>Ms. Tina</strong>. She noticed that many talented freelancers and small business owners were isolated — working from noisy cafes or lonely bedrooms.</p>
              <p>She didn't want to build just another office hub with cubicles. She envisioned a sanctuary — a place where creatives could collide, collaborate, and grow together.</p>
            </div>
            <blockquote className={`mt-4 sm:mt-8 italic text-sm sm:text-xl md:text-2xl leading-relaxed opacity-90 font-display border-l-4 pl-3 sm:pl-6 transition-colors duration-1000 pb-4 md:pb-0 ${isDarkTheme ? 'border-[#FDF4DC] text-[#FDF4DC]' : 'border-[#B56A54] text-[#3A2618]'}`}>
              "Espasyo isn't about the desk you rent. It's about the person sitting next to you."
            </blockquote>
          </div>

          {/* Panel 3: Mission — visible after next 3 polaroids */}
          <div className={`absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:pl-16 transition-all duration-700 ease-in-out ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
            <p className={`font-display text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-3 font-bold ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#B56A54]'}`}>Mission</p>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]'}`}>OUR COLLECTIVE IMPACT</h2>
            <div className={`max-w-3xl font-body text-xs sm:text-base md:text-lg opacity-80 leading-relaxed space-y-2 sm:space-y-5 text-justify transition-colors duration-1000 ${isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]'}`}>
              <p>ESPASYO is committed to providing accessible, innovative, and professional workspace and virtual business solutions that support entrepreneurs, freelancers, and growing enterprises—through space, service, and a strong community network.</p>
            </div>
            <blockquote className={`mt-4 sm:mt-8 italic text-sm sm:text-lg md:text-xl leading-relaxed opacity-90 font-display border-l-4 pl-3 sm:pl-6 transition-colors duration-1000 pb-4 md:pb-0 ${isDarkTheme ? 'border-[#FDF4DC] text-[#FDF4DC]' : 'border-[#B56A54] text-[#3A2618]'}`}>
              "A COMMUNITY OF ENTREPRENEURS EMPOWERED TO CONNECT, COLLABORATE AND SUCCEED."
            </blockquote>
          </div>
        </div>
        <div className="order-2 md:order-1 flex-1 md:h-full flex justify-center items-start overflow-hidden relative bg-[#3A2618] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 my-2 sm:my-3 md:my-4 ml-0 shadow-inner">
          <div ref={testimonialColumnRef} className="flex flex-col items-center justify-start w-full gap-y-8 sm:gap-y-16 md:gap-y-24 lg:gap-y-32 pb-32 pt-12 md:pt-16 lg:pt-24">
            {testimonialData.map((item) => {
              if (item.isViewAll) {
                return (
                  <div key={item.id} onClick={handleViewAllClick} className={`polaroid-entry ${introFinished ? '' : 'opacity-0'} view-all-card flex-shrink-0 w-full max-w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto min-h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl bg-[#FDF4DC] polaroid-shadow flex flex-col items-center justify-center cursor-pointer group transition-colors duration-300 p-6 sm:p-8 mx-auto`}>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mb-4 transition-colors text-[#482216] group-hover:text-[#908660] text-center">{item.caption}</h3>
                    <div className="text-2xl sm:text-3xl md:text-4xl transform -rotate-45 group-hover:rotate-0 transition-all duration-300 text-[#482216] group-hover:text-[#908660]">➔</div>
                  </div>
                );
              }
              return (
                <div
                  key={item.id}
                  onClick={(e) => handlePolaroidClick(item, e)}
                  className={`polaroid-entry ${introFinished ? '' : 'opacity-0'} flex-shrink-0 bg-[#FDF4DC] p-4 sm:p-6 md:p-8 lg:p-12 pb-16 sm:pb-20 md:pb-24 lg:pb-32 polaroid-shadow ${item.rotate} hover:rotate-0 transition-transform duration-500 ease-out w-full max-w-[400px] md:max-w-[550px] lg:max-w-[700px] group rounded-xl mx-auto cursor-pointer`}
                >
                  <div className="aspect-square w-full overflow-hidden mb-4 sm:mb-5 md:mb-6 relative rounded-lg bg-gray-200 shadow-inner">
                    <img src={item.src || ''} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-caption text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#482216] tracking-tight leading-tight">{item.caption}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
