"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { 
  User, 
  Package, 
  Ticket, 
  Heart, 
  LogOut, 
  LogIn,
  ChevronRight, 
  Bell, 
  Headphones, 
  Lightbulb, 
  Phone, 
  Mail, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  UserPlus
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/layout/LanguageToggle";
import ThemeToggle from "@/components/common/ThemeToggle";
import AppInstallShareCard from "@/components/account/AppInstallShareCard";

export default function AccountPage() {
  const { t, language } = useTranslation();
  const { data: session, status } = useSession();

  const user = session?.user;
  const isAdmin = (user as any)?.role === "ADMIN" || (user as any)?.role === "SUPER_ADMIN" || user?.email === "karunamoyeemasarada@gmail.com";

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">{t('account.title')}</h1>
          <p className="text-foreground/60 text-xs mt-0.5">{t('account.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle variant="icon" />
          <LanguageToggle />
          <button className="relative p-2 bg-white dark:bg-zinc-800 border border-secondary/20 rounded-full text-foreground/80 hover:bg-secondary/10 shadow-sm transition-colors" title="Notifications">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>

      {/* User Info Card */}
      {status === "authenticated" && user ? (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-secondary/20 shadow-sm flex items-center gap-4 mb-4 relative overflow-hidden">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-md flex-shrink-0 bg-primary/10 flex items-center justify-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <User size={30} className="text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base md:text-lg font-bold text-foreground truncate">
                {user.name || (language === "bn" ? "মা সারদা ভক্ত" : "Ma Sarada Devotee")}
              </h2>
              {isAdmin ? (
                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                  ADMIN
                </span>
              ) : (
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded-full">
                  DEVOTEE
                </span>
              )}
            </div>
            <p className="text-xs text-foreground/60 truncate">{user.email}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={11} /> {t('general.verified')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Guest / Logged Out Card */
        <div className="bg-gradient-to-br from-primary/10 via-white dark:via-zinc-900 to-amber-500/10 rounded-3xl p-5 border border-primary/25 shadow-sm mb-4">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">আপনার অ্যাকাউন্টে যুক্ত হন</h3>
              <p className="text-xs text-foreground/60">অর্ডার ও বুকিং ট্র্যাক করতে লগইন করুন</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm hover:bg-primary/90 transition-all text-center"
            >
              <LogIn size={15} />
              <span>লগইন করুন</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center gap-1.5 bg-white dark:bg-zinc-800 text-foreground border border-secondary/30 text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm hover:border-primary transition-all text-center"
            >
              <UserPlus size={15} />
              <span>নতুন অ্যাকাউন্ট</span>
            </Link>
          </div>
        </div>
      )}

      {/* Admin Panel Quick Link (Always visible for Admin role or for test access) */}
      {isAdmin && (
        <Link
          href="/admin"
          className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between mb-5 hover:opacity-95 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-200 block">Master Control</span>
              <span className="text-sm font-extrabold block">অ্যাডমিন ম্যানেজমেন্ট প্যানেল</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/80 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      {/* Web App Download & Direct Share Card */}
      <AppInstallShareCard />

      {/* Direct Contact Quick Bar */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <a
          href="tel:+918918501779"
          className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-2.5 hover:border-primary/40 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
            <Phone size={17} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-foreground/50 font-bold uppercase block truncate">{t('general.call')}</span>
            <span className="text-xs font-bold text-foreground truncate block">8918501779</span>
          </div>
        </a>

        <a
          href="mailto:karunamoyeemasarada@gmail.com"
          className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-2.5 hover:border-primary/40 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
            <Mail size={17} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-foreground/50 font-bold uppercase block truncate">{t('general.email')}</span>
            <span className="text-[11px] font-bold text-foreground truncate block">Email Support</span>
          </div>
        </a>
      </div>

      {/* Activity Section */}
      <div className="space-y-2.5 mb-6">
        <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1 mb-1">
          {t('account.activity')}
        </h3>
        
        <Link 
          href="/account/orders" 
          className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-secondary/20 shadow-sm hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
              <Package size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-foreground block truncate">{t('account.myOrders')}</span>
              <span className="text-[10px] text-foreground/50 truncate block">{t('account.ordersDesc')}</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-foreground/40 flex-shrink-0 ml-2" />
        </Link>

        <Link 
          href="/events" 
          className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-secondary/20 shadow-sm hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <Ticket size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-foreground block truncate">{t('account.myEvents')}</span>
              <span className="text-[10px] text-foreground/50 truncate block">{t('account.eventsDesc')}</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-foreground/40 flex-shrink-0 ml-2" />
        </Link>
        
        <Link 
          href="/donate" 
          className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-secondary/20 shadow-sm hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 flex-shrink-0">
              <Heart size={20} className="fill-rose-200" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-foreground block truncate">{t('account.myDonations')}</span>
              <span className="text-[10px] text-foreground/50 truncate block">{t('account.donationsDesc')}</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-foreground/40 flex-shrink-0 ml-2" />
        </Link>
      </div>

      {/* App Display & Settings Section */}
      <div className="space-y-2.5 mb-6">
        <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1 mb-1">
          {language === "bn" ? "ডিসপ্লে ও থিম সেটিংস" : "Display & Theme Settings"}
        </h3>

        {/* Night / Dark Mode Card */}
        <ThemeToggle variant="card" />
      </div>

      {/* Help & Feedback Section */}
      <div className="space-y-2.5 mb-6">
        <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1 mb-1">
          {t('account.support')}
        </h3>

        <Link 
          href="/account/help" 
          className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-secondary/20 shadow-sm hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
              <Headphones size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-foreground block truncate">{t('account.helpCenter')}</span>
              <span className="text-[10px] text-foreground/50 truncate block">{t('account.helpDesc')}</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-foreground/40 flex-shrink-0 ml-2" />
        </Link>

        <Link 
          href="/account/suggest-feature" 
          className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-secondary/20 shadow-sm hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
              <Lightbulb size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-foreground block truncate">{t('account.suggestFeature')}</span>
              <span className="text-[10px] text-foreground/50 truncate block">{t('account.suggestDesc')}</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-foreground/40 flex-shrink-0 ml-2" />
        </Link>
      </div>

      {/* Logout / Login Action */}
      <div className="mt-auto pt-2">
        {status === "authenticated" ? (
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 text-rose-600 font-bold py-3 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors text-xs"
          >
            <LogOut size={16} />
            <span>লগআউট করুন / {t('account.logout')}</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 text-primary font-bold py-3 bg-primary/10 rounded-2xl border border-primary/20 hover:bg-primary/20 transition-colors text-xs text-center"
          >
            <LogIn size={16} />
            <span>লগইন করুন</span>
          </Link>
        )}
      </div>
    </div>
  );
}
