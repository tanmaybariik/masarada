// Comprehensive Bengali Calendar & Panjika Service

export interface BengaliDateInfo {
  gregorianDate: Date;
  bengaliDay: number;
  bengaliMonthName: string;
  bengaliMonthIndex: number;
  bengaliYear: number;
  tithi: string;
  paksha: 'শুক্লপক্ষ' | 'কৃষ্ণপক্ষ';
  sunrise: string;
  sunset: string;
  festivals: string[];
  isAmavasya?: boolean;
  isPurnima?: boolean;
  isEkadashi?: boolean;
}

export const BENGALI_MONTHS = [
  { name: "বৈশাখ", enName: "Baishakh", days: 31, season: "গ্রীষ্ম" },
  { name: "জ্যৈষ্ঠ", enName: "Jyaishtha", days: 31, season: "গ্রীষ্ম" },
  { name: "আষাঢ়", enName: "Ashadh", days: 31, season: "বর্ষা" },
  { name: "শ্রাবণ", enName: "Shraban", days: 31, season: "বর্ষা" },
  { name: "ভাদ্র", enName: "Bhadra", days: 31, season: "শরৎ" },
  { name: "আশ্বিন", enName: "Ashwin", days: 30, season: "শরৎ" },
  { name: "কার্তিক", enName: "Kartik", days: 30, season: "হেমন্ত" },
  { name: "অগ্রহায়ণ", enName: "Agrahayan", days: 30, season: "হেমন্ত" },
  { name: "পৌষ", enName: "Poush", days: 30, season: "শীত" },
  { name: "মাঘ", enName: "Magh", days: 30, season: "শীত" },
  { name: "ফাল্গুন", enName: "Falgun", days: 30, season: "বসন্ত" },
  { name: "চৈত্র", enName: "Chaitra", days: 30, season: "বসন্ত" },
];

export const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (w) => BENGALI_DIGITS[+w]);
}

const TITHIS = [
  "প্রতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুর্থী", "পঞ্চমী", 
  "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নবমী", "দশমী", 
  "একাদশী", "দ্বাদশী", "ত্রয়োদশী", "চতুর্দশী", "পূর্ণিমা",
  "প্রতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুর্থী", "পঞ্চমী", 
  "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নবমী", "দশমী", 
  "একাদশী", "দ্বাদশী", "ত্রয়োদশী", "চতুর্দশী", "অমাবস্যা"
];

// Special festival database by month and day (Baishakh = 0, Chaitra = 11)
const BENGALI_FESTIVALS: Record<string, string[]> = {
  "0-1": ["পহেলা বৈশাখ (শুভ নববর্ষ)", "শ্রীরামকৃষ্ণ কথামৃত উৎসব"],
  "0-15": ["বুদ্ধ পূর্ণিমা"],
  "1-11": ["শ্রীশ্রীমা সারদা দেবীর বিশেষ পূজা"],
  "2-1": ["রথযাত্রা উৎসব"],
  "2-9": ["পুনর্যাত্রা (উল্টো রথ)"],
  "2-15": ["গুরু পূর্ণিমা"],
  "3-15": ["ঝুলনযাত্রা সমাপ্তি", "রাখীবন্ধন উৎসব"],
  "4-8": ["শ্রীশ্রী জন্মাষ্টমী ব্রত"],
  "4-13": ["করুণাময়ী মা সারদা ভক্তি সম্মেলন"],
  "5-1": ["মহালয়া (পিতৃতর্পণ)"],
  "5-6": ["মহাষষ্ঠী (শ্রীশ্রী দুর্গাপূজা)"],
  "5-7": ["মহাসপ্তমী পূজা"],
  "5-8": ["মহাঅষ্টমী ও সন্ধিপূজা"],
  "5-9": ["মহানবমী পূজা ও কুমারী পূজা"],
  "5-10": ["বিজয়া দশমী"],
  "5-15": ["শ্রীশ্রী লক্ষ্মীপূজা (কোজাগরী পূর্ণিমা)"],
  "6-14": ["শ্রীশ্রী শ্যামাপূজা (কালীপূজা) ও দীপাবলি"],
  "6-16": ["ভ্রাতৃদ্বিতীয়া (ভাইফোঁটা)"],
  "6-24": ["জগদ্ধাত্রী পূজা"],
  "7-15": ["রাসযাত্রা পূর্ণিমা"],
  "8-1": ["কল্পতরু উৎসব (কাশীপুর উদ্যানবাটী)"],
  "8-8": ["শ্রীশ্রীমা সারদা দেবীর পবিত্র আবির্ভাব তিথি"],
  "8-15": ["পৌষ সংক্রান্তি ও গঙ্গাসাগর স্নান"],
  "9-5": ["শ্রীশ্রী সরস্বতী পূজা (বসন্ত পঞ্চমী)"],
  "9-10": ["স্বামী বিবেকানন্দের জন্মতিথি উৎসব"],
  "10-8": ["মহা শিবরাত্রি ব্রত ও পূজা"],
  "10-15": ["শ্রীশ্রী দোলযাত্রা ও শ্রীচৈতন্য মহাপ্রভুর আবির্ভাব তিথি"],
  "10-20": ["শ্রীশ্রীরামকৃষ্ণ দেবের শুভ জন্মতিথি উৎসব"],
  "11-20": ["শ্রীশ্রী বাসন্তী দুর্গাপূজা ও অন্নপূর্ণা পূজা"],
  "11-30": ["চৈত্র সংক্রান্তি ও চড়ক পূজা"],
};

