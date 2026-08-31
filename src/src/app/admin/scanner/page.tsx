"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ScanLine, 
  CheckCircle2, 
  XCircle, 
  Search, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Users, 
  Phone, 
  Sparkles,
  RefreshCw,
  Ticket
} from "lucide-react";

interface DevoteeTicket {
  id: string;
  name: string;
  phone: string;
  event: string;
  date: string;
  tickets: number;
  amount: number;
  status: "verified" | "attended" | "cancelled";
  checkedInAt?: string;
  gateStaff: string;
}

export default function StaffQRScannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scanStatus, setScanStatus] = useState<"idle" | "success" | "notFound">("idle");
  const [selectedTicket, setSelectedTicket] = useState<DevoteeTicket | null>(null);

  const [ticketLedger, setTicketLedger] = useState<DevoteeTicket[]>([
    {
      id: "KMS-EVT-9824",
      name: "Arnab Bhakta",
      phone: "+91 8918501779",
      event: "Sri Ramakrishna Janmatithi Utsav",
      date: "March 15, 2026",
      tickets: 2,
      amount: 300,
      status: "verified",
      gateStaff: "Subrata Das"
    },
    {
      id: "KMS-EVT-901",
      name: "Soumen Bandyopadhyay",
      phone: "+91 9830112233",
      event: "Sri Sri Sarada Devi Divine Advent Festival",
      date: "April 05, 2026",
      tickets: 1,
      amount: 150,
      status: "verified",
      gateStaff: "Subrata Das"
    },
    {
      id: "KMS-EVT-902",
      name: "Priyanka Sengupta",
      phone: "+91 9748556677",
      event: "Evening Arati & Nam Sankirtan",
      date: "February 28, 2026",
      tickets: 4,
      amount: 600,
      status: "attended",
      checkedInAt: "06:15 PM",
      gateStaff: "Tanmay B."
    },
    {
      id: "KMS-EVT-903",
      name: "Debabrata Ghosh",
      phone: "+91 9433221100",
      event: "Special Maha Shivaratri Puja & Yajna",
      date: "February 26, 2026",
      tickets: 2,
      amount: 400,
      status: "verified",
      gateStaff: "Subrata Das"
    }
  ]);

  const [recentCheckIns, setRecentCheckIns] = useState<DevoteeTicket[]>([
    {
      id: "KMS-EVT-902",
      name: "Priyanka Sengupta",
      phone: "+91 9748556677",
      event: "Evening Arati & Nam Sankirtan",
      date: "February 28, 2026",
      tickets: 4,
      amount: 600,
      status: "attended",
      checkedInAt: "06:15 PM",
      gateStaff: "Tanmay B."
    }
  ]);

  // Handle Search by ID, Name or Phone
  const handleSearchCheck = (queryText: string) => {
    const q = queryText.trim().toLowerCase();
    if (!q) {
      setSelectedTicket(null);
      setScanStatus("idle");
      return;
    }

    const found = ticketLedger.find(
      t => t.id.toLowerCase().includes(q) || 
           t.name.toLowerCase().includes(q) || 
           t.phone.includes(q)
    );

    if (found) {
      setSelectedTicket(found);
      setScanStatus("success");
    } else {
      setSelectedTicket(null);
      setScanStatus("notFound");
    }
  };

  // Mock Camera Scan
  const handleSimulateCameraScan = () => {
    const sample = ticketLedger[0];
    setSelectedTicket(sample);
    setScanStatus("success");
  };

  // Mark Customer as Checked In
  const handleApproveEntry = () => {
    if (!selectedTicket) return;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated: DevoteeTicket = {
      ...selectedTicket,
      status: "attended",
      checkedInAt: nowTime
    };

    setTicketLedger(prev => prev.map(t => t.id === updated.id ? updated : t));
    setSelectedTicket(updated);
    setRecentCheckIns([updated, ...recentCheckIns.filter(t => t.id !== updated.id)]);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-24 text-foreground">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <Link 
          href="/admin" 
          className="flex items-center text-foreground/60 hover:text-primary transition-colors text-xs font-bold"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back to Admin Panel</span>
        </Link>
        <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
          <ShieldCheck size={13} /> Gate Staff Access
        </span>
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <ScanLine size={22} className="text-primary" />
          <span>Staff QR & Pass Verification</span>
        </h1>
        <p className="text-xs text-foreground/60 mt-0.5">
          Scan QR code or search customer name to verify festival entry passes
        </p>
      </div>

      {/* Customer Name & Booking ID Search Bar */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
        <input
          type="text"
          placeholder="Search Customer Name / Phone / Pass ID..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            handleSearchCheck(e.target.value);
          }}
          className="w-full bg-white border border-secondary/25 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-foreground/40 shadow-sm focus:outline-none focus:border-primary font-medium"
        />
        {searchQuery && (
          <button 
            onClick={() => { setSearchQuery(""); setScanStatus("idle"); setSelectedTicket(null); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground text-xs font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Camera QR Scanner Simulation View */}
      {scanStatus === "idle" && (
        <div 
          onClick={handleSimulateCameraScan}
          className="w-full h-56 border-2 border-dashed border-primary/40 rounded-3xl bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-all relative overflow-hidden group shadow-sm mb-6"
        >
          <div className="absolute inset-x-8 top-0 h-1 bg-primary shadow-[0_0_15px_rgba(217,74,47,0.8)] animate-[scan_2.5s_ease-in-out_infinite]" />
          <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
            <ScanLine size={32} />
          </div>
          <span className="font-extrabold text-xs text-foreground">Tap to Scan QR Code Camera</span>
          <span className="text-[10px] text-foreground/50 mt-1">Live camera frame scanner active</span>
        </div>
      )}

      {/* Not Found State */}
      {scanStatus === "notFound" && (
        <div className="bg-white rounded-3xl p-6 border border-rose-200 text-center space-y-2 mb-6 shadow-sm">
          <XCircle size={40} className="text-rose-500 mx-auto" />
          <h3 className="font-bold text-sm text-rose-700">No Booking Record Found</h3>
          <p className="text-xs text-foreground/60">
            Please check the spelling of customer name or verify the 10-digit phone number.
          </p>
        </div>
      )}

      {/* Customer Pass Verified Card */}
      {scanStatus === "success" && selectedTicket && (
        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-500 shadow-xl space-y-4 mb-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between border-b border-secondary/15 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                <UserCheck size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-foreground">{selectedTicket.name}</h3>
                <span className="text-[11px] text-foreground/60 font-mono">{selectedTicket.phone}</span>
              </div>
            </div>
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
              selectedTicket.status === "attended" 
                ? "bg-purple-100 text-purple-800" 
                : "bg-emerald-100 text-emerald-800"
            }`}>
              {selectedTicket.status === "attended" ? "Checked-In" : "Valid Pass"}
            </span>
          </div>

          <div className="space-y-2 bg-secondary/5 p-3 rounded-2xl text-xs">
            <div className="flex justify-between">
              <span className="text-foreground/50">Pass ID:</span>
              <span className="font-mono font-bold text-foreground">{selectedTicket.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Festival / Event:</span>
              <span className="font-bold text-primary text-right truncate max-w-[200px]">{selectedTicket.event}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Admit Quantity:</span>
              <span className="font-extrabold text-foreground">{selectedTicket.tickets} Person(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Date & Venue:</span>
              <span className="font-medium text-foreground">{selectedTicket.date}</span>
            </div>
            {selectedTicket.checkedInAt && (
              <div className="flex justify-between text-purple-700 font-bold border-t border-secondary/15 pt-1.5">
                <span>Entry Timestamp:</span>
                <span>{selectedTicket.checkedInAt} (Gate Verified)</span>
              </div>
            )}
          </div>

          {selectedTicket.status !== "attended" ? (
            <button
              onClick={handleApproveEntry}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 size={16} />
              <span>Approve & Mark Entry Checked-In</span>
            </button>
          ) : (
            <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-2xl text-center text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Devotee already admitted at gate</span>
            </div>
          )}
        </div>
      )}

      {/* Recent Gate Entry History Log */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-foreground/60 uppercase tracking-wider px-1 flex items-center gap-1.5">
          <Clock size={14} className="text-primary" />
          <span>Recent Gate Check-In History</span>
        </h3>

        <div className="space-y-2">
          {recentCheckIns.map((item, idx) => (
            <div key={idx} className="bg-white p-3 rounded-2xl border border-secondary/20 shadow-sm flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground">{item.name}</span>
                  <span className="text-[10px] text-foreground/50 font-mono">({item.id})</span>
                </div>
                <span className="text-[10px] text-foreground/60">{item.event} • {item.tickets} Person(s)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full block">
                  {item.checkedInAt || "Verified"}
                </span>
                <span className="text-[9px] text-foreground/40 mt-0.5 block">Staff: {item.gateStaff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
