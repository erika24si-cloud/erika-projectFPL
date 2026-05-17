import React, { useState, useEffect } from "react";

export default function Navbar() {
  // State untuk menyimpan nama user, default-nya "Admin"
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    // Ambil data user dari localStorage saat komponen dimuat
    const storedUser = localStorage.getItem("mew_user");
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Jika ada fullName (dari halaman register), gunakan itu
      if (parsedUser.fullName) {
        setUserName(parsedUser.fullName);
      } 
      // Jika login pakai email saja tanpa register nama (fallback)
      else if (parsedUser.email) {
        // Ambil kata sebelum '@' di email sebagai nama
        setUserName(parsedUser.email.split('@')[0]);
      }
    }
  }, []);

  // Fungsi untuk mengambil huruf pertama dari nama untuk Avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "A";
  };

  return (
    <header className="bg-white h-20 shadow-sm border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 z-10 shrink-0">
      
      {/* Bagian Kiri: Salam */}
      <div>
        {/* Tampilkan nama secara dinamis */}
        <h2 className="text-xl font-bold text-[#212153]">Selamat Datang, {userName} 👋</h2>
        <p className="text-sm text-gray-500">Kelola data klinik Mew Anda di sini</p>
      </div>

      {/* Bagian Kanan: Profil User */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          {/* Tampilkan nama di profil */}
          <p className="text-sm font-bold text-[#212153]">{userName}</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        
        {/* Avatar Profil Bulat dengan Inisial Dinamis */}
        <div className="w-10 h-10 bg-orange-100 rounded-full border-2 border-[#FF7A00] flex items-center justify-center font-extrabold text-[#FF7A00] uppercase">
          {getInitial(userName)}
        </div>
      </div>

    </header>
  );
}