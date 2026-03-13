"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { User, Eye, EyeOff, ArrowRight, Lock, Mail, Clock, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"password" | "otp">("password");
  const [identity, setIdentity] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [maskedEmail, setMaskedEmail] = useState("");
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const clearMsg = () => setMsg("");

  type SignInResult = {
    ok?: boolean;
    error?: string;
  };

  async function onSubmitPassword() {
    clearMsg();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/customer/request-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ identity, password }),
      });
      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        setMsg(json?.error || "Invalid credentials");
        return;
      }
      setStep("otp");
      if (json.maskedEmail) setMaskedEmail(json.maskedEmail);
      setMsg("OTP sent — check your email");
    } catch {
      setLoading(false);
      setMsg("Network error");
    }
  }

  async function onVerifyOtp() {
    clearMsg();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        flow: "customer-otp",
        identity,
        otp: otp.join(""),
      });

      setLoading(false);
      if (result?.ok) {
        // safe redirect after session available
        const sessionRes = await fetch("/api/auth/session");
        const data = await sessionRes.json();
        const role = data?.user?.role;
        if (role === "AGENT") {
          // agent logged in — in local dev we redirect to the agent app if needed
          window.location.href = "http://localhost:3001";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setMsg((result as SignInResult)?.error || "OTP invalid or expired");
      }
    } catch {
      setLoading(false);
      setMsg("Sign-in error");
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
        <div className="bg-white rounded-2xl shadow-2xl flex overflow-hidden max-w-4xl w-full flex-col md:flex-row max-h-[500px] relative border-t-4 border-[#AE328E]">
          {/* Left Pane - Visual Motif */}
          <div className="w-full md:w-1/2 bg-[#AE328E] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden text-white">
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
              <h1 className="text-3xl font-bold text-zinc-900 mb-1">Welcome back</h1>
              <p className="text-zinc-500 mb-6 text-sm">Please enter your details to sign in.</p>

              {step === "password" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Email or Username</label>
                    <div className="relative">
                      <input
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        className="w-full border text-black text-sm border-zinc-200 p-3 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-[#AE328E] focus:border-transparent transition-all outline-none"
                        placeholder="Enter your email or username"
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
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-zinc-600">
                      <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#AE328E] focus:ring-[#AE328E]" />
                      Remember me
                    </label>
                    <button className="text-[#AE328E] font-semibold hover:underline">Forgot Password?</button>
                  </div>

                  <button
                    onClick={onSubmitPassword}
                    className="w-full bg-[#AE328E] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#912876] transition-all shadow-lg shadow-[#AE328E]/20 active:scale-[0.98] disabled:opacity-70 text-sm"
                    disabled={!identity || !password || loading}
                  >
                    {loading ? "Checking..." : (
                      <>
                        Continue <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#AE328E]/5 rounded-2xl flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-[#AE328E]/10">
                      <Mail className="w-6 h-6 text-[#AE328E]" />
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold text-zinc-900 mb-2">Verify your identity</h1>
                  <p className="text-zinc-500 mb-8 text-sm">
                    We&apos;ve sent a 6-digit code to your email address <br />
                    <span className="font-semibold text-zinc-900">{maskedEmail || identity}</span>
                  </p>

                  <div className="flex gap-2 mb-8">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && !/^\d+$/.test(value)) return;
                          
                          const newOtp = [...otp];
                          newOtp[index] = value;
                          setOtp(newOtp);

                          if (value && index < 5) {
                            inputRefs.current[index + 1]?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otp[index] && index > 0) {
                            inputRefs.current[index - 1]?.focus();
                          }
                        }}
                        className="w-11 h-11 border border-zinc-200 rounded-xl text-sm text-black text-center font-bold focus:ring-2 focus:ring-[#AE328E] focus:border-transparent outline-none transition-all"
                      />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full mb-8 border border-zinc-100">
                    <Clock className="w-4 h-4 text-[#AE328E]" />
                    <span className="text-sm font-medium text-zinc-500">
                      Resend code in <span className="text-[#AE328E]">00:{timer.toString().padStart(2, '0')}</span>
                    </span>
                  </div>

                  <button
                    onClick={onVerifyOtp}
                    className="w-full bg-[#AE328E] text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#912876] transition-all shadow-lg shadow-[#AE328E]/20 active:scale-[0.98] disabled:opacity-70 mb-8"
                    disabled={otp.some(d => !d) || loading}
                  >
                    {loading ? "Verifying..." : (
                      <>
                        Verify & Sign In <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="space-y-4">
                    <p className="text-sm text-zinc-500">
                      Didn&apos;t receive a code? <button className="text-[#AE328E] font-semibold hover:underline">Try another way</button>
                    </p>
                    <button
                      onClick={() => {
                        setStep("password");
                        setMsg("");
                      }}
                      className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium hover:text-zinc-600 transition-colors mx-auto"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back to Login
                    </button>
                  </div>
                </div>
              )}

              {msg && <p className="mt-6 text-sm text-center text-[#AE328E] font-medium bg-[#AE328E]/5 p-3 rounded-lg border border-[#AE328E]/10">{msg}</p>}

              <div className="mt-8 text-center text-sm text-zinc-500">
                Don&apos;t have an account? <button onClick={() => router.push("/signup")} className="text-[#AE328E] font-semibold hover:underline">Sign Up</button>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-center gap-2">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">Your information is encrypted and secure.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
