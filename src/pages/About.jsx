import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 lg:px-20 text-[#212153]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-[#FF7A00] font-bold tracking-wider uppercase mb-3">Tentang Mew</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Lebih Dari Sekadar <br /> Klinik Hewan Biasa
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
           Mew hadir untuk menetapkan standar baru dalam dunia perawatan hewan peliharaan. Didukung oleh tim dokter hewan ahli bersertifikat dan fasilitas klinik yang modern, kami menjamin penanganan medis yang cepat, akurat, dan aman. Kami berkomitmen memberikan solusi kesehatan yang komprehensif agar hewan peliharaan Anda selalu berada dalam kondisi prima.
          </p>
          
          <div className="flex gap-8 mt-10 border-t border-gray-300 pt-8">
            <div>
              <h3 className="text-4xl font-extrabold text-[#FF7A00] mb-2">5K+</h3>
              <p className="text-gray-600 font-medium">Hewan Bahagia</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-[#FF7A00] mb-2">12+</h3>
              <p className="text-gray-600 font-medium">Dokter Ahli</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-[#FF7A00] mb-2">15</h3>
              <p className="text-gray-600 font-medium">Penghargaan</p>
            </div>
          </div>
        </div>

       <div className="relative w-full h-[400px]">
          <img 
            src="/images/hero-cat.png"
            alt="Suasana Klinik Mew" 
            className="w-full h-full object-cover rounded-[2rem] shadow-lg"
          />
        </div>

      </div>
    </div>
  );
}