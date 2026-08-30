"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Play, 
  MessageSquare, 
  ExternalLink, 
  Radio, 
  Flame, 
  Clock, 
  History, 
  Search, 
  Eye, 
  Sparkles,
  Share2,
  Volume2,
  VolumeX
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import ShareButton from "@/components/common/ShareButton";

interface ChannelVideo {
  id: string;
  title: string;
  titleEn?: string;
  thumbnail: string;
  views: number;
  viewsFormattedBn: string;
  viewsFormattedEn: string;
  publishedAt: string; // ISO date for accurate sorting
  dateFormattedBn: string;
  dateFormattedEn: string;
  duration: string;
  speakerBn: string;
  speakerEn: string;
  isLive?: boolean;
}

// Complete real channel uploads from @KarunamoyeeMaSarada
const ALL_CHANNEL_VIDEOS: ChannelVideo[] = [
  {
    id: "KokXcI3zw2M",
    title: "শ্রীশ্রীরামকৃষ্ণ কথামৃতের প্রসঙ্গ | দ্বাবিংশতি পর্ব | প্রব্রাজিকা প্রদীপ্তপ্রাণা মাতাজী | SARAS",
    titleEn: "Sri Sri Ramakrishna Kathamrita Discourse | Episode 22 | Pravrajika Pradiptaprana Mataji",
    thumbnail: "https://img.youtube.com/vi/KokXcI3zw2M/hqdefault.jpg",
    views: 48200,
    viewsFormattedBn: "৪৮.২K ভিউ",
    viewsFormattedEn: "48.2K views",
    publishedAt: "2026-08-25T10:00:00Z",
    dateFormattedBn: "৪ দিন আগে",
    dateFormattedEn: "4 days ago",
    duration: "42:15",
    speakerBn: "প্রব্রাজিকা প্রদীপ্তপ্রাণা মাতাজী",
    speakerEn: "Pravrajika Pradiptaprana Mataji",
    isLive: true
  },
  {
    id: "fnGBJu6sypo",
    title: "নব সজল জল ধর কায়: কালী কীর্তন | সৃজন চট্টোপাধ্যায় | Kali Kirtan",
    titleEn: "Naba Sajala Jala Dhara Kaya: Kali Kirtan | Srijan Chattopadhyay",
    thumbnail: "https://img.youtube.com/vi/fnGBJu6sypo/hqdefault.jpg",
    views: 89400,
    viewsFormattedBn: "৮৯.৪K ভিউ",
    viewsFormattedEn: "89.4K views",
    publishedAt: "2026-08-20T14:30:00Z",
    dateFormattedBn: "৯ দিন আগে",
    dateFormattedEn: "9 days ago",
    duration: "11:20",
    speakerBn: "সৃজন চট্টোপাধ্যায়",
    speakerEn: "Srijan Chattopadhyay"
  },
  {
    id: "Ih54e4jTiWc",
    title: "চিন্তায় আমি ৩ দিন ঘুমোতে পারছি না: স্বামী সুপর্ণানন্দজী মহারাজ",
    titleEn: "I Couldn't Sleep for 3 Days from Worry: Swami Suparnanandaji Maharaj",
    thumbnail: "https://img.youtube.com/vi/Ih54e4jTiWc/hqdefault.jpg",
    views: 125000,
    viewsFormattedBn: "১.২৫ লাখ ভিউ",
    viewsFormattedEn: "125K views",
    publishedAt: "2026-08-15T09:00:00Z",
    dateFormattedBn: "২ সপ্তাহ আগে",
    dateFormattedEn: "2 weeks ago",
    duration: "28:40",
    speakerBn: "স্বামী সুপর্ণানন্দজী মহারাজ",
    speakerEn: "Swami Suparnanandaji Maharaj"
  },
  {
    id: "sRDmRckWJyM",
    title: "এই দুটি জিনিস করলেই আমাদের দেবত্ত্ব জেগে উঠবে: স্বামী বলভদ্রানন্দজী মহারাজ",
    titleEn: "Do These Two Things to Awaken Divinity Within: Swami Balabhadranandaji Maharaj",
    thumbnail: "https://img.youtube.com/vi/sRDmRckWJyM/hqdefault.jpg",
    views: 110000,
    viewsFormattedBn: "১.১০ লাখ ভিউ",
    viewsFormattedEn: "110K views",
    publishedAt: "2026-08-10T11:00:00Z",
    dateFormattedBn: "৩ সপ্তাহ আগে",
    dateFormattedEn: "3 weeks ago",
    duration: "35:10",
    speakerBn: "স্বামী বলভদ্রানন্দজী মহারাজ",
    speakerEn: "Swami Balabhadranandaji Maharaj"
  },
  {
    id: "tBA_N9RhEhE",
    title: "গুরু পূর্ণিমায় বেলুড় মঠে শুভেন্দু অধিকারী | প্রেসিডেন্ট মহারাজের আশীর্বাদে আবেগঘন মুহূর্ত",
    titleEn: "Guru Purnima at Belur Math | Blessing Moments with President Maharaj",
    thumbnail: "https://img.youtube.com/vi/tBA_N9RhEhE/hqdefault.jpg",
    views: 67300,
    viewsFormattedBn: "৬৭.৩K ভিউ",
    viewsFormattedEn: "67.3K views",
    publishedAt: "2026-07-21T08:00:00Z",
    dateFormattedBn: "১ মাস আগে",
    dateFormattedEn: "1 month ago",
    duration: "18:05",
    speakerBn: "বেলুড় মঠ অনুষ্ঠান",
    speakerEn: "Belur Math Special"
  },
  {
    id: "2ASuTlILtg8",
    title: "গুরুতত্ত্ব ও গুরুভক্তির তাৎপর্য | স্বামী প্রতিবোধানন্দজী মহারাজ",
    titleEn: "Significance of Guru and Devotion | Swami Pratibodhanandaji Maharaj",
    thumbnail: "https://img.youtube.com/vi/2ASuTlILtg8/hqdefault.jpg",
    views: 94500,
    viewsFormattedBn: "৯৪.৫K ভিউ",
    viewsFormattedEn: "94.5K views",
    publishedAt: "2026-07-15T15:00:00Z",
    dateFormattedBn: "১ মাস আগে",
    dateFormattedEn: "1 month ago",
    duration: "31:45",
    speakerBn: "স্বামী প্রতিবোধানন্দজী মহারাজ",
    speakerEn: "Swami Pratibodhanandaji Maharaj"
  },
  {
    id: "RYQDYZ_oGXo",
    title: "তোমায় নতুন করে পাবো বলে | Pravrajika Asheshaprana Mataji | Online SARAS",
    titleEn: "To Find You Anew | Speaker: Pravrajika Asheshaprana Mataji | SARAS",
    thumbnail: "https://img.youtube.com/vi/RYQDYZ_oGXo/hqdefault.jpg",
    views: 52000,
    viewsFormattedBn: "৫২K ভিউ",
    viewsFormattedEn: "52K views",
    publishedAt: "2026-07-02T12:00:00Z",
    dateFormattedBn: "২ মাস আগে",
    dateFormattedEn: "2 months ago",
    duration: "45:00",
    speakerBn: "প্রব্রাজিকা অশেষপ্রাণা মাতাজী",
    speakerEn: "Pravrajika Asheshaprana Mataji"
  },
  {
    id: "XtTczEXBO9Q",
    title: "দক্ষিণেশ্বরে রামকৃষ্ণ মঠ প্রতিষ্ঠা:২০২৬ | সম্পূর্ণ মুহূর্ত গুলি দেখুন",
    titleEn: "Foundation Ceremony of Ramakrishna Math Dakshineswar 2026",
    thumbnail: "https://img.youtube.com/vi/XtTczEXBO9Q/hqdefault.jpg",
    views: 142000,
    viewsFormattedBn: "১.৪২ লাখ ভিউ",
    viewsFormattedEn: "142K views",
    publishedAt: "2026-06-25T07:00:00Z",
    dateFormattedBn: "২ মাস আগে",
    dateFormattedEn: "2 months ago",
    duration: "24:12",
    speakerBn: "দক্ষিণেশ্বর রামকৃষ্ণ মঠ",
    speakerEn: "Dakshineswar Ramakrishna Math"
  },
  {
    id: "lNvzoS_m_cw",
    title: "স্বামীজীর পৈতৃক বাড়ি নিয়ে বড় ঘোষণা! কী বললেন মুখ্যমন্ত্রী? | অবশ্যই দেখুন",
    titleEn: "Major Announcement on Swamiji's Ancestral Home | Special Report",
    thumbnail: "https://img.youtube.com/vi/lNvzoS_m_cw/hqdefault.jpg",
    views: 78900,
    viewsFormattedBn: "৭৮.৯K ভিউ",
    viewsFormattedEn: "78.9K views",
    publishedAt: "2026-06-10T10:00:00Z",
    dateFormattedBn: "২ মাস আগে",
    dateFormattedEn: "2 months ago",
    duration: "14:50",
    speakerBn: "বিশেষ সংবাদ ও প্রতিবেদন",
    speakerEn: "Special Report"
  },
  {
    id: "-ER2s-ETA0Y",
    title: "হিন্দু সনাতন ধর্মের মূল রহস্য কী? | স্বামী সর্বপ্রিয়ানন্দ | Swami Sarvapriyananda",
    titleEn: "The Core Secret of Sanatana Dharma | Swami Sarvapriyananda",
    thumbnail: "https://img.youtube.com/vi/-ER2s-ETA0Y/hqdefault.jpg",
    views: 215000,
    viewsFormattedBn: "২.১৫ লাখ ভিউ",
    viewsFormattedEn: "215K views",
    publishedAt: "2026-05-18T16:00:00Z",
    dateFormattedBn: "৩ মাস আগে",
    dateFormattedEn: "3 months ago",
    duration: "52:18",
    speakerBn: "স্বামী সর্বপ্রিয়ানন্দজী মহারাজ",
    speakerEn: "Swami Sarvapriyananda"
  },
  {
    id: "pJe4jGTj1nA",
    title: "বারাসাত মঠে প্রেসিডেন্ট মহারাজের শুভাগমন | ভক্তদের সঙ্গে আশীর্বাদময় মুহূর্ত",
    titleEn: "Auspicious Visit of President Maharaj at Barasat Math | Devotional Moments",
    thumbnail: "https://img.youtube.com/vi/pJe4jGTj1nA/hqdefault.jpg",
    views: 43600,
    viewsFormattedBn: "৪৩.৬K ভিউ",
    viewsFormattedEn: "43.6K views",
    publishedAt: "2026-05-01T09:00:00Z",
    dateFormattedBn: "৪ মাস আগে",
    dateFormattedEn: "4 months ago",
    duration: "16:30",
    speakerBn: "বারাসাত রামকৃষ্ণ আশ্রম",
    speakerEn: "Barasat Ramakrishna Math"
  },
  {
    id: "wQAmwLeF8H0",
    title: "দৈনন্দিন জীবনে জপ, ধ্যান ও প্রার্থনার গুরুত্ব | Swami Krishnamritanandaji",
    titleEn: "Importance of Japa, Meditation & Prayer in Daily Life | Swami Krishnamritananda",
    thumbnail: "https://img.youtube.com/vi/wQAmwLeF8H0/hqdefault.jpg",
    views: 86400,
    viewsFormattedBn: "৮৬.৪K ভিউ",
    viewsFormattedEn: "86.4K views",
    publishedAt: "2026-04-12T11:00:00Z",
    dateFormattedBn: "৪ মাস আগে",
    dateFormattedEn: "4 months ago",
    duration: "38:22",
    speakerBn: "স্বামী কৃষ্ণা মৃতানন্দজী মহারাজ",
    speakerEn: "Swami Krishnamritananda"
  },
  {
    id: "FdWNZjP47yY",
    title: "রামকৃষ্ণ মঠ যোগদ্যানে প্রেসিডেন্ট মহারাজের শুভাগমন | ভক্তদের অভ্যর্থনা",
    titleEn: "President Maharaj Visit at Ramakrishna Math Yogodyan",
    thumbnail: "https://img.youtube.com/vi/FdWNZjP47yY/hqdefault.jpg",
    views: 39800,
    viewsFormattedBn: "৩৯.৮K ভিউ",
    viewsFormattedEn: "39.8K views",
    publishedAt: "2026-03-20T08:00:00Z",
    dateFormattedBn: "৫ মাস আগে",
    dateFormattedEn: "5 months ago",
    duration: "19:40",
    speakerBn: "যোগদ্যান রামকৃষ্ণ মঠ",
    speakerEn: "Yogodyan Ramakrishna Math"
  },
  {
    id: "NBUwh1WIBOQ",
    title: "শ্রীশ্রী মায়ের পদার্পণ উৎসব | বাগবাজার মায়ের বাড়ির অপূর্ব সাজসজ্জা",
    titleEn: "Holy Mother Padarpan Utsav | Bagbazar Mayer Bari Celebrations",
    thumbnail: "https://img.youtube.com/vi/NBUwh1WIBOQ/hqdefault.jpg",
    views: 91200,
    viewsFormattedBn: "৯১.২K ভিউ",
    viewsFormattedEn: "91.2K views",
    publishedAt: "2026-02-14T10:00:00Z",
    dateFormattedBn: "৬ মাস আগে",
    dateFormattedEn: "6 months ago",
    duration: "21:15",
    speakerBn: "বাগবাজার মায়ের বাড়ি",
    speakerEn: "Bagbazar Mayer Bari"
  },
  {
    id: "QJHcZcayc4I",
    title: "শ্রীশ্রীরামকৃষ্ণ কথামৃতের প্রসঙ্গ | Rev. Pravrajika Pradiptaprana Mataji",
    titleEn: "Sri Sri Ramakrishna Kathamrita Discourse | Pravrajika Pradiptaprana Mataji",
    thumbnail: "https://img.youtube.com/vi/QJHcZcayc4I/hqdefault.jpg",
    views: 57400,
    viewsFormattedBn: "৫৭.৪K ভিউ",
    viewsFormattedEn: "57.4K views",
    publishedAt: "2026-01-10T14:00:00Z",
    dateFormattedBn: "৭ মাস আগে",
    dateFormattedEn: "7 months ago",
    duration: "40:55",
    speakerBn: "প্রব্রাজিকা প্রদীপ্তপ্রাণা মাতাজী",
    speakerEn: "Pravrajika Pradiptaprana Mataji"
  },
  {
    id: "i6223qMu7Sw",
    title: "ভক্ত হওয়ার সাধনা | Speaker: Pravrajika Atmadeepaprana Mataji",
    titleEn: "The Sadhana of Becoming a True Devotee | Pravrajika Atmadeepaprana",
    thumbnail: "https://img.youtube.com/vi/i6223qMu7Sw/hqdefault.jpg",
    views: 73800,
    viewsFormattedBn: "৭৩.৮K ভিউ",
    viewsFormattedEn: "73.8K views",
    publishedAt: "2025-11-28T09:00:00Z",
    dateFormattedBn: "৯ মাস আগে",
    dateFormattedEn: "9 months ago",
    duration: "33:10",
    speakerBn: "প্রব্রাজিকা আত্মদীপপ্রাণা মাতাজী",
    speakerEn: "Pravrajika Atmadeepaprana"
  },
  {
    id: "PwZDtw1lpjU",
    title: "ভাবে হাসে কাঁদে নাচে গায় | Speaker: Swami Krishnasakhanandaji Maharaj",
    titleEn: "Ecstatic Divine Love: Bhave Hase Kande Nache Gaye | Swami Krishnasakhananda",
    thumbnail: "https://img.youtube.com/vi/PwZDtw1lpjU/hqdefault.jpg",
    views: 62100,
    viewsFormattedBn: "৬২.১K ভিউ",
    viewsFormattedEn: "62.1K views",
    publishedAt: "2025-10-15T15:00:00Z",
    dateFormattedBn: "১০ মাস আগে",
    dateFormattedEn: "10 months ago",
    duration: "37:48",
    speakerBn: "স্বামী কৃষ্ণসখানন্দজী মহারাজ",
    speakerEn: "Swami Krishnasakhanandaji"
  }
];

