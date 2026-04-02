// src/models/types.ts

// --- TESTIMONIALS & BUSINESS MODELS ---

export interface Media {
    video: string;
    image1: string;
    image2: string;
    image3: string;
}

export interface Links {
    website?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
    phone?: string;
    address?: string;
    office?: string;
    contactPerson?: string;
    LinkedIn?: string;
    LinkedI?: string;
    mail?: string;
    [key: string]: string | undefined;
}

export interface Business {
    id: number;
    isFounder: boolean;
    businessName: string;
    industry: string[];
    services: string[];
    categories?: string[];
    links: Links;
    testimonial: string;
    media: Media;
    logo: string;
    placeholderImage?: string;
}

// --- HOME / STORY MODELS ---

export interface TestimonialData {
    id: string | number;
    src: string | null;
    caption: string;
    rotate: string;
    isFounder?: boolean;
    isViewAll?: boolean;
}

// --- SERVICES MODELS ---

export interface ServiceItem {
    title: string;
    items: string[];
}

export interface ServiceCategory {
    id: string;
    title: string;
    provider: string;
    bgText: string;
    image: string;
    description: string;
    services: ServiceItem[];
}

// --- GALLERY MODELS ---

export interface GalleryItem {
    id: number;
    src: string;
}
