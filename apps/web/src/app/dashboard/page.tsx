"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Plus,
  Search,
  Clock,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Download,
  MessageSquare,
  ArrowUpRight,
  Headphones,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { Dispute } from "@shared-types/dispute";

type SessionShape = {
  user?: { name?: string; email?: string; role?: string };
};

export default function CustomerDashboard() {
  const [session, setSession] = useState<SessionShape | null>(null);
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        setSession(sessionData);

        if (sessionData?.user?.email) {
          const disputesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disputes?email=${sessionData.user.email}`);
          const disputesData = await disputesRes.json();
          setDisputes(disputesData);
        }
      } catch (err) {
        console.error("Failed to initialize dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <main className="flex-1 w-full px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Dashboard Header */}
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
                Dashboard
              </h1>
              <p className="text-zinc-500 font-medium">
                Overview of your active tickets and recent resolutions.
              </p>
            </div>

            {/* Active Ticket Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#AE328E]/5 text-[#AE328E] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                      ACTIVE PRIORITY
                    </span>
                    <span className="text-zinc-400 text-xs font-medium">
                      Last updated 2 hours ago
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                    Ticket #42991: POS Transaction Error
                  </h2>
                  <p className="text-zinc-500 text-sm mt-1">
                    Amount in dispute:{" "}
                    <span className="font-bold text-zinc-900">₦45,000.00</span>
                  </p>
                </div>
                <Link
                  href="/dashboard/disputes/TKT-8920"
                  className="text-[#AE328E] text-xs font-bold flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Progress Bar Visualization */}
              <div className="space-y-4">
                <div className="relative pt-2">
                  <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-[#AE328E] rounded-full" />
                  </div>
                  {/* Progress Motif Placeholder */}
                  <div className="absolute right-0 top-0 w-30 h-30 pointer-events-none  translate-x-6 -translate-y-25">
                    <Image
                      src="/Container (2).svg"
                      alt="Status"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 text-center">
                  <div className="text-left">
                    <div className="text-[#AE328E] text-[11px] font-bold uppercase tracking-wider mb-1">
                      Received
                    </div>
                    <div className="text-zinc-400 text-[11px] font-medium">
                      Oct 24
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#AE328E] text-[11px] font-bold uppercase tracking-wider mb-1">
                      Under Review
                    </div>
                    <div className="text-zinc-500 text-[11px] font-medium">
                      In Progress
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                      Specialist
                    </div>
                    <div className="text-zinc-300 text-[11px] font-medium">
                      Pending
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                      Resolution
                    </div>
                    <div className="text-zinc-300 text-[11px] font-medium">
                      Est. 24h
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Disputes Table */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Recent Disputes
                </h2>
                <div className="flex gap-2">
                  <button className="p-2.5 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all active:scale-95">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all active:scale-95">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[32px] shadow-sm border border-zinc-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-50">
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Ticket ID
                      </th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Subject
                      </th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Status
                      </th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {disputes.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-zinc-500 font-medium bg-zinc-50/50">
                          No disputes found. Started disputes will appear here.
                        </td>
                      </tr>
                    ) : (
                      disputes.map((row) => (
                        <tr
                          key={row._id || row.id}
                          onClick={() =>
                            router.push(
                              `/dashboard/disputes/${(row._id || row.id).replace("#", "")}`,
                            )
                          }
                          className="group hover:bg-zinc-50/50 transition-colors cursor-pointer"
                        >
                          <td className="px-8 py-6 text-sm font-bold text-zinc-900 tracking-tight">
                            {row.id}
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-bold text-zinc-900 tracking-tight">
                              {row.merchantName}
                            </div>
                            <div className="text-xs text-zinc-400 font-medium">
                              {row.reason}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span
                              className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wide inline-block ${
                                row.status === 'Resolved' ? 'bg-green-50 text-green-600 border border-green-100' :
                                row.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-100' :
                                'bg-yellow-50 text-yellow-600 border border-yellow-100'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-medium text-zinc-500 text-right">
                            {new Date(row.createdAt).toLocaleDateString() === new Date().toLocaleDateString() 
                              ? "Today" 
                              : new Date(row.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="p-4 bg-zinc-50/30 text-center border-t border-zinc-50">
                  <button className="text-zinc-400 text-xs font-bold hover:text-[#AE328E] transition-colors tracking-widest uppercase">
                    View All Disputes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[360px] space-y-6">
            {/* Quick Help Card */}
            <div className="bg-[#AE328E] rounded-[40px] p-5 text-white relative overflow-hidden shadow-2xl shadow-[#AE328E]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white/90" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Quick Help</h3>
              </div>

              <div className="relative mb-4">
                <input
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-2.5 pl-12 pr-4 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-medium"
                  placeholder="Search for help..."
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase mb-1.5">
                  SUGGESTED FOR YOU
                </div>
                <button className="w-full bg-white/5 hover:bg-white/10 transition-colors py-3 px-4 rounded-3xl text-left relative overflow-hidden border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    <div className="text-sm font-bold tracking-tight">
                      Dispense Errors
                    </div>
                  </div>
                  <div className="text-[11px] text-white/60 font-medium mt-1">
                    What to do if cash isn&apos;t dispensed?
                  </div>
                </button>
                <button className="w-full bg-white/5 hover:bg-white/10 transition-colors py-3 px-4 rounded-3xl text-left relative overflow-hidden border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    <div className="text-sm font-bold tracking-tight">
                      Chargeback Timeline
                    </div>
                  </div>
                  <div className="text-[11px] text-white/60 font-medium mt-1">
                    Standard wait times for refunds.
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-zinc-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                  Recent Activity
                </h3>
                <button className="text-[11px] font-bold text-[#AE328E] hover:underline uppercase tracking-widest decoration-2 underline-offset-4">
                  View All
                </button>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[3.5px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-100">
                <div className="relative pl-8 pb-1">
                  <div className="absolute left-0 top-1.5 w-[8px] h-[8px] bg-[#AE328E] rounded-full ring-4 ring-[#AE328E]/10" />
                  <div className="text-[13px] leading-relaxed">
                    <span className="font-bold text-[#AE328E]">
                      Support Agent
                    </span>{" "}
                    commented on ticket{" "}
                    <span className="font-bold text-[#AE328E]">#42991</span>
                  </div>
                  <div className="text-[12px] text-zinc-500 font-medium mt-2 p-3 bg-zinc-50 rounded-2xl border border-zinc-100/50 italic">
                    &quot;We have escalated this to the merchant bank...&quot;
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold mt-3 uppercase tracking-wider">
                    10 mins ago
                  </div>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-px top-1.5 w-[6px] h-[6px] bg-zinc-200 rounded-full" />
                  <div className="text-[13px] text-zinc-600 leading-relaxed font-medium">
                    You submitted a new dispute for{" "}
                    <span className="font-bold text-zinc-900">₦45,000</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold mt-2 uppercase tracking-wider">
                    2 hours ago
                  </div>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-px top-1.5 w-[6px] h-[6px] bg-green-500 rounded-full" />
                  <div className="text-[13px] text-zinc-600 leading-relaxed font-medium">
                    Ticket{" "}
                    <span className="font-bold text-[#38821]">#38821</span> was
                    marked as{" "}
                    <span className="font-bold text-green-600">Resolved</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold mt-2 uppercase tracking-wider">
                    Yesterday
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support Card */}
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#AE328E]/5 rounded-3xl flex items-center justify-center mb-5 ring-1 ring-[#AE328E]/10">
                <Headphones className="w-6 h-6 text-[#AE328E]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">
                Need Urgent Help?
              </h3>
              <p className="text-xs text-zinc-400 font-medium mb-8 max-w-[200px] leading-relaxed">
                Our support team is available 24/7 via ALAT Chat.
              </p>
              <button className="w-full border-2 border-[#AE328F] hover:border-[#AE328E]/30 hover:bg-[#AE328E]/5 transition-all py-3.5 rounded-full text-sm font-bold text-[#AE328F] active:scale-95">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
