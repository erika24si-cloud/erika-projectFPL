import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[#212153] mb-2">Create Account 🐶</h2>
        <p className="text-gray-500 text-sm">Join us to take care of your pets!</p>
      </div>

      <form className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#212153] mb-1.5">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

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
            placeholder="Create a password" 
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition"
          />
        </div>

        <button 
          type="button" 
          className="w-full bg-[#FF7A00] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition mt-4"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-8 text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-[#3BB7A1] font-bold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}