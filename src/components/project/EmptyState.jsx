export function EmptyState({ title, description, icon = "📭", actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="text-6xl mb-4 bg-orange-50 w-24 h-24 flex items-center justify-center rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-[#212153] mb-2">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">{description}</p>
      
      {actionText && (
        <button 
          onClick={onAction}
          className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}