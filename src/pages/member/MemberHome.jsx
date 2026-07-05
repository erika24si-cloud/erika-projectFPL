import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Toast } from "../../components/project/Toast";
import { useMembershipTiers } from "../../hooks/useMembershipTiers";
import { supabase } from "../../lib/supabase";

const TIER_STYLE = {
  Silver:   { icon:"🥈", badge:"bg-slate-100 text-slate-600",   border:"border-slate-200",  bg:"bg-slate-50",  btn:"bg-slate-500 hover:bg-slate-600",   btnSolid:"bg-slate-500"   },
  Gold:     { icon:"🥇", badge:"bg-amber-100 text-amber-700",   border:"border-amber-200",  bg:"bg-amber-50",  btn:"bg-[#FF7A00] hover:bg-[#FF9F43]",   btnSolid:"bg-[#FF7A00]"  },
  Platinum: { icon:"💎", badge:"bg-purple-100 text-purple-700", border:"border-purple-200", bg:"bg-purple-50", btn:"bg-purple-600 hover:bg-purple-700",  btnSolid:"bg-purple-600" },
};

const TIER_ORDER = { Silver: 1, Gold: 2, Platinum: 3 };

const LAYANAN_ICONS = { "Perawatan Medis":"🩺", "Grooming Premium":"✂️", "Penitipan Hewan":"🏨" };

const iconFor = (b) =>
  b.includes("Grooming")   ? "✂️" :
  b.includes("Vaksin")     ? "💊" :
  b.includes("Konsultasi") ? "🩺" :
  b.includes("Prioritas")  ? "⚡" :
  b.includes("Diskon")     ? "🏷️" : "🎁";

const CARA_KLAIM = [
  { step:"1", text:"Pastikan kamu sudah terdaftar dan masuk sebagai anggota Klinik Mew." },
  { step:"2", text:"Kunjungi klinik dan sampaikan manfaat yang ingin digunakan saat check-in." },
  { step:"3", text:"Petugas akan memverifikasi tingkatan keanggotaan kamu secara langsung." },
  { step:"4", text:"Manfaat langsung diterapkan pada layanan yang kamu pilih." },
];

