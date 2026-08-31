import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "করুণাময়ী মা সারদা | Karunamoyee Ma Sarada",
  description: "মা সারদার আশ্রম - শ্রীমা সারদা দেবী, শ্রীরামকৃষ্ণ পরমহংস ও স্বামী বিবেকানন্দের জীবন ও বাণী। ইভেন্ট, ডোনেশন ও অনলাইন শপ।",
  keywords: ["Ma Sarada", "Ramakrishna", "Vivekananda", "Ashram", "Donation", "Bengali"],
  openGraph: {
    title: "করুণাময়ী মা সারদা",
    description: "মা সারদার আশ্রম - শ্রীমা সারদা দেবী, শ্রীরামকৃষ্ণ পরমহংস ও স্বামী বিবেকানন্দের জীবন ও বাণী।",
    url: "https://masarada-ashram.example.com",
    siteName: "Karunamoyee Ma Sarada",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Karunamoyee Ma Sarada",
      },
    ],
    locale: "bn_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "করুণাময়ী মা সারদা",
    description: "মা সারদার আশ্রম - শ্রীমা সারদা দেবী, শ্রীরামকৃষ্ণ পরমহংস ও স্বামী বিবেকানন্দের জীবন ও বাণী।",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  }
};

import BottomNavigation from "@/components/layout/BottomNavigation";
import { AudioProvider } from "@/components/media/AudioContext";
import GlobalAudioPlayer from "@/components/media/GlobalAudioPlayer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { cookies } from "next/headers";
import { Language } from "@/lib/i18n/dictionaries";
import PWAAutoInstallHandler from "@/components/common/PWAAutoInstallHandler";

import AuthProvider from "@/components/providers/AuthProvider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const initialLanguage = (localeCookie === 'en' ? 'en' : 'bn') as Language;

  return (
    <html
      lang={initialLanguage}
      className={`${notoSansBengali.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.jpg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-zinc-100 dark:bg-zinc-950 transition-colors">
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider initialLanguage={initialLanguage}>
              <AudioProvider>
                <PWAAutoInstallHandler />
                <div className="flex-1 flex flex-col w-full max-w-md md:max-w-none lg:max-w-7xl 2xl:max-w-[1600px] mx-auto bg-background min-h-screen relative shadow-2xl">
                  <main className="flex-1 pb-16 md:pb-0">
                    {children}
                  </main>
                  <GlobalAudioPlayer />
                  <BottomNavigation />
                </div>
              </AudioProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
