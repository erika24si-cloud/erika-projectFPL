import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../../components/project/InputField";
import { Button } from "../../../components/project/Button";
import { Toast } from "../../../components/project/Toast";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const validate = () => {
    const e = {};
    if (!fullName.trim())    e.fullName = "Nama lengkap wajib diisi.";
    if (!email.trim())       e.email    = "Email wajib diisi.";
    if (password.length < 6) e.password = "Password minimal 6 karakter.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("mew_user", JSON.stringify({ fullName, email, password }));
      localStorage.setItem("mew_isLoggedIn", "true");
      showToast("Akun berhasil dibuat! Selamat datang 🐾", "success");
      setTimeout(() => navigate("/"), 800);
    }, 600);
  };

  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#212153] mb-2">Create Account 🐶</h2>
        <p className="text-gray-500 text-sm">Bergabung dan kelola klinik hewan kamu.</p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-5" noValidate>

        {/* Nama Lengkap */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Nama Lengkap <span className="text-rose-500">*</span></label>
          <InputField type="text" placeholder="Masukkan nama lengkap kamu" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full" />
          {errors.fullName && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Email <span className="text-rose-500">*</span></label>
          <InputField type="email" placeholder="Masukkan email kamu" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          {errors.email && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.email}</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-[#212153] ml-1">Password <span className="text-rose-500">*</span></label>
          <InputField type="password" placeholder="Buat password (min. 6 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
          {errors.password && <span className="text-xs font-bold text-rose-500 ml-1">⚠ {errors.password}</span>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={loading}>
          {loading ? "Memproses..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-8 text-sm text-center text-gray-500">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-[#FF7A00] font-bold hover:underline">Login di sini</Link>
      </p>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </div>
  );
}
