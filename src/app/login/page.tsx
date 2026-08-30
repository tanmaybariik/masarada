"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  ArrowLeft, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  User, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // Auto seed if database is fresh
      try {
        await fetch("/api/auth/seed");
      } catch (err) {
        // ignore seed error
      }

      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password: password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("ইমেইল বা পাসওয়ার্ড সঠিক নয় / Invalid email or password");
        setLoading(false);
      } else {
        setSuccessMsg("লগইন সফল হয়েছে! রিডাইরেক্ট করা হচ্ছে...");
        setTimeout(() => {
          if (email.toLowerCase().includes("karunamoyee") || email.toLowerCase().includes("admin")) {
            router.push("/admin");
          } else {
            router.push(callbackUrl);
          }
          router.refresh();
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg("লগইন করার সময় ত্রুটি হয়েছে / Something went wrong during login");
      setLoading(false);
    }
  };

  const handleQuickLogin = async (type: "admin" | "devotee") => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await fetch("/api/auth/seed");
    } catch (err) {}

    const creds = type === "admin" 
      ? { email: "karunamoyeemasarada@gmail.com", password: "admin123456" }
      : { email: "devotee@masarada.com", password: "user123456" };

    setEmail(creds.email);
    setPassword(creds.password);

    try {
      const res = await signIn("credentials", {
        email: creds.email,
        password: creds.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("দ্রুত লগইন সফল হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
        setLoading(false);
      } else {
        setSuccessMsg(type === "admin" ? "অ্যাডমিন লগইন সফল! অ্যাডমিন প্যানেলে নিয়ে যাওয়া হচ্ছে..." : "লগইন সফল! অ্যাকাউন্টে নিয়ে যাওয়া হচ্ছে...");
        setTimeout(() => {
          if (type === "admin") {
            router.push("/admin");
          } else {
            router.push(callbackUrl);
          }
          router.refresh();
        }, 600);
      }
    } catch (err) {
      setErrorMsg("লগইন ত্রুটি");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          নিরাপদ লগইন
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="relative w-16 h-16 rounded-2xl bg-white shadow-md mx-auto mb-3 border border-secondary/20 flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.jpg"
            alt="মা সারদা লোগো"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">স্বাগতম</h1>
        <p className="text-xs text-foreground/60 mt-1">করুণাময়ী মা সারদা ভক্ত সেবা ও ম্যানেজমেন্ট পোর্টাল</p>
      </div>

      {/* Quick 1-Click Login Cards for Testing & Ease */}
      <div className="bg-secondary/10 p-3 rounded-2xl mb-5 border border-secondary/20 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-foreground/70 px-1">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-amber-500" />
            দ্রুত এক ক্লিকে লগইন করুন (Demo Access)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("admin")}
            disabled={loading}
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-600 to-primary text-white text-[11px] font-extrabold py-2 px-2.5 rounded-xl shadow-sm hover:opacity-95 transition-all active:scale-95 disabled:opacity-50"
          >
            <ShieldCheck size={14} />
            <span>Admin Portal</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("devotee")}
            disabled={loading}
            className="flex items-center justify-center gap-1.5 bg-white dark:bg-zinc-800 text-foreground border border-secondary/30 text-[11px] font-extrabold py-2 px-2.5 rounded-xl shadow-sm hover:border-primary transition-all active:scale-95 disabled:opacity-50"
          >
            <User size={14} className="text-primary" />
            <span>ভক্ত / Devotee</span>
          </button>
        </div>
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
            ইমেইল ঠিকানা / Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="example@mail.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-foreground/80">
              পাসওয়ার্ড / Password
            </label>
            <Link href="/forgot-password" className="text-[11px] text-primary font-bold hover:underline">
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground p-1"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-60 mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>যাচাই করা হচ্ছে...</span>
            </>
          ) : (
            <>
              <span>লগইন করুন</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-secondary/15 text-center text-xs text-foreground/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/register" className="text-primary font-black hover:underline">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-xs font-bold text-foreground/60">
        লোড হচ্ছে...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
