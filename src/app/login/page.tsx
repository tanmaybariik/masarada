"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NextAuth login logic will go here
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-8">
      <Link href="/" className="flex items-center text-foreground/60 mb-8">
        <ArrowLeft size={20} className="mr-2" />
        ফিরে যান
      </Link>

      <div className="text-center mb-8">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-lg mx-auto mb-4">
          <Image src="/logo.jpg" alt="Karunamoyee Ma Sarada Logo" fill className="object-cover" priority />
        </div>
        <h1 className="text-2xl font-bold text-foreground">স্বাগতম</h1>
        <p className="text-foreground/60 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            ইমেইল বা ফোন নম্বর
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="example@mail.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="********"
            required
          />
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-primary font-medium">
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-primary/90 transition-colors shadow-md"
        >
          লগইন করুন
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-foreground/60">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/register" className="text-primary font-bold">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </Link>
      </div>
    </div>
  );
}
