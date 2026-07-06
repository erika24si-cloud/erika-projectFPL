import { useState, useEffect, useRef } from "react";
import { customersAPI } from "../services/supabaseAPI";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { SearchBar } from "../components/project/SearchBar";
import { Toast } from "../components/project/Toast";
import { InputField } from "../components/project/InputField";
import { Pagination } from "../components/project/Pagination";
import { EmptyState } from "../components/project/EmptyState";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const EMPTY_FORM = { nama_lengkap: "", email: "", nomor_hp: "", nama_hewan: "", jenis_hewan: "" };
const ITEMS_PER_PAGE = 5;

const JENIS_HEWAN_OPTIONS = [
  { value: "Kucing",  label: "🐱 Kucing"  },
  { value: "Anjing",  label: "🐶 Anjing"  },
  { value: "Hamster", label: "🐹 Hamster" },
  { value: "Kelinci", label: "🐰 Kelinci" },
  { value: "Lainnya", label: "🐾 Lainnya" },
];

const AVATAR_GRADIENTS = [
  "from-[#FF7A00] to-orange-400",
  "from-violet-500 to-purple-600",
  "from-teal-400 to-emerald-500",
  "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",
];

const getInitials = (name) =>
  name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "??";

const getGradient = (name) =>
  AVATAR_GRADIENTS[(name?.charCodeAt(0) ?? 0) % AVATAR_GRADIENTS.length];

