import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./components/project/LoadingScreen";
import ProtectedRoute from "./components/project/ProtectedRoute";

const Landing     = lazy(() => import("./pages/Landing"));
const MainLayout  = lazy(() => import("./layouts/project/MainLayout"));
const Home        = lazy(() => import("./pages/Home"));
const Appointments= lazy(() => import("./pages/Appointments"));
const ServicesPage= lazy(() => import("./pages/Services"));
const Customers   = lazy(() => import("./pages/Customers"));
const Users       = lazy(() => import("./pages/Users"));
const Membership  = lazy(() => import("./pages/Membership"));
const AuthLayout  = lazy(() => import("./layouts/project/AuthLayout"));
const Login       = lazy(() => import("./pages/auth/project/Login"));
const Register    = lazy(() => import("./pages/auth/project/Register"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* ── Halaman Pertama: Landing Page (publik) ── */}
        <Route path="/" element={<Landing />} />

        {/* ── Rute Dashboard Admin (hanya bisa diakses jika sudah login) ── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index             element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="services"     element={<ServicesPage />} />
          <Route path="customers"    element={<Customers />} />
          <Route path="users"        element={<Users />} />
          <Route path="membership"   element={<Membership />} />
        </Route>

        {/* ── Rute Autentikasi ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}
