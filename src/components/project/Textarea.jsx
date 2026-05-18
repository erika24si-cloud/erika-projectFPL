export function Textarea({ label, error, rows = 4, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-bold text-[#212153] ml-1">{label}</label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-700 outline-none resize-none transition-all duration-200
          focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF7A00]
          ${error ? "border-rose-400 focus:border-rose-500" : "border-slate-200 hover:border-slate-300"}`}
        {...props}
      />
      {error && (
        <span className="text-xs font-bold text-rose-500 ml-1">{error}</span>
      )}
    </div>
  );
}
