import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "./components/project/LoadingScreen"; 

const MainLayout = lazy(() => import("./layouts/project/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/project/AuthLayout"));

const Login = lazy(() => import("./pages/auth/project/Login"));
const Register = lazy(() => import("./pages/auth/project/Register"));

const Hero = lazy(() => import("./components/project/Hero"));
const Stats = lazy(() => import("./components/project/Stats"));
const Booking = lazy(() => import("./components/project/Booking"));
const Services = lazy(() => import("./components/project/Services"));
const Facilities = lazy(() => import("./components/project/Facilities"));
const Groomers = lazy(() => import("./components/project/Groomers"));
const Blog = lazy(() => import("./components/project/Blog"));
const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Stats />
                <Booking />
                <Services />
                <Facilities />
                <Groomers />
                <Blog />
              </>
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </Suspense>
  );
}