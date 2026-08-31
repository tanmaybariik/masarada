"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb, CheckCircle2, Send, Sparkles, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function SuggestFeaturePage() {
  const { t, language } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState(language === "bn" ? "অর্ণব ভক্ত" : "Arnab Bhakta");
  const [contact, setContact] = useState("+91 8918501779");
  const [category, setCategory] = useState("calendar");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-5">
        <Link href="/account" className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs md:text-sm">
          <ArrowLeft size={18} className="mr-2" />
          <span>{t('account.title')}</span>
        </Link>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={11} />
          {language === "bn" ? "প্রস্তাবনা" : "Feedback"}
        </span>
      </div>

      {!submitted ? (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              <Lightbulb size={20} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                {t('suggest.title')}
              </h1>
              <p className="text-foreground/60 text-xs mt-0.5">
                {t('suggest.subtitle')}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-2xl border border-secondary/20 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {t('suggest.name')} *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder={language === "bn" ? "উদাঃ অর্ণব ভক্ত" : "e.g. Arnab Bhakta"}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {t('suggest.contact')} *
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder="+91..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {t('suggest.category')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background font-medium"
              >
                <option value="calendar">{language === "bn" ? "পঞ্জিকা ও ক্যালেন্ডার" : "Calendar & Panjika"}</option>
                <option value="audio">{language === "bn" ? "অডিও গান ও আরতি" : "Audio Songs & Arati"}</option>
                <option value="events">{language === "bn" ? "ইভেন্ট ও বুকিং পাস" : "Events & Booking Pass"}</option>
                <option value="shop">{language === "bn" ? "বিপণী ও সামগ্রী" : "Store & Puja Items"}</option>
                <option value="other">{language === "bn" ? "অন্যান্য সুবিধা বা ডিজাইন" : "Other Features / UI"}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {t('suggest.featureTitle')} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder={language === "bn" ? "উদাঃ দৈনিক পুষ্পাঞ্জলি নোটিফিকেশন" : "e.g. Daily Pushpanjali Notification"}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {t('suggest.featureDesc')} *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder={language === "bn" ? "আপনার প্রস্তাবনা সম্পর্কে বিস্তারিত লিখুন..." : "Describe your suggestion in detail..."}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 text-xs md:text-sm"
            >
              <Send size={15} />
              <span>{t('suggest.submit')}</span>
            </button>
          </form>
        </div>
      ) : (
        /* Thank you / Feedback Confirmation Card */
        <div className="bg-white rounded-3xl border border-secondary/20 shadow-lg p-6 text-center space-y-5 animate-scale my-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground">
              {t('suggest.thankYou')}
            </h2>
            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">
              {t('suggest.thankYouDesc')}
            </p>
          </div>

          <div className="bg-secondary/10 rounded-2xl p-4 text-left space-y-1.5 border border-secondary/15">
            <div className="flex justify-between text-xs">
              <span className="text-foreground/60">{t('suggest.featureTitle')}:</span>
              <span className="font-bold text-foreground truncate max-w-[160px]">{title}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground/60">{t('suggest.category')}:</span>
              <span className="font-semibold text-primary">{category}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setDescription("");
              }}
              className="w-full bg-secondary/15 hover:bg-secondary/25 text-foreground font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              {t('suggest.another')}
            </button>

            <Link
              href="/account"
              className="w-full bg-primary text-white font-bold py-2.5 rounded-xl text-xs hover:bg-primary/90 transition-colors shadow-sm"
            >
              {t('donate.backToHome')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
