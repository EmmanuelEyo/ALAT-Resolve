"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  ClipboardList,
  CheckCircle2,
  Clock,
  Headphones,
  CreditCard,
  Wallet,
  Globe,
  Smartphone
} from "lucide-react";

const DISPUTES = [
  { id: "#42991", date: "Oct 24, 2023", subject: "POS Transaction Error", detail: "Merchant: GTBank Terminal", amount: "₦45,000.00", status: "In Review", statusType: "review", icon: CreditCard, iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  { id: "#38821", date: "Oct 20, 2023", subject: "Card Dispense Error", detail: "Wema ATM - Ikeja Branch", amount: "₦20,000.00", status: "Resolved", statusType: "resolved", icon: Wallet, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { id: "#35102", date: "Oct 15, 2023", subject: "Mobile App Transfer", detail: "Beneficiary: K. Mustapha", amount: "₦150,000.00", status: "Received", statusType: "received", icon: Smartphone, iconBg: "bg-green-100", iconColor: "text-green-600" },
  { id: "#31004", date: "Sep 15, 2023", subject: "Web Merchant Payment", detail: "Store: Amazon Inc", amount: "₦24,950.00", status: "Rejected", statusType: "rejected", icon: Globe, iconBg: "bg-red-100", iconColor: "text-red-600" },
  { id: "#29910", date: "Aug 02, 2023", subject: "Double Debit Charge", detail: "Merchant: Netflix Lagos", amount: "₦4,400.00", status: "Resolved", statusType: "resolved", icon: CreditCard, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
];

export default function AllDisputes() {
  const [activeStatus, setActiveStatus] = useState("All");

  return (
    <main className="flex-1 w-full px-8 py-10">
      <div className="flex gap-10">
        
        {/* Main Content: Disputes Table */}
        <div className="flex-1 space-y-8">
          
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-zinc-900 tracking-tight mb-2">Your Disputes</h1>
              <p className="text-zinc-500 font-medium">Track and manage all your historical and active support tickets.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search by ID or subject"
                  className="w-64 bg-white border border-zinc-200 rounded-full py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#AE328E]/20 transition-all shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all shadow-sm">
                <SlidersHorizontal className="w-4 h-4" />
                Advanced
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-8 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mr-2">STATUS:</span>
              {["All", "Open", "Resolved"].map((status) => (
                <button 
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    activeStatus === status 
                    ? "bg-[#AE328E] text-white border-[#AE328E] shadow-md shadow-[#AE328E]/20" 
                    : "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            
            <div className="h-6 w-px bg-zinc-200" />
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mr-2">TIME:</span>
              <button className="px-5 py-1.5 bg-white border border-zinc-100 rounded-full text-xs font-bold text-zinc-500 hover:border-zinc-200 transition-all">Last 30 days</button>
              <button className="px-5 py-1.5 bg-white border border-zinc-100 rounded-full text-xs font-bold text-zinc-500 hover:border-zinc-200 transition-all">Last 6 months</button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[40px] shadow-sm border border-zinc-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-50">
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">TICKET ID</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">DATE</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">SUBJECT</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">AMOUNT</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">STATUS</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {DISPUTES.map((dispute, i) => (
                  <tr key={i} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="px-8 py-7">
                      <span className="text-sm font-black text-zinc-900 tracking-tight">{dispute.id}</span>
                    </td>
                    <td className="px-8 py-7">
                      <span className="text-sm font-medium text-zinc-500">{dispute.date}</span>
                    </td>
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${dispute.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                          <dispute.icon className={`w-5 h-5 ${dispute.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-zinc-900 tracking-tight">{dispute.subject}</p>
                          <p className="text-[11px] font-semibold text-zinc-400">{dispute.detail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <span className="text-sm font-black text-zinc-900 tracking-tight">{dispute.amount}</span>
                    </td>
                    <td className="px-8 py-7">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg tracking-wider transition-all ${
                        dispute.statusType === 'review' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        dispute.statusType === 'resolved' ? 'bg-green-50 text-green-600 border border-green-100' :
                        dispute.statusType === 'received' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                        'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        {dispute.status}
                      </span>
                    </td>
                    <td className="px-8 py-7 text-center">
                      <Link 
                        href={`/dashboard/disputes/${dispute.id.replace('#', '')}`}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-[#AE328E] hover:underline decoration-2 underline-offset-4"
                      >
                        View Details
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-8 py-6 bg-zinc-50/30 flex justify-between items-center border-t border-zinc-50">
              <p className="text-xs font-bold text-zinc-400">Showing 1-5 of 12 disputes</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-zinc-600 hover:bg-white transition-all">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#AE328E] flex items-center justify-center text-xs font-black text-white shadow-lg shadow-[#AE328E]/20">1</button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-zinc-500 hover:bg-white transition-all">2</button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-zinc-500 hover:bg-white transition-all">3</button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-zinc-600 hover:bg-white transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-80 space-y-8">
          <div className="bg-white rounded-[40px] shadow-sm border border-zinc-100 p-8 space-y-8">
            <h3 className="text-xl font-black text-zinc-900 tracking-tight">Dispute Summary</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-black text-zinc-900 tracking-tight">03</p>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Open Disputes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-black text-zinc-900 tracking-tight">42</p>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Resolved</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#AE328E]" />
                </div>
                <div>
                  <p className="text-2xl font-black text-zinc-900 tracking-tight">4.2 <span className="text-sm font-bold text-zinc-400">Days</span></p>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Avg. Resolution Time</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-50 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-[#AE328E] uppercase tracking-widest mb-1">Efficiency Score</p>
                  <p className="text-2xl font-black text-zinc-900">98.5%</p>
                </div>
                <div className="w-12 h-12 relative flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-50" />
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset="1.8" className="text-[#AE328E]" />
                   </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Cards */}
          <div className="bg-[#AE328E] rounded-[40px] p-8 text-white space-y-6 shadow-2xl shadow-[#AE328E]/20 transition-transform hover:scale-[1.02]">
            <h3 className="text-xl font-black tracking-tight leading-tight">Need a faster response?</h3>
            <p className="text-sm font-medium text-white/80 leading-relaxed">
              Most dispense errors are resolved automatically within 24 hours. Check our KB first.
            </p>
            <button className="w-full bg-white text-[#AE328E] font-black py-4 rounded-2xl text-sm transition-all hover:bg-zinc-50 active:scale-95 shadow-lg">
              Knowledge Base
            </button>
          </div>

          <div className="bg-white border border-zinc-100 rounded-[40px] p-8 space-y-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto">
              <Headphones className="w-7 h-7 text-[#AE328E]" />
            </div>
            <div>
              <h4 className="text-lg font-black text-zinc-900 tracking-tight mb-1">Escalate Dispute</h4>
              <p className="text-xs font-semibold text-zinc-400">Talk to a resolution specialist for complex cases.</p>
            </div>
            <button className="w-full border-2 border-zinc-50 text-zinc-900 font-black py-4 rounded-2xl text-sm transition-all hover:bg-zinc-50 active:scale-95">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
