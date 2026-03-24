import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Common/Navbar';
import { items } from '../constants/galleryData';
import { useGalleryAnimations } from '../hooks/useGalleryAnimations';

const Gallery = () => {
  const { refs, state } = useGalleryAnimations();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedImage]);

  const handleClick = useCallback((src: string) => {
    if (state.isDragging) return;
    setSelectedImage(src);
  }, [state.isDragging]);

  return (
    <div className="h-screen w-screen bg-[#FDF4DC] overflow-hidden relative select-none touch-none">
      <Navbar theme="default" />

      {/* Animated Title */}
      <div className="fixed inset-0 z-[105] flex items-center justify-center pointer-events-none select-none">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 md:gap-8 px-12 py-6 rounded-3xl bg-black/20 backdrop-blur-md border border-black/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            
            <h1 className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-white relative z-10"
              style={{ textShadow: '4px 4px 15px rgba(0,0,0,0.6), 10px 5px 0px #3A2618', opacity: state.titleStep >= 1 ? 1 : 0, transform: state.titleStep >= 1 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              OUR
            </h1>
            <h1 className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-white relative z-10"
              style={{ textShadow: '4px 4px 15px rgba(0,0,0,0.6), 10px 5px 0px #3A2618', opacity: state.titleStep >= 2 ? 1 : 0, transform: state.titleStep >= 2 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', transitionDelay: '0.2s' }}>
              GALLERY
            </h1>
          </div>

          <div className="flex items-center gap-2 font-body text-sm md:text-base font-bold uppercase tracking-widest text-[#3A2618] bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-lg mt-2"
            style={{ opacity: state.introComplete && !state.hasEverDragged ? 1 : 0, transform: state.introComplete && !state.hasEverDragged ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out', transitionDelay: state.hasEverDragged ? '0s' : '1s' }}>
            <div className="flex items-center gap-2" style={{ textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}>
              <span>Drag to explore</span>
              <span className="text-xl animate-pulse">→</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={refs.containerRef} className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden">
        <div className="relative w-0 h-0">
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={el => { refs.itemsRef.current[i] = el }}
              className={`absolute top-0 left-0 group perspective-1000 z-0 hover:z-[100] ${state.isDragging ? 'pointer-events-none' : ''} p-2 sm:p-3 w-[40vw] h-[40vw] -ml-[20vw] -mt-[20vw] md:w-[14vw] md:h-[14vw] md:-ml-[7vw] md:-mt-[7vw]`}
              style={{ willChange: 'transform', opacity: 0, transform: 'scale(0.5)' }}
              onClick={() => handleClick(item.src)}
            >
              <div className="w-full h-full relative transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:rotate-[2deg] shadow-md hover:shadow-xl rounded-sm overflow-hidden bg-[#3A2618]">
                <img src={item.src} alt={`Gallery Image ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-[#8B5A2B]/40 mix-blend-overlay group-hover:bg-[#8B5A2B]/0 transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 bg-[#3A2618]/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={refs.proxyRef} className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-pointer backdrop-blur-md transition-opacity duration-300" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged gallery view" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-scale-up" onClick={(e) => e.stopPropagation()} />
          <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-3 transition-colors flex items-center justify-center backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
      
      <style>{`
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default Gallery;