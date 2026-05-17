import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Styling: Jika aktif background oranye & teks putih, jika tidak aktif teks abu-abu & hover oranye muda
  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 py-3 px-5 bg-[#FF7A00] text-white font-bold rounded-xl transition-all shadow-md"
      : "flex items-center gap-3 py-3 px-5 text-gray-500 hover:bg-orange-50 hover:text-[#FF7A00] font-medium rounded-xl transition-all";

  return (
    // Background diubah jadi bg-white, ditambahkan border-r (garis batas kanan) agar terpisah dari konten
    <aside className="w-[260px] bg-white border-r border-gray-100 h-full hidden md:flex flex-col py-8 px-4 z-20">
      
      {/* Logo Dashboard (Teks diubah jadi #212153 agar kontras dengan background putih) */}
      <div className="text-3xl font-extrabold mb-10 px-4 text-[#212153] tracking-wide">
        Mew Admin<span className="text-[#FF7A00]">.</span>
      </div>

      {/* Menu List Admin */}
      <div className="flex flex-col gap-2 flex-1">
        <NavLink to="/" className={activeClass} end>
          <span className="text-xl">📊</span> Overview
        </NavLink>
        <NavLink to="/appointments" className={activeClass}>
          <span className="text-xl">📅</span> Appointments
        </NavLink>
        <NavLink to="/services" className={activeClass}>
          <span className="text-xl">📋</span> Manage Services
        </NavLink>
        <NavLink to="/customers" className={activeClass}>
          <span className="text-xl">👥</span> Customers & Pets
        </NavLink>
      </div>

      {/* Bagian Bawah (Logout) */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <NavLink to="/login" className="flex items-center gap-3 py-3 px-5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium">
          <span className="text-xl">🚪</span> Keluar
        </NavLink>
      </div>

    </aside>
  );
}