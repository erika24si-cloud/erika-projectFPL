import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF6EE]">
      <div className="w-12 h-12 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin"></div>
      
      <p className="mt-4 text-[#212153] font-semibold animate-pulse">
        Memuat halaman...
      </p>
    </div>
  );
}