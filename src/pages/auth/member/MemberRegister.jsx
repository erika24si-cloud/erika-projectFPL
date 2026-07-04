import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { InputField } from "../../../components/project/InputField";
import { PasswordInput } from "../../../components/project/PasswordInput";
import { Button } from "../../../components/project/Button";
import { Toast } from "../../../components/project/Toast";

export default function MemberRegister() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: "", type: "success" });

  const showToast = (msg, type = "success") => setToast({ visible: true, message: msg, type });

  const validate = () => {
    const e = {};
    if (!fullName.trim())     e.fullName = "Nama lengkap wajib diisi.";
    if (!email.trim())        e.email    = "Email wajib diisi.";
    if (password.length < 6)  e.password = "Password minimal 6 karakter.";
    if (password !== confirm) e.confirm  = "Konfirmasi password tidak cocok.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role: "member" } },
    });

    if (error) {
      const msg = error.message === "User already registered"
        ? "Email ini sudah terdaftar. Silakan masuk."
        : error.message;
      showToast(msg, "error");
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("members").upsert({
        id: data.user.id, full_name: fullName,
        email, tier: "Silver", created_at: new Date().toISOString(),
      });
    }

    showToast("Akun berhasil dibuat! Selamat bergabung 🐾", "success");
    setTimeout(() => navigate("/member"), 1000);
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Lemah", "Sedang", "Kuat"];
  const strengthColor = ["", "bg-rose-400", "bg-amber-400", "bg-green-500"];

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-orange-100">
          🐾 Daftar Anggota Baru
        </div>
        <h2 className="text-2xl font-black text-[#212153] mb-1.5">Buat Akun Gratis</h2>
        <p className="text-gray-400 text-sm">Daftar dan langsung nikmati berbagai manfaat anggota.</p>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-orange-50 border border-orange-100 rounded-2xl px-4 py-3 flex items-center gap-3 mb-5">
        <span className="text-2xl shrink-0">🥈</span>
        <div>
          <p className="text-sm font-bold text-[#212153]">Langsung dapat Anggota Silver</p>
          <p className="text-xs text-slate-500">Daftar gratis, otomatis masuk tingkatan Silver</p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-3.5" noValidate>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <InputField type="text" placeholder="Masukkan nama lengkap kamu"
            value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full" />
          {errors.fullName && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.fullName}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">
            Email <span className="text-rose-500">*</span>
          </label>
          <InputField type="email" placeholder="Masukkan email kamu"
            value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">
            Password <span className="text-rose-500">*</span>
          </label>
          <PasswordInput placeholder="Buat password (min. 6 karakter)"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length > 0 && (
            <div className="flex items-center gap-2 ml-1 mt-0.5">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3].map((lvl) => (
                  <div key={lvl}
                    className={`h-1 flex-1 rounded-full transition-all ${strength >= lvl ? strengthColor[strength] : "bg-gray-200"}`} />
                ))}
              </div>
              <span className={`text-xs font-bold ${strength === 1 ? "text-rose-400" : strength === 2 ? "text-amber-500" : "text-green-600"}`}>
                {strengthLabel[strength]}
              </span>
            </div>
          )}
          {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">
            Konfirmasi Password <span className="text-rose-500">*</span>
          </label>
          <PasswordInput placeholder="Ulangi password kamu"
            value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          {confirm.length > 0 && password === confirm && (
            <span className="text-xs font-bold text-green-600 ml-1">✓ Password cocok</span>
          )}
          {errors.confirm && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.confirm}</span>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Mendaftarkan...
            </span>
          ) : "Daftar Sekarang — Gratis!"}
        </Button>
      </form>

      <p className="text-xs text-slate-400 text-center mt-3">
        Dengan mendaftar, kamu menyetujui syarat & ketentuan Klinik Mew.
      </p>

      <p className="mt-4 text-sm text-center text-gray-400">
        Sudah punya akun?{" "}
        <Link to="/masuk" className="text-[#FF7A00] font-bold hover:underline">Masuk di sini</Link>
      </p>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
