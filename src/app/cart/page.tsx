"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getStoredCart, updateCartQuantity, removeCartItem, CartItem } from "@/lib/cartStore";

export default function CartPage() {
  const { language } = useTranslation();
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadCart = () => {
    setItems(getStoredCart());
  };

  useEffect(() => {
    setMounted(true);
    loadCart();
    window.addEventListener("cart_updated", loadCart);
    return () => window.removeEventListener("cart_updated", loadCart);
  }, []);

  const handleUpdate = (id: string, delta: number) => {
    updateCartQuantity(id, delta);
  };

  const handleRemove = (id: string) => {
    removeCartItem(id);
  };

  if (!mounted) return null;

  const originalSubtotal = items.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalSavings = originalSubtotal - subtotal;
  const shipping = subtotal >= 500 || items.length === 0 ? 0 : 40;
  const grandTotal = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen max-w-md md:max-w-2xl w-full mx-auto bg-background p-4 pt-6 pb-28 md:pb-6">
      <div className="flex items-center justify-between mb-5">
        <Link href="/shop" className="flex items-center text-foreground/60 hover:text-primary transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>{language === "bn" ? "বিপণীতে ফিরে যান" : "Back to Shop"}</span>
        </Link>
        <span className="text-xs font-bold text-foreground/60 bg-secondary/15 px-3 py-1 rounded-full">
          {items.reduce((acc, curr) => acc + curr.quantity, 0)} {language === "bn" ? "আইটেম" : "Items"}
        </span>
      </div>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">{language === "bn" ? "শপিং কার্ট" : "Shopping Cart"}</h1>
        <p className="text-foreground/60 text-xs mt-0.5">
          {language === "bn" ? "আপনার নির্বাচিত পবিত্র সামগ্রী সমূহ" : "Review your selected sacred items"}
        </p>
      </div>

      {/* Savings Alert */}
      {totalSavings > 0 && items.length > 0 && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl flex items-center justify-between text-xs shadow-sm">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles size={16} className="text-emerald-600" />
            {language === "bn" ? `আপনি মোট ₹${totalSavings} সাশ্রয় করছেন!` : `You are saving ₹${totalSavings} on this order!`}
          </span>
          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full uppercase">
            DISCOUNT
          </span>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3.5 mb-6">
        {items.map(item => (
          <div key={item.product.id} className="bg-white rounded-2xl border border-secondary/20 p-3.5 flex gap-3 shadow-sm hover:border-primary/30 transition-all">
            <div className="w-20 h-20 bg-secondary/10 rounded-xl overflow-hidden relative flex-shrink-0">
              <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
            </div>

            <div className="flex flex-col justify-between flex-1 py-0.5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-foreground/40 uppercase">{item.product.categoryName}</span>
                  <h3 className="font-bold text-xs text-foreground line-clamp-2 leading-snug">
                    {language === "bn" ? item.product.name : item.product.nameEn}
                  </h3>
                </div>
                <button 
                  onClick={() => handleRemove(item.product.id)} 
                  className="text-foreground/40 hover:text-rose-500 p-1 transition-colors"
                  title="মুছে ফেলুন"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex justify-between items-center mt-2 pt-1 border-t border-secondary/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-primary font-extrabold text-sm">₹{item.product.price}</span>
                  <span className="text-[10px] text-foreground/40 line-through">₹{item.product.originalPrice}</span>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2 bg-secondary/10 rounded-lg px-2 py-1 border border-secondary/20">
                  <button 
                    onClick={() => handleUpdate(item.product.id, -1)} 
                    className="text-foreground/70 hover:text-foreground p-0.5"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => handleUpdate(item.product.id, 1)} 
                    className="text-foreground/70 hover:text-foreground p-0.5"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-secondary/20 shadow-sm p-6">
            <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-3 text-foreground/40">
              <ShoppingBag size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-1">{language === "bn" ? "কার্ট খালি!" : "Your cart is empty"}</h3>
            <p className="text-xs text-foreground/60 mb-5">{language === "bn" ? "বিপণী থেকে আপনার পছন্দের সামগ্রী যোগ করুন।" : "Add items from the store to proceed."}</p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-primary/90 transition-all"
            >
              {language === "bn" ? "কেনাকাটা শুরু করুন" : "Start Shopping"}
            </Link>
          </div>
        )}
      </div>

      {/* Bill Breakdown */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-secondary/20 p-4 shadow-sm space-y-2.5 text-xs mb-4">
          <h4 className="font-bold text-foreground text-sm border-b border-secondary/15 pb-2">
            {language === "bn" ? "বিল সংক্ষেপ" : "Price Details"}
          </h4>

          <div className="flex justify-between text-foreground/70">
            <span>{language === "bn" ? "মূল মূল্য (এমআরপি)" : "Total MRP"}</span>
            <span className="line-through">₹{originalSubtotal}</span>
          </div>

          <div className="flex justify-between text-emerald-600 font-bold">
            <span>{language === "bn" ? "বিশেষ ছাড় সাশ্রয়" : "Special Discount"}</span>
            <span>-₹{totalSavings}</span>
          </div>

          <div className="flex justify-between text-foreground/70">
            <span>{language === "bn" ? "ডেলিভারি চার্জ" : "Delivery Charge"}</span>
            <span>
              {shipping === 0 ? (
                <span className="text-emerald-600 font-bold uppercase text-[11px]">{language === "bn" ? "বিনামূল্যে (Free)" : "FREE"}</span>
              ) : (
                `₹${shipping}`
              )}
            </span>
          </div>

          <div className="border-t-2 border-secondary/20 pt-2.5 flex justify-between font-extrabold text-sm text-foreground">
            <span>{language === "bn" ? "সর্বমোট প্রদেয়" : "Grand Total"}</span>
            <span className="text-primary text-base">₹{grandTotal}</span>
          </div>
        </div>
      )}

      {/* Fixed Checkout Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-secondary/20 max-w-md mx-auto z-40 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] text-foreground/50">{language === "bn" ? "মোট প্রদেয় পরিমাণ" : "Total Amount"}</p>
              <p className="text-lg font-extrabold text-primary leading-tight">₹{grandTotal}</p>
            </div>
            <Link
              href="/checkout"
              className="bg-primary text-white py-3 px-6 rounded-xl font-bold flex items-center gap-2 shadow-md hover:bg-primary/90 transition-all text-xs"
            >
              <span>{language === "bn" ? "চেকআউট ও পেমেন্ট" : "Proceed to Checkout"}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
