import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroProps {
    onComplete: () => void;
}

const Intro = ({ onComplete }: IntroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const creamBgRef = useRef<HTMLDivElement>(null);
    const doorsWrapperRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const leftDoorPanelRef = useRef<HTMLDivElement>(null);
    const rightDoorPanelRef = useRef<HTMLDivElement>(null);
    const doorFrameRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(containerRef.current, { display: 'none' });
                onComplete();
            }
        });

        const words = textContainerRef.current?.children;
        
        if (words) {
            // Initial setup: hide text and hide the doors
            gsap.set(words, { opacity: 0, y: 30 });
            gsap.set(doorsWrapperRef.current, { opacity: 0 });

            // 1. TEXT ON PLAIN CREAM BACKGROUND
            // " goodbye, ISOLATION. "
            tl.to(words[0], { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
              .to(words[0], { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" }, "+=0.6");

            // " hello, COLLABORATION. "
            tl.to(words[1], { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
              .to(words[1], { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" }, "+=0.6");

            // " your space, TO SUCCEED. "
            tl.to(words[2], { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
              .to(words[2], { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" }, "+=0.6");

            // 2. DOORS MATERIALIZE
            // The elegant doors fade into existence over the cream background
            tl.to(doorsWrapperRef.current, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
            
            // Instantly hide the solid cream background once the doors cover it, 
            // so the video will be visible when the doors open.
            tl.set(creamBgRef.current, { opacity: 0 }); 

            // 3. " Welcome to ESPASYO " 
            // Fades in beautifully over the now-visible dark wood doors
            tl.to(words[3], { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" }, "-=0.2");

            // 4. THE DOOR REVEAL
            // Frame pulls back slightly for 3D perspective
            tl.to(doorFrameRef.current, { scale: 1.02, duration: 0.5, ease: "power2.out" }, "+=0.8")
              // Doors slide majestically open
              .to(leftDoorPanelRef.current, { x: '-100%', duration: 2.0, ease: "power4.inOut" }, "-=0.2")
              .to(rightDoorPanelRef.current, { x: '100%', duration: 2.0, ease: "power4.inOut" }, "<");
        }

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[99999] flex overflow-hidden bg-transparent perspective-1000">
            
            {/* THE INITIAL PLAIN CREAM BACKGROUND */}
            <div ref={creamBgRef} className="absolute inset-0 bg-[#FDFCF5] z-0" />

            {/* THE DOORS WRAPPER (Starts at opacity 0, fades in) */}
            <div ref={doorsWrapperRef} className="absolute inset-0 z-10">
                {/* WARM STONE DOOR FRAME */}
                <div ref={doorFrameRef} className="absolute inset-0 z-20 border-[16px] sm:border-[20px] md:border-[30px] border-[#F1E5CF] rounded-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] scale-[1.01] pointer-events-none" />

                {/* THE DOOR PANELS */}
                <div className="flex w-full h-full relative z-10">
                    
                    {/* --- LEFT DOOR PANEL --- */}
                    <div 
                        ref={leftDoorPanelRef} 
                        className="w-1/2 h-full bg-[#3E2723] border-r-2 border-black/40 relative shadow-2xl overflow-hidden" 
                        style={{ willChange: 'transform' }}
                    >
                        {/* Rich Mahogany Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 to-black/60" />
                        
                        {/* Architectural Wood Panel Detailing */}
                        <div className="absolute top-[10%] bottom-[10%] left-[20%] right-[15%] border-4 border-[#F1E5CF]/10 rounded-sm shadow-2xl overflow-hidden">
                            <div className="absolute inset-2 sm:inset-4 border border-[#D4A373]/20 rounded-sm shadow-inner bg-black/10" />
                            <div className="absolute inset-x-4 sm:inset-x-8 top-10 sm:top-16 bottom-10 sm:bottom-16 border border-[#D4A373]/10 rounded-sm bg-black/20" />
                        </div>

                        {/* DOOR HARDWARE: Ornate Brass Handle */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 z-20 flex flex-col items-center gap-1">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#E6C280] to-[#996B3D] rounded-full border-2 border-black/50 shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex items-center justify-center">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-black/60 rounded-full shadow-inner" />
                            </div>
                            <div className="w-2 sm:w-3 md:w-4 h-20 sm:h-28 md:h-40 bg-gradient-to-r from-[#E6C280] to-[#996B3D] rounded-sm border-t border-white/30 shadow-[0_5px_15px_rgba(0,0,0,0.8)] relative">
                                <div className="absolute inset-x-[1px] top-2 bottom-2 bg-black/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                    
                    {/* --- RIGHT DOOR PANEL --- */}
                    <div 
                        ref={rightDoorPanelRef} 
                        className="w-1/2 h-full bg-[#3E2723] relative shadow-2xl overflow-hidden" 
                        style={{ willChange: 'transform' }}
                    >
                        {/* Mahogany Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-900/40 to-black/60" />

                        {/* Architectural Wood Panel Detailing */}
                        <div className="absolute top-[10%] bottom-[10%] right-[20%] left-[15%] border-4 border-[#F1E5CF]/10 rounded-sm shadow-2xl overflow-hidden">
                            <div className="absolute inset-2 sm:inset-4 border border-[#D4A373]/20 rounded-sm shadow-inner bg-black/10" />
                            <div className="absolute inset-x-4 sm:inset-x-8 top-10 sm:top-16 bottom-10 sm:bottom-16 border border-[#D4A373]/10 rounded-sm bg-black/20" />
                        </div>
                        
                        {/* Seam Shadow */}
                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-black/40 blur-xl z-10" />
                    </div>
                </div>
            </div>

            {/* THE TEXT LAYER */}
            <div 
                ref={textContainerRef} 
                className="absolute inset-0 flex items-center justify-center pointer-events-none text-center px-4 sm:px-6 z-30"
            >
                {/* Mindset Text (Dark Olive and Gold for contrast on the Cream background) */}
                <h2 className="absolute font-display text-[#2C3628] text-2xl sm:text-4xl md:text-6xl uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold">
                    goodbye, <br className="sm:hidden"/><span className="text-[#D4A373]">isolation.</span>
                </h2>
                
                <h2 className="absolute font-display text-[#2C3628] text-2xl sm:text-4xl md:text-6xl uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold">
                    hello, <br className="sm:hidden"/><span className="text-[#D4A373]">collaboration.</span>
                </h2>
                
                <h2 className="absolute font-display text-[#2C3628] text-xl sm:text-3xl md:text-5xl uppercase tracking-[0.1em] sm:tracking-[0.2em] font-normal">
                    your space, <br className="sm:hidden"/><span className="text-[#D4A373]">to succeed.</span>
                </h2>
                
                {/* Final Reveal Text (Cream and Gold to pop on the Dark Wood doors) */}
                <div className="absolute flex flex-col items-center">
                    <h2 className="font-display text-[#D4A373] text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold mb-2 md:mb-4">
                        Welcome to
                    </h2>
                    <h1 className="font-display text-[#FDFCF5] text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] uppercase tracking-tighter" style={{ textShadow: '0 8px 30px rgba(0,0,0,0.8)' }}>
                        ESPASYO
                    </h1>
                </div>
            </div>
            
        </div>
    );
};

export default Intro;