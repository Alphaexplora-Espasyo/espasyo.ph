import type { Business } from '../../constants/testimonialsData';
import { resolvePath } from '../../constants/testimonialsData';

export const MediaCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    return (
        <div className="flex flex-col gap-1 md:gap-2 group cursor-pointer gallery-anim-item" onClick={onClick}>
            <div className="relative w-full flex items-center justify-center p-2 md:p-8 py-3 md:aspect-square transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                    src={resolvePath(business.placeholderImage)} 
                    alt={business.businessName} 
                    className="max-w-full max-h-16 md:max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg relative z-10" 
                    loading="lazy"
                />
            </div>
            <div className="text-center relative z-20">
                <h3 className="font-display text-xs md:text-lg tracking-wide uppercase group-hover:text-[#B56A54] group-hover:scale-105 transition-all duration-300 line-clamp-2 px-1 md:px-2">
                    {business.businessName}
                </h3>
            </div>
        </div>
    );
};
