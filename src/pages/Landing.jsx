import { useState } from "react";
import { Link } from "react-router-dom";

const STATS    = [
  { v:"500+",  l:"Hewan Dirawat"    },
  { v:"300+",  l:"Pelanggan Aktif"  },
  { v:"50+",   l:"Perawatan/Bulan"  },
];
const SERVICES = [
  { icon:"🩺", title:"Perawatan Medis",   desc:"Pemeriksaan kesehatan umum, diagnosis penyakit, dan pengobatan oleh dokter hewan berpengalaman." },
  { icon:"✂️", title:"Grooming Premium",  desc:"Mandi bersih, potong kuku, bersihkan telinga, dan perapian bulu untuk hewan kesayangan Anda." },
  { icon:"🏨", title:"Penitipan Hewan",   desc:"Titipkan hewan Anda dengan aman — fasilitas nyaman, bersih, dan dipantau sepanjang hari." },
  { icon:"💉", title:"Vaksinasi",         desc:"Program vaksin lengkap dan terjadwal sesuai jenis dan usia hewan peliharaan Anda." },
];
const FACILITIES = [
  { icon:"✂️", title:"Grooming Profesional",  desc:"Peralatan grooming modern dan aman untuk semua jenis hewan." },
  { icon:"🐕", title:"Area Latihan",           desc:"Ruang latihan luas dengan pelatih bersertifikat dan berpengalaman." },
  { icon:"❤️", title:"Pemeriksaan Rutin",      desc:"Pemeriksaan berkala dengan alat diagnostik lengkap dan modern." },
  { icon:"🌿", title:"Perawatan Alami",        desc:"Menggunakan bahan-bahan alami yang aman dan ramah lingkungan." },
  { icon:"💊", title:"Program Vaksinasi",      desc:"Jadwal vaksin teratur sesuai usia dan kebutuhan hewan Anda." },
  { icon:"🐾", title:"Pelatihan Keluarga",     desc:"Program pelatihan hewan khusus untuk keluarga dan anak-anak." },
];
const GROOMERS = [
  { name:"drh. Adi Santoso",  role:"Dokter Hewan Utama",   color:"from-orange-400 to-orange-600", init:"AS" },
  { name:"Maya Putri",        role:"Groomer Senior",       color:"from-amber-400  to-amber-600",  init:"MP" },
  { name:"Budi Raharjo",      role:"Pelatih Hewan",        color:"from-teal-400   to-teal-600",   init:"BR" },
  { name:"Sari Dewi",         role:"Perawat Hewan",        color:"from-purple-400 to-purple-600", init:"SD" },
];
const BLOGS = [
  {
    tag:"Kesehatan",
    title:"Tips Menjaga Kesehatan Kucing di Rumah",
    desc:"Panduan lengkap merawat kucing kesayangan agar selalu sehat, aktif, dan bahagia setiap hari.",
    img:"/images/blog-dog.png",
  },
  {
    tag:"Grooming",
    title:"Kenapa Grooming Rutin Penting untuk Hewan Anda?",
    desc:"Grooming bukan hanya soal penampilan — ini investasi kesehatan kulit dan bulu jangka panjang.",
    img:"/images/hero-cat.png",
  },
];
const JOIN_PERKS = [
  { icon:"📅", title:"Jadwal Fleksibel",    desc:"Buat dan kelola jadwal perawatan hewan Anda kapan saja dan di mana saja." },
  { icon:"🐾", title:"Rekam Medis Digital", desc:"Riwayat kesehatan hewan tersimpan rapi dan bisa diakses sewaktu-waktu." },
  { icon:"🎁", title:"Promo Anggota",       desc:"Nikmati diskon eksklusif dan penawaran spesial khusus anggota setiap bulan." },
  { icon:"💬", title:"Konsultasi Daring",   desc:"Tanya langsung ke dokter hewan kami tanpa perlu keluar rumah." },
];

