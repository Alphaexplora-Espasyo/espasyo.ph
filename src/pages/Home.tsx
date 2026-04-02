

import Navbar from '../components/Common/Navbar';
import Intro from '../components/Home/Intro';
import Hero from '../components/Home/Hero';
import StorySection from '../components/Home/StorySection';
import ServicesSection from '../components/Home/ServicesSection';
import Services360 from '../components/Home/Services360';
import Testimonials from './Testimonials';
import Contact from './Contact';
import DetailModal from '../components/Shared/Modals/DetailModal';
import FounderModal from '../components/Shared/Modals/FounderModal';
import { GalleryModal } from '../components/Testimonials/GalleryModal';

import { testimonialData, serviceCategories } from '../constants/homeData';
import NavTransition from '../components/Common/NavTransition';
import { useHomeViewModel } from '../hooks/useHomeViewModel';

const Home = () => {
    const { state, actions, spatialHub, carousel } = useHomeViewModel();

    return (
        <div ref={spatialHub.containerRef} 
             onTouchStart={spatialHub.handleTouchStart} 
             onTouchEnd={spatialHub.handleTouchEnd}
             className={`fixed inset-0 w-screen h-screen overflow-hidden transition-colors duration-1000 ease-in-out ${state.navTheme === 'brown' ? 'bg-[#4B533E] text-[#FDF4DC]' : 'bg-[#FDF4DC] text-[#3A2618]'}`}
        >
            {!state.introFinished && <Intro onComplete={actions.handleIntroComplete} />}

            <style>{`
                .animate-infinite-scroll { animation: infinite-scroll 25s linear infinite; }
                @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                .polaroid-shadow { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
                .no-scroll { overflow: hidden; }
                .allow-scroll { overflow-y: auto; overflow-x: hidden; }
            `}</style>

            <div className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-1000 ${state.introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Navbar theme={state.navTheme} />
            </div>

            {/* GLOBAL BACK BUTTON */}
            {state.activeView !== 'hero' && (
                <button 
                    onClick={() => actions.setActiveView('hero')} 
                    className={`fixed top-[92px] left-4 md:left-8 z-[150] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 ${state.navTheme === 'brown' ? 'bg-[#2C3628] text-[#FDF4DC] hover:bg-[#DFA878] hover:text-[#2C3628]' : 'bg-[#3A2618] text-[#FDF4DC] hover:bg-[#DFA878] hover:text-[#3A2618]'}`}
                    title="Back to Hub"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
            )}

            {/* --- SPATIAL CANVAS --- */}
            <div ref={spatialHub.layoutRef} className="absolute top-0 left-0 w-full h-full will-change-transform">
                
                {/* 1. CENTER: VERTICAL SCROLL COLUMN (HERO -> SERVICES -> CONTACT) */}
                <div id="main-scroll-column" 
                     className={`absolute top-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-auto no-scrollbar transition-all duration-300 ${state.activeView === 'hero' ? 'z-20 pointer-events-auto' : 'z-0 pointer-events-none'}`} 
                     data-lenis-prevent="true">
                    
                    {/* 1A. HERO */}
                    <div id="hero" className="w-full h-screen relative z-10 bg-[#FDF4DC]">
                        <Hero 
                            heroTextRef1={{ current: null }}
                            introFinished={state.introFinished} 
                            onNavigate={actions.handleHeroNavigate}
                        />
                    </div>

                    {/* 1B. SERVICES */}
                    <div id="services" className="w-full relative bg-[#2C3628] text-[#F0EAD6] z-0">
                        <ServicesSection 
                            activeService={state.activeService}
                            servicesContentRef={{ current: null }}
                            handleTouchStart={carousel.handleTouchStart}
                            handleTouchMove={carousel.handleTouchMove}
                            handleTouchEnd={carousel.handleTouchEnd}
                            serviceCategories={serviceCategories}
                            currentIndex={carousel.currentIndex}
                            handleMouseMove={carousel.handleMouseMove}
                            setIsHovering={carousel.setIsHovering}
                            setTilt={carousel.setTilt}
                            tilt={carousel.tilt}
                            isHovering={carousel.isHovering}
                            prevSlide={carousel.prevSlide}
                            nextSlide={carousel.nextSlide}
                            handleGalleryClick={actions.handleGalleryClick}
                            getSlideStyles={carousel.getSlideStyles}
                        />
                    </div>

                    {/* 1C. 360 TOUR & CTA */}
                    <div id="services-360" className="w-full relative">
                        <Services360 />
                    </div>

                    {/* 1D. CONTACT & FOOTER */}
                    <div id="contact" className="w-full relative">
                        <Contact hideNavbar={true} />
                    </div>
                </div>

                {/* 2. LEFT: STORY SECTION */}
                <div className={`absolute top-0 left-[-100vw] w-screen h-screen bg-[#FDF4DC] transition-all duration-300 ${state.activeView === 'story' ? 'z-20 pointer-events-auto opacity-100' : 'z-0 pointer-events-none opacity-0'}`}>
                    <StorySection 
                        testimonialData={testimonialData}
                        handleViewAllClick={actions.handleViewAllClick}
                        handleGalleryTransition={actions.handleGalleryClick}
                        handlePolaroidClick={actions.handlePolaroidClick}
                    />
                </div>

                {/* 3. RIGHT: TESTIMONIALS */}
                <div className={`absolute top-0 left-[100vw] w-screen h-screen bg-[#FDF4DC] overflow-y-auto no-scrollbar transition-all duration-300 ${state.activeView === 'testimonials' ? 'z-20 pointer-events-auto opacity-100' : 'z-0 pointer-events-none opacity-0'}`} data-lenis-prevent="true">
                    <div className="relative w-full min-h-screen pb-12">
                        <Testimonials 
                            hideNavbar={true} 
                            onBusinessClick={(b) => actions.setSelectedBusiness(b)} 
                        />
                    </div>
                </div>

            </div>

            {state.selectedDetail && (
                state.selectedDetail.isFounder 
                    ? <FounderModal originRect={state.originRect!} onClose={() => actions.setSelectedDetail(null)} src={state.selectedDetail.src} />
                    : <DetailModal item={state.selectedDetail} originRect={state.originRect!} onClose={() => actions.setSelectedDetail(null)} />
            )}

            {state.selectedBusiness && (
                <GalleryModal business={state.selectedBusiness} onClose={() => actions.setSelectedBusiness(null)} />
            )}

            <NavTransition
                isVisible={state.isTransitioning}
                onHalfway={() => {
                    actions.pendingAction.current?.();
                    actions.pendingAction.current = null;
                }}
                onDone={() => actions.setIsTransitioning(false)}
            />
        </div>
    );
};

export default Home;