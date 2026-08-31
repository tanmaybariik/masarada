"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic will go here
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-8">
      <Link href="/login" className="flex items-center text-foreground/60 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        লগইনে ফিরে যান
      </Link>

      <div className="text-center mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-md mx-auto mb-3">
          <Image src="/logo.jpg" alt="Karunamoyee Ma Sarada Logo" fill className="object-cover" priority />
        </div>
        <h1 className="text-2xl font-bold text-foreground">নতুন অ্যাকাউন্ট</h1>
        <p className="text-foreground/60 mt-1">কমিউনিটিতে যোগ দিন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            পূর্ণ নাম
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="আপনার নাম"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            ইমেইল
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="example@mail.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            ফোন নম্বর (ঐচ্ছিক)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="+880 1..."
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
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-6 hover:bg-primary/90 transition-colors shadow-md"
        >
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
    </div>
  );
}
