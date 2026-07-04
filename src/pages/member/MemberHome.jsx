import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Toast } from "../../components/project/Toast";
import { useMembershipTiers } from "../../hooks/useMembershipTiers";
import { supabase } from "../../lib/supabase";

const TIER_STYLE = {
  Silver:   { icon:"🥈", badge:"bg-slate-100 text-slate-600",   border:"border-slate-200",  bg:"bg-slate-50",  btn:"bg-slate-500 hover:bg-slate-600",  barColor:"bg-slate-400"  },
  Gold:     { icon:"🥇", badge:"bg-amber-100 text-amber-700",   border:"border-amber-200",  bg:"bg-amber-50",  btn:"bg-[#FF7A00] hover:bg-[#FF9F43]",  barColor:"bg-amber-400"  },
  Platinum: { icon:"💎", badge:"bg-purple-100 text-purple-700", border:"border-purple-200", bg:"bg-purple-50", btn:"bg-purple-600 hover:bg-purple-700", barColor:"bg-purple-500" },
};

const TIER_ORDER = { Silver: 1, Gold: 2, Platinum: 3 };

const LAYANAN_ICONS = { "Perawatan Medis":"🩺", "Grooming Premium":"✂️", "Penitipan Hewan":"🏨" };

const QUICK_LINKS = [
  { to:"/member/profil",    icon:"👤", label:"Profil Saya",       desc:"Lihat dan edit data diri",         color:"bg-blue-50 text-blue-600"   },
  { to:"/member/hewan",     icon:"🐾", label:"Hewan Peliharaan",  desc:"Data hewan dan rekam medis",       color:"bg-orange-50 text-[#FF7A00]" },
  { to:"/member/kunjungan", icon:"📋", label:"Riwayat Kunjungan", desc:"Histori perawatan kamu",           color:"bg-green-50 text-green-600" },
  { to:"/promo",            icon:"🎁", label:"Promo & Manfaat",   desc:"Lihat penawaran eksklusif",        color:"bg-purple-50 text-purple-600"},
];

