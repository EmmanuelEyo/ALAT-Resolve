"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Lock, 
  EyeOff,
  Download,
  Eye,
  AlertTriangle
} from 'lucide-react';

export default function PrivacyPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="bg-[#f8f6f7] text-[#181116] font-sans h-full w-full overflow-y-auto selection:bg-[#af318e] selection:text-white">
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
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ffffff] text-[#82687c] hover:text-[#171216] transition-all" href="/dashboard/settings">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm font-medium">Security</span>
                </Link>
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#af318e]/10 text-[#af318e] transition-all shadow-sm ring-1 ring-[#af318e]/20" href="/dashboard/privacy">
                  <EyeOff className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold">Privacy</span>
                </Link>
              </nav>
            </aside>
            
            {/* Content Area */}
            <section className="lg:col-span-9 flex flex-col gap-8 max-w-[960px]">
              {/* Page Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Privacy & Settings</h1>
                <p className="text-slate-500 text-base font-normal leading-normal">Manage your personal data, export your history, and control account deletion.</p>
              </div>
              
              {/* Data Management Section */}
              <div className="space-y-4">
                <h2 className="text-slate-900 text-[22px] font-bold leading-tight tracking-[-0.015em]">Data Management</h2>
                
                {/* Export Data */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-[#e4dde2] bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#af318e]" />
                      <p className="text-slate-900 text-base font-bold leading-tight">Export Data</p>
                    </div>
                    <p className="text-slate-500 text-sm font-normal leading-normal max-w-lg mt-1">
                      Request a downloadable copy of your dispute history, personal information, and account logs.
                    </p>
                  </div>
                  <button className="flex items-center justify-center rounded-lg h-9 px-5 bg-[#af318e] hover:bg-[#942576] text-white text-sm font-medium leading-normal transition-colors shadow-sm shrink-0">
                    Request Export
                  </button>
                </div>
                
                {/* Profile Visibility */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-[#e4dde2] bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#af318e]" />
                      <p className="text-slate-900 text-base font-bold leading-tight">Profile Visibility</p>
                    </div>
                    <p className="text-slate-500 text-sm font-normal leading-normal max-w-lg mt-1">
                      Control who can see your profile details in public dispute records.
                    </p>
                  </div>
                  <div className="flex items-center shrink-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#af318e]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#af318e]"></div>
                      <span className="ml-3 text-sm font-medium text-slate-900">Public</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Danger Zone */}
              <div className="pt-4 pb-12">
                <div className="rounded-xl border border-red-500/30 bg-red-50/30 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-red-500 text-lg font-bold mb-1">Danger Zone</h3>
                    <p className="text-slate-600 text-sm mb-6">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-red-500/20">
                      <div>
                        <p className="text-slate-900 font-bold text-sm">Delete Account</p>
                        <p className="text-slate-500 text-sm mt-1">Permanently delete your account and all of your content.</p>
                      </div>
                      <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="flex items-center justify-center rounded-lg h-9 px-5 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium text-sm transition-all shadow-sm shrink-0"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Are you sure?</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                This action cannot be undone. This will permanently delete your account and remove all dispute history, files, and settings associated with <strong>user@alatresolve.com</strong>.
              </p>
              
              <div className="w-full mb-6 text-left">
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="confirm-password">
                  To confirm, type your password below
                </label>
                <input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="Current Password"
                  className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2.5 border"
                />
              </div>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 justify-center rounded-lg px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 justify-center rounded-lg px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm transition-colors">
                  Confirm Delete
                </button>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
              <p className="text-xs text-center text-slate-500">
                If you are having trouble, please <a href="#" className="text-[#af318e] hover:underline">contact support</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
