import { useState } from "react";
import { Button } from "../../components/project/Button";
import { InputField } from "../../components/project/InputField";
import { EmptyState } from "../../components/project/EmptyState";
import { Toast } from "../../components/project/Toast";

const JENIS = ["Kucing","Anjing","Kelinci","Hamster","Burung","Lainnya"];

export default function MemberHewan() {
  const [hewanList, setHewanList] = useState([]);
  const [showForm,  setShowForm]  = useState(false);
  const [form,      setForm]      = useState({ nama: "", jenis: "", usia: "", catatan: "" });
  const [toast,     setToast]     = useState({ visible: false, message: "", type: "success" });

  const showToast = (msg, type = "success") =>
    setToast({ visible: true, message: msg, type });

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.nama.trim()) return;
    setHewanList((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ nama: "", jenis: "", usia: "", catatan: "" });
    setShowForm(false);
    showToast("Data hewan berhasil ditambahkan!", "success");
  };

  const handleDelete = (id) => {
    setHewanList((prev) => prev.filter((h) => h.id !== id));
    showToast("Data hewan dihapus.", "error");
  };

  const ICONS = { Kucing:"🐱", Anjing:"🐶", Kelinci:"🐰", Hamster:"🐹", Burung:"🐦", Lainnya:"🐾" };

  return (
    <div className="w-full">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#212153] mb-1">Hewan Peliharaan</h1>
          <p className="text-slate-500 text-sm">Daftar hewan peliharaan yang terdaftar di klinik Mew.</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Batal" : "+ Tambah Hewan"}
        </Button>
      </div>

      {/* Form tambah */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mb-6">
          <h3 className="font-extrabold text-[#212153] mb-4">Data Hewan Baru</h3>
          <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Hewan <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Milo" value={form.nama}
                onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} className="w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Jenis Hewan</label>
              <select value={form.jenis} onChange={(e) => setForm((f) => ({ ...f, jenis: e.target.value }))}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 transition-all">
                <option value="">Pilih jenis...</option>
                {JENIS.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Usia</label>
              <InputField type="text" placeholder="Contoh: 2 tahun" value={form.usia}
                onChange={(e) => setForm((f) => ({ ...f, usia: e.target.value }))} className="w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Catatan</label>
              <InputField type="text" placeholder="Alergi, kondisi khusus, dll." value={form.catatan}
                onChange={(e) => setForm((f) => ({ ...f, catatan: e.target.value }))} className="w-full" />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Batal</Button>
              <Button variant="primary" type="submit">Simpan</Button>
            </div>
          </form>
        </div>
      )}

      {/* List hewan */}
      {hewanList.length === 0 ? (
        <EmptyState icon="🐾" title="Belum ada hewan terdaftar"
          description="Tambahkan hewan peliharaan kamu untuk mulai memantau kesehatan mereka."
          actionText="+ Tambah Hewan" onAction={() => setShowForm(true)} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {hewanList.map((h) => (
            <div key={h.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl shrink-0">
                {ICONS[h.jenis] || "🐾"}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-[#212153]">{h.nama}</h3>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {h.jenis && <span className="bg-orange-50 text-[#FF7A00] text-xs font-bold px-2 py-0.5 rounded-full border border-orange-100">{h.jenis}</span>}
                  {h.usia  && <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{h.usia}</span>}
                </div>
                {h.catatan && <p className="text-xs text-slate-400 mt-1.5">{h.catatan}</p>}
              </div>
              <button onClick={() => handleDelete(h.id)}
                className="text-slate-300 hover:text-rose-400 transition-colors text-sm">✕</button>
            </div>
          ))}
        </div>
      )}

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
