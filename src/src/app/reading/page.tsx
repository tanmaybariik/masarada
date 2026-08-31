"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Clock, 
  Bookmark, 
  ArrowRight,
  Filter,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LIBRARY_ARTICLES, ReadingItem, getStoredLibraryArticles } from "@/lib/libraryData";
import ShareButton from "@/components/common/ShareButton";

export default function ReadingPage() {
  const { t, language } = useTranslation();
  const [articles, setArticles] = useState<ReadingItem[]>(LIBRARY_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setArticles(getStoredLibraryArticles());
    const handleUpdate = () => {
      setArticles(getStoredLibraryArticles());
    };
    window.addEventListener("library_updated", handleUpdate);
    return () => window.removeEventListener("library_updated", handleUpdate);
  }, []);

  const categories = [
    { id: "all", labelBn: "সব গ্রন্থ ও নিবন্ধ", labelEn: "All Articles" },
    { id: "biography", labelBn: "পবিত্র জীবনী", labelEn: "Biographies" },
    { id: "teachings", labelBn: "উপদেশ ও বাণী", labelEn: "Teachings" },
    { id: "scripture", labelBn: "কথামৃত ও শাস্ত্র", labelEn: "Scriptures" },
  ];

  const filteredArticles = articles.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = 
      item.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0] || LIBRARY_ARTICLES[0];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-28">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-foreground flex items-center gap-2">
            <BookOpen className="text-primary" size={22} />
            <span>{t('library.title')}</span>
          </h1>
          <p className="text-foreground/60 text-xs mt-0.5">{t('library.subtitle')}</p>
        </div>
        <ShareButton 
          title="করুণাময়ী মা সারদা ডিজিটাল গ্রন্থালয় ও পাঠাগার"
          text="শ্রীশ্রীমা সারদা দেবী, শ্রীরামকৃষ্ণ ও স্বামী বিবেকানন্দের পবিত্র জীবনী, বাণী ও কথামৃত পাঠ করুন।"
          url="/reading"
          variant="icon"
        />
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === "bn" ? "গ্রন্থ বা জীবনী সন্ধান করুন..." : "Search scriptures, biographies..."}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-secondary/25 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-foreground/40 shadow-sm"
        />
        <Search className="absolute left-3.5 top-3 text-foreground/40" size={16} />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === cat.id
                ? "bg-primary text-white scale-105"
                : "bg-white text-foreground/70 hover:bg-secondary/10 border border-secondary/20"
            }`}
          >
            {language === "bn" ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Featured Card (Mother Sarada Devi Masterpiece) */}
      {selectedCategory === "all" && !searchQuery && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} />
              {language === "bn" ? "বিশেষ নির্বাচিত পাঠ" : "Featured Scripture"}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-secondary/25 overflow-hidden shadow-md group hover:border-primary/40 transition-all">
            <div className="h-56 w-full relative">
              <Image 
                src={featuredArticle.image} 
                alt={featuredArticle.titleBn} 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm uppercase">
                {language === "bn" ? featuredArticle.categoryBn : featuredArticle.categoryEn}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] text-white/70 block flex items-center gap-1">
                  <Clock size={11} /> {language === "bn" ? featuredArticle.readTimeBn : featuredArticle.readTimeEn} {t('library.readTime')}
                </span>
                <h3 className="font-bold text-sm md:text-base leading-snug drop-shadow-md">
                  {language === "bn" ? featuredArticle.titleBn : featuredArticle.titleEn}
                </h3>
              </div>
            </div>

            <div className="p-4 bg-white space-y-3">
              <p className="text-xs text-foreground/75 line-clamp-2 leading-relaxed">
                {language === "bn" ? featuredArticle.subtitleBn : featuredArticle.subtitleEn}
              </p>

              <div className="pt-2 border-t border-secondary/15 flex items-center justify-between">
                <span className="text-[11px] text-foreground/50 font-medium truncate">
                  {language === "bn" ? featuredArticle.authorBn : featuredArticle.authorEn}
                </span>

                <Link
                  href={`/reading/${featuredArticle.id}`}
                  className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm group-hover:gap-2"
                >
                  <span>{t('library.startReading')}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1">
          {language === "bn" ? `উপলব্ধ গ্রন্থাবলী (${filteredArticles.length})` : `Available Library Books (${filteredArticles.length})`}
        </h2>

        {filteredArticles.map(article => (
          <Link
            key={article.id}
            href={`/reading/${article.id}`}
            className="flex gap-3.5 bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm hover:border-primary/40 hover:shadow-md transition-all group"
          >
            <div className="w-22 h-24 rounded-xl overflow-hidden relative flex-shrink-0 bg-secondary/10 shadow-inner">
              <Image 
                src={article.image} 
                alt={article.titleBn} 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300" 
              />
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
              <div>
                <div className="flex items-center justify-between text-[10px] text-foreground/50 mb-1">
                  <span className="text-primary font-bold uppercase">{language === "bn" ? article.categoryBn : article.categoryEn}</span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={10} />
                    {language === "bn" ? article.readTimeBn : article.readTimeEn}
                  </span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {language === "bn" ? article.titleBn : article.titleEn}
                </h3>
                <p className="text-[11px] text-foreground/60 line-clamp-1 mt-0.5">
                  {language === "bn" ? article.subtitleBn : article.subtitleEn}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-secondary/10 mt-1">
                <span className="text-[10px] text-foreground/40 font-medium truncate max-w-[150px]">
                  {language === "bn" ? article.authorBn : article.authorEn}
                </span>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('library.startReading')}</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-secondary/20 p-6 shadow-sm">
            <BookOpen size={32} className="mx-auto text-foreground/30 mb-2" />
            <p className="text-xs font-bold text-foreground/60">
              {language === "bn" ? "কোনো গ্রন্থ পাওয়া যায়নি।" : "No scriptures found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
