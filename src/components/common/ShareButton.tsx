"use client";

import { useState } from "react";
import { Share2, Check, Copy, MessageCircle, Send } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: "icon" | "button" | "pill";
  label?: string;
}

export default function ShareButton({
  title,
  text = "করুণাময়ী মা সারদা আশ্রম ও সেবা ওয়েব অ্যাপে দেখুন:",
  url,
  className = "",
  variant = "icon",
  label = "শেয়ার করুন"
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getFullUrl = () => {
    if (typeof window === "undefined") return url || "";
    if (url?.startsWith("http")) return url;
    const origin = window.location.origin;
    if (url) return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
    return window.location.href;
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const fullUrl = getFullUrl();
    const shareData = {
      title,
      text: `${text}\n${title}`,
      url: fullUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setShowModal(true);
        }
      }
    } else {
      setShowModal(true);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = getFullUrl();
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fullUrl = typeof window !== "undefined" ? getFullUrl() : url || "";
  const encodedText = encodeURIComponent(`${text}\n${title}\n${fullUrl}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;

  return (
    <>
      {variant === "icon" && (
        <button
          onClick={handleShare}
          className={`w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-secondary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-white shadow-sm transition-all ${className}`}
          title="শেয়ার করুন"
        >
          <Share2 size={14} />
        </button>
      )}

      {variant === "button" && (
        <button
          onClick={handleShare}
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-secondary/20 bg-white hover:bg-secondary/10 text-xs font-bold text-foreground/80 shadow-sm transition-all ${className}`}
        >
          <Share2 size={13} className="text-primary" />
          <span>{label}</span>
        </button>
      )}

      {variant === "pill" && (
        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold transition-colors ${className}`}
        >
          <Share2 size={13} />
          <span>{label}</span>
        </button>
      )}

      {/* Fallback Share Sheet / Modal */}
      {showModal && (
        <div 
          onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xs w-full p-5 shadow-2xl space-y-4 animate-scale"
          >
            <div className="flex justify-between items-center border-b border-secondary/15 pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">শেয়ার করুন</h3>
                <p className="text-[10px] text-foreground/60 line-clamp-1">{title}</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-foreground/40 hover:text-foreground p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Direct Social Shortcuts */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1 shadow-sm">
                  <MessageCircle size={16} />
                </div>
                <span className="text-[10px] font-bold">WhatsApp</span>
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center mb-1 shadow-sm">
                  <Send size={15} />
                </div>
                <span className="text-[10px] font-bold">Telegram</span>
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <span className="text-[10px] font-bold">Facebook</span>
              </a>
            </div>

            {/* Copy Link Input */}
            <div className="pt-2 border-t border-secondary/15">
              <div className="flex items-center bg-secondary/10 rounded-xl p-1.5 border border-secondary/20">
                <input
                  type="text"
                  readOnly
                  value={fullUrl}
                  className="bg-transparent text-xs text-foreground/70 px-2 flex-1 outline-none truncate"
                />
                <button
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm ${
                    copied 
                      ? "bg-emerald-600 text-white" 
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "কপি হয়েছে!" : "কপি"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
