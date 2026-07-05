import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/project/Sidebar";
import Navbar from "../../components/project/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-[#FEF6EE] overflow-hidden font-sans">
      
      <Sidebar />

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="bg-white rounded-3xl shadow-sm p-8 min-h-full border border-gray-100">
             <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}