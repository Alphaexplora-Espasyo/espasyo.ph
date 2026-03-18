// DetailModal.tsx
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { X, Instagram, Facebook, Play, ChevronLeft, ChevronRight } from "lucide-react";

// Helper to resolve public paths
const resolvePath = (p?: string): string => p ? p.replace(/^public\//, '/') : '';

// IMPORTANT FIX: Helper to force external links to have https://
const formatUrl = (url?: string) => {
  if (!url) return '#';
  // Kung walang http:// o https://, lagyan natin para hindi basahin bilang local route ng Espasyo
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

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
      }, 0.2);
    });

    return () => ctx.revert();
  }, [originRect]);

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
    }, 0.2);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      {/* overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
      />

      {/* MODAL CONTAINER - Viewport-based scaling for max zoom compatibility */}
      <div
        ref={modalRef}
        className="relative z-10 flex flex-col md:flex-row w-[95vw] max-w-[1200px] h-[90vh] max-h-[900px] rounded-2xl overflow-hidden bg-[#2b3327]/80 backdrop-blur-sm shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
      >
        {/* close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/40 hover:bg-black/80 text-[#e6dfc8] hover:text-white p-2 rounded-full backdrop-blur-sm transition border border-white/10"
        >
          <X size={20} />
        </button>

        {/* MEDIA SECTION - Dynamic height on mobile, dynamic width on desktop */}
        <div
          ref={mediaRef}
          className="relative w-full h-[40%] min-h-[200px] md:h-full md:w-[55%] shrink-0 overflow-hidden bg-black flex flex-col"
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
                <ChevronLeft size={20} />
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
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Carousel Navigation Dots */}
          {availableMedia.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {availableMedia.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setPlay(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? "bg-[#d4a373] w-6" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS SECTION - Flex-1 with min-h-0 allows safe overflow scrolling on any zoom */}
        <div
          ref={detailsRef}
          className="flex-1 min-h-0 md:w-[45%] flex flex-col px-5 py-5 md:px-8 md:py-8 overflow-y-auto custom-scrollbar pointer-events-auto"
        >
          <div className="flex flex-col flex-1">
            <h3 className="uppercase tracking-widest text-xs md:text-sm text-[#d4a373] mb-3 font-bold font-display opacity-80 shrink-0">
              About Our Client
            </h3>

            <div className="space-y-3 shrink-0">
              <div>
                <p className="font-display uppercase text-[clamp(1.25rem,4vw,2rem)] text-[#c87941] font-bold leading-tight mb-2">
                  {item.businessName}
                </p>
                
                {item.industry && item.industry.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.industry.map((ind, idx) => (
                      <span key={idx} className="inline-block bg-[#d4a373]/15 text-[#e6dfc8] px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border border-[#d4a373]/30">
                        {ind}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {item.services && item.services.length > 0 && (
                <div className="pt-2">
                  <p className="font-display uppercase text-[10px] md:text-xs text-[#d4a373] font-semibold tracking-widest mb-1.5 opacity-70">
                    Services Provided
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 ml-4 w-full">
                    <ul className="text-[#f2f0e9] font-body text-xs md:text-sm leading-relaxed opacity-90 list-disc list-outside space-y-0.5 w-full">
                      {item.services.slice(0, 4).map((service, idx) => (
                        <li key={idx} className="break-words leading-tight py-0.5" title={service}>{service}</li>
                      ))}
                    </ul>
                    {item.services.length > 4 && (
                      <ul className="text-[#f2f0e9] font-body text-xs md:text-sm leading-relaxed opacity-90 list-disc list-outside space-y-0.5 w-full">
                        {item.services.slice(4, 8).map((service, idx) => (
                          <li key={idx} className="break-words leading-tight py-0.5" title={service}>{service}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="my-5 h-px bg-white/10 shrink-0" />

            <blockquote className="italic text-sm md:text-base lg:text-lg leading-relaxed opacity-90 mb-4 text-[#efe9d5] font-body border-l-2 border-[#d4a373]/50 pl-4 shrink-0">
              “{item.testimonial}”
            </blockquote>
          </div>

          {/* Links Section - Stays at bottom but scrolls with content if zoom is high */}
          <div className="mt-auto shrink-0 flex items-center gap-4 pt-4 border-t border-white/5">
            {item.links?.website && (
              <a
                href={formatUrl(item.links.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d4a373] text-[#2b3327] hover:bg-[#c87941] hover:text-white transition-colors px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mr-auto"
              >
                View Website
              </a>
            )}

            <div className="flex gap-3 md:gap-4 ml-auto text-[#d4a373]">
              {item.links?.facebook && (
                <a
                  href={formatUrl(item.links.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="md:w-6 md:h-6" />
                </a>
              )}

              {item.links?.instagram && (
                <a
                  href={formatUrl(item.links.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="md:w-6 md:h-6" />
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