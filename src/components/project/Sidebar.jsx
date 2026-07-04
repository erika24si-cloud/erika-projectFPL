import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Toast } from "./Toast";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/dashboard",              label: "Beranda",            icon: "📊", end: true  },
  { to: "/dashboard/appointments", label: "Jadwal Temu",        icon: "📅", end: false },
  { to: "/dashboard/services",     label: "Kelola Layanan",     icon: "🩺", end: false },
  { to: "/dashboard/customers",    label: "Pelanggan & Hewan",  icon: "👥", end: false },
  { to: "/dashboard/users",        label: "Manajemen Pengguna", icon: "👤", end: false },
  { to: "/dashboard/membership",   label: "Keanggotaan",        icon: "🎖️", end: false },
];

export default function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setToast({ visible: true, message: "Gagal logout. Coba lagi.", type: "error" });
      return;
    }
    navigate("/");
  };

  const isActive = (to, end) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <aside className="w-[260px] bg-white border-r border-slate-100/70 h-full hidden md:flex flex-col py-7 px-4 z-20 shrink-0">

      <div className="px-3 mb-8">
        <div className="text-2xl font-black text-[#212153] tracking-tight flex items-center gap-0.5 select-none">
          MEW<span className="text-[#FF7A00]">.</span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Panel Admin Klinik</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-3 mb-2">Menu Utama</p>
        {NAV_ITEMS.map(({ to, label, icon, end }) => {
          const active = isActive(to, end);
          return (
            <NavLink key={to} to={to} end={end}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                ${active
                  ? "bg-gradient-to-r from-[#FF7A00] to-[#ff9130] text-white shadow-md shadow-orange-400/25"
                  : "text-slate-500 hover:bg-orange-50/70 hover:text-[#FF7A00]"
                }`}>
              <span className={`text-base transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`}>
                {icon}
              </span>
              <span className="tracking-wide">{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 pt-4 mt-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 py-2.5 px-3 text-rose-400 hover:bg-rose-50/70 hover:text-rose-500 rounded-xl transition-all duration-200 font-semibold text-sm group">
          <span className="text-base group-hover:-translate-x-0.5 transition-transform">🚪</span>
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
