import React from "react";

export default function Facilities() {
  const left = [
    {
      title: "Feed Training",
      desc: "Ut enim ad minim velit esse\ncillum dolore eu fugiat..",
      top: "15%",
      offset: "46px",
    },
    {
      title: "Health test",
      desc: "tempor incididunt ut labore\net dolore magna aliqua...",
      top: "50%",
      offset: "0px",
    },
    {
      title: "Vaccination",
      desc: "tempor incididunt ut labore\net dolore magna aliqua...",
      top: "85%",
      offset: "46px",
    },
  ];

  const right = [
    {
      title: "Overnight Care",
      desc: "Ut enim ad minim velit esse\ncillum dolore eu fugiat..",
      top: "15%",
      offset: "46px",
    },
    {
      title: "Medical Care",
      desc: "tempor incididunt ut labore\net dolore magna aliqua...",
      top: "50%",
      offset: "0px",
    },
    {
      title: "Traning Facility",
      desc: "tempor incididunt ut labore\net dolore magna aliqua...",
      top: "85%",
      offset: "46px",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-[#FFFDF8] font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <h2 className="text-4xl md:text-5xl font-black text-[#131336] leading-[1.2] tracking-wide whitespace-nowrap">
            Facilities we <br className="hidden md:block" /> provides
          </h2>
          <p className="text-[#8B8B9B] text-sm md:text-base max-w-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        <div className="hidden md:flex justify-center items-stretch h-[460px] w-full max-w-5xl mx-auto relative mt-16">
          
          <div className="flex-1 relative h-full">
            {left.map((item, index) => (
              <div key={`left-${index}`} className="absolute right-0 flex items-center w-max" style={{ top: item.top, transform: 'translateY(-50%)' }}>
                <div className="text-right pr-4 shrink-0">
                  <h3 className="font-extrabold text-[#131336] text-[17px] mb-1">{item.title}</h3>
                  <p className="text-[#8B8B9B] text-[13px] leading-relaxed whitespace-pre-line">{item.desc}</p>
                </div>
                <div className="h-[2px] bg-[#FCE1CE] relative z-0" style={{ width: `calc(40px + ${item.offset})`, marginRight: `-${item.offset}` }}></div>
              </div>
            ))}
          </div>

          <div className="w-[320px] h-[460px] shrink-0 relative z-10">
            <div className="absolute inset-0 border-[2px] border-[#FCE1CE] rounded-[50%] pointer-events-none"></div>
            
            {left.map((item, index) => (
              <div key={`dot-l-${index}`} className="absolute w-[12px] h-[12px] bg-[#FDBA44] rounded-full border-[3px] border-[#FFFDF8] box-content z-20" style={{ top: item.top, left: item.offset, transform: 'translate(-50%, -50%)' }}></div>
            ))}

            {right.map((item, index) => (
              <div key={`dot-r-${index}`} className="absolute w-[12px] h-[12px] bg-[#FDBA44] rounded-full border-[3px] border-[#FFFDF8] box-content z-20" style={{ top: item.top, right: item.offset, transform: 'translate(50%, -50%)' }}></div>
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[380px] bg-[#FDBA44] rounded-[120px] overflow-hidden flex items-end justify-center pointer-events-auto shadow-sm">
              <img
                src="/images/dog-standing.png"
                alt="dog standing"
                className="w-[85%] object-contain relative z-20 mb-[-10px]"
              />
            </div>
          </div>

          <div className="flex-1 relative h-full">
            {right.map((item, index) => (
              <div key={`right-${index}`} className="absolute left-0 flex items-center w-max" style={{ top: item.top, transform: 'translateY(-50%)' }}>
                <div className="h-[2px] bg-[#FCE1CE] relative z-0" style={{ width: `calc(40px + ${item.offset})`, marginLeft: `-${item.offset}` }}></div>
                <div className="text-left pl-4 shrink-0">
                  <h3 className="font-extrabold text-[#131336] text-[17px] mb-1">{item.title}</h3>
                  <p className="text-[#8B8B9B] text-[13px] leading-relaxed whitespace-pre-line">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center mt-12 space-y-12 relative">
          
          <div className="w-[240px] h-[340px] bg-[#FDBA44] rounded-[120px] overflow-hidden flex items-end justify-center relative z-10 shadow-sm">
            <img
              src="/images/dog-standing.png"
              alt="dog standing"
              className="w-[85%] object-contain mb-[-10px]"
            />
          </div>

          <div className="w-full flex flex-col space-y-6 px-2 relative z-20">
            {[...left, ...right].map((item, index) => (
              <div key={`mobile-${index}`} className="flex flex-col items-center text-center bg-white p-6 rounded-[20px] shadow-sm border border-[#FCE1CE]/40">
                <h3 className="font-extrabold text-[#131336] text-[18px] mb-2">{item.title}</h3>
                <p className="text-[#8B8B9B] text-[14px] leading-relaxed whitespace-pre-line">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}