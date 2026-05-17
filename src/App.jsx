import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/project/LoadingScreen"; 

const MainLayout = lazy(() => import("./layouts/project/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const Appointments = lazy(() => import("./pages/Appointments")); // Baru
const ServicesPage = lazy(() => import("./pages/Services"));
const Customers = lazy(() => import("./pages/Customers")); // Baru
const AuthLayout = lazy(() => import("./layouts/project/AuthLayout"));

const Login = lazy(() => import("./pages/auth/project/Login"));
const Register = lazy(() => import("./pages/auth/project/Register"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        
        {/* Grup Rute Dashboard (Menggunakan MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/customers" element={<Customers />} />
        </Route>

        {/* Grup Rute Autentikasi (Menggunakan AuthLayout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </Suspense>
  );
}