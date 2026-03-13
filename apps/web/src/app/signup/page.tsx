"use client";

import { useState } from "react";
import { User, Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const clearMsg = () => setMsg("");

  async function onSubmit() {
    clearMsg();
    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/auth/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      
      const data = await res.json();
      setLoading(false);
      
      if (!res.ok) {
        setMsg(data.error || "Registration failed");
        return;
      }
      
      // On success, redirect to login page
      router.push("/login");
    } catch {
      setLoading(false);
      setMsg("Network error");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div className="rounded-lg flex items-center justify-center">
            <Image 
              src="/Background.svg" 
              alt="Background Pattern" 
              width={30}
              height={30}
              className="object-cover"
            />
          </div>
          <span className="font-bold text-xl text-zinc-900 tracking-tight">ALAT Resolve</span>
        </div>
        <button className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
          Contact Support
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl flex overflow-hidden max-w-4xl w-full flex-col md:flex-row min-h-[500px] relative border-t-4 border-[#AE328E]">
          {/* Left Pane - Visual Motif */}
          <div className="w-full md:w-1/2 bg-[#AE328E] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden text-white min-h-[300px]">
            {/* Absolute positioned motif based on image */}
            <div className="absolute inset-0 pointer-events-none">
              <Image 
                src="/Left Pane_ Visual Motif (1).svg" 
                alt="Background Pattern" 
                fill 
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full py-4">
              <h1 className="text-3xl font-bold text-zinc-900 mb-1">Create an account</h1>
              <p className="text-zinc-500 mb-6 text-sm">Please enter your details to sign up.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border text-black text-sm border-zinc-200 p-3 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-[#AE328E] focus:border-transparent transition-all outline-none"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border text-black text-sm border-zinc-200 p-3 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-[#AE328E] focus:border-transparent transition-all outline-none"
                      placeholder="Choose a username"
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border text-black text-sm border-zinc-200 p-3 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-[#AE328E] focus:border-transparent transition-all outline-none"
                      placeholder="Create a password"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border text-black text-sm border-zinc-200 p-3 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-[#AE328E] focus:border-transparent transition-all outline-none"
                      placeholder="Confirm your password"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={onSubmit}
                  className="w-full bg-[#AE328E] text-white py-3 mt-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#912876] transition-all shadow-lg shadow-[#AE328E]/20 active:scale-[0.98] disabled:opacity-70 text-sm"
                  disabled={!email || !username || !password || !confirmPassword || loading}
                >
                  {loading ? "Creating..." : (
                    <>
                      Create Account <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {msg && <p className="mt-4 text-sm text-center text-[#AE328E] font-medium bg-[#AE328E]/5 p-3 rounded-lg border border-[#AE328E]/10">{msg}</p>}

              <div className="mt-6 text-center text-sm text-zinc-500">
                Already have an account? <Link href="/login" className="text-[#AE328E] font-semibold hover:underline">Login</Link>
              </div>

              <div className="mt-6 border border-zinc-100 bg-zinc-50 rounded-lg p-3 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-zinc-600" />
                <span className="text-xs text-zinc-600 font-medium whitespace-nowrap">Your security is our priority. We will NEVER ask for your full PIN.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
