import { useState } from "react";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { Toast } from "../components/project/Toast";
import { InputField } from "../components/project/InputField";
import { SelectBox } from "../components/project/SelectBox";
import { Textarea } from "../components/project/Textarea";
import { ToggleSwitch } from "../components/project/ToggleSwitch";
import { EmptyState } from "../components/project/EmptyState";
import { SearchBar } from "../components/project/SearchBar";

// ── 1. UPGRADE IMPORES MENGGUNAKAN SHADCN UI (KONSISTEN) ──
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

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// LAYANAN DISESUAIKAN AGAR SINKRON DENGAN APPOINTMENTS & PILIHAN DI CSV
const INITIAL_SERVICES = [
  { id: 1, name: "Veterinary Care",     desc: "Pemeriksaan medis umum, vaksinasi, dan pengobatan hewan sakit.",         category: "Medis",     price: "Rp 150.000",       status: "Aktif"    },
  { id: 2, name: "Premium Grooming",    desc: "Mandi kutu/jamur, potong kuku, pembersihan telinga, dan perapian bulu.", category: "Perawatan", price: "Rp 100.000",       status: "Aktif"    },
  { id: 3, name: "Pet Hotel & Daycare", desc: "Penitipan hewan harian atau menginap dengan fasilitas AC dan ruang bermain.", category: "Penitipan", price: "Rp 80.000 / hari", status: "Nonaktif" },
];

const CATEGORY_OPTIONS = [
  { value: "Medis",     label: "Medis"     },
  { value: "Perawatan", label: "Perawatan" },
  { value: "Penitipan", label: "Penitipan" },
  { value: "Lainnya",   label: "Lainnya"   },
];

const TABS = [
  { id: "semua",    label: "Semua"    },
  { id: "Aktif",    label: "Aktif"    },
  { id: "Nonaktif", label: "Nonaktif" },
];

const EMPTY_FORM = { name: "", desc: "", category: "", price: "", status: true };

export default function Services() {
  const [services,   setServices]   = useState(INITIAL_SERVICES);
  const [search,     setSearch]     = useState("");
  const [activeTab,  setActiveTab]  = useState("semua");
  const [showModal,  setShowModal]  = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteId,   setDeleteId]   = useState(null);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [errors,     setErrors]     = useState({});
  const [toast,      setToast]      = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const filtered = services.filter((s) => {
    const matchTab    = activeTab === "semua" || s.status === activeTab;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const openAdd = () => {
    setEditTarget(null); setForm(EMPTY_FORM); setErrors({}); setShowModal(true);
  };

  const openEdit = (svc) => {
    setEditTarget(svc.id);
    setForm({ name: svc.name, desc: svc.desc, category: svc.category, price: svc.price, status: svc.status === "Aktif" });
    setErrors({}); setShowModal(true);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name     = "Nama layanan wajib diisi.";
    if (!form.category)     e.category = "Kategori wajib dipilih.";
    if (!form.price.trim()) e.price    = "Harga wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    const payload = { name: form.name, desc: form.desc, category: form.category, price: form.price, status: form.status ? "Aktif" : "Nonaktif" };
    if (editTarget) {
      setServices((prev) => prev.map((s) => s.id === editTarget ? { ...s, ...payload } : s));
      showToast("Layanan berhasil diperbarui!", "success");
    } else {
      setServices((prev) => [...prev, { id: Date.now(), ...payload }]);
      showToast("Layanan baru berhasil ditambahkan!", "success");
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteId));
    showToast("Layanan berhasil dihapus.", "error");
    setDeleteId(null);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <PageHeader
        title="Manajemen Layanan"
        subtitle="Kelola daftar layanan, harga, dan ketersediaan di klinik Mew."
        action={<Button variant="primary" onClick={openAdd}>+ Tambah Layanan</Button>}
      />

      {/* ── 2. UPGRADE TABS MENGGUNAKAN SHADCN UI TABS ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="bg-gray-100/80 p-1 rounded-2xl border border-gray-200/50 h-auto flex gap-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-xl px-5 py-2 text-sm font-bold text-[#212153] transition-all data-[state=active]:bg-[#FF7A00] data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgb(255,122,0,0.15)]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <SearchBar placeholder="Cari layanan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-64" />
      </div>

      {/* ── Cards Grid ── */}
      {filtered.length === 0 ? (
        <EmptyState icon="📋" title="Tidak ada layanan ditemukan" description="Coba ubah filter atau tambahkan layanan baru." actionText="+ Tambah Layanan" onAction={openAdd} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#FF7A00] text-xs font-bold bg-orange-50 px-3 py-1.5 rounded-lg uppercase tracking-wider">{item.category}</span>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${item.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{item.status}</span>
              </div>
              <div className="mb-6 flex-1">
                <h3 className="text-xl font-extrabold text-[#212153] mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="text-2xl font-black text-[#212153]">{item.price}</div>
              </div>
              <div className="flex gap-3 mt-auto">
                <button onClick={() => openEdit(item)} className="flex-1 bg-white border-2 border-gray-100 hover:border-[#212153] text-[#212153] py-2.5 rounded-xl text-sm font-bold transition-colors">Edit</button>
                <button onClick={() => setDeleteId(item.id)} className="flex-1 bg-white border-2 border-red-50 hover:bg-red-50 text-red-500 hover:text-red-600 py-2.5 rounded-xl text-sm font-bold transition-colors">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 3. REFACTOR: MENGGANTI MODAL KUSTOM DENGAN SHADCN UI DIALOG ── */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">
              {editTarget ? "Edit Layanan" : "Tambah Layanan Baru"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Layanan <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Dental Care" value={form.name} onChange={set("name")} className="w-full" />
              {errors.name && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.name}</span>}
            </div>
            <Textarea label="Deskripsi" placeholder="Jelaskan layanan ini secara singkat..." value={form.desc} onChange={set("desc")} rows={3} />
            <SelectBox label="Kategori" options={CATEGORY_OPTIONS} value={form.category} onChange={set("category")} error={errors.category} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Harga <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Rp 120.000" value={form.price} onChange={set("price")} className="w-full" />
              {errors.price && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.price}</span>}
            </div>
            <ToggleSwitch label="Status Layanan" checked={form.status} onChange={(val) => setForm((f) => ({ ...f, status: val }))} labelOn="Aktif" labelOff="Nonaktif" />
          </form>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSave}>
              {editTarget ? "Simpan Perubahan" : "Tambah Layanan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── 4. REFACTOR: MENGGANTI CONFIRM DIALOG KUSTOM DENGAN SHADCN UI ALERT DIALOG ── */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus Layanan?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Layanan ini akan dihapus permanen dan tidak bisa dikembalikan dari katalog.
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

      {/* ── Toast ── */}
      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}