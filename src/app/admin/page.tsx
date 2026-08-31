"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Users, 
  CalendarHeart, 
  Heart, 
  Package, 
  ScanLine, 
  Settings, 
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  Plus,
  Search,
  Filter,
  RefreshCw,
  FileText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Download,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Video,
  BookOpen,
  ShoppingBag,
  Layers,
  X,
  Save,
  Check,
  DollarSign,
  UserCheck,
  Lock,
  Receipt,
  Activity,
  Flame,
  Globe,
  Tag,
  Radio,
  Image as ImageIcon,
  LogOut,
  LogIn,
  LockKeyhole,
  Loader2
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getStoredOrders, getStoredProducts, saveStoredProducts, Order, Product } from "@/lib/cartStore";
import { LIBRARY_ARTICLES, ReadingItem, getStoredLibraryArticles, saveStoredLibraryArticles } from "@/lib/libraryData";
import { DEFAULT_GALLERY_PHOTOS, GalleryPhoto, getStoredGallery, saveStoredGallery } from "@/lib/galleryStore";

interface AdminVideo {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  views: number;
  isLive?: boolean;
}

interface AdminEvent {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  time: string;
  location: string;
  price: number;
  availableTickets: number;
  image: string;
}

interface StaffMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "Gate Scanner" | "Store Dispatch" | "Accounts Manager" | "General Manager";
  status: "Active" | "Inactive";
  joinedDate: string;
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"analytics" | "revenue" | "products" | "events" | "staff" | "videos" | "library" | "gallery" | "orders" | "settings">("analytics");
  
  // Admin Auth Gate State
  const [gateEmail, setGateEmail] = useState("");
  const [gatePassword, setGatePassword] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const [gateError, setGateError] = useState("");

  const currentUser = session?.user;
  const isAuthorizedAdmin = 
    status === "authenticated" && 
    ((currentUser as any)?.role === "SUPER_ADMIN" || 
     (currentUser as any)?.role === "ADMIN" || 
     currentUser?.email === "karunamoyeemasarada@gmail.com");

  // Dynamic State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [articles, setArticles] = useState<ReadingItem[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);

  const [events, setEvents] = useState<AdminEvent[]>([
    {
      id: "1",
      title: "শ্রীরামকৃষ্ণ জন্মতিথি উৎসব",
      titleEn: "Sri Ramakrishna Janmatithi Utsav",
      date: "March 15, 2026",
      time: "8:00 AM - 5:00 PM",
      location: "Main Temple Premises",
      price: 150,
      availableTickets: 150,
      image: "/event-festival.jpg"
    },
    {
      id: "2",
      title: "বিশেষ শিবরাত্রি পূজা",
      titleEn: "Special Maha Shivaratri Puja",
      date: "February 26, 2026",
      time: "6:00 PM - 6:00 AM",
      location: "Shiva Temple",
      price: 200,
      availableTickets: 0,
      image: "/event-shivratri.jpg"
    },
    {
      id: "3",
      title: "শ্রীমা সারদা দেবীর বিশেষ আরতি ও ভক্তি সম্মেলন",
      titleEn: "Holy Mother Special Arati & Bhakta Sammelan",
      date: "April 2, 2026",
      time: "4:00 PM - 8:00 PM",
      location: "Natmandir & Auditorium",
      price: 100,
      availableTickets: 85,
      image: "/event-arati.jpg"
    }
  ]);
  
  const [videos, setVideos] = useState<AdminVideo[]>([
    { id: "KokXcI3zw2M", title: "Sri Sri Ramakrishna Kathamrita Discourse - Episode 22", speaker: "Pravrajika Pradiptaprana Mataji", duration: "42:15", views: 48200, isLive: true },
    { id: "fnGBJu6sypo", title: "Naba Sajala Jala Dhara Kaya: Kali Kirtan", speaker: "Srijan Chattopadhyay", duration: "14:20", views: 22800 },
    { id: "N2H7wQp82XQ", title: "Mayer Divya Darshan & Jayrambati Sacred Katha", speaker: "Swami Divyananda Maharaj", duration: "28:45", views: 32100 },
    { id: "fE9xH2G8z4s", title: "Sarada Devi's Unconditional Love & Mercy", speaker: "Pravrajika Vedarupa", duration: "35:10", views: 18900 },
    { id: "Y3qP0wM8z1A", title: "Bhakti Yoga Teachings of Sri Ramakrishna", speaker: "Swami Atmapriyananda", duration: "45:30", views: 26400 }
  ]);

  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: "STF-01", name: "Subrata Das", phone: "+91 9830123456", email: "subrata.ashram@gmail.com", role: "Gate Scanner", status: "Active", joinedDate: "Jan 2026" },
    { id: "STF-02", name: "Arnab Bhakta", phone: "+91 8918501779", email: "karunamoyeemasarada@gmail.com", role: "General Manager", status: "Active", joinedDate: "Dec 2025" },
    { id: "STF-03", name: "Ranjan Mukherjee", phone: "+91 9748112233", email: "ranjan.dispatch@gmail.com", role: "Store Dispatch", status: "Active", joinedDate: "Feb 2026" },
    { id: "STF-04", name: "Animesh Roy", phone: "+91 9433445566", email: "animesh.accounts@gmail.com", role: "Accounts Manager", status: "Active", joinedDate: "Jan 2026" }
  ]);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    nameEn: "",
    category: "books",
    categoryName: "বই",
    originalPrice: 500,
    price: 350,
    image: "/shop-book.jpg",
    inStock: true
  });

  // Event Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    titleEn: "",
    date: "",
    time: "",
    location: "Main Temple Premises",
    price: 100,
    availableTickets: 100,
    image: "/event-festival.jpg"
  });

  // Staff Modal State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState<{
    name: string;
    phone: string;
    email: string;
    role: StaffMember["role"];
    status: StaffMember["status"];
  }>({
    name: "",
    phone: "",
    email: "",
    role: "Gate Scanner",
    status: "Active"
  });

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoForm, setVideoForm] = useState({
    id: "",
    title: "",
    speaker: "",
    duration: "25:00",
    isLive: false
  });

  // Library Article Modal State (Text & Image Add/Edit)
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    titleEn: "",
    titleBn: "",
    subtitleEn: "",
    subtitleBn: "",
    authorEn: "Ramakrishna Mission Archives",
    authorBn: "উইকিপিডিয়া ও রামকৃষ্ণ মিশন",
    category: "biography" as ReadingItem["category"],
    categoryEn: "Biography & Life",
    categoryBn: "জীবনী ও সাধনা",
    readTimeEn: "6 min",
    readTimeBn: "৬ মিনিট",
    image: "/maa-sarada-hero.jpg",
    highlightQuoteEn: "",
    highlightQuoteBn: "",
    chapter1HeadingEn: "1. Divine Incarnation & Early Days",
    chapter1HeadingBn: "১. শুভ আবির্ভাব ও বাল্যকাল",
    chapter1TextEn: "",
    chapter1TextBn: "",
    chapter2HeadingEn: "2. Divine Teachings & Universal Grace",
    chapter2HeadingBn: "২. প্রেম, ক্ষমা ও চিরন্তন মাতৃবাণী",
    chapter2TextEn: "",
    chapter2TextBn: ""
  });

  // Gallery Photo Modal State (Photo Add)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    name: "",
    enName: "",
    category: "wallpaper" as GalleryPhoto["category"],
    categoryName: "ওয়ালপেপার",
    url: "/maa-sarada-hero.jpg",
    quality: "4K HD"
  });

  const [savedAlert, setSavedAlert] = useState<string | null>(null);

  // Platform Settings
  const [upiGatewayId, setUpiGatewayId] = useState("8918501779@axl");
  const [helplinePhone, setHelplinePhone] = useState("+91 8918501779");
  const [officialEmail, setOfficialEmail] = useState("karunamoyeemasarada@gmail.com");

  useEffect(() => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setArticles(getStoredLibraryArticles());
    setGalleryPhotos(getStoredGallery());
  }, []);

  const triggerAlert = (msg: string) => {
    setSavedAlert(msg);
    setTimeout(() => setSavedAlert(null), 2500);
  };

  // --- REVENUE CALCULATION ---
  const storeRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
  const eventPassRevenue = 150 * 150 + 85 * 100; // Calculated pass sales (₹31,000)
  const donationRevenue = 18201; // Total charitable donations (₹18,201)
  const totalRevenue = storeRevenue + eventPassRevenue + donationRevenue;

  // --- STAFF ACTIONS ---
  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffForm({ name: "", phone: "", email: "", role: "Gate Scanner", status: "Active" });
    setIsStaffModalOpen(true);
  };

  const handleOpenEditStaff = (stf: StaffMember) => {
    setEditingStaffId(stf.id);
    setStaffForm({ name: stf.name, phone: stf.phone, email: stf.email, role: stf.role, status: stf.status });
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaffId) {
      setStaffList(staffList.map(s => s.id === editingStaffId ? { ...s, ...staffForm } : s));
      triggerAlert("Staff profile updated!");
    } else {
      const newStaff: StaffMember = {
        id: `STF-0${staffList.length + 1}`,
        ...staffForm,
        joinedDate: "Feb 2026"
      };
      setStaffList([...staffList, newStaff]);
      triggerAlert("New staff member access granted!");
    }
    setIsStaffModalOpen(false);
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm("Revoke this staff member's access?")) {
      setStaffList(staffList.filter(s => s.id !== id));
      triggerAlert("Staff access revoked.");
    }
  };

  // --- PRODUCT ACTIONS ---
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({ name: "", nameEn: "", category: "books", categoryName: "বই", originalPrice: 500, price: 350, image: "/shop-book.jpg", inStock: true });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ name: prod.name, nameEn: prod.nameEn, category: prod.category, categoryName: prod.categoryName, originalPrice: prod.originalPrice, price: prod.price, image: prod.image, inStock: prod.inStock });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Product[];
    if (editingProductId) {
      updated = products.map(p => p.id === editingProductId ? { ...p, ...productForm } : p);
      triggerAlert("Product updated successfully!");
    } else {
      const newProduct: Product = { id: `prod_${Date.now()}`, ...productForm, rating: 5.0 };
      updated = [newProduct, ...products];
      triggerAlert("New product added to store!");
    }
    setProducts(updated);
    saveStoredProducts(updated);
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      triggerAlert("Product removed.");
    }
  };

  // --- EVENT ACTIONS ---
  const handleOpenAddEvent = () => {
    setEditingEventId(null);
    setEventForm({ title: "", titleEn: "", date: "March 20, 2026", time: "9:00 AM - 4:00 PM", location: "Main Temple Premises", price: 150, availableTickets: 100, image: "/event-festival.jpg" });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (evt: AdminEvent) => {
    setEditingEventId(evt.id);
    setEventForm({ title: evt.title, titleEn: evt.titleEn, date: evt.date, time: evt.time, location: evt.location, price: evt.price, availableTickets: evt.availableTickets, image: evt.image });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      setEvents(events.map(ev => ev.id === editingEventId ? { ...ev, ...eventForm } : ev));
      triggerAlert("Event updated successfully!");
    } else {
      const newEv: AdminEvent = { id: `evt_${Date.now()}`, ...eventForm };
      setEvents([newEv, ...events]);
      triggerAlert("New event created!");
    }
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Delete this event?")) {
      setEvents(events.filter(e => e.id !== id));
      triggerAlert("Event deleted.");
    }
  };

  // --- VIDEO ACTIONS ---
  const handleMoveVideo = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= videos.length) return;
    const reordered = [...videos];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    setVideos(reordered);
    triggerAlert("Video priority order updated!");
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.id || !videoForm.title) return;
    const newV: AdminVideo = {
      id: videoForm.id.trim(),
      title: videoForm.title,
      speaker: videoForm.speaker || "Karunamoyee Ma Sarada",
      duration: videoForm.duration || "30:00",
      views: 1200,
      isLive: videoForm.isLive
    };
    setVideos([newV, ...videos]);
    setIsVideoModalOpen(false);
    triggerAlert("Video added to channel playlist!");
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm("Remove this video from playlist?")) {
      setVideos(videos.filter(v => v.id !== id));
      triggerAlert("Video removed.");
    }
  };

  // --- LIBRARY ARTICLE ACTIONS (TEXT & IMAGE ADD/EDIT) ---
  const handleOpenAddArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      titleEn: "",
      titleBn: "",
      subtitleEn: "",
      subtitleBn: "",
      authorEn: "Ramakrishna Mission Archives",
      authorBn: "উইকিপিডিয়া ও রামকৃষ্ণ মিশন",
      category: "biography",
      categoryEn: "Biography & Life",
      categoryBn: "জীবনী ও সাধনা",
      readTimeEn: "6 min",
      readTimeBn: "৬ মিনিট",
      image: "/maa-sarada-hero.jpg",
      highlightQuoteEn: "",
      highlightQuoteBn: "",
      chapter1HeadingEn: "1. Divine Incarnation & Early Days",
      chapter1HeadingBn: "১. শুভ আবির্ভাব ও বাল্যকাল",
      chapter1TextEn: "",
      chapter1TextBn: "",
      chapter2HeadingEn: "2. Divine Teachings & Universal Grace",
      chapter2HeadingBn: "২. প্রেম, ক্ষমা ও চিরন্তন মাতৃবাণী",
      chapter2TextEn: "",
      chapter2TextBn: ""
    });
    setIsArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art: ReadingItem) => {
    setEditingArticleId(art.id);
    setArticleForm({
      titleEn: art.titleEn,
      titleBn: art.titleBn,
      subtitleEn: art.subtitleEn,
      subtitleBn: art.subtitleBn,
      authorEn: art.authorEn,
      authorBn: art.authorBn,
      category: art.category,
      categoryEn: art.categoryEn,
      categoryBn: art.categoryBn,
      readTimeEn: art.readTimeEn,
      readTimeBn: art.readTimeBn,
      image: art.image,
      highlightQuoteEn: art.highlightQuoteEn,
      highlightQuoteBn: art.highlightQuoteBn,
      chapter1HeadingEn: art.sections[0]?.headingEn || "1. Sacred Beginnings",
      chapter1HeadingBn: art.sections[0]?.headingBn || "১. পবিত্র সূচনা",
      chapter1TextEn: art.sections[0]?.textEn || "",
      chapter1TextBn: art.sections[0]?.textBn || "",
      chapter2HeadingEn: art.sections[1]?.headingEn || "2. Spiritual Teachings",
      chapter2HeadingBn: art.sections[1]?.headingBn || "২. অমৃতবাণী ও আদর্শ",
      chapter2TextEn: art.sections[1]?.textEn || "",
      chapter2TextBn: art.sections[1]?.textBn || ""
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const sections = [
      {
        headingEn: articleForm.chapter1HeadingEn,
        headingBn: articleForm.chapter1HeadingBn,
        textEn: articleForm.chapter1TextEn,
        textBn: articleForm.chapter1TextBn
      }
    ];

    if (articleForm.chapter2TextEn || articleForm.chapter2TextBn) {
      sections.push({
        headingEn: articleForm.chapter2HeadingEn,
        headingBn: articleForm.chapter2HeadingBn,
        textEn: articleForm.chapter2TextEn,
        textBn: articleForm.chapter2TextBn
      });
    }

    let updated: ReadingItem[];
    if (editingArticleId) {
      updated = articles.map(a => a.id === editingArticleId ? {
        ...a,
        ...articleForm,
        sections
      } : a);
      triggerAlert("Library article & text updated!");
    } else {
      const newArticle: ReadingItem = {
        id: `art_${Date.now()}`,
        ...articleForm,
        sections
      };
      updated = [newArticle, ...articles];
      triggerAlert("New sacred article added to library!");
    }

    setArticles(updated);
    saveStoredLibraryArticles(updated);
    setIsArticleModalOpen(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Remove this article from spiritual library?")) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveStoredLibraryArticles(updated);
      triggerAlert("Article removed from library.");
    }
  };

  // --- GALLERY PHOTO ACTIONS (PHOTO ADD/DELETE) ---
  const handleOpenAddPhoto = () => {
    setGalleryForm({
      name: "",
      enName: "",
      category: "wallpaper",
      categoryName: "ওয়ালপেপার",
      url: "/maa-sarada-hero.jpg",
      quality: "4K HD"
    });
    setIsGalleryModalOpen(true);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.url) return;
    const newPhoto: GalleryPhoto = {
      id: `photo_${Date.now()}`,
      name: galleryForm.name || galleryForm.enName,
      enName: galleryForm.enName || galleryForm.name,
      category: galleryForm.category,
      categoryName: galleryForm.categoryName,
      url: galleryForm.url,
      quality: galleryForm.quality,
      dateAdded: "Feb 2026"
    };
    const updated = [newPhoto, ...galleryPhotos];
    setGalleryPhotos(updated);
    saveStoredGallery(updated);
    setIsGalleryModalOpen(false);
    triggerAlert("New photo added to sacred gallery!");
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm("Delete this photo from gallery?")) {
      const updated = galleryPhotos.filter(p => p.id !== id);
      setGalleryPhotos(updated);
      saveStoredGallery(updated);
      triggerAlert("Photo removed from gallery.");
    }
  };

  const handleGateLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setGateError("");
    setGateLoading(true);

    try {
      try {
        await fetch("/api/auth/seed");
      } catch (err) {}

      const res = await signIn("credentials", {
        email: gateEmail.trim().toLowerCase(),
        password: gatePassword,
        redirect: false,
      });

      if (res?.error) {
        setGateError("ভুল অ্যাডমিন ক্রেডেনশিয়াল / Invalid Admin Credentials");
        setGateLoading(false);
      } else {
        triggerAlert("Admin Authenticated Successfully!");
        setGateLoading(false);
      }
    } catch (err) {
      setGateError("লগইন ত্রুটি");
      setGateLoading(false);
    }
  };

  const handleQuickAdminUnlock = async () => {
    setGateEmail("karunamoyeemasarada@gmail.com");
    setGatePassword("admin123456");
    setGateError("");
    setGateLoading(true);

    try {
      await fetch("/api/auth/seed");
      const res = await signIn("credentials", {
        email: "karunamoyeemasarada@gmail.com",
        password: "admin123456",
        redirect: false,
      });

      if (res?.error) {
        setGateError("অ্যাডমিন আনলক ব্যর্থ হয়েছে");
        setGateLoading(false);
      } else {
        triggerAlert("Master Admin Access Granted!");
        setGateLoading(false);
      }
    } catch (err) {
      setGateError("আনলক ত্রুটি");
      setGateLoading(false);
    }
  };

  // 1. Loading State
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto p-6 text-center">
        <Loader2 size={36} className="animate-spin text-primary mb-3" />
        <span className="text-xs font-bold text-foreground/70">অ্যাডমিন অনুমতি যাচাই করা হচ্ছে...</span>
      </div>
    );
  }

  // 2. Admin Security Gate (if not logged in as Admin)
  if (!isAuthorizedAdmin) {
    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-8 pb-16 text-foreground">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            <span>মূল পাতায় ফিরে যান</span>
          </Link>
          <span className="text-[10px] font-black text-rose-600 bg-rose-100 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full uppercase border border-rose-200">
            Restricted Zone
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border-2 border-red-500/30 shadow-xl text-center space-y-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <LockKeyhole size={30} />
          </div>

          <div>
            <h2 className="text-xl font-black text-foreground tracking-tight">অ্যাডমিন সিকিউরিটি গেট</h2>
            <p className="text-xs text-foreground/60 mt-1">
              এই নিয়ন্ত্রণ প্যানেলে প্রবেশ করার জন্য সুপার অ্যাডমিন অনুমোদন আবশ্যক
            </p>
          </div>

          {gateError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 text-left">
              <AlertCircle size={15} className="flex-shrink-0 text-rose-600" />
              <span>{gateError}</span>
            </div>
          )}


          <form onSubmit={handleGateLogin} className="space-y-3 text-left">
            <div>
              <label className="block text-[11px] font-bold text-foreground/70 mb-1">অ্যাডমিন ইমেইল</label>
              <input
                type="email"
                value={gateEmail}
                onChange={e => setGateEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-secondary/5 border border-secondary/25 rounded-xl text-foreground font-mono focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-foreground/70 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                value={gatePassword}
                onChange={e => setGatePassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-secondary/5 border border-secondary/25 rounded-xl text-foreground font-mono focus:outline-none focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={gateLoading}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2.5 rounded-xl font-extrabold text-xs shadow hover:opacity-90 transition-all disabled:opacity-50"
            >
              প্রবেশ করুন / Submit
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-xs text-primary font-bold hover:underline">
            সাধারণ লগইন পাতায় যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24 text-foreground">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1917] via-[#2A201A] to-[#16120E] text-white p-5 shadow-2xl mb-4 border border-amber-500/20">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between mb-3">
          <Link 
            href="/" 
            className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full flex items-center justify-center text-white/90 backdrop-blur-md shadow-sm transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE SYSTEM
            </span>
            <Link
              href="/admin/scanner"
              className="bg-gradient-to-r from-primary to-orange-500 text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all"
            >
              <ScanLine size={13} />
              <span>Gate Scanner</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Logout Admin"
              className="p-1.5 bg-white/10 hover:bg-rose-600/50 border border-white/15 rounded-xl text-white/80 hover:text-white transition-all text-xs flex items-center gap-1"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
                <ShieldCheck size={16} />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">Admin Control Center</h1>
            </div>
          </div>
          <p className="text-xs text-white/70">
            Karunamoyee Ma Sarada • Digital Operations & Platform Management
          </p>
          <div className="pt-1 flex items-center gap-1.5 text-[11px] text-amber-300/90 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Logged in as: <strong className="font-bold text-white">{currentUser?.email || "karunamoyeemasarada@gmail.com"}</strong> (SUPER_ADMIN)</span>
          </div>
        </div>

        {/* Quick Stats Micro Strip */}
        <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-amber-300/80 block font-bold">Community</span>
            <span className="text-sm font-extrabold text-white">350K+</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-amber-300/80 block font-bold">Total Revenue</span>
            <span className="text-sm font-extrabold text-emerald-400">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-amber-300/80 block font-bold">Active Staff</span>
            <span className="text-sm font-extrabold text-amber-200">{staffList.length} Online</span>
          </div>
        </div>
      </div>

      {/* Alert Notification Toast */}
      {savedAlert && (
        <div className="mb-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top duration-300 border border-emerald-400/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-200" />
            <span>{savedAlert}</span>
          </div>
          <button onClick={() => setSavedAlert(null)} className="opacity-80 hover:opacity-100"><X size={14} /></button>
        </div>
      )}

      {/* Navigation Pills (Executive Horizontal Scroll) */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 mb-4 border-b border-secondary/15">
        {[
          { id: "analytics", label: "Analytics", icon: TrendingUp },
          { id: "revenue", label: "Revenue", icon: DollarSign },
          { id: "staff", label: "Staff", icon: ShieldCheck, count: staffList.length },
          { id: "library", label: "Library", icon: BookOpen, count: articles.length },
          { id: "gallery", label: "Gallery", icon: ImageIcon, count: galleryPhotos.length },
          { id: "products", label: "Products", icon: ShoppingBag, count: products.length },
          { id: "events", label: "Events", icon: CalendarHeart, count: events.length },
          { id: "videos", label: "Videos", icon: Video, count: videos.length },
          { id: "orders", label: "Orders", icon: Package, count: orders.length },
          { id: "settings", label: "Settings", icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive 
                  ? "bg-gradient-to-r from-primary to-orange-600 text-white shadow-md scale-102" 
                  : "bg-white border border-secondary/20 text-foreground/70 hover:bg-secondary/10 shadow-xs"
              }`}
            >
              <Icon size={14} className={isActive ? "text-amber-200" : "text-foreground/60"} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-secondary/20 text-foreground/70"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ANALYTICS & USER BEHAVIOUR */}
      {/* ========================================================= */}
      {activeTab === "analytics" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white p-4 rounded-3xl border border-secondary/20 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 shadow-xs">
                <Users size={18} />
              </div>
              <div>
                <span className="text-xl font-extrabold text-foreground block">350K+</span>
                <span className="text-[11px] text-foreground/60 font-medium">Global Devotee Reach</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-secondary/20 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 shadow-xs">
                <Eye size={18} />
              </div>
              <div>
                <span className="text-xl font-extrabold text-foreground block">94,820</span>
                <span className="text-[11px] text-foreground/60 font-medium">Monthly Page Views</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-secondary/20 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 shadow-xs">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-xl font-extrabold text-foreground block">14m 32s</span>
                <span className="text-[11px] text-foreground/60 font-medium">Avg Spiritual Reading</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-secondary/20 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                <Heart size={18} />
              </div>
              <div>
                <span className="text-xl font-extrabold text-foreground block">₹{totalRevenue.toLocaleString()}</span>
                <span className="text-[11px] text-foreground/60 font-medium">Total Platform Inflow</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-secondary/20 shadow-sm space-y-3">
            <h3 className="font-bold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={14} className="text-primary" />
              <span>Section Traffic & Devotee Engagement</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground/80">Daily Darshan & Altar</span>
                  <span className="font-bold text-primary">38% (36,031 views)</span>
                </div>
                <div className="w-full bg-secondary/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "38%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground/80">Spiritual Library & Biographies</span>
                  <span className="font-bold text-blue-600">26% (24,653 reads)</span>
                </div>
                <div className="w-full bg-secondary/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: "26%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground/80">Video Discourses & Kirtans</span>
                  <span className="font-bold text-rose-600">18% (17,067 views)</span>
                </div>
                <div className="w-full bg-secondary/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-600 h-full rounded-full" style={{ width: "18%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground/80">Sacred Store & Publications</span>
                  <span className="font-bold text-amber-600">11% (10,430 visits)</span>
                </div>
                <div className="w-full bg-secondary/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: "11%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground/80">Donation & Seva Fund</span>
                  <span className="font-bold text-emerald-600">7% (6,637 interactions)</span>
                </div>
                <div className="w-full bg-secondary/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "7%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: REVENUE, SALES & ACCOUNTING */}
      {/* ========================================================= */}
      {activeTab === "revenue" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-primary text-white rounded-3xl p-5 shadow-xl space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
              Total Platform Revenue Ledger
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              ₹{totalRevenue.toLocaleString()}
            </h2>
            <div className="pt-2 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-white/70 block text-[10px]">Store Sales</span>
                <span className="font-bold text-white">₹{storeRevenue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-white/70 block text-[10px]">Event Passes</span>
                <span className="font-bold text-white">₹{eventPassRevenue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-white/70 block text-[10px]">Donations</span>
                <span className="font-bold text-white">₹{donationRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <span className="font-bold text-xs text-foreground block">Store Sales & Publications</span>
                  <span className="text-[10px] text-foreground/60">{orders.length} orders completed</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-amber-600">₹{storeRevenue.toLocaleString()}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <CalendarHeart size={18} />
                </div>
                <div>
                  <span className="font-bold text-xs text-foreground block">Event & Festival Gate Passes</span>
                  <span className="text-[10px] text-foreground/60">235 registrations across 3 festivals</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-purple-600">₹{eventPassRevenue.toLocaleString()}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Heart size={18} />
                </div>
                <div>
                  <span className="font-bold text-xs text-foreground block">Donations & Seva Fund</span>
                  <span className="text-[10px] text-foreground/60">Annadanam, Temple Renovation & Daily Bhog</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-rose-600">₹{donationRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: STAFF & VOLUNTEER ACCESS */}
      {/* ========================================================= */}
      {activeTab === "staff" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Staff & Volunteer Access</h2>
              <p className="text-[11px] text-foreground/60">Manage permissions for QR scanners & managers</p>
            </div>
            <button
              onClick={handleOpenAddStaff}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>Add Staff</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {staffList.map(stf => (
              <div key={stf.id} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-primary flex items-center justify-center font-bold flex-shrink-0">
                    <UserCheck size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-foreground truncate">{stf.name}</span>
                      <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded font-mono">{stf.id}</span>
                    </div>
                    <span className="text-[10px] text-foreground/60 block">{stf.phone} • {stf.email}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 rounded">
                        {stf.role}
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">
                        {stf.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEditStaff(stf)}
                    className="p-1.5 bg-secondary/10 hover:bg-secondary/20 text-foreground/70 rounded-lg transition-colors"
                    title="Edit Staff"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(stf.id)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                    title="Revoke Access"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: SPIRITUAL LIBRARY (TEXT & IMAGE ADD/EDIT) */}
      {/* ========================================================= */}
      {activeTab === "library" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Spiritual Library & Sacred Texts</h2>
              <p className="text-[11px] text-foreground/60">Add, edit chapters, text scriptures, and cover photos</p>
            </div>
            <button
              onClick={handleOpenAddArticle}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>Add Sacred Article</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {articles.map(art => (
              <div key={art.id} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between gap-3 hover:border-primary/40 transition-all">
                <div className="w-14 h-16 rounded-xl overflow-hidden relative border border-secondary/20 flex-shrink-0 bg-secondary/10">
                  <Image src={art.image} alt={art.titleEn} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-foreground truncate block">{art.titleEn}</span>
                  <span className="text-[11px] text-foreground/60 truncate block">{art.titleBn}</span>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground/50">
                    <span className="bg-secondary/15 px-1.5 py-0.2 rounded font-medium">{art.categoryEn}</span>
                    <span>{art.readTimeEn}</span>
                    <span>• {art.sections?.length || 1} Chapters</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEditArticle(art)}
                    className="p-1.5 bg-secondary/10 hover:bg-secondary/20 text-foreground/70 rounded-lg transition-colors"
                    title="Edit Text & Cover"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(art.id)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: SACRED GALLERY & WALLPAPERS */}
      {/* ========================================================= */}
      {activeTab === "gallery" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Sacred Gallery & Wallpapers</h2>
              <p className="text-[11px] text-foreground/60">Upload and manage HD Darshan & Altar photos</p>
            </div>
            <button
              onClick={handleOpenAddPhoto}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {galleryPhotos.map(photo => (
              <div key={photo.id} className="bg-white rounded-2xl overflow-hidden border border-secondary/20 shadow-sm flex flex-col justify-between group">
                <div className="relative w-full aspect-[4/5] bg-secondary/10">
                  <Image src={photo.url} alt={photo.enName} fill className="object-cover" />
                  {photo.quality && (
                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-amber-300 font-extrabold text-[9px] px-2 py-0.5 rounded-full border border-amber-300/30">
                      {photo.quality}
                    </span>
                  )}
                </div>
                <div className="p-2.5 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-foreground truncate">{photo.enName}</h4>
                    <span className="text-[10px] text-foreground/60 truncate block">{photo.name}</span>
                    <span className="text-[9px] bg-secondary/15 px-1.5 py-0.2 rounded font-medium mt-1 inline-block">
                      {photo.categoryName}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="w-full py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: SHOP PRODUCTS */}
      {/* ========================================================= */}
      {activeTab === "products" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Shop Products & Pricing</h2>
              <p className="text-[11px] text-foreground/60">Manage prices, discounts, stock and items</p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>Add Product</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {products.map(prod => {
              const discount = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);
              return (
                <div key={prod.id} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-3 hover:border-primary/40 transition-all">
                  <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-secondary/20 flex-shrink-0">
                    <Image src={prod.image} alt={prod.nameEn} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-foreground truncate block">{prod.nameEn}</span>
                    <span className="text-[11px] text-foreground/60 truncate block">{prod.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-primary">₹{prod.price}</span>
                      <span className="text-[10px] text-foreground/40 line-through">₹{prod.originalPrice}</span>
                      <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 rounded">-{discount}%</span>
                      <span className={`text-[9px] font-bold px-1.5 rounded ${prod.inStock ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                        {prod.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="p-1.5 bg-secondary/10 hover:bg-secondary/20 text-foreground/70 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: EVENTS & PASSES */}
      {/* ========================================================= */}
      {activeTab === "events" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Events & Festival Passes</h2>
              <p className="text-[11px] text-foreground/60">Schedule pujas, festivals, and ticket inventory</p>
            </div>
            <button
              onClick={handleOpenAddEvent}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>New Event</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {events.map(ev => (
              <div key={ev.id} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-foreground">{ev.titleEn}</h3>
                    <span className="text-[11px] text-foreground/60">{ev.title}</span>
                  </div>
                  <span className="text-xs font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    ₹{ev.price} / pass
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-foreground/70 bg-secondary/5 p-2 rounded-xl">
                  <div>
                    <span className="text-foreground/50 block text-[9px] uppercase">Schedule</span>
                    <span className="font-semibold text-foreground">{ev.date}</span>
                    <span className="block text-[10px]">{ev.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground/50 block text-[9px] uppercase">Seats Available</span>
                    <span className={`font-bold ${ev.availableTickets > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {ev.availableTickets > 0 ? `${ev.availableTickets} Seats` : "Sold Out"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-secondary/15">
                  <button
                    onClick={() => handleOpenEditEvent(ev)}
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="text-xs font-bold text-rose-600 flex items-center gap-1 hover:underline ml-2"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 8: VIDEO PLAYLIST */}
      {/* ========================================================= */}
      {activeTab === "videos" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Video Playlist & Re-ordering</h2>
              <p className="text-[11px] text-foreground/60">Shift priority order or add new YouTube uploads</p>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>Add Video</span>
            </button>
          </div>

          <div className="space-y-2">
            {videos.map((vid, idx) => (
              <div key={vid.id} className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveVideo(idx, "up")}
                      disabled={idx === 0}
                      className={`p-1 rounded-md border ${idx === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary/10 text-primary border-primary/30"}`}
                      title="Move Up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => handleMoveVideo(idx, "down")}
                      disabled={idx === videos.length - 1}
                      className={`p-1 rounded-md border ${idx === videos.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary/10 text-primary border-primary/30"}`}
                      title="Move Down"
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>

                  <div className="w-16 h-11 rounded-lg overflow-hidden relative border border-secondary/20 flex-shrink-0 bg-black">
                    <Image
                      src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
                      alt={vid.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-xs text-foreground truncate block">{vid.title}</span>
                    <div className="flex items-center gap-2 text-[10px] text-foreground/60 mt-0.5">
                      <span>{vid.speaker}</span>
                      <span>•</span>
                      <span className="font-mono">{vid.duration}</span>
                      {vid.isLive && (
                        <span className="bg-red-600 text-white font-bold px-1 rounded text-[8px]">LIVE</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteVideo(vid.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                  title="Remove Video"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 9: ORDERS */}
      {/* ========================================================= */}
      {activeTab === "orders" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Store Orders & Dispatch</h2>
              <p className="text-[11px] text-foreground/60">Manage customer shipments and orders</p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {orders.length} Total
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-secondary/20 text-center space-y-2">
              <Package size={32} className="mx-auto text-foreground/30" />
              <p className="text-xs font-bold text-foreground/60">No store orders currently placed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(ord => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 border border-secondary/20 shadow-sm space-y-2">
                  <div className="flex justify-between items-center border-b border-secondary/15 pb-2">
                    <div>
                      <span className="font-mono font-bold text-xs text-foreground block">{ord.id}</span>
                      <span className="text-[10px] text-foreground/50">{ord.date}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      ord.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                      ord.status === "shipped" ? "bg-blue-100 text-blue-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-xs bg-secondary/5 p-2 rounded-xl">
                    <span className="font-bold text-foreground">{ord.customer.name}</span> ({ord.customer.phone})
                    <p className="text-[10px] text-foreground/70 truncate">{ord.customer.address}, {ord.customer.city} - {ord.customer.pincode}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-foreground/70">{ord.items.length} Products</span>
                    <span className="font-extrabold text-primary">₹{ord.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 10: SETTINGS */}
      {/* ========================================================= */}
      {activeTab === "settings" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div>
            <h2 className="font-bold text-sm text-foreground">Ashram Platform Settings</h2>
            <p className="text-[11px] text-foreground/60">Payment gateway, phone, and helpline controls</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); triggerAlert("System settings updated successfully!"); }} className="bg-white rounded-3xl p-5 border border-secondary/20 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground/80 block mb-1">Official UPI Gateway ID</label>
              <input
                type="text"
                value={upiGatewayId}
                onChange={e => setUpiGatewayId(e.target.value)}
                className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-3 py-2 text-xs font-mono font-bold text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground/80 block mb-1">Helpline Phone Number</label>
              <input
                type="text"
                value={helplinePhone}
                onChange={e => setHelplinePhone(e.target.value)}
                className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground/80 block mb-1">Official Contact Email</label>
              <input
                type="email"
                value={officialEmail}
                onChange={e => setOfficialEmail(e.target.value)}
                className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} />
              <span>Save System Settings</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT LIBRARY ARTICLE (TEXT & IMAGE) */}
      {/* ========================================================= */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">
                {editingArticleId ? "Edit Spiritual Article & Text" : "Add New Sacred Article & Text"}
              </h3>
              <button onClick={() => setIsArticleModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gospel and Words of Mother Sarada Devi"
                  value={articleForm.titleEn}
                  onChange={e => setArticleForm({ ...articleForm, titleEn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Title (Bengali)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. শ্রীশ্রীমা সারদা দেবীর বাণী ও অমৃতকথা"
                  value={articleForm.titleBn}
                  onChange={e => setArticleForm({ ...articleForm, titleBn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Cover Image Path / Asset</label>
                <input
                  type="text"
                  required
                  placeholder="/maa-sarada-hero.jpg or image URL"
                  value={articleForm.image}
                  onChange={e => setArticleForm({ ...articleForm, image: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Category</label>
                  <select
                    value={articleForm.category}
                    onChange={e => {
                      const cat = e.target.value as ReadingItem["category"];
                      const catBn = cat === "biography" ? "জীবনী ও সাধনা" : cat === "teachings" ? "উপদেশ ও বাণী" : cat === "scripture" ? "কথামৃত ও শাস্ত্র" : "প্রবন্ধ ও পাঠ";
                      const catEn = cat === "biography" ? "Biography & Life" : cat === "teachings" ? "Teachings & Words" : cat === "scripture" ? "Scriptures" : "Articles";
                      setArticleForm({ ...articleForm, category: cat, categoryBn: catBn, categoryEn: catEn });
                    }}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-bold focus:outline-none focus:border-primary"
                  >
                    <option value="biography">Biography</option>
                    <option value="teachings">Teachings & Words</option>
                    <option value="scripture">Scriptures</option>
                    <option value="articles">Articles</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Read Time</label>
                  <input
                    type="text"
                    value={articleForm.readTimeEn}
                    onChange={e => setArticleForm({ ...articleForm, readTimeEn: e.target.value, readTimeBn: `${e.target.value}` })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Highlight Sacred Quote (Bengali)</label>
                <textarea
                  rows={2}
                  placeholder="যদি শান্তি চাও মা, তবে কারও দোষ দেখো না..."
                  value={articleForm.highlightQuoteBn}
                  onChange={e => setArticleForm({ ...articleForm, highlightQuoteBn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Chapter 1 Text */}
              <div className="bg-secondary/5 p-3 rounded-2xl border border-secondary/15 space-y-2">
                <span className="font-extrabold text-primary block">Chapter 1 Text (অধ্যায় ১)</span>
                <input
                  type="text"
                  placeholder="Chapter 1 Title (Bengali)"
                  value={articleForm.chapter1HeadingBn}
                  onChange={e => setArticleForm({ ...articleForm, chapter1HeadingBn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2 text-xs"
                />
                <textarea
                  rows={3}
                  placeholder="Chapter 1 Body Text (Bengali)..."
                  value={articleForm.chapter1TextBn}
                  onChange={e => setArticleForm({ ...articleForm, chapter1TextBn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2 text-xs"
                />
              </div>

              {/* Chapter 2 Text */}
              <div className="bg-secondary/5 p-3 rounded-2xl border border-secondary/15 space-y-2">
                <span className="font-extrabold text-primary block">Chapter 2 Text (অধ্যায় ২ - ঐচ্ছিক)</span>
                <input
                  type="text"
                  placeholder="Chapter 2 Title (Bengali)"
                  value={articleForm.chapter2HeadingBn}
                  onChange={e => setArticleForm({ ...articleForm, chapter2HeadingBn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2 text-xs"
                />
                <textarea
                  rows={3}
                  placeholder="Chapter 2 Body Text (Bengali)..."
                  value={articleForm.chapter2TextBn}
                  onChange={e => setArticleForm({ ...articleForm, chapter2TextBn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Save size={15} />
                <span>Save Spiritual Article & Text</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD PHOTO TO SACRED GALLERY */}
      {/* ========================================================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">Add Photo to Sacred Gallery</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">Photo Title (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Holy Mother Sri Sarada Devi Altar"
                  value={galleryForm.enName}
                  onChange={e => setGalleryForm({ ...galleryForm, enName: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Photo Title (Bengali)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. শ্রীশ্রীমা সারদা দেবীর পবিত্র বেদিমূর্তি"
                  value={galleryForm.name}
                  onChange={e => setGalleryForm({ ...galleryForm, name: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Image URL / File Path</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /maa-sarada-feet.jpg or https://..."
                  value={galleryForm.url}
                  onChange={e => setGalleryForm({ ...galleryForm, url: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={e => {
                      const cat = e.target.value as GalleryPhoto["category"];
                      const catName = cat === "darshan" ? "শ্রীচরণ দর্শন" : cat === "altar" ? "বেদিমূর্তি" : "ওয়ালপেপার";
                      setGalleryForm({ ...galleryForm, category: cat, categoryName: catName });
                    }}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-bold focus:outline-none focus:border-primary"
                  >
                    <option value="darshan">Darshan (শ্রীচরণ)</option>
                    <option value="altar">Sacred Altar (বেদিমূর্তি)</option>
                    <option value="wallpaper">Wallpaper (ওয়ালপেপার)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Quality Badge</label>
                  <select
                    value={galleryForm.quality}
                    onChange={e => setGalleryForm({ ...galleryForm, quality: e.target.value })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-bold focus:outline-none focus:border-primary"
                  >
                    <option value="Ultra HD">Ultra HD</option>
                    <option value="4K HD">4K HD</option>
                    <option value="HD">HD</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Plus size={15} />
                <span>Add Photo to Gallery</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">
                {editingProductId ? "Edit Shop Product" : "Add New Shop Product"}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">Product Title (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Sri Sri Ramakrishna Kathamrita"
                  value={productForm.nameEn}
                  onChange={e => setProductForm({ ...productForm, nameEn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Product Title (Bengali)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. শ্রীশ্রীরামকৃষ্ণ কথামৃত সমগ্র"
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => {
                      const cat = e.target.value;
                      const catBn = cat === "books" ? "বই" : cat === "puja" ? "পূজা সামগ্রী" : cat === "photos" ? "ছবি" : "প্রসাদী";
                      setProductForm({ ...productForm, category: cat, categoryName: catBn });
                    }}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-bold"
                  >
                    <option value="books">Books (বই)</option>
                    <option value="puja">Puja Items (পূজা)</option>
                    <option value="photos">Framed Photos (ছবি)</option>
                    <option value="prasad">Prasad & Silk (প্রসাদী)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Stock Status</label>
                  <select
                    value={productForm.inStock ? "true" : "false"}
                    onChange={e => setProductForm({ ...productForm, inStock: e.target.value === "true" })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-bold"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.originalPrice}
                    onChange={e => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Discount Offer Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono font-bold text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Image Asset Path / URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Save size={15} />
                <span>Save Product</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT EVENT */}
      {/* ========================================================= */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">
                {editingEventId ? "Edit Event" : "Create New Festival Event"}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">Event Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Ramakrishna Janmatithi Utsav"
                  value={eventForm.titleEn}
                  onChange={e => setEventForm({ ...eventForm, titleEn: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Event Name (Bengali)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. শ্রীরামকৃষ্ণ জন্মতিথি উৎসব"
                  value={eventForm.title}
                  onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Pass Price (₹)</label>
                  <input
                    type="number"
                    value={eventForm.price}
                    onChange={e => setEventForm({ ...eventForm, price: Number(e.target.value) })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Available Seats</label>
                  <input
                    type="number"
                    value={eventForm.availableTickets}
                    onChange={e => setEventForm({ ...eventForm, availableTickets: Number(e.target.value) })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Venue / Location</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Save size={15} />
                <span>Save Event</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT STAFF */}
      {/* ========================================================= */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">
                {editingStaffId ? "Edit Staff Member" : "Grant New Staff Access"}
              </h3>
              <button onClick={() => setIsStaffModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subrata Das"
                  value={staffForm.name}
                  onChange={e => setStaffForm({ ...staffForm, name: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 9830123456"
                  value={staffForm.phone}
                  onChange={e => setStaffForm({ ...staffForm, phone: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. staff@gmail.com"
                  value={staffForm.email}
                  onChange={e => setStaffForm({ ...staffForm, email: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Role / Access</label>
                  <select
                    value={staffForm.role}
                    onChange={e => setStaffForm({ ...staffForm, role: e.target.value as any })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-bold focus:outline-none focus:border-primary"
                  >
                    <option value="Gate Scanner">Gate Scanner</option>
                    <option value="Store Dispatch">Store Dispatch</option>
                    <option value="Accounts Manager">Accounts Manager</option>
                    <option value="General Manager">General Manager</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Status</label>
                  <select
                    value={staffForm.status}
                    onChange={e => setStaffForm({ ...staffForm, status: e.target.value as any })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-bold focus:outline-none focus:border-primary"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Save size={15} />
                <span>Save Staff Permissions</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD YOUTUBE VIDEO */}
      {/* ========================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">Add YouTube Video Discourse</h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">YouTube Video ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KokXcI3zw2M (from youtube.com/watch?v=...)"
                  value={videoForm.id}
                  onChange={e => setVideoForm({ ...videoForm, id: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Video Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Sri Ramakrishna Kathamrita Discourse - Episode 23"
                  value={videoForm.title}
                  onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Speaker</label>
                  <input
                    type="text"
                    placeholder="e.g. Mataji / Maharaj"
                    value={videoForm.speaker}
                    onChange={e => setVideoForm({ ...videoForm, speaker: e.target.value })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 45:10"
                    value={videoForm.duration}
                    onChange={e => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="liveCheck"
                  checked={videoForm.isLive}
                  onChange={e => setVideoForm({ ...videoForm, isLive: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="liveCheck" className="font-bold text-foreground/80 cursor-pointer">
                  Mark as Live Stream / Featured
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Plus size={15} />
                <span>Add Video</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
