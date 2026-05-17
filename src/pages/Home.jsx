import React from "react";

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

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-3xl shrink-0">
            📅
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Jadwal Hari Ini</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-[#212153]">24</h3>
              <span className="text-xs text-green-500 font-bold mb-1 border border-green-200 bg-green-50 px-2 py-0.5 rounded-md">+3 dari kemarin</span>
            </div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#FF7A00] flex items-center justify-center text-3xl shrink-0">
            🐾
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Total Pasien (Bulan)</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-[#212153]">156</h3>
              <span className="text-xs text-green-500 font-bold mb-1 border border-green-200 bg-green-50 px-2 py-0.5 rounded-md">+12%</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-3xl shrink-0">
            💰
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Pendapatan (Hari Ini)</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-[#212153]">Rp 2.4Jt</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area (Split into 2 columns on large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Recent Appointments Table (Takes 2 columns) */}
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
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${apt.status === 'Selesai' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-[#FF7A00] border-orange-200'}`}>
                        {apt.status}
                      </span>
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
              <button className="w-full bg-white/10 hover:bg-white/20 text-left px-5 py-3 rounded-xl font-bold transition-colors flex items-center gap-3">
                <span className="bg-[#FF7A00] w-8 h-8 rounded-lg flex items-center justify-center text-xl">+</span>
                Buat Jadwal Baru
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-left px-5 py-3 rounded-xl font-bold transition-colors flex items-center gap-3">
                <span className="bg-[#FF7A00] w-8 h-8 rounded-lg flex items-center justify-center text-xl">+</span>
                Tambah Pasien
              </button>
            </div>
          </div>

          {/* Mini Notification */}
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