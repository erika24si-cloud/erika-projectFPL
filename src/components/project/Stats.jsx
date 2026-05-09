import React from "react";

export default function Stats() {
  return (
    <section className="w-full py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        <div className="w-full md:w-[65%] bg-[#FF7A00] rounded-3xl p-8 md:p-10 text-white shadow-lg grid grid-cols-3 items-center">
          
          <div className="text-left pr-4">
            <h2 className="text-3xl md:text-[40px] font-black leading-none">2500+</h2>
            <p className="mt-3 text-sm md:text-base font-medium text-white/90">Adoption</p>
          </div>

          <div className="text-left border-l border-white/40 pl-6 md:pl-10 pr-4">
            <h2 className="text-3xl md:text-[40px] font-black leading-none">1850+</h2>
            <p className="mt-3 text-sm md:text-base font-medium text-white/90">Treatment</p>
          </div>

          <div className="text-left border-l border-white/40 pl-6 md:pl-10">
            <h2 className="text-3xl md:text-[40px] font-black leading-none">1300+</h2>
            <p className="mt-3 text-sm md:text-base font-medium text-white/90">Pet Grooming</p>
          </div>

        </div>

        <div className="w-full md:w-[35%] bg-[#3BB7A1] rounded-3xl p-8 md:p-10 text-white shadow-lg flex flex-col justify-between">
          
          <p className="italic text-sm md:text-base leading-relaxed text-white/95">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et quis nostrud...
          </p>

          <div className="flex justify-between items-center mt-8">
            <h3 className="font-bold text-lg">Daniel Kahneman</h3>
            
            <div className="w-12 h-12 bg-yellow-300 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
              <img 
                src="/images/user.png" 
                alt="Daniel Kahneman" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}