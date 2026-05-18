export function StatCard({ title, value, icon, color = "orange", trend }) {
  const iconBgs = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-emerald-100 text-emerald-600",
    purple: "bg-purple-100 text-purple-600"
  };
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-black text-[#212153]">{value}</h3>
          {trend && (
            <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${trend.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              <span>{trend.isUp ? '↗' : '↘'}</span>
              {trend.value}% dari bulan lalu
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${iconBgs[color] || iconBgs.orange}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}