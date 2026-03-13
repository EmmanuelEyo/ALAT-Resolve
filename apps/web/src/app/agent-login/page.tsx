"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  HelpCircle, 
  Shield, 
  Box,
  Smartphone,
  MessageSquare,
  Clock,
} from "lucide-react";
import Image from "next/image";

export default function AgentLoginPage() {
  const [step, setStep] = useState<"password" | "totp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [setupRequired, setSetupRequired] = useState(false);
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const clearMsg = () => setMsg("");

  type SignInResult = {
    ok?: boolean;
    error?: string;
  };

  async function onPasswordSubmit() {
    clearMsg();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/agent/validate-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        setMsg(json?.error || "Invalid credentials");
        return;
      }
      if (json.setupRequired) {
        setSetupRequired(true);
        setOtpauthUrl(json.otpauth_url || "");
      }
      setStep("totp");
      setMsg("");
    } catch {
      setLoading(false);
      setMsg("Network error");
    }
  }

  async function onTotpSubmit() {
    clearMsg();
    setLoading(true);
    try {
      const totpString = otp.join("");
      const result = await signIn("credentials", {
        redirect: false,
        flow: "agent-totp",
        email,
        totp: totpString,
      });
      setLoading(false);
      if (result?.ok) {
        window.location.href = process.env.NEXT_PUBLIC_AGENT_APP_URL || "http://localhost:3001";
      } else {
        setMsg((result as SignInResult)?.error || "Invalid TOTP");
      }
    } catch {
      setLoading(false);
      setMsg("Sign-in error");
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF2F9] flex flex-col font-sans text-[#1A1C1E]">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100/50 px-8 py-2 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src="/Overlay.svg" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-base text-zinc-900 leading-tight">ALAT Resolve</div>
              <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Internal Agent Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              <HelpCircle className="w-4 h-4" /> IT Help Desk
            </button>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[11px] font-bold text-green-700">All Systems Operational</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6">
        {/* Top Branding */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="space-y-6 text-black">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-pink-100/50 relative overflow-hidden group">
               {/* Decorative Background Motif */}
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
               
               <div className="relative z-10">
                  <div className="flex items-center gap-2 text-[#AE328E] mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#AE328E]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">NEW SYSTEM NOTICE</span>
                  </div>
                  <h1 className="text-4xl font-extrabold text-[#1A1C1E] leading-[1.1] mb-4 tracking-tight">
                    Secure access for <br />
                    <span className="text-[#AE328E]">Wema Bank agents.</span>
                  </h1>
                  <p className="text-zinc-500 text-base leading-relaxed max-w-lg font-medium">
                    Welcome to the unified support dashboard. Please use your corporate credentials to access customer profiles, ticket management, and transaction resolution tools.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
               <div className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-50 flex items-center gap-4 group hover:border-[#AE328E]/20 transition-all cursor-default text-black">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900">Strictly Confidential</div>
                    <div className="text-[11px] text-zinc-400 font-medium">Data access is logged and audited.</div>
                  </div>
               </div>
               <div className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-50 flex items-center gap-4 group hover:border-[#AE328E]/20 transition-all cursor-default text-black">
                  <div className="w-12 h-12 rounded-2xl bg-[#AE328E]/5 flex items-center justify-center text-[#AE328E]">
                    <Box className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900">MFA Enabled</div>
                    <div className="text-[11px] text-zinc-400 font-medium">Token required for high-risk actions.</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="relative max-w-md mx-auto lg:mx-0 w-full text-black">
            {/* Soft Glow Background */}
            <div className="absolute -inset-10 bg-linear-to-tr from-[#AE328E]/20 to-transparent blur-3xl opacity-30 select-none pointer-events-none" />

            {step === "password" ? (
              <div className="relative bg-white rounded-[32px] shadow-2xl border-t-5 border-[#AE328E] overflow-hidden text-black">
                 <div className="p-8 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#AE328E]/5 flex items-center justify-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-[#AE328E]/10">
                        <Lock className="w-4 h-4 text-[#AE328E]" />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-zinc-900 mb-1 tracking-tight">Staff Login</h2>
                    <p className="text-zinc-400 text-xs font-medium mb-6">Enter your credentials to continue</p>

                    <div className="w-full space-y-4">
                      {msg && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-medium mb-2">{msg}</div>}
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-1">STAFF EMAIL / EMPLOYEE ID</label>
                         <div className="relative group">
                            <input 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#AE328E]/20 focus:bg-white focus:border-[#AE328E]/20 transition-all placeholder:text-zinc-300 text-black appearance-none"
                              placeholder="e.g. adeyemi.o@wemabank.com"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-[#AE328E] transition-colors" />
                         </div>
                      </div>

                      <div className="space-y-1.5">
                         <div className="flex justify-between items-center pl-1">
                            <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">CORPORATE PASSWORD</label>
                            <button className="text-[9px] font-bold text-[#AE328E] uppercase tracking-wider hover:underline">Forgot password?</button>
                         </div>
                         <div className="relative group">
                            <input 
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-3 pl-11 pr-11 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#AE328E]/20 focus:bg-white focus:border-[#AE328E]/20 transition-all placeholder:text-zinc-300 tracking-widest text-black appearance-none"
                              placeholder="••••••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-[#AE328E] transition-colors" />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                         </div>
                      </div>

                      <button 
                        onClick={onPasswordSubmit}
                        disabled={loading || !email || !password}
                        className="w-full bg-[#AE328E] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#912876] transition-all shadow-lg shadow-[#AE328E]/20 active:scale-[0.98] disabled:opacity-50"
                      >
                        {loading ? "Verifying..." : (
                          <>
                            Secure Login <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-zinc-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-[0.2em]">
                          <span className="bg-white px-3 text-zinc-300">OR LOGIN WITH SSO</span>
                        </div>
                      </div>

                      <button className="w-full border border-zinc-200 text-zinc-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-50 transition-all active:scale-[0.98]">
                         <div className="w-4 h-4 bg-[#F35325] flex flex-wrap p-0.5">
                            <div className="w-1.5 h-1.5 bg-white m-[0.5px]" />
                            <div className="w-1.5 h-1.5 bg-white m-[0.5px]" />
                            <div className="w-1.5 h-1.5 bg-white m-[0.5px]" />
                            <div className="w-1.5 h-1.5 bg-white m-[0.5px]" />
                         </div>
                         <span className="text-sm">Continue with Microsoft</span>
                      </button>
                    </div>
                 </div>

                 <div className="bg-zinc-50/50 p-6 border-t border-zinc-100 text-center">
                    <p className="text-[9px] text-zinc-400 font-medium leading-relaxed max-w-[240px] mx-auto">
                      By logging in, you agree to comply with Wema Bank&apos;s <span className="text-[#AE328E] font-bold cursor-pointer hover:underline uppercase">Acceptable Use Policy</span>. Unauthorized access is prohibited and monitored.
                    </p>
                 </div>
              </div>
            ) : (
              <div className="relative bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 text-black">
                {/* Visual Header with centered icon */}
                <div className="h-24 bg-linear-to-br from-[#AE328E]/5 via-[#AE328E]/10 to-transparent relative">
                   <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-[#AE328E]/10">
                      <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                         <Clock className="w-5 h-5 text-[#AE328E]" />
                      </div>
                   </div>
                </div>

                <div className="p-6 pt-10 flex flex-col items-center">
                  <h2 className="text-xl font-bold text-zinc-900 mb-1 tracking-tight">
                    {setupRequired ? "Set up 2FA" : "Enter Authenticator Code"}
                  </h2>
                  <p className="text-zinc-400 text-[11px] font-medium mb-4 text-center leading-relaxed">
                    {setupRequired 
                      ? "This is your first time logging in! Scan the QR code below with your corporate authenticator app (e.g., Microsoft/Google Authenticator), then enter the 6-digit code."
                      : "Open your corporate authenticator app (e.g., Microsoft/Google Authenticator) to get your 6-digit code."}
                  </p>

                  {setupRequired && otpauthUrl && (
                    <div className="mb-6 flex flex-col items-center animate-in zoom-in duration-300">
                      <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(otpauthUrl)}`} 
                          alt="2FA QR Code" 
                          className="w-32 h-32"
                        />
                      </div>
                    </div>
                  )}

                  {msg && <div className="w-full p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-medium mb-5 text-center">{msg}</div>}

                  <div className="flex gap-2 mb-6">
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
                        className="w-9 h-12 border-2 border-zinc-100 rounded-xl text-lg text-black text-center font-bold focus:ring-2 focus:ring-[#AE328E] focus:border-transparent outline-none transition-all appearance-none"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-6 text-[#AE328E]">
                     <Smartphone className="w-3.5 h-3.5" />
                     <span className="text-[10px] font-bold uppercase tracking-wider">Use authenticator app</span>
                  </div>

                  <button 
                    onClick={onTotpSubmit}
                    disabled={loading || otp.some(d => !d)}
                    className="w-full bg-[#AE328E] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#912876] transition-all shadow-lg shadow-[#AE328E]/20 active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : (
                      <>
                        Verify Access <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="relative py-6 w-full">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-zinc-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-[0.2em]">
                      <span className="bg-white px-3 text-zinc-300">OR</span>
                    </div>
                  </div>

                  <div className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4 flex gap-3">
                     <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-zinc-400" />
                     </div>
                     <div>
                        <div className="text-xs font-bold text-zinc-900 mb-0.5 tracking-tight">Having trouble?</div>
                        <div className="text-[9px] text-zinc-400 font-medium mb-1.5 leading-relaxed">If you can&apos;t access your app, request a one-time code.</div>
                        <button className="text-[10px] font-bold text-[#AE328E] hover:underline uppercase tracking-wider">Request SMS backup code</button>
                     </div>
                  </div>
                </div>

                <div className="bg-zinc-50/50 p-4 border-t border-zinc-100 text-center flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3 text-zinc-300" />
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Secured by Wema Bank</span>
                </div>
              </div>
            )}
            
            {/* Version Footer */}
            <div className="mt-8 flex items-center justify-center gap-6 text-[11px] font-bold text-zinc-400 uppercase tracking-widest text-black">
               <button className="hover:text-zinc-600 transition-colors">Privacy Policy</button>
               <button className="hover:text-zinc-600 transition-colors">Terms of Service</button>
               <div className="flex items-center gap-2 text-zinc-300">
                  <button className="hover:text-zinc-600 transition-colors uppercase">Contact Support</button>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
