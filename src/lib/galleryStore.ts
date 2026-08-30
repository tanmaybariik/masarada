export interface GalleryPhoto {
  id: string;
  name: string;
  enName: string;
  category: "darshan" | "altar" | "temple" | "vintage" | "wallpaper";
  categoryName: string;
  url: string;
  quality?: string;
  dateAdded?: string;
}

export const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "maa-sarada-feet",
    name: "শ্রীশ্রীমা সারদা দেবীর পবিত্র চরণকমল দর্শন",
    enName: "Holy Lotus Feet of Sri Sarada Devi",
    category: "darshan",
    categoryName: "শ্রীচরণ দর্শন",
    url: "/maa-sarada-feet.jpg",
    quality: "Ultra HD",
    dateAdded: "Feb 2026"
  },
  {
    id: "maa-sarada-seated",
    name: "ধ্যানস্থ শ্রীশ্রীমা সারদা দেবী (পবিত্র বেদিমূর্তি)",
    enName: "Meditative Holy Mother Sri Sarada Devi (Sacred Altar)",
    category: "altar",
    categoryName: "বেদিমূর্তি",
    url: "/maa-sarada-seated.jpg",
    quality: "4K HD",
    dateAdded: "Feb 2026"
  },
  {
    id: "sri-ramakrishna",
    name: "শ্রীশ্রীরামকৃষ্ণ পরমহংসদেব",
    enName: "Sri Ramakrishna Paramahamsa",
    category: "wallpaper",
    categoryName: "ওয়ালপেপার",
    url: "/ramakrishna.png",
    quality: "HD",
    dateAdded: "Jan 2026"
  },
  {
    id: "maa-sarada-hero",
    name: "জগজ্জননী শ্রীশ্রীমা সারদা দেবী",
    enName: "Holy Mother Sri Sarada Devi",
    category: "wallpaper",
    categoryName: "ওয়ালপেপার",
    url: "/maa-sarada-hero.jpg",
    quality: "HD",
    dateAdded: "Jan 2026"
  },
  {
    id: "swami-vivekananda",
    name: "বীর সন্ন্যাসী স্বামী বিবেকানন্দ",
    enName: "Swami Vivekananda",
    category: "wallpaper",
    categoryName: "ওয়ালপেপার",
    url: "/swami-vivekananda.jpg",
    quality: "HD",
    dateAdded: "Jan 2026"
  }
];

const GALLERY_STORAGE_KEY = "kms_custom_gallery_v2";

export function getStoredGallery(): GalleryPhoto[] {
  if (typeof window === "undefined") return DEFAULT_GALLERY_PHOTOS;
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY_PHOTOS));
      return DEFAULT_GALLERY_PHOTOS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_GALLERY_PHOTOS;
  }
}

export function saveStoredGallery(photos: GalleryPhoto[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(photos));
    window.dispatchEvent(new Event("gallery_updated"));
  } catch (e) {
    console.error("Failed to save gallery to localStorage", e);
  }
}
