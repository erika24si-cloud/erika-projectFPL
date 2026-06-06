import { useState, useRef } from "react";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { SearchBar } from "../components/project/SearchBar";
import { Toast } from "../components/project/Toast";
import { InputField } from "../components/project/InputField";
import { Pagination } from "../components/project/Pagination";
import { EmptyState } from "../components/project/EmptyState";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const INITIAL_CUSTOMERS_FROM_CSV = [
  { id_customer: "CUST0001", nama_lengkap: "Indah Putri",  email: "indput842@gmail.com", nomor_hp: "089371700720", pets: ["Milo (Kucing)"],                 tanggal_daftar: "2024-03-05" },
  { id_customer: "CUST0002", nama_lengkap: "Gina Saputra", email: "ginsap127@gmail.com", nomor_hp: "087757859142", pets: ["Milo (Hamster)"],                tanggal_daftar: "2025-06-13" },
  { id_customer: "CUST0796", nama_lengkap: "Rina Pratama", email: "rinpra663@gmail.com", nomor_hp: "085581109844", pets: ["Snowy (Anjing)"],               tanggal_daftar: "2026-02-11" },
  { id_customer: "CUST0797", nama_lengkap: "Citra Utami",  email: "cituta266@gmail.com", nomor_hp: "085969157697", pets: ["Luna (Hamster)"],                tanggal_daftar: "2026-04-01" },
  { id_customer: "CUST0003", nama_lengkap: "Aditya Yoga",  email: "adit.yoga@email.com", nomor_hp: "081234567891", pets: ["Chiko (Anjing)", "Boni (Kelinci)"], tanggal_daftar: "2026-05-10" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", pets: "" };
const ITEMS_PER_PAGE = 3;

const getInitials = (name) =>
  name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "??";

export default function Customers() {
  const [customers,   setCustomers]   = useState(INITIAL_CUSTOMERS_FROM_CSV);
  const [search,      setSearch]      = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [toast,       setToast]       = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const nameInputRef = useRef(null);

  const filtered = customers.filter((c) =>
    c.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Nama pelanggan wajib diisi.";
    if (!form.email.trim()) e.email = "Email wajib diisi.";
    if (!form.phone.trim()) e.phone = "Nomor telepon wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Menghasilkan format YYYY-MM-DD

    const newCustomer = {
      id_customer: `CUST${String(customers.length + 1).padStart(4, '0')}`,
      nama_lengkap: form.name,
      email: form.email,
      nomor_hp: form.phone,
      pets: form.pets ? form.pets.split(",").map((p) => p.trim()).filter(Boolean) : [],
      tanggal_daftar: formattedDate,
    };

    setCustomers([newCustomer, ...customers]);
    setShowModal(false);
    setForm(EMPTY_FORM);
    setCurrentPage(1);
    showToast("Pelanggan baru berhasil ditambahkan!", "success");
  };

  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id_customer !== deleteId));
    showToast("Data pelanggan berhasil dihapus.", "error");
    setDeleteId(null);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const totalPets = customers.reduce((acc, c) => acc + c.pets.length, 0);

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <PageHeader
        title="Data Pelanggan"
        subtitle="Kelola informasi pelanggan dan hewan peliharaan mereka."
        action={<Button variant="primary" onClick={openAdd}>+ Tambah Pelanggan</Button>}
      />

      {/* ── 5. UPDATE TAHUN REAL-TIME (2026) PADA KARTU STATISTIK ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        <StatCard title="Total Pelanggan"     value={customers.length} icon="👥" color="blue"   />
        <StatCard title="Total Hewan"         value={totalPets}         icon="🐾" color="orange" />
        <StatCard title="Bergabung Tahun Ini" value={customers.filter((c) => c.tanggal_daftar.startsWith("2026")).length} icon="🗓️" color="green" />
      </div>

      {/* ── SearchBar ── */}
      <div className="mb-6">
        <SearchBar
          placeholder="Cari nama atau email pelanggan..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-80"
        />
      </div>

      {/* ── Customer List Card Row ── */}
      {paginated.length === 0 ? (
        <EmptyState icon="👥" title="Pelanggan tidak ditemukan" description="Coba ubah kata kunci atau tambahkan pelanggan baru." actionText="+ Tambah Pelanggan" onAction={openAdd} />
      ) : (
        <div className="flex flex-col gap-4">
          {paginated.map((c) => (
            <div key={c.id_customer} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Profil Wrapper */}
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
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span>🗓️ Daftar: {c.tanggal_daftar}</span>
                  </div>
                </div>
              </div>

              {/* Tag Hewan & Tombol Delete */}
              <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                <div className="flex flex-wrap gap-2">
                  {c.pets.map((pet, idx) => (
                    <span key={idx} className="bg-orange-50 text-[#FF7A00] px-3 py-1 rounded-lg text-xs font-bold border border-orange-100">
                      🐾 {pet}
                    </span>
                  ))}
                </div>
                {/* Menggunakan id_customer untuk trigger hapus */}
                <button onClick={() => setDeleteId(c.id_customer)} className="text-gray-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors shrink-0" aria-label="Hapus pelanggan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* ── 6. REFACTOR: FORM INPUT MENGGUNAKAN DIALOG SHADCN UI ── */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Tambah Pelanggan Baru</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            {/* Field Nama Lengkap — menggunakan nameInputRef untuk auto-focus */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={form.name}
                onChange={set("name")}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 hover:border-slate-300 transition-all duration-200 w-full"
                required
              />
              {errors.name && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.name}</span>}
            </div>

            {/* Field lainnya */}
            {[
              { field: "email", label: "Email",             type: "email", placeholder: "Contoh: budi@email.com",                required: true  },
              { field: "phone", label: "Nomor Telepon",      type: "tel",   placeholder: "Contoh: 0812-3456-7890",                required: true  },
              { field: "pets",  label: "Hewan Peliharaan",  type: "text",  placeholder: "Pisahkan koma: Milo (Kucing), Snowy (Anjing)", required: false },
            ].map(({ field, label, type, placeholder, required }) => (
              <div key={field} className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">
                  {label} {required && <span className="text-rose-500">*</span>}
                </label>
                <InputField type={type} placeholder={placeholder} value={form[field]} onChange={set(field)} className="w-full" />
                {errors[field] && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors[field]}</span>}
              </div>
            ))}
          </form>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── 7. REFACTOR: CONFIRM DELETE MENGGUNAKAN ALERT DIALOG SHADCN UI ── */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus Pelanggan?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Data pelanggan ini akan dihapus permanen beserta seluruh riwayat kepemilikan hewan dari sistem dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="danger" onClick={handleDelete}>
                Ya, Hapus
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}