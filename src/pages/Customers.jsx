import { useState } from "react";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { SearchBar } from "../components/project/SearchBar";
import { Modal } from "../components/project/Modal";
import { ConfirmDialog } from "../components/project/ConfirmDialog";
import { Toast } from "../components/project/Toast";
import { InputField } from "../components/project/InputField";
import { Pagination } from "../components/project/Pagination";
import { EmptyState } from "../components/project/EmptyState";

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Budi Santoso",  email: "budi.s@email.com",    phone: "0812-3456-7890", pets: ["Milo (Kucing)"],                  joinDate: "12 Jan 2024" },
  { id: 2, name: "Siti Aminah",   email: "sitiaminah@email.com", phone: "0857-1122-3344", pets: ["Max (Anjing)", "Bella (Kucing)"], joinDate: "05 Feb 2024" },
  { id: 3, name: "Reza Rahadian", email: "reza.r@email.com",     phone: "0899-8877-6655", pets: ["Oreo (Kelinci)"],                 joinDate: "20 Mar 2024" },
  { id: 4, name: "Dewi Lestari",  email: "dewi.l@email.com",     phone: "0821-5566-7788", pets: ["Coco (Anjing)"],                  joinDate: "03 Apr 2024" },
  { id: 5, name: "Andi Wijaya",   email: "andi.w@email.com",     phone: "0878-9900-1122", pets: ["Luna (Kucing)", "Kiki (Burung)"], joinDate: "15 Apr 2024" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", pets: "" };
const ITEMS_PER_PAGE = 3;

// Helper inisial nama untuk avatar inline
const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();

export default function Customers() {
  const [customers,   setCustomers]   = useState(INITIAL_CUSTOMERS);
  const [search,      setSearch]      = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [toast,       setToast]       = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const filtered   = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
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
    setCustomers((prev) => [{
      id: Date.now(), name: form.name, email: form.email, phone: form.phone,
      pets: form.pets ? form.pets.split(",").map((p) => p.trim()).filter(Boolean) : [],
      joinDate: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    }, ...prev]);
    setShowModal(false);
    setForm(EMPTY_FORM);
    setCurrentPage(1);
    showToast("Pelanggan baru berhasil ditambahkan!", "success");
  };

  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== deleteId));
    showToast("Data pelanggan berhasil dihapus.", "error");
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const openAdd = () => { setForm(EMPTY_FORM); setErrors({}); setShowModal(true); };

  const totalPets = customers.reduce((acc, c) => acc + c.pets.length, 0);

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <PageHeader
        title="Data Pelanggan"
        subtitle="Kelola informasi pelanggan dan hewan peliharaan mereka."
        action={<Button variant="primary" onClick={openAdd}>+ Tambah Pelanggan</Button>}
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Pelanggan"     value={customers.length} icon="👥" color="blue"   />
        <StatCard title="Total Hewan"         value={totalPets}         icon="🐾" color="orange" />
        <StatCard title="Bergabung Tahun Ini" value={customers.filter((c) => c.joinDate.includes("2024")).length} icon="🗓️" color="green" />
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

      {/* ── Customer List (CustomerCard inline) ── */}
      {paginated.length === 0 ? (
        <EmptyState icon="👥" title="Pelanggan tidak ditemukan" description="Coba ubah kata kunci atau tambahkan pelanggan baru." actionText="+ Tambah Pelanggan" onAction={openAdd} />
      ) : (
        <div className="flex flex-col gap-4">
          {paginated.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Profil */}
              <div className="flex items-center gap-5">
                {/* Avatar inline */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                  {getInitials(c.name)}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#212153] text-lg">{c.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                    <span>✉️ {c.email}</span>
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span>📞 {c.phone}</span>
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span>🗓️ Bergabung {c.joinDate}</span>
                  </div>
                </div>
              </div>
              {/* Tag Hewan & Aksi */}
              <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                <div className="flex flex-wrap gap-2">
                  {c.pets.map((pet, idx) => (
                    <span key={idx} className="bg-orange-50 text-[#FF7A00] px-3 py-1 rounded-lg text-xs font-bold border border-orange-100">
                      🐾 {pet}
                    </span>
                  ))}
                </div>
                <button onClick={() => setDeleteId(c.id)} className="text-gray-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors shrink-0" aria-label="Hapus pelanggan">
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

      {/* ── Modal Tambah Pelanggan ── */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Tambah Pelanggan Baru"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSave}>Simpan</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {[
            { field: "name",  label: "Nama Lengkap",    type: "text",  placeholder: "Contoh: Budi Santoso",          required: true  },
            { field: "email", label: "Email",            type: "email", placeholder: "Contoh: budi@email.com",        required: true  },
            { field: "phone", label: "Nomor Telepon",    type: "tel",   placeholder: "Contoh: 0812-3456-7890",        required: true  },
            { field: "pets",  label: "Hewan Peliharaan", type: "text",  placeholder: "Pisahkan koma: Milo (Kucing), Max (Anjing)", required: false },
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
      </Modal>

      {/* ── Confirm Delete ── */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Pelanggan?"
        description="Data pelanggan ini akan dihapus permanen beserta semua informasinya."
        confirmText="Ya, Hapus"
        variant="danger"
      />

      {/* ── Toast ── */}
      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
