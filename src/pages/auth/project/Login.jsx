import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  // State untuk menyimpan inputan user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi yang dijalankan saat tombol Login ditekan
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah halaman refresh
    
    // Ambil data user yang sudah register dari Local Storage
    const storedUser = JSON.parse(localStorage.getItem("mew_user"));

    // Cek apakah data ada dan apakah email/password cocok
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Tandai bahwa user sedang login
      localStorage.setItem("mew_isLoggedIn", "true");
      alert("Login Sukses! Selamat datang kembali 🐾");
      navigate("/"); // Arahkan ke halaman Dashboard (Home)
    } else {
      alert("Oops! Email atau Password salah.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#212153] mb-2">Welcome Back! 🐾</h2>
        <p className="text-gray-500 text-sm">Please login to your account.</p>
      </div>

      {/* Tambahkan onSubmit ke dalam form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            value={email} // Binding nilai state
            onChange={(e) => setEmail(e.target.value)} // Update state saat diketik
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            required
            value={password} // Binding nilai state
            onChange={(e) => setPassword(e.target.value)} // Update state saat diketik
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-[#FF7A00] hover:underline font-medium">
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit" // Ubah type="button" menjadi "submit"
          className="w-full bg-[#FF7A00] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition mt-2"
        >
          Login
        </button>
      </form>

      <p className="mt-8 text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#FF7A00] font-bold hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}