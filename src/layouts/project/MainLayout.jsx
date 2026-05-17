import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/project/Sidebar";
import Navbar from "../../components/project/Navbar";

export default function MainLayout() {
  return (
    // Container utama: flex-row, tinggi semaksimal layar (h-screen)
    <div className="flex h-screen w-full bg-[#FEF6EE] overflow-hidden font-sans">
      
      {/* 1. Sidebar di sebelah kiri (Fixed) */}
      <Sidebar />

      {/* 2. Area Kanan (Header + Konten Utama) */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        {/* Navbar berubah fungsi menjadi Top Header */}
        <Navbar />

        {/* Area Konten (Tempat halaman Home, About, Services berganti-ganti) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Komponen transisi/animasi atau langsung Outlet */}
          <div className="bg-white rounded-3xl shadow-sm p-8 min-h-full border border-gray-100">
             <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}