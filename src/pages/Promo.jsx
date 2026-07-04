import { useState } from "react";
import { Link } from "react-router-dom";
import { useMembershipTiers } from "../hooks/useMembershipTiers";

const TIER_STYLE = {
  Silver:   { icon:"🥈", badge:"bg-slate-100 text-slate-600",   gradient:"from-slate-400 to-slate-500",   border:"border-slate-200"  },
  Gold:     { icon:"🥇", badge:"bg-amber-100 text-amber-700",   gradient:"from-amber-400 to-orange-500",  border:"border-amber-200"  },
  Platinum: { icon:"💎", badge:"bg-purple-100 text-purple-700", gradient:"from-purple-500 to-indigo-600", border:"border-purple-200" },
};

const iconFor = (b) =>
  b.includes("Grooming")   ? "✂️" :
  b.includes("Vaksin")     ? "💊" :
  b.includes("Konsultasi") ? "🩺" :
  b.includes("Prioritas")  ? "⚡" : "🎁";

const TABS = ["Semua", "Silver", "Gold", "Platinum"];

export default function Promo() {
  const { tiers, loading } = useMembershipTiers();
  const [activeTab, setActiveTab] = useState("Semua");

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
        desc:     `Manfaat eksklusif untuk anggota ${tier.level}. Akumulasi transaksi ${tier.range}.`,
        nilai,
        icon:     iconFor(benefit),
        gradient: (TIER_STYLE[tier.level] ?? TIER_STYLE.Silver).gradient,
        badge:    (TIER_STYLE[tier.level] ?? TIER_STYLE.Silver).badge,
      };
    })
  );

  const filtered = activeTab === "Semua"
    ? allPromos
    : allPromos.filter((p) => p.level === activeTab);

  return (
    <div className="min-h-screen bg-[#FEF6EE]">

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="text-2xl font-black text-[#212153] shrink-0">
            MEW<span className="text-[#FF7A00]">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {[["#tiers","Tingkatan"],["#promo-list","Promo"]].map(([h,l]) => (
              <a key={l} href={h} className="text-sm text-slate-600 hover:text-[#FF7A00] font-medium transition-colors">{l}</a>
            ))}
            <Link to="/" className="text-sm text-slate-500 hover:text-[#FF7A00] transition-colors">← Beranda</Link>
          </nav>
          <Link to="/daftar"
            className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 shrink-0">
            Daftar Anggota
          </Link>
        </div>
      </header>

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
            <p className="text-slate-500 leading-relaxed mb-7 max-w-md text-sm">
              Setiap kunjungan menambah akumulasi transaksi dan menaikkan tingkatan keanggotaan.
              Semakin tinggi tingkatan, semakin besar manfaat yang kamu dapatkan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/daftar"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-7 py-3 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2 text-sm">
                🐾 Mulai Jadi Anggota
              </Link>
              <Link to="/masuk"
                className="bg-white border-2 border-slate-200 hover:border-[#FF7A00] text-[#212153] hover:text-[#FF7A00] font-bold px-7 py-3 rounded-xl transition-all text-sm">
                Sudah Anggota? Masuk
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { v:"800",  l:"Total Anggota",   icon:"👥", bg:"bg-orange-50",  t:"text-[#FF7A00]"   },
              { v:"675",  l:"Anggota Aktif",   icon:"⭐", bg:"bg-amber-50",   t:"text-amber-600"   },
              { v:"3",    l:"Tingkatan",        icon:"🏆", bg:"bg-purple-50",  t:"text-purple-600"  },
              { v:"248",  l:"Hadiah Ditukar",  icon:"🎁", bg:"bg-emerald-50", t:"text-emerald-600" },
            ].map((s) => (
              <div key={s.l} className={`${s.bg} rounded-2xl p-5 border border-white shadow-sm`}>
                <span className="text-2xl">{s.icon}</span>
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
            <p className="text-[#FF7A00] font-bold text-sm mb-2">🏆 Tingkatan Keanggotaan</p>
            <h2 className="text-2xl font-black text-[#212153]">Naiki Tingkatan, Raih Lebih Banyak</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map((i) => <div key={i} className="h-48 bg-white rounded-3xl animate-pulse"/>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((t, i) => {
                const style = TIER_STYLE[t.level] ?? TIER_STYLE.Silver;
                return (
                  <div key={t.id}
                    className={`bg-white rounded-3xl p-7 border-2 ${style.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden`}>
                    {i === 1 && (
                      <div className="absolute top-4 right-4 bg-[#212153] text-white text-xs font-black px-3 py-1 rounded-full">
                        Terpopuler
                      </div>
                    )}
                    <div className="text-3xl mb-3">{style.icon}</div>
                    <h3 className="text-lg font-black text-[#212153] mb-0.5">{t.level} Anggota</h3>
                    <p className="text-xs text-slate-400 mb-4">{t.range}</p>
                    <ul className="space-y-2">
                      {t.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className={`w-4 h-4 rounded-full ${style.badge} flex items-center justify-center text-xs font-black shrink-0`}>✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
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
              <p className="text-[#FF7A00] font-bold text-sm mb-1">🎁 Penawaran Aktif</p>
              <h2 className="text-2xl font-black text-[#212153]">Promo Tersedia</h2>
              <p className="text-slate-500 text-sm mt-1">Manfaat ini diperbarui langsung oleh admin klinik.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                    ${activeTab === tab
                      ? "bg-[#212153] text-white border-[#212153]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#212153] hover:text-[#212153]"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map((i) => <div key={i} className="h-28 bg-slate-50 rounded-2xl animate-pulse"/>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-14 bg-slate-50 rounded-3xl">
              <p className="text-3xl mb-2">🎁</p>
              <p className="text-slate-500 font-semibold text-sm">Belum ada promo untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((p) => {
                const style = TIER_STYLE[p.level] ?? TIER_STYLE.Silver;
                return (
                  <div key={p.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex items-stretch">
                    <div className={`bg-gradient-to-br ${p.gradient} w-24 shrink-0 flex flex-col items-center justify-center gap-1.5 px-3 py-5`}>
                      <span className="text-2xl">{p.icon}</span>
                      <p className="text-base font-black text-white leading-none text-center">{p.nilai}</p>
                    </div>
                    <div className="flex flex-col justify-between flex-1 px-5 py-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-extrabold text-[#212153] text-sm">{p.judul}</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>{p.level}</span>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-slate-400">Untuk anggota {p.level}</p>
                        <a href={`https://wa.me/6281234567890?text=Halo, saya ingin klaim manfaat: ${p.judul}`}
                          target="_blank" rel="noreferrer"
                          className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all active:scale-95 whitespace-nowrap">
                          Klaim via WA →
                        </a>
                      </div>
                    </div>
                  </div>
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
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">← Kembali ke Beranda</Link>
          <span className="text-indigo-600 text-xs">|</span>
          <p className="text-indigo-400 text-xs">© 2026 Klinik Mew — Promo diperbarui secara langsung oleh admin.</p>
        </div>
      </footer>

    </div>
  );
}
