import { useState } from "react";
import { Link } from "react-router-dom";
import { useMembershipTiers } from "../hooks/useMembershipTiers";

/* ── Styling visual per tier ── */
const TIER_STYLE = {
  Silver:   { icon:"🥈", badge:"bg-slate-100 text-slate-600",   gradient:"from-slate-400 to-slate-500",   border:"border-slate-200",  bg:"bg-slate-50"  },
  Gold:     { icon:"🥇", badge:"bg-amber-eh100 text-amber-700",   gradient:"from-amber-400 to-orange-500",  border:"border-amber-200",  bg:"bg-amber-50"  },
  Platinum: { icon:"💎", badge:"bg-purple-100 text-purple-700", gradient:"from-purple-500 to-indigo-600", border:"border-purple-200", bg:"bg-purple-50" },
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

  /* Generate kartu promo dari benefit tiap tier secara dinamis */
  const allPromos = tiers.flatMap((tier) =>
    tier.benefits.map((benefit, idx) => {
      const nilai =
        benefit.match(/\d+%/)                       ? benefit.match(/\d+%/)[0]
        : benefit.toLowerCase().includes("gratis")  ? "FREE"
        : benefit.toLowerCase().includes("prioritas")? "VIP"
        : "✓";
      return {
        id:      `${tier.id}-${idx}`,
        level:   tier.level,
        judul:   benefit,
        desc:    `Benefit eksklusif untuk member ${tier.level}. Akumulasi transaksi ${tier.range}.`,
        nilai,
        icon:    iconFor(benefit),
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

      {/* ── NAVBAR ── */}
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
            className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-orange-500/25 active:scale-95 shrink-0">
            Daftar Member
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              🎁 Program Loyalitas Klinik Mew
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#212153] leading-tight mb-5">
              Makin Sering,<br/>
              <span className="text-[#FF7A00]">Makin Banyak</span><br/>
              Benefitnya 🧡
            </h1>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-md">
              Setiap kunjungan ke klinik Mew menambah akumulasi transaksi kamu
              dan menaikkan tier membership. Semakin tinggi tier, semakin besar keuntungannya.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/daftar"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-7 py-3 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2">
                🐾 Mulai Jadi Member
              </Link>
              <Link to="/masuk"
                className="bg-white border-2 border-slate-200 hover:border-[#FF7A00] text-[#212153] hover:text-[#FF7A00] font-bold px-7 py-3 rounded-xl transition-all">
                Sudah Member? Masuk
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { v:"800",  l:"Total Member",   icon:"👥", bg:"bg-orange-50",  t:"text-[#FF7A00]"    },
              { v:"675",  l:"Member Aktif",   icon:"⭐", bg:"bg-amber-50",   t:"text-amber-600"    },
              { v:"3",    l:"Tingkat Member", icon:"🏆", bg:"bg-purple-50",  t:"text-purple-600"   },
              { v:"248",  l:"Reward Ditukar", icon:"🎁", bg:"bg-emerald-50", t:"text-emerald-600"  },
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

      {/* ── TIER INFO — data dari Supabase ── */}
      <section id="tiers" className="py-14 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#FF7A00] font-bold text-sm mb-2">🏆 Tingkatan Membership</p>
            <h2 className="text-3xl font-black text-[#212153]">Naiki Tingkatan, Raih Lebih Banyak</h2>
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
                    className={`bg-white rounded-3xl p-7 border ${style.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden`}>
                    {i === 1 && (
                      <div className="absolute top-4 right-4 bg-[#212153] text-white text-xs font-black px-3 py-1 rounded-full">
                        Terpopuler
                      </div>
                    )}
                    <div className="text-4xl mb-4">{style.icon}</div>
                    <h3 className="text-xl font-black text-[#212153] mb-1">{t.level} Member</h3>
                    <p className="text-xs text-slate-400 mb-5">{t.range}</p>
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

      {/* ── DAFTAR PROMO — generated dari tiers Supabase ── */}
      <section id="promo-list" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header + filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-[#FF7A00] font-bold text-sm mb-1">🎁 Penawaran Aktif</p>
              <h2 className="text-3xl font-black text-[#212153]">Promo Tersedia</h2>
              <p className="text-slate-500 text-sm mt-1">Benefit ini diperbarui langsung oleh admin klinik.</p>
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

          {/* Grid 2 kolom — kartu promo */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map((i) => <div key={i} className="h-32 bg-slate-50 rounded-2xl animate-pulse"/>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl">
              <p className="text-3xl mb-2">🎁</p>
              <p className="text-slate-500 font-semibold">Belum ada promo untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((p) => {
                const style = TIER_STYLE[p.level] ?? TIER_STYLE.Silver;
                return (
                  <div key={p.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex items-stretch">

                    {/* Kiri — banner nilai */}
                    <div className={`bg-gradient-to-br ${p.gradient} w-28 shrink-0 flex flex-col items-center justify-center gap-1.5 px-4 py-5`}>
                      <span className="text-3xl">{p.icon}</span>
                      <p className="text-lg font-black text-white leading-none text-center">{p.nilai}</p>
                    </div>

                    {/* Kanan — info + tombol */}
                    <div className="flex flex-col justify-between flex-1 px-5 py-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className="font-extrabold text-[#212153] text-sm">{p.judul}</h3>
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.badge}`}>{p.level}</span>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-slate-400">Berlaku untuk {p.level} Member</p>
                        <a href={`https://wa.me/6281234567890?text=Halo, saya ingin klaim benefit: ${p.judul}`}
                          target="_blank" rel="noreferrer"
                          className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm hover:shadow-orange-500/20 whitespace-nowrap">
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

      {/* ── CTA BAWAH ── */}
      <section className="py-16 bg-[#FEF6EE]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl p-10 text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Belum Jadi Member? Daftar Sekarang!
            </h2>
            <p className="text-indigo-200 text-sm mb-8 max-w-md mx-auto">
              Gratis, langsung dapat Silver Member. Tier naik otomatis seiring akumulasi transaksi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/daftar"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2">
                🐾 Daftar Gratis
              </Link>
              <Link to="/masuk" className="text-indigo-200 hover:text-white font-semibold text-sm transition-colors">
                Sudah punya akun? Masuk →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER MINI ── */}
      <footer className="bg-[#212153] py-6 text-center border-t border-white/10">
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">← Kembali ke Beranda</Link>
          <span className="text-indigo-600 text-xs">|</span>
          <p className="text-indigo-400 text-xs">© 2026 Klinik Mew — Promo diperbarui secara real-time oleh admin.</p>
        </div>
      </footer>

    </div>
  );
}
