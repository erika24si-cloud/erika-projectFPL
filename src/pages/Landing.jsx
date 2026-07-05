import { useState } from "react";
import { Link } from "react-router-dom";

const STATS = [
  { v:"500+", l:"Hewan Dirawat"   },
  { v:"300+", l:"Pelanggan Aktif" },
  { v:"50+",  l:"Perawatan/Bulan" },
];

const SERVICES = [
  { icon:"🩺", title:"Perawatan Medis",  desc:"Pemeriksaan kesehatan umum, diagnosis, dan pengobatan oleh dokter hewan berpengalaman." },
  { icon:"✂️", title:"Grooming Premium", desc:"Mandi bersih, potong kuku, bersihkan telinga, dan perapian bulu hewan kesayangan Anda." },
  { icon:"🏨", title:"Penitipan Hewan",  desc:"Titipkan hewan Anda dengan aman — fasilitas nyaman, bersih, dan dipantau sepanjang hari." },
  { icon:"💉", title:"Vaksinasi",        desc:"Program vaksin lengkap dan terjadwal sesuai jenis dan usia hewan peliharaan Anda." },
];

const TEAM = [
  { name:"drh. Adi Santoso", role:"Dokter Hewan Utama", color:"from-orange-400 to-orange-600", init:"AS" },
  { name:"Maya Putri",       role:"Groomer Senior",     color:"from-amber-400  to-amber-600",  init:"MP" },
  { name:"Budi Raharjo",     role:"Pelatih Hewan",      color:"from-teal-400   to-teal-600",   init:"BR" },
  { name:"Sari Dewi",        role:"Perawat Hewan",      color:"from-purple-400 to-purple-600", init:"SD" },
];

const BLOGS = [
  {
    tag: "Kesehatan",
    title: "Tips Menjaga Kesehatan Kucing di Rumah",
    desc: "Panduan lengkap merawat kucing kesayangan agar selalu sehat, aktif, dan bahagia.",
    img: "/images/blog-dog.png",
    readTime: "4 menit baca",
    content: [
      {
        subtitle: "1. Rutin Vaksinasi & Pemeriksaan",
        text: "Vaksinasi adalah garis pertahanan pertama kucing dari penyakit berbahaya seperti panleukopenia, rhinotracheitis, dan calicivirus. Bawalah kucing ke dokter hewan minimal sekali setahun untuk pemeriksaan rutin, meski terlihat sehat.",
      },
      {
        subtitle: "2. Pola Makan yang Seimbang",
        text: "Berikan makanan berkualitas yang mengandung protein hewani tinggi. Hindari makanan manusia seperti bawang, coklat, dan produk susu. Pastikan air bersih selalu tersedia — kucing rentan dehidrasi.",
      },
      {
        subtitle: "3. Kebersihan Kandang & Bulu",
        text: "Bersihkan kotak pasir setiap hari untuk mencegah infeksi saluran kemih. Sisir bulu kucing secara rutin untuk mencegah bulu rontok berlebihan dan hairball yang berbahaya.",
      },
      {
        subtitle: "4. Stimulasi Mental & Fisik",
        text: "Kucing yang bosan cenderung stres dan sakit. Sediakan mainan, tempat menggaruk, dan waktu bermain setiap hari. Kucing yang aktif memiliki sistem imun lebih baik.",
      },
      {
        subtitle: "5. Perhatikan Perubahan Perilaku",
        text: "Perubahan nafsu makan, kebiasaan buang air, atau perilaku tiba-tiba bisa menjadi tanda penyakit. Jangan tunggu — segera konsultasikan ke dokter hewan jika ada hal yang tidak biasa.",
      },
    ],
  },
  {
    tag: "Grooming",
    title: "Kenapa Grooming Rutin Penting untuk Hewan Anda?",
    desc: "Grooming bukan hanya soal penampilan — ini investasi kesehatan kulit dan bulu jangka panjang.",
    img: "/images/hero-cat.png",
    readTime: "3 menit baca",
    content: [
      {
        subtitle: "Bukan Sekadar Penampilan",
        text: "Banyak pemilik hewan mengira grooming hanya untuk membuat hewan tampak cantik. Padahal, grooming rutin membantu mendeteksi masalah kulit, parasit, benjolan, atau luka yang tersembunyi di balik bulu.",
      },
      {
        subtitle: "Manfaat Grooming Secara Rutin",
        text: "Mandi rutin menghilangkan kotoran, minyak berlebih, dan bau tak sedap. Potong kuku mencegah cedera. Pembersihan telinga mencegah infeksi. Semua ini berkontribusi pada kesehatan menyeluruh hewan peliharaan Anda.",
      },
      {
        subtitle: "Seberapa Sering?",
        text: "Anjing berbulu panjang idealnya digrooming setiap 4–6 minggu. Kucing butuh penyisiran 2–3 kali seminggu, terutama saat musim rontok. Konsultasikan jadwal yang tepat dengan groomer profesional kami.",
      },
      {
        subtitle: "Tanda Hewan Butuh Grooming Segera",
        text: "Bulu kusut atau menggumpal, kuku terlalu panjang hingga melengkung, bau badan menyengat, atau telinga berair adalah tanda-tanda hewan Anda perlu segera digrooming.",
      },
    ],
  },
];

