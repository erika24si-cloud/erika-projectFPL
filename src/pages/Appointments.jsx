import { useState } from "react";
import { Badge } from "../components/project/Badge";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { SearchBar } from "../components/project/SearchBar";
import { Pagination } from "../components/project/Pagination";
import { EmptyState } from "../components/project/EmptyState";
import { Toast } from "../components/project/Toast";
import { SelectBox } from "../components/project/SelectBox";
import { InputField } from "../components/project/InputField";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const allAppointments = [
  { id: 1, owner: "Budi Santoso",  pet: "Milo (Kucing)",   service: "Veterinary Care",     date: "17 Mei 2026", time: "10:00 WIB", status: "Menunggu"     },
  { id: 2, owner: "Siti Aminah",   pet: "Max (Anjing)",    service: "Premium Grooming",    date: "17 Mei 2026", time: "13:30 WIB", status: "Selesai"      },
  { id: 3, owner: "Reza Rahadian", pet: "Oreo (Kelinci)",  service: "Pet Hotel & Daycare", date: "18 Mei 2026", time: "15:00 WIB", status: "Menunggu"     },
  { id: 4, owner: "Dewi Lestari",  pet: "Coco (Anjing)",   service: "Premium Grooming",    date: "18 Mei 2026", time: "09:00 WIB", status: "Dikonfirmasi" },
  { id: 5, owner: "Andi Wijaya",   pet: "Luna (Kucing)",   service: "Veterinary Care",     date: "19 Mei 2026", time: "11:00 WIB", status: "Selesai"      },
];

const TABS = [
  { id: "semua",        label: "Semua",         icon: "📋" },
  { id: "menunggu",     label: "Menunggu",      icon: "⏳" },
  { id: "dikonfirmasi", label: "Dikonfirmasi", icon: "✅" },
  { id: "selesai",      label: "Selesai",       icon: "🏁" },
];

const SERVICE_OPTIONS = [
  { value: "Veterinary Care",     label: "Veterinary Care"     },
  { value: "Premium Grooming",    label: "Premium Grooming"    },
  { value: "Pet Hotel & Daycare", label: "Pet Hotel & Daycare" },
];

const getBadgeStatus = (status) => {
  if (status === "Selesai" || status === "Dikonfirmasi") return "success";
  return "warning";
};

const ITEMS_PER_PAGE = 3;
const EMPTY_FORM = { owner: "", pet: "", service: "", date: "", time: "" };

export default function Appointments() {
  const [search,      setSearch]      = useState("");
  const [activeTab,   setActiveTab]   = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal,   setShowModal]   = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [toast,       setToast]       = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const filtered = allAppointments.filter((apt) => {
    const matchTab    = activeTab === "semua" || apt.status.toLowerCase() === activeTab;
    const matchSearch = apt.owner.toLowerCase().includes(search.toLowerCase()) ||
                        apt.pet.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (id) => { setActiveTab(id); setCurrentPage(1); };

  const handleSave = (e) => {
    e.preventDefault();
    setShowModal(false);
    setForm(EMPTY_FORM);
    showToast("Jadwal baru berhasil ditambahkan!", "success");
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="w-full">

      <PageHeader
        title="Jadwal Temu"
        subtitle="Pantau dan kelola jadwal reservasi pelanggan."
        action={<Button variant="primary" onClick={() => setShowModal(true)}>+ Buat Jadwal Baru</Button>}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 mt-6">
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full md:w-auto"
        >
          <TabsList className="bg-gray-100/80 p-1 rounded-2xl border border-gray-200/50 h-auto flex flex-wrap md:flex-nowrap gap-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#212153] transition-all data-[state=active]:bg-[#FF7A00] data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgb(255,122,0,0.15)] flex items-center gap-2"
              >
                <span>{tab.icon}</span>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <SearchBar
          placeholder="Cari nama atau hewan..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-64"
        />
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon="📅" title="Tidak ada jadwal ditemukan" description="Coba ubah filter atau kata kunci pencarian." />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-6">
          <div className="mb-4">
            <h2 className="text-xl font-extrabold text-[#212153]">Menampilkan {filtered.length} jadwal</h2>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Info Pelanggan & Hewan</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Layanan</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Jadwal</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Status</TableHead>
                <TableHead className="font-bold text-gray-400 uppercase tracking-wider text-xs">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((apt) => (
                <TableRow key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell>
                    <p className="font-bold text-[#212153] text-sm">{apt.owner}</p>
                    <p className="text-gray-500 text-xs mt-1">{apt.pet}</p>
                  </TableCell>
                  <TableCell className="font-medium text-sm text-gray-700">{apt.service}</TableCell>
                  <TableCell>
                    <p className="font-bold text-[#212153] text-sm">{apt.date}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{apt.time}</p>
                  </TableCell>
                  <TableCell>
                    <Badge text={apt.status} status={getBadgeStatus(apt.status)} />
                  </TableCell>
                  {/* ── 🛠️ PERBAIKAN: Padding Kolom Aksi Sejajar ── */}
                  <TableCell className="text-right pr-6">
                    <Button variant="danger" size="sm" onClick={() => setDeleteId(apt.id)}>Hapus</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Buat Jadwal Baru</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Pelanggan <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Budi Santoso" value={form.owner} onChange={set("owner")} className="w-full" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Hewan <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Contoh: Milo (Kucing)" value={form.pet} onChange={set("pet")} className="w-full" required />
            </div>
            <SelectBox label="Layanan" options={SERVICE_OPTIONS} value={form.service} onChange={set("service")} required />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Tanggal <span className="text-rose-500">*</span></label>
                <InputField type="date" value={form.date} onChange={set("date")} className="w-full" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#212153] ml-1">Waktu <span className="text-rose-500">*</span></label>
                <InputField type="time" value={form.time} onChange={set("time")} className="w-full" required />
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
              <Button variant="danger" onClick={() => {
                showToast("Jadwal berhasil dihapus.", "error");
                setDeleteId(null);
              }}>
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