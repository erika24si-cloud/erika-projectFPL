import React from "react";

export default function Groomers() {
  const groomers = [
    { name: "Adam Smith", role: "Veterinarian", img: "/images/groomer1.png" },
    { name: "Morgan Mark", role: "Trainer", img: "/images/groomer2.png" },
    { name: "Ana Targary", role: "Groomer", img: "/images/groomer3.png" },
    { name: "Moeen Max", role: "Veterinarian", img: "/images/groomer4.png" },
  ];

  return (
    <section className="w-full py-20 px-6 bg-[#FCF8F3] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        
        <div className="relative inline-block mb-16">
          
          <div className="absolute -left-12 md:-left-24 top-2 text-[#3BB7A1]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 14 9 9 14 14 19 9"></polyline>
            </svg>
          </div>

          <div className="absolute -right-12 md:-right-24 -top-8 text-[#FFB82E]">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="30" cy="30" r="26" />
              <circle cx="34" cy="34" r="26" strokeDasharray="4 4" className="opacity-50" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A40] mb-4 relative z-10">
            Our Groomers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm md:text-base relative z-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {groomers.map((groomer, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[32px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="w-full aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl mb-5 bg-gray-100">
                <img
                  src={groomer.img}
                  alt={groomer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-[#1A1A40] mb-1">
                {groomer.name}
              </h3>
              <p className="text-[#FF7A00] font-semibold text-sm mb-2">
                {groomer.role}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <button className="bg-[#FF7A00] hover:bg-[#e66a00] text-white px-10 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-transform hover:-translate-y-1">
            View More
          </button>
        </div>

      </div>
    </section>
  );
}