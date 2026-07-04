import { useState, useEffect } from "react";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { Toast } from "../components/project/Toast";
import { InputField } from "../components/project/InputField";
import { SelectBox } from "../components/project/SelectBox";
import { Textarea } from "../components/project/Textarea";
import { ToggleSwitch } from "../components/project/ToggleSwitch";
import { EmptyState } from "../components/project/EmptyState";
import { SearchBar } from "../components/project/SearchBar";
import { StatCard } from "../components/project/StatCard";
import { supabase } from "../lib/supabase";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FALLBACK_SERVICES = [
  { id: 1, name: "Perawatan Medis",    desc: "Pemeriksaan kesehatan umum, vaksinasi, dan pengobatan hewan sakit oleh dokter berpengalaman.", category: "Medis",     price: "Rp 150.000",       status: "Aktif"    },
  { id: 2, name: "Grooming Premium",   desc: "Mandi bersih, potong kuku, pembersihan telinga, dan perapian bulu untuk hewan kesayangan.",   category: "Perawatan", price: "Rp 100.000",       status: "Aktif"    },
  { id: 3, name: "Penitipan Hewan",    desc: "Penitipan harian atau menginap dengan fasilitas AC, ruang bermain, dan pengawasan penuh.",    category: "Penitipan", price: "Rp 80.000 / hari", status: "Nonaktif" },
];

const CATEGORY_OPTIONS = [
  { value: "Medis",     label: "Medis"     },
  { value: "Perawatan", label: "Perawatan" },
  { value: "Penitipan", label: "Penitipan" },
  { value: "Lainnya",   label: "Lainnya"   },
];

const CATEGORY_ICON = {
  Medis:     "🩺",
  Perawatan: "✂️",
  Penitipan: "🏨",
  Lainnya:   "📋",
};

const CATEGORY_COLOR = {
  Medis:     "bg-blue-50 text-blue-600 border-blue-100",
  Perawatan: "bg-purple-50 text-purple-600 border-purple-100",
  Penitipan: "bg-teal-50 text-teal-600 border-teal-100",
  Lainnya:   "bg-gray-100 text-gray-600 border-gray-200",
};

const TABS = [
  { id: "semua",    label: "Semua",    icon: "📋" },
  { id: "Aktif",    label: "Aktif",    icon: "🟢" },
  { id: "Nonaktif", label: "Nonaktif", icon: "⚫" },
];

const EMPTY_FORM = { name: "", desc: "", category: "", price: "", status: true };

