import React from "react";

const customers = [
  { id: 1, name: "Budi Santoso", email: "budi.s@email.com", phone: "0812-3456-7890", pets: ["Milo (Kucing)"], joinDate: "12 Jan 2024" },
  { id: 2, name: "Siti Aminah", email: "sitiaminah@email.com", phone: "0857-1122-3344", pets: ["Max (Anjing)", "Bella (Kucing)"], joinDate: "05 Feb 2024" },
  { id: 3, name: "Reza Rahadian", email: "reza.r@email.com", phone: "0899-8877-6655", pets: ["Oreo (Kelinci)"], joinDate: "20 Mar 2024" },
];

export default function Customers() {
  // Mengambil inisial nama untuk avatar
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0,2);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#212153]">Data Pelanggan</h1>
          <p className="text-gray-500 mt-2">Kelola informasi pelanggan dan hewan peliharaan mereka.</p>
        </div>
        <button className="bg-[#212153] text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 shadow-md transition-all">
          + Tambah Pelanggan
        </button>
      </div>

      {/* Customer List */}
      <div className="flex flex-col gap-4">
        {customers.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Profil Info */}
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                {getInitials(c.name)}
              </div>
              
              <div>
                <h3 className="font-extrabold text-[#212153] text-lg">{c.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span>✉️ {c.email}</span>
                  <span className="hidden md:inline">•</span>
                  <span>📞 {c.phone}</span>
                </div>
              </div>
            </div>

            {/* Pets Tags & Action */}
            <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
              <div className="flex flex-wrap gap-2">
                {c.pets.map((pet, idx) => (
                  <span key={idx} className="bg-orange-50 text-[#FF7A00] px-3 py-1 rounded-lg text-xs font-bold border border-orange-100">
                    🐾 {pet}
                  </span>
                ))}
              </div>
              
              <button className="text-gray-400 hover:text-[#212153] p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}