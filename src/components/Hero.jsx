import React from "react";

const PawIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8.5C13.3807 8.5 14.5 7.38071 14.5 6C14.5 4.61929 13.3807 3.5 12 3.5C10.6193 3.5 9.5 4.61929 9.5 6C9.5 7.38071 10.6193 8.5 12 8.5Z" fill="#FFBA49"/>
    <path d="M18.5 11C19.8807 11 21 9.88071 21 8.5C21 7.11929 19.8807 6 18.5 6C17.1193 6 16 7.11929 16 8.5C16 9.88071 17.1193 11 18.5 11Z" fill="#FFBA49"/>
    <path d="M5.5 11C6.88071 11 8 9.88071 8 8.5C8 7.11929 6.88071 6 5.5 6C4.11929 6 3 7.11929 3 8.5C3 9.88071 4.11929 11 5.5 11Z" fill="#FFBA49"/>
    <path d="M18.99 13.5C18.66 12.01 17.1 11 15.5 11C14.47 11 13.52 11.5 12 12C10.48 11.5 9.53 11 8.5 11C6.9 11 5.34 12.01 5.01 13.5C4.74 14.74 4.8 16.48 6.08 18.15C7.45 19.95 9.4 21 12 21C14.6 21 16.55 19.95 17.92 18.15C19.2 16.48 19.26 14.74 18.99 13.5Z" fill="#FFBA49"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="w-full pt-12 pb-24 px-6 bg-[#FFFDF8] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-[280px] md:w-[340px] h-[380px] md:h-[460px] bg-[#FFD05B] rounded-[40px] overflow-hidden shadow-lg">
            <img
              src="/images/hero-cat.png"
              alt="Kucing"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] object-contain"
            />
          </div>

          <div className="absolute -bottom-10 -right-4 md:-right-8 lg:right-10 w-[200px] md:w-[260px] h-[200px] md:h-[260px] bg-[#D8EFFF] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/images/hero-dog.png"
              alt="Anjing"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] object-contain"
            />
          </div>

          <div className="absolute top-10 right-0 lg:-right-10 text-[#3BB7A1] text-2xl font-black">+</div>
          <div className="absolute bottom-10 -left-6 opacity-50">
             <div className="w-4 h-4 bg-[#FFD05B] rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col text-left mt-10 lg:mt-0 lg:pl-10">
          
          <h1 className="text-4xl md:text-[54px] lg:text-[64px] font-black text-[#131336] leading-[1.1] tracking-tight">
            We take care of <br className="hidden md:block" />
            your pet and help <br className="hidden md:block" />
            them to grow <span className="inline-block w-12 h-12 align-middle ml-2 text-4xl">😍</span>
          </h1>

          <p className="mt-6 text-[#8B8B9B] md:text-lg max-w-md leading-relaxed">
            Best pets are waiting for adoption. Find out the the perfect
            one you will like it. It's our promise.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8">
            <button className="bg-[#FF7A00] hover:bg-[#e66a00] text-white px-8 py-4 rounded-[14px] font-bold text-lg transition-transform hover:-translate-y-1 shadow-lg shadow-orange-500/30">
              Contact us
            </button>

            <div className="flex items-center -space-x-3">
              <img src="/images/groomer1.png" alt="user" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm z-[4]" />
              <img src="/images/groomer2.png" alt="user" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm z-[3]" />
              <img src="/images/groomer3.png" alt="user" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm z-[2]" />
              <div className="w-12 h-12 rounded-full border-2 border-white bg-[#FF7A00] text-white flex items-center justify-center font-bold text-sm shadow-sm z-[1]">
                +7
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 mt-12">
            <div className="mt-1">
              <PawIcon />
            </div>
            <div className="flex flex-col">
              <h3 className="font-extrabold text-[#131336] text-[18px] mb-1">
                How to take care
              </h3>
              <p className="text-[#8B8B9B] text-sm md:text-base max-w-sm leading-snug">
                perfect one you will like it. It's our promise.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}