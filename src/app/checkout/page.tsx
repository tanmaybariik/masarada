"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Printer, 
  Tag, 
  ShoppingBag, 
  CreditCard, 
  Truck,
  Check,
  ChevronRight
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getStoredCart, clearCart, saveOrder, CartItem, Order } from "@/lib/cartStore";

export default function CheckoutPage() {
  const { language } = useTranslation();
  const [items, setItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState<"address" | "payment" | "invoice">("address");

  // Form State
  const [name, setName] = useState("অর্ণব ভক্ত");
  const [phone, setPhone] = useState("+91 9876543210");
  const [email, setEmail] = useState("arnab@example.com");
  const [address, setAddress] = useState("১২, রামকৃষ্ণ মিশন রোড");
  const [city, setCity] = useState("কলকাতা");
  const [pincode, setPincode] = useState("700001");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  // Generated Order
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setItems(getStoredCart());
  }, []);

  const originalSubtotal = items.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemDiscount = originalSubtotal - subtotal;
  const shipping = subtotal >= 500 || items.length === 0 ? 0 : 40;
  const totalAmount = Math.max(0, subtotal - couponDiscount + shipping);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "SARADA10") {
      const discount = Math.round(subtotal * 0.10);
      setCouponDiscount(discount);
      setAppliedCoupon(code);
      setCouponMsg(language === "bn" ? "কুপন প্রযোজ্য হয়েছে! ১০% অতিরিক্ত ছাড়।" : "SARADA10 Applied! 10% Extra Discount.");
    } else if (code === "MA15" || code === "ANANDA20") {
      const discount = Math.round(subtotal * 0.15);
      setCouponDiscount(discount);
      setAppliedCoupon(code);
      setCouponMsg(language === "bn" ? "কুপন প্রযোজ্য হয়েছে! ১৫% অতিরিক্ত ছাড়।" : `${code} Applied! 15% Extra Discount.`);
    } else {
      setCouponDiscount(0);
      setAppliedCoupon(null);
      setCouponMsg(language === "bn" ? "ভুল কুপন কোড!" : "Invalid coupon code!");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `KMS-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleString(language === "bn" ? "bn-BD" : "en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      }),
      items: [...items],
      subtotal,
      discount: itemDiscount,
      couponDiscount,
      shipping,
      total: totalAmount,
      customer: {
        name,
        phone,
        email,
        address,
        city,
        pincode
      },
      paymentMethod: paymentMethod === "upi" ? "UPI / Online" : paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery (COD)",
      status: "confirmed",
      statusText: "অর্ডার নিশ্চিত হয়েছে (Order Confirmed)",
      trackingNumber: `KMS-TRK-${Date.now().toString().slice(-6)}`
    };

    saveOrder(newOrder); // Keep local for guest checkout viewing
    try {
      await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });
    } catch(err) {
      console.error("Failed to save order to server", err);
    }

    setGeneratedOrder(newOrder);
    clearCart();
    setStep("invoice");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24">
      {/* Top Header */}
      {step !== "invoice" && (
        <div className="flex items-center justify-between mb-5">
          <Link 
            href={step === "payment" ? "#" : "/cart"} 
            onClick={() => step === "payment" && setStep("address")}
            className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs font-bold"
          >
            <ArrowLeft size={18} className="mr-1.5" />
            <span>{step === "payment" ? "ঠিকানা পরিবর্তন" : "কার্টে ফিরে যান"}</span>
          </Link>
          <div className="flex items-center gap-1 text-[10px] font-bold text-foreground/60 uppercase">
            <span className={step === "address" ? "text-primary font-extrabold" : ""}>১. ঠিকানা</span>
            <span>→</span>
            <span className={step === "payment" ? "text-primary font-extrabold" : ""}>২. পেমেন্ট ও ইনভয়েস</span>
          </div>
        </div>
      )}

      {/* Step 1: Address */}
      {step === "address" && (
        <form onSubmit={() => setStep("payment")} className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{language === "bn" ? "ডেলিভারি ঠিকানা" : "Delivery Address"}</h1>
            <p className="text-foreground/60 text-xs mt-0.5">{language === "bn" ? "আপনার সঠিক নাম ও ঠিকানা পূরণ করুন" : "Enter your shipping details"}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-secondary/20 shadow-sm space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-foreground/70 uppercase mb-1">পূর্ণ নাম *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                placeholder="উদাঃ অর্ণব ভক্ত" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-foreground/70 uppercase mb-1">ফোন নম্বর *</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                placeholder="+91..." 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-foreground/70 uppercase mb-1">ইমেইল (ইনভয়েসের জন্য)</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                placeholder="arnab@example.com" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-foreground/70 uppercase mb-1">সম্পূর্ণ ঠিকানা *</label>
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl border border-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                placeholder="বাড়ি নম্বর, রাস্তা, এলাকা..." 
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-foreground/70 uppercase mb-1">শহর / জেলা *</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  required 
                  className="w-full px-3.5 py-2 rounded-xl border border-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-foreground/70 uppercase mb-1">পিন কোড *</label>
                <input 
                  type="text" 
                  value={pincode} 
                  onChange={(e) => setPincode(e.target.value)} 
                  required 
                  className="w-full px-3.5 py-2 rounded-xl border border-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <span>পরবর্তী ধাপ (পেমেন্ট ও অর্ডার)</span>
            <ChevronRight size={16} />
          </button>
        </form>
      )}

      {/* Step 2: Payment & Coupon */}
      {step === "payment" && (
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{language === "bn" ? "পেমেন্ট ও কুপন" : "Payment & Order"}</h1>
            <p className="text-foreground/60 text-xs mt-0.5">{language === "bn" ? "কুপন প্রয়োগ করুন এবং পেমেন্ট সম্পন্ন করুন" : "Apply discount coupon and pay"}</p>
          </div>

          {/* Coupon Box */}
          <div className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm">
            <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
              <Tag size={14} className="text-primary" />
              <span>ডিসকাউন্ট কুপন কোড</span>
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="উদাঃ SARADA10"
                className="flex-1 px-3 py-2 border border-secondary/30 rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button 
                type="button" 
                onClick={applyCoupon}
                className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all"
              >
                প্রয়োগ করুন
              </button>
            </div>
            {couponMsg && (
              <p className={`text-[11px] mt-2 font-semibold ${appliedCoupon ? 'text-emerald-600' : 'text-rose-600'}`}>
                {couponMsg}
              </p>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-4 rounded-2xl border border-secondary/20 shadow-sm space-y-2.5">
            <h3 className="font-bold text-xs text-foreground uppercase tracking-wider mb-2">পেমেন্ট মাধ্যম বেছে নিন</h3>

            <label 
              onClick={() => setPaymentMethod("upi")}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === "upi" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-secondary/20 bg-background"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-primary" />
                <div>
                  <span className="font-bold text-xs text-foreground block">UPI / GPay / PhonePe / Paytm</span>
                  <span className="text-[10px] text-foreground/50">তাত্ক্ষণিক পেমেন্ট ও ইনভয়েস জেনারেট</span>
                </div>
              </div>
              <input type="radio" name="pay" checked={paymentMethod === "upi"} readOnly className="accent-primary" />
            </label>

            <label 
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === "cod" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-secondary/20 bg-background"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-amber-600" />
                <div>
                  <span className="font-bold text-xs text-foreground block">ক্যাশ অন ডেলিভারি (COD)</span>
                  <span className="text-[10px] text-foreground/50">পণ্য হাতে পেয়ে মূল্য পরিশোধ</span>
                </div>
              </div>
              <input type="radio" name="pay" checked={paymentMethod === "cod"} readOnly className="accent-primary" />
            </label>
          </div>

          {/* Final Price Breakdown */}
          <div className="bg-white rounded-2xl border border-secondary/20 p-4 shadow-sm space-y-2 text-xs">
            <div className="flex justify-between text-foreground/70">
              <span>আইটেম সাবটোটাল ({items.length} টি)</span>
              <span>₹{subtotal}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>কুপন ডিসকাউন্ট ({appliedCoupon})</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-foreground/70">
              <span>ডেলিভারি চার্জ</span>
              <span>{shipping === 0 ? <strong className="text-emerald-600 uppercase text-[10px]">FREE</strong> : `₹${shipping}`}</span>
            </div>
            <div className="border-t-2 border-secondary/20 pt-2 flex justify-between font-extrabold text-foreground text-sm">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-primary text-base">₹{totalAmount}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            <span>অর্ডার নিশ্চিত করুন ও ইনভয়েস তৈরি করুন (₹{totalAmount})</span>
          </button>
        </form>
      )}

      {/* Step 3: Generated Order Bill & Invoice (রশিদ) */}
      {step === "invoice" && generatedOrder && (
        <div className="space-y-4">
          <div id="printable-shop-invoice" className="bg-white rounded-2xl border border-secondary/30 shadow-lg p-5 overflow-hidden">
            {/* Header with Organization Logo */}
            <div className="flex items-center justify-between border-b border-secondary/20 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-secondary/20 relative shadow-sm">
                  <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground leading-tight">করুণাময়ী মা সারদা</h2>
                  <p className="text-[10px] text-foreground/60">অফিসিয়াল বিপণী ট্যাক্স ইনভয়েস ও রশিদ</p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  CONFIRMED
                </span>
                <p className="text-[10px] font-mono text-foreground/50 mt-1">{generatedOrder.id}</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-secondary/5 p-3 rounded-xl mb-4 border border-secondary/10">
              <div>
                <p className="text-foreground/50 text-[10px] uppercase font-bold">ক্রেতার বিবরণ:</p>
                <p className="font-bold text-foreground mt-0.5">{generatedOrder.customer.name}</p>
                <p className="text-[11px] text-foreground/70">{generatedOrder.customer.phone}</p>
                <p className="text-[10px] text-foreground/60 mt-0.5">{generatedOrder.customer.address}, {generatedOrder.customer.city} - {generatedOrder.customer.pincode}</p>
              </div>
              <div className="text-right">
                <p className="text-foreground/50 text-[10px] uppercase font-bold">তারিখ ও ট্র্যাকিং:</p>
                <p className="font-medium text-foreground mt-0.5">{generatedOrder.date}</p>
                <p className="text-[10px] font-mono text-primary mt-1 font-bold">TRK: {generatedOrder.trackingNumber}</p>
                <p className="text-[10px] text-foreground/60 mt-0.5">পদ্ধতি: {generatedOrder.paymentMethod}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-xs mb-4">
              <thead>
                <tr className="border-b border-secondary/20 text-foreground/60 text-[10px] uppercase">
                  <th className="text-left py-1.5">আইটেম</th>
                  <th className="text-center py-1.5">পরিমাণ</th>
                  <th className="text-right py-1.5">দর</th>
                  <th className="text-right py-1.5">মোট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {generatedOrder.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2 font-medium text-foreground">{item.product.name}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">₹{item.product.price}</td>
                    <td className="text-right py-2 font-bold">₹{item.product.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-secondary/20">
                  <td colSpan={3} className="py-1 text-right text-foreground/70">সাবটোটাল:</td>
                  <td className="py-1 text-right font-medium">₹{generatedOrder.subtotal}</td>
                </tr>
                {generatedOrder.couponDiscount > 0 && (
                  <tr>
                    <td colSpan={3} className="py-0.5 text-right text-emerald-600 font-medium">কুপন ডিসকাউন্ট:</td>
                    <td className="py-0.5 text-right text-emerald-600 font-bold">-₹{generatedOrder.couponDiscount}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={3} className="py-0.5 text-right text-foreground/70">ডেলিভারি চার্জ:</td>
                  <td className="py-0.5 text-right font-medium">{generatedOrder.shipping === 0 ? "FREE" : `₹${generatedOrder.shipping}`}</td>
                </tr>
                <tr className="border-t-2 border-secondary/20">
                  <td colSpan={3} className="py-2 font-bold text-foreground text-right">সর্বমোট প্রদেয়:</td>
                  <td className="py-2 font-extrabold text-primary text-right text-sm">₹{generatedOrder.total}</td>
                </tr>
              </tfoot>
            </table>

            {/* Tracking Barcode & Status Banner */}
            <div className="flex flex-col items-center justify-center p-3 bg-secondary/10 rounded-xl border border-dashed border-secondary/30 mb-2 text-center">
              <span className="font-mono text-xs font-bold text-foreground tracking-widest">[BARCODE: {generatedOrder.trackingNumber}]</span>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">
                স্ট্যাটাস: অর্ডার প্রস্তুত করা হচ্ছে (Processing & Packaging)
              </p>
            </div>

            <p className="text-[9px] text-center text-foreground/40 mt-3">
              জয় মা সারদা • করুণাময়ী মা সারদা প্রকাশনা ও সেবা ট্রাস্ট
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all text-xs"
            >
              <Printer size={16} />
              <span>ইনভয়েস প্রিন্ট বা ডাউনলোড করুন (PDF)</span>
            </button>

            <Link
              href="/account/orders"
              className="block text-center w-full bg-secondary/20 text-foreground py-3 rounded-xl font-bold hover:bg-secondary/30 transition-colors text-xs"
            >
              আমার অর্ডার সেকশনে স্ট্যাটাস দেখুন (My Orders)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
