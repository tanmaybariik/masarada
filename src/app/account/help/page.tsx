"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  HelpCircle,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function HelpCenterPage() {
  const { t, language } = useTranslation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: language === "bn"
        ? "নমস্কার! জয় মা সারদা। করুণাময়ী মা সারদা সহায়তা কেন্দ্রে আপনাকে স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
        : "Namaskar! Joy Ma Sarada. Welcome to the Karunamoyee Ma Sarada Support Center. How may I assist you today?",
      time: language === "bn" ? "এখন" : "Now"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = language === "bn" ? [
    "মন্দির দর্শন ও আরতির সময়সূচি কী?",
    "কীভাবে পূজা বা ইভেন্ট বুক করব?",
    "অর্ডার ডেলিভারি স্ট্যাটাস কীভাবে দেখব?",
    "সরাসরি যোগাযোগ নম্বর ও ইমেইল কী?"
  ] : [
    "What are temple & arati timings?",
    "How to book events or pujas?",
    "How to track order delivery?",
    "What is the contact phone and email?"
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botAnswer = language === "bn"
        ? "ধন্যবাদ আপনার বার্তার জন্য। আপনি যদি আরও বিস্তারিত তথ্য চান তবে আমাদের সরাসরি ফোন নম্বরে (৮৯১৮৫০১৭৭৯) বা ইমেইলে (karunamoyeemasarada@gmail.com) যোগাযোগ করতে পারেন। জয় মা!"
        : "Thank you for your message. For more details, feel free to call us at 8918501779 or email karunamoyeemasarada@gmail.com. Joy Ma!";

      const lower = userText.toLowerCase();

      if (lower.includes("time") || lower.includes("timing") || lower.includes("সময়") || lower.includes("খোলা") || lower.includes("আরতি")) {
        botAnswer = language === "bn"
          ? "মন্দির প্রাঙ্গণ প্রতিদিন সকাল ৭:০০ টা থেকে দুপুর ১২:০০ টা এবং বিকাল ৪:০০ টা থেকে রাত ৮:০০ টা পর্যন্ত খোলা থাকে। বিশেষ মঙ্গলারতি ভোর ৫:০০ টায় এবং সন্ধ্যারতি সন্ধ্যা ৬:৩০ টায় অনুষ্ঠিত হয়।"
          : "Temple premises are open daily from 7:00 AM to 12:00 PM and 4:00 PM to 8:00 PM. Mangalarati is held at 5:00 AM and Sandhyarati at 6:30 PM.";
      } else if (lower.includes("donate") || lower.includes("দান") || lower.includes("প্রণামী") || lower.includes("receipt") || lower.includes("রশিদ")) {
        botAnswer = language === "bn"
          ? "আপনি অ্যাপের 'দান' সেকশন (/donate) থেকে সরাসরি অনলাইন পেমেন্টে দান করতে পারেন এবং তাৎক্ষণিক অফিসিয়াল রশিদ ও 80G সার্টিফিকেট ডাউনলোড করতে পারবেন।"
          : "You can make an offering via the 'Donate' section (/donate) using UPI/Online payment and instantly download an official receipt.";
      } else if (lower.includes("book") || lower.includes("event") || lower.includes("ইভেন্ট") || lower.includes("টিকিট") || lower.includes("পাস")) {
        botAnswer = language === "bn"
          ? "অ্যাপের 'ইভেন্ট' সেকশন (/events) থেকে যেকোনো আসন্ন অনুষ্ঠানে আপনার আসন বা পাস বুক করতে পারেন। বুকিং শেষে ডিজিটাল QR পাস ও রশিদ পাবেন।"
          : "Visit the 'Events' section (/events) to book your seat or ticket. You will receive a digital QR pass and official receipt.";
      } else if (lower.includes("order") || lower.includes("অর্ডার") || lower.includes("track") || lower.includes("ডেলিভারি") || lower.includes("পণ্য")) {
        botAnswer = language === "bn"
          ? "আপনার অর্ডার করা সামগ্রীর স্ট্যাটাস দেখতে প্রোফাইলের 'আমার অর্ডার' সেকশনে (/account/orders) যান। সেখানে প্যাকেজিং থেকে ডেলিভারি পর্যন্ত লাইভ ট্র্যাকিং দেখতে পাবেন।"
          : "To track your shop order, go to Profile -> 'My Orders' (/account/orders). You can monitor 4-step live delivery progress.";
      } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("ফোন") || lower.includes("নম্বর")) {
        botAnswer = language === "bn"
          ? "সরাসরি যোগাযোগ করতে কল করুন: ৮৯১৮৫০১৭৭৯ (8918501779) অথবা ইমেইল করুন: karunamoyeemasarada@gmail.com।"
          : "Direct contact phone: 8918501779 | Email: karunamoyeemasarada@gmail.com.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/account" className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs md:text-sm">
          <ArrowLeft size={18} className="mr-2" />
          <span>{t('general.back')}</span>
        </Link>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          {language === "bn" ? "অনলাইন সহায়ক" : "Live Assistant"}
        </span>
      </div>

      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">{t('help.title')}</h1>
        <p className="text-foreground/60 text-xs mt-0.5">{t('help.subtitle')}</p>
      </div>

      {/* Direct Contact Bar */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <a
          href="tel:+918918501779"
          className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-2 hover:border-primary/40 transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
            <Phone size={15} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] text-foreground/50 font-bold uppercase block truncate">{t('general.call')}</span>
            <span className="text-xs font-bold text-foreground truncate block">8918501779</span>
          </div>
        </a>

        <a
          href="mailto:karunamoyeemasarada@gmail.com"
          className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-2 hover:border-primary/40 transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
            <Mail size={15} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] text-foreground/50 font-bold uppercase block truncate">{t('general.email')}</span>
            <span className="text-xs font-bold text-foreground truncate block">Email Support</span>
          </div>
        </a>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-white rounded-3xl border border-secondary/20 shadow-sm p-4 flex flex-col mb-3 min-h-[300px] max-h-[420px] overflow-y-auto">
        <div className="space-y-3 flex-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                  msg.sender === "user" 
                    ? "bg-primary text-white" 
                    : "bg-amber-100 text-amber-700 border border-amber-300"
                }`}
              >
                {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-tr-none shadow-sm"
                    : "bg-secondary/10 text-foreground rounded-tl-none border border-secondary/15"
                }`}
              >
                <p className="break-words">{msg.text}</p>
                <span className={`text-[9px] block mt-1 text-right ${msg.sender === "user" ? "text-white/70" : "text-foreground/40"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-foreground/50 italic">
              <Bot size={14} className="text-primary animate-bounce" />
              <span>{language === "bn" ? "সহায়ক টাইপ করছে..." : "Assistant is typing..."}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="mb-3">
        <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Sparkles size={11} className="text-primary" />
          <span>{t('help.quickQuestions')}</span>
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="bg-white hover:bg-secondary/10 text-foreground/80 border border-secondary/20 px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-secondary/30 shadow-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('help.typeMessage')}
          className="flex-1 bg-transparent px-3 py-1.5 text-xs text-foreground outline-none placeholder:text-foreground/40"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-sm flex-shrink-0"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
