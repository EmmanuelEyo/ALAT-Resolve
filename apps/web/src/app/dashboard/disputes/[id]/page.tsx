"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  User, 
  MessageSquare,
  FileText, 
  Image as ImageIcon, 
  Plus, 
  SendHorizontal,
  Search,
  Bot,
  UserCheck2,
  History,
  Smartphone,
  MapPin
} from "lucide-react";

export default function DisputeDetails() {
  const [message, setMessage] = useState("");

  const timelineSteps = [
    {
      title: "Dispute Received",
      time: "Oct 24, 10:00 AM",
      description: "Request initiated by Customer",
      status: "completed",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      extra: (
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-xl">
          <Smartphone size={14} className="text-zinc-400" />
          <span className="text-[11px] font-bold text-zinc-500">Ticket created via Mobile App</span>
        </div>
      )
    },
    {
      title: "Automated Triage",
      time: "Oct 24, 10:02 AM",
      description: "Processed by ALAT AI System",
      status: "completed",
      icon: <Bot className="w-5 h-5 text-green-500" />,
      extra: (
        <div className="mt-3 flex gap-2">
          <div className="px-2 py-1 bg-purple-50 border border-purple-100 rounded-md flex items-center gap-1.5">
             <CheckCircle2 size={12} className="text-purple-600" />
             <span className="text-[10px] font-bold text-purple-600 uppercase tracking-tight">72% Confidence Match</span>
          </div>
          <div className="px-2 py-1 bg-blue-50 border border-blue-100 rounded-md flex items-center gap-1.5">
             <span className="text-[10px] font-bold text-blue-600">Category: Fraud</span>
          </div>
        </div>
      )
    },
    {
      title: "Specialist Assigned",
      time: "Current Step",
      description: (
        <>
          <span className="font-bold text-zinc-900">Sarah Jenkins</span> • Senior Analyst
        </>
      ),
      status: "active",
      icon: <UserCheck2 className="w-5 h-5 text-white" />,
      content: (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-zinc-600 leading-relaxed font-medium">
            Sarah is currently reviewing your transaction history and the evidence provided. Typically, this review takes 24-48 hours.
          </p>
          <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
             <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative">
                <Image src="/Overlay.svg" alt="Sarah" fill className="object-cover" />
             </div>
             <p className="text-[12px] text-zinc-500 italic font-medium leading-relaxed">
               &quot;I&apos;m looking into this for you, Alex. I&apos;ll update you shortly.&quot;
             </p>
          </div>
        </div>
      )
    },
    {
      title: "Final Decision",
      time: "Pending Review Completion",
      description: "",
      status: "pending",
      icon: <Clock className="w-5 h-5 text-zinc-300" />,
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col pb-24">
      {/* Breadcrumbs and Ticket Header */}
      <div className="bg-white px-8 py-8 border-b border-zinc-100 mb-8">
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
            <Link href="/dashboard" className="hover:text-zinc-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/dashboard" className="hover:text-zinc-600 transition-colors">Disputes</Link>
            <ChevronRight size={14} />
            <span className="text-[#AE328E]">Ticket #TKT-8920</span>
          </div>

          <div className="flex items-start justify-between">
             <div className="space-y-4">
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Dispute #TKT-8920</h1>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-zinc-400 leading-none">Unauthorized Transaction:</h2>
                  <h2 className="text-2xl font-bold text-zinc-400 leading-tight">Netflix Premium</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1.5 bg-yellow-50 text-yellow-600 border border-yellow-100 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    Under Review
                  </span>
                  <span className="text-xs font-bold text-zinc-400">Last updated: Today, 09:15 AM</span>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-900 text-[13px] font-bold shadow-sm hover:bg-zinc-50 transition-all active:scale-95">
                  <Download size={16} />
                  Export Report
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#AE328E] rounded-xl text-white text-[13px] font-bold shadow-xl shadow-[#AE328E]/20 hover:bg-[#912876] transition-all active:scale-95">
                  <HelpCircle size={16} />
                  Get Help
                </button>
             </div>
          </div>
        </div>
      </div>

      <main className="w-full px-8 py-10 flex gap-8">
        {/* Left: Resolution Timeline */}
        <div className="flex-1 bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden flex flex-col">
           <div className="px-10 py-8 border-b border-zinc-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-[#AE328E]/5 flex items-center justify-center">
                    <History className="w-5 h-5 text-[#AE328E]" />
                 </div>
                 <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">Resolution Timeline</h3>
              </div>
              <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-md text-[10px] font-bold text-zinc-400 uppercase tracking-wider">EST Timezone</span>
           </div>

           <div className="p-10 relative">
              <div className="absolute top-0 bottom-0 left-13 w-0.5 bg-zinc-100" />
              
              <div className="space-y-12">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-8 relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ring-1 ring-zinc-50 ${
                      step.status === 'completed' ? 'bg-green-50' : 
                      step.status === 'active' ? 'bg-[#AE328E] ring-[#AE328E]/20' : 
                      'bg-white'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-lg font-bold ${step.status === 'pending' ? 'text-zinc-300' : 'text-zinc-900'}`}>{step.title}</h4>
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">{step.time}</span>
                      </div>
                      <p className={`text-sm font-medium ${step.status === 'pending' ? 'text-zinc-300' : 'text-zinc-500'}`}>{step.description}</p>
                      
                      {step.status === 'active' && (
                        <div className="mt-2 text-[10px] font-extrabold text-[#AE328E] uppercase tracking-widest bg-[#AE328E]/5 inline-block px-2 py-0.5 rounded">Current Step</div>
                      )}

                      {step.extra}
                      {step.content}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[380px] space-y-8">
           {/* What happens next Card */}
           <div className="bg-[#AE328E]/5 border border-[#AE328E]/10 rounded-[40px] p-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-2xl bg-[#AE328E]/10 flex items-center justify-center">
                    <Search size={18} className="text-[#AE328E]" />
                 </div>
                 <h3 className="text-xl font-bold text-zinc-900 tracking-tight">What happens next?</h3>
              </div>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed mb-8">
                Our specialist Sarah is reviewing your evidence against the merchant&apos;s records. You don&apos;t need to do anything right now.
              </p>
              <div className="bg-white/80 rounded-2xl p-4 flex items-center justify-between border border-[#AE328E]/5 shadow-sm">
                 <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Estimated Resolution</span>
                 <span className="text-sm font-extrabold text-zinc-900">Oct 26 - Oct 27</span>
              </div>
           </div>

           {/* Evidence Card */}
           <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Evidence</h3>
                 <button className="text-[11px] font-bold text-[#AE328E] hover:underline uppercase tracking-widest decoration-2 underline-offset-4">Manage</button>
              </div>

              <div className="space-y-4 mb-6">
                 <div className="flex items-center gap-4 p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100 group hover:border-[#AE328E]/20 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                       <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-zinc-900 mb-0.5">Statement_Oct2023.pdf</div>
                       <div className="text-[10px] font-medium text-zinc-400 uppercase">1.2 MB • Uploaded Oct 24</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100 group hover:border-[#AE328E]/20 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                       <ImageIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-zinc-900 mb-0.5">Screenshot_Error.png</div>
                       <div className="text-[10px] font-medium text-zinc-400 uppercase">840 KB • Uploaded Oct 24</div>
                    </div>
                 </div>
              </div>

              <button className="w-full border-2 border-dashed border-[#AE328E]/20 hover:border-[#AE328E]/40 transition-all py-4 rounded-3xl text-xs font-bold text-[#AE328E] flex items-center justify-center gap-2 group active:scale-[0.98]">
                 <div className="w-5 h-5 rounded-full bg-[#AE328E]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={14} />
                 </div>
                 Upload New Evidence
              </button>
           </div>

           {/* Transaction Details Card */}
           <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm p-8">
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6">TRANSACTION DETAILS</h3>
              
              <div className="space-y-5">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-500">Merchant</span>
                    <span className="text-sm font-bold text-zinc-900">Netflix.com</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-500">Date</span>
                    <span className="text-sm font-bold text-zinc-900">Oct 23, 2023</span>
                 </div>
                 <div className="h-px bg-zinc-50 my-2" />
                 <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-zinc-900">Amount Disputed</span>
                    <span className="text-xl font-black text-zinc-900">$19.99</span>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Message Input Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-zinc-100 px-8 py-5 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
         <div className="max-w-5xl mx-auto flex items-center gap-4">
            <div className="flex-1 relative">
               <input 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 className="w-full bg-zinc-50 border border-zinc-100 rounded-full py-4 pl-12 pr-6 text-sm font-medium placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#AE328E]/20 transition-all"
                 placeholder="Type a message to support (Sarah Jenkins)..."
               />
               <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>
            <button className="bg-[#AE328E] text-white px-8 h-14 rounded-full text-sm font-extrabold flex items-center gap-2 hover:bg-[#912876] transition-all shadow-xl shadow-[#AE328E]/20 active:scale-95 group">
              Send Message
              <SendHorizontal className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
    </div>
  );
}

