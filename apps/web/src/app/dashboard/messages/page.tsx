"use client";

import NextImage from "next/image";
import { 
  CloudOff,
  PlusCircle,
  Bot,
  AlertCircle,
  Hourglass,
  Paperclip,
  Smile,
  Send,
  Shield
} from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden text-slate-900 antialiased bg-[#f8f6f7]">
      <div className="hidden bg-amber-100 border-b border-amber-200 px-4 py-2 items-center justify-center gap-2 z-50">
        <CloudOff className="text-amber-700 w-5 h-5" />
        <p className="text-xs font-semibold text-amber-900">You are currently offline. Messages will be sent once connection is restored.</p>
      </div>

      <main className="flex flex-1 overflow-hidden font-[Inter,sans-serif]">
        <aside className="w-80 lg:w-96 border-r border-[#922778]/10 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-[#922778]/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Messages</h3>
              <button className="text-[#922778] flex items-center gap-1 text-sm font-bold">
                <PlusCircle className="w-5 h-5" />
                New Ticket
              </button>
            </div>
            <div className="flex gap-2 p-1 bg-[#f4f1f3] rounded-lg">
              <button className="flex-1 py-1.5 text-xs font-bold bg-white shadow-sm rounded-md text-slate-900">Active</button>
              <button className="flex-1 py-1.5 text-xs font-bold text-[#4B5563]">Archived</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="p-4 bg-[#F9F5F8] border-l-4 border-[#922778] cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#922778]">Ticket #42991</span>
                <span className="text-[11px] font-semibold text-slate-600">2m ago</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">POS Transaction Error</h4>
              <p className="text-xs text-[#4B5563] line-clamp-1 italic">Waiting for specialist review...</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-200">Specialist Review</span>
              </div>
            </div>
            <div className="p-4 border-b border-[#922778]/5 cursor-pointer hover:bg-[#f4f1f3]/50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Ticket #42882</span>
                <span className="text-[11px] font-semibold text-slate-600">1h ago</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">ATM Cash Retraction</h4>
              <p className="text-xs text-[#4B5563] line-clamp-1">Agent: We have initiated the reversal...</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-900 text-[10px] font-bold border border-green-200">Processing</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col bg-white relative">
          <div className="p-6 border-b border-[#922778]/10 shadow-sm z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-white bg-[#922778] px-2 py-0.5 rounded uppercase">Active</span>
                  <h1 className="text-lg font-bold text-slate-900">Ticket #42991: POS Transaction Error</h1>
                </div>
                <p className="text-sm font-medium text-slate-600">Last updated: Today at 2:45 PM</p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-64">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                  <span className="text-[#922778]">Received</span>
                  <span className="text-[#922778]">Review</span>
                  <span className="text-[#922778]">Specialist</span>
                  <span>Resolution</span>
                </div>
                <div className="relative h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-3/4 bg-[#922778] rounded-full"></div>
                  <div className="absolute top-0 left-1/4 w-px h-full bg-white/30"></div>
                  <div className="absolute top-0 left-2/4 w-px h-full bg-white/30"></div>
                  <div className="absolute top-0 left-3/4 w-px h-full bg-white/30"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide bg-slate-50/50">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-[#922778]/5 border border-[#922778]/20 rounded-xl p-4 flex gap-4">
                <div className="size-10 shrink-0 bg-[#922778]/20 rounded-lg flex items-center justify-center text-[#922778]">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#922778] mb-1">SAW AI Recap</h5>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    Currently waiting for specialist review of your uploaded receipt. The estimated resolution time is <span className="font-bold">2-4 business hours</span>. Your funds are protected.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex justify-center mb-2">
                  <span className="text-xs font-bold text-slate-600 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">TODAY, 10:15 AM</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden shrink-0 mt-1">
                    <NextImage alt="Agent" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6GnYUo4glZLbJgy4Kyb4N16y8v8NDNQ15VtMiRjklfbB7S6nc5mxUeOWWoieaY_PGJcIcFplFDGG6JXGQKijA46_vZbL9JncF86scHbz68ug3BDubzKCSydtdQcXTjiboTaXyTw82HwNKar3BS70dHNpwzFgKht8hN-Tcl6Rt9vq_MNmqHPUap7TmSSscdKi34y-yeVyo1L77uNVuAbLTUPPLQEqtTN_B0LeIqQL--BjWkCR9lOsqsdd5u9zDEufjux0Wtg95FVE" width={32} height={32} />
                  </div>
                  <div className="flex flex-col gap-2 max-w-[70%]">
                    <div className="bg-[#f3f4f6] p-4 rounded-2xl rounded-tl-none text-sm text-slate-900 shadow-sm border border-slate-200">
                      Hello Adewale, I&apos;ve received your complaint regarding the failed POS transaction. Could you please provide a screenshot of the debit alert?
                    </div>
                    <span className="text-xs font-semibold text-slate-600 ml-1">Grace from Wema Support</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex flex-col gap-2 items-end max-w-[75%]">
                    <div className="bg-[#922778] p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-md">
                      Sure thing. Here is the receipt from the POS terminal showing the &apos;Declined&apos; status even though I was debited.
                    </div>
                    
                    <div className="p-3 bg-white border-2 border-[#922778]/10 rounded-xl flex items-center gap-4 w-full max-w-sm shadow-sm">
                      <div className="size-14 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        <NextImage alt="Thumbnail" className="w-full h-full object-cover opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV6rLBqPTmMn_yorgBtfFR5yooKn9pUu9AKzJtS3ulfodyMV3zsXXzecIXc7xaa8u4M87Bc6-ReMMUNJnjEA3PH-_hs2vgXC6TQFX7mExKS99qV8GrLxLWtYpw5C8jrcVhiBd9KZiphNG2fKXbPl-BeSCJ1VWsWbq3LaMNp7Tzkx2O8PHj2Ch9iUfVsA6Y84keXIvC_qIhDXD9hPkon1o2MfrDPxRLVkOWdfC-DYuhY1W0Ypg02JG3vXF8OoKGrt2xsUEigXqymRY" width={56} height={56} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-slate-900">POS_Receipt_42991.jpg</p>
                        <p className="text-xs font-medium text-slate-600">1.2 MB</p>
                        <div className="flex gap-4 mt-1">
                          <button className="text-xs font-bold text-[#922778] hover:underline">Download</button>
                          <button className="text-xs font-bold text-red-600 hover:underline">Remove</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-4 w-full max-w-sm shadow-sm">
                      <div className="size-14 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                        <AlertCircle className="text-red-600 w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-red-900">Transaction_Alert.png</p>
                        <p className="text-xs font-medium text-red-700">Upload Failed</p>
                        <div className="flex gap-4 mt-1">
                          <button className="text-xs font-bold text-red-600 hover:underline">Retry</button>
                          <button className="text-xs font-bold text-slate-600 hover:underline">Remove</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#922778]/80 p-4 rounded-2xl rounded-tr-none text-sm text-white/90 shadow-md flex flex-col gap-2">
                      <span>I also noticed that the merchant said their terminal didn&apos;t print a confirmation.</span>
                      <div className="flex items-center justify-between pt-2 border-t border-white/20">
                        <div className="flex items-center gap-1.5">
                          <Hourglass className="w-4 h-4 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase">Queued</span>
                        </div>
                        <button className="text-[10px] font-bold underline hover:no-underline">Cancel</button>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 mr-1">10:22 AM · Delivered</span>
                  </div>
                  <div className="size-8 rounded-full bg-[#922778]/10 overflow-hidden shrink-0 mt-1">
                    <NextImage alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV6rLBqPTmMn_yorgBtfFR5yooKn9pUu9AKzJtS3ulfodyMV3zsXXzecIXc7xaa8u4M87Bc6-ReMMUNJnjEA3PH-_hs2vgXC6TQFX7mExKS99qV8GrLxLWtYpw5C8jrcVhiBd9KZiphNG2fKXbPl-BeSCJ1VWsWbq3LaMNp7Tzkx2O8PHj2Ch9iUfVsA6Y84keXIvC_qIhDXD9hPkon1o2MfrDPxRLVkOWdfC-DYuhY1W0Ypg02JG3vXF8OoKGrt2xsUEigXqymRY" width={32} height={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white border-t border-[#922778]/10">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 mb-3 px-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase">Supported:</span>
                <span className="text-[11px] font-bold text-[#922778]">PDF</span>
                <span className="text-[11px] font-bold text-[#922778]">PNG</span>
                <span className="text-[11px] font-bold text-[#922778]">JPG</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f4f1f3] rounded-4xl p-2 shadow-inner border border-[#922778]/5">
                <button className="p-2 hover:bg-[#922778]/10 rounded-full text-slate-600 hover:text-[#922778] transition-colors" title="Attach Files">
                  <Paperclip className="w-6 h-6" />
                </button>
                <input className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-900 placeholder:text-slate-500 font-medium" placeholder="Type your message here..." type="text" />
                <button className="p-2 hover:bg-[#922778]/10 rounded-full text-slate-600 hover:text-[#922778] transition-colors">
                  <Smile className="w-6 h-6" />
                </button>
                <button className="bg-[#922778] text-white size-11 rounded-4xl flex items-center justify-center hover:bg-[#922778]/90 transition-all shadow-lg active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-[11px] font-semibold text-slate-600 flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  This conversation is end-to-end encrypted and secured by Wema Bank.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
