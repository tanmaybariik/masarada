"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  ArrowLeft, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  User, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // Auto seed if database is fresh
      try {
        await fetch("/api/auth/seed");
      } catch (err) {
        // ignore seed error
      }

      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password: password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Invalid email or password");
        setLoading(false);
      } else {
        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => {
          if (email.toLowerCase().includes("karunamoyee") || email.toLowerCase().includes("admin")) {
            router.push("/admin");
          } else {
            router.push(callbackUrl);
          }
          router.refresh();
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg("Something went wrong during login");
      setLoading(false);
    }
  };

  const handleQuickLogin = async (type: "admin" | "devotee") => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await fetch("/api/auth/seed");
    } catch (err) {}

    const creds = type === "admin" 
      ? { email: "karunamoyeemasarada@gmail.com", password: "admin123456" }
      : { email: "devotee@masarada.com", password: "user123456" };

    setEmail(creds.email);
    setPassword(creds.password);

    try {
      const res = await signIn("credentials", {
        email: creds.email,
        password: creds.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Quick login failed. Please try again.");
        setLoading(false);
      } else {
        setSuccessMsg(type === "admin" ? "Admin login successful! Redirecting to admin panel..." : "Login successful! Redirecting to account...");
        setTimeout(() => {
          if (type === "admin") {
            router.push("/admin");
          } else {
            router.push(callbackUrl);
          }
          router.refresh();
        }, 600);
      }
    } catch (err) {
      setErrorMsg("Login error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background p-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <span>Return to Home</span>
        </Link>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          Secure Login
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="relative w-16 h-16 rounded-2xl bg-white shadow-md mx-auto mb-3 border border-secondary/20 flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.jpg"
            alt="Ma Sarada Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Welcome</h1>
        <p className="text-xs text-foreground/60 mt-1">Karunamoyee Ma Sarada Devotee Service & Management Portal</p>
      </div>


      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs font-semibold mb-4 flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={16} className="flex-shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-2xl text-xs font-semibold mb-4 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-foreground/80 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="example@mail.com"
              autoComplete="off"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-foreground/80">
              Password
            </label>
            <Link href="/forgot-password" className="text-[11px] text-primary font-bold hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-xs bg-white dark:bg-zinc-900 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground p-1"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-60 mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-secondary/15 text-center text-xs text-foreground/70">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary font-black hover:underline">
          Create a new account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-xs font-bold text-foreground/60">
        Loading...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
