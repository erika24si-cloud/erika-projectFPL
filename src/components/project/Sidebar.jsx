import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // Fungsi Logout Fungsional
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("mew_isLoggedIn");
    alert("Kamu telah berhasil keluar! 🐾");
    navigate("/login");
  };

  // STYLING BARU: Efek pendaran gradasi yang sangat cantik saat menu aktif
  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3.5 py-3 px-5 bg-gradient-to-r from-[#FF7A00] to-[#ff9130] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 scale-[1.02]"
      : "flex items-center gap-3.5 py-3 px-5 text-slate-500 hover:bg-orange-50/60 hover:text-[#FF7A00] font-semibold rounded-xl transition-all duration-200 group";

  return (
    // Menggunakan border-slate-100/70 yang tipis agar seimbang dengan glassmorphism navbar
    <aside className="w-[280px] bg-white border-r border-slate-100/70 h-full hidden md:flex flex-col py-8 px-5 z-20 shrink-0">
      
      {/* LOGO: Format disamakan dengan navbar, font dipercantik dengan tracking-tight */}
      <div className="text-2xl font-black mb-10 px-4 text-[#212153] tracking-tight flex items-center gap-1 select-none">
        MEW<span className="text-[#FF7A00] animate-pulse">.</span>
      </div>

      {/* Menu List Admin */}
      <div className="flex flex-col gap-2 flex-1">
        <NavLink to="/" className={activeClass} end>
          {/* Animasi bounce kecil pada emoji saat menu di-hover */}
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">📊</span> 
          <span className="text-sm tracking-wide">Overview</span>
        </NavLink>
        
        <NavLink to="/appointments" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">📅</span> 
          <span className="text-sm tracking-wide">Appointments</span>
        </NavLink>
        
        <NavLink to="/services" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">📋</span> 
          <span className="text-sm tracking-wide">Manage Services</span>
        </NavLink>
        
        <NavLink to="/customers" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">👥</span> 
          <span className="text-sm tracking-wide">Customers & Pets</span>
        </NavLink>

        <NavLink to="/membership" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">⭐</span> 
          <span className="text-sm tracking-wide">Membership</span>
        </NavLink>
      </div>
      

      {/* Bagian Bawah: Tombol Keluar yang Elegan */}
      <div className="border-t border-slate-100/80 pt-5 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 py-3 px-5 text-rose-500 hover:bg-rose-50/60 hover:text-rose-600 rounded-xl transition-all duration-200 font-bold text-sm text-left group"
        >
          <span className="text-lg transition-transform duration-200 group-hover:-translate-x-0.5">🚪</span> 
          <span className="tracking-wide">Keluar</span>
        </button>
      </div>

    </aside>
  );
}