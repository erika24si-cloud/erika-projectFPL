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
const ITEMS_PER_PAGE = 3;

const getInitials = (name) =>
  name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "??";

export default function Customers() {
  const [customers,   setCustomers]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState(null);
  const [search,      setSearch]      = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [toast,       setToast]       = useState({ visible: false, message: "", type: "success" });

  const nameInputRef = useRef(null);

  const showToast = (msg, type = "success") =>
    setToast({ visible: true, message: msg, type });

  // ── Fetch dari tabel customers di Supabase ──
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
    c.email?.toLowerCase().includes(search.toLowerCase())
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
      await customersAPI.createCustomer({
        nama_lengkap: form.nama_lengkap,
        email:        form.email,
        nomor_hp:     form.nomor_hp,
        nama_hewan:   form.nama_hewan,
        jenis_hewan:  form.jenis_hewan,
        created_at:   new Date().toISOString(),
      });
      showToast("Pelanggan baru berhasil ditambahkan!", "success");
      setShowModal(false); setForm(EMPTY_FORM); setCurrentPage(1);
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
    setForm(EMPTY_FORM); setErrors({});
    setShowModal(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  // ── Loading ──
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-semibold animate-pulse">Memuat data pelanggan...</p>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        <StatCard title="Total Pelanggan" value={customers.length} icon="👥" color="blue"   />
        <StatCard title="Total Hewan"     value={customers.filter((c) => c.nama_hewan).length} icon="🐾" color="orange" />
        <StatCard title="Bulan Ini"       value={customers.filter((c) => {
          const d = new Date(c.created_at); const now = new Date();
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length} icon="🗓️" color="green" />
      </div>

      {/* SearchBar */}
      <div className="mb-6">
        <SearchBar placeholder="Cari nama atau email pelanggan..."
          value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-80" />
      </div>

      {/* List */}
      {paginated.length === 0 ? (
        <EmptyState icon="👥" title="Belum ada data pelanggan"
          description="Tambahkan pelanggan pertama klinik Mew."
          actionText="+ Tambah Pelanggan" onAction={openAdd} />
      ) : (
        <div className="flex flex-col gap-4">
          {paginated.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                  {getInitials(c.nama_lengkap)}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#212153] text-lg">{c.nama_lengkap}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                    <span>✉️ {c.email}</span>
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span>📞 {c.nomor_hp}</span>
                    {c.nama_hewan && <>
                      <span className="hidden md:inline text-gray-300">•</span>
                      <span className="bg-orange-50 text-[#FF7A00] px-2 py-0.5 rounded text-xs font-bold border border-orange-100">
                        🐾 {c.nama_hewan} {c.jenis_hewan ? `(${c.jenis_hewan})` : ""}
                      </span>
                    </>}
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span>🗓️ {c.created_at ? new Date(c.created_at).toLocaleDateString("id-ID") : "-"}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setDeleteId(c.id)}
                className="text-gray-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                aria-label="Hapus pelanggan">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* Modal Tambah */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Tambah Pelanggan Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap <span className="text-rose-500">*</span></label>
              <input ref={nameInputRef} type="text" placeholder="Contoh: Budi Santoso"
                value={form.nama_lengkap} onChange={set("nama_lengkap")} disabled={submitting}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 transition-all w-full" />
              {errors.nama_lengkap && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.nama_lengkap}</span>}
            </div>
            {[
              { field: "email",    label: "Email",       type: "email", placeholder: "budi@email.com",    required: true  },
              { field: "nomor_hp", label: "Nomor HP",    type: "tel",   placeholder: "0812-3456-7890",     required: true  },
              { field: "nama_hewan",  label: "Nama Hewan",  type: "text",  placeholder: "Contoh: Milo",  required: false },
              { field: "jenis_hewan", label: "Jenis Hewan", type: "text",  placeholder: "Contoh: Kucing", required: false },
            ].map(({ field, label, type, placeholder, required }) => (
              <div key={field} className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">
                  {label} {required && <span className="text-rose-500">*</span>}
                </label>
                <InputField type={type} placeholder={placeholder} value={form[field]}
                  onChange={set(field)} disabled={submitting} className="w-full" />
                {errors[field] && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors[field]}</span>}
              </div>
            ))}
          </form>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)} disabled={submitting}>Batal</Button>
            <Button variant="primary" onClick={handleSave} disabled={submitting}>
              {submitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus Pelanggan?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Data pelanggan ini akan dihapus permanen dari database Supabase.
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
