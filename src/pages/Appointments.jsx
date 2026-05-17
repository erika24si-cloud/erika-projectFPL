import React from "react";

const appointments = [
  { id: 1, owner: "Budi Santoso", pet: "Milo (Kucing)", service: "Vaksinasi Tahunan", time: "10:00 WIB", date: "Hari Ini", status: "Menunggu" },
  { id: 2, owner: "Siti Aminah", pet: "Max (Anjing)", service: "Premium Grooming", time: "13:30 WIB", date: "Hari Ini", status: "Selesai" },
  { id: 3, owner: "Rizky Pratama", pet: "Luna (Kucing)", service: "Pemeriksaan Gigi", time: "15:00 WIB", date: "Besok", status: "Dikonfirmasi" },
];

export default function Appointments() {
  // Fungsi penentu warna badge status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Selesai': return 'bg-green-50 text-green-600 border-green-200';
      case 'Dikonfirmasi': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-orange-50 text-[#FF7A00] border-orange-200';
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#212153]">Jadwal Temu</h1>
          <p className="text-gray-500 mt-2">Pantau dan kelola jadwal reservasi pelanggan.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <input type="text" placeholder="Cari nama atau jadwal..." className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] w-full md:w-64" />
          <button className="bg-[#212153] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Info Pelanggan & Hewan</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Layanan</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Jadwal</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-[#212153] text-sm">{apt.owner}</p>
                    <p className="text-gray-500 text-xs mt-1">{apt.pet}</p>
                  </td>
                  <td className="py-4 px-6 font-medium text-sm text-gray-700">{apt.service}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-[#212153] text-sm">{apt.date}</p>
                    <p className="text-gray-500 text-xs mt-1">{apt.time}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#FF7A00] hover:text-[#e66a00] font-bold text-sm bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}