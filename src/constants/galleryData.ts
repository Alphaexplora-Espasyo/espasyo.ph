// src/constants/galleryData.ts

// --- IMAGE LOADING ---
type GlobModule = { default: string; [key: string]: unknown; };
const galleryModules = import.meta.glob<GlobModule>('./../assets/gallery/**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG}', { eager: true });
const extractUrls = (modules: Record<string, GlobModule>) => Object.values(modules).map((mod) => mod.default);
const loadedImages = extractUrls(galleryModules);
const fallbackImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60'
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const imagePool = loadedImages.length > 0 ? shuffleArray(loadedImages) : fallbackImages;

// --- GRID CONFIGURATION ---
export const ROWS = 9;
export const COLS = 12;
export const TOTAL_ITEMS = ROWS * COLS; // 108

export const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  src: imagePool[i % imagePool.length]
}));
