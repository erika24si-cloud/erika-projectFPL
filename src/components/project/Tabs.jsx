/**
 * Tabs - Navigasi tab horizontal
 * Props:
 *  - tabs: Array<{ id: string, label: string, icon?: string }>
 *  - activeTab: string (id tab yang aktif)
 *  - onChange: function(id)
 */
export function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200
            ${
              activeTab === tab.id
                ? "bg-white text-[#212153] shadow-sm"
                : "text-slate-500 hover:text-[#212153]"
            }`}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
