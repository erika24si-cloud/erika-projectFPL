import { useState, useEffect } from "react";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { SearchBar } from "../components/project/SearchBar";
import { InputField } from "../components/project/InputField";
import { Toast } from "../components/project/Toast";
import { useMembershipTiers } from "../hooks/useMembershipTiers";
import { membershipAPI } from "../services/membershipAPI";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


export default function Membership() {
  const { tiers: memberships, setTiers: setMemberships } = useMembershipTiers();

  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const [editForm, setEditForm] = useState({ benefitsText: "", range: "" });
 
  const [upgradeForm, setUpgradeForm] = useState({ customerId: "", targetTier: "Gold" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const handleOpenDetail = (tier) => {
    setSelectedTier(tier);
    setOpenDetailModal(true);
  };

  const handleOpenEdit = (tier) => {
    setSelectedTier(tier);
    setEditForm({
      range: tier.range,
      benefitsText: tier.benefits.join(", ")
    });
    setOpenEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!selectedTier) return;

    const updatedBenefits = editForm.benefitsText
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b !== "");

    setMemberships((prev) =>
      prev.map((item) =>
        item.id === selectedTier.id
          ? { ...item, range: editForm.range, benefits: updatedBenefits }
          : item
      )
    );

    try {
      await membershipAPI.updateTier(selectedTier.id, {
        range:    editForm.range,
        benefits: updatedBenefits,
      });
      showToast(`Tier ${selectedTier.level} berhasil diperbarui dan tersinkron!`, "success");
    } catch {
      showToast(`Disimpan lokal — sinkronisasi Supabase gagal.`, "warning");
    }

    setOpenEditModal(false);
  };

  const handleSaveUpgrade = (e) => {
    e.preventDefault();
    if (!upgradeForm.customerId) return;

    setOpenUpgradeModal(false);
    showToast(`Pelanggan ${upgradeForm.customerId.toUpperCase()} berhasil di-upgrade ke tier ${upgradeForm.targetTier}!`, "success");
    setUpgradeForm({ customerId: "", targetTier: "Gold" });
  };

  const filtered = memberships.filter((item) =>
    item.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <PageHeader
        title="Keanggotaan & Program Loyalitas"
        subtitle="Kelola program loyalitas dan tingkatan keanggotaan pelanggan."
        action={
          <Button variant="primary" onClick={() => setOpenUpgradeModal(true)}>
            + Naik Tingkat Member
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        <StatCard title="Total Anggota"  value="800" icon="👥" color="blue" />
        <StatCard title="Anggota Aktif"  value="675" icon="⭐" color="orange" />
        <StatCard title="Reward Ditukar" value="248" icon="🎁" color="green" />
      </div>

      <div className="mb-6">
        <SearchBar
          placeholder="Cari tingkatan keanggotaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold ${
                    item.level === "Silver"
                      ? "bg-slate-100 text-slate-600"
                      : item.level === "Gold"
                      ? "bg-amber-50 text-[#FF7A00]"
                      : "bg-purple-50 text-purple-700"
                  }`}
                >
                  {item.level} Tier
                </span>
                <span className="bg-green-50 text-green-600 px-2.5 py-0.5 rounded-md text-xs font-bold">
                  {item.status}
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#212153] mb-2">
                {item.level} Anggota
              </h3>

              <p className="text-xs text-gray-400 font-medium mb-4 leading-relaxed">
                Akumulasi Transaksi:
                <br />
                <strong className="text-gray-600 font-bold">{item.range}</strong>
              </p>

              <div className="mb-5">
                <p className="font-bold text-sm text-[#212153] mb-2">Keuntungan & Manfaat:</p>
                <ul className="text-sm text-gray-500 space-y-1.5 font-medium">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-[#FF7A00] text-xs">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="mb-6 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Jumlah Pengguna</span>
                <div className="text-3xl font-black text-[#212153] mt-0.5">{item.members} <span className="text-sm font-semibold text-gray-400">Pengguna</span></div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenDetail(item)}
                  className="flex-1 bg-white border border-gray-200 hover:border-[#212153] text-[#212153] py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 bg-[#212153] hover:bg-[#212153]/90 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Edit Manfaat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openUpgradeModal} onOpenChange={openUpgradeModal ? () => setOpenUpgradeModal(false) : undefined}>
        <DialogContent className="bg-white rounded-3xl p-6 sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Naik Tingkat Anggota (Manual)</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveUpgrade} className="flex flex-col gap-4 my-2">
            <InputField
              label="ID Customer (Database Excel)"
              placeholder="Contoh: CUST0001"
              value={upgradeForm.customerId}
              onChange={(e) => setUpgradeForm({ ...upgradeForm, customerId: e.target.value })}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153]">Pilih Tingkatan Baru</label>
              <select
                className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#212153] focus:outline-none focus:border-[#FF7A00]"
                value={upgradeForm.targetTier}
                onChange={(e) => setUpgradeForm({ ...upgradeForm, targetTier: e.target.value })}
              >
                <option value="Silver">Anggota Silver</option>
                <option value="Gold">Anggota Gold</option>
                <option value="Platinum">Anggota Platinum</option>
              </select>
            </div>
          </form>
          <DialogFooter className="mt-2 flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenUpgradeModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSaveUpgrade}>Eksekusi Upgrade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDetailModal} onOpenChange={openDetailModal ? () => setOpenDetailModal(false) : undefined}>
        <DialogContent className="bg-white rounded-3xl p-6 sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Detail Manfaat Tingkatan</DialogTitle>
          </DialogHeader>
          {selectedTier && (
            <div className="my-3 flex flex-col gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 block mb-1">TINGKATAN ANGGOTA</span>
                <span className="text-lg font-extrabold text-[#FF7A00]">{selectedTier.level} Anggota</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1">DAFTAR MANFAAT:</span>
                <div className="flex flex-col gap-2 mt-1">
                  {selectedTier.benefits.map((benefit, i) => (
                    <div key={i} className="text-sm font-bold text-[#212153] bg-white border border-gray-100 px-3 py-2 rounded-xl flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF7A00]" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="w-full" onClick={() => setOpenDetailModal(false)}>Tutup Informasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditModal} onOpenChange={openEditModal ? () => setOpenEditModal(false) : undefined}>
        <DialogContent className="bg-white rounded-3xl p-6 sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">Modifikasi Aturan Tier {selectedTier?.level}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="flex flex-col gap-4 my-2">
            <InputField
              label="Rentang Akumulasi Keuangan"
              value={editForm.range}
              onChange={(e) => setEditForm({ ...editForm, range: e.target.value })}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153]">Daftar Benefit (Pisahkan dengan tanda koma)</label>
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#212153] min-h-[80px] focus:outline-none focus:border-[#FF7A00]"
                value={editForm.benefitsText}
                onChange={(e) => setEditForm({ ...editForm, benefitsText: e.target.value })}
                required
              />
              <span className="text-[10px] text-gray-400 font-medium px-1">Contoh: Diskon Obat 5%, Free Konsultasi, Antrean Prioritas</span>
            </div>
          </form>
          <DialogFooter className="mt-2 flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenEditModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  );
}