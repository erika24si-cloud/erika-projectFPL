/**
 * Modal - Dialog overlay serbaguna
 * Props:
 *  - isOpen: boolean
 *  - onClose: function
 *  - title: string
 *  - children: ReactNode
 *  - footer: ReactNode (opsional)
 */
export function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Kotak Modal */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-extrabold text-[#212153]">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Konten */}
        <div className="p-6">{children}</div>

        {/* Footer (opsional) */}
        {footer && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
