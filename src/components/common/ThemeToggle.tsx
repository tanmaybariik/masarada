"use client";

import { useTheme } from "@/lib/theme/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface ThemeToggleProps {
  variant?: "switch" | "icon" | "card";
  className?: string;
}

export default function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { language } = useTranslation();
  const isDark = theme === "dark";

  if (variant === "card") {
    return (
      <div 
        onClick={toggleTheme}
        className={`flex items-center justify-between bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm cursor-pointer hover:border-primary/40 transition-all select-none ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            isDark ? "bg-amber-400/20 text-amber-300" : "bg-indigo-100 text-indigo-700"
          }`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-foreground block truncate">
                {language === "bn" ? "নাইট মোড / ডার্ক মোড" : "Night Mode / Dark Mode"}
              </span>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                isDark ? "bg-primary/20 text-primary" : "bg-secondary/20 text-foreground/70"
              }`}>
                {isDark ? (language === "bn" ? "চালু" : "ON") : (language === "bn" ? "বন্ধ" : "OFF")}
              </span>
            </div>
            <span className="text-[10px] text-foreground/50 truncate block">
              {language === "bn" 
                ? (isDark ? "অন্ধকার থিম সক্রিয় আছে (চোখের আরামের জন্য)" : "চোখের আরামের জন্য অন্ধকার থিম চালু করুন") 
                : (isDark ? "Dark theme active for comfortable night reading" : "Switch to dark theme for night viewing")}
            </span>
          </div>
        </div>

        {/* Animated Toggle Switch */}
        <div className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center flex-shrink-0 ml-3 ${
          isDark ? "bg-primary" : "bg-zinc-200"
        }`}>
          <div className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform flex items-center justify-center text-[10px] ${
            isDark ? "translate-x-5.5 text-primary" : "translate-x-0 text-zinc-400"
          }`}>
            {isDark ? <Moon size={11} className="fill-primary" /> : <Sun size={11} className="fill-amber-400 text-amber-400" />}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "switch") {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-white hover:bg-secondary/10 transition-all text-xs font-bold text-foreground/80 shadow-sm ${className}`}
        aria-label="Toggle Night Mode"
      >
        {isDark ? (
          <>
            <Sun size={14} className="text-amber-400 fill-amber-400" />
            <span>{language === "bn" ? "লাইট মোড" : "Light Mode"}</span>
          </>
        ) : (
          <>
            <Moon size={14} className="text-indigo-600 fill-indigo-100" />
            <span>{language === "bn" ? "নাইট মোড" : "Night Mode"}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-full bg-white border border-secondary/20 flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-secondary/10 shadow-sm transition-all ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
    </button>
  );
}
