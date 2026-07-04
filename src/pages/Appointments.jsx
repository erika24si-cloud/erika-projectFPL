import { useState, useEffect } from "react";
import { Badge } from "../components/project/Badge";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { SearchBar } from "../components/project/SearchBar";
import { Pagination } from "../components/project/Pagination";
import { EmptyState } from "../components/project/EmptyState";
import { Toast } from "../components/project/Toast";
import { SelectBox } from "../components/project/SelectBox";
import { InputField } from "../components/project/InputField";
import { StatCard } from "../components/project/StatCard";
import { supabase } from "../lib/supabase";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INITIAL_DATA = [
  { id_customer: "CUST0796", nama_lengkap: "Rina Pratama",  nama_hewan: "Snowy", jenis_hewan: "Anjing",  layanan: "Perawatan Medis",  tanggal_transaksi: "2026-05-17", waktu: "10:00 WIB", status_aktif: "Menunggu"     },
  { id_customer: "CUST0797", nama_lengkap: "Citra Utami",   nama_hewan: "Luna",  jenis_hewan: "Hamster", layanan: "Grooming Premium", tanggal_transaksi: "2026-05-17", waktu: "13:30 WIB", status_aktif: "Selesai"       },
  { id_customer: "CUST0001", nama_lengkap: "Indah Putri",   nama_hewan: "Milo",  jenis_hewan: "Kucing",  layanan: "Penitipan Hewan",  tanggal_transaksi: "2026-05-18", waktu: "15:00 WIB", status_aktif: "Menunggu"     },
  { id_customer: "CUST0002", nama_lengkap: "Gina Saputra",  nama_hewan: "Milo",  jenis_hewan: "Hamster", layanan: "Grooming Premium", tanggal_transaksi: "2026-05-18", waktu: "09:00 WIB", status_aktif: "Dikonfirmasi" },
  { id_customer: "CUST0003", nama_lengkap: "Aditya Yoga",   nama_hewan: "Chiko", jenis_hewan: "Anjing",  layanan: "Perawatan Medis",  tanggal_transaksi: "2026-05-19", waktu: "11:00 WIB", status_aktif: "Selesai"       },
];

const TABS = [
  { id: "semua",        label: "Semua",        icon: "📋" },
  { id: "menunggu",     label: "Menunggu",     icon: "⏳" },
  { id: "dikonfirmasi", label: "Dikonfirmasi", icon: "✅" },
  { id: "selesai",      label: "Selesai",      icon: "🏁" },
];

const SERVICE_OPTIONS = [
  { value: "Perawatan Medis",  label: "Perawatan Medis"  },
  { value: "Grooming Premium", label: "Grooming Premium" },
  { value: "Penitipan Hewan",  label: "Penitipan Hewan"  },
];

const STATUS_OPTIONS = [
  { value: "Menunggu",     label: "⏳ Menunggu"     },
  { value: "Dikonfirmasi", label: "✅ Dikonfirmasi" },
  { value: "Selesai",      label: "🏁 Selesai"      },
];

const JENIS_OPTIONS = [
  { value: "Kucing",  label: "🐱 Kucing"  },
  { value: "Anjing",  label: "🐶 Anjing"  },
  { value: "Hamster", label: "🐹 Hamster" },
  { value: "Kelinci", label: "🐰 Kelinci" },
  { value: "Lainnya", label: "🐾 Lainnya" },
];

const BADGE_MAP = {
  Selesai:      "success",
  Dikonfirmasi: "success",
  Menunggu:     "warning",
};

const LAYANAN_ICON = {
  "Perawatan Medis":  "🩺",
  "Grooming Premium": "✂️",
  "Penitipan Hewan":  "🏨",
};

