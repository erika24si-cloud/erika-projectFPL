import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { EmptyState } from "../../components/project/EmptyState";
import { Link } from "react-router-dom";

const MONTHS_ID = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];

function formatTanggal(str) {
  if (!str) return "-";
  const d = new Date(str);
  return `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

const STATUS_STYLE = {
  Selesai:      { cls: "bg-green-50 text-green-700 border-green-100",  dot: "bg-green-500",  icon: "✅" },
  Dikonfirmasi: { cls: "bg-blue-50 text-blue-700 border-blue-100",     dot: "bg-blue-500",   icon: "✅" },
  Menunggu:     { cls: "bg-amber-50 text-amber-700 border-amber-100",  dot: "bg-amber-400",  icon: "⏳" },
};

const LAYANAN_ICON = {
  "Perawatan Medis":  "🩺",
  "Grooming Premium": "✂️",
  "Penitipan Hewan":  "🏨",
};

const TABS = [
  { id: "semua",        label: "Semua"        },
  { id: "Menunggu",     label: "Menunggu"     },
  { id: "Dikonfirmasi", label: "Dikonfirmasi" },
  { id: "Selesai",      label: "Selesai"      },
];

export default function MemberKunjungan() {
  const { user } = useAuth();

  const [riwayat,  setRiwayat]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [activeTab,setActiveTab]= useState("semua");
  const [search,   setSearch]   = useState("");

  useEffect(() => { fetchRiwayat(); }, [user]);

  const fetchRiwayat = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("appointments")
        .select("*")
        .order("tanggal_transaksi", { ascending: false });
      if (data) setRiwayat(data);
    } catch {
      setRiwayat([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = riwayat.filter((r) => {
    const matchTab    = activeTab === "semua" || r.status_aktif === activeTab;
    const matchSearch = !search ||
      r.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
      r.layanan?.toLowerCase().includes(search.toLowerCase()) ||
      r.nama_hewan?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    semua:        riwayat.length,
    Menunggu:     riwayat.filter((r) => r.status_aktif === "Menunggu").length,
    Dikonfirmasi: riwayat.filter((r) => r.status_aktif === "Dikonfirmasi").length,
    Selesai:      riwayat.filter((r) => r.status_aktif === "Selesai").length,
  };

  return (
    <div className="w-full">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-[#212153] mb-1">Riwayat Kunjungan</h1>
        <p className="text-slate-500 text-sm">Semua histori perawatan hewan kamu di klinik Mew.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: "Total",         value: counts.semua,        icon: "📋", color: "text-[#212153]",  bg: "bg-slate-50"   },
          { label: "Menunggu",      value: counts.Menunggu,     icon: "⏳", color: "text-amber-600",  bg: "bg-amber-50"   },
          { label: "Dikonfirmasi",  value: counts.Dikonfirmasi, icon: "✅", color: "text-blue-600",   bg: "bg-blue-50"    },
          { label: "Selesai",       value: counts.Selesai,      icon: "🏁", color: "text-green-600",  bg: "bg-green-50"   },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-white shadow-sm`}>
            <p className="text-xl mb-1">{s.icon}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                ${activeTab === tab.id
                  ? "bg-[#FF7A00] text-white border-[#FF7A00] shadow-md shadow-orange-400/20"
                  : "bg-white text-slate-500 border-gray-200 hover:border-[#FF7A00] hover:text-[#FF7A00]"
                }`}>
              {tab.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-black
                ${activeTab === tab.id ? "bg-white/25 text-white" : "bg-gray-100 text-slate-500"}`}>
                {tab.id === "semua" ? counts.semua : counts[tab.id]}
              </span>
            </button>
          ))}
        </div>
        <input type="text" placeholder="Cari layanan, hewan..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-56 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 transition-all" />
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-20 bg-white rounded-2xl animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        riwayat.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <p className="text-5xl mb-4">📋</p>
            <h3 className="text-lg font-extrabold text-[#212153] mb-2">Belum ada riwayat kunjungan</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              Riwayat kunjungan akan muncul setelah kamu melakukan perawatan pertama di klinik Mew.
            </p>
            <Link to="/promo"
              className="inline-flex items-center gap-2 bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md">
              🎁 Lihat Promo Kunjungan Pertama
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-slate-500 font-semibold">Tidak ada kunjungan yang cocok.</p>
            <button onClick={() => { setActiveTab("semua"); setSearch(""); }}
              className="text-xs text-[#FF7A00] font-bold hover:underline mt-2 block mx-auto">
              Reset filter
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((r, idx) => {
            const status = STATUS_STYLE[r.status_aktif] ?? STATUS_STYLE.Menunggu;
            return (
              <div key={r.id_customer ?? idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all overflow-hidden">
                <div className="flex items-center gap-4 p-5">

                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl shrink-0">
                    {LAYANAN_ICON[r.layanan] ?? "🐾"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-extrabold text-[#212153] text-sm">{r.layanan ?? "Kunjungan"}</p>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${status.cls}`}>
                        {status.icon} {r.status_aktif}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400">
                      {r.nama_hewan && (
                        <span className="flex items-center gap-1">🐾 {r.nama_hewan}
                          {r.jenis_hewan && <span className="text-slate-300">({r.jenis_hewan})</span>}
                        </span>
                      )}
                      {r.nama_hewan && r.tanggal_transaksi && <span>·</span>}
                      {r.tanggal_transaksi && (
                        <span className="flex items-center gap-1">📅 {formatTanggal(r.tanggal_transaksi)}
                          {r.waktu && <span className="text-slate-300">· {r.waktu}</span>}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-xs text-slate-400 text-center mt-5">
          Menampilkan {filtered.length} dari {riwayat.length} kunjungan
        </p>
      )}
    </div>
  );
}
