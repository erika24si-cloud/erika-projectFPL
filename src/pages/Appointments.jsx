import { useState } from "react";
import { Badge } from "../components/project/Badge";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { SearchBar } from "../components/project/SearchBar";
import { Tabs } from "../components/project/Tabs";
import { Pagination } from "../components/project/Pagination";
import { EmptyState } from "../components/project/EmptyState";
import { Modal } from "../components/project/Modal";
import { ConfirmDialog } from "../components/project/ConfirmDialog";
import { Toast } from "../components/project/Toast";
import { SelectBox } from "../components/project/SelectBox";
import { InputField } from "../components/project/InputField";

const allAppointments = [
  { id: 1, owner: "Budi Santoso",  pet: "Milo (Kucing)",   service: "Veterinary Care",     date: "17 Mei 2026", time: "10:00 WIB", status: "Menunggu"     },
  { id: 2, owner: "Siti Aminah",   pet: "Max (Anjing)",    service: "Premium Grooming",    date: "17 Mei 2026", time: "13:30 WIB", status: "Selesai"      },
  { id: 3, owner: "Reza Rahadian", pet: "Oreo (Kelinci)",  service: "Pet Hotel & Daycare", date: "18 Mei 2026", time: "15:00 WIB", status: "Menunggu"     },
  { id: 4, owner: "Dewi Lestari",  pet: "Coco (Anjing)",   service: "Premium Grooming",    date: "18 Mei 2026", time: "09:00 WIB", status: "Dikonfirmasi" },
  { id: 5, owner: "Andi Wijaya",   pet: "Luna (Kucing)",   service: "Veterinary Care",     date: "19 Mei 2026", time: "11:00 WIB", status: "Selesai"      },
];

const TABS = [
  { id: "semua",        label: "Semua",        icon: "📋" },
  { id: "menunggu",     label: "Menunggu",     icon: "⏳" },
  { id: "dikonfirmasi", label: "Dikonfirmasi", icon: "✅" },
  { id: "selesai",      label: "Selesai",      icon: "🏁" },
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

      {/* ── Header ── */}
      <PageHeader
        title="Jadwal Temu"
        subtitle="Pantau dan kelola jadwal reservasi pelanggan."
        action={<Button variant="primary" onClick={() => setShowModal(true)}>+ Buat Jadwal Baru</Button>}
      />

      {/* ── Tabs + SearchBar ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
        <SearchBar
          placeholder="Cari nama atau hewan..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-64"
        />
      </div>

      {/* ── Tabel ── */}
      {paginated.length === 0 ? (
        <EmptyState icon="📅" title="Tidak ada jadwal ditemukan" description="Coba ubah filter atau kata kunci pencarian." />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-extrabold text-[#212153]">Menampilkan {filtered.length} jadwal</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Info Pelanggan & Hewan", "Layanan", "Jadwal", "Status", "Aksi"].map((h, i) => (
                    <th key={h} className={`py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${i === 4 ? "text-right" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#212153] text-sm">{apt.owner}</p>
                      <p className="text-gray-500 text-xs mt-1">{apt.pet}</p>
                    </td>
                    <td className="py-4 px-6 font-medium text-sm text-gray-700">{apt.service}</td>
                    <td className="py-4 px-6">
                      {/* tanggal & waktu inline (menggantikan DateBadge) */}
                      <p className="font-bold text-[#212153] text-sm">{apt.date}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{apt.time}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge text={apt.status} status={getBadgeStatus(apt.status)} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="danger" size="sm" onClick={() => setDeleteId(apt.id)}>Hapus</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* ── Modal Tambah Jadwal ── */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Buat Jadwal Baru"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSave}>Simpan Jadwal</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* label + input inline (menggantikan FormGroup) */}
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
      </Modal>

      {/* ── Confirm Delete ── */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => showToast("Jadwal berhasil dihapus.", "error")}
        title="Hapus Jadwal?"
        description="Jadwal ini akan dihapus permanen dan tidak bisa dikembalikan."
        confirmText="Ya, Hapus"
        variant="danger"
      />

      {/* ── Toast ── */}
      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