const ITEMS_PER_PAGE = 5;
const EMPTY_FORM = { owner: "", pet: "", jenis: "Kucing", service: "", date: "", time: "" };

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [activeTab,    setActiveTab]    = useState("semua");
  const [currentPage,  setCurrentPage]  = useState(1);
  const [showModal,    setShowModal]    = useState(false);
  const [deleteId,     setDeleteId]     = useState(null);
  const [editStatus,   setEditStatus]   = useState(null);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [errors,       setErrors]       = useState({});
  const [toast,        setToast]        = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ visible: true, message, type });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("tanggal_transaksi", { ascending: false });
      if (error || !data || data.length === 0) {
        setAppointments(INITIAL_DATA);
      } else {
        setAppointments(data);
      }
    } catch {
      setAppointments(INITIAL_DATA);
    } finally {
      setLoading(false);
    }
  };

  const filtered = appointments.filter((a) => {
    const matchTab    = activeTab === "semua" || a.status_aktif.toLowerCase() === activeTab;
    const matchSearch = a.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
                        a.nama_hewan.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (id) => { setActiveTab(id); setCurrentPage(1); };

  const validate = () => {
    const e = {};
    if (!form.owner.trim()) e.owner = "Nama pelanggan wajib diisi.";
    if (!form.pet.trim())   e.pet   = "Nama hewan wajib diisi.";
    if (!form.service)      e.service = "Pilih layanan terlebih dahulu.";
    if (!form.date)         e.date  = "Tanggal wajib diisi.";
    if (!form.time)         e.time  = "Waktu wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newRow = {
      id_customer: `CUST${Date.now()}`,
      nama_lengkap: form.owner,
      nama_hewan: form.pet,
      jenis_hewan: form.jenis,
      layanan: form.service,
      tanggal_transaksi: form.date,
      waktu: `${form.time} WIB`,
      status_aktif: "Menunggu",
    };
    try {
      const { error } = await supabase.from("appointments").insert(newRow);
      if (error) throw error;
      fetchData();
    } catch {
      setAppointments((prev) => [newRow, ...prev]);
    }
    setShowModal(false);
    setForm(EMPTY_FORM);
    setErrors({});
    showToast("Jadwal baru berhasil ditambahkan!", "success");
  };

  const handleStatusChange = async (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => a.id_customer === id ? { ...a, status_aktif: newStatus } : a)
    );
    try {
      await supabase.from("appointments").update({ status_aktif: newStatus }).eq("id_customer", id);
    } catch { }
    showToast(`Status diperbarui ke "${newStatus}".`, "success");
    setEditStatus(null);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const counts = {
    semua:        appointments.length,
    menunggu:     appointments.filter((a) => a.status_aktif === "Menunggu").length,
    dikonfirmasi: appointments.filter((a) => a.status_aktif === "Dikonfirmasi").length,
    selesai:      appointments.filter((a) => a.status_aktif === "Selesai").length,
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Jadwal Temu"
        subtitle="Pantau dan kelola jadwal reservasi pelanggan klinik Mew."
        action={<Button variant="primary" onClick={() => { setForm(EMPTY_FORM); setErrors({}); setShowModal(true); }}>+ Buat Jadwal Baru</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 mt-6">
        <StatCard title="Total Jadwal"   value={counts.semua}        icon="📋" color="blue"   />
        <StatCard title="Menunggu"       value={counts.menunggu}     icon="⏳" color="orange" />
        <StatCard title="Dikonfirmasi"   value={counts.dikonfirmasi} icon="✅" color="green"  />
        <StatCard title="Selesai"        value={counts.selesai}      icon="🏁" color="purple" />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto">
          <TabsList className="bg-gray-100/80 p-1 rounded-2xl border border-gray-200/50 h-auto flex flex-wrap md:flex-nowrap gap-1">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#212153] transition-all data-[state=active]:bg-[#FF7A00] data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgb(255,122,0,0.15)] flex items-center gap-2">
                <span>{tab.icon}</span>{tab.label}
                <span className="bg-white/25 text-xs px-1.5 py-0.5 rounded-full font-black leading-none">
                  {counts[tab.id]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <SearchBar placeholder="Cari nama pelanggan atau hewan..." value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-72" />
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-semibold animate-pulse">Memuat jadwal...</p>
        </div>
      ) : paginated.length === 0 ? (
        <EmptyState icon="📅" title="Tidak ada jadwal ditemukan"
          description="Coba ubah filter atau tambah jadwal baru."
          actionText="+ Buat Jadwal Baru" onAction={() => setShowModal(true)} />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 pt-5 pb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-400">
              Menampilkan <span className="text-[#212153]">{filtered.length}</span> jadwal
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60">
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs pl-6">Pelanggan & Hewan</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Layanan</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Jadwal</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Status</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((apt) => (
                <TableRow key={apt.id_customer} className="hover:bg-orange-50/30 transition-colors group">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 text-white flex items-center justify-center text-sm font-black shrink-0">
                        {apt.nama_lengkap?.charAt(0) ?? "?"}
                      </div>
                      <div>
                        <p className="font-bold text-[#212153] text-sm">{apt.nama_lengkap}</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {apt.nama_hewan} · <span className="text-gray-400">{apt.jenis_hewan}</span>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{LAYANAN_ICON[apt.layanan] ?? "📋"}</span>
                      <span className="font-medium text-sm text-gray-700">{apt.layanan}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-[#212153] text-sm">{apt.tanggal_transaksi}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{apt.waktu}</p>
                  </TableCell>
                  <TableCell>
                    {editStatus === apt.id_customer ? (
                      <select autoFocus
                        defaultValue={apt.status_aktif}
                        onChange={(e) => handleStatusChange(apt.id_customer, e.target.value)}
                        onBlur={() => setEditStatus(null)}
                        className="text-xs font-bold border border-[#FF7A00] rounded-lg px-2 py-1 outline-none bg-white text-[#212153] cursor-pointer">
                        {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : (
                      <button onClick={() => setEditStatus(apt.id_customer)}
                        className="flex items-center gap-1 group/badge" title="Klik untuk ubah status">
                        <Badge text={apt.status_aktif} status={BADGE_MAP[apt.status_aktif] ?? "warning"} />
                        <span className="text-gray-300 group-hover/badge:text-gray-500 text-xs transition-colors">✎</span>
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="danger" size="sm" onClick={() => setDeleteId(apt.id_customer)}>Hapus</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[520px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Buat Jadwal Baru</DialogTitle>
            <p className="text-sm text-gray-400 mt-1">Isi data jadwal reservasi pelanggan.</p>
          </DialogHeader>
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Nama Pelanggan <span className="text-rose-500">*</span></label>
                <InputField type="text" placeholder="Budi Santoso" value={form.owner} onChange={set("owner")} className="w-full" />
                {errors.owner && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.owner}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Nama Hewan <span className="text-rose-500">*</span></label>
                <InputField type="text" placeholder="Milo" value={form.pet} onChange={set("pet")} className="w-full" />
                {errors.pet && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.pet}</span>}
              </div>
            </div>
            <SelectBox label="Jenis Hewan" options={JENIS_OPTIONS} value={form.jenis} onChange={set("jenis")} />
            <div className="flex flex-col gap-1.5">
              <SelectBox label="Layanan" options={SERVICE_OPTIONS} value={form.service} onChange={set("service")} />
              {errors.service && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.service}</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Tanggal <span className="text-rose-500">*</span></label>
                <InputField type="date" value={form.date} onChange={set("date")} className="w-full" />
                {errors.date && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.date}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Waktu <span className="text-rose-500">*</span></label>
                <InputField type="time" value={form.time} onChange={set("time")} className="w-full" />
                {errors.time && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.time}</span>}
              </div>
            </div>
          </form>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSave}>Simpan Jadwal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus Jadwal?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Jadwal ini akan dihapus permanen dan tidak bisa dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="danger" onClick={async () => {
                setAppointments((prev) => prev.filter((a) => a.id_customer !== deleteId));
                try {
                  await supabase.from("appointments").delete().eq("id_customer", deleteId);
                } catch { }
                showToast("Jadwal berhasil dihapus.", "error");
                setDeleteId(null);
              }}>Ya, Hapus</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
