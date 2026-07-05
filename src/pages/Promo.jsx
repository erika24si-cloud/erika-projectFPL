import { useState } from "react";
import { Link } from "react-router-dom";
import { useMembershipTiers } from "../hooks/useMembershipTiers";
import { useAuth } from "../contexts/AuthContext";

const TIER_STYLE = {
  Silver:   { icon:"🥈", badge:"bg-slate-100 text-slate-600",   gradFrom:"#94a3b8", gradTo:"#64748b", border:"border-slate-200",  ring:"ring-slate-300"   },
  Gold:     { icon:"🥇", badge:"bg-amber-100 text-amber-700",   gradFrom:"#fbbf24", gradTo:"#f97316", border:"border-amber-200",  ring:"ring-amber-300"   },
  Platinum: { icon:"💎", badge:"bg-purple-100 text-purple-700", gradFrom:"#a855f7", gradTo:"#6366f1", border:"border-purple-200", ring:"ring-purple-300"  },
};

const TIER_COLOR = {
  Silver:   "bg-slate-500",
  Gold:     "bg-[#FF7A00]",
  Platinum: "bg-purple-600",
};

const iconFor = (b) =>
  b.includes("Grooming")   ? "✂️" :
  b.includes("Vaksin")     ? "💊" :
  b.includes("Konsultasi") ? "🩺" :
  b.includes("Prioritas")  ? "⚡" :
  b.includes("Diskon")     ? "🏷️" : "🎁";

const CARA_KLAIM = [
  { step:"1", text:"Pastikan kamu sudah terdaftar sebagai anggota Klinik Mew." },
  { step:"2", text:"Kunjungi klinik dan sampaikan manfaat yang ingin digunakan saat check-in." },
  { step:"3", text:"Petugas akan memverifikasi tingkatan keanggotaan kamu." },
  { step:"4", text:"Manfaat langsung diterapkan pada layanan yang kamu pilih." },
];

const TABS = ["Semua", "Silver", "Gold", "Platinum"];

