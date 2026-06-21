import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./components/project/LoadingScreen";
import ProtectedRoute from "./components/project/ProtectedRoute";

const Landing        = lazy(() => import("./pages/Landing"));
const Promo          = lazy(() => import("./pages/Promo"));
const MainLayout     = lazy(() => import("./layouts/project/MainLayout"));
const MemberLayout   = lazy(() => import("./layouts/project/MemberLayout"));
const Home           = lazy(() => import("./pages/Home"));
const Appointments   = lazy(() => import("./pages/Appointments"));
const ServicesPage   = lazy(() => import("./pages/Services"));
const Customers      = lazy(() => import("./pages/Customers"));
const Users          = lazy(() => import("./pages/Users"));
const Membership     = lazy(() => import("./pages/Membership"));
const MemberHome     = lazy(() => import("./pages/member/MemberHome"));
const MemberProfil   = lazy(() => import("./pages/member/MemberProfil"));
const MemberHewan    = lazy(() => import("./pages/member/MemberHewan"));
const MemberKunjungan= lazy(() => import("./pages/member/MemberKunjungan"));
const AuthLayout     = lazy(() => import("./layouts/project/AuthLayout"));
const Login          = lazy(() => import("./pages/auth/project/Login"));
const Register       = lazy(() => import("./pages/auth/project/Register"));
const MemberLogin    = lazy(() => import("./pages/auth/member/MemberLogin"));
const MemberRegister = lazy(() => import("./pages/auth/member/MemberRegister"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* ── Landing Page (publik) ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/promo" element={<Promo />} />

        {/* ── Area Member (login wajib, halaman profil umum) ── */}
        <Route path="/member" element={
          <ProtectedRoute><MemberLayout /></ProtectedRoute>
        }>
          <Route index             element={<MemberHome />} />
          <Route path="profil"     element={<MemberProfil />} />
          <Route path="hewan"      element={<MemberHewan />} />
          <Route path="kunjungan"  element={<MemberKunjungan />} />
        </Route>

        {/* ── Dashboard Admin (login wajib) ── */}
        <Route path="/dashboard" element={
          <ProtectedRoute><MainLayout /></ProtectedRoute>
        }>
          <Route index               element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="services"     element={<ServicesPage />} />
          <Route path="customers"    element={<Customers />} />
          <Route path="users"        element={<Users />} />
          <Route path="membership"   element={<Membership />} />
        </Route>

        {/* ── Autentikasi ADMIN ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ── Autentikasi MEMBER (halaman terpisah) ── */}
        <Route element={<AuthLayout />}>
          <Route path="/masuk"  element={<MemberLogin />} />
          <Route path="/daftar" element={<MemberRegister />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
