import { useAuth } from "../../contexts/AuthContext";

const DAYS_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

function getTodayString() {
  const d = new Date();
  return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Navbar() {
  const { user } = useAuth();

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "A";

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md h-18 min-h-[72px] flex items-center justify-between px-6 lg:px-10 z-30 shrink-0 border-b border-slate-100/80 shadow-[0_1px_12px_rgb(0,0,0,0.04)]">

      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-black text-[#212153] tracking-tight">
          Halo, <span className="text-[#FF7A00]">{userName}</span> 👋
        </h2>
        <p className="text-xs text-slate-400 font-medium">{getTodayString()}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3.5 pl-4 py-1.5 pr-2 rounded-2xl hover:bg-slate-50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-slate-100">
          <div className="hidden md:flex flex-col text-right gap-0.5">
            <p className="text-sm font-bold text-[#212153] group-hover:text-[#FF7A00] transition-colors duration-200 leading-tight">
              {userName}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Administrator
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF7A00] to-orange-400 rounded-full flex items-center justify-center font-black text-white text-sm uppercase shadow-sm group-hover:scale-105 transition-transform duration-200">
            {getInitial(userName)}
          </div>
        </div>
      </div>

    </header>
  );
}
