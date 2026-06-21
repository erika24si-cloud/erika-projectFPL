import { EmptyState } from "../../components/project/EmptyState";

// Data dummy — nanti bisa di-fetch dari Supabase
const RIWAYAT = [];

export default function MemberKunjungan() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-black text-[#212153] mb-1">Riwayat Kunjungan</h1>
      <p className="text-slate-500 text-sm mb-8">Semua histori perawatan hewan kamu di klinik Mew.</p>

      {RIWAYAT.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Belum ada riwayat kunjungan"
          description="Riwayat kunjungan akan muncul setelah kamu melakukan perawatan pertama di klinik Mew."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {RIWAYAT.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
              <p>{r.layanan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
