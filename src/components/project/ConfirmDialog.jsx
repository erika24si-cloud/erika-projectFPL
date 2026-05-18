export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Apakah kamu yakin?",
  description = "Tindakan ini tidak dapat dibatalkan.",
  confirmText = "Ya, Hapus",
  cancelText = "Batal",
  variant = "danger",
}) {
  if (!isOpen) return null;

  const confirmStyles = {
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-rose-500/25",
    warning: "bg-[#FF7A00] hover:bg-[#FF9F43] text-white shadow-md hover:shadow-orange-500/25",
  };

  const iconBg = {
    danger: "bg-rose-100 text-rose-500",
    warning: "bg-orange-100 text-[#FF7A00]",
  };

  const icon = variant === "danger" ? "🗑️" : "⚠️";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm z-10 p-8 flex flex-col items-center text-center gap-4">
        {/* Ikon */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${iconBg[variant]}`}>
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-[#212153]">{title}</h3>
          <p className="text-slate-500 text-sm mt-2">{description}</p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${confirmStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
