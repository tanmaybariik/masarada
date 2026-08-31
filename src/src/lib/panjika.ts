export interface PanjikaDate {
  date: string;
  tithi: string;
  sunrise: string;
  sunset: string;
  events: string[];
}

export class PanjikaService {
  // In a real application, this would fetch from a database or external API
  // decoupled from the main application logic as requested.
  static getTodayPanjika(): PanjikaDate {
    return {
      date: new Date().toISOString(),
      tithi: "শুক্লা অষ্টমী",
      sunrise: "05:42 AM",
      sunset: "05:30 PM",
      events: ["মঙ্গলারতি - 04:30 AM", "সন্ধ্যারতি - 06:00 PM"],
    };
  }

  static getMonthPanjika(year: number, month: number): PanjikaDate[] {
    // Return mock data for a month
    const dates: PanjikaDate[] = [];
    for (let i = 1; i <= 30; i++) {
      dates.push({
        date: new Date(year, month, i).toISOString(),
        tithi: i % 2 === 0 ? "শুক্লা অষ্টমী" : "কৃষ্ণা সপ্তমী",
        sunrise: "05:45 AM",
        sunset: "05:30 PM",
        events: i === 15 ? ["শ্রীরামকৃষ্ণ জন্মতিথি"] : [],
      });
    }
    return dates;
  }
}
