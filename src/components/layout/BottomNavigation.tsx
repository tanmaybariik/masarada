"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, BookOpen, CalendarHeart, UserRound } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.home'), href: "/", icon: Home },
    { name: t('quick.videos'), href: "/videos", icon: PlaySquare },
    { name: t('quick.library'), href: "/reading", icon: BookOpen },
    { name: t('nav.events'), href: "/events", icon: CalendarHeart },
    { name: t('nav.profile'), href: "/account", icon: UserRound },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-none lg:max-w-7xl 2xl:max-w-[1600px] bg-background/85 backdrop-blur-md border-t border-secondary/20 pb-safe z-50 transition-all duration-300">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-foreground/60 hover:text-primary/80"
              }`}
            >
              <Icon size={20} className={isActive ? "fill-primary/10" : ""} />
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
