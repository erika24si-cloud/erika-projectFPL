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

    // Cek role — hanya role "member" yang boleh masuk lewat sini
    const role = data.user?.user_metadata?.role;
    if (role === "admin") {
      await supabase.auth.signOut();
      showToast("Akun ini adalah akun admin. Gunakan halaman login admin.", "warning");
      setLoading(false);
      return;
    }

    showToast("Login berhasil! Selamat datang 🐾", "success");
    setTimeout(() => navigate("/member"), 600);
  };

  return (
    <div className="flex flex-col">
      {/* Logo */}
      <div className="text-center mb-2">
        <Link to="/" className="text-3xl font-black text-[#212153]">
          MEW<span className="text-[#FF7A00]">.</span>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[#212153] mb-1">Masuk sebagai Member 🐾</h2>
        <p className="text-gray-500 text-sm">Akses akun member klinik Mew kamu.</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Email <span className="text-rose-500">*</span></label>
          <InputField type="email" placeholder="Email kamu" value={email}
            onChange={(e) => setEmail(e.target.value)} className="w-full" />
          {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Password <span className="text-rose-500">*</span></label>
          <PasswordInput placeholder="Password kamu" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-500">
        Belum punya akun?{" "}
        <Link to="/daftar" className="text-[#FF7A00] font-bold hover:underline">Daftar di sini</Link>
      </p>

      {/* Pemisah admin */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          Login sebagai admin klinik?{" "}
          <Link to="/login" className="text-slate-500 hover:text-[#FF7A00] font-semibold underline transition-colors">
            Halaman login admin
          </Link>
        </p>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
