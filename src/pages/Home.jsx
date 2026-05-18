import { Button } from "../components/project/Button";
import { Badge } from "../components/project/Badge";
import { StatCard } from "../components/project/StatCard";

export default function Home() {
  // Data dummy untuk tabel ringkasan
  const recentAppointments = [
    { id: 1, owner: "Budi Santoso", pet: "Milo (Kucing)", time: "10:00 WIB", status: "Menunggu" },
    { id: 2, owner: "Siti Aminah", pet: "Max (Anjing)", time: "13:30 WIB", status: "Selesai" },
    { id: 3, owner: "Reza Rahadian", pet: "Oreo (Kelinci)", time: "15:00 WIB", status: "Menunggu" },
  ];

  return (
    <div className="w-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#212153]">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Selamat datang kembali! Berikut adalah ringkasan klinik Anda hari ini.</p>
        </div>
        <div className="bg-[#212153] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm">
          🗓️ 17 Mei 2026
        </div>
      </div>

      {/* 2. PENERAPAN STAT CARDS (Lihat betapa pendeknya sekarang!) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Jadwal Hari Ini" 
          value="24" 
          icon="📅" 
          color="blue" 
        />
        <StatCard 
          title="Total Pasien (Bulan)" 
          value="156" 
          icon="🐾" 
          color="orange" 
        />
        <StatCard 
          title="Pendapatan (Hari Ini)" 
          value="Rp 2.4Jt" 
          icon="💰" 
          color="green" 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Recent Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#212153]">Jadwal Mendatang</h2>
            <button className="text-sm text-[#FF7A00] font-bold hover:underline">Lihat Semua &rarr;</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Pelanggan</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Hewan</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Waktu</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#212153] text-sm">{apt.owner}</td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{apt.pet}</td>
                    <td className="py-4 px-6 font-bold text-[#212153] text-sm">{apt.time}</td>
                    <td className="py-4 px-6">
                      
                      {/* 3. PENERAPAN BADGE STATUS PADA TABEL */}
                      <Badge 
                        text={apt.status} 
                        status={apt.status === 'Selesai' ? 'success' : 'warning'} 
                      />

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Actions & Notifications */}
        <div className="flex flex-col gap-6">
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-[#212153] to-gray-800 rounded-3xl p-6 text-white shadow-lg">
            <h2 className="text-lg font-extrabold mb-4">Aksi Cepat</h2>
            <div className="flex flex-col gap-3">
              
              {/* 4. PENERAPAN BUTTON KOMPONEN */}
              <Button variant="primary" className="w-full !justify-start" size="md">
                <span className="bg-white/20 w-7 h-7 rounded-lg flex items-center justify-center text-lg mr-2">+</span>
                Buat Jadwal Baru
              </Button>

              <Button variant="primary" className="w-full !justify-start" size="md">
                <span className="bg-white/20 w-7 h-7 rounded-lg flex items-center justify-center text-lg mr-2">+</span>
                Tambah Pasien
              </Button>

            </div>
          </div>

          {/* Mini Notification (Bisa kamu jadikan komponen reusable selanjutnya!) */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-lg font-extrabold text-[#212153] mb-4">Pemberitahuan</h2>
            <div className="flex gap-4 items-start border-b border-gray-50 pb-4 mb-4">
              <div className="w-2 h-2 bg-[#FF7A00] rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#212153]">Stok Vaksin Menipis</p>
                <p className="text-xs text-gray-500 mt-1">Sisa 5 dosis vaksin Rabies.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#212153]">Review Baru</p>
                <p className="text-xs text-gray-500 mt-1">Budi S. memberikan bintang 5.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}