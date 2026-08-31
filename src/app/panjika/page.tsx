"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Sunrise, 
  Sunset, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Moon, 
  Sun,
  Flame
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import BottomNavigation from "@/components/layout/BottomNavigation";
import ShareButton from "@/components/common/ShareButton";
import { 
  getBengaliDate, 
  getMonthDays, 
  toBengaliNumber, 
  BengaliDateInfo, 
  BENGALI_MONTHS 
} from "@/lib/bengaliCalendar";

const WEEKDAYS = [
  { bn: "রবি", en: "Sun" },
  { bn: "সোম", en: "Mon" },
  { bn: "মঙ্গল", en: "Tue" },
  { bn: "বুধ", en: "Wed" },
  { bn: "বৃহঃ", en: "Thu" },
  { bn: "শুক্র", en: "Fri" },
  { bn: "শনি", en: "Sat" }
];

export default function PanjikaPage() {
  const { t, language } = useTranslation();
  const today = new Date();
  
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const todayBengali = getBengaliDate(today);
  const selectedBengali = getBengaliDate(selectedDate);
  const monthDays = getMonthDays(currentYear, currentMonthIndex);

  // First day offset for calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const monthNameEn = new Date(currentYear, currentMonthIndex).toLocaleString("en-US", { month: "long", year: "numeric" });
  const monthNameBn = new Date(currentYear, currentMonthIndex).toLocaleString("bn-BD", { month: "long" }) + " " + toBengaliNumber(currentYear);

  // Month festivals list
  const monthFestivals = monthDays.filter(d => d.festivals.length > 0);

  return (
    <div className="flex flex-col min-h-screen max-w-md md:max-w-3xl w-full mx-auto bg-background p-4 pt-6 pb-24 md:pb-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-5">
        <Link href="/" className="flex items-center text-foreground/60 hover:text-primary transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>{language === "bn" ? "হোম" : "Home"}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ShareButton 
            title={`আজকের পঞ্জিকা — ${toBengaliNumber(todayBengali.bengaliDay)} ${todayBengali.bengaliMonthName}, ${todayBengali.tithi}`}
            text={`করুণাময়ী মা সারদা বাংলা পঞ্জিকা ও দৈনিক তিথি:\n${toBengaliNumber(todayBengali.bengaliDay)} ${todayBengali.bengaliMonthName} ${toBengaliNumber(todayBengali.bengaliYear)} বঙ্গাব্দ\nতিথি: ${todayBengali.tithi}\nসূর্যোদয়: ${todayBengali.sunrise} | সূর্যাস্ত: ${todayBengali.sunset}`}
            url="/panjika"
            variant="icon"
          />
          <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {toBengaliNumber(todayBengali.bengaliYear)} {language === "bn" ? "বঙ্গাব্দ" : "BS"}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <span>{t('panjika.title')}</span>
        </h1>
        <p className="text-xs text-foreground/60 mt-0.5">
          {t('panjika.subtitle')}
        </p>
      </div>

      {/* Today's Panjika Hero Card */}
      <div className="bg-gradient-to-br from-primary/15 via-orange-500/10 to-amber-400/15 border border-primary/25 rounded-2xl p-5 mb-6 shadow-md relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-primary/20">
              {language === "bn" ? "আজকের পঞ্জিকা" : "Today's Panjika"}
            </span>
            <span className="text-xs font-medium text-foreground/70">
              {today.toLocaleDateString(language === "bn" ? "bn-BD" : "en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>

          <div className="my-2">
            <h2 className="text-2xl font-extrabold text-foreground">
              {toBengaliNumber(todayBengali.bengaliDay)} {todayBengali.bengaliMonthName}, {toBengaliNumber(todayBengali.bengaliYear)}
            </h2>
            <p className="text-sm font-bold text-primary mt-0.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>{todayBengali.tithi}</span>
            </p>
          </div>

          {/* Sunrise / Sunset */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-primary/20 text-xs">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-white/60">
              <Sunrise size={18} className="text-orange-500" />
              <div>
                <p className="text-[10px] text-foreground/50">{language === "bn" ? "সূর্যোদয়" : "Sunrise"}</p>
                <p className="font-bold text-foreground">{todayBengali.sunrise}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-white/60">
              <Sunset size={18} className="text-rose-500" />
              <div>
                <p className="text-[10px] text-foreground/50">{language === "bn" ? "সূর্যাস্ত" : "Sunset"}</p>
                <p className="font-bold text-foreground">{todayBengali.sunset}</p>
              </div>
            </div>
          </div>

          {/* Today's Festivals */}
          {todayBengali.festivals.length > 0 && (
            <div className="mt-3 bg-primary/10 border border-primary/20 p-2.5 rounded-xl text-xs flex items-start gap-2">
              <Flame size={15} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-foreground">{language === "bn" ? "আজকের বিশেষ দিবস:" : "Today's Observance:"} </span>
                <span className="text-primary font-semibold">{todayBengali.festivals.join(", ")}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Month Navigator Header */}
      <div className="bg-white rounded-2xl border border-secondary/20 shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handlePrevMonth}
            className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-foreground/80 hover:bg-secondary/20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="text-center">
            <h3 className="font-bold text-base text-foreground">
              {language === "bn" ? monthNameBn : monthNameEn}
            </h3>
            <p className="text-xs text-primary font-medium">
              {BENGALI_MONTHS[getBengaliDate(new Date(currentYear, currentMonthIndex, 15)).bengaliMonthIndex].name} - {toBengaliNumber(getBengaliDate(new Date(currentYear, currentMonthIndex, 15)).bengaliYear)} বঙ্গাব্দ
            </p>
          </div>

          <button 
            onClick={handleNextMonth}
            className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-foreground/80 hover:bg-secondary/20 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 7-Day Weekday Row */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {WEEKDAYS.map((day, idx) => (
            <div key={idx} className={`text-[11px] font-bold py-1 ${idx === 0 ? 'text-rose-500' : 'text-foreground/60'}`}>
              {language === "bn" ? day.bn : day.en}
            </div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}

          {/* Days */}
          {monthDays.map((dayInfo, idx) => {
            const dateObj = dayInfo.gregorianDate;
            const isCurrentToday = dateObj.toDateString() === today.toDateString();
            const isSelected = dateObj.toDateString() === selectedDate.toDateString();

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(dateObj)}
                className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-between relative transition-all text-left ${
                  isSelected 
                    ? "bg-primary text-white shadow-md ring-2 ring-primary/40 font-bold" 
                    : isCurrentToday 
                      ? "bg-amber-100/70 border border-amber-400 text-foreground font-bold" 
                      : "bg-secondary/5 hover:bg-secondary/15 text-foreground"
                }`}
              >
                {/* Gregorian Date */}
                <span className={`text-[11px] leading-tight ${isSelected ? 'text-white' : isCurrentToday ? 'text-primary font-extrabold' : 'text-foreground/90'}`}>
                  {dateObj.getDate()}
                </span>

                {/* Bengali Date in Subscript */}
                <span className={`text-[9px] font-medium leading-none ${isSelected ? 'text-white/80' : 'text-primary'}`}>
                  {toBengaliNumber(dayInfo.bengaliDay)}
                </span>

                {/* Status indicator dot */}
                <div className="flex gap-0.5 mt-0.5">
                  {dayInfo.isPurnima && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                  {dayInfo.isAmavasya && <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>}
                  {dayInfo.isEkadashi && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                  {dayInfo.festivals.length > 0 && !dayInfo.isPurnima && !dayInfo.isAmavasya && !dayInfo.isEkadashi && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-secondary/15 text-[10px] text-foreground/60 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> পূর্ণিমা</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neutral-800"></span> অমাবস্যা</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> একাদশী</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> উৎসব/বিশেষ দিন</span>
        </div>
      </div>

      {/* Selected Date Details */}
      <div className="bg-white rounded-2xl border border-secondary/20 shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between border-b border-secondary/15 pb-3 mb-3">
          <div>
            <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">
              {language === "bn" ? "নির্বাচিত তারিখের বিবরণ" : "Selected Date Details"}
            </p>
            <h4 className="text-base font-bold text-foreground">
              {toBengaliNumber(selectedBengali.bengaliDay)} {selectedBengali.bengaliMonthName} {toBengaliNumber(selectedBengali.bengaliYear)} বঙ্গাব্দ
            </h4>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-primary">
              {selectedDate.toLocaleDateString(language === "bn" ? "bn-BD" : "en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-secondary/10">
            <span className="text-foreground/60">{language === "bn" ? "তিথি ও পক্ষ:" : "Tithi & Paksha:"}</span>
            <span className="font-bold text-primary">{selectedBengali.tithi}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-secondary/10">
            <span className="text-foreground/60">{language === "bn" ? "সূর্যোদয় ও সূর্যাস্ত:" : "Sunrise & Sunset:"}</span>
            <span className="font-medium text-foreground">{selectedBengali.sunrise} — {selectedBengali.sunset}</span>
          </div>
          {selectedBengali.festivals.length > 0 ? (
            <div className="py-1">
              <span className="text-foreground/60 block mb-1">{language === "bn" ? "উৎসব ও তাৎপর্য:" : "Festivals:"}</span>
              <div className="space-y-1">
                {selectedBengali.festivals.map((fest, i) => (
                  <p key={i} className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    🌸 {fest}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-foreground/40 italic py-1">{language === "bn" ? "এই দিনে বিশেষ কোনো উৎসব নেই।" : "No special festival on this date."}</p>
          )}
        </div>
      </div>

      {/* Monthly Festivals List */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-1.5">
          <Flame size={16} className="text-primary" />
          <span>{language === "bn" ? `${monthNameBn}-এর বিশেষ ব্রত ও উৎসব` : `Special Festivals in ${monthNameEn}`}</span>
        </h3>

        <div className="space-y-2.5">
          {monthFestivals.length === 0 ? (
            <p className="text-foreground/50 text-center py-6 bg-white rounded-2xl border border-secondary/20 text-xs">
              {language === "bn" ? "এই মাসে কোনো বিশেষ অনুষ্ঠান নেই।" : "No special events recorded for this month."}
            </p>
          ) : (
            monthFestivals.map((item, idx) => (
              <div key={idx} className="bg-white border border-secondary/20 rounded-xl p-3 flex items-start gap-3 shadow-sm hover:border-primary/40 transition-colors">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-1.5 text-center min-w-[55px] flex flex-col justify-center">
                  <span className="text-[10px] text-primary font-bold">{item.gregorianDate.toLocaleString("bn-BD", { month: "short" })}</span>
                  <span className="text-base font-extrabold text-foreground">{toBengaliNumber(item.gregorianDate.getDate())}</span>
                  <span className="text-[9px] text-foreground/50">{toBengaliNumber(item.bengaliDay)} {item.bengaliMonthName}</span>
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-primary mb-0.5">
                    <span>{item.tithi}</span>
                  </div>
                  {item.festivals.map((fest, i) => (
                    <p key={i} className="text-xs font-bold text-foreground leading-snug">{fest}</p>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
