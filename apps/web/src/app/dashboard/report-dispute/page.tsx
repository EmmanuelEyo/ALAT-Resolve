"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  ChevronDown,
  ShoppingCart,
  Zap,
  Utensils,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Headphones,
  UploadCloud,
  X,
  Image as ImageIcon,
  FileText,
  FileCheck,
  Mail,
  CheckCircle2,
  Target,
  Info,
} from "lucide-react";

export default function ReportDisputePage() {
  const [step, setStep] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const transactions = [
    { id: '1', icon: <ShoppingCart className="w-6 h-6" />, name: 'Shoprite Ikeja Mall', date: 'Oct 24, 2023 • 02:45 PM', amount: '-₦12,450.00' },
    { id: '2', icon: <Zap className="w-6 h-6" />, name: 'Ikeja Electric - Prepaid', date: 'Oct 23, 2023 • 10:12 AM', amount: '-₦5,000.00' },
    { id: '3', icon: <Utensils className="w-6 h-6" />, name: 'The Place Restaurant', date: 'Oct 22, 2023 • 08:30 PM', amount: '-₦8,200.00' },
    { id: '4', icon: <CreditCard className="w-6 h-6" />, name: 'Transfer to J. Doe', date: 'Oct 21, 2023 • 11:05 AM', amount: '-₦25,000.00' },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 w-full relative">
      {/* Page Header */}
      {step !== 4 && (
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-3">Report a Dispute</h1>
          <p className="text-slate-500">
            If you notice an issue with a transaction, we&apos;re here to help you resolve it.
          </p>
        </div>
      )}

      {/* Main Stepper Card */}
      {step !== 4 && (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-[#AE328E]/5 border border-[#AE328E]/5">
        {/* Progress Indicator */}
        <div className="px-8 py-6 border-b border-[#AE328E]/5 bg-slate-50/50">
          <div className="flex items-center justify-between relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 z-10 px-2 lg:bg-transparent bg-slate-50/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#AE328E] text-white shadow-lg shadow-[#AE328E]/30' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>1</div>
              <span className={`text-xs font-bold ${step >= 1 ? 'text-[#AE328E]' : 'text-slate-400'}`}>Select Transaction</span>
            </div>

            {/* Line 1 */}
            <div className={`absolute top-8 left-1/4 w-1/4 h-0.5 -z-0 ${step >= 2 ? 'bg-[#AE328E]' : 'bg-slate-200'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 z-10 px-2 lg:bg-transparent bg-slate-50/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#AE328E] text-white shadow-lg shadow-[#AE328E]/30' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>2</div>
              <span className={`text-xs font-semibold ${step >= 2 ? 'text-[#AE328E]' : 'text-slate-400'}`}>Dispute Details</span>
            </div>

            {/* Line 2 */}
            <div className={`absolute top-8 right-1/4 w-1/4 h-0.5 -z-0 ${step >= 3 ? 'bg-[#AE328E]' : 'bg-slate-200'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 z-10 px-2 lg:bg-transparent bg-slate-50/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#AE328E] text-white shadow-lg shadow-[#AE328E]/30' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>3</div>
              <span className={`text-xs font-semibold ${step >= 3 ? 'text-[#AE328E]' : 'text-slate-400'}`}>Review &amp; Submit</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#AE328E]/20 text-sm font-medium outline-none"
                  placeholder="Search by merchant or amount..."
                  type="text"
                />
              </div>
              <button className="px-6 py-3 bg-slate-50 rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">
                <Calendar className="w-5 h-5" />
                Last 30 Days
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Transaction List */}
            <div className="space-y-3">
              <div className="px-4 py-2 flex text-xs font-bold uppercase tracking-wider text-slate-400">
                <div className="flex-1">Merchant &amp; Date</div>
                <div className="w-32 text-right">Amount</div>
                <div className="w-20 text-center">Action</div>
              </div>

              {transactions.map((tx) => (
                <label 
                  key={tx.id} 
                  className={`group relative flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedTransaction === tx.id 
                    ? 'border-[#AE328E]/30 bg-[#AE328E]/5' 
                    : 'border-slate-100 hover:border-[#AE328E]/30 hover:bg-[#AE328E]/5'
                  }`}
                >
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[#AE328E] shadow-sm">
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{tx.name}</p>
                      <p className="text-xs text-slate-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="w-32 text-right font-black text-slate-900">
                    {tx.amount}
                  </div>
                  <div className="w-20 flex justify-center">
                    <input
                      checked={selectedTransaction === tx.id}
                      onChange={() => setSelectedTransaction(tx.id)}
                      className="w-5 h-5 accent-[#AE328E] border-slate-300 focus:ring-2 focus:ring-[#AE328E] ring-offset-2 cursor-pointer"
                      name="transaction"
                      type="radio"
                    />
                  </div>
                </label>
              ))}
            </div>

            {/* Footer Action */}
            <div className="mt-12 flex items-center justify-between border-t border-[#AE328E]/5 pt-8">
              <p className="text-sm text-slate-500">
                Need help? <Link href="#" className="text-[#AE328E] font-bold hover:underline">Contact Support</Link>
              </p>
              <div className="flex gap-4">
                <Link href="/dashboard" className="px-8 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-center">
                  Cancel
                </Link>
                <button
                  onClick={() => setStep(2)}
                  className={`px-10 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${
                    !selectedTransaction 
                    ? 'bg-[#AE328E] opacity-50 cursor-not-allowed' 
                    : 'bg-[#AE328E] hover:bg-[#912876] shadow-lg shadow-[#AE328E]/20'
                  }`}
                  disabled={!selectedTransaction}
                >
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-8 border-b border-[#AE328E]/10 pb-4">
              <h3 className="text-slate-900 text-xl font-bold">Dispute Information</h3>
              <p className="text-slate-500 text-sm mt-1">Providing more details helps us resolve this faster.</p>
            </div>
            
            <form className="space-y-6">
              {/* Dispute Reason Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="reason">Dispute Reason</label>
                <div className="relative">
                  <select 
                    className="block w-full rounded-lg border-none bg-slate-50 text-slate-900 py-3 px-4 focus:ring-2 focus:ring-[#AE328E]/20 transition-all appearance-none outline-none font-medium cursor-pointer" 
                    id="reason"
                    defaultValue=""
                  >
                    <option disabled value="">Select a reason...</option>
                    <option value="duplicate">Duplicate Charge</option>
                    <option value="unrecognized">Unrecognized Transaction</option>
                    <option value="incorrect_amount">Incorrect Amount Charged</option>
                    <option value="failed_atm">ATM Failed to Dispense Cash</option>
                    <option value="merchandise_not_received">Merchandise Not Received</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Description Textarea */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="description">Describe what happened</label>
                <textarea 
                  className="block w-full rounded-lg border-none bg-slate-50 text-slate-900 py-3 px-4 focus:ring-2 focus:ring-[#AE328E]/20 transition-all outline-none font-medium resize-y" 
                  id="description" 
                  placeholder="Tell us more about the issue..." 
                  rows={4}
                ></textarea>
              </div>
              
              {/* Upload Evidence Zone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Evidence</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#AE328E]/30 border-dashed rounded-xl bg-[#AE328E]/5 hover:bg-[#AE328E]/10 transition-colors cursor-pointer group">
                  <div className="space-y-2 text-center flex flex-col items-center">
                    <div className="mx-auto h-12 w-12 text-[#AE328E] group-hover:scale-110 transition-transform flex items-center justify-center">
                      <UploadCloud className="w-10 h-10" />
                    </div>
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label className="relative cursor-pointer rounded-md font-bold text-[#AE328E] hover:underline focus-within:outline-none" htmlFor="file-upload">
                        <span>Upload a file</span>
                        <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>
              
              {/* Previews */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#AE328E]/20 bg-slate-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="object-cover w-full h-full" alt="Receipt screenshot preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7dVLRoXenxdZfYeJIB-ESDtO6r1x4RP6T4e0J3wPZQVO8dYAFh3k4D9Ys-pPelVaSja6fLFhX3hpMXY2J0855C1oyIWsSN_Ni-VxZdBX15MWLQrwbjzT4kCEPHOwlnnJwEJK6a6ob8A3M5BgohKvV2tIES88BWffF8kVDviYNS4sw5u-La1BQSLlo-kDnhWrv0Sfa5nQ1sZZLFRXuozkvYYIzhYMLsWVi8QnCaB9krKdK7oyBILdxY3Fi9j4wNmkMHXRcTk-A_EA" />
                  </div>
                  <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors" type="button">
                    <X className="w-3 h-3" />
                  </button>
                  <p className="text-[10px] text-center mt-1 text-slate-500 truncate w-20">receipt_01.jpg</p>
                </div>
                <div className="relative group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#AE328E]/20 bg-slate-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="object-cover w-full h-full" alt="Mobile banking app screenshot preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUB43DivOljblhF5kFbP-LCm7aa2j_5vcvBVNUud7gme_O-w00-LZHO23yfXJeb-B05Nwwjy1rrTIfVt7Qzb8_lCnUAi7DMVOI0AqqHHcpDyxA61uHbdY0VdzEdAeS4kPz34-5q5fA5Y_L72O193NH21I8uva6P9OjNPlpxaQkWQgC9OhfDmVsA6QSIBoj2o4X_5nMQLh8IHH8JF5TJunoUzYMUzJrjPNfDdQexddC13vQxXXycQ3dzZA90L4zT07JMAfTu9MLhVM" />
                  </div>
                  <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors" type="button">
                    <X className="w-3 h-3" />
                  </button>
                  <p className="text-[10px] text-center mt-1 text-slate-500 truncate w-20">screenshot.png</p>
                </div>
              </div>
            </form>

            {/* Footer Buttons */}
            <div className="mt-12 flex items-center justify-between border-t border-[#AE328E]/5 pt-8">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors" 
                type="button"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-10 py-3 rounded-xl bg-[#AE328E] text-white font-bold hover:bg-[#912876] shadow-lg shadow-[#AE328E]/25 transition-all" 
                type="button"
              >
                Next Step
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Review Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Transaction Summary Card */}
                <div className="rounded-2xl border border-[#AE328E]/10 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Transaction Summary</h3>
                    <button onClick={() => setStep(1)} className="text-sm font-semibold text-[#AE328E] hover:underline">Edit Selection</button>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#AE328E]/10 shadow-sm">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#AE328E]/10 text-[#AE328E]">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-900 text-base">Shoprite Ikeja Mall</p>
                          <p className="text-sm text-slate-500">24 Oct 2023 • 14:32 PM</p>
                        </div>
                        <p className="font-black text-slate-900 text-lg">- ₦12,450.00</p>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Ref: WEMA-TRX-982341234</p>
                    </div>
                  </div>
                </div>

                {/* Dispute Details Card */}
                <div className="rounded-2xl border border-[#AE328E]/10 bg-slate-50/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Dispute Reason &amp; Evidence</h3>
                    <button onClick={() => setStep(2)} className="text-sm font-semibold text-[#AE328E] hover:underline">Change Reason</button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Selected Reason</label>
                      <p className="text-base font-semibold text-slate-800">Duplicate Billing / Charged Multiple Times</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Your Description</label>
                      <p className="text-sm leading-relaxed text-slate-600 italic">
                        &quot;I was charged twice for my monthly premium subscription. One charge was at 14:32 and another at 14:35 for the same amount. I only authorized one transaction.&quot;
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Attached Files</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                          <ImageIcon className="text-[#AE328E] w-5 h-5 shrink-0" />
                          <span className="text-sm font-medium truncate flex-1">netflix_receipt_v1.png</span>
                          <span className="text-xs text-slate-400">1.2 MB</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                          <FileText className="text-[#AE328E] w-5 h-5 shrink-0" />
                          <span className="text-sm font-medium truncate flex-1">bank_statement_oct.pdf</span>
                          <span className="text-xs text-slate-400">450 KB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Action */}
                <div className="rounded-2xl border-2 border-[#AE328E]/20 bg-[#AE328E]/5 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <input className="h-5 w-5 rounded border-[#AE328E]/30 text-[#AE328E] focus:ring-[#AE328E] accent-[#AE328E]" id="confirm" type="checkbox" />
                    </div>
                    <label className="text-sm text-slate-700" htmlFor="confirm">
                      <span className="font-bold text-slate-900">Security Confirmation:</span> I confirm that the details provided above are accurate to the best of my knowledge. I understand that submitting false claims may lead to administrative actions on my account.
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      onClick={() => setStep(4)}
                      className="flex-1 rounded-lg bg-[#AE328E] py-4 px-6 text-center text-base font-bold text-white shadow-lg shadow-[#AE328E]/25 hover:bg-[#912876] transition-all active:scale-[0.98]"
                    >
                      Submit Dispute
                    </button>
                    <button className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#AE328E]/5">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">What happens next?</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#AE328E]/10 text-[#AE328E]">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Triage Process</p>
                        <p className="text-sm text-slate-500 mt-1 leading-normal">Our specialized team reviews your claim against transaction logs and merchant policies.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#AE328E]/10 text-[#AE328E]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Estimated Timeframe</p>
                        <p className="text-sm text-slate-500 mt-1 leading-normal">Initial review is completed within 24-48 hours. Final resolution may take 7-10 business days.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#AE328E]/10 text-[#AE328E]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Instant Updates</p>
                        <p className="text-sm text-slate-500 mt-1 leading-normal">You&apos;ll receive email and push notifications at every stage of the resolution process.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-zinc-50 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Resources</p>
                    <Link className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-[#AE328E] transition-colors group" href="#">
                      Dispute FAQs
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="my-3 h-[1px] bg-slate-200 w-full"></div>
                    <Link className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-[#AE328E] transition-colors group" href="#">
                      Terms of Service
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-[#AE328E]/20 text-slate-500">
                  <ShieldCheck className="w-6 h-6 shrink-0 text-[#AE328E]/60" />
                  <p className="text-xs font-medium leading-tight">Your data is encrypted and handled according to PCI-DSS security standards.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      )}

      {/* Step 4: Success Screen */}
      {step === 4 && (
        <div className="flex-1 flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in-95 duration-500 w-full relative z-10">
          <div className="max-w-[640px] w-full bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#e42bee]/5 flex flex-col items-center text-center mx-auto">
            <div className="w-full max-w-[320px] mb-8">
              <div className="aspect-square w-full rounded-full bg-[#e42bee]/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#e42bee]/10 to-transparent"></div>
                <div className="relative z-10 size-48 flex items-center justify-center text-[#e42bee]">
                  <CheckCircle2 className="w-[120px] h-[120px]" strokeWidth={2} />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mb-10">
              <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Dispute Successfully Reported
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
                Your Ticket ID is <span className="text-[#e42bee] font-bold">#TRX-9921</span>. We&apos;ve started our automated triage process.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-[#e42bee] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity shadow-lg shadow-[#e42bee]/20">
                <Target className="w-6 h-6" />
                <span>Track Status</span>
              </button>
              <Link href="/dashboard" className="flex items-center justify-center rounded-full h-14 px-8 bg-[#e42bee]/10 text-[#e42bee] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#e42bee]/20 transition-all">
                Go to Dashboard
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#e42bee]/10 w-full">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[#e42bee]">
                  <Info className="w-4 h-4" />
                  <h4 className="text-sm font-bold leading-normal tracking-[0.015em] uppercase">How we decide</h4>
                </div>
                <p className="text-slate-400 text-sm leading-normal max-w-xs italic">
                  Our AI system is performing an initial check against transaction logs and merchant data to expedite your resolution.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-8 justify-center">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-medium uppercase tracking-wider">Secured by ALAT</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Headphones className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-medium uppercase tracking-wider">24/7 Support</span>
            </div>
          </div>
        </div>
      )}

      {/* Help Info Card - Only show on Step 1 */}
      {step === 1 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in duration-300">
          <div className="bg-[#AE328E]/5 p-5 rounded-xl border border-[#AE328E]/10 flex items-start gap-4">
            <ShieldCheck className="text-[#AE328E] w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Secure Process</h4>
              <p className="text-xs text-slate-500 mt-1">Your disputes are handled securely by our fraud team.</p>
            </div>
          </div>
          <div className="bg-[#AE328E]/5 p-5 rounded-xl border border-[#AE328E]/10 flex items-start gap-4">
            <Clock className="text-[#AE328E] w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">48h Resolution</h4>
              <p className="text-xs text-slate-500 mt-1">Most disputes are reviewed within 48 business hours.</p>
            </div>
          </div>
          <div className="bg-[#AE328E]/5 p-5 rounded-xl border border-[#AE328E]/10 flex items-start gap-4">
            <Headphones className="text-[#AE328E] w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">24/7 Support</h4>
              <p className="text-xs text-slate-500 mt-1">Call 0700-000-ALAT anytime for assistance.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Help Button - Fixed at bottom right */}
      <button className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#AE328E] text-white shadow-xl hover:scale-105 transition-transform z-50">
        <Headphones className="w-7 h-7" />
      </button>

      {/* Dynamic footer based on step */}
      <footer className={`py-10 text-center text-slate-400 text-xs ${step !== 1 ? 'mt-8 border-t border-slate-100' : ''}`}>
        <p>© 2024 Wema Bank PLC. All Rights Reserved. ALAT Resolve is powered by ALAT.</p>
      </footer>
    </main>
  );
}
