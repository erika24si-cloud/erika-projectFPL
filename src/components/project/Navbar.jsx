import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const storedUser = localStorage.getItem("mew_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.fullName) {
        setUserName(parsedUser.fullName);
      } 
      else if (parsedUser.email) {
        setUserName(parsedUser.email.split('@')[0]);
      }
    }
  }, []);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "A";
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-6 lg:px-10 z-30 shrink-0 border-b border-slate-100/60 transition-all duration-300">
      
      {/* Bagian Kiri: Salam */}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-black text-[#212153] tracking-tight">
          Selamat Datang, <span className="text-[#FF7A00]">{userName}</span> 👋
        </h2>
        <p className="text-xs font-medium text-slate-400 tracking-wide">
          Kelola data klinik Mew Anda di sini
        </p>
      </div>

      {/* Bagian Kanan: Profil User dengan Micro-Interaction */}
      <div className="flex items-center gap-4">
        
        {/* Pembungkus Profil: Sekarang interaktif saat disentuh/hover */}
        <div className="flex items-center gap-3.5 pl-4 py-1.5 pr-2 rounded-2xl hover:bg-slate-50/80 transition-all duration-200 cursor-pointer group">
          
          <div className="hidden md:flex flex-col text-right gap-0.5">
            <p className="text-sm font-bold text-[#212153] group-hover:text-[#FF7A00] transition-colors duration-200">
              {userName}
            </p>
            {/* Mengubah ukuran role jadi lebih compact & elegan */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Administrator
            </p>
          </div>
          
          {/* Avatar Bulat dengan Gradien Lembut & Efek Scale Magnify */}
          <div className="w-10 h-10 bg-gradient-to-br from-orange-50 to-orange-100 border border-[#FF7A00]/30 rounded-full flex items-center justify-center font-bold text-[#FF7A00] text-sm uppercase shadow-sm group-hover:scale-105 group-hover:border-[#FF7A00] transition-all duration-200">
            {getInitial(userName)}
          </div>

        </div>

      </div>

    </header>
  );
}