export default function MemberHome() {
  const { user }           = useAuth();
  const { tiers, loading } = useMembershipTiers();

  const [activeTier,    setActiveTier]    = useState("Silver");
  const [kunjungan,     setKunjungan]     = useState([]);
  const [loadKunjungan, setLoadKunjungan] = useState(true);
  const [toast,         setToast]         = useState({ visible: false, message: "", type: "success" });

  const userName   = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anggota";
  const getInitials = (n) => n ? n.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "A";

  useEffect(() => {
    const fetchKunjungan = async () => {
      setLoadKunjungan(true);
      try {
        const { data } = await supabase
          .from("appointments")
          .select("*")
          .order("tanggal_transaksi", { ascending: false })
          .limit(3);
        if (data) setKunjungan(data);
      } catch { }
      finally { setLoadKunjungan(false); }
    };
    fetchKunjungan();
  }, []);

  const handleUpgrade = (tier) => {
    if (tier.level === activeTier) return;
    setActiveTier(tier.level);
    setToast({
      visible: true,
      message: `Permintaan naik ke tingkatan ${tier.level} berhasil dikirim! Tim kami akan segera menghubungi kamu. 🐾`,
      type: "success",
    });
  };

  const currentTierStyle = TIER_STYLE[activeTier] ?? TIER_STYLE.Silver;
  const currentTierData  = tiers.find((t) => t.level === activeTier);

  const now      = new Date();
  const greeting = now.getHours() < 11 ? "Selamat pagi" : now.getHours() < 15 ? "Selamat siang" : now.getHours() < 18 ? "Selamat sore" : "Selamat malam";

  return (
    <div className="w-full">

      <div className="bg-gradient-to-br from-[#212153] via-indigo-900 to-[#1a1840] rounded-3xl p-7 text-white mb-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white text-xl font-black shadow-lg shrink-0">
              {getInitials(userName)}
            </div>
            <div>
              <p className="text-indigo-300 text-sm">{greeting} 👋</p>
              <h1 className="text-xl font-black mt-0.5">{userName}</h1>
              <p className="text-indigo-400 text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3.5 text-center backdrop-blur-sm">
              <p className="text-xs text-indigo-300 mb-1">Tingkatan Aktif</p>
              <p className="text-xl font-black text-[#FF7A00] leading-none">
                {currentTierStyle.icon} {activeTier}
              </p>
              <p className="text-xs text-indigo-400 mt-1">Anggota Klinik Mew</p>
            </div>
            {currentTierData && (
              <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3.5 text-center backdrop-blur-sm hidden sm:block">
                <p className="text-xs text-indigo-300 mb-1">Manfaat Aktif</p>
                <p className="text-xl font-black text-white leading-none">{currentTierData.benefits.length}</p>
                <p className="text-xs text-indigo-400 mt-1">Keuntungan</p>
              </div>
            )}
          </div>
        </div>

        {currentTierData && (
          <div className="relative mt-5 bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-indigo-300 font-bold mb-2">MANFAAT TINGKATAN {activeTier.toUpperCase()} KAMU:</p>
            <div className="flex flex-wrap gap-2">
              {currentTierData.benefits.map((b) => (
                <span key={b} className="text-xs bg-white/10 text-indigo-100 px-2.5 py-1 rounded-lg font-medium border border-white/10">
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 className="text-base font-extrabold text-[#212153] mb-4">Menu Cepat</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {QUICK_LINKS.map((q) => (
          <Link key={q.to} to={q.to}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-50 group">
            <div className={`w-10 h-10 rounded-xl ${q.color} bg-opacity-15 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}
              style={{ background: undefined }}>
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${q.color.replace("text-", "bg-").split(" ")[0]}/10`}>
                {q.icon}
              </span>
            </div>
            <h3 className="font-extrabold text-[#212153] text-sm mb-0.5 group-hover:text-[#FF7A00] transition-colors leading-tight">{q.label}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{q.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#212153]">Kunjungan Terbaru</h2>
            <Link to="/member/kunjungan" className="text-xs text-[#FF7A00] font-bold hover:underline">Lihat semua →</Link>
          </div>
          {loadKunjungan ? (
            <div className="p-6 flex flex-col gap-3">
              {[1,2,3].map((i) => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : kunjungan.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-3xl mb-2">📋</p>
              <p className="text-sm text-slate-500 font-semibold">Belum ada kunjungan tercatat.</p>
              <Link to="/promo" className="text-xs text-[#FF7A00] font-bold hover:underline mt-1 block">Lihat promo kunjungan pertama →</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {kunjungan.map((k, i) => (
                <div key={k.id_customer ?? i} className="px-6 py-3.5 flex items-center gap-3 hover:bg-orange-50/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-base shrink-0">
                    {LAYANAN_ICONS[k.layanan] ?? "🐾"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#212153] truncate">{k.layanan ?? "Kunjungan"}</p>
                    <p className="text-xs text-slate-400">{k.tanggal_transaksi ?? "-"}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    k.status_aktif === "Selesai" ? "bg-green-50 text-green-600" :
                    k.status_aktif === "Dikonfirmasi" ? "bg-blue-50 text-blue-600" :
                    "bg-amber-50 text-amber-600"
                  }`}>
                    {k.status_aktif ?? "Menunggu"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#212153]">Tingkatan Keanggotaan</h2>
            <Link to="/promo" className="text-xs text-[#FF7A00] font-bold hover:underline">Promo →</Link>
          </div>
          {loading ? (
            <div className="p-6 flex flex-col gap-3">
              {[1,2,3].map((i) => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-2.5">
              {tiers.map((tier) => {
                const style    = TIER_STYLE[tier.level] ?? TIER_STYLE.Silver;
                const isActive = activeTier === tier.level;
                return (
                  <div key={tier.id}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer
                      ${isActive ? "border-[#FF7A00] bg-orange-50/50" : `${style.border} hover:border-opacity-60`}`}
                    onClick={() => setActiveTier(tier.level)}>
                    <span className="text-xl shrink-0">{style.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-[#212153]">{tier.level} Anggota</p>
                      <p className="text-xs text-slate-400 truncate">{tier.range}</p>
                    </div>
                    {isActive && (
                      <span className="text-xs font-black bg-[#FF7A00] text-white px-2.5 py-1 rounded-full shrink-0">Aktif</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mb-2">
        <h2 className="text-base font-extrabold text-[#212153] mb-1">Semua Tingkatan</h2>
        <p className="text-slate-500 text-sm mb-5">Klik tombol naik tingkatan untuk mengajukan permohonan ke admin.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1,2,3].map((i) => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse border border-gray-100" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => {
            const style      = TIER_STYLE[tier.level] ?? TIER_STYLE.Silver;
            const isActive   = activeTier === tier.level;
            const canUpgrade = TIER_ORDER[tier.level] > TIER_ORDER[activeTier];

            return (
              <div key={tier.id}
                className={`relative rounded-3xl border-2 p-6 transition-all
                  ${isActive
                    ? "border-[#FF7A00] bg-white shadow-xl shadow-orange-500/10"
                    : `${style.border} ${style.bg} shadow-sm`
                  }`}>
                {isActive && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-white text-xs font-black px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    ✓ Tingkatan Aktif
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4 mt-1">
                  <span className="text-3xl">{style.icon}</span>
                  <div>
                    <p className="font-extrabold text-lg text-[#212153]">{tier.level} Anggota</p>
                    <p className="text-xs text-slate-400 mt-0.5">{tier.range}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {isActive ? (
                  <button disabled className="w-full py-2.5 rounded-xl text-sm font-bold bg-orange-50 text-[#FF7A00] border border-orange-200 cursor-default">
                    Tingkatan Kamu Saat Ini
                  </button>
                ) : canUpgrade ? (
                  <button onClick={() => handleUpgrade(tier)}
                    className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${style.btn}`}>
                    Naik ke {tier.level} →
                  </button>
                ) : (
                  <button disabled className="w-full py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-400 cursor-not-allowed">
                    Tingkatan Lebih Rendah
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-4 text-center">
        Kenaikan tingkatan diproses oleh admin setelah verifikasi akumulasi transaksi kamu.
      </p>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
