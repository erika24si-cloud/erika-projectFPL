import { useState } from "react";
import { Button } from "../components/project/Button";
import { Badge } from "../components/project/Badge";
import { Toast } from "../components/project/Toast";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

// ── 1. Mengubah Data Statis Menjadi Data Dummy dari CSV ──
const dummyRecentAppointments = [
  { 
    id_customer: "CUST0796", 
    nama_lengkap: "Rina Pratama", 
    nama_hewan: "Snowy", 
    jenis_hewan: "Anjing", 
    tanggal_transaksi: "2025-11-19", 
    status_aktif: "Aktif" 
  },
  { 
    id_customer: "CUST0797", 
    nama_lengkap: "Citra Utami", 
    nama_hewan: "Luna", 
    jenis_hewan: "Hamster", 
    tanggal_transaksi: "2024-05-01", 
    status_aktif: "Aktif" 
  },
  { 
    id_customer: "CUST0001", 
    nama_lengkap: "Indah Putri", 
    nama_hewan: "Milo", 
    jenis_hewan: "Kucing", 
    tanggal_transaksi: "2024-03-12", 
    status_aktif: "Tidak Aktif" 
  },
];

const notifications = [
  { id: 1, title: "Stok Vaksin Menipis",   desc: "Sisa 5 dosis vaksin Rabies.",             dot: "bg-[#FF7A00]" },
  { id: 2, title: "Review Baru",           desc: "Budi S. memberikan bintang 5.",             dot: "bg-blue-500"  },
  { id: 3, title: "Jadwal Baru Masuk",     desc: "Siti A. memesan grooming untuk besok.",     dot: "bg-emerald-500" },
];

export default function Home() {
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  return (
    <div className="w-full">

      <PageHeader
        title="Dashboard Overview"
        subtitle="Selamat datang kembali! Berikut adalah ringkasan klinik Anda hari ini."
        action={
          <div className="bg-[#212153] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm">
            🗓️ 17 Mei 2026
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Jadwal Hari Ini"      value="24"       icon="📅" color="blue"   />
        <StatCard title="Total Pasien (Bulan)"  value="156"       icon="🐾" color="orange" />
        <StatCard title="Pendapatan (Hari Ini)" value="Rp 2.4Jt"  icon="💰" color="green"  />
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── 2. Penerapan Shadcn UI Table di Tabel Jadwal (inline card) ── */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-extrabold text-[#212153]">Jadwal Mendatang</h2>
            <button className="text-sm text-[#FF7A00] font-bold hover:underline">Lihat Semua →</button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Pelanggan</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Hewan</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Waktu</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* ── 3. Mapping Data CSV Dummy ke Tabel ── */}
              {dummyRecentAppointments.map((apt) => (
                <TableRow key={apt.id_customer} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-bold text-[#212153] text-sm">
                    {apt.nama_lengkap}
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">
                    {apt.nama_hewan} <span className="text-xs text-gray-400">({apt.jenis_hewan})</span>
                  </TableCell>
                  <TableCell className="font-bold text-[#212153] text-sm">
                    {apt.tanggal_transaksi}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Logika Badge disesuaikan: 'Aktif' jadi success, 'Tidak Aktif' jadi warning */}
                    <Badge 
                      text={apt.status_aktif} 
                      status={apt.status_aktif === "Aktif" ? "success" : "warning"} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-6">

          <div className="bg-gradient-to-br from-[#212153] to-gray-800 rounded-3xl p-6 text-white shadow-lg">
            <h2 className="text-lg font-extrabold mb-4">Aksi Cepat</h2>
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full !justify-start"
                onClick={() => showToast("Fitur buat jadwal segera hadir!", "info")}>
                <span className="bg-white/20 w-7 h-7 rounded-lg flex items-center justify-center mr-2">+</span>
                Buat Jadwal Baru
              </Button>
              <Button variant="primary" className="w-full !justify-start"
                onClick={() => showToast("Fitur tambah pasien segera hadir!", "info")}>
                <span className="bg-white/20 w-7 h-7 rounded-lg flex items-center justify-center mr-2">+</span>
                Tambah Pasien
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-lg font-extrabold text-[#212153] mb-4">Pemberitahuan</h2>
            {notifications.map((n) => (
              <div key={n.id} className="flex gap-4 items-start border-b border-slate-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
                <div className={`w-2.5 h-2.5 ${n.dot} rounded-full mt-1.5 shrink-0`} />
                <div>
                  <p className="text-sm font-bold text-[#212153]">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  );
}