import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/Common/Navbar';
import testimonialsData from '../data/testimonials.json';

// --- TYPES ---
interface Media {
  video: string;
  image1: string;
  image2: string;
  image3: string;
}

interface Links {
  website: string;
  facebook: string;
  instagram: string;
}

interface Business {
  id: number;
  isFounder: boolean;
  businessName: string;
  industry: string[];
  services: string[];
  categories?: string[];
  links: Links;
  testimonial: string;
  media: Media;
  placeholderImage: string;
}

const CATEGORIES = [
    "All",
    "Architecture & Construction",
    "Art & Design",
    "Beauty",
    "Consulting",
    "Education",
    "Engineering",
    "Financial Services",
    "Healthcare",
    "Information Technology",
    "Logistics & Transport",
    "Marketing & Advertising",
    "Real Estate & Property",
    "Retail & General Trade"
];

// --- HELPER COMPONENTS ---
const resolvePath = (path: string) => {
    if (!path) return '';
    return path.startsWith('public/') ? path.replace('public/', '/') : path;
};

const MediaCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    return (
        <div className="flex flex-col gap-3 group cursor-pointer gallery-anim-item" onClick={onClick}>
            <div className="relative w-full aspect-square flex items-center justify-center p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                    src={resolvePath(business.placeholderImage)} 
                    alt={business.businessName} 
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg relative z-10" 
                    loading="lazy"
                />
            </div>
            <div className="mt-2 text-center relative z-20">
                <h3 className="font-display text-lg tracking-wide uppercase group-hover:text-[#FDF4DC] transition-colors line-clamp-2 px-2">
                    {business.businessName}
                </h3>
            </div>
        </div>
    );
};

const ListCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    return (
        <div 
            onClick={onClick}
            className="flex items-center justify-between border-b border-[#2C3628]/10 py-4 cursor-pointer group gallery-anim-item"
        >
            <h3 className="font-display text-lg md:text-xl uppercase tracking-wide group-hover:text-[#FDF4DC] transition-colors w-full leading-tight">
                {business.businessName}
            </h3>
            <span className="text-[#2C3628]/30 group-hover:text-[#FDF4DC] transition-colors text-2xl font-light shrink-0 ml-4 group-hover:translate-x-1 duration-300">→</span>
        </div>
    );
};

