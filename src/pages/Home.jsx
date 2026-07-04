import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/project/Badge";
import { Toast } from "../components/project/Toast";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { supabase } from "../lib/supabase";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const DAYS_ID    = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const MONTHS_ID  = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function getTodayFull() {
  const d = new Date();
  return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

const BADGE_MAP = {
  Menunggu:     "warning",
  Dikonfirmasi: "success",
  Selesai:      "success",
};

const NOTIF_FALLBACK = [
  { id: 1, title: "Stok Vaksin Menipis",   desc: "Sisa 5 dosis vaksin Rabies.",          dot: "bg-[#FF7A00]"    },
  { id: 2, title: "Ulasan Baru Masuk",     desc: "Budi S. memberikan bintang 5.",         dot: "bg-blue-500"     },
  { id: 3, title: "Jadwal Baru Diterima",  desc: "Siti A. memesan grooming untuk besok.", dot: "bg-emerald-500"  },
];

export default function Home() {
  const [jadwal,     setJadwal]     = useState([]);
  const [pelanggan,  setPelanggan]  = useState([]);
  const [layanan,    setLayanan]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [toast,      setToast]      = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ visible: true, message, type });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [jadwalRes, pelangganRes, layananRes] = await Promise.all([
        supabase.from("appointments").select("*").order("tanggal_transaksi", { ascending: false }).limit(5),
        supabase.from("customers").select("id, created_at"),
        supabase.from("services").select("id, status"),
      ]);
      if (jadwalRes.data?.length)    setJadwal(jadwalRes.data);
      if (pelangganRes.data?.length) setPelanggan(pelangganRes.data);
      if (layananRes.data?.length)   setLayanan(layananRes.data);
    } catch { }
    finally { setLoading(false); }
  };

  const now       = new Date();
  const todayStr  = now.toISOString().split("T")[0];

  const jadwalHariIni  = jadwal.filter((j) => j.tanggal_transaksi === todayStr).length;
  const jadwalMenunggu = jadwal.filter((j) => j.status_aktif === "Menunggu").length;
  const totalPelanggan = pelanggan.length;
  const layananAktif   = layanan.filter((l) => l.status === "Aktif").length;

  const recentJadwal = jadwal.slice(0, 5);

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
        <StatCard title="Jadwal Hari Ini"   value={loading ? "..." : jadwalHariIni}  icon="📅" color="blue"   />
        <StatCard title="Menunggu Konfirmasi" value={loading ? "..." : jadwalMenunggu} icon="⏳" color="orange" />
        <StatCard title="Total Pelanggan"   value={loading ? "..." : totalPelanggan}  icon="👥" color="green"  />
        <StatCard title="Layanan Aktif"     value={loading ? "..." : layananAktif}    icon="🩺" color="purple" />
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

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
