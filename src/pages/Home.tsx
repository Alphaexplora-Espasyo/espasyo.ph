import { useRef, useState, useEffect, useLayoutEffect, type MouseEvent, type TouchEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from '../components/Common/Navbar';
import Intro from '../components/Home/Intro';
import Hero from '../components/Home/Hero';
import StorySection from '../components/Home/StorySection';
import ServicesSection from '../components/Home/ServicesSection';
import Footer from '../components/Common/Footer';
import DetailModal from '../components/Shared/Modals/DetailModal';
import FounderModal from '../components/Shared/Modals/FounderModal';

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

    // Panel states — toggled by GSAP sentinel tweens during polaroid scroll
    const [originStoryVisible, setOriginStoryVisible] = useState(false);
    const [missionVisible, setMissionVisible] = useState(false);

    // Modal states
    const [selectedDetail, setSelectedDetail] = useState<any>(null);
    const [originRect, setOriginRect] = useState<DOMRect | null>(null);

    // --- DATA ---
    const marqueeText = Array(4).fill("COMMUNITY • WORK • CREATE • ");

    const testimonialData = [
        { id: 'founder', src: '/assets/polaroids/team.jpg', caption: "From IDEA to OPERATION, ESPASYO gives you the SPACE, SUPPORT, AND SYSTEM to SUCCEED.", rotate: "rotate-[-3deg]", isFounder: true },
        { id: 1, src: '/assets/polaroids/1.jpg', caption: "Where Ambition Meets Opportunity.", rotate: "rotate-[1.5deg]" },
        { id: 2, src: '/assets/polaroids/viber_image_2026-03-16_19-43-09-616.jpg', caption: "Empowering Entrepreneurs , Enabling Success.", rotate: "rotate-[-1deg]" },
        { id: 3, src: '/assets/polaroids/viber_image_2026-03-16_19-44-21-936.jpg', caption: "Turning Vision into Enterprise.", rotate: "rotate-[2deg]" },
        { id: 4, src: '/assets/polaroids/viber_image_2026-03-16_19-44-24-162.jpg', caption: "A HUB for Innovation, Collaboration and Success", rotate: "rotate-[-1.5deg]" },
        { id: 5, src: '/assets/polaroids/viber_image_2026-03-16_19-44-24-631.jpg', caption: "From Home to CEO, we’ve got your SPACE.", rotate: "rotate-[1deg]" },
        { id: 6, src: '/assets/polaroids/viber_image_2026-03-16_19-44-28-832.jpg', caption: "Empowering Business with Space, Solutions and Support.", rotate: "rotate-[-2deg]" },
        { id: 8, src: '/assets/polaroids/viber_image_2026-03-16_19-44-29-257.jpg', caption: "Espasyo is a Space for DREAMERS, DOERS and ACHIEVERS. ", rotate: "rotate-[1.5deg]" },
        { id: 9, src: '/assets/polaroids/viber_image_2026-03-16_19-44-29-668.jpg', caption: "ESPASYO— Where Business Grow Together!", rotate: "rotate-[-1deg]" },
        { id: 'viewall', src: null, caption: "VIEW ALL TESTIMONIALS", rotate: "rotate-0", isViewAll: true },
    ];

    const serviceCategories = [
        {
            id: 'workspace',
            title: 'Physical & Virtual Space',
            provider: 'Espasyo Coworking',
            bgText: 'WORKSPACE',
            image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
            description: "Flexible, inspiring environments designed for focus, collaboration, and finding your tribe.",
            services: [
                { title: "Coworking Desks", items: ["Shared desks", "Dedicated desks", "High-speed fiber internet"] },
                { title: "Private Offices", items: ["Fully furnished", "Conference Room", "Mail handling"] },
                { title: "Virtual Office", items: ["Professional business address", "Mail & package receiving", "Meeting room credits"] },
                { title: "Meeting & Event Spaces", items: ["Boardrooms", "Whiteboard", "A/V equipment included"] },
            ]
        },
        {
            id: 'it',
            title: 'I.T. Services',
            provider: 'Alphaexplora Information Technology Services',
            providerLink: 'https://www.alphaexplora.com',
            bgText: 'TECHNOLOGY',
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Comprehensive digital solutions to power your business operations and scale your growth.",
            services: [
                { title: "I.T. Consultancy", items: ["Business Process Analysis", "Systems Integration", "Enterprise Architecture", "I.T. Modernization"] },
                { title: "Software Solutions", items: ["Web Development", "Solutions Integration", "Software as a Service", "Mobile Solutions", "Process Automation"] },
                { title: "Data Analytics", items: ["Data Warehousing", "Business Intelligence", "Predictive Analytics", "Dashboard Design"] },
                { title: "Managed Services", items: ["24/7 Monitoring", "Technical Support", "System Maintenance", "Performance Optimization"] },
                { title: "AI Enablement", items: ["AI Strategy & Consulting", "Machine Learning Models", "Automation Solutions", "AI Integration"] },
                { title: "Digital Marketing", items: ["SEO Optimization", "Social Media Marketing", "Content Strategy", "PPC Campaigns"] },
            ]
        },
        {
            id: 'accounting',
            title: 'Accounting & Tax Arm',
            provider: 'BORJAL-AMAHAN Tax and Accounting Services',
            bgText: 'ACCOUNTING',
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
            description: "Expert financial management, compliance, and advisory tailored for businesses and freelancers.",
            services: [
                { title: "Tax Compliance and Advisory", items: ["Preparation and filing of tax returns", "Tax compliance assistance", "Tax planning and advisory services", "BIR registration and updates", "Assist client with LOA"] },
                { title: "Accounting and Bookkeeping", items: ["Monthly bookkeeping services", "Financial statement preparation", "Accounting system setup and support", "Financial record organization"] },
                { title: "Business Registration and Compliance", items: ["Business registration with government agencies", "Assistance with regulatory compliance", "Business documentation and reporting support"] },
                { title: "Financial Guidance", items: ["Financial record analysis", "Basic financial advisory support for small businesses", "Assistance in financial organization and reporting"] },
                { title: "Value-Added Services", items: ["Documentation requirements and processing applications for Building Permits", "Assistance in securing Occupational Permits", "Facilitation of Land Title Transfer", "Processing and Documentation for SSS, Pag-ibig, Philhealth", "End-to End Business Compliance Assistance"] },
            ]
        }
    ];

    // --- HANDLERS ---
    const handleIntroComplete = () => setIntroFinished(true);
    const handleGalleryClick = () => navigate('/gallery');

    const handlePolaroidClick = (item: any, e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOriginRect(rect);
        setSelectedDetail(item);
    };

    const handleViewAllClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const morphEl = morphRef.current;
        if (morphEl) {
            gsap.set(morphEl, { display: 'block', top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: '16px', opacity: 1, zIndex: 9999 });
            gsap.to(morphEl, { top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0, duration: 0.8, ease: "power4.inOut", onComplete: () => { navigate('/testimonials'); } });
        }
    };

    const nextSlide = () => { setCurrentIndex((prev) => (prev + 1) % serviceCategories.length); setTilt({ x: 0, y: 0 }); };
    const prevSlide = () => { setCurrentIndex((prev) => (prev - 1 + serviceCategories.length) % serviceCategories.length); setTilt({ x: 0, y: 0 }); };

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
        const len = serviceCategories.length;
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
                scrollTl.addLabel("testimonials-start");

                scrollTl.to(testimonialColumnRef.current, {
                    y: () => {
                        const tColParent = testimonialColumnRef.current?.parentElement?.clientHeight || window.innerHeight;
                        return -(Math.max(0, (testimonialColumnRef.current?.scrollHeight || 0) - tColParent + 50));
                    },
                    ease: "none", duration: 25
                });

                // Sentinel 1: after ~1/3 of polaroid scroll (3 polaroids) → show Origin Story
                scrollTl.to({}, {
                    duration: 0.01,
                    onStart: () => { setOriginStoryVisible(true); setMissionVisible(false); },
                    onReverseComplete: () => setOriginStoryVisible(false),
                }, "testimonials-start+=8.33");

                // Sentinel 2: after ~2/3 of polaroid scroll (6 polaroids) → show Mission
                scrollTl.to({}, {
                    duration: 0.01,
                    onStart: () => { setMissionVisible(true); },
                    onReverseComplete: () => { setMissionVisible(false); setOriginStoryVisible(true); },
                }, "testimonials-start+=16.67");

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

    const activeService = serviceCategories[currentIndex];

    return (
        <div ref={container} className={`relative w-full overflow-x-hidden transition-colors duration-1000 ease-in-out ${isDarkTheme ? 'bg-[#4B533E] text-[#FDF4DC]' : 'bg-[#FDF4DC] text-[#3A2618]'}`}>
            {!introFinished && <Intro onComplete={handleIntroComplete} />}
            <div ref={morphRef} className="fixed hidden bg-[#FDF4DC] pointer-events-none" style={{ zIndex: 9999 }} />

            <style>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        .animate-infinite-scroll { animation: infinite-scroll 25s linear infinite; }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .polaroid-shadow { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
            <div ref={navContainerRef} className={`fixed top-0 left-0 right-0 z-50 ${introFinished ? '' : 'opacity-0'}`}>
                <Navbar theme={navTheme} />
            </div>

            <div ref={scrollContainer} className="flex h-screen relative overscroll-none w-[calc(300vw-66px)] sm:w-[calc(300vw-76px)] md:w-[calc(300vw-86px)]">
                <Hero 
                    heroTextRef1={heroTextRef1} 
                    introFinished={introFinished} 
                />

                <StorySection 
                    marqueeRef={marqueeRef}
                    marqueeText={marqueeText}
                    introFinished={introFinished}
                    isDarkTheme={isDarkTheme}
                    originStoryVisible={originStoryVisible}
                    missionVisible={missionVisible}
                    testimonialColumnRef={testimonialColumnRef}
                    testimonialData={testimonialData}
                    handleViewAllClick={handleViewAllClick}
                    handlePolaroidClick={handlePolaroidClick}
                />

                <ServicesSection 
                    activeService={activeService}
                    servicesContentRef={servicesContentRef}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    serviceCategories={serviceCategories}
                    currentIndex={currentIndex}
                    handleMouseMove={handleMouseMove}
                    setIsHovering={setIsHovering}
                    setTilt={setTilt}
                    tilt={tilt}
                    isHovering={isHovering}
                    prevSlide={prevSlide}
                    nextSlide={nextSlide}
                    handleGalleryClick={handleGalleryClick}
                    getSlideStyles={getSlideStyles}
                />
            </div>
            <Footer />

            {/* MODALS */}
            {selectedDetail && (
                selectedDetail.isFounder 
                    ? <FounderModal originRect={originRect!} onClose={() => setSelectedDetail(null)} src={selectedDetail.src} />
                    : <DetailModal item={selectedDetail} originRect={originRect!} onClose={() => setSelectedDetail(null)} />
            )}
        </div>
    );
};

export default Home;