export default function Customers() {
  const [customers,   setCustomers]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState(null);
  const [search,      setSearch]      = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [editTarget,  setEditTarget]  = useState(null);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [toast,       setToast]       = useState({ visible: false, message: "", type: "success" });

  const nameInputRef = useRef(null);
  const showToast = (msg, type = "success") => setToast({ visible: true, message: msg, type });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const data = await customersAPI.fetchCustomers();
      setCustomers(data);
    } catch {
      setError("Gagal memuat data pelanggan. Coba refresh halaman.");
    } finally {
      setLoading(false);
    }
  };

  const filtered   = customers.filter((c) =>
    c.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.nama_hewan?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const validate = () => {
    const e = {};
    if (!form.nama_lengkap.trim()) e.nama_lengkap = "Nama lengkap wajib diisi.";
    if (!form.email.trim())        e.email        = "Email wajib diisi.";
    if (!form.nomor_hp.trim())     e.nomor_hp     = "Nomor HP wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (editTarget) {
        await customersAPI.updateCustomer(editTarget, {
          nama_lengkap: form.nama_lengkap, email: form.email,
          nomor_hp: form.nomor_hp, nama_hewan: form.nama_hewan,
          jenis_hewan: form.jenis_hewan,
        });
        showToast("Data pelanggan berhasil diperbarui!", "success");
      } else {
        await customersAPI.createCustomer({
          nama_lengkap: form.nama_lengkap, email: form.email,
          nomor_hp: form.nomor_hp, nama_hewan: form.nama_hewan,
          jenis_hewan: form.jenis_hewan, created_at: new Date().toISOString(),
        });
        showToast("Pelanggan baru berhasil ditambahkan!", "success");
      }
      setShowModal(false); setForm(EMPTY_FORM); setEditTarget(null); setCurrentPage(1);
      fetchData();
    } catch {
      showToast("Gagal menyimpan data. Coba lagi.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await customersAPI.deleteCustomer(deleteId);
      showToast("Data pelanggan berhasil dihapus.", "error");
      setDeleteId(null); fetchData();
    } catch {
      showToast("Gagal menghapus. Coba lagi.", "error");
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const openAdd = () => {
    setEditTarget(null); setForm(EMPTY_FORM); setErrors({});
    setShowModal(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const openEdit = (c) => {
    setEditTarget(c.id);
    setForm({ nama_lengkap: c.nama_lengkap, email: c.email, nomor_hp: c.nomor_hp, nama_hewan: c.nama_hewan ?? "", jenis_hewan: c.jenis_hewan ?? "" });
    setErrors({}); setShowModal(true);
  };

  const thisMonth = customers.filter((c) => {
    if (!c.created_at) return false;
    const d = new Date(c.created_at); const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-12 h-12 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-semibold animate-pulse">Memuat data pelanggan...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl text-sm font-bold">❌ {error}</div>
      <Button variant="outline" onClick={fetchData}>Coba Lagi</Button>
    </div>
  );

  return (
    <div className="w-full">
      <PageHeader
        title="Customers & Pets"
        subtitle="Kelola data pelanggan dan hewan peliharaan klinik Mew."
        action={<Button variant="primary" onClick={openAdd}>+ Tambah Pelanggan</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-6">
        <StatCard title="Total Pelanggan" value={customers.length}                              icon="👥" color="blue"   />
        <StatCard title="Punya Hewan"     value={customers.filter((c) => c.nama_hewan).length}  icon="🐾" color="orange" />
        <StatCard title="Daftar Bulan Ini" value={thisMonth}                                    icon="🗓️" color="green"  />
      </div>

      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Cari nama, email, atau hewan..."
          value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-80" />
        {search && (
          <p className="text-sm text-slate-400 ml-4 shrink-0">
            <span className="font-bold text-[#212153]">{filtered.length}</span> hasil ditemukan
          </p>
        )}
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon="👥" title="Belum ada data pelanggan"
          description="Tambahkan pelanggan pertama klinik Mew."
          actionText="+ Tambah Pelanggan" onAction={openAdd} />
      ) : (
        <div className="flex flex-col gap-3">
          {paginated.map((c) => (
            <div key={c.id}
              className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradient(c.nama_lengkap)} text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                  {getInitials(c.nama_lengkap)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-[#212153] text-base truncate">{c.nama_lengkap}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">✉️ {c.email}</span>
                    <span className="hidden md:inline">·</span>
                    <span className="flex items-center gap-1">📞 {c.nomor_hp}</span>
                    {c.nama_hewan && (
                      <>
                        <span className="hidden md:inline">·</span>
                        <span className="bg-orange-50 text-[#FF7A00] px-2 py-0.5 rounded-full text-xs font-bold border border-orange-100 flex items-center gap-1">
                          🐾 {c.nama_hewan}{c.jenis_hewan ? ` (${c.jenis_hewan})` : ""}
                        </span>
                      </>
                    )}
                    {!c.nama_hewan && (
                      <span className="text-gray-300 text-xs italic">Belum ada data hewan</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-300">
                  {c.created_at ? new Date(c.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : ""}
                </span>
                <Button variant="outline" size="sm" onClick={() => openEdit(c)}>✎ Edit</Button>
                <Button variant="danger" size="sm" onClick={() => setDeleteId(c.id)}>Hapus</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[520px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">
              {editTarget ? "Edit Data Pelanggan" : "Tambah Pelanggan Baru"}
            </DialogTitle>
            <p className="text-sm text-gray-400 mt-1">
              {editTarget ? "Perbarui informasi pelanggan." : "Isi data pelanggan baru klinik Mew."}
            </p>
          </DialogHeader>
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap <span className="text-rose-500">*</span></label>
              <input ref={nameInputRef} type="text" placeholder="Contoh: Budi Santoso"
                value={form.nama_lengkap} onChange={set("nama_lengkap")} disabled={submitting}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 transition-all w-full" />
              {errors.nama_lengkap && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.nama_lengkap}</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Email <span className="text-rose-500">*</span></label>
                <InputField type="email" placeholder="budi@email.com" value={form.email} onChange={set("email")} disabled={submitting} className="w-full" />
                {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Nomor HP <span className="text-rose-500">*</span></label>
                <InputField type="tel" placeholder="0812-3456-7890" value={form.nomor_hp} onChange={set("nomor_hp")} disabled={submitting} className="w-full" />
                {errors.nomor_hp && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.nomor_hp}</span>}
              </div>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
              <p className="text-xs font-bold text-[#FF7A00] mb-3 flex items-center gap-1.5">🐾 Data Hewan Peliharaan <span className="font-normal text-gray-400">(opsional)</span></p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#212153] ml-1">Nama Hewan</label>
                  <InputField type="text" placeholder="Contoh: Milo" value={form.nama_hewan} onChange={set("nama_hewan")} disabled={submitting} className="w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#212153] ml-1">Jenis Hewan</label>
                  <select value={form.jenis_hewan} onChange={set("jenis_hewan")} disabled={submitting}
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none text-slate-700 focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 transition-all w-full text-sm">
                    <option value="">Pilih jenis...</option>
                    {JENIS_HEWAN_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </form>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)} disabled={submitting}>Batal</Button>
            <Button variant="primary" onClick={handleSave} disabled={submitting}>
              {submitting ? "Menyimpan..." : editTarget ? "Simpan Perubahan" : "Tambah Pelanggan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus Pelanggan?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Data pelanggan ini akan dihapus permanen dari database. Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel asChild><Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button></AlertDialogCancel>
            <AlertDialogAction asChild><Button variant="danger" onClick={handleDelete}>Ya, Hapus</Button></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
