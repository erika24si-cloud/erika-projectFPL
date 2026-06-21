import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { InputField } from "../../components/project/InputField";
import { Button } from "../../components/project/Button";
import { Toast } from "../../components/project/Toast";

export default function MemberProfil() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [phone,    setPhone]    = useState(user?.user_metadata?.phone || "");
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName, phone },
      });
      if (error) throw error;
      showToast("Profil berhasil diperbarui!", "success");
    } catch {
      showToast("Gagal menyimpan. Coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name) =>
    name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "M";

  return (
    <div className="w-full max-w-xl">

      <h1 className="text-2xl font-black text-[#212153] mb-1">Profil Saya</h1>
      <p className="text-slate-500 text-sm mb-8">Kelola informasi akun dan data diri kamu.</p>

      {/* Avatar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white text-2xl font-black shrink-0">
          {getInitial(fullName || user?.email)}
        </div>
        <div>
          <p className="font-extrabold text-[#212153] text-lg">{fullName || "—"}</p>
          <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
          <span className="inline-block bg-orange-50 text-[#FF7A00] text-xs font-bold px-2.5 py-1 rounded-full border border-orange-100 mt-1.5">
            Member Klinik Mew
          </span>
        </div>
      </div>

      {/* Form edit */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
        <h2 className="font-extrabold text-[#212153] mb-5">Edit Data Diri</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap</label>
            <InputField type="text" placeholder="Nama lengkap kamu"
              value={fullName} onChange={(e) => setFullName(e.target.value)}
              className="w-full" disabled={loading} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Email</label>
            <InputField type="email" value={user?.email || ""} className="w-full" disabled />
            <p className="text-xs text-slate-400 ml-1">Email tidak bisa diubah.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Nomor HP</label>
            <InputField type="tel" placeholder="Contoh: 0812-3456-7890"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full" disabled={loading} />
          </div>
          <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
