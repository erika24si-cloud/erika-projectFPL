import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../../components/project/InputField";
import { Button } from "../../../components/project/Button";
import { Toast } from "../../../components/project/Toast";

export default function Login() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: "", type: "error" });

  const showToast = (message, type = "error") =>
    setToast({ visible: true, message, type });

  const validate = () => {
    const e = {};
    if (!email.trim())    e.email    = "Email wajib diisi.";
    if (!password.trim()) e.password = "Password wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("mew_user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("mew_isLoggedIn", "true");
        showToast("Login berhasil! Selamat datang kembali 🐾", "success");
        setTimeout(() => navigate("/"), 800);
      } else {
        showToast("Email atau password salah. Coba lagi.", "error");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#212153] mb-2">Welcome Back! 🐾</h2>
        <p className="text-gray-500 text-sm">Masuk ke akun klinik Mew kamu.</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5" noValidate>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Email <span className="text-rose-500">*</span></label>
          <InputField type="email" placeholder="Masukkan email kamu" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Password <span className="text-rose-500">*</span></label>
          <InputField type="password" placeholder="Masukkan password kamu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
          {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
        </div>

        <div className="flex justify-end -mt-2">
          <a href="#" className="text-sm text-[#FF7A00] hover:underline font-medium">Lupa Password?</a>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={loading}>
          {loading ? "Memproses..." : "Login"}
        </Button>
      </form>

      <p className="mt-8 text-sm text-center text-gray-500">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#FF7A00] font-bold hover:underline">Daftar di sini</Link>
      </p>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
