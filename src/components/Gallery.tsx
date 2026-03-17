import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';

// Static categories
const categories = [
  { id: "All", label: "All Photos" },
  { id: "Coworking", label: "Coworking Area" },
  { id: "Events", label: "Community Events" },
];

const Gallery = () => {
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");

  // --- 1. INDEPENDENT PHYSICS REFS ---
  const physics1 = useRef({ position: 0, target: 0 });
  const physics2 = useRef({ position: 0, target: 0 });
  const physics3 = useRef({ position: 0, target: 0 });

  // --- 2. DYNAMIC IMAGE LOADING (Folder-Based) ---
  const galleryData = useMemo(() => {
      // 1. Load ALL images inside src/assets/gallery recursively
      // The ** means "any subfolder"
      const glob = import.meta.glob('../assets/gallery/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });

      // 2. Convert the glob object into an array of image data
      let allImages = Object.entries(glob).map(([path, mod]: any) => {
          const src = mod.default;
          let category = "All"; // Default fallback

          // 3. Determine category based on folder name in the path
          // Path looks like: "../assets/gallery/coworking/img1.jpg"
          if (path.includes('/coworking/')) category = "Coworking";
          else if (path.includes('/meeting/')) category = "Meeting";
          else if (path.includes('/events/')) category = "Events";
          else if (path.includes('/private/')) category = "Private";

          return {
              id: path, // Use path as unique ID
              src,
              category
          };
      });

      // 4. Fallback if folders are empty (prevents crashing during development)
      if (allImages.length === 0) {
          return Array(30).fill(null).map((_, i) => ({
             id: i,
             src: `https://images.unsplash.com/photo-${['1497366216548-37526070297c', '1527192491265-7e15c55b1ed2'][i % 2]}?auto=format&fit=crop&w=800&q=80`,
             category: categories[(i % (categories.length - 1)) + 1].id
          }));
      }

      return allImages;
  }, []);

  const filteredImages = activeCategory === "All" 
    ? galleryData 
    : galleryData.filter(img => img.category === activeCategory);

  const getColumns = (data: typeof galleryData) => {
      const col1: typeof galleryData = [];
      const col2: typeof galleryData = [];
      const col3: typeof galleryData = [];
      data.forEach((img, i) => {
          if (i % 3 === 0) col1.push(img);
          else if (i % 3 === 1) col2.push(img);
          else col3.push(img);
      });
      return [col1, col2, col3];
  };

  const [col1, col2, col3] = getColumns(filteredImages);

  const renderColumn = (images: typeof galleryData) => {
      // Ensure smooth looping by duplicating items if there are too few
      const loopSet = images.length < 5 
        ? [...images, ...images, ...images, ...images, ...images] 
        : [...images, ...images];
      
      return loopSet.map((img, i) => (
        <div key={`${img.id}-${i}`} className="gallery-item w-full mb-6 will-change-transform">
            <div className="relative w-full rounded-lg overflow-hidden group shadow-lg bg-[#F2F0E9]/5">
                <img 
                    src={img.src} 
                    alt="Gallery" 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
        </div>
      ));
  };

  // --- 3. SCROLL HANDLER (Fluid / No Snap) ---
  const handleColumnScroll = (
      e: React.WheelEvent, 
      physicsRef: React.MutableRefObject<{position: number, target: number}>
  ) => {
      // Adjusted speed for smooth, continuous scrolling
      const scrollSpeed = 0.007; 
      physicsRef.current.target += e.deltaY * scrollSpeed;
  };

  // --- NAVIGATION HANDLER ---
  const handleBack = () => {
    navigate('/', { 
        state: { 
            skipIntro: true, 
            scrollToSection: 'services' 
        } 
    });
  };

  useGSAP(() => {
    gsap.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1 });

    const ticker = gsap.ticker.add(() => {
        // --- UPDATE PHYSICS ---
        const diff1 = physics1.current.target - physics1.current.position;
        physics1.current.position += diff1 * 0.08; 
        const y1 = gsap.utils.wrap(0, -50, -physics1.current.position);
        if (col1Ref.current) gsap.set(col1Ref.current, { yPercent: y1 });

        const diff2 = physics2.current.target - physics2.current.position;
        physics2.current.position += diff2 * 0.08;
        const y2 = gsap.utils.wrap(0, -50, -physics2.current.position);
        if (col2Ref.current) gsap.set(col2Ref.current, { yPercent: y2 });

        const diff3 = physics3.current.target - physics3.current.position;
        physics3.current.position += diff3 * 0.08;
        const y3 = gsap.utils.wrap(0, -50, -physics3.current.position);
        if (col3Ref.current) gsap.set(col3Ref.current, { yPercent: y3 });
    });

    return () => gsap.ticker.remove(ticker);
  }, { scope: container }); 

  useGSAP(() => {
    // Reset positions on category change
    physics1.current = { position: 0, target: 0 };
    physics2.current = { position: 0, target: 0 };
    physics3.current = { position: 0, target: 0 };
    
    gsap.fromTo(".gallery-item", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.03, ease: "power2.out", overwrite: "auto" }
    );
  }, { scope: container, dependencies: [activeCategory] });

  return (
    <div ref={container} className="h-screen w-full bg-[#2C3628] text-[#F2F0E9] overflow-hidden flex flex-col">
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="fixed top-0 left-0 w-full z-50 bg-[#2C3628]/90 backdrop-blur-sm border-b border-[#F2F0E9]/10 transition-all">
          <Navbar theme="brown" />
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] mx-auto w-full h-full pt-28 px-6 md:px-12 gap-12 relative">
        
        <div className="md:w-1/4 lg:w-1/5 flex flex-col z-20 pb-8 h-full">
            <button onClick={handleBack} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4A373] transition-colors mb-8 opacity-80 mt-8">
                <span>←</span> Back
            </button>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tighter mb-8 leading-none">The Gallery</h1>
            
            <div className="flex flex-col gap-3 border-l border-[#F2F0E9]/20 pl-6 mb-auto overflow-y-auto overflow-x-hidden no-scrollbar max-h-[50vh]">
                {categories.map((cat) => (
                    <button 
                        key={cat.id} 
                        onClick={() => setActiveCategory(cat.id)} 
                        className={`text-left text-sm font-body tracking-wide transition-all ${
                            activeCategory === cat.id 
                            ? 'text-[#D4A373] font-bold translate-x-1' 
                            : 'text-[#F2F0E9]/60 hover:text-[#F2F0E9]'
                        }`}
                    >
                        {cat.label} <span className="text-[10px] opacity-40 ml-1">({cat.id === "All" ? galleryData.length : galleryData.filter(i => i.category === cat.id).length})</span>
                    </button>
                ))}
            </div>
        </div>

        {/* --- 3. SPLIT CONTAINER & EVENT BINDING --- */}
        <div className="md:w-3/4 lg:w-4/5 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#2C3628] via-[#2C3628]/80 to-transparent z-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#2C3628] to-transparent z-30 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 h-full">
                
                {/* COLUMN 1 */}
                <div 
                    className="h-full overflow-hidden relative cursor-grab active:cursor-grabbing"
                    onWheel={(e) => handleColumnScroll(e, physics1)}
                >
                    <div ref={col1Ref} className="flex flex-col will-change-transform">
                        {renderColumn(col1)}
                    </div>
                </div>

                {/* COLUMN 2 */}
                <div 
                    className="h-full overflow-hidden relative cursor-grab active:cursor-grabbing"
                    onWheel={(e) => handleColumnScroll(e, physics2)}
                >
                    <div ref={col2Ref} className="flex flex-col will-change-transform">
                        {renderColumn(col2)}
                    </div>
                </div>

                {/* COLUMN 3 */}
                <div 
                    className="h-full overflow-hidden relative cursor-grab active:cursor-grabbing"
                    onWheel={(e) => handleColumnScroll(e, physics3)}
                >
                    <div ref={col3Ref} className="flex flex-col will-change-transform">
                        {renderColumn(col3)}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default Gallery;