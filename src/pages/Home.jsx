import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/project/Badge";
import { Toast } from "../components/project/Toast";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { supabase } from "../lib/supabase";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Legend, Cell,
} from "recharts";

const DAYS_ID    = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const MONTHS_ID  = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const MONTHS_SHORT_ID = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];

function getTodayFull() {
  const d = new Date();
  return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

const BADGE_MAP = {
  Menunggu:     "warning",
  Dikonfirmasi: "success",
  Selesai:      "success",
};

const STATUS_COLORS = {
  Menunggu:     "#FBBF24",
  Dikonfirmasi: "#3B82F6",
  Selesai:      "#10B981",
};

const PET_COLORS = ["#FF7A00", "#8B5CF6", "#10B981", "#EC4899", "#3B82F6", "#94A3B8"];

const NOTIF_FALLBACK = [
  { id: 1, title: "Stok Vaksin Menipis",   desc: "Sisa 5 dosis vaksin Rabies.",          dot: "bg-[#FF7A00]"   },
  { id: 2, title: "Ulasan Baru Masuk",     desc: "Budi S. memberikan bintang 5.",         dot: "bg-blue-500"    },
  { id: 3, title: "Jadwal Baru Diterima",  desc: "Siti A. memesan grooming untuk besok.", dot: "bg-emerald-500" },
];

const JADWAL_FALLBACK = [
  { id_customer:"CUST001", nama_lengkap:"Rina Pratama",  nama_hewan:"Snowy", jenis_hewan:"Anjing",  layanan:"Perawatan Medis",  tanggal_transaksi:"2026-07-05", waktu:"10:00 WIB", status_aktif:"Menunggu"     },
  { id_customer:"CUST002", nama_lengkap:"Citra Utami",   nama_hewan:"Luna",  jenis_hewan:"Hamster", layanan:"Grooming Premium", tanggal_transaksi:"2026-07-05", waktu:"13:30 WIB", status_aktif:"Selesai"       },
  { id_customer:"CUST003", nama_lengkap:"Indah Putri",   nama_hewan:"Milo",  jenis_hewan:"Kucing",  layanan:"Penitipan Hewan",  tanggal_transaksi:"2026-07-04", waktu:"15:00 WIB", status_aktif:"Dikonfirmasi" },
  { id_customer:"CUST004", nama_lengkap:"Gina Saputra",  nama_hewan:"Milo",  jenis_hewan:"Hamster", layanan:"Grooming Premium", tanggal_transaksi:"2026-07-04", waktu:"09:00 WIB", status_aktif:"Selesai"       },
  { id_customer:"CUST005", nama_lengkap:"Aditya Yoga",   nama_hewan:"Chiko", jenis_hewan:"Anjing",  layanan:"Perawatan Medis",  tanggal_transaksi:"2026-07-03", waktu:"11:00 WIB", status_aktif:"Selesai"       },
];

const PELANGGAN_FALLBACK = Array.from({ length: 18 }, (_, i) => ({ id: i + 1, created_at: `2026-0${Math.ceil((i+1)/6)}-${String((i % 28) + 1).padStart(2,"0")}` }));

const LAYANAN_FALLBACK = [
  { id:1, name:"Perawatan Medis",  price:"Rp 150.000", status:"Aktif" },
  { id:2, name:"Grooming Premium", price:"Rp 100.000", status:"Aktif" },
  { id:3, name:"Penitipan Hewan",  price:"Rp 80.000",  status:"Aktif" },
  { id:4, name:"Vaksinasi",        price:"Rp 120.000", status:"Nonaktif" },
];

function parsePrice(price) {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const digits = String(price).replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function EmptyChart({ loading, text }) {
  return (
    <div className="flex flex-col items-center justify-center h-[240px] gap-2 text-slate-400">
      {loading ? (
        <>
          <div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm animate-pulse">Memuat data...</p>
        </>
      ) : (
        <>
          <span className="text-3xl">📊</span>
          <p className="text-sm font-semibold">{text}</p>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [jadwal,     setJadwal]     = useState([]);
  const [pelanggan,  setPelanggan]  = useState([]);
  const [layanan,    setLayanan]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [jadwalRes, pelangganRes, layananRes] = await Promise.all([
        supabase.from("appointments").select("*").order("tanggal_transaksi", { ascending: false }),
        supabase.from("customers").select("*"),
        supabase.from("services").select("*"),
      ]);
      setJadwal(jadwalRes.data?.length    ? jadwalRes.data    : JADWAL_FALLBACK);
      setPelanggan(pelangganRes.data?.length ? pelangganRes.data : PELANGGAN_FALLBACK);
      setLayanan(layananRes.data?.length  ? layananRes.data   : LAYANAN_FALLBACK);
    } catch {
      setJadwal(JADWAL_FALLBACK);
      setPelanggan(PELANGGAN_FALLBACK);
      setLayanan(LAYANAN_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  const now       = new Date();
  const todayStr  = now.toISOString().split("T")[0];

  const jadwalHariIni  = jadwal.filter((j) => j.tanggal_transaksi === todayStr).length;
  const jadwalMenunggu = jadwal.filter((j) => j.status_aktif === "Menunggu").length;
  const totalPelanggan = pelanggan.length;
  const layananAktif   = layanan.filter((l) => l.status === "Aktif").length;

  const recentJadwal = jadwal.slice(0, 5);

  const trenBulanan = useMemo(() => {
    const map = {};
    jadwal.forEach((a) => {
      if (!a.tanggal_transaksi) return;
      const d = new Date(a.tanggal_transaksi);
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      map[key] = map[key] || { key, label: `${MONTHS_SHORT_ID[d.getMonth()]} ${d.getFullYear()}`, total: 0 };
      map[key].total += 1;
    });
    return Object.values(map).sort((x, y) => x.key.localeCompare(y.key));
  }, [jadwal]);

  const layananTerlaris = useMemo(() => {
    const map = {};
    jadwal.forEach((a) => {
      const nama = a.layanan ?? "Lainnya";
      map[nama] = (map[nama] ?? 0) + 1;
    });
    return Object.entries(map)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [jadwal]);

  // ── Analitik: distribusi status jadwal ───────────────────────────────────
  const distribusiStatus = useMemo(() => {
    const map = {};
    jadwal.forEach((a) => {
      const s = a.status_aktif ?? "Menunggu";
      map[s] = (map[s] ?? 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [jadwal]);

  const estimasiPendapatan = useMemo(() => {
    const hargaByName = {};
    layanan.forEach((s) => { hargaByName[s.name] = parsePrice(s.price); });
    return jadwal
      .filter((a) => a.status_aktif === "Selesai")
      .reduce((sum, a) => sum + (hargaByName[a.layanan] ?? 0), 0);
  }, [jadwal, layanan]);

  const formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <div className="w-full">
      <PageHeader
        title="Beranda Dashboard"
        subtitle="Ringkasan aktivitas klinik Mew hari ini."
        action={
          <div className="bg-[#212153] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm">
            🗓️ {getTodayFull()}
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-6">
        <StatCard title="Jadwal Hari Ini"      value={loading ? "..." : jadwalHariIni}                          icon="📅" color="blue"   />
        <StatCard title="Menunggu Konfirmasi"  value={loading ? "..." : jadwalMenunggu}                         icon="⏳" color="orange" />
        <StatCard title="Total Pelanggan"      value={loading ? "..." : totalPelanggan}                         icon="👥" color="green"  />
        <StatCard title="Est. Pendapatan"      value={loading ? "..." : formatRupiah(estimasiPendapatan)}       icon="💰" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50">
            <h2 className="text-lg font-extrabold text-[#212153]">Jadwal Terbaru</h2>
            <Link to="/dashboard/appointments"
              className="text-sm text-[#FF7A00] font-bold hover:underline">
              Lihat Semua →
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 text-sm animate-pulse">Memuat data...</p>
            </div>
          ) : recentJadwal.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-slate-400">
              <span className="text-4xl">📅</span>
              <p className="text-sm font-semibold">Belum ada jadwal tercatat.</p>
              <Link to="/dashboard/appointments"
                className="text-xs text-[#FF7A00] font-bold hover:underline mt-1">
                + Buat jadwal baru
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs pl-6">Pelanggan</TableHead>
                  <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Hewan</TableHead>
                  <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Tanggal</TableHead>
                  <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs text-right pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentJadwal.map((apt, i) => (
                  <TableRow key={apt.id_customer ?? i} className="hover:bg-orange-50/20 transition-colors">
                    <TableCell className="font-bold text-[#212153] text-sm pl-6">
                      {apt.nama_lengkap ?? "-"}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {apt.nama_hewan ?? "-"}
                      {apt.jenis_hewan && <span className="text-xs text-gray-400 ml-1">({apt.jenis_hewan})</span>}
                    </TableCell>
                    <TableCell className="text-sm text-[#212153] font-medium">
                      {apt.tanggal_transaksi ?? "-"}
                      {apt.waktu && <span className="text-xs text-gray-400 block">{apt.waktu}</span>}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge
                        text={apt.status_aktif ?? "Menunggu"}
                        status={BADGE_MAP[apt.status_aktif] ?? "warning"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex flex-col gap-5">

          <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl p-6 text-white shadow-lg">
            <h2 className="text-base font-extrabold mb-5">Aksi Cepat</h2>
            <div className="flex flex-col gap-3">
              <Link to="/dashboard/appointments"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all">
                <span className="text-lg">📅</span> Buat Jadwal Baru
              </Link>
              <Link to="/dashboard/customers"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all">
                <span className="text-lg">👥</span> Tambah Pelanggan
              </Link>
              <Link to="/dashboard/services"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all">
                <span className="text-lg">🩺</span> Kelola Layanan
              </Link>
              <Link to="/dashboard/membership"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all">
                <span className="text-lg">🎖️</span> Lihat Keanggotaan
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
            <h2 className="text-base font-extrabold text-[#212153] mb-4">Pemberitahuan</h2>
            {NOTIF_FALLBACK.map((n) => (
              <div key={n.id}
                className="flex gap-3 items-start border-b border-slate-50 pb-3.5 mb-3.5 last:border-0 last:pb-0 last:mb-0">
                <div className={`w-2 h-2 ${n.dot} rounded-full mt-1.5 shrink-0`} />
                <div>
                  <p className="text-sm font-bold text-[#212153]">{n.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#212153]">Analitik & Insight</h2>
            <p className="text-xs text-slate-400 mt-0.5">Tren kunjungan, performa layanan, dan distribusi status jadwal.</p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold">
            🩺 {loading ? "..." : layananAktif} layanan aktif
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-6">
            <h3 className="text-sm font-extrabold text-[#212153] mb-1">Tren Kunjungan Bulanan</h3>
            <p className="text-xs text-slate-400 mb-4">Jumlah jadwal yang tercatat per bulan.</p>
            {trenBulanan.length === 0 ? (
              <EmptyChart loading={loading} text="Belum ada data kunjungan." />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={trenBulanan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9" }} />
                  <Line type="monotone" dataKey="total" name="Kunjungan" stroke="#FF7A00" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-6">
            <h3 className="text-sm font-extrabold text-[#212153] mb-1">Status Jadwal</h3>
            <p className="text-xs text-slate-400 mb-4">Distribusi status seluruh jadwal.</p>
            {distribusiStatus.length === 0 ? (
              <EmptyChart loading={loading} text="Belum ada data status." />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={distribusiStatus} dataKey="value" nameKey="name" innerRadius={48} outerRadius={75} paddingAngle={3}>
                    {distribusiStatus.map((entry, i) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? PET_COLORS[i % PET_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-6">
          <h3 className="text-sm font-extrabold text-[#212153] mb-1">Layanan Terlaris</h3>
          <p className="text-xs text-slate-400 mb-4">Jumlah pemesanan per jenis layanan.</p>
          {layananTerlaris.length === 0 ? (
            <EmptyChart loading={loading} text="Belum ada data layanan." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={layananTerlaris} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12, fill: "#212153" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9" }} />
                <Bar dataKey="total" name="Jumlah Booking" fill="#212153" radius={[0, 8, 8, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}