function SectionLabel({ children }) {
  return <p className="text-[#FF7A00] text-sm font-bold mb-2">{children}</p>;
}
function SectionTitle({ children, light }) {
  return <h2 className={`text-3xl font-black leading-tight ${light ? "text-white" : "text-[#212153]"}`}>{children}</h2>;
}

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          <span className="text-2xl font-black text-[#212153] shrink-0">
            MEW<span className="text-[#FF7A00]">.</span>
          </span>

          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {[["#hero","Beranda"],["#services","Layanan"],["#team","Tim Kami"],["#blog","Artikel"]].map(([h,l])=>(
              <a key={l} href={h} className="text-slate-600 hover:text-[#FF7A00] text-sm font-medium transition-colors">{l}</a>
            ))}
            <Link to="/promo" className="text-[#FF7A00] hover:text-[#FF9F43] text-sm font-bold transition-colors flex items-center gap-1">
              🎁 Promo
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/daftar"
              className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-orange-500/25 active:scale-95">
              Daftar Sekarang
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="menu">
            <div className="w-5 h-0.5 bg-slate-600 mb-1"/>
            <div className="w-5 h-0.5 bg-slate-600 mb-1"/>
            <div className="w-5 h-0.5 bg-slate-600"/>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-3">
            {[["#hero","Beranda"],["#services","Layanan"],["#team","Tim Kami"],["#blog","Artikel"]].map(([h,l])=>(
              <a key={l} href={h} onClick={()=>setMobileOpen(false)}
                className="text-slate-600 hover:text-[#FF7A00] text-sm font-medium py-2 border-b border-slate-50">{l}</a>
            ))}
            <Link to="/promo" onClick={()=>setMobileOpen(false)}
              className="text-[#FF7A00] font-bold text-sm py-2 flex items-center gap-1">
              🎁 Promo & Benefit
            </Link>
            <Link to="/daftar" onClick={()=>setMobileOpen(false)}
              className="bg-[#FF7A00] text-white text-sm font-bold px-5 py-3 rounded-xl text-center mt-2 active:scale-95">
              Daftar Sekarang
            </Link>
          </div>
        )}
      </header>

      <section id="hero" className="bg-[#FEF6EE] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <span className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              🐾 Klinik Hewan — Baru Hadir untuk Anda
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#212153] leading-[1.15] mb-6">
              Kami merawat hewan<br />kesayangan Anda dengan{" "}
              <span className="text-[#FF7A00]">sepenuh hati 🧡</span>
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
              Klinik Mew hadir dengan layanan perawatan hewan yang lengkap, terjangkau,
              dan ditangani oleh tenaga profesional berpengalaman. Kepercayaan Anda
              adalah prioritas kami.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#services"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all active:scale-95">
                Lihat Layanan Kami
              </a>
              <a href="#team"
                className="bg-white border-2 border-slate-200 hover:border-[#FF7A00] text-[#212153] hover:text-[#FF7A00] font-bold px-6 py-3 rounded-xl transition-all">
                Kenali Tim Kami
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["BS","SA","RR","DL"].map((init,i)=>(
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{init}</div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-[#212153]">300+ Pelanggan Puas</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {"★★★★★".split("").map((_,i)=><span key={i} className="text-[#FF7A00] text-xs">★</span>)}
                  <span className="text-xs text-slate-400 ml-1">5.0 Rating Awal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center py-12 px-12">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-[#DDEEFF] overflow-hidden flex items-center justify-center">
              <img src="/images/hero-dog.png" alt="Happy Pet"
                className="w-full h-full object-cover object-top"
                onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span style="font-size:6rem">🐕</span>';}}/>
            </div>

            <div className="absolute bottom-4 left-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-50">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-black text-base shrink-0">✓</div>
              <div>
                <p className="text-sm font-black text-[#212153]">Tenaga Profesional</p>
                <p className="text-xs text-slate-400 mt-0.5">Dokter & groomer bersertifikat</p>
              </div>
            </div>

            <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-xl px-5 py-3 text-center border border-slate-50">
              <p className="text-2xl font-black text-[#FF7A00] leading-none">5.0 ★</p>
              <p className="text-xs text-slate-400 mt-1">300+ ulasan awal</p>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-[#FF7A00] text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2">
              <span className="text-base">🐾</span>
              <p className="text-xs font-bold whitespace-nowrap">500+ Hewan<br/>Dirawat</p>
            </div>
          </div>
        </div>

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

      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>📞 Hubungi Kami</SectionLabel>
            <SectionTitle>Yuk, buat janji temu<br/>dan tetap terhubung</SectionTitle>
            <div className="mt-6 space-y-2.5 mb-7">
              {["Konsultasi gratis untuk kunjungan pertama","Dokter hewan berpengalaman & bersertifikat","Layanan darurat tersedia setiap saat"].map(t=>(
                <div key={t} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="w-5 h-5 bg-orange-100 text-[#FF7A00] rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>{t}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+6281234567890"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm">
                📞 Buat Janji Sekarang
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm">
                💬 Chat via WhatsApp
              </a>
            </div>
          </div>
          <div className="relative flex justify-center items-center py-10 px-10">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
              <img src="/images/veterinarian-pet.PNG" alt="Dokter Hewan"
                className="w-full h-full object-cover object-top"
                onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span style="font-size:5rem">👩‍⚕️</span>';}}/>
            </div>
            <div className="absolute bottom-2 left-0 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-slate-100">
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-lg shrink-0">📅</div>
              <div>
                <p className="text-xs font-black text-[#212153]">Jadwal Fleksibel</p>
                <p className="text-xs text-slate-400 mt-0.5">Buat janji dalam 1 menit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>✨ Yang Kami Tawarkan</SectionLabel>
            <SectionTitle>Layanan Kami</SectionTitle>
            <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
              Semua kebutuhan perawatan hewan tersedia di satu tempat — mudah, terjangkau, dan profesional.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s,i)=>(
              <div key={i} className="group rounded-3xl p-6 bg-white shadow-sm hover:bg-[#FF7A00] hover:shadow-xl hover:shadow-orange-400/30 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-orange-50 group-hover:bg-white/20 transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="font-extrabold text-base mb-2 text-[#212153] group-hover:text-white transition-colors duration-300">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 group-hover:text-orange-100 transition-colors duration-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>🏥 Fasilitas Kami</SectionLabel>
            <SectionTitle>Fasilitas yang Kami Sediakan</SectionTitle>
            <p className="text-slate-500 text-sm leading-relaxed mt-4 mb-8 max-w-md">
              Klinik Mew dilengkapi fasilitas modern dan nyaman agar hewan Anda selalu mendapat perawatan terbaik.
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
            <div className="relative pb-8 pr-8">
              <div className="w-60 h-60 md:w-72 md:h-72 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center shadow-sm">
                <img src="/images/dog-standing.png" alt="Dog"
                  className="w-full h-full object-contain scale-110"
                  onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span style="font-size:5rem">🐕</span>';}}/>
              </div>

              <div className="absolute bottom-0 right-0 bg-[#FF7A00] text-white rounded-2xl px-6 py-4 shadow-2xl shadow-orange-400/40 text-center">
                <p className="font-black text-2xl leading-none">50+</p>
                <p className="text-xs text-orange-100 mt-1 font-medium">Perawatan/Bulan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>👨‍⚕️ Tim Profesional</SectionLabel>
            <SectionTitle>Tim Perawat Kami</SectionTitle>
            <p className="text-slate-500 mt-3 max-w-sm mx-auto text-sm">
              Kenali tim kami yang berpengalaman dan berdedikasi tinggi untuk hewan kesayangan Anda.
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

      <section id="blog" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>📰 Artikel Terbaru</SectionLabel>
            <SectionTitle>Blog Mew</SectionTitle>
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
                  <button className="text-[#FF7A00] font-bold text-sm hover:underline flex items-center gap-1">Baca Selengkapnya <span>→</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="py-16 bg-[#FEF6EE]">
        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-gradient-to-br from-[#212153] to-indigo-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">

              <div className="p-10 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 bg-white/10 text-orange-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 w-fit border border-white/10">
                  🐾 Bergabung Gratis
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                  Daftar dan dapatkan<br />
                  <span className="text-[#FF7A00]">berbagai manfaat</span> eksklusif
                </h2>
                <p className="text-indigo-300 text-sm leading-relaxed mb-8">
                  Jadwal fleksibel, rekam medis digital, promo anggota,
                  dan konsultasi daring — semua dalam satu akun gratis.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/daftar"
                    className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-7 py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
                    🐾 Daftar Gratis Sekarang
                  </Link>
                  <Link to="/masuk"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-indigo-200 hover:text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all flex items-center justify-center gap-1">
                    Sudah punya akun? Masuk →
                  </Link>
                </div>
                <p className="text-indigo-500 text-xs mt-5">
                  Admin klinik?{" "}
                  <Link to="/login" className="text-indigo-400 hover:text-[#FF7A00] font-semibold underline transition-colors">
                    Login dashboard admin
                  </Link>
                </p>
              </div>

              <div className="p-10 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-4">
                {JOIN_PERKS.map((p) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <span className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-lg shrink-0 border border-white/10">
                      {p.icon}
                    </span>
                    <div>
                      <p className="text-white font-bold text-sm">{p.title}</p>
                      <p className="text-indigo-400 text-xs mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10 mt-1">
                  <Link to="/promo"
                    className="text-xs text-[#FF7A00] font-bold hover:underline flex items-center gap-1">
                    🎁 Lihat semua promo & manfaat anggota →
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <footer className="bg-[#212153] text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-10">

          <div>
            <span className="text-2xl font-black">MEW<span className="text-[#FF7A00]">.</span></span>
            <p className="text-indigo-300 text-sm mt-4 leading-relaxed">
              Klinik hewan yang hadir dengan semangat memberikan perawatan terbaik
              dan terjangkau untuk hewan peliharaan Anda.
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
            { title:"Tautan Cepat", links:["Beranda","Layanan Kami","Tim Perawat","Artikel","Bergabung"] },
            { title:"Layanan",      links:["Perawatan Medis","Grooming Premium","Penitipan Hewan","Vaksinasi"] },
            { title:"Kontak Kami",  links:["📍 Jl. Mew No.1, Jakarta","📞 0812-3456-7890","✉️ hello@mew.id","🕗 Sen–Sab 08:00–20:00"] },
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
          <p className="text-indigo-400 text-xs">© 2026 Klinik Mew. Hak cipta dilindungi.</p>
          <p className="text-indigo-400 text-xs">Dibuat dengan 🧡 untuk hewan peliharaan di mana saja.</p>
        </div>
      </footer>

    </div>
  );
}
