import { useState } from "react";
import { Link } from "react-router-dom";

/* ── Data ── */
const STATS    = [{ v:"2500+",l:"Happy Pets"},{v:"1850+",l:"Members"},{v:"1300+",l:"Treatments"}];
const SERVICES = [
  { icon:"🩺", title:"Veterinary Care",    desc:"Pemeriksaan medis, vaksinasi, dan pengobatan oleh dokter berpengalaman." },
  { icon:"✂️", title:"Premium Grooming",   desc:"Mandi, potong kuku, bersihkan telinga, dan perapian bulu profesional." },
  { icon:"🏨", title:"Pet Hotel & Daycare",desc:"Penitipan harian atau menginap dengan fasilitas AC dan ruang bermain." },
  { icon:"💉", title:"Vaccination",        desc:"Vaksin lengkap dan terjadwal untuk menjaga kesehatan hewan Anda." },
];
const FACILITIES = [
  { icon:"✂️", title:"Premium Grooming",  desc:"Peralatan modern dan aman untuk semua jenis hewan." },
  { icon:"🐕", title:"Training Facility", desc:"Trainer bersertifikat untuk melatih hewan peliharaan Anda." },
  { icon:"❤️", title:"Health Check",      desc:"Pemeriksaan rutin dengan peralatan diagnostik lengkap." },
  { icon:"🌿", title:"Natural Care",      desc:"Perawatan berbahan alami, aman untuk semua hewan." },
  { icon:"💊", title:"Vaccination",       desc:"Jadwal vaksinasi sesuai usia dan jenis hewan." },
  { icon:"🐾", title:"Family Training",   desc:"Program pelatihan khusus untuk hewan keluarga." },
];
const GROOMERS = [
  { name:"Adin Smith",   role:"Head Groomer",    color:"from-orange-400 to-orange-600", init:"AS" },
  { name:"Morgan Jones", role:"Pet Trainer",     color:"from-amber-400  to-amber-600",  init:"MJ" },
  { name:"Jane Harper",  role:"Veterinarian",    color:"from-teal-400   to-teal-600",   init:"JH" },
  { name:"Lauren Obi",   role:"Care Specialist", color:"from-purple-400 to-purple-600", init:"LO" },
];
const BLOGS = [
  { tag:"Health",   title:"Cara Merawat Kucing Agar Tetap Sehat",        desc:"Tips menjaga kesehatan kucing kesayangan Anda setiap hari.", img:"/images/blog-dog.png" },
  { tag:"Grooming", title:"Why You Should Groom Your Pet Regularly",     desc:"Grooming rutin penting untuk kesehatan kulit dan bulu hewan.", img:"/images/hero-cat.png" },
];
const JOIN_PERKS = [
  { icon:"📅", title:"Jadwal Mudah",      desc:"Buat dan pantau jadwal perawatan hewan kapan saja." },
  { icon:"🐾", title:"Rekam Kesehatan",   desc:"Riwayat kesehatan hewan tersimpan aman dan mudah diakses." },
  { icon:"🎁", title:"Promo Member",      desc:"Dapatkan diskon eksklusif dan penawaran spesial tiap bulan." },
  { icon:"💬", title:"Konsultasi Online", desc:"Tanya dokter hewan kami langsung dari aplikasi." },
];

/* ── Sub-komponen ── */
function SectionLabel({ children }) {
  return <p className="text-[#FF7A00] text-sm font-bold mb-2">{children}</p>;
}
function SectionTitle({ children, light }) {
  return <h2 className={`text-3xl font-black leading-tight ${light ? "text-white" : "text-[#212153]"}`}>{children}</h2>;
}

