"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Download, 
  Share2, 
  Check, 
  Copy, 
  Smartphone, 
  Sparkles, 
  QrCode, 
  MessageCircle, 
  Send,
  X,
  ShieldCheck
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function AppInstallShareCard() {
  const { language } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
      if (isStandalone) {
        setIsInstalled(true);
      }
    }
  }, []);

  const getInstallUrl = () => {
    if (typeof window === "undefined") return "https://karunamoyeemasarada.org/?install=true";
    return `${window.location.origin}/?install=true`;
  };

  const getShareTitle = () => {
    return language === "bn" 
      ? "🌸 করুণাময়ী মা সারদা অফিসিয়াল ওয়েব অ্যাপ" 
      : "🌸 Karunamoyee Ma Sarada Official Web App";
  };

  const getShareText = () => {
    return language === "bn"
      ? "মা সারদার পবিত্র দর্শন, নিত্য পূজা-আরতি, পঞ্জিকা ও শ্রীরামকৃষ্ণ ভক্তিমার্গ গ্রন্থাবলী পেতে এখনই অফিসিয়াল ওয়েব অ্যাপটি আপনার ফোনে সরাসরি ইনস্টল করুন:"
      : "Get sacred darshan, daily arati, panjika calendar, and devotional scriptures on your device. Install the official web app directly:";
  };

  const handleInstallClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-pwa-install"));
    }
  };

  const handleNativeShare = async () => {
    const url = getInstallUrl();
    const title = getShareTitle();
    const text = `${getShareText()}\n${url}`;

    const shareData = {
      title,
      text,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setShowShareModal(true);
        }
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleCopyLink = () => {
    const url = getInstallUrl();
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const installUrl = typeof window !== "undefined" ? getInstallUrl() : "https://karunamoyeemasarada.org/?install=true";
  const encodedText = encodeURIComponent(`${getShareTitle()}\n${getShareText()}\n${installUrl}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(installUrl)}&text=${encodeURIComponent(getShareTitle())}`;

  return (
    <>
      <div className="bg-gradient-to-br from-primary/10 via-amber-500/10 to-orange-500/10 rounded-3xl p-5 border border-primary/25 shadow-sm mb-6 relative overflow-hidden group">
        {/* Glow decoration */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/15 rounded-full blur-2xl group-hover:bg-primary/25 transition-all pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-4 relative z-10">
          <div className="w-13 h-13 rounded-2xl overflow-hidden shadow-md border-2 border-white relative flex-shrink-0 bg-white">
            <Image src="/logo.jpg" alt="Ma Sarada Logo" fill className="object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-extrabold text-foreground text-sm md:text-base truncate">
                {language === "bn" ? "মা সারদা ওয়েব অ্যাপ্লিকেশন" : "Ma Sarada Web App"}
              </h3>
              <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                PWA v1.0
              </span>
            </div>
            <p className="text-[11px] text-foreground/70 leading-tight mt-0.5">
              {language === "bn" 
                ? "প্লে স্টোর ছাড়াই সরাসরি ১-ক্লিকে ইনস্টল ও শেয়ার করুন" 
                : "Install directly on device & share 1-click download link"}
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-foreground/80 mb-4 relative z-10">
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs p-2 rounded-xl border border-white/60">
            <Sparkles size={13} className="text-amber-600 flex-shrink-0" />
            <span className="truncate font-medium">{language === "bn" ? "অফলাইন সুবিধা" : "Offline Ready"}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs p-2 rounded-xl border border-white/60">
            <ShieldCheck size={13} className="text-emerald-600 flex-shrink-0" />
            <span className="truncate font-medium">{language === "bn" ? "সম্পূর্ণ নিরাপদ (2MB)" : "Zero Storage (2MB)"}</span>
          </div>
        </div>

        {/* Action Buttons: Install & Share */}
        <div className="flex items-center gap-2.5 relative z-10">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-primary to-orange-600 hover:from-primary/95 hover:to-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Download size={15} className="animate-bounce" />
            <span>
              {isInstalled 
                ? (language === "bn" ? "অ্যাপ ইনস্টল্ড রয়েছে" : "App Installed") 
                : (language === "bn" ? "ডিভাইসে ইনস্টল করুন" : "Install on Device")}
            </span>
          </button>

          <button
            onClick={handleNativeShare}
            className="py-2.5 px-3.5 rounded-2xl bg-white hover:bg-zinc-50 text-foreground border border-secondary/25 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            title="Share App Link"
          >
            <Share2 size={15} className="text-primary" />
            <span>{language === "bn" ? "শেয়ার লিঙ্ক" : "Share Link"}</span>
          </button>

          <button
            onClick={() => setShowQrModal(true)}
            className="p-2.5 rounded-2xl bg-white hover:bg-zinc-50 text-foreground/80 border border-secondary/25 shadow-sm active:scale-95 transition-all"
            title="Scan QR to Install"
          >
            <QrCode size={16} />
          </button>
        </div>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-secondary/20 p-5 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Share2 size={16} />
                </div>
                <h3 className="font-bold text-sm text-foreground">
                  {language === "bn" ? "ওয়েব অ্যাপ ডাউনলোড লিঙ্ক শেয়ার করুন" : "Share Direct App Install Link"}
                </h3>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center text-foreground/60 hover:bg-secondary/20"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs text-foreground/70 leading-relaxed">
              {language === "bn" 
                ? "এই লিঙ্কে ক্লিক করলেই যে কেউ সরাসরি তাদের ফোনে 'মা সারদা' ওয়েব অ্যাপ ইনস্টল করতে পারবেন:" 
                : "Anyone clicking this link can instantly install the web app on their phone or PC:"}
            </p>

            {/* Direct Copy Input */}
            <div className="flex items-center gap-2 bg-secondary/10 p-1.5 rounded-2xl border border-secondary/20">
              <input
                type="text"
                readOnly
                value={installUrl}
                className="bg-transparent text-xs text-foreground px-2 flex-1 outline-none truncate font-mono select-all"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                  copied ? "bg-emerald-600 text-white" : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? (language === "bn" ? "কপি হয়েছে" : "Copied") : (language === "bn" ? "কপি" : "Copy")}</span>
              </button>
            </div>

            {/* Social Share Shortcuts */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold hover:bg-sky-100 transition-colors"
              >
                <Send size={16} className="text-sky-600" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal for Phone Scanning */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-secondary/20 p-6 space-y-4 text-center animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground text-left">
                {language === "bn" ? "ক্যামেরা দিয়ে স্ক্যান করে ইনস্টল করুন" : "Scan to Install on Mobile"}
              </h3>
              <button 
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center text-foreground/60 hover:bg-secondary/20"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-primary/20 shadow-inner inline-block mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(installUrl)}`}
                alt="App Install QR Code"
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>

            <p className="text-xs text-foreground/60">
              {language === "bn" 
                ? "যেকোনো স্মার্টফোনের ক্যামেরা দিয়ে QR কোড স্ক্যান করে ১-ক্লিকে ইনস্টল করুন।" 
                : "Point any phone camera at this QR code to install the app directly."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
