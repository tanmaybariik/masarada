"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight, Sparkles, Clock8 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import ShareButton from "@/components/common/ShareButton";

export default function EventsPage() {
  const { t, language } = useTranslation();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        const data = await res.json();
        if (data.success) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-white border border-primary/20 w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
                <Calendar size={36} className="text-primary animate-pulse" />
                <Sparkles size={16} className="text-amber-500 absolute top-4 right-4 animate-bounce" />
              </div>
            </div>
            <h3 className="text-xl font-black text-foreground mb-2 tracking-tight">
              {language === "bn" ? "শিগগিরই আসছে!" : "Coming Soon!"}
            </h3>
            <p className="text-sm text-foreground/60 max-w-[250px] leading-relaxed">
              {language === "bn" 
                ? "বর্তমানে কোনো আসন্ন অনুষ্ঠান নেই। নতুন উৎসব ও অনুষ্ঠানের আপডেটের জন্য আবার দেখুন।" 
                : "There are no upcoming events at the moment. Check back later for new festivals and gatherings."}
            </p>
          </div>
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
