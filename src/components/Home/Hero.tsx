import { type RefObject } from 'react';

interface HeroProps {
  heroTextRef1: RefObject<HTMLHeadingElement | null>;
  introFinished: boolean;
}

const Hero = ({ heroTextRef1, introFinished }: HeroProps) => {
  return (
    <section className="h-full flex flex-col justify-center items-center px-4 sm:px-6 md:pr-8 relative shrink-0 pt-[96px] w-[calc(100vw-66px)] sm:w-[calc(100vw-76px)] md:w-[calc(100vw-86px)] overflow-hidden">
      {/* Background Video & Dark Green Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dlk93aehl/video/upload/v1773766338/landing_wmxsq3.mp4"
        />
        <div className="absolute inset-0 bg-[#3A2618]/75 mix-blend-multiply"></div>
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-[#FDF4DC] to-transparent pointer-events-none"></div>
      </div>

      {/* Text Content */}
      <div className="overflow-hidden z-10 relative">
        <h1
          ref={heroTextRef1}
          className={`mb-2 text-5xl sm:text-7xl md:text-9xl lg:text-10xl font-display text-[#FDF4DC] drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] uppercase text-center tracking-tighter leading-[0.9] ${introFinished ? '' : 'opacity-0'}`}
        >
          ESPASYO
        </h1>
      </div>
    </section>
  );
};

export default Hero;
