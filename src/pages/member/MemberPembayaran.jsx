import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { useMembershipTiers } from "../../hooks/useMembershipTiers";

const TIER_STYLE = {
  Silver:   { icon:"🥈", gradient:"from-slate-400 to-slate-500",   accent:"#64748b", badge:"bg-slate-100 text-slate-700"   },
  Gold:     { icon:"🥇", gradient:"from-amber-400 to-orange-500",  accent:"#F97316", badge:"bg-amber-100 text-amber-700"   },
  Platinum: { icon:"💎", gradient:"from-purple-500 to-indigo-600", accent:"#9333ea", badge:"bg-purple-100 text-purple-700" },
};

const METODE_BAYAR = [
  { id:"transfer",  label:"Transfer Bank",      icon:"🏦", desc:"BCA / Mandiri / BNI / BRI" },
  { id:"ewallet",   label:"E-Wallet",           icon:"💳", desc:"GoPay, OVO, DANA, ShopeePay" },
  { id:"tunai",     label:"Bayar di Klinik",    icon:"💵", desc:"Bayar langsung saat kunjungan berikutnya" },
];

const HARGA = { Silver: 0, Gold: 50000, Platinum: 150000 };

function formatRupiah(n) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function MemberPembayaran() {
  const { tier: targetTier } = useParams();
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const { tiers }  = useMembershipTiers();

  const [currentTier, setCurrentTier] = useState(null);
  const [step,        setStep]        = useState(1);
  const [metode,      setMetode]      = useState("");
  const [paying,      setPaying]      = useState(false);
  const [done,        setDone]        = useState(false);
  const [error,       setError]       = useState("");

  const tierData   = tiers.find((t) => t.level === targetTier);
  const tierStyle  = TIER_STYLE[targetTier] ?? TIER_STYLE.Gold;
  const harga      = HARGA[targetTier] ?? 0;

  useEffect(() => {
    const fetchCurrentTier = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("members")
        .select("tier")
        .eq("id", user.id)
        .single();
      setCurrentTier(data?.tier ?? "Silver");
    };
    fetchCurrentTier();
  }, [user]);

  const handlePay = async () => {
    if (!metode) { setError("Pilih metode pembayaran terlebih dahulu."); return; }
    setError("");
    setPaying(true);

    await new Promise((r) => setTimeout(r, 1800));

    try {
      await supabase.from("members").upsert({
        id:         user.id,
        full_name:  user.user_metadata?.full_name ?? user.email.split("@")[0],
        email:      user.email,
        tier:       targetTier,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("members upsert:", e?.message);
    }

    try {
      await supabase.from("profiles").update({ tier: targetTier }).eq("id", user.id);
    } catch (e) {
      console.warn("profiles update:", e?.message);
    }

    try {
      await supabase.from("payment_history").insert({
        user_id: user.id, tier: targetTier,
        metode, jumlah: harga, status: "Berhasil",
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("payment_history insert:", e?.message);
    }

    setPaying(false);
    setDone(true);
  };

  if (!targetTier || !TIER_STYLE[targetTier]) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
        <span className="text-4xl">❌</span>
        <p className="font-semibold">Tingkatan tidak valid.</p>
        <Link to="/member" className="text-[#FF7A00] font-bold hover:underline text-sm">Kembali ke Beranda</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto py-16 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
          ✅
        </div>
        <h2 className="text-2xl font-black text-[#212153] mb-2">Pembayaran Berhasil!</h2>
        <p className="text-slate-500 text-sm mb-6">
          Selamat! Keanggotaan kamu sudah naik ke tingkatan{" "}
          <strong className="text-[#212153]">{tierStyle.icon} {targetTier}</strong>.
          Manfaat baru langsung aktif sekarang.
        </p>
        <div className={`bg-gradient-to-br ${tierStyle.gradient} text-white rounded-3xl p-6 mb-8 text-left`}>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Manfaat kamu sekarang:</p>
          <ul className="space-y-2">
            {(tierData?.benefits ?? []).map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-medium">
                <span className="text-white/70">✓</span>{b}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate("/member")}
          className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-8 py-3 rounded-xl text-sm transition-all active:scale-95 shadow-md w-full">
          Kembali ke Portal Anggota
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8 px-4">

      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-slate-500 hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all shrink-0">
          ←
        </button>
        <div>
          <h1 className="text-xl font-black text-[#212153]">Naik ke {targetTier} Anggota</h1>
          <p className="text-xs text-slate-400">Pembayaran keanggotaan Klinik Mew</p>
        </div>
      </div>

      <div className="flex items-center gap-0 mb-8">
        {["Ringkasan", "Pembayaran", "Selesai"].map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 ${i < 2 ? "flex-1" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step > i + 1 ? "bg-green-500 text-white" :
                step === i + 1 ? "bg-[#FF7A00] text-white" :
                "bg-gray-200 text-gray-400"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-bold hidden sm:block ${step === i + 1 ? "text-[#212153]" : "text-slate-400"}`}>{s}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 mx-2 ${step > i + 1 ? "bg-green-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <div className={`bg-gradient-to-br ${tierStyle.gradient} rounded-3xl p-6 text-white`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{tierStyle.icon}</span>
              <div>
                <p className="font-black text-xl">{targetTier} Anggota</p>
                <p className="text-white/70 text-xs">{tierData?.range ?? ""}</p>
              </div>
            </div>
            {tierData && (
              <ul className="space-y-1.5">
                {tierData.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-white/70">✓</span>{b}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-extrabold text-[#212153] text-sm mb-4">Ringkasan Pesanan</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Dari tingkatan</span>
                <span className="font-bold text-[#212153]">{currentTier ?? "Silver"} Anggota</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Ke tingkatan</span>
                <span className="font-bold text-[#212153]">{tierStyle.icon} {targetTier} Anggota</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between">
                <span className="font-bold text-[#212153]">Total Pembayaran</span>
                <span className="font-black text-[#FF7A00] text-lg">
                  {harga === 0 ? "Gratis" : formatRupiah(harga)}
                </span>
              </div>
            </div>
          </div>

          {harga === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700 font-medium">
              🎉 Tingkatan ini gratis! Klik lanjut untuk langsung mengaktifkan.
            </div>
          )}

          <button
            onClick={() => harga === 0 ? setStep(2) : setStep(2)}
            className="w-full bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-95 shadow-md">
            Lanjut ke Pembayaran →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-extrabold text-[#212153] text-sm mb-4">Pilih Metode Pembayaran</h3>
            <div className="flex flex-col gap-3">
              {METODE_BAYAR.map((m) => (
                <button key={m.id}
                  onClick={() => { setMetode(m.id); setError(""); }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                    metode === m.id
                      ? "border-[#FF7A00] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}>
                  <span className="text-2xl shrink-0">{m.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-[#212153] text-sm">{m.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    metode === m.id ? "border-[#FF7A00] bg-[#FF7A00]" : "border-gray-300"
                  }`}>
                    {metode === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            {metode === "transfer" && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Instruksi Transfer</p>
                <p className="text-sm text-slate-600">Transfer ke rekening BCA <strong>1234567890</strong> a/n Klinik Mew.</p>
                <p className="text-xs text-slate-400 mt-1">Nominal: <strong>{formatRupiah(harga)}</strong> — Konfirmasi akan diproses otomatis.</p>
              </div>
            )}
            {metode === "ewallet" && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nomor Tujuan</p>
                <p className="text-sm text-slate-600">GoPay / OVO / DANA: <strong>0812-3456-7890</strong> (Klinik Mew)</p>
                <p className="text-xs text-slate-400 mt-1">Nominal: <strong>{formatRupiah(harga)}</strong></p>
              </div>
            )}
            {metode === "tunai" && (
              <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Catatan</p>
                <p className="text-sm text-slate-600">Bayar langsung ke kasir klinik. Tunjukkan halaman ini sebagai bukti pemesanan.</p>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold px-4 py-3 rounded-xl">
              ⚠ {error}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(1)}
              className="flex-1 bg-white border-2 border-gray-200 text-slate-600 font-bold py-3.5 rounded-xl text-sm hover:border-gray-300 transition-all">
              ← Kembali
            </button>
            <button onClick={handlePay} disabled={paying}
              className="flex-1 bg-[#FF7A00] hover:bg-[#FF9F43] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-95 shadow-md">
              {paying ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : `Bayar ${harga === 0 ? "Gratis" : formatRupiah(harga)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
