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
      options: {
        data: { full_name: fullName, role: "member" },
      },
    });

    if (error) {
      const msg = error.message === "User already registered"
        ? "Email ini sudah terdaftar. Silakan login."
        : error.message;
      showToast(msg, "error");
      setLoading(false);
      return;
    }

    // Simpan ke tabel members (terpisah dari profiles admin)
    if (data.user) {
      await supabase.from("members").upsert({
        id:         data.user.id,
        full_name:  fullName,
        email:      email,
        tier:       "Silver",
        created_at: new Date().toISOString(),
      });
    }

    showToast("Akun berhasil dibuat! Selamat bergabung 🐾", "success");
    setTimeout(() => navigate("/member"), 1000);
  };

  return (
    <div className="flex flex-col">
      {/* Logo */}
      <div className="text-center mb-2">
        <Link to="/" className="text-3xl font-black text-[#212153]">
          MEW<span className="text-[#FF7A00]">.</span>
        </Link>
      </div>

      <div className="text-center mb-7">
        <h2 className="text-2xl font-black text-[#212153] mb-1">Daftar Member Baru 🐶</h2>
        <p className="text-gray-500 text-sm">Bergabung gratis dan nikmati berbagai benefit eksklusif!</p>
      </div>

      {/* Badge Silver otomatis */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-3 mb-6">
        <span className="text-2xl">🥈</span>
        <div>
          <p className="text-sm font-bold text-[#212153]">Langsung dapat Silver Member</p>
          <p className="text-xs text-slate-500">Daftar gratis, otomatis masuk ke tier Silver</p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap <span className="text-rose-500">*</span></label>
          <InputField type="text" placeholder="Nama lengkap kamu" value={fullName}
            onChange={(e) => setFullName(e.target.value)} className="w-full" />
          {errors.fullName && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.fullName}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Email <span className="text-rose-500">*</span></label>
          <InputField type="email" placeholder="Email kamu" value={email}
            onChange={(e) => setEmail(e.target.value)} className="w-full" />
          {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Password <span className="text-rose-500">*</span></label>
          <PasswordInput placeholder="Buat password (min. 6 karakter)" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Konfirmasi Password <span className="text-rose-500">*</span></label>
          <PasswordInput placeholder="Ulangi password kamu" value={confirm}
            onChange={(e) => setConfirm(e.target.value)} />
          {errors.confirm && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.confirm}</span>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
          {loading ? "Mendaftarkan..." : "Daftar Gratis"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-500">
        Sudah punya akun?{" "}
        <Link to="/masuk" className="text-[#FF7A00] font-bold hover:underline">Masuk di sini</Link>
      </p>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
