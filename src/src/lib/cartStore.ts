export interface Product {
  id: string;
  name: string;
  nameEn: string;
  originalPrice: number;
  price: number;
  category: string;
  categoryName: string;
  image: string;
  inStock: boolean;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    email?: string;
  };
  paymentMethod: string;
  status: "confirmed" | "processing" | "shipped" | "delivered";
  statusText: string;
  trackingNumber: string;
}

export const SHOP_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "শ্রীশ্রীমায়ের জীবনী ও অমৃত বাণী",
    nameEn: "Life & Divine Teachings of Holy Mother",
    originalPrice: 350,
    price: 250,
    category: "books",
    categoryName: "বই",
    image: "/shop-book.jpg",
    inStock: true,
    rating: 5.0
  },
  {
    id: "2",
    name: "পবিত্র পঞ্চমুখী রুদ্রাক্ষ জপমালা (১০৮ দানা)",
    nameEn: "Panchamukhi Rudraksha Japa Mala (108 Beads)",
    originalPrice: 750,
    price: 550,
    category: "puja",
    categoryName: "পূজা সামগ্রী",
    image: "/shop-rudraksha.jpg",
    inStock: true,
    rating: 4.9
  },
  {
    id: "3",
    name: "খাঁটি পিতলের পঞ্চপ্রদীপ ও সম্পূর্ণ পূজা থালি সেট",
    nameEn: "Pure Brass Panchapradip & Puja Thali Set",
    originalPrice: 1100,
    price: 850,
    category: "puja",
    categoryName: "পূজা সামগ্রী",
    image: "/shop-thali.jpg",
    inStock: true,
    rating: 5.0
  },
  {
    id: "4",
    name: "চন্দন ও গোলাপের সুগন্ধি ধূপকাঠি ও ধূপ শঙ্কু",
    nameEn: "Organic Sandalwood & Rose Incense & Dhoop",
    originalPrice: 200,
    price: 150,
    category: "puja",
    categoryName: "পূজা সামগ্রী",
    image: "/shop-dhoop.jpg",
    inStock: true,
    rating: 4.8
  },
  {
    id: "5",
    name: "শ্রীশ্রীমা সারদা দেবীর ফ্রেম বাঁধানো দেব প্রতিকৃতি",
    nameEn: "Framed Portrait of Holy Mother Sarada",
    originalPrice: 600,
    price: 450,
    category: "photos",
    categoryName: "ছবি",
    image: "/maa-sarada-hero.jpg",
    inStock: true,
    rating: 5.0
  },
  {
    id: "6",
    name: "শ্রীশ্রীরামকৃষ্ণ কথামৃত সমগ্র (৫ খণ্ড বাঁধাই সেট)",
    nameEn: "Complete Sri Sri Ramakrishna Kathamrita (5 Vols)",
    originalPrice: 1500,
    price: 1150,
    category: "books",
    categoryName: "বই",
    image: "/kathamrita-cover.jpg",
    inStock: true,
    rating: 5.0
  },
  {
    id: "7",
    name: "খাঁটি চন্দন কাঠের সুগন্ধি জপমালা ও চন্দন বাটি",
    nameEn: "Pure White Sandalwood Japa Mala & Tilak Cup",
    originalPrice: 850,
    price: 590,
    category: "puja",
    categoryName: "পূজা সামগ্রী",
    image: "/shop-sandalwood.jpg",
    inStock: true,
    rating: 4.9
  },
  {
    id: "8",
    name: "শ্রীশ্রীরামকৃষ্ণ, মা সারদা ও স্বামীজীর ত্রিমূর্তি ফ্রেম",
    nameEn: "Holy Trio Divine Framed Altar Photo (Thakur, Ma, Swamiji)",
    originalPrice: 950,
    price: 720,
    category: "photos",
    categoryName: "ছবি",
    image: "/shop-holy-trio.jpg",
    inStock: true,
    rating: 5.0
  },
  {
    id: "9",
    name: "কারুকার্যময় পিতলের পূজার ঘণ্টা ও খোল-করতাল সেট",
    nameEn: "Handcrafted Brass Puja Bell & Kartal Cymbals",
    originalPrice: 650,
    price: 450,
    category: "puja",
    categoryName: "পূজা সামগ্রী",
    image: "/shop-bell-kartal.jpg",
    inStock: true,
    rating: 4.8
  },
  {
    id: "10",
    name: "শ্রীশ্রীমায়ের প্রসাদী রেশমি উত্তরীয় ও আশীর্বাদী চাদর",
    nameEn: "Holy Mother Silk Blessing Shawl & Uttariya",
    originalPrice: 1200,
    price: 890,
    category: "prasad",
    categoryName: "প্রসাদী",
    image: "/shop-silk-uttariya.jpg",
    inStock: true,
    rating: 5.0
  }
];

const CART_KEY = "kms_cart_v1";
const ORDERS_KEY = "kms_orders_v1";
const PRODUCTS_KEY = "kms_products_v2";

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return SHOP_PRODUCTS;
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SHOP_PRODUCTS));
      return SHOP_PRODUCTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SHOP_PRODUCTS;
  } catch (e) {
    return SHOP_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event("products_updated"));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    if (!data) {
      // Default initial cart items
      const initial: CartItem[] = [
        { product: SHOP_PRODUCTS[0], quantity: 1 },
        { product: SHOP_PRODUCTS[1], quantity: 1 }
      ];
      localStorage.setItem(CART_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart_updated"));
  } catch (e) {
    console.error(e);
  }
}

export function addToCart(product: Product): void {
  const current = getStoredCart();
  const index = current.findIndex(i => i.product.id === product.id);
  if (index > -1) {
    current[index].quantity += 1;
  } else {
    current.push({ product, quantity: 1 });
  }
  saveCart(current);
}

export function updateCartQuantity(productId: string, delta: number): void {
  const current = getStoredCart();
  const index = current.findIndex(i => i.product.id === productId);
  if (index > -1) {
    const newQty = current[index].quantity + delta;
    if (newQty <= 0) {
      current.splice(index, 1);
    } else {
      current[index].quantity = newQty;
    }
    saveCart(current);
  }
}

export function removeCartItem(productId: string): void {
  const current = getStoredCart();
  const updated = current.filter(i => i.product.id !== productId);
  saveCart(updated);
}

export function clearCart(): void {
  saveCart([]);
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      // Default seed order for demo
      const seed: Order[] = [
        {
          id: "KMS-ORD-7821",
          date: "২৮ আগস্ট ২০২৬, বিকাল ৪:১৫",
          items: [
            { product: SHOP_PRODUCTS[0], quantity: 1 },
            { product: SHOP_PRODUCTS[3], quantity: 2 }
          ],
          subtotal: 550,
          discount: 150,
          couponDiscount: 50,
          shipping: 0,
          total: 500,
          customer: {
            name: "অর্ণব ভক্ত",
            phone: "+91 9876543210",
            address: "১২, রামকৃষ্ণ মিশন রোড",
            city: "কলকাতা",
            pincode: "700001",
            email: "arnab@example.com"
          },
          paymentMethod: "UPI (Online)",
          status: "shipped",
          statusText: "ডেলিভারির পথে (Out for Delivery)",
          trackingNumber: "EXP-KOL-98124"
        }
      ];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const orders = getStoredOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
}
