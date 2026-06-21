import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function MemberLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Member";

  const getInitial = (name) => name?.charAt(0).toUpperCase() ?? "M";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { to: "/member",            label: "Beranda",          icon: "🏠" },
    { to: "/member/profil",     label: "Profil Saya",      icon: "👤" },
    { to: "/member/hewan",      label: "Hewan Peliharaan", icon: "🐾" },
    { to: "/member/kunjungan",  label: "Riwayat Kunjungan",icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-[#FEF6EE]">

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="text-xl font-black text-[#212153] shrink-0">
            MEW<span className="text-[#FF7A00]">.</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#FF7A00] transition-all">
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
          </nav>

          {/* Profil + logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                {getInitial(userName)}
              </div>
              <span className="hidden md:block text-sm font-bold text-[#212153]">{userName}</span>
            </div>
            <button onClick={handleLogout}
              className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50">
              Keluar
            </button>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="w-5 h-0.5 bg-slate-600 mb-1"/><div className="w-5 h-0.5 bg-slate-600 mb-1"/><div className="w-5 h-0.5 bg-slate-600"/>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#FF7A00]">
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 mt-1">
              🚪 Keluar
            </button>
          </div>
        )}
      </header>

      {/* ── Konten ── */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
