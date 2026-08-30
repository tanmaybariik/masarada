"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Smartphone, CheckCircle, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function PWAInstallButton() {
  const { language } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Prompt modal or simple guidance
      alert(
        language === "bn"
          ? "আপনার ব্রাউজার মেনু (⋮ বা Share) থেকে 'Add to Home screen' বা 'অ্যাপ ইনস্টল করুন' অপশনটি বেছে নিন।"
          : "Tap your browser menu (⋮ or Share) and select 'Add to Home Screen' or 'Install App'."
      );
    }
  };

  if (isInstalled) {
    return (
      <div className="w-full max-w-sm mx-auto mb-6 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 text-emerald-800 text-xs font-semibold shadow-sm">
        <CheckCircle size={16} className="text-emerald-600" />
        <span>{language === "bn" ? "অ্যাপটি আপনার ফোনে ইনস্টল করা আছে" : "App is installed on your device"}</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-amber-500/10 to-primary/10 border border-primary/20 shadow-md relative overflow-hidden group">
      {/* Decorative animated glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
      
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-white/60 relative flex-shrink-0">
            <Image src="/logo.jpg" alt="App Logo" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-bold text-foreground text-sm">
                {language === "bn" ? "মা সারদা ওয়েব অ্যাপ" : "Ma Sarada Web App"}
              </h4>
              <Sparkles size={12} className="text-amber-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-foreground/60 leading-tight">
              {language === "bn" ? "হোম স্ক্রিনে শর্টকাট যুক্ত করুন" : "Add shortcut to Home Screen"}
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="relative px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary to-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all flex-shrink-0"
        >
          <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
          <Download size={14} className="animate-bounce" />
          <span>{language === "bn" ? "ইনস্টল করুন" : "Install App"}</span>
        </button>
      </div>
    </div>
  );
}
