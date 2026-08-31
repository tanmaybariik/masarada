"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Phone, CheckCircle2, AlertCircle, Loader2, Save, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { t, language } = useTranslation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const AVATAR_OPTIONS = [
    { id: "/ramakrishna.png", name: language === "bn" ? "শ্রী রামকৃষ্ণ" : "Sri Ramakrishna" },
    { id: "/maa-sarada-portrait.png", name: language === "bn" ? "মা সারদা" : "Maa Sarada" },
    { id: "/swami-vivekananda.jpg", name: language === "bn" ? "স্বামী বিবেকানন্দ" : "Swami Vivekananda" },
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user) {
      setName(session.user.name || "");
      setPhone((session.user as any).phone || "");
      setAvatar((session.user as any).avatar || "");
      setLocation((session.user as any).location || "");
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, avatar, location }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      await update({ name, phone, avatar, location });

      setSuccessMsg(language === "bn" ? "প্রোফাইল আপডেট করা হয়েছে!" : "Profile updated successfully!");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } catch (err: any) {
      setErrorMsg(language === "bn" ? "প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে" : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-xs font-bold text-foreground/60">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <Link href="/account" className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <span>{language === "bn" ? "অ্যাকাউন্টে ফিরে যান" : "Back to Account"}</span>
        </Link>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          {language === "bn" ? "প্রোফাইল" : "Profile"}
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-black text-foreground tracking-tight">
          {language === "bn" ? "প্রোফাইল এডিট করুন" : "Edit Profile"}
        </h1>
        <p className="text-xs text-foreground/60 mt-1">
          {language === "bn" ? "আপনার ব্যক্তিগত তথ্য আপডেট করুন" : "Update your personal information"}
        </p>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs font-semibold mb-4 flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={16} className="flex-shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-2xl text-xs font-semibold mb-4 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1.5">
            {language === "bn" ? "আপনার নাম" : "Full Name"}
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder={language === "bn" ? "আপনার নাম লিখুন" : "Enter your name"}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-3">
            {language === "bn" ? "অ্যাভাটার নির্বাচন করুন" : "Choose Avatar"}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {AVATAR_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setAvatar(option.id)}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                  avatar === option.id 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-secondary/20 hover:border-secondary/50 bg-white dark:bg-zinc-900"
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-secondary/20">
                  <Image src={option.id} alt={option.name} fill className="object-cover" />
                </div>
                <span className="text-[9px] font-bold text-center leading-tight">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-2">
            {avatar && (
              <button
                type="button"
                onClick={() => setAvatar("")}
                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors"
              >
                {language === "bn" ? "অ্যাভাটার মুছুন" : "Remove Avatar"}
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1.5">
            {language === "bn" ? "ফোন নম্বর" : "Phone Number"}
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder={language === "bn" ? "আপনার ফোন নম্বর লিখুন" : "Enter your phone number"}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1.5">
            {language === "bn" ? "অবস্থান" : "Location"}
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder={language === "bn" ? "আপনার অবস্থান লিখুন (যেমন কলকাতা)" : "Enter your location (e.g. Kolkata)"}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1.5">
            {language === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
          </label>
          <input
            type="email"
            value={session?.user?.email || ""}
            disabled
            className="w-full px-4 py-3 text-xs bg-secondary/10 border border-secondary/20 rounded-xl text-foreground/60 cursor-not-allowed"
          />
          <p className="text-[10px] text-foreground/50 mt-1">
            {language === "bn" ? "ইমেইল ঠিকানা পরিবর্তন করা যাবে না" : "Email address cannot be changed"}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-60 mt-4"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>{language === "bn" ? "সংরক্ষণ করা হচ্ছে..." : "Saving..."}</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>{language === "bn" ? "সংরক্ষণ করুন" : "Save Changes"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
