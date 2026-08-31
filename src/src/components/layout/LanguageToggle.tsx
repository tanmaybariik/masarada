"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "bn" ? "en" : "bn");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors text-xs font-bold text-primary border border-secondary/20"
      aria-label="Toggle Language"
    >
      <Globe className="w-4 h-4" />
      <span>{language === "bn" ? "EN" : "BN"}</span>
    </button>
  );
}
