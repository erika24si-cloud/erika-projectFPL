/**
 * PageHeader - Header standar untuk setiap halaman dashboard
 * Props:
 *  - title: string
 *  - subtitle: string (opsional)
 *  - action: ReactNode (opsional, tombol di kanan)
 */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#212153]">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>
        )}
      </div>
      {action && <div className="w-full md:w-auto">{action}</div>}
    </div>
  );
}