function PromoModal({ promo, onClose }) {
  const style    = TIER_STYLE[promo.level] ?? TIER_STYLE.Silver;
  const btnSolid = style.btnSolid;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">

        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${btnSolid}`} />
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
              {style.icon} {promo.level} Anggota
            </span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-500 text-slate-500 text-sm font-bold transition-colors">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl shrink-0">
              {promo.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-[#212153] text-lg leading-tight">{promo.judul}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Berlaku untuk anggota {promo.level}</p>
            </div>
          </div>

          {promo.nilai !== "✓" && (
            <div className={`${btnSolid} text-white rounded-2xl px-5 py-4 mb-5 flex items-center gap-3`}>
              <span className="text-3xl font-black leading-none">{promo.nilai}</span>
              <div>
                <p className="font-bold text-sm">Nilai Manfaat</p>
                <p className="text-xs text-white/75 mt-0.5">Berlaku setiap kunjungan</p>
              </div>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-2 mb-5">
            <span className="text-green-500 text-sm shrink-0">✓</span>
            <p className="text-xs text-green-700 font-medium">Kamu sudah masuk sebagai anggota. Tunjukkan manfaat ini saat kunjungan!</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Syarat & Ketentuan</p>
            <ul className="space-y-2">
              {[
                `Manfaat hanya berlaku untuk anggota aktif tingkatan ${promo.level}.`,
                "Tidak dapat digabungkan dengan promo lain kecuali disebutkan secara khusus.",
                "Klinik berhak mengubah ketentuan manfaat sewaktu-waktu.",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Cara Menggunakan</p>
          <div className="flex flex-col gap-2.5">
            {CARA_KLAIM.map((c) => (
              <div key={c.step} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${btnSolid} text-white flex items-center justify-center text-xs font-black shrink-0`}>
                  {c.step}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`Manfaat: ${promo.judul} (${promo.level} Anggota)`);
                onClose();
              }}
              className={`flex-1 ${btnSolid} hover:opacity-90 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95`}>
              Salin Info Manfaat
            </button>
            <button onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MemberHome() {
  const { user }           = useAuth();
  const { tiers, loading } = useMembershipTiers();

  const [activeTier,    setActiveTier]    = useState("Silver");
  const [kunjungan,     setKunjungan]     = useState([]);
  const [loadKunjungan, setLoadKunjungan] = useState(true);
  const [activePromo,   setActivePromo]   = useState(null);
  const [toast,         setToast]         = useState({ visible: false, message: "", type: "success" });

  const userName    = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anggota";
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

  const allPromos = tiers.flatMap((tier) =>
    tier.benefits.map((benefit, idx) => {
      const nilai =
        benefit.match(/\d+%/)                        ? benefit.match(/\d+%/)[0]
        : benefit.toLowerCase().includes("gratis")   ? "GRATIS"
        : benefit.toLowerCase().includes("prioritas")? "VIP"
        : "✓";
      return {
        id: `${tier.id}-${idx}`,
        level: tier.level,
        judul: benefit,
        nilai,
        icon: iconFor(benefit),
        range: tier.range,
      };
    })
  );

  const currentTierStyle = TIER_STYLE[activeTier] ?? TIER_STYLE.Silver;
  const currentTierData  = tiers.find((t) => t.level === activeTier);
  const currentPromos    = allPromos.filter((p) => p.level === activeTier);

  const now      = new Date();
  const greeting = now.getHours() < 11 ? "Selamat pagi" : now.getHours() < 15 ? "Selamat siang" : now.getHours() < 18 ? "Selamat sore" : "Selamat malam";

  return (
    <div className="w-full">

      {/* Welcome card */}
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
              <p className="text-xl font-black text-[#FF7A00] leading-none">{currentTierStyle.icon} {activeTier}</p>
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
                <span key={b} className="text-xs bg-white/10 text-indigo-100 px-2.5 py-1 rounded-lg font-medium border border-white/10">✓ {b}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu cepat — ganti link Promo jadi buka section promo di bawah */}
      <h2 className="text-base font-extrabold text-[#212153] mb-4">Menu Cepat</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { to:"/member/profil",    icon:"👤", label:"Profil Saya",       desc:"Lihat dan edit data diri"   },
          { to:"/member/hewan",     icon:"🐾", label:"Hewan Peliharaan",  desc:"Data hewan dan rekam medis" },
          { to:"/member/kunjungan", icon:"📋", label:"Riwayat Kunjungan", desc:"Histori perawatan kamu"     },
          { to:"#promo-member",     icon:"🎁", label:"Promo & Manfaat",   desc:"Lihat penawaran eksklusif"  },
        ].map((q) => (
          q.to.startsWith("#") ? (
            <a key={q.to} href={q.to}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-50 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">{q.icon}</div>
              <h3 className="font-extrabold text-[#212153] text-sm mb-0.5 group-hover:text-[#FF7A00] transition-colors leading-tight">{q.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{q.desc}</p>
            </a>
          ) : (
            <Link key={q.to} to={q.to}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-50 group">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">{q.icon}</div>
              <h3 className="font-extrabold text-[#212153] text-sm mb-0.5 group-hover:text-[#FF7A00] transition-colors leading-tight">{q.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{q.desc}</p>
            </Link>
          )
        ))}
      </div>

      {/* Kunjungan + Tingkatan */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#212153]">Kunjungan Terbaru</h2>
            <Link to="/member/kunjungan" className="text-xs text-[#FF7A00] font-bold hover:underline">Lihat semua →</Link>
          </div>
          {loadKunjungan ? (
            <div className="p-6 flex flex-col gap-3">{[1,2,3].map((i) => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}</div>
          ) : kunjungan.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-3xl mb-2">📋</p>
              <p className="text-sm text-slate-500 font-semibold">Belum ada kunjungan tercatat.</p>
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
                  }`}>{k.status_aktif ?? "Menunggu"}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#212153]">Tingkatan Keanggotaan</h2>
          </div>
          {loading ? (
            <div className="p-6 flex flex-col gap-3">{[1,2,3].map((i) => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />)}</div>
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
                    {isActive && <span className="text-xs font-black bg-[#FF7A00] text-white px-2.5 py-1 rounded-full shrink-0">Aktif</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Promo Section — inline, tidak perlu keluar ke halaman guest */}
      <div id="promo-member" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-extrabold text-[#212153]">Promo & Manfaat Kamu</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manfaat eksklusif sesuai tingkatan anggota kamu. Klik untuk detail.</p>
          </div>
          <div className="flex gap-2">
            {tiers.map((t) => {
              const style = TIER_STYLE[t.level] ?? TIER_STYLE.Silver;
              return (
                <button key={t.level} onClick={() => setActiveTier(t.level)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all ${
                    activeTier === t.level
                      ? "border-[#FF7A00] bg-orange-50 text-[#FF7A00]"
                      : `${style.border} text-slate-500 hover:border-opacity-60`
                  }`}>
                  {style.icon} {t.level}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map((i) => <div key={i} className="h-24 bg-white rounded-2xl animate-pulse border border-gray-100" />)}
          </div>
        ) : currentPromos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-2xl mb-2">🎁</p>
            <p className="text-sm text-slate-500">Belum ada manfaat untuk tingkatan ini.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPromos.map((p) => {
              const style    = TIER_STYLE[p.level] ?? TIER_STYLE.Silver;
              const btnSolid = style.btnSolid;
              return (
                <button key={p.id}
                  onClick={() => setActivePromo(p)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-orange-200 transition-all text-left overflow-hidden group cursor-pointer w-full">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                        {p.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold text-[#212153] truncate leading-snug">{p.judul}</p>
                        {p.nilai !== "✓" && (
                          <p className={`text-xs font-black text-[#FF7A00]`}>{p.nilai}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">Akumulasi {p.range}</p>
                  </div>
                  <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">Lihat cara pakai</p>
                    <span className="text-xs font-bold text-[#FF7A00] group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 mb-2">
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
                  ${isActive ? "border-[#FF7A00] bg-white shadow-xl shadow-orange-500/10" : `${style.border} ${style.bg} shadow-sm`}`}>
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

      {activePromo && (
        <PromoModal promo={activePromo} onClose={() => setActivePromo(null)} />
      )}

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
