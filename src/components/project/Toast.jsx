import { useEffect } from "react";

/**
 * Toast - Notifikasi pop-up sementara di pojok layar
 * Props:
 *  - message: string
 *  - type: 'success' | 'error' | 'warning' | 'info'
 *  - isVisible: boolean
 *  - onClose: function
 *  - duration: number (ms, default 3000)
 */
export function Toast({ message, type = "success", isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: { bar: "bg-emerald-500", icon: "✅", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
    error:   { bar: "bg-rose-500",    icon: "❌", text: "text-rose-700",    bg: "bg-rose-50 border-rose-200" },
    warning: { bar: "bg-[#FF7A00]",   icon: "⚠️", text: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
    info:    { bar: "bg-blue-500",    icon: "ℹ️", text: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  };

  const s = styles[type] || styles.info;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-lg max-w-sm ${s.bg}`}>
        {/* Garis warna di kiri */}
        <div className={`w-1 h-10 rounded-full shrink-0 ${s.bar}`} />
        <span className="text-xl">{s.icon}</span>
        <p className={`text-sm font-bold flex-1 ${s.text}`}>{message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors ml-2 text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
