import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { InputField } from "../../components/project/InputField";
import { PasswordInput } from "../../components/project/PasswordInput";
import { Button } from "../../components/project/Button";
import { Toast } from "../../components/project/Toast";

const DAYS_ID   = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const MONTHS_ID = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

export default function MemberProfil() {
  const { user } = useAuth();

  const [fullName,     setFullName]     = useState(user?.user_metadata?.full_name || "");
  const [phone,        setPhone]        = useState(user?.user_metadata?.phone || "");
  const [loadProfile,  setLoadProfile]  = useState(false);

  const [oldPassword,  setOldPassword]  = useState("");
  const [newPassword,  setNewPassword]  = useState("");
  const [confirmPass,  setConfirmPass]  = useState("");
  const [loadPassword, setLoadPassword] = useState(false);
  const [passError,    setPassError]    = useState("");

  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ visible: true, message, type });

  const getInitials = (name) =>
    name ? name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase() : "A";

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setLoadProfile(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName, phone },
      });
      if (error) throw error;
      showToast("Profil berhasil diperbarui!", "success");
    } catch {
      showToast("Gagal menyimpan. Coba lagi.", "error");
    } finally {
      setLoadProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError("");
    if (newPassword.length < 6) { setPassError("Password baru minimal 6 karakter."); return; }
    if (newPassword !== confirmPass) { setPassError("Konfirmasi password tidak cocok."); return; }
    setLoadPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      showToast("Password berhasil diubah!", "success");
      setOldPassword(""); setNewPassword(""); setConfirmPass("");
    } catch {
      showToast("Gagal mengubah password. Coba lagi.", "error");
    } finally {
      setLoadPassword(false);
    }
  };

  const strengthVal = newPassword.length === 0 ? 0 : newPassword.length < 6 ? 1 : newPassword.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Lemah", "Sedang", "Kuat"];
  const strengthColor = ["", "bg-rose-400", "bg-amber-400", "bg-green-500"];

  const memberSince = formatDate(user?.created_at);

  return (
    <div className="w-full max-w-2xl">

      <div className="mb-7">
        <h1 className="text-2xl font-black text-[#212153] mb-1">Profil Saya</h1>
        <p className="text-slate-500 text-sm">Kelola informasi akun dan keamanan kamu.</p>
      </div>

      <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl p-6 text-white mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0">
          {getInitials(fullName || user?.email)}
        </div>
        <div className="flex-1">
          <p className="text-xl font-black">{fullName || "—"}</p>
          <p className="text-indigo-300 text-sm mt-0.5">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-[#FF7A00]/20 text-orange-200 text-xs font-bold px-3 py-1 rounded-full border border-orange-400/20">
              🥈 Anggota Silver
            </span>
            <span className="bg-white/10 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
              📅 Bergabung {memberSince}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-5">
        <h2 className="font-extrabold text-[#212153] text-base mb-5 flex items-center gap-2">
          <span className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-sm">👤</span>
          Data Diri
        </h2>
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap <span className="text-rose-500">*</span></label>
              <InputField type="text" placeholder="Nama lengkap kamu"
                value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full" disabled={loadProfile} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#212153] ml-1">Nomor HP</label>
              <InputField type="tel" placeholder="Contoh: 0812-3456-7890"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full" disabled={loadProfile} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Email</label>
            <InputField type="email" value={user?.email || ""} className="w-full" disabled />
            <p className="text-xs text-slate-400 ml-1">Email tidak dapat diubah.</p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={loadProfile}>
              {loadProfile ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-extrabold text-[#212153] text-base mb-1 flex items-center gap-2">
          <span className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-sm">🔐</span>
          Ubah Password
        </h2>
        <p className="text-xs text-slate-400 mb-5 ml-9">Pastikan password baru kamu kuat dan mudah diingat.</p>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Password Lama</label>
            <PasswordInput placeholder="Masukkan password lama"
              value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Password Baru <span className="text-rose-500">*</span></label>
            <PasswordInput placeholder="Buat password baru (min. 6 karakter)"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            {newPassword.length > 0 && (
              <div className="flex items-center gap-2 ml-1 mt-0.5">
                <div className="flex gap-1 flex-1">
                  {[1,2,3].map((lvl) => (
                    <div key={lvl}
                      className={`h-1 flex-1 rounded-full transition-all ${strengthVal >= lvl ? strengthColor[strengthVal] : "bg-gray-200"}`} />
                  ))}
                </div>
                <span className={`text-xs font-bold ${strengthVal === 1 ? "text-rose-400" : strengthVal === 2 ? "text-amber-500" : "text-green-600"}`}>
                  {strengthLabel[strengthVal]}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#212153] ml-1">Konfirmasi Password Baru <span className="text-rose-500">*</span></label>
            <PasswordInput placeholder="Ulangi password baru"
              value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            {confirmPass.length > 0 && newPassword === confirmPass && (
              <span className="text-xs font-bold text-green-600 ml-1">✓ Password cocok</span>
            )}
          </div>
          {passError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold px-4 py-2.5 rounded-xl">
              ⚠ {passError}
            </div>
          )}
          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={loadPassword}>
              {loadPassword ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : "Ubah Password"}
            </Button>
          </div>
        </form>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