const GalleryModal = ({ business, onClose }: { business: Business, onClose: () => void }) => {
    const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    const allMedia = [];
    if (business.media?.video) allMedia.push({ type: 'video', src: business.media.video });
    if (business.media?.image1) allMedia.push({ type: 'img', src: business.media.image1 });
    if (business.media?.image2) allMedia.push({ type: 'img', src: business.media.image2 });
    if (business.media?.image3) allMedia.push({ type: 'img', src: business.media.image3 });
    if (allMedia.length === 0) {
        allMedia.push({ type: 'img', src: business.placeholderImage });
    }

    const currentMedia = allMedia[currentMediaIdx];
    const src = resolvePath(currentMedia.src);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12">
            {/* Backdrop overlay */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
                onClick={handleClose} 
            />
            
            {/* Modal Container */}
            <div className={`relative w-full h-[90vh] md:h-full max-h-[900px] max-w-7xl bg-[#FDF4DC] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform ${isClosing ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
                
                {/* Back Button */}
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 left-4 md:top-6 md:left-6 z-[110] text-[#2C3628] hover:text-[#FDF4DC] p-2 md:p-3 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full transition-all flex items-center gap-2"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    <span className="text-xs font-bold tracking-widest uppercase hidden md:block pr-2">Back</span>
                </button>

                {/* Media Area */}
                <div className="w-full md:w-[60%] h-[40vh] md:h-full relative flex items-center justify-center bg-[#2C3628]/5 p-4 md:p-8">
                    {currentMedia.type === 'video' ? (
                        <video src={src} controls autoPlay className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />
                    ) : (
                        <img src={src} alt="Media preview" className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />
                    )}

                    {/* Carousel Controls */}
                    {allMedia.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentMediaIdx(i => i === 0 ? allMedia.length - 1 : i - 1); }}
                                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-[#FDF4DC] rounded-full text-[#2C3628] hover:text-white transition-colors z-50 hover:scale-105"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentMediaIdx(i => i === allMedia.length - 1 ? 0 : i + 1); }}
                                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-[#FDF4DC] rounded-full text-[#2C3628] hover:text-white transition-colors z-50 hover:scale-105"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50 bg-[#2C3628]/40 px-3 py-2 rounded-full backdrop-blur-md">
                                {allMedia.map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setCurrentMediaIdx(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${i === currentMediaIdx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`} 
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Content Area */}
                <div className="w-full md:w-[40%] h-[60vh] md:h-full text-[#2C3628] p-8 md:p-12 flex flex-col overflow-y-auto no-scrollbar">
                    <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider mb-4 text-[#FDF4DC] leading-tight">
                        {business.businessName}
                    </h2>
                    
                    {business.industry && business.industry.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {business.industry.map((ind, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1.5 bg-[#2C3628]/10 rounded-full">
                                    {ind}
                                </span>
                            ))}
                        </div>
                    )}

                    {business.testimonial && (
                        <div className="mb-10">
                            <p className="font-body text-sm md:text-base italic opacity-90 leading-relaxed border-l-2 border-[#FDF4DC] pl-4 py-1">
                                "{business.testimonial}"
                            </p>
                        </div>
                    )}

                    {business.services && business.services.length > 0 && (
                        <div className="mb-10">
                            <h4 className="font-display text-lg uppercase tracking-widest mb-4 opacity-60">Services</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {business.services.map((srv, i) => (
                                    <li key={i} className="font-body opacity-90 flex items-start gap-3 text-sm md:text-base group">
                                        <span className="text-[#FDF4DC] mt-1 text-[10px] md:text-xs shrink-0 transition-transform group-hover:scale-110">◆</span>
                                        <span className="flex-1 leading-snug line-clamp-2" title={srv}>{srv}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {(business.links?.website || business.links?.facebook || business.links?.instagram) && (
                        <div className="mt-auto pt-8 border-t border-[#2C3628]/10">
                            <h4 className="font-display text-xs uppercase tracking-widest mb-4 opacity-50">Connect</h4>
                            <div className="flex flex-wrap items-center gap-4">
                                {business.links.website && (
                                    <a href={business.links.website.startsWith('http') ? business.links.website : `https://${business.links.website}`} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-[#FDF4DC] transition-colors flex items-center gap-3 w-fit bg-[#2C3628]/5 hover:bg-[#2C3628]/10 px-4 py-3 rounded-full">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        View website in new tab
                                    </a>
                                )}
                                {business.links.facebook && (
                                    <a href={business.links.facebook} target="_blank" rel="noreferrer" className="text-[#2C3628] hover:text-[#FDF4DC] transition-colors p-3 bg-[#2C3628]/5 hover:bg-[#2C3628]/10 rounded-full" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                )}
                                {business.links.instagram && (
                                    <a href={business.links.instagram} target="_blank" rel="noreferrer" className="text-[#2C3628] hover:text-[#FDF4DC] transition-colors p-3 bg-[#2C3628]/5 hover:bg-[#2C3628]/10 rounded-full" aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN GALLERY COMPONENT ---
const Testimonials = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredBusinesses = useMemo(() => {
        const data = testimonialsData as Business[];
        if (activeCategory === "All") return data;
        
        return data.filter(b => {
            return b.categories?.includes(activeCategory) || false;
        });
    }, [activeCategory]);

    const { mediaBusinesses, listBusinesses } = useMemo(() => {
        const media: Business[] = [];
        const list: Business[] = [];

        filteredBusinesses.forEach(b => {
            const m = b.media;
            const hasMedia = m && (m.video || m.image1 || m.image2 || m.image3);
            const hasTestimonial = b.testimonial && b.testimonial.trim().length > 0;
            
            if (hasMedia || hasTestimonial) {
                media.push(b);
            } else {
                list.push(b);
            }
        });

        return { mediaBusinesses: media, listBusinesses: list };
    }, [filteredBusinesses]);

    useGSAP(() => {
        // Animation reset and trigger
        gsap.fromTo(".gallery-anim-item", 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: "auto"
            }
        );
    }, { scope: containerRef, dependencies: [activeCategory] }); 

    useEffect(() => {
        if (selectedBusiness) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedBusiness]);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#FDF4DC] text-[#2C3628] flex flex-col font-body selection:bg-[#2C3628] selection:text-[#FDF4DC]">
            <div className="fixed top-0 left-0 w-full z-50 bg-[#FDF4DC]/90 backdrop-blur-md border-b border-[#2C3628]/10 transition-all">
                {/* Replaced theme="brown" with theme="default" to ensure Navbar links swap for contrast against cream bg */}
                <Navbar theme="default" />
            </div>

            {/* Main Flex Container using Sidebar Layout as requested ("like the previous gallery layout") */}
            <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] mx-auto w-full pt-28 md:pt-36 px-4 md:px-12 gap-8 md:gap-12 relative pb-24">
                
                {/* --- SIDEBAR: HEADER & CATEGORIES --- */}
                <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col z-20 shrink-0">
                    <button onClick={() => navigate('/', { state: { skipIntro: true } })} className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#FDF4DC] transition-colors mb-8 opacity-60">
                        <span>←</span> Back Home
                    </button>
                    
                    <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tighter mb-6 md:mb-8 leading-none mt-4 md:mt-0">
                        Meet the Community
                    </h1>

                    <p className="hidden md:block text-sm opacity-70 mb-8 leading-relaxed pr-4">
                        Discover the diverse businesses, creative studios, and professional agencies within the Espasyo network.
                    </p>

                    {/* Vertical list on Desktop, Horizontal on Mobile */}
                    <div className="flex flex-row md:flex-col gap-2 md:gap-3 md:border-l border-[#2C3628]/20 md:pl-6 overflow-x-auto md:overflow-y-hidden md:overflow-x-hidden no-scrollbar pb-4 md:pb-0 w-full snap-x">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-4 py-2 md:p-0 rounded-full md:rounded-none text-left text-sm md:text-base font-body tracking-wide transition-all snap-start ${
                                    activeCategory === cat 
                                    ? 'bg-[#FDF4DC] md:bg-transparent text-[#FDF4DC] md:text-[#FDF4DC] font-bold md:translate-x-1' 
                                    : 'bg-[#2C3628]/5 md:bg-transparent text-[#2C3628]/60 hover:text-[#2C3628]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">
                    
                    {/* Grid for Media Businesses */}
                    {mediaBusinesses.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-20">
                            {mediaBusinesses.map((b) => (
                                <MediaCard key={b.id} business={b} onClick={() => setSelectedBusiness(b)} />
                            ))}
                        </div>
                    )}

                    {/* Divider if both exist */}
                    {mediaBusinesses.length > 0 && listBusinesses.length > 0 && (
                        <div className="w-full flex justify-center mb-16">
                            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-[#2C3628]/20 to-transparent"></div>
                        </div>
                    )}

                    {/* List for List Businesses */}
                    {listBusinesses.length > 0 && (
                        <div className="flex flex-col w-full">
                            <h3 className="font-display text-xl uppercase tracking-widest opacity-50 mb-6 text-center md:text-left">More of our community</h3>
                            {listBusinesses.map(b => (
                                <ListCard key={b.id} business={b} onClick={() => setSelectedBusiness(b)} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {mediaBusinesses.length === 0 && listBusinesses.length === 0 && (
                        <div className="w-full py-32 flex flex-col items-center justify-center opacity-50 text-center gallery-anim-item">
                            <span className="text-4xl mb-4">🔍</span>
                            <p className="font-display text-2xl uppercase tracking-widest">No businesses found</p>
                        </div>
                    )}
                </div>

            </div>

            {/* Modal Overlay */}
            {selectedBusiness && (
                <GalleryModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
            )}

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Testimonials;