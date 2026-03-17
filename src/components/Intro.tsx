import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/LOGO.png';

interface IntroProps {
  onComplete: () => void;
}

const Intro = ({ onComplete }: IntroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete, 
        });
      }
    });

    // Reset initial states
    gsap.set(logoRef.current, { scale: 0, rotation: -45, opacity: 0 });
    gsap.set(textRef.current, { y: 30, opacity: 0 });

    tl.to(logoRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)", 
    })
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
    }, "-=0.5") 
    .to({}, { duration: 1 }); // Wait 1 second before lifting curtain

  }, { scope: containerRef });

  return (
    // FIX: Added 'bg-[#d9d8d7]' (Brown/Grey) so it's not transparent
    // FIX: Added 'z-[9999]' to ensure it sits on top of everything
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F0EAD6]"
    >
      <div ref={logoRef} className="relative mb-6">
        <img 
          src={logo} 
          alt="Espasyo Logo" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl" 
        />
      </div>
      {/*<h2 
        ref={textRef} 
        className="font-display text-2xl md:text-3xl text-[#5e4b35] uppercase tracking-widest font-bold text-center"
      >
        
      </h2>*/}
    </div>
  );
};

export default Intro;