"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Plus, Check, Star, Tag, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SHOP_PRODUCTS, Product, addToCart, getStoredCart, getStoredProducts } from "@/lib/cartStore";
import ShareButton from "@/components/common/ShareButton";

export default function ShopPage() {
  const { t, language } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(SHOP_PRODUCTS);

  useEffect(() => {
    const updateCount = () => {
      const items = getStoredCart();
      const count = items.reduce((acc, curr) => acc + curr.quantity, 0);
      setCartCount(count);
    };

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    loadProducts();

    updateCount();

    window.addEventListener("cart_updated", updateCount);
    window.addEventListener("products_updated", loadProducts);
    return () => {
      window.removeEventListener("cart_updated", updateCount);
      window.removeEventListener("products_updated", loadProducts);
    };
  }, []);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <Link href="/" className="flex items-center text-foreground/60 hover:text-primary transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>{language === "bn" ? "হোম" : "Home"}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ShareButton 
            title="করুণাময়ী মা সারদা — প্রকাশনা ও বিপণী" 
            text="পবিত্র বই, রুদ্রাক্ষ মালা ও পূজা সামগ্রী দেখুন:" 
            url="/shop" 
            variant="icon"
          />
          <Link 
            href="/cart" 
            className="relative p-2 bg-white border border-secondary/20 rounded-full text-foreground/80 hover:bg-secondary/10 shadow-sm transition-all flex items-center justify-center"
          >
            <ShoppingBag size={18} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scale">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Hero Title & Offer Banner */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">{t('shop.title')}</h1>
        <p className="text-foreground/60 text-xs mt-0.5">{t('shop.subtitle')}</p>
        
        {/* Festive Discount Banner */}
        <div className="mt-3 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-primary/15 border border-amber-500/30 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0">
              <Tag size={18} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-foreground flex items-center gap-1">
                <span>বিশেষ ভক্তিমূলক ছাড় — ২৫% পর্যন্ত সাশ্রয়!</span>
              </p>
              <p className="text-[10px] text-foreground/60">কুপন কোড ব্যবহার করুন: <span className="font-mono font-bold text-primary">SARADA10</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3.5 scrollbar-hide -mx-4 px-4">
        <button 
          onClick={() => setActiveCategory("all")} 
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === "all" ? "bg-primary text-white shadow-sm" : "bg-secondary/15 text-foreground/70 hover:bg-secondary/25"
          }`}
        >
          {t('shop.filter.all')}
        </button>
        <button 
          onClick={() => setActiveCategory("books")} 
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === "books" ? "bg-primary text-white shadow-sm" : "bg-secondary/15 text-foreground/70 hover:bg-secondary/25"
          }`}
        >
          {t('shop.filter.books')}
        </button>
        <button 
          onClick={() => setActiveCategory("puja")} 
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === "puja" ? "bg-primary text-white shadow-sm" : "bg-secondary/15 text-foreground/70 hover:bg-secondary/25"
          }`}
        >
          {t('shop.filter.puja')}
        </button>
        <button 
          onClick={() => setActiveCategory("photos")} 
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === "photos" ? "bg-primary text-white shadow-sm" : "bg-secondary/15 text-foreground/70 hover:bg-secondary/25"
          }`}
        >
          {t('shop.filter.photos')}
        </button>
        <button 
          onClick={() => setActiveCategory("prasad")} 
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === "prasad" ? "bg-primary text-white shadow-sm" : "bg-secondary/15 text-foreground/70 hover:bg-secondary/25"
          }`}
        >
          {language === "bn" ? "প্রসাদী ও উত্তরীয়" : "Prasad & Silk"}
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {filteredProducts.map(product => {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          const isAdded = addedId === product.id;

          return (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-secondary/20 flex flex-col hover:border-primary/40 transition-all group relative"
            >
              {/* Discount Badge & Share */}
              <div className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                -{discountPercent}% {language === "bn" ? "ছাড়" : "OFF"}
              </div>

              <div className="absolute top-2 right-2 z-10">
                <ShareButton
                  title={product.name}
                  text={`করুণাময়ী মা সারদা বিপণী — ${product.name} (${product.price}):`}
                  url={`/shop`}
                  variant="icon"
                  className="w-7 h-7"
                />
              </div>

              {/* Product Image */}
              <div className="aspect-square relative bg-secondary/10 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>

              {/* Details */}
              <div className="p-3 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-foreground/50 font-bold uppercase tracking-wider">
                    {product.categoryName}
                  </span>
                  <div className="flex items-center text-[10px] text-amber-500 font-bold gap-0.5">
                    <Star size={11} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h2 className="text-xs font-bold text-foreground mb-2 line-clamp-2 leading-snug flex-1">
                  {language === "bn" ? product.name : product.nameEn}
                </h2>

                {/* Price and Discount */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-secondary/10">
                  <div>
                    <span className="text-[11px] text-foreground/40 line-through block leading-none">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-primary font-extrabold text-sm leading-tight">
                      ₹{product.price}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleAdd(product)}
                    className={`p-2 rounded-xl transition-all shadow-sm flex items-center justify-center ${
                      isAdded 
                        ? "bg-emerald-600 text-white" 
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                    title="কার্টে যোগ করুন"
                  >
                    {isAdded ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
