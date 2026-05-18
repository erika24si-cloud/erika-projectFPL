export function Badge({ text, status = 'neutral' }) {
  const styles = {
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-orange-100 text-orange-700 border-orange-200",
    danger:  "bg-rose-100 text-rose-700 border-rose-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${styles[status] || styles.neutral}`}>
      {text}
    </span>
  );
}
