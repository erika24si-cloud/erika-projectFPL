import React from "react";

const VaccinationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.4 0-3.4L15 5"></path><path d="m9 11 4 4"></path><path d="m5 19-3 3"></path><path d="m14 4 6 6"></path>
  </svg>
);

const GroomingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>
  </svg>
);

const VetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>
);

const CleaningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path>
  </svg>
);

const PlayArrow = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3l14 9-14 9V3z"></path>
  </svg>
);

export default function Services() {
  const services = [
    {
      title: "Vaccination",
      desc: "Pet lovers need to sit amet, consec tetur.",
      icon: <VaccinationIcon />,
      iconBg: "bg-white",
      iconColor: "text-[#FF7A00]",
      cardBg: "bg-[#FF7A00]", 
      textColor: "text-white",
      descColor: "text-white/90",
    },
    {
      title: "Pet Grooming",
      desc: "Pet lovers need to sit amet, consec tetur.",
      icon: <GroomingIcon />,
      iconBg: "bg-[#EAEFFF]", 
      iconColor: "text-[#3BB7A1]", 
      cardBg: "bg-white",
      textColor: "text-black",
      descColor: "text-gray-500",
    },
    {
      title: "Veterinary",
      desc: "Pet lovers need to sit amet, consec tetur.",
      icon: <VetIcon />,
      iconBg: "bg-[#EAEFFF]", 
      iconColor: "text-[#2EB8FF]", 
      cardBg: "bg-white",
      textColor: "text-black",
      descColor: "text-gray-500",
    },
    {
      title: "Cleaning",
      desc: "Pet lovers need to sit amet, consec tetur.",
      icon: <CleaningIcon />,
      iconBg: "bg-[#FFF4E5]", 
      iconColor: "text-[#FFB82E]", 
      cardBg: "bg-white",
      textColor: "text-black",
      descColor: "text-gray-500",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-[#FCF8F3]">
      <div className="max-w-6xl mx-auto text-center">
        
        <div className="flex justify-center items-center gap-3 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFB82E">
            <path d="M12 2l2.4 7.6h8l-6.4 4.8 2.4 7.6-6.4-4.8-6.4 4.8 2.4-7.6-6.4-4.8h8z" />
          </svg>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A40]">
            Our Services
          </h2>
        </div>
        
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et.
        </p>

        <div className="grid gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-4 px-4">
          {services.map((item, index) => (
            <div
              key={index}
              className={`${item.cardBg} p-8 rounded-[32px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300`}
            >
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${item.iconBg} ${item.iconColor} mb-6`}>
                {item.icon}
              </div>

              <h3 className={`text-lg font-bold mb-3 ${item.textColor}`}>
                {item.title}
              </h3>

              <p className={`text-sm leading-relaxed ${item.descColor}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row justify-center items-center gap-6">
          <button className="bg-[#FF7A00] hover:bg-[#e66a00] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-transform hover:-translate-y-1">
            Learn More
          </button>
          
          <div className="flex gap-2">
            <PlayArrow color="#FF7A00" /> 
            <PlayArrow color="#FFD78C" /> 
            <PlayArrow color="#3BB7A1" /> 
          </div>
        </div>

      </div>
    </section>
  );
}