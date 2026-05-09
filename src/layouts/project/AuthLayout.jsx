import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF6EE]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <Outlet /> 
      </div>
    </div>
  );
}