const JOIN_PERKS = [
  { icon:"📅", title:"Jadwal Fleksibel",    desc:"Buat dan kelola jadwal perawatan kapan saja dan di mana saja."  },
  { icon:"🐾", title:"Rekam Medis Digital", desc:"Riwayat kesehatan hewan tersimpan rapi dan bisa diakses sewaktu-waktu." },
  { icon:"🎁", title:"Promo Anggota",       desc:"Diskon eksklusif dan penawaran spesial khusus anggota setiap bulan." },
  { icon:"💬", title:"Konsultasi Daring",   desc:"Tanya langsung ke dokter hewan kami tanpa perlu keluar rumah." },
];

function SLabel({ children }) {
  return <p className="text-[#FF7A00] text-xs font-bold uppercase tracking-widest mb-2">{children}</p>;
}
function STitle({ children }) {
  return <h2 className="text-2xl md:text-3xl font-black text-[#212153] leading-tight">{children}</h2>;
}

const TAG_COLOR = {
  Kesehatan: "bg-green-50 text-green-700 border-green-100",
  Grooming:  "bg-purple-50 text-purple-700 border-purple-100",
};

function ArtikelModal({ artikel, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">

        <div className="shrink-0 h-48 overflow-hidden relative">
          <img src={artikel.img} alt={artikel.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = "#FEF6EE"; }}/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors backdrop-blur-sm">
            ✕
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${TAG_COLOR[artikel.tag] ?? "bg-orange-50 text-[#FF7A00] border-orange-100"}`}>
              {artikel.tag}
            </span>
            <h3 className="text-white font-black text-lg mt-2 leading-snug">{artikel.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 shrink-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 flex items-center justify-center text-white text-xs font-black">M</div>
          <div>
            <p className="text-xs font-bold text-[#212153]">Tim Klinik Mew</p>
            <p className="text-xs text-slate-400">{artikel.readTime}</p>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-5">
          <p className="text-slate-500 text-sm leading-relaxed mb-6 italic border-l-4 border-orange-200 pl-4">
            {artikel.desc}
          </p>
          <div className="flex flex-col gap-5">
            {artikel.content.map((section, i) => (
              <div key={i}>
                <h4 className="font-extrabold text-[#212153] text-sm mb-1.5">{section.subtitle}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{section.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-100 px-5 py-4 bg-white flex gap-2">
          <Link to="/daftar" onClick={onClose}
            className="flex-1 bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold py-3 rounded-xl text-sm text-center transition-all active:scale-95">
            🐾 Daftar & Buat Janji
          </Link>
          <button onClick={onClose}
            className="px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeArtikel, setActiveArtikel] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_8px_rgb(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="text-2xl font-black text-[#212153] shrink-0 select-none">
            MEW<span className="text-[#FF7A00]">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {[["#services","Layanan"],["#team","Tim Kami"],["#blog","Artikel"]].map(([h,l])=>(
              <a key={l} href={h}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-[#FF7A00] hover:bg-orange-50 text-sm font-medium transition-all">
                {l}
              </a>
            ))}
            <Link to="/promo"
              className="px-4 py-2 rounded-xl text-[#FF7A00] hover:bg-orange-50 text-sm font-bold transition-all flex items-center gap-1">
              🎁 Promo
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/masuk"
              className="text-sm font-semibold text-slate-500 hover:text-[#212153] px-4 py-2 rounded-xl transition-colors">
              Masuk
            </Link>
            <Link to="/daftar"
              className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-orange-400/25 active:scale-95">
              Daftar Sekarang
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Buka menu">
            {mobileOpen
              ? <span className="text-slate-600 font-bold text-lg leading-none">✕</span>
              : <div className="flex flex-col gap-1"><div className="w-5 h-0.5 bg-slate-600 rounded"/><div className="w-5 h-0.5 bg-slate-600 rounded"/><div className="w-5 h-0.5 bg-slate-600 rounded"/></div>
            }
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
            {[["#services","Layanan"],["#team","Tim Kami"],["#blog","Artikel"]].map(([h,l])=>(
              <a key={l} href={h} onClick={()=>setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-orange-50 hover:text-[#FF7A00] text-sm font-medium">
                {l}
              </a>
            ))}
            <Link to="/promo" onClick={()=>setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-[#FF7A00] font-bold text-sm flex items-center gap-1">
              🎁 Promo & Manfaat
            </Link>
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-slate-100">
              <Link to="/masuk" onClick={()=>setMobileOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all">
                Masuk
              </Link>
              <Link to="/daftar" onClick={()=>setMobileOpen(false)}
                className="bg-[#FF7A00] text-white text-sm font-bold py-3 rounded-xl text-center active:scale-95">
                Daftar Sekarang
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-0 grid md:grid-cols-2 gap-12 items-start">

          {/* Kiri */}
          <div className="pb-16">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              🐾 Klinik Hewan Terpercaya di Jakarta
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#212153] leading-[1.12] mb-5">
              Perawatan hewan<br />
              terbaik, dengan{" "}
              <span className="text-[#FF7A00]">sepenuh hati</span>
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-sm">
              Layanan lengkap mulai dari pemeriksaan medis, grooming,
              vaksinasi, hingga penitipan — semua di satu tempat.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#services"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-orange-400/25 transition-all active:scale-95 text-sm">
                Lihat Layanan
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
                className="bg-white border-2 border-slate-200 hover:border-[#FF7A00] text-slate-700 hover:text-[#FF7A00] font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                💬 Hubungi Kami
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["BS","SA","RR","DL"].map((init,i)=>(
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-400 border-2 border-[#FEF6EE] flex items-center justify-center text-white text-xs font-bold">{init}</div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-[#212153]">300+ pelanggan mempercayai kami</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {"★★★★★".split("").map((_,i)=><span key={i} className="text-[#FF7A00] text-xs">★</span>)}
                  <span className="text-xs text-slate-400 ml-1.5">5.0 · 300+ ulasan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan — kucing besar + anjing kecil overlap */}
          <div className="hidden md:flex justify-end items-start relative pt-8 pb-0">

            <div className="relative w-72 h-80">

              {/* Gambar utama — kucing, card besar rounded kecuali pojok kiri bawah */}
              <div className="w-64 h-72 rounded-3xl rounded-bl-none bg-[#FBB034] overflow-hidden shadow-lg">
                <img src="/images/hero-cat.png" alt="Kucing Lucu"
                  className="w-full h-full object-cover object-top"
                  onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span style="font-size:6rem;display:flex;align-items:center;justify-content:center;height:100%">🐱</span>';}}/>
              </div>

              {/* Gambar kedua — anjing, card kecil overlap pojok kanan bawah */}
              <div className="absolute bottom-0 right-0 w-36 h-36 rounded-2xl bg-[#DDEEFF] overflow-hidden shadow-xl border-4 border-[#FEF6EE]">
                <img src="/images/hero-dog.png" alt="Anjing Lucu"
                  className="w-full h-full object-cover object-top"
                  onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span style="font-size:3.5rem;display:flex;align-items:center;justify-content:center;height:100%">🐶</span>';}}/>
              </div>

              {/* Dekorasi bintang */}
              <div className="absolute top-2 -right-5 text-[#FF7A00] text-2xl select-none">✦</div>
              <div className="absolute -bottom-3 left-8 text-orange-300 text-base select-none">🐾</div>
            </div>

            {/* Floating badge bawah kiri */}
            <div className="absolute bottom-10 -left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-slate-100">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-black text-base shrink-0">✓</div>
              <div>
                <p className="text-sm font-black text-[#212153]">Dokter Bersertifikat</p>
                <p className="text-xs text-slate-400">Izin praktik resmi & terverifikasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="bg-[#FF7A00] rounded-2xl px-6 py-5 grid grid-cols-3 text-white text-center">
            {STATS.map((s,i)=>(
              <div key={s.l} className={i < STATS.length-1 ? "border-r border-white/20" : ""}>
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-xs text-orange-100 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAYANAN ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <SLabel>✨ Yang Kami Tawarkan</SLabel>
              <STitle>Layanan Lengkap<br />di Satu Tempat</STitle>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Semua kebutuhan perawatan hewan tersedia — mudah, terjangkau, dan ditangani profesional.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s,i)=>(
              <div key={i}
                className="group rounded-2xl p-6 bg-[#FEF6EE] hover:bg-[#FF7A00] hover:shadow-lg hover:shadow-orange-400/20 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-white group-hover:bg-white/20 transition-colors duration-300 shadow-sm">
                  {s.icon}
                </div>
                <h3 className="font-extrabold text-sm mb-1.5 text-[#212153] group-hover:text-white transition-colors duration-300">{s.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500 group-hover:text-orange-100 transition-colors duration-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KENAPA PILIH KAMI ── */}
      <section className="py-16 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SLabel>🏥 Kenapa Klinik Mew?</SLabel>
            <STitle>Fasilitas modern,<br />tim yang peduli</STitle>
            <p className="text-slate-500 text-sm leading-relaxed mt-4 mb-8 max-w-sm">
              Klinik Mew hadir dengan peralatan terkini dan tim yang berpengalaman
              agar hewan Anda selalu mendapat perawatan terbaik.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                { icon:"✂️", title:"Grooming Profesional",  desc:"Peralatan modern, aman untuk semua jenis hewan." },
                { icon:"❤️", title:"Pemeriksaan Rutin",     desc:"Alat diagnostik lengkap untuk deteksi dini penyakit." },
                { icon:"💊", title:"Program Vaksinasi",     desc:"Jadwal vaksin teratur sesuai usia hewan Anda." },
                { icon:"🐾", title:"Pelatihan Hewan",       desc:"Program pelatihan khusus bersama pelatih bersertifikat." },
              ].map((f,i)=>(
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#212153] text-sm">{f.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+6281234567890"
                className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm">
                📞 Buat Janji Sekarang
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
                className="bg-white border-2 border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-600 font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                💬 Hubungi Kami
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl bg-orange-100 overflow-hidden flex items-center justify-center shadow-sm">
                <img src="/images/dog-standing.png" alt="Hewan Sehat"
                  className="w-full h-full object-contain scale-105"
                  onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<span style="font-size:5rem">🐕</span>';}}/>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FF7A00] text-white rounded-2xl px-5 py-3 shadow-xl text-center">
                <p className="font-black text-xl leading-none">50+</p>
                <p className="text-xs text-orange-100 mt-0.5">Perawatan/Bulan</p>
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2">
                <span className="text-lg">🩺</span>
                <div>
                  <p className="text-xs font-black text-[#212153]">Darurat 24 Jam</p>
                  <p className="text-xs text-slate-400">Selalu siap membantu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIM ── */}
      <section id="team" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <SLabel>👨‍⚕️ Tim Profesional</SLabel>
            <STitle>Dirawat oleh Ahlinya</STitle>
            <p className="text-slate-500 mt-3 max-w-sm mx-auto text-sm">
              Tim kami berpengalaman dan berdedikasi tinggi untuk hewan kesayangan Anda.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((g,i)=>(
              <div key={i} className="bg-[#FEF6EE] rounded-2xl p-6 text-center hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all border border-transparent hover:border-orange-100">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white text-lg font-black mx-auto mb-4 shadow-md`}>
                  {g.init}
                </div>
                <h4 className="font-extrabold text-[#212153] text-sm">{g.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{g.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTIKEL ── */}
      <section id="blog" className="py-16 bg-[#FEF6EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <SLabel>📰 Artikel Terbaru</SLabel>
              <STitle>Tips & Info<br />dari Klinik Mew</STitle>
            </div>
            <p className="text-slate-500 text-sm">Panduan merawat hewan kesayangan Anda.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {BLOGS.map((b,i)=>(
              <div key={i}
                onClick={() => setActiveArtikel(b)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="h-44 bg-orange-50 overflow-hidden">
                  <img src={b.img} alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e=>{e.target.style.display="none"; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center text-5xl">🐾</div>';}}/>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${TAG_COLOR[b.tag] ?? "bg-orange-50 text-[#FF7A00] border-orange-100"}`}>
                      {b.tag}
                    </span>
                    <span className="text-xs text-slate-400">{b.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-[#212153] text-base mb-2 leading-snug group-hover:text-[#FF7A00] transition-colors">{b.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{b.desc}</p>
                  <span className="text-[#FF7A00] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BERGABUNG ── */}
      <section id="join" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#212153] via-indigo-900 to-[#1a1840] rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A00]/8 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500/8 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

            <div className="relative grid md:grid-cols-2">
              <div className="p-10 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 bg-white/10 text-orange-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 w-fit border border-white/10">
                  🐾 Bergabung Gratis
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                  Daftar dan dapatkan<br />
                  <span className="text-[#FF7A00]">manfaat eksklusif</span>
                </h2>
                <p className="text-indigo-300 text-sm leading-relaxed mb-7">
                  Satu akun gratis untuk jadwal, rekam medis digital,
                  promo anggota, dan konsultasi daring.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/daftar"
                    className="bg-[#FF7A00] hover:bg-[#FF9F43] text-white font-bold px-7 py-3 rounded-xl shadow-lg transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
                    🐾 Daftar Gratis
                  </Link>
                  <Link to="/masuk"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-indigo-200 hover:text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all flex items-center justify-center">
                    Sudah punya akun →
                  </Link>
                </div>
                <p className="text-indigo-500 text-xs mt-5">
                  Admin klinik?{" "}
                  <Link to="/login" className="text-indigo-400 hover:text-[#FF7A00] font-semibold underline transition-colors">
                    Login dashboard admin
                  </Link>
                </p>
              </div>

              <div className="p-10 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-3.5">
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
                <div className="pt-3 border-t border-white/10">
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

      {/* ── FOOTER ── */}
      <footer className="bg-[#212153] text-white pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-10">

          <div className="md:col-span-1">
            <span className="text-2xl font-black">MEW<span className="text-[#FF7A00]">.</span></span>
            <p className="text-indigo-300 text-sm mt-3 leading-relaxed">
              Klinik hewan yang hadir dengan semangat memberikan perawatan
              terbaik dan terjangkau untuk hewan peliharaan Anda.
            </p>
            <div className="flex gap-2 mt-5">
              {["📘","📸","🐦","▶️"].map((icon,i)=>(
                <button key={i}
                  className="w-9 h-9 bg-white/10 hover:bg-[#FF7A00] rounded-lg flex items-center justify-center text-sm transition-all hover:scale-110">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {[
            { title:"Navigasi",    links:[["#services","Layanan"],["#team","Tim Kami"],["#blog","Artikel"],["#join","Bergabung"]] },
            { title:"Layanan",     links:[["#","Perawatan Medis"],["#","Grooming Premium"],["#","Penitipan Hewan"],["#","Vaksinasi"]] },
            { title:"Kontak",      links:[["#","📍 Jl. Mew No.1, Jakarta"],["tel:+6281234567890","📞 0812-3456-7890"],["mailto:hello@mew.id","✉️ hello@mew.id"],["#","🕗 Sen–Sab 08:00–20:00"]] },
          ].map(col=>(
            <div key={col.title}>
              <h4 className="font-extrabold text-white mb-4 text-xs uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([href,label])=>(
                  <li key={label}>
                    <a href={href} className="text-indigo-300 hover:text-[#FF7A00] text-sm transition-colors leading-relaxed">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-indigo-400 text-xs">© 2026 Klinik Mew. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link to="/promo" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">Promo & Manfaat</Link>
            <span className="text-indigo-700 text-xs">·</span>
            <Link to="/masuk" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">Masuk</Link>
            <span className="text-indigo-700 text-xs">·</span>
            <Link to="/daftar" className="text-indigo-400 hover:text-[#FF7A00] text-xs transition-colors">Daftar</Link>
          </div>
        </div>
      </footer>

      {activeArtikel && (
        <ArtikelModal artikel={activeArtikel} onClose={() => setActiveArtikel(null)} />
      )}
    </div>
  );
}
