"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Download, X, Smartphone, Check, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

function PWAInstallPromptInner() {
  const { language } = useTranslation();
  const searchParams = useSearchParams();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone/PWA mode
    if (typeof window !== "undefined") {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
      if (isStandalone) {
        setIsInstalled(true);
      }

      // Detect iOS device
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).__pwaDeferredPrompt = e;
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowModal(false);
      setDeferredPrompt(null);
    };

    const handleOpenModal = () => {
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("open-pwa-install", handleOpenModal);

    // Auto-open modal if user opened shared link with ?install=true or ?pwa=true
    const shouldInstall = searchParams.get("install") === "true" || searchParams.get("pwa") === "true" || searchParams.get("install") === "1";
    if (shouldInstall) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("open-pwa-install", handleOpenModal);
    };
  }, [searchParams]);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || (window as any).__pwaDeferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setShowModal(false);
      }
      setDeferredPrompt(null);
      (window as any).__pwaDeferredPrompt = null;
    } else if (isIOS) {
      // Stay on modal to view iOS instructions
    } else {
      alert(
        language === "bn"
          ? "আপনার ব্রাউজার মেনু (⋮) খুলে 'Add to Home screen' বা 'Install App' অপশন চাপুন।"
          : "Tap your browser menu (⋮) and choose 'Add to Home screen' or 'Install App'."
      );
    }
  };

  if (!showModal || isInstalled) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-secondary/20 relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center text-foreground/70 transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* Header Header Gradient */}
        <div className="bg-gradient-to-br from-primary via-orange-600 to-amber-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-2 border-white/80 mx-auto relative mb-3 bg-white">
            <Image src="/logo.jpg" alt="Karunamoyee Ma Sarada Logo" fill className="object-cover" />
          </div>

          <div className="flex items-center justify-center gap-1 mb-1">
            <h3 className="font-extrabold text-lg">
              {language === "bn" ? "করুণাময়ী মা সারদা" : "Karunamoyee Ma Sarada"}
            </h3>
            <Sparkles size={16} className="text-amber-300 animate-pulse" />
          </div>
          <p className="text-xs text-white/90 font-medium">
            {language === "bn" ? "অফিসিয়াল ওয়েব অ্যাপ্লিকেশন" : "Official Web Application"}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="space-y-2 text-xs text-foreground/80">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Check size={15} className="text-emerald-600 flex-shrink-0" />
              <span>{language === "bn" ? "প্লে স্টোর ছাড়াই সরাসরি ১-ক্লিকে ইনস্টল" : "Direct 1-Click Install (Zero Store Storage)"}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Check size={15} className="text-emerald-600 flex-shrink-0" />
              <span>{language === "bn" ? "অফলাইন দর্শন, পঞ্জিকা ও ভক্তিগ্রন্থ সুবিধা" : "Instant Darshan, Panjika & Audio Player"}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Check size={15} className="text-emerald-600 flex-shrink-0" />
              <span>{language === "bn" ? "বিজ্ঞাপনমুক্ত ও অতি দ্রুত গতির অ্যাপ" : "Ad-Free, Ultra Fast & Lightweight (2MB)"}</span>
            </div>
          </div>

          {/* iOS Instructions */}
          {isIOS && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs text-amber-900">
              <p className="font-bold flex items-center gap-1.5 text-amber-800">
                <Smartphone size={14} />
                <span>{language === "bn" ? "iPhone / iPad ইনস্টল করার নিয়ম:" : "How to Install on iPhone / iPad:"}</span>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-amber-800/90 font-medium">
                <li>
                  {language === "bn" ? (
                    <>Safari ব্রাউজারের নিচে থাকা <span className="font-bold underline">Share (📤)</span> বাটনে চাপুন।</>
                  ) : (
                    <>Tap the <span className="font-bold underline">Share (📤)</span> button at the bottom of Safari.</>
                  )}
                </li>
                <li>
                  {language === "bn" ? (
                    <>তালিকা থেকে <span className="font-bold underline">Add to Home Screen (➕)</span> বেছে নিন।</>
                  ) : (
                    <>Select <span className="font-bold underline">Add to Home Screen (➕)</span> from the list.</>
                  )}
                </li>
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {!isIOS && (
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary via-orange-600 to-amber-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
              >
                <Download size={18} className="animate-bounce" />
                <span>{language === "bn" ? "এখনই ফোনে ইনস্টল করুন" : "Install App Now"}</span>
              </button>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 px-4 rounded-2xl bg-secondary/10 hover:bg-secondary/20 text-foreground/70 font-bold text-xs transition-colors"
            >
              {language === "bn" ? "ওয়েবসাইট ব্রাউজ চালিয়ে যান" : "Continue in Browser"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PWAAutoInstallHandler() {
  return (
    <Suspense fallback={null}>
      <PWAInstallPromptInner />
    </Suspense>
  );
}
