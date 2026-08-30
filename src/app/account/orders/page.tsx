"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Printer, 
  ChevronRight, 
  FileText, 
  MapPin, 
  ShoppingBag,
  RotateCcw,
  ShieldAlert,
  AlertCircle,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  Info,
  PhoneCall
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getStoredOrders, Order } from "@/lib/cartStore";

interface ReturnRequest {
  orderId: string;
  reason: string;
  resolution: "replacement" | "refund";
  comments: string;
  status: "pending" | "approved" | "processed";
  submittedAt: string;
}

export default function MyOrdersPage() {
  const { t, language } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [returnOrder, setReturnOrder] = useState<Order | null>(null);
  const [returnSuccess, setReturnSuccess] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Return Form State
  const [returnReason, setReturnReason] = useState("Damaged in transit");
  const [returnResolution, setReturnResolution] = useState<"replacement" | "refund">("replacement");
  const [returnComments, setReturnComments] = useState("");

  // Stored return requests
  const [returnHistory, setReturnHistory] = useState<Record<string, ReturnRequest>>({});

  useEffect(() => {
    setMounted(true);
    setOrders(getStoredOrders());
    try {
      const saved = localStorage.getItem("kms_return_requests_v1");
      if (saved) setReturnHistory(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!mounted) return null;

  const handlePrint = () => {
    window.print();
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "confirmed": return 1;
      case "processing": return 2;
      case "shipped": return 3;
      case "delivered": return 4;
      default: return 1;
    }
  };

  const handleOpenReturnModal = (order: Order) => {
    setReturnOrder(order);
    setReturnReason("Damaged in transit");
    setReturnResolution("replacement");
    setReturnComments("");
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrder) return;

    const newRequest: ReturnRequest = {
      orderId: returnOrder.id,
      reason: returnReason,
      resolution: returnResolution,
      comments: returnComments,
      status: "pending",
      submittedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    const updated = { ...returnHistory, [returnOrder.id]: newRequest };
    setReturnHistory(updated);
    try {
      localStorage.setItem("kms_return_requests_v1", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setReturnSuccess(
      language === "bn" 
        ? `আপনার অর্ডার #${returnOrder.id}-এর জন্য ফেরত আবেদন সফলভাবে জমা হয়েছে। হেল্পলাইন টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।`
        : `Return request for order #${returnOrder.id} submitted successfully. Ashram team will review within 24 hours.`
    );
    setReturnOrder(null);

    setTimeout(() => {
      setReturnSuccess(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24 text-foreground">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-5 print:hidden">
        <Link href="/account" className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs font-bold">
          <ArrowLeft size={18} className="mr-2" />
          <span>{language === "bn" ? "প্রোফাইলে ফিরে যান" : "Back to Profile"}</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTermsModal(true)}
            className="text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <Info size={13} />
            <span>{language === "bn" ? "রিটার্ন শর্তাবলী" : "Return Policy"}</span>
          </button>
          <span className="text-[11px] font-bold text-foreground/60 bg-secondary/15 px-2.5 py-1 rounded-full font-mono">
            {orders.length} {language === "bn" ? "অর্ডার" : "Orders"}
          </span>
        </div>
      </div>

      <div className="mb-4 print:hidden">
        <h1 className="text-xl md:text-2xl font-extrabold text-foreground">{language === "bn" ? "আমার অর্ডার সমূহ" : "My Orders"}</h1>
        <p className="text-foreground/60 text-xs mt-0.5">
          {language === "bn" ? "অর্ডারের লাইভ ট্র্যাকিং, ইনভয়েস ও পণ্য ফেরত/পরিবর্তন সুবিধা" : "Live order tracking, invoice print & easy return options"}
        </p>
      </div>

      {/* Success Alert Banner */}
      {returnSuccess && (
        <div className="mb-4 bg-emerald-600 text-white p-3.5 rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <p className="leading-snug">{returnSuccess}</p>
        </div>
      )}

      {/* Return Policy Quick Info Strip */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-3 mb-4 flex items-center justify-between text-xs print:hidden shadow-xs">
        <div className="flex items-center gap-2">
          <RotateCcw size={16} className="text-primary flex-shrink-0" />
          <span className="text-[11px] font-medium text-foreground/80">
            {language === "bn" ? "৭ দিনের মধ্যে সহজ রিটার্ন ও প্রতিস্থাপন সুবিধা উপলব্ধ।" : "7-Day Hassle-free Return & Replacement Available."}
          </span>
        </div>
        <button
          onClick={() => setShowTermsModal(true)}
          className="text-[10px] font-extrabold text-primary underline whitespace-nowrap ml-2"
        >
          {language === "bn" ? "শর্তাবলী" : "View T&C"}
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4 print:hidden">
        {orders.map(order => {
          const currentStep = getStatusStep(order.status);
          const hasReturn = returnHistory[order.id];

          return (
            <div key={order.id} className="bg-white rounded-3xl border border-secondary/20 shadow-sm p-4 hover:border-primary/40 transition-all space-y-3">
              {/* Order Header */}
              <div className="flex items-center justify-between border-b border-secondary/15 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary font-bold">{order.id}</span>
                    {hasReturn && (
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        {language === "bn" ? "রিটার্ন প্রক্রিয়াধীন" : "Return Under Review"}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-foreground/60 mt-0.5">{order.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-foreground">₹{order.total}</span>
                  <p className="text-[10px] text-emerald-600 font-bold">{language === "bn" ? "পরিশোধিত (Paid)" : "Paid"}</p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-secondary/10 relative flex-shrink-0 border border-secondary/20">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{item.product.name}</p>
                      <p className="text-[10px] text-foreground/60">{item.quantity} Unit(s) • ₹{item.product.price} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Status Tracker Bar */}
              <div className="bg-secondary/5 rounded-2xl p-3 border border-secondary/15">
                <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">
                  {language === "bn" ? "লাইভ ট্র্যাকিং স্ট্যাটাস" : "Live Delivery Tracking"}
                </p>
                
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary/20 -translate-y-1/2 z-0"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  ></div>

                  {/* Step 1 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 1 ? 'bg-primary text-white shadow-sm' : 'bg-secondary/30 text-foreground/50'}`}>
                      ✓
                    </div>
                    <span className="text-[8px] font-bold text-foreground/70 mt-1">{t('orders.placed')}</span>
                  </div>

                  {/* Step 2 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 2 ? 'bg-primary text-white shadow-sm' : 'bg-secondary/30 text-foreground/50'}`}>
                      <Package size={11} />
                    </div>
                    <span className="text-[8px] font-bold text-foreground/70 mt-1">{t('orders.packing')}</span>
                  </div>

                  {/* Step 3 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 3 ? 'bg-primary text-white shadow-sm' : 'bg-secondary/30 text-foreground/50'}`}>
                      <Truck size={11} />
                    </div>
                    <span className="text-[8px] font-bold text-foreground/70 mt-1">{t('orders.shipped')}</span>
                  </div>

                  {/* Step 4 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 4 ? 'bg-emerald-600 text-white shadow-sm' : 'bg-secondary/30 text-foreground/50'}`}>
                      <CheckCircle2 size={11} />
                    </div>
                    <span className="text-[8px] font-bold text-foreground/70 mt-1">{t('orders.delivered')}</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-secondary/15 flex justify-between items-center text-[11px]">
                  <span className="text-foreground/60">{language === "bn" ? "বর্তমান অবস্থা:" : "Current Status:"}</span>
                  <span className="font-bold text-primary">{order.statusText}</span>
                </div>
              </div>

              {/* Action Buttons: Invoice + Return Request */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-secondary/10 hover:bg-secondary/20 text-foreground py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText size={14} className="text-primary" />
                  <span>{t('orders.viewInvoice')}</span>
                </button>

                {hasReturn ? (
                  <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 border border-amber-200 dark:border-amber-800">
                    <Clock size={12} />
                    <span>{language === "bn" ? "রিটার্ন টিকিট সক্রিয়" : "Return Ticket Active"}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenReturnModal(order)}
                    className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <RotateCcw size={13} />
                    <span>{language === "bn" ? "রিটার্ন বা প্রতিস্থাপন" : "Return / Replace"}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-secondary/20 shadow-sm p-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mx-auto text-foreground/40">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-bold text-foreground text-sm">
              {language === "bn" ? "কোনো অর্ডার পাওয়া যায়নি" : "No Orders Found"}
            </h3>
            <p className="text-xs text-foreground/60">
              {language === "bn" ? "আপনি এখনো কোনো সামগ্রী অর্ডার করেননি।" : "You have not placed any orders yet."}
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-2xl shadow-sm hover:bg-primary/90 transition-all"
            >
              {language === "bn" ? "বিপণীতে কেনাকাটা করুন" : "Browse Ashram Store"}
            </Link>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: RETURN & REPLACEMENT REQUEST */}
      {/* ========================================================= */}
      {returnOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-secondary/30 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <RotateCcw size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-foreground">
                    {language === "bn" ? "পণ্য ফেরত বা পরিবর্তনের আবেদন" : "Return / Replacement Request"}
                  </h3>
                  <span className="text-[10px] font-mono text-foreground/60">Order #{returnOrder.id}</span>
                </div>
              </div>
              <button onClick={() => setReturnOrder(null)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitReturn} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">
                  {language === "bn" ? "ফেরতের কারণ নির্বাচন করুন:" : "Select Reason for Return:"}
                </label>
                <select
                  value={returnReason}
                  onChange={e => setReturnReason(e.target.value)}
                  className="w-full bg-white border border-secondary/25 rounded-xl p-2.5 focus:outline-none focus:border-primary font-medium"
                >
                  <option value="Damaged in transit">Damaged in transit / পরিবহনে ক্ষতিগ্রস্ত</option>
                  <option value="Defective printing in book">Defective printing or binding / মুদ্রণ বা বাঁধাই ত্রুটি</option>
                  <option value="Wrong item received">Wrong item received / ভুল সামগ্রী এসেছে</option>
                  <option value="Quality issue or mismatch">Quality issue / গুণমান সন্তোষজনক নয়</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">
                  {language === "bn" ? "পছন্দের সমাধান (Preferred Resolution):" : "Preferred Resolution:"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReturnResolution("replacement")}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      returnResolution === "replacement"
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-white border-secondary/25 text-foreground/70"
                    }`}
                  >
                    {language === "bn" ? "নতুন প্রতিস্থাপন (Replace)" : "Replacement Item"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setReturnResolution("refund")}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      returnResolution === "refund"
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-white border-secondary/25 text-foreground/70"
                    }`}
                  >
                    {language === "bn" ? "মূল্য ফেরত (UPI Refund)" : "Full Refund"}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">
                  {language === "bn" ? "সমস্যার সংক্ষিপ্ত বিবরণ (ঐচ্ছিক):" : "Details & Description (Optional):"}
                </label>
                <textarea
                  rows={3}
                  placeholder={language === "bn" ? "ক্ষতিগ্রস্ত অংশের বিবরণ লিখুন..." : "Describe the damage or defect..."}
                  value={returnComments}
                  onChange={e => setReturnComments(e.target.value)}
                  className="w-full bg-white border border-secondary/25 rounded-xl p-2.5 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40 text-[10px] text-amber-900 dark:text-amber-200">
                <span className="font-bold block mb-0.5">
                  {language === "bn" ? "📌 রিটার্ন নিয়মাবলী:" : "📌 Return Policy Reminder:"}
                </span>
                {language === "bn" 
                  ? "আবেদন গৃহীত হওয়ার পর বিনামূল্যে পিকআপ ব্যবস্থা করা হবে। ফেরত সামগ্রী পৌঁছানোর ২৪-৪৮ ঘণ্টার মধ্যে প্রতিস্থাপন বা রিফান্ড সম্পন্ন হবে।"
                  : "Free doorstep pickup will be arranged. Refund or replacement will be processed within 24-48 hours after receiving the product."}
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Check size={16} />
                <span>{language === "bn" ? "আবেদন জমা দিন (Submit Request)" : "Submit Return Request"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RETURN TERMS & CONDITIONS (শর্তাবলী) */}
      {/* ========================================================= */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-secondary/30 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldAlert size={16} />
                </div>
                <h3 className="font-extrabold text-sm text-foreground">
                  {language === "bn" ? "রিটার্ন ও রিফান্ড নীতি এবং শর্তাবলী" : "Return & Refund Policy Terms"}
                </h3>
              </div>
              <button onClick={() => setShowTermsModal(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-foreground/80">
              {/* Clause 1 */}
              <div className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-xs space-y-1">
                <h4 className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center font-bold">1</span>
                  {language === "bn" ? "৭ দিনের রিটার্ন সুবিধা" : "7-Day Return Window"}
                </h4>
                <p className="text-[11px] text-foreground/70">
                  {language === "bn" 
                    ? "পণ্য প্রাপ্তির দিন থেকে পরবর্তী ৭ দিনের মধ্যে যে কোনো ক্ষতিগ্রস্ত বা ত্রুটিপূর্ণ সামগ্রী ফেরত বা পরিবর্তনের আবেদন করা যাবে।"
                    : "Devotees can request return or replacement for damaged, defective, or incorrect products within 7 calendar days of delivery."}
                </p>
              </div>

              {/* Clause 2 */}
              <div className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-xs space-y-1">
                <h4 className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center font-bold">2</span>
                  {language === "bn" ? "গ্রহণযোগ্য পণ্যসমূহ (Eligible Items)" : "Eligible Products"}
                </h4>
                <p className="text-[11px] text-foreground/70">
                  {language === "bn"
                    ? "শাস্ত্রগ্রন্থ (কথামৃত/জীবনী) বাঁধাই বা পৃষ্ঠা অনুপস্থিতি, পূজার পেতলের সামগ্রী বা ফটো ফ্রেম পরিবহনে ক্ষতিগ্রস্ত হলে সরাসরি সম্পূর্ণ প্রতিস্থাপনযোগ্য।"
                    : "Books with missing pages/binding defects, damaged framed photos, brass puja articles damaged in transit are fully eligible."}
                </p>
              </div>

              {/* Clause 3 */}
              <div className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-xs space-y-1">
                <h4 className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center font-bold">3</span>
                  {language === "bn" ? "অফেরতযোগ্য সামগ্রী (Non-Returnable)" : "Non-Returnable Items"}
                </h4>
                <p className="text-[11px] text-foreground/70">
                  {language === "bn"
                    ? "পবিত্রতা ও ধর্মীয় অনুশাসনের কারণে খোলা প্রসাদ, চন্দন কাঠ বা একবার ব্যবহৃত ধূপকাঠি ফেরতযোগ্য নয়।"
                    : "For sanctity, consecrated Prasad and opened consumable items cannot be returned once unsealed."}
                </p>
              </div>

              {/* Clause 4 */}
              <div className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-xs space-y-1">
                <h4 className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center font-bold">4</span>
                  {language === "bn" ? "রিফান্ড পরিশোধের সময়সীমা" : "Refund Processing (24-48 Hrs)"}
                </h4>
                <p className="text-[11px] text-foreground/70">
                  {language === "bn"
                    ? "রিটার্ন যাচাইকরণের পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে গ্রাহকের মূল UPI বা ব্যাঙ্ক অ্যাকাউন্টে সম্পূর্ণ মূল্য স্বয়ংক্রিয়ভাবে জমা হবে।"
                    : "Refunds are processed within 24 to 48 hours directly to the devotee's original UPI ID / Bank account."}
                </p>
              </div>

              {/* Helpline Contact */}
              <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20 flex items-center gap-2.5">
                <PhoneCall size={18} className="text-primary flex-shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-foreground block">
                    {language === "bn" ? "আশ্রম সেবা হেল্পলাইন:" : "Ashram Support Helpline:"}
                  </span>
                  <span className="font-mono text-primary font-bold">+91 8918501779</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold text-xs shadow-md hover:bg-primary/90 transition-all"
            >
              {language === "bn" ? "বুঝেছি (Close)" : "I Understand"}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* INVOICE MODAL / PRINTABLE DETAIL VIEW */}
      {/* ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl relative">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground p-1 text-lg font-bold print:hidden"
            >
              ✕
            </button>

            <div id="printable-order-receipt" className="pt-2">
              <div className="flex items-center gap-3 border-b border-secondary/20 pb-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-secondary/20 relative shadow-sm flex-shrink-0">
                  <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">করুণাময়ী মা সারদা</h3>
                  <p className="text-[10px] text-foreground/60">ট্যাক্স ইনভয়েস ও ক্যাশ মেমো</p>
                </div>
              </div>

              <div className="bg-secondary/10 p-3 rounded-xl mb-4 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground/60">ইনভয়েস নম্বর:</span>
                  <span className="font-mono font-bold text-foreground">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">তারিখ:</span>
                  <span className="font-medium text-foreground">{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">ট্র্যাকিং নম্বর:</span>
                  <span className="font-mono font-bold text-primary">{selectedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">গ্রাহক:</span>
                  <span className="font-bold text-foreground">{selectedOrder.customer.name} ({selectedOrder.customer.phone})</span>
                </div>
              </div>

              <table className="w-full text-xs mb-4">
                <thead>
                  <tr className="border-b border-secondary/20 text-foreground/60 text-[10px] uppercase">
                    <th className="text-left py-1.5">আইটেম</th>
                    <th className="text-center py-1.5">পরিমাণ</th>
                    <th className="text-right py-1.5">মূল্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/10">
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2 font-medium">{item.product.name}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2 font-bold">₹{item.product.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-secondary/20">
                    <td colSpan={2} className="py-2 font-bold text-foreground text-right">সর্বমোট:</td>
                    <td className="py-2 font-extrabold text-primary text-right text-sm">₹{selectedOrder.total}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="flex flex-col items-center justify-center p-2.5 bg-secondary/5 rounded-xl border border-dashed border-secondary/20 mb-4 text-center">
                <span className="text-[9px] font-mono text-foreground/60">[OFFICIAL VERIFIED PURCHASE]</span>
                <p className="text-[10px] text-emerald-700 font-bold mt-0.5">পেমেন্ট সফল হয়েছে ({selectedOrder.paymentMethod})</p>
              </div>

              <div className="space-y-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all text-xs"
                >
                  <Printer size={16} />
                  <span>রশিদ প্রিন্ট বা ডাউনলোড করুন (PDF)</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full bg-secondary/20 text-foreground py-2.5 rounded-xl font-bold hover:bg-secondary/30 transition-colors text-xs"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
