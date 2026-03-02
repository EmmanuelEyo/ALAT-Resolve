"use client";

import React from 'react';
import Link from 'next/link';
import { 
  User, 
  Lock, 
  EyeOff, 
  Key, 
  ShieldCheck, 
  SmartphoneNfc, 
  MessageSquare, 
  Download, 
  Printer, 
  RefreshCcw, 
  Info, 
  LogOut 
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="bg-[#f8f6f7] text-[#171216] font-sans h-full w-full overflow-y-auto selection:bg-[#ae328f] selection:text-white">
      <div className="flex flex-col min-h-full">
        {/* Main Layout */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 flex flex-col gap-8">
              <div className="flex items-center gap-4 px-2">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-full h-16 w-16 shadow-sm"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBc7hP4rmTnRC-IfTtrR__6T9EH_24GCb708bqw82i5MgyjVqdB6gDmsy29TpvbBnwG5kYeMcPIyVmmoQNCz0l3lLyDu0fYIFkxm70QI6rOCwwREMFmNr8rvMzdDNvA-qLBAw4zoSQNydnQUoRrrZxTfWUNWIAbQMxI-bedPqmwI4-sKqc3bBiWWHIYxXd67Q9zir8zesUGPLcDtGFxVe6AHTltlZxUiV2NWBBKZ8qZKIabjv3BferjD-l2sepwGa64xJfBvvU_tfk")' }}
                />
                <div className="flex flex-col">
                  <h1 className="text-[#171216] text-lg font-bold">Sarah Jenkins</h1>
                  <p className="text-[#82687c] text-sm">sarah.j@example.com</p>
                </div>
              </div>
              
              <nav className="flex flex-col gap-1">
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ffffff] text-[#82687c] hover:text-[#171216] transition-all" href="/dashboard/profile">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Profile</span>
                </Link>
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ae328f]/10 text-[#ae328f] transition-all shadow-sm ring-1 ring-[#ae328f]/20" href="/dashboard/settings">
                  <Lock className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold">Security</span>
                </Link>
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ffffff] text-[#82687c] hover:text-[#171216] transition-all" href="/dashboard/privacy">
                  <EyeOff className="w-5 h-5" />
                  <span className="text-sm font-medium">Privacy</span>
                </Link>
              </nav>
            </aside>
            
            {/* Content Area */}
            <section className="lg:col-span-9 flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-col gap-2 mb-2">
                <h2 className="text-3xl font-bold text-[#171216] tracking-tight">Security Settings</h2>
                <p className="text-[#82687c] text-base">Manage your password and security preferences to keep your account safe.</p>
              </div>
              
              {/* Change Password Card */}
              <div className="bg-[#ffffff] rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#171216] mb-1">Change Password</h3>
                    <p className="text-sm text-[#82687c]">Ensure your account uses a long, random password to stay secure.</p>
                  </div>
                  <div className="text-[#ae328f] bg-[#ae328f]/10 p-2 rounded-lg">
                    <Key className="w-6 h-6" />
                  </div>
                </div>
                
                <form className="flex flex-col gap-5 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-[#171216]">Current Password</span>
                      <input 
                        className="w-full rounded-xl border-slate-200 bg-[#f8f6f7] px-4 py-3 text-[#171216] placeholder:text-[#82687c]/50 focus:border-[#ae328f] focus:ring-[#ae328f] focus:outline-none transition-colors border" 
                        placeholder="••••••••••••" 
                        type="password"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-[#171216]">New Password</span>
                      <input 
                        className="w-full rounded-xl border-slate-200 bg-[#f8f6f7] px-4 py-3 text-[#171216] placeholder:text-[#82687c]/50 focus:border-[#ae328f] focus:ring-[#ae328f] focus:outline-none transition-colors border" 
                        placeholder="Enter new password" 
                        type="password"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-[#171216]">Confirm Password</span>
                      <input 
                        className="w-full rounded-xl border-slate-200 bg-[#f8f6f7] px-4 py-3 text-[#171216] placeholder:text-[#82687c]/50 focus:border-[#ae328f] focus:ring-[#ae328f] focus:outline-none transition-colors border" 
                        placeholder="Confirm new password" 
                        type="password"
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-start mt-2">
                    <button 
                      className="bg-[#ae328f] hover:bg-[#942b7a] text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#ae328f] focus:outline-none" 
                      type="submit"
                    >
                      Update Password
                    </button>
                    <a className="ml-6 text-sm font-medium text-[#ae328f] hover:text-[#942b7a] underline decoration-[#ae328f]/30 underline-offset-4" href="#">
                      I forgot my password
                    </a>
                  </div>
                </form>
              </div>
              
              {/* MFA Section */}
              <div className="bg-[#ffffff] rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#171216] mb-1">Multi-Factor Authentication</h3>
                    <p className="text-sm text-[#82687c]">Add an extra layer of security to your account.</p>
                  </div>
                  <div className="text-green-600 bg-green-50 p-2 rounded-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-8">
                  {/* Authenticator App */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#f8f6f7] border border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm text-[#82687c]">
                        <SmartphoneNfc className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-[#171216]">Authenticator App</h4>
                        <p className="text-sm text-[#82687c] mt-1 max-w-md">Use an app like Google Authenticator or Authy to generate verification codes.</p>
                      </div>
                    </div>
                    <button className="shrink-0 bg-white border border-slate-200 text-[#171216] hover:border-[#ae328f] hover:text-[#ae328f] font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm focus:outline-none">
                      Setup
                    </button>
                  </div>
                  
                  {/* SMS Auth */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#f8f6f7] border border-slate-100 opacity-60">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm text-[#82687c]">
                        <MessageSquare className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-[#171216]">SMS Authentication</h4>
                        <p className="text-sm text-[#82687c] mt-1 max-w-md">Receive verification codes via SMS. (Not configured)</p>
                      </div>
                    </div>
                    <button className="shrink-0 bg-transparent border border-slate-200 text-[#82687c] font-medium px-5 py-2.5 rounded-lg cursor-not-allowed" disabled>
                      Enable
                    </button>
                  </div>
                  
                  <hr className="border-slate-100" />
                  
                  {/* Backup Codes */}
                  <div>
                    <h4 className="text-base font-semibold text-[#171216] mb-4">Backup Codes</h4>
                    <p className="text-sm text-[#82687c] mb-4">These codes can be used to access your account if you lose your device. Keep them somewhere safe.</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-sm text-[#171216]">
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">8273-1928</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center text-[#82687c] line-through decoration-slate-400">9182-3746</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">1029-3847</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">5647-3829</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">1928-3746</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">9283-7465</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">1029-3847</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-100 text-center">5647-3829</span>
                      </div>
                      <div className="flex gap-4 mt-4 pt-4 border-t border-slate-200">
                        <button className="text-sm font-medium text-[#ae328f] hover:text-[#942b7a] flex items-center gap-2 focus:outline-none">
                          <Download className="w-[18px] h-[18px]" /> Download
                        </button>
                        <button className="text-sm font-medium text-[#ae328f] hover:text-[#942b7a] flex items-center gap-2 focus:outline-none">
                          <Printer className="w-[18px] h-[18px]" /> Print
                        </button>
                        <button className="text-sm font-medium text-[#ae328f] hover:text-[#942b7a] flex items-center gap-2 ml-auto focus:outline-none">
                          <RefreshCcw className="w-[18px] h-[18px]" /> Generate New
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Danger Zone / Session Management */}
              <div className="bg-[#ffffff] rounded-2xl border border-red-100 shadow-sm p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-0" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-[#171216] mb-1">Session Management</h3>
                  <p className="text-sm text-[#82687c] mb-6">Log out of all other active sessions on other devices.</p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3 text-sm text-[#82687c]">
                      <Info className="w-5 h-5" />
                      <span>You are currently logged in on <span className="font-semibold text-[#171216]">Chrome (Windows)</span></span>
                    </div>
                    <button className="bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 focus:outline-none">
                      <LogOut className="w-5 h-5" />
                      Sign out from all devices
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        
        <footer className="mt-auto border-t border-slate-200 py-8 px-10 bg-[#ffffff]">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#82687c]">
            <p>© 2023 ALAT Resolve. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-[#ae328f]" href="#">Privacy Policy</a>
              <a className="hover:text-[#ae328f]" href="#">Terms of Service</a>
              <a className="hover:text-[#ae328f]" href="#">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
