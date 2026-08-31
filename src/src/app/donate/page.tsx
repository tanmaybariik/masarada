"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, CheckCircle2, FileText, CreditCard } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import ShareButton from "@/components/common/ShareButton";

export default function DonatePage() {
  const { t, language } = useTranslation();
  
  const [step, setStep] = useState<"form" | "success">("form");
  const [donationType, setDonationType] = useState<"onetime" | "monthly">("onetime");
  const [amount, setAmount] = useState<number | string>(500);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  
  const presetAmounts = [100, 500, 1000, 5000];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-8 pb-20">
      {step === "form" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center text-foreground/60 hover:text-primary transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              {t('nav.home')}
            </Link>
            <ShareButton 
              title="করুণাময়ী মা সারদা — দান ও প্রণামী পোর্টাল" 
              text="শ্রীরামকৃষ্ণ, মা সারদা ও স্বামীজীর আদর্শে পরিচালিত আশ্রমে সেবা কার্যে দান ও প্রণামী দিন:" 
              url="/donate" 
              variant="pill"
              label="দান লিঙ্ক শেয়ার"
            />
          </div>

          <div className="mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-3">
              <Heart size={24} className="fill-rose-200" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{t('donate.title')}</h1>
            <p className="text-foreground/60 mt-1">{t('donate.description')}</p>
          </div>

          <form onSubmit={handleDonate} className="space-y-6">
            {/* Type Selection */}
            <div className="flex bg-secondary/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDonationType("onetime")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                  donationType === "onetime" ? "bg-white shadow-sm text-primary" : "text-foreground/60"
                }`}
              >
                {t('donate.type.onetime')}
              </button>
              <button
                type="button"
                onClick={() => setDonationType("monthly")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                  donationType === "monthly" ? "bg-white shadow-sm text-primary" : "text-foreground/60"
                }`}
              >
                {t('donate.type.monthly')}
              </button>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">{t('donate.amount')}</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetAmounts.map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-2 rounded-xl text-sm font-bold border transition-colors ${
                      amount === preset 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-white border-secondary/20 text-foreground/70 hover:border-primary/50"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-foreground/50 font-bold">
                  {language === 'bn' ? '৳' : '₹'}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
                  placeholder={t('donate.otherAmount')}
                  required
                  min={10}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-foreground mb-1">{t('donate.yourDetails')}</h2>
              <input type="text" placeholder={t('donate.fullName')} value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
              <input type="email" placeholder={t('donate.email')} value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
              <input type="text" placeholder={t('donate.pan')} value={pan} onChange={e => setPan(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm uppercase" />
            </div>

            <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2">
              <CreditCard size={18} /> {t('donate.pay')}
            </button>
          </form>
        </>
      )}

      {step === "success" && (
        <div className="flex-1 flex flex-col items-center justify-center py-10 bg-white rounded-2xl border border-secondary/20 shadow-sm px-6 mt-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('donate.success.title')}</h2>
          <p className="text-foreground/70 mb-6 text-sm">{t('donate.success.desc')}</p>
          
          <div className="bg-secondary/10 w-full rounded-xl p-4 text-left mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-foreground/60">{t('donate.txnId')}</span>
              <span className="font-mono font-bold text-foreground text-sm">TXN-998271</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-foreground/60">{t('shop.price')}</span>
              <span className="font-bold text-primary">{language === 'bn' ? '৳' : '₹'} {amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-foreground/60">{t('donate.typeLabel')}</span>
              <span className="font-bold text-foreground">{donationType === "onetime" ? t('donate.type.onetime') : t('donate.type.monthly')}</span>
            </div>
          </div>
          
          <button className="w-full bg-secondary/20 text-foreground py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-secondary/30 transition-colors mb-3">
            <FileText size={18} /> {t('donate.downloadReceipt')}
          </button>

          <Link href="/" className="text-primary font-bold text-sm mt-4">
            {t('donate.backToHome')}
          </Link>
        </div>
      )}
    </div>
  );
}
