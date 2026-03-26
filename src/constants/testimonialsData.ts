// src/constants/testimonialsData.ts

export interface Media {
  video: string;
  image1: string;
  image2: string;
  image3: string;
}

export interface Links {
  website: string;
  facebook: string;
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
  placeholderImage: string;
}

export const CATEGORIES = [
  "All",
  "Architecture & Construction",
  "Art & Design",
  "Beauty & Wellness",
  "Consulting",
  "Education",
  "Financial Services",
  "Healthcare",
  "Information Technology",
  "Logistics & Transport",
  "Marketing & Advertising",
  "Real Estate & Property",
  "Retail & General Trade"
];

export const resolvePath = (path: string) => {
  if (!path) return '';
  return path.startsWith('public/') ? path.replace('public/', '/') : path;
};
