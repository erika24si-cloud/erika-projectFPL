import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { InputField } from "../../../components/project/InputField";
import { PasswordInput } from "../../../components/project/PasswordInput";
import { Button } from "../../../components/project/Button";
import { Toast } from "../../../components/project/Toast";

export default function MemberLogin() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: "", type: "error" });

  const showToast = (msg, type = "error") => setToast({ visible: true, message: msg, type });

  const validate = () => {
    const e = {};
    if (!email.trim())    e.email    = "Email wajib diisi.";
    if (!password.trim()) e.password = "Password wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const msg = error.message === "Invalid login credentials"
        ? "Email atau password salah. Coba lagi."
        : error.message === "Email not confirmed"
        ? "Email belum dikonfirmasi. Cek inbox kamu."
        : error.message;
      showToast(msg, "error");
      setLoading(false);
      return;
    }

    const role = data.user?.user_metadata?.role;
    if (role === "admin") {
      await supabase.auth.signOut();
      showToast("Akun ini adalah akun admin. Gunakan halaman masuk admin.", "warning");
      setLoading(false);
      return;
    }

    showToast("Masuk berhasil! Selamat datang 🐾", "success");
    setTimeout(() => navigate("/member"), 600);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-orange-100">
          🐾 Area Anggota Klinik Mew
        </div>
        <h2 className="text-2xl font-black text-[#212153] mb-1.5">Selamat Datang Kembali!</h2>
        <p className="text-gray-400 text-sm">Masuk untuk mengakses portal anggota kamu.</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">
            Email <span className="text-rose-500">*</span>
          </label>
          <InputField type="email" placeholder="Masukkan email kamu"
            value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-[#212153]">
              Password <span className="text-rose-500">*</span>
            </label>
            <a href="#" className="text-xs text-[#FF7A00] hover:underline font-medium">Lupa Password?</a>
          </div>
          <PasswordInput placeholder="Masukkan password kamu"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Memproses...
            </span>
          ) : "Masuk ke Portal Anggota"}
        </Button>
      </form>

      <p className="mt-5 text-sm text-center text-gray-400">
        Belum punya akun?{" "}
        <Link to="/daftar" className="text-[#FF7A00] font-bold hover:underline">Daftar gratis di sini</Link>
      </p>

      <div className="mt-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          Kamu adalah admin klinik?{" "}
          <Link to="/login" className="text-slate-500 hover:text-[#FF7A00] font-semibold underline transition-colors">
            Masuk ke dashboard admin
          </Link>
        </p>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
