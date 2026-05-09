import React from "react";

const servicesList = [
  { 
    title: "Veterinary Care", 
    desc: "Layanan medis komprehensif mulai dari vaksinasi, pemeriksaan rutin, hingga tindakan bedah oleh dokter hewan berlisensi. Kami memastikan kesehatan peliharaan Anda selalu terpantau dengan alat medis berstandar tinggi.", 
    imgSrc: "/images/veterinarian-pet.PNG",
    tag: "Medis",
    reverse: false 
  },
  { 
    title: "Premium Grooming", 
    desc: "Beri peliharaan Anda perawatan layaknya raja dan ratu. Mulai dari mandi spa, pemotongan kuku, hingga gaya potong bulu terkini. Menggunakan shampo khusus yang aman untuk kulit sensitif.", 
    imgSrc:"/images/premium-grooming.PNG",
    tag: "Perawatan",
    reverse: true 
  },
];

export default function Services() {
  return (
   <div className="min-h-screen bg-white py-20 px-6 lg:px-20 text-[#212153]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Layanan Utama Kami</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk segala kebutuhan hewan peliharaan Anda di satu tempat.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${service.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 bg-white p-6 md:p-10 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow`}
            >
             <div className="w-full md:w-1/2 flex justify-center">
                <div className={`relative w-[260px] md:w-[300px] h-[320px] md:h-[380px] ${service.bgColor} rounded-[40px] shadow-lg`}>
                  <img
                    src={service.imgSrc}
                    alt={service.title}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] object-contain"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <span className="inline-block bg-[#FEF6EE] text-[#FF7A00] px-4 py-1 rounded-full text-sm font-bold mb-4">
                  {service.tag}
                </span>
                <h2 className="text-3xl font-extrabold mb-4">{service.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {service.desc}
                </p>
                <button className="text-[#212153] font-bold border-b-2 border-[#212153] pb-1 hover:text-[#FF7A00] hover:border-[#FF7A00] transition-colors">
                  Pelajari Lebih Lanjut &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}