export function getBengaliDate(date: Date): BengaliDateInfo {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth();
  const gDay = date.getDate();

  // Approximate start dates of Bengali months in Gregorian calendar (Normal year)
  // Baishakh starts April 14 or 15
  const monthStartDays = [
    new Date(gYear, 3, 14), // Baishakh: Apr 14
    new Date(gYear, 4, 15), // Jyaishtha: May 15
    new Date(gYear, 5, 15), // Ashadh: Jun 15
    new Date(gYear, 6, 16), // Shraban: Jul 16
    new Date(gYear, 7, 16), // Bhadra: Aug 16
    new Date(gYear, 8, 16), // Ashwin: Sep 16
    new Date(gYear, 9, 16), // Kartik: Oct 16
    new Date(gYear, 10, 15), // Agrahayan: Nov 15
    new Date(gYear, 11, 15), // Poush: Dec 15
    new Date(gYear + 1, 0, 14), // Magh: Jan 14
    new Date(gYear + 1, 1, 13), // Falgun: Feb 13
    new Date(gYear + 1, 2, 14), // Chaitra: Mar 14
  ];

  let bMonthIndex = 0;
  let bDay = 1;
  let bYear = gYear - 593;

  // If before April 14, it is part of previous Bengali Year
  if (date < new Date(gYear, 3, 14)) {
    bYear = gYear - 594;
  }

  // Find Bengali Month
  if (date >= new Date(gYear, 3, 14) && date < new Date(gYear, 4, 15)) {
    bMonthIndex = 0;
    bDay = Math.floor((date.getTime() - new Date(gYear, 3, 14).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 4, 15) && date < new Date(gYear, 5, 15)) {
    bMonthIndex = 1;
    bDay = Math.floor((date.getTime() - new Date(gYear, 4, 15).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 5, 15) && date < new Date(gYear, 6, 16)) {
    bMonthIndex = 2;
    bDay = Math.floor((date.getTime() - new Date(gYear, 5, 15).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 6, 16) && date < new Date(gYear, 7, 16)) {
    bMonthIndex = 3;
    bDay = Math.floor((date.getTime() - new Date(gYear, 6, 16).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 7, 16) && date < new Date(gYear, 8, 16)) {
    bMonthIndex = 4;
    bDay = Math.floor((date.getTime() - new Date(gYear, 7, 16).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 8, 16) && date < new Date(gYear, 9, 16)) {
    bMonthIndex = 5;
    bDay = Math.floor((date.getTime() - new Date(gYear, 8, 16).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 9, 16) && date < new Date(gYear, 10, 15)) {
    bMonthIndex = 6;
    bDay = Math.floor((date.getTime() - new Date(gYear, 9, 16).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 10, 15) && date < new Date(gYear, 11, 15)) {
    bMonthIndex = 7;
    bDay = Math.floor((date.getTime() - new Date(gYear, 10, 15).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 11, 15) || date < new Date(gYear, 0, 14)) {
    bMonthIndex = 8;
    const ref = date.getMonth() === 11 ? new Date(gYear, 11, 15) : new Date(gYear - 1, 11, 15);
    bDay = Math.floor((date.getTime() - ref.getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 0, 14) && date < new Date(gYear, 1, 13)) {
    bMonthIndex = 9;
    bDay = Math.floor((date.getTime() - new Date(gYear, 0, 14).getTime()) / 86400000) + 1;
  } else if (date >= new Date(gYear, 1, 13) && date < new Date(gYear, 2, 14)) {
    bMonthIndex = 10;
    bDay = Math.floor((date.getTime() - new Date(gYear, 1, 13).getTime()) / 86400000) + 1;
  } else {
    bMonthIndex = 11;
    bDay = Math.floor((date.getTime() - new Date(gYear, 2, 14).getTime()) / 86400000) + 1;
  }

  // Calculate Lunar Tithi (Rough lunar phase calculation)
  const lunarCycle = 29.53058770576;
  const knownNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57));
  const diffDays = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentPhase = (diffDays % lunarCycle + lunarCycle) % lunarCycle;
  const tithiIndex = Math.min(29, Math.floor((currentPhase / lunarCycle) * 30));

  const tithiName = TITHIS[tithiIndex];
  const paksha: 'শুক্লপক্ষ' | 'কৃষ্ণপক্ষ' = tithiIndex < 15 ? 'শুক্লপক্ষ' : 'কৃষ্ণপক্ষ';

  // Check Festivals
  const festivalKey = `${bMonthIndex}-${bDay}`;
  const festivals: string[] = [...(BENGALI_FESTIVALS[festivalKey] || [])];

  const isAmavasya = tithiName === "অমাবস্যা";
  const isPurnima = tithiName === "পূর্ণিমা";
  const isEkadashi = tithiName === "একাদশী";

  if (isEkadashi && !festivals.some(f => f.includes("একাদশী"))) {
    festivals.push(`${paksha} একাদশী ব্রত`);
  }
  if (isPurnima && !festivals.some(f => f.includes("পূর্ণিমা"))) {
    festivals.push("পূর্ণিমা ব্রত ও পূজা");
  }
  if (isAmavasya && !festivals.some(f => f.includes("অমাবস্যা"))) {
    festivals.push("অমাবস্যা ব্রত ও বিশেষ আরতি");
  }

  // Approximate sunrise & sunset for Bengal region
  const monthSunriseMap = ["05:18 AM", "04:55 AM", "04:52 AM", "05:05 AM", "05:18 AM", "05:25 AM", "05:38 AM", "05:58 AM", "06:18 AM", "06:22 AM", "06:05 AM", "05:42 AM"];
  const monthSunsetMap = ["05:58 PM", "06:14 PM", "06:25 PM", "06:24 PM", "06:05 PM", "05:35 PM", "05:08 PM", "04:52 PM", "04:58 PM", "05:20 PM", "05:40 PM", "05:52 PM"];

  return {
    gregorianDate: date,
    bengaliDay: Math.max(1, bDay),
    bengaliMonthName: BENGALI_MONTHS[bMonthIndex].name,
    bengaliMonthIndex: bMonthIndex,
    bengaliYear: bYear,
    tithi: `${paksha} ${tithiName}`,
    paksha,
    sunrise: monthSunriseMap[gMonth] || "05:30 AM",
    sunset: monthSunsetMap[gMonth] || "05:45 PM",
    festivals,
    isAmavasya,
    isPurnima,
    isEkadashi,
  };
}

export function getMonthDays(year: number, monthIndex: number): BengaliDateInfo[] {
  const days: BengaliDateInfo[] = [];
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, monthIndex, d);
    days.push(getBengaliDate(date));
  }
  return days;
}
