import React from "react";

const adminServices = [
  { id: 1, name: "Veterinary Care", desc: "Pemeriksaan medis umum dan pengobatan", category: "Medis", price: "Rp 150.000", status: "Aktif" },
  { id: 2, name: "Premium Grooming", desc: "Mandi, potong kuku, dan perawatan bulu", category: "Perawatan", price: "Rp 100.000", status: "Aktif" },
  { id: 3, name: "Pet Hotel & Daycare", desc: "Penitipan hewan dengan fasilitas AC & bermain", category: "Penitipan", price: "Rp 80.000 / hari", status: "Nonaktif" },
];

export default function Services() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#212153]">Manajemen Layanan</h1>
          <p className="text-gray-500 mt-2">Kelola daftar layanan, harga, dan ketersediaan di klinik Mew.</p>
        </div>
        <button className="bg-[#FF7A00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e66a00] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <span className="text-xl">+</span> Tambah Layanan
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminServices.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col">
            
            {/* Top: Status & Category */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#FF7A00] text-xs font-bold bg-orange-50 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                {item.category}
              </span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${item.status === 'Aktif' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {item.status}
              </span>
            </div>

            {/* Middle: Info */}
            <div className="mb-6 flex-1">
              <h3 className="text-xl font-extrabold text-[#212153] mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="text-2xl font-black text-[#212153]">{item.price}</div>
            </div>
            
            {/* Bottom: Actions */}
            <div className="flex gap-3 mt-auto">
              <button className="flex-1 bg-white border-2 border-gray-100 hover:border-[#212153] text-[#212153] py-2.5 rounded-xl text-sm font-bold transition-colors">
                Edit
              </button>
              <button className="flex-1 bg-white border-2 border-red-50 hover:bg-red-50 text-red-500 hover:text-red-600 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}