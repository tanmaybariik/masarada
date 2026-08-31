"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ArrowLeft, Download, Sparkles, Filter, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BottomNavigation from "@/components/layout/BottomNavigation";
import ShareButton from "@/components/common/ShareButton";
import { getStoredGallery, GalleryPhoto, DEFAULT_GALLERY_PHOTOS } from "@/lib/galleryStore";

export default function GalleryPage() {
  const { t, language } = useTranslation();
  const [photos, setPhotos] = useState<GalleryPhoto[]>(DEFAULT_GALLERY_PHOTOS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        if (data.success) {
          setPhotos(data.gallery);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };
    loadGallery();

    window.addEventListener("gallery_updated", loadGallery);
    return () => window.removeEventListener("gallery_updated", loadGallery);
  }, []);

  const categories = [
    { id: "all", nameBn: "সকল ছবি", nameEn: "All Photos" },
    { id: "darshan", nameBn: "শ্রীচরণ দর্শন", nameEn: "Holy Darshan" },
    { id: "altar", nameBn: "বেদিমূর্তি", nameEn: "Sacred Altar" },
    { id: "wallpaper", nameBn: "ওয়ালপেপার", nameEn: "Wallpapers" }
  ];

  const filteredPhotos = selectedCategory === "all"
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="flex flex-col w-full max-w-md md:max-w-none mx-auto min-h-screen bg-background pb-24 text-foreground">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-secondary/10 shadow-sm md:max-w-7xl md:mx-auto w-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-primary hover:bg-secondary/20 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">{t('gallery.title')}</h1>
            <p className="text-xs text-foreground/60">{t('gallery.subtitle')}</p>
          </div>
        </div>
        <ShareButton
          title="করুণাময়ী মা সারদা — ভক্তি গ্যালারি ও ওয়ালপেপার"
          text="শ্রীরামকৃষ্ণ, মা সারদা ও স্বামীজীর পবিত্র এইচডি ওয়ালপেপার ও ছবি সংগ্রহ ডাউনলোড করুন:"
          url="/gallery"
          variant="icon"
        />
      </header>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide border-b border-secondary/10 bg-white/50 backdrop-blur-sm md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-secondary/20 text-foreground/70 hover:bg-secondary/10"
            }`}
          >
            {language === "bn" ? cat.nameBn : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Gallery Content */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:max-w-7xl md:mx-auto w-full">
        {filteredPhotos.map((wallpaper) => (
          <div key={wallpaper.id} className="bg-white rounded-3xl overflow-hidden border border-secondary/20 shadow-md hover:shadow-lg transition-all">
            <div className="relative w-full aspect-[3/4] bg-secondary/10 flex items-center justify-center">
              <Image 
                src={wallpaper.url} 
                alt={language === 'bn' ? wallpaper.name : wallpaper.enName} 
                fill 
                className="object-cover"
                unoptimized
              />
              {wallpaper.quality && (
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-amber-300 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-amber-300/30">
                  {wallpaper.quality}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col gap-3">
              <h3 className="font-bold text-base text-foreground text-center">
                {language === 'bn' ? wallpaper.name : wallpaper.enName}
              </h3>
              
              <div className="flex gap-2">
                <a 
                  href={wallpaper.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm text-xs"
                >
                  <Download size={15} />
                  <span>{t('gallery.download')}</span>
                </a>
                <ShareButton
                  title={language === 'bn' ? wallpaper.name : wallpaper.enName}
                  text={`করুণাময়ী মা সারদা ভক্তি গ্যালারি — ${wallpaper.name} পবিত্র ছবি ডাউনলোড করুন:`}
                  url="/gallery"
                  variant="button"
                  label={language === 'bn' ? "শেয়ার" : "Share"}
                  className="px-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}