/* ════════════════════════════════════════════
   LANDING PAGE
════════════════════════════════════════════ */
export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <span className="text-2xl font-black text-[#212153] shrink-0">
            MEW<span className="text-[#FF7A00]">.</span>
          </span>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {[["#hero","Home"],["#services","Layanan"],["#team","Tim Kami"],["#blog","Blog"]].map(([h,l])=>(
              <a key={l} href={h} className="text-slate-600 hover:text-[#FF7A00] text-sm font-medium transition-colors">{l}</a>
            ))}
          </nav>

          {/* Desktop CTA — arahkan ke halaman daftar UMUM, bukan login admin */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/register"
              className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-orange-500/25 active:scale-95">
              Daftar Sekarang
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="menu">
            <div className="w-5 h-0.5 bg-slate-600 mb-1"/>
            <div className="w-5 h-0.5 bg-slate-600 mb-1"/>
            <div className="w-5 h-0.5 bg-slate-600"/>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-3">
            {[["#hero","Home"],["#services","Layanan"],["#team","Tim Kami"],["#blog","Blog"]].map(([h,l])=>(
              <a key={l} href={h} onClick={()=>setMobileOpen(false)}
                className="text-slate-600 hover:text-[#FF7A00] text-sm font-medium py-2 border-b border-slate-50">{l}</a>
            ))}
            <Link to="/register" onClick={()=>setMobileOpen(false)}
              className="bg-[#FF7A00] text-white text-sm font-bold px-5 py-3 rounded-xl text-center mt-2 active:scale-95">
              Daftar Sekarang
            </Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="bg-[#FEF6EE] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

          {/* Kiri */}
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              🐾 Klinik Hewan Terpercaya sejak 2018
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#212153] leading-[1.15] mb-6">
              We take care of<br />your pet and help{" "}
              <span className="text-[#FF7A00]">them to grow 🧡</span>
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
              Layanan lengkap untuk hewan peliharaan Anda — dari perawatan medis,
              grooming premium, hingga penitipan hewan dengan fasilitas terbaik di Jakarta.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#services"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all active:scale-95">
                Lihat Layanan
              </a>
              <a href="#team"
                className="bg-white border-2 border-slate-200 hover:border-[#FF7A00] text-[#212153] hover:text-[#FF7A00] font-bold px-6 py-3 rounded-xl transition-all">
                Kenali Tim Kami
              </a>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["IP","GS","RP","CU"].map((init,i)=>(
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{init}</div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-[#212153]">2.500+ Happy Clients</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {"★★★★★".split("").map((_,i)=><span key={i} className="text-[#FF7A00] text-xs">★</span>)}
                  <span className="text-xs text-slate-400 ml-1">5.0 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan — gambar hero */}
          <div className="relative flex justify-center items-center">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden shadow-2xl">
              <img src="/images/hero-dog.png" alt="Happy Pet" className="w-full h-full object-cover"
                onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span class="text-8xl flex items-center justify-center h-full">🐕</span>';}}/>
            </div>
            <div className="absolute -bottom-3 -left-2 md:-left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-orange-100">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-lg">✅</div>
              <div><p className="text-xs font-bold text-[#212153]">Dipercaya Keluarga</p><p className="text-xs text-slate-400">since 2018</p></div>
            </div>
            <div className="absolute -top-3 -right-2 md:-right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-orange-100 text-center">
              <p className="text-xl font-black text-[#FF7A00]">4.9 ★</p>
              <p className="text-xs text-slate-400">1.850+ ulasan</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-6xl mx-auto px-6 pb-14">
          <div className="bg-[#FF7A00] rounded-3xl px-6 py-7 grid grid-cols-3 text-white text-center shadow-xl shadow-orange-400/30">
            {STATS.map(s=>(
              <div key={s.l} className="border-r border-white/20 last:border-0">
                <p className="text-3xl font-black">{s.v}</p>
                <p className="text-sm text-orange-100 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK A CALL ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>📞 Hubungi Kami</SectionLabel>
            <SectionTitle>Let's book a call<br/>and stay connected</SectionTitle>
            <div className="mt-6 space-y-2 mb-6">
              {["Konsultasi gratis untuk kunjungan pertama","Dokter hewan berpengalaman & bersertifikat","Layanan darurat 24/7"].map(t=>(
                <div key={t} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-5 h-5 bg-orange-100 text-[#FF7A00] rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>{t}
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md">
              Kami siap membantu hewan peliharaan Anda mendapatkan perawatan terbaik.
              Hubungi kami sekarang dan konsultasi gratis dengan dokter kami.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+6281234567890"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm">
                📞 Book Appointment
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm">
                💬 WhatsApp
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-orange-50 overflow-hidden flex items-center justify-center shadow-xl">
              <img src="/images/veterinarian-pet.PNG" alt="Dokter Hewan" className="w-full h-full object-cover"
                onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span class="text-7xl">👩‍⚕️</span>';}}/>
            </div>
            <div className="absolute top-4 -right-2 md:-right-4 bg-white rounded-2xl shadow-xl p-4 border border-orange-100">
              <p className="text-xs font-bold text-[#212153]">🩺 24/7 Emergency</p>
              <p className="text-xs text-slate-400 mt-0.5">Selalu siap untuk hewan Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>✨ Yang Kami Tawarkan</SectionLabel>
            <SectionTitle>Our Services</SectionTitle>
            <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
              Layanan lengkap untuk memastikan hewan peliharaan Anda selalu sehat, bahagia, dan terawat.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s,i)=>(
              <div key={i} className={`rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg cursor-default
                ${i===0?"bg-[#FF7A00] text-white shadow-lg shadow-orange-400/30":"bg-white shadow-sm"}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${i===0?"bg-white/20":"bg-orange-50"}`}>
                  {s.icon}
                </div>
                <h3 className={`font-extrabold text-base mb-2 ${i===0?"text-white":"text-[#212153]"}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${i===0?"text-orange-100":"text-slate-500"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>🏥 Fasilitas Kami</SectionLabel>
            <SectionTitle>Facilities We Provides</SectionTitle>
            <p className="text-slate-500 text-sm leading-relaxed mt-4 mb-8 max-w-md">
              Klinik kami dilengkapi fasilitas modern untuk memberikan pelayanan terbaik.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {FACILITIES.map((f,i)=>(
                <div key={i} className="flex gap-3">
                  <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-[#212153] text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-60 h-60 md:w-72 md:h-72 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center mx-auto shadow-xl">
                <img src="/images/dog-standing.png" alt="Dog" className="w-full h-full object-contain"
                  onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span class="text-8xl">🐕</span>';}}/>
              </div>
              <div className="absolute -bottom-4 right-0 md:-right-4 bg-[#FF7A00] text-white rounded-2xl px-5 py-3 shadow-xl text-center">
                <p className="font-black text-xl">1300+</p>
                <p className="text-xs text-orange-100">Treatments Done</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM / GROOMERS ── */}
      <section id="team" className="py-20 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>👨‍⚕️ Tim Profesional</SectionLabel>
            <SectionTitle>Our Groomers</SectionTitle>
            <p className="text-slate-500 mt-3 max-w-sm mx-auto text-sm">
              Tim berpengalaman kami siap memberikan perawatan terbaik untuk hewan Anda.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {GROOMERS.map((g,i)=>(
              <div key={i} className="bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${g.color} flex items-center justify-center text-white text-xl font-black mx-auto mb-4 shadow-md`}>
                  {g.init}
                </div>
                <h4 className="font-extrabold text-[#212153] text-sm">{g.name}</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium">{g.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>📰 Artikel Terbaru</SectionLabel>
            <SectionTitle>MEW Blog</SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {BLOGS.map((b,i)=>(
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="h-48 bg-orange-50 overflow-hidden flex items-center justify-center">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span class="text-6xl">🐾</span>';}}/>
                </div>
                <div className="p-6">
                  <span className="bg-orange-50 text-[#FF7A00] text-xs font-bold px-3 py-1 rounded-full border border-orange-100">{b.tag}</span>
                  <h3 className="font-extrabold text-[#212153] text-base mt-3 mb-2">{b.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{b.desc}</p>
                  <button className="text-[#FF7A00] font-bold text-sm hover:underline flex items-center gap-1">Read More <span>→</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN SECTION (umum, bukan admin) ── */}
      <section id="join" className="py-24 bg-[#FEF6EE]">
        <div className="max-w-5xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] text-xs font-bold px-4 py-2 rounded-full mb-5">
              🐾 Komunitas Mew
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#212153] mb-4">
              Bergabung Bersama<br />Komunitas Pecinta Hewan 🧡
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
              Jadilah bagian dari komunitas Mew! Daftar akun gratis dan nikmati
              berbagai keuntungan — mulai dari jadwal mudah, rekam kesehatan hewan,
              promo member, hingga konsultasi online dengan dokter kami.
            </p>
          </div>

          {/* Perks grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {JOIN_PERKS.map((p,i)=>(
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center border border-orange-50">
                <span className="text-3xl">{p.icon}</span>
                <h4 className="font-extrabold text-[#212153] text-sm mt-3 mb-1">{p.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl p-10 text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              Siap Bergabung Bersama Kami?
            </h3>
            <p className="text-indigo-200 text-sm mb-8 max-w-md mx-auto">
              Daftarkan diri Anda sekarang — gratis! Tidak perlu kartu kredit.
              Mulai perjalanan merawat hewan kesayangan bersama Mew.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 text-base flex items-center gap-2">
                🐾 Bergabung Sekarang — Gratis!
              </Link>
              <Link to="/login"
                className="text-indigo-200 hover:text-white font-semibold text-sm transition-colors flex items-center gap-1">
                Sudah punya akun? Masuk di sini →
              </Link>
            </div>
            <p className="text-indigo-400 text-xs mt-6">
              Dengan mendaftar, kamu menyetujui syarat & ketentuan Mew Pet Clinic.
            </p>
          </div>

          {/* Admin hint — tersembunyi, teks kecil di bawah */}
          <p className="text-center text-slate-400 text-xs mt-8">
            Admin klinik?{" "}
            <Link to="/login" className="text-slate-500 hover:text-[#FF7A00] font-semibold underline transition-colors">
              Akses dashboard admin di sini
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#212153] text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <span className="text-2xl font-black">MEW<span className="text-[#FF7A00]">.</span></span>
            <p className="text-indigo-300 text-sm mt-4 leading-relaxed">
              Klinik hewan terpercaya dengan layanan profesional untuk hewan kesayangan Anda sejak 2018.
            </p>
            <div className="flex gap-3 mt-5">
              {["📘","📸","🐦","▶️"].map((icon,i)=>(
                <button key={i}
                  className="w-9 h-9 bg-white/10 hover:bg-[#FF7A00] rounded-lg flex items-center justify-center text-sm transition-all hover:scale-110">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {[
            { title:"Useful Links", links:["Home","Layanan","Tim Kami","Blog","Bergabung"] },
            { title:"Services",     links:["Veterinary Care","Pet Grooming","Pet Hotel","Vaccination"] },
            { title:"Contact Info", links:["📍 Jl. Mew No.1, Jakarta","📞 0812-3456-7890","✉️ hello@mew.id","🕗 Sen–Sab 08:00–20:00"] },
          ].map(col=>(
            <div key={col.title}>
              <h4 className="font-extrabold text-white mb-5 text-xs uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l=>(
                  <li key={l} className="text-indigo-300 hover:text-[#FF7A00] text-sm transition-colors cursor-pointer leading-relaxed">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-indigo-400 text-xs">© 2026 Mew Pet Clinic. All rights reserved.</p>
          <p className="text-indigo-400 text-xs">Made with 🧡 for pets everywhere.</p>
        </div>
      </footer>

    </div>
  );
}
