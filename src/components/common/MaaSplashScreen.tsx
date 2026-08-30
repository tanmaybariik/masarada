"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function MaaSplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 1.4 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1400);

    // Completely remove from DOM after fade transition completes (2.0s)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsFading(true)}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0f07] via-[#2a1306] to-[#120803] text-white select-none transition-all duration-700 ease-out cursor-pointer ${
        isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
      aria-label="Welcome to Karunamoyee Ma Sarada"
    >
      {/* Background Divine Golden Rays / Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-2xl animate-ping opacity-30" />
      </div>

      {/* Center Sacred Divine Avatar & "মা" Animation */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Divine Image with Animated Golden Ring */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 mb-5">
          {/* Pulsing Outer Rings */}
          <div className="absolute -inset-2.5 rounded-full border-2 border-amber-400/40 animate-spin" style={{ animationDuration: "12s" }} />
          <div className="absolute -inset-5 rounded-full border border-amber-500/25 animate-ping opacity-40" />

          {/* Portrait Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.6)] bg-black/40">
            <Image
              src="/logo.jpg"
              alt="Holy Mother Sri Sarada Devi"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Floating Sparkle Badges */}
          <div className="absolute -top-1 -right-1 bg-amber-400 text-black p-1 rounded-full shadow-lg animate-bounce">
            <Sparkles size={14} />
          </div>
        </div>

        {/* Radiant Sacred "মা" (Maa) Typography */}
        <div className="relative mb-2">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(245,158,11,0.8)] animate-pulse">
            মা
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mt-1" />
        </div>

        {/* Organisation Name & Benediction */}
        <div className="space-y-1.5 mt-2">
          <h2 className="text-sm md:text-base font-bold text-amber-100 tracking-wide">
            করুণাময়ী মা সারদা
          </h2>
          <p className="text-xs md:text-sm text-amber-200/90 italic font-medium max-w-xs leading-relaxed">
            “আমি সৎ-এরও মা, অসৎ-এরও মা।”
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-amber-400/30">
              জয় মা সারদা
            </span>
          </div>
        </div>
      </div>

      {/* Tap to skip hint at bottom */}
      <div className="absolute bottom-6 text-[10px] text-white/40 font-medium tracking-wider">
        স্পর্শ করুন / Tap to continue
      </div>
    </div>
  );
}
