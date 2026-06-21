import { useState } from "react";

/**
 * PasswordInput — Input password dengan tombol show/hide
 * Props: semua atribut HTML input standar + className
 */
export function PasswordInput({ className = "", ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className={`w-full px-4 py-2.5 pr-11 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 placeholder-slate-400
          focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10
          hover:border-slate-300 transition-all duration-200 ${className}`}
        {...props}
      />

      {/* Tombol toggle show/hide */}
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#FF7A00] transition-colors p-0.5"
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        tabIndex={-1}
      >
        {show ? (
          /* Password terlihat → tampilkan ikon mata TERBUKA */
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        ) : (
          /* Password tersembunyi → tampilkan ikon mata DICORET */
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        )}
      </button>
    </div>
  );
}
