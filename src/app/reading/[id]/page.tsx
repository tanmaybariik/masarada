"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Share2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ExternalLink,
  ChevronDown,
  Sun,
  Moon,
  Bookmark,
  Check
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LIBRARY_ARTICLES, ReadingItem, getStoredLibraryArticles } from "@/lib/libraryData";
import ShareButton from "@/components/common/ShareButton";

export default function ReadingModePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { language } = useTranslation();
  
  const [allArticles, setAllArticles] = useState<ReadingItem[]>(LIBRARY_ARTICLES);

  useEffect(() => {
    setAllArticles(getStoredLibraryArticles());
  }, []);

  const article = allArticles.find((a) => a.id === resolvedParams.id) || LIBRARY_ARTICLES.find((a) => a.id === resolvedParams.id);

  if (!article) {
    notFound();
  }

  // Reader Settings State
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [readerTheme, setReaderTheme] = useState<"default" | "sepia" | "dark">("default");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text to Speech
  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert(language === "bn" ? "আপনার ব্রাউজার স্পিচ সমর্থন করে না।" : "Speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const titleText = language === "bn" ? article.titleBn : article.titleEn;
    const bodyText = article.sections.map(s => (language === "bn" ? `${s.headingBn}. ${s.textBn}` : `${s.headingEn}. ${s.textEn}`)).join(" ");
    const fullText = `${titleText}. ${bodyText}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = language === "bn" ? "bn-IN" : "en-US";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Theme Styles
  const themeClasses = {
    default: "bg-background text-foreground",
    sepia: "bg-[#FBF0D9] text-[#433422]",
    dark: "bg-[#12100E] text-[#F5EFEB]"
  };

  const fontSizeClasses = {
    sm: "text-xs md:text-sm leading-relaxed",
    base: "text-sm md:text-base leading-relaxed",
    lg: "text-base md:text-lg leading-relaxed",
    xl: "text-lg md:text-xl leading-relaxed"
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[readerTheme]}`}>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-secondary/20 z-50">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Reader Header Controls */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3 transition-colors ${
        readerTheme === "sepia" 
          ? "bg-[#FBF0D9]/90 border-[#ebd8b7]" 
          : readerTheme === "dark" 
          ? "bg-[#12100E]/90 border-white/10" 
          : "bg-white/90 border-secondary/20"
      }`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link 
            href="/reading" 
            className="flex items-center gap-1.5 text-xs font-bold opacity-80 hover:opacity-100 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{language === "bn" ? "লাইব্রেরী" : "Library"}</span>
          </Link>

          {/* Reader Customizer Action Toolbar */}
          <div className="flex items-center gap-1.5">
            {/* Audio Voice Reader */}
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-full border transition-all ${
                isSpeaking 
                  ? "bg-primary text-white border-primary animate-pulse" 
                  : "bg-white/60 hover:bg-white border-secondary/30 text-foreground/80"
              }`}
              title={isSpeaking ? "Stop Voice" : "Listen to Text"}
              aria-label="Text to speech"
            >
              {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Font Sizer */}
            <div className="flex items-center bg-white/60 rounded-full border border-secondary/30 p-0.5">
              <button 
                onClick={() => setFontSize("sm")}
                className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${fontSize === "sm" ? "bg-primary text-white" : "opacity-60"}`}
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize("base")}
                className={`px-2 py-0.5 text-xs font-extrabold rounded-full ${fontSize === "base" ? "bg-primary text-white" : "opacity-60"}`}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize("lg")}
                className={`px-2 py-0.5 text-xs font-extrabold rounded-full ${fontSize === "lg" ? "bg-primary text-white" : "opacity-60"}`}
              >
                A+
              </button>
            </div>

            {/* Reading Theme Switcher */}
            <div className="flex items-center bg-white/60 rounded-full border border-secondary/30 p-0.5">
              <button
                onClick={() => setReaderTheme("default")}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${readerTheme === "default" ? "bg-white text-orange-600 shadow-sm border border-orange-200" : "opacity-60"}`}
                title="Light Theme"
              >
                ☀️
              </button>
              <button
                onClick={() => setReaderTheme("sepia")}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${readerTheme === "sepia" ? "bg-[#FBF0D9] text-[#433422] shadow-sm border border-[#ebd8b7]" : "opacity-60"}`}
                title="Sepia Paper Theme"
              >
                📜
              </button>
              <button
                onClick={() => setReaderTheme("dark")}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${readerTheme === "dark" ? "bg-[#1C1917] text-white shadow-sm border border-white/20" : "opacity-60"}`}
                title="Night Reading Theme"
              >
                🌙
              </button>
            </div>

            <ShareButton 
              title={language === "bn" ? article.titleBn : article.titleEn}
              text={`${language === "bn" ? article.titleBn : article.titleEn}\n${language === "bn" ? article.highlightQuoteBn : article.highlightQuoteEn}`}
              url={`/reading/${article.id}`}
              variant="icon"
            />
          </div>
        </div>
      </header>

      {/* Reader Content Body */}
      <main className="max-w-md mx-auto p-4 pt-6 pb-28">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs opacity-75 mb-3">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] border border-primary/20">
            {language === "bn" ? article.categoryBn : article.categoryEn}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            <span>{language === "bn" ? article.readTimeBn : article.readTimeEn} {language === "bn" ? "পড়ার সময়" : "read"}</span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-xl md:text-2xl font-extrabold leading-tight mb-2">
          {language === "bn" ? article.titleBn : article.titleEn}
        </h1>
        <p className="text-xs md:text-sm opacity-70 mb-5 font-medium">
          {language === "bn" ? article.subtitleBn : article.subtitleEn}
        </p>

        {/* Cover Image */}
        <div className="w-full h-56 rounded-3xl overflow-hidden relative shadow-md mb-6 border border-secondary/20">
          <Image 
            src={article.image} 
            alt={article.titleBn} 
            fill 
            className="object-cover object-top" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs font-semibold drop-shadow-md">
              {language === "bn" ? article.authorBn : article.authorEn}
            </span>
          </div>
        </div>

        {/* Highlighted Quote Callout */}
        <div className={`p-4 rounded-2xl border mb-8 relative overflow-hidden shadow-sm ${
          readerTheme === "sepia" 
            ? "bg-[#f5e4c3] border-[#dec49c]" 
            : readerTheme === "dark" 
            ? "bg-[#1f1c18] border-primary/30" 
            : "bg-orange-50 border-orange-200"
        }`}>
          <div className="flex items-start gap-2.5">
            <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] uppercase font-bold text-primary tracking-wider mb-1">
                {language === "bn" ? "অমৃত মহাবাণী" : "Divine Quote"}
              </p>
              <p className="italic font-medium text-xs md:text-sm leading-snug">
                &ldquo;{language === "bn" ? article.highlightQuoteBn : article.highlightQuoteEn}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Article Sections */}
        <div className="space-y-8">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-2.5">
              <h2 className="text-base md:text-lg font-bold text-primary flex items-center gap-2 border-b border-primary/20 pb-1.5">
                <span>{language === "bn" ? section.headingBn : section.headingEn}</span>
              </h2>
              <p className={`${fontSizeClasses[fontSize]} text-justify text-foreground/90 font-normal leading-relaxed opacity-95`}>
                {language === "bn" ? section.textBn : section.textEn}
              </p>
            </section>
          ))}
        </div>

        {/* Source Citation & Wikipedia Reference */}
        {article.wikiSource && (
          <div className="mt-10 pt-4 border-t border-secondary/20 text-xs opacity-75 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{language === "bn" ? "তথ্যসূত্র ও গবেষণা:" : "Reference & Research:"}</span>
              <a 
                href={article.wikiSource} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline flex items-center gap-1 font-bold"
              >
                <span>Wikipedia Source</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-[11px] opacity-70">
              {language === "bn"
                ? "শ্রীশ্রীরামকৃষ্ণ সঙ্ঘ, বেলুড় মঠ ও উইকিপিডিয়া ঐতিহাসিক নথি সংকলন।"
                : "Compiled from Belur Math Ramakrishna Order archives & Wikipedia historical records."}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-secondary/20 flex gap-3">
          <Link
            href="/reading"
            className="flex-1 bg-secondary/15 hover:bg-secondary/25 py-3 rounded-2xl font-bold text-xs text-center transition-colors"
          >
            {language === "bn" ? "অন্যান্য গ্রন্থসমূহ" : "More Scriptures"}
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-xs hover:bg-primary/90 transition-colors shadow-sm"
          >
            {language === "bn" ? "উপরে যান ↑" : "Back to Top ↑"}
          </button>
        </div>
      </main>
    </div>
  );
}
