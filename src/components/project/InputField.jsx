export function InputField({ className = "", ...props }) {
  return (
    <input
      className={`px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-colors ${className}`}
      {...props}
    />
  );
}