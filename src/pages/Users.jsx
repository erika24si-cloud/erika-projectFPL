import { useState, useEffect, useRef } from "react";
import { profilesAPI } from "../services/supabaseAPI";
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

const EMPTY_FORM = { full_name: "", email: "", password: "", role: "admin" };
const ITEMS_PER_PAGE = 5;

const getInitials = (name) =>
  name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "??";

const ROLE_COLOR = {
  admin: "bg-orange-50 text-[#FF7A00] border-orange-100",
  user:  "bg-blue-50 text-blue-600 border-blue-100",
};

export default function Users() {
  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);
  const [search,     setSearch]     = useState("");
  const [showModal,  setShowModal]  = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteId,   setDeleteId]   = useState(null);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [errors,     setErrors]     = useState({});
  const [currentPage,setCurrentPage]= useState(1);
  const [toast,      setToast]      = useState({ visible: false, message: "", type: "success" });

  const nameInputRef = useRef(null);

  const showToast = (msg, type = "success") =>
    setToast({ visible: true, message: msg, type });

  // ── Fetch data dari Supabase saat komponen mount ──
  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const data = await profilesAPI.fetchProfiles();
      setUsers(data);
    } catch {
      setError("Gagal memuat data user. Coba refresh halaman.");
    } finally {
      setLoading(false);
    }
  };

  const filtered   = users.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Nama wajib diisi.";
    if (!form.email.trim())     e.email     = "Email wajib diisi.";
    if (!editTarget && !form.password.trim()) e.password = "Password wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Create / Update ──
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (editTarget) {
        const payload = { full_name: form.full_name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await profilesAPI.updateProfile(editTarget, payload);
        showToast("Data user berhasil diperbarui!", "success");
      } else {
        await profilesAPI.createProfile({
          full_name: form.full_name, email: form.email,
          password: form.password,  role: form.role,
          created_at: new Date().toISOString(),
        });
        showToast("User baru berhasil ditambahkan!", "success");
      }
      setShowModal(false); setForm(EMPTY_FORM); setEditTarget(null); setCurrentPage(1);
      fetchData();
    } catch {
      showToast("Gagal menyimpan data. Coba lagi.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    try {
      await profilesAPI.deleteProfile(deleteId);
      showToast("User berhasil dihapus.", "error");
      setDeleteId(null); fetchData();
    } catch {
      showToast("Gagal menghapus. Coba lagi.", "error");
    }
  };

  const openAdd = () => {
    setEditTarget(null); setForm(EMPTY_FORM); setErrors({});
    setShowModal(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const openEdit = (u) => {
    setEditTarget(u.id);
    setForm({ full_name: u.full_name, email: u.email, password: "", role: u.role || "admin" });
    setErrors({}); setShowModal(true);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // ── Loading ──
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-semibold animate-pulse">Memuat data user...</p>
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
        title="Manajemen User"
        subtitle="Kelola akun admin dan user yang bisa mengakses dashboard Mew."
        action={<Button variant="primary" onClick={openAdd}>+ Tambah User</Button>}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        <StatCard title="Total User"  value={users.length}                                    icon="👤" color="blue"   />
        <StatCard title="Role Admin"  value={users.filter((u) => u.role === "admin").length}  icon="🛡️" color="orange" />
        <StatCard title="Role User"   value={users.filter((u) => u.role === "user").length}   icon="👥" color="green"  />
      </div>

      {/* SearchBar */}
      <div className="mb-6">
        <SearchBar placeholder="Cari nama atau email..." value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-80" />
      </div>

      {/* List */}
      {paginated.length === 0 ? (
        <EmptyState icon="👤" title="Belum ada user" description="Tambahkan user pertama untuk mulai mengelola akses dashboard."
          actionText="+ Tambah User" onAction={openAdd} />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["User", "Email", "Role", "Dibuat", "Aksi"].map((h, i) => (
                  <th key={h} className={`py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider ${i === 4 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {getInitials(u.full_name)}
                      </div>
                      <span className="font-bold text-[#212153] text-sm">{u.full_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{u.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${ROLE_COLOR[u.role] || ROLE_COLOR.user}`}>
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString("id-ID") : "-"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(u)}>Edit</Button>
                      <Button variant="danger"  size="sm" onClick={() => setDeleteId(u.id)}>Hapus</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* Modal Tambah / Edit */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[480px] bg-white rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-[#212153]">
              {editTarget ? "Edit User" : "Tambah User Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="flex flex-col gap-4 my-2">
            {/* Nama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap <span className="text-rose-500">*</span></label>
              <input ref={nameInputRef} type="text" placeholder="Contoh: Budi Santoso"
                value={form.full_name} onChange={set("full_name")} disabled={submitting}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 transition-all w-full" />
              {errors.full_name && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.full_name}</span>}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Email <span className="text-rose-500">*</span></label>
              <InputField type="email" placeholder="Contoh: budi@email.com" value={form.email} onChange={set("email")} disabled={submitting} className="w-full" />
              {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
            </div>
            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">
                Password {!editTarget && <span className="text-rose-500">*</span>}
                {editTarget && <span className="text-xs text-gray-400 font-normal ml-1">(kosongkan jika tidak diubah)</span>}
              </label>
              <InputField type="password" placeholder="Buat password" value={form.password} onChange={set("password")} disabled={submitting} className="w-full" />
              {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
            </div>
            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Role</label>
              <select value={form.role} onChange={set("role")} disabled={submitting}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:bg-white focus:border-[#FF7A00] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 transition-all">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </form>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)} disabled={submitting}>Batal</Button>
            <Button variant="primary" onClick={handleSave} disabled={submitting}>
              {submitting ? "Menyimpan..." : editTarget ? "Simpan Perubahan" : "Tambah User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extrabold text-[#212153]">Hapus User?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Akun user ini akan dihapus permanen.
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
