import React from "react";
import { NavLink } from "react-router-dom"; 

export default function Navbar() {
  const activeClass = ({ isActive }) => 
    isActive 
      ? "font-bold text-[#212153] transition-colors" 
      : "font-medium text-gray-500 hover:text-[#212153] transition-colors";

  return (
    <nav className="flex justify-between items-center py-6 px-6 lg:px-20 bg-white">
      
      <NavLink to="/" className="text-3xl font-extrabold text-[#212153]">
        Mew
      </NavLink>

      <div className="hidden md:flex gap-8">
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>

        <NavLink to="/about" className={activeClass}>
          About
        </NavLink>

        <NavLink to="/services" className={activeClass}>
          Services
        </NavLink>

        <NavLink to="/practice" className={activeClass}>
          Practice
        </NavLink>
      </div>

      <div>
        <NavLink 
          to="/register" 
          className="border-2 border-[#212153] text-[#212153] px-6 py-2 rounded-full font-bold hover:bg-[#212153] hover:text-white transition-colors"
        >
          Sign up
        </NavLink>
      </div>

    </nav>
  );
}