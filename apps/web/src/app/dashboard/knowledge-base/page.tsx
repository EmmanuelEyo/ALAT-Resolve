"use client";

import { useState } from "react";
import { 
  Search,
  Command,
  MessageCircle, 
  ShieldCheck, 
  TrendingUp, 
  HelpCircle,
  ChevronRight,
  Shield,
  RefreshCw,
  Smartphone,
  CreditCard,
  Wallet,
  Coins,
  Headphones,
  Lock as LockIcon,
  Globe as GlobeIcon
} from "lucide-react";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Account Security", desc: "Passwords, 2FA, Biometrics", icon: Shield, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Transfers", desc: "Inter-bank, Int'l, Recurring", icon: RefreshCw, color: "text-red-500", bg: "bg-red-50" },
    { name: "Cards & Virtual", desc: "Requests, Pin, Blocks", icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Bill Payments", desc: "Airtime, Utilities, Tax", icon: Wallet, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Savings & Loans", desc: "ALAT Stash, Quick Loans", icon: Coins, color: "text-red-500", bg: "bg-red-50" },
    { name: "Support Center", desc: "Contact, Dispute Center", icon: Headphones, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="flex-1 bg-[#FBFBFC] max-w-7xl mx-auto">
      {/* Search Header Section */}
      <section className="py-20 px-8 text-center bg-white border-b border-zinc-100">
        <h1 className="text-5xl font-black text-zinc-900 mb-10 tracking-tight">How can SAW help you today?</h1>
        
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-[#AE328E]/5 blur-2xl group-focus-within:bg-[#AE328E]/10 transition-all rounded-full" />
          <div className="relative bg-white border border-zinc-100 rounded-full shadow-lg shadow-zinc-200/50 flex items-center p-2 pl-6 focus-within:ring-2 focus-within:ring-[#AE328E]/10 transition-all">
            <Search className="w-5 h-5 text-zinc-400 mr-3" />
            <input 
              type="text"
              placeholder="Search for solutions, error codes, or topics..."
              className="flex-1 bg-transparent border-none outline-none py-3 text-base font-medium text-zinc-900 placeholder:text-zinc-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1.5 border border-zinc-100 rounded-lg mr-2 shadow-sm opacity-60">
               <Command className="w-3 h-3 text-zinc-400" />
               <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">K</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
           <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mr-2">Trending:</span>
           {["#POS-Reversals", "#Failed-Transfers", "#ATM-Cash-Retraction", "#Account-Limit"].map((tag) => (
             <button key={tag} className="px-4 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-xs font-bold text-zinc-500 hover:bg-white hover:border-[#AE328E]/20 hover:text-[#AE328E] transition-all">
               {tag}
             </button>
           ))}
        </div>
      </section>

      <main className="w-full px-8 py-6">
        <div className="flex gap-12">
          
          {/* Main Content: "For You" and Category Browser */}
          <div className="flex-1 space-y-16">
            
            {/* For You Section */}
            <div className="space-y-8">
               <div className="flex items-center gap-2">
                 <TrendingUp className="w-5 h-5 text-[#AE328E]" />
                 <h2 className="text-2xl font-black text-zinc-900 tracking-tight">For You</h2>
               </div>

               <div className="grid grid-cols-1 gap-6">
                 {/* Main Promo Card */}
                 <div className="bg-[#AE328E] rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl shadow-[#AE328E]/10 transition-transform hover:scale-[1.01]">
                    {/* Abstract Grid Motif Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Motif.svg')] bg-repeat" />
                    
                    <div className="relative z-10 space-y-4">
                       <span className="inline-block px-2.5 py-1.2 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest">Dynamic Suggestion</span>
                       <h3 className="text-2xl font-black tracking-tight leading-tight max-w-md">Following up on Ticket #42991?</h3>
                       <p className="text-white/80 text-sm leading-relaxed max-w-sm font-medium">
                         Our POS Error Guide contains specific instructions for the transaction issue you reported yesterday.
                       </p>
                       <button className="bg-white text-[#AE328E] px-6 py-2.5 rounded-full text-xs font-black shadow-lg hover:bg-zinc-50 transition-all active:scale-95">
                         Read Guide
                       </button>
                    </div>

                    {/* Faded SVG Decoration in Background */}
                    <div className="absolute right-8 bottom-0 top-0 flex items-center justify-center opacity-10 scale-125 rotate-12">
                        <RefreshCw size={160} />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border border-zinc-100 rounded-[40px] p-8 space-y-4 hover:border-[#AE328E]/20 transition-all group cursor-pointer shadow-sm">
                       <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-6 h-6" />
                       </div>
                       <div>
                          <h4 className="font-black text-zinc-900 mb-1">Security Checklist</h4>
                          <p className="text-xs font-medium text-zinc-400 leading-relaxed">5 steps to ensure your ALAT account remains bulletproof.</p>
                       </div>
                    </div>

                    <div className="bg-white border border-zinc-100 rounded-[40px] p-8 space-y-4 hover:border-[#AE328E]/20 transition-all group cursor-pointer shadow-sm text-black">
                       <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                          < TrendingUp className="w-6 h-6" />
                       </div>
                       <div>
                          <h4 className="font-black text-zinc-900 mb-1">Increase Limits</h4>
                          <p className="text-xs font-medium text-zinc-400 leading-relaxed">Quickly upgrade your tier to handle larger transactions.</p>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Category Browser Section */}
            <div className="space-y-10">
               <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Browse by Category</h2>
               
               <div className="grid grid-cols-3 gap-8">
                  {categories.map((cat, i) => (
                    <div key={i} className="bg-white border border-zinc-50 rounded-[40px] p-8 text-center space-y-4 shadow-sm hover:shadow-xl hover:shadow-[#AE328E]/5 hover:-translate-y-1 transition-all group cursor-pointer">
                       <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform`}>
                          <cat.icon className="w-7 h-7" />
                       </div>
                       <div>
                          <h4 className="font-black text-zinc-900 mb-1">{cat.name}</h4>
                          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-wider">{cat.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <aside className="w-[380px] space-y-8">
            {/* AI Assistant Sidebar Card */}
            <div className="bg-[#0F1424] rounded-[48px] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#0F1424]/30">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#AE328E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#AE328E]/30">
                     <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-base tracking-tight leading-none mb-1">SAW AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                       <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Predictive Engine</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-[#1A2238] rounded-3xl rounded-tl-none p-5 text-sm font-medium leading-relaxed italic text-white/70">
                    &quot;Hi Tunde! I see you&apos;ve had a pending POS reversal for 24 hours. Would you like me to prioritize this ticket or explain the standard 48hr reversal timeline?&quot; |
                  </div>

                  <div className="space-y-2.5">
                     <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold py-3 rounded-2xl transition-all text-left px-5 flex justify-between items-center group">
                        Prioritize my ticket
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                     </button>
                     <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold py-3 rounded-2xl transition-all text-left px-5 flex justify-between items-center group">
                        Explain the timeline
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Quick Answers Card */}
            <div className="bg-white border border-zinc-100 rounded-[48px] p-10 space-y-8 shadow-sm">
               <h3 className="text-xl font-black text-zinc-900 tracking-tight">Quick Answers</h3>
               
               <div className="space-y-6">
                  {[
                    "How long do ATM refunds take?",
                    "Setting up International roaming",
                    "Resetting my transaction PIN",
                    "Report unauthorized transaction"
                  ].map((faq, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#AE328E]/5 group-hover:text-[#AE328E] transition-all">
                          <HelpCircle className="w-4 h-4" />
                       </div>
                       <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors leading-snug">{faq}</span>
                    </div>
                  ))}
               </div>

               <button className="w-full py-4 text-xs font-black text-[#AE328E] uppercase tracking-widest border-t border-zinc-50 pt-8 hover:underline decoration-2 underline-offset-8">
                 View all articles
               </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Still Stuck Footer Support Section */}
      <footer className="bg-white border-t border-zinc-100 pt-16 pb-12 px-8">
        <div className="w-full flex flex-col items-center gap-8">
           <div className="flex flex-col items-center gap-6 text-center">
              <div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight leading-none mb-3">Still stuck?</h2>
                <p className="text-sm font-medium text-zinc-400">Our support ninjas are ready to jump in.</p>
              </div>

              <div className="flex flex-col items-center gap-4">
                 <button className="bg-[#AE328E] text-white px-10 py-5 rounded-[24px] text-base font-black flex items-center gap-3 shadow-2xl shadow-[#AE328E]/30 hover:bg-[#912876] transition-all active:scale-95 group">
                   <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                   Start a Live Chat
                 </button>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Support is Online (Wait time: &lt; 2 mins)</span>
                 </div>
              </div>
           </div>

           <div className="w-full h-px bg-zinc-50 my-8" />

           <div className="w-full flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-zinc-300">
              <div className="flex items-center gap-8 text-black">
                 <button className="hover:text-[#AE328E] transition-colors">Privacy Policy</button>
                 <button className="hover:text-[#AE328E] transition-colors">Terms of Use</button>
                 <button className="hover:text-[#AE328E] transition-colors">Security Center</button>
              </div>
              
              <div className="flex items-center gap-6">
                 <GlobeIcon className="w-4 h-4 cursor-pointer hover:text-zinc-600 transition-colors" />
                 <LockIcon className="w-4 h-4 cursor-pointer hover:text-zinc-600 transition-colors" />
                 <Smartphone className="w-4 h-4 cursor-pointer hover:text-zinc-600 transition-colors" />
              </div>
              
              <span className="text-zinc-400">© 2024 WEMA BANK PLC. ALL RIGHTS RESERVED.</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
