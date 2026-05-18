export function NotificationItem({ title, description, dotColor = "orange" }) {
  const colors = {
    orange: "bg-[#FF7A00]",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    red: "bg-rose-500"
  };

  return (
    <div className="flex gap-4 items-start border-b border-slate-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
      <div className={`w-2.5 h-2.5 ${colors[dotColor] || colors.orange} rounded-full mt-1.5 shrink-0 shadow-sm`}></div>
      <div>
        <p className="text-sm font-bold text-[#212153]">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );
}