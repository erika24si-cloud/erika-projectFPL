export function InputField({ className = "", ...props }) {
  return (
    <input
      className={`px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 placeholder-slate-400
        focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10
        hover:border-slate-300 transition-all duration-200 ${className}`}
      {...props}
    />
  );
}
