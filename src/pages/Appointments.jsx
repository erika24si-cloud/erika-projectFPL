import { Badge } from "../components/project/Badge";
import { Button } from "../components/project/Button";
import { InputField } from "../components/project/InputField";

export default function Appointments() {
  
  // Fungsi penentu tipe badge berdasarkan teks status
  const getBadgeStatus = (status) => {
    switch(status) {
      case 'Selesai': return 'success';
      case 'Dikonfirmasi': return 'info';
      default: return 'warning'; // Untuk 'Menunggu'
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
          
          {/* MENGGUNAKAN KOMPONEN INPUTFIELD */}
          <InputField 
            type="text" 
            placeholder="Cari nama atau jadwal..." 
            className="w-full md:w-64" 
          />
          
          {/* MENGGUNAKAN KOMPONEN BUTTON */}
          <Button variant="secondary">
            Filter
          </Button>

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
                    
                    {/* MENGGUNAKAN KOMPONEN BADGE */}
                    <Badge 
                      text={apt.status} 
                      status={getBadgeStatus(apt.status)} 
                    />

                  </td>
                  <td className="py-4 px-6 text-right">
                    
                    {/* MENGGUNAKAN KOMPONEN BUTTON */}
                    <Button variant="ghost" size="sm" className="ml-auto">
                      Detail
                    </Button>

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