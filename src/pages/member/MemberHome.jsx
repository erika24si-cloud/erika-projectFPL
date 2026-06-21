import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Toast } from "../../components/project/Toast";
import { useMembershipTiers } from "../../hooks/useMembershipTiers";

/**
 * Styling visual per tier.
 * Konten (range, benefits) sepenuhnya dari Supabase via useMembershipTiers.
 */
const TIER_STYLE = {
  Silver:   { icon:"🥈", badge:"bg-slate-100 text-slate-600",   border:"border-slate-200",  bg:"bg-slate-50",  btn:"bg-slate-500 hover:bg-slate-600",  highlight:false },
  Gold:     { icon:"🥇", badge:"bg-amber-100 text-amber-700",   border:"border-amber-200",  bg:"bg-amber-50",  btn:"bg-[#FF7A00] hover:bg-[#FF9F43]",  highlight:true  },
  Platinum: { icon:"💎", badge:"bg-purple-100 text-purple-700", border:"border-purple-200", bg:"bg-purple-50", btn:"bg-purple-600 hover:bg-purple-700", highlight:false },
};

const QUICK_LINKS = [
  { to:"/member/profil",    icon:"👤", label:"Profil Saya",       desc:"Lihat dan edit data diri" },
  { to:"/member/hewan",     icon:"🐾", label:"Hewan Peliharaan",  desc:"Data hewan dan rekam medis" },
  { to:"/member/kunjungan", icon:"📋", label:"Riwayat Kunjungan", desc:"Histori perawatan kamu" },
];

const TIER_ORDER = { Silver:1, Gold:2, Platinum:3 };

export default function MemberHome() {
  const { user }                        = useAuth();
  const { tiers, loading }              = useMembershipTiers(); // ← data dari Supabase
  const [activeTier,  setActiveTier]    = useState("Silver");
  const [toast,       setToast]         = useState({ visible:false, message:"", type:"success" });

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";
  const getInitial = (n) => n ? n.split(" ").map((w)=>w[0]).join("").substring(0,2).toUpperCase() : "M";

  const handleUpgrade = (tier) => {
    if (tier.level === activeTier) return;
    setActiveTier(tier.level);
    setToast({
      visible: true,
      message: `Permintaan upgrade ke ${tier.level} Member berhasil dikirim! Tim kami akan menghubungi kamu segera. 🐾`,
      type: "success",
    });
  };

  const currentTierStyle = TIER_STYLE[activeTier] ?? TIER_STYLE.Silver;

  return (
    <div className="w-full">

      {/* ── Welcome card ── */}
      <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl p-8 text-white mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {getInitial(userName)}
          </div>
          <div>
            <p className="text-indigo-300 text-sm mb-1">Selamat datang kembali 👋</p>
            <h1 className="text-2xl font-black">{userName}</h1>
            <p className="text-indigo-300 text-xs mt-1">{user?.email}</p>
          </div>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center">
          <p className="text-xs text-indigo-300 mb-1">Tier Aktif</p>
          <p className="text-2xl font-black text-[#FF7A00] leading-none">
            {currentTierStyle.icon} {activeTier}
          </p>
          <p className="text-xs text-indigo-300 mt-1">Member Klinik Mew</p>
        </div>
      </div>

      {/* ── Quick links ── */}
      <h2 className="text-lg font-extrabold text-[#212153] mb-4">Menu Cepat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {QUICK_LINKS.map((q) => (
          <Link key={q.to} to={q.to}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-50 group">
            <span className="text-3xl">{q.icon}</span>
            <h3 className="font-extrabold text-[#212153] text-base mt-3 mb-1 group-hover:text-[#FF7A00] transition-colors">{q.label}</h3>
            <p className="text-xs text-slate-500">{q.desc}</p>
          </Link>
        ))}
      </div>

      {/* ── Membership section — data dari Supabase ── */}
      <div className="mb-2 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#212153]">Membership & Benefit</h2>
          <p className="text-slate-500 text-sm mt-0.5">Pilih tier dan nikmati keistimewaannya.</p>
        </div>
        <Link to="/promo" className="text-xs text-[#FF7A00] font-bold hover:underline">
          Lihat semua promo →
        </Link>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 animate-pulse h-64"/>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {tiers.map((tier) => {
            const style      = TIER_STYLE[tier.level] ?? TIER_STYLE.Silver;
            const isActive   = activeTier === tier.level;
            const canUpgrade = TIER_ORDER[tier.level] > TIER_ORDER[activeTier];

            return (
              <div key={tier.id}
                className={`relative rounded-3xl border-2 p-6 transition-all
                  ${isActive
                    ? "border-[#FF7A00] bg-white shadow-xl shadow-orange-500/10"
                    : `${style.border} ${style.bg} shadow-sm`}
                `}>

                {/* Badge aktif */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-white text-xs font-black px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    ✓ Tier Aktif
                  </div>
                )}
                {/* Badge terpopuler */}
                {style.highlight && !isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#212153] text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                    Terpopuler
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{style.icon}</span>
                  <div>
                    <p className="font-extrabold text-lg text-[#212153]">{tier.level} Member</p>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.badge}`}>{tier.level}</span>
                  </div>
                </div>

                {/* Range — dari Supabase */}
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Akumulasi transaksi:<br/>
                  <span className="font-bold text-slate-600">{tier.range}</span>
                </p>

                {/* Benefits — dari Supabase */}
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-black shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tombol */}
                {isActive ? (
                  <button disabled className="w-full py-2.5 rounded-xl text-sm font-bold bg-orange-50 text-[#FF7A00] border border-orange-200 cursor-default">
                    Tier Kamu Sekarang
                  </button>
                ) : canUpgrade ? (
                  <button onClick={() => handleUpgrade(tier)}
                    className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${style.btn}`}>
                    Upgrade ke {tier.level} →
                  </button>
                ) : (
                  <button disabled className="w-full py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-400 cursor-not-allowed">
                    Tier Lebih Rendah
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-4 text-center">
        Upgrade tier diproses manual oleh admin setelah verifikasi akumulasi transaksi.
      </p>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible:false }))} />
    </div>
  );
}
