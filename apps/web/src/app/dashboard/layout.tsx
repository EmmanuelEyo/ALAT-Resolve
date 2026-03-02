"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Plus, 
  Settings, 
  LogOut,
} from "lucide-react";
import Image from "next/image";

type SessionShape = {
  user?: { name?: string; email?: string; role?: string };
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionShape | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => setSession(data))
      .catch(() => setSession(null));
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "All Disputes", href: "/dashboard/all-disputes" },
    { name: "Messages", href: "/dashboard/messages" },
    { name: "Knowledge Base", href: "/dashboard/knowledge-base" },
  ];

  return (
    <div className="min-h-screen overflow-y-hidden bg-zinc-50 flex flex-col">
      {/* Global Navigation */}
      <nav className="bg-white border-b border-zinc-100 px-8 py-4 sticky top-0 z-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/dashboard" className="flex items-center gap-2 group transition-transform active:scale-95">
              <div className="w-8 h-8 relative">
                <Image src="/Background.svg" alt="ALAT Resolve" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl text-zinc-900 tracking-tight">ALAT Resolve</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="relative group">
                    <Link 
                      href={link.href} 
                      className={`text-sm font-semibold transition-colors ${
                        isActive 
                        ? "text-[#AE328E] pb-5 border-b-2 border-[#AE328E] translate-y-[21px]" 
                        : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard/report-dispute" className="bg-[#AE328E] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-[#912876] transition-all shadow-md shadow-[#AE328E]/20 active:scale-95">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <Plus className="w-3 h-3" />
              </div>
              Report a Dispute
            </Link>
            <div className="h-8 w-px bg-zinc-200" />
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-zinc-50 p-1.5 rounded-2xl transition-all active:scale-95"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-zinc-900">{session?.user?.name || "Tolu Adebayo"}</div>
                  <div className="text-[11px] text-zinc-500 font-medium lowercase">Savings Account</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#AE328E]/10 border-2 border-white shadow-sm overflow-hidden relative">
                   <Image src="/Container.svg" alt="User" fill />
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <div className="h-px bg-zinc-50 my-1 mx-2" />
                    <button 
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