export default function Services() {
  const [services,   setServices]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [activeTab,  setActiveTab]  = useState("semua");
  const [showModal,  setShowModal]  = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteId,   setDeleteId]   = useState(null);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [errors,     setErrors]     = useState({});
  const [toast,      setToast]      = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ visible: true, message, type });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("services").select("*").order("id");
      if (error || !data || data.length === 0) {
        setServices(FALLBACK_SERVICES);
      } else {
        setServices(data);
      }
    } catch {
      setServices(FALLBACK_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  const filtered = services.filter((s) => {
    const matchTab    = activeTab === "semua" || s.status === activeTab;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const openAdd = () => {
    setEditTarget(null); setForm(EMPTY_FORM); setErrors({}); setShowModal(true);
  };

  const openEdit = (svc) => {
    setEditTarget(svc.id);
    setForm({ name: svc.name, desc: svc.desc ?? "", category: svc.category, price: svc.price, status: svc.status === "Aktif" });
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

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name, desc: form.desc, category: form.category,
      price: form.price, status: form.status ? "Aktif" : "Nonaktif",
    };

    try {
      if (editTarget) {
        const { error } = await supabase.from("services").update(payload).eq("id", editTarget);
        if (error) throw error;
        showToast("Layanan berhasil diperbarui!", "success");
      } else {
        const { error } = await supabase.from("services").insert(payload);
        if (error) throw error;
        showToast("Layanan baru berhasil ditambahkan!", "success");
      }
      setShowModal(false);
      fetchData();
    } catch {
      setServices((prev) => {
        if (editTarget) return prev.map((s) => s.id === editTarget ? { ...s, ...payload } : s);
        return [...prev, { id: Date.now(), ...payload }];
      });
      showToast(editTarget ? "Layanan diperbarui (lokal)." : "Layanan ditambahkan (lokal).", "success");
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", deleteId);
      if (error) throw error;
      fetchData();
    } catch {
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
    }
    showToast("Layanan berhasil dihapus.", "error");
    setDeleteId(null);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const totalAktif    = services.filter((s) => s.status === "Aktif").length;
  const totalNonaktif = services.filter((s) => s.status === "Nonaktif").length;

  return (
    <div className="w-full">
      <PageHeader
        title="Kelola Layanan"
        subtitle="Kelola daftar layanan, harga, dan ketersediaan di klinik Mew."
        action={<Button variant="primary" onClick={openAdd}>+ Tambah Layanan</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-6">
        <StatCard title="Total Layanan" value={services.length} icon="📋" color="blue"   />
        <StatCard title="Aktif"         value={totalAktif}      icon="🟢" color="green"  />
        <StatCard title="Nonaktif"      value={totalNonaktif}   icon="⚫" color="orange" />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="bg-gray-100/80 p-1 rounded-2xl border border-gray-200/50 h-auto flex gap-1">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-[#212153] transition-all data-[state=active]:bg-[#FF7A00] data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgb(255,122,0,0.15)] flex items-center gap-2">
                <span>{tab.icon}</span>{tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <SearchBar placeholder="Cari nama atau kategori..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="w-full md:w-64" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon="📋" title="Tidak ada layanan ditemukan"
          description="Coba ubah filter atau tambahkan layanan baru."
          actionText="+ Tambah Layanan" onAction={openAdd} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className={`h-1.5 w-full ${item.status === "Aktif" ? "bg-gradient-to-r from-[#FF7A00] to-orange-400" : "bg-gray-200"}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {CATEGORY_ICON[item.category] ?? "📋"}
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${CATEGORY_COLOR[item.category] ?? CATEGORY_COLOR.Lainnya}`}>
                      {item.category}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${
                    item.status === "Aktif"
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                  }`}>{item.status}</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#212153] mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{item.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xl font-black text-[#FF7A00]">{item.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-[#212153] rounded-xl text-xs font-bold transition-colors border border-gray-100 hover:border-gray-200">
                      ✎ Edit
                    </button>
                    <button onClick={() => setDeleteId(item.id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-xs font-bold transition-colors border border-red-100">
                      🗑 Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">
              {editTarget ? "Edit Layanan" : "Tambah Layanan Baru"}
            </DialogTitle>
            <p className="text-sm text-gray-400 mt-1">
              {editTarget ? "Perbarui informasi layanan." : "Isi detail layanan baru klinik Mew."}
            </p>
          </DialogHeader>
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Layanan <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Perawatan Gigi" value={form.name} onChange={set("name")} className="w-full" />
              {errors.name && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.name}</span>}
            </div>
            <Textarea label="Deskripsi" placeholder="Jelaskan layanan ini secara singkat..." value={form.desc} onChange={set("desc")} rows={3} />
            <SelectBox label="Kategori" options={CATEGORY_OPTIONS} value={form.category} onChange={set("category")} error={errors.category} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Harga <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Rp 120.000" value={form.price} onChange={set("price")} className="w-full" />
              {errors.price && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.price}</span>}
            </div>
            <ToggleSwitch label="Status Layanan" checked={form.status}
              onChange={(val) => setForm((f) => ({ ...f, status: val }))}
              labelOn="Aktif" labelOff="Nonaktif" />
          </form>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSave}>
              {editTarget ? "Simpan Perubahan" : "Tambah Layanan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus Layanan?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Layanan ini akan dihapus permanen dari katalog klinik Mew.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="danger" onClick={handleDelete}>Ya, Hapus</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
