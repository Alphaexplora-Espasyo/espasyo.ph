// DetailModal.tsx
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { X, Instagram, Facebook, Play, ChevronLeft, ChevronRight } from "lucide-react";

// Helper to resolve public paths
const resolvePath = (p?: string): string => p ? p.replace(/^public\//, '/') : '';

interface DetailModalProps {
  item: {
    id: string | number;
    businessName: string;
    industry: string[];
    services: string[];
    links?: {
      website?: string;
      facebook?: string;
      instagram?: string;
    };
    testimonial: string;
    media?: {
      video?: string;
      image1?: string;
      image2?: string;
      image3?: string;
    };
    placeholderImage?: string;
    src: string;
  };
  originRect: DOMRect;
  onClose: () => void;
}

const DetailModal = ({ item, originRect, onClose }: DetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [play, setPlay] = useState(false);

  // Compute available media
  const availableMedia: { type: 'video' | 'image'; src: string; id: string }[] = [];
  
  if (item.media?.video) {
    availableMedia.push({ type: 'video', src: item.media.video, id: 'video' });
  }
  if (item.media?.image1) {
    availableMedia.push({ type: 'image', src: item.media.image1, id: 'image1' });
  }
  if (item.media?.image2) {
    availableMedia.push({ type: 'image', src: item.media.image2, id: 'image2' });
  }
  if (item.media?.image3) {
    availableMedia.push({ type: 'image', src: item.media.image3, id: 'image3' });
  }

  // Fallback if no media array items exist
  if (availableMedia.length === 0) {
    availableMedia.push({ type: 'image', src: item.placeholderImage || item.src, id: 'fallback' });
  }

  const activeMedia = availableMedia[activeIndex];

  useLayoutEffect(() => {
    if (!mediaRef.current) return;

    const finalRect = mediaRef.current.getBoundingClientRect();

    const dx = originRect.left - finalRect.left;
    const dy = originRect.top - finalRect.top;
    const sx = originRect.width / finalRect.width;
    const sy = originRect.height / finalRect.height;

    const ctx = gsap.context(() => {
      // Create a master timeline for the opening sequence
      const tl = gsap.timeline();
      
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 0)
      .from(mediaRef.current, {
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        duration: 0.8,
        ease: "expo.out",
      }, 0)
      .from(detailsRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.6,
        ease: "power3.out",
      }, 0.2); // Details fade in slightly after media expansion starts
    });

    return () => ctx.revert();
  }, [originRect]);

  // Handle closing animation
  const handleClose = () => {
    if (!mediaRef.current || !overlayRef.current || !detailsRef.current) {
      onClose();
      return;
    }
    
    const finalRect = mediaRef.current.getBoundingClientRect();
    const dx = originRect.left - finalRect.left;
    const dy = originRect.top - finalRect.top;
    const sx = originRect.width / finalRect.width;
    const sy = originRect.height / finalRect.height;

    const tl = gsap.timeline({ onComplete: onClose });
    
    tl.to(detailsRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.4,
      ease: "power2.in"
    }, 0)
    .to(mediaRef.current, {
      x: dx,
      y: dy,
      scaleX: sx,
      scaleY: sy,
      duration: 0.6,
      ease: "expo.inOut"
    }, 0.1)
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in"
    }, 0.2); // Fade overlay slightly after media starts shrinking
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
      />

      {/* modal */}
      <div
        ref={modalRef}
        className="relative z-10 flex flex-col md:flex-row w-[92vw] max-w-6xl h-[78vh] rounded-2xl overflow-hidden bg-[#2b3327]/60 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
      >
        {/* close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-50 text-[#e6dfc8] hover:text-white transition"
        >
          <X size={22} />
        </button>

        {/* media (Carousel Container) */}
        <div
          ref={mediaRef}
          className="relative w-full h-[40%] md:w-[58%] md:h-full overflow-hidden bg-black shrink-0 flex flex-col"
        >
          {/* Active Media Display */}
          <div className="w-full h-full relative">
            {activeMedia.type === 'video' ? (
              <div className="w-full h-full">
                {!play ? (
                  <>
                    <img
                      src={resolvePath(item.placeholderImage || item.src)}
                      alt={item.businessName}
                      className="w-full h-full object-contain opacity-80"
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition cursor-pointer hover:scale-105"
                      onClick={() => setPlay(true)}
                    >
                      <div className="rounded-full bg-white/20 backdrop-blur-md p-4 md:p-6 border border-white/30 shadow-2xl">
                        <Play size={34} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe
                    src={resolvePath(activeMedia.src).replace("/open?id=", "/file/d/").replace("/view", "/preview")}
                    title="Video"
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            ) : (
              <img 
                src={resolvePath(activeMedia.src)} 
                alt={`${item.businessName} gallery`} 
                className="w-full h-full object-contain" 
              />
            )}
          </div>

          {/* Carousel Navigation Arrows */}
          {availableMedia.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev === 0 ? availableMedia.length - 1 : prev - 1));
                  setPlay(false);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors border border-white/10"
                aria-label="Previous Media"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev === availableMedia.length - 1 ? 0 : prev + 1));
                  setPlay(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors border border-white/10"
                aria-label="Next Media"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Carousel Navigation Dots */}
          {availableMedia.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              {availableMedia.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setPlay(false); // Reset video play state when changing slides
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? "bg-[#DDA79A] w-8" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* details */}
        <div
          ref={detailsRef}
          className="w-full h-[60%] md:w-[42%] md:h-full px-6 py-8 md:px-10 md:py-12 flex flex-col overflow-y-auto pointer-events-auto custom-scrollbar"
        >
          <h3 className="uppercase tracking-widest text-[16px] md:text-[20px] text-[#DDA79A] mb-4 font-bold font-display opacity-80 shrink-0">
            About Our Client
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-display uppercase text-[24px] md:text-[32px] text-[#B56A54] font-bold leading-tight mb-3">
                {item.businessName}
              </p>
              
              {item.industry && item.industry.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.industry.map((ind, idx) => (
                    <span key={idx} className="inline-block bg-[#DDA79A]/15 text-[#e6dfc8] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#DDA79A]/30">
                      {ind}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {item.services && item.services.length > 0 && (
              <div className="pt-2">
                <p className="font-display uppercase text-[12px] text-[#DDA79A] font-semibold tracking-widest mb-2 opacity-70">
                  Services Provided
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 ml-4 block w-full">
                  <ul className="text-[#f2f0e9] font-body text-[14px] leading-relaxed opacity-90 list-disc list-outside space-y-1 block w-full">
                    {item.services.slice(0, 4).map((service, idx) => (
                      <li key={idx} className="break-words" title={service}>{service}</li>
                    ))}
                  </ul>
                  {item.services.length > 4 && (
                    <ul className="text-[#f2f0e9] font-body text-[14px] leading-relaxed opacity-90 list-disc list-outside space-y-1 block w-full">
                      {item.services.slice(4, 8).map((service, idx) => (
                        <li key={idx} className="break-words" title={service}>{service}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="my-6 h-px bg-white/10" />

          <blockquote className="italic text-lg md:text-xl leading-relaxed opacity-90 mb-auto text-[#efe9d5] font-body border-l-2 border-[#DDA79A]/50 pl-4">
            “{item.testimonial}”
          </blockquote>

          <div className="mt-8 flex items-center gap-4 pt-4 border-t border-white/5">
            {item.links?.website && (
              <a
                href={item.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#DDA79A] text-[#2b3327] hover:bg-[#B56A54] hover:text-white transition-colors px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widermr-auto"
              >
                View Website
              </a>
            )}

            <div className="flex gap-4 ml-auto text-[#DDA79A]">
              {item.links?.facebook && (
                <a
                  href={item.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              )}

              {item.links?.instagram && (
                <a
                  href={item.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
