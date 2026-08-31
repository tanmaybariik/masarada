"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import ShareButton from "@/components/common/ShareButton";

export default function EventsPage() {
  const { t, language } = useTranslation();
  
  const events = [
    {
      id: "1",
      title: language === "bn" ? "শ্রীরামকৃষ্ণ জন্মতিথি উৎসব" : "Sri Ramakrishna Janmatithi Utsav",
      date: language === "bn" ? "১৫ মার্চ ২০২৬" : "March 15, 2026",
      time: language === "bn" ? "সকাল ৮:০০ - বিকাল ৫:০০" : "8:00 AM - 5:00 PM",
      location: language === "bn" ? "মূল মন্দির প্রাঙ্গণ" : "Main Temple Premises",
      description: language === "bn" ? "সারাদিনব্যাপী পূজা, হোম, ভজন ও প্রসাদ বিতরণ।" : "Day-long puja, homa, bhajans and prasad distribution.",
      price: 150,
      availableTickets: 150,
      image: "/event-festival.jpg"
    },
    {
      id: "2",
      title: language === "bn" ? "বিশেষ শিবরাত্রি পূজা" : "Special Maha Shivaratri Puja",
      date: language === "bn" ? "২৬ ফেব্রুয়ারি ২০২৬" : "February 26, 2026",
      time: language === "bn" ? "সন্ধ্যা ৬:০০ - ভোর ৬:০০" : "6:00 PM - 6:00 AM",
      location: language === "bn" ? "শিব মন্দির" : "Shiva Temple",
      description: language === "bn" ? "চার প্রহরব্যাপী বিশেষ শিবরাত্রি পূজা।" : "Four prahar special Shivaratri puja.",
      price: 200,
      availableTickets: 0,
      image: "/event-shivratri.jpg"
    },
    {
      id: "3",
      title: language === "bn" ? "শ্রীমা সারদা দেবীর বিশেষ আরতি ও ভক্তি সম্মেলন" : "Holy Mother Special Arati & Bhakta Sammelan",
      date: language === "bn" ? "২ এপ্রিল ২০২৬" : "April 2, 2026",
      time: language === "bn" ? "বিকাল ৪:০০ - রাত ৮:০০" : "4:00 PM - 8:00 PM",
      location: language === "bn" ? "নাটমন্দির ও অডিটোরিয়াম" : "Natmandir & Auditorium",
      description: language === "bn" ? "মাতৃসাধকদের বিশেষ আধ্যাত্মিক সম্মেলন ও ভক্তিগীতি।" : "Spiritual discourse, devotional songs and prasad offering.",
      price: 100,
      availableTickets: 85,
      image: "/event-arati.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-8 pb-20">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs md:text-sm">
          <ArrowLeft size={18} className="mr-2" />
          {t('nav.home')}
        </Link>
        <ShareButton
          title={t('events.title')}
          text={language === "bn" ? "করুণাময়ী মা সারদা — আসন্ন ভক্তিমূলক অনুষ্ঠান ও পূজা উৎসবে অংশ নিন:" : "Karunamoyee Ma Sarada — Attend upcoming devotional events and pujas:"}
          url="/events"
          variant="pill"
          label={t('general.share')}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">{t('events.title')}</h1>
        <p className="text-foreground/60 text-xs mt-1">{t('events.subtitle')}</p>
      </div>

      <div className="space-y-6">
        {events.length === 0 ? (
          <p className="text-center text-foreground/60 py-10">{t('events.noEvents')}</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-secondary/20 hover:border-primary/40 transition-colors">
              <div className="h-36 bg-secondary/30 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                
                {/* Price Badge */}
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 border border-white/20">
                  <span className="text-amber-400">₹</span>
                  <span>{event.price} / {language === "bn" ? "জন" : "person"}</span>
                </div>

                {/* Share Button on Event Card */}
                <div className="absolute bottom-2 right-2">
                  <ShareButton
                    title={event.title}
                    text={`করুণাময়ী মা সারদা ইভেন্ট — ${event.title}\nতারিখ: ${event.date}\nস্থান: ${event.location}`}
                    url={`/events/${event.id}/book?price=${event.price}&title=${encodeURIComponent(event.title)}`}
                    variant="icon"
                  />
                </div>

                {event.availableTickets === 0 && (
                  <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    {t('events.fullyBooked')}
                  </div>
                )}
                {event.availableTickets > 0 && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    {event.availableTickets} {language === "bn" ? "আসন বাকি" : "seats left"}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-foreground mb-2 leading-snug">{event.title}</h2>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center text-xs text-foreground/70">
                    <Calendar size={15} className="mr-2 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-xs text-foreground/70">
                    <Clock size={15} className="mr-2 text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-xs text-foreground/70">
                    <MapPin size={15} className="mr-2 text-primary" />
                    {event.location}
                  </div>
                </div>
                <p className="text-xs text-foreground/70 mb-4 line-clamp-2">{event.description}</p>
                
                <Link
                  href={`/events/${event.id}/book?price=${event.price}&title=${encodeURIComponent(event.title)}`}
                  className={`w-full py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-sm ${
                    event.availableTickets > 0 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-secondary/30 text-foreground/50 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  {event.availableTickets > 0 ? (
                    <>
                      <span>{t('events.book')} (₹{event.price})</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    t('events.bookingClosed')
                  )}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
