import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

import Navbar from '../components/Common/Navbar';

// --- IMAGE LOADING ---
type GlobModule = { default: string;[key: string]: unknown; };
const galleryModules = import.meta.glob<GlobModule>('./../assets/gallery/**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG}', { eager: true });
const extractUrls = (modules: Record<string, GlobModule>) => Object.values(modules).map((mod) => mod.default);
const loadedImages = extractUrls(galleryModules);
const fallbackImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60'
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const imagePool = loadedImages.length > 0 ? shuffleArray(loadedImages) : fallbackImages;

// --- GRID CONFIGURATION ---
const ROWS = 9;
const COLS = 12;
const TOTAL_ITEMS = ROWS * COLS; // 108

const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  src: imagePool[i % imagePool.length]
}));

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const proxyRef = useRef<HTMLDivElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);
  const visibleItemsRef = useRef<Set<number>>(new Set());

  // --- MODAL STATE ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [titleStep, setTitleStep] = useState(0);
  const [hasEverDragged, setHasEverDragged] = useState(false);

  // --- SCROLL LOCK WHEN MODAL IS OPEN ---
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedImage]);

  // Intro animation sequence
  useEffect(() => {
    const timeline = gsap.timeline();

    // Step 1: Show "OUR"
    timeline.to({}, {
      duration: 0.5,
      onStart: () => setTitleStep(1)
    });

    // Step 2: Show "GALLERY"
    timeline.to({}, {
      duration: 0.8,
      onStart: () => setTitleStep(2)
    });

    // Step 3: Start fading in images randomly
    timeline.add(() => {
      const shuffledIndices = [...Array(items.length).keys()].sort(() => Math.random() - 0.5);

      shuffledIndices.forEach((index, i) => {
        if (!itemsRef.current[index]) return;
        gsap.to(itemsRef.current[index], {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            if (i === shuffledIndices.length - 1) {
              setIntroComplete(true);
            }
          }
        });
      });
    }, "-=0.3");

    return () => {
      timeline.kill();
    };
  }, []);

  // Check if item is in viewport
  const isInViewport = useCallback((element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const buffer = 100;
    return (
      rect.right >= -buffer &&
      rect.left <= window.innerWidth + buffer &&
      rect.bottom >= -buffer &&
      rect.top <= window.innerHeight + buffer
    );
  }, []);

  // Morph animation for newly visible items
  const morphInItem = useCallback((element: HTMLDivElement, index: number) => {
    if (visibleItemsRef.current.has(index)) return;

    visibleItemsRef.current.add(index);

    gsap.fromTo(element,
      { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  // Check visibility on drag
  const checkVisibleItems = useCallback(() => {
    if (!introComplete) return;
    itemsRef.current.forEach((item, index) => {
      if (item && isInViewport(item)) morphInItem(item, index);
    });
  }, [introComplete, isInViewport, morphInItem]);

  const updateItems = useCallback((x: number, y: number, itemWidth: number, itemHeight: number, wrapW: number, wrapH: number) => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const initialCol = index % COLS;
      const initialRow = Math.floor(index / COLS);
      const initialX = initialCol * itemWidth;
      const initialY = initialRow * itemHeight;

      let newX = (initialX + x) % wrapW;
      let newY = (initialY + y) % wrapH;

      if (newX < 0) newX += wrapW;
      if (newY < 0) newY += wrapH;

      newX -= wrapW / 2;
      newY -= wrapH / 2;

      gsap.set(item, { x: newX, y: newY });
    });

    requestAnimationFrame(checkVisibleItems);
  }, [checkVisibleItems]);

  useEffect(() => {
    const container = containerRef.current;
    const proxy = proxyRef.current;
    if (!container || !proxy) return;

    const getItemSize = () => {
      const vw = window.innerWidth;
      const sizeVw = vw < 768 ? 40 : 14;
      return (vw * sizeVw) / 100;
    };
    let ITEM_WIDTH = getItemSize();
    let ITEM_HEIGHT = getItemSize();
    let wrapWidth = COLS * ITEM_WIDTH;
    let wrapHeight = ROWS * ITEM_HEIGHT;

    const draggableInstance = Draggable.create(proxy, {
      trigger: container,
      type: "x,y",
      inertia: true,
      edgeResistance: 0,
      cursor: "grab",
      activeCursor: "grabbing",

      onDragStart: () => {
        setIsDragging(true);
        setHasEverDragged(true);
      },
      onDragEnd: () => {
        setTimeout(() => setIsDragging(false), 100);
      },
      onDrag: function () { updateItems(this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight); },
      onThrowUpdate: function () { updateItems(this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight); }
    })[0];

    draggableInstanceRef.current = draggableInstance;

    const handleResize = () => {
      ITEM_WIDTH = getItemSize();
      ITEM_HEIGHT = getItemSize();
      wrapWidth = COLS * ITEM_WIDTH;
      wrapHeight = ROWS * ITEM_HEIGHT;
      if (draggableInstance) {
        updateItems(draggableInstance.x, draggableInstance.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    updateItems(0, 0, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (draggableInstance) draggableInstance.kill();
    };
  }, [updateItems]);

  const handleClick = useCallback((src: string) => {
    if (isDragging) return;
    setSelectedImage(src);
  }, [isDragging]);

  return (
    <div className="h-screen w-screen bg-[#FDF4DC] overflow-hidden relative select-none touch-none">
      <Navbar theme="default" />

      {/* Animated Title */}
      <div className="fixed inset-0 z-[40] flex items-center justify-center pointer-events-none select-none">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 md:gap-8 px-12 py-6 rounded-3xl bg-black/20 backdrop-blur-md border border-black/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            
            <h1 className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-white relative z-10"
              style={{ textShadow: '4px 4px 15px rgba(0,0,0,0.6), 10px 5px 0px #3A2618', opacity: titleStep >= 1 ? 1 : 0, transform: titleStep >= 1 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              OUR
            </h1>
            <h1 className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-white relative z-10"
              style={{ textShadow: '4px 4px 15px rgba(0,0,0,0.6), 10px 5px 0px #3A2618', opacity: titleStep >= 2 ? 1 : 0, transform: titleStep >= 2 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', transitionDelay: '0.2s' }}>
              GALLERY
            </h1>
          </div>

          <div className="flex items-center gap-2 font-body text-sm md:text-base font-bold uppercase tracking-widest text-[#3A2618] bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-lg mt-2"
            style={{ opacity: introComplete && !hasEverDragged ? 1 : 0, transform: introComplete && !hasEverDragged ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out', transitionDelay: hasEverDragged ? '0s' : '1s' }}>
            <div className="flex items-center gap-2" style={{ textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}>
              <span>Drag to explore</span>
              <span className="text-xl animate-pulse">→</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden">
        <div className="relative w-0 h-0">
          {items.map((item, i) => {
            return (
              <div
                key={item.id}
                ref={el => { itemsRef.current[i] = el }}
                className={`absolute top-0 left-0 group perspective-1000 z-0 hover:z-[150] ${isDragging ? 'pointer-events-none' : ''} p-2 sm:p-3 w-[40vw] h-[40vw] -ml-[20vw] -mt-[20vw] md:w-[14vw] md:h-[14vw] md:-ml-[7vw] md:-mt-[7vw]`}
                style={{
                  willChange: 'transform',
                  opacity: 0,
                  transform: 'scale(0.5)'
                }}
                onClick={() => handleClick(item.src)}
              >
                <div className="w-full h-full relative transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:rotate-[2deg] shadow-md hover:shadow-xl rounded-sm overflow-hidden bg-[#3A2618]">
                  <img
                    src={item.src}
                    alt={`Gallery Image ${i}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div ref={proxyRef} className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-pointer backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-3 transition-colors flex items-center justify-center backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
      
      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default Gallery;