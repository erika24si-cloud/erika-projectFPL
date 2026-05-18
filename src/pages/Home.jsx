import { useState } from "react";
import { Button } from "../components/project/Button";
import { Badge } from "../components/project/Badge";
import { Toast } from "../components/project/Toast";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";

const recentAppointments = [
  { id: 1, owner: "Budi Santoso",  pet: "Milo (Kucing)",  time: "10:00 WIB", status: "Menunggu" },
  { id: 2, owner: "Siti Aminah",   pet: "Max (Anjing)",   time: "13:30 WIB", status: "Selesai"  },
  { id: 3, owner: "Reza Rahadian", pet: "Oreo (Kelinci)", time: "15:00 WIB", status: "Menunggu" },
];

const notifications = [
  { id: 1, title: "Stok Vaksin Menipis",   desc: "Sisa 5 dosis vaksin Rabies.",              dot: "bg-[#FF7A00]" },
  { id: 2, title: "Review Baru",           desc: "Budi S. memberikan bintang 5.",             dot: "bg-blue-500"  },
  { id: 3, title: "Jadwal Baru Masuk",     desc: "Siti A. memesan grooming untuk besok.",     dot: "bg-emerald-500" },
];


export default function Home() {
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Selamat datang kembali! Berikut adalah ringkasan klinik Anda hari ini."
        action={
          <div className="bg-[#212153] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm">
            🗓️ 17 Mei 2026
          </div>
        }
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Jadwal Hari Ini"       value="24"        icon="📅" color="blue"   />
        <StatCard title="Total Pasien (Bulan)"  value="156"       icon="🐾" color="orange" />
        <StatCard title="Pendapatan (Hari Ini)" value="Rp 2.4Jt"  icon="💰" color="green"  />
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Tabel Jadwal (inline card) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#212153]">Jadwal Mendatang</h2>
            <button className="text-sm text-[#FF7A00] font-bold hover:underline">Lihat Semua →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  {["Pelanggan", "Hewan", "Waktu", "Status"].map((h) => (
                    <th key={h} className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#212153] text-sm">{apt.owner}</td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{apt.pet}</td>
                    <td className="py-4 px-6 font-bold text-[#212153] text-sm">{apt.time}</td>
                    <td className="py-4 px-6">
                      <Badge text={apt.status} status={apt.status === "Selesai" ? "success" : "warning"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-6">

          {/* Aksi Cepat */}
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

          {/* Pemberitahuan (inline) */}
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

      {/* ── Toast ── */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  );
}
