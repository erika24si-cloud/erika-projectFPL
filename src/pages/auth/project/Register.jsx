import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // State untuk menyimpan inputan user
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi yang dijalankan saat tombol Sign Up ditekan
  const handleRegister = (e) => {
    e.preventDefault(); // Mencegah form melakukan refresh halaman
    
    // Kumpulkan data menjadi satu objek
    const userData = { fullName, email, password };
    
    // 1. Simpan data registrasi ke Local Storage browser
    localStorage.setItem("mew_user", JSON.stringify(userData));
    
    // 2. OTOMATIS LOGIN: Tandai bahwa user langsung dalam status login
    localStorage.setItem("mew_isLoggedIn", "true");
    
    alert("Akun berhasil dibuat! Selamat datang di Mew.Admin 🐾");
    
    // 3. Langsung arahkan ke halaman Dashboard (Home)
    navigate("/"); 
  };

  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#212153] mb-2">Create Account 🐶</h2>
        <p className="text-gray-500 text-sm">Join us to take care of your pets!</p>
      </div>

      {/* Form dengan event onSubmit */}
      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Password</label>
          <input 
            type="password" 
            placeholder="Create a password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-[#FF7A00] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition mt-4"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-8 text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-[#FF7A00] font-bold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}