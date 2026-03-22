import { useState, useEffect } from 'react';
import type { Business } from '../../constants/testimonialsData';
import { resolvePath } from '../../constants/testimonialsData';

export const GalleryModal = ({ business, onClose }: { business: Business, onClose: () => void }) => {
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 lg:p-12">
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
                onClick={handleClose} 
            />
            
            <div className={`relative w-full h-[90vh] md:h-full max-h-[900px] max-w-7xl bg-[#FDF4DC] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform ${isClosing ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
                
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 left-4 md:top-6 md:left-6 z-[110] text-[#2C3628] hover:text-[#FDF4DC] p-2 md:p-3 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full transition-all flex items-center gap-2"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    <span className="text-xs font-bold tracking-widest uppercase hidden md:block pr-2">Back</span>
                </button>

                <div className="w-full md:w-[60%] h-[40vh] md:h-full relative flex items-center justify-center bg-[#2C3628]/5 p-4 md:p-8">
                    {currentMedia.type === 'video' ? (
                        <video src={src} controls autoPlay className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />
                    ) : (
                        <img src={src} alt="Media preview" className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />
                    )}

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

                <div className="w-full md:w-[40%] h-[60vh] md:h-full text-[#2C3628] p-8 md:p-12 flex flex-col overflow-y-auto no-scrollbar">
                    <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider mb-4 text-[#2C3628] leading-tight">
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
                            <p className="font-body text-sm md:text-base italic opacity-90 leading-relaxed border-l-2 border-[#DFA878] pl-4 py-1">
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
                                        <span className="text-[#DFA878] mt-1 text-[10px] md:text-xs shrink-0 transition-transform group-hover:scale-110">◆</span>
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
                                    <a href={business.links.website.startsWith('http') ? business.links.website : `https://${business.links.website}`} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-[#DFA878] transition-colors flex items-center gap-3 w-fit bg-[#2C3628]/5 hover:bg-[#2C3628]/10 px-4 py-3 rounded-full">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        View website in new tab
                                    </a>
                                )}
                                {business.links.facebook && (
                                    <a href={business.links.facebook} target="_blank" rel="noreferrer" className="text-[#2C3628] hover:text-[#DFA878] transition-colors p-3 bg-[#2C3628]/5 hover:bg-[#2C3628]/10 rounded-full" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                )}
                                {business.links.instagram && (
                                    <a href={business.links.instagram} target="_blank" rel="noreferrer" className="text-[#2C3628] hover:text-[#DFA878] transition-colors p-3 bg-[#2C3628]/5 hover:bg-[#2C3628]/10 rounded-full" aria-label="Instagram">
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