function PromoModal({ promo, onClose }) {
  const { user } = useAuth();
  const style = TIER_STYLE[promo.level] ?? TIER_STYLE.Silver;
  const btnColor = TIER_COLOR[promo.level] ?? TIER_COLOR.Silver;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${btnColor}`} />
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
              {style.icon} {promo.level} Anggota
            </span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-500 text-slate-500 text-sm transition-colors font-bold">
            ✕
          </button>
        </div>

        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-orange-50 shrink-0">
              {promo.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-[#212153] text-lg leading-tight">{promo.judul}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Berlaku untuk anggota {promo.level}</p>
            </div>
          </div>

          {promo.nilai !== "✓" && (
            <div className={`${btnColor} text-white rounded-2xl px-5 py-4 mb-5 flex items-center gap-3`}>
              <span className="text-3xl font-black leading-none">{promo.nilai}</span>
              <div>
                <p className="font-bold text-sm leading-tight">Nilai Manfaat</p>
                <p className="text-xs text-white/75 mt-0.5">Berlaku setiap kunjungan</p>
              </div>
            </div>
          )}

          <div className="bg-slate-50 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Syarat & Ketentuan</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                Manfaat hanya berlaku untuk anggota aktif tingkatan <strong>{promo.level}</strong>.
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                Tidak dapat digabungkan dengan promo lain kecuali disebutkan secara khusus.
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                Klinik berhak mengubah ketentuan manfaat sewaktu-waktu.
              </li>
            </ul>
          </div>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Cara Menggunakan</p>
          <div className="flex flex-col gap-2.5 mb-6">
            {CARA_KLAIM.map((c) => (
              <div key={c.step} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${btnColor} text-white flex items-center justify-center text-xs font-black shrink-0`}>
                  {c.step}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2 mb-1">
                <span className="text-green-500 text-sm">✓</span>
                <p className="text-xs text-green-700 font-medium">Kamu sudah masuk sebagai anggota. Tunjukkan manfaat ini saat kunjungan!</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`Manfaat: ${promo.judul} (${promo.level} Anggota)`);
                  onClose();
                }}
                className={`w-full ${btnColor} hover:opacity-90 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95`}>
                Salin Info Manfaat
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-400 text-center mb-1">Daftar atau masuk untuk menggunakan manfaat ini</p>
              <div className="flex gap-2">
                <Link to="/daftar" onClick={onClose}
                  className={`flex-1 ${btnColor} hover:opacity-90 text-white font-bold py-3 rounded-xl text-sm text-center transition-all active:scale-95`}>
                  🐾 Daftar Gratis
                </Link>
                <Link to="/masuk" onClick={onClose}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm text-center transition-all">
                  Masuk
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Promo() {
  const { tiers, loading } = useMembershipTiers();
  const [activeTab,    setActiveTab]    = useState("Semua");
  const [activePromo,  setActivePromo]  = useState(null);

  const allPromos = tiers.flatMap((tier) =>
    tier.benefits.map((benefit, idx) => {
      const nilai =
        benefit.match(/\d+%/)                        ? benefit.match(/\d+%/)[0]
        : benefit.toLowerCase().includes("gratis")   ? "GRATIS"
        : benefit.toLowerCase().includes("prioritas")? "VIP"
        : "✓";
      return {
        id:       `${tier.id}-${idx}`,
        level:    tier.level,
        judul:    benefit,
        nilai,
        icon:     iconFor(benefit),
        range:    tier.range,
      };
    })
  );

  const filtered = activeTab === "Semua"
    ? allPromos
    : allPromos.filter((p) => p.level === activeTab);

  const countByLevel = (level) => allPromos.filter((p) => p.level === level).length;

  return (
    <div className="min-h-screen bg-[#FEF6EE]">

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_8px_rgb(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="text-2xl font-black text-[#212153] shrink-0 select-none">
            MEW<span className="text-[#FF7A00]">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[["#tiers","Tingkatan"],["#promo-list","Daftar Promo"]].map(([h,l]) => (
              <a key={l} href={h}
                className="px-4 py-2 rounded-xl text-sm text-slate-500 hover:text-[#FF7A00] hover:bg-orange-50 font-medium transition-all">
                {l}
              </a>
            ))}
            <Link to="/" className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-[#FF7A00] transition-colors">
              ← Beranda
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/masuk"
              className="hidden md:block text-sm font-semibold text-slate-500 hover:text-[#212153] px-4 py-2 rounded-xl transition-colors">
              Masuk
            </Link>
            <Link to="/daftar"
              className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 shrink-0">
              Daftar Anggota
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              🎁 Program Loyalitas Klinik Mew
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#212153] leading-tight mb-4">
              Makin Sering,<br/>
              <span className="text-[#FF7A00]">Makin Banyak</span><br/>
              Manfaatnya 🧡
            </h1>
            <p className="text-slate-500 leading-relaxed mb-7 max-w-sm text-sm">
              Setiap kunjungan menambah akumulasi transaksi dan menaikkan tingkatan keanggotaan.
              Semakin tinggi tingkatan, semakin besar manfaatnya.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/daftar"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-7 py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 text-sm">
                🐾 Daftar Gratis
              </Link>
              <Link to="/masuk"
                className="bg-white border-2 border-slate-200 hover:border-[#FF7A00] text-[#212153] hover:text-[#FF7A00] font-bold px-7 py-3 rounded-xl transition-all text-sm">
                Sudah Anggota? Masuk
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { v:"800", l:"Total Anggota",  icon:"👥", bg:"bg-orange-50",  t:"text-[#FF7A00]"  },
              { v:"675", l:"Anggota Aktif",  icon:"⭐", bg:"bg-amber-50",   t:"text-amber-600"  },
              { v:"3",   l:"Tingkatan",       icon:"🏆", bg:"bg-purple-50",  t:"text-purple-600" },
              { v:String(allPromos.length || "15+"), l:"Total Manfaat", icon:"🎁", bg:"bg-emerald-50", t:"text-emerald-600" },
            ].map((s) => (
              <div key={s.l} className={`${s.bg} rounded-2xl p-5 border border-white/50 shadow-sm`}>
                <span className="text-xl">{s.icon}</span>
                <p className={`text-2xl font-black mt-2 ${s.t}`}>{s.v}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tiers" className="py-12 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[#FF7A00] font-bold text-xs uppercase tracking-widest mb-2">🏆 Tingkatan Keanggotaan</p>
            <h2 className="text-2xl font-black text-[#212153]">Naiki Tingkatan, Raih Lebih Banyak</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map((i) => <div key={i} className="h-52 bg-white rounded-3xl animate-pulse"/>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((t, i) => {
                const style = TIER_STYLE[t.level] ?? TIER_STYLE.Silver;
                const btnColor = TIER_COLOR[t.level] ?? TIER_COLOR.Silver;
                return (
                  <div key={t.id}
                    className={`bg-white rounded-3xl p-7 border-2 ${style.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden`}>
                    {i === 1 && (
                      <span className="absolute top-4 right-4 bg-[#212153] text-white text-xs font-black px-3 py-1 rounded-full">
                        Terpopuler
                      </span>
                    )}
                    <div className="text-3xl mb-3">{style.icon}</div>
                    <h3 className="text-lg font-black text-[#212153]">{t.level} Anggota</h3>
                    <p className="text-xs text-slate-400 mb-1">{t.range}</p>
                    <p className="text-xs font-bold text-slate-500 mb-4">{countByLevel(t.level)} manfaat tersedia</p>
                    <ul className="space-y-2 mb-5">
                      {t.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className={`w-4 h-4 rounded-full ${style.badge} flex items-center justify-center text-xs font-black shrink-0`}>✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a href="#promo-list" onClick={() => setActiveTab(t.level)}
                      className={`w-full ${btnColor} text-white font-bold py-2.5 rounded-xl text-sm transition-all active:scale-95 block text-center`}>
                      Lihat promo {t.level} →
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="promo-list" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">
            <div>
              <p className="text-[#FF7A00] font-bold text-xs uppercase tracking-widest mb-1">🎁 Penawaran Aktif</p>
              <h2 className="text-2xl font-black text-[#212153]">Semua Manfaat</h2>
              <p className="text-slate-500 text-sm mt-1">
                Klik kartu untuk melihat detail dan cara menggunakan manfaat.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                    ${activeTab === tab
                      ? "bg-[#212153] text-white border-[#212153] shadow-sm"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-[#212153]"}`}>
                  {tab}
                  {tab !== "Semua" && (
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {countByLevel(tab)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i) => <div key={i} className="h-28 bg-slate-50 rounded-2xl animate-pulse"/>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-14 bg-slate-50 rounded-3xl">
              <p className="text-3xl mb-2">🎁</p>
              <p className="text-slate-500 font-semibold text-sm">Belum ada manfaat untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => {
                const style    = TIER_STYLE[p.level] ?? TIER_STYLE.Silver;
                const btnColor = TIER_COLOR[p.level] ?? TIER_COLOR.Silver;
                return (
                  <button key={p.id}
                    onClick={() => setActivePromo(p)}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-orange-200 transition-all text-left overflow-hidden group cursor-pointer">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                            {p.icon}
                          </div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
                            {style.icon} {p.level}
                          </span>
                        </div>
                        {p.nilai !== "✓" && (
                          <span className={`text-sm font-black ${btnColor} bg-clip-text`}
                            style={{ WebkitTextFillColor: "transparent", backgroundImage: `linear-gradient(to right, ${TIER_STYLE[p.level]?.gradFrom ?? "#94a3b8"}, ${TIER_STYLE[p.level]?.gradTo ?? "#64748b"})`, WebkitBackgroundClip: "text" }}>
                            {p.nilai}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-[#212153] text-sm leading-snug mb-2">{p.judul}</h3>
                      <p className="text-xs text-slate-400">Akumulasi transaksi {p.range}</p>
                    </div>
                    <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${btnColor}`} />
                    <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                      <p className="text-xs text-slate-400">Klik untuk detail & cara pakai</p>
                      <span className="text-xs font-bold text-[#FF7A00] group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-[#FEF6EE]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-black text-white mb-3">
                  Belum Jadi Anggota?<br/>Daftar Sekarang!
                </h2>
                <p className="text-indigo-300 text-sm mb-6 leading-relaxed">
                  Gratis, langsung dapat tingkatan Silver. Naik otomatis seiring akumulasi transaksi.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/daftar"
                    className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                    🐾 Daftar Gratis
                  </Link>
                  <Link to="/masuk"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-indigo-200 hover:text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center">
                    Sudah punya akun? Masuk →
                  </Link>
                </div>
              </div>
              <div className="p-8 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-3">
                {[
                  { icon:"🥈", text:"Daftar gratis → langsung Silver" },
                  { icon:"🥇", text:"Transaksi lebih banyak → naik ke Gold" },
                  { icon:"💎", text:"Pelanggan setia → raih Platinum" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <p className="text-sm text-indigo-100 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#212153] py-5 text-center border-t border-white/10">
        <div className="flex items-center justify-center gap-5">
          <Link to="/" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">← Beranda</Link>
          <span className="text-indigo-700 text-xs">·</span>
          <Link to="/daftar" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">Daftar</Link>
          <span className="text-indigo-700 text-xs">·</span>
          <p className="text-indigo-500 text-xs">© 2026 Klinik Mew</p>
        </div>
      </footer>

      {activePromo && (
        <PromoModal promo={activePromo} onClose={() => setActivePromo(null)} />
      )}
    </div>
  );
}
