"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  ArrowLeft, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("পাসওয়ার্ড দুটি মিলছে না / Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে / Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "নিবন্ধন ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }

      setSuccessMsg("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! স্বয়ংক্রিয়ভাবে লগইন করা হচ্ছে...");

      // Automatically sign in
      const signInRes = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password: password,
        redirect: false,
      });

      if (signInRes?.error) {
        router.push("/login");
      } else {
        setTimeout(() => {
          if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("karunamoyee")) {
            router.push("/admin");
          } else {
            router.push("/account");
          }
          router.refresh();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg("সার্ভার ত্রুটি / Failed to connect to server");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <span>লগইনে ফিরে যান</span>
        </Link>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          নতুন ভক্ত নিবন্ধন
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
        <h1 className="text-2xl font-black text-foreground tracking-tight">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-xs text-foreground/60 mt-1">মা সারদা আশ্রম পরিবারে আপনাকে স্বাগতম</p>
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

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1">
            পূর্ণ নাম / Full Name *
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="আপনার পুরো নাম"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1">
            ইমেইল / Email Address *
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="example@mail.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1">
            মোবাইল নম্বর / Phone Number (ঐচ্ছিক)
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="+91 9876543210"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1">
            পাসওয়ার্ড / Password (অন্তত ৬ অক্ষর) *
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="••••••••"
              required
              minLength={6}
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

        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1">
            পাসওয়ার্ড নিশ্চিত করুন / Confirm Password *
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-60 mt-4"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} />
              <span>অ্যাকাউন্ট তৈরি করুন</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-secondary/15 text-center text-xs text-foreground/70">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link href="/login" className="text-primary font-black hover:underline">
          লগইন করুন
        </Link>
      </div>
    </div>
  );
}
