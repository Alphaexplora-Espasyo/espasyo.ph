import Navbar from '../components/Common/Navbar';
import { useGalleryViewModel } from '../hooks/useGalleryViewModel';

const Gallery = () => {
  const { state, actions, refs } = useGalleryViewModel();

  return (
    <div className="h-screen w-screen bg-[#FDF4DC] overflow-hidden relative select-none touch-none">
      <Navbar theme="default" />

      {/* ── CREAM INTRO OVERLAY (auto-dismisses after 5 s) ── */}
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none"
        style={{
          background: '#FDF4DC',
          opacity: state.overlayVisible ? 1 : 0,
          transition: 'opacity 0.9s ease-out',
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-4 md:gap-8">
            <h1
              className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-[#2C1A0E]"
              style={{
                textShadow: '6px 6px 0px rgba(58,38,24,0.18), 12px 8px 24px rgba(58,38,24,0.12)',
                opacity: state.animationState.titleStep >= 1 ? 1 : 0,
                transform: state.animationState.titleStep >= 1 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              OUR
            </h1>
            <h1
              className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-[#2C1A0E]"
              style={{
                textShadow: '6px 6px 0px rgba(58,38,24,0.18), 12px 8px 24px rgba(58,38,24,0.12)',
                opacity: state.animationState.titleStep >= 2 ? 1 : 0,
                transform: state.animationState.titleStep >= 2 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '0.2s',
              }}
            >
              KA-ESPASYO
            </h1>
          </div>
        </div>
      </div>

      {/* ── DRAG INDICATOR (stays after overlay leaves, removed on click) ── */}
      <div
        className="fixed inset-0 z-[105] flex items-center justify-center pointer-events-none"
        style={{
          opacity: !state.overlayVisible && state.indicatorVisible ? 1 : 0,
          transition: 'opacity 0.7s ease-out',
          transitionDelay: !state.overlayVisible && state.indicatorVisible ? '0.3s' : '0s',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex items-center gap-2 font-body text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white"
            style={{ textShadow: '0 2px 8px rgba(30,12,4,0.7), 0 1px 2px rgba(0,0,0,0.9)' }}
          >
            <span className="animate-flash-dot w-2 h-2 rounded-full bg-white inline-block shrink-0"
              style={{ boxShadow: '0 0 6px 2px rgba(0,0,0,0.6)' }} />
            <span>Drag to see more</span>
          </div>
          <svg
            className="animate-mouse-shake"
            xmlns="http://www.w3.org/2000/svg"
            width="28" height="40" viewBox="0 0 28 40"
            fill="none"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}
          >
            <rect x="1.5" y="1.5" width="25" height="37" rx="12.5" stroke="white" strokeWidth="2.5" />
            <line x1="14" y1="1.5" x2="14" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <rect x="11" y="10" width="6" height="10" rx="3" fill="white" opacity="0.7">
              <animate attributeName="y" values="10;13;10" dur="1.2s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>

      {/* ── GALLERY CANVAS ── */}
      <div
        ref={refs.containerRef}
        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <div className="relative w-0 h-0">
          {state.items.map((item, i) => (
            <div
              key={item.id}
              ref={el => { refs.itemsRef.current[i] = el; }}
              className={`absolute top-0 left-0 group perspective-1000 z-0 hover:z-[100] ${state.animationState.isDragging ? 'pointer-events-none' : ''} p-2 sm:p-3 w-[40vw] h-[40vw] -ml-[20vw] -mt-[20vw] md:w-[14vw] md:h-[14vw] md:-ml-[7vw] md:-mt-[7vw]`}
              style={{ willChange: 'transform', opacity: 0, transform: 'scale(0.5)' }}
              onClick={() => actions.handleClick(item.src)}
            >
              <div className="w-full h-full relative transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:rotate-[2deg] shadow-md hover:shadow-xl rounded-sm overflow-hidden bg-[#3A2618]">
                <img
                  src={item.src}
                  alt={`Gallery Image ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const retry = Number(img.dataset.retry || 0);
                    const options = ['.png', '.JPG', '.jpeg', '.webp'];

                    if (retry < options.length) {
                      img.src = img.src.replace(/\.(jpg|png|jpeg|webp|JPG)$/, options[retry]);
                      img.dataset.retry = String(retry + 1);
                    } else if (retry === options.length) {
                      img.src = img.src.replace(/\/g(\d+)\.[a-zA-Z]+$/, '/G$1.jpg');
                      img.dataset.retry = String(retry + 1);
                    } else {
                      img.src = 'https://res.cloudinary.com/dlk93aehl/image/upload/v1774459535/g30.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-[#3A2618]/60 group-hover:bg-[#3A2618]/10 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={refs.proxyRef} className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" />

      {/* ── LIGHTBOX ── */}
      {state.selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-pointer backdrop-blur-md"
          onClick={() => actions.setSelectedImage(null)}
        >
          <img
            src={state.selectedImage}
            alt="Enlarged gallery view"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-scale-up"
            loading="lazy"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-3 transition-colors flex items-center justify-center backdrop-blur-sm"
            onClick={() => actions.setSelectedImage(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1);   }
        }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        @keyframes flash-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.15; transform: scale(0.55); }
        }
        .animate-flash-dot { animation: flash-dot 1s ease-in-out infinite; }

        @keyframes mouse-shake {
          0%,  100% { transform: translateX(0)    rotate(0deg); }
          20%        { transform: translateX(-6px) rotate(-8deg); }
          40%        { transform: translateX(6px)  rotate(8deg); }
          60%        { transform: translateX(-4px) rotate(-5deg); }
          80%        { transform: translateX(4px)  rotate(5deg); }
        }
        .animate-mouse-shake { animation: mouse-shake 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Gallery;