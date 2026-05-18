import React from "react";

// Memasukkan komponen reusable langsung ke dalam file ini agar dapat dikompilasi pada environment saat ini.
export function Button({ children, variant = 'primary', size = 'md', onClick, className = '', ...props }) {
  const baseStyle = "font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#FF7A00] hover:bg-[#FF9F43] text-white shadow-md hover:shadow-orange-500/25",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-rose-500/25",
    outline: "bg-transparent border-2 border-slate-200 text-slate-600 hover:border-[#FF7A00] hover:text-[#FF7A00]"
  };
  const sizes = { sm: "py-1.5 px-3 text-xs", md: "py-2.5 px-5 text-sm", lg: "py-3 px-6 text-base" };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}