type SortFilter = "latest" | "most_watched" | "oldest";

export default function VideosPage() {
  const { t, language } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<ChannelVideo>(ALL_CHANNEL_VIDEOS[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'live'>('all');
  const [sortFilter, setSortFilter] = useState<SortFilter>("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync mute state if user presses YouTube's native volume button
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data.event === "infoDelivery" && data.info) {
            if (typeof data.info.muted === "boolean") {
              setIsMuted(data.info.muted);
            }
          }
        } catch {
          // Ignore non-JSON postMessage events
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Filter and Sort Videos
  const filteredAndSortedVideos = useMemo(() => {
    let list = activeTab === 'live' 
      ? ALL_CHANNEL_VIDEOS.filter(v => v.isLive)
      : ALL_CHANNEL_VIDEOS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => 
        v.title.toLowerCase().includes(q) ||
        (v.titleEn && v.titleEn.toLowerCase().includes(q)) ||
        v.speakerBn.toLowerCase().includes(q) ||
        v.speakerEn.toLowerCase().includes(q)
      );
    }

    if (activeTab === 'all') {
      const sorted = [...list];
      if (sortFilter === "latest") {
        sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      } else if (sortFilter === "most_watched") {
        sorted.sort((a, b) => b.views - a.views);
      } else if (sortFilter === "oldest") {
        sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
      }
      return sorted;
    }

    return list;
  }, [activeTab, sortFilter, searchQuery]);

  const handleSelectVideo = (video: ChannelVideo) => {
    setSelectedVideo(video);
    setIsMuted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMute = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    if (isMuted) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "unMute" }),
        "*"
      );
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
        "*"
      );
      setIsMuted(false);
    } else {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "mute" }),
        "*"
      );
      setIsMuted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background pb-28">
      {/* Top Header */}
      <header className="px-4 py-3.5 flex items-center justify-between bg-white sticky top-0 z-30 border-b border-secondary/10 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-primary hover:bg-secondary/20 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-foreground">{t('videos.title')}</h1>
            <p className="text-xs text-foreground/60">{t('videos.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ShareButton
            title={`করুণাময়ী মা সারদা — ${selectedVideo.title}`}
            text={`করুণাময়ী মা সারদা অফিসিয়াল চ্যানেলের ভিডিও:\n${selectedVideo.title}\nhttps://www.youtube.com/watch?v=${selectedVideo.id}`}
            url="/videos"
            variant="icon"
          />
          {/* YouTube Community Tab Link */}
          <a 
            href="https://www.youtube.com/@KarunamoyeeMaSarada/community" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 px-2.5 py-1.5 rounded-full text-xs font-bold hover:bg-red-100 transition-colors shadow-sm"
          >
            <MessageSquare size={13} />
            <span>{t('videos.community')}</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </header>

      {/* Featured / Active Video Player */}
      <div className="bg-black relative aspect-video w-full shadow-md z-20 group">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&mute=1&enablejsapi=1&playsinline=1&controls=1&rel=0`}
          title={selectedVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />

        {/* Floating Mute/Unmute Quick Toggle */}
        <button
          onClick={toggleMute}
          className={`absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all backdrop-blur-md ${
            isMuted
              ? "bg-amber-500 text-white animate-pulse ring-2 ring-white/60 hover:bg-amber-600"
              : "bg-black/60 text-white hover:bg-black/80 border border-white/20"
          }`}
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <>
              <VolumeX size={14} />
              <span>{language === "bn" ? "🔊 অডিও শুনুন (Unmute)" : "🔊 Tap to Unmute"}</span>
            </>
          ) : (
            <>
              <Volume2 size={14} />
              <span>{language === "bn" ? "মিউট করুন" : "Mute"}</span>
            </>
          )}
        </button>
      </div>

      {/* Video Details Info Card */}
      <div className="p-4 bg-white border-b border-secondary/10 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          {selectedVideo.isLive && (
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              {t('videos.live')}
            </span>
          )}
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {language === "bn" ? selectedVideo.speakerBn : selectedVideo.speakerEn}
          </span>
          <span className="text-xs text-foreground/50 ml-auto flex items-center gap-1">
            <Eye size={13} />
            {language === "bn" ? selectedVideo.viewsFormattedBn : selectedVideo.viewsFormattedEn}
          </span>
        </div>

        <h2 className="text-sm md:text-base font-bold text-foreground leading-snug line-clamp-2">
          {selectedVideo.title}
        </h2>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-secondary/10">
          <span className="text-xs text-foreground/50 flex items-center gap-1">
            <Clock size={13} />
            {language === "bn" ? selectedVideo.dateFormattedBn : selectedVideo.dateFormattedEn}
          </span>

          <a 
            href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline"
          >
            <span>{language === "bn" ? "ইউটিউবে খুলুন" : "Watch on YouTube"}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Main Tabs Navigation (All Videos vs LIVE Stream vs Community) */}
      <div className="p-4 pt-4 pb-2">
        <div className="flex bg-secondary/10 p-1 rounded-2xl mb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-white text-primary shadow-sm'
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            <span>{t('videos.all')}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'all' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-foreground/60'}`}>
              {ALL_CHANNEL_VIDEOS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'live'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            <Radio size={14} className={activeTab === 'live' ? 'text-red-600 animate-pulse' : ''} />
            <span>{t('videos.live')}</span>
          </button>
        </div>

        {/* Search & Sort Controls (Displayed when "All Videos" is active) */}
        {activeTab === 'all' && (
          <div className="space-y-2.5 mb-3">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "bn" ? "প্রবচন বা বক্তা সন্ধান করুন..." : "Search videos by speaker or topic..."}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-secondary/20 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-foreground/40 shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 text-foreground/40" size={15} />
            </div>

            {/* Three Sorting Filter Chips: Latest Videos, Most Watched, Oldest Videos */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {/* Latest Videos */}
              <button
                onClick={() => setSortFilter("latest")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all shadow-sm ${
                  sortFilter === "latest"
                    ? "bg-primary text-white scale-105"
                    : "bg-white text-foreground/70 hover:bg-secondary/10 border border-secondary/20"
                }`}
              >
                <Clock size={13} />
                <span>{language === "bn" ? "সর্বশেষ ভিডিও (Latest)" : "Latest Videos"}</span>
              </button>

              {/* Most Watched */}
              <button
                onClick={() => setSortFilter("most_watched")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all shadow-sm ${
                  sortFilter === "most_watched"
                    ? "bg-amber-500 text-white scale-105 shadow-amber-200"
                    : "bg-white text-foreground/70 hover:bg-secondary/10 border border-secondary/20"
                }`}
              >
                <Flame size={13} className={sortFilter === "most_watched" ? "text-white" : "text-amber-500"} />
                <span>{language === "bn" ? "সর্বাধিক দর্শনীয় (Most Watched)" : "Most Watched"}</span>
              </button>

              {/* Oldest Videos */}
              <button
                onClick={() => setSortFilter("oldest")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all shadow-sm ${
                  sortFilter === "oldest"
                    ? "bg-primary text-white scale-105"
                    : "bg-white text-foreground/70 hover:bg-secondary/10 border border-secondary/20"
                }`}
              >
                <History size={13} />
                <span>{language === "bn" ? "পুরাতন ভিডিও (Oldest)" : "Oldest Videos"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video List */}
      <div className="px-4 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-foreground/50 font-bold uppercase tracking-wider px-1">
          <span>
            {language === "bn" 
              ? `${filteredAndSortedVideos.length}টি ভিডিও পাওয়া গেছে`
              : `${filteredAndSortedVideos.length} Videos Available`}
          </span>
          <span className="text-[11px] text-primary capitalize">
            {sortFilter === "latest" ? (language === "bn" ? "সর্বশেষ অনুক্রমে" : "Sorted: Latest") :
             sortFilter === "most_watched" ? (language === "bn" ? "জনপ্রিয়তা অনুক্রমে" : "Sorted: Most Views") :
             (language === "bn" ? "পুরাতন অনুক্রমে" : "Sorted: Oldest")}
          </span>
        </div>

        {filteredAndSortedVideos.map((video) => {
          const isSelected = selectedVideo.id === video.id;
          return (
            <div
              key={video.id}
              onClick={() => handleSelectVideo(video)}
              className={`bg-white rounded-2xl p-2.5 flex gap-3 border transition-all cursor-pointer shadow-sm hover:shadow-md group ${
                isSelected 
                  ? "border-primary bg-primary/5 ring-1 ring-primary" 
                  : "border-secondary/20 hover:border-primary/40"
              }`}
            >
              {/* Thumbnail with duration */}
              <div className="w-32 h-20 bg-zinc-900 rounded-xl overflow-hidden relative flex-shrink-0 shadow-inner">
                <Image
                  src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to i.ytimg.com mqdefault
                    const target = e.target as HTMLImageElement;
                    if (target && !target.src.includes('mqdefault')) {
                      target.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
                    }
                  }}
                />
                
                {video.isLive ? (
                  <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                    LIVE
                  </span>
                ) : (
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-semibold px-1.5 py-0.2 rounded">
                    {video.duration}
                  </span>
                )}

                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                    <Play size={14} className="fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                <div>
                  <h3 className={`text-xs font-bold line-clamp-2 leading-snug ${
                    isSelected ? "text-primary" : "text-foreground group-hover:text-primary transition-colors"
                  }`}>
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-foreground/50 truncate mt-0.5 font-medium">
                    {language === "bn" ? video.speakerBn : video.speakerEn}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-foreground/45 mt-1 pt-1 border-t border-secondary/10">
                  <span className="flex items-center gap-1 font-semibold text-foreground/60">
                    <Eye size={11} className="text-primary/70" />
                    {language === "bn" ? video.viewsFormattedBn : video.viewsFormattedEn}
                  </span>
                  <span>{language === "bn" ? video.dateFormattedBn : video.dateFormattedEn}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredAndSortedVideos.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-secondary/20 p-6 shadow-sm">
            <Radio size={32} className="mx-auto text-foreground/30 mb-2" />
            <p className="text-xs font-bold text-foreground/60">
              {language === "bn" ? "কোনো ভিডিও পাওয়া যায়নি।" : "No videos match your search."}
            </p>
          </div>
        )}
      </div>

      {/* Community Banner Footer */}
      <div className="p-4 mt-6">
        <a
          href="https://www.youtube.com/@KarunamoyeeMaSarada/community"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare size={20} />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm">
                {language === "bn" ? "ইউটিউব কমিউনিটি পোস্টে যোগ দিন" : "Join YouTube Community Posts"}
              </h4>
              <p className="text-[11px] text-white/80">
                {language === "bn" ? "দৈনিক ভক্তিবার্তা ও আশ্রমের আপডেট পান" : "Get daily updates & spiritual messages"}
              </p>
            </div>
          </div>
          <ExternalLink size={16} className="text-white/80 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
        </a>
      </div>
    </div>
  );
}
