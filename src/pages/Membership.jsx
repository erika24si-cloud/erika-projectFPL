import { useState, useEffect } from "react";
import { Button } from "../components/project/Button";
import { PageHeader } from "../components/project/PageHeader";
import { StatCard } from "../components/project/StatCard";
import { SearchBar } from "../components/project/SearchBar";
import { InputField } from "../components/project/InputField";
import { Toast } from "../components/project/Toast";
import { EmptyState } from "../components/project/EmptyState";
import { useMembershipTiers } from "../hooks/useMembershipTiers";
import { membershipAPI } from "../services/membershipAPI";
import { supabase } from "../lib/supabase";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

const TIER_STYLE = {
  Silver:   { badge:"bg-slate-100 text-slate-600",   icon:"🥈", accent:"#64748b" },
  Gold:     { badge:"bg-amber-100 text-amber-700",   icon:"🥇", accent:"#F97316" },
  Platinum: { badge:"bg-purple-100 text-purple-700", icon:"💎", accent:"#9333ea" },
};

export default function Membership() {
  const { tiers, setTiers, loading: tiersLoading } = useMembershipTiers();

  const [search,       setSearch]       = useState("");
  const [toast,        setToast]        = useState({ visible: false, message: "", type: "success" });
  const [members,      setMembers]      = useState([]);
  const [membersLoad,  setMembersLoad]  = useState(true);
  const [editTarget,   setEditTarget]   = useState(null);
  const [editForm,     setEditForm]     = useState({ range: "", benefitsText: "" });
  const [editSaving,   setEditSaving]   = useState(false);

  const showToast = (msg, type = "success") => setToast({ visible: true, message: msg, type });

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    setMembersLoad(true);
    try {
      const { data: mData, error: mErr } = await supabase
        .from("members")
        .select("id, full_name, email, tier, created_at")
        .order("created_at", { ascending: false });

      if (!mErr && mData?.length) { setMembers(mData); return; }

      const { data: pData, error: pErr } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .eq("role", "member")
        .order("created_at", { ascending: false });

      if (!pErr && pData?.length) { setMembers(pData); return; }

      const { data: cData } = await supabase
        .from("customers")
        .select("id, nama_lengkap, email, created_at")
        .order("created_at", { ascending: false });

      setMembers((cData ?? []).map((c) => ({
        id: c.id, full_name: c.nama_lengkap,
        email: c.email, tier: null, created_at: c.created_at,
      })));
    } catch {
      setMembers([]);
    } finally {
      setMembersLoad(false);
    }
  };

  const totalAnggota = members.length;
  const anggotaAktif = members.filter((m) => m.tier && m.tier !== "").length || totalAnggota;

  const openEdit = (tier) => {
    setEditTarget(tier);
    setEditForm({ range: tier.range, benefitsText: tier.benefits.join(", ") });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editTarget) return;
    setEditSaving(true);

    const updatedBenefits = editForm.benefitsText
      .split(",").map((b) => b.trim()).filter(Boolean);

    setTiers((prev) =>
      prev.map((t) => t.id === editTarget.id
        ? { ...t, range: editForm.range, benefits: updatedBenefits }
        : t)
    );

    try {
      await membershipAPI.updateTier(editTarget.id, {
        range: editForm.range,
        benefits: updatedBenefits,
      });
      showToast(`Tingkatan ${editTarget.level} berhasil diperbarui dan tersinkron!`, "success");
    } catch {
      showToast("Disimpan secara lokal — gagal sinkron ke Supabase.", "warning");
    } finally {
      setEditSaving(false);
      setEditTarget(null);
    }
  };

  const filtered = tiers.filter((t) =>
    t.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <PageHeader
        title="Keanggotaan & Program Loyalitas"
        subtitle="Kelola tingkatan keanggotaan dan manfaat yang diterima anggota. Anggota naik tingkatan melalui halaman portal mereka."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-6">
        <StatCard title="Total Anggota"   value={membersLoad  ? "..." : totalAnggota} icon="👥" color="blue"   />
        <StatCard title="Anggota Aktif"   value={membersLoad  ? "..." : anggotaAktif} icon="⭐" color="orange" />
        <StatCard title="Total Tingkatan" value={tiersLoading ? "..." : tiers.length} icon="🏆" color="green"  />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBar placeholder="Cari tingkatan..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="w-full md:w-72" />
      </div>

      {tiersLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => <div key={i} className="h-72 bg-white rounded-3xl animate-pulse border border-gray-100" />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon="🏆" title="Tidak ada tingkatan ditemukan" description="Coba ubah kata kunci pencarian." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const style       = TIER_STYLE[item.level] ?? TIER_STYLE.Silver;
            const memberCount = members.filter((m) => m.tier === item.level).length;
            return (
              <div key={item.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col">
                <div className="h-1.5" style={{ background: `linear-gradient(to right, ${style.accent}, ${style.accent}88)` }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{style.icon}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${style.badge}`}>
                        {item.level} Tingkatan
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      (item.status ?? "Aktif") === "Aktif"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}>{item.status ?? "Aktif"}</span>
                  </div>

                  <h3 className="text-xl font-black text-[#212153] mb-1">{item.level} Anggota</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Akumulasi Transaksi: <strong className="text-gray-600">{item.range}</strong>
                  </p>

                  <div className="mb-5 flex-1">
                    <p className="font-bold text-xs text-[#212153] mb-2 uppercase tracking-wider">Keuntungan & Manfaat</p>
                    <ul className="space-y-1.5">
                      {item.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-[#FF7A00] text-xs font-black">✓</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-50 mb-4">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Anggota di tingkatan ini</p>
                    <p className="text-2xl font-black text-[#212153] mt-0.5">
                      {membersLoad ? "..." : memberCount}
                      <span className="text-sm font-semibold text-gray-400 ml-1">pengguna</span>
                    </p>
                  </div>

                  <button
                    onClick={() => openEdit(item)}
                    className="w-full bg-[#212153] hover:bg-[#212153]/90 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                    ✎ Edit Manfaat & Rentang
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Edit Manfaat — satu-satunya aksi admin di halaman ini */}
      <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <DialogContent className="bg-white rounded-3xl p-6 sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">
              Edit Tingkatan {editTarget?.level}
            </DialogTitle>
            <p className="text-sm text-gray-400 mt-1">
              Perubahan tersimpan ke Supabase dan langsung tampil di halaman Promo serta portal anggota.
            </p>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">
                Rentang Akumulasi Transaksi <span className="text-rose-500">*</span>
              </label>
              <InputField type="text" placeholder="Contoh: Rp 0 – Rp 999.999"
                value={editForm.range}
                onChange={(e) => setEditForm({ ...editForm, range: e.target.value })}
                className="w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">
                Daftar Manfaat <span className="text-rose-500">*</span>
              </label>
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#212153] min-h-[100px] focus:outline-none focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 transition-all resize-none"
                placeholder="Pisahkan dengan koma. Contoh: Diskon Grooming 10%, Prioritas Reservasi, Reminder Vaksin"
                value={editForm.benefitsText}
                onChange={(e) => setEditForm({ ...editForm, benefitsText: e.target.value })}
                required
              />
              <p className="text-xs text-gray-400 ml-1">Setiap manfaat dipisahkan dengan tanda koma ( , )</p>
            </div>
            {editForm.benefitsText && (
              <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                <p className="text-xs font-bold text-[#FF7A00] mb-2">Preview manfaat:</p>
                <ul className="space-y-1">
                  {editForm.benefitsText.split(",").map((b) => b.trim()).filter(Boolean).map((b, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="text-[#FF7A00]">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditTarget(null)} disabled={editSaving}>Batal</Button>
            <Button variant="primary" onClick={handleSaveEdit} disabled={editSaving}>
              {editSaving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : "Simpan & Sinkronkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
