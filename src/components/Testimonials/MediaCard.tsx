import type { Business } from '../../constants/testimonialsData';
import { resolvePath } from '../../constants/testimonialsData';

export const MediaCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    return (
        <div className="flex flex-col h-full group cursor-pointer gallery-anim-item" onClick={onClick}>
            <div className="relative w-full flex items-center justify-center p-2 md:p-8 h-24 sm:h-32 md:h-auto md:aspect-square transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                    src={resolvePath(business.placeholderImage)} 
                    alt={business.businessName} 
                    className="max-w-full max-h-16 sm:max-h-20 md:max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg relative z-10" 
                    loading="lazy"
                />
            </div>
            <div className="text-center relative z-20 flex-1 pt-1 md:pt-2 flex flex-col">
                <h3 className="font-display text-[10px] sm:text-xs md:text-lg tracking-wide uppercase group-hover:text-[#B56A54] group-hover:scale-105 transition-all duration-300 line-clamp-3 px-1 md:px-2 leading-[1.1] md:leading-snug">
                    {business.businessName}
                </h3>
            </div>
        </div>
    );
};
