"use client";

import React from 'react';
import Link from 'next/link';
import { 
  User, 
  Lock, 
  EyeOff,
  Pencil,
  ShieldAlert,
  Download,
  ChevronDown
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="bg-[#f8f6f7] text-[#181116] font-sans h-full w-full overflow-y-auto selection:bg-[#ca169a] selection:text-white">
      <div className="flex flex-col min-h-full">
        {/* Main Layout */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation (Maintained from Settings) */}
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
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ae328f]/10 text-[#ae328f] transition-all shadow-sm ring-1 ring-[#ae328f]/20" href="/dashboard/profile">
                  <User className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold">Profile</span>
                </Link>
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ffffff] text-[#82687c] hover:text-[#171216] transition-all" href="/dashboard/settings">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm font-medium">Security</span>
                </Link>
                <Link className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ffffff] text-[#82687c] hover:text-[#171216] transition-all" href="/dashboard/privacy">
                  <EyeOff className="w-5 h-5" />
                  <span className="text-sm font-medium">Privacy</span>
                </Link>
              </nav>
            </aside>
            
            {/* Content Area */}
            <section className="lg:col-span-9">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="xl:col-span-2 flex flex-col gap-8">
                  {/* Page Header */}
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[#181116] text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Profile & Notifications</h1>
                    <p className="text-[#88637e] text-base font-normal">Manage your personal information and alert preferences</p>
                  </div>
                  
                  {/* Personal Profile Section */}
                  <section className="bg-[#ffffff] rounded-xl border border-[#e5dce3] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-[#181116] text-[22px] font-bold leading-tight tracking-[-0.015em]">Personal Profile</h2>
                      <button className="text-[#ca169a] hover:text-[#ca169a]/80 font-medium text-sm flex items-center gap-1">
                        <Pencil className="w-[18px] h-[18px]" />
                        Edit Profile
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col gap-2">
                        <span className="text-[#181116] text-sm font-semibold">Full Name</span>
                        <div className="relative">
                          <input 
                            className="w-full rounded-lg border border-[#e5dce3] bg-[#f8f6f7] text-[#181116] h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#ca169a]/20 cursor-default" 
                            readOnly 
                            value="Alex Morgan"
                          />
                          <Lock className="w-[18px] h-[18px] absolute right-3 top-3.5 text-[#88637e]" />
                        </div>
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-[#181116] text-sm font-semibold">Email Address</span>
                        <div className="relative">
                          <input 
                            className="w-full rounded-lg border border-[#e5dce3] bg-[#f8f6f7] text-[#181116] h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#ca169a]/20 cursor-default" 
                            readOnly 
                            value="alex.morgan@example.com"
                          />
                          <Lock className="w-[18px] h-[18px] absolute right-3 top-3.5 text-[#88637e]" />
                        </div>
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-2">
                        <span className="text-[#181116] text-sm font-semibold">Phone Number</span>
                        <div className="relative">
                          <input 
                            className="w-full rounded-lg border border-[#e5dce3] bg-[#f8f6f7] text-[#181116] h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#ca169a]/20 cursor-default" 
                            readOnly 
                            value="+1 (555) 123-4567"
                          />
                          <Lock className="w-[18px] h-[18px] absolute right-3 top-3.5 text-[#88637e]" />
                        </div>
                      </label>
                    </div>
                  </section>
                  
                  {/* Notification Preferences Section */}
                  <section className="bg-[#ffffff] rounded-xl border border-[#e5dce3] p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                      <h2 className="text-[#181116] text-[22px] font-bold leading-tight tracking-[-0.015em]">Notification Preferences</h2>
                      <div className="flex items-center gap-3 bg-[#f8f6f7] p-1 rounded-lg border border-[#e5dce3]">
                        <label className="text-xs font-semibold uppercase text-[#88637e] pl-3" htmlFor="frequency">Frequency:</label>
                        <div className="relative flex items-center">
                          <select 
                            className="bg-transparent border-none text-sm font-medium text-[#181116] focus:ring-0 py-1 pl-1 pr-8 cursor-pointer appearance-none" 
                            id="frequency"
                          >
                            <option>Immediate</option>
                            <option>Daily Digest</option>
                            <option>Weekly Summary</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#181116] absolute right-2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b border-[#e5dce3]">
                            <th className="text-left py-4 px-2 font-medium text-[#88637e] text-sm w-1/2">Category</th>
                            <th className="text-center py-4 px-2 font-medium text-[#88637e] text-sm w-1/6">Email</th>
                            <th className="text-center py-4 px-2 font-medium text-[#88637e] text-sm w-1/6">SMS</th>
                            <th className="text-center py-4 px-2 font-medium text-[#88637e] text-sm w-1/6">Push</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#e5dce3] group hover:bg-[#f8f6f7] transition-colors">
                            <td className="py-4 px-2">
                              <div className="flex flex-col">
                                <span className="text-[#181116] font-semibold text-sm">Dispute Updates</span>
                                <span className="text-[#88637e] text-xs mt-0.5">Status changes and resolution outcomes</span>
                              </div>
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                defaultChecked 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                defaultChecked 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                defaultChecked 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-[#e5dce3] group hover:bg-[#f8f6f7] transition-colors">
                            <td className="py-4 px-2">
                              <div className="flex flex-col">
                                <span className="text-[#181116] font-semibold text-sm">Security Alerts</span>
                                <span className="text-[#88637e] text-xs mt-0.5">Login attempts and password changes</span>
                              </div>
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                defaultChecked 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                defaultChecked 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                          </tr>
                          <tr className="group hover:bg-[#f8f6f7] transition-colors">
                            <td className="py-4 px-2">
                              <div className="flex flex-col">
                                <span className="text-[#181116] font-semibold text-sm">Marketing & Offers</span>
                                <span className="text-[#88637e] text-xs mt-0.5">New features and promotional updates</span>
                              </div>
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                            <td className="text-center py-4 px-2">
                              <input 
                                className="rounded border-[#e5dce3] text-[#ca169a] focus:ring-[#ca169a] h-5 w-5 cursor-pointer accent-[#ca169a]" 
                                type="checkbox"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="bg-[#ca169a] hover:bg-[#ca169a]/90 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm shadow-[#ca169a]/30">
                        Save Changes
                      </button>
                    </div>
                  </section>
                </div>
                
                {/* Right Sidebar */}
                <div className="xl:col-span-1 flex flex-col gap-6">
                  {/* Data Privacy Card */}
                  <div className="bg-[#ca169a]/5 rounded-xl border border-[#ca169a]/20 p-6">
                    <div className="flex items-center gap-3 mb-4 text-[#ca169a]">
                      <ShieldAlert className="w-[22px] h-[22px]" />
                      <h3 className="font-bold text-lg">Data Privacy</h3>
                    </div>
                    <p className="text-[#181116] text-sm leading-relaxed mb-6">
                      We are committed to protecting your personal data. You can request a copy of all data associated with your account at any time. The file will be sent to your registered email address.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-[#e5dce3] hover:border-[#ca169a] text-[#181116] hover:text-[#ca169a] px-4 py-3 rounded-lg font-medium text-sm transition-all shadow-sm">
                      <Download className="w-[18px] h-[18px]" />
                      Download My Data
                    </button>
                  </div>
                  
                  {/* Help Card */}
                  <div className="bg-[#ffffff] rounded-xl border border-[#e5dce3] p-6">
                    <h3 className="font-bold text-lg text-[#181116] mb-2">Need Help?</h3>
                    <p className="text-[#88637e] text-sm mb-4">Contact our support team if you have trouble updating your profile.</p>
                    <a className="text-[#ca169a] font-medium text-sm hover:underline" href="#">Visit Help Center →</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        
        <footer className="mt-auto border-t border-[#e5dce3] bg-[#ffffff] py-8 px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#88637e] text-sm">© 2024 ALAT Resolve. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-[#88637e] hover:text-[#ca169a] text-sm" href="#">Privacy Policy</a>
              <a className="text-[#88637e] hover:text-[#ca169a] text-sm" href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
