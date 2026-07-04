import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/member",           label: "Beranda",           icon: "🏠", end: true  },
  { to: "/member/profil",    label: "Profil Saya",       icon: "👤", end: false },
  { to: "/member/hewan",     label: "Hewan Peliharaan",  icon: "🐾", end: false },
  { to: "/member/kunjungan", label: "Riwayat Kunjungan", icon: "📋", end: false },
];

export default function MemberLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Anggota";

  const getInitials = (name) =>
    name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "A";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FEF6EE]">

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_12px_rgb(0,0,0,0.04)]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-xl font-black text-[#212153]">
              MEW<span className="text-[#FF7A00]">.</span>
            </span>
            <span className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mt-0.5">
              Portal Anggota
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? "bg-[#FF7A00] text-white shadow-md shadow-orange-400/20"
                    : "text-slate-500 hover:bg-orange-50 hover:text-[#FF7A00]"
                  }`
                }>
                <span>{l.icon}</span>{l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 pr-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white font-black text-xs shrink-0">
                {getInitials(userName)}
              </div>
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-sm font-bold text-[#212153] leading-none">{userName}</span>
                <span className="text-[10px] text-slate-400 font-medium">Anggota Mew</span>
              </div>
            </div>
            <button onClick={handleLogout}
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100">
              🚪 Keluar
            </button>

            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <span className="text-slate-600 font-bold text-lg leading-none">✕</span>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-slate-600 rounded"/>
                  <div className="w-5 h-0.5 bg-slate-600 rounded"/>
                  <div className="w-5 h-0.5 bg-slate-600 rounded"/>
                </div>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? "bg-[#FF7A00] text-white"
                    : "text-slate-600 hover:bg-orange-50 hover:text-[#FF7A00]"
                  }`
                }>
                <span>{l.icon}</span>{l.label}
              </NavLink>
            ))}
            <button onClick={handleLogout}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 mt-1">
              🚪 Keluar
            </button>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-100 bg-white/50 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">© 2026 Klinik Mew · Portal Anggota</p>
          <Link to="/" className="text-xs text-[#FF7A00] font-semibold hover:underline">← Kembali ke Beranda</Link>
        </div>
      </footer>
    </div>
  );
}
