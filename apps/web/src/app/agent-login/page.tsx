"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function RedirectAgentLogin() {
  useEffect(() => {
    // Redirect users to the new standalone agent portal
    window.location.href = process.env.NEXT_PUBLIC_AGENT_APP_URL || "http://localhost:3001/login";
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF2F9] flex flex-col items-center justify-center font-sans text-[#1A1C1E]">
      <Loader2 className="w-8 h-8 animate-spin text-[#9D1154] mb-4" />
      <p className="text-sm text-zinc-600">Redirecting to the Agent Portal...</p>
    </div>
  );
}
