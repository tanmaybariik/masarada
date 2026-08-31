"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Users, 
  Heart, 
  Target, 
  Compass, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  ExternalLink,
  MessageSquare,
  Flame,
  Award,
  BookOpen,
  Radio,
  Send
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import ShareButton from "@/components/common/ShareButton";

export default function AboutPage() {
  const { language } = useTranslation();
  const isBn = language === "bn";

  const stats = [
    {
      num: isBn ? "৩,৫০,০০০+" : "350K+",
      labelBn: "ডিজিটাল সদস্য ও ভক্ত",
      labelEn: "Community Members",
      icon: Users,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-950/40"
    },
    {
      num: isBn ? "৫০ লাখ+" : "5M+",
      labelBn: "বার্ষিক আধ্যাত্মিক ভিউ",
      labelEn: "Annual Spiritual Reach",
      icon: Flame,
      color: "text-rose-600 bg-rose-100 dark:bg-rose-950/40"
    },
    {
      num: isBn ? "১,২০০+" : "1,200+",
      labelBn: "প্রবচন ও ভক্তিমূলক ভিডিও",
      labelEn: "Discourses & Videos",
      icon: Radio,
      color: "text-primary bg-primary/10"
    },
    {
      num: isBn ? "১০০%" : "100%",
      labelBn: "নিঃস্বার্থ মানবসেবা ও আদর্শ",
      labelEn: "Selfless Service & Values",
      icon: Heart,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40"
    }
  ];

  const pillars = [
    {
      titleBn: "আধুনিক ডিজিটাল মাধ্যমে আধ্যাত্মিক প্রচার",
      titleEn: "Spiritual Values via Modern Media",
      descBn: "প্রযুক্তির শক্তিকে কাজে লাগিয়ে শ্রীশ্রীরামকৃষ্ণ ও শ্রীমায়ের অমৃতবাণী বিশ্বব্যাপী ছড়িয়ে দেওয়া।",
      descEn: "Sharing timeless ideals and divine teachings through modern digital mediums."
    },
    {
      titleBn: "পবিত্র স্থান ও ঐতিহ্যের সংরক্ষণ",
      titleEn: "Preserving Sacred Heritage",
      descBn: "তীর্থস্থান, মঠ ও পুণ্যভূমির ঐতিহ্য এবং দর্শনীয় মাহাত্ম্য মানুষের কাছে সহজলভ্য করা।",
      descEn: "Preserving and sharing the rich heritage of holy shrines and pilgrim centres."
    },
    {
      titleBn: "ভালোবাসা, সহমর্মিতা ও সম্প্রীতি",
      titleEn: "Harmony, Love & Compassion",
      descBn: "ধর্ম ও জাতপাতের ঊর্ধ্বে উঠে মানবপ্রেম ও সার্বজনীন ভ্রাতৃত্ববোধ জাগ্রত করা।",
      descEn: "Inspiring love, empathy, and universal brotherhood beyond all boundaries."
    },
    {
      titleBn: "বিশ্বব্যাপী ভক্তদের মেলবন্ধন",
      titleEn: "Uniting Global Devotees",
      descBn: "ভৌগোলিক দূরত্ব ঘুচিয়ে বিভিন্ন প্রান্তের আধ্যাত্মিক অনুরাগীদের একত্রিত করা।",
      descEn: "Connecting spiritual seekers across geographical frontiers in one family."
    },
    {
      titleBn: "অর্থবহ ও প্রামাণ্য বিষয়বস্তু পরিবেশন",
      titleEn: "Authentic & Meaningful Content",
      descBn: "কথামৃত, ভজন ও প্রামাণ্য ধর্মগ্রন্থের মূল শিক্ষা যথাযথভাবে পরিবেশন করা।",
      descEn: "Delivering authentic, inspirational, and respectful spiritual literature."
    },
    {
      titleBn: "শিবজ্ঞানে জীবসেবার চেতনা",
      titleEn: "Selfless Service to Humanity",
      descBn: "নিঃস্বার্থ মানবকল্যাণ ও আর্তমানবতার সেবার আদর্শে মানুষকে অনুপ্রাণিত করা।",
      descEn: "Fostering selfless humanitarian service and welfare for all living beings."
    }
  ];

  const socialChannels = [
    {
      name: "YouTube Channel",
      handle: "@KarunamoyeeMaSarada",
      url: "https://www.youtube.com/@KarunamoyeeMaSarada",
      color: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
      descBn: "নিয়মিত লাইভ স্ট্রিম, প্রবচন ও কীর্তন",
      descEn: "Live stream, discourses & kirtans"
    },
    {
      name: "Facebook Page",
      handle: "Karunamoyee Ma Sarada",
      url: "https://www.facebook.com/KarunamoyeeMaSarada",
      color: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
      descBn: "দৈনিক বাণী, ফটো ও উৎসব আপডেট",
      descEn: "Daily quotes, photos & updates"
    },
    {
      name: "Instagram",
      handle: "@karunamoyee_ma_srada",
      url: "https://www.instagram.com/karunamoyee_ma_srada/",
      color: "bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100",
      descBn: "পবিত্র দর্শন ও রিলস ভিডিও",
      descEn: "Divine darshan & devotional reels"
    },
    {
      name: "WhatsApp Community",
      handle: "Official Devotee Group",
      url: "https://chat.whatsapp.com/BnCJ7s0b5Hx9IRB7X5yS2M",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100",
      descBn: "তাৎক্ষণিক নোটিফিকেশন ও পঞ্জিকা",
      descEn: "Instant notifications & panjika"
    },
    {
      name: "Telegram Channel",
      handle: "Karunamoyee Ma Sarada",
      url: "https://t.me/KarunamoyeeMaSarada",
      color: "bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100",
      descBn: "অডিও ভজন ও আধ্যাত্মিক ই-বুক",
      descEn: "Audio bhajans & spiritual literature"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md md:max-w-3xl w-full mx-auto bg-background p-4 pt-6 pb-28 md:pb-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-5">
        <Link 
          href="/" 
          className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs md:text-sm font-semibold"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>{isBn ? "হোমে ফিরুন" : "Back to Home"}</span>
        </Link>
        <ShareButton
          title={isBn ? "করুণাময়ী মা সারদা — আমাদের সম্পর্কে" : "About Karunamoyee Ma Sarada Organisation"}
          text={isBn 
            ? "শ্রীশ্রীরামকৃষ্ণ ও শ্রীশ্রীমা সারদাদেবীর আদর্শে অনুপ্রাণিত ৩,৫০,০০০+ সদস্যের আধ্যাত্মিক পরিবার:" 
            : "A Spiritual Community of 350,000+ members inspired by Sri Ramakrishna & Holy Mother Sarada Devi:"}
          url="/about"
          variant="icon"
        />
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          <Sparkles size={13} />
          <span>{isBn ? "আমাদের সম্পর্কে" : "About Our Organisation"}</span>
        </div>

        <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight">
          {isBn 
            ? "শ্রীশ্রী রামকৃষ্ণ ও শ্রীশ্রীমা সারদাদেবীর আদর্শে অনুপ্রাণিত একটি আধ্যাত্মিক সম্প্রদায়" 
            : "A Spiritual Community Inspired by Sri Ramakrishna & Holy Mother Sri Sarada Devi"}
        </h1>
        <p className="text-xs md:text-sm text-foreground/70 leading-relaxed max-w-sm mx-auto">
          {isBn
            ? "মানবসেবা, সর্বধর্ম সমন্বয়, নিষ্কাম প্রেম ও আধ্যাত্মিক চেতনার আলো ঘরে ঘরে পৌঁছে দেওয়ার এক পুণ্য মহাযজ্ঞ।"
            : "Dedicated to sharing the timeless ideals, teachings, values and selfless service of Holy Mother across the globe."}
        </p>
      </div>

      {/* Featured Altar Banner */}
      <div className="relative w-full h-52 rounded-3xl overflow-hidden shadow-lg mb-6 border border-secondary/25">
        <Image
          src="/maa-sarada-hero.jpg"
          alt="Holy Mother Sri Sarada Devi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
            {isBn ? "বিশ্বজননী করুণাময়ী মা" : "Universal Divine Mother"}
          </span>
          <p className="text-xs italic text-white/90">
            {isBn
              ? "“আমি সৎ-এরও মা, অসৎ-এরও মা। কেউ পর নয় মা, জগৎ তোমার।”"
              : "“I am the Mother of the good, I am the Mother of the wicked. The whole world is yours!”"}
          </p>
        </div>
      </div>

      {/* 350K+ Community Milestone Stats Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-foreground/60 uppercase tracking-wider">
            {isBn ? "আমাদের ৩,৫০,০০০+ সদস্যের পরিবার" : "Our 350,000+ Global Family"}
          </h2>
          <span className="text-[10px] bg-primary text-white font-extrabold px-2 py-0.5 rounded-full">
            {isBn ? "আন্তর্জাতিক উপস্থিতি" : "GLOBAL REACH"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${st.color}`}>
                    <Icon size={16} />
                  </div>
                </div>
                <div>
                  <span className="text-lg md:text-xl font-extrabold text-foreground block tracking-tight">
                    {st.num}
                  </span>
                  <span className="text-[11px] text-foreground/60 font-medium line-clamp-1">
                    {isBn ? st.labelBn : st.labelEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Narrative: Our Purpose & Mission */}
      <div className="bg-white rounded-3xl border border-secondary/20 p-5 shadow-sm space-y-3 mb-6">
        <div className="flex items-center gap-2.5 text-primary">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart size={18} />
          </div>
          <h3 className="font-bold text-sm md:text-base text-foreground">
            {isBn ? "আমাদের উদ্দেশ্য ও পথচলা" : "Our Purpose & Mission"}
          </h3>
        </div>

        <p className="text-xs text-foreground/80 leading-relaxed text-justify">
          {isBn
            ? "আমাদের প্রধান উদ্দেশ্য হলো ভালোবাসা, ভক্তি, মানবতা, সহমর্মিতা, সম্প্রীতি ও সেবার আদর্শ মানুষের মধ্যে ছড়িয়ে দেওয়া। আমরা বিশ্বাস করি, আধ্যাত্মিকতা শুধুমাত্র ব্যক্তিগত উপাসনার মধ্যে সীমাবদ্ধ নয়—মানুষের প্রতি ভালোবাসা, সহানুভূতি, নিঃস্বার্থ সেবা এবং সকলের প্রতি পরম সম্মান প্রদর্শনের মধ্য দিয়েই তার প্রকৃত প্রকাশ ঘটে।"
            : "Our primary purpose is to spread the message of love, compassion, devotion, harmony and service to humanity. We believe that spirituality is not limited to personal worship—it is expressed through kindness, selfless service and respect for every human being."}
        </p>

        <p className="text-xs text-foreground/80 leading-relaxed text-justify pt-1 border-t border-secondary/10">
          {isBn
            ? "আমাদের বিভিন্ন ডিজিটাল প্ল্যাটফর্মের মাধ্যমে শ্রীশ্রী রামকৃষ্ণ, শ্রীশ্রীমা সারদাদেবী, বিভিন্ন মঠ, তীর্থস্থান, পবিত্র স্থান, ধর্মীয় ও আধ্যাত্মিক অনুষ্ঠান এবং ভক্তিমূলক বিষয়ের উপর প্রামাণ্য তথ্য মানুষের কাছে পৌঁছে দেওয়া হয়।"
            : "Through our digital platforms, we share devotional and spiritual content, photographs and teachings related to Sri Ramakrishna, Holy Mother Sri Sarada Devi, sacred shrines, maths, and spiritual cultural heritage."}
        </p>
      </div>

      {/* Strategic Vision Pillars */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Target size={16} className="text-primary" />
          <h3 className="text-xs font-bold text-foreground/60 uppercase tracking-wider">
            {isBn ? "আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি" : "Our Strategic Vision & Pillars"}
          </h3>
        </div>

        <div className="space-y-2.5">
          {pillars.map((pil, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-start gap-3 hover:border-primary/40 transition-all">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                <CheckCircle2 size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-foreground leading-snug">
                  {isBn ? pil.titleBn : pil.titleEn}
                </h4>
                <p className="text-[11px] text-foreground/60 mt-0.5 leading-relaxed">
                  {isBn ? pil.descBn : pil.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Our Community (Action Cards) */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Globe2 size={16} className="text-primary" />
          <h3 className="text-xs font-bold text-foreground/60 uppercase tracking-wider">
            {isBn ? "ডিজিটাল প্ল্যাটফর্মে আমাদের সাথে যুক্ত হোন" : "Join Our Digital Community"}
          </h3>
        </div>

        <div className="space-y-2">
          {socialChannels.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all group ${soc.color}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs block truncate">{soc.name}</span>
                  <span className="text-[10px] opacity-70 font-normal truncate">({soc.handle})</span>
                </div>
                <span className="text-[11px] opacity-80 block truncate mt-0.5">
                  {isBn ? soc.descBn : soc.descEn}
                </span>
              </div>
              <ExternalLink size={14} className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all flex-shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>

      {/* Final Commitment & Benediction Card */}
      <div className="bg-gradient-to-br from-primary via-orange-600 to-amber-600 text-white rounded-3xl p-6 shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Sparkles size={22} className="text-amber-200" />
        </div>

        <h3 className="font-bold text-base md:text-lg">
          {isBn ? "আমাদের আন্তরিক অঙ্গীকার" : "Our Sacred Commitment"}
        </h3>

        <p className="text-xs text-white/90 leading-relaxed max-w-xs mx-auto">
          {isBn
            ? "যাঁরা শিখতে চান, জানতে চান, আধ্যাত্মিকতার সঙ্গে যুক্ত হতে চান এবং মানবিক ও সুন্দর জীবনের পথে এগিয়ে যেতে চান—আমরা তাঁদের সকলকে আমাদের এই পুণ্য যাত্রায় সাদর স্বাগত জানাই।"
            : "We welcome everyone who wishes to learn, explore, connect and walk together on a path of devotion, compassion and selfless service."}
        </p>

        <div className="pt-2 border-t border-white/20">
          <p className="text-sm font-extrabold tracking-wide text-amber-200">
            {isBn ? "জয় শ্রী রামকৃষ্ণ । জয় মা সারদা ।" : "Jai Sri Ramakrishna. Jai Ma Sarada."}
          </p>
        </div>
      </div>
    </div>
  );
}
