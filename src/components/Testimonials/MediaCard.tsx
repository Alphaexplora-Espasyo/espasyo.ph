import type { Business } from '../../constants/testimonialsData';
import { resolvePath } from '../../constants/testimonialsData';

export const MediaCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    return (
        <div className="flex flex-col gap-2 group cursor-pointer gallery-anim-item" onClick={onClick}>
            <div className="relative w-full aspect-square flex items-center justify-center p-4 md:p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                    src={resolvePath(business.placeholderImage)} 
                    alt={business.businessName} 
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg relative z-10" 
                    loading="lazy"
                />
            </div>
            <div className="mt-2 text-center relative z-20">
                <h3 className="font-display text-lg tracking-wide uppercase group-hover:text-[#B56A54] group-hover:scale-105 transition-all duration-300 line-clamp-2 px-2">
                    {business.businessName}
                </h3>
            </div>
        </div>
    );
};
