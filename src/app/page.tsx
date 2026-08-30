"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, BookOpen, Calendar, Video, Clock, ArrowRight, ShoppingBag, CalendarDays, ImageIcon, MessageSquare, Users } from "lucide-react";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import PWAInstallButton from "@/components/common/PWAInstallButton";

export default function Home() {
  const { t, language } = useTranslation();
  const router = useRouter();
  const [heroIndex, setHeroIndex] = useState(0);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const heroImages = [
    {
      src: "/maa-sarada-hero.jpg",
      position: "object-top"
    },
    {
      src: "/maa-sarada-portrait.png",
      position: "object-top"
    },
    {
      src: "/maa-sarada-feet.jpg",
      position: "object-center"
    }
  ];

  // Automatic slide transition every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const startHold = () => {
    setIsHolding(true);
    const timer = setTimeout(() => {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(100);
      }
      router.push("/admin");
    }, 1500); // 1.5 seconds hold
    setHoldTimer(timer);
  };

  const cancelHold = () => {
    setIsHolding(false);
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-3 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-secondary/10">
        <div className="flex items-center gap-2">
          <div 
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            onTouchCancel={cancelHold}
            className={`w-10 h-10 rounded-full overflow-hidden border border-secondary/20 shadow-sm relative cursor-pointer select-none transition-all duration-300 ${
              isHolding ? "scale-110 ring-2 ring-primary ring-offset-2" : "hover:scale-105"
            }`}
            title="Hold to open dashboard"
          >
            <Image src="/logo.jpg" alt="Karunamoyee Ma Sarada Logo" fill className="object-cover pointer-events-none" />
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground truncate">{t('header.title')}</h1>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle />
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Hero Section - Sacred Darshan Automatic Slider */}
        <section className="relative w-full h-56 md:h-60 rounded-3xl overflow-hidden flex flex-col justify-end p-4 text-white shadow-lg border border-secondary/20 group">
          <Image 
            src={heroImages[heroIndex].src} 
            alt="Maa Sarada Darshan" 
            fill 
            className={`object-cover ${heroImages[heroIndex].position} transition-all duration-1000 ease-in-out`} 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20"></div>

          {/* Bottom Bar: Live Darshan & Donate */}
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold mb-1 drop-shadow-md">{t('section.darshan')}</h2>
              <Link href="/videos" className="flex items-center gap-1.5 text-xs font-bold tracking-wider bg-red-600/90 text-white w-fit px-2.5 py-1 rounded-md backdrop-blur-sm border border-red-500 shadow-sm hover:bg-red-700 transition-colors">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span>{t('section.liveDarshan')}</span>
              </Link>
            </div>
            <Link href="/donate" className="bg-white text-primary px-3.5 py-1.5 rounded-full font-semibold text-xs md:text-sm flex items-center gap-1 shadow-sm h-fit mb-1 hover:bg-zinc-50 transition-colors">
              <Heart size={15} className="fill-primary/20" /> {t('donate.title')}
            </Link>
          </div>
        </section>

        {/* Daily Quote (Bani) */}
        <section className="bg-accent/10 border border-accent/30 p-4 rounded-xl relative">
          <div className="absolute -top-3 left-4 bg-background px-2 text-accent">
            <BookOpen size={20} />
          </div>
          <p className="text-foreground text-center font-medium leading-relaxed italic mt-2 text-xs md:text-sm">
            {t('header.quote')}
          </p>
          <p className="text-right text-xs text-foreground/70 mt-2">{t('header.author')}</p>
        </section>

        {/* Quick Actions Grid */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base md:text-lg font-bold text-foreground">{t('section.activities')}</h3>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            <div className="min-w-[68px]">
              <QuickAction href="/donate" icon={Heart} label={t('quick.donate')} color="bg-rose-100 text-rose-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="/shop" icon={ShoppingBag} label={t('quick.shop')} color="bg-amber-100 text-amber-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="/panjika" icon={CalendarDays} label={t('quick.panjika')} color="bg-teal-100 text-teal-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="/events" icon={Calendar} label={t('quick.events')} color="bg-purple-100 text-purple-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="/reading" icon={BookOpen} label={t('quick.library')} color="bg-blue-100 text-blue-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="/videos" icon={Video} label={t('quick.videos')} color="bg-orange-100 text-orange-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="/gallery" icon={ImageIcon} label={t('quick.gallery')} color="bg-pink-100 text-pink-600" />
            </div>
            <div className="min-w-[68px]">
              <QuickAction href="https://www.youtube.com/@KarunamoyeeMaSarada/community" isExternal icon={MessageSquare} label={t('quick.community')} color="bg-red-100 text-red-600" />
            </div>
          </div>
        </section>

        {/* 350K+ Community Spotlight Banner */}
        <section>
          <Link
            href="/about"
            className="block bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-primary/15 border border-primary/25 rounded-2xl p-4 shadow-sm hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-foreground">
                      {language === "bn" ? "আমাদের ৩,৫০,০০০+ ভক্ত পরিবার" : "Our 350K+ Global Community"}
                    </span>
                    <span className="text-[9px] bg-primary text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                      OFFICIAL
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/70 line-clamp-1 mt-0.5">
                    {language === "bn" 
                      ? "উদ্দেশ্য, লক্ষ্য, আদর্শ ও ডিজিটাল কার্যক্রম সম্পর্কে জানুন" 
                      : "Explore our mission, vision, values & sacred work"}
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
            </div>
          </Link>
        </section>

        {/* Upcoming Event */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base md:text-lg font-bold text-foreground">{t('section.upcomingEvents')}</h3>
            <Link href="/events" className="text-xs md:text-sm text-primary flex items-center font-bold">
              {t('general.seeAll')} <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <Link href="/events/1/book?price=150&title=Sri%20Ramakrishna%20Janmatithi%20Utsav" className="block bg-white border border-secondary/20 rounded-2xl overflow-hidden shadow-sm hover:border-primary/40 transition-all">
            <div className="h-28 w-full relative">
              <Image src="/event-festival.jpg" alt="Festival Banner" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <div className="text-white">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-1 inline-block">
                    {language === "bn" ? "১৫ মার্চ ২০২৬" : "March 15, 2026"}
                  </span>
                  <h4 className="font-bold text-xs md:text-sm leading-tight text-white">
                    {language === "bn" ? "শ্রীরামকৃষ্ণ জন্মতিথি উৎসব (₹১৫০)" : "Sri Ramakrishna Janmatithi Utsav (₹150)"}
                  </h4>
                </div>
              </div>
            </div>
            <div className="p-3 flex justify-between items-center text-xs text-foreground/70 bg-zinc-50/50">
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-primary" />
                {language === "bn" ? "সকাল ৮:০০ - বিকাল ৫:০০" : "8:00 AM - 5:00 PM"}
              </span>
              <span className="font-bold text-primary flex items-center gap-1">
                {t('events.book')} <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-6 px-6 pt-8 pb-10 border-t border-secondary/20 bg-secondary/5 rounded-t-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-secondary/20 mb-3 relative shadow-sm">
            <Image src="/logo.jpg" alt="Karunamoyee Ma Sarada Logo" fill className="object-cover" />
          </div>
          <h3 className="font-bold text-foreground text-base md:text-lg mb-1">{t('header.title')}</h3>
          <p className="text-xs md:text-sm text-foreground/70 mb-5 max-w-xs leading-relaxed">
            {t('header.motto')}
          </p>

          {/* Web App Shortcut / PWA Install Prompt */}
          <PWAInstallButton />

          <div className="flex items-center gap-3 my-4">
            <Link
              href="/about"
              className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>{language === "bn" ? "আমাদের সম্পর্কে জানুন (About Us)" : "About Organisation"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          
          <div className="flex gap-3 mb-6">
            <a href="https://www.facebook.com/KarunamoyeeMaSarada" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-secondary/20 flex items-center justify-center text-foreground/60 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/karunamoyee_ma_srada/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-secondary/20 flex items-center justify-center text-foreground/60 hover:text-pink-600 hover:border-pink-200 transition-colors shadow-sm" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="https://chat.whatsapp.com/BnCJ7s0b5Hx9IRB7X5yS2M" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-secondary/20 flex items-center justify-center text-foreground/60 hover:text-green-600 hover:border-green-200 transition-colors shadow-sm" title="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="https://t.me/KarunamoyeeMaSarada" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-secondary/20 flex items-center justify-center text-foreground/60 hover:text-sky-500 hover:border-sky-200 transition-colors shadow-sm" title="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          </div>

          <div className="w-full border-t border-secondary/20 pt-5 pb-4">
            <p className="text-xs text-foreground/50">
              © {new Date().getFullYear()} Karunamoyee Ma Sarada. All rights reserved.
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              Developed with ❤️ by <a href="https://github.com/tanmaybariik" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">@tanmaybariik</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuickAction({ href, icon: Icon, label, color, isExternal }: { href: string; icon: any; label: string; color: string; isExternal?: boolean }) {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} shadow-sm`}>
          <Icon size={24} />
        </div>
        <span className="text-[11px] font-medium text-foreground/80">{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} shadow-sm`}>
        <Icon size={24} />
      </div>
      <span className="text-[11px] font-medium text-foreground/80">{label}</span>
    </Link>
  );
}
