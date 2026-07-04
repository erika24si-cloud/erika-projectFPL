import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/project/Button";
import { InputField } from "../../components/project/InputField";
import { EmptyState } from "../../components/project/EmptyState";
import { Toast } from "../../components/project/Toast";

const JENIS_LIST = [
  { value: "Kucing",  icon: "🐱" },
  { value: "Anjing",  icon: "🐶" },
  { value: "Kelinci", icon: "🐰" },
  { value: "Hamster", icon: "🐹" },
  { value: "Burung",  icon: "🐦" },
  { value: "Lainnya", icon: "🐾" },
];

const ICON_MAP = Object.fromEntries(JENIS_LIST.map((j) => [j.value, j.icon]));

const AVATAR_COLORS = [
  "from-orange-400 to-orange-500",
  "from-teal-400 to-teal-500",
  "from-purple-400 to-purple-500",
  "from-pink-400 to-pink-500",
  "from-blue-400 to-blue-500",
];

const EMPTY_FORM = { nama: "", jenis: "", usia: "", berat: "", catatan: "" };

export default function MemberHewan() {
  const { user } = useAuth();

  const [hewanList, setHewanList] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [submitting,setSubmitting]= useState(false);
  const [deleteId,  setDeleteId]  = useState(null);
  const [selected,  setSelected]  = useState(null);
  const [toast,     setToast]     = useState({ visible: false, message: "", type: "success" });

  const showToast = (msg, type = "success") => setToast({ visible: true, message: msg, type });

  useEffect(() => { if (user) fetchHewan(); }, [user]);

  const fetchHewan = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("member_pets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setHewanList(data);
    } catch {
      setHewanList([]);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditId(null); setForm(EMPTY_FORM); setShowForm(true); setSelected(null);
  };

  const openEdit = (h) => {
    setEditId(h.id);
    setForm({ nama: h.nama, jenis: h.jenis ?? "", usia: h.usia ?? "", berat: h.berat ?? "", catatan: h.catatan ?? "" });
    setShowForm(true); setSelected(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.nama.trim()) return;
    setSubmitting(true);
    try {
      if (editId) {
        const { error } = await supabase.from("member_pets").update({
          nama: form.nama, jenis: form.jenis, usia: form.usia,
          berat: form.berat, catatan: form.catatan,
        }).eq("id", editId);
        if (error) throw error;
        showToast("Data hewan berhasil diperbarui!", "success");
      } else {
        const { error } = await supabase.from("member_pets").insert({
          user_id: user.id, nama: form.nama, jenis: form.jenis,
          usia: form.usia, berat: form.berat, catatan: form.catatan,
          created_at: new Date().toISOString(),
        });
        if (error) throw error;
        showToast("Hewan peliharaan berhasil ditambahkan! 🐾", "success");
      }
      setForm(EMPTY_FORM); setShowForm(false); setEditId(null);
      fetchHewan();
    } catch {
      setHewanList((prev) => {
        if (editId) return prev.map((h) => h.id === editId ? { ...h, ...form } : h);
        return [{ id: Date.now(), user_id: user?.id, ...form }, ...prev];
      });
      showToast(editId ? "Diperbarui (lokal)." : "Ditambahkan (lokal).", "success");
      setForm(EMPTY_FORM); setShowForm(false); setEditId(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await supabase.from("member_pets").delete().eq("id", id);
    } catch { }
    setHewanList((prev) => prev.filter((h) => h.id !== id));
    setDeleteId(null); setSelected(null);
    showToast("Data hewan dihapus.", "error");
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-7 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#212153] mb-1">Hewan Peliharaan</h1>
          <p className="text-slate-500 text-sm">Daftar hewan yang terdaftar di klinik Mew.</p>
        </div>
        {!showForm && (
          <Button variant="primary" onClick={openAdd}>+ Tambah Hewan</Button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-[#212153] text-base flex items-center gap-2">
              <span className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-sm">🐾</span>
              {editId ? "Edit Data Hewan" : "Tambah Hewan Baru"}
            </h3>
            <button onClick={() => { setShowForm(false); setEditId(null); }}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors">✕ Batal</button>
          </div>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Nama Hewan <span className="text-rose-500">*</span></label>
                <InputField type="text" placeholder="Contoh: Milo, Snowy..." value={form.nama}
                  onChange={set("nama")} className="w-full" disabled={submitting} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Jenis Hewan</label>
                <div className="flex flex-wrap gap-2">
                  {JENIS_LIST.map((j) => (
                    <button key={j.value} type="button"
                      onClick={() => setForm((f) => ({ ...f, jenis: j.value }))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all
                        ${form.jenis === j.value
                          ? "border-[#FF7A00] bg-orange-50 text-[#FF7A00]"
                          : "border-gray-200 bg-white text-slate-600 hover:border-gray-300"
                        }`}>
                      {j.icon} {j.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Usia</label>
                <InputField type="text" placeholder="Contoh: 2 tahun 3 bulan" value={form.usia}
                  onChange={set("usia")} className="w-full" disabled={submitting} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Berat Badan</label>
                <InputField type="text" placeholder="Contoh: 4.5 kg" value={form.berat}
                  onChange={set("berat")} className="w-full" disabled={submitting} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Catatan Khusus</label>
              <InputField type="text" placeholder="Alergi, kondisi khusus, pantangan makanan..." value={form.catatan}
                onChange={set("catatan")} className="w-full" disabled={submitting} />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <Button variant="outline" type="button" onClick={() => { setShowForm(false); setEditId(null); }}>Batal</Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </span>
                ) : editId ? "Simpan Perubahan" : "Tambah Hewan"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {[1,2,3].map((i) => <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-gray-100" />)}
        </div>
      ) : hewanList.length === 0 ? (
        <EmptyState icon="🐾" title="Belum ada hewan terdaftar"
          description="Tambahkan hewan peliharaan kamu untuk mulai memantau kesehatan mereka."
          actionText="+ Tambah Hewan" onAction={openAdd} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {hewanList.map((h, idx) => {
            const grad = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const isSelected = selected === h.id;
            return (
              <div key={h.id}
                className={`bg-white rounded-2xl border-2 transition-all cursor-pointer overflow-hidden
                  ${isSelected ? "border-[#FF7A00] shadow-lg shadow-orange-500/10" : "border-gray-100 hover:border-orange-200 shadow-sm"}`}
                onClick={() => setSelected(isSelected ? null : h.id)}>
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-2xl shrink-0 shadow-sm`}>
                      {ICON_MAP[h.jenis] ?? "🐾"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-[#212153] text-base">{h.nama}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {h.jenis && (
                          <span className="bg-orange-50 text-[#FF7A00] text-xs font-bold px-2 py-0.5 rounded-full border border-orange-100">
                            {ICON_MAP[h.jenis]} {h.jenis}
                          </span>
                        )}
                        {h.usia && (
                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            📅 {h.usia}
                          </span>
                        )}
                        {h.berat && (
                          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            ⚖️ {h.berat}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`text-slate-300 transition-transform text-sm ${isSelected ? "rotate-180" : ""}`}>▼</span>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-gray-50">
                      {h.catatan ? (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
                          <p className="text-xs font-bold text-amber-700 mb-1">📌 Catatan Khusus</p>
                          <p className="text-sm text-amber-800">{h.catatan}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 mb-4 italic">Tidak ada catatan khusus.</p>
                      )}
                      <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); openEdit(h); }}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-gray-50 hover:bg-gray-100 text-[#212153] border border-gray-200 transition-colors">
                          ✎ Edit
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setDeleteId(h.id); }}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 transition-colors">
                          🗑 Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">🗑</div>
              <h3 className="text-lg font-extrabold text-[#212153]">Hapus Data Hewan?</h3>
              <p className="text-sm text-slate-500 mt-1">Data hewan ini akan dihapus permanen dan tidak bisa dikembalikan.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-slate-700 transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-600 text-white transition-colors">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
