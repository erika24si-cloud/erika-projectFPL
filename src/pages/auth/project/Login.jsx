import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#212153] mb-2">Welcome Back! 🐾</h2>
        <p className="text-gray-500 text-sm">Please login to your account.</p>
      </div>

      <form className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-[#FF7A00] hover:underline font-medium">
            Forgot Password?
          </a>
        </div>

        <button 
          type="button" 
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