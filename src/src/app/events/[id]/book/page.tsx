"use client";

import { useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Download, Printer, Calendar, Clock, MapPin, Ticket, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function BookEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const { language } = useTranslation();

  const eventTitle = searchParams.get("title") || (language === "bn" ? "শ্রীরামকৃষ্ণ জন্মতিথি উৎসব" : "Sri Ramakrishna Janmatithi Utsav");
  const unitPrice = Number(searchParams.get("price")) || 150;

  const [step, setStep] = useState<"form" | "invoice">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const totalAmount = tickets * unitPrice;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `KMS-INV-${Date.now().toString().slice(-6)}`;
    setInvoiceNumber(randomId);
    setBookingDate(new Date().toLocaleString(language === "bn" ? "bn-BD" : "en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    }));
    setStep("invoice");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-20">
      <Link href="/events" className="flex items-center text-foreground/60 mb-5 print:hidden">
        <ArrowLeft size={18} className="mr-2" />
        {language === "bn" ? "ইভেন্টে ফিরে যান" : "Back to Events"}
      </Link>

      {step === "form" ? (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {language === "bn" ? "ইভেন্ট বুকিং ও টিকিট" : "Event Booking & Tickets"}
            </h1>
            <p className="text-foreground/70 text-sm mt-1">{eventTitle}</p>
          </div>

          {/* Price Summary Card */}
          <div className="bg-gradient-to-r from-primary/10 via-amber-500/10 to-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                <Ticket size={20} />
              </div>
              <div>
                <p className="text-xs text-foreground/60">{language === "bn" ? "প্রতি টিকিট মূল্য" : "Price per Ticket"}</p>
                <p className="text-lg font-bold text-foreground">₹{unitPrice}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-foreground/60">{language === "bn" ? "মোট প্রদেয়" : "Total Payable"}</p>
              <p className="text-xl font-extrabold text-primary">₹{totalAmount}</p>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4 bg-white p-5 rounded-2xl border border-secondary/20 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {language === "bn" ? "দর্শনার্থীর নাম" : "Visitor Full Name"} *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={language === "bn" ? "উদাঃ অর্ণব ভক্ত" : "e.g. Arnab Bhakta"}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {language === "bn" ? "ফোন নম্বর" : "Phone Number"} *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+91..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {language === "bn" ? "ইমেইল (রশিদের জন্য)" : "Email (For Receipt)"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase">
                {language === "bn" ? "টিকিট সংখ্যা" : "Number of Tickets"} *
              </label>
              <select
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                  <option key={num} value={num}>
                    {num} {language === "bn" ? "জন" : "person(s)"} — ₹{num * unitPrice}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-foreground/80 mb-2 uppercase">
                {language === "bn" ? "পেমেন্ট মাধ্যম" : "Payment Method"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === "upi"
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-secondary/20 bg-background text-foreground/70"
                  }`}
                >
                  UPI / GPay / PhonePe
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === "cash"
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-secondary/20 bg-background text-foreground/70"
                  }`}
                >
                  {language === "bn" ? "আশ্রমে নগদ প্রদান" : "Pay at Ashram"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              <span>{language === "bn" ? `বুকিং কনফার্ম ও বিল তৈরি করুন (₹${totalAmount})` : `Confirm Booking & Generate Bill (₹${totalAmount})`}</span>
            </button>
          </form>
        </div>
      ) : (
        /* Generated Bill / Receipt (Invoice) */
        <div className="space-y-4">
          <div id="printable-bill" className="bg-white rounded-2xl border border-secondary/30 shadow-lg overflow-hidden p-5">
            {/* Header with Logo */}
            <div className="flex items-center justify-between border-b border-secondary/20 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-secondary/20 relative shadow-sm">
                  <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground leading-tight">করুণাময়ী মা সারদা</h2>
                  <p className="text-[10px] text-foreground/60">অফিসিয়াল ইভেন্ট প্রবেশপত্র ও রশিদ</p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {language === "bn" ? "পরিশোধিত" : "PAID"}
                </span>
                <p className="text-[10px] font-mono text-foreground/50 mt-1">{invoiceNumber}</p>
              </div>
            </div>

            {/* Bill Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-secondary/5 p-3 rounded-xl mb-4 border border-secondary/10">
              <div>
                <p className="text-foreground/50 text-[10px] uppercase font-bold">{language === "bn" ? "দর্শনার্থীর নাম" : "Visitor"}:</p>
                <p className="font-bold text-foreground mt-0.5">{name}</p>
                <p className="text-[11px] text-foreground/70">{phone}</p>
              </div>
              <div className="text-right">
                <p className="text-foreground/50 text-[10px] uppercase font-bold">{language === "bn" ? "তারিখ ও সময়" : "Date & Time"}:</p>
                <p className="font-medium text-foreground mt-0.5">{bookingDate}</p>
                <p className="text-[10px] text-foreground/60">{paymentMethod.toUpperCase()}</p>
              </div>
            </div>

            {/* Event Name */}
            <div className="mb-4">
              <p className="text-[10px] uppercase font-bold text-foreground/50">{language === "bn" ? "অনুষ্ঠান / ইভেন্ট" : "Event"}:</p>
              <h3 className="text-sm font-bold text-foreground mt-0.5">{eventTitle}</h3>
            </div>

            {/* Line Item Table */}
            <table className="w-full text-xs mb-4">
              <thead>
                <tr className="border-b border-secondary/20 text-foreground/60 text-[10px] uppercase">
                  <th className="text-left py-1.5">{language === "bn" ? "বিবরণ" : "Item"}</th>
                  <th className="text-center py-1.5">{language === "bn" ? "পরিমাণ" : "Qty"}</th>
                  <th className="text-right py-1.5">{language === "bn" ? "দর" : "Price"}</th>
                  <th className="text-right py-1.5">{language === "bn" ? "মোট" : "Total"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                <tr>
                  <td className="py-2 font-medium">{language === "bn" ? "ইভেন্ট এন্ট্রি পাস" : "Event Entry Pass"}</td>
                  <td className="text-center py-2">{tickets}</td>
                  <td className="text-right py-2">₹{unitPrice}</td>
                  <td className="text-right py-2 font-bold">₹{totalAmount}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-secondary/20">
                  <td colSpan={3} className="py-2.5 font-bold text-foreground text-right">{language === "bn" ? "সর্বমোট প্রদেয়" : "Grand Total"}:</td>
                  <td className="py-2.5 font-extrabold text-primary text-right text-sm">₹{totalAmount}</td>
                </tr>
              </tfoot>
            </table>

            {/* QR Code Verification Section */}
            <div className="flex flex-col items-center justify-center p-3 bg-secondary/10 rounded-xl border border-dashed border-secondary/30 mb-2">
              <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-sm flex items-center justify-center border border-secondary/20">
                {/* Visual QR Pattern */}
                <div className="w-full h-full bg-neutral-900 rounded flex flex-col items-center justify-center text-white text-[9px] font-mono text-center p-1 leading-tight">
                  <span>[ENTRY PASS]</span>
                  <span className="text-[7px] text-amber-400 mt-1">{invoiceNumber}</span>
                  <span className="text-[7px] opacity-75 mt-1">{name} ({tickets}P)</span>
                </div>
              </div>
              <p className="text-[10px] text-foreground/60 mt-2 text-center font-medium">
                {language === "bn" ? "প্রবেশ দ্বারে এই QR পাসটি প্রদর্শন করুন" : "Show this QR pass at the entrance gate"}
              </p>
            </div>

            <p className="text-[9px] text-center text-foreground/40 mt-3">
              জয় মা সারদা • করুণাময়ী মা সারদা আশ্রম ট্রাস্ট
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all text-xs"
            >
              <Printer size={16} />
              <span>{language === "bn" ? "বিল / রশিদ প্রিন্ট বা ডাউনলোড করুন (PDF)" : "Print / Save Receipt (PDF)"}</span>
            </button>
          </div>

          <Link
            href="/events"
            className="block text-center w-full bg-secondary/15 text-foreground py-2.5 rounded-xl font-bold hover:bg-secondary/25 transition-colors text-xs print:hidden"
          >
            {language === "bn" ? "অন্যান্য ইভেন্ট দেখুন" : "View Other Events"}
          </Link>
        </div>
      )}
    </div>
  );
}
