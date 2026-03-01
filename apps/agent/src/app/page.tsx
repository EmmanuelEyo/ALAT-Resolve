"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Filter, 
  ArrowUpDown,
  Clock,
  CheckCircle2,
  Shield,
  Smartphone,
  MessageSquare,
  Bold,
  Italic,
  Link2,
  Paperclip,
  SendHorizontal,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Command,
  Mail,
  History,
  LogOut,
  Settings
} from "lucide-react";

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || "http://localhost:3000";

type SessionShape = {
  user?: { name?: string; email?: string; role?: string };
};

export default function AgentHome() {
  const [activeTicket, setActiveTicket] = useState("DISP-9928");
  const [isOnline, setIsOnline] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // No-op for now as we are focusing on UI accuracy
  useEffect(() => {}, []);

  const handleSignOut = () => {
    const callback = encodeURIComponent(`${AUTH_BASE}/login`);
    window.location.href = `${AUTH_BASE}/api/auth/signout?callbackUrl=${callback}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-zinc-900 overflow-hidden h-screen">
      {/* Top Navigation */}
      <header className="bg-white border-b border-zinc-100 px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative rounded-lg bg-[#AE328E] flex items-center justify-center shadow-sm shadow-[#AE328E]/20">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-[17px] tracking-tight">ALAT Resolve</span>
          </div>

          <div className="relative group lg:w-80">
            <input 
              type="text"
              placeholder="Search Ticket ID, Customer Name..."
              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#AE328E]/10 focus:border-[#AE328E]/30 transition-all placeholder:text-zinc-400"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white px-1.5 py-0.5 border border-zinc-200 rounded-md shadow-sm opacity-60">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter flex items-center gap-0.5">
                <Command className="w-2.5 h-2.5" /> K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Assigned</div>
              <div className="text-sm font-extrabold">12</div>
            </div>
            <div className="h-8 w-px bg-zinc-100" />
            <div className="text-center">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Active SLA</div>
              <div className="text-sm font-extrabold text-red-500 font-mono">04:32:15</div>
            </div>
            <div className="h-8 w-px bg-zinc-100" />
            <div className="text-center">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Satisfaction</div>
              <div className="text-sm font-extrabold text-green-500">98%</div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l border-zinc-100 pl-8">
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isOnline ? 'bg-green-50 border-green-100 text-green-700' : 'bg-zinc-50 border-zinc-200 text-zinc-500'}`}
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-zinc-400'}`} />
              <span className="text-[11px] font-bold">{isOnline ? 'Online' : 'Offline'}</span>
            </button>
            <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
            </button>
            <div 
              className="flex items-center gap-3 pl-2 cursor-pointer group relative"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-9 h-9 rounded-full bg-zinc-100 border-2 border-zinc-50 overflow-hidden relative shadow-sm transition-transform group-hover:scale-105">
                <Image src="/Image+Border.svg" alt="Profile" fill className="object-cover" />
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform group-hover:translate-y-0.5" />

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsProfileOpen(false); }} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <div className="h-px bg-zinc-50 my-1 mx-2" />
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Queue */}
        <aside className="w-[340px] border-r border-zinc-100 bg-white flex flex-col shrink-0 overflow-hidden">
          <div className="p-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-[17px]">My Queue</h2>
              <span className="bg-[#AE328E]/10 text-[#AE328E] text-[11px] font-bold px-1.5 py-0.5 rounded-md">12</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-zinc-400 hover:bg-zinc-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-zinc-400 hover:bg-zinc-50 rounded-lg transition-colors">
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-5 pb-4 flex items-center gap-1.5 shrink-0">
            <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#AE328E] text-white shadow-sm shadow-[#AE328E]/20">All</button>
            <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-zinc-500 hover:bg-zinc-50">High Priority</button>
            <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-zinc-500 hover:bg-zinc-50">Unread</button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {[
              { id: "DISP-9928", title: "Failed Transfer - ₦50,000", time: "2m ago", snippet: "Customer reported money left account but recipient hasn't received it.", tag: "High", cat: "Transfer", active: true },
              { id: "DISP-9925", title: "Double Charge - Netflix", time: "15m ago", snippet: "Subscription fee deducted twice on same day.", tag: "Medium", cat: "Card" },
              { id: "DISP-9801", title: "KYC Update Request", time: "1h ago", snippet: "User asking how to update home address in app.", tag: "Low", cat: "Account" },
              { id: "DISP-9755", title: "Loan Disbursement Failed", time: "3h ago", snippet: "Loan approved but funds not reflected in wallet.", tag: "High", cat: "Loans" },
              { id: "DISP-9740", title: "Missing Direct Deposit", time: "5h ago", snippet: "Employer sent funds but they are not visible.", tag: "Medium", cat: "Deposit" },
            ].map((ticket) => (
              <div 
                key={ticket.id} 
                className={`p-5 border-b border-zinc-50 cursor-pointer transition-all relative ${ticket.id === activeTicket ? 'bg-[#AE328E]/3' : 'hover:bg-zinc-50/50'}`}
                onClick={() => setActiveTicket(ticket.id)}
              >
                {ticket.id === activeTicket && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#AE328E]" />
                )}
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[11px] font-bold text-[#AE328E] uppercase tracking-wider">{ticket.id}</span>
                  <span className="text-[10px] font-medium text-zinc-400">{ticket.time}</span>
                </div>
                <h3 className="font-bold text-sm text-zinc-900 mb-1 leading-tight">{ticket.title}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 mb-3 font-medium">{ticket.snippet}</p>
                <div className="flex items-center gap-1.5">
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                    ticket.tag === 'High' ? 'bg-red-50 text-red-600' : 
                    ticket.tag === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                  }`}>
                    <div className={`w-1 h-1 rounded-full ${
                      ticket.tag === 'High' ? 'bg-red-500' : 
                      ticket.tag === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                    {ticket.tag}
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[9px] font-bold uppercase tracking-wider">{ticket.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Triage Section */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
          {/* Main Content Decorative Background */}
          <div className="absolute inset-0 bg-linear-to-b from-[#AE328E]/2 to-transparent pointer-events-none" />

          {/* Ticket Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between shrink-0 relative z-10 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-extrabold text-xl tracking-tight">DISP-9928 - Failed Transfer</h2>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    <History className="w-3 h-3" />
                    In Progress
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-[11px] text-zinc-400 font-medium tracking-tight">Created via Mobile App • 10:23 AM today</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all active:scale-[0.98]">
                <ArrowUpRight className="w-4 h-4" /> Transfer
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-all active:scale-[0.98]">
                <TrendingUp className="w-4 h-4" /> Escalate
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]">
                <CheckCircle2 className="w-4 h-4" /> Resolve
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 custom-scrollbar">
            <div className="flex justify-center">
               <div className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full flex items-center gap-2">
                  <Shield size={12} className="text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Bot verified Customer ID at 10:00 AM</span>
               </div>
            </div>

            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold text-xs uppercase">JD</span>
               </div>
               <div className="space-y-2 max-w-[70%]">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-zinc-900">John Doe</span>
                     <span className="text-[10px] font-medium text-zinc-400">10:05 AM</span>
                  </div>
                  <div className="bg-[#F8FBFF] border border-zinc-100 p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-zinc-700 font-medium">
                     Hello, I tried to transfer 50,000 Naira to my brother&apos;s GTBank account this morning. The money left my account but he hasn&apos;t received it yet.
                  </div>
                  
                  <div className="relative w-72 h-48 rounded-2xl overflow-hidden border border-zinc-100 group cursor-zoom-in shadow-sm">
                    <Image src="/Image+Background.svg" fill alt="Transaction Receipt" className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                          <Search size={12} className="text-[#AE328E]" />
                          <span className="text-[10px] font-bold text-zinc-900 uppercase">View full image</span>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-center">
               <div className="px-4 py-1.5 bg-zinc-50 border border-zinc-100 rounded-xl">
                  <span className="text-[11px] font-bold text-zinc-500 italic uppercase tracking-wider">Ticket assigned to you</span>
               </div>
            </div>

            <div className="flex gap-4 justify-end">
               <div className="space-y-2 max-w-[70%] order-2">
                  <div className="flex items-center gap-2 justify-end">
                     <span className="text-[10px] font-medium text-zinc-400">10:24 AM</span>
                     <span className="text-sm font-bold text-[#AE328E]">You</span>
                  </div>
                  <div className="bg-[#AE328E] text-white p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed font-medium shadow-lg shadow-[#AE328E]/10">
                     Hello John. I apologize for the inconvenience. I can see the transaction attempt on our end. Let me quickly check the status with our switching partner.
                  </div>
               </div>
               <div className="w-10 h-10 rounded-full bg-[#AE328E]/10 border border-[#AE328E]/20 flex items-center justify-center shrink-0 order-3">
                  <span className="text-[#AE328E] font-bold text-[10px] uppercase">ME</span>
               </div>
            </div>
          </div>

          {/* Composer */}
          <div className="p-6 shrink-0 relative z-10">
             <div className="flex items-center gap-2 mb-3">
                {['greeting', 'apology', 'ask_details', 'transfer_policy'].map(tag => (
                   <button key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-wider hover:bg-[#AE328E]/5 hover:text-[#AE328E] transition-all">/{tag}</button>
                ))}
             </div>
             
             <div className="bg-white border-2 border-zinc-100 rounded-3xl overflow-hidden focus-within:border-[#AE328E]/30 transition-all shadow-sm">
                <div className="flex items-center gap-1 px-4 py-2 border-b border-zinc-50">
                   <button className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"><Bold size={16} /></button>
                   <button className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"><Italic size={16} /></button>
                   <button className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"><Link2 size={16} /></button>
                   <div className="h-5 w-px bg-zinc-100 mx-1" />
                   <button className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"><Paperclip size={16} /></button>
                </div>
                <div className="flex items-end gap-4 p-4">
                   <textarea 
                      placeholder="Type your reply here... (Press Enter to send)"
                      className="flex-1 bg-transparent resize-none h-20 text-sm font-medium focus:outline-none placeholder:text-zinc-300"
                   />
                   <button className="p-3 bg-[#AE328E] text-white rounded-2xl hover:bg-[#912876] transition-all shadow-lg shadow-[#AE328E]/20 active:scale-90">
                      <SendHorizontal size={20} />
                   </button>
                </div>
             </div>
          </div>
        </main>

        {/* Right Sidebar - Customer Profile */}
        <aside className="w-[360px] border-l border-zinc-100 bg-white flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          {/* Top Profile Header */}
          <div className="p-6 pt-8 text-center relative">
             <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-transparent via-[#AE328E] to-transparent" />
             <div className="w-20 h-20 rounded-3xl bg-zinc-100 border-4 border-white shadow-md overflow-hidden mx-auto mb-4 relative group cursor-pointer transition-transform hover:scale-105">
                <Image src="/Image+Background+Border+Shadow.svg" alt="John Doe" fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/20 text-[10px] font-bold text-white py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Edit</div>
             </div>
             <h3 className="font-extrabold text-xl tracking-tight mb-2">John Doe</h3>
             <div className="flex items-center justify-center gap-2">
                <div className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-widest border border-blue-100">Tier 3</div>
                <div className="px-2 py-0.5 rounded-md bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-widest border border-green-100">KYC Verified</div>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3 text-left">
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Customer Since</div>
                   <div className="text-sm font-extrabold">Aug 2021</div>
                </div>
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3 text-left">
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Risk Score</div>
                   <div className="flex items-center justify-between">
                      <div className="text-sm font-extrabold text-green-600">Low (12)</div>
                      <AlertCircle size={12} className="text-zinc-300" />
                   </div>
                </div>
             </div>

             <div className="mt-8 space-y-4 text-left">
                <div className="flex items-center gap-3 group cursor-pointer">
                   <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#AE328E] group-hover:bg-[#AE328E]/5 transition-all">
                      <Mail size={16} />
                   </div>
                   <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                   <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#AE328E] group-hover:bg-[#AE328E]/5 transition-all">
                      <Smartphone size={16} />
                   </div>
                   <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">+234 801 234 5678</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                   <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#AE328E] group-hover:bg-[#AE328E]/5 transition-all">
                      <ArrowDownLeft size={16} />
                   </div>
                   <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">Lagos, Nigeria</span>
                </div>
             </div>
          </div>

          <div className="p-6 pt-0 space-y-8">
             {/* Security Alert */}
             <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 opacity-20 rounded-full -mr-8 -mt-8" />
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-red-100">
                   <ShieldAlert className="text-red-500" size={20} />
                </div>
                <div>
                   <div className="text-xs font-extrabold text-red-700 mb-1 flex items-center gap-1.5">
                      Security Alert
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                   </div>
                   <p className="text-[11px] text-red-600 leading-relaxed font-medium">Multiple failed login attempts detected from new IP address (London, UK) 2 hours ago.</p>
                </div>
             </div>

             {/* Products & Accounts */}
             <div>
                <div className="flex items-center justify-between mb-4 px-1">
                   <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Products & Accounts</h4>
                   <ChevronRight size={14} className="text-zinc-300" />
                </div>
                <div className="space-y-3">
                   {[
                      { name: "ALAT Savings", id: "8922", balance: "450,230.50", status: "Active" },
                      { name: "Target Savings", id: "5512", balance: "1,200,000.00", status: "Active", sub: "Goal: New Car" },
                   ].map((acc, i) => (
                      <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 hover:border-[#AE328E]/20 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                           <div className="text-xs font-bold text-zinc-900 group-hover:text-[#AE328E] transition-colors">{acc.name}</div>
                           <ChevronRight size={14} className="text-zinc-300 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="flex items-baseline gap-1.5 mb-3">
                           <span className="text-[10px] font-bold text-zinc-400 tracking-tight">₦</span>
                           <span className="text-lg font-extrabold tracking-tight">{acc.balance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">**** {acc.id}</div>
                           <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-50 text-green-600 text-[8px] font-bold uppercase tracking-widest border border-green-100">{acc.status}</div>
                        </div>
                        {acc.sub && <div className="mt-2 text-[10px] text-zinc-400 font-medium italic">{acc.sub}</div>}
                      </div>
                   ))}
                </div>
             </div>

             {/* Recent Transactions */}
             <div>
                <div className="flex items-center justify-between mb-4 px-1">
                   <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Recent Transactions</h4>
                   <ArrowUpRight size={14} className="text-zinc-300" />
                </div>
                <div className="space-y-4">
                   {[
                      { icon: ArrowUpRight, color: 'text-zinc-400', name: "Netflix US", meta: "Today, 9:00 AM", amount: "- ₦4,500" },
                      { icon: LogOut, color: 'text-red-400', name: "Transfer to GTB", meta: "Today, 8:45 AM", amount: "- ₦50,000", highlight: true },
                      { icon: ArrowDownLeft, color: 'text-green-400', name: "Transfer from Ope", meta: "Yesterday", amount: "+ ₦25,000" },
                   ].map((tx, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-pointer">
                        <div className={`w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100 transition-colors group-hover:bg-white`}>
                           <tx.icon size={16} className={tx.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="text-xs font-bold text-zinc-900 mb-0.5 truncate">{tx.name}</div>
                           <div className="text-[10px] font-medium text-zinc-400 truncate">{tx.meta}</div>
                        </div>
                        <div className={`text-xs font-extrabold ${tx.amount.startsWith('+') ? 'text-green-600' : tx.highlight ? 'text-red-500' : 'text-zinc-900'}`}>
                           {tx.amount}
                        </div>
                      </div>
                   ))}
                </div>
             </div>

             <button className="w-full py-3.5 border border-zinc-100 bg-zinc-50/50 rounded-2xl text-[11px] font-bold text-[#AE328E] uppercase tracking-widest hover:bg-[#AE328E]/5 hover:border-[#AE328E]/20 transition-all mb-4">
                View Full Profile
             </button>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E4E4E7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D4D4D8;
        }
      `}</style>
    </div>
  );
}