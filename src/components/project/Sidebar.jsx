import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Toast } from "./Toast";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setToast({ visible: true, message: "Gagal logout. Coba lagi.", type: "error" });
      return;
    }
    // AuthContext otomatis reset user → ProtectedRoute redirect ke /login
    navigate("/login");
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3.5 py-3 px-5 bg-gradient-to-r from-[#FF7A00] to-[#ff9130] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 scale-[1.02]"
      : "flex items-center gap-3.5 py-3 px-5 text-slate-500 hover:bg-orange-50/60 hover:text-[#FF7A00] font-semibold rounded-xl transition-all duration-200 group";

  return (
    <aside className="w-[280px] bg-white border-r border-slate-100/70 h-full hidden md:flex flex-col py-8 px-5 z-20 shrink-0">

      {/* Logo */}
      <div className="text-2xl font-black mb-10 px-4 text-[#212153] tracking-tight flex items-center gap-1 select-none">
        MEW<span className="text-[#FF7A00] animate-pulse">.</span>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 flex-1">
        <NavLink to="/" className={activeClass} end>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">📊</span>
          <span className="text-sm tracking-wide">Overview</span>
        </NavLink>
        <NavLink to="/appointments" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">📅</span>
          <span className="text-sm tracking-wide">Appointments</span>
        </NavLink>
        <NavLink to="/customers" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">👥</span>
          <span className="text-sm tracking-wide">Customers & Pets</span>
        </NavLink>
        <NavLink to="/users" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">👤</span>
          <span className="text-sm tracking-wide">Manage User</span>
        </NavLink>
          <NavLink to="/services" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">📋</span>
          <span className="text-sm tracking-wide">Manage Services</span>
        </NavLink>
        <NavLink to="/membership" className={activeClass}>
          <span className="text-lg transition-transform duration-250 group-hover:scale-110">🎖️</span>
          <span className="text-sm tracking-wide">Membership</span>
        </NavLink>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100/80 pt-5 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 py-3 px-5 text-rose-500 hover:bg-rose-50/60 hover:text-rose-600 rounded-xl transition-all duration-200 font-bold text-sm text-left group"
        >
          <span className="text-lg transition-transform duration-200 group-hover:-translate-x-0.5">🚪</span>
          <span className="tracking-wide">Keluar</span>
        </button>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </aside>
  );
}
