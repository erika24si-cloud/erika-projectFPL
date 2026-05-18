export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <p className="text-sm text-slate-500 font-medium">
        Halaman <span className="font-bold text-[#212153]">{currentPage}</span> dari{" "}
        <span className="font-bold text-[#212153]">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-[#FF7A00] hover:text-[#FF7A00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-bold"
        >
          ‹
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200
              ${
                page === currentPage
                  ? "bg-[#FF7A00] text-white shadow-md shadow-orange-500/25"
                  : "border border-slate-200 text-slate-600 hover:border-[#FF7A00] hover:text-[#FF7A00]"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-[#FF7A00] hover:text-[#FF7A00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-bold"
        >
          ›
        </button>
      </div>
    </div>
  );
}
