import React from "react";

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF7A00"/>
    <path d="M17 9L10 16L7 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Booking() {
  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <div className="pr-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#212153] leading-[1.2]">
            Lets book a call and stay connected
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3 text-[#212153] font-semibold">
              <CheckIcon />
              <span>Vaccination Service</span>
            </div>
            <div className="flex items-center gap-3 text-[#212153] font-semibold">
              <CheckIcon />
              <span>Veterinary Service</span>
            </div>
          </div>

          <p className="text-gray-500 mt-8 max-w-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>

          <div className="flex items-center gap-8 mt-10">
            <button className="bg-[#FF7A00] text-white px-8 py-3.5 rounded-xl font-bold shadow-md shadow-orange-500/30 hover:bg-orange-600 transition">
              Book a Schedule
            </button>

            <button className="flex items-center gap-2 text-[#212153] font-bold hover:opacity-80 transition">
              <span className="text-xl">📞</span> Emergency Call
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full h-[500px]">
          
          <div className="absolute w-[360px] h-[360px] bg-[#FCD6C4] rounded-full z-0"></div>

          <img
            src="/images/booking.png" 
            alt="doctor"
            className="relative z-10 w-[420px] object-contain"
          />

          <div className="absolute top-6 left-10 z-20 grid grid-cols-3 gap-2 opacity-80">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-[#FFC554] rounded-full"></div>
            ))}
          </div>

          <div className="absolute top-16 right-16 z-20">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v16m8-8H2" stroke="#2DD4BF" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="absolute bottom-20 left-12 z-20">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2v14m7-7H2" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="absolute bottom-12 right-24 z-20">
            <svg width="32" height="32" viewBox="0 0 30 30" fill="none">
              <path d="M2 15l5-5 5 5 5-5 5 5" stroke="#FFC554" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}