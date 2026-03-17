// src/components/Home.tsx
import { useRef, useState, useEffect, useLayoutEffect, type MouseEvent, type TouchEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Intro from './Intro';
import Services360 from './Services360';
import Footer from './footer'; // <-- Imported Footer

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // --- REFS ---
    const container = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const testimonialColumnRef = useRef<HTMLDivElement>(null);
    const servicesContentRef = useRef<HTMLDivElement>(null);
    const heroTextRef1 = useRef<HTMLHeadingElement>(null);
    const heroTextRef2 = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const morphRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // --- STATE ---
    const [navTheme, setNavTheme] = useState<'default' | 'brown'>(() => {
        const target = location.state?.scrollToSection;
        return (target === 'services' || target === 'services-end') ? 'brown' : 'default';
    });

    const isDarkTheme = navTheme === 'brown';
    const [introFinished, setIntroFinished] = useState(() => location.state?.skipIntro ? true : false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Swipe State
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Origin Story panel state — toggled by GSAP sentinel tween mid-scroll
    const [originStoryVisible, setOriginStoryVisible] = useState(false);

    // --- DATA ---
    const marqueeText = Array(4).fill("COMMUNITY • WORK • CREATE • ");

    const testimonialData = [
        { id: 'founder', src: '/assets/polaroids/team.jpg', caption: "EST. 2018", rotate: "rotate-[-3deg]", isFounder: true },
        { id: 1, src: '/assets/polaroids/1.jpg', caption: "DAY ONE", rotate: "rotate-[1.5deg]" },
        { id: 2, src: '/assets/polaroids/viber_image_2026-03-16_19-43-09-616.jpg', caption: "THE TEAM", rotate: "rotate-[-1deg]" },
        { id: 3, src: '/assets/polaroids/viber_image_2026-03-16_19-44-21-936.jpg', caption: "LAUNCH DAY", rotate: "rotate-[2deg]" },
        { id: 4, src: '/assets/polaroids/viber_image_2026-03-16_19-44-24-162.jpg', caption: "OUR PEOPLE", rotate: "rotate-[-1.5deg]" },
        { id: 5, src: '/assets/polaroids/viber_image_2026-03-16_19-44-24-631.jpg', caption: "GOOD TIMES", rotate: "rotate-[1deg]" },
        { id: 6, src: '/assets/polaroids/viber_image_2026-03-16_19-44-28-832.jpg', caption: "THE BEGINNING", rotate: "rotate-[-2deg]" },
        { id: 8, src: '/assets/polaroids/viber_image_2026-03-16_19-44-29-257.jpg', caption: "FAMILY", rotate: "rotate-[1.5deg]" },
        { id: 9, src: '/assets/polaroids/viber_image_2026-03-16_19-44-29-668.jpg', caption: "US AT THE HUB", rotate: "rotate-[-1deg]" },
        { id: 'viewall', src: null, caption: "VIEW ALL TESTIMONIALS", rotate: "rotate-0", isViewAll: true },
    ];

    const servicesData = [
        {
            title: "Coworking",
            tagline: "Find Your Tribe",
            story: "It's not just a desk. It's where isolation ends and collaboration begins. Surround yourself with creators, founders, and doers.",
            image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Meeting Room",
            tagline: "Impress Your Clients",
            story: "Close deals in a space designed for professionalism. Equipped with everything you need to present your best self.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Business Registration",
            tagline: "Make It Official",
            story: "Skip the bureaucracy. We handle the paperwork so you can focus on building your legacy, not standing in lines.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Bookkeeping",
            tagline: "Know Your Numbers",
            story: "Financial clarity gives you the confidence to scale. Let our experts track every peso while you track your growth.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Tax Filing",
            tagline: "Peace of Mind",
            story: "Never worry about a deadline again. We ensure you stay compliant with the BIR, keeping your business safe and sound.",
            image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=800&q=80"
        },
    ];

    // --- HANDLERS ---
    const handleIntroComplete = () => setIntroFinished(true);
    const handleGalleryClick = () => navigate('/gallery');

    const handleViewAllClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const morphEl = morphRef.current;
        if (morphEl) {
            gsap.set(morphEl, { display: 'block', top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: '16px', opacity: 1, zIndex: 9999 });
            gsap.to(morphEl, { top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0, duration: 0.8, ease: "power4.inOut", onComplete: () => { navigate('/testimonials'); } });
        }
    };

    const nextSlide = () => { setCurrentIndex((prev) => (prev + 1) % servicesData.length); setTilt({ x: 0, y: 0 }); };
    const prevSlide = () => { setCurrentIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length); setTilt({ x: 0, y: 0 }); };

    // --- SWIPE HANDLERS ---
    const handleTouchStart = (e: TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;
        if (distance > minSwipeDistance) nextSlide();
        if (distance < -minSwipeDistance) prevSlide();
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isHovering) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        setTilt({ x: -y * 10, y: x * 10 });
    };

    // --- RESPONSIVE SLIDE STYLES ---
    const getSlideStyles = (index: number) => {
        const len = servicesData.length;
        const isCenter = index === currentIndex;
        const isRight = index === (currentIndex + 1) % len;
        const isLeft = index === (currentIndex - 1 + len) % len;

        let styles = "opacity-0 scale-50 z-0 translate-x-[-50%] pointer-events-none";

        if (isCenter) {
            styles = "left-1/2 -translate-x-1/2 opacity-100 scale-100 z-20 cursor-pointer";
        } else if (isLeft) {
            styles = "left-1/2 -translate-x-full md:left-[15%] md:-translate-x-1/2 opacity-0 md:opacity-40 scale-75 z-10 grayscale";
        } else if (isRight) {
            styles = "left-1/2 translate-x-0 md:left-[85%] md:-translate-x-1/2 opacity-0 md:opacity-40 scale-75 z-10 grayscale";
        }

        return { className: styles, isCenter };
    };

    useEffect(() => {
        const handleScrollEvent = (e: Event) => {
            const customEvent = e as CustomEvent;
            const target = customEvent.detail;
            if (timelineRef.current && target) {
                const labelPos = timelineRef.current.scrollTrigger?.labelToScroll(target);
                if (labelPos !== undefined) timelineRef.current.scrollTrigger?.scroll(labelPos);
            }
        };
        window.addEventListener('scrollToSection', handleScrollEvent);
        return () => window.removeEventListener('scrollToSection', handleScrollEvent);
    }, []);

    useLayoutEffect(() => {
        if (!location.state?.scrollToSection) window.scrollTo(0, 0);
    }, [location.pathname, location.state]);

    useGSAP(() => {
        if (introFinished) {
            const duration = location.state?.skipIntro ? 0 : 1.2;
            const stagger = location.state?.skipIntro ? 0 : 0.1;

            const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
            entranceTl
                .fromTo(navContainerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: duration })
                .fromTo(heroTextRef1.current, { y: 100, opacity: 0, skewY: 0 }, { y: 0, opacity: 1, skewY: 0, duration: duration }, "-=0.8")
                .fromTo(heroTextRef2.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: duration }, "-=1.0")
                .fromTo(subTextRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: duration }, "-=0.8")
                .fromTo(marqueeRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: duration }, "-=1.2")
                .fromTo(".polaroid-entry", { y: 150, opacity: 0, rotation: 5 }, { y: 0, opacity: 1, rotation: 0, duration: duration, stagger: stagger }, "-=1.0");

            if (scrollContainer.current && testimonialColumnRef.current && servicesContentRef.current) {
                ScrollTrigger.refresh();

                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: scrollContainer.current,
                        pin: true,
                        scrub: 0,
                        end: () => {
                            const vw = window.innerWidth;
                            const vh = window.innerHeight;
                            const mWidth = (vw < 640 ? 50 : vw < 768 ? 60 : 70) + 16;
                            const widthTotal = vw * 3 - mWidth;

                            const tColParent = testimonialColumnRef.current?.parentElement?.clientHeight || vh;
                            const tScroll = Math.max(0, (testimonialColumnRef.current?.scrollHeight || 0) - tColParent + 50);
                            const sScroll = Math.max(0, (servicesContentRef.current?.scrollHeight || 0) - vh);

                            const horizontalScroll = widthTotal - vw;
                            return "+=" + (horizontalScroll + tScroll + sScroll);
                        },
                        invalidateOnRefresh: true,
                    }
                });
                timelineRef.current = scrollTl;

                scrollTl.to(scrollContainer.current, {
                    x: () => {
                        const vw = window.innerWidth;
                        const mWidth = (vw < 640 ? 50 : vw < 768 ? 60 : 70) + 16;
                        return -(vw - mWidth);
                    },
                    ease: "none", duration: 10
                });
                scrollTl.addLabel("our-story");

                scrollTl.to(testimonialColumnRef.current, {
                    y: () => {
                        const tColParent = testimonialColumnRef.current?.parentElement?.clientHeight || window.innerHeight;
                        return -(Math.max(0, (testimonialColumnRef.current?.scrollHeight || 0) - tColParent + 50));
                    },
                    ease: "none", duration: 25
                });

                scrollTl.to({}, {
                    duration: 0.01,
                    onStart: () => setOriginStoryVisible(true),
                    onReverseComplete: () => setOriginStoryVisible(false),
                }, "<+50%");

                scrollTl.addLabel("testimonials-end");

                scrollTl.fromTo(".view-all-card", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 5 }, "<+80%");

                scrollTl.to(scrollContainer.current, {
                    x: () => {
                        const vw = window.innerWidth;
                        const mWidth = (vw < 640 ? 50 : vw < 768 ? 60 : 70) + 16;
                        return -(2 * vw - mWidth);
                    },
                    ease: "none",
                    duration: 10,
                    onStart: () => setNavTheme('brown'),
                    onReverseComplete: () => setNavTheme('default'),
                });
                scrollTl.addLabel("services");

                scrollTl.to(servicesContentRef.current, {
                    y: () => -(Math.max(0, (servicesContentRef.current?.scrollHeight || 0) - window.innerHeight)),
                    ease: "none", duration: 25
                });
                scrollTl.addLabel("services-end");

                const targetSection = location.state?.scrollToSection;
                if (targetSection) {
                    const labelPos = scrollTl.scrollTrigger?.labelToScroll(targetSection);
                    if (labelPos) scrollTl.scrollTrigger?.scroll(labelPos);
                }
            }
        }
    }, { scope: container, dependencies: [introFinished] });

    const activeService = servicesData[currentIndex];

    return (
        <div ref={container} className={`relative w-full overflow-x-hidden transition-colors duration-1000 ease-in-out ${isDarkTheme ? 'bg-[#2C3628] text-[#F0EAD6]' : 'bg-[#F0EAD6] text-[#2C3628]'}`}>
            {!introFinished && <Intro onComplete={handleIntroComplete} />}
            <div ref={morphRef} className="fixed hidden bg-[#F0EAD6] pointer-events-none" style={{ zIndex: 9999 }} />

            <style>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        .animate-infinite-scroll { animation: infinite-scroll 25s linear infinite; }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .polaroid-shadow { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
      `}</style>
            <div ref={navContainerRef} className={`fixed top-0 left-0 right-0 z-50 ${introFinished ? '' : 'opacity-0'}`}>
                <Navbar theme={navTheme} />
            </div>

            <div ref={scrollContainer} className="flex h-screen relative overscroll-none w-[calc(300vw-66px)] sm:w-[calc(300vw-76px)] md:w-[calc(300vw-86px)]">

                <section className="h-full flex flex-col justify-center items-center px-4 sm:px-6 md:pr-8 relative shrink-0 pt-[96px] w-[calc(100vw-66px)] sm:w-[calc(100vw-76px)] md:w-[calc(100vw-86px)]">
                    <div className="overflow-hidden"><h1 ref={heroTextRef1} className={`mb-2 text-5xl sm:text-7xl md:text-9xl lg:text-10xl font-display text-mega uppercase text-center tracking-tighter leading-[0.9] ${introFinished ? '' : 'opacity-0'}`}>ESPASYO</h1></div>
                    <div className="overflow-hidden"><h1 ref={heroTextRef2} className={`font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase text-center tracking-tighter leading-[0.9] ${isDarkTheme ? 'text-[#D4A373]' : 'text-[#2C3628]/70'} ${introFinished ? '' : 'opacity-0'}`}>COMMUNITY OF ENTREPENEURS</h1></div>
                </section>

                <section className="h-full flex shrink-0 overflow-hidden relative pt-[96px] pb-2 bg-transparent w-[100vw]">
                    <div ref={marqueeRef} className={`w-[50px] sm:w-[60px] md:w-[70px] h-[calc(100vh-104px)] mx-2 border-2 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative bg-[#F0EAD6] border-[#2C3628] text-[#2C3628] ${introFinished ? '' : 'opacity-0'}`}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vh] flex gap-2 -rotate-90">
                            <div className="animate-infinite-scroll flex gap-6 sm:gap-7 md:gap-8 shrink-0 items-center justify-around opacity-60">
                                {marqueeText.map((text, i) => <h2 key={`t1-${i}`} className="font-display text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap">{text}</h2>)}
                            </div>
                            <div className="animate-infinite-scroll flex gap-6 sm:gap-7 md:gap-8 shrink-0 items-center justify-around opacity-60">
                                {marqueeText.map((text, i) => <h2 key={`t2-${i}`} className="font-display text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap">{text}</h2>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-2 sm:gap-6 md:gap-8 h-full px-4 sm:px-6 md:pl-8 md:pr-12 relative pt-8 md:pt-0">
                        <div id="our-story" className="order-1 md:order-2 flex-none md:h-full flex flex-col justify-center md:sticky top-0 px-2 sm:px-6 md:pl-16 mb-4 md:mb-0 z-10 relative overflow-hidden">
                            <div className={`transition-all duration-700 ease-in-out ${originStoryVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                                <h2 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl uppercase tracking-tighter mb-2 sm:mb-6 md:mb-8 leading-[0.9] transition-colors duration-1000 ${isDarkTheme ? 'text-[#D4A373]' : 'text-[#2C3628]'}`}>Our Story</h2>
                                <div className={`max-w-3xl font-body text-sm sm:text-lg md:text-xl opacity-80 leading-relaxed space-y-2 sm:space-y-6 text-justify transition-colors duration-1000 ${isDarkTheme ? 'text-[#F0EAD6]' : 'text-[#2C3628]'}`}>
                                    <p>ESPASYO Coworking &amp; Office Space nurtures a dynamic community from a diverse array of businesses &amp; individuals across various sectors.</p>
                                    <p>Established in 2018 by a group of educators, ESPASYO promotes engagement &amp; collaboration among like-minded professionals.</p>
                                    <p className={`font-bold transition-colors duration-1000 ${isDarkTheme ? 'text-[#D4A373]' : 'text-[#C87941]'}`}>Scroll to see our origin story.</p>
                                </div>
                            </div>

                            <div className={`absolute inset-0 flex flex-col justify-center px-2 sm:px-6 md:pl-16 transition-all duration-700 ease-in-out ${originStoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
                                <p className={`font-display text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 font-bold ${isDarkTheme ? 'text-[#D4A373]' : 'text-[#C87941]'}`}>Origin Story</p>
                                <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter mb-4 sm:mb-6 md:mb-8 leading-[0.9] transition-colors duration-1000 ${isDarkTheme ? 'text-[#D4A373]' : 'text-[#2C3628]'}`}>How It All Started</h2>
                                <div className={`max-w-3xl font-body text-sm sm:text-base md:text-lg opacity-80 leading-relaxed space-y-3 sm:space-y-5 text-justify transition-colors duration-1000 ${isDarkTheme ? 'text-[#F0EAD6]' : 'text-[#2C3628]'}`}>
                                    <p>It began with a simple observation by our founder, <strong>Ms. Tina</strong>. She noticed that many talented freelancers and small business owners were isolated — working from noisy cafes or lonely bedrooms.</p>
                                    <p>She didn't want to build just another office hub with cubicles. She envisioned a sanctuary — a place where creatives could collide, collaborate, and grow together.</p>
                                </div>
                                <blockquote className={`mt-6 sm:mt-8 italic text-lg sm:text-xl md:text-2xl leading-relaxed opacity-90 font-display border-l-4 pl-5 sm:pl-6 transition-colors duration-1000 ${isDarkTheme ? 'border-[#D4A373] text-[#F0EAD6]' : 'border-[#C87941] text-[#2C3628]'}`}>
                                    "Espasyo isn't about the desk you rent. It's about the person sitting next to you."
                                </blockquote>
                            </div>
                        </div>
                        <div className="order-2 md:order-1 flex-1 md:h-full flex justify-center items-start overflow-hidden relative bg-[#2C3628] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 my-2 sm:my-3 md:my-4 ml-0 shadow-inner">
                            <div ref={testimonialColumnRef} className="flex flex-col items-center justify-start w-full gap-y-8 sm:gap-y-16 md:gap-y-24 lg:gap-y-32 pb-32 pt-12 md:pt-16 lg:pt-24">
                                {testimonialData.map((item) => {
                                    if (item.isViewAll) {
                                        return (
                                            <div key={item.id} onClick={handleViewAllClick} className={`polaroid-entry ${introFinished ? '' : 'opacity-0'} view-all-card flex-shrink-0 w-full sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl bg-[#F0EAD6] polaroid-shadow flex flex-col items-center justify-center cursor-pointer group transition-colors duration-300 p-6 sm:p-8`}>
                                                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mb-4 transition-colors text-[#2C3628] group-hover:text-[#C87941] text-center">{item.caption}</h3>
                                                <div className="text-2xl sm:text-3xl md:text-4xl transform -rotate-45 group-hover:rotate-0 transition-all duration-300 text-[#2C3628] group-hover:text-[#C87941]">➔</div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            key={item.id}
                                            className={`polaroid-entry ${introFinished ? '' : 'opacity-0'} flex-shrink-0 bg-[#F0EAD6] p-4 sm:p-6 md:p-8 lg:p-12 pb-16 sm:pb-20 md:pb-24 lg:pb-32 polaroid-shadow ${item.rotate} hover:rotate-0 transition-transform duration-500 ease-out w-full max-w-[450px] md:max-w-[550px] lg:max-w-[700px] group rounded-xl mx-auto`}
                                        >
                                            <div className="aspect-square w-full overflow-hidden mb-4 sm:mb-5 md:mb-6 relative rounded-lg bg-gray-200 shadow-inner">
                                                <img src={item.src || ''} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#C87941] uppercase tracking-tighter">{item.caption}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="h-screen shrink-0 bg-transparent border-l-2 border-[#F0EAD6]/20 relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-[96px]" style={{ width: '100vw' }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 z-0">
                        <h1 className="font-display text-[10vw] sm:text-[12vw] md:text-[14vw] lg:text-[15vw] leading-none uppercase tracking-tighter transition-all duration-700">{activeService.title.split(' ')[0]}</h1>
                    </div>

                    <div ref={servicesContentRef} className="w-full relative z-10 flex flex-col">
                        <Services360 />

                        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 py-12 sm:py-16 md:py-24 w-full min-h-screen">
                            <div className="flex flex-col items-center w-full max-w-5xl">
                                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                                    <p className="font-body text-xs sm:text-sm tracking-widest uppercase mb-2 opacity-80">Our Expertise</p>
                                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none">SERVICES</h2>
                                </div>

                                <div
                                    className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] mb-4 sm:mb-6 md:mb-8 flex items-center justify-center perspective-1000 touch-pan-y"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {servicesData.map((service, index) => {
                                        const { className, isCenter } = getSlideStyles(index);
                                        return (
                                            <div
                                                key={`${service.title}-${index}`}
                                                onMouseMove={isCenter ? handleMouseMove : undefined}
                                                onMouseEnter={isCenter ? () => setIsHovering(true) : undefined}
                                                onMouseLeave={isCenter ? () => { setIsHovering(false); setTilt({ x: 0, y: 0 }); } : undefined}
                                                className={`absolute top-0 w-[90vw] sm:w-[80vw] md:w-72 h-[250px] sm:h-[300px] md:h-80 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${className}`}
                                                style={{
                                                    transform: isCenter && isHovering
                                                        ? `translateX(-50%) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                                                        : undefined,
                                                    transition: isHovering ? 'transform 0.1s ease-out' : 'all 0.7s cubic-bezier(0.25,0.8,0.25,1)'
                                                }}
                                            >
                                                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                                {isCenter && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" style={{ opacity: isHovering ? 0.3 + (tilt.y / 20) : 0, transition: 'opacity 0.3s' }} />}
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 sm:p-4 md:p-6 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                                    <h3 className="font-display text-sm sm:text-base md:text-xl uppercase tracking-tight text-[#D4A373] leading-tight">{service.title}</h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
                                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                                        <button onClick={prevSlide} className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 border-2 border-[#F0EAD6] rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors font-bold text-sm md:text-lg">←</button>
                                        <div className="flex gap-2 sm:gap-2.5 md:gap-3">
                                            {servicesData.map((_, i) => (
                                                <div key={i} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#D4A373] w-3 sm:w-4' : 'bg-[#F0EAD6]/30'}`} />
                                            ))}
                                        </div>
                                        <button onClick={nextSlide} className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 border-2 border-[#F0EAD6] rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors font-bold text-sm md:text-lg">→</button>
                                    </div>
                                    <button onClick={handleGalleryClick} className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2 border-2 border-[#F0EAD6] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors">Show All Gallery</button>
                                </div>

                                <div className="text-center px-4 max-w-2xl animate-fade-in-up">
                                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-widest mb-2 sm:mb-3 opacity-90 text-[#D4A373] transition-all duration-500">{activeService.tagline}</h3>
                                    <p className="font-body text-base sm:text-lg opacity-90 leading-relaxed">{activeService.story}</p>
                                </div>
                            </div>

                            <div className="w-full max-w-5xl text-center border-t border-[#F0EAD6]/20 pt-16 mt-16">
                                <h3 className="font-display text-4xl uppercase tracking-widest mb-12 opacity-60">Why Espasyo?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4">
                                    <div><h4 className="font-display text-2xl uppercase text-[#D4A373] mb-3 leading-none">LEGAL &<br />COMPLIANCE</h4><p className="font-body text-sm opacity-80 leading-relaxed">We ensure your business meets all regulatory requirements without the headache.</p></div>
                                    <div><h4 className="font-display text-2xl uppercase text-[#D4A373] mb-3 leading-none">COST<br />EFFICIENT</h4><p className="font-body text-sm opacity-80 leading-relaxed">Reduce overhead costs with our flexible virtual packages.</p></div>
                                    <div><h4 className="font-display text-2xl uppercase text-[#D4A373] mb-3 leading-none">TRUSTED &<br />DEPENDABLE</h4><p className="font-body text-sm opacity-80 leading-relaxed">With 8 years experience supporting nearly 100 MSMEs.</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Extracted Footer Component */}
                        <Footer />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;