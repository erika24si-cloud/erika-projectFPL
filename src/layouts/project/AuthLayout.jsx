import React from "react";
import { Outlet, Link } from "react-router-dom";

const PERKS = [
  { icon: "🩺", text: "Dokter hewan berpengalaman & bersertifikat" },
  { icon: "✂️", text: "Grooming profesional untuk semua jenis hewan" },
  { icon: "🏨", text: "Fasilitas penitipan nyaman & terpantau" },
  { icon: "🎁", text: "Promo eksklusif untuk anggota setia" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">

      <div className="hidden lg:flex w-[480px] shrink-0 bg-gradient-to-br from-[#212153] via-indigo-900 to-[#1a1840] flex-col justify-between p-12 relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#FF7A00]/10 blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full bg-[#FF7A00]/8 blur-3xl" />
        </div>

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <span className="text-3xl font-black text-white">
              MEW<span className="text-[#FF7A00]">.</span>
            </span>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest mt-1">Klinik Hewan</span>
          </Link>

          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Perawatan terbaik<br />
            untuk hewan<br />
            <span className="text-[#FF7A00]">kesayangan Anda</span>
          </h2>
          <p className="text-indigo-300 text-sm leading-relaxed max-w-xs">
            Bergabung bersama ribuan pelanggan yang telah mempercayakan
            perawatan hewan mereka kepada Klinik Mew.
          </p>
        </div>

        <div className="relative flex flex-col gap-4">
          {PERKS.map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
              <span className="text-xl shrink-0">{p.icon}</span>
              <p className="text-sm text-indigo-100 font-medium">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="relative flex items-center gap-4 pt-8 border-t border-white/10">
          <div className="flex -space-x-2">
            {["BS","SA","RR","DL","MP"].map((init, i) => (
              <div key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 border-2 border-[#212153] flex items-center justify-center text-white text-xs font-black">
                {init}
              </div>
            ))}
          </div>
          <div>
            <p className="text-white text-sm font-bold">300+ Pelanggan Aktif</p>
            <div className="flex items-center gap-0.5 mt-0.5">
              {"★★★★★".split("").map((_, i) => (
                <span key={i} className="text-[#FF7A00] text-xs">★</span>
              ))}
              <span className="text-indigo-400 text-xs ml-1">5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-[#FEF6EE] p-6 lg:p-12 overflow-y-auto">

        <div className="lg:hidden mb-8 text-center">
          <Link to="/">
            <span className="text-3xl font-black text-[#212153]">
              MEW<span className="text-[#FF7A00]">.</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 font-medium mt-1">Klinik Hewan Terpercaya</p>
        </div>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] p-8">
          <Outlet />
        </div>

        <p className="mt-6 text-xs text-slate-400 text-center">
          © 2026 Klinik Mew · Semua hak dilindungi
        </p>
      </div>
    </div>
  );
}
