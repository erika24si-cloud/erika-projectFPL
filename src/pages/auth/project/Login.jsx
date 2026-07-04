import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { InputField } from "../../../components/project/InputField";
import { PasswordInput } from "../../../components/project/PasswordInput";
import { Button } from "../../../components/project/Button";
import { Toast } from "../../../components/project/Toast";

export default function Login() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: "", type: "error" });

  const showToast = (message, type = "error") => setToast({ visible: true, message, type });

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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const msg =
        error.message === "Invalid login credentials"
          ? "Email atau password salah. Coba lagi."
          : error.message === "Email not confirmed"
          ? "Email belum dikonfirmasi. Cek inbox kamu."
          : error.message;
      showToast(msg, "error");
      setLoading(false);
      return;
    }

    showToast("Login berhasil! Selamat datang kembali 🐾", "success");
    setTimeout(() => navigate("/dashboard"), 600);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-orange-100">
          🐾 Dashboard Admin Klinik Mew
        </div>
        <h2 className="text-3xl font-black text-[#212153] mb-2">Selamat Datang Kembali</h2>
        <p className="text-gray-400 text-sm">Masuk untuk mengelola klinik hewan Mew.</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">
            Email <span className="text-rose-500">*</span>
          </label>
          <InputField
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          {errors.email && (
            <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-[#212153]">
              Password <span className="text-rose-500">*</span>
            </label>
            <a href="#" className="text-xs text-[#FF7A00] hover:underline font-medium">
              Lupa Password?
            </a>
          </div>
          <PasswordInput
            placeholder="Masukkan password kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Memproses...
            </span>
          ) : "Masuk ke Dashboard"}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-xs text-slate-400 text-center">
          Bukan admin klinik?{" "}
          <Link to="/daftar" className="text-[#FF7A00] font-bold hover:underline">
            Daftar sebagai member
          </Link>
        </p>
      </div>

      <p className="mt-4 text-sm text-center text-gray-400">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#FF7A00] font-bold hover:underline">
          Daftar di sini
        </Link>
      </p>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  );
}
