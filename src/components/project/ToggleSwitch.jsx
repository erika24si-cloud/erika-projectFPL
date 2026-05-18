export function ToggleSwitch({
  checked,
  onChange,
  label,
  labelOn = "Aktif",
  labelOff = "Nonaktif",
  disabled = false,
}) {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm font-bold text-[#212153]">{label}</span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20
          ${checked ? "bg-[#FF7A00]" : "bg-slate-200"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300
            ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>

      <span
        className={`text-xs font-bold transition-colors duration-200 ${
          checked ? "text-emerald-600" : "text-slate-400"
        }`}
      >
        {checked ? labelOn : labelOff}
      </span>
    </div>
  );
}
