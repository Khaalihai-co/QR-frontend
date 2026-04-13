"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LandingForm from "@/app/campiagns/qr/coming-soon/pages/LandingForm";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 1000);

    const handleScroll = () => {
      if (window.scrollY > 60) setShowForm(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-125 h-125 bg-white/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center space-y-5">

        {/* 🔥 LOGO */}
        <div className="flex justify-center mb-4">
  <div className="relative w-35 h-35 rounded-full overflow-hidden bg-white p-6">
    <Image
      src="/Khaalihai-logo.png"
      alt="Khaalihai"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>

        {/* 🔥 BLOCK 1 */}
        <p className="text-xs tracking-widest text-gray-500 uppercase">
          Coming Soon
        </p>


        {/* 🔥 BLOCK 2 */}
        <p className="text-base text-gray-400 leading-relaxed font-bold">
          We’re building a better local experience.
        </p>

        {/* 🔥 BLOCK 3 */}
        <p className="text-sm text-gray-500">
          Launching shortly
        </p>

        {/* 🔥 FORM */}
        <div
          className={`pt-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            showForm
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {showForm && <LandingForm />}
        </div>
      </div>

      {/* 🔻 FOOTER */}
      <p className="relative z-10 text-xs text-gray-500 mt-16">
        © 2026 Khaalihai
      </p>
    </main